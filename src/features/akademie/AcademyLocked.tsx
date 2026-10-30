"use client";

import Link from "@/i18n/Link";
import { Icon } from "@/components/illustrations/Icons";
import { PageHeader } from "@/components/ui/PageHeader";
import { moduleHref, moduleLessons, moduleOfLesson } from "@/content/akademie/module";
import { useProgress } from "@/lib/progress/store";
import { useLocale } from "@/i18n/LocaleProvider";
import { AcademyBuyBox } from "./AcademyHome";
import { lessonHref } from "./progress";
import styles from "./academy.module.css";

/**
 * Gesperrte Lektion oder gesperrtes Spiel – ohne Inhalte.
 * Zeigt die Probelektion des Moduls und den Weg zur Freischaltung.
 */
export function AcademyLocked({ title, lessonId }: { title: string; lessonId?: string }) {
  const locale = useLocale();
  const en = locale === "en";
  const progress = useProgress();
  const mod = lessonId ? moduleOfLesson(lessonId, locale) : undefined;
  const trial = mod ? moduleLessons(mod, locale).find((x) => x.trial) : undefined;
  return (
    <div className="page">
      <PageHeader title={title} backHref={mod ? moduleHref(mod) : "/akademie"} backLabel={en ? (mod ? `Back to “${mod.title}”` : "Back to the Riding Academy") : mod ? `Zurück zu „${mod.title}“` : "Zurück zur Reitakademie"} />
      <div className={styles.page}>
        <p className={styles.note}>
          <Icon name="lock" />
          <span>
            {en
              ? "This lesson is part of the full Riding Academy. You can try the first lesson of every module for free."
              : "Diese Lektion gehört zur Reitakademie. Die erste Lektion jedes Moduls kannst du kostenlos ausprobieren."}
          </span>
        </p>
        {trial && (
          <Link href={lessonHref(trial.world, trial.lesson)} className={styles.row}>
            <span className={styles.rowIcon} aria-hidden>
              <Icon name="play" />
            </span>
            <span>
              <span className={styles.rowTitle}>{trial.lesson.title}</span>
              <span className={styles.rowMeta}>{en ? "Sample lesson · free" : "Probelektion · kostenlos"}</span>
            </span>
            <Icon name="back" className={styles.rowGo} aria-hidden />
          </Link>
        )}
        <AcademyBuyBox path={progress.settings.academyPath} />
      </div>
    </div>
  );
}
