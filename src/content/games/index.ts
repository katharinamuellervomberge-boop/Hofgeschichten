import type { Activity } from "@/engine/types";
import type { GameInfo } from "../types";
import { pferdesprache } from "./pferdesprache";
import { pflegeprofi } from "./pflegeprofi";
import { quiz } from "./quiz";

/**
 * Kostenlose Lernspiele. Ein neues Spiel = eine neue Activity-Datei + ein Eintrag hier.
 */
export const games: Array<GameInfo & { activity: Activity }> = [
  {
    id: pflegeprofi.id,
    title: pflegeprofi.title,
    learns: "Putzzeug und Ausrüstung kennen und der richtigen Pflegeaufgabe zuordnen; in Stufe Mittel auch die richtige Putz-Reihenfolge.",
    tint: "#DDE3D6",
    art: "care",
    activity: pflegeprofi,
  },
  {
    id: quiz.id,
    title: quiz.title,
    learns: "Grundbedürfnisse von Pferden: Raufutter, Wasser, Herde, Bewegung, Hufpflege – in Stufe Mittel mit Zahlen und Hintergründen.",
    tint: "#E8DCC4",
    art: "quiz",
    activity: quiz,
  },
  {
    id: pferdesprache.id,
    title: pferdesprache.title,
    learns: "Körpersprache lesen (Ohren, Augen, Nüstern) und in Stufe Mittel sicher darauf reagieren.",
    tint: "#EADBC8",
    art: "ears",
    activity: pferdesprache,
  },
];

export function getGame(id: string) {
  return games.find((g) => g.id === id);
}
