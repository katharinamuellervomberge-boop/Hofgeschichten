import { NextResponse } from "next/server";
import { adminProducts } from "@/content/admin-products";
import { ADMIN_COOKIE, adminConfigured, checkPassword, createSession, isAdmin } from "@/lib/admin";
import { generateCodes } from "@/lib/entitlements/codes";
import { allow } from "@/lib/entitlements/rateLimit";

export const dynamic = "force-dynamic";

type Body = { action: "login"; password: string } | { action: "logout" } | { action: "codes"; product: string; count: number; month?: string };

const json = (data: object, status = 200) => NextResponse.json(data, { status });

export async function POST(req: Request) {
  if (!adminConfigured()) return json({ ok: false, message: "ADMIN_PASSWORD ist bei Vercel noch nicht eingerichtet." }, 503);
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return json({ ok: false, message: "Ungültige Anfrage." }, 400);
  }

  if (body.action === "login") {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (!allow(`admin:${ip}`)) return json({ ok: false, message: "Zu viele Versuche. Bitte 15 Minuten warten." }, 429);
    if (!checkPassword(String(body.password ?? ""))) return json({ ok: false, message: "Passwort falsch." }, 401);
    const s = createSession();
    if (!s) return json({ ok: false, message: "Anmeldung gerade nicht möglich." }, 503);
    const res = json({ ok: true });
    res.cookies.set(ADMIN_COOKIE, s.value, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: s.maxAge });
    return res;
  }

  if (body.action === "logout") {
    const res = json({ ok: true });
    res.cookies.set(ADMIN_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
    return res;
  }

  if (!(await isAdmin())) return json({ ok: false, message: "Bitte neu anmelden." }, 401);

  if (body.action === "codes") {
    const p = adminProducts.find((x) => x.slug === body.product);
    if (!p) return json({ ok: false, message: "Unbekanntes Produkt." }, 400);
    let start: Date | undefined;
    if (p.membership) {
      const m = /^(\d{4})-(\d{2})$/.exec(body.month ?? "");
      if (!m) return json({ ok: false, message: "Bitte den Startmonat wählen." }, 400);
      start = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, 15));
    }
    const codes = generateCodes(p.slug, Number(body.count) || 1, start);
    if (!codes) return json({ ok: false, message: "LICENSE_SECRET fehlt bei Vercel." }, 503);
    return json({ ok: true, codes });
  }
  return json({ ok: false, message: "Unbekannte Aktion." }, 400);
}
