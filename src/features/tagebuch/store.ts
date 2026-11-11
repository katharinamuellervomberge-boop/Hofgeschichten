"use client";

import { useSyncExternalStore } from "react";
import { loadDiary, requestPersistence, saveDiary } from "./db";
import { programItems } from "./coach";
import { cleanCoachCase, cleanEntry, cleanGoal, cleanHorse, cleanPlanItem, cleanProfile, newId, today } from "./sanitize";
import {
  emptyDiary,
  type CaseStatus,
  type CoachCase,
  type CoachFeedback,
  type DiaryData,
  type DiaryEntry,
  type Goal,
  type GoalProgram,
  type GoalStatus,
  type Horse,
  type PlanItem,
  type RiderProfile,
} from "./types";

/**
 * Kleiner Store für das Reitertagebuch (wie src/lib/progress/store.ts, aber mit
 * IndexedDB). Jede Änderung wird sofort gespeichert; schlägt das Speichern fehl,
 * zeigt die Oberfläche einen Hinweis und die Änderung wird zurückgenommen.
 */

export type DiaryState =
  | { status: "loading"; data: DiaryData }
  | { status: "ready"; data: DiaryData; persisted: boolean }
  | { status: "error"; data: DiaryData };

let state: DiaryState = { status: "loading", data: emptyDiary };
let started = false;
const listeners = new Set<() => void>();
let channel: BroadcastChannel | null = null;

function emit() {
  listeners.forEach((l) => l());
}

async function start() {
  if (started || typeof window === "undefined") return;
  started = true;
  try {
    const data = await loadDiary();
    const persisted = await requestPersistence();
    state = { status: "ready", data, persisted };
  } catch {
    state = { status: "error", data: emptyDiary };
  }
  emit();
  try {
    channel = new BroadcastChannel("hg-tagebuch");
    channel.onmessage = async () => {
      // anderer Tab hat gespeichert → neu laden
      try {
        const data = await loadDiary();
        if (state.status === "ready") state = { ...state, data };
        emit();
      } catch {
        /* ignorieren */
      }
    };
  } catch {
    channel = null;
  }
}

function subscribe(l: () => void) {
  listeners.add(l);
  void start();
  return () => listeners.delete(l);
}

const getServer = (): DiaryState => ({ status: "loading", data: emptyDiary });

export function useDiary(): DiaryState {
  return useSyncExternalStore(subscribe, () => state, getServer);
}

export class SaveError extends Error {}

async function commit(fn: (d: DiaryData) => DiaryData): Promise<void> {
  if (state.status !== "ready") throw new SaveError("not-ready");
  const before = state;
  const next = fn(state.data);
  state = { ...state, data: next };
  emit();
  try {
    await saveDiary(next);
    channel?.postMessage("changed");
  } catch {
    state = before;
    emit();
    throw new SaveError("save-failed");
  }
}

const horseIds = (d: DiaryData) => new Set(d.horses.map((h) => h.id));
const goalIds = (d: DiaryData) => new Set(d.goals.map((g) => g.id));
const nowIso = () => new Date().toISOString();

/* ---------- Profil ---------- */
export function saveProfile(p: RiderProfile) {
  return commit((d) => ({ ...d, profile: cleanProfile(p) }));
}

/* ---------- Pferde ---------- */
export async function saveHorse(input: Omit<Horse, "id" | "createdAt"> & { id?: string }): Promise<string> {
  const hid = input.id ?? newId();
  await commit((d) => {
    const old = d.horses.find((h) => h.id === hid);
    const horse = cleanHorse({ ...input, id: hid, createdAt: old?.createdAt ?? nowIso() });
    if (!horse) throw new SaveError("invalid");
    return { ...d, horses: old ? d.horses.map((h) => (h.id === hid ? horse : h)) : [...d.horses, horse] };
  });
  return hid;
}

/** Pferd löschen. Einträge, Ziele und Plan bleiben erhalten, verlieren nur die Zuordnung. */
export function deleteHorse(hid: string) {
  return commit((d) => ({
    ...d,
    horses: d.horses.filter((h) => h.id !== hid),
    entries: d.entries.map((e) => (e.horseId === hid ? { ...e, horseId: undefined } : e)),
    goals: d.goals.map((g) => (g.horseId === hid ? { ...g, horseId: undefined } : g)),
    plan: d.plan.map((p) => (p.horseId === hid ? { ...p, horseId: undefined } : p)),
  }));
}

/* ---------- Reitstunden ---------- */
export async function saveEntry(input: Omit<DiaryEntry, "id" | "createdAt" | "updatedAt"> & { id?: string }): Promise<string> {
  const eid = input.id ?? newId();
  await commit((d) => {
    const old = d.entries.find((e) => e.id === eid);
    const entry = cleanEntry({ ...input, id: eid, createdAt: old?.createdAt ?? nowIso(), updatedAt: nowIso() }, horseIds(d), goalIds(d));
    if (!entry) throw new SaveError("invalid");
    return { ...d, entries: old ? d.entries.map((e) => (e.id === eid ? entry : e)) : [...d.entries, entry] };
  });
  return eid;
}

export function deleteEntry(eid: string) {
  return commit((d) => ({
    ...d,
    entries: d.entries.filter((e) => e.id !== eid),
    plan: d.plan.map((p) => (p.entryId === eid ? { ...p, entryId: undefined } : p)),
  }));
}

export function toggleFavorite(eid: string) {
  return commit((d) => ({
    ...d,
    entries: d.entries.map((e) => (e.id === eid ? { ...e, favorite: e.favorite ? undefined : true, updatedAt: nowIso() } : e)),
  }));
}

/* ---------- Ziele ---------- */
export async function saveGoal(input: Omit<Goal, "id" | "createdAt" | "achievedAt"> & { id?: string }): Promise<string> {
  const gid = input.id ?? newId();
  await commit((d) => {
    const old = d.goals.find((g) => g.id === gid);
    const achievedAt = input.status === "geschafft" ? (old?.achievedAt ?? nowIso()) : undefined;
    // Programm und Coach-Bezug bleiben beim Bearbeiten erhalten
    const goal = cleanGoal({ coachCaseId: old?.coachCaseId, program: old?.program, ...input, id: gid, createdAt: old?.createdAt ?? nowIso(), achievedAt }, horseIds(d));
    if (!goal) throw new SaveError("invalid");
    return { ...d, goals: old ? d.goals.map((g) => (g.id === gid ? goal : g)) : [...d.goals, goal] };
  });
  return gid;
}

export function setGoalStatus(gid: string, status: GoalStatus) {
  return commit((d) => ({
    ...d,
    goals: d.goals.map((g) =>
      g.id === gid ? { ...g, status, achievedAt: status === "geschafft" ? (g.achievedAt ?? nowIso()) : undefined } : g,
    ),
  }));
}

/** Ziel löschen. Einheiten und Einträge bleiben, verlieren nur die Zuordnung; offene Coach-Einheiten des Ziels entfallen. */
export function deleteGoal(gid: string) {
  const t = today();
  return commit((d) => ({
    ...d,
    goals: d.goals.filter((g) => g.id !== gid),
    plan: d.plan
      .filter((p) => !(p.goalId === gid && p.kind === "coach" && !p.done && p.date >= t))
      .map((p) => (p.goalId === gid ? { ...p, goalId: undefined } : p)),
    entries: d.entries.map((e) => (e.goalId === gid ? { ...e, goalId: undefined } : e)),
    coach: d.coach.map((c) => (c.goalId === gid ? { ...c, goalId: undefined } : c)),
  }));
}

/* ---------- Trainingsplan ---------- */
const MAX_PLAN = 2000;

export type PlanInput = Omit<PlanItem, "id" | "createdAt" | "doneAt"> & { id?: string };

function buildPlanItem(d: DiaryData, input: PlanInput, old?: PlanItem): PlanItem {
  const pid = input.id ?? newId();
  const doneAt = input.done ? (old?.doneAt ?? nowIso()) : undefined;
  const item = cleanPlanItem({ ...input, id: pid, doneAt, createdAt: old?.createdAt ?? nowIso() }, horseIds(d), new Set(d.goals.map((g) => g.id)));
  if (!item) throw new SaveError("invalid");
  return item;
}

export async function savePlanItem(input: PlanInput): Promise<string> {
  let pid = input.id ?? "";
  await commit((d) => {
    const old = input.id ? d.plan.find((p) => p.id === input.id) : undefined;
    const item = buildPlanItem(d, input, old);
    pid = item.id;
    if (!old && d.plan.length >= MAX_PLAN) throw new SaveError("full");
    return { ...d, plan: old ? d.plan.map((p) => (p.id === item.id ? item : p)) : [...d.plan, item] };
  });
  return pid;
}

/** Mehrere Einheiten auf einmal anlegen (Woche übernehmen, Vorschläge) */
export function addPlanItems(inputs: PlanInput[]) {
  return commit((d) => {
    const items = inputs.map((i) => buildPlanItem(d, { ...i, id: undefined, done: undefined, entryId: undefined }));
    if (d.plan.length + items.length > MAX_PLAN) throw new SaveError("full");
    return { ...d, plan: [...d.plan, ...items] };
  });
}

export function setPlanDone(pid: string, done: boolean) {
  return commit((d) => ({
    ...d,
    plan: d.plan.map((p) => (p.id === pid ? { ...p, done: done || undefined, doneAt: done ? (p.doneAt ?? nowIso()) : undefined } : p)),
  }));
}

/** Nach dem Eintragen einer Reitstunde: Einheit abhaken und mit dem Eintrag verbinden */
export function linkPlanEntry(pid: string, entryId: string) {
  return commit((d) => ({
    ...d,
    plan: d.plan.map((p) => (p.id === pid ? { ...p, done: true, doneAt: p.doneAt ?? nowIso(), entryId } : p)),
  }));
}

export function deletePlanItem(pid: string) {
  return commit((d) => ({ ...d, plan: d.plan.filter((p) => p.id !== pid) }));
}

/* ---------- Rider Coach (seit 11.11.2026) ---------- */

export type CaseInput = Pick<CoachCase, "problem" | "answers" | "exercises" | "flags"> & { id?: string; saved?: boolean };

/** Analyse speichern (neu oder aktualisiert). Gibt die Fall-ID zurück. */
export async function saveCoachCase(input: CaseInput): Promise<string> {
  const cid = input.id ?? newId();
  await commit((d) => {
    const old = d.coach.find((c) => c.id === cid);
    const c = cleanCoachCase(
      { ...old, ...input, id: cid, status: old?.status ?? "offen", saved: input.saved ?? old?.saved, feedback: old?.feedback ?? [], createdAt: old?.createdAt ?? nowIso(), updatedAt: nowIso() },
      goalIds(d),
    );
    if (!c) throw new SaveError("invalid");
    if (!old && d.coach.length >= 200) throw new SaveError("full");
    return { ...d, coach: old ? d.coach.map((x) => (x.id === cid ? c : x)) : [...d.coach, c] };
  });
  return cid;
}

export function setCaseSaved(cid: string, saved: boolean) {
  return commit((d) => ({ ...d, coach: d.coach.map((c) => (c.id === cid ? { ...c, saved: saved || undefined, updatedAt: nowIso() } : c)) }));
}

export function setCaseStatus(cid: string, status: CaseStatus) {
  return commit((d) => ({ ...d, coach: d.coach.map((c) => (c.id === cid ? { ...c, status, updatedAt: nowIso() } : c)) }));
}

export function deleteCoachCase(cid: string) {
  return commit((d) => ({
    ...d,
    coach: d.coach.filter((c) => c.id !== cid),
    goals: d.goals.map((g) => (g.coachCaseId === cid ? { ...g, coachCaseId: undefined } : g)),
  }));
}

/** Rückmeldung „Hat dir die Übung geholfen?“ (je Einheit/Eintrag wird eine frühere Antwort ersetzt) */
export function addCoachFeedback(cid: string, fb: Omit<CoachFeedback, "id" | "date"> & { date?: string }) {
  return commit((d) => {
    const c = d.coach.find((x) => x.id === cid);
    if (!c) throw new SaveError("invalid");
    const same = (f: CoachFeedback) => f.exercise === fb.exercise && ((fb.planId && f.planId === fb.planId) || (fb.entryId && f.entryId === fb.entryId));
    const next = cleanCoachCase({ ...c, feedback: [...c.feedback.filter((f) => !same(f)), { ...fb, id: newId(), date: fb.date ?? today() }], updatedAt: nowIso() }, goalIds(d));
    if (!next) throw new SaveError("invalid");
    return { ...d, coach: d.coach.map((x) => (x.id === cid ? next : x)) };
  });
}

/**
 * „Daraus einen Trainingsplan machen“: legt ein Ziel mit Wochenprogramm an, plant die
 * Einheiten in den Trainingsplan und verbindet den Coach-Fall. Alles in einem Schritt.
 */
export async function createProgramGoal(input: { title: string; description?: string; horseId?: string; caseId?: string; program: GoalProgram }): Promise<string> {
  const gid = newId();
  await commit((d) => {
    const goal = cleanGoal({ id: gid, title: input.title, description: input.description, horseId: input.horseId, status: "uebe", createdAt: nowIso(), coachCaseId: input.caseId, program: input.program }, horseIds(d));
    if (!goal || !goal.program) throw new SaveError("invalid");
    const withGoal = { ...d, goals: [...d.goals, goal] };
    const items = programItems(goal.program, gid).map((i) => buildPlanItem(withGoal, i));
    if (d.plan.length + items.length > MAX_PLAN) throw new SaveError("full");
    return {
      ...withGoal,
      plan: [...d.plan, ...items],
      coach: d.coach.map((c) => (c.id === input.caseId ? { ...c, goalId: gid, saved: true, updatedAt: nowIso() } : c)),
    };
  });
  return gid;
}

/** Wochenprogramm eines Ziels ändern: offene künftige Coach-Einheiten werden neu geplant, erledigte bleiben. */
export function updateGoalProgram(gid: string, program: GoalProgram, title?: string) {
  const t = today();
  return commit((d) => {
    const old = d.goals.find((g) => g.id === gid);
    if (!old) throw new SaveError("invalid");
    const goal = cleanGoal({ ...old, title: title ?? old.title, program }, horseIds(d));
    if (!goal || !goal.program) throw new SaveError("invalid");
    const withGoal = { ...d, goals: d.goals.map((g) => (g.id === gid ? goal : g)) };
    const keep = d.plan.filter((p) => !(p.goalId === gid && p.kind === "coach" && !p.done && p.date >= t));
    const taken = new Set(keep.filter((p) => p.goalId === gid && p.kind === "coach").map((p) => p.date));
    const items = programItems(goal.program, gid, t)
      .filter((i) => !taken.has(i.date))
      .map((i) => buildPlanItem(withGoal, i));
    if (keep.length + items.length > MAX_PLAN) throw new SaveError("full");
    return { ...withGoal, plan: [...keep, ...items] };
  });
}

/* ---------- Sicherung ---------- */
export function replaceDiary(data: DiaryData) {
  return commit(() => data);
}
