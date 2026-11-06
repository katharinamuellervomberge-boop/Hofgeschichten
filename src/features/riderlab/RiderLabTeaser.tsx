"use client";

import Link from "@/i18n/Link";
import { Icon } from "@/components/illustrations/Icons";
import { riderLabCatalog, riderLabHref, RIDER_LAB_SUB, RIDER_LAB_TITLE } from "@/content/riderlab/katalog";
import { useProgress } from "@/lib/progress/store";
import { labDoneCount } from "./progress";
import ak from "@/features/akademie/academy.module.css";
import styles from "./riderlab.module.css";

/** Einstieg ins Rider Lab auf der Startseite der Reitakademie */
export function RiderLabTeaser({ unlocked }: { unlocked: boolean }) {
  const progress = useProgress();
  const total = riderLabCatalog.reduce((n, a) => n + a.exercises.length, 0);
  const done = labDoneCount(progress, riderLabCatalog);
  return (
    <section aria-labelledby="ak-riderlab">
      <div className={ak.sectionHead}>
        <h2 id="ak-riderlab" className={ak.sectionTitle}>
          {RIDER_LAB_TITLE}
        </h2>
        <span className={ak.sectionMeta}>
          {riderLabCatalog.length} Bereiche · {total} Übungen für zu Hause
        </span>
      </div>
      <Link href={riderLabHref} className={styles.teaser}>
        <div className={styles.teaserArt} aria-hidden>
          <svg viewBox="0 0 280 230" width="100%" height="100%">
            <rect width="280" height="230" fill="#dde3d6" />
            <path d="M20 196 H260" stroke="#c4ac84" strokeWidth="3" />
            <rect x="60" y="192" width="170" height="7" rx="3.5" fill="#5e7360" />
            {/* Halber Kniestand (Hüftöffner) */}
            <path d="M111 192 L126 150" stroke="#4a372a" strokeWidth="15" strokeLinecap="round" />
            <path d="M111 192 L70 194" stroke="#4a372a" strokeWidth="11" strokeLinecap="round" />
            <path d="M126 150 L168 156 L170 192" stroke="#5e4636" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M126 146 L126 88" stroke="#344638" strokeWidth="25" strokeLinecap="round" />
            <circle cx="127" cy="66" r="12" fill="#e8ae86" />
            <path d="M115 64 C116 51 138 51 139 64 C133 58 121 58 115 64 Z" fill="#5a3420" />
            <path d="M114 66 q-6 8 -3 16" stroke="#5a3420" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M126 150 L112 174" stroke="#c99a4e" strokeWidth="18" strokeLinecap="round" opacity=".45" />
            <path d="M150 116 a30 30 0 0 0 -46 0" stroke="#c99a4e" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          </svg>
        </div>
        <div className={styles.teaserBody}>
          <p className={ak.eyebrow}>Neu in der Reitakademie</p>
          <span className={styles.teaserTitle}>{RIDER_LAB_SUB}</span>
          <span className={styles.teaserText}>
            Fitness-, Mobilitäts-, Balance- und Koordinationsübungen gegen typische Sitzprobleme: das lange Bein, Leichttraben, Galopp, die ruhige Hand und der leichte Sitz. Jede
            Übung animiert, mit Timer und Wiederholungszähler.
          </span>
          <span className={ak.moduleMeta}>
            {done > 0 ? (
              <span>
                {done} von {total} Übungen geschafft
              </span>
            ) : !unlocked ? (
              <span className={`${ak.tag} ${ak.tagGold}`}>Je Bereich 1 Probeübung gratis</span>
            ) : (
              <span>Jetzt starten</span>
            )}
            <Icon name="back" className={ak.rowGo} aria-hidden />
          </span>
        </div>
      </Link>
    </section>
  );
}
