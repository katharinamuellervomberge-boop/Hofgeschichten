import type { Level } from "@/engine/types";

export const PROGRESS_VERSION = 1;

export type EpisodeProgress = {
  /** Letzte Wiedergabeposition in Sekunden */
  position: number;
  completed: boolean;
};

export type ActivityProgress = {
  completedCount: number;
};

export type AdventureProgress = {
  /** Abgeschlossene Missionen (IDs) */
  missions: string[];
  /** Gesammelte Hinweise fürs Detektivbuch */
  clues: string[];
};

export type Settings = {
  /** Vorlesestimme des Geräts nutzen */
  speech: boolean;
  /** Schwierigkeitsstufe; null = noch nicht gewählt */
  level: Level | null;
};

/**
 * Lokaler Spielfortschritt. Enthält bewusst KEINE personenbezogenen Daten
 * (kein Name, kein Alter, keine Geräte-ID).
 */
export type Progress = {
  version: typeof PROGRESS_VERSION;
  /** Hörspiele (derzeit ausgeblendet, Daten bleiben erhalten) */
  episodes: Record<string, EpisodeProgress>;
  horsesVisited: string[];
  /** Lernspiele und andere Aktivitäten (ID → Fortschritt) */
  games: Record<string, ActivityProgress>;
  adventures: Record<string, AdventureProgress>;
  /** Stempel, die das Kind im Pass schon gesehen hat (für "Neu!") */
  seenStamps: string[];
  settings: Settings;
};

export const emptyProgress: Progress = {
  version: PROGRESS_VERSION,
  episodes: {},
  horsesVisited: [],
  games: {},
  adventures: {},
  seenStamps: [],
  settings: { speech: true, level: null },
};

/**
 * Speicher-Adapter. V1 nutzt localStorage.
 * Später (Familienmitgliedschaft) kann ein Server-Adapter dieselbe
 * Schnittstelle implementieren.
 */
export interface ProgressAdapter {
  load(): Progress | null;
  save(progress: Progress): void;
  clear(): void;
  /** Optional: Änderungen aus anderen Tabs/Geräten melden */
  subscribe?(onExternalChange: () => void): () => void;
}
