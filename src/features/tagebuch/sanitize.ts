import {
  DIARY_VERSION,
  DISCIPLINES,
  COACH_FEEDBACK,
  GOAL_STATUS,
  INTENSITIES,
  MOODS,
  PLAN_LEVELS,
  PLAN_PHASES,
  PLAN_KINDS,
  RELATIONS,
  type CoachCaseRecord,
  type DiaryData,
  type DiaryEntry,
  type Goal,
  type Horse,
  type Milestone,
  type PlanItem,
  type TrainingPlan,
  type RiderProfile,
} from "./types";

/**
 * Prüft und bereinigt Tagebuchdaten (beim Laden und beim Wiederherstellen einer
 * Sicherungsdatei). Unbekannte Felder fallen weg, Texte werden gekürzt.
 */

export const MAX_SHORT = 80;
export const MAX_TEXT = 2000;
const MAX_PHOTO = 1_500_000; // Zeichen der data-URL (~1,1 MB)

type Obj = Record<string, unknown>;
const isObj = (v: unknown): v is Obj => typeof v === "object" && v !== null && !Array.isArray(v);

function str(v: unknown, max = MAX_SHORT): string | undefined {
  if (typeof v !== "string") return undefined;
  const t = v.trim().slice(0, max);
  return t ? t : undefined;
}

function photo(v: unknown): string | undefined {
  return typeof v === "string" && v.startsWith("data:image/") && v.length <= MAX_PHOTO ? v : undefined;
}

const DATE = /^\d{4}-\d{2}-\d{2}$/;
function day(v: unknown): string | undefined {
  return typeof v === "string" && DATE.test(v) && !Number.isNaN(Date.parse(v)) ? v : undefined;
}
function iso(v: unknown): string | undefined {
  return typeof v === "string" && !Number.isNaN(Date.parse(v)) ? v : undefined;
}
function id(v: unknown): string | undefined {
  return typeof v === "string" && /^[A-Za-z0-9_-]{4,40}$/.test(v) ? v : undefined;
}
function oneOf<T extends string>(v: unknown, list: readonly T[]): T | undefined {
  return list.includes(v as T) ? (v as T) : undefined;
}
function int(v: unknown, min: number, max: number): number | undefined {
  return typeof v === "number" && Number.isInteger(v) && v >= min && v <= max ? v : undefined;
}
/** Liste von IDs eines Musters, ohne Doppelte, begrenzt */
function idList(v: unknown, re: RegExp, max: number): string[] | undefined {
  if (!Array.isArray(v)) return undefined;
  const out = [...new Set(v.filter((x): x is string => typeof x === "string" && re.test(x)))].slice(0, max);
  return out.length ? out : undefined;
}
const LINK_ID = /^r[al]-[a-z0-9-]{1,20}$/;
const EX_ID = /^ex-[a-z0-9-]{1,20}$/;
const RL_ID = /^rl-[a-z0-9-]{1,10}$/;

/** Entfernt leere Felder, damit die gespeicherten Objekte schlank bleiben */
function compact<T extends Obj>(o: T): T {
  for (const k of Object.keys(o)) if (o[k] === undefined) delete o[k];
  return o;
}

export function cleanProfile(v: unknown): RiderProfile {
  const o = isObj(v) ? v : {};
  return compact({
    name: str(o.name, 40),
    ridingSince: str(o.ridingSince, 40),
    level: str(o.level, 40),
    favoriteDiscipline: str(o.favoriteDiscipline, 40),
    wish: str(o.wish, 400),
    proud: str(o.proud, 400),
    monthlyTarget: int(o.monthlyTarget, 1, 40),
    activeHorseId: id(o.activeHorseId),
  });
}

export function cleanHorse(v: unknown): Horse | null {
  if (!isObj(v)) return null;
  const hid = id(v.id);
  const name = str(v.name, 40);
  if (!hid || !name) return null;
  return compact({
    id: hid,
    name,
    photo: photo(v.photo),
    nickname: str(v.nickname, 40),
    age: str(v.age, 20),
    breed: str(v.breed, 60),
    sex: str(v.sex, 20),
    height: str(v.height, 20),
    color: str(v.color, 40),
    relation: oneOf(v.relation, RELATIONS.map((r) => r.id)),
    since: str(v.since, 40),
    likes: str(v.likes, 600),
    goodAt: str(v.goodAt, 600),
    workingOn: str(v.workingOn, 600),
    notes: str(v.notes, MAX_TEXT),
    birthYear: int(v.birthYear, 1970, new Date().getFullYear()),
    training: str(v.training, 600),
    specials: str(v.specials, 600),
    createdAt: iso(v.createdAt) ?? new Date().toISOString(),
  });
}

export function cleanEntry(v: unknown, horseIds: Set<string>, goalIds?: Set<string>): DiaryEntry | null {
  if (!isObj(v)) return null;
  const eid = id(v.id);
  const date = day(v.date);
  if (!eid || !date) return null;
  const minutes = typeof v.minutes === "number" && Number.isInteger(v.minutes) && v.minutes > 0 && v.minutes <= 600 ? v.minutes : undefined;
  const horseId = typeof v.horseId === "string" && horseIds.has(v.horseId) ? v.horseId : undefined;
  const now = new Date().toISOString();
  return compact({
    id: eid,
    date,
    horseId,
    minutes,
    discipline: oneOf(v.discipline, DISCIPLINES),
    mood: oneOf(v.mood, MOODS.map((m) => m.id)),
    wentWell: str(v.wentWell, MAX_TEXT),
    learned: str(v.learned, MAX_TEXT),
    practice: str(v.practice, MAX_TEXT),
    nextTime: str(v.nextTime, MAX_TEXT),
    moment: str(v.moment, MAX_TEXT),
    favorite: v.favorite === true ? true : undefined,
    photo: photo(v.photo),
    focus: str(v.focus, MAX_SHORT),
    intensity: oneOf(v.intensity, INTENSITIES),
    difficult: str(v.difficult, MAX_TEXT),
    coachTip: str(v.coachTip, MAX_TEXT),
    note: str(v.note, MAX_TEXT),
    goalId: typeof v.goalId === "string" && (!goalIds || goalIds.has(v.goalId)) ? id(v.goalId) : undefined,
    planId: id(v.planId),
    lessons: idList(v.lessons, LINK_ID, 6),
    photos: Array.isArray(v.photos) ? (v.photos.map(photo).filter(Boolean).slice(0, 4) as string[]) : undefined,
    createdAt: iso(v.createdAt) ?? now,
    updatedAt: iso(v.updatedAt) ?? now,
  });
}

export function cleanGoal(v: unknown, horseIds: Set<string>): Goal | null {
  if (!isObj(v)) return null;
  const gid = id(v.id);
  const title = str(v.title, MAX_SHORT);
  if (!gid || !title) return null;
  const status = oneOf(v.status, GOAL_STATUS.map((s) => s.id)) ?? "neu";
  return compact({
    id: gid,
    title,
    description: str(v.description, 600),
    horseId: typeof v.horseId === "string" && horseIds.has(v.horseId) ? v.horseId : undefined,
    status,
    createdAt: iso(v.createdAt) ?? new Date().toISOString(),
    achievedAt: status === "geschafft" ? (iso(v.achievedAt) ?? new Date().toISOString()) : undefined,
    startDate: day(v.startDate),
    targetDate: day(v.targetDate),
    notes: str(v.notes, 600),
    checkins: Array.isArray(v.checkins)
      ? v.checkins
          .filter(isObj)
          .map((c) => ({ date: day(c.date), v: int(c.v, 1, 5) }))
          .filter((c): c is { date: string; v: number } => !!c.date && !!c.v)
          .slice(-100)
      : undefined,
  });
}

export function cleanPlanItem(v: unknown, horseIds: Set<string>, goalIds?: Set<string>): PlanItem | null {
  if (!isObj(v)) return null;
  const pid = id(v.id);
  const date = day(v.date);
  const kind = oneOf(v.kind, PLAN_KINDS.map((k) => k.id));
  const title = str(v.title, 120);
  if (!pid || !date || !kind || !title) return null;
  const minutes = typeof v.minutes === "number" && Number.isInteger(v.minutes) && v.minutes > 0 && v.minutes <= 600 ? v.minutes : undefined;
  const done = v.done === true ? true : undefined;
  return compact({
    id: pid,
    date,
    kind,
    title,
    ref: typeof v.ref === "string" && /^r[al]-[a-z0-9-]{1,20}$/.test(v.ref) ? v.ref : undefined,
    minutes,
    horseId: typeof v.horseId === "string" && horseIds.has(v.horseId) ? v.horseId : undefined,
    discipline: oneOf(v.discipline, DISCIPLINES),
    note: str(v.note, 300),
    goalId: typeof v.goalId === "string" && (!goalIds || goalIds.has(v.goalId)) ? id(v.goalId) : undefined,
    done,
    doneAt: done ? (iso(v.doneAt) ?? new Date().toISOString()) : undefined,
    entryId: id(v.entryId),
    intensity: oneOf(v.intensity, INTENSITIES),
    phase: oneOf(v.phase, PLAN_PHASES),
    ex: idList(v.ex, EX_ID, 6),
    rl: idList(v.rl, RL_ID, 3),
    series: id(v.series),
    check: v.check === true ? true : undefined,
    createdAt: iso(v.createdAt) ?? new Date().toISOString(),
  });
}

export function cleanMilestone(v: unknown, horseIds: Set<string>, entryIds: Set<string>): Milestone | null {
  if (!isObj(v)) return null;
  const mid = id(v.id);
  const date = day(v.date);
  const title = str(v.title, MAX_SHORT);
  if (!mid || !date || !title) return null;
  return compact({
    id: mid,
    date,
    title,
    note: str(v.note, 600),
    horseId: typeof v.horseId === "string" && horseIds.has(v.horseId) ? v.horseId : undefined,
    entryId: typeof v.entryId === "string" && entryIds.has(v.entryId) ? v.entryId : undefined,
    createdAt: iso(v.createdAt) ?? new Date().toISOString(),
  });
}

const KEY = /^[a-z0-9-]{1,30}$/;
export function cleanCoachCase(v: unknown, horseIds: Set<string>, goalIds: Set<string>, planIds: Set<string>): CoachCaseRecord | null {
  if (!isObj(v)) return null;
  const cid = id(v.id);
  const problemId = typeof v.problemId === "string" && /^cp-\d{2}$/.test(v.problemId) ? v.problemId : undefined;
  if (!cid || !problemId) return null;
  const answers: Record<string, string> = {};
  if (isObj(v.answers))
    for (const [k, a] of Object.entries(v.answers).slice(0, 30)) if (KEY.test(k) && typeof a === "string" && KEY.test(a)) answers[k] = a;
  const feedback = Array.isArray(v.feedback)
    ? v.feedback
        .filter(isObj)
        .flatMap((f): CoachCaseRecord["feedback"] => {
          const date = day(f.date);
          const fv = oneOf(f.v, COACH_FEEDBACK);
          return date && fv ? [compact({ date, v: fv, note: str(f.note, 300) })] : [];
        })
        .slice(-100)
    : [];
  const now = new Date().toISOString();
  return compact({
    id: cid,
    problemId,
    horseId: typeof v.horseId === "string" && horseIds.has(v.horseId) ? v.horseId : undefined,
    answers,
    goalId: typeof v.goalId === "string" && goalIds.has(v.goalId) ? v.goalId : undefined,
    planId: typeof v.planId === "string" && planIds.has(v.planId) ? v.planId : undefined,
    feedback,
    createdAt: iso(v.createdAt) ?? now,
    updatedAt: iso(v.updatedAt) ?? now,
  });
}

export function cleanTrainingPlan(v: unknown, horseIds: Set<string>, goalIds: Set<string>): TrainingPlan | null {
  if (!isObj(v)) return null;
  const pid = id(v.id);
  const goalTitle = str(v.goalTitle, MAX_SHORT);
  const start = day(v.start);
  const perWeek = int(v.perWeek, 1, 5);
  const weeks = int(v.weeks, 1, 12);
  if (!pid || !goalTitle || !start || !perWeek || !weeks) return null;
  return compact({
    id: pid,
    goalId: typeof v.goalId === "string" && goalIds.has(v.goalId) ? v.goalId : undefined,
    goalTitle,
    horseId: typeof v.horseId === "string" && horseIds.has(v.horseId) ? v.horseId : undefined,
    perWeek,
    weeks,
    types: Array.isArray(v.types) ? v.types.filter((t): t is string => typeof t === "string" && (DISCIPLINES as readonly string[]).includes(t)).slice(0, 8) : [],
    level: oneOf(v.level, PLAN_LEVELS) ?? "Fortgeschritten",
    start,
    category: str(v.category, 40),
    rules: Array.isArray(v.rules) ? v.rules.map((r) => str(r, 300)).filter((r): r is string => !!r).slice(0, 14) : [],
    createdAt: iso(v.createdAt) ?? new Date().toISOString(),
  });
}

/** Ganzes Tagebuch prüfen. `null` = keine gültige Tagebuchdatei. */
export function cleanDiary(v: unknown): DiaryData | null {
  if (!isObj(v) || typeof v.version !== "number" || v.version > DIARY_VERSION) return null;
  if (!Array.isArray(v.horses) || !Array.isArray(v.entries) || !Array.isArray(v.goals)) return null;
  const horses = v.horses.map(cleanHorse).filter((h): h is Horse => h !== null);
  const ids = new Set(horses.map((h) => h.id));
  const goals = v.goals.map((g) => cleanGoal(g, ids)).filter((g): g is Goal => g !== null);
  const goalIds = new Set(goals.map((g) => g.id));
  // `plan` gibt es erst seit 09.11.2026 – ältere Tagebücher und Sicherungen haben es nicht
  const plan = Array.isArray(v.plan) ? v.plan.map((p) => cleanPlanItem(p, ids, goalIds)).filter((p): p is PlanItem => p !== null) : [];
  const entries = v.entries.map((e) => cleanEntry(e, ids, goalIds)).filter((e): e is DiaryEntry => e !== null);
  const entryIds = new Set(entries.map((e) => e.id));
  // seit 14.11.2026 (Riding Space) – fehlen in älteren Tagebüchern und Sicherungen
  const milestones = Array.isArray(v.milestones)
    ? v.milestones.map((m) => cleanMilestone(m, ids, entryIds)).filter((m): m is Milestone => m !== null).slice(0, 500)
    : [];
  const plans = Array.isArray(v.plans) ? v.plans.map((p) => cleanTrainingPlan(p, ids, goalIds)).filter((p): p is TrainingPlan => p !== null).slice(0, 100) : [];
  const planIds = new Set(plans.map((p) => p.id));
  const coach = Array.isArray(v.coach) ? v.coach.map((c) => cleanCoachCase(c, ids, goalIds, planIds)).filter((c): c is CoachCaseRecord => c !== null).slice(0, 300) : [];
  const rest = Array.isArray(v.rest) ? [...new Set(v.rest.map(day).filter((d): d is string => !!d))].slice(-400) : [];
  return {
    version: DIARY_VERSION,
    profile: cleanProfile(v.profile),
    horses,
    entries,
    goals,
    plan,
    milestones,
    plans,
    rest,
    coach,
  };
}

export function newId(): string {
  const a = new Uint8Array(9);
  crypto.getRandomValues(a);
  return Array.from(a, (b) => "abcdefghijklmnopqrstuvwxyz0123456789"[b % 36]).join("");
}

/** Heutiges Datum in Ortszeit als YYYY-MM-DD */
export function today(d = new Date()): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}
