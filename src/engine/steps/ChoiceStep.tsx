"use client";

import { useMemo, useState } from "react";
import { speak } from "@/lib/speech";
import { phrases } from "@/lib/voice/phrases";
import { forLevel, pick, type ChoiceStep as S } from "../types";
import { VisualView } from "../VisualView";
import { Feedback, NextButton, Prompt, useAutoSpeak, type StepProps } from "./shared";
import styles from "../engine.module.css";

/** Multiple Choice mit Bildern oder Texten. Falsche Antworten geben einen Tipp, nie eine Strafe. */
export function ChoiceStep({ step, level, onDone }: StepProps<S>) {
  const options = useMemo(() => forLevel(step.options, level), [step.options, level]);
  const [wrong, setWrong] = useState<string[]>([]);
  const [solved, setSolved] = useState(false);
  const [msg, setMsg] = useState<{ text: string; tone: "good" | "hint" } | null>(null);
  const prompt = pick(step.prompt, level);
  const pictures = step.layout !== "list";
  // Antworten mit ganzen Szenen (z. B. Reitbahn-Figuren) bekommen große Bildkarten
  const sceneOptions = pictures && options.some((o) => o.visual?.kind === "scene");

  useAutoSpeak(pictures ? prompt : [prompt, ...options.map((o) => phrases.optionLabel(o.label))], level);

  const choose = (id: string) => {
    if (solved) return;
    const o = options.find((x) => x.id === id)!;
    if (o.correct) {
      setSolved(true);
      const text = pick(step.explain, level);
      setMsg({ text, tone: "good" });
      speak(text);
    } else {
      setWrong((w) => (w.includes(id) ? w : [...w, id]));
      const text = o.feedback ?? phrases.tryAgain;
      setMsg({ text, tone: "hint" });
      speak(text);
    }
  };

  return (
    <>
      <Prompt text={prompt} />
      {step.visual && (
        <div
          className={`${styles.choiceVisual} ${step.visual.kind === "scene" || step.visual.kind === "doc" ? styles.choiceVisualWide : ""}`}
        >
          <VisualView v={step.visual} />
        </div>
      )}
      <ul className={`${styles.options} ${pictures ? styles.optionsPictures : ""} ${sceneOptions ? styles.optionsScenes : ""}`}>
        {options.map((o) => {
          const isWrong = wrong.includes(o.id);
          const isRight = solved && o.correct;
          return (
            <li key={o.id}>
              <button
                type="button"
                className={`${styles.option} ${isWrong ? styles.optionWrong : ""} ${isRight ? styles.optionRight : ""}`}
                onClick={() => choose(o.id)}
                aria-pressed={isRight || undefined}
                disabled={solved && !o.correct}
              >
                {o.visual && (
                  <span className={styles.optionVisual}>
                    <VisualView v={o.visual} decorative />
                  </span>
                )}
                <span>{o.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <Feedback text={msg?.text ?? null} tone={msg?.tone ?? "good"} />
      {solved && <NextButton onClick={() => onDone(step.clue ? [step.clue] : undefined)} />}
    </>
  );
}
