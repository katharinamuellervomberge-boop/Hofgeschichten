import "server-only";
import { deepLessonsOf, scene, type AcademyWorld } from "../types";
import { teil1 } from "./w19/teil1.server";
import { teil2 } from "./w19/teil2.server";
import { teil3 } from "./w19/teil3.server";

/** Welt 19 – Modul 14 „Gelände & Ausreiten“ (Ausbau 13.11.2026) */
export const welt19: AcademyWorld = {
  id: "w19",
  number: 19,
  slug: "gelaende-ausreiten",
  title: "Gelände und Ausreiten",
  teaser: "Sicher unterwegs: vorbereiten, in der Gruppe reiten und in jeder Situation richtig reagieren.",
  learns:
    "Voraussetzungen und Ausrüstung, Vorbereitung, Gruppenregeln, StVO und Waldrecht von Bund und Ländern, bergauf und bergab, Wasser und Brücken, schreckhafte Pferde, Trab und Galopp im Gelände, Durchgehen, Begegnungen, Unfälle und Notruf sowie Geländetraining.",
  tint: "#E1E6D8",
  cover: scene("ak-reiter-leicht"),
  badge: { id: "ra-abzeichen-w19", title: "Geländereiter", motif: "footprint" },
  lessons: deepLessonsOf(19, [...teil1, ...teil2, ...teil3]),
};
