import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { CLAIM_ATTRIBUTE, CLAIM_COOKIE, CLAIM_FLAG_COOKIE, isClaim } from "@/lib/entitlements/directCheckout";
import { allow } from "@/lib/entitlements/rateLimit";
import { shopifyConfigured, verifyShopifyClaim } from "@/lib/entitlements/shopify";
import { COOKIE_NAME, MAX_AGE_SECONDS, createToken, entitlementsConfigured, newDeviceId, readToken } from "@/lib/entitlements/token";

export const dynamic = "force-dynamic";

/**
 * Direktkauf abschließen: Ist die Bestellung mit dieser Kauf-Kennung bezahlt?
 * Kennung kommt aus dem Cookie (gleiches Gerät) oder aus dem Link in der Bestellbestätigung.
 * POST /api/kauf-status   { claim?: string }
 *
 * Antworten: { ok: true, adventures } · { ok: false, reason: "pending" | "none" | ... }
 * Mitgliedschaften werden hier bewusst NICHT freigeschaltet (Gerätebindung) – dafür bleibt der Elternbereich.
 */
export async function POST(req: Request) {
  if (!entitlementsConfigured() || !shopifyConfigured()) return NextResponse.json({ ok: false, reason: "unavailable" }, { status: 503 });

  // Abfrage alle paar Sekunden während der Kasse: großzügiger als /api/freischalten
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!allow(`kauf:${ip}`, 200, 15 * 60 * 1000)) return NextResponse.json({ ok: false, reason: "rate" }, { status: 429 });

  let bodyClaim: unknown = null;
  try {
    bodyClaim = ((await req.json()) as { claim?: unknown })?.claim ?? null;
  } catch {
    bodyClaim = null;
  }
  const jar = await cookies();
  const cookieClaim = jar.get(CLAIM_COOKIE)?.value;
  const claim = isClaim(bodyClaim) ? bodyClaim : isClaim(cookieClaim) ? cookieClaim : null;
  if (!claim) return NextResponse.json({ ok: false, reason: "none" });

  const result = await verifyShopifyClaim(claim, CLAIM_ATTRIBUTE);
  if (!result.ok) {
    const status = result.reason === "unavailable" ? 503 : 200;
    return NextResponse.json({ ok: false, reason: result.reason }, { status });
  }

  const existing = readToken(jar.get(COOKIE_NAME)?.value);
  const nowSec = Math.floor(Date.now() / 1000);
  const ridingSpaceUntil = result.ridingSpaceUntil && result.ridingSpaceUntil > nowSec ? result.ridingSpaceUntil : null;
  const token = createToken({
    adventures: [...existing.adventures, ...result.adventures],
    deviceId: existing.deviceId ?? newDeviceId(),
    membership: existing.membership,
    ridingSpaceUntil: Math.max(existing.ridingSpaceUntil ?? 0, ridingSpaceUntil ?? 0) || null,
    legacyDiary: existing.legacyDiary || result.academyLegacy,
  });
  if (!token) return NextResponse.json({ ok: false, reason: "unavailable" }, { status: 503 });

  const res = NextResponse.json({ ok: true, adventures: result.adventures });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: Math.max(MAX_AGE_SECONDS, (ridingSpaceUntil ?? 0) - nowSec),
  });
  // Kauf erledigt: Kennung entfernen, damit der nächste Kauf eine neue bekommt
  res.cookies.set(CLAIM_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  res.cookies.set(CLAIM_FLAG_COOKIE, "", { path: "/", maxAge: 0 });
  res.headers.set("Cache-Control", "no-store");
  return res;
}
