/**
 * Rider Coach 1.0 – Datenmodell (seit 14.11.2026). Regelbasiert, ohne KI.
 *
 * Getrennt gehalten:
 *   problems.ts        Problemdefinitionen, Kategorien, Suchbegriffe/Synonyme (alle 50)
 *   safety.ts          vorgeschaltete Sicherheitsprüfung (für jedes Problem gleich)
 *   cases/<id>.ts      je Problem: Fragen, Antworten, Regeln (Antwort → Ursache),
 *                      mögliche Ursachen, Übungs-IDs, Akademie-/Rider-Lab-IDs, Planvorlage
 *   ../training/uebungen.ts  Übungen (gemeinsame Bibliothek mit dem Trainingsplaner)
 *   engine.ts          Auswertung (reine Funktionen, testbar)
 *   provider.ts        austauschbare Service-Schicht (RuleBasedCoachProvider, später KI)
 *
 * Nutzerdaten (Coaching-Fälle) liegen im Reitertagebuch auf dem Gerät (DiaryData.coach).
 */

export type ReviewStatus = "entwurf" | "geprueft";

export type CoachCategoryId = "sitz" | "hilfen" | "trab-galopp" | "biegung" | "dressur" | "gelaende";

export type CoachCategory = { id: CoachCategoryId; letter: string; title: string; text: string };

/** abklaeren = Fachperson/Tierarzt empfehlen, nur schonende Übungen · stopp = keine Übungen mit Pferd, kein Plan */
export type SafetyFlag = "abklaeren" | "stopp";

export type Cond = { q: string; anyOf: string[] } | { all: Cond[] } | { not: Cond };

export type CoachOption = {
  id: string;
  label: string;
  /** Regel: diese Antwort spricht für Ursache X (Punkte 1–3). Keine Wahrscheinlichkeiten. */
  causes?: Record<string, number>;
  flag?: SafetyFlag;
  /** Satzbaustein für „Deine Situation“ */
  summary?: string;
};

export type CoachQuestion = {
  id: string;
  text: string;
  help?: string;
  options: CoachOption[];
  /** Nur stellen, wenn die Bedingung erfüllt ist (Entscheidungsbaum) */
  showIf?: Cond;
};

export type CoachCause = {
  id: string;
  title: string;
  /** immer als Möglichkeit formuliert, nie als Diagnose */
  text: string;
  exercises: string[];
  /** gesundheitliche/ausrüstungsbedingte Ursache → nie Übungen, immer Abklärung */
  health?: boolean;
};

export type PlanWeek = { title: string; focus: string; exercises: string[] };

export type CoachProblemContent = {
  id: string;
  review: ReviewStatus;
  intro: string;
  /** „Was du verstehen solltest“ */
  understand: string[];
  questions: CoachQuestion[];
  causes: CoachCause[];
  /** Grundlagen, wenn die Angaben keine Eingrenzung erlauben */
  fallback: string[];
  /** Übungen, die auch bei „abklären“ vertretbar sind (ruhig, wenig Belastung) */
  gentle: string[];
  mistakes: string[];
  safety: string[];
  checkWhen: string[];
  lessons: string[];
  riderLab: string[];
  plan: { goal: string; weeks: PlanWeek[] };
};

export type CoachProblemInfo = {
  id: string; // cp-01 … cp-50 (nie ändern)
  slug: string;
  title: string;
  category: CoachCategoryId;
  terms: string[];
  /** Inhalte vorhanden? Sonst „in Vorbereitung“ – kein Link */
  ready?: boolean;
};

export type Answers = Record<string, string>;

export type CauseMatch = { id: string; title: string; text: string; because: string[]; exercises: string[] };

export type CoachStatus = "ok" | "unklar" | "abklaeren" | "stopp";

/** Ergebnisdaten – identisch für den regelbasierten und einen späteren KI-Provider */
export type CoachResult = {
  problemId: string;
  status: CoachStatus;
  summary: string[];
  causes: CauseMatch[];
  health: { level: SafetyFlag; reasons: string[]; checkWhen: string[] } | null;
  notes: string[];
  understand: string[];
  exercises: string[];
  lessons: string[];
  riderLab: string[];
  planAllowed: boolean;
  /** Herkunft, z. B. „regelbasiert 1.0“ */
  source: string;
};
