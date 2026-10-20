"use client";

import { HorseHead } from "@/components/illustrations/HorseHead";
import { ItemIcon } from "@/components/illustrations/ItemIcons";
import { freeStamps } from "@/content/stamps";
import { getGame } from "@/content/games";
import { horses } from "@/content/horses";
import { GameScreen } from "./GameScreen";
import styles from "./GameOverview.module.css";

/** Ordnet einem Lernspiel seinen Stempel und sein Startbild zu. */
export function GameRoute({ id }: { id: string }) {
  const g = getGame(id);
  if (!g) return null;
  const stamp = freeStamps.find((s) => s.rule.type === "activity" && s.rule.id === g.id);
  const art =
    g.art === "ears" ? (
      <HorseHead look={horses[0].look} mood="neugierig" />
    ) : (
      <div className={styles.artItems}>
        <ItemIcon name={g.art === "care" ? "buerste" : "heu"} />
        <ItemIcon name={g.art === "care" ? "hufkratzer" : "wasser"} />
      </div>
    );
  return (
    <GameScreen
      activity={g.activity}
      stampId={stamp?.id ?? "hofheld"}
      backHref="/spielen"
      backLabel="Zurück zu den Spielen"
      tint={g.tint}
      introArt={art}
    />
  );
}
