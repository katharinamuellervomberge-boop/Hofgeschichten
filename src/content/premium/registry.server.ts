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
  | { kind: "lesson"; lesson: AcademyLesson };

const registry: Record<string, PremiumContent> = {
  "ein-tag-auf-dem-hof": {
    kind: "game",
    parts: HOFTAG_PARTS.map((p) => ({ id: p, title: hoftagParts[p].title, activity: hoftagParts[p] })),
  },
  "sprache-der-pferde": { kind: "lesson", lesson: spracheDerPferde },
};

export function loadPremiumContent(slug: string): PremiumContent | undefined {
  return registry[slug];
}
