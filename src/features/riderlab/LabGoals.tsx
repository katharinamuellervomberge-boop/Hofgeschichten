"use client";

import Link from "@/i18n/Link";
import { Icon } from "@/components/illustrations/Icons";
import { caseOfGoal, programProgress } from "@/features/tagebuch/coach";
import { useDiary } from "@/features/tagebuch/store";
import ak from "@/features/akademie/academy.module.css";
import styles from "./riderlab.module.css";

/**
 * Rider Lab: Meine Trainingsziele (seit 11.11.2026). Ziele und Pläne liegen im Reitertagebuch
 * (gleiche Daten) – hier der Überblick mit Fortschritt aus abgehakten Einheiten.
 */
export function LabGoals() {
  const diary = useDiary();
  if (diary.status !== "ready") return null;
  const d = diary.data;
  const active = d.goals.filter((g) => g.status !== "geschafft");
  const done = d.goals.filter((g) => g.status === "geschafft");
  return (
    <section aria-labelledby="rl-goals" id="ziele" className={styles.goals}>
      <div className={ak.sectionHead}>
        <h2 id="rl-goals" className={ak.sectionTitle}>
          Meine Trainingsziele
        </h2>
        <span className={ak.sectionMeta}>{done.length > 0 ? `${done.length} geschafft` : "Ziele setzen, Training planen"}</span>
      </div>
      {active.length === 0 ? (
        <div className={styles.goalEmpty}>
          <p>Noch kein aktives Ziel. Leg eins im Tagebuch an – oder lass dir vom Rider Coach einen Plan zu deinem Problem erstellen.</p>
          <div className={styles.goalLinks}>
            <Link href="/tagebuch/ziele" className={styles.goalLink}>
              <Icon name="star" /> Ziel anlegen
            </Link>
            <Link href="/coach" className={styles.goalLink}>
              <Icon name="coach" /> Rider Coach
            </Link>
          </div>
        </div>
      ) : (
        <ul className={styles.goalList}>
          {active.slice(0, 4).map((g) => {
            const pp = programProgress(d, g);
            const units = d.plan.filter((p) => p.goalId === g.id);
            const doneUnits = units.filter((p) => p.done).length;
            return (
              <li key={g.id} className={styles.goalCard}>
                <span className={styles.goalKicker}>{caseOfGoal(d, g) ? "Aus dem Rider Coach" : "Eigenes Ziel"}{pp ? ` · Woche ${pp.week} von ${pp.weeks}` : ""}</span>
                <strong className={styles.goalTitle}>{g.title}</strong>
                {units.length > 0 && (
                  <>
                    <span className={styles.goalBar} role="progressbar" aria-valuemin={0} aria-valuemax={units.length} aria-valuenow={doneUnits} aria-label={`Fortschritt ${g.title}`}>
                      <span style={{ width: `${(doneUnits / units.length) * 100}%` }} />
                    </span>
                    <span className={styles.goalMeta}>
                      {doneUnits} von {units.length} geplanten Einheiten erledigt
                    </span>
                  </>
                )}
                <span className={styles.goalLinks}>
                  <Link href="/tagebuch/plan" className={styles.goalLink}>
                    <Icon name="plan" /> Wochenplan
                  </Link>
                  <Link href="/tagebuch/ziele" className={styles.goalLink}>
                    Ziel bearbeiten
                  </Link>
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
