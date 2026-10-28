"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { HorseHead } from "@/components/illustrations/HorseHead";
import { Icon } from "@/components/illustrations/Icons";
import { ItemIcon } from "@/components/illustrations/ItemIcons";
import { LevelSwitch } from "@/components/ui/LevelSwitch";
import { PageHeader } from "@/components/ui/PageHeader";
import { getAcademyGameInfo } from "@/content/akademie";
import { games } from "@/content/games";
import { horses } from "@/content/horses";
import { UI_SPEECH } from "@/content/ui-speech";
import { VisualView } from "@/engine/VisualView";
import { useProgress } from "@/lib/progress/store";
import styles from "./GameOverview.module.css";

/**
 * Spielen (seit 28.10.2026): bewusst keine große Spielebibliothek –
 * vier Lernspiele, die das Wissen aus der Reitakademie spielerisch vertiefen,
 * dazu ein paar kleine Wissens-Challenges. Alles aus vorhandenen Spielen.
 * Große Hofspiele für Mitglieder stehen jetzt in der Hofwelt.
 */

type Entry = {
  /** Fortschritts-ID (wie im Spielkern) */
  id: string;
  href: string;
  title: string;
  text: string;
  tint: string;
  art: ReactNode;
  /** gehört zur gekauften Reitakademie */
  academy?: boolean;
};

const free = (id: string) => games.find((g) => g.id === id);

function academyEntry(slug: string, title: string, text: string): Entry | null {
  const g = getAcademyGameInfo(slug);
  if (!g) return null;
  return {
    id: g.id,
    href: `/akademie/spiele/${g.slug}`,
    title,
    text,
    tint: g.tint,
    art: <VisualView v={g.cover} decorative />,
    academy: g.tier === "gross",
  };
}

function freeEntry(id: string, title: string, text: string, art: ReactNode): Entry | null {
  const g = free(id);
  return g ? { id: g.id, href: `/spielen/${g.id}`, title, text, tint: g.tint, art } : null;
}

const MAIN: Entry[] = [
  freeEntry(
    "was-braucht-ein-pferd",
    "Pferdewissen-Quiz",
    "Was braucht ein Pferd zum Glücklichsein?",
    <div className={styles.artItems}>
      <ItemIcon name="wasser" />
      <ItemIcon name="heu" />
      <ItemIcon name="karotte" />
    </div>,
  ),
  academyEntry("gangarten-quiz", "Gangarten erkennen", "Schritt, Trab oder Galopp – am Takt erkennen."),
  freeEntry(
    "pflegeprofi",
    "Pferdepflege-Spiel",
    "Striegel, Bürste, Hufkratzer: Was gehört wohin?",
    <div className={styles.artItems}>
      <ItemIcon name="striegel" />
      <ItemIcon name="buerste" />
      <ItemIcon name="hufkratzer" />
    </div>,
  ),
  academyEntry("hilfen-detektiv", "Reiterhilfen zuordnen", "Gewicht, Schenkel oder Zügel – welche Hilfe ist gemeint?"),
].filter((e): e is Entry => e !== null);

const CHALLENGES: Entry[] = [
  freeEntry("pferdesprache", "Pferdesprache", "Ohren, Augen, Nüstern lesen.", <HorseHead look={horses[2].look} mood="neugierig" className={styles.artHead} />),
  academyEntry("der-perfekte-reitersitz", "Der perfekte Sitz", "Finde die Fehler im Reitersitz."),
  academyEntry("bahnfiguren-meister", "Bahnfiguren-Meister", "Zirkel, Volte, Handwechsel."),
].filter((e): e is Entry => e !== null);

export function GameOverview({ academyUnlocked }: { academyUnlocked: boolean }) {
  const progress = useProgress();
  const played = (id: string) => (progress.games[id]?.completedCount ?? 0) > 0;
  const locked = (e: Entry) => !!e.academy && !academyUnlocked;

  return (
    <div className="page">
      <PageHeader title="Spielen & Wissen" spoken={UI_SPEECH.gamesHeader} />
      <div className={styles.level}>
        <LevelSwitch />
      </div>
      <div className={styles.shelves}>
        <ul className={styles.list}>
          {MAIN.map((e) => (
            <li key={e.id} className={styles.item}>
              <Link href={e.href} className={styles.card} style={{ background: e.tint }} aria-label={`${e.title}${locked(e) ? ", in der Reitakademie" : ""}`}>
                <div className={styles.art} aria-hidden>
                  {e.art}
                </div>
                <div className={styles.footer}>
                  <div>
                    <h2 className={styles.title}>{e.title}</h2>
                    <p className={styles.text}>{locked(e) ? "In der Reitakademie" : e.text}</p>
                  </div>
                  <span className={`${styles.go} ${played(e.id) ? styles.done : ""} ${locked(e) ? styles.lock : ""}`} aria-hidden>
                    <Icon name={locked(e) ? "lock" : played(e.id) ? "check" : "play"} />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <section aria-labelledby="challenges">
          <h2 id="challenges" className={styles.sectionTitle}>
            Kleine Wissens-Challenges
          </h2>
          <ul className={styles.rows}>
            {CHALLENGES.map((e) => (
              <li key={e.id}>
                <Link href={e.href} className={styles.row}>
                  <span className={styles.rowArt} style={{ background: e.tint }} aria-hidden>
                    {e.art}
                  </span>
                  <span>
                    <span className={styles.rowTitle}>{e.title}</span>
                    <span className={styles.rowText}>{locked(e) ? "In der Reitakademie" : e.text}</span>
                  </span>
                  <Icon name={locked(e) ? "lock" : played(e.id) ? "check" : "play"} className={styles.rowGo} aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <p className={styles.hint}>
          Mehr Abenteuer, Detektivfälle und die großen Hofspiele für Mitglieder findest du in der <Link href="/hofwelt">Hofwelt</Link>.
        </p>
      </div>
    </div>
  );
}
