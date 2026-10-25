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
import { Shelf } from "@/components/ui/Shelf";
import type { Release } from "@/content/membership";
import { site } from "@/content/site";
import { WeekCard, type WeekState } from "@/features/hofjahr/WeekCard";
import hofjahr from "@/features/hofjahr/hofjahr.module.css";
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

export type MemberGame = { release: Release; state: WeekState };

/**
 * Spiele: oben die kostenlosen Spiele der Hofwelt, darunter die Spiele für
 * Mitglieder (aus den Freitagsfolgen, Kategorie „Hofspiel“). Nie gemischt.
 */
export function GameOverview({ memberGames }: { memberGames: MemberGame[] }) {
  const progress = useProgress();
  const level = progress.settings.level ?? "leicht";
  return (
    <div className="page">
      <PageHeader title="Spiele" spoken={UI_SPEECH.gamesHeader} />
      <div className={styles.level}>
        <LevelSwitch />
      </div>
      <div className={styles.shelves}>
      <Shelf kind="gratis" id="spiele-gratis" title="Spiele der Hofwelt">
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
      </Shelf>

      {memberGames.length > 0 && (
        <Shelf kind="premium" id="spiele-mitglieder" title="Große Hofspiele" label={`Für ${site.clubName}-Mitglieder`} lead="Neue Spiele kommen jeden Monat dazu.">
          <ul className={hofjahr.weeks}>
            {memberGames.map((g) => (
              <li key={g.release.slug}>
                <WeekCard release={g.release} state={g.state} />
              </li>
            ))}
          </ul>
        </Shelf>
      )}
      </div>
    </div>
  );
}
