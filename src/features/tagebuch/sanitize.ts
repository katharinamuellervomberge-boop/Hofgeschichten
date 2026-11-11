import {
  CASE_STATUS,
  DIARY_VERSION,
  DISCIPLINES,
  FEEDBACK,
  GOAL_STATUS,
  MOODS,
  PLAN_KINDS,
  RELATIONS,
  type CoachCase,
  type CoachFeedback,
  type DiaryData,
  type DiaryEntry,
  type Goal,
  type GoalProgram,
  type Horse,
  type PlanItem,
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
    createdAt: iso(v.createdAt) ?? new Date().toISOString(),
  });
}

/* Rider Coach: Problem-, Übungs- und Antwort-Kennungen */
const PROBLEM_ID = /^cp-\d{2}$/;
const COACH_EX_ID = /^rc-\d{2}$/;
const KEY = /^[a-z0-9-]{1,24}$/;
function coachExList(v: unknown, max = 8): string[] {
  return Array.isArray(v) ? [...new Set(v.filter((x): x is string => typeof x === "string" && COACH_EX_ID.test(x)))].slice(0, max) : [];
}

export function cleanProgram(v: unknown): GoalProgram | undefined {
  if (!isObj(v) || !Array.isArray(v.weeks) || !Array.isArray(v.days)) return undefined;
  const weeks = v.weeks
    .slice(0, 12)
    .map((w) => (isObj(w) ? { title: str(w.title, 80) ?? "Woche", exercises: coachExList(w.exercises) } : null))
    .filter((w): w is GoalProgram["weeks"][number] => w !== null);
  const days = [...new Set(v.days.filter((d): d is number => Number.isInteger(d) && d >= 0 && d <= 6))].sort();
  const start = day(v.start);
  if (weeks.length === 0 || days.length === 0 || !start) return undefined;
  return { weeks, days, start };
}

function cleanFeedback(v: unknown): CoachFeedback | null {
  if (!isObj(v)) return null;
  const fid = id(v.id);
  const exercise = typeof v.exercise === "string" && COACH_EX_ID.test(v.exercise) ? v.exercise : undefined;
  const rating = oneOf(v.rating, FEEDBACK.map((f) => f.id));
  const date = day(v.date);
  if (!fid || !exercise || !rating || !date) return null;
  return compact({ id: fid, exercise, rating, date, entryId: id(v.entryId), planId: id(v.planId) });
}

export function cleanCoachCase(v: unknown, goalIds?: Set<string>): CoachCase | null {
  if (!isObj(v)) return null;
  const cid = id(v.id);
  const problem = typeof v.problem === "string" && PROBLEM_ID.test(v.problem) ? v.problem : undefined;
  if (!cid || !problem) return null;
  const answers: Record<string, string> = {};
  if (isObj(v.answers)) for (const [k, a] of Object.entries(v.answers).slice(0, 12)) if (KEY.test(k) && typeof a === "string" && KEY.test(a)) answers[k] = a;
  const flags = Array.isArray(v.flags) ? [...new Set(v.flags.filter((f): f is "abklaeren" | "stopp" => f === "abklaeren" || f === "stopp"))] : [];
  const now = new Date().toISOString();
  return compact({
    id: cid,
    problem,
    answers,
    exercises: coachExList(v.exercises),
    flags,
    status: oneOf(v.status, CASE_STATUS.map((s) => s.id)) ?? "offen",
    saved: v.saved === true ? true : undefined,
    goalId: typeof v.goalId === "string" && (!goalIds || goalIds.has(v.goalId)) ? id(v.goalId) : undefined,
    feedback: Array.isArray(v.feedback) ? v.feedback.slice(-200).map(cleanFeedback).filter((f): f is CoachFeedback => f !== null) : [],
    createdAt: iso(v.createdAt) ?? now,
    updatedAt: iso(v.updatedAt) ?? now,
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
    difficult: str(v.difficult, MAX_TEXT),
    goalId: typeof v.goalId === "string" && (!goalIds || goalIds.has(v.goalId)) ? id(v.goalId) : undefined,
    favorite: v.favorite === true ? true : undefined,
    photo: photo(v.photo),
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
    coachCaseId: id(v.coachCaseId),
    program: cleanProgram(v.program),
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
    ref: typeof v.ref === "string" && /^r[alc]-[a-z0-9-]{1,20}$/.test(v.ref) ? v.ref : undefined,
    minutes,
    horseId: typeof v.horseId === "string" && horseIds.has(v.horseId) ? v.horseId : undefined,
    discipline: oneOf(v.discipline, DISCIPLINES),
    note: str(v.note, 300),
    goalId: typeof v.goalId === "string" && (!goalIds || goalIds.has(v.goalId)) ? id(v.goalId) : undefined,
    exercises: kind === "coach" ? coachExList(v.exercises) : undefined,
    done,
    doneAt: done ? (iso(v.doneAt) ?? new Date().toISOString()) : undefined,
    entryId: id(v.entryId),
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
  // `coach` gibt es erst seit 11.11.2026
  const coach = Array.isArray(v.coach) ? v.coach.map((c) => cleanCoachCase(c, goalIds)).filter((c): c is CoachCase => c !== null) : [];
  return {
    version: DIARY_VERSION,
    profile: cleanProfile(v.profile),
    horses,
    entries: v.entries.map((e) => cleanEntry(e, ids, goalIds)).filter((e): e is DiaryEntry => e !== null),
    goals,
    plan,
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
