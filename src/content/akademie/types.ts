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

/* ---------- Hilfen zum Schreiben der Inhalte ---------- */

export const noAudio = (): LessonAudio => ({
  intro: { src: null },
  explanation: { src: null },
  merksatz: { src: null },
});

export const draft: ReviewStatus = { status: "entwurf", note: "Fachliche Abnahme durch Reitlehrerin ausstehend" };

type LessonInput = Omit<AcademyLesson, "audio" | "review" | "id" | "number"> & {
  audio?: LessonAudio;
  review?: ReviewStatus;
};

/** Baut die Lektionen einer Welt und vergibt die festen IDs ra-w<n>-l<m>. */
export function lessonsOf(world: number, list: LessonInput[]): AcademyLesson[] {
  return list.map((l, i) => ({
    ...l,
    id: `ra-w${world}-l${i + 1}`,
    number: i + 1,
    audio: l.audio ?? noAudio(),
    review: l.review ?? draft,
  }));
}

/** Kurzschreibweise für eine Szene */
export const scene = (name: string): Visual => ({ kind: "scene", scene: name });
