"use client";

import type { ReactNode } from "react";
import Link from "@/i18n/Link";
import { Icon } from "@/components/illustrations/Icons";
import { problemHref, problemInfoById } from "@/content/coach/index";
import { caseOfGoal, coachExerciseTitle, coachNextStep, latestFeedback, problemTitle, programProgress } from "@/features/tagebuch/coach";
import { formatDay } from "@/features/tagebuch/stats";
import { today } from "@/features/tagebuch/sanitize";
import { deleteCoachCase, setCaseStatus, useDiary } from "@/features/tagebuch/store";
import { FEEDBACK, type CoachCase, type PlanItem } from "@/features/tagebuch/types";
import { FeedbackCard } from "./FeedbackCard";
import s from "./coach.module.css";

const day = (iso: string) => formatDay(today(new Date(iso)));
const caseHref = (c: CoachCase) => {
  const info = problemInfoById(c.problem);
  return info ? `${problemHref(info)}?fall=${c.id}` : "/coach";
};

/**
 * Persönlicher Rider-Coach-Bereich (/coach/mein-coach): alles aus den gespeicherten
 * Aktionen auf diesem Gerät – keine erfundenen Annahmen.
 */
export function MyCoach({ canSave }: { canSave: boolean }) {
  const diary = useDiary();

  if (!canSave)
    return (
      <Shell>
        <p className={s.empty}>Analysen und Trainingspläne werden im Reitertagebuch auf deinem Gerät gespeichert. Das Tagebuch ist Teil der Basis-App.</p>
      </Shell>
    );
  if (diary.status === "loading") return <Shell><div className={s.loading}>Wird geladen …</div></Shell>;
  if (diary.status === "error")
    return (
      <Shell>
        <p className={s.empty}>Dieser Browser erlaubt keine Speicherung auf dem Gerät (zum Beispiel im privaten Modus). Öffne die App bitte in einem normalen Browserfenster.</p>
      </Shell>
    );

  const d = diary.data;
  const step = coachNextStep(d);
  const open = d.coach.filter((c) => c.status === "offen").sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  const saved = d.coach.filter((c) => c.saved).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  const plans = d.goals.filter((g) => g.program && g.status !== "geschafft");
  const recent = [...d.coach].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 4);
  const doneGoals = d.goals.filter((g) => g.program && g.status === "geschafft");
  // erledigte Coach-Einheiten ohne Rückmeldung (neueste zuerst, max. 3)
  const pending = d.plan
    .filter((p) => p.kind === "coach" && p.done && p.exercises?.length)
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((p) => ({ p, c: d.coach.find((x) => x.goalId === p.goalId) }))
    .filter((x): x is { p: PlanItem; c: CoachCase } => !!x.c && !x.c.feedback.some((f) => f.planId === x.p.id))
    .slice(0, 3);
  const ratings = d.coach.flatMap((c) => [...latestFeedback(c).values()]);

  if (d.coach.length === 0 && plans.length === 0)
    return (
      <Shell>
        <div className={s.card}>
          <h2 className={s.cardTitle}>Noch nichts hier</h2>
          <p className={s.muted}>Sobald du ein Problem im Rider Coach bearbeitest, findest du hier deine Themen, Lösungen, Pläne und Fortschritte.</p>
          <div className={s.btnRow} style={{ marginTop: "var(--space-3)" }}>
            <Link href="/coach" className={s.btn}>
              <Icon name="coach" /> Problem suchen
            </Link>
          </div>
        </div>
      </Shell>
    );

  return (
    <Shell>
      {(step || pending.length > 0) && (
        <section aria-labelledby="mc-next">
          <h2 id="mc-next" className={s.sectionTitle} style={{ marginBottom: "var(--space-3)" }}>
            Empfohlene nächste Schritte
          </h2>
          <div className={s.grid2}>
            {step && step.kind !== "feedback" && (
              <Link href={step.href} className={s.tile}>
                <span className={s.kicker}>{step.title}</span>
                <span className={s.tileTitle}>{step.text}</span>
              </Link>
            )}
            {pending.map(({ p, c }) => (
              <div key={p.id} className={s.tile}>
                <span className={s.kicker}>
                  {formatDay(p.date)} · {p.title}
                </span>
                {p.exercises!.slice(0, 2).map((ex) => (
                  <FeedbackCard key={ex} caseId={c.id} exercise={ex} planId={p.id} />
                ))}
              </div>
            ))}
          </div>
        </section>
      )}

      <section aria-labelledby="mc-plans">
        <div className={s.sectionHead}>
          <h2 id="mc-plans" className={s.sectionTitle}>
            Meine aktiven Trainingspläne
          </h2>
          <Link href="/tagebuch/plan" className={s.linkBtn}>
            Wochenplan
          </Link>
        </div>
        {plans.length === 0 ? (
          <p className={s.empty}>Noch kein Trainingsplan. Mach aus einem Lösungsweg mit einem Klick einen Plan.</p>
        ) : (
          <ul className={s.tiles}>
            {plans.map((g) => {
              const pp = programProgress(d, g)!;
              const c = caseOfGoal(d, g);
              return (
                <li key={g.id} className={s.tile}>
                  <span className={s.kicker}>{pp.ended ? "Plan abgelaufen" : `Woche ${pp.week} von ${pp.weeks}`}</span>
                  <span className={s.tileTitle}>{g.title}</span>
                  <span className={s.muted}>{g.program!.weeks[pp.week - 1]?.title}</span>
                  <span className={s.bar} role="progressbar" aria-valuemin={0} aria-valuemax={pp.total} aria-valuenow={pp.done} aria-label={`${g.title}: Einheiten erledigt`}>
                    <span style={{ width: `${pp.total ? (pp.done / pp.total) * 100 : 0}%` }} />
                  </span>
                  <span className={s.muted}>
                    {pp.done} von {pp.total} Einheiten erledigt
                  </span>
                  <span className={s.btnRow}>
                    <Link href="/tagebuch/ziele" className={s.linkBtn}>
                      Ziel bearbeiten
                    </Link>
                    {c && (
                      <Link href={caseHref(c)} className={s.linkBtn}>
                        Lösungsweg
                      </Link>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section aria-labelledby="mc-open">
        <h2 id="mc-open" className={s.sectionTitle} style={{ marginBottom: "var(--space-3)" }}>
          Meine aktuellen Probleme
        </h2>
        {open.length === 0 ? (
          <p className={s.empty}>Gerade ist kein Thema offen.</p>
        ) : (
          <ul className={s.problemList}>
            {open.map((c) => (
              <li key={c.id} className={s.problemLink} style={{ flexWrap: "wrap" }}>
                <Link href={caseHref(c)} className={s.problemTitle} style={{ textDecoration: "none", color: "inherit" }}>
                  {problemTitle(c)}
                  <span className={s.resultText}>
                    bearbeitet am {day(c.updatedAt)}
                    {c.flags.length ? " · Abklärung empfohlen" : ""}
                    {c.goalId ? " · mit Trainingsplan" : ""}
                  </span>
                </Link>
                <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSmall}`} onClick={() => setCaseStatus(c.id, "geloest").catch(() => undefined)}>
                  Gelöst
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="mc-saved">
        <h2 id="mc-saved" className={s.sectionTitle} style={{ marginBottom: "var(--space-3)" }}>
          Meine gespeicherten Lösungen
        </h2>
        {saved.length === 0 ? (
          <p className={s.empty}>Tippe im Lösungsweg auf „Lösung merken“, um ihn hier wiederzufinden.</p>
        ) : (
          <ul className={s.lessonList}>
            {saved.map((c) => (
              <li key={c.id}>
                <Link href={caseHref(c)}>
                  <Icon name="coach" />
                  <span>
                    {problemTitle(c)}
                    <small>
                      {c.exercises.length} Übungen · {c.status === "geloest" ? "gelöst" : "in Arbeit"}
                    </small>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="mc-progress">
        <h2 id="mc-progress" className={s.sectionTitle} style={{ marginBottom: "var(--space-3)" }}>
          Meine Fortschritte
        </h2>
        {ratings.length === 0 && doneGoals.length === 0 ? (
          <p className={s.empty}>Hier erscheinen deine Rückmeldungen zu Übungen und abgeschlossene Ziele.</p>
        ) : (
          <div className={s.grid2}>
            {doneGoals.length > 0 && (
              <div className={s.card}>
                <h3 className={s.cardTitle}>Geschafft</h3>
                <ul className={s.bullets}>
                  {doneGoals.map((g) => (
                    <li key={g.id}>
                      {g.title}
                      {g.achievedAt ? ` · ${day(g.achievedAt)}` : ""}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {ratings.length > 0 && (
              <div className={s.card}>
                <h3 className={s.cardTitle}>So helfen dir die Übungen</h3>
                <ul className={s.bullets}>
                  {ratings
                    .sort((a, b) => b.date.localeCompare(a.date))
                    .slice(0, 8)
                    .map((f) => (
                      <li key={f.id}>
                        {coachExerciseTitle(f.exercise)}: <strong>{FEEDBACK.find((x) => x.id === f.rating)?.label}</strong>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </section>

      <section aria-labelledby="mc-recent">
        <h2 id="mc-recent" className={s.sectionTitle} style={{ marginBottom: "var(--space-3)" }}>
          Zuletzt bearbeitet
        </h2>
        <ul className={s.lessonList}>
          {recent.map((c) => (
            <li key={c.id} style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
              <Link href={caseHref(c)} style={{ flex: 1 }}>
                <Icon name="coach" />
                <span>
                  {problemTitle(c)}
                  <small>{day(c.updatedAt)}</small>
                </span>
              </Link>
              <button
                type="button"
                className={s.linkBtn}
                aria-label={`Analyse „${problemTitle(c)}“ löschen`}
                onClick={() => {
                  if (window.confirm("Diese Analyse löschen? Ein daraus entstandenes Ziel bleibt erhalten.")) deleteCoachCase(c.id).catch(() => undefined);
                }}
              >
                Löschen
              </button>
            </li>
          ))}
        </ul>
      </section>
    </Shell>
  );
}

function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="page">
      <div className={s.page}>
        <header className={s.problemHead}>
          <Link href="/coach" className={s.linkBtn} style={{ width: "fit-content" }}>
            ← Rider Coach
          </Link>
          <p className={s.kicker}>Rider Coach</p>
          <h1 className={s.problemH1}>Mein Coach</h1>
          <p className={s.muted}>Deine Themen, Lösungen, Pläne und Fortschritte – gespeichert nur auf diesem Gerät.</p>
        </header>
        {children}
      </div>
    </div>
  );
}
