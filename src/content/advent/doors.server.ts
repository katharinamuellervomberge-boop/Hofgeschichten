import "server-only";
import { doors1 } from "./doors-1.server";
import { doors2 } from "./doors-2.server";
import type { AdventDoor, DoorSummary } from "./types";

/**
 * Alle 24 Türchen von „Das Geheimnis des Winterhofs“ – zentrale Datenstruktur.
 * Premium-Inhalt: nur auf dem Server laden und nur für Türchen ausliefern,
 * die nach Datum offen sind und für die eine Berechtigung besteht.
 */
export const ADVENT_DOORS: AdventDoor[] = [...doors1, ...doors2];

export function getDoor(day: number): AdventDoor | undefined {
  return ADVENT_DOORS.find((d) => d.day === day);
}

/** Kurzinfos für die Kalenderübersicht – nur für Türchen bis `upTo` (nach Datum offen) */
export function doorSummaries(upTo: number): DoorSummary[] {
  return ADVENT_DOORS.filter((d) => d.day <= upTo).map((d) => ({ day: d.day, title: d.title, game: d.game, found: d.reward.found }));
}
