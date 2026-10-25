import { lessonActivity } from "./activity";
import { gameInfo, worldInfo } from "./info";
import { grossGamesInfo, grossWorldsInfo } from "./katalog-gross.generated";
import { freeAcademyGames } from "./spiele";
import type { AcademyGameInfo, AcademyTier, AcademyWorldInfo, LessonInfo } from "./types";
import { welt1 } from "./welten/w1-bevor-du-aufsteigst";
import { welt2 } from "./welten/w2-reitersitz";
import { welt3 } from "./welten/w3-hilfen";

/**
 * Die Reitakademie – Übersicht für den Browser.
 *
 *  Kleine Akademie (kostenlos):   Lernwelten 1–3 + zwei Mini-Spiele
 *  Große Akademie (freischalten): Lernwelten 4–8 + zwei Mini-Spiele,
 *                                 enthalten in der Hof-Mitgliedschaft oder einzeln kaufbar
 *
 * Hier stehen nur Titel, Bilder, Abzeichen und Lektions-IDs. Die Inhalte der
 * Großen Akademie liegen serverseitig (welten/*.server.ts, spiele-gross.server.ts)
 * und werden erst nach der Prüfung ausgeliefert (inhalte.server.ts).
 * Reihenfolge der Welten = Reihenfolge in der App.
 */
export const worlds: AcademyWorldInfo[] = [...[welt1, welt2, welt3].map((w) => worldInfo(w, "klein")), ...grossWorldsInfo];

export const academyGames: AcademyGameInfo[] = [...freeAcademyGames.map((g) => gameInfo(g, "klein")), ...grossGamesInfo];

export const ACADEMY_TITLE = "Die Reitakademie";
export const ACADEMY_TIERS: Record<AcademyTier, { title: string; short: string; href: string }> = {
  klein: { title: "Die kleine Reitakademie", short: "Kleine Akademie", href: "/akademie/klein" },
  gross: { title: "Die große Reitakademie", short: "Große Akademie", href: "/akademie/gross" },
};
export const PROFI_TITLE = "Hofgeschichten – Reitwissen-Profi";

export function getWorld(slug: string): AcademyWorldInfo | undefined {
  return worlds.find((w) => w.slug === slug);
}

export function worldsOf(tier: AcademyTier): AcademyWorldInfo[] {
  return worlds.filter((w) => w.tier === tier);
}

export function gamesOf(tier: AcademyTier): AcademyGameInfo[] {
  return academyGames.filter((g) => g.tier === tier);
}

export function getAcademyGameInfo(slug: string): AcademyGameInfo | undefined {
  return academyGames.find((g) => g.slug === slug);
}

export function allLessons(tier?: AcademyTier): LessonInfo[] {
  return (tier ? worldsOf(tier) : worlds).flatMap((w) => w.lessons);
}

export function lessonIds(world: AcademyWorldInfo): string[] {
  return world.lessons.map((l) => l.id);
}

export { lessonActivity };
