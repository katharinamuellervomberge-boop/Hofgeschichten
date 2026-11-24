"use client";

import Link from "@/i18n/Link";
import { useEffect, useState } from "react";

type State = "checking" | "done" | "pending" | "error";

/** Schaltet einen Direktkauf über die Kauf-Kennung aus dem Link frei (auch auf einem anderen Gerät). */
export function ClaimUnlock({ claim, en }: { claim: string | null; en: boolean }) {
  const [state, setState] = useState<State>("checking");

  useEffect(() => {
    let alive = true;
    let tries = 0;
    const run = async () => {
      try {
        const res = await fetch("/api/kauf-status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ claim }),
        });
        const json = (await res.json()) as { ok: boolean; reason?: string };
        if (!alive) return;
        if (json.ok) return setState("done");
        // Zahlung kann ein paar Sekunden brauchen: bis zu 1 Minute nachsehen
        if ((json.reason === "pending" || json.reason === "rate") && tries++ < 12) return void setTimeout(run, 5000);
        setState(json.reason === "pending" || json.reason === "none" ? "pending" : "error");
      } catch {
        if (alive) setState("error");
      }
    };
    void run();
    return () => {
      alive = false;
    };
  }, [claim]);

  const T = en
    ? {
        checking: "Checking your purchase …",
        done: "Done! Your purchase is now unlocked on this device.",
        pending: "We couldn't find a paid order for this link (yet). If you've just paid, wait a minute and reload this page – or unlock with your order number and email.",
        error: "The unlock is unavailable right now. Please try again shortly – your purchase is safe.",
        go: "To the Riding Academy",
        manual: "Unlock with order number",
      }
    : {
        checking: "Ihr Kauf wird geprüft …",
        done: "Fertig! Ihr Kauf ist jetzt auf diesem Gerät freigeschaltet.",
        pending: "Zu diesem Link haben wir (noch) keine bezahlte Bestellung gefunden. Wenn Sie gerade bezahlt haben, warten Sie eine Minute und laden Sie die Seite neu – oder schalten Sie mit Bestellnummer und E-Mail frei.",
        error: "Die Freischaltung ist gerade nicht erreichbar. Bitte versuchen Sie es gleich noch einmal – Ihr Kauf ist sicher.",
        go: "Zur Reitakademie",
        manual: "Mit Bestellnummer freischalten",
      };

  return (
    <div role="status" aria-live="polite">
      <p>{T[state]}</p>
      <p>
        {state === "done" ? <Link href="/akademie">{T.go} →</Link> : state !== "checking" && <Link href="/eltern#akademie">{T.manual} →</Link>}
      </p>
    </div>
  );
}
