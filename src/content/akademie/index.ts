import { lessonActivity } from "./activity";
import { gameInfo } from "./info";
import { grossGamesInfo, worldsInfo } from "./katalog.generated";
import { freeAcademyGames } from "./spiele";
import type { AcademyGameInfo, AcademyTier, AcademyWorldInfo, LessonInfo } from "./types";

/**
 * Die Reitakademie – Übersicht für den Browser.
 *
 *  Seit 28.10.2026 ist die Akademie in Module gegliedert (module.ts), seit 29.10.2026 mit Dressur und Springen.
 *  Je Modul ist die erste Lektion kostenlos, alles andere gehört zur
 *  Reitakademie (14,90 € einmalig, products.ts).
 *
 * Hier stehen nur Titel, Bilder, Abzeichen und Lektions-IDs. ALLE Lektionsinhalte
 * liegen serverseitig (welten/*.server.ts, spiele-gross.server.ts) und werden
 * erst nach der Prüfung ausgeliefert (inhalte.server.ts).
 * Reihenfolge der Welten = Reihenfolge in der App.
 */
export const worlds: AcademyWorldInfo[] = worldsInfo;

export const academyGames: AcademyGameInfo[] = [...freeAcademyGames.map((g) => gameInfo(g, "klein")), ...grossGamesInfo];

export const ACADEMY_TITLE = "Die Reitakademie";
export const ACADEMY_TIERS: Record<AcademyTier, { title: string; short: string; href: string }> = {
  /* Kleine/Große Akademie gibt es seit 28.10.2026 nicht mehr als eigene Seiten – beide führen zur Reitakademie */
  klein: { title: "Die Reitakademie", short: "Reitakademie", href: "/akademie" },
  gross: { title: "Die Reitakademie", short: "Reitakademie", href: "/akademie" },
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
