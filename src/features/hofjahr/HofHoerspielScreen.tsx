"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/illustrations/Icons";
import { PageHeader } from "@/components/ui/PageHeader";
import type { Release } from "@/content/membership";
import type { Episode } from "@/content/types";
import { site } from "@/content/site";
import { AudioPlayer } from "@/features/listen/AudioPlayer";
import styles from "./hofjahr.module.css";

/** Hörspiel einer Freitagsveröffentlichung (nur Mitglieder, Datei kommt geschützt vom Server). */
export function HofHoerspielScreen({ release, episode }: { release: Release; episode: Episode }) {
  const [done, setDone] = useState(false);
  return (
    <div className="page">
      <PageHeader title={release.title} backHref="/hofjahr" backLabel={`Zu ${site.clubName}`}>
        Hörspiel · {release.dateLabel}
      </PageHeader>
      <div className={styles.stack}>
        <p className={styles.sectionLead}>{release.teaser}</p>
        <AudioPlayer episode={episode} onCompleted={() => setDone(true)} />
        {done && (
          <div className={styles.done} role="status">
            <span className={styles.lockIcon} aria-hidden>
              <Icon name="check" />
            </span>
            <h2 className={styles.doneTitle}>Fertig gehört!</h2>
            <p>Nächsten Freitag geht es auf dem Hof weiter.</p>
            <div className={styles.actions}>
              <Link href="/hofjahr" className={`${styles.btn} ${styles.btnPrimary}`}>
                <Icon name="star" />
                Zu {site.clubName}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
