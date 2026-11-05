"use client";

import type { ReactNode } from "react";
import { KidPortrait } from "@/components/illustrations/KidPortrait";
import { PersonPortrait } from "@/components/illustrations/PersonPortrait";
import { getCharacter } from "@/content/characters";
import { PHASES } from "@/content/hoftag/day";
import type { SpeakerId, StatKey, Stats, TimeOfDay } from "@/content/hoftag/types";
import { getPerson } from "@/content/people";
import { STAT_COLOR, STAT_LABEL, StatIcon, TimeIcon, UiIcon } from "./HoftagIcons";
import styles from "./hoftag.module.css";

export const SPEAKER_NAME: Record<SpeakerId, string> = {
  hanna: "Hanna",
  wilhelm: "Wilhelm",
  tilda: "Tilda",
  mats: "Mats",
  kruemel: "Krümel",
  lea: "Lea",
  mila: "Mila",
  ben: "Ben",
};

export function SpeakerFace({ who, className }: { who: SpeakerId; className?: string }) {
  if (who === "kruemel") {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- statische WebP-Dateien mit srcset, kein Bildserver nötig
      <img
        src="/kids/kruemel-160.webp"
        srcSet="/kids/kruemel-160.webp 160w, /kids/kruemel-320.webp 320w"
        sizes="72px"
        width={160}
        height={160}
        alt="Krümel, der Hofhund"
        className={className}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    );
  }
  const person = getPerson(who);
  if (person) return <PersonPortrait person={person} className={className} sizes="72px" />;
  const kid = getCharacter(who);
  if (kid) return <KidPortrait kid={kid} className={className} sizes="72px" />;
  return null;
}

/** Figur mit Sprechblase */
export function Speech({ who, children }: { who?: SpeakerId; children: ReactNode }) {
  return (
    <div className={styles.speech}>
      {who && <SpeakerFace who={who} className={styles.face} />}
      <div className={styles.bubble}>
        {who && <span className={styles.bubbleName}>{SPEAKER_NAME[who]}</span>}
        <div>{children}</div>
      </div>
    </div>
  );
}

/** Tagesanzeige: Morgen → Vormittag → Mittag → Nachmittag → Abend */
export function TimeBar({ current, finished }: { current: TimeOfDay; finished?: boolean }) {
  const idx = PHASES.findIndex((p) => p.id === current);
  return (
    <ol className={styles.timebar} aria-label="Tagesablauf">
      {PHASES.map((p, i) => {
        const state = finished || i < idx ? "done" : i === idx ? "now" : "later";
        return (
          <li key={p.id} className={`${styles.timeStep} ${styles[`time_${state}`]}`} aria-current={state === "now" ? "step" : undefined}>
            <span className={styles.timeDot}>
              <TimeIcon time={p.id} />
            </span>
            <span className={styles.timeLabel}>{p.label}</span>
          </li>
        );
      })}
    </ol>
  );
}

const STAT_ORDER: StatKey[] = ["wohl", "wasser", "futter", "pflege", "bewegung", "vertrauen"];

export function StatGrid({ stats, compact }: { stats: Stats; compact?: boolean }) {
  return (
    <ul className={`${styles.stats} ${compact ? styles.statsCompact : ""}`} aria-label="So geht es deinem Pferd">
      {STAT_ORDER.map((k) => (
        <li key={k} className={styles.stat}>
          <StatIcon stat={k} className={styles.statIcon} />
          <span className={styles.statBody}>
            <span className={styles.statLabel}>{STAT_LABEL[k]}</span>
            <span className={styles.statTrack} role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={stats[k]} aria-label={STAT_LABEL[k]}>
              <span className={styles.statFill} style={{ width: `${stats[k]}%`, background: STAT_COLOR[k] }} />
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Rückmeldung nach einer Antwort */
export function Feedback({ ok, children }: { ok: boolean; children: ReactNode }) {
  return (
    <div className={`${styles.feedback} ${ok ? styles.feedbackOk : styles.feedbackTry}`} role="status">
      <UiIcon name={ok ? "sparkle" : "bulb"} className={styles.feedbackIcon} />
      <p>{children}</p>
    </div>
  );
}

export function Btn({
  children,
  onClick,
  variant = "primary",
  disabled,
  icon = true,
}: {
  children: ReactNode;
  onClick: () => void;
  variant?: "primary" | "ghost" | "gold";
  disabled?: boolean;
  icon?: boolean;
}) {
  return (
    <button type="button" className={`${styles.btn} ${styles[`btn_${variant}`]}`} onClick={onClick} disabled={disabled}>
      <span>{children}</span>
      {icon && <UiIcon name="arrow" className={styles.btnIcon} />}
    </button>
  );
}
