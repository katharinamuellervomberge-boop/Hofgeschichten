"use client";

import { useState } from "react";
import Link from "@/i18n/Link";
import { coachExerciseHref, problemInfoById } from "@/content/coach/index";
import { alternativesFor, coachExerciseInfo, coachExerciseTitle, replaceExercise } from "@/features/tagebuch/coach";
import { addCoachFeedback, updateGoalProgram, useDiary } from "@/features/tagebuch/store";
import { FEEDBACK, type FeedbackRating } from "@/features/tagebuch/types";
import s from "./coach.module.css";

/**
 * „Hat dir die Übung geholfen?“ – nach einer erledigten Einheit oder einem Tagebucheintrag.
 * Bei „Noch nicht“: Alternative, Voraussetzungen, leichtere Variante, neu eingrenzen.
 */
export function FeedbackCard({ caseId, exercise, planId, entryId }: { caseId: string; exercise: string; planId?: string; entryId?: string }) {
  const diary = useDiary();
  const [msg, setMsg] = useState<string | null>(null);
  const [edit, setEdit] = useState(false);
  if (diary.status !== "ready") return null;
  const d = diary.data;
  const c = d.coach.find((x) => x.id === caseId);
  if (!c) return null;
  const goal = c.goalId ? d.goals.find((g) => g.id === c.goalId) : undefined;
  const given = c.feedback.find((f) => f.exercise === exercise && ((planId && f.planId === planId) || (entryId && f.entryId === entryId)));
  const title = coachExerciseTitle(exercise);
  const info = problemInfoById(c.problem);

  async function rate(r: FeedbackRating) {
    try {
      await addCoachFeedback(caseId, { exercise, rating: r, planId, entryId });
      setEdit(false);
      setMsg(r === "deutlich" ? "Super – bleib dran!" : r === "bisschen" ? "Ein guter Anfang. Wiederholung macht den Unterschied." : null);
    } catch {
      setMsg("Speichern hat nicht geklappt.");
    }
  }

  async function swap(to: string) {
    if (!goal?.program) return;
    try {
      await updateGoalProgram(goal.id, replaceExercise(goal.program, exercise, to));
      setMsg(`„${coachExerciseTitle(to)}“ ersetzt ab dieser Woche „${title}“ in deinem Plan.`);
    } catch {
      setMsg("Das hat nicht geklappt.");
    }
  }

  if (given && !edit) {
    const label = FEEDBACK.find((f) => f.id === given.rating)?.label;
    return (
      <div className={s.feedback}>
        <p className={s.muted}>
          {title}: <strong>{label}</strong>{" "}
          <button type="button" className={s.linkBtn} onClick={() => setEdit(true)}>
            ändern
          </button>
        </p>
        {given.rating === "noch-nicht" && <NotYet />}
        {msg && <p role="status" className={s.muted}>{msg}</p>}
      </div>
    );
  }

  function NotYet() {
    const alts = alternativesFor(c!, exercise);
    const easier = coachExerciseInfo(exercise)?.easier;
    return (
      <ul className={s.alternatives}>
        <li>
          <strong>Eine alternative Übung finden</strong>
          {alts.length ? (
            alts.map((a) => (
              <span key={a} className={s.btnRow}>
                <Link href={coachExerciseHref(a)} className={s.linkBtn}>
                  {coachExerciseTitle(a)}
                </Link>
                {goal?.program && (
                  <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSmall}`} onClick={() => swap(a)}>
                    Im Plan ersetzen
                  </button>
                )}
              </span>
            ))
          ) : (
            <span className={s.muted}>Zu diesem Thema gibt es gerade keine weitere Übung.</span>
          )}
        </li>
        <li>
          <strong>Die Voraussetzungen überprüfen</strong>
          <Link href={`${coachExerciseHref(exercise)}#voraussetzungen`} className={s.linkBtn}>
            Voraussetzungen von „{title}“ ansehen
          </Link>
        </li>
        <li>
          <strong>Die Schwierigkeit anpassen</strong>
          {easier ? (
            <span className={s.btnRow}>
              <Link href={coachExerciseHref(easier)} className={s.linkBtn}>
                Leichter: {coachExerciseTitle(easier)}
              </Link>
              {goal?.program && (
                <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSmall}`} onClick={() => swap(easier)}>
                  Im Plan ersetzen
                </button>
              )}
            </span>
          ) : (
            <span className={s.muted}>Übe kürzer, langsamer oder in einer ruhigeren Gangart – und frag deine Reitlehrkraft nach einer Variante.</span>
          )}
        </li>
        {info && (
          <li>
            <strong>Das Problem erneut eingrenzen</strong>
            <Link href={`/coach/${info.slug}?neu=1`} className={s.linkBtn}>
              Fragen zu „{info.title}“ neu beantworten
            </Link>
          </li>
        )}
      </ul>
    );
  }

  return (
    <div className={s.feedback}>
      <p className={s.feedbackQ}>Hat dir „{title}“ geholfen?</p>
      <div className={s.feedbackOptions} role="group" aria-label={`Rückmeldung zu ${title}`}>
        {FEEDBACK.map((f) => (
          <button key={f.id} type="button" className={`${s.chip} ${given?.rating === f.id ? s.chipOn : ""}`} onClick={() => rate(f.id)}>
            {f.label}
          </button>
        ))}
      </div>
      {msg && <p role="status" className={s.muted}>{msg}</p>}
    </div>
  );
}
