"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import Link from "@/i18n/Link";
import { Icon } from "@/components/illustrations/Icons";
import { coachCategories } from "@/content/coach/index";
import { activeQuestions, buildSolution, nextQuestion, programFromTemplate, pruneAnswers, type Answers, type Solution } from "@/content/coach/engine";
import type { CoachExercise, CoachProblem } from "@/content/coach/types";
import { refInfo, type RefOption } from "@/features/tagebuch/plan";
import { createProgramGoal, saveCoachCase, setCaseSaved, useDiary } from "@/features/tagebuch/store";
import { ExerciseCard } from "./ExerciseCard";
import { PremiumBox } from "./CoachHome";
import { ProgramBuilder } from "./ProgramBuilder";
import s from "./coach.module.css";

type Props = {
  problem: CoachProblem;
  /** Inhalte aller Übungen, die in diesem Lösungsweg vorkommen können */
  exercises: Record<string, CoachExercise>;
  /** Premium freigeschaltet (Plan, Speichern) */
  owned: boolean;
  /** Reitertagebuch verfügbar → Analyse und Plan werden auf dem Gerät gespeichert */
  canSave: boolean;
};

/**
 * Interaktive Problemanalyse: Fragen nacheinander, Folgefragen je nach Antwort (engine.ts),
 * danach der Lösungsweg. `?fall=<id>` öffnet eine gespeicherte Analyse, `?neu=1` startet neu.
 */
export function CoachAnalysis({ problem, exercises, owned, canSave }: Props) {
  const params = useSearchParams();
  const fall = params.get("fall");
  const fresh = params.get("neu") === "1";
  const diary = useDiary();
  const [answers, setAnswers] = useState<Answers>({});
  const [caseId, setCaseId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(!fall || fresh);
  const savedKey = useRef<string>("");

  // gespeicherte Analyse laden (nur einmal, wenn das Tagebuch bereit ist)
  useEffect(() => {
    if (loaded || diary.status === "loading") return;
    const c = diary.status === "ready" ? diary.data.coach.find((x) => x.id === fall && x.problem === problem.id) : undefined;
    if (c) {
      setAnswers(pruneAnswers(problem, c.answers));
      setCaseId(c.id);
      savedKey.current = JSON.stringify(pruneAnswers(problem, c.answers));
    }
    setLoaded(true);
  }, [diary, fall, loaded, problem]);

  const question = nextQuestion(problem, answers);
  const asked = activeQuestions(problem, answers);
  const library = useMemo(() => Object.fromEntries(Object.entries(exercises).map(([k, e]) => [k, { difficulty: e.difficulty, place: e.place, easier: e.easier }])), [exercises]);
  const solution = !question ? buildSolution(problem, answers, library) : null;

  // fertige Analyse auf dem Gerät speichern (neu oder geändert)
  useEffect(() => {
    if (!solution || !canSave || diary.status !== "ready") return;
    const key = JSON.stringify(answers);
    if (key === savedKey.current) return;
    savedKey.current = key;
    saveCoachCase({ id: caseId ?? undefined, problem: problem.id, answers, exercises: solution.exercises, flags: solution.flags })
      .then((id) => setCaseId(id))
      .catch(() => {
        savedKey.current = "";
      });
  }, [solution, canSave, diary.status, answers, caseId, problem.id]);

  const category = coachCategories.find((c) => c.id === problem.category)?.title;

  if (!loaded) return <div className={s.loading}>Deine Analyse wird geöffnet …</div>;

  if (solution)
    return (
      <SolutionView
        problem={problem}
        solution={solution}
        exercises={exercises}
        owned={owned}
        canSave={canSave}
        caseId={caseId}
        onRestart={() => {
          setAnswers({});
          setCaseId(null);
          savedKey.current = "";
        }}
        onBack={() => {
          const last = asked[asked.length - 1];
          if (last) setAnswers((a) => pruneAnswers(problem, Object.fromEntries(Object.entries(a).filter(([k]) => k !== last.id))));
        }}
      />
    );

  const index = asked.findIndex((q) => q.id === question!.id);
  return (
    <div className={s.analysis}>
      <header className={s.problemHead}>
        <Link href="/coach" className={s.linkBtn} style={{ width: "fit-content" }}>
          ← Rider Coach
        </Link>
        <p className={s.kicker}>{category}</p>
        <h1 className={s.problemH1}>{problem.title}</h1>
        {index === 0 && <p className={s.muted}>{problem.intro}</p>}
      </header>

      <div className={s.steps} aria-hidden>
        {asked.map((q, i) => (
          <span key={q.id} className={`${s.stepDot} ${i < index ? s.stepDone : ""} ${i === index ? s.stepNow : ""}`} />
        ))}
      </div>

      <fieldset key={question!.id} className={s.question} style={{ border: 0, padding: 0, margin: 0 }}>
        <p className="visually-hidden">
          Frage {index + 1} von {asked.length}
        </p>
        {question!.safety && (
          <span className={s.safetyTag}>
            <Icon name="star" /> Sicherheitsfrage
          </span>
        )}
        <legend className={s.questionText}>{question!.text}</legend>
        {question!.help && <p className={s.muted}>{question!.help}</p>}
        <ul className={s.options}>
          {question!.options.map((o) => {
            const on = answers[question!.id] === o.id;
            return (
              <li key={o.id}>
                <button
                  type="button"
                  className={`${s.option} ${on ? s.optionOn : ""}`}
                  aria-pressed={on}
                  onClick={() => setAnswers((a) => pruneAnswers(problem, { ...a, [question!.id]: o.id }))}
                >
                  <span className={s.optionMark} aria-hidden />
                  <span>{o.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </fieldset>

      <div className={s.backRow}>
        {index > 0 ? (
          <button
            type="button"
            className={s.linkBtn}
            onClick={() => {
              const prev = asked[index - 1];
              setAnswers((a) => pruneAnswers(problem, Object.fromEntries(Object.entries(a).filter(([k]) => k !== prev.id))));
            }}
          >
            Zurück
          </button>
        ) : (
          <span />
        )}
        <span className={s.muted}>
          Frage {index + 1} von {asked.length}
        </span>
      </div>
    </div>
  );
}

const nr = (n: number) => String(n).padStart(2, "0");

function Block({ n, title, children, id }: { n: number; title: string; children: ReactNode; id?: string }) {
  return (
    <section className={s.block} aria-labelledby={`sol-${n}`} id={id} style={{ animationDelay: `${Math.min(n, 9) * 50}ms` }}>
      <span className={s.blockNum} aria-hidden>
        {nr(n)}
      </span>
      <div className={s.blockBody}>
        <h2 id={`sol-${n}`} className={s.blockTitle}>
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

function joinSummary(parts: string[]): string {
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0];
  return `${parts.slice(0, -1).join(", ")} und ${parts[parts.length - 1]}`;
}

function SolutionView({
  problem,
  solution,
  exercises,
  owned,
  canSave,
  caseId,
  onRestart,
  onBack,
}: {
  problem: CoachProblem;
  solution: Solution;
  exercises: Record<string, CoachExercise>;
  owned: boolean;
  canSave: boolean;
  caseId: string | null;
  onRestart: () => void;
  onBack: () => void;
}) {
  const diary = useDiary();
  const stop = solution.flags.includes("stopp");
  const check = solution.flags.includes("abklaeren") || solution.causes.slice(0, 2).some((c) => c.check && c.score > 0);
  const exList = solution.exercises.map((id) => exercises[id]).filter(Boolean);
  const media = [...new Set([...exList.flatMap((e) => [e.media?.riderLab, e.media?.lesson]), ...problem.riderLab].filter((x): x is string => !!x))]
    .map((id) => refInfo(id))
    .filter((x): x is RefOption => !!x);
  const lessons = problem.lessons.map((id) => refInfo(id)).filter((x): x is RefOption => !!x);
  const c = diary.status === "ready" && caseId ? diary.data.coach.find((x) => x.id === caseId) : undefined;
  const goal = c?.goalId && diary.status === "ready" ? diary.data.goals.find((g) => g.id === c.goalId) : undefined;
  const [building, setBuilding] = useState(false);
  const [created, setCreated] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const summary = joinSummary(solution.summary);
  let n = 0;

  return (
    <article className={s.solution}>
      <header className={s.solHead}>
        <Link href="/coach" className={`${s.linkBtn} noPrint`} style={{ width: "fit-content" }}>
          ← Rider Coach
        </Link>
        <p className={s.kicker}>Dein Lösungsweg{problem.review === "entwurf" ? " · fachliche Prüfung ausstehend" : ""}</p>
        <h1 className={s.solH1}>{problem.title}</h1>
        <div className={`${s.btnRow} noPrint`}>
          <button type="button" className={s.linkBtn} onClick={onBack}>
            Letzte Antwort ändern
          </button>
          <button type="button" className={s.linkBtn} onClick={onRestart}>
            Neu eingrenzen
          </button>
          {owned && canSave && c && (
            <button
              type="button"
              className={s.linkBtn}
              onClick={() =>
                setCaseSaved(c.id, !c.saved)
                  .then(() => setMsg(c.saved ? "Nicht mehr gemerkt." : "Lösung gemerkt – du findest sie unter „Mein Coach“."))
                  .catch(() => setMsg("Das hat nicht geklappt."))
              }
            >
              {c.saved ? "✓ Gemerkt" : "Lösung merken"}
            </button>
          )}
        </div>
        {msg && (
          <p className={s.muted} role="status">
            {msg}
          </p>
        )}
      </header>

      {(stop || check) && (
        <div className={s.alert} role="note">
          <p className={s.alertTitle}>{stop ? "Bitte jetzt nicht allein weiterüben" : "Bitte fachlich abklären lassen"}</p>
          <p>
            {stop
              ? "Deine Antworten deuten auf eine Situation hin, in der du oder dein Pferd verletzt werden könnt. Hol dir zuerst Unterstützung von einer erfahrenen Reitlehrkraft und lass mögliche Schmerzen tierärztlich abklären. Übungen mit dem Pferd zeigen wir dir deshalb erst einmal nicht."
              : "Einige Antworten können auf Schmerzen, gesundheitliche Probleme oder unpassende Ausrüstung hinweisen. Das kann der Rider Coach nicht beurteilen. Lass es bitte prüfen, bevor du an der Technik arbeitest."}
          </p>
          <ul className={s.bullets}>
            {problem.checkWhen.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      )}

      <Block n={++n} title="Zusammenfassung">
        <p className={s.summary}>
          {summary ? `Du hast beschrieben, dass ${summary}.` : `Du möchtest an „${problem.title.replace(/\.$/, "")}“ arbeiten.`} Die folgenden Ursachen passen am besten zu deinen
          Antworten. Sie sind Möglichkeiten, keine sichere Diagnose – deine Reitlehrkraft sieht vor Ort mehr.
        </p>
      </Block>

      <Block n={++n} title="Mögliche Ursachen">
        <ol className={s.causes}>
          {solution.causes.map((cause, i) => (
            <li key={cause.id} className={s.cause}>
              <p className={s.causeTitle}>
                <span>{cause.title}</span>
                <span className={s.likely}>{i === 0 ? "passt am besten" : "möglich"}</span>
              </p>
              {cause.check && <p className={s.muted}>Sollte fachlich abgeklärt werden.</p>}
            </li>
          ))}
        </ol>
      </Block>

      <Block n={++n} title="Verständlich erklärt">
        {solution.causes.map((cause) => (
          <div key={cause.id}>
            <h3 style={{ fontSize: "var(--text-md)", marginBottom: "var(--space-1)" }}>{cause.title}</h3>
            <p>{cause.text}</p>
          </div>
        ))}
      </Block>

      <Block n={++n} title="Passende Übungen" id="uebungen">
        {exList.length > 0 ? (
          <ul className={s.exercises}>
            {exList.map((ex, i) => (
              <ExerciseCard key={ex.id} ex={ex} open={i === 0} />
            ))}
          </ul>
        ) : (
          <p className={s.empty}>{stop ? "Erst wenn die Situation fachlich geklärt ist, ergeben Übungen Sinn." : "Für diesen Weg haben wir noch keine Übung."}</p>
        )}
      </Block>

      {media.length > 0 && (
        <Block n={++n} title="Animationen und Lernvideos">
          <p className={s.muted}>Zum Anschauen und Nachmachen – im Rider Lab und in der Reitakademie.</p>
          <ul className={s.lessonList}>
            {media.map((m) => (
              <li key={m.id}>
                <Link href={m.href}>
                  <Icon name={m.id.startsWith("rl-") ? "lab" : "academy"} />
                  <span>
                    {m.title}
                    <small>{m.group}</small>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Block>
      )}

      <Block n={++n} title="Typische Fehler">
        <ul className={s.bullets}>
          {problem.mistakes.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </Block>

      <Block n={++n} title="Für deine nächste Reitstunde">
        <ul className={s.bullets}>
          {problem.nextLesson.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <div className={s.note}>
          <Icon name="star" />
          <div>
            <strong>Sicher üben</strong>
            <ul className={s.bullets}>
              {problem.safety.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            {!check && !stop && (
              <>
                <strong>Wann eine Fachperson draufschauen sollte</strong>
                <ul className={s.bullets}>
                  {problem.checkWhen.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </Block>

      {lessons.length > 0 && (
        <Block n={++n} title="Passt dazu in der Reitakademie">
          <ul className={s.lessonList}>
            {lessons.map((l) => (
              <li key={l.id}>
                <Link href={l.href}>
                  <Icon name="academy" />
                  <span>
                    {l.title}
                    <small>{l.group}</small>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Block>
      )}

      <Block n={++n} title="Dein Trainingsplan">
        {stop ? (
          <p className={s.muted}>Einen Trainingsplan legen wir erst an, wenn die Situation fachlich geklärt ist.</p>
        ) : !owned ? (
          <PremiumBox compact />
        ) : !canSave ? (
          <p className={s.muted}>Zum Speichern von Trainingsplänen brauchst du das Reitertagebuch (Teil der Basis-App).</p>
        ) : created || goal ? (
          <div className={s.success} role="status">
            <strong>{created ? "Dein Trainingsplan ist angelegt." : `Zu diesem Lösungsweg gibt es schon dein Ziel „${goal!.title}“.`}</strong>
            <p>Die Einheiten stehen in deinem Wochenplan. Hake sie ab, wenn du geübt hast, und sag uns danach, ob die Übung geholfen hat.</p>
            <div className={s.btnRow}>
              <Link href="/tagebuch/plan" className={s.btn}>
                <Icon name="plan" /> Zum Trainingsplan
              </Link>
              <Link href="/akademie/rider-lab#ziele" className={`${s.btn} ${s.btnGhost}`}>
                Im Rider Lab ansehen
              </Link>
            </div>
          </div>
        ) : building ? (
          <ProgramBuilder
            title={problem.plan.goal}
            weeks={programFromTemplate(problem, problem.plan.weeks.length, solution.exercises.length ? [...new Set([...solution.exercises, ...problem.plan.weeks.flatMap((w) => w.exercises).filter((x) => exercises[x])])] : undefined)}
            resize={(w) => programFromTemplate(problem, w, [...new Set([...solution.exercises, ...problem.plan.weeks.flatMap((x) => x.exercises).filter((x) => exercises[x])])])}
            options={solution.exercises}
            horses={diary.status === "ready" ? diary.data.horses : []}
            submitLabel="Plan speichern"
            onCancel={() => setBuilding(false)}
            onSave={async (d) => {
              let cid = caseId;
              if (!cid) cid = await saveCoachCase({ problem: problem.id, answers: {}, exercises: solution.exercises, flags: solution.flags });
              const gid = await createProgramGoal({ title: d.title, horseId: d.horseId, caseId: cid, program: d.program, description: `Aus dem Rider Coach: ${problem.title}` });
              setCreated(gid);
              setBuilding(false);
            }}
          />
        ) : (
          <div className={s.planCta}>
            <h2 className={s.blockTitle}>Daraus einen Trainingsplan machen</h2>
            <p>
              Wir übernehmen die passenden Übungen in einen {problem.plan.weeks.length}-Wochen-Plan: {problem.plan.weeks.map((w) => w.title).join(" · ")}. Dauer, Tage und Übungen
              kannst du anpassen.
            </p>
            <div className={s.btnRow}>
              <button type="button" className={`${s.btn} ${s.btnHoney}`} onClick={() => setBuilding(true)}>
                <Icon name="plan" /> Trainingsplan erstellen
              </button>
            </div>
          </div>
        )}
      </Block>
    </article>
  );
}
