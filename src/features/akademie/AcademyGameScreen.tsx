"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Icon } from "@/components/illustrations/Icons";
import { PageHeader } from "@/components/ui/PageHeader";
import type { AcademyGameInfo } from "@/content/akademie/types";
import type { Activity } from "@/engine/types";
import { ActivityPlayer } from "@/engine/ActivityPlayer";
import { VisualView } from "@/engine/VisualView";
import { progressActions } from "@/lib/progress/store";
import styles from "./akademie.module.css";

/** Rahmen für die Mini-Spiele der Reitakademie. */
export function AcademyGameScreen({ game, activity }: { game: AcademyGameInfo; activity: Activity }) {
  useEffect(() => {
    progressActions.setLast({ href: `/akademie/spiele/${game.slug}`, title: game.title, area: "Spielen" });
  }, [game.slug, game.title]);
  // Seit der Neustruktur stehen die Akademie-Spiele im Bereich „Spielen“
  const home = { href: "/spielen", label: "Zurück zu Spielen", cta: "Weitere Spiele" };
  return (
    <div className="page">
      <PageHeader title={game.title} backHref={home.href} backLabel={home.label} />
      <ActivityPlayer
        activity={activity}
        tint={game.tint}
        introArt={<VisualView v={game.cover} />}
        onComplete={() => progressActions.completeGame(game.id)}
        renderDone={({ replay }) => (
          <div className={styles.done} role="status">
            <span className={styles.doneCheck} aria-hidden>
              <Icon name="star" />
            </span>
            <h2 className={styles.doneTitle}>Super gespielt!</h2>
            <p className={styles.doneText}>Du hast „{game.title}“ geschafft. Willst du es noch einmal versuchen?</p>
            <div className={styles.actions}>
              <button type="button" className={styles.btn} onClick={replay}>
                <Icon name="replay" />
                Nochmal
              </button>
              <Link href={home.href} className={`${styles.btn} ${styles.btnPrimary}`}>
                <Icon name="puzzle" />
                {home.cta}
              </Link>
            </div>
          </div>
        )}
      />
    </div>
  );
}
