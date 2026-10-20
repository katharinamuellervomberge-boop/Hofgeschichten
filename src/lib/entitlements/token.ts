import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Signiertes Berechtigungs-Token (HMAC-SHA256), gespeichert als HttpOnly-Cookie.
 * Inhalt: freigeschaltete Abenteuer + Ablaufdatum. Keine personenbezogenen Daten.
 *
 * Format: base64url(JSON) + "." + base64url(HMAC)
 */

export const COOKIE_NAME = "hg_ent";
export const MAX_AGE_SECONDS = 60 * 60 * 24 * 400; // ca. 13 Monate

type Payload = { a: string[]; exp: number; v: 1 };

function secret(): string | null {
  const s = process.env.ENTITLEMENT_SECRET;
  return s && s.length >= 32 ? s : null;
}

const b64 = (b: Buffer) => b.toString("base64url");

function sign(data: string, key: string): string {
  return b64(createHmac("sha256", key).update(data).digest());
}

export function createToken(adventures: string[]): string | null {
  const key = secret();
  if (!key) return null;
  const payload: Payload = { a: [...new Set(adventures)].sort(), exp: Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS, v: 1 };
  const data = b64(Buffer.from(JSON.stringify(payload)));
  return `${data}.${sign(data, key)}`;
}

/** Prüft Signatur und Ablauf. Ungültig → leere Liste (fail closed). */
export function readToken(token: string | undefined): string[] {
  const key = secret();
  if (!key || !token) return [];
  const [data, sig] = token.split(".");
  if (!data || !sig) return [];
  const expected = Buffer.from(sign(data, key));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return [];
  try {
    const p = JSON.parse(Buffer.from(data, "base64url").toString("utf8")) as Payload;
    if (p.v !== 1 || !Array.isArray(p.a) || typeof p.exp !== "number") return [];
    if (p.exp < Date.now() / 1000) return [];
    return p.a.filter((x) => typeof x === "string");
  } catch {
    return [];
  }
}

export function entitlementsConfigured(): boolean {
  return secret() !== null;
}
