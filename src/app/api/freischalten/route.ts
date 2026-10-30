import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { membership as plan } from "@/content/membership";
import { codesConfigured, formatCode, membershipCodeForOrder, verifyAnyCode } from "@/lib/entitlements/codes";
import { claimDevice, deviceLimit, releaseDevice } from "@/lib/entitlements/devices";
import { allow } from "@/lib/entitlements/rateLimit";
import { normalizeOrderNumber, shopifyConfigured, verifyShopifyOrder } from "@/lib/entitlements/shopify";
import {
  COOKIE_NAME,
  MAX_AGE_SECONDS,
  createToken,
  entitlementsConfigured,
  newDeviceId,
  readToken,
  type MembershipGrant,
} from "@/lib/entitlements/token";

export const dynamic = "force-dynamic";

type Body = { method: "order"; orderNumber: string; email: string } | { method: "code"; code: string };

const MESSAGES = {
  unavailable: "Die Freischaltung ist gerade nicht erreichbar. Bitte versuchen Sie es später erneut.",
  not_found: "Wir haben keine passende Bestellung gefunden. Bitte prüfen Sie Bestellnummer und E-Mail-Adresse.",
  not_paid: "Diese Bestellung ist noch nicht bezahlt oder wurde storniert.",
  no_product: "In dieser Bestellung ist kein Abenteuer, keine Reitakademie und keine Mitgliedschaft enthalten.",
  bad_code: "Dieser Freischaltcode ist ungültig oder abgelaufen. Bitte prüfen Sie die Schreibweise (HG-XXXX-XXXX-XXXX).",
  device_full: `Dieser Mitgliedscode ist bereits auf einem anderen Gerät aktiv. Für einen Gerätewechsel entfernen Sie die Freischaltung zuerst auf dem alten Gerät (Elternbereich → „Freischaltung von diesem Gerät entfernen“). Ist das alte Gerät nicht mehr verfügbar, schreiben Sie bitte an ${plan.supportEmail} – wir setzen die Gerätebindung zurück.`,
  rate: "Zu viele Versuche. Bitte warten Sie 15 Minuten.",
  bad_request: "Bitte füllen Sie alle Felder aus.",
} as const;

function fail(key: keyof typeof MESSAGES, status = 400) {
  // `reason` erlaubt der englischen Oberfläche eine eigene Meldung
  return NextResponse.json({ ok: false, reason: key, message: MESSAGES[key] }, { status });
}

/** Freischaltung prüfen (nur Server) und signiertes Cookie setzen. */
export async function POST(req: Request) {
  if (!entitlementsConfigured()) return fail("unavailable", 503);

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!allow(ip)) return fail("rate", 429);

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return fail("bad_request");
  }

  let unlocked: string[] = [];
  let grant: MembershipGrant | null = null;
  /** Wird nach Bestellprüfung angezeigt, damit Eltern den Code für den Gerätewechsel notieren können */
  let showCode: string | null = null;

  if (body?.method === "order") {
    const orderNumber = normalizeOrderNumber(String(body.orderNumber ?? ""));
    const email = String(body.email ?? "").trim();
    if (!orderNumber || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) return fail("bad_request");
    if (!shopifyConfigured()) return fail("unavailable", 503);
    const result = await verifyShopifyOrder(orderNumber, email);
    if (!result.ok) return fail(result.reason, result.reason === "unavailable" ? 503 : 400);
    unlocked = result.adventures;
    if (result.membershipOrder) {
      const m = membershipCodeForOrder(result.membershipOrder.id, result.membershipOrder.processedAt);
      if (!m) return fail("unavailable", 503);
      grant = m;
      showCode = formatCode(m.code);
    }
  } else if (body?.method === "code") {
    if (!codesConfigured()) return fail("unavailable", 503);
    const r = verifyAnyCode(String(body.code ?? ""));
    if (!r) return fail("bad_code");
    if (r.kind === "adventure") unlocked = [r.slug];
    else grant = { code: r.code, until: r.until };
  } else {
    return fail("bad_request");
  }

  const jar = await cookies();
  const existing = readToken(jar.get(COOKIE_NAME)?.value);
  const deviceId = existing.deviceId ?? newDeviceId();

  if (grant) {
    // Ein Mitgliedscode gilt grundsätzlich für ein Gerät (serverseitige Gerätebindung)
    const claim = await claimDevice(grant.code, deviceId, deviceLimit(plan.defaultDeviceLimit), grant.until);
    if (claim === "full") return fail("device_full", 409);
    if (claim === "unavailable") return fail("unavailable", 503);
    // Wechsel auf einen anderen Mitgliedscode: altes Gerät dort abmelden
    if (existing.membership && existing.membership.code !== grant.code) await releaseDevice(existing.membership.code, deviceId);
  }

  const token = createToken({
    adventures: [...existing.adventures, ...unlocked],
    deviceId,
    membership: grant ?? existing.membership,
  });
  if (!token) return fail("unavailable", 503);

  const res = NextResponse.json({
    ok: true,
    adventures: unlocked,
    membership: grant ? { until: new Date(grant.until * 1000).toISOString() } : null,
    code: showCode,
  });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: grant ? Math.max(MAX_AGE_SECONDS, grant.until - Math.floor(Date.now() / 1000)) : MAX_AGE_SECONDS,
  });
  return res;
}

/** Freischaltung von diesem Gerät entfernen (Gerätewechsel, geteilte Geräte). Gibt den Geräteplatz frei. */
export async function DELETE() {
  const jar = await cookies();
  const existing = readToken(jar.get(COOKIE_NAME)?.value);
  if (existing.membership && existing.deviceId) await releaseDevice(existing.membership.code, existing.deviceId);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
