import "server-only";
import { demoProblem } from "./index";
import { loadProblem } from "./probleme.server";
import { coachExercises, getCoachExercise } from "./uebungen.server";
import type { CoachExercise, CoachProblem } from "./types";

/** Alle Übungen, die in einem Lösungsweg vorkommen können (Ursachen, Plan, leichtere Varianten) */
export function exerciseIdsForProblem(p: CoachProblem): string[] {
  const ids = new Set([...p.causes.flatMap((c) => c.exercises), ...p.plan.weeks.flatMap((w) => w.exercises)]);
  let grew = true;
  while (grew) {
    grew = false;
    for (const id of [...ids]) {
      const easier = getCoachExercise(id)?.easier;
      if (easier && !ids.has(easier)) {
        ids.add(easier);
        grew = true;
      }
    }
  }
  return coachExercises.filter((e) => ids.has(e.id)).map((e) => e.id);
}

export function exercisesForProblem(p: CoachProblem): Record<string, CoachExercise> {
  return Object.fromEntries(exerciseIdsForProblem(p).map((id) => [id, getCoachExercise(id)!]));
}

const demo = loadProblem(demoProblem.slug);
const demoIds = new Set(demo ? exerciseIdsForProblem(demo) : []);

/** Übungen des kostenlosen Demo-Lösungswegs sind auch ohne Kauf einzeln abrufbar */
export const isDemoExercise = (id: string) => demoIds.has(id);
