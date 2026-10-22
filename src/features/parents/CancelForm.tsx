"use client";

import { useState, type FormEvent } from "react";
import styles from "./ParentsArea.module.css";

type Receipt = { receivedAt: string; lines: string[] };

/**
 * Bestätigungsseite der Kündigungsschaltfläche (§ 312k BGB):
 * Art der Kündigung, Angaben zur Identifizierung, Zeitpunkt, E-Mail für die
 * Bestätigung und die Schaltfläche „jetzt kündigen“. Danach wird die Erklärung
 * mit Datum und Uhrzeit angezeigt und kann gespeichert/gedruckt werden.
 */
export function CancelForm({ online, email: providerEmail }: { online: boolean; email: string }) {
  const [kind, setKind] = useState<"ordentlich" | "ausserordentlich">("ordentlich");
  const [reason, setReason] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reference, setReference] = useState("");
  const [date, setDate] = useState<"naechstmoeglich" | "datum">("naechstmoeglich");
  const [dateValue, setDateValue] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  const mailto = `mailto:${providerEmail}?subject=${encodeURIComponent("Kündigung Hof-Mitgliedschaft")}&body=${encodeURIComponent(
    `Hiermit kündige ich meine Hof-Mitgliedschaft (${kind === "ordentlich" ? "ordentlich" : "außerordentlich"}) ${date === "datum" && dateValue ? `zum ${dateValue}` : "zum nächstmöglichen Zeitpunkt"}.\n\nName: ${name}\nE-Mail: ${email}\nBestellnummer: ${reference}\n${kind === "ausserordentlich" ? `Grund: ${reason}\n` : ""}`,
  )}`;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/kuendigung", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, reason, name, email, reference, date, dateValue }),
      });
      const json = (await res.json()) as { ok: boolean; message?: string; receivedAt?: string; lines?: string[] };
      if (json.ok && json.receivedAt && json.lines) setReceipt({ receivedAt: json.receivedAt, lines: json.lines });
      else setError(json.message ?? "Das hat nicht geklappt.");
    } catch {
      setError(`Keine Verbindung. Bitte kündigen Sie per E-Mail an ${providerEmail}.`);
    } finally {
      setBusy(false);
    }
  };

  if (receipt) {
    return (
      <div className={styles.success} role="status">
        <p>
          <strong>Ihre Kündigung ist am {receipt.receivedAt} bei uns eingegangen.</strong>
        </p>
        <ul>
          {receipt.lines.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
        <p>Eine Bestätigung haben wir an Ihre E-Mail-Adresse geschickt. Sie können diese Seite zusätzlich speichern oder drucken.</p>
        <button type="button" className={styles.secondaryBtn} onClick={() => window.print()}>
          Seite drucken oder als PDF speichern
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <p className={styles.settingHint}>
        Hier kündigen Sie Ihre Hof-Mitgliedschaft. Felder mit * sind Pflichtfelder. Ihre Angaben verwenden wir nur, um die
        Kündigung zuzuordnen und Ihnen den Eingang zu bestätigen.
      </p>

      <fieldset className={styles.field}>
        <legend>Art der Kündigung *</legend>
        <label>
          <input type="radio" name="kind" checked={kind === "ordentlich"} onChange={() => setKind("ordentlich")} /> Ordentliche Kündigung
        </label>
        <label>
          <input type="radio" name="kind" checked={kind === "ausserordentlich"} onChange={() => setKind("ausserordentlich")} /> Außerordentliche
          Kündigung (aus wichtigem Grund)
        </label>
      </fieldset>
      {kind === "ausserordentlich" && (
        <label className={styles.field}>
          <span>Grund der außerordentlichen Kündigung</span>
          <textarea value={reason} onChange={(e) => setReason(e.target.value)} maxLength={1000} rows={3} />
        </label>
      )}

      <label className={styles.field}>
        <span>Vor- und Nachname *</span>
        <input autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} required maxLength={120} />
      </label>
      <label className={styles.field}>
        <span>E-Mail-Adresse (für die Bestätigung) *</span>
        <input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={200} />
      </label>
      <label className={styles.field}>
        <span>Bestellnummer (falls zur Hand)</span>
        <input autoComplete="off" placeholder="z. B. #1042" value={reference} onChange={(e) => setReference(e.target.value)} maxLength={60} />
      </label>

      <fieldset className={styles.field}>
        <legend>Kündigen zum *</legend>
        <label>
          <input type="radio" name="date" checked={date === "naechstmoeglich"} onChange={() => setDate("naechstmoeglich")} /> nächstmöglichen
          Zeitpunkt
        </label>
        <label>
          <input type="radio" name="date" checked={date === "datum"} onChange={() => setDate("datum")} /> Wunschtermin:
        </label>
        {date === "datum" && <input type="date" value={dateValue} onChange={(e) => setDateValue(e.target.value)} required />}
      </fieldset>

      {!online && (
        <p className={styles.notice}>
          Die Online-Kündigung wird gerade eingerichtet. Bitte kündigen Sie per E-Mail – die Schaltfläche unten öffnet eine
          vorbereitete Nachricht an {providerEmail}.
        </p>
      )}
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
      {online ? (
        <button type="submit" className={styles.primaryBtn} disabled={busy}>
          {busy ? "Wird gesendet …" : "Jetzt kündigen"}
        </button>
      ) : (
        <a className={styles.primaryBtn} href={mailto}>
          Kündigung per E-Mail senden
        </a>
      )}
      {online && error && (
        <a className={styles.secondaryBtn} href={mailto}>
          Stattdessen per E-Mail kündigen
        </a>
      )}
    </form>
  );
}
