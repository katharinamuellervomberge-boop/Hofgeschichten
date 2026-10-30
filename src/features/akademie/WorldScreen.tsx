"use client";

import Link from "@/i18n/Link";
import { Icon } from "@/components/illustrations/Icons";
import { StampSeal } from "@/components/illustrations/StampSeal";
import { PageHeader } from "@/components/ui/PageHeader";
import { getWorld } from "@/content/akademie";
import { isTrialLesson } from "@/content/akademie/module";
import { academyStamps } from "@/content/akademie/stamps";
import { earnedStamps } from "@/lib/progress/stamps";
import { useProgress } from "@/lib/progress/store";
import { useLocale } from "@/i18n/LocaleProvider";
import { lessonDone, lessonHref, nextLesson, worldDoneCount } from "./progress";
import styles from "./akademie.module.css";

/** Eine Lernwelt mit ihren fünf Lektionen. */
export function WorldScreen({ slug, unlocked }: { slug: string; unlocked: boolean }) {
  const locale = useLocale();
  const en = locale === "en";
  const world = getWorld(slug, locale);
  const progress = useProgress();
  if (!world) return null;
  const stamp = { ...academyStamps().find((s) => s.id === world.badge.id)!, title: world.badge.title };
  const has = earnedStamps(progress).has(stamp.id);
  const count = worldDoneCount(progress, world);
  const next = nextLesson(progress, world);

  return (
    <div className="page">
      <PageHeader title={world.title} backHref="/akademie" backLabel={en ? "Back to the Riding Academy" : "Zurück zur Reitakademie"} />
      <div className={styles.stack}>
        <section className={styles.worldHead} style={{ background: world.tint }} aria-label={en ? "Badge for this learning world" : "Abzeichen dieser Lernwelt"}>
          <div>
            <p className="eyebrow">{en ? `Learning world ${world.number} · Badge` : `Lernwelt ${world.number} · Abzeichen`}</p>
            <p className={styles.badgeName}>{stamp.title}</p>
            <p className={styles.worldTeaser}>
              {en
                ? has
                  ? "Done! The badge is in your pass."
                  : `${count} of ${world.lessons.length} lessons done`
                : has
                  ? "Geschafft! Das Abzeichen ist in deinem Pass."
                  : `${count} von ${world.lessons.length} Lektionen geschafft`}
            </p>
          </div>
          <StampSeal stamp={stamp} earned={has} tilt={-8} className={styles.worldHeadSeal} />
        </section>

        <ol className={styles.lessons}>
          {world.lessons.map((l) => {
            const done = lessonDone(progress, l);
            const isNext = !has && l.id === next.id;
            const open = unlocked || isTrialLesson(l.id);
            return (
              <li key={l.id}>
                <Link href={lessonHref(world, l)} className={`${styles.lessonRow} ${isNext ? styles.lessonNext : ""}`}>
                  <span className={`${styles.lessonNum} ${done ? styles.lessonNumDone : ""}`} aria-hidden>
                    {done ? <Icon name="check" /> : open ? l.number : <Icon name="lock" />}
                  </span>
                  <span>
                    <span className={styles.lessonTitle}>{l.title}</span>
                    <br />
                    <span className={styles.lessonMeta}>
                      {en ? "Lesson" : "Lektion"} {l.number}
                      {en
                        ? done
                          ? " · done"
                          : !open
                            ? " · in the full academy"
                            : !unlocked
                              ? " · sample lesson"
                              : isNext
                                ? " · up next"
                                : ""
                        : done
                          ? " · geschafft"
                          : !open
                            ? " · in der Reitakademie"
                            : !unlocked
                              ? " · Probelektion"
                              : isNext
                                ? " · als Nächstes"
                                : ""}
                    </span>
                  </span>
                  <Icon name="back" className={styles.lessonGo} aria-hidden />
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
