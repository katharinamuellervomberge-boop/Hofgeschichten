"use client";

import Link from "@/i18n/Link";
import { Icon } from "@/components/illustrations/Icons";
import { Certificate } from "./Certificate";
import { StallDecorator, useAdvent } from "./DecorateGame";
import styles from "./advent.module.css";

/** „Mein Weihnachtsstall“ – jederzeit schmücken, alles bleibt auf diesem Gerät gespeichert. */
export function StallScreen({ query }: { query: string }) {
  return (
    <div className={styles.page}>
      <div className={styles.doorPage} style={{ maxWidth: 1080 }}>
        <div className={styles.topRow}>
          <Link href={`/adventskalender${query}`} className={styles.backLink}>
            <Icon name="back" />
            Kalender
          </Link>
          <span className={styles.dateTag}>Dein Weihnachtsstall</span>
        </div>
        <header className={styles.partHead}>
          <h1 className={styles.partTitle}>Mein Weihnachtsstall</h1>
          <p className={styles.partIntro}>Hinter vielen Türchen wartet neuer Schmuck. Hänge ihn auf, wie es dir gefällt – alles pferdesicher hoch oben.</p>
        </header>
        <StallDecorator wide />
      </div>
    </div>
  );
}

/** Urkunde – erst nach Türchen 24 */
export function CertificateScreen({ query }: { query: string }) {
  const done = Boolean(useAdvent().doors["24"]);
  return (
    <div className={styles.page}>
      <div className={styles.doorPage} style={{ maxWidth: 900 }}>
        <div className={styles.topRow}>
          <Link href={`/adventskalender${query}`} className={styles.backLink}>
            <Icon name="back" />
            Kalender
          </Link>
        </div>
        {done ? (
          <>
            <header className={styles.partHead}>
              <h1 className={styles.partTitle}>Deine Weihnachtsurkunde</h1>
            </header>
            <div className={styles.panel}>
              <Certificate />
            </div>
          </>
        ) : (
          <div className={styles.lockedBox}>
            <Icon name="lock" className={styles.bigLock} />
            <h1 className={styles.lockedTitle}>Die Urkunde wartet hinter Türchen 24</h1>
            <p className={styles.lockedText}>Wenn du das Geheimnis des Winterhofs gelöst hast, kannst du hier deine Urkunde ausdrucken.</p>
          </div>
        )}
      </div>
    </div>
  );
}
