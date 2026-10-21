import { adventures } from "@/content/adventures";
import { allStamps, freeStamps } from "@/content/stamps";
import type { StampInfo } from "@/content/types";
import type { Progress } from "./types";

function ruleMet(s: StampInfo, p: Progress, gotFree: () => boolean): boolean {
  const r = s.rule;
  switch (r.type) {
    case "horse":
      return p.horsesVisited.includes(r.slug);
    case "activity":
      // "entdecken" zählt für jedes Pferd (entdecken-tivoli, entdecken-scrabble …)
      return Object.entries(p.games).some(
        ([id, g]) => (id === r.id || id.startsWith(`${r.id}-`)) && g.completedCount > 0,
      );
    case "mission":
      return p.adventures[r.adventure]?.missions.includes(r.mission) ?? false;
    case "adventure": {
      const a = adventures.find((x) => x.slug === r.slug);
      const done = p.adventures[r.slug]?.missions ?? [];
      return !!a && a.missions.every((m) => done.includes(m.id));
    }
    case "allFree":
      return gotFree();
    case "activities":
      return r.ids.length > 0 && r.ids.every((id) => (p.games[id]?.completedCount ?? 0) > 0);
  }
}

/**
 * Stempel werden aus dem Fortschritt abgeleitet statt separat gespeichert.
 * So können sie nie "aus dem Takt" geraten.
 */
export function earnedStamps(p: Progress): Set<string> {
  const got = new Set<string>();
  const others = freeStamps.filter((s) => s.rule.type !== "allFree");
  const allOthers = () => others.every((s) => ruleMet(s, p, () => false));
  for (const s of allStamps()) {
    if (ruleMet(s, p, allOthers)) got.add(s.id);
  }
  return got;
}

export function newStamps(p: Progress): string[] {
  const got = earnedStamps(p);
  return [...got].filter((id) => !p.seenStamps.includes(id));
}
