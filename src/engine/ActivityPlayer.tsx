"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Icon } from "@/components/illustrations/Icons";
import { LevelSwitch } from "@/components/ui/LevelSwitch";
import { useProgress } from "@/lib/progress/store";
import { speak, stopSpeaking } from "@/lib/speech";
import { ChoiceStep } from "./steps/ChoiceStep";
import { CipherStep } from "./steps/CipherStep";
import { CodeStep } from "./steps/CodeStep";
import { HotspotStep } from "./steps/HotspotStep";
import { MatchStep } from "./steps/MatchStep";
import { MultiStep } from "./steps/MultiStep";
import { StoryStep } from "./steps/StoryStep";
import { forLevel, pick, type Activity, type Level, type Step } from "./types";
import styles from "./engine.module.css";

type Props = {
  activity: Activity;
  /** Bild auf dem Startbildschirm */
  introArt?: ReactNode;
  tint?: string;
  /** Missionen starten direkt (ohne Startbildschirm) */
  autoStart?: boolean;
  /** Wird beim Abschluss aufgerufen – hier wird der Fortschritt gespeichert. */
  onComplete: (result: { clues: string[]; level: Level }) => void;
  /** Inhalt des Abschlussbildschirms */
  renderDone: (api: { replay: () => void }) => ReactNode;
  /** Wird bei jedem neu gefundenen Hinweis aufgerufen (für das Detektivbuch) */
  onClues?: (clues: string[]) => void;
  /** Feste Stufe (z. B. Fälle nur für 7–9): Stufenwahl wird ausgeblendet */
  fixedLevel?: Level;
  /** Altershinweis statt Stufenwahl, z. B. „Für Detektive ab 7 Jahren“ */
  ageNote?: string;
};

function renderStep(step: Step, level: Level, onDone: (clues?: string[]) => void) {
  switch (step.type) {
    case "story":
      return <StoryStep step={step} level={level} onDone={onDone} />;
    case "hotspots":
      return <HotspotStep step={step} level={level} onDone={onDone} />;
    case "choice":
      return <ChoiceStep step={step} level={level} onDone={onDone} />;
    case "match":
      return <MatchStep step={step} level={level} onDone={onDone} />;
    case "code":
      return <CodeStep step={step} level={level} onDone={onDone} />;
    case "cipher":
      return <CipherStep step={step} level={level} onDone={onDone} />;
    case "multi":
      return <MultiStep step={step} level={level} onDone={onDone} />;
  }
}

/** Spielt eine Activity Schritt für Schritt ab – für Lernspiele und Missionen. */
export function ActivityPlayer({ activity, introArt, tint, autoStart, onComplete, renderDone, onClues, fixedLevel, ageNote }: Props) {
  const { settings } = useProgress();
  const chosenLevel: Level = fixedLevel ?? settings.level ?? "leicht";
  const [phase, setPhase] = useState<"intro" | "play" | "done">(autoStart ? "play" : "intro");
  const [runLevel, setRunLevel] = useState<Level>(chosenLevel);
  const [index, setIndex] = useState(0);
  const [run, setRun] = useState(0);
  const [clues, setClues] = useState<string[]>([]);

  const steps = useMemo(() => forLevel(activity.steps, runLevel), [activity.steps, runLevel]);

  const start = () => {
    stopSpeaking();
    setRunLevel(chosenLevel);
    setIndex(0);
    setClues([]);
    setRun((r) => r + 1);
    setPhase("play");
  };

  const stepDone = (found?: string[]) => {
    const merged = found?.length ? [...clues, ...found.filter((c) => !clues.includes(c))] : clues;
    if (found?.length) {
      setClues(merged);
      onClues?.(found);
    }
    if (index + 1 >= steps.length) {
      onComplete({ clues: [...merged, ...(activity.awardsClues ?? [])], level: runLevel });
      setPhase("done");
    } else {
      setIndex(index + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (phase === "intro") {
    const introText = pick(activity.intro, chosenLevel);
    return (
      <div className={styles.intro} style={{ background: tint ?? "var(--sand-light)" }}>
        {introArt && <div className={styles.introArt}>{introArt}</div>}
        {fixedLevel ? ageNote && <p className={styles.ageNote}>{ageNote}</p> : <LevelSwitch compact />}
        <button
          type="button"
          className={styles.startBtn}
          onClick={() => {
            start();
            speak(introText);
          }}
          aria-label="Spiel starten"
        >
          <Icon name="play" />
        </button>
        <p className={styles.introText}>{introText}</p>
      </div>
    );
  }

  if (phase === "done") {
    return <>{renderDone({ replay: start })}</>;
  }

  const step = steps[Math.min(index, steps.length - 1)];
  const pct = ((index + 1) / steps.length) * 100;

  return (
    <div className={styles.player}>
      <div className={styles.progress}>
        <div
          className={styles.progressTrack}
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={steps.length}
          aria-valuenow={index + 1}
          aria-label="Fortschritt"
        >
          <div className={styles.progressFill} style={{ width: `${pct}%` }} />
        </div>
        <span className={styles.progressLabel}>
          {index + 1} / {steps.length}
        </span>
      </div>
      <div key={`${run}-${step.id}`} className={styles.player} data-step={step.type}>
        {renderStep(step, runLevel, stepDone)}
      </div>
    </div>
  );
}
