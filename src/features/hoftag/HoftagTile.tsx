import Link from "@/i18n/Link";
import { Icon } from "@/components/illustrations/Icons";
import { meinTagAmHof } from "@/content/products";
import { Scene } from "./Scene";
import styles from "./hoftag.module.css";

/** Kachel für „Mein Tag am Hof“ (Spielen, Start) */
export function HoftagTile({ kicker = "Neu · Spiel" }: { kicker?: string }) {
  return (
    <Link href="/hoftag" className={styles.tile} aria-labelledby="tile-hoftag">
      <span className={styles.tileArt} aria-hidden>
        <Scene scene="paddock" time="morgen" horse="tivoli" />
      </span>
      <span className={styles.tileBody}>
        <span className={styles.tileKicker}>{kicker}</span>
        <span id="tile-hoftag" className={styles.tileTitle}>
          Mein Tag am Hof
        </span>
        <span className={styles.tileText}>
          {meinTagAmHof.subtitle} Kümmere dich einen ganzen Tag um Tivoli, Tonga oder Scrabble – vom Frühstück bis zum Abendheu.
        </span>
        <span className={styles.tileCta}>
          Zum Hof
          <Icon name="play" />
        </span>
      </span>
    </Link>
  );
}
