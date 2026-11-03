/**
 * Adventskalender „Das Geheimnis des Winterhofs“ – Kalenderlogik.
 *
 * Reine Funktionen ohne Browser- oder Serverbezug, damit sie im Server
 * (Zugriffsprüfung) und in Tests (scripts/check-advent.ts) gleich arbeiten.
 * Maßgeblich ist immer das Datum in Deutschland (Europe/Berlin).
 *
 * - Türchen n öffnet am n. Dezember 2026 um 00:00 Uhr deutscher Zeit.
 * - Verpasste Türchen bleiben offen, zukünftige gesperrt.
 * - Nach dem 24. Dezember bleiben alle Türchen offen – mindestens bis
 *   31. Januar 2027 (`ADVENT.openAtLeastUntil`); danach ebenfalls weiter
 *   (Archiv), solange die Berechtigung besteht.
 */

export const ADVENT = {
  year: 2026,
  doors: 24,
  /** Spätestes Datum, bis zu dem alles sicher erreichbar bleibt (Zusage im Verkauf) */
  openAtLeastUntil: "2027-01-31",
} as const;

export type BerlinDate = { y: number; m: number; d: number };

const FMT = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Berlin",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** Kalenderdatum in Deutschland für einen Zeitpunkt */
export function berlinDate(now: Date): BerlinDate {
  const parts = Object.fromEntries(FMT.formatToParts(now).map((p) => [p.type, p.value]));
  return { y: Number(parts.year), m: Number(parts.month), d: Number(parts.day) };
}

/** Tage seit 1.1.1970 für ein Kalenderdatum (ohne Zeitzonen-Effekte) */
function dayNumber(b: BerlinDate): number {
  return Math.floor(Date.UTC(b.y, b.m - 1, b.d) / 86_400_000);
}

const START = dayNumber({ y: ADVENT.year, m: 12, d: 1 });

export type AdventPhase = "before" | "running" | "after";

export type AdventState = {
  phase: AdventPhase;
  /** Wie viele Türchen nach Datum offen sind (0–24) */
  unlocked: number;
  /** Türchen des heutigen Tages (1–24), sonst null */
  today: number | null;
  /** Ganze Tage bis zum 1. Dezember (nur vor dem Start, sonst 0) */
  daysUntilStart: number;
  /** Heutiges Datum in Deutschland, z. B. "2026-12-06" */
  isoDate: string;
};

export function adventState(now: Date): AdventState {
  const b = berlinDate(now);
  const diff = dayNumber(b) - START; // 0 = 1. Dezember
  const isoDate = `${b.y}-${String(b.m).padStart(2, "0")}-${String(b.d).padStart(2, "0")}`;
  if (diff < 0) return { phase: "before", unlocked: 0, today: null, daysUntilStart: -diff, isoDate };
  if (diff < ADVENT.doors) return { phase: "running", unlocked: diff + 1, today: diff + 1, daysUntilStart: 0, isoDate };
  return { phase: "after", unlocked: ADVENT.doors, today: null, daysUntilStart: 0, isoDate };
}

export function isDoorOpenByDate(door: number, now: Date): boolean {
  return Number.isInteger(door) && door >= 1 && door <= ADVENT.doors && door <= adventState(now).unlocked;
}

/** "1." … "24." Dezember */
export function doorDateLabel(door: number): string {
  return `${door}. Dezember`;
}

/** Zeitpunkt (UTC), an dem der 1. Dezember in Deutschland beginnt (für den Countdown) */
export const ADVENT_START_UTC = "2026-11-30T23:00:00Z";

/** Prüft einen Test-Datumswert "JJJJ-MM-TT" und gibt die Mittagszeit dieses Tages in Deutschland zurück */
export function parseTestDate(value: string | null | undefined): Date | null {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const d = new Date(`${value}T11:00:00Z`);
  return Number.isNaN(d.getTime()) ? null : d;
}
