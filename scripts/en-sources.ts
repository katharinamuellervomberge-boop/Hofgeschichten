/** Welche deutschen Daten mit welchem englischen Wörterbuch übersetzt werden (Werkzeuge en:extract / check:en) */
import { worlds, academyGames } from "../src/content/akademie";
import { academyModules, ACADEMY_PATHS } from "../src/content/akademie/module";
import { academyVideos } from "../src/content/akademie/videos";
import { allAcademyGames, fullWorlds } from "../src/content/akademie/inhalte.server";
import { EN_WORLD_DICTS } from "../src/content/akademie/en/welten.server";
import katalog from "../src/content/akademie/en/katalog.json";
import spiele from "../src/content/akademie/en/spiele.json";
import type { Dict } from "../src/i18n/translate";

export type EnSource = { id: string; data: unknown; dict: Dict };

export function enSources(): EnSource[] {
  return [
    { id: "katalog", data: { worlds, academyGames, academyModules, ACADEMY_PATHS, academyVideos }, dict: katalog },
    { id: "spiele", data: allAcademyGames.map((g) => g.activity), dict: spiele },
    ...fullWorlds.map((w) => ({ id: w.id, data: w.lessons, dict: EN_WORLD_DICTS[w.id] ?? {} })),
  ];
}
