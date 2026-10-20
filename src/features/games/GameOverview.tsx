"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { HorseHead } from "@/components/illustrations/HorseHead";
import { Icon } from "@/components/illustrations/Icons";
import { ItemIcon } from "@/components/illustrations/ItemIcons";
import { LevelSwitch } from "@/components/ui/LevelSwitch";
import { PageHeader } from "@/components/ui/PageHeader";
import { SpeakButton } from "@/components/ui/SpeakButton";
import { games } from "@/content/games";
import { horses } from "@/content/horses";
import type { GameInfo } from "@/content/types";
import { pick } from "@/engine/types";
import { useProgress } from "@/lib/progress/store";
import { phrases } from "@/lib/voice/phrases";
import { UI_SPEECH } from "@/content/ui-speech";
import styles from "./GameOverview.module.css";

const ART: Record<GameInfo["art"], ReactNode> = {
  care: (
    <div className={styles.artItems}>
      <ItemIcon name="striegel" />
      <ItemIcon name="buerste" />
      <ItemIcon name="hufkratzer" />
    </div>
  ),
  quiz: (
    <div className={styles.artItems}>
      <ItemIcon name="wasser" />
      <ItemIcon name="heu" />
      <ItemIcon name="karotte" />
    </div>
  ),
  ears: <HorseHead look={horses[2].look} mood="neugierig" className={styles.artHead} />,
};

export function GameOverview() {
  const progress = useProgress();
  const level = progress.settings.level ?? "leicht";
  return (
    <div className="page">
      <PageHeader title="Spielen" spoken={UI_SPEECH.gamesHeader} />
      <div className={styles.level}>
        <LevelSwitch />
      </div>
      <ul className={styles.list}>
        {games.map((g) => {
          const done = (progress.games[g.id]?.completedCount ?? 0) > 0;
          return (
            <li key={g.id} className={styles.item}>
              <Link href={`/spielen/${g.id}`} className={styles.card} style={{ background: g.tint }}>
                <div className={styles.art}>{ART[g.art]}</div>
                <div className={styles.footer}>
                  <h2 className={styles.title}>{g.title}</h2>
                  <span className={`${styles.go} ${done ? styles.done : ""}`} aria-hidden>
                    <Icon name={done ? "check" : "play"} />
                  </span>
                </div>
              </Link>
              <SpeakButton
                text={phrases.gameTile(g.title, pick(g.activity.intro, level))}
                size="sm"
                label={`${g.title} vorlesen`}
                className={styles.speak}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
