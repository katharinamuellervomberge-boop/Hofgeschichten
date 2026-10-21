"use client";

import Link from "next/link";
import { Icon } from "@/components/illustrations/Icons";
import { StampSeal } from "@/components/illustrations/StampSeal";
import { PageHeader } from "@/components/ui/PageHeader";
import { getWorld } from "@/content/akademie";
import { academyStamps } from "@/content/akademie/stamps";
import { earnedStamps } from "@/lib/progress/stamps";
import { useProgress } from "@/lib/progress/store";
import { lessonDone, lessonHref, nextLesson, worldDoneCount } from "./progress";
import styles from "./akademie.module.css";

/** Eine Lernwelt mit ihren fünf Lektionen. */
export function WorldScreen({ slug }: { slug: string }) {
  const world = getWorld(slug);
  const progress = useProgress();
  if (!world) return null;
  const stamp = academyStamps().find((s) => s.id === world.badge.id)!;
  const has = earnedStamps(progress).has(stamp.id);
  const count = worldDoneCount(progress, world);
  const next = nextLesson(progress, world);

  return (
    <div className="page">
      <PageHeader title={world.title} backHref="/spielen/akademie" backLabel="Zurück zur Reitakademie" />
      <div className={styles.stack}>
        <section className={styles.worldHead} style={{ background: world.tint }} aria-label="Abzeichen dieser Lernwelt">
          <div>
            <p className="eyebrow">Lernwelt {world.number} · Abzeichen</p>
            <p className={styles.badgeName}>{stamp.title}</p>
            <p className={styles.worldTeaser}>
              {has ? "Geschafft! Das Abzeichen ist in deinem Pass." : `${count} von ${world.lessons.length} Lektionen geschafft`}
            </p>
          </div>
          <StampSeal stamp={stamp} earned={has} tilt={-8} className={styles.worldHeadSeal} />
        </section>

        <ol className={styles.lessons}>
          {world.lessons.map((l) => {
            const done = lessonDone(progress, l);
            const isNext = !has && l.id === next.id;
            return (
              <li key={l.id}>
                <Link href={lessonHref(world, l)} className={`${styles.lessonRow} ${isNext ? styles.lessonNext : ""}`}>
                  <span className={`${styles.lessonNum} ${done ? styles.lessonNumDone : ""}`} aria-hidden>
                    {done ? <Icon name="check" /> : l.number}
                  </span>
                  <span>
                    <span className={styles.lessonTitle}>{l.title}</span>
                    <br />
                    <span className={styles.lessonMeta}>
                      Lektion {l.number}
                      {done ? " · geschafft" : isNext ? " · als Nächstes" : ""}
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
