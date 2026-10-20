"use client";

import { Horse } from "@/components/illustrations/Horse";
import { KidPortrait } from "@/components/illustrations/KidPortrait";
import { NewStampNotice } from "@/components/ui/NewStampNotice";
import { PageHeader } from "@/components/ui/PageHeader";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { getCharacter } from "@/content/characters";
import { getHorse } from "@/content/horses";
import type { Episode } from "@/content/types";
import { AudioPlayer } from "./AudioPlayer";
import styles from "./EpisodeScreen.module.css";

export function EpisodeScreen({ episode }: { episode: Episode }) {
  const horse = getHorse(episode.horse);
  const kids = episode.characters.map(getCharacter).filter((c) => c !== undefined);

  return (
    <div className="page">
      <NewStampNotice />
      <PageHeader
        title={`Folge ${episode.number}`}
        spoken={`Folge ${episode.number}. Drücke auf den großen Knopf, um zu hören.`}
        backHref="/hoeren"
        backLabel="Zurück zu den Hörspielen"
      />

      <div className={styles.layout}>
        <div className={styles.cover} style={{ background: episode.coverTint }}>
          {horse && <Horse look={horse.look} uid={`cover-${episode.slug}`} className={styles.horse} />}
          <div className={styles.kids}>
            {kids.map((k) => (
              <KidPortrait key={k.slug} kid={k} className={styles.kid} />
            ))}
          </div>
        </div>

        <div className={styles.info}>
          {episode.status === "placeholder" && (
            <div>
              <PlaceholderBadge>Platzhalter-Folge</PlaceholderBadge>
            </div>
          )}
          <h2 className={styles.title}>{episode.title}</h2>
          <p className={styles.teaser}>{episode.teaser}</p>
          <p className={styles.cast}>
            Mit {[horse?.name, ...kids.map((k) => k.name)].filter(Boolean).join(", ")}
          </p>
          <AudioPlayer episode={episode} />
        </div>
      </div>
    </div>
  );
}
