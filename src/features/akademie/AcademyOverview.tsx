"use client";

import Link from "next/link";
import { Icon } from "@/components/illustrations/Icons";
import { StampSeal } from "@/components/illustrations/StampSeal";
import { LevelSwitch } from "@/components/ui/LevelSwitch";
import { PageHeader } from "@/components/ui/PageHeader";
import { Shelf, ShelfLabel } from "@/components/ui/Shelf";
import { ACADEMY_TIERS, ACADEMY_TITLE, allLessons, gamesOf, worldsOf } from "@/content/akademie";
import { academyStamps, PROFI_STAMP_ID } from "@/content/akademie/stamps";
import type { AcademyGameInfo, AcademyTier, AcademyWorldInfo } from "@/content/akademie/types";
import type { Release } from "@/content/membership";
import { site } from "@/content/site";
import { VisualView } from "@/engine/VisualView";
import { earnedStamps } from "@/lib/progress/stamps";
import { useProgress } from "@/lib/progress/store";
import { academyDoneCount, lessonDone, worldHref } from "./progress";
import styles from "./akademie.module.css";

/* ---------- /akademie: zwei Türen ---------- */

/** Startseite der Reitakademie: links die Kleine (gratis), rechts die Große Akademie. */
export function AcademyHome({ unlocked }: { unlocked: boolean }) {
  const progress = useProgress();
  const profi = earnedStamps(progress).has(PROFI_STAMP_ID);
  const total = allLessons().length;
  const done = academyDoneCount(progress);
  const klein = { worlds: worldsOf("klein"), games: gamesOf("klein") };
  const gross = { worlds: worldsOf("gross"), games: gamesOf("gross") };
  const count = (ws: AcademyWorldInfo[]) => ws.reduce((n, w) => n + w.lessons.length, 0);

  return (
    <div className="page">
      <PageHeader
        title={ACADEMY_TITLE}
        spoken="Die Reitakademie. Hier lernst du alles übers Reiten. Die kleine Akademie ist für alle. Die große Akademie hat noch viel mehr."
      />
      <div className={styles.stack}>
        <p className={styles.intro}>
          {profi
            ? "Du bist Reitwissen-Profi! Du kannst alles jederzeit wiederholen."
            : "Mit Lea, Mila und Ben lernst du, wie man sicher am Pferd ist, gut sitzt und fein mit dem Pferd spricht."}
        </p>
        {done > 0 && (
          <div>
            <p className={styles.meterLabel}>
              {done} von {total} Lektionen geschafft
            </p>
            <div className={styles.meter} role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={done} aria-label="Fortschritt in der Reitakademie">
              <span style={{ width: `${(done / total) * 100}%` }} />
            </div>
          </div>
        )}

        <div className={styles.doors}>
          <Link href={ACADEMY_TIERS.klein.href} className={styles.teaser}>
            <div className={styles.heroArt} aria-hidden>
              <VisualView v={{ kind: "scene", scene: "ak-reiter-sitz" }} decorative />
            </div>
            <div className={styles.teaserBody}>
              <ShelfLabel kind="gratis" onDark />
              <h2 className={styles.teaserTitle}>{ACADEMY_TIERS.klein.title}</h2>
              <p className={styles.heroText}>Die ersten Schritte: sicher am Pferd, der richtige Sitz und die Sprache der Hilfen.</p>
              <p className={styles.doorMeta}>
                {klein.worlds.length} Lernwelten · {count(klein.worlds)} Lektionen · {klein.games.length} Mini-Spiele
              </p>
              <span className={styles.teaserGo}>
                {academyDoneCount(progress, "klein") > 0 ? "Weiterlernen" : "Los geht's"}
                <Icon name="play" />
              </span>
            </div>
          </Link>

          <Link href={ACADEMY_TIERS.gross.href} className={`${styles.teaser} ${styles.doorPremium}`}>
            <div className={styles.heroArt} aria-hidden>
              <VisualView v={{ kind: "scene", scene: "ak-reiter-sitz-linie" }} decorative />
            </div>
            <div className={styles.teaserBody}>
              <ShelfLabel kind="premium" />
              <h2 className={styles.teaserTitle}>{ACADEMY_TIERS.gross.title}</h2>
              <p className={styles.heroText}>Schritt, Trab, Galopp, Reiten in der Bahn und fair zum Pferd – mit Animationen und Lernvideos.</p>
              <p className={styles.doorMeta}>
                {gross.worlds.length} Lernwelten · {count(gross.worlds)} Lektionen · {gross.games.length} Mini-Spiele
              </p>
              <span className={styles.doorState}>
                <Icon name={unlocked ? "check" : "lock"} />
                {unlocked ? "Freigeschaltet" : `In der Mitgliedschaft „${site.clubName}“ oder einzeln`}
              </span>
            </div>
          </Link>
        </div>

        <p className={styles.disclaimer}>
          Die Reitakademie vermittelt Wissen rund ums Reiten. Reiten selbst lernst du im Unterricht mit einer qualifizierten
          Reitlehrerin oder einem Reitlehrer.
        </p>
      </div>
    </div>
  );
}

/* ---------- /akademie/klein und /akademie/gross ---------- */

export type MonthlyLesson = { release: Release; state: "open" | "upcoming" | "locked" };

/** Eine Akademie-Stufe: Lernwelten und Mini-Spiele, bei der Großen Akademie mit Sperre und Monatslektionen. */
export function AcademyTierScreen({ tier, unlocked, monthly = [] }: { tier: AcademyTier; unlocked: boolean; monthly?: MonthlyLesson[] }) {
  const progress = useProgress();
  const info = ACADEMY_TIERS[tier];
  const premium = tier === "gross";
  const worlds = worldsOf(tier);
  const games = gamesOf(tier);
  const total = allLessons(tier).length;
  const done = academyDoneCount(progress, tier);
  const locked = premium && !unlocked;

  return (
    <div className="page">
      <PageHeader title={info.title} backHref="/akademie" backLabel="Zurück zur Reitakademie" />
      <div className={styles.stack}>
        {locked && <UnlockHint />}

        {!locked && (
          <div>
            <p className={styles.meterLabel}>
              {done} von {total} Lektionen geschafft
            </p>
            <div className={styles.meter} role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={done} aria-label={`Fortschritt in der ${info.short}`}>
              <span style={{ width: `${(done / total) * 100}%` }} />
            </div>
          </div>
        )}

        <div className={styles.level}>
          <LevelSwitch />
        </div>

        <Shelf kind={premium ? "premium" : "gratis"} id={`ak-${tier}-welten`} title="Lernwelten" label={premium ? (unlocked ? "Freigeschaltet" : "Premium") : undefined}>
          <WorldList worlds={worlds} locked={locked} />
        </Shelf>

        <Shelf kind={premium ? "premium" : "gratis"} id={`ak-${tier}-spiele`} title="Mini-Spiele" label={premium ? (unlocked ? "Freigeschaltet" : "Premium") : undefined}>
          <GameList games={games} locked={locked} />
        </Shelf>

        {premium && monthly.length > 0 && (
          <Shelf kind="premium" id="ak-monat" title="Jeden Monat neu" label={`Für ${site.clubName}-Mitglieder`} lead="Neue Lektionen kommen über die Mitgliedschaft dazu – auch mit Animationen und Lernvideos.">
            <ul className={styles.comingList}>
              {monthly.map(({ release: r, state }) => (
                <li key={r.slug}>
                  <Link href={`/hofjahr/${r.slug}`} className={styles.comingItem}>
                    <Icon name={state === "open" ? "play" : "lock"} />
                    <span>{r.title}</span>
                    <em>{state === "open" ? "Neu" : `ab ${r.dateLabel.replace(/^Freitag, /, "").replace(/ \d{4}$/, "")}`}</em>
                  </Link>
                </li>
              ))}
            </ul>
          </Shelf>
        )}

        {!premium && (
          <Link href={ACADEMY_TIERS.gross.href} className={styles.comingItem} style={{ boxShadow: "var(--shadow-card)" }}>
            <Icon name="star" />
            <span>
              <strong>Weiter geht es in der Großen Akademie:</strong> Schritt, Trab, Galopp und mehr
            </span>
          </Link>
        )}

        <p className={styles.note}>
          <Icon name="star" />
          <span>
            Dein Lernfortschritt wird nur auf diesem Gerät gespeichert. Wenn du ein anderes Gerät nimmst oder die Browserdaten
            gelöscht werden, kann er verloren gehen.
          </span>
        </p>
      </div>
    </div>
  );
}

/** Kurzer Hinweis für Kinder und Eltern, wie man die Große Akademie bekommt */
export function UnlockHint() {
  return (
    <div className={styles.unlockBox}>
      <p className={styles.unlockTitle}>Die Große Akademie ist noch verschlossen</p>
      <p>Frag deine Eltern! Sie können sie im Elternbereich freischalten.</p>
      <p className={styles.doorMeta}>Für Eltern: enthalten in der Mitgliedschaft „{site.clubName}“ oder einzeln erhältlich.</p>
      <div className={styles.actions} style={{ justifyContent: "flex-start" }}>
        <Link href="/eltern#akademie" className={`${styles.btn} ${styles.btnPrimary}`}>
          <Icon name="parents" />
          Zum Elternbereich
        </Link>
      </div>
    </div>
  );
}

function WorldList({ worlds, locked }: { worlds: AcademyWorldInfo[]; locked: boolean }) {
  const progress = useProgress();
  const earned = earnedStamps(progress);
  const stamps = academyStamps();
  return (
    <ul className={styles.worlds}>
      {worlds.map((w) => {
        const stamp = stamps.find((s) => s.id === w.badge.id)!;
        const has = earned.has(stamp.id);
        const count = w.lessons.filter((l) => lessonDone(progress, l)).length;
        return (
          <li key={w.id} className={locked ? styles.lockedCard : undefined}>
            {locked && (
              <span className={styles.lockBadge} aria-hidden>
                <Icon name="lock" />
              </span>
            )}
            <Link
              href={worldHref(w)}
              className={styles.worldCard}
              style={{ background: w.tint }}
              aria-label={`Lernwelt ${w.number}: ${w.title}${locked ? ", verschlossen" : `, ${count} von ${w.lessons.length} Lektionen geschafft`}`}
            >
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
  );
}

function GameList({ games, locked }: { games: AcademyGameInfo[]; locked: boolean }) {
  const progress = useProgress();
  return (
    <ul className={styles.games}>
      {games.map((g) => {
        const played = (progress.games[g.id]?.completedCount ?? 0) > 0;
        return (
          <li key={g.id} className={locked ? styles.lockedCard : undefined}>
            {locked && (
              <span className={styles.lockBadge} aria-hidden>
                <Icon name="lock" />
              </span>
            )}
            <Link href={`/akademie/spiele/${g.slug}`} className={styles.gameCard} style={{ background: g.tint }} aria-label={`${g.title}${locked ? ", verschlossen" : ""}`}>
              <div className={styles.gameArt} aria-hidden>
                <VisualView v={g.cover} decorative />
              </div>
              <div className={styles.gameBody}>
                <span className={styles.gameTitle}>{g.title}</span>
                <span className={`${styles.go} ${played ? styles.goDone : ""}`} aria-hidden>
                  <Icon name={locked ? "lock" : played ? "check" : "play"} />
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
