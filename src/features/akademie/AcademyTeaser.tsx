"use client";

import Link from "next/link";
import { Icon } from "@/components/illustrations/Icons";
import { ACADEMY_TITLE, allLessons } from "@/content/akademie";
import { VisualView } from "@/engine/VisualView";
import { useProgress } from "@/lib/progress/store";
import { academyDoneCount } from "./progress";
import styles from "./akademie.module.css";

/** Große Karte auf der Spielen-Seite, die zur Reitakademie führt. */
export function AcademyTeaser() {
  const progress = useProgress();
  const total = allLessons().length;
  const done = academyDoneCount(progress);
  return (
    <Link href="/spielen/akademie" className={styles.teaser}>
      <div className={styles.heroArt} aria-hidden>
        <VisualView v={{ kind: "scene", scene: "ak-reiter-sitz" }} decorative />
      </div>
      <div className={styles.teaserBody}>
        <p className={styles.heroKicker}>Neu · kostenlos</p>
        <h2 className={styles.teaserTitle}>{ACADEMY_TITLE}</h2>
        <p className={styles.heroText}>8 Lernwelten, {total} Lektionen und 4 Mini-Spiele rund ums Reiten.</p>
        {done > 0 && (
          <div>
            <p className={styles.meterLabel}>
              {done} von {total} Lektionen geschafft
            </p>
            <div className={styles.meter} aria-hidden>
              <span style={{ width: `${(done / total) * 100}%` }} />
            </div>
          </div>
        )}
        <span className={styles.teaserGo}>
          {done > 0 ? "Weiterlernen" : "Los geht's"}
          <Icon name="play" />
        </span>
      </div>
    </Link>
  );
}
