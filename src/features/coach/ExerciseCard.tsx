"use client";

import { useState } from "react";
import Link from "@/i18n/Link";
import { Icon } from "@/components/illustrations/Icons";
import { coachExerciseHref } from "@/content/coach/index";
import { DIFFICULTY_LABEL, PLACE_LABEL, type CoachExercise } from "@/content/coach/types";
import { refInfo } from "@/features/tagebuch/plan";
import s from "./coach.module.css";

export function ExerciseMeta({ ex }: { ex: CoachExercise }) {
  return (
    <span className={s.meta}>
      <span className={s.pill}>{DIFFICULTY_LABEL[ex.difficulty]}</span>
      <span className={s.pill}>{PLACE_LABEL[ex.place]}</span>
      {ex.review === "entwurf" && <span className={`${s.pill} ${s.pillReview}`} title="Wird vor der Veröffentlichung von einer Reitlehrkraft geprüft">Fachliche Prüfung ausstehend</span>}
    </span>
  );
}

/** Animation oder Lektion zur Übung (nur echte Verweise, keine Platzhalter) */
export function MediaLinks({ ex }: { ex: CoachExercise }) {
  const rl = ex.media?.riderLab ? refInfo(ex.media.riderLab) : undefined;
  const ls = ex.media?.lesson ? refInfo(ex.media.lesson) : undefined;
  if (!rl && !ls) return null;
  return (
    <div className={s.links}>
      {rl && (
        <Link href={rl.href} className={s.mediaLink}>
          <Icon name="play" /> Animation: {rl.title}
        </Link>
      )}
      {ls && (
        <Link href={ls.href} className={s.mediaLink}>
          <Icon name="academy" /> Lektion: {ls.title}
        </Link>
      )}
    </div>
  );
}

export function ExerciseDetails({ ex, withLink = true }: { ex: CoachExercise; withLink?: boolean }) {
  return (
    <>
      <p>
        <strong>Lernziel:</strong> {ex.goal}
      </p>
      {ex.prerequisites.length > 0 && (
        <div id="voraussetzungen">
          <h4>Voraussetzungen</h4>
          <ul className={s.bullets}>
            {ex.prerequisites.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      )}
      {ex.equipment.length > 0 && (
        <p className={s.muted}>
          <strong>Du brauchst:</strong> {ex.equipment.join(", ")}
        </p>
      )}
      <div>
        <h4>Schritt für Schritt</h4>
        <ol className={s.stepsList}>
          {ex.steps.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ol>
      </div>
      <div>
        <h4>Häufige Fehler</h4>
        <ul className={s.bullets}>
          {ex.mistakes.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
      {ex.safety.length > 0 && (
        <div className={s.note}>
          <Icon name="star" />
          <div>
            <strong>Sicherheit</strong>
            <ul className={s.bullets}>
              {ex.safety.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <MediaLinks ex={ex} />
      {withLink && (
        <Link href={coachExerciseHref(ex.id)} className={s.linkBtn}>
          Übung einzeln öffnen
        </Link>
      )}
    </>
  );
}

/** Aufklappbare Übungskarte für den Lösungsweg */
export function ExerciseCard({ ex, open: initial = false }: { ex: CoachExercise; open?: boolean }) {
  const [open, setOpen] = useState(initial);
  return (
    <li className={`${s.exercise} ${open ? s.exerciseOpen : ""}`}>
      <button type="button" className={s.exerciseHead} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <span style={{ flex: 1, display: "grid", gap: "0.3rem" }}>
          <span className={s.exerciseTitle}>{ex.title}</span>
          <ExerciseMeta ex={ex} />
        </span>
        <Icon name="back" />
      </button>
      {open && (
        <div className={s.exerciseBody}>
          <ExerciseDetails ex={ex} />
        </div>
      )}
    </li>
  );
}
