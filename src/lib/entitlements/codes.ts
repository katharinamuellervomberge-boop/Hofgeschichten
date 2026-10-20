import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { adventures } from "@/content/adventures";

/**
 * Freischaltcodes – Ersatzweg für Geschenke, Support oder falls die
 * Shopify-Anbindung ausfällt. Codes werden mit `npm run codes` erzeugt.
 *
 * Format: HG-XXXX-XXXX-XXXX (Crockford-Base32, ohne verwechselbare Zeichen)
 *   Teil 1–2: Abenteuer-Kürzel + laufende Nummer, Teil 3: Prüfsumme (HMAC)
 * Prüfung nur auf dem Server mit LICENSE_SECRET. Gesperrte Codes: REVOKED_CODES (kommagetrennt).
 */

const ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

export function adventureCodeId(slug: string): string {
  // stabile 2-Zeichen-Kennung je Abenteuer aus dem Slug
  const h = createHmac("sha256", "hg-id").update(slug).digest();
  return ALPHABET[h[0] % 32] + ALPHABET[h[1] % 32];
}

function checksum(body: string, secret: string): string {
  const h = createHmac("sha256", secret).update(body).digest();
  return Array.from({ length: 4 }, (_, i) => ALPHABET[h[i] % 32]).join("");
}

export function normalizeCode(input: string): string {
  const c = input.toUpperCase().replace(/[^0-9A-Z]/g, "");
  const body = c.length === 14 && c.startsWith("HG") ? c.slice(2) : c;
  return body.replace(/O/g, "0").replace(/[IL]/g, "1");
}

/** Gibt den Slug des Abenteuers zurück, wenn der Code gültig ist. */
export function verifyCode(input: string): string | null {
  const secret = process.env.LICENSE_SECRET;
  if (!secret || secret.length < 32) return null;
  const c = normalizeCode(input);
  if (c.length !== 12) return null;
  const body = c.slice(0, 8);
  const sum = c.slice(8);
  const expected = Buffer.from(checksum(body, secret));
  if (!timingSafeEqual(expected, Buffer.from(sum.padEnd(4).slice(0, 4)))) return null;
  const revoked = (process.env.REVOKED_CODES ?? "").split(",").map(normalizeCode).filter(Boolean);
  if (revoked.includes(c)) return null;
  const id = body.slice(0, 2);
  const a = adventures.find((x) => x.published && x.access === "premium" && adventureCodeId(x.slug) === id);
  return a?.slug ?? null;
}

export function codesConfigured(): boolean {
  return Boolean(process.env.LICENSE_SECRET && process.env.LICENSE_SECRET.length >= 32);
}
