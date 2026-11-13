import type { ChoiceStep } from "@/engine/types";
import type { AcademyQuestion, deepLessonsOf } from "../types";

/**
 * Kurzschreibweisen für ausführliche Lektionen (Module 10–14).
 * Antwort-IDs werden automatisch vergeben (a = richtig, b, c, d = falsch).
 */
export type DeepInput = Parameters<typeof deepLessonsOf>[1][number];

type Wrong = [label: string, feedback: string];

const opts = (right: string, wrong: Wrong[]) => [
  { id: "a", label: right, correct: true as const },
  ...wrong.map(([label, feedback], i) => ({ id: "bcd"[i], label, feedback })),
];

/** Quizfrage: richtige Antwort, falsche Antworten mit Rückmeldung, Erklärung */
export const frage = (id: string, prompt: string, right: string, wrong: Wrong[], explain: string): AcademyQuestion => ({ id, prompt, options: opts(right, wrong), explain });

/** Entscheidungsübung nach dem Praxisbeispiel */
export const wahl = (id: string, prompt: string, right: string, wrong: Wrong[], explain: string): ChoiceStep => ({
  type: "choice",
  id,
  prompt,
  layout: "list",
  options: opts(right, wrong),
  explain,
});

/** Häufige Fehler als Paare [Fehler, besser] */
export const fehler = (...pairs: Wrong[]) => pairs.map(([f, besser]) => ({ fehler: f, besser }));

/** Weiterlernen: Lektions-ID oder freier Hinweis */
export const weiter = (...items: Array<[label: string, lesson?: string]>) => items.map(([label, lesson]) => (lesson ? { label, lesson } : { label }));

/** Lernkarte mit Tabelle als Bild */
export const tabelle = (label: string, title: string, table: string[][]) => ({ kind: "doc" as const, doc: { style: "lesson" as const, label, title, lines: [], table } });

/** Begriffe als Paare [Begriff, Bedeutung] */
export const begriffe = (...pairs: Array<[string, string]>) => pairs.map(([term, meaning]) => ({ term, meaning }));
