import "server-only";
import { deepLessonsOf, scene, type AcademyWorld } from "../types";
import { teil1 } from "./w17/teil1.server";
import { teil2 } from "./w17/teil2.server";
import { teil3 } from "./w17/teil3.server";

/** Welt 17 – Modul 12 „Pferdeverhalten & Körpersprache“ (Ausbau 13.11.2026) */
export const welt17: AcademyWorld = {
  id: "w17",
  number: 17,
  slug: "pferdeverhalten",
  title: "Pferdeverhalten und Körpersprache",
  teaser: "Pferde lesen, verstehen und fair mit ihnen kommunizieren.",
  learns:
    "Wahrnehmung, Körpersprache im Zusammenhang, Entspannung, Stress und Angst, Herdenverhalten ohne Dominanzmythos, Konfliktverhalten, Lerntheorie, Vertrauen, Körpersprache beim Führen, Konfliktsignale beim Reiten, Verhaltensprobleme und eine Methode zur Analyse.",
  tint: "#E3E7DA",
  cover: scene("ak-zonen"),
  badge: { id: "ra-abzeichen-w17", title: "Pferdeversteher", motif: "ear" },
  lessons: deepLessonsOf(17, [...teil1, ...teil2, ...teil3]),
};
