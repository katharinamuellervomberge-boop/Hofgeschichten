"use client";

import Link from "next/link";
import { Icon } from "@/components/illustrations/Icons";
import { StampSeal } from "@/components/illustrations/StampSeal";
import { LevelSwitch } from "@/components/ui/LevelSwitch";
import { PageHeader } from "@/components/ui/PageHeader";
import { ACADEMY_TITLE, allLessons, worlds } from "@/content/akademie";
import { academyGames } from "@/content/akademie/spiele";
import { academyStamps, PROFI_STAMP_ID } from "@/content/akademie/stamps";
import { VisualView } from "@/engine/VisualView";
import { earnedStamps } from "@/lib/progress/stamps";
import { useProgress } from "@/lib/progress/store";
import { LearningPath, type PremiumState } from "./LearningPath";
import { academyDoneCount, lessonDone, worldHref } from "./progress";
import styles from "./akademie.module.css";

/** Startseite der kleinen Reitakademie: acht Lernwelten und vier Mini-Spiele. */
export function AcademyOverview({ premium = {} }: { premium?: Record<string, PremiumState> }) {
  const progress = useProgress();
  const earned = earnedStamps(progress);
  const stamps = academyStamps();
  const total = allLessons().length;
  const done = academyDoneCount(progress);
  const profi = earned.has(PROFI_STAMP_ID);

  return (
    <div className="page">
      <PageHeader title={ACADEMY_TITLE} backHref="/spielen" backLabel="Zurück zu den Spielen" />
      <div className={styles.stack}>
        <section className={styles.hero} aria-labelledby="ak-hero">
          <div className={styles.heroArt}>
            <VisualView v={{ kind: "scene", scene: "ak-reiter-sitz-linie" }} />
          </div>
          <div className={styles.heroBody}>
            <p className={styles.heroKicker}>Kostenlos für alle</p>
            <h2 id="ak-hero" className={styles.heroTitle}>
              {profi ? "Du bist Reitwissen-Profi!" : "Reiten verstehen – Schritt für Schritt"}
            </h2>
            <p className={styles.heroText}>
              Mit Lea, Mila und Ben lernst du, wie man sicher am Pferd ist, gut sitzt und fein mit dem Pferd spricht.
            </p>
            <ul className={styles.chips}>
              <li>8 Lernwelten</li>
              <li>{total} Lektionen</li>
              <li>4 Mini-Spiele</li>
            </ul>
            <div>
              <p className={styles.meterLabel}>
                {done} von {total} Lektionen geschafft
              </p>
              <div className={styles.meter} role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={done} aria-label="Fortschritt in der Reitakademie">
                <span style={{ width: `${(done / total) * 100}%` }} />
              </div>
            </div>
          </div>
        </section>

        <div className={styles.level}>
          <LevelSwitch />
        </div>

        <LearningPath premium={premium} />

        <section aria-labelledby="ak-welten">
          <h2 id="ak-welten" className={styles.sectionTitle}>
            Die acht Lernwelten
          </h2>
          <ul className={styles.worlds}>
            {worlds.map((w) => {
              const stamp = stamps.find((s) => s.id === w.badge.id)!;
              const has = earned.has(stamp.id);
              const count = w.lessons.filter((l) => lessonDone(progress, l)).length;
              return (
                <li key={w.id}>
                  <Link href={worldHref(w)} className={styles.worldCard} style={{ background: w.tint }} aria-label={`Lernwelt ${w.number}: ${w.title}, ${count} von ${w.lessons.length} Lektionen geschafft`}>
                    <div className={styles.thumb} aria-hidden>
                      <VisualView v={w.cover} decorative />
                    </div>
                    <div className={styles.worldBody}>
                      <span className={styles.worldNumber}>Lernwelt {w.number}</span>
                      <span className={styles.worldTitle}>{w.title}</span>
                      <span className={styles.worldTeaser}>{w.teaser}</span>
                      <span className={styles.dots} aria-hidden>
                        {w.lessons.map((l) => (
                          <span key={l.id} className={lessonDone(progress, l) ? styles.dotDone : undefined} />
                        ))}
                      </span>
                    </div>
                    <StampSeal stamp={stamp} earned={has} tilt={-6} className={styles.cardSeal} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section aria-labelledby="ak-spiele">
          <h2 id="ak-spiele" className={styles.sectionTitle}>
            Mini-Spiele
          </h2>
          <ul className={styles.games}>
            {academyGames.map((g) => {
              const played = (progress.games[g.id]?.completedCount ?? 0) > 0;
              return (
                <li key={g.id}>
                  <Link href={`/spielen/akademie/spiele/${g.slug}`} className={styles.gameCard} style={{ background: g.tint }}>
                    <div className={styles.gameArt} aria-hidden>
                      <VisualView v={g.cover} decorative />
                    </div>
                    <div className={styles.gameBody}>
                      <span className={styles.gameTitle}>{g.title}</span>
                      <span className={`${styles.go} ${played ? styles.goDone : ""}`} aria-hidden>
                        <Icon name={played ? "check" : "play"} />
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <p className={styles.note}>
          <Icon name="star" />
          <span>
            Dein Lernfortschritt wird nur auf diesem Gerät gespeichert. Wenn du ein anderes Gerät nimmst oder die Browserdaten
            gelöscht werden, kann er verloren gehen.
          </span>
        </p>
        <p className={styles.disclaimer}>
          Die Reitakademie vermittelt Wissen rund ums Reiten. Reiten selbst lernst du im Unterricht mit einer qualifizierten
          Reitlehrerin oder einem Reitlehrer.
        </p>
      </div>
    </div>
  );
}
