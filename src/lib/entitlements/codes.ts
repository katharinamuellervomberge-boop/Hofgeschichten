import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { adventures, isVisible } from "@/content/adventures";
import { membership } from "@/content/membership";
import { productSlugs } from "@/content/products";

/**
 * Freischaltcodes. Werden mit `npm run codes` erzeugt (Einzelfälle, Geschenke,
 * Support) oder – bei der Mitgliedschaft – nach serverseitig bestätigter
 * Zahlung direkt aus der Shopify-Bestellung abgeleitet.
 *
 * Format: HG-XXXX-XXXX-XXXX (Crockford-Base32, ohne verwechselbare Zeichen)
 *   Einzelfall:      Kennung (2) + Seriennummer (6)              + Prüfsumme (4)
 *   Mitgliedschaft:  Kennung „17“ (2) + Startmonat (2) + Serie (4) + Prüfsumme (4)
 *     Startmonat = Monate seit Januar 2026 (0 = Jan 2026). Gültig bis Ende des
 *     Monats, der 12 Monate nach dem Startmonat liegt (eher großzügig zugunsten der Familie).
 * Prüfung nur auf dem Server mit LICENSE_SECRET. Gesperrte Codes: REVOKED_CODES (kommagetrennt).
 */

const ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
const EPOCH_YEAR = 2026;

export function adventureCodeId(slug: string): string {
  // stabile 2-Zeichen-Kennung je Abenteuer aus dem Slug
  const h = createHmac("sha256", "hg-id").update(slug).digest();
  return ALPHABET[h[0] % 32] + ALPHABET[h[1] % 32];
}

const MEMBERSHIP_ID = adventureCodeId(membership.slug);

function checksum(body: string, secret: string): string {
  const h = createHmac("sha256", secret).update(body).digest();
  return Array.from({ length: 4 }, (_, i) => ALPHABET[h[i] % 32]).join("");
}

function getSecret(): string | null {
  const s = process.env.LICENSE_SECRET;
  return s && s.length >= 32 ? s : null;
}

export function normalizeCode(input: string): string {
  const c = input.toUpperCase().replace(/[^0-9A-Z]/g, "");
  const body = c.length === 14 && c.startsWith("HG") ? c.slice(2) : c;
  return body.replace(/O/g, "0").replace(/[IL]/g, "1");
}

export function formatCode(normalized: string): string {
  return `HG-${normalized.slice(0, 4)}-${normalized.slice(4, 8)}-${normalized.slice(8, 12)}`;
}

function isRevoked(c: string): boolean {
  const revoked = (process.env.REVOKED_CODES ?? "").split(",").map(normalizeCode).filter(Boolean);
  return revoked.includes(c);
}

/** Monatsindex (seit Jan 2026) → Ablauf in Unix-Sekunden */
export function membershipUntil(monthIndex: number): number {
  return Math.floor(Date.UTC(EPOCH_YEAR, monthIndex + membership.termMonths + 1, 1) / 1000);
}

export function monthIndexOf(date: Date): number {
  return (date.getUTCFullYear() - EPOCH_YEAR) * 12 + date.getUTCMonth();
}

function encodeMonth(i: number): string {
  return ALPHABET[Math.floor(i / 32) % 32] + ALPHABET[i % 32];
}

function decodeMonth(s: string): number {
  return ALPHABET.indexOf(s[0]) * 32 + ALPHABET.indexOf(s[1]);
}

export type CodeResult =
  | { kind: "adventure"; slug: string }
  | { kind: "membership"; code: string; until: number };

/** Prüft einen Code (nur Server). null = ungültig, gesperrt oder abgelaufen. */
export function verifyAnyCode(input: string): CodeResult | null {
  const secret = getSecret();
  if (!secret) return null;
  const c = normalizeCode(input);
  if (c.length !== 12) return null;
  const body = c.slice(0, 8);
  const expected = Buffer.from(checksum(body, secret));
  if (!timingSafeEqual(expected, Buffer.from(c.slice(8).padEnd(4).slice(0, 4)))) return null;
  if (isRevoked(c)) return null;
  const id = body.slice(0, 2);

  if (id === MEMBERSHIP_ID) {
    const until = membershipUntil(decodeMonth(body.slice(2, 4)));
    if (until * 1000 < Date.now()) return null;
    return { kind: "membership", code: c, until };
  }
  const a = adventures.find((x) => isVisible(x) && x.access === "premium" && adventureCodeId(x.slug) === id);
  if (a) return { kind: "adventure", slug: a.slug };
  // Pakete wie die Große Reitakademie: gleiches Codeformat wie Einzelabenteuer
  const p = productSlugs.find((slug) => adventureCodeId(slug) === id);
  return p ? { kind: "adventure", slug: p } : null;
}

/** Kompatibel zur bisherigen Schnittstelle: nur Einzel-Abenteuer */
export function verifyCode(input: string): string | null {
  const r = verifyAnyCode(input);
  return r?.kind === "adventure" ? r.slug : null;
}

/** Ist der Mitgliedscode (normalisiert) noch gültig und nicht gesperrt? */
export function membershipCodeStillValid(c: string, until: number): boolean {
  return until * 1000 > Date.now() && !isRevoked(c);
}

/**
 * Mitgliedscode zu einer bezahlten Shopify-Bestellung – deterministisch,
 * damit Eltern ihn jederzeit erneut abrufen können (Bestellnummer + E-Mail).
 */
export function membershipCodeForOrder(orderId: string, orderDate: Date): { code: string; until: number } | null {
  const secret = getSecret();
  if (!secret) return null;
  const month = monthIndexOf(orderDate);
  const h = createHmac("sha256", secret).update(`order:${orderId}`).digest();
  const serial = Array.from({ length: 4 }, (_, i) => ALPHABET[h[i] % 32]).join("");
  const body = MEMBERSHIP_ID + encodeMonth(month) + serial;
  const code = body + checksum(body, secret);
  return { code, until: membershipUntil(month) };
}

export function codesConfigured(): boolean {
  return getSecret() !== null;
}
