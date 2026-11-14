import { activeQuestions, evaluate, nextQuestion, planWeeks, progress, pruneAnswers } from "./engine";
import { COACH_CASES } from "./cases";
import { COACH_CATEGORIES, COACH_PROBLEMS, problemById, problemBySlug } from "./problems";
import { searchProblems, type SearchHit } from "./search";
import type { Answers, CoachCategory, CoachProblemContent, CoachProblemInfo, CoachQuestion, CoachResult } from "./types";

/**
 * Austauschbare Coaching-Service-Schicht.
 *
 * Version 1.0: RuleBasedCoachProvider – Fragenbaum + Regeln, keine KI, keine API-Aufrufe.
 * Später denkbar: AIEnhancedCoachProvider mit derselben Schnittstelle. Er dürfte freie Texte
 * verstehen und Rückfragen formulieren, muss aber dasselbe CoachResult liefern, Übungen nur aus der
 * geprüften Bibliothek wählen und die Sicherheitsprüfung (safety.ts) unverändert anwenden –
 * keine Diagnosen, keine Übungen bei „stopp“.
 */
export interface CoachProvider {
  readonly id: string;
  categories(): CoachCategory[];
  problems(): CoachProblemInfo[];
  problem(idOrSlug: string): CoachProblemInfo | undefined;
  content(problemId: string): CoachProblemContent | undefined;
  search(query: string): SearchHit[];
  questions(problemId: string, answers: Answers): CoachQuestion[];
  next(problemId: string, answers: Answers): CoachQuestion | null;
  progress(problemId: string, answers: Answers): { done: number; total: number };
  clean(problemId: string, answers: Answers): Answers;
  evaluate(problemId: string, answers: Answers): CoachResult | null;
  planWeeks(problemId: string, allowed: string[], weeks: number): { title: string; focus: string; exercises: string[] }[];
}

const need = (id: string) => {
  const c = COACH_CASES[id];
  if (!c) throw new Error(`Kein Coaching-Fall für ${id}`);
  return c;
};

export const RuleBasedCoachProvider: CoachProvider = {
  id: "regelbasiert-1.0",
  categories: () => COACH_CATEGORIES,
  problems: () => COACH_PROBLEMS,
  problem: (x) => problemById(x) ?? problemBySlug(x),
  content: (id) => COACH_CASES[id],
  search: (q) => searchProblems(q, { max: 6 }),
  questions: (id, a) => activeQuestions(need(id), a),
  next: (id, a) => nextQuestion(need(id), a),
  progress: (id, a) => progress(need(id), a),
  clean: (id, a) => pruneAnswers(need(id), a),
  evaluate: (id, a) => {
    const c = COACH_CASES[id];
    if (!c || nextQuestion(c, a)) return null;
    return evaluate(c, a);
  },
  planWeeks: (id, allowed, weeks) => planWeeks(need(id), allowed, weeks),
};

/** Aktiver Provider – hier später austauschen */
export const coach: CoachProvider = RuleBasedCoachProvider;
