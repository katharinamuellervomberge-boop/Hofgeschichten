import "server-only";
import { deepLessonsOf, scene, type AcademyWorld } from "../types";
import { teil1 } from "./w16/teil1.server";
import { teil2 } from "./w16/teil2.server";
import { teil3 } from "./w16/teil3.server";
import { teil4 } from "./w16/teil4.server";

/** Welt 16 – Modul 11 „Pferdegesundheit, Hufe, Zähne, Pflege & Erste Hilfe“ (Ausbau 13.11.2026) */
export const welt16: AcademyWorld = {
  id: "w16",
  number: 16,
  slug: "pferdegesundheit",
  title: "Pferdegesundheit und Erste Hilfe",
  teaser: "Gesund oder krank? Erkennen, richtig handeln und wissen, wann der Tierarzt kommen muss.",
  learns:
    "Normalbefund, PAT-Werte messen, täglicher Gesundheitscheck, Hufaufbau, Hufpflege, Barhuf und Beschlag, Hufkrankheiten, Zähne, Fell- und Hautpflege, Hautprobleme, Kolik, Schlundverstopfung, Lahmheit, Atemwege, Wundversorgung, Impfungen und Parasiten, Erste Hilfe, Stallapotheke und Vorsorge.",
  tint: "#E2E6DE",
  cover: scene("ak-sattelzeug"),
  badge: { id: "ra-abzeichen-w16", title: "Gesundheits-Kenner", motif: "heart" },
  lessons: deepLessonsOf(16, [...teil1, ...teil2, ...teil3, ...teil4]),
};
