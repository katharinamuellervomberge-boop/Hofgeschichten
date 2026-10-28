import Link from "next/link";
import { HorsePortrait } from "@/components/illustrations/HorsePortrait";
import { HofpostArt } from "@/components/illustrations/HofpostArt";
import { Icon } from "@/components/illustrations/Icons";
import { KidPortrait } from "@/components/illustrations/KidPortrait";
import { PersonPortrait } from "@/components/illustrations/PersonPortrait";
import { AdventureCover } from "@/features/adventure/AdventureCover";
import { WeekCard, type WeekState } from "@/features/hofjahr/WeekCard";
import { characters } from "@/content/characters";
import { horses } from "@/content/horses";
import { hofpost, membership, releases, yearPlan } from "@/content/membership";
import { people } from "@/content/people";
import { site } from "@/content/site";
import type { AdventureMeta } from "@/content/types";
import hofjahr from "@/features/hofjahr/hofjahr.module.css";
import styles from "./hofwelt.module.css";

const MONTHS = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

type Props = {
  weekStates: Record<string, WeekState>;
  member: boolean;
  owned: string[];
  adventures: AdventureMeta[];
  now: string;
};

/**
 * Die Hofgeschichten-Welt (seit 28.10.2026): Pferde, Figuren, Detektivfälle,
 * Wochenpakete, Hörgeschichten, Saisonales – und Mitgliedschaft und Hofpost als
 * zwei getrennte Angebote. Verspielter als die Reitakademie, gleiche Marke.
 * Die bisherigen Seiten (/pferde, /abenteuer, /hofjahr, /mitgliedschaft) bleiben erhalten.
 */
export function HofweltScreen({ weekStates, member, owned, adventures, now }: Props) {
  const today = new Date(now);
  // Nächste Freitagsfolgen: zuerst offene, dann kommende – höchstens vier
  const upcoming = [...releases].sort((a, b) => a.releaseAt.localeCompare(b.releaseAt)).slice(0, 4);
  // Saisonal: aktueller oder nächster Monat aus der Jahresplanung
  const seasonal = yearPlan.filter((m) => m.year > today.getFullYear() || (m.year === today.getFullYear() && MONTHS.indexOf(m.month) >= today.getMonth())).slice(0, 2);
  const kruemel = { slug: "kruemel", name: "Krümel" };
  const grownUps = people.filter((p) => p.portrait).slice(0, 4);

  return (
    <div className={styles.world}>
      <header className={styles.head}>
        <p className={styles.kicker}>Die Hofgeschichten-Welt</p>
        <h1 className={styles.title}>Willkommen auf dem Hof</h1>
        <p className={styles.lead}>Hier wohnen Tivoli, Tonga und Scrabble – und hier erleben die Hofkinder ihre Abenteuer.</p>
      </header>

      <section aria-labelledby="hw-horses">
        <div className={styles.sectionHead}>
          <h2 id="hw-horses" className={styles.h2}>
            Unsere Pferde
          </h2>
          <Link href="/pferde" className={styles.more}>
            Alle Steckbriefe
          </Link>
        </div>
        <ul className={styles.horses}>
          {horses.map((h) => (
            <li key={h.slug}>
              <Link href={`/pferde/${h.slug}`} className={styles.horse} style={{ background: h.tint }}>
                <HorsePortrait horse={h} className={styles.horseImg} sizes="(min-width: 720px) 300px, 45vw" />
                <span className={styles.horseName}>{h.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="hw-people">
        <h2 id="hw-people" className={styles.h2}>
          Die Hofkinder &amp; Hof-Leute
        </h2>
        <ul className={styles.people}>
          {characters.map((c) => (
            <li key={c.slug}>
              <KidPortrait kid={c} className={styles.portrait} />
              <span className={styles.personName}>{c.name}</span>
              <span className={styles.personRole}>Hofkind</span>
            </li>
          ))}
          <li>
            {/* eslint-disable-next-line @next/next/no-img-element -- statische WebP-Dateien mit srcset */}
            <img
              src="/kids/kruemel-320.webp"
              srcSet="/kids/kruemel-160.webp 160w, /kids/kruemel-320.webp 320w, /kids/kruemel-640.webp 640w"
              sizes="96px"
              width={320}
              height={320}
              alt="Krümel, ein fröhlicher Hund mit hellem Fell und braunen Schlappohren"
              className={styles.portrait}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
            <span className={styles.personName}>{kruemel.name}</span>
            <span className={styles.personRole}>Hofhund</span>
          </li>
          {grownUps.map((p) => (
            <li key={p.slug}>
              <PersonPortrait person={p} className={styles.portrait} sizes="96px" />
              <span className={styles.personName}>{p.name.split(" ")[0]}</span>
              <span className={styles.personRole}>{p.role.replace(/, \d+$/, "")}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="hw-cases">
        <div className={styles.sectionHead}>
          <h2 id="hw-cases" className={styles.h2}>
            Abenteuer &amp; Detektivfälle
          </h2>
          <Link href="/abenteuer" className={styles.more}>
            Alle Fälle
          </Link>
        </div>
        <ul className={styles.cases}>
          {adventures.map((a) => {
            const has = a.access === "free" || owned.includes(a.slug);
            return (
              <li key={a.slug}>
                <Link href={`/abenteuer/${a.slug}`} className={styles.case}>
                  <div className={styles.caseArt} aria-hidden>
                    <AdventureCover slug={a.slug} />
                  </div>
                  <div className={styles.caseBody}>
                    <span className={styles.caseTitle}>{a.title}</span>
                    <span className={styles.caseTeaser}>{a.teaser}</span>
                    <span className={`${styles.chip} ${has ? styles.chipOpen : ""}`}>
                      <Icon name={has ? "play" : "lock"} />
                      {a.access === "free" ? "Kostenlos" : has ? "Freigeschaltet" : "Einzeln oder für Mitglieder"}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="hw-weekly">
        <div className={styles.sectionHead}>
          <h2 id="hw-weekly" className={styles.h2}>
            Jeden Freitag neu
          </h2>
          <Link href="/hofjahr" className={styles.more}>
            {site.clubName}
          </Link>
        </div>
        <p className={styles.sub}>Geschichten, große Hofspiele und Pferdewissen für Mitglieder.</p>
        <ul className={hofjahr.weeks}>
          {upcoming.map((r) => (
            <li key={r.slug}>
              <WeekCard release={r} state={weekStates[r.slug] ?? "locked"} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="hw-extra" className={styles.extras}>
        <h2 id="hw-extra" className={styles.h2}>
          Hören &amp; Saisonales
        </h2>
        <ul className={styles.extraList}>
          <li className={styles.extra}>
            <Icon name="headphones" />
            <span>
              <strong>Hörgeschichten</strong>
              {site.features.audio ? (
                <Link href="/hoeren">Jetzt anhören</Link>
              ) : (
                <span>Die ersten Hörgeschichten vom Hof sind in Arbeit.</span>
              )}
            </span>
          </li>
          {seasonal.map((m) => (
            <li key={`${m.month}-${m.year}`} className={styles.extra}>
              <Icon name="star" />
              <span>
                <strong>
                  {m.month} {m.year}
                </strong>
                <span>{m.theme}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="hw-offers">
        <h2 id="hw-offers" className={styles.h2}>
          Teil der Hofwelt werden
        </h2>
        {member ? (
          <p className={styles.memberNote}>
            <Icon name="check" />
            Du bist Mitglied – alle Wochenpakete öffnen sich automatisch an ihrem Freitag.
          </p>
        ) : null}
        <div className={styles.offers}>
          <article className={styles.offer}>
            <p className={styles.offerKicker}>Founder-Angebot 2026</p>
            <h3 className={styles.offerTitle}>Founder-Mitgliedschaft</h3>
            <p className={styles.offerPrice}>
              {membership.price} <small>für das erste Jahr</small>
            </p>
            <p className={styles.offerText}>Die digitale Hofwelt: jeden Freitag Neues, alle Detektivfälle, Hofspiele und Abzeichen.</p>
            <p className={styles.offerSmall}>
              Ab dem 13. Monat {membership.followUpPrice} {membership.followUpInterval}, dann monatlich kündbar.
            </p>
            <Link href="/mitgliedschaft" className={styles.offerLink}>
              Mitgliedschaft ansehen
            </Link>
          </article>
          <article className={`${styles.offer} ${styles.offerPost}`}>
            <div className={styles.offerArt} aria-hidden>
              <HofpostArt />
            </div>
            <p className={styles.offerKicker}>Mit echter Post</p>
            <h3 className={styles.offerTitle}>Hofpost Premium</h3>
            <p className={styles.offerPrice}>
              {hofpost.price} <small>für das erste Jahr</small>
            </p>
            <p className={styles.offerText}>
              Die Jahresmitgliedschaft plus {hofpost.letters} echte Briefe von den Pferden – einer pro Monat, per Post.
            </p>
            <p className={styles.offerSmall}>
              {hofpost.shippingLabel}. Erster Brief {hofpost.firstLetterLabel}. Ab dem 13. Monat {hofpost.followUpPrice} {hofpost.followUpInterval}.
            </p>
            <Link href="/mitgliedschaft#hofpost" className={styles.offerLink}>
              Hofpost ansehen
            </Link>
          </article>
        </div>
      </section>
    </div>
  );
}
