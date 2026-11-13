import "server-only";
import { deepLessonsOf, scene, type AcademyWorld } from "../types";
import { teil1 } from "./w15/teil1.server";
import { teil2 } from "./w15/teil2.server";
import { teil3 } from "./w15/teil3.server";

/**
 * Welt 15 – Modul 10 „Pferdehaltung, Pferdealltag & Fütterung“ (Ausbau 13.11.2026).
 * Ausführliches Lektionsformat (siehe DeepLesson in types.ts), fachliche Prüfung ausstehend.
 */
export const welt15: AcademyWorld = {
  id: "w15",
  number: 15,
  slug: "haltung-und-fuetterung",
  title: "Pferdehaltung und Fütterung",
  teaser: "Wie Pferde leben, fressen und verdauen – und was gute Haltung ausmacht.",
  learns:
    "Grundbedürfnisse, Haltungsformen, Stallbau und Stallklima, Tagesrhythmus, Verdauung, Raufutterqualität, Futtermengen mit Frisch- und Trockenmasse, Kraft-, Mineral- und Ergänzungsfutter, Wasser und Salz, Weide und Giftpflanzen, Winter und Eindecken, Sommer und Insekten, Stallmanagement und die Beurteilung einer Haltung.",
  tint: "#E6E4D3",
  cover: scene("ak-sattelzeug"),
  badge: { id: "ra-abzeichen-w15", title: "Haltungs- und Fütterungsprofi", motif: "carrot" },
  lessons: deepLessonsOf(15, [...teil1, ...teil2, ...teil3]),
};
