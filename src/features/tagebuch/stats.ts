import type { DiaryData, DiaryEntry } from "./types";

/** Alle Zahlen werden ausschließlich aus den gespeicherten Einträgen berechnet. */

export function totals(d: DiaryData) {
  return {
    lessons: d.entries.length,
    goalsDone: d.goals.filter((g) => g.status === "geschafft").length,
    favorites: d.entries.filter((e) => e.favorite).length,
  };
}

/** Neueste zuerst (Datum, dann Erstellzeit) */
export function sortEntries(list: DiaryEntry[]): DiaryEntry[] {
  return [...list].sort((a, b) => (a.date === b.date ? b.createdAt.localeCompare(a.createdAt) : b.date.localeCompare(a.date)));
}

export function lessonsWithHorse(d: DiaryData, horseId: string): number {
  return d.entries.filter((e) => e.horseId === horseId).length;
}

/** "YYYY-MM" */
export type MonthKey = string;

export function monthKey(date: string | Date): MonthKey {
  if (typeof date === "string") return date.slice(0, 7);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export function shiftMonth(key: MonthKey, delta: number): MonthKey {
  const [y, m] = key.split("-").map(Number);
  const d = new Date(y, m - 1 + delta, 1);
  return monthKey(d);
}

export function monthLabel(key: MonthKey): string {
  const [y, m] = key.split("-").map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString("de-DE", { month: "long", year: "numeric" });
}

/** Häufigste Werte; bei Gleichstand alle (in Reihenfolge des ersten Vorkommens) */
function mostCommon(values: (string | undefined)[]): { values: string[]; count: number } | null {
  const counts = new Map<string, number>();
  for (const v of values) if (v) counts.set(v, (counts.get(v) ?? 0) + 1);
  const max = Math.max(0, ...counts.values());
  if (max === 0) return null;
  return { values: [...counts].filter(([, c]) => c === max).map(([v]) => v), count: max };
}

export type MonthReview = {
  lessons: number;
  minutes: number;
  /** Einträge ohne Dauer werden bei der Zeit nicht mitgezählt */
  withoutMinutes: number;
  /** bei Gleichstand mehrere */
  topDisciplines: string[];
  topHorses: string[];
  goalsDone: { id: string; title: string }[];
  favorites: DiaryEntry[];
};

export function monthReview(d: DiaryData, key: MonthKey): MonthReview {
  const entries = sortEntries(d.entries.filter((e) => monthKey(e.date) === key));
  const top = mostCommon(entries.map((e) => e.horseId));
  return {
    lessons: entries.length,
    minutes: entries.reduce((s, e) => s + (e.minutes ?? 0), 0),
    withoutMinutes: entries.filter((e) => !e.minutes).length,
    topDisciplines: mostCommon(entries.map((e) => e.discipline))?.values ?? [],
    topHorses: (top?.values ?? []).flatMap((id) => d.horses.find((h) => h.id === id)?.name ?? []),
    goalsDone: d.goals
      .filter((g) => g.status === "geschafft" && g.achievedAt && monthKey(new Date(g.achievedAt)) === key)
      .map((g) => ({ id: g.id, title: g.title })),
    favorites: entries.filter((e) => e.favorite),
  };
}

export function formatMinutes(min: number): string {
  if (min < 60) return `${min} Min.`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h} Std. ${m} Min.` : `${h} Std.`;
}

export function formatDay(date: string, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" }): string {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("de-DE", opts);
}
