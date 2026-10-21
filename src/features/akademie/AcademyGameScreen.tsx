"use client";

import Link from "next/link";
import { Icon } from "@/components/illustrations/Icons";
import { PageHeader } from "@/components/ui/PageHeader";
import { getAcademyGame } from "@/content/akademie/spiele";
import { ActivityPlayer } from "@/engine/ActivityPlayer";
import { VisualView } from "@/engine/VisualView";
import { progressActions } from "@/lib/progress/store";
import styles from "./akademie.module.css";

/** Rahmen für die Mini-Spiele der Reitakademie. */
export function AcademyGameScreen({ slug }: { slug: string }) {
  const game = getAcademyGame(slug);
  if (!game) return null;
  return (
    <div className="page">
      <PageHeader title={game.title} backHref="/spielen/akademie" backLabel="Zurück zur Reitakademie" />
      <ActivityPlayer
        activity={game.activity}
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
              <Link href="/spielen/akademie" className={`${styles.btn} ${styles.btnPrimary}`}>
                <Icon name="puzzle" />
                Zur Reitakademie
              </Link>
            </div>
          </div>
        )}
      />
    </div>
  );
}
