/**
 * Rider Coach – Datenmodell (seit 11.11.2026).
 *
 * Wissensdatenbank als Daten im Code, wie Reitakademie und Rider Lab:
 *   Problem → Kategorie, Suchbegriffe/Synonyme, Diagnosefragen mit Antworten,
 *   Verzweigungsregeln (showIf), mögliche Ursachen (Gewichte je Antwort),
 *   Übungen, Akademie-Lektionen, Rider-Lab-Übungen, Trainingsplan-Vorlage.
 *
 * Öffentlich (Browser): nur Titel, Suchbegriffe und Übungstitel (index.ts, uebungen-katalog.ts).
 * Inhalte (Fragen, Ursachen, Erklärungen, Übungsanleitungen) liegen in *.server.ts und
 * kommen erst nach der Freischaltung in den Browser (Ausnahme: das Demo-Problem).
 *
 * Nutzerdaten (Analysen, Lösungen, Pläne, Feedback) liegen im Reitertagebuch auf dem Gerät
 * (features/tagebuch/types.ts → CoachCase, Goal.program). Siehe docs/RIDER-COACH.md.
 */

/** Fachliche Prüfung: „entwurf“ = vor Veröffentlichung von einer Reitlehrkraft prüfen lassen */
export type ReviewStatus = "entwurf" | "geprueft";

export type CoachCategoryId = "sitz" | "hilfen" | "gangarten" | "umgang";

export type CoachCategory = { id: CoachCategoryId; title: string; text: string };

/** Sicherheits-Kennzeichen einer Antwort */
export type SafetyFlag =
  /** Fachliche Abklärung empfehlen (Tierarzt, Sattler, Reitlehrkraft), Übungen mit Pferd nur nach Abklärung */
  | "abklaeren"
  /** Akute Gefahr: keine Reitübungen anzeigen, nur Sicherheitshinweise und Abklärung */
  | "stopp";

/** Bedingung für eine Folgefrage: Antwort auf Frage `q` ist eine von `anyOf` */
export type Cond = { q: string; anyOf: string[] } | { all: Cond[] } | { not: Cond };

export type CoachOption = {
  id: string;
  label: string;
  /** Punkte für mögliche Ursachen (cause-id → Gewicht 1–3) */
  weights?: Record<string, number>;
  flag?: SafetyFlag;
  /** Satzbaustein für die Zusammenfassung, z. B. „es trabt immer schneller“ */
  summary?: string;
};

export type CoachQuestion = {
  id: string;
  text: string;
  help?: string;
  options: CoachOption[];
  /** Nur stellen, wenn die Bedingung erfüllt ist (Verzweigung) */
  showIf?: Cond;
  /** Sicherheitsabklärung – zählt nicht zur Höchstzahl von 5 Fragen */
  safety?: boolean;
};

export type CoachCause = {
  id: string;
  title: string;
  /** Verständliche fachliche Erklärung (immer als Möglichkeit formuliert) */
  text: string;
  /** Übungen, die bei dieser Ursache helfen können (Reihenfolge = Priorität) */
  exercises: string[];
  /** Grundgewicht, falls keine Antwort darauf zeigt */
  base?: number;
  /** Ursache betrifft Gesundheit/Ausrüstung → immer Abklärungshinweis zeigen, wenn sie oben steht */
  check?: boolean;
};

export type PlanWeekTemplate = { title: string; focus: string; exercises: string[] };

export type CoachProblem = {
  id: string; // cp-01 … (nie ändern, steht in Nutzerdaten)
  slug: string;
  title: string; // Ich-Form, wie der Nutzer es sagt
  category: CoachCategoryId;
  review: ReviewStatus;
  /** Kurzer Einleitungssatz auf der Analyse-Seite */
  intro: string;
  questions: CoachQuestion[];
  causes: CoachCause[];
  /** Was beim Üben oft schiefgeht */
  mistakes: string[];
  /** Tipps für die nächste Reitstunde */
  nextLesson: string[];
  /** Immer gezeigte Sicherheitshinweise */
  safety: string[];
  /** Wann eine Fachperson draufschauen sollte */
  checkWhen: string[];
  /** Akademie-Lektionen (ra-w…) */
  lessons: string[];
  /** Rider-Lab-Übungen (rl-…) */
  riderLab: string[];
  /** Vorlage „Daraus einen Trainingsplan machen“ */
  plan: { goal: string; weeks: PlanWeekTemplate[] };
};

export type Difficulty = 1 | 2 | 3;
export const DIFFICULTY_LABEL: Record<Difficulty, string> = { 1: "Leicht", 2: "Mittel", 3: "Anspruchsvoll" };

/** Wo wird geübt? */
export type ExercisePlace = "zuhause" | "boden" | "reiten";
export const PLACE_LABEL: Record<ExercisePlace, string> = { zuhause: "Zu Hause", boden: "Am Boden mit Pferd", reiten: "Beim Reiten" };

export type CoachExercise = {
  id: string; // rc-… (nie ändern)
  title: string;
  goal: string; // Lernziel
  difficulty: Difficulty;
  place: ExercisePlace;
  prerequisites: string[];
  equipment: string[];
  steps: string[];
  mistakes: string[];
  safety: string[];
  /** Animation/Video: Rider-Lab-Übung oder Akademie-Lektion mit Lernvideo */
  media?: { riderLab?: string; lesson?: string };
  /** Leichtere Variante (für „Schwierigkeit anpassen“) */
  easier?: string;
  review: ReviewStatus;
};

/* ---------- öffentlich (ohne Inhalte) ---------- */

export type CoachProblemInfo = {
  id: string;
  slug: string;
  title: string;
  category: CoachCategoryId;
  /** Kurzbeschreibung für Vorschau und Suche */
  teaser: string;
  /** Suchbegriffe, Umgangssprache, Synonyme (klein, ohne Umlaute nicht nötig – wird normalisiert) */
  terms: string[];
  demo?: boolean;
};

export type CoachExerciseInfo = { id: string; title: string; difficulty: Difficulty; place: ExercisePlace; easier?: string; problems: string[] };
