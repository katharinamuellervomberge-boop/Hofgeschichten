"use client";

import Link from "next/link";
import { Icon } from "@/components/illustrations/Icons";
import { PageHeader } from "@/components/ui/PageHeader";
import type { AcademyLesson } from "@/content/akademie/types";
import type { Release } from "@/content/membership";
import { ActivityPlayer } from "@/engine/ActivityPlayer";
import { pick, type Activity } from "@/engine/types";
import { VisualView } from "@/engine/VisualView";
import { progressActions, useProgress } from "@/lib/progress/store";
import styles from "./hofjahr.module.css";

/** Premium-Lektion der Reitakademie – gleicher Ablauf wie die kostenlosen Lektionen. */
export function PremiumLessonScreen({ release, lesson, activity }: { release: Release; lesson: AcademyLesson; activity: Activity }) {
  const progress = useProgress();
  const level = progress.settings.level ?? "leicht";
  return (
    <div className="page">
      <PageHeader title={lesson.title} backHref="/spielen/akademie" backLabel="Zur Reitakademie">
        Reitakademie · {release.category === "Reitakademie" ? "Kapitel 1: Die Sprache der Pferde" : release.title}
      </PageHeader>
      <div className={styles.stack}>
        <ActivityPlayer
          activity={activity}
          tint="#DDE3D6"
          introArt={<VisualView v={lesson.illustration} />}
          onComplete={() => progressActions.completeGame(lesson.id)}
          renderDone={({ replay }) => (
            <div className={styles.done} role="status">
              <span className={styles.lockIcon} aria-hidden>
                <Icon name="check" />
              </span>
              <h2 className={styles.doneTitle}>Geschafft! Du verstehst die Sprache der Pferde.</h2>
              <p>Das Abzeichen „Pferdeflüsterer“ ist jetzt in deinem Hofjahr.</p>
              <p>
                <strong>Merksatz:</strong> {pick(lesson.merksatz, level)}
              </p>
              <div className={styles.actions}>
                <button type="button" className={styles.btn} onClick={replay}>
                  <Icon name="replay" />
                  Nochmal
                </button>
                <Link href="/hofjahr" className={`${styles.btn} ${styles.btnPrimary}`}>
                  <Icon name="star" />
                  Zu Mein Hofjahr
                </Link>
              </div>
            </div>
          )}
        />
        {lesson.practiceNote && <p className={styles.practice}>Hinweis für Erwachsene: {lesson.practiceNote}</p>}
      </div>
    </div>
  );
}
