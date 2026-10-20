"use client";

import { Icon } from "@/components/illustrations/Icons";
import { LEVELS } from "@/engine/types";
import { progressActions, useProgress } from "@/lib/progress/store";
import { speak } from "@/lib/speech";
import { phrases } from "@/lib/voice/phrases";
import styles from "./LevelSwitch.module.css";

/**
 * Schwierigkeitswahl: Leicht (4–6) / Mittel (7–9).
 * Sterne statt Text, damit auch Kinder ohne Lesefähigkeit wählen können.
 */
export function LevelSwitch({ compact }: { compact?: boolean }) {
  const { settings } = useProgress();
  const current = settings.level ?? "leicht";
  return (
    <div className={`${styles.wrap} ${compact ? styles.compact : ""}`} role="radiogroup" aria-label="Schwierigkeit">
      {LEVELS.map((l) => {
        const active = current === l.id;
        return (
          <button
            key={l.id}
            type="button"
            role="radio"
            aria-checked={active}
            className={`${styles.option} ${active ? styles.active : ""}`}
            onClick={() => {
              progressActions.setLevel(l.id);
              speak(phrases.level(l.label, l.ages));
            }}
          >
            <span className={styles.stars} aria-hidden>
              {Array.from({ length: l.stars }, (_, i) => (
                <Icon key={i} name="star" />
              ))}
            </span>
            <span className={styles.label}>{l.label}</span>
            <span className={styles.ages}>{l.ages}</span>
          </button>
        );
      })}
    </div>
  );
}
