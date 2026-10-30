"use client";

import { useEngineTexts } from "@/engine/texts";
import { useEffect } from "react";
import { Icon } from "@/components/illustrations/Icons";
import { SpeakButton } from "@/components/ui/SpeakButton";
import { speak, type Speech } from "@/lib/speech";
import type { Level } from "../types";
import styles from "../engine.module.css";

export type StepProps<S> = {
  step: S;
  level: Level;
  /** Schritt abgeschlossen; optional gefundene Hinweise */
  onDone: (clues?: string[]) => void;
};

/** In Stufe „Leicht“ wird die Aufgabe beim Erscheinen vorgelesen. */
export function useAutoSpeak(text: Speech, level: Level) {
  useEffect(() => {
    if (level !== "leicht") return;
    const t = window.setTimeout(() => speak(text), 250);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(text), level]);
}

export function Prompt({ text }: { text: string }) {
  return (
    <div className={styles.prompt}>
      <p className={styles.promptText}>{text}</p>
      <SpeakButton text={text} size="sm" />
    </div>
  );
}

export function Feedback({ text, tone }: { text: string | null; tone: "good" | "hint" }) {
  return (
    <p
      className={`${styles.feedback} ${text ? (tone === "good" ? styles.feedbackGood : styles.feedbackHint) : ""}`}
      aria-live="polite"
      key={text ?? "empty"}
    >
      {text}
    </p>
  );
}

export function NextButton({ onClick, label }: { onClick: () => void; label?: string }) {
  const t = useEngineTexts();
  return (
    <button type="button" className={styles.next} onClick={onClick}>
      {label ?? t.next}
      <Icon name="back" />
    </button>
  );
}
