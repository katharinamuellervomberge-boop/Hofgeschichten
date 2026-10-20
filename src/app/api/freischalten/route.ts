import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { codesConfigured, verifyCode } from "@/lib/entitlements/codes";
import { allow } from "@/lib/entitlements/rateLimit";
import { normalizeOrderNumber, shopifyConfigured, verifyShopifyOrder } from "@/lib/entitlements/shopify";
import { COOKIE_NAME, MAX_AGE_SECONDS, createToken, entitlementsConfigured, readToken } from "@/lib/entitlements/token";

export const dynamic = "force-dynamic";

type Body = { method: "order"; orderNumber: string; email: string } | { method: "code"; code: string };

const MESSAGES = {
  unavailable: "Die Freischaltung ist gerade nicht erreichbar. Bitte versuchen Sie es später erneut.",
  not_found: "Wir haben keine passende Bestellung gefunden. Bitte prüfen Sie Bestellnummer und E-Mail-Adresse.",
  not_paid: "Diese Bestellung ist noch nicht bezahlt oder wurde storniert.",
  no_product: "In dieser Bestellung ist kein Abenteuer enthalten.",
  bad_code: "Dieser Freischaltcode ist ungültig.",
  rate: "Zu viele Versuche. Bitte warten Sie 15 Minuten.",
  bad_request: "Bitte füllen Sie alle Felder aus.",
} as const;

function fail(key: keyof typeof MESSAGES, status = 400) {
  return NextResponse.json({ ok: false, message: MESSAGES[key] }, { status });
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
  if (body?.method === "order") {
    const orderNumber = normalizeOrderNumber(String(body.orderNumber ?? ""));
    const email = String(body.email ?? "").trim();
    if (!orderNumber || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) return fail("bad_request");
    if (!shopifyConfigured()) return fail("unavailable", 503);
    const result = await verifyShopifyOrder(orderNumber, email);
    if (!result.ok) return fail(result.reason, result.reason === "unavailable" ? 503 : 400);
    unlocked = result.adventures;
  } else if (body?.method === "code") {
    if (!codesConfigured()) return fail("unavailable", 503);
    const slug = verifyCode(String(body.code ?? ""));
    if (!slug) return fail("bad_code");
    unlocked = [slug];
  } else {
    return fail("bad_request");
  }

  const jar = await cookies();
  const existing = readToken(jar.get(COOKIE_NAME)?.value);
  const token = createToken([...existing, ...unlocked]);
  if (!token) return fail("unavailable", 503);

  const res = NextResponse.json({ ok: true, adventures: unlocked });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
  return res;
}

/** Freischaltung von diesem Gerät entfernen (z. B. bei geteilten Geräten). */
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
