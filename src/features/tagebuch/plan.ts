import { worlds } from "@/content/akademie";
import { allRiderLabExercises, exerciseHref } from "@/content/riderlab/katalog";
import { relatedLessons } from "./academyLinks";
import { today } from "./sanitize";
import type { DiaryData, Goal, PlanItem, PlanKind } from "./types";

/**
 * Trainingsplan im Reitertagebuch – Hilfsfunktionen (Wochen, Auswahllisten, Vorschläge).
 * Wochen beginnen am Montag. Alle Daten als YYYY-MM-DD in Ortszeit.
 */

const p2 = (n: number) => String(n).padStart(2, "0");
const fromDay = (d: string) => {
  const [y, m, dd] = d.split("-").map(Number);
  return new Date(y, m - 1, dd, 12);
};

/** Montag der Woche, in der `date` liegt */
export function weekStart(date: string = today()): string {
  const d = fromDay(date);
  const diff = (d.getDay() + 6) % 7; // Mo = 0
  d.setDate(d.getDate() - diff);
  return today(d);
}

export function addDays(date: string, n: number): string {
  const d = fromDay(date);
  d.setDate(d.getDate() + n);
  return today(d);
}

export function weekDays(start: string): string[] {
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}

export function isWeek(s: string | undefined): s is string {
  return !!s && /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s)) && weekStart(s) === s;
}

const DAY_SHORT = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const DAY_LONG = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];

export function dayLabel(date: string): { short: string; long: string; num: string } {
  const d = fromDay(date);
  const i = (d.getDay() + 6) % 7;
  return { short: DAY_SHORT[i], long: DAY_LONG[i], num: `${d.getDate()}.${d.getMonth() + 1}.` };
}

/** „10.–16. Nov. 2026“ */
export function weekLabel(start: string): string {
  const a = fromDay(start);
  const b = fromDay(addDays(start, 6));
  const month = (d: Date) => d.toLocaleDateString("de-DE", { month: "short" });
  if (a.getMonth() === b.getMonth()) return `${a.getDate()}.–${b.getDate()}. ${month(b)} ${b.getFullYear()}`;
  return `${a.getDate()}. ${month(a)} – ${b.getDate()}. ${month(b)} ${b.getFullYear()}`;
}

/** KW nach ISO 8601 */
export function weekNumber(start: string): number {
  const d = fromDay(start);
  d.setDate(d.getDate() + 3); // Donnerstag der Woche
  const jan4 = new Date(d.getFullYear(), 0, 4, 12);
  return 1 + Math.round(((d.getTime() - jan4.getTime()) / 86400000 - 3 + ((jan4.getDay() + 6) % 7)) / 7);
}

export function itemsOfWeek(data: DiaryData, start: string): PlanItem[] {
  const end = addDays(start, 6);
  return data.plan
    .filter((p) => p.date >= start && p.date <= end)
    .sort((a, b) => (a.date === b.date ? a.createdAt.localeCompare(b.createdAt) : a.date.localeCompare(b.date)));
}

export function weekStats(items: PlanItem[]) {
  const done = items.filter((p) => p.done).length;
  const minutes = items.filter((p) => p.done).reduce((n, p) => n + (p.minutes ?? 0), 0);
  return { total: items.length, done, minutes };
}

/** Wochen am Stück, in denen mindestens eine Einheit erledigt wurde (die laufende Woche zählt mit, wenn schon etwas erledigt ist) */
export function weekStreak(data: DiaryData): number {
  const doneWeeks = new Set(data.plan.filter((p) => p.done).map((p) => weekStart(p.date)));
  let w = weekStart();
  if (!doneWeeks.has(w)) w = addDays(w, -7);
  let n = 0;
  while (doneWeeks.has(w)) {
    n++;
    w = addDays(w, -7);
  }
  return n;
}

/* ---------- Auswahllisten ---------- */
export type RefOption = { id: string; title: string; group: string; href: string; dose?: string };

export const riderLabOptions: RefOption[] = allRiderLabExercises().map(({ area, ex }) => ({
  id: ex.id,
  title: ex.title,
  group: `${area.number}. ${area.title}`,
  href: exerciseHref(area, ex),
  dose: ex.doseLabel,
}));

export const lessonOptions: RefOption[] = worlds.flatMap((w) =>
  w.lessons.map((l) => ({ id: l.id, title: l.title, group: w.title, href: `/akademie/${w.slug}/${l.slug}` })),
);

const refIndex = new Map<string, RefOption>([...riderLabOptions, ...lessonOptions].map((o) => [o.id, o]));
export const refInfo = (id?: string) => (id ? refIndex.get(id) : undefined);

export function groupOptions(list: RefOption[]): { group: string; options: RefOption[] }[] {
  const out: { group: string; options: RefOption[] }[] = [];
  for (const o of list) {
    const g = out.find((x) => x.group === o.group);
    if (g) g.options.push(o);
    else out.push({ group: o.group, options: [o] });
  }
  return out;
}

/* ---------- Vorschläge aus den Zielen ---------- */
export type Suggestion = { kind: PlanKind; ref: string; title: string; goal: Goal; dose?: string };

/**
 * Zu offenen Zielen („Neu“, „Ich übe“) passende Rider-Lab-Übungen und Lektionen –
 * über dieselben Stichwort-Regeln wie „Passt dazu in der Reitakademie“ bei Einträgen.
 */
export function suggestionsFromGoals(data: DiaryData, weekItems: PlanItem[], max = 4): Suggestion[] {
  const planned = new Set(weekItems.map((p) => p.ref).filter(Boolean));
  const out: Suggestion[] = [];
  const seen = new Set<string>();
  for (const g of data.goals.filter((x) => x.status !== "geschafft")) {
    const fake = { id: "x", date: today(), createdAt: "", updatedAt: "", practice: `${g.title} ${g.description ?? ""}` };
    // je Ziel höchstens eine Lektion und eine Rider-Lab-Übung
    const hits = relatedLessons(fake, 3).filter((l) => !planned.has(l.id) && !seen.has(l.id) && refIndex.has(l.id));
    const pick = [hits.find((l) => l.id.startsWith("rl-")), hits.find((l) => l.id.startsWith("ra-"))].filter((l) => l !== undefined);
    for (const l of pick) {
      const info = refIndex.get(l.id)!;
      seen.add(l.id);
      out.push({ kind: l.id.startsWith("rl-") ? "riderlab" : "lektion", ref: l.id, title: info.title, goal: g, dose: info.dose });
      if (out.length >= max) return out;
    }
  }
  return out;
}

export const PLAN_KIND_ICON: Record<PlanKind, "horse" | "lab" | "academy" | "star"> = {
  reiten: "horse",
  riderlab: "lab",
  lektion: "academy",
  eigenes: "star",
  boden: "horse",
};
