import { translateDeep, type Dict } from "@/i18n/translate";
import { activeQuestions, evaluate, nextQuestion, planWeeks, progress, pruneAnswers } from "./engine";
import { COACH_CASES } from "./cases";
import { COACH_CATEGORIES, COACH_PROBLEMS } from "./problems";
import { searchProblems } from "./search";
import { SAFETY_CHECK_WHEN, SAFETY_QUESTIONS } from "./safety";
import type { CoachProvider } from "./provider";
import type { CoachProblemContent, CoachProblemInfo } from "./types";

/**
 * Rider Coach auf Englisch: dieselben Regeln, Antworten (IDs) und Ergebnisse, nur die Texte kommen
 * aus dem Wörterbuch (src/content/coach/en.json, Schlüssel = textKey des deutschen Textes).
 * Gespeicherte Coaching-Fälle (IDs + Antwort-IDs) gelten in beiden Sprachen.
 */

/** Felder mit IDs und Regeln – nie übersetzen */
export const COACH_SKIP = new Set([
  "q", "anyOf", "flag", "category", "problemId", "exercises", "lessons", "riderLab", "gentle", "fallback",
]);

/** Alle übersetzbaren Coach-Texte (für scripts/en-riding.ts) */
export const coachSources = () => ({
  categories: COACH_CATEGORIES,
  problems: COACH_PROBLEMS,
  cases: COACH_CASES,
  safety: { SAFETY_QUESTIONS, SAFETY_CHECK_WHEN },
  engine: [
    "Einige Übungen sind für deinen Stand noch zu anspruchsvoll und werden nicht gezeigt. Übe solche Inhalte gemeinsam mit deiner Reitlehrkraft.",
    "Wegen der Hinweise auf Schmerzen oder Unwohlsein zeigen wir keine Übungen mit Pferd und keinen Trainingsplan. Bitte lass dein Pferd zuerst untersuchen.",
    "Bis zur Abklärung empfehlen wir nur ruhige, wenig belastende Übungen.",
    "Deine Angaben reichen nicht für eine zuverlässige Eingrenzung. Die Übungen unten sind Grundlagen, die bei diesem Problem allgemein sinnvoll sind. Eine Reitlehrkraft vor Ort kann genauer hinschauen.",
    "Tipp: Lass dich beim Reiten filmen – so siehst du selbst, was dein Sitz und deine Hände machen.",
  ],
});

export function englishCoach(dict: Dict): CoachProvider {
  const tr = <T,>(x: T): T => translateDeep(x, dict, undefined, COACH_SKIP);
  const categories = tr(COACH_CATEGORIES);
  const problems: CoachProblemInfo[] = tr(COACH_PROBLEMS);
  const cases: Record<string, CoachProblemContent> = {};
  for (const [id, c] of Object.entries(COACH_CASES)) cases[id] = tr(c);
  const need = (id: string) => {
    const c = cases[id];
    if (!c) throw new Error(`No coaching case for ${id}`);
    return c;
  };
  return {
    id: "rule-based-1.0-en",
    categories: () => categories,
    problems: () => problems,
    problem: (x) => problems.find((p) => p.id === x) ?? problems.find((p) => p.slug === x),
    content: (id) => cases[id],
    search: (q) => searchProblems(q, { max: 6, list: problems }),
    // Sicherheitsfragen und feste Hinweise stammen aus engine.ts/safety.ts → Ausgabe nachschlagen
    questions: (id, a) => tr(activeQuestions(need(id), a)),
    next: (id, a) => tr(nextQuestion(need(id), a)),
    progress: (id, a) => progress(need(id), a),
    clean: (id, a) => pruneAnswers(need(id), a),
    evaluate: (id, a) => {
      const c = cases[id];
      if (!c || nextQuestion(c, a)) return null;
      return tr(evaluate(c, a));
    },
    planWeeks: (id, allowed, weeks) => tr(planWeeks(need(id), allowed, weeks)),
  };
}
