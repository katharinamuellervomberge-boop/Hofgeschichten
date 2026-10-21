import { allLessons, worlds } from "@/content/akademie";
import type { AcademyLesson, AcademyWorld } from "@/content/akademie/types";
import type { Progress } from "@/lib/progress/types";

/** Lektion mindestens einmal abgeschlossen? (gespeichert wie die Lernspiele unter progress.games) */
export function lessonDone(p: Progress, lesson: AcademyLesson): boolean {
  return (p.games[lesson.id]?.completedCount ?? 0) > 0;
}

export function worldDoneCount(p: Progress, world: AcademyWorld): number {
  return world.lessons.filter((l) => lessonDone(p, l)).length;
}

export function worldDone(p: Progress, world: AcademyWorld): boolean {
  return worldDoneCount(p, world) === world.lessons.length;
}

export function academyDoneCount(p: Progress): number {
  return allLessons().filter((l) => lessonDone(p, l)).length;
}

export function worldsDoneCount(p: Progress): number {
  return worlds.filter((w) => worldDone(p, w)).length;
}

/** Erste noch nicht abgeschlossene Lektion einer Welt (oder die erste, wenn alles fertig ist) */
export function nextLesson(p: Progress, world: AcademyWorld): AcademyLesson {
  return world.lessons.find((l) => !lessonDone(p, l)) ?? world.lessons[0];
}

export function lessonHref(world: AcademyWorld, lesson: AcademyLesson): string {
  return `/spielen/akademie/${world.slug}/${lesson.slug}`;
}

export function worldHref(world: AcademyWorld): string {
  return `/spielen/akademie/${world.slug}`;
}
