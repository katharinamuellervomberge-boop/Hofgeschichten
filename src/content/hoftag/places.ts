import type { PlaceId, SpeakerId } from "./types";

/**
 * Bereiche der Hofkarte – Lage nach dem verbindlichen Hof-Lageplan
 * (Projekt-Doku claude/hof-lageplan.md): Stall im Norden des Hofplatzes,
 * Paddocks dahinter, Putzplatz und Scheune/Heulager im Osten, Reitplatz im Südosten.
 * Koordinaten in der Karten-Grafik (viewBox 0 0 400 520).
 */
export type Place = {
  id: PlaceId;
  name: string;
  /** Artikel: „der Stall“, „die Futterkammer“, „das Heulager“ */
  article: "der" | "die" | "das";
  /** Satz, wenn man ohne Aufgabe dorthin tippt */
  info: string;
  who?: SpeakerId;
  /** Tippbereich auf der Karte */
  hit: { x: number; y: number; w: number; h: number };
  /** Position des Namensschilds */
  label: { x: number; y: number };
};

export const PLACES: Place[] = [
  {
    id: "paddock",
    article: "der",
    name: "Paddock",
    info: "Hinter dem Stall liegen drei Paddocks. Tivoli, Tonga und Scrabble stehen zusammen im mittleren.",
    hit: { x: 40, y: 30, w: 250, h: 110 },
    label: { x: 165, y: 62 },
  },
  {
    id: "stall",
    article: "der",
    name: "Stall",
    info: "Zwölf Boxen an einer hellen Stallgasse. Am Ost-Ende steht Tivolis Box.",
    who: "wilhelm",
    hit: { x: 40, y: 160, w: 200, h: 70 },
    label: { x: 140, y: 200 },
  },
  {
    id: "futterkammer",
    article: "die",
    name: "Futterkammer",
    info: "Hier stehen die Futtertonnen und das Mineralfutter.",
    who: "wilhelm",
    hit: { x: 240, y: 160, w: 50, h: 34 },
    label: { x: 265, y: 152 },
  },
  {
    id: "putzplatz",
    article: "der",
    name: "Putzplatz",
    info: "Überdacht, mit drei Anbindeplätzen und dem Putzkasten.",
    who: "tilda",
    hit: { x: 240, y: 196, w: 50, h: 40 },
    label: { x: 265, y: 252 },
  },
  {
    id: "heulager",
    article: "das",
    name: "Heulager",
    info: "In der Scheune stapelt sich das Heu bis unters Dach. Hier steht auch der Heubedampfer.",
    who: "wilhelm",
    hit: { x: 296, y: 150, w: 90, h: 92 },
    label: { x: 341, y: 200 },
  },
  {
    id: "reitplatz",
    article: "der",
    name: "Reitplatz",
    info: "Ein großer Sandplatz mit heller Holzbande und Flutlicht.",
    who: "tilda",
    hit: { x: 230, y: 300, w: 150, h: 170 },
    label: { x: 305, y: 390 },
  },
];

export function getPlace(id: PlaceId): Place {
  return PLACES.find((p) => p.id === id) ?? PLACES[1];
}

/** „zum Stall“, „zur Futterkammer“ */
export function toPlace(p: Place): string {
  return `${p.article === "die" ? "zur" : "zum"} ${p.name}`;
}
