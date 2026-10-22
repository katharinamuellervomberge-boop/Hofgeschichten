import { adventures, isVisible } from "./adventures";
import type { StampInfo } from "./types";
import type { Progress } from "@/lib/progress/types";

/**
 * „Mein Hofjahr“ – öffentliche Angaben (ohne Premium-Inhalte).
 * Fortschritt und Abzeichen werden nur lokal auf dem Gerät abgeleitet:
 * kein Name, kein Profil, keine Rangliste.
 */

/** Teile des Hofspiels „Ein Tag auf dem Hof“ (Fortschritt-ID `hoftag-<id>`) */
export const HOFTAG_STEPS: Array<{ id: string; title: string; time: string }> = [
  { id: "morgen", title: "Guten Morgen!", time: "Morgens" },
  { id: "versorgen", title: "Pferde versorgen", time: "Frühstück" },
  { id: "stall", title: "Stallarbeit", time: "Vormittag" },
  { id: "weide", title: "Auf die Weide", time: "Mittag" },
  { id: "pflege", title: "Pferdepflege", time: "Nachmittag" },
  { id: "abend", title: "Der Abend", time: "Abends" },
];

export const hoftagProgressId = (id: string) => `hoftag-${id}`;
export const PREMIUM_LESSON_ID = "ra-p1-l1";

const done = (p: Progress, id: string) => (p.games[id]?.completedCount ?? 0) > 0;

export function hoftagDone(p: Progress): number {
  return HOFTAG_STEPS.filter((s) => done(p, hoftagProgressId(s.id))).length;
}

export type HofjahrBadge = StampInfo & { earned: (p: Progress) => boolean };

function adventureSolved(p: Progress): boolean {
  return adventures.some((a) => isVisible(a) && a.missions.length > 0 && a.missions.every((m) => p.adventures[a.slug]?.missions.includes(m.id)));
}

const rule = { type: "activity" as const, id: "-" };

/** Die ersten Hofjahr-Abzeichen. Einige lassen sich auch mit kostenlosen Spielen verdienen. */
export const hofjahrBadges: HofjahrBadge[] = [
  {
    id: "hj-stallprofi",
    title: "Stallprofi",
    how: "Hilf beim Ausmisten in „Ein Tag auf dem Hof“.",
    motif: "horseshoe",
    rule,
    earned: (p) => done(p, hoftagProgressId("stall")),
  },
  {
    id: "hj-pferdefluesterer",
    title: "Pferdeflüsterer",
    how: "Lerne die Sprache der Pferde – im Spiel „Pferdesprache“ oder in der Reitakademie.",
    motif: "ear",
    rule,
    earned: (p) => done(p, PREMIUM_LESSON_ID) || done(p, "pferdesprache"),
  },
  {
    id: "hj-hofheld",
    title: "Hofheld",
    how: "Schaffe alle sechs Teile von „Ein Tag auf dem Hof“.",
    motif: "rosette",
    rule,
    earned: (p) => hoftagDone(p) === HOFTAG_STEPS.length,
  },
  {
    id: "hj-raetselmeister",
    title: "Rätselmeister",
    how: "Löse ein ganzes Detektivabenteuer.",
    motif: "magnifier",
    rule,
    earned: adventureSolved,
  },
  {
    id: "hj-pflegeprofi",
    title: "Pflegeprofi",
    how: "Putze ein Pferd – im Spiel „Pflegeprofi“ oder in „Ein Tag auf dem Hof“.",
    motif: "brush",
    rule,
    earned: (p) => done(p, hoftagProgressId("pflege")) || done(p, "pflegeprofi"),
  },
];
