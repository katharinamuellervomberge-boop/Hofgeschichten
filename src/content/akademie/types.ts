import type { ByLevel, LevelFilter, Step, Visual } from "@/engine/types";
import type { StampMotif } from "../types";

/**
 * Inhaltsmodell der kleinen Reitakademie.
 *
 * Alle Lerntexte, Fragen, Antworten und Rückmeldungen stehen als reine Daten
 * in /src/content/akademie/welten. So können sie redaktionell geprüft,
 * erweitert und später mit Hörfassungen ergänzt werden.
 */

/** Platz für eine spätere Hörfassung. Es gibt bewusst noch keine Wiedergabe. */
export type AudioSlot = {
  /** Pfad zur Audiodatei, sobald es sie gibt (z. B. /audio/akademie/ra-w1-l1-intro.mp3) */
  src: string | null;
  /** Sprecher/Stimme, falls festgelegt */
  voice?: string | null;
};

export type LessonAudio = {
  intro: AudioSlot;
  explanation: AudioSlot;
  merksatz: AudioSlot;
};

export type AcademyOption = LevelFilter & {
  id: string;
  label: string;
  visual?: Visual;
  correct?: boolean;
  /** Rückmeldung bei dieser falschen Antwort – erklärt, nie strafend */
  feedback?: string;
};

export type AcademyQuestion = LevelFilter & {
  /** Eindeutig innerhalb der Lektion */
  id: string;
  prompt: ByLevel<string>;
  visual?: Visual;
  options: AcademyOption[];
  /** Rückmeldung bei richtiger Antwort */
  explain: ByLevel<string>;
  /** Bildkarten statt Liste (nur sinnvoll mit `visual` an den Antworten) */
  layout?: "pictures" | "list";
  audio?: AudioSlot;
};

export type ReviewStatus = {
  /** "entwurf" = fachlich noch nicht von einer Reitlehrerin abgenommen */
  status: "entwurf" | "geprueft";
  by?: string;
  date?: string;
  note?: string;
};

export type AcademyLesson = {
  /** Global eindeutige, dauerhafte ID (Fortschritt hängt daran): ra-w<Welt>-l<Lektion> */
  id: string;
  /** Teil der Adresse, z. B. „sicher-am-pferd“ */
  slug: string;
  number: number;
  title: string;
  /** Welches Hofkind führt in die Lektion ein */
  speaker: "lea" | "mila" | "ben";
  /** Kurzer kindgerechter Einstieg */
  intro: ByLevel<string>;
  /** Fachliche Erklärung, ein Eintrag = ein Bildschirm */
  explanation: { leicht: string[]; mittel: string[] };
  /** Bild zur Erklärung */
  illustration: Visual;
  /** Fachbegriffe (nur Stufe Mittel) */
  terms?: Array<{ term: string; meaning: string }>;
  /** Kleine Übung (ein oder mehrere Schritte, auch je Stufe) */
  exercise: Step[];
  /** Quizfragen – je Stufe mindestens drei */
  quiz: AcademyQuestion[];
  merksatz: ByLevel<string>;
  /** In Stufe Leicht den Hinweis „gemeinsam mit einem Erwachsenen lesen“ zeigen */
  readTogether?: boolean;
  /** Sicherheits- oder Praxishinweis für Eltern (z. B. „nur unter Aufsicht üben“) */
  practiceNote?: string;
  audio: LessonAudio;
  review: ReviewStatus;
  /** Ausführliches Lektionsformat der Module 10–14 (seit 13.11.2026) */
  deep?: DeepLesson;
};

/**
 * Ausführliche Lektion (Module 10–14) im Aufbau
 * A Einstieg → B Fachwissen → C Praxisbeispiel → D Häufige Fehler →
 * E So machst du es richtig → F Merke dir das → G Wissenstest → H Weiterlernen.
 * Einstieg = `intro`, Wissenstest = `quiz`, Entscheidungsübung = `exercise`.
 * Diese Lektionen richten sich an Jugendliche und Erwachsene und haben eine Textfassung für beide Stufen.
 */
export type DeepLesson = {
  /** B. Fachwissen: ein Abschnitt mit Zwischenüberschrift = ein Bildschirm */
  sections: Array<{ heading: string; text: string; visual?: Visual }>;
  /** C. Praxisbeispiel aus Stall, Haltung oder Reitunterricht */
  praxis: { title: string; text: string };
  /** D. Häufige Fehler (mindestens drei) mit der besseren Lösung */
  fehler: Array<{ fehler: string; besser: string }>;
  /** E. So machst du es richtig: konkrete, sichere Schritte */
  richtig: string[];
  /** F. Merke dir das: drei bis fünf Kernaussagen */
  merke: string[];
  /** H. Weiterlernen: Lektions-ID (wird verlinkt) oder Hinweis ohne Link */
  weiter: Array<{ lesson?: string; label: string }>;
  /** Ungefähre Lernzeit in Minuten */
  minutes: number;
  /** Intern: Was eine Fachperson vor Veröffentlichung besonders prüfen soll (wird nicht angezeigt) */
  pruefen?: string;
};

export type AcademyWorld = {
  /** w1 … w8 */
  id: string;
  number: number;
  slug: string;
  title: string;
  /** Ein Satz für Kinder */
  teaser: string;
  /** Lernziel für den Elternbereich */
  learns: string;
  tint: string;
  /** Titelbild (Szene) */
  cover: Visual;
  badge: { id: string; title: string; motif: StampMotif };
  lessons: AcademyLesson[];
};

/** Mini-Spiel der Akademie */
export type AcademyGame = {
  id: string;
  slug: string;
  title: string;
  teaser: string;
  learns: string;
  tint: string;
  cover: Visual;
  activity: import("@/engine/types").Activity;
};

/* ---------- Kleine und Große Akademie ---------- */

/**
 * klein = kostenlos für alle (Welten 1–3 + zwei Mini-Spiele)
 * gross = nach Freischaltung (Hof-Mitgliedschaft ODER Kauf „Große Reitakademie“)
 */
export type AcademyTier = "klein" | "gross";

/** Was der Browser über eine Lektion wissen darf (ohne Inhalte) */
export type LessonInfo = Pick<AcademyLesson, "id" | "slug" | "number" | "title">;

/** Lernwelt ohne Lektionsinhalte – für Übersichten, Fortschritt und Abzeichen */
export type AcademyWorldInfo = Omit<AcademyWorld, "lessons"> & { tier: AcademyTier; lessons: LessonInfo[] };

/** Mini-Spiel ohne Ablauf – für Übersichten */
export type AcademyGameInfo = Omit<AcademyGame, "activity"> & { tier: AcademyTier };

/* ---------- Hilfen zum Schreiben der Inhalte ---------- */

export const noAudio = (): LessonAudio => ({
  intro: { src: null },
  explanation: { src: null },
  merksatz: { src: null },
});

export const draft: ReviewStatus = { status: "entwurf", note: "Fachliche Abnahme durch Reitlehrerin ausstehend" };

/** Fachlich abgenommen (Bestätigung der Inhaberin am 29.10.2026 für die Lernwelten 9–14) */
export const reviewed2026_10_29: ReviewStatus = { status: "geprueft", date: "2026-10-29", note: "Fachliche Abnahme laut Inhaberin erfolgt" };

type LessonInput = Omit<AcademyLesson, "audio" | "review" | "id" | "number"> & {
  audio?: LessonAudio;
  review?: ReviewStatus;
};

/** Baut die Lektionen einer Welt und vergibt die festen IDs ra-w<n>-l<m>. */
export function lessonsOf(world: number, list: LessonInput[], defaultReview: ReviewStatus = draft): AcademyLesson[] {
  return list.map((l, i) => ({
    ...l,
    id: `ra-w${world}-l${i + 1}`,
    number: i + 1,
    audio: l.audio ?? noAudio(),
    review: l.review ?? defaultReview,
  }));
}

/** Neue Inhalte der Module 10–14: vor Veröffentlichung fachlich prüfen lassen */
export const draftDeep: ReviewStatus = {
  status: "entwurf",
  date: "2026-11-13",
  note: "Neuer Inhalt (Module 10–14) – fachliche Prüfung durch Reitlehrer/in bzw. Tierärztin/Tierarzt ausstehend",
};

type DeepLessonInput = Pick<AcademyLesson, "slug" | "title" | "speaker" | "illustration" | "terms" | "exercise" | "quiz" | "practiceNote"> & {
  /** A. Einstieg: Frage, Alltagssituation oder verbreiteter Irrtum */
  intro: string;
  deep: DeepLesson;
};

/**
 * Baut ausführliche Lektionen (Module 10–14). Eine Textfassung für beide Stufen,
 * Merksatz = erste Kernaussage, in der Kids-Akademie mit dem Hinweis „gemeinsam lesen“.
 */
export function deepLessonsOf(world: number, list: DeepLessonInput[]): AcademyLesson[] {
  return lessonsOf(
    world,
    list.map((l) => ({
      ...l,
      explanation: { leicht: [], mittel: [] },
      merksatz: l.deep.merke[0],
      readTogether: true,
    })),
    draftDeep,
  );
}

/** Kurzschreibweise für eine Szene */
export const scene = (name: string): Visual => ({ kind: "scene", scene: name });
