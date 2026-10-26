import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Admin-Zugang für die Inhaberin (Freischaltcodes erzeugen).
 * Passwort: Umgebungsvariable ADMIN_PASSWORD bei Vercel (mind. 12 Zeichen).
 * Nach dem Anmelden: signiertes HttpOnly-Cookie, 12 Stunden gültig.
 */
export const ADMIN_COOKIE = "hg_admin";
const MAX_AGE = 12 * 60 * 60;

function password(): string | null {
  const p = process.env.ADMIN_PASSWORD;
  return p && p.length >= 12 ? p : null;
}

export function adminConfigured(): boolean {
  return password() !== null;
}

function key(): string | null {
  const p = password();
  return p ? `admin:${p}:${process.env.ENTITLEMENT_SECRET ?? ""}` : null;
}

export function checkPassword(input: string): boolean {
  const p = password();
  if (!p) return false;
  const a = createHmac("sha256", "cmp").update(input).digest();
  const b = createHmac("sha256", "cmp").update(p).digest();
  return timingSafeEqual(a, b);
}

export function createSession(): { value: string; maxAge: number } | null {
  const k = key();
  if (!k) return null;
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE;
  const sig = createHmac("sha256", k).update(String(exp)).digest("base64url");
  return { value: `${exp}.${sig}`, maxAge: MAX_AGE };
}

export async function isAdmin(): Promise<boolean> {
  const k = key();
  if (!k) return false;
  const v = (await cookies()).get(ADMIN_COOKIE)?.value ?? "";
  const [exp, sig] = v.split(".");
  if (!exp || !sig || Number(exp) * 1000 < Date.now()) return false;
  const expected = Buffer.from(createHmac("sha256", k).update(exp).digest("base64url"));
  const given = Buffer.from(sig);
  return expected.length === given.length && timingSafeEqual(expected, given);
}
