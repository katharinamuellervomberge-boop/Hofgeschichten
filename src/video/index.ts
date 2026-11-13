import { bahnfiguren, richtigerFuss } from "./arena";
import { galopp, schritt, trab } from "./gaits";
import type { VideoDef } from "./kit";
import { leichttraben } from "./leichttraben";
import { ausbauVideos } from "./ausbau-videos";

import measured from "./durations.json";

/**
 * Gemessene Längen der Sprecheraufnahmen je Video und Satz (von scripts/video/voice.mjs
 * eingetragen). Fehlt ein Wert, wird die Länge aus dem Text geschätzt.
 */
const durations = measured as Record<string, Record<string, number>>;

/** Alle Lernvideos der Großen Reitakademie (Reihenfolge = Reihenfolge der Lektionen) */
export const videos: VideoDef[] = [schritt, trab, leichttraben, richtigerFuss, galopp, bahnfiguren, ...ausbauVideos].map((v) => ({
  ...v,
  durations: { ...v.durations, ...durations[v.slug] },
}));
