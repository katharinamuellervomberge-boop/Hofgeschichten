/**
 * Die Reitbahn (Riding Arena) – Datenmodell.
 *
 * Eine Übung ist reine Daten: Linie, Phasen, Hilfen, Fehler, Fragen. Dieselbe
 * Darstellung (features/arena) zeigt jede Übung. IDs (`arena_…`) nie ändern –
 * Trainingsplaner und Lernpfade verweisen darauf.
 *
 * Alle Übungen werden für die LINKE Hand geschrieben (Start auf der linken Hand).
 * Die rechte Hand entsteht durch Spiegelung (geometry.ts → forRein). Texte sprechen
 * deshalb nur von „innen“ und „außen“, nie von „links“ und „rechts“ – die Oberfläche
 * löst das je nach Biegung auf. Buchstaben, die beim Spiegeln wechseln, stehen in
 * eckigen Klammern: „bei [H] abwenden“ wird auf der rechten Hand zu „bei M abwenden“.
 */

export type ArenaSize = "20x40" | "20x60";
export type Rein = "links" | "rechts";
/** Biegung des Pferdes. "keine" = geradeaus gerichtet; "wechsel" = Umstellen läuft */
export type Bend = "links" | "rechts" | "keine" | "wechsel";
export type Gait = "halt" | "schritt" | "trab" | "galopp";
export type PhaseKind = "vorbereiten" | "einleiten" | "ausfuehren" | "halten" | "abschliessen";
/** Woher eine Aussage stammt – Pflichtangabe bei jeder Erklärung */
export type Evidence = "lehre" | "biomechanik" | "vereinfachung";
export type ReviewStatus = "entwurf" | "geprueft" | "freigegeben";

/** Punkt in Bahnmetern: x entlang der Bahn ab A (0 … Länge), y quer ab der K-Seite (0 … 20) */
export type Pt = { x: number; y: number };

/** Linie in Metern. Bögen: Mittelpunkt, Radius, Start- und Endwinkel in Grad (Bildschirmwinkel, y nach unten) */
export type Segment =
  | { kind: "line"; from: Pt; to: Pt; gait: Gait }
  | { kind: "arc"; center: Pt; r: number; startDeg: number; endDeg: number; gait: Gait }
  | { kind: "halt"; at: Pt; headingDeg: number; seconds: number };

/** Die einzelnen Hilfen. Seiten werden aus der Biegung abgeleitet. */
export type AidId = "sitz" | "gewicht" | "innenSchenkel" | "aussenSchenkel" | "innenZuegel" | "aussenZuegel" | "blick" | "oberkoerper";

/** Zustand einer Hilfe in einer Phase – Worte statt erfundener Kraftwerte */
export type AidState = "aktiv" | "verwahrend" | "nachgebend" | "neutral" | "begleitend";

export type AidInstruction = { state: AidState; text: string };

export type Explanation = { evidence: Evidence; text: string };

export type Phase = {
  id: string;
  kind: PhaseKind;
  title: string;
  /** Abschnitt der Linie in Metern ab Start (Zeit ergibt sich aus Gangart und Tempo) */
  timelineStart: number;
  timelineEnd: number;
  bend: Bend;
  /** Beim Umstellen (bend "wechsel"): die neue Biegung – danach richten sich innen und außen */
  nextBend?: "links" | "rechts";
  /** Hand in dieser Phase (Standard: Starthand). Nach einem Handwechsel die neue Hand. */
  hand?: Rein;
  gait: Gait;
  summary: string;
  highlightedAids: AidId[];
  aids: Partial<Record<AidId, AidInstruction>>;
  explanations: Explanation[];
  commonMistakeIds: string[];
  /** Lern-Modus hält am Anfang dieser Phase an */
  pause?: boolean;
  /** Phase ist das Stehen selbst: timelineStart = timelineEnd = Haltepunkt, die Dauer kommt aus dem Halt-Abschnitt */
  halt?: boolean;
};

export type Mistake = {
  id: string;
  title: string;
  notice: string;
  factors: string[];
  correction: string;
  relatedExerciseId?: string;
  /** Hinweis, wann nicht weitergeritten, sondern abgeklärt werden soll */
  stopNote?: string;
};

export type QuizQuestion = {
  id: string;
  /** {hand} {innen} {aussen} werden je nach gewählter Hand ersetzt */
  prompt: string;
  options: { id: string; text: string }[];
  /** Antwort-ID oder Regel, die aus Hand/Bahn berechnet wird */
  /** innenSeite/aussenSeite: bezogen auf die Starthand; …Neu: nach dem Handwechsel */
  answer: string | { rule: "innenSeite" | "aussenSeite" | "innenSeiteNeu" | "aussenSeiteNeu" | "mittellinienPunkt" };
  explanation: string;
};

/** Notiz in der Bahn. Bahnpunkte (z. B. „4 m nach K“) bleiben beim Handwechsel stehen;
 *  nur Notizen mit followsPath wandern mit der gespiegelten Linie. */
export type Annotation = { at: Pt; label: string; followsPath?: boolean; kind?: "notiz" | "uebergang" | "halt" };

export type ArenaExercise = {
  id: string;
  slug: string;
  title: string;
  titleDe: string;
  description: string;
  category: "bahnfigur" | "grundlage" | "uebergang";
  /** Varianten (z. B. Volte 10 m / 8 m) teilen sich eine Gruppe; die Seite zeigt einen Umschalter */
  group?: string;
  variantLabel?: string;
  /** Endet die Figur auf der anderen Hand? */
  changesRein: boolean;
  difficulty: 1 | 2 | 3;
  learnMinutes: number;
  arenaSizes: ArenaSize[];
  defaultSize: ArenaSize;
  /** Hand, für die die Daten geschrieben sind (immer "links") */
  authoredRein: "links";
  hasMirror: boolean;
  objectives: string[];
  prerequisites: string[];
  /** Linie je Bahngröße (Buchstabenlage unterscheidet sich, die Figur oft nicht) */
  path: Record<ArenaSize, Segment[]>;
  annotations: Record<ArenaSize, Annotation[]>;
  /** Wiedergabedauer bei 1× in Sekunden (Lerntempo, nicht Echtzeit) */
  durationSec: number;
  /** Phasen; bei Figuren, deren Meterangaben von der Bahngröße abhängen, je Größe in phasesBySize */
  phases: Phase[];
  phasesBySize?: Partial<Record<ArenaSize, Phase[]>>;
  durationBySize?: Partial<Record<ArenaSize, number>>;
  aidPurpose: Partial<Record<AidId, string>>;
  whyItWorks: Explanation[];
  mistakes: Mistake[];
  tips: string[];
  safetyNotes: string[];
  quiz: QuizQuestion[];
  relatedLessons: { id: string; title: string; href: string }[];
  relatedLibraryIds: string[];
  relatedSkillIds: string[];
  reviewStatus: ReviewStatus;
  reviewNote: string;
};
