import "server-only";
import { cookies } from "next/headers";
import { adventures, isVisible } from "@/content/adventures";
import { getRelease, isReleased, type Release } from "@/content/membership";
import { adventskalender, grosseAkademie, meinTagAmHof, productSlugs } from "@/content/products";
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
 * Reitakademie freigeschaltet? (Kauf „Reitakademie“, Kennung `grosse-akademie`.)
 * Mitglieder nur, solange `grosseAkademie.includedInMembership` true ist.
 * Wird vor der Auslieferung jeder kostenpflichtigen Lektion geprüft.
 */
export async function hasGrosseAkademie(): Promise<boolean> {
  const e = await getEntitlement();
  return e.adventures.includes(grosseAkademie.slug) || (grosseAkademie.includedInMembership && e.membership !== null);
}

/** Neuer Name, gleiche Prüfung */
export const hasAcademy = hasGrosseAkademie;

export type RidingSpaceStatus =
  | { active: true; via: "kauf"; until: string }
  | { active: true; via: "bestand" | "mitglied" }
  | { active: false; expired?: string };

/**
 * Riding Space (Reitertagebuch, Trainingsplaner, Rider Coach) – seit 14.11.2026 eigenes Produkt.
 * Frei bei: gültigem Riding-Space-Kauf (12 Monate), Bestandsschutz (Reitakademie vor der Trennung
 * gekauft) oder aktiver Hof-Mitgliedschaft.
 */
export async function ridingSpaceStatus(): Promise<RidingSpaceStatus> {
  const e = await getEntitlement();
  if (e.ridingSpaceUntil) return { active: true, via: "kauf", until: new Date(e.ridingSpaceUntil * 1000).toISOString() };
  if (e.legacyDiary) return { active: true, via: "bestand" };
  if (e.membership) return { active: true, via: "mitglied" };
  if (e.ridingSpaceExpired) return { active: false, expired: new Date(e.ridingSpaceExpired * 1000).toISOString() };
  return { active: false };
}

export async function hasRidingSpace(): Promise<boolean> {
  return (await ridingSpaceStatus()).active;
}

/**
 * Adventskalender „Das Geheimnis des Winterhofs“: Zugriff auf diesem Gerät?
 *  "owned"  = gekauft (Einzelprodukt oder Paket, per Bestellnummer oder Code)
 *  "member" = über eine gültige Hof-Mitgliedschaft enthalten
 *  null     = kein Zugriff (nur die freien Türchen)
 * Wird vor der Auslieferung jedes kostenpflichtigen Türchens auf dem Server geprüft.
 */
export async function adventAccess(): Promise<"owned" | "member" | null> {
  const e = await getEntitlement();
  if (e.adventures.includes(adventskalender.slug)) return "owned";
  if (adventskalender.includedInMembership && e.membership !== null) return "member";
  return null;
}

/**
 * „Mein Tag am Hof“: Zugriff auf diesem Gerät?
 *  "owned"  = einzeln gekauft (Bestellnummer oder Code)
 *  "member" = über eine gültige Hof-Mitgliedschaft enthalten
 *  null     = nur der Kennenlern-Tag
 */
export async function hoftagAccess(): Promise<"owned" | "member" | null> {
  const e = await getEntitlement();
  if (e.adventures.includes(meinTagAmHof.slug)) return "owned";
  if (meinTagAmHof.includedInMembership && e.membership !== null) return "member";
  return null;
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
