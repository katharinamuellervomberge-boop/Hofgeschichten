"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Icon } from "@/components/illustrations/Icons";
import { productUrl, publishedAdventures } from "@/content/adventures";
import { site } from "@/content/site";
import styles from "./ParentsArea.module.css";

type Props = {
  owned: string[];
  accessible: string[];
  member: boolean;
  orderUnlockAvailable: boolean;
  codeUnlockAvailable: boolean;
};

/**
 * Kauf freischalten – nur für Erwachsene.
 * Die Prüfung passiert ausschließlich auf dem Server (/api/freischalten).
 * Das Ergebnis ist ein signiertes HttpOnly-Cookie, das der Browser nicht verändern kann.
 */
export function UnlockPanel({ owned, accessible, member, orderUnlockAvailable, codeUnlockAvailable }: Props) {
  const router = useRouter();
  const [mode, setMode] = useState<"order" | "code">(orderUnlockAvailable || !codeUnlockAvailable ? "order" : "code");
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string; code?: string } | null>(null);
  const [confirmRemove, setConfirmRemove] = useState(false);

  /** Nur Codes eingerichtet (einfacher Launch-Weg): keine Reiter, direkt das Code-Feld */
  const codeOnly = codeUnlockAvailable && !orderUnlockAvailable;
  const premium = publishedAdventures.filter((a) => a.access === "premium");
  const available = mode === "order" ? orderUnlockAvailable : codeUnlockAvailable;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch("/api/freischalten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mode === "order" ? { method: "order", orderNumber, email } : { method: "code", code }),
      });
      const json = (await res.json()) as { ok: boolean; message?: string; adventures?: string[]; membership?: { until: string } | null; code?: string | null };
      if (json.ok) {
        const names = premium.filter((a) => json.adventures?.includes(a.slug)).map((a) => a.title);
        if (json.membership) names.unshift("Hof-Mitgliedschaft");
        setMsg({
          ok: true,
          text: `Freigeschaltet: ${names.join(", ")}. Viel Spaß beim Spielen!`,
          code: json.code ?? undefined,
        });
        setOrderNumber("");
        setEmail("");
        setCode("");
        router.refresh();
      } else {
        setMsg({ ok: false, text: json.message ?? "Das hat nicht geklappt." });
      }
    } catch {
      setMsg({ ok: false, text: "Keine Verbindung. Bitte prüfen Sie die Internetverbindung und versuchen Sie es erneut." });
    } finally {
      setBusy(false);
    }
  };

  const removeFromDevice = async () => {
    await fetch("/api/freischalten", { method: "DELETE" }).catch(() => null);
    setConfirmRemove(false);
    setMsg({ ok: true, text: "Die Freischaltung wurde von diesem Gerät entfernt." });
    router.refresh();
  };

  return (
    <section className={`${styles.card} ${styles.premium}`} aria-labelledby="abenteuer" id="abenteuer">
      <h2 id="abenteuer">Premium-Abenteuer &amp; Freischaltung</h2>

      {premium.map((a) => {
        const has = accessible.includes(a.slug);
        return (
          <div key={a.slug} className={styles.product}>
            <div className={styles.productHead}>
              <strong>{a.title}</strong>
              <span className={`${styles.pill} ${has ? styles.pillOk : ""}`}>{has ? (member && !owned.includes(a.slug) ? "In der Mitgliedschaft enthalten" : "Auf diesem Gerät freigeschaltet") : a.priceLabel}</span>
            </div>
            <p className={styles.productInfo}>{a.parentInfo}</p>
            {!has && (
              <a href={productUrl(a, site.shopUrl)} target="_blank" rel="noopener noreferrer" className={styles.shopLink}>
                <span>Im Shop kaufen</span>
                <Icon name="external" />
              </a>
            )}
          </div>
        );
      })}

      <div className={styles.unlock}>
        <h3>Kauf freischalten</h3>
        <p className={styles.settingHint}>
          {codeOnly
            ? "Nach dem Kauf erhalten Sie Ihren Freischaltcode – bei Einzelabenteuern mit dem Download im Shop, bei der Jahresmitgliedschaft per E-Mail. Geben Sie ihn hier ein. Einzelne Abenteuer lassen sich auf weiteren Geräten mit demselben Code freischalten; ein Mitgliedscode gilt für ein Gerät."
            : "Nach dem Kauf geben Sie hier Ihre Bestellnummer und die E-Mail-Adresse der Bestellung ein. Die Daten werden nur zur Prüfung an Shopify gesendet und nicht gespeichert. Die Freischaltung gilt für diesen Browser auf diesem Gerät. Eine Mitgliedschaft gilt für ein Gerät; für einen Gerätewechsel entfernen Sie sie zuerst unten auf dem alten Gerät."}
        </p>

        {!codeOnly && (
        <div className={styles.tabs} role="tablist" aria-label="Art der Freischaltung">
          <button type="button" role="tab" aria-selected={mode === "order"} className={mode === "order" ? styles.tabActive : styles.tab} onClick={() => setMode("order")}>
            Bestellnummer
          </button>
          <button type="button" role="tab" aria-selected={mode === "code"} className={mode === "code" ? styles.tabActive : styles.tab} onClick={() => setMode("code")}>
            Freischaltcode
          </button>
        </div>
        )}

        <form className={styles.form} onSubmit={submit}>
          {mode === "order" ? (
            <>
              <label className={styles.field}>
                <span>Bestellnummer</span>
                <input
                  id="unlock-order"
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder="z. B. #1042"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  required
                  maxLength={21}
                />
              </label>
              <label className={styles.field}>
                <span>E-Mail-Adresse der Bestellung</span>
                <input
                  id="unlock-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  maxLength={200}
                />
              </label>
            </>
          ) : (
            <label className={styles.field}>
              <span>Freischaltcode</span>
              <input
                id="unlock-code"
                autoComplete="off"
                autoCapitalize="characters"
                placeholder="HG-XXXX-XXXX-XXXX"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                maxLength={24}
              />
            </label>
          )}
          {!available && (
            <p className={styles.notice}>
              Diese Art der Freischaltung ist auf diesem Server noch nicht eingerichtet (siehe Anleitung für
              Betreiber).
            </p>
          )}
          <button type="submit" className={styles.primaryBtn} disabled={busy || !available}>
            {busy ? "Wird geprüft …" : "Freischalten"}
          </button>
        </form>

        {msg && (
          <div className={msg.ok ? styles.success : styles.error} role="status">
            <p>{msg.text}</p>
            {msg.code && (
              <p>
                Ihr persönlicher Mitgliedscode: <strong style={{ letterSpacing: "0.06em" }}>{msg.code}</strong>
                <br />
                Bitte notieren Sie ihn – damit schalten Sie nach einem Gerätewechsel erneut frei. Sie können ihn jederzeit mit
                Bestellnummer und E-Mail-Adresse wieder abrufen.
              </p>
            )}
          </div>
        )}

        {(owned.length > 0 || member) && (
          <div className={styles.removeRow}>
            {!confirmRemove ? (
              <button type="button" className={styles.linkBtn} onClick={() => setConfirmRemove(true)}>
                Freischaltung von diesem Gerät entfernen
              </button>
            ) : (
              <>
                <span>Wirklich entfernen? Sie können später erneut freischalten{member ? " – auch auf einem anderen Gerät" : ""}.</span>
                <button type="button" className={styles.dangerBtn} onClick={removeFromDevice}>
                  Entfernen
                </button>
                <button type="button" className={styles.secondaryBtn} onClick={() => setConfirmRemove(false)}>
                  Abbrechen
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
