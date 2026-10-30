import Link from "@/i18n/Link";
import { FarmBackdrop } from "@/components/illustrations/FarmBackdrop";
import { Horse } from "@/components/illustrations/Horse";
import { Icon } from "@/components/illustrations/Icons";
import { LegalLinks } from "@/components/layout/LegalPage";
import { ACADEMY_PATHS } from "@/content/akademie/module";
import { horses } from "@/content/horses";
import { membership } from "@/content/membership";
import { grosseAkademie } from "@/content/products";
import { VisualView } from "@/engine/VisualView";
import type { Locale } from "@/i18n/locale";
import { ContinueCard } from "./ContinueCard";
import styles from "./HomeScreen.module.css";

const SHORT_PATH = { kids: "Kids · 6–11", teen: "Teens · 12–17", adult: "Erwachsene · 18+" } as const;
const SHORT_PATH_EN = { kids: "Kids · 6–11", teen: "Teens · 12–17", adult: "Adults · 18+" } as const;

/* Position der Pferde in der Landschaft (Prozent der Bühne) */
const STAGE = [
  { left: "2%", bottom: "13%", width: "38%", flip: false, z: 3 },
  { left: "33%", bottom: "21%", width: "36%", flip: true, z: 2 },
  { left: "62%", bottom: "11%", width: "37%", flip: true, z: 4 },
];

/**
 * Startseite (seit 28.10.2026): in wenigen Sekunden verstehen –
 * Reiten lernen (Reitakademie, am stärksten hervorgehoben), Wissen spielerisch testen,
 * Teil der Hofwelt werden. Die Pferde der Bühne führen zu ihren Steckbriefen.
 */
export function HomeScreen({ locale = "de" }: { locale?: Locale }) {
  if (locale === "en") return <HomeScreenEn />;
  return (
    <div className={styles.home}>
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.stage}>
          <FarmBackdrop className={styles.backdrop} />
          {horses.map((h, i) => {
            const pos = STAGE[i % STAGE.length];
            return (
              <Link
                key={h.slug}
                href={`/pferde/${h.slug}`}
                className={styles.stageHorse}
                style={{ left: pos.left, bottom: pos.bottom, width: pos.width, zIndex: pos.z, animationDelay: `${i * 0.7}s` }}
                aria-label={`${h.name} – zum Steckbrief`}
              >
                <Horse look={h.look} uid={`home-${h.slug}`} flip={pos.flip} />
                <span className={styles.nameTag}>{h.name}</span>
              </Link>
            );
          })}
        </div>

        <div className={styles.titleCard}>
          <p className={styles.welcome}>Willkommen bei Hofgeschichten</p>
          <h1 id="home-title" className={styles.headline}>
            <span>Reiten lernen.</span>
            <span>Pferde verstehen.</span>
            <span>Abenteuer erleben.</span>
          </h1>
        </div>
      </section>

      <div className={styles.content}>
        <ContinueCard />

        <Link href="/akademie" className={styles.academy} aria-labelledby="home-academy">
          <div className={styles.academyBody}>
            <span className={styles.academyKicker}>Unser Lernprodukt</span>
            <span id="home-academy" className={styles.academyTitle}>
              Die Reitakademie
            </span>
            <span className={styles.academyText}>
              Vom Pferdeverstehen über Bahnfiguren und Hilfen bis zu Dressur und Springen – mit Lernvideos, Übungen und Quiz.
            </span>
            <ul className={styles.paths} aria-label="Lernwege">
              {ACADEMY_PATHS.map((p) => (
                <li key={p.id}>{SHORT_PATH[p.id]}</li>
              ))}
            </ul>
            <span className={styles.academyCta}>
              Jetzt entdecken
              <Icon name="play" />
            </span>
            <span className={styles.academyNote}>
              Probelektionen kostenlos · ganze Akademie {grosseAkademie.price ?? "14,90 €"} einmalig, kein Abo
            </span>
          </div>
          <div className={styles.academyArt} aria-hidden>
            <VisualView v={{ kind: "scene", scene: "ak-reiter-sitz" }} decorative />
          </div>
        </Link>

        <Link href="/spielen" className={`${styles.tile} ${styles.games}`}>
          <span className={styles.tileIcon} aria-hidden>
            <Icon name="puzzle" />
          </span>
          <span>
            <span className={styles.tileTitle}>Spielen &amp; Wissen</span>
            <span className={styles.tileText}>Quiz, Gangarten erkennen, Pferdepflege und kleine Challenges.</span>
          </span>
          <Icon name="back" className={styles.arrow} aria-hidden />
        </Link>

        <Link href="/hofwelt" className={`${styles.tile} ${styles.world}`}>
          <span className={styles.tileIcon} aria-hidden>
            <Icon name="barn" />
          </span>
          <span>
            <span className={styles.tileTitle}>Die Hofgeschichten-Welt</span>
            <span className={styles.tileText}>Tivoli, Tonga und Scrabble, die Hofkinder und echte Detektivfälle.</span>
          </span>
          <Icon name="back" className={styles.arrow} aria-hidden />
        </Link>

        <aside className={styles.founder} aria-label="Founder-Mitgliedschaft">
          <span className={styles.founderText}>
            <span className={styles.founderKicker}>Founder-Angebot 2026</span>
            <span className={styles.founderTitle}>Mitglied der Hofwelt werden</span>
            <span className={styles.founderSub}>
              Jeden Freitag neue Geschichten, Hofspiele und Detektivfälle – {membership.price} für das erste Jahr.
            </span>
          </span>
          <Link href="/mitgliedschaft" className={styles.founderLink}>
            Mehr erfahren
          </Link>
        </aside>
      </div>

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
  const price = "€14.90";
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
