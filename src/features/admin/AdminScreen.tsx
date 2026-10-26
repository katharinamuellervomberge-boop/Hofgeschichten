"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import type { AdminProduct } from "@/content/admin-products";
import { membership } from "@/content/membership";
import styles from "./admin.module.css";

const APP = "https://hofgeschichten.vercel.app/eltern";

function mailText(p: AdminProduct, code: string, hofpost: boolean) {
  return [
    "Hallo,",
    "",
    `vielen Dank für Ihre Bestellung! Hier ist Ihr persönlicher Freischaltcode für ${p.mailName}:`,
    "",
    code,
    "",
    `So schalten Sie frei: Öffnen Sie ${APP}, scrollen Sie zu „Kauf freischalten“ und geben Sie den Code ein – fertig.`,
    ...(p.membership ? ["", "Die Mitgliedschaft gilt für ein Gerät. Bewahren Sie den Code gut auf – damit schalten Sie nach einem Gerätewechsel erneut frei."] : []),
    ...(hofpost
      ? ["", "Für die Hofpost: Wie heißt Ihr Kind mit Vornamen? Wir schreiben den Namen auf die Briefe. Antworten Sie einfach auf diese E-Mail. Der erste Brief kommt Anfang Januar 2027."]
      : []),
    "",
    "Viel Freude auf dem Hof!",
    "Ihr Hof-Stories-Team",
    "",
    `Fragen? ${membership.supportEmail}`,
  ].join("\n");
}

export function AdminScreen({ configured, loggedIn, products }: { configured: boolean; loggedIn: boolean; products: AdminProduct[] }) {
  const router = useRouter();
  const now = new Date();
  const [password, setPassword] = useState("");
  const [product, setProduct] = useState(products[0]?.slug ?? "");
  const [month, setMonth] = useState(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`);
  const [count, setCount] = useState(1);
  const [hofpost, setHofpost] = useState(false);
  const [codes, setCodes] = useState<string[]>([]);
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const p = products.find((x) => x.slug === product);

  const call = async (body: object) => {
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch("/api/admin", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      return (await res.json()) as { ok: boolean; message?: string; codes?: string[] };
    } catch {
      return { ok: false, message: "Keine Verbindung." };
    } finally {
      setBusy(false);
    }
  };

  const login = async (e: FormEvent) => {
    e.preventDefault();
    const r = await call({ action: "login", password });
    if (r.ok) {
      setPassword("");
      router.refresh();
    } else setMsg(r.message ?? "Das hat nicht geklappt.");
  };

  const make = async (e: FormEvent) => {
    e.preventDefault();
    const r = await call({ action: "codes", product, count, month });
    if (r.ok && r.codes) setCodes(r.codes);
    else setMsg(r.message ?? "Das hat nicht geklappt.");
  };

  const copy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      setMsg("Kopieren nicht möglich – bitte markieren und kopieren.");
    }
  };

  if (!configured) {
    return (
      <div className="page">
        <PageHeader title="Verwaltung" />
        <p className={styles.card}>
          Die Verwaltung ist noch nicht eingerichtet: Bei Vercel fehlt die Umgebungsvariable <strong>ADMIN_PASSWORD</strong> (mindestens 12
          Zeichen). Nach dem Anlegen einmal neu veröffentlichen (Redeploy).
        </p>
      </div>
    );
  }

  if (!loggedIn) {
    return (
      <div className="page">
        <PageHeader title="Verwaltung" />
        <form className={styles.card} onSubmit={login}>
          <label className={styles.field}>
            <span>Admin-Passwort</span>
            <input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <button type="submit" className={styles.btn} disabled={busy}>
            {busy ? "Prüfe …" : "Anmelden"}
          </button>
          {msg && <p className={styles.error}>{msg}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="page">
      <PageHeader title="Freischaltcodes" />
      <form className={styles.card} onSubmit={make}>
        <label className={styles.field}>
          <span>Was wurde gekauft?</span>
          <select value={product} onChange={(e) => { setProduct(e.target.value); setCodes([]); }}>
            {products.map((x) => (
              <option key={x.slug} value={x.slug}>
                {x.label}
              </option>
            ))}
          </select>
        </label>
        {p?.membership && (
          <>
            <label className={styles.field}>
              <span>Monat der Zahlung (Start der 12 Monate)</span>
              <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} required />
            </label>
            <label className={styles.check}>
              <input type="checkbox" checked={hofpost} onChange={(e) => setHofpost(e.target.checked)} />
              <span>Bestellung mit Hofpost (Mail fragt nach dem Vornamen des Kindes)</span>
            </label>
          </>
        )}
        <label className={styles.field}>
          <span>Wie viele Codes?</span>
          <input type="number" min={1} max={50} value={count} onChange={(e) => setCount(Number(e.target.value))} />
        </label>
        <button type="submit" className={styles.btn} disabled={busy}>
          {busy ? "Erzeuge …" : "Codes erzeugen"}
        </button>
        {msg && <p className={styles.error}>{msg}</p>}
      </form>

      {codes.length > 0 && p && (
        <section className={styles.card}>
          <h2 className={styles.h2}>{codes.length === 1 ? "Dein Code" : `${codes.length} Codes`}</h2>
          <ul className={styles.codes}>
            {codes.map((c) => (
              <li key={c}>
                <code>{c}</code>
                <button type="button" onClick={() => copy(c, c)} className={styles.small}>
                  {copied === c ? "Kopiert ✓" : "Kopieren"}
                </button>
              </li>
            ))}
          </ul>
          {codes.length > 1 && (
            <button type="button" onClick={() => copy(codes.join("\n"), "all")} className={styles.small}>
              {copied === "all" ? "Alle kopiert ✓" : "Alle kopieren"}
            </button>
          )}
          {codes.length === 1 && (
            <>
              <h3 className={styles.h3}>E-Mail an die Familie</h3>
              <textarea readOnly className={styles.mail} value={mailText(p, codes[0], hofpost)} rows={14} />
              <button type="button" onClick={() => copy(mailText(p, codes[0], hofpost), "mail")} className={styles.btn}>
                {copied === "mail" ? "E-Mail kopiert ✓" : "E-Mail-Text kopieren"}
              </button>
            </>
          )}
          <p className={styles.hint}>Codes werden nicht gespeichert. Bitte direkt verschicken oder notieren.</p>
        </section>
      )}

      <button type="button" className={styles.link} onClick={async () => { await call({ action: "logout" }); router.refresh(); }}>
        Abmelden
      </button>
    </div>
  );
}
