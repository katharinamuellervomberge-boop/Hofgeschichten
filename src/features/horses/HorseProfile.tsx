"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Icon } from "@/components/illustrations/Icons";
import { HorsePortrait } from "@/components/illustrations/HorsePortrait";
import { NewStampNotice } from "@/components/ui/NewStampNotice";
import { PageHeader } from "@/components/ui/PageHeader";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { SpeakButton } from "@/components/ui/SpeakButton";
import type { Horse as HorseT } from "@/content/types";
import { progressActions } from "@/lib/progress/store";
import styles from "./HorseProfile.module.css";

export function HorseProfile({ horse }: { horse: HorseT }) {
  // Nach kurzem Anschauen gibt es den Freundschafts-Stempel
  useEffect(() => {
    const t = window.setTimeout(() => progressActions.visitHorse(horse.slug), 2500);
    return () => window.clearTimeout(t);
  }, [horse.slug]);

  return (
    <div className="page">
      <NewStampNotice />
      <PageHeader title={horse.name} spoken={horse.intro} backHref="/pferde" backLabel="Zurück zu den Pferden" />

      <article className={styles.profile}>
        <div className={styles.portrait} style={{ background: horse.tint }}>
          <HorsePortrait horse={horse} className={styles.horse} priority sizes="(min-width: 860px) 460px, 92vw" />
          {horse.lookIsPlaceholder && (
            <span className={styles.portraitBadge}>
              <PlaceholderBadge>Fellfarbe: Platzhalter</PlaceholderBadge>
            </span>
          )}
        </div>

        <Link href={`/pferde/${horse.slug}/entdecken`} className={styles.explore}>
          <span className={styles.exploreIcon} aria-hidden>
            <Icon name="star" />
          </span>
          <span className={styles.exploreText}>
            <strong>{horse.name} entdecken</strong>
            <span>Finde Ohren, Mähne, Huf und mehr</span>
          </span>
          <span className={styles.exploreGo} aria-hidden>
            <Icon name="play" />
          </span>
        </Link>

        <section className={styles.card} aria-labelledby="steckbrief">
          <h2 id="steckbrief" className={styles.cardTitle}>
            Steckbrief
          </h2>
          <dl className={styles.facts}>
            {horse.facts.map((f) => (
              <div key={f.label} className={styles.fact}>
                <dt>{f.label}</dt>
                <dd>{f.placeholder ? <PlaceholderBadge>{f.value}</PlaceholderBadge> : f.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className={styles.card} aria-labelledby="wissen">
          <h2 id="wissen" className={styles.cardTitle}>
            Pferdewissen
          </h2>
          <ul className={styles.knowledge}>
            {horse.knowledge.map((k) => (
              <li key={k}>
                <span>{k}</span>
                <SpeakButton text={k} size="sm" label="Vorlesen" />
              </li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  );
}
