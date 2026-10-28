"use client";

import Link from "next/link";
import { Horse } from "@/components/illustrations/Horse";
import { Icon } from "@/components/illustrations/Icons";
import { PageHeader } from "@/components/ui/PageHeader";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { getHorse } from "@/content/horses";
import type { Episode } from "@/content/types";
import { useProgress } from "@/lib/progress/store";
import styles from "./EpisodeLibrary.module.css";

export function EpisodeLibrary({ episodes }: { episodes: Episode[] }) {
  const progress = useProgress();

  return (
    <div className="page">
      <PageHeader title="Hörspiele" backHref="/hofwelt" backLabel="Zur Hofwelt" spoken="Hörspiele. Tippe auf eine Folge, um sie zu hören." />
      <ul className={styles.list}>
        {episodes.map((ep) => {
          const horse = getHorse(ep.horse);
          const p = progress.episodes[ep.slug];
          const pct = p && !p.completed ? Math.min(100, (p.position / ep.durationSeconds) * 100) : 0;
          return (
            <li key={ep.slug}>
              <Link href={`/hoeren/${ep.slug}`} className={styles.card} style={{ background: ep.coverTint }}>
                <div className={styles.cover}>
                  <span className={styles.number} aria-hidden>
                    {ep.number}
                  </span>
                  {horse && <Horse look={horse.look} uid={`ep-${ep.slug}`} className={styles.horse} />}
                </div>
                <div className={styles.body}>
                  <div className={styles.meta}>
                    <span>Folge {ep.number}</span>
                    {ep.status === "placeholder" && <PlaceholderBadge />}
                  </div>
                  <h2 className={styles.title}>{ep.title}</h2>
                  <p className={styles.teaser}>{ep.teaser}</p>
                  {pct > 0 && (
                    <div className={styles.progress} aria-label="Angefangen">
                      <span style={{ width: `${pct}%` }} />
                    </div>
                  )}
                </div>
                <span className={`${styles.playIcon} ${p?.completed ? styles.done : ""}`} aria-hidden>
                  <Icon name={p?.completed ? "check" : "play"} />
                </span>
                {p?.completed && <span className="visually-hidden">Schon gehört</span>}
              </Link>
            </li>
          );
        })}
      </ul>
      <p className={styles.note}>
        Weitere Folgen erscheinen nach und nach. Die Folgen in dieser Demo sind Platzhalter mit einer kurzen Melodie.
      </p>
    </div>
  );
}
