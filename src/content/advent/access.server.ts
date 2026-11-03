import "server-only";
import { adventskalender } from "@/content/products";
import { site } from "@/content/site";
import { adventAccess, hasAcademy } from "@/lib/entitlements/server";
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

/**
 * Kauf-Link zum Akademie-Kundenpreis. Nur für Geräte, auf denen die Reitakademie
 * serverseitig freigeschaltet ist – und nur, wenn der Shopify-Rabattcode
 * `ADVENT_ACADEMY_DISCOUNT_CODE` bei Vercel hinterlegt und der Shop-Link gesetzt ist.
 * Der Rabatt selbst sollte in Shopify zusätzlich auf Akademie-Käufer beschränkt sein
 * (Kundensegment, siehe docs/ADVENTSKALENDER.md).
 */
function academyCheckoutUrl(academyOwner: boolean): string | null {
  const code = process.env.ADVENT_ACADEMY_DISCOUNT_CODE?.trim();
  if (!academyOwner || !code || !adventskalender.checkoutUrl) return null;
  return `${site.shopUrl.replace(/\/$/, "")}/discount/${encodeURIComponent(code)}?redirect=${encodeURIComponent(`/products/${adventskalender.shopifyProductHandle}`)}`;
}

export async function adventOffer() {
  const access = await adventAccess();
  const academyOwner = access ? false : await hasAcademy();
  return { access, academyOwner, academyCheckoutUrl: academyCheckoutUrl(academyOwner) };
}

/** Darf dieses Türchen (nach Datum offen) auf diesem Gerät gespielt werden? */
export async function canPlayDoor(day: number): Promise<boolean> {
  if (adventskalender.freeDoors.includes(day)) return true;
  return (await adventAccess()) !== null;
}

