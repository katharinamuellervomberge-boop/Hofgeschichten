"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@/components/illustrations/Icons";
import { useClock } from "./ExerciseAnimation";
import type { Dose } from "./types";
import styles from "./riderlab.module.css";

type Round = { label: string; kind: Dose["kind"]; target: number };

/** Runden aus der Dosierung: Sätze × Seiten */
export function roundsFor(dose: Dose): Round[] {
  const sets = dose.sets ?? 1;
  const sides = dose.sides ? ["linke Seite", "rechte Seite"] : [null];
  const target = dose.kind === "time" ? dose.seconds : dose.reps;
  const out: Round[] = [];
  for (let s = 1; s <= sets; s++)
    for (const side of sides)
      out.push({ label: [sets > 1 ? `Durchgang ${s} von ${sets}` : null, side].filter(Boolean).join(" · ") || "Los geht's", kind: dose.kind, target });
  return out;
}

const fmt = (s: number) => {
  const x = Math.max(0, Math.ceil(s));
  return x >= 60 ? `${Math.floor(x / 60)}:${String(x % 60).padStart(2, "0")}` : `${x}`;
};

/**
 * Interaktiver Trainingsmodus: Start/Pause, Timer (Halten) oder Wiederholungszähler,
 * Runden für Sätze und Seiten, Wiederholen, Abschließen.
 * Wiederholungen werden im Tempo der Animation mitgezählt und lassen sich per Tipp korrigieren.
 */
export function Trainer({
  dose,
  secondsPerRep,
  onComplete,
  done,
}: {
  dose: Dose;
  /** Tempo für das Mitzählen (aus der Animation) */
  secondsPerRep: number;
  onComplete: () => void;
  done: boolean;
}) {
  const rounds = useMemo(() => roundsFor(dose), [dose]);
  const [idx, setIdx] = useState(0);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const [adjust, setAdjust] = useState(0);
  const [t, setT] = useClock(running);
  const round = rounds[idx];
  const tempo = Math.max(1.2, secondsPerRep);
  const reps = round.kind === "reps" ? Math.min(round.target, Math.max(0, Math.floor(t / tempo) + adjust)) : 0;
  const left = round.kind === "time" ? round.target - t : 0;
  const roundDone = round.kind === "time" ? left <= 0 : reps >= round.target;
  const allDone = finished || (roundDone && idx === rounds.length - 1);
  const buzzed = useRef(-1);

  useEffect(() => {
    if (running && roundDone) {
      setRunning(false);
      if (buzzed.current !== idx) {
        buzzed.current = idx;
        try {
          navigator.vibrate?.(180);
        } catch {
          /* ohne Vibration */
        }
      }
      if (idx === rounds.length - 1) setFinished(true);
    }
  }, [running, roundDone, idx, rounds.length]);

  const reset = () => {
    setRunning(false);
    setIdx(0);
    setT(0);
    setAdjust(0);
    setFinished(false);
    buzzed.current = -1;
  };
  const nextRound = () => {
    setIdx((i) => Math.min(rounds.length - 1, i + 1));
    setT(0);
    setAdjust(0);
    setRunning(true);
  };

  const pct = round.kind === "time" ? Math.min(1, t / round.target) : reps / round.target;
  const R = 52;
  const C = 2 * Math.PI * R;

  return (
    <section className={styles.trainer} aria-labelledby="rl-trainer">
      <div className={styles.trainerHead}>
        <h2 id="rl-trainer" className={styles.blockTitle}>
          Mitmachen
        </h2>
        <span className={styles.trainerRound}>
          {round.label}
          {rounds.length > 1 && ` · ${idx + 1}/${rounds.length}`}
        </span>
      </div>

      <div className={styles.trainerBody}>
        <div className={styles.dial} role="timer" aria-live="off" aria-label={round.kind === "time" ? `${fmt(left)} Sekunden übrig` : `${reps} von ${round.target} Wiederholungen`}>
          <svg viewBox="0 0 120 120" aria-hidden>
            <circle cx="60" cy="60" r={R} fill="none" stroke="var(--sand-light)" strokeWidth="9" />
            <circle
              cx="60"
              cy="60"
              r={R}
              fill="none"
              stroke={allDone ? "var(--forest)" : "var(--honey)"}
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={`${C * pct} ${C}`}
              transform="rotate(-90 60 60)"
            />
          </svg>
          <span className={styles.dialValue}>
            {round.kind === "time" ? fmt(left) : `${reps}`}
            <small>{round.kind === "time" ? "Sekunden" : `von ${round.target}`}</small>
          </span>
        </div>

        <div className={styles.trainerSide}>
          {allDone ? (
            <p className={styles.trainerMsg}>
              <Icon name="check" /> Geschafft! Wie hat es sich angefühlt?
            </p>
          ) : roundDone ? (
            <p className={styles.trainerMsg}>Kurz durchatmen – dann weiter mit: {rounds[idx + 1]?.label}</p>
          ) : (
            <p className={styles.trainerMsg}>
              {round.kind === "time" ? "Position ruhig halten und weiteratmen." : "Im Tempo der Animation mitmachen – der Zähler läuft mit."}
            </p>
          )}

          <div className={styles.trainerBtns}>
            {!allDone && !roundDone && (
              <button type="button" className={`${styles.btn} ${styles.btnMain}`} onClick={() => setRunning((r) => !r)}>
                <Icon name={running ? "pause" : "play"} />
                {running ? "Pause" : t > 0 ? "Weiter" : "Start"}
              </button>
            )}
            {!allDone && roundDone && (
              <button type="button" className={`${styles.btn} ${styles.btnMain}`} onClick={nextRound}>
                <Icon name="play" />
                Nächste Runde
              </button>
            )}
            {round.kind === "reps" && !allDone && !roundDone && (
              <span className={styles.adjust}>
                <button type="button" className={styles.btn} onClick={() => setAdjust((a) => a - 1)} disabled={reps <= 0} aria-label="Eine Wiederholung abziehen">
                  −1
                </button>
                <button type="button" className={styles.btn} onClick={() => setAdjust((a) => a + 1)} aria-label="Eine Wiederholung dazuzählen">
                  +1
                </button>
              </span>
            )}
            <button type="button" className={styles.btn} onClick={reset}>
              <Icon name="replay" />
              Übung wiederholen
            </button>
          </div>

          <button type="button" className={`${styles.btn} ${allDone ? styles.btnMain : styles.btnGhost}`} onClick={onComplete}>
            <Icon name="check" />
            {done ? "Training eintragen" : "Übung abschließen"}
          </button>
        </div>
      </div>
    </section>
  );
}
