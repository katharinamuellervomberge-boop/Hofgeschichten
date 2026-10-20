"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/illustrations/Icons";
import { useProgress } from "@/lib/progress/store";
import { hasLocalGermanVoice, hasRecording, speak, speechSupported, voiceEnabled, type Speech } from "@/lib/speech";
import styles from "./SpeakButton.module.css";

type Props = {
  text: Speech;
  /** Beschriftung für Screenreader */
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

/**
 * Lautsprecher-Knopf: spielt die Aufnahme zum Text ab (KI-Stimme) oder
 * nutzt ersatzweise die lokale Gerätestimme. Wird nur angezeigt, wenn
 * eins von beiden verfügbar und Vorlesen im Elternbereich eingeschaltet ist.
 */
export function SpeakButton({ text, label = "Vorlesen", size = "md", className }: Props) {
  const { settings } = useProgress();
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    if (!voiceEnabled || !speechSupported()) return;
    const check = () => setAvailable(hasLocalGermanVoice());
    check();
    window.speechSynthesis.addEventListener?.("voiceschanged", check);
    const t = window.setTimeout(check, 600);
    return () => {
      window.speechSynthesis.removeEventListener?.("voiceschanged", check);
      window.clearTimeout(t);
    };
  }, []);

  if (!voiceEnabled || !settings.speech || !(available || hasRecording(text))) return null;

  return (
    <button
      type="button"
      className={`${styles.btn} ${styles[size]} ${className ?? ""}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        speak(text);
      }}
      aria-label={label}
    >
      <Icon name="speaker" />
    </button>
  );
}
