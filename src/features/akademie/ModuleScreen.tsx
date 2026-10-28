"use client";

import Link from "next/link";
import { Icon } from "@/components/illustrations/Icons";
import { PageHeader } from "@/components/ui/PageHeader";
import { getModule, moduleLessons, type ModuleLesson } from "@/content/akademie/module";
import { getAcademyGameInfo } from "@/content/akademie";
import { useProgress } from "@/lib/progress/store";
import { AcademyBuyBox } from "./AcademyHome";
import { lessonDone, lessonHref } from "./progress";
import styles from "./academy.module.css";

/** Ein Modul der Reitakademie: Themen mit ihren Lektionen, Probelektion offen, Rest nach Freischaltung. */
export function ModuleScreen({ slug, unlocked }: { slug: string; unlocked: boolean }) {
  const progress = useProgress();
  const m = getModule(slug);
  if (!m) return null;
  const lessons = moduleLessons(m);
  const done = lessons.filter((x) => lessonDone(progress, x.lesson)).length;
  const open = (x: ModuleLesson) => unlocked || x.trial;
  const next = lessons.find((x) => open(x) && !lessonDone(progress, x.lesson));
  const grown = progress.settings.academyPath === "teen" || progress.settings.academyPath === "adult";

  return (
    <div className="page">
      <PageHeader title={m.title} backHref="/akademie" backLabel="Zurück zur Reitakademie" />
      <div className={styles.page}>
        <section className={styles.moduleHead} style={{ background: m.tint }}>
          <p className={styles.eyebrow}>Modul {m.number} von 6</p>
          <p className={styles.moduleHeadTitle}>{grown ? m.teaser.grown : m.teaser.kids}</p>
          <p className={styles.small}>
            {done} von {lessons.length} Lektionen geschafft
            {!unlocked && " · die erste Lektion ist kostenlos"}
          </p>
        </section>

        <ol className={styles.topics}>
          {m.topics.map((t) => (
            <li key={t.title}>
              <h2 className={styles.topicTitle}>{t.title}</h2>
              <ul className={styles.rows}>
                {lessons
                  .filter((x) => x.topic === t.title)
                  .map((x) => {
                    const isDone = lessonDone(progress, x.lesson);
                    const isOpen = open(x);
                    const isNext = next?.lesson.id === x.lesson.id;
                    return (
                      <li key={x.lesson.id}>
                        <Link
                          href={lessonHref(x.world, x.lesson)}
                          className={`${styles.row} ${isNext ? styles.rowNext : ""} ${!isOpen ? styles.rowLocked : ""}`}
                          aria-label={`${x.lesson.title}${isDone ? ", geschafft" : ""}${!isOpen ? ", in der Reitakademie" : ""}`}
                        >
                          <span className={`${styles.rowIcon} ${isDone ? styles.rowIconDone : ""}`} aria-hidden>
                            <Icon name={isDone ? "check" : isOpen ? "play" : "lock"} />
                          </span>
                          <span>
                            <span className={styles.rowTitle}>{x.lesson.title}</span>
                            <span className={styles.rowMeta}>
                              {x.trial && !unlocked ? "Probelektion · kostenlos" : isDone ? "geschafft" : isNext ? "als Nächstes" : isOpen ? "Lektion" : "in der Reitakademie"}
                            </span>
                          </span>
                          <Icon name="back" className={styles.rowGo} aria-hidden />
                        </Link>
                      </li>
                    );
                  })}
                {(t.games ?? []).map((g) => {
                  const info = getAcademyGameInfo(g);
                  if (!info) return null;
                  const isOpen = unlocked || info.tier === "klein";
                  return (
                    <li key={g}>
                      <Link href={`/akademie/spiele/${g}`} className={`${styles.row} ${!isOpen ? styles.rowLocked : ""}`}>
                        <span className={styles.rowIcon} aria-hidden>
                          <Icon name={isOpen ? "puzzle" : "lock"} />
                        </span>
                        <span>
                          <span className={styles.rowTitle}>{info.title}</span>
                          <span className={styles.rowMeta}>Übung{isOpen ? "" : " · in der Reitakademie"}</span>
                        </span>
                        <Icon name="back" className={styles.rowGo} aria-hidden />
                      </Link>
                    </li>
                  );
                })}
                {t.link && (
                  <li>
                    <Link href={t.link.href} className={styles.row}>
                      <span className={styles.rowIcon} aria-hidden>
                        <Icon name="star" />
                      </span>
                      <span>
                        <span className={styles.rowTitle}>{t.link.label}</span>
                        <span className={styles.rowMeta}>nach dem Abschlussquiz</span>
                      </span>
                      <Icon name="back" className={styles.rowGo} aria-hidden />
                    </Link>
                  </li>
                )}
                {t.lessons.length === 0 && !t.games && !t.link && (
                  <li>
                    <span className={`${styles.row} ${styles.rowSoon}`}>
                      <span className={styles.rowIcon} aria-hidden>
                        <Icon name="star" />
                      </span>
                      <span>
                        <span className={styles.rowTitle}>{t.title}</span>
                        <span className={styles.rowMeta}>In Vorbereitung – kommt in die Reitakademie dazu</span>
                      </span>
                      <span />
                    </span>
                  </li>
                )}
              </ul>
            </li>
          ))}
        </ol>

        {!unlocked && <AcademyBuyBox path={progress.settings.academyPath} compact />}
      </div>
    </div>
  );
}
