"use client";

import Link from "next/link";
import { Icon } from "@/components/illustrations/Icons";
import { KidPortrait } from "@/components/illustrations/KidPortrait";
import { StampSeal } from "@/components/illustrations/StampSeal";
import { PageHeader } from "@/components/ui/PageHeader";
import { Shelf } from "@/components/ui/Shelf";
import { site } from "@/content/site";
import { publishedAdventures } from "@/content/adventures";
import { characters } from "@/content/characters";
import { HOFTAG_STEPS, hofjahrBadges, hoftagDone } from "@/content/hofjahr";
import { releases, yearPlan } from "@/content/membership";
import { earnedStamps } from "@/lib/progress/stamps";
import { useProgress } from "@/lib/progress/store";
import { academyDoneCount } from "@/features/akademie/progress";
import { HofpostArt } from "@/components/illustrations/HofpostArt";
import { WeekCard, type WeekState } from "./WeekCard";
import styles from "./hofjahr.module.css";

const MONTHS = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

type Props = {
  weekStates: Record<string, WeekState>;
  /** Mitgliedschaft auf diesem Gerät aktiv (vom Server geprüft) */
  member: boolean;
  /** Server-Zeit (ISO), damit Server und Browser dasselbe Monatsabenteuer zeigen */
  now: string;
};

/**
 * Mitgliederbereich („Mein Hof“, Name in site.clubName):
 * 1. die Wochenpakete (jeden Freitag etwas Neues) – für Mitglieder
 * 2. Fortschritt und Abzeichen – für alle, nur lokal, ohne Profil
 */
export function HofjahrScreen({ weekStates, member, now }: Props) {
  const progress = useProgress();
  const earned = earnedStamps(progress);
  const date = new Date(now);
  const month = MONTHS[date.getMonth()];
  const current = yearPlan.find((m) => m.month === month && m.year === date.getFullYear());
  const missions = Object.values(progress.adventures).reduce((n, a) => n + a.missions.length, 0);
  const solved = publishedAdventures.filter((a) => a.missions.length && a.missions.every((m) => progress.adventures[a.slug]?.missions.includes(m.id)));
  const badgeCount = hofjahrBadges.filter((b) => b.earned(progress)).length;
  const kids = characters.filter((c) => ["lea", "mila", "ben"].includes(c.slug));

  return (
    <div className="page">
      <PageHeader title={site.clubName} spoken={`${site.clubName}. Hier gibt es jeden Freitag etwas Neues. Und du siehst deine Abzeichen.`} />
      <div className={styles.stack}>
        <section className={styles.greeting} aria-labelledby="hj-hallo">
          <div>
            <h2 id="hj-hallo" className={styles.greetTitle}>
              Schön, dass du da bist!
            </h2>
            <p className={styles.greetText}>
              {member
                ? "Jeden Freitag gibt es hier etwas Neues für dich – und du siehst, was du auf dem Hof schon alles geschafft hast."
                : "Hier gibt es jeden Freitag ab November etwas Neues für Mitglieder. Deine Abzeichen siehst du auch hier."}
            </p>
          </div>
          <div className={styles.kids} aria-hidden>
            {kids.map((k) => (
              <KidPortrait key={k.slug} kid={k} sizes="76px" />
            ))}
          </div>
        </section>

        <Shelf
          kind="premium"
          id="hj-monat"
          label={member ? "Du bist Mitglied" : "Für Mitglieder"}
          title={current ? `Im ${current.month}: ${current.theme}` : "Bald geht es los: November auf dem Hof"}
          lead="Jeden Freitag ein neues Paket: Geschichten, Spiele, Lektionen und Abenteuer."
        >
          {!member && (
            <Link href="/mitgliedschaft" className={styles.passLink}>
              <span>Für Eltern: So wird man Mitglied</span>
              <Icon name="parents" />
            </Link>
          )}
          <ul className={styles.weeks}>
            {releases.map((r) => (
              <li key={r.slug}>
                <WeekCard release={r} state={weekStates[r.slug] ?? "locked"} />
              </li>
            ))}
          </ul>
        </Shelf>

        <section className={styles.hofpostTeaser} aria-labelledby="hj-hofpost">
          <HofpostArt className={styles.hofpostTeaserArt} label="Ein Brief vom Hof mit einem Pferdefoto" />
          <div>
            <p className={styles.hofpostTeaserKicker}>Neu ab Januar</p>
            <h2 id="hj-hofpost" className={styles.sectionTitle} style={{ margin: 0 }}>
              Post von Tivoli &amp; Co.
            </h2>
            <p className={styles.sectionLead}>
              Bald kann dir jeden Monat ein echter Brief von unseren Pferden ins Haus flattern – mit Sticker und Geheimwort. Frag deine
              Eltern!
            </p>
            <Link href="/mitgliedschaft#hofpost" className={styles.hofpostTeaserLink}>
              <Icon name="parents" />
              Für Eltern: mehr zur Hofpost
            </Link>
          </div>
        </section>

        <section aria-labelledby="hj-stand">
          <h2 id="hj-stand" className={styles.sectionTitle}>
            Mein Fortschritt
          </h2>
          <dl className={styles.stats}>
            <div className={styles.stat}>
              <dt>Abzeichen</dt>
              <dd>
                {badgeCount} / {hofjahrBadges.length}
              </dd>
            </div>
            <div className={styles.stat}>
              <dt>Missionen</dt>
              <dd>{missions}</dd>
            </div>
            <div className={styles.stat}>
              <dt>Fälle gelöst</dt>
              <dd>{solved.length}</dd>
            </div>
            <div className={styles.stat}>
              <dt>Lektionen</dt>
              <dd>{academyDoneCount(progress)}</dd>
            </div>
            <div className={styles.stat}>
              <dt>Hoftag</dt>
              <dd>
                {hoftagDone(progress)} / {HOFTAG_STEPS.length}
              </dd>
            </div>
            <div className={styles.stat}>
              <dt>Stempel im Pass</dt>
              <dd>{earned.size}</dd>
            </div>
          </dl>
          {solved.length > 0 && <p className={styles.note}>Gelöst: {solved.map((a) => a.title).join(", ")}</p>}
        </section>

        <section aria-labelledby="hj-abzeichen">
          <h2 id="hj-abzeichen" className={styles.sectionTitle}>
            Meine Abzeichen
          </h2>
          <ul className={styles.badges}>
            {hofjahrBadges.map((b, i) => {
              const has = b.earned(progress);
              return (
                <li key={b.id} className={`${styles.badge} ${has ? styles.badgeEarned : ""}`} aria-label={`${b.title}: ${has ? "gesammelt" : b.how}`}>
                  <StampSeal stamp={b} earned={has} tilt={[-6, 4, -3, 5, -4][i % 5]} className={styles.badgeSeal} />
                  <span className={styles.badgeTitle}>{b.title}</span>
                  {!has && <span className={styles.badgeHow}>{b.how}</span>}
                </li>
              );
            })}
          </ul>
        </section>



        <Link href="/pass" className={styles.passLink}>
          <span>Zu meinem Abenteuerpass mit allen Stempeln</span>
          <Icon name="pass" />
        </Link>

        <p className={styles.note}>
          Dein Fortschritt wird nur auf diesem Gerät gespeichert. Es gibt kein Profil und keine Rangliste – es geht nur um dich und
          die Pferde.
        </p>
      </div>
    </div>
  );
}
