import Link from "@/i18n/Link";
import { FarmBackdrop } from "@/components/illustrations/FarmBackdrop";
import { Horse } from "@/components/illustrations/Horse";
import { Icon } from "@/components/illustrations/Icons";
import { LegalLinks } from "@/components/layout/LegalPage";
import { ACADEMY_PATHS, academyModules } from "@/content/akademie/module";
import { horses } from "@/content/horses";
import { academyPriceLabel } from "@/content/products";
import { VisualView } from "@/engine/VisualView";
import type { Locale } from "@/i18n/locale";
import { ContinueCard } from "./ContinueCard";
import { NextStep, type HomeAccess } from "./NextStep";
import styles from "./HomeScreen.module.css";

const SHORT_PATH_EN = { kids: "Kids · 6–11", teen: "Teens · 12–17", adult: "Adults · 18+" } as const;

/* Position der Pferde in der Landschaft (Prozent der Bühne) */
const STAGE = [
  { left: "2%", bottom: "13%", width: "38%", flip: false, z: 3 },
  { left: "33%", bottom: "21%", width: "36%", flip: true, z: 2 },
  { left: "62%", bottom: "11%", width: "37%", flip: true, z: 4 },
];

/** Kleine Linienzeichnungen für die vier Bereiche (Markenfarben über currentColor) */
const AREA_ART = {
  academy: (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 26c13-6 26-6 38 2 12-8 25-8 38-2v52c-13-6-26-6-38 2-12-8-25-8-38-2z" />
      <path d="M50 28v52" />
      <path d="M22 40c7-2 13-2 19 1M22 51c7-2 13-2 19 1M59 41c6-3 12-3 19-1" opacity=".6" />
      <path d="M62 66V56a8 8 0 0 1 16 0v10" strokeWidth="4" />
    </svg>
  ),
  diary: (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="20" y="14" width="52" height="72" rx="5" />
      <path d="M30 14v72" />
      <path d="M40 32h22M40 42h22M40 52h14" opacity=".6" />
      <path d="m86 28-26 40-8 6 2-10 26-40z" />
      <path d="m76 30 6 4" />
    </svg>
  ),
  lab: (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="50" cy="56" r="30" />
      <path d="M50 56 64 42" strokeWidth="3" />
      <path d="M42 18h16M50 18v8M76 28l5-5" />
      <path d="M50 30v4M50 78v4M24 56h4M72 56h4" opacity=".6" />
    </svg>
  ),
  coach: (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="50" cy="50" r="40" />
      <circle cx="50" cy="50" r="32" strokeDasharray="1 3" />
      <path d="M50 6v10M50 84v10M6 50h10M84 50h10" strokeWidth="2.6" />
      <path d="M60 40 55 55 40 60 45 45z" fill="currentColor" fillOpacity=".35" />
    </svg>
  ),
};

/**
 * Startseite Hofgeschichten 2.0 (seit 11.11.2026): vier Bereiche – Reitakademie, Reitertagebuch,
 * Rider Lab, Rider Coach – und darunter „Dein nächster Schritt“ aus dem echten Stand des Geräts.
 * Kernbotschaft: Lerne. Verstehe. Trainiere. Wachse. Die Pferde der Bühne sind Dekoration.
 */
export function HomeScreen({ locale = "de", access = { academy: false, diary: false, coach: false } }: { locale?: Locale; access?: HomeAccess }) {
  if (locale === "en") return <HomeScreenEn />;
  const areas = [
    {
      key: "academy",
      href: "/akademie",
      verb: "Lerne",
      title: "Reitakademie",
      text: `${academyModules.length} Module mit Lektionen, Lernvideos und Quiz – vom Pferdeverstehen bis zu Dressur und Springen.`,
      meta: access.academy ? "Weiterlernen" : "Probelektionen kostenlos",
      cls: styles.areaAcademy,
    },
    {
      key: "diary",
      href: "/tagebuch",
      verb: "Verstehe",
      title: "Reitertagebuch",
      text: "Reitstunden festhalten: Was hat geklappt, was war schwierig? Mit Pferdeprofilen und Trainingshistorie.",
      meta: access.diary ? "Eintrag schreiben" : "Vorschau ansehen",
      cls: styles.areaDiary,
    },
    {
      key: "lab",
      href: "/akademie/rider-lab",
      verb: "Trainiere",
      title: "Rider Lab",
      text: "Ziele setzen, Training planen, Fortschritt sehen – mit animierten Übungen für Sitz und Balance.",
      meta: access.academy ? "Training öffnen" : "Probeübungen kostenlos",
      cls: styles.areaLab,
    },
    {
      key: "coach",
      href: "/coach",
      verb: "Wachse",
      title: "Rider Coach",
      text: "Was klappt beim Reiten gerade nicht? Problem eingeben, kurz eingrenzen, Lösungsweg und Trainingsplan bekommen.",
      meta: access.coach ? "Problem lösen" : "Kostenlose Demo",
      cls: styles.areaCoach,
      premium: !access.coach,
    },
  ] as const;

  return (
    <div className={styles.home}>
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.stage}>
          <FarmBackdrop className={styles.backdrop} />
          {horses.map((h, i) => {
            const pos = STAGE[i % STAGE.length];
            return (
              <span
                key={h.slug}
                className={styles.stageHorse}
                style={{ left: pos.left, bottom: pos.bottom, width: pos.width, zIndex: pos.z, animationDelay: `${i * 0.7}s` }}
              >
                <Horse look={h.look} uid={`home-${h.slug}`} flip={pos.flip} />
                <span className={styles.nameTag}>{h.name}</span>
              </span>
            );
          })}
        </div>

        <div className={styles.titleCard}>
          <p className={styles.welcome}>Willkommen bei Hofgeschichten</p>
          <h1 id="home-title" className={styles.headline}>
            <span>Lerne. Verstehe.</span>
            <span>Trainiere. Wachse.</span>
          </h1>
        </div>
      </section>

      <section className={styles.areas} aria-labelledby="home-areas">
        <div className={styles.areasHead}>
          <h2 id="home-areas" className={styles.areasTitle}>
            Deine vier Bereiche
          </h2>
          <span className={styles.areasMotto}>Wissen · Erlebnisse · Training · Lösungen</span>
        </div>
        <ul className={styles.areaGrid}>
          {areas.map((a, i) => (
            <li key={a.key} style={{ animationDelay: `${i * 70}ms` }}>
              <Link href={a.href} className={`${styles.area} ${a.cls}`}>
                <span className={styles.areaBody}>
                  <span className={styles.areaNum}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.areaVerb}>{a.verb}</span>
                  <span className={styles.areaTitle}>{a.title}</span>
                  {"premium" in a && a.premium && <span className={styles.premiumPill}>Premium-Add-on</span>}
                  <span className={styles.areaText}>{a.text}</span>
                  <span className={styles.areaMeta}>
                    {a.meta}
                    <Icon name="back" />
                  </span>
                </span>
                <span className={styles.areaArt}>{AREA_ART[a.key]}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <NextStep access={access} />

      <nav className={styles.moreLinks} aria-label="Mehr">
        <Link href="/spielen">Lernspiele &amp; Quiz</Link>
        <Link href="/coach/mein-coach">Mein Coach</Link>
        <Link href="/tagebuch/plan">Mein Trainingsplan</Link>
        <Link href="/profil">Profil &amp; Freischaltungen</Link>
      </nav>

      <footer style={{ marginTop: "var(--space-6)", paddingInline: "var(--gutter)" }}>
        <LegalLinks />
      </footer>
    </div>
  );
}

/**
 * Englische Startseite (seit 30.10.2026): ganz auf die Reitakademie ausgerichtet.
 * Hofwelt, Spiele und Mitgliedschaft folgen auf Englisch später.
 */
function HomeScreenEn() {
  const price = academyPriceLabel("en");
  return (
    <div className={styles.home}>
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.stage}>
          <FarmBackdrop className={styles.backdrop} />
          {horses.map((h, i) => {
            const pos = STAGE[i % STAGE.length];
            return (
              <span
                key={h.slug}
                className={styles.stageHorse}
                style={{ left: pos.left, bottom: pos.bottom, width: pos.width, zIndex: pos.z, animationDelay: `${i * 0.7}s` }}
              >
                <Horse look={h.look} uid={`home-${h.slug}`} flip={pos.flip} />
                <span className={styles.nameTag}>{h.name}</span>
              </span>
            );
          })}
        </div>

        <div className={styles.titleCard}>
          <p className={styles.welcome}>Welcome to Hofgeschichten</p>
          <h1 id="home-title" className={styles.headline}>
            <span>Learn to ride.</span>
            <span>Understand horses.</span>
            <span>Grow in confidence.</span>
          </h1>
        </div>
      </section>

      <div className={styles.content}>
        <ContinueCard />

        <Link href="/akademie" className={styles.academy} aria-labelledby="home-academy">
          <div className={styles.academyBody}>
            <span className={styles.academyKicker}>Online riding course</span>
            <span id="home-academy" className={styles.academyTitle}>
              The Riding Academy
            </span>
            <span className={styles.academyText}>
              81 interactive lessons – from understanding horses, grooming and your first ride to school figures, the aids, dressage and
              jumping. With pictures, exercises and quizzes.
            </span>
            <ul className={styles.paths} aria-label="Learning tracks">
              {ACADEMY_PATHS.map((p) => (
                <li key={p.id}>{SHORT_PATH_EN[p.id]}</li>
              ))}
            </ul>
            <span className={styles.academyCta}>
              Start the free lessons
              <Icon name="play" />
            </span>
            <span className={styles.academyNote}>Free sample lesson in every module · full academy {price} one-time, no subscription</span>
          </div>
          <div className={styles.academyArt} aria-hidden>
            <VisualView v={{ kind: "scene", scene: "ak-reiter-sitz" }} decorative />
          </div>
        </Link>

        <Link href="/akademie/modul/reiten-lernen" className={`${styles.tile} ${styles.games}`}>
          <span className={styles.tileIcon} aria-hidden>
            <Icon name="academy" />
          </span>
          <span>
            <span className={styles.tileTitle}>For adult beginners &amp; returners</span>
            <span className={styles.tileText}>Understand between lessons what your instructor means – seat, aids, rising trot and canter.</span>
          </span>
          <Icon name="back" className={styles.arrow} aria-hidden />
        </Link>

        <Link href="/akademie/modul/pferde-verstehen" className={`${styles.tile} ${styles.world}`}>
          <span className={styles.tileIcon} aria-hidden>
            <Icon name="star" />
          </span>
          <span>
            <span className={styles.tileTitle}>For horse-mad kids</span>
            <span className={styles.tileText}>Simple language, lots of pictures and games – with Lea, Mila and Ben from the farm.</span>
          </span>
          <Icon name="back" className={styles.arrow} aria-hidden />
        </Link>

        <aside className={styles.founder} aria-label="Gift idea">
          <span className={styles.founderText}>
            <span className={styles.founderKicker}>The perfect gift</span>
            <span className={styles.founderTitle}>Instant, no shipping, no subscription</span>
            <span className={styles.founderSub}>
              Unlock it with the order number and order email – on any phone, tablet or computer. Safe: no ads, no account, no chat.
            </span>
          </span>
          <Link href="/eltern" className={styles.founderLink}>
            How to unlock
          </Link>
        </aside>
      </div>

      <footer style={{ marginTop: "var(--space-6)", paddingInline: "var(--gutter)" }}>
        <LegalLinks locale="en" />
      </footer>
    </div>
  );
}
