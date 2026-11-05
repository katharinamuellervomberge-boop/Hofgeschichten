import "server-only";
import type { AcademyLesson } from "@/content/akademie/types";
import type { Activity } from "@/engine/types";
import { HOFTAG_PARTS, hoftagParts } from "./ein-tag-auf-dem-hof.server";
import { spracheDerPferde } from "./sprache-der-pferde.server";

/**
 * Inhalte der Freitagsveröffentlichungen (nur Server).
 * Schlüssel = `slug` aus `releases` in src/content/membership.ts.
 */
export type PremiumContent =
  | { kind: "game"; parts: Array<{ id: string; title: string; activity: Activity }> }
  | { kind: "lesson"; lesson: AcademyLesson }
  /** Hörspiel: Datei in private/hofjahr-audio/<file>, ausgeliefert über /api/hofjahr-audio/<slug> */
  | { kind: "audio"; file: string; durationSeconds: number; horse: string; characters: string[] };

const registry: Record<string, PremiumContent> = {
  "ein-tag-auf-dem-hof": {
    kind: "game",
    parts: HOFTAG_PARTS.map((p) => ({ id: p, title: hoftagParts[p].title, activity: hoftagParts[p] })),
  },
  "sprache-der-pferde": { kind: "lesson", lesson: spracheDerPferde },
  "willkommen-auf-dem-hof": {
    kind: "audio",
    file: "S01F01-willkommen-auf-dem-hof.mp3",
    durationSeconds: 1290,
    horse: "tivoli",
    characters: ["lea", "mila", "ben"],
  },
};

export function loadPremiumContent(slug: string): PremiumContent | undefined {
  return registry[slug];
}
