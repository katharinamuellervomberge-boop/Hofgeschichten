"use client";

import { useSyncExternalStore } from "react";
import type { Level } from "@/engine/types";
import { localAdapter } from "./localAdapter";
import { emptyProgress, type Progress, type ProgressAdapter } from "./types";

/**
 * Kleiner, abhängigkeitsfreier Store für den lokalen Fortschritt.
 * Austauschbar über `setProgressAdapter` (z. B. später für Server-Sync).
 */
let adapter: ProgressAdapter = localAdapter;
let state: Progress = emptyProgress;
let loaded = false;
const listeners = new Set<() => void>();
let unsubscribeAdapter: (() => void) | null = null;

function ensureLoaded() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  state = adapter.load() ?? emptyProgress;
  unsubscribeAdapter = adapter.subscribe?.(() => {
    state = adapter.load() ?? emptyProgress;
    emit();
  }) ?? null;
}

function emit() {
  listeners.forEach((l) => l());
}

function update(fn: (p: Progress) => Progress) {
  ensureLoaded();
  const next = fn(state);
  if (next === state) return;
  state = next;
  adapter.save(state);
  emit();
}

export function setProgressAdapter(next: ProgressAdapter) {
  unsubscribeAdapter?.();
  adapter = next;
  loaded = false;
  ensureLoaded();
  emit();
}

function subscribe(listener: () => void) {
  ensureLoaded();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  ensureLoaded();
  return state;
}

function getServerSnapshot() {
  return emptyProgress;
}

export function useProgress(): Progress {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/* ---------- Aktionen ---------- */

export const progressActions = {
  saveEpisodePosition(slug: string, position: number) {
    update((p) => {
      const prev = p.episodes[slug] ?? { position: 0, completed: false };
      if (Math.abs(prev.position - position) < 1) return p;
      return { ...p, episodes: { ...p.episodes, [slug]: { ...prev, position } } };
    });
  },
  completeEpisode(slug: string) {
    update((p) => {
      const prev = p.episodes[slug];
      if (prev?.completed && prev.position === 0) return p;
      return { ...p, episodes: { ...p.episodes, [slug]: { position: 0, completed: true } } };
    });
  },
  visitHorse(slug: string) {
    update((p) =>
      p.horsesVisited.includes(slug) ? p : { ...p, horsesVisited: [...p.horsesVisited, slug] },
    );
  },
  completeGame(id: string) {
    update((p) => {
      const prev = p.games[id]?.completedCount ?? 0;
      return { ...p, games: { ...p.games, [id]: { completedCount: prev + 1 } } };
    });
  },
  completeMission(adventure: string, mission: string, clues: string[]) {
    update((p) => {
      const prev = p.adventures[adventure] ?? { missions: [], clues: [] };
      const missions = prev.missions.includes(mission) ? prev.missions : [...prev.missions, mission];
      const allClues = [...prev.clues, ...clues.filter((c) => !prev.clues.includes(c))];
      return { ...p, adventures: { ...p.adventures, [adventure]: { missions, clues: allClues } } };
    });
  },
  resetAdventure(adventure: string) {
    update((p) => {
      const next = { ...p.adventures };
      delete next[adventure];
      return { ...p, adventures: next };
    });
  },
  setLevel(level: Level) {
    update((p) => (p.settings.level === level ? p : { ...p, settings: { ...p.settings, level } }));
  },
  markStampsSeen(ids: string[]) {
    update((p) => {
      const missing = ids.filter((id) => !p.seenStamps.includes(id));
      return missing.length ? { ...p, seenStamps: [...p.seenStamps, ...missing] } : p;
    });
  },
  setSpeech(on: boolean) {
    update((p) => ({ ...p, settings: { ...p.settings, speech: on } }));
  },
  resetAll() {
    adapter.clear();
    state = emptyProgress;
    emit();
  },
};

/** Für Nicht-React-Code (z. B. Vorlesefunktion) */
export function readProgress(): Progress {
  return getSnapshot();
}
