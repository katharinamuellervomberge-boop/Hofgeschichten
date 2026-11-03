import Link from "@/i18n/Link";
import { Icon } from "@/components/illustrations/Icons";
import { WinterStall } from "@/components/illustrations/advent/WinterStall";
import { adventskalender } from "@/content/products";
import styles from "./homeTile.module.css";

/** Startseiten-Kachel für den Adventskalender (eigenes Produkt, Dezember 2026) */
export function AdventHomeTile() {
  return (
    <Link href="/adventskalender" className={styles.tile} aria-labelledby="home-advent">
      <span className={styles.art} aria-hidden>
        <WinterStall decor={{ giebel: "adventskranz", traufe: "tannengirlande", lichter: "lichterkette", laternen: "laternen", baum: "baum-lichter" }} />
      </span>
      <span className={styles.body}>
        <span className={styles.kicker}>Neu · Adventskalender 2026</span>
        <span id="home-advent" className={styles.title}>
          Das Geheimnis des Winterhofs
        </span>
        <span className={styles.text}>{adventskalender.subtitle} Mit Lea, Mila, Ben, Krümel und den Hofpferden – vom 1. bis 24. Dezember.</span>
        <span className={styles.cta}>
          Zum Adventskalender
          <Icon name="play" />
        </span>
      </span>
    </Link>
  );
}
