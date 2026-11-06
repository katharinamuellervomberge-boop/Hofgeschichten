"use client";

import { useSyncExternalStore } from "react";
import { loadDiary, requestPersistence, saveDiary } from "./db";
import { cleanEntry, cleanGoal, cleanHorse, cleanProfile, newId } from "./sanitize";
import { emptyDiary, type DiaryData, type DiaryEntry, type Goal, type GoalStatus, type Horse, type RiderProfile } from "./types";

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

/** Pferd löschen. Einträge und Ziele bleiben erhalten, verlieren nur die Zuordnung. */
export function deleteHorse(hid: string) {
  return commit((d) => ({
    ...d,
    horses: d.horses.filter((h) => h.id !== hid),
    entries: d.entries.map((e) => (e.horseId === hid ? { ...e, horseId: undefined } : e)),
    goals: d.goals.map((g) => (g.horseId === hid ? { ...g, horseId: undefined } : g)),
  }));
}

/* ---------- Reitstunden ---------- */
export async function saveEntry(input: Omit<DiaryEntry, "id" | "createdAt" | "updatedAt"> & { id?: string }): Promise<string> {
  const eid = input.id ?? newId();
  await commit((d) => {
    const old = d.entries.find((e) => e.id === eid);
    const entry = cleanEntry({ ...input, id: eid, createdAt: old?.createdAt ?? nowIso(), updatedAt: nowIso() }, horseIds(d));
    if (!entry) throw new SaveError("invalid");
    return { ...d, entries: old ? d.entries.map((e) => (e.id === eid ? entry : e)) : [...d.entries, entry] };
  });
  return eid;
}

export function deleteEntry(eid: string) {
  return commit((d) => ({ ...d, entries: d.entries.filter((e) => e.id !== eid) }));
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
    const goal = cleanGoal({ ...input, id: gid, createdAt: old?.createdAt ?? nowIso(), achievedAt }, horseIds(d));
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

export function deleteGoal(gid: string) {
  return commit((d) => ({ ...d, goals: d.goals.filter((g) => g.id !== gid) }));
}

/* ---------- Sicherung ---------- */
export function replaceDiary(data: DiaryData) {
  return commit(() => data);
}
