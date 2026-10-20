/**
 * Datengetriebener Spielkern.
 *
 * Jedes Lernspiel und jede Detektiv-Mission ist eine `Activity`: eine Folge
 * von Schritten (`Step`). Neue Spiele und Fälle entstehen, indem man Daten
 * schreibt – nicht Code. Alle Typen sind reines JSON (keine Funktionen),
 * damit Premium-Inhalte vom Server an freigeschaltete Geräte übergeben
 * werden können.
 */

export type Level = "leicht" | "mittel";

export const LEVELS: Array<{ id: Level; label: string; ages: string; stars: number }> = [
  { id: "leicht", label: "Leicht", ages: "4–6 Jahre", stars: 1 },
  { id: "mittel", label: "Mittel", ages: "7–9 Jahre", stars: 2 },
];

/** Wert, der sich je Stufe unterscheiden kann. */
export type ByLevel<T> = T | { leicht: T; mittel: T };

export function pick<T>(v: ByLevel<T>, level: Level): T {
  if (v && typeof v === "object" && "leicht" in (v as object) && "mittel" in (v as object)) {
    return (v as { leicht: T; mittel: T })[level];
  }
  return v as T;
}

/** Nur in bestimmten Stufen anzeigen (fehlt = alle Stufen). */
export type LevelFilter = { levels?: Level[] };

export function forLevel<T extends LevelFilter>(list: T[], level: Level): T[] {
  return list.filter((x) => !x.levels || x.levels.includes(level));
}

/* ---------- Bilder ---------- */

export type EarMoodRef = "neugierig" | "entspannt" | "grummelig" | "aufgeregt";

export type Visual =
  | { kind: "item"; name: string }
  | { kind: "count"; name: string; n: number }
  | { kind: "head"; horse: string; mood: EarMoodRef }
  | { kind: "horse"; horse: string; flip?: boolean }
  | { kind: "track"; track: string }
  | { kind: "scene"; scene: string }
  | { kind: "kid"; kid: string }
  | { kind: "puppy"; pose?: "sit" | "sleep" }
  | { kind: "clue"; clue: string }
  | { kind: "mood"; mood: EarMoodRef }
  | { kind: "notebook" };

/* ---------- Schritte ---------- */

export type Speaker = "lea" | "mila" | "ben" | "erzaehler";

export type StoryStep = LevelFilter & {
  type: "story";
  id: string;
  visual?: Visual;
  speaker?: Speaker;
  text: ByLevel<string>;
};

export type Hotspot = LevelFilter & {
  id: string;
  label: string;
  /** Mittelpunkt und Radius in den Koordinaten der Szene */
  x: number;
  y: number;
  r: number;
  /** Wird beim Finden vorgelesen/angezeigt */
  say?: ByLevel<string>;
  /** Hinweis, der ins Detektivbuch wandert */
  clue?: string;
};

export type HotspotStep = LevelFilter & {
  type: "hotspots";
  id: string;
  scene: Visual;
  prompt: ByLevel<string>;
  /**
   * collect: alle Ziele in beliebiger Reihenfolge finden
   * sequence: die App fragt nacheinander nach jedem Ziel ("Wo ist …?")
   */
  mode: "collect" | "sequence";
  targets: Hotspot[];
  /** Ablenker mit freundlichem Hinweis */
  decoys?: Array<LevelFilter & { id: string; label: string; x: number; y: number; r: number; say: string }>;
  /** Text beim Antippen einer leeren Stelle */
  missHint?: string;
};

export type ChoiceOption = LevelFilter & {
  id: string;
  label: string;
  visual?: Visual;
  correct?: boolean;
  /** Erklärung bei falscher Wahl – hilfreich, nie strafend */
  feedback?: string;
};

export type ChoiceStep = LevelFilter & {
  type: "choice";
  id: string;
  prompt: ByLevel<string>;
  visual?: Visual;
  options: ChoiceOption[];
  /** Erklärung nach der richtigen Antwort */
  explain: ByLevel<string>;
  /** Darstellung der Antworten */
  layout?: "pictures" | "list";
  /** Hinweis fürs Detektivbuch nach richtiger Antwort */
  clue?: string;
};

export type MatchStep = LevelFilter & {
  type: "match";
  id: string;
  prompt: ByLevel<string>;
  targets: Array<LevelFilter & { id: string; label: string; visual?: Visual }>;
  items: Array<LevelFilter & { id: string; label: string; visual: Visual; target: string; say: string; wrong?: string }>;
};

export type CodeStep = LevelFilter & {
  type: "code";
  id: string;
  prompt: ByLevel<string>;
  digits: Array<{
    riddle: ByLevel<string>;
    visual?: ByLevel<Visual>;
    answer: ByLevel<number>;
    hint: ByLevel<string>;
  }>;
  success: ByLevel<string>;
};

export type Step = StoryStep | HotspotStep | ChoiceStep | MatchStep | CodeStep;

/** Ein spielbarer Ablauf: Lernspiel oder Mission. */
export type Activity = {
  id: string;
  title: string;
  /** Kurzer Einleitungssatz zum Vorlesen */
  intro: ByLevel<string>;
  steps: Step[];
  /** Hinweise, die nach Abschluss im Detektivbuch stehen */
  awardsClues?: string[];
};

/* ---------- Abenteuer ---------- */

export type ClueDef = { label: string; visual: Visual };

/** Vollständiger Inhalt eines Abenteuers (Premium: nur serverseitig laden!). */
export type AdventureContent = {
  slug: string;
  clues: Record<string, ClueDef>;
  missions: Activity[];
};
