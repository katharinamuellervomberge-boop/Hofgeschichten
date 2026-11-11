import { coachExerciseCatalog } from "@/content/coach/katalog.generated";
import { coachExerciseHref, problemInfoById } from "@/content/coach/index";
import { searchProblems } from "@/content/coach/search";
import { addDays, weekStart } from "./plan";
import { today } from "./sanitize";
import type { CoachCase, CoachFeedback, DiaryData, DiaryEntry, Goal, GoalProgram, PlanItem } from "./types";

/**
 * Rider Coach im Reitertagebuch: Trainingsplan aus einem Wochenprogramm, Fortschritt,
 * Rückmeldungen und Vorschläge zum Zuordnen von Einträgen. Reine Funktionen.
 */

const exIndex = new Map(coachExerciseCatalog.map((e) => [e.id, e]));
export const coachExerciseInfo = (id: string) => exIndex.get(id);
export const coachExerciseTitle = (id: string) => exIndex.get(id)?.title ?? "Übung";
export { coachExerciseHref };

export const WEEKDAY_SHORT = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

/** Standard-Trainingstage je Häufigkeit */
export function defaultDays(perWeek: number): number[] {
  return ({ 1: [2], 2: [1, 4], 3: [1, 3, 5], 4: [0, 2, 4, 6], 5: [0, 1, 3, 4, 6] } as Record<number, number[]>)[perWeek] ?? [1, 3, 5];
}

/**
 * Einheiten für ein Wochenprogramm: je Woche und Trainingstag eine Einheit „Rider Coach“
 * mit den Übungen der Woche. Tage vor `from` (Standard: heute) werden übersprungen.
 */
export function programItems(program: GoalProgram, goalId: string, from: string = today()): Omit<PlanItem, "id" | "createdAt">[] {
  const items: Omit<PlanItem, "id" | "createdAt">[] = [];
  const start = weekStart(program.start);
  program.weeks.forEach((w, i) => {
    for (const d of program.days) {
      const date = addDays(start, i * 7 + d);
      if (date < from) continue;
      items.push({ date, kind: "coach", title: `Woche ${i + 1}: ${w.title}`.slice(0, 120), exercises: w.exercises, goalId });
    }
  });
  return items;
}

export type ProgramProgress = { total: number; done: number; week: number; weeks: number; ended: boolean };

/** Fortschritt eines Ziels mit Wochenprogramm – nur aus tatsächlich abgehakten Einheiten */
export function programProgress(data: DiaryData, goal: Goal): ProgramProgress | null {
  if (!goal.program) return null;
  const items = data.plan.filter((p) => p.goalId === goal.id && p.kind === "coach");
  const start = weekStart(goal.program.start);
  const week = Math.floor((Date.parse(weekStart()) - Date.parse(start)) / (7 * 86400000)) + 1;
  const weeks = goal.program.weeks.length;
  return { total: items.length, done: items.filter((p) => p.done).length, week: Math.min(Math.max(week, 1), weeks), weeks, ended: week > weeks };
}

export const caseOfGoal = (data: DiaryData, goal?: Goal): CoachCase | undefined =>
  goal?.coachCaseId ? data.coach.find((c) => c.id === goal.coachCaseId) : undefined;

export const problemTitle = (c: CoachCase) => problemInfoById(c.problem)?.title ?? "Rider-Coach-Thema";

/** Letzte Rückmeldung je Übung eines Falls */
export function latestFeedback(c: CoachCase): Map<string, CoachFeedback> {
  const m = new Map<string, CoachFeedback>();
  for (const f of [...c.feedback].sort((a, b) => a.date.localeCompare(b.date))) m.set(f.exercise, f);
  return m;
}

/**
 * Alternativen bei „Noch nicht“: andere Übungen desselben Problems, die noch keine negative
 * Rückmeldung haben, leichtere zuerst. Nur Titel aus dem öffentlichen Katalog.
 */
export function alternativesFor(c: CoachCase, exercise: string, max = 3): string[] {
  const bad = new Set([...latestFeedback(c).values()].filter((f) => f.rating === "noch-nicht").map((f) => f.exercise));
  bad.add(exercise);
  return coachExerciseCatalog
    .filter((e) => e.problems.includes(c.problem) && !bad.has(e.id))
    .sort((a, b) => a.difficulty - b.difficulty || (c.exercises.includes(a.id) ? -1 : 1))
    .slice(0, max)
    .map((e) => e.id);
}

const entryText = (e: Pick<DiaryEntry, "wentWell" | "learned" | "practice" | "nextTime" | "moment" | "difficult">) =>
  [e.wentWell, e.learned, e.practice, e.nextTime, e.moment, e.difficult].filter(Boolean).join(" ");

/**
 * Vorschlag: Zu welchem offenen Ziel passt dieser Eintrag? Über die Suchbegriffe des
 * Coach-Problems (bei Coach-Zielen) bzw. den Zieltitel. Der Nutzer muss bestätigen.
 */
export function suggestGoalForEntry(data: DiaryData, e: Parameters<typeof entryText>[0]): Goal | undefined {
  const text = entryText(e);
  if (text.trim().length < 4) return undefined;
  const open = data.goals.filter((g) => g.status !== "geschafft");
  if (open.length === 0) return undefined;
  const hits = searchProblems(text, { max: 3, min: 3 });
  for (const h of hits) {
    const goal = open.find((g) => caseOfGoal(data, g)?.problem === h.problem.id);
    if (goal) return goal;
  }
  // Ziele ohne Coach-Bezug: Zieltitel als Suchbegriff
  for (const g of open) {
    const hit = searchProblems(text, { list: [{ id: g.id, slug: g.id, title: g.title, category: "sitz", teaser: "", terms: [] }], min: 4 });
    if (hit.length) return g;
  }
  return undefined;
}

/** Nächster sinnvoller Schritt im Coach (für Start und „Mein Coach“) – nur aus gespeicherten Daten */
export type CoachStep = { kind: "plan" | "feedback" | "analyse" | "solution"; title: string; text: string; href: string };

export function coachNextStep(data: DiaryData): CoachStep | null {
  const t = today();
  // 1. Heute oder überfällig: offene Coach-Einheit dieser Woche
  const due = data.plan
    .filter((p) => p.kind === "coach" && !p.done && p.date <= t && p.date >= weekStart())
    .sort((a, b) => a.date.localeCompare(b.date))[0];
  if (due) return { kind: "plan", title: "Arbeite an deinem Trainingsziel", text: due.title, href: "/tagebuch/plan" };
  // 2. Erledigte Coach-Einheit ohne Rückmeldung
  for (const p of data.plan.filter((x) => x.kind === "coach" && x.done).sort((a, b) => b.date.localeCompare(a.date))) {
    const c = data.coach.find((x) => x.goalId === p.goalId);
    if (c && p.exercises?.length && !c.feedback.some((f) => f.planId === p.id))
      return { kind: "feedback", title: "Hat dir die Übung geholfen?", text: coachExerciseTitle(p.exercises[0]), href: "/coach/mein-coach" };
  }
  // 3. Offene Analyse ohne Trainingsplan
  const open = [...data.coach].filter((c) => c.status === "offen" && !c.goalId).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0];
  if (open) {
    const info = problemInfoById(open.problem);
    if (info) return { kind: "solution", title: "Löse dein aktuelles Reitproblem", text: info.title, href: `/coach/${info.slug}?fall=${open.id}` };
  }
  return null;
}

/** Übung im Wochenprogramm ab der laufenden Woche ersetzen (frühere Wochen bleiben, wie sie waren) */
export function replaceExercise(program: GoalProgram, from: string, to: string): GoalProgram {
  const startWeek = Math.max(0, Math.floor((Date.parse(weekStart()) - Date.parse(weekStart(program.start))) / (7 * 86400000)));
  return {
    ...program,
    weeks: program.weeks.map((w, i) =>
      i < startWeek || !w.exercises.includes(from) ? w : { ...w, exercises: [...new Set(w.exercises.map((x) => (x === from ? to : x)))] },
    ),
  };
}
