import "server-only";
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

/**
 * Signiertes Berechtigungs-Token (HMAC-SHA256), gespeichert als HttpOnly-Cookie.
 * Inhalt: freigeschaltete Einzel-Abenteuer, ggf. Mitgliedschaft (Code + gültig bis)
 * und eine zufällige Geräte-Kennung. Keine personenbezogenen Daten.
 *
 * Format: base64url(JSON) + "." + base64url(HMAC)
 * v1 (alt): { a, exp }            – wird weiterhin gelesen
 * v2:       { a, exp, d, m? }     – d = Geräte-Kennung, m = { c: Code, u: gültig bis (Unix-Sekunden) }
 */

export const COOKIE_NAME = "hg_ent";
export const MAX_AGE_SECONDS = 60 * 60 * 24 * 400; // ca. 13 Monate

export type MembershipGrant = { code: string; until: number };

export type Entitlement = {
  adventures: string[];
  deviceId: string | null;
  membership: MembershipGrant | null;
};

export const emptyEntitlement: Entitlement = { adventures: [], deviceId: null, membership: null };

type PayloadV1 = { v: 1; a: string[]; exp: number };
type PayloadV2 = { v: 2; a: string[]; exp: number; d: string; m?: { c: string; u: number } };

function secret(): string | null {
  const s = process.env.ENTITLEMENT_SECRET;
  return s && s.length >= 32 ? s : null;
}

const b64 = (b: Buffer) => b.toString("base64url");

function sign(data: string, key: string): string {
  return b64(createHmac("sha256", key).update(data).digest());
}

export function newDeviceId(): string {
  return b64(randomBytes(12));
}

export function createToken(e: Entitlement): string | null {
  const key = secret();
  if (!key) return null;
  const nowSec = Math.floor(Date.now() / 1000);
  const payload: PayloadV2 = {
    v: 2,
    a: [...new Set(e.adventures)].sort(),
    exp: Math.max(nowSec + MAX_AGE_SECONDS, e.membership?.until ?? 0),
    d: e.deviceId ?? newDeviceId(),
  };
  if (e.membership) payload.m = { c: e.membership.code, u: e.membership.until };
  const data = b64(Buffer.from(JSON.stringify(payload)));
  return `${data}.${sign(data, key)}`;
}

/** Prüft Signatur und Ablauf. Ungültig → leere Berechtigung (fail closed). */
export function readToken(token: string | undefined): Entitlement {
  const key = secret();
  if (!key || !token) return emptyEntitlement;
  const [data, sig] = token.split(".");
  if (!data || !sig) return emptyEntitlement;
  const expected = Buffer.from(sign(data, key));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return emptyEntitlement;
  try {
    const p = JSON.parse(Buffer.from(data, "base64url").toString("utf8")) as PayloadV1 | PayloadV2;
    if (!Array.isArray(p.a) || typeof p.exp !== "number") return emptyEntitlement;
    const nowSec = Date.now() / 1000;
    if (p.exp < nowSec) return emptyEntitlement;
    const adventures = p.a.filter((x): x is string => typeof x === "string");
    if (p.v === 1) return { adventures, deviceId: null, membership: null };
    if (p.v !== 2 || typeof p.d !== "string") return emptyEntitlement;
    const m = p.m && typeof p.m.c === "string" && typeof p.m.u === "number" ? { code: p.m.c, until: p.m.u } : null;
    return { adventures, deviceId: p.d, membership: m };
  } catch {
    return emptyEntitlement;
  }
}

export function entitlementsConfigured(): boolean {
  return secret() !== null;
}
