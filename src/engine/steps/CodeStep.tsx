"use client";

import { usePhrases } from "@/engine/texts";
import { useState } from "react";
import { Icon } from "@/components/illustrations/Icons";
import { SpeakButton } from "@/components/ui/SpeakButton";
import { speak } from "@/lib/speech";
import { ORDINALS } from "@/lib/voice/phrases";
import { pick, type CodeStep as S } from "../types";
import { VisualView } from "../VisualView";
import { Feedback, NextButton, Prompt, useAutoSpeak, type StepProps } from "./shared";
import styles from "../engine.module.css";

const ORDINAL = ORDINALS;

/** Zahlenschloss: jede Ziffer hat ein eigenes Rätsel. Falsche Ziffern bekommen einen gezielten Tipp. */
export function CodeStep({ step, level, onDone }: StepProps<S>) {
  const ph = usePhrases();
  const [values, setValues] = useState<number[]>(() => step.digits.map(() => 0));
  const [wrongIdx, setWrongIdx] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState<{ text: string; tone: "good" | "hint" } | null>(null);
  const prompt = pick(step.prompt, level);
  useAutoSpeak(prompt, level);

  const change = (i: number, delta: number) => {
    if (open) return;
    setValues((v) => v.map((x, k) => (k === i ? (x + delta + 10) % 10 : x)));
    setWrongIdx(null);
  };

  const check = () => {
    const idx = step.digits.findIndex((d, i) => pick(d.answer, level) !== values[i]);
    if (idx === -1) {
      setOpen(true);
      const text = pick(step.success, level);
      setMsg({ text, tone: "good" });
      speak(text);
    } else {
      setWrongIdx(idx);
      const parts = [ph.digitWrong(idx), pick(step.digits[idx].hint, level)];
      setMsg({ text: parts.join(" "), tone: "hint" });
      speak(parts);
    }
  };

  return (
    <>
      <Prompt text={prompt} />

      <ol className={styles.riddles}>
        {step.digits.map((d, i) => {
          const riddle = pick(d.riddle, level);
          const visual = d.visual ? pick(d.visual, level) : undefined;
          return (
            <li key={i} className={styles.riddle}>
              <span className={styles.riddleNo} aria-hidden>
                {i + 1}
              </span>
              <span className={styles.riddleText}>{riddle}</span>
              {visual && (
                <span className={styles.riddleVisual}>
                  <VisualView v={visual} decorative />
                </span>
              )}
              <SpeakButton text={[ph.digitLabel(i), riddle]} size="sm" />
            </li>
          );
        })}
      </ol>

      <div className={`${styles.lock} ${open ? styles.lockOpen : ""}`}>
        <Icon name="lock" width={40} height={40} aria-hidden />
        <div className={styles.dials} role="group" aria-label="Zahlenschloss">
          {values.map((v, i) => (
            <div key={i} className={styles.dial}>
              <button type="button" className={styles.dialBtn} onClick={() => change(i, 1)} aria-label={`${ORDINAL[i]} Zahl größer`}>
                +
              </button>
              <output className={`${styles.dialValue} ${wrongIdx === i ? styles.dialWrong : ""}`} aria-live="polite" aria-label={`${ORDINAL[i]} Zahl: ${v}`}>
                {v}
              </output>
              <button type="button" className={styles.dialBtn} onClick={() => change(i, -1)} aria-label={`${ORDINAL[i]} Zahl kleiner`}>
                −
              </button>
            </div>
          ))}
        </div>
        {!open && (
          <button type="button" className={styles.checkBtn} onClick={check}>
            Schloss öffnen
          </button>
        )}
      </div>

      <Feedback text={msg?.text ?? null} tone={msg?.tone ?? "good"} />
      {open && <NextButton onClick={() => onDone()} />}
    </>
  );
}
