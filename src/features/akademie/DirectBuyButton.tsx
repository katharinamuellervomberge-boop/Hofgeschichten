"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/illustrations/Icons";
import styles from "./academy.module.css";

type Phase = "idle" | "waiting" | "done" | "slow" | "error";

const POLL_MS = 5000;
/** So lange wird nach dem Klick automatisch nachgesehen (Kasse + Zahlung) */
const MAX_WAIT_MS = 20 * 60 * 1000;
/** Rückkehr auf die Seite mit offenem Kauf: kürzer nachsehen */
const RETURN_WAIT_MS = 2 * 60 * 1000;

const hasPendingFlag = () => typeof document !== "undefined" && /(?:^|;\s*)hg_claim_pending=1/.test(document.cookie);

/**
 * Direktkauf: öffnet die Shopify-Kasse in einem neuen Tab (/api/kaufen) und schaltet
 * diese Seite automatisch frei, sobald die Bestellung bezahlt ist (/api/kauf-status).
 */
export function DirectBuyButton({ product, label, en }: { product: "akademie"; label: string; en: boolean }) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const deadline = useRef(0);

  const T = en
    ? {
        waiting: "Checkout is open in a new tab. As soon as your payment is through, the academy unlocks right here – automatically.",
        done: "Thank you! The Riding Academy is now unlocked on this device.",
        slow: "We haven't received a payment yet. Already paid? Check again – or use the link in your order confirmation email.",
        error: "The unlock check is unavailable right now. Your purchase is safe – please try again in a moment.",
        check: "Check again",
      }
    : {
        waiting: "Die Kasse ist in einem neuen Tab geöffnet. Sobald die Zahlung durch ist, wird die Akademie hier automatisch freigeschaltet.",
        done: "Danke! Die Reitakademie ist jetzt auf diesem Gerät freigeschaltet.",
        slow: "Noch keine Zahlung eingegangen. Schon bezahlt? Erneut prüfen – oder den Link in der Bestellbestätigung nutzen.",
        error: "Die Freischaltung ist gerade nicht erreichbar. Ihr Kauf ist sicher – bitte gleich noch einmal versuchen.",
        check: "Erneut prüfen",
      };

  const stop = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };

  const check = useCallback(async () => {
    stop();
    try {
      const res = await fetch("/api/kauf-status", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
      const json = (await res.json()) as { ok: boolean; reason?: string };
      if (json.ok) {
        setPhase("done");
        router.refresh();
        return;
      }
      // "none": Kauf-Tab hat die Kennung evtl. noch nicht gesetzt → wie "pending" weiter warten
      if (!["pending", "rate", "none"].includes(json.reason ?? "")) return setPhase("error");
    } catch {
      return setPhase("error");
    }
    if (Date.now() < deadline.current) timer.current = setTimeout(check, POLL_MS);
    else setPhase("slow");
  }, [router]);

  const startWaiting = (ms: number, now = false) => {
    deadline.current = Date.now() + ms;
    setPhase("waiting");
    stop();
    if (now) void check();
    else timer.current = setTimeout(check, POLL_MS);
  };

  // Rückkehr auf die Seite mit einem offenen Kauf: einmal nachsehen, dann kurz weiter warten
  useEffect(() => {
    if (!hasPendingFlag()) return;
    deadline.current = Date.now() + RETURN_WAIT_MS;
    setPhase("waiting");
    void check();
    return stop;
  }, [check]);

  // Zurück in den Tab gewechselt: sofort nachsehen statt auf den nächsten Takt zu warten
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible" && timer.current) void check();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [check]);

  if (phase === "done") {
    return (
      <p className={styles.buyPrice} role="status">
        <Icon name="check" /> {T.done}
      </p>
    );
  }

  return (
    <>
      <a
        href={`/api/kaufen?produkt=${product}&lang=${en ? "en" : "de"}`}
        target="_blank"
        rel="noopener"
        className={`${styles.cta} ${styles.ctaDark}`}
        onClick={() => startWaiting(MAX_WAIT_MS)}
      >
        <Icon name="external" />
        {label}
      </a>
      {phase !== "idle" && (
        <p className={styles.small} role="status" aria-live="polite" style={{ flexBasis: "100%" }}>
          {phase === "waiting" ? T.waiting : phase === "slow" ? T.slow : T.error}{" "}
          {phase !== "waiting" && (
            <button type="button" className={`${styles.cta} ${styles.ctaGhost}`} onClick={() => startWaiting(RETURN_WAIT_MS, true)}>
              {T.check}
            </button>
          )}
        </p>
      )}
    </>
  );
}
