import { gameInfo, worldInfo } from "../src/content/akademie/info";
import { grossAcademyGames, grossWorlds } from "../src/content/akademie/inhalte.server";

export const CATALOG_PATH = "src/content/akademie/katalog-gross.generated.ts";

export function buildCatalogSource(): string {
  const worlds = grossWorlds.map((w) => worldInfo(w, "gross"));
  const games = grossAcademyGames.map((g) => gameInfo(g, "gross"));
  return `/* Automatisch erzeugt mit \`npm run akademie:katalog\` – nicht von Hand ändern. */
import type { AcademyGameInfo, AcademyWorldInfo } from "./types";

/** Große Akademie: Übersicht ohne Inhalte (die Inhalte liegen in welten/*.server.ts) */
export const grossWorldsInfo: AcademyWorldInfo[] = ${JSON.stringify(worlds, null, 2)};

export const grossGamesInfo: AcademyGameInfo[] = ${JSON.stringify(games, null, 2)};
`;
}
