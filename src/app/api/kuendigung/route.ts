import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { provider } from "@/content/legal";
import { membership } from "@/content/membership";
import { cancellationConfigured } from "@/lib/cancellation";
import { allow } from "@/lib/entitlements/rateLimit";

export const dynamic = "force-dynamic";

/**
 * Kündigung nach § 312k BGB („Verträge hier kündigen“).
 *
 * Die Bestätigung in Textform geht sofort per E-Mail an die Kundin/den Kunden,
 * eine Kopie an den Anbieter. Versand über Resend (https://resend.com):
 *   RESEND_API_KEY, CANCEL_FROM_EMAIL (verifizierte Absenderadresse),
 *   optional CANCEL_NOTIFY_EMAIL (Standard: Anbieter-E-Mail aus legal.ts)
 * Optional zusätzlich Ablage in Upstash (gleiche Variablen wie die Gerätebindung).
 * Ohne E-Mail-Versand nimmt der Server keine Kündigung entgegen und das Formular
 * verweist auf die Kündigung per E-Mail – nichts wird vorgetäuscht.
 */

type Body = {
  kind: "ordentlich" | "ausserordentlich";
  reason?: string;
  name: string;
  email: string;
  reference?: string;
  date: "naechstmoeglich" | "datum";
  dateValue?: string;
};

const clean = (v: unknown, max: number) => String(v ?? "").replace(/[\u0000-\u001f]/g, " ").trim().slice(0, max);

async function sendMail(to: string, subject: string, text: string): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.CANCEL_FROM_EMAIL;
  if (!key || !from) return false;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], subject, text, reply_to: provider.email }),
    cache: "no-store",
  }).catch(() => null);
  return Boolean(res?.ok);
}

/** Dauerhafte Ablage (Upstash-Liste `hg:kuendigungen`). true = gespeichert. */
async function store(record: object): Promise<boolean> {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return false;
  const res = await fetch(url.replace(/\/$/, ""), {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(["LPUSH", "hg:kuendigungen", JSON.stringify(record)]),
    cache: "no-store",
  }).catch(() => null);
  return Boolean(res?.ok);
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!allow(`k:${ip}`)) return NextResponse.json({ ok: false, message: "Zu viele Versuche. Bitte warten Sie 15 Minuten." }, { status: 429 });

  let b: Body;
  try {
    b = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, message: "Bitte füllen Sie alle Pflichtfelder aus." }, { status: 400 });
  }
  const kind = b.kind === "ausserordentlich" ? "außerordentliche Kündigung" : "ordentliche Kündigung";
  const name = clean(b.name, 120);
  const email = clean(b.email, 200);
  const reference = clean(b.reference, 60);
  const reason = clean(b.reason, 1000);
  const dateValue = clean(b.dateValue, 10);
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, message: "Bitte geben Sie Ihren Namen und eine gültige E-Mail-Adresse an." }, { status: 400 });
  }
  if (b.date === "datum" && !/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
    return NextResponse.json({ ok: false, message: "Bitte wählen Sie ein Datum oder „zum nächstmöglichen Zeitpunkt“." }, { status: 400 });
  }
  if (!cancellationConfigured()) {
    return NextResponse.json({ ok: false, fallback: true, message: `Die Online-Kündigung ist gerade nicht erreichbar. Bitte kündigen Sie per E-Mail an ${provider.email} – Ihre Kündigung ist damit ebenfalls wirksam.` }, { status: 503 });
  }

  const receivedAt = new Date();
  // Eindeutige Eingangsnummer für Kundin/Kunde und Anbieter
  const receiptId = `K-${receivedAt.toISOString().slice(0, 10).replace(/-/g, "")}-${randomBytes(3).toString("hex").toUpperCase()}`;
  const when = receivedAt.toLocaleString("de-DE", { timeZone: "Europe/Berlin", dateStyle: "long", timeStyle: "medium" });
  const effective = b.date === "datum" ? new Date(`${dateValue}T12:00:00Z`).toLocaleDateString("de-DE", { dateStyle: "long" }) : "zum nächstmöglichen Zeitpunkt";
  const lines = [
    `Eingangsnummer: ${receiptId}`,
    `Eingang: ${when} (deutsche Zeit)`,
    `Vertrag: ${membership.name} / Hof Stories – Die Hofgeschichten`,
    `Art: ${kind}${b.kind === "ausserordentlich" && reason ? ` – Grund: ${reason}` : ""}`,
    `Kündigung wirksam: ${effective}`,
    `Name: ${name}`,
    `E-Mail: ${email}`,
    reference ? `Bestellnummer / Kundennummer: ${reference}` : null,
  ].filter(Boolean) as string[];

  const customerText = [
    `Guten Tag ${name},`,
    "",
    "hiermit bestätigen wir den Eingang Ihrer Kündigung:",
    "",
    ...lines,
    "",
    "Sie erhalten von uns zusätzlich eine Mitteilung, zu welchem Datum Ihr Vertrag endet.",
    "",
    `${provider.company}, ${provider.street}, ${provider.city}`,
    provider.email,
  ].join("\n");

  // Dokumentation: Kopie an den Anbieter + (falls eingerichtet) dauerhafte Ablage
  const stored = await store({ receiptId, receivedAt: receivedAt.toISOString(), kind: b.kind, reason, name, email, reference, date: b.date, dateValue });
  const notified = await sendMail(process.env.CANCEL_NOTIFY_EMAIL || provider.email, `Neue Kündigung ${receiptId}: ${name}`, lines.join("\n"));
  const sent = await sendMail(email, `Eingangsbestätigung Ihrer Kündigung ${receiptId} – Hof Stories`, customerText);

  if (!sent || !(stored || notified)) {
    return NextResponse.json({ ok: false, fallback: true, message: `Die Bestätigung konnte nicht versendet werden. Bitte kündigen Sie zusätzlich per E-Mail an ${provider.email}.` }, { status: 502 });
  }
  return NextResponse.json({ ok: true, receivedAt: when, receiptId, lines });
}
