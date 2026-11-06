import type { RiderLabAreaInfo } from "@/content/riderlab/katalog";
import type { Progress } from "@/lib/progress/types";

/**
 * Fortschritt im Rider Lab: im bestehenden Spielstand unter progress.games (ID → completedCount),
 * genau wie Lektionen und Lernspiele. Kein neues Datenfeld, bleibt auf dem Gerät.
 */
export const exerciseDone = (p: Progress, id: string) => (p.games[id]?.completedCount ?? 0) > 0;
export const exerciseCount = (p: Progress, id: string) => p.games[id]?.completedCount ?? 0;
export const areaDoneCount = (p: Progress, a: RiderLabAreaInfo) => a.exercises.filter((e) => exerciseDone(p, e.id)).length;
export const labDoneCount = (p: Progress, areas: RiderLabAreaInfo[]) => areas.reduce((n, a) => n + areaDoneCount(p, a), 0);
