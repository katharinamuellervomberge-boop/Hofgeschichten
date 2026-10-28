"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import { Icon } from "@/components/illustrations/Icons";
import { StampSeal } from "@/components/illustrations/StampSeal";
import { PageHeader } from "@/components/ui/PageHeader";
import { getWorld, worlds } from "@/content/akademie";
import { academyOrder, moduleHref, moduleOfLesson } from "@/content/akademie/module";
import { academyStamps, PROFI_STAMP_ID } from "@/content/akademie/stamps";
import { ActivityPlayer } from "@/engine/ActivityPlayer";
import type { AcademyLesson } from "@/content/akademie/types";
import type { AcademyVideo } from "@/content/akademie/videos";
import { LessonVideo } from "./LessonVideo";
import { pick, type Activity } from "@/engine/types";
import { VisualView } from "@/engine/VisualView";
import { earnedStamps } from "@/lib/progress/stamps";
import { progressActions, useProgress } from "@/lib/progress/store";
import { lessonHref, worldDone } from "./progress";
import styles from "./akademie.module.css";

/**
 * Eine Lektion: Startbild mit Stufenwahl, dann der Ablauf im Spielkern, am Ende Merksatz und Abzeichen.
 * Lektion und Ablauf kommen vom Server (bei der Großen Akademie erst nach der Freischaltung).
 */
export function LessonScreen({
  worldSlug,
  lesson,
  activity: base,
  video,
  unlocked,
}: {
  worldSlug: string;
  lesson: AcademyLesson;
  activity: Activity;
  video?: AcademyVideo;
  /** Reitakademie gekauft? Sonst sind nur die Probelektionen offen. */
  unlocked: boolean;
}) {
  const world = getWorld(worldSlug);
  const progress = useProgress();
  const level = progress.settings.level ?? "leicht";

  const activity: Activity = useMemo(
    () => ({
      ...base,
      intro: {
        leicht: `Lektion ${lesson.number}: ${lesson.title}. Tippe auf Start!`,
        mittel: `Lektion ${lesson.number}: ${lesson.title}. Einstieg, Erklärung, Übung, Quiz und Merksatz – los geht's!`,
      },
    }),
    [base, lesson],
  );

  useEffect(() => {
    if (world) progressActions.setLast({ href: lessonHref(world, lesson), title: lesson.title, area: "Reitakademie" });
  }, [world, lesson]);

  if (!world) return null;

  // Reihenfolge der Module: nächste Lektion im Modul, danach das nächste Modul
  const mod = moduleOfLesson(lesson.id);
  const order = academyOrder();
  const pos = order.findIndex((x) => x.lesson.id === lesson.id);
  const following = order[pos + 1];
  const backHref = mod ? moduleHref(mod) : "/akademie";
  const next = !following
    ? { href: "/akademie", label: "Zur Reitakademie" }
    : !unlocked && !following.trial
      ? { href: "/akademie#ak-buy", label: "Alle Lektionen freischalten" }
      : { href: lessonHref(following.world, following.lesson), label: mod && moduleOfLesson(following.lesson.id)?.id !== mod.id ? "Nächstes Modul" : "Nächste Lektion" };

  return (
    <div className="page">
      <PageHeader title={lesson.title} backHref={backHref} backLabel={mod ? `Zurück zu „${mod.title}“` : "Zurück zur Reitakademie"} />
      <div className={styles.stack}>
        {level === "leicht" && lesson.readTogether && (
          <p className={styles.hint}>
            <Icon name="parents" />
            <span>In dieser Lektion gibt es mehr zu lesen. Lies sie am besten zusammen mit einem Erwachsenen.</span>
          </p>
        )}
        {video && <LessonVideo video={video} />}
        <ActivityPlayer
          activity={activity}
          tint={world.tint}
          introArt={<VisualView v={lesson.illustration} />}
          onComplete={() => progressActions.completeGame(lesson.id)}
          renderDone={({ replay }) => <LessonDone worldId={world.id} lessonId={lesson.id} merksatz={pick(lesson.merksatz, level)} next={next} replay={replay} />}
        />
        {lesson.practiceNote && <p className={styles.practice}>Hinweis für Erwachsene: {lesson.practiceNote}</p>}
      </div>
    </div>
  );
}

function LessonDone({
  worldId,
  merksatz,
  next,
  replay,
}: {
  worldId: string;
  lessonId: string;
  merksatz: string;
  next: { href: string; label: string };
  replay: () => void;
}) {
  const progress = useProgress();
  const world = worlds.find((w) => w.id === worldId)!;
  const stamps = academyStamps();
  const earned = earnedStamps(progress);
  const worldStamp = stamps.find((s) => s.id === world.badge.id)!;
  const profiStamp = stamps.find((s) => s.id === PROFI_STAMP_ID)!;
  const profi = earned.has(PROFI_STAMP_ID);
  const badge = worldDone(progress, world);

  return (
    <div className={styles.done} role="status">
      {profi ? (
        <StampSeal stamp={profiStamp} earned tilt={-8} className={styles.doneSeal} />
      ) : badge ? (
        <StampSeal stamp={worldStamp} earned tilt={-8} className={styles.doneSeal} />
      ) : (
        <span className={styles.doneCheck} aria-hidden>
          <Icon name="check" />
        </span>
      )}
      <h2 className={styles.doneTitle}>{profi ? "Reitwissen-Profi!" : "Geschafft!"}</h2>
      <p className={styles.doneText}>
        {profi
          ? "Du hast alle 40 Lektionen der Reitakademie geschafft. Die Auszeichnung „Hofgeschichten – Reitwissen-Profi“ ist in deinem Pass."
          : badge
            ? `Eine ganze Lernreihe geschafft! Das Abzeichen „${worldStamp.title}“ ist in deinem Pass.`
            : "Lektion geschafft. Weiter so!"}
      </p>
      <div className={styles.merk}>
        <p className={styles.merkLabel}>Merksatz</p>
        <p className={styles.merkText}>{merksatz}</p>
      </div>
      <div className={styles.actions}>
        <button type="button" className={styles.btn} onClick={replay}>
          <Icon name="replay" />
          Nochmal
        </button>
        {badge || profi ? (
          <Link href="/pass" className={`${styles.btn} ${styles.btnPrimary}`}>
            <Icon name="pass" />
            Zum Pass
          </Link>
        ) : null}
        <Link href={next.href} className={`${styles.btn} ${badge || profi ? "" : styles.btnPrimary} ${styles.btnNext}`}>
          {next.label}
          <Icon name="back" />
        </Link>
      </div>
    </div>
  );
}
