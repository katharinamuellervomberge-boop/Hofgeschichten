import "server-only";
import { grossAcademyGames } from "./spiele-gross.server";
import { freeAcademyGames } from "./spiele";
import type { AcademyGame, AcademyLesson, AcademyTier, AcademyWorld } from "./types";
import { welt1 } from "./welten/w1-bevor-du-aufsteigst.server";
import { welt2 } from "./welten/w2-reitersitz.server";
import { welt3 } from "./welten/w3-hilfen.server";
import { welt4 } from "./welten/w4-schritt.server";
import { welt5 } from "./welten/w5-trab.server";
import { welt6 } from "./welten/w6-galopp.server";
import { welt7 } from "./welten/w7-reitbahn.server";
import { welt8 } from "./welten/w8-fair.server";

/**
 * Alle Inhalte der Reitakademie – NUR auf dem Server.
 * Die Seiten laden eine Lektion hier, prüfen bei der Großen Akademie die
 * Freischaltung und geben erst dann den Inhalt an den Browser.
 */

export const freeWorlds: AcademyWorld[] = [welt1, welt2, welt3];
export const grossWorlds: AcademyWorld[] = [welt4, welt5, welt6, welt7, welt8];
export const fullWorlds: AcademyWorld[] = [...freeWorlds, ...grossWorlds];

export const allAcademyGames: AcademyGame[] = [...freeAcademyGames, ...grossAcademyGames];
export { grossAcademyGames };

export function tierOfWorld(w: AcademyWorld): AcademyTier {
  return grossWorlds.includes(w) ? "gross" : "klein";
}

export function tierOfGame(g: AcademyGame): AcademyTier {
  return grossAcademyGames.includes(g) ? "gross" : "klein";
}

export function loadLesson(worldSlug: string, lessonSlug: string): { world: AcademyWorld; lesson: AcademyLesson; tier: AcademyTier } | undefined {
  const world = fullWorlds.find((w) => w.slug === worldSlug);
  const lesson = world?.lessons.find((l) => l.slug === lessonSlug);
  return world && lesson ? { world, lesson, tier: tierOfWorld(world) } : undefined;
}

export function loadAcademyGame(slug: string): { game: AcademyGame; tier: AcademyTier } | undefined {
  const game = allAcademyGames.find((g) => g.slug === slug);
  return game ? { game, tier: tierOfGame(game) } : undefined;
}
