import type { StampInfo } from "../types";
import { lessonIds, worlds } from "./index";

export const PROFI_STAMP_ID = "ra-reitwissen-profi";

/** Abzeichen der Reitakademie: eins je Lernwelt + die Auszeichnung „Reitwissen-Profi“. */
export function academyStamps(): StampInfo[] {
  return [
    ...worlds.map((w) => ({
      id: w.badge.id,
      title: w.badge.title,
      how: `Schließe alle Lektionen der Lernwelt „${w.title}“ ab.`,
      motif: w.badge.motif,
      rule: { type: "activities" as const, ids: lessonIds(w) },
      academy: true,
    })),
    {
      id: PROFI_STAMP_ID,
      title: "Reitwissen-Profi",
      how: "Schließe alle 40 Lektionen des Grundkurses (Lernwelten 1–8) ab.",
      motif: "rosette" as const,
      // Bewusst nur der Grundkurs (Welten 1–8): so behalten alle, die die Auszeichnung schon haben, sie auch nach dem Ausbau
      rule: { type: "activities" as const, ids: worlds.filter((w) => w.number <= 8).flatMap((w) => w.lessons.map((l) => l.id)) },
      academy: true,
    },
  ];
}
