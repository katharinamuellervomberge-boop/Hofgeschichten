"use client";

import { useMemo, useState } from "react";
import { CipherGlyph } from "@/components/illustrations/CipherGlyph";
import { speak } from "@/lib/speech";
import { phrases } from "@/lib/voice/phrases";
import { pick, type CipherStep as S } from "../types";
import { Feedback, NextButton, Prompt, useAutoSpeak, type StepProps } from "./shared";
import styles from "../engine.module.css";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

/**
 * Geheimschrift entziffern.
 * 1. Zeichen in der Nachricht antippen  2. Buchstaben im Schlüssel antippen.
 * Ein richtiger Buchstabe füllt alle gleichen Zeichen aus – so wird die
 * Nachricht mit jedem Treffer schneller lesbar.
 */
export function CipherStep({ step, level, onDone }: StepProps<S>) {
  const words = useMemo(() => step.message.toUpperCase().split(/\s+/).filter(Boolean), [step.message]);
  const letters = useMemo(() => Array.from(new Set(words.join(""))), [words]);
  const [solved, setSolved] = useState<string[]>(() =>
    (step.given ?? "").toUpperCase().split("").filter((c) => letters.includes(c)),
  );
  const firstOpen = (s: string[]) => {
    for (let w = 0; w < words.length; w++)
      for (let i = 0; i < words[w].length; i++) if (!s.includes(words[w][i])) return `${w}-${i}`;
    return null;
  };
  const [selected, setSelected] = useState<string | null>(() => firstOpen(solved));
  const [wrongKey, setWrongKey] = useState<string | null>(null);
  const [msg, setMsg] = useState<{ text: string; tone: "good" | "hint" } | null>(null);
  const prompt = pick(step.prompt, level);
  useAutoSpeak(prompt, level);

  const complete = letters.every((l) => solved.includes(l));
  const selectedLetter = selected ? words[Number(selected.split("-")[0])][Number(selected.split("-")[1])] : null;

  const choose = (key: string) => {
    if (complete) return;
    if (!selectedLetter) {
      setMsg({ text: phrases.cipherPick, tone: "hint" });
      speak(phrases.cipherPick);
      return;
    }
    if (key === selectedLetter) {
      const next = [...solved, key];
      setSolved(next);
      setWrongKey(null);
      setSelected(firstOpen(next));
      if (letters.every((l) => next.includes(l))) {
        const text = pick(step.success, level);
        setMsg({ text, tone: "good" });
        speak(text);
      } else {
        const text = phrases.cipherRight(key);
        setMsg({ text, tone: "good" });
        speak(text);
      }
    } else {
      setWrongKey(key);
      const parts = [phrases.cipherWrong(key), pick(step.hint, level)];
      setMsg({ text: parts.join(" "), tone: "hint" });
      speak(parts);
    }
  };

  return (
    <>
      <Prompt text={prompt} />

      <div className={styles.cipherNote} role="group" aria-label="Geheime Nachricht">
        {words.map((w, wi) => (
          <span key={wi} className={styles.cipherWord}>
            {w.split("").map((ch, ci) => {
              const id = `${wi}-${ci}`;
              const known = solved.includes(ch);
              const isSel = selected === id;
              return (
                <button
                  key={id}
                  type="button"
                  className={`${styles.cipherCell} ${known ? styles.cipherCellKnown : ""} ${isSel ? styles.cipherCellSelected : ""}`}
                  onClick={() => {
                    if (known || complete) return;
                    setSelected(id);
                    setWrongKey(null);
                  }}
                  aria-pressed={isSel}
                  aria-label={known ? `Buchstabe ${ch}` : `Zeichen ${ci + 1} im Wort ${wi + 1}, noch offen${isSel ? ", ausgewählt" : ""}`}
                >
                  <CipherGlyph letter={ch} className={styles.cipherGlyph} />
                  <span className={styles.cipherLetter}>{known ? ch : ""}</span>
                </button>
              );
            })}
          </span>
        ))}
      </div>

      {!complete && (
        <div className={styles.cipherKey}>
          <p className={styles.cipherKeyTitle}>Die Geheimschrift der Stallmeister</p>
          <ul className={styles.cipherKeyList}>
            {ALPHABET.map((k) => (
              <li key={k}>
                <button
                  type="button"
                  className={`${styles.cipherKeyBtn} ${wrongKey === k ? styles.cipherKeyWrong : ""}`}
                  onClick={() => choose(k)}
                  aria-label={`Buchstabe ${k}`}
                >
                  <CipherGlyph letter={k} className={styles.cipherKeyGlyph} />
                  <span>{k}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Feedback text={msg?.text ?? null} tone={msg?.tone ?? "good"} />
      {complete && <NextButton onClick={() => onDone(step.clue ? [step.clue] : undefined)} />}
    </>
  );
}
