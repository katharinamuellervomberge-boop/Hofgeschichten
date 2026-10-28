import type { Level, Visual } from "@/engine/types";
import type { AcademyPath } from "@/lib/progress/types";
import { getAcademyGameInfo, worlds } from "./index";
import type { AcademyGameInfo, AcademyWorldInfo, LessonInfo } from "./types";

/**
 * Die Reitakademie in sechs Modulen (seit 28.10.2026).
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
      grown: "Verhalten, Bedürfnisse und Kommunikation des Fluchttiers Pferd.",
    },
    tint: "#E3E7DA",
    cover: scene("ak-zonen"),
    trial: "ra-w8-l3",
    topics: [
      { title: "Körpersprache", lessons: [] },
      { title: "Verhalten", lessons: ["ra-w8-l3", "ra-w8-l4"] },
      { title: "Bedürfnisse", lessons: ["ra-w8-l2"] },
      { title: "Herdenleben", lessons: [] },
      { title: "Kommunikation", lessons: ["ra-w8-l1"] },
    ],
  },
  {
    id: "m2",
    number: 2,
    slug: "umgang-mit-pferden",
    title: "Umgang mit Pferden",
    teaser: {
      kids: "Sicher am Pferd: Helm, Sattel, Trense und mehr.",
      grown: "Sicherheit am Boden, Ausrüstung und der Weg zum gesattelten Pferd.",
    },
    tint: "#EDE3CF",
    cover: scene("ak-sattelzeug"),
    trial: "ra-w1-l1",
    topics: [
      { title: "Sicherheit", lessons: ["ra-w1-l1", "ra-w1-l2"] },
      { title: "Pferdepflege", lessons: [] },
      { title: "Putzen", lessons: [] },
      { title: "Hufe auskratzen", lessons: [] },
      { title: "Führen", lessons: [] },
      { title: "Satteln und Trensen", lessons: ["ra-w1-l3"] },
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
    slug: "besser-reiten",
    title: "Besser reiten",
    teaser: {
      kids: "Reiten in der Bahn: Zirkel, Volte und Handwechsel.",
      grown: "Bahn- und Hufschlagfiguren, Takt und typische Anfängerfehler.",
    },
    tint: "#E6E0D2",
    cover: scene("ak-bahn-zirkel"),
    trial: "ra-w7-l1",
    topics: [
      { title: "Bahnfiguren", lessons: ["ra-w7-l1", "ra-w7-l3"] },
      { title: "Hufschlagfiguren", lessons: ["ra-w7-l2", "ra-w7-l4"] },
      { title: "Takt und Rhythmus", lessons: [] },
      { title: "Häufige Anfängerfehler", lessons: [] },
      { title: "Sicherer im Sattel werden", lessons: [] },
    ],
  },
  {
    id: "m6",
    number: 6,
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
