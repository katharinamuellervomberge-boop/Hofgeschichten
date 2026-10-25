import "server-only";
import { cookies } from "next/headers";
import { adventures, isVisible } from "@/content/adventures";
import { getRelease, isReleased, type Release } from "@/content/membership";
import { grosseAkademie, productSlugs } from "@/content/products";
import { membershipCodeStillValid } from "./codes";
import { COOKIE_NAME, emptyEntitlement, readToken, type Entitlement } from "./token";

/**
 * Berechtigungen dieses Geräts – ausschließlich auf dem Server ausgewertet.
 * Mitglieder haben Zugriff auf alle Premium-Abenteuer und auf jede
 * Freitagsveröffentlichung ab ihrem Termin.
 */
export async function getEntitlement(): Promise<Entitlement> {
  const jar = await cookies();
  const e = readToken(jar.get(COOKIE_NAME)?.value);
  const valid = new Set([...adventures.map((a) => a.slug), ...productSlugs]);
  const membership = e.membership && membershipCodeStillValid(e.membership.code, e.membership.until) ? e.membership : null;
  return { ...e, adventures: e.adventures.filter((s) => valid.has(s)), membership };
}

export type MembershipStatus = { active: true; until: string } | { active: false };

export async function getMembershipStatus(): Promise<MembershipStatus> {
  const m = (await getEntitlement()).membership;
  return m ? { active: true, until: new Date(m.until * 1000).toISOString() } : { active: false };
}

export async function isMember(): Promise<boolean> {
  return (await getEntitlement()).membership !== null;
}

/** Einzeln gekaufte Abenteuer und Pakete (für die Anzeige im Elternbereich) */
export async function getOwnedAdventures(): Promise<string[]> {
  return (await getEntitlement()).adventures;
}

/**
 * Große Reitakademie: Mitglieder haben sie automatisch, sonst nach Einzelkauf.
 * Wird von jeder Seite der Großen Akademie VOR der Auslieferung der Inhalte geprüft.
 */
export async function hasGrosseAkademie(): Promise<boolean> {
  const e = await getEntitlement();
  return e.membership !== null || e.adventures.includes(grosseAkademie.slug);
}

/** Abenteuer, die auf diesem Gerät spielbar sind (gekauft oder über die Mitgliedschaft) */
export async function getAccessibleAdventures(): Promise<string[]> {
  const e = await getEntitlement();
  if (!e.membership) return e.adventures.filter((s) => !productSlugs.includes(s));
  return adventures.filter((a) => isVisible(a) && a.access === "premium").map((a) => a.slug);
}

export async function canAccessAdventure(slug: string): Promise<boolean> {
  const a = adventures.find((x) => x.slug === slug);
  if (!a || !isVisible(a)) return false;
  if (a.access === "free") return true;
  return (await getAccessibleAdventures()).includes(slug);
}

/**
 * Vorabtest vor dem Termin: RELEASE_PREVIEW=1 NUR in der Vercel-Umgebung
 * „Preview“ setzen, nie in „Production“. Eine Mitgliedschaft braucht es trotzdem.
 */
function previewAll(): boolean {
  return process.env.RELEASE_PREVIEW === "1" && process.env.VERCEL_ENV !== "production";
}

export type ReleaseAccess =
  | { state: "open"; release: Release }
  | { state: "upcoming"; release: Release; member: boolean }
  | { state: "locked"; release: Release };

export async function releaseAccess(slug: string): Promise<ReleaseAccess | null> {
  const release = getRelease(slug);
  if (!release) return null;
  const member = await isMember();
  const released = isReleased(release) || previewAll();
  if (!member) return { state: "locked", release };
  if (!released || !release.ready) return { state: "upcoming", release, member };
  return { state: "open", release };
}

export { emptyEntitlement };
