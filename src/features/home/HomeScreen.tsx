import Link from "next/link";
import { FarmBackdrop } from "@/components/illustrations/FarmBackdrop";
import { Horse } from "@/components/illustrations/Horse";
import { Icon, type IconName } from "@/components/illustrations/Icons";
import { KidPortrait } from "@/components/illustrations/KidPortrait";
import { SpeakButton } from "@/components/ui/SpeakButton";
import { characters } from "@/content/characters";
import { horses } from "@/content/horses";
import { site } from "@/content/site";
import { LevelSwitch } from "@/components/ui/LevelSwitch";
import { publishedAdventures } from "@/content/adventures";
import { AdventureCover } from "@/features/adventure/AdventureCover";
import { UI_SPEECH } from "@/content/ui-speech";
import styles from "./HomeScreen.module.css";

const featured = publishedAdventures[0];

type Tile = { href: string; label: string; spoken: string; icon: IconName; tone: string; hidden?: boolean };

const ALL_TILES: Tile[] = [
  { href: "/hoeren", label: "Hörspiele", spoken: UI_SPEECH.tileListen, icon: "headphones", tone: "forest", hidden: !site.features.audio },
  { href: "/pferde", label: "Die Pferde", spoken: UI_SPEECH.tileHorses, icon: "horseshoe", tone: "brown" },
  { href: "/spielen", label: "Spielen", spoken: UI_SPEECH.tileGames, icon: "puzzle", tone: "forest" },
  { href: "/abenteuer", label: "Abenteuer", spoken: UI_SPEECH.tileAdventures, icon: "lupe", tone: "sand" },
  { href: "/pass", label: "Mein Pass", spoken: UI_SPEECH.tilePass, icon: "pass", tone: "ivory" },
];
const TILES = ALL_TILES.filter((t) => !t.hidden);

/* Position der Pferde in der Landschaft (Prozent der Bühne) */
const STAGE = [
  { left: "2%", bottom: "13%", width: "38%", flip: false, z: 3 },
  { left: "33%", bottom: "21%", width: "36%", flip: true, z: 2 },
  { left: "62%", bottom: "11%", width: "37%", flip: true, z: 4 },
];

export function HomeScreen() {
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
          <p className={styles.producer}>{site.producer}</p>
          <h1 id="home-title" className={styles.title}>
            Die Hof&shy;geschichten
          </h1>
          <p className={styles.claim}>{site.claim}</p>
          <SpeakButton
            className={styles.titleSpeak}
            text={UI_SPEECH.welcome}
            label="Begrüßung vorlesen"
          />
        </div>
      </section>

      <div className={styles.levelRow}>
        <p className={styles.levelLabel}>Wie schwer soll es sein?</p>
        <LevelSwitch />
      </div>

      {featured && (
        <Link href={`/abenteuer/${featured.slug}`} className={styles.featured}>
          <div className={styles.featuredArt}>
            <AdventureCover slug={featured.slug} />
          </div>
          <div className={styles.featuredBody}>
            <span className={styles.featuredKicker}>Neues Detektiv-Abenteuer</span>
            <span className={styles.featuredTitle}>{featured.title}</span>
            <span className={styles.featuredTeaser}>{featured.teaser}</span>
          </div>
        </Link>
      )}

      <section className={styles.tiles} aria-label="Bereiche">
        {TILES.map((t) => (
          <div key={t.href} className={`${styles.tile} ${styles[t.tone]}`}>
            <Link href={t.href} className={styles.tileLink}>
              <span className={styles.tileIcon}>
                <Icon name={t.icon} />
              </span>
              <span className={styles.tileLabel}>{t.label}</span>
            </Link>
            <SpeakButton text={t.spoken} label={`${t.label} vorlesen`} size="sm" className={styles.tileSpeak} />
          </div>
        ))}
      </section>

      <section className={styles.kids} aria-labelledby="kids-title">
        <h2 id="kids-title" className={styles.kidsTitle}>
          Die Hofkinder & Krümel
        </h2>
        <ul className={styles.kidList}>
          {characters.map((c) => (
            <li key={c.slug} className={styles.kid}>
              <KidPortrait kid={c} className={styles.kidPortrait} />
              <span className={styles.kidName}>{c.name}</span>
            </li>
          ))}
          <li className={styles.kid}>
            {/* eslint-disable-next-line @next/next/no-img-element -- statische WebP-Dateien mit srcset */}
            <img
              src="/kids/kruemel-320.webp"
              srcSet="/kids/kruemel-160.webp 160w, /kids/kruemel-320.webp 320w, /kids/kruemel-640.webp 640w"
              sizes="110px"
              width={320}
              height={320}
              alt="Krümel, ein fröhlicher Hund mit hellem Fell und braunen Schlappohren"
              className={styles.kidPortrait}
              style={{ aspectRatio: "1", objectFit: "cover", background: "#FBF7EE" }}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
            <span className={styles.kidName}>Krümel</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
