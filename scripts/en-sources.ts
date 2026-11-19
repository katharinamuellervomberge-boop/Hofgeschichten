/** Welche deutschen Daten mit welchem englischen Wörterbuch übersetzt werden (Werkzeuge en:extract / check:en) */
import { worlds, academyGames } from "../src/content/akademie";
import { academyModules, ACADEMY_PATHS } from "../src/content/akademie/module";
import { academyVideos } from "../src/content/akademie/videos";
import { allAcademyGames, fullWorlds } from "../src/content/akademie/inhalte.server";
import { EN_WORLD_DICTS } from "../src/content/akademie/en/welten.server";
import katalog from "../src/content/akademie/en/katalog.json";
import spiele from "../src/content/akademie/en/spiele.json";
import type { Dict } from "../src/i18n/translate";
import { EXERCISES } from "../src/content/training/uebungen";
import trainingEn from "../src/content/training/en.json";
import { coachSources, COACH_SKIP } from "../src/content/coach/en";
import coachEn from "../src/content/coach/en.json";
import { ARENA_EXERCISES } from "../src/content/arena";
import { ARENA_SKIP } from "../src/content/arena/en-skip";
import arenaEn from "../src/content/arena/en.json";
import { riderLabAreas } from "../src/content/riderlab/uebungen.server";
import { riderLabCatalog } from "../src/content/riderlab/katalog";
import { RIDER_LAB_SKIP } from "../src/content/riderlab/en-skip";
import riderLabEn from "../src/content/riderlab/en.json";
import riderLabTitles from "../src/content/riderlab/en-titles.json";

/** Riding Space und Rider Lab (seit 19.11.2026) – Felder ohne Übersetzung wie in den jeweiligen en.ts */
const EXERCISE_SKIP = new Set(["cat", "fig", "lessons", "rl", "min"]);

export type EnSource = { id: string; data: unknown; dict: Dict; skip?: ReadonlySet<string> };

export function enSources(): EnSource[] {
  return [
    { id: "katalog", data: { worlds, academyGames, academyModules, ACADEMY_PATHS, academyVideos }, dict: katalog },
    { id: "spiele", data: allAcademyGames.map((g) => g.activity), dict: spiele },
    ...fullWorlds.map((w) => ({ id: w.id, data: w.lessons, dict: EN_WORLD_DICTS[w.id] ?? {} })),
    { id: "training", data: [EXERCISES, EXERCISES.map((e) => ({ title: e.name }))], dict: trainingEn, skip: EXERCISE_SKIP },
    { id: "coach", data: coachSources(), dict: coachEn, skip: COACH_SKIP },
    { id: "reitbahn", data: ARENA_EXERCISES, dict: { ...(katalog as Dict), ...(trainingEn as Dict), ...(arenaEn as Dict) }, skip: ARENA_SKIP },
    { id: "riderlab", data: [riderLabCatalog, riderLabAreas], dict: riderLabEn, skip: RIDER_LAB_SKIP },
    { id: "rl-titel", data: riderLabCatalog, dict: riderLabTitles },
  ];
}
