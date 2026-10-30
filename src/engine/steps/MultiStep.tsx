"use client";

import { useEngineTexts } from "@/engine/texts";
import { useMemo, useState } from "react";
import { Icon } from "@/components/illustrations/Icons";
import { speak } from "@/lib/speech";
import { forLevel, pick, type MultiStep as S } from "../types";
import { VisualView } from "../VisualView";
import { Feedback, NextButton, Prompt, useAutoSpeak, type StepProps } from "./shared";
import styles from "../engine.module.css";

/**
 * Mehrfachauswahl: Alle passenden Antworten antippen und dann prüfen.
 * Falsche Antworten werden erklärt und abgewählt – nie bestraft.
 */
export function MultiStep({ step, level, onDone }: StepProps<S>) {
  const tx = useEngineTexts();
  const options = useMemo(() => forLevel(step.options, level), [step.options, level]);
  const [chosen, setChosen] = useState<string[]>([]);
  const [ruledOut, setRuledOut] = useState<string[]>([]);
  const [solved, setSolved] = useState(false);
  const [msg, setMsg] = useState<{ text: string; tone: "good" | "hint" } | null>(null);
  const prompt = pick(step.prompt, level);
  useAutoSpeak(prompt, level);

  const toggle = (id: string) => {
    if (solved || ruledOut.includes(id)) return;
    setChosen((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));
    setMsg(null);
  };

  const check = () => {
    const wrong = options.filter((o) => !o.correct && chosen.includes(o.id));
    const missing = options.filter((o) => o.correct && !chosen.includes(o.id));
    if (wrong.length) {
      const text = wrong.map((o) => o.feedback ?? tx.notHere(o.label)).join(" ");
      setRuledOut((r) => [...r, ...wrong.map((o) => o.id)]);
      setChosen((c) => c.filter((id) => !wrong.some((o) => o.id === id)));
      setMsg({ text, tone: "hint" });
      speak(text);
      return;
    }
    if (missing.length) {
      const text = pick(step.missing, level);
      setMsg({ text, tone: "hint" });
      speak(text);
      return;
    }
    setSolved(true);
    const text = pick(step.explain, level);
    setMsg({ text, tone: "good" });
    speak(text);
  };

  return (
    <>
      <Prompt text={prompt} />
      {step.visual && (
        <div className={`${styles.choiceVisual} ${step.visual.kind === "scene" || step.visual.kind === "doc" ? styles.choiceVisualWide : ""}`}>
          <VisualView v={step.visual} />
        </div>
      )}
      <ul className={styles.options} role="group" aria-label={tx.multi}>
        {options.map((o) => {
          const on = chosen.includes(o.id) || (solved && o.correct);
          const out = ruledOut.includes(o.id);
          return (
            <li key={o.id}>
              <button
                type="button"
                className={`${styles.option} ${on ? styles.multiOn : ""} ${out ? styles.optionWrong : ""} ${solved && o.correct ? styles.optionRight : ""}`}
                onClick={() => toggle(o.id)}
                aria-pressed={on}
                disabled={out || (solved && !o.correct)}
              >
                <span className={styles.multiCheck} aria-hidden>
                  {on && <Icon name="check" />}
                </span>
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
      {!solved && (
        <button type="button" className={styles.checkBtn} onClick={check} disabled={chosen.length === 0}>
          {tx.check}
        </button>
      )}
      <Feedback text={msg?.text ?? null} tone={msg?.tone ?? "good"} />
      {solved && <NextButton onClick={() => onDone()} />}
    </>
  );
}
