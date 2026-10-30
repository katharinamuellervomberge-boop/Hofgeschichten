"use client";

import Link from "@/i18n/Link";
import { useEffect } from "react";
import { Icon } from "@/components/illustrations/Icons";
import { PageHeader } from "@/components/ui/PageHeader";
import type { AcademyGameInfo } from "@/content/akademie/types";
import type { Activity } from "@/engine/types";
import { ActivityPlayer } from "@/engine/ActivityPlayer";
import { VisualView } from "@/engine/VisualView";
import { progressActions } from "@/lib/progress/store";
import styles from "./akademie.module.css";
import { useLocale } from "@/i18n/LocaleProvider";

/** Rahmen für die Mini-Spiele der Reitakademie. */
export function AcademyGameScreen({ game, activity }: { game: AcademyGameInfo; activity: Activity }) {
  const en = useLocale() === "en";
  useEffect(() => {
    progressActions.setLast({ href: `/akademie/spiele/${game.slug}`, title: game.title, area: en ? "Riding Academy" : "Spielen" });
  }, [game.slug, game.title, en]);
  // Seit der Neustruktur stehen die Akademie-Spiele im Bereich „Spielen“ (englisch: in der Reitakademie, Modul Abschluss)
  const home = en
    ? { href: "/akademie/modul/abschluss", label: "Back to the academy finale", cta: "More exercises" }
    : { href: "/spielen", label: "Zurück zu Spielen", cta: "Weitere Spiele" };
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
            <h2 className={styles.doneTitle}>{en ? "Great job!" : "Super gespielt!"}</h2>
            <p className={styles.doneText}>
              {en ? `You've completed “${game.title}”. Want to try again?` : `Du hast „${game.title}“ geschafft. Willst du es noch einmal versuchen?`}
            </p>
            <div className={styles.actions}>
              <button type="button" className={styles.btn} onClick={replay}>
                <Icon name="replay" />
                {en ? "Again" : "Nochmal"}
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
