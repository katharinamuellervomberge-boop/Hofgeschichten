import "server-only";

/**
 * Gerätebindung für Mitgliedscodes (Upstash Redis über die REST-Schnittstelle,
 * ohne zusätzliche Abhängigkeit).
 *
 * Gespeichert wird je Code nur eine Menge zufälliger Geräte-Kennungen:
 *   hg:dev:<code>  →  { "<geraet-a>", … }
 * Keine Namen, keine E-Mail-Adressen, keine Kinderdaten.
 *
 * Umgebungsvariablen (Vercel-Marketplace „Upstash for Redis“ setzt eine der beiden Varianten):
 *   UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN   oder   KV_REST_API_URL + KV_REST_API_TOKEN
 * MEMBERSHIP_DEVICE_LIMIT (Standard 1).
 *
 * Ohne Upstash: keine Gerätebindung (der Code bleibt mehrfach nutzbar) – im
 * Abnahmebericht als offener Punkt geführt.
 */

function conf(): { url: string; token: string } | null {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}

export function deviceStoreConfigured(): boolean {
  return conf() !== null;
}

export function deviceLimit(fallback: number): number {
  const n = Number(process.env.MEMBERSHIP_DEVICE_LIMIT);
  return Number.isInteger(n) && n > 0 && n < 20 ? n : fallback;
}

async function command(args: (string | number)[]): Promise<unknown> {
  const c = conf();
  if (!c) throw new Error("device store not configured");
  const res = await fetch(c.url, {
    method: "POST",
    headers: { Authorization: `Bearer ${c.token}`, "Content-Type": "application/json" },
    body: JSON.stringify(args),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`device store ${res.status}`);
  const json = (await res.json()) as { result?: unknown; error?: string };
  if (json.error) throw new Error(json.error);
  return json.result;
}

const key = (code: string) => `hg:dev:${code}`;

/* Atomar: Gerät schon bekannt → ok; sonst nur hinzufügen, wenn noch Platz ist. */
const CLAIM = `
if redis.call('SISMEMBER', KEYS[1], ARGV[1]) == 1 then return 1 end
if redis.call('SCARD', KEYS[1]) < tonumber(ARGV[2]) then
  redis.call('SADD', KEYS[1], ARGV[1])
  redis.call('EXPIREAT', KEYS[1], tonumber(ARGV[3]))
  return 1
end
return 0`;

export type ClaimResult = "ok" | "full" | "unavailable" | "unconfigured";

/** Gerät für einen Code anmelden. */
export async function claimDevice(code: string, deviceId: string, limit: number, until: number): Promise<ClaimResult> {
  if (!conf()) return "unconfigured";
  try {
    const r = await command(["EVAL", CLAIM, 1, key(code), deviceId, limit, until + 60 * 60 * 24 * 60]);
    return Number(r) === 1 ? "ok" : "full";
  } catch {
    return "unavailable";
  }
}

/** Gerät abmelden (z. B. „von diesem Gerät entfernen“ vor einem Gerätewechsel). */
export async function releaseDevice(code: string, deviceId: string): Promise<void> {
  if (!conf()) return;
  try {
    await command(["SREM", key(code), deviceId]);
  } catch {
    /* Abmelden ist best effort; der Support kann jederzeit zurücksetzen */
  }
}
