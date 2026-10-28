import { gameInfo, worldInfo } from "../src/content/akademie/info";
import { fullWorlds, grossAcademyGames, tierOfWorld } from "../src/content/akademie/inhalte.server";

export const CATALOG_PATH = "src/content/akademie/katalog.generated.ts";

export function buildCatalogSource(): string {
  const worlds = fullWorlds.map((w) => worldInfo(w, tierOfWorld(w)));
  const games = grossAcademyGames.map((g) => gameInfo(g, "gross"));
  return `/* Automatisch erzeugt mit \`npm run akademie:katalog\` – nicht von Hand ändern. */
import type { AcademyGameInfo, AcademyWorldInfo } from "./types";

/** Alle Lernwelten: Übersicht ohne Inhalte (die Inhalte liegen in welten/*.server.ts) */
export const worldsInfo: AcademyWorldInfo[] = ${JSON.stringify(worlds, null, 2)};

export const grossGamesInfo: AcademyGameInfo[] = ${JSON.stringify(games, null, 2)};
`;
}
