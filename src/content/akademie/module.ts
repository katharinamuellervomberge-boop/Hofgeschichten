import type { Level, Visual } from "@/engine/types";
import type { AcademyPath } from "@/lib/progress/types";
import { getAcademyGameInfo, worlds } from "./index";
import type { AcademyGameInfo, AcademyWorldInfo, LessonInfo } from "./types";

/**
 * Die Reitakademie in Modulen (seit 28.10.2026, ausgebaut am 29.10.2026 auf neun Module
 * mit Dressur und Springen).
 *
 * Die Module liegen als Ordnung ÜBER den bestehenden Lernwelten und Lektionen.
 * Lektions-IDs (ra-w<n>-l<m>), Adressen (/akademie/<welt>/<lektion>), Abzeichen
 * und gespeicherter Fortschritt bleiben dadurch unverändert.
 *
 *  - Jede Lektion gehört zu genau einem Modul (Prüfung: npm run check:akademie).
 *  - `trial` = die kostenlose Probelektion des Moduls. Alles andere ist in der
 *    Reitakademie (14,90 € einmalig) enthalten.
 *  - Themen ohne Lektion erscheinen als „In Vorbereitung“. Neue Lektion fertig?
 *    Ihre ID beim passenden Thema eintragen.
 */

export type ModuleTopic = {
  title: string;
  /** Lektions-IDs in Lernreihenfolge; leer = Thema in Vorbereitung */
  lessons: string[];
  /** Mini-Spiele der Akademie (Slugs), z. B. für „Interaktive Übungen“ */
  games?: string[];
  /** Sonderfall: Link statt Lektion (z. B. Teilnahmezertifikat) */
  link?: { href: string; label: string };
};

export type AcademyModule = {
  id: string;
  number: number;
  slug: string;
  title: string;
  /** Ein Satz je Lernweg-Gruppe */
  teaser: { kids: string; grown: string };
  tint: string;
  cover: Visual;
  /** Kostenlose Probelektion */
  trial: string;
  topics: ModuleTopic[];
};

const scene = (name: string): Visual => ({ kind: "scene", scene: name });

export const academyModules: AcademyModule[] = [
  {
    id: "m1",
    number: 1,
    slug: "pferde-verstehen",
    title: "Pferde verstehen",
    teaser: {
      kids: "Wie Pferde denken, fühlen und mit uns sprechen.",
      grown: "Körpersprache, Herde, Sinne, Bedürfnisse und Verhalten des Fluchttiers Pferd.",
    },
    tint: "#E3E7DA",
    cover: scene("ak-zonen"),
    trial: "ra-w9-l1",
    topics: [
      { title: "Körpersprache", lessons: ["ra-w9-l1"] },
      { title: "Herdenleben", lessons: ["ra-w9-l2"] },
      { title: "Sinne und Kommunikation", lessons: ["ra-w9-l3", "ra-w8-l1"] },
      { title: "Bedürfnisse", lessons: ["ra-w9-l4", "ra-w8-l2"] },
      { title: "Verhalten beim Reiten", lessons: ["ra-w8-l3", "ra-w8-l4"] },
    ],
  },
  {
    id: "m2",
    number: 2,
    slug: "umgang-mit-pferden",
    title: "Umgang mit Pferden",
    teaser: {
      kids: "Putzen, Hufe, Führen, Satteln – sicher am Pferd.",
      grown: "Sicherheit am Boden, Pflege, Führen und Anbinden, Satteln, Trensen und Versorgen.",
    },
    tint: "#EDE3CF",
    cover: scene("ak-sattelzeug"),
    trial: "ra-w1-l1",
    topics: [
      { title: "Sicherheit", lessons: ["ra-w1-l1", "ra-w1-l2"] },
      { title: "Putzen und Pflege", lessons: ["ra-w10-l1"] },
      { title: "Hufe auskratzen", lessons: ["ra-w10-l2"] },
      { title: "Führen und Anbinden", lessons: ["ra-w10-l3"] },
      { title: "Satteln und Trensen", lessons: ["ra-w1-l3", "ra-w10-l4"] },
      { title: "Nach dem Reiten", lessons: ["ra-w10-l5"] },
    ],
  },
  {
    id: "m3",
    number: 3,
    slug: "reiten-lernen",
    title: "Reiten lernen",
    teaser: {
      kids: "Aufsteigen, gut sitzen und Schritt, Trab und Galopp.",
      grown: "Aufsitzen, ausbalancierter Sitz und die drei Grundgangarten.",
    },
    tint: "#DDE3D6",
    cover: scene("ak-reiter-sitz"),
    trial: "ra-w1-l4",
    topics: [
      { title: "Aufsteigen", lessons: ["ra-w1-l4"] },
      { title: "Richtiger Sitz", lessons: ["ra-w2-l1", "ra-w2-l2", "ra-w2-l3", "ra-w2-l4"] },
      { title: "Balance", lessons: ["ra-w5-l3"] },
      { title: "Schritt", lessons: ["ra-w4-l1", "ra-w4-l2", "ra-w4-l3"] },
      { title: "Trab", lessons: ["ra-w5-l1"] },
      { title: "Leichttraben", lessons: ["ra-w5-l2", "ra-w5-l4"] },
      { title: "Galopp", lessons: ["ra-w6-l1", "ra-w6-l2"] },
    ],
  },
  {
    id: "m4",
    number: 4,
    slug: "reiterhilfen",
    title: "Reiterhilfen",
    teaser: {
      kids: "So sprichst du mit dem Pferd – ganz ohne Worte.",
      grown: "Gewichts-, Schenkel- und Zügelhilfen und ihr Zusammenspiel.",
    },
    tint: "#E8DCC4",
    cover: scene("ak-reiter-hilfen"),
    trial: "ra-w3-l1",
    topics: [
      { title: "Was sind Reiterhilfen?", lessons: ["ra-w3-l1"] },
      { title: "Gewichtshilfen", lessons: ["ra-w3-l3"] },
      { title: "Schenkelhilfen", lessons: ["ra-w3-l2"] },
      { title: "Zügelhilfen", lessons: ["ra-w3-l4", "ra-w3-l5"] },
      { title: "Anreiten und Anhalten", lessons: ["ra-w4-l4"] },
      { title: "Übergänge", lessons: ["ra-w6-l3", "ra-w6-l4"] },
    ],
  },
  {
    id: "m5",
    number: 5,
    slug: "bahnfiguren-und-bahnregeln",
    title: "Bahnfiguren und Bahnregeln",
    teaser: {
      kids: "Zirkel, Volte, Schlangenlinie – und die Regeln in der Reitbahn.",
      grown: "Alle Hufschlag- und Bahnfiguren, Handwechsel, Bahnregeln und Abteilungsreiten.",
    },
    tint: "#E1E6DA",
    cover: scene("ak-bahn-schlange-4"),
    trial: "ra-w7-l1",
    topics: [
      { title: "Die Reitbahn und Ecken", lessons: ["ra-w7-l1", "ra-w11-l1"] },
      { title: "Handwechsel", lessons: ["ra-w7-l2", "ra-w11-l2"] },
      { title: "Zirkel und Volten", lessons: ["ra-w7-l3", "ra-w11-l3", "ra-w11-l4"] },
      { title: "Schlangenlinien", lessons: ["ra-w11-l5"] },
      { title: "Bahnregeln", lessons: ["ra-w7-l4", "ra-w11-l6"] },
      { title: "Abteilungsreiten", lessons: ["ra-w11-l7"] },
    ],
  },
  {
    id: "m6",
    number: 6,
    slug: "besser-reiten",
    title: "Besser reiten",
    teaser: {
      kids: "Im Takt, locker und sicher im Sattel.",
      grown: "Takt und Rhythmus, Losgelassenheit, typische Fehler und mehr Sicherheit.",
    },
    tint: "#E6E0D2",
    cover: scene("ak-reiter-sitz-linie"),
    trial: "ra-w12-l3",
    topics: [
      { title: "Takt und Rhythmus", lessons: ["ra-w12-l1"] },
      { title: "Losgelassenheit", lessons: ["ra-w12-l2"] },
      { title: "Häufige Anfängerfehler", lessons: ["ra-w12-l3"] },
      { title: "Sicherer im Sattel werden", lessons: ["ra-w12-l4"] },
    ],
  },
  {
    id: "m7",
    number: 7,
    slug: "dressur",
    title: "Dressur",
    teaser: {
      kids: "Fein reiten wie die Profis – bis zu Piaffe und Passage.",
      grown: "Skala der Ausbildung, Seitengänge, Wendungen, Galoppwechsel bis zur Hohen Schule – mit allen Hilfen.",
    },
    tint: "#E4E7DC",
    cover: scene("ak-oben-schulterherein"),
    trial: "ra-w13-l6",
    topics: [
      { title: "Grundlagen der Dressur", lessons: ["ra-w13-l1", "ra-w13-l2", "ra-w13-l3", "ra-w13-l4"] },
      { title: "Wendungen und Rückwärtsrichten", lessons: ["ra-w13-l5", "ra-w13-l10"] },
      { title: "Seitengänge", lessons: ["ra-w13-l6", "ra-w13-l7", "ra-w13-l8", "ra-w13-l9"] },
      { title: "Galoppwechsel", lessons: ["ra-w13-l11"] },
      { title: "Hohe Lektionen", lessons: ["ra-w13-l12"] },
    ],
  },
  {
    id: "m8",
    number: 8,
    slug: "springen",
    title: "Springen",
    teaser: {
      kids: "Über den Sprung! Was Pferd und Reiter dabei machen.",
      grown: "Springsitz, Sprungphasen, Hindernisarten, Distanzen, Kombinationen, Parcours und Regeln.",
    },
    tint: "#E9E2D0",
    cover: scene("ak-sprung-flug"),
    trial: "ra-w14-l2",
    topics: [
      { title: "Springsitz", lessons: ["ra-w14-l1"] },
      { title: "Der Sprung", lessons: ["ra-w14-l2"] },
      { title: "Hindernisse", lessons: ["ra-w14-l3", "ra-w14-l6"] },
      { title: "Distanzen und Kombinationen", lessons: ["ra-w14-l4", "ra-w14-l5"] },
      { title: "Parcours und Regeln", lessons: ["ra-w14-l7", "ra-w14-l8"] },
      { title: "Sicherheit", lessons: ["ra-w14-l9"] },
    ],
  },
  {
    id: "m9",
    number: 9,
    slug: "abschluss",
    title: "Akademie-Abschluss",
    teaser: {
      kids: "Teste dein Wissen und hol dir deine Urkunde.",
      grown: "Wiederholung, Wissenstests und Teilnahmezertifikat.",
    },
    tint: "#EFE6D2",
    cover: scene("ak-gang-galopp-rechts"),
    trial: "ra-w1-l5",
    topics: [
      { title: "Wiederholungsfragen", lessons: ["ra-w1-l5", "ra-w2-l5"] },
      { title: "Wissenstests", lessons: ["ra-w4-l5", "ra-w5-l5", "ra-w6-l5"] },
      {
        title: "Interaktive Übungen",
        lessons: ["ra-w7-l5"],
        games: ["der-perfekte-reitersitz", "hilfen-detektiv", "gangarten-quiz", "bahnfiguren-meister"],
      },
      { title: "Abschlussquiz", lessons: ["ra-w8-l5"] },
      {
        title: "Teilnahmezertifikat",
        lessons: [],
        link: { href: "/eltern#p-urkunde", label: "Zertifikat für den Wissenstest" },
      },
    ],
  },
];

/* ---------- Lernwege ---------- */

export type AcademyPathInfo = {
  id: AcademyPath;
  title: string;
  ages: string;
  /** Welche Textfassung die Lektionen nutzen (eigene Teen-/Adult-Texte folgen in Phase 2) */
  level: Level;
  text: string;
};

export const ACADEMY_PATHS: AcademyPathInfo[] = [
  { id: "kids", title: "Kids Academy", ages: "6–11 Jahre", level: "leicht", text: "Einfache Sprache, viele Bilder und kurze Erklärungen." },
  { id: "teen", title: "Teen Academy", ages: "12–17 Jahre", level: "mittel", text: "Lernvideos, Quiz und interaktive Übungen." },
  { id: "adult", title: "Adult Academy", ages: "ab 18 Jahren", level: "mittel", text: "Fundiert, verständlich und praxisnah – für Wiedereinsteiger und Reitanfänger." },
];

export function pathInfo(path: AcademyPath | null | undefined): AcademyPathInfo | undefined {
  return ACADEMY_PATHS.find((p) => p.id === path);
}

/* ---------- Abfragen ---------- */

export type ModuleLesson = { lesson: LessonInfo; world: AcademyWorldInfo; topic: string; trial: boolean };

const lessonIndex = new Map<string, { lesson: LessonInfo; world: AcademyWorldInfo }>();
for (const w of worlds) for (const l of w.lessons) lessonIndex.set(l.id, { lesson: l, world: w });

export function getModule(slug: string): AcademyModule | undefined {
  return academyModules.find((m) => m.slug === slug);
}

/** Alle Lektionen eines Moduls in Lernreihenfolge */
export function moduleLessons(m: AcademyModule): ModuleLesson[] {
  return m.topics.flatMap((t) =>
    t.lessons.flatMap((id) => {
      const hit = lessonIndex.get(id);
      return hit ? [{ ...hit, topic: t.title, trial: id === m.trial }] : [];
    }),
  );
}

export function moduleGames(m: AcademyModule): AcademyGameInfo[] {
  return m.topics.flatMap((t) => (t.games ?? []).flatMap((slug) => getAcademyGameInfo(slug) ?? []));
}

/** Modul, zu dem eine Lektion gehört */
export function moduleOfLesson(lessonId: string): AcademyModule | undefined {
  return academyModules.find((m) => m.topics.some((t) => t.lessons.includes(lessonId)));
}

/** Kostenlose Probelektionen (je Modul eine) */
export const TRIAL_LESSONS: string[] = academyModules.map((m) => m.trial);

export function isTrialLesson(lessonId: string): boolean {
  return TRIAL_LESSONS.includes(lessonId);
}

export function moduleHref(m: AcademyModule): string {
  return `/akademie/modul/${m.slug}`;
}

/** Lektionen über alle Module in Lernreihenfolge – für „Nächste Lektion“ */
export function academyOrder(): ModuleLesson[] {
  return academyModules.flatMap(moduleLessons);
}
