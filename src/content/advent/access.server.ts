import "server-only";
import { adventskalender } from "@/content/products";
import { adventAccess } from "@/lib/entitlements/server";
import { parseTestDate } from "./schedule";

/**
 * Serverseitige Hilfen für den Adventskalender.
 *
 * Datum: Maßgeblich ist die Serverzeit (Europe/Berlin, siehe schedule.ts) – nie die Uhr des Geräts.
 * Für Tests vor Dezember darf in Vorschau-/Entwicklungsumgebungen ein Datum per
 * `?testdatum=JJJJ-MM-TT` gesetzt werden. In der Produktion (VERCEL_ENV=production)
 * wird der Parameter immer ignoriert.
 */
export function testDatesAllowed(): boolean {
  if (process.env.VERCEL_ENV === "production") return false;
  return process.env.VERCEL_ENV === "preview" || process.env.NODE_ENV === "development" || process.env.ADVENT_TEST_DATES === "1";
}

export function adventNow(testdatum: string | string[] | undefined): { now: Date; query: string } {
  const value = Array.isArray(testdatum) ? testdatum[0] : testdatum;
  const test = testDatesAllowed() ? parseTestDate(value) : null;
  return test ? { now: test, query: `?testdatum=${value}` } : { now: new Date(), query: "" };
}

export async function adventOffer() {
  return { access: await adventAccess() };
}

/** Darf dieses Türchen (nach Datum offen) auf diesem Gerät gespielt werden? */
export async function canPlayDoor(day: number): Promise<boolean> {
  if (adventskalender.freeDoors.includes(day)) return true;
  return (await adventAccess()) !== null;
}

