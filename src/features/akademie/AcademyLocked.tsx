"use client";

import Link from "next/link";
import { Icon } from "@/components/illustrations/Icons";
import { PageHeader } from "@/components/ui/PageHeader";
import { moduleHref, moduleLessons, moduleOfLesson } from "@/content/akademie/module";
import { useProgress } from "@/lib/progress/store";
import { AcademyBuyBox } from "./AcademyHome";
import { lessonHref } from "./progress";
import styles from "./academy.module.css";

/**
 * Gesperrte Lektion oder gesperrtes Spiel – ohne Inhalte.
 * Zeigt die Probelektion des Moduls und den Weg zur Freischaltung.
 */
export function AcademyLocked({ title, lessonId }: { title: string; lessonId?: string }) {
  const progress = useProgress();
  const mod = lessonId ? moduleOfLesson(lessonId) : undefined;
  const trial = mod ? moduleLessons(mod).find((x) => x.trial) : undefined;
  return (
    <div className="page">
      <PageHeader title={title} backHref={mod ? moduleHref(mod) : "/akademie"} backLabel={mod ? `Zurück zu „${mod.title}“` : "Zurück zur Reitakademie"} />
      <div className={styles.page}>
        <p className={styles.note}>
          <Icon name="lock" />
          <span>Diese Lektion gehört zur Reitakademie. Die erste Lektion jedes Moduls kannst du kostenlos ausprobieren.</span>
        </p>
        {trial && (
          <Link href={lessonHref(trial.world, trial.lesson)} className={styles.row}>
            <span className={styles.rowIcon} aria-hidden>
              <Icon name="play" />
            </span>
            <span>
              <span className={styles.rowTitle}>{trial.lesson.title}</span>
              <span className={styles.rowMeta}>Probelektion · kostenlos</span>
            </span>
            <Icon name="back" className={styles.rowGo} aria-hidden />
          </Link>
        )}
        <AcademyBuyBox path={progress.settings.academyPath} />
      </div>
    </div>
  );
}
