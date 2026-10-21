import { lessonActivity } from "./activity";
import type { AcademyLesson, AcademyWorld } from "./types";
import { welt1 } from "./welten/w1-bevor-du-aufsteigst";
import { welt2 } from "./welten/w2-reitersitz";
import { welt3 } from "./welten/w3-hilfen";
import { welt4 } from "./welten/w4-schritt";
import { welt5 } from "./welten/w5-trab";
import { welt6 } from "./welten/w6-galopp";
import { welt7 } from "./welten/w7-reitbahn";
import { welt8 } from "./welten/w8-fair";

/**
 * Die kleine Reitakademie – kostenlos, ohne Freischaltung.
 * Reihenfolge der Welten = Reihenfolge in der App.
 */
export const worlds: AcademyWorld[] = [welt1, welt2, welt3, welt4, welt5, welt6, welt7, welt8];

export const ACADEMY_TITLE = "Die kleine Reitakademie";
export const PROFI_TITLE = "Hofgeschichten – Reitwissen-Profi";

export function getWorld(slug: string): AcademyWorld | undefined {
  return worlds.find((w) => w.slug === slug);
}

export function getLesson(worldSlug: string, lessonSlug: string): { world: AcademyWorld; lesson: AcademyLesson } | undefined {
  const world = getWorld(worldSlug);
  const lesson = world?.lessons.find((l) => l.slug === lessonSlug);
  return world && lesson ? { world, lesson } : undefined;
}

export function allLessons(): AcademyLesson[] {
  return worlds.flatMap((w) => w.lessons);
}

export function lessonIds(world: AcademyWorld): string[] {
  return world.lessons.map((l) => l.id);
}

export { lessonActivity };
