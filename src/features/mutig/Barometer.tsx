"use client";

import { fearWord } from "./logic";
import styles from "./mutig.module.css";

/** Mut-Barometer 0–10 (Selbsteinschätzung, keine Diagnose) */
export function Barometer({ value, onChange, label }: { value: number | null; onChange: (v: number) => void; label: string }) {
  return (
    <div className={styles.barometer} role="group" aria-label={label}>
      <div className={styles.scale}>
        {Array.from({ length: 11 }, (_, i) => (
          <button key={i} type="button" aria-pressed={value === i} onClick={() => onChange(i)} aria-label={`${i} – ${fearWord(i)}`}>
            {i}
          </button>
        ))}
      </div>
      <div className={styles.scaleEnds}>
        <span>keine Angst</span>
        <span>sehr starke Angst</span>
      </div>
      <div className={styles.word} aria-live="polite">{fearWord(value)}</div>
    </div>
  );
}
