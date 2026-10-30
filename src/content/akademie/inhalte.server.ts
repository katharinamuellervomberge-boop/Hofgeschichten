import "server-only";
import { grossAcademyGames } from "./spiele-gross.server";
import { freeAcademyGames } from "./spiele";
import type { AcademyGame, AcademyLesson, AcademyTier, AcademyWorld } from "./types";
import type { Locale } from "@/i18n/locale";
import { translateDeep, type Dict } from "@/i18n/translate";
import { EN_WORLD_DICTS } from "./en/welten.server";
import spieleEn from "./en/spiele.json";
import katalogEn from "./en/katalog.json";
import { welt1 } from "./welten/w1-bevor-du-aufsteigst.server";
import { welt2 } from "./welten/w2-reitersitz.server";
import { welt3 } from "./welten/w3-hilfen.server";
import { welt4 } from "./welten/w4-schritt.server";
import { welt5 } from "./welten/w5-trab.server";
import { welt6 } from "./welten/w6-galopp.server";
import { welt7 } from "./welten/w7-reitbahn.server";
import { welt8 } from "./welten/w8-fair.server";
import { welt9 } from "./welten/w9-pferde-verstehen.server";
import { welt10 } from "./welten/w10-pflege-umgang.server";
import { welt11 } from "./welten/w11-bahnfiguren.server";
import { welt12 } from "./welten/w12-besser-reiten.server";
import { welt13 } from "./welten/w13-dressur.server";
import { welt14 } from "./welten/w14-springen.server";

/**
 * Alle Inhalte der Reitakademie – NUR auf dem Server.
 * Die Seiten laden eine Lektion hier, prüfen bei der Großen Akademie die
 * Freischaltung und geben erst dann den Inhalt an den Browser.
 */

export const freeWorlds: AcademyWorld[] = [welt1, welt2, welt3];
export const grossWorlds: AcademyWorld[] = [welt4, welt5, welt6, welt7, welt8, welt9, welt10, welt11, welt12, welt13, welt14];
export const fullWorlds: AcademyWorld[] = [...freeWorlds, ...grossWorlds];

export const allAcademyGames: AcademyGame[] = [...freeAcademyGames, ...grossAcademyGames];
export { grossAcademyGames };

export function tierOfWorld(w: AcademyWorld): AcademyTier {
  return grossWorlds.includes(w) ? "gross" : "klein";
}

export function tierOfGame(g: AcademyGame): AcademyTier {
  return grossAcademyGames.includes(g) ? "gross" : "klein";
}

export function loadLesson(
  worldSlug: string,
  lessonSlug: string,
  locale: Locale = "de",
): { world: AcademyWorld; lesson: AcademyLesson; tier: AcademyTier } | undefined {
  const world = fullWorlds.find((w) => w.slug === worldSlug);
  const lesson = world?.lessons.find((l) => l.slug === lessonSlug);
  if (!world || !lesson) return undefined;
  const tier = tierOfWorld(world);
  if (locale !== "en") return { world, lesson, tier };
  // Englisch: Lektionstexte aus dem Wörterbuch der Lernwelt, Titel aus dem Katalog
  const dict: Dict = { ...(katalogEn as Dict), ...(EN_WORLD_DICTS[world.id] ?? {}) };
  return { world: translateDeep({ ...world, lessons: [] }, dict), lesson: translateDeep(lesson, dict), tier };
}

export function loadAcademyGame(slug: string, locale: Locale = "de"): { game: AcademyGame; tier: AcademyTier } | undefined {
  const game = allAcademyGames.find((g) => g.slug === slug);
  if (!game) return undefined;
  const tier = tierOfGame(game);
  return { game: locale === "en" ? translateDeep(game, { ...(katalogEn as Dict), ...(spieleEn as Dict) }) : game, tier };
}
