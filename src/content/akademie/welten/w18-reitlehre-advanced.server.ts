import "server-only";
import { deepLessonsOf, scene, type AcademyWorld } from "../types";
import { teil1 } from "./w18/teil1.server";
import { teil2 } from "./w18/teil2.server";
import { teil3 } from "./w18/teil3.server";
import { teil4 } from "./w18/teil4.server";
import { teil5 } from "./w18/teil5.server";

/** Welt 18 – Modul 13 „Reitlehre Advanced“ (Ausbau 13.11.2026) */
export const welt18: AcademyWorld = {
  id: "w18",
  number: 18,
  slug: "reitlehre-advanced",
  title: "Reitlehre Advanced",
  teaser: "Warum jede Hilfe wirkt, wie sie sich anfühlt und woran du erkennst, dass es klappt.",
  learns:
    "Ausbildungsskala im Detail, Biomechanik, unabhängiger Sitz, Gewichts-, Schenkel- und Zügelhilfen, halbe Paraden, Anlehnung und Selbsthaltung, Stellung und Biegung, Geraderichtung, Übergänge und Tempi, Galopp von der Fußfolge bis zur Galopparbeit, Galoppfehler, Seitengänge, Galoppwechsel, Versammlung und systematische Fehlersuche.",
  tint: "#E4E7DC",
  cover: scene("ak-oben-schulterherein"),
  badge: { id: "ra-abzeichen-w18", title: "Reitlehre-Profi", motif: "dressage" },
  lessons: deepLessonsOf(18, [...teil1, ...teil2, ...teil3, ...teil4, ...teil5]),
};
