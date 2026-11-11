import type { CoachCause, CoachExercise, CoachProblem, CoachQuestion, Cond, Difficulty, SafetyFlag } from "./types";

/**
 * Rider Coach – Analyse ohne KI: Verzweigungsregeln, Ursachen-Gewichtung, Lösungsweg.
 * Reine Funktionen (Browser und Prüfskript). Antworten: Frage-ID → Antwort-ID.
 */

export type Answers = Record<string, string>;

/** Höchstzahl normaler Fragen je Analyse (Sicherheitsfragen kommen dazu) */
export const MAX_QUESTIONS = 5;

export function condMet(c: Cond | undefined, a: Answers): boolean {
  if (!c) return true;
  if ("all" in c) return c.all.every((x) => condMet(x, a));
  if ("not" in c) return !condMet(c.not, a);
  return a[c.q] !== undefined && c.anyOf.includes(a[c.q]);
}

/** Fragen, die bei diesen Antworten gestellt werden (in Reihenfolge, gekappt auf MAX_QUESTIONS normale Fragen) */
export function activeQuestions(p: CoachProblem, a: Answers): CoachQuestion[] {
  const out: CoachQuestion[] = [];
  let normal = 0;
  for (const q of p.questions) {
    if (!condMet(q.showIf, a)) continue;
    if (!q.safety) {
      if (normal >= MAX_QUESTIONS) continue;
      normal++;
    }
    out.push(q);
  }
  return out;
}

/** Nächste offene Frage oder null (= Analyse fertig) */
export function nextQuestion(p: CoachProblem, a: Answers): CoachQuestion | null {
  return activeQuestions(p, a).find((q) => a[q.id] === undefined) ?? null;
}

/** Nur Antworten behalten, deren Fragen bei diesen Antworten noch gestellt werden (nach „Zurück“ und Ändern) */
export function pruneAnswers(p: CoachProblem, a: Answers): Answers {
  let cur = { ...a };
  for (let i = 0; i < p.questions.length; i++) {
    const keep = new Set(activeQuestions(p, cur).map((q) => q.id));
    const next: Answers = {};
    for (const [k, v] of Object.entries(cur)) if (keep.has(k) && p.questions.find((q) => q.id === k)?.options.some((o) => o.id === v)) next[k] = v;
    if (Object.keys(next).length === Object.keys(cur).length) return next;
    cur = next;
  }
  return cur;
}

export const isComplete = (p: CoachProblem, a: Answers) => nextQuestion(p, a) === null;

function chosenOptions(p: CoachProblem, a: Answers) {
  return activeQuestions(p, a)
    .map((q) => ({ q, o: q.options.find((o) => o.id === a[q.id]) }))
    .filter((x): x is { q: CoachQuestion; o: NonNullable<typeof x.o> } => !!x.o);
}

export function safetyFlags(p: CoachProblem, a: Answers): SafetyFlag[] {
  const f = new Set<SafetyFlag>();
  for (const { o } of chosenOptions(p, a)) if (o.flag) f.add(o.flag);
  return [...f];
}

/** Ausbildungsstand aus der gemeinsamen Frage „stand“ → höchste passende Übungsschwierigkeit */
export const LEVEL_QUESTION_ID = "stand";
export function levelCap(a: Answers): Difficulty {
  switch (a[LEVEL_QUESTION_ID]) {
    case "anfaenger":
      return 1;
    case "fortgeschritten":
      return 3;
    default:
      return 2; // fortgeschrittener Anfänger, Wiedereinsteiger, keine Angabe
  }
}

export type RankedCause = CoachCause & { score: number };

/** Mögliche Ursachen nach Punkten (nie als Diagnose – die Oberfläche formuliert sie als Möglichkeit) */
export function rankCauses(p: CoachProblem, a: Answers): RankedCause[] {
  const score = new Map<string, number>(p.causes.map((c) => [c.id, c.base ?? 0]));
  for (const { o } of chosenOptions(p, a)) for (const [cid, w] of Object.entries(o.weights ?? {})) if (score.has(cid)) score.set(cid, score.get(cid)! + w);
  return p.causes
    .map((c, i) => ({ ...c, score: score.get(c.id)!, i }))
    .sort((x, y) => y.score - x.score || x.i - y.i)
    .map(({ i: _i, ...c }) => c);
}

export type Solution = {
  summary: string[];
  causes: RankedCause[];
  flags: SafetyFlag[];
  /** Übungs-IDs in empfohlener Reihenfolge */
  exercises: string[];
};

/**
 * Lösung zusammenstellen: die (bis zu) drei wahrscheinlichsten Ursachen, dazu passende Übungen,
 * die zum Ausbildungsstand passen. Bei „stopp“: keine Übungen mit Pferd.
 */
export function buildSolution(p: CoachProblem, a: Answers, library: Record<string, Pick<CoachExercise, "difficulty" | "place" | "easier">>): Solution {
  const flags = safetyFlags(p, a);
  const ranked = rankCauses(p, a);
  const top = ranked.filter((c) => c.score > 0).slice(0, 3);
  const causes = top.length >= 2 ? top : ranked.slice(0, 2);
  const cap = levelCap(a);
  const stop = flags.includes("stopp");
  const seen = new Set<string>();
  const exercises: string[] = [];
  // erst die Übungen der gezeigten Ursachen, dann – falls weniger als 2 – aus den übrigen auffüllen
  const pool = [...causes.flatMap((c) => c.exercises), ...ranked.filter((c) => !causes.includes(c)).flatMap((c) => c.exercises)];
  const fromShown = new Set(causes.flatMap((c) => c.exercises));
  for (const id of pool) {
    if (!fromShown.has(id) && exercises.length >= 2) break;
    let ex = library[id];
    let use = id;
    // zu schwer für den Stand → leichtere Variante, falls vorhanden
    while (ex && ex.difficulty > cap && ex.easier && library[ex.easier]) {
      use = ex.easier;
      ex = library[use];
    }
    if (!ex || seen.has(use)) continue;
    if (stop && ex.place !== "zuhause") continue;
    seen.add(use);
    exercises.push(use);
  }
  const summary = chosenOptions(p, a)
    .filter(({ q }) => !q.safety && q.id !== LEVEL_QUESTION_ID)
    .map(({ o }) => o.summary)
    .filter((s): s is string => !!s);
  return { summary, causes, flags, exercises: exercises.slice(0, 6) };
}

/* ---------- Trainingsplan ---------- */

export type ProgramWeek = { title: string; exercises: string[] };

/**
 * Vorlage → Wochen für die gewünschte Dauer (2–8 Wochen). Längere Pläne wiederholen die
 * vorletzte Woche als Festigung, kürzere fassen zusammen; die letzte Woche („überprüfen“) bleibt.
 * Übungen, die nicht in der Lösung stehen (z. B. wegen Sicherheit), werden entfernt.
 */
export function programFromTemplate(p: CoachProblem, weeks: number, allowed?: string[]): ProgramWeek[] {
  const n = Math.min(8, Math.max(2, Math.round(weeks)));
  const ok = (id: string) => !allowed || allowed.includes(id);
  const base = p.plan.weeks.map((w) => ({ title: w.title, exercises: w.exercises.filter(ok) }));
  const fallback = allowed?.slice(0, 2) ?? [];
  const fix = (w: ProgramWeek) => (w.exercises.length ? w : { ...w, exercises: fallback });
  if (n === base.length) return base.map(fix);
  const last = base[base.length - 1];
  const body = base.slice(0, -1);
  if (n > base.length) {
    const extra = Array.from({ length: n - base.length }, (_, i) => ({ title: `Festigen (${i + 1})`, exercises: body[body.length - 1].exercises }));
    return [...body, ...extra, last].map(fix);
  }
  // kürzer: Wochen zusammenlegen
  const groups: ProgramWeek[] = [];
  const per = Math.ceil(body.length / (n - 1));
  for (let i = 0; i < body.length; i += per) {
    const part = body.slice(i, i + per);
    groups.push({ title: part.map((w) => w.title).join(" + "), exercises: [...new Set(part.flatMap((w) => w.exercises))] });
  }
  return [...groups, last].map(fix);
}
