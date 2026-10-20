import { adventures } from "./adventures";
import type { StampInfo, StampMotif } from "./types";

/** Stempel der kostenlosen Hofwelt. */
export const freeStamps: StampInfo[] = [
  { id: "freund-tivoli", title: "Tivolis Freund", how: "Lerne Tivoli kennen.", motif: "horse", rule: { type: "horse", slug: "tivoli" } },
  { id: "freund-scrabble", title: "Scrabbles Freund", how: "Lerne Scrabble kennen.", motif: "horse", rule: { type: "horse", slug: "scrabble" } },
  { id: "freund-tonga", title: "Tongas Freund", how: "Lerne Tonga kennen.", motif: "horse", rule: { type: "horse", slug: "tonga" } },
  { id: "entdecker", title: "Pferde-Entdecker", how: "Entdecke die Körperteile bei einem Pferd.", motif: "eye", rule: { type: "activity", id: "entdecken" } },
  { id: "pflegeprofi", title: "Pflegeprofi", how: "Spiel den Pferde-Pflegeprofi zu Ende.", motif: "brush", rule: { type: "activity", id: "pflegeprofi" } },
  { id: "pferdeversorger", title: "Pferdeversorger", how: "Beantworte das Quiz „Was braucht ein Pferd?“.", motif: "question", rule: { type: "activity", id: "was-braucht-ein-pferd" } },
  { id: "pferdeversteher", title: "Pferdeversteher", how: "Spiel die Pferdesprache zu Ende.", motif: "ear", rule: { type: "activity", id: "pferdesprache" } },
  { id: "hofheld", title: "Hofheld", how: "Sammle alle anderen Stempel der Hofwelt.", motif: "horseshoe", rule: { type: "allFree" } },
];

const MISSION_MOTIFS: StampMotif[] = ["magnifier", "footprint", "ear", "lock", "star"];

/** Abzeichen eines Abenteuers: eins je Mission + das große Abschlussabzeichen. */
export function adventureStamps(slug: string): StampInfo[] {
  const a = adventures.find((x) => x.slug === slug);
  if (!a) return [];
  return [
    ...a.missions.map((m, i) => ({
      id: `${slug}:${m.id}`,
      title: m.title,
      how: `Löse Mission ${i + 1}.`,
      motif: MISSION_MOTIFS[i % MISSION_MOTIFS.length],
      rule: { type: "mission" as const, adventure: slug, mission: m.id },
      adventure: slug,
    })),
    {
      id: `${slug}:abzeichen`,
      title: a.badge.title,
      how: "Löse alle Missionen.",
      motif: "pumpkin" as const,
      rule: { type: "adventure" as const, slug },
      adventure: slug,
    },
  ];
}

export function allStamps(): StampInfo[] {
  return [...freeStamps, ...adventures.filter((a) => a.published).flatMap((a) => adventureStamps(a.slug))];
}
