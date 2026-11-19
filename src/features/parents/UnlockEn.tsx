"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Icon } from "@/components/illustrations/Icons";
import { academyCheckoutUrl, academyPriceLabel, grosseAkademie, regionalCheckoutUrl, ridingSpace as rs, ridingSpacePriceLabel } from "@/content/products";
import type { RidingSpaceStatus } from "@/lib/entitlements/server";
import { membership as plan } from "@/content/membership";
import Link from "@/i18n/Link";
import styles from "./ParentsArea.module.css";

const MESSAGES: Record<string, string> = {
  unavailable: "Unlocking is not available right now. Please try again later.",
  not_found: "We couldn't find a matching order. Please check the order number and email address.",
  not_paid: "This order hasn't been paid yet or was cancelled.",
  no_product: "This order doesn't contain the Riding Academy, the Riding Space or another app product.",
  rs_expired: "This Riding Space order is more than 12 months old, so access has expired. You can buy the Riding Space for another 12 months in our shop.",
  bad_code: "This unlock code is invalid or has expired. Please check the spelling (HG-XXXX-XXXX-XXXX).",
  device_full: `This code is already active on another device. Remove it on the old device first, or email ${plan.supportEmail} and we'll reset it.`,
  rate: "Too many attempts. Please wait 15 minutes.",
  bad_request: "Please fill in all fields.",
};

/**
 * Englische Seite „Unlock“ (unter /en/eltern): Reitakademie und Riding Space kaufen und freischalten.
 * Gleiche Server-Prüfung wie im deutschen Elternbereich (/api/freischalten).
 */
type Props = { owned: string[]; ridingSpace: RidingSpaceStatus; orderUnlockAvailable: boolean; codeUnlockAvailable: boolean };

export function UnlockEn({ owned, ridingSpace, orderUnlockAvailable, codeUnlockAvailable }: Props) {
  const router = useRouter();
  const has = owned.includes(grosseAkademie.slug);
  const [mode, setMode] = useState<"order" | "code">(orderUnlockAvailable || !codeUnlockAvailable ? "order" : "code");
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [confirmRemove, setConfirmRemove] = useState(false);
  const available = mode === "order" ? orderUnlockAvailable : codeUnlockAvailable;
  const price = academyPriceLabel("en");

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
      const json = (await res.json()) as { ok: boolean; reason?: string; adventures?: string[]; membership?: unknown; ridingSpace?: { until: string } | null };
      if (json.ok) {
        const names: string[] = [];
        if (json.adventures?.includes(grosseAkademie.slug)) names.push("The Riding Academy");
        if (json.ridingSpace) names.push(`Riding Space (until ${new Date(json.ridingSpace.until).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })})`);
        setMsg({
          ok: true,
          text: names.length ? `Unlocked: ${names.join(" and ")}. Enjoy!` : "Unlocked. Your purchase is now available on this device.",
        });
        setOrderNumber("");
        setEmail("");
        setCode("");
        router.refresh();
      } else {
        setMsg({ ok: false, text: MESSAGES[json.reason ?? ""] ?? "That didn't work. Please try again." });
      }
    } catch {
      setMsg({ ok: false, text: "No connection. Please check your internet connection and try again." });
    } finally {
      setBusy(false);
    }
  };

  const removeFromDevice = async () => {
    await fetch("/api/freischalten", { method: "DELETE" }).catch(() => null);
    setConfirmRemove(false);
    setMsg({ ok: true, text: "The unlock has been removed from this device." });
    router.refresh();
  };

  return (
    <div className="page">
      <div style={{ display: "grid", gap: "var(--space-5)" }}>
        <header>
          <p className="eyebrow">For parents and adult learners</p>
          <h1 style={{ fontFamily: "var(--font-display)", margin: 0 }}>Buy &amp; unlock</h1>
        </header>

        <section className={`${styles.card} ${styles.premium}`} aria-labelledby="akademie" id="akademie">
          <div className={styles.product}>
            <div className={styles.productHead}>
              <strong id="akademie-title">The Riding Academy</strong>
              <span className={`${styles.pill} ${has ? styles.pillOk : ""}`}>{has ? "Unlocked on this device" : `${price} one-time`}</span>
            </div>
            <p className={styles.productInfo}>
              14 modules with 157 interactive lessons – understanding horses, handling and grooming, learning to ride, the aids, school
              figures and arena rules, riding better, dressage, jumping and more – plus the Rider Lab with 20 animated exercises for your seat
              and body. Three learning tracks: Kids (6–11), Teens (12–17) and Adults (18+). The first lesson of every module is free.
            </p>
            {!has && (
              <div className={styles.choice}>
                <div className={`${styles.choiceOption} ${styles.choiceBest}`}>
                  <p className={styles.choiceLabel}>The Riding Academy</p>
                  <p className={styles.choicePrice}>{price} one-time · no subscription</p>
                  <a
                    href={academyCheckoutUrl("en") ?? "#"}
                    onClick={(e) => (e.currentTarget.href = regionalCheckoutUrl())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.shopLink}
                  >
                    <span>Buy the Riding Academy</span>
                    <Icon name="external" />
                  </a>
                  <p className={styles.choiceText}>
                    Secure checkout in our shop, shown in your local currency. Then come back here and enter your order number and email
                    address below.
                  </p>
                </div>
              </div>
            )}
          </div>

          <RidingSpaceProductEn status={ridingSpace} />

          <div className={styles.unlock}>
            <h2 style={{ fontSize: "var(--text-lg)" }}>Unlock your purchase</h2>
            <p className={styles.settingHint}>
              Enter the order number and the email address used for the order. They are only sent to our shop system to check the order
              and are not stored. The unlock applies to this browser on this device – you can unlock further devices the same way.
            </p>

            {codeUnlockAvailable && orderUnlockAvailable && (
              <div className={styles.tabs} role="tablist" aria-label="Unlock method">
                <button type="button" role="tab" aria-selected={mode === "order"} className={mode === "order" ? styles.tabActive : styles.tab} onClick={() => setMode("order")}>
                  Order number
                </button>
                <button type="button" role="tab" aria-selected={mode === "code"} className={mode === "code" ? styles.tabActive : styles.tab} onClick={() => setMode("code")}>
                  Unlock code
                </button>
              </div>
            )}

            <form className={styles.form} onSubmit={submit}>
              {mode === "order" ? (
                <>
                  <label className={styles.field}>
                    <span>Order number</span>
                    <input inputMode="numeric" autoComplete="off" placeholder="e.g. #1042" value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)} required maxLength={21} />
                  </label>
                  <label className={styles.field}>
                    <span>Email address used for the order</span>
                    <input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={200} />
                  </label>
                </>
              ) : (
                <label className={styles.field}>
                  <span>Unlock code</span>
                  <input autoComplete="off" autoCapitalize="characters" placeholder="HG-XXXX-XXXX-XXXX" value={code} onChange={(e) => setCode(e.target.value)} required maxLength={24} />
                </label>
              )}
              {!available && <p className={styles.notice}>This unlock method is not set up yet.</p>}
              <button type="submit" className={styles.primaryBtn} disabled={busy || !available}>
                {busy ? "Checking …" : "Unlock"}
              </button>
            </form>

            {msg && (
              <div className={msg.ok ? styles.success : styles.error} role="status">
                <p>{msg.text}</p>
                {msg.ok && (
                  <p>
                    <Link href="/akademie">Go to the Riding Academy →</Link>
                    <br />
                    <Link href="/tagebuch">Go to the Riding Space →</Link>
                  </p>
                )}
              </div>
            )}

            {owned.length > 0 && (
              <div className={styles.removeRow}>
                {!confirmRemove ? (
                  <button type="button" className={styles.linkBtn} onClick={() => setConfirmRemove(true)}>
                    Remove unlock from this device
                  </button>
                ) : (
                  <>
                    <span>Really remove? You can unlock again later.</span>
                    <button type="button" className={styles.dangerBtn} onClick={removeFromDevice}>
                      Remove
                    </button>
                    <button type="button" className={styles.secondaryBtn} onClick={() => setConfirmRemove(false)}>
                      Cancel
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </section>

        <section className={styles.card}>
          <h2 style={{ fontSize: "var(--text-lg)" }}>Good to know</h2>
          <ul style={{ display: "grid", gap: "var(--space-2)", paddingLeft: "1.2em", margin: 0 }}>
            <li>Riding Academy: one-time purchase, no subscription – permanent access, every lesson can be repeated.</li>
            <li>Riding Space: 12 months of access from the date of purchase, then it ends automatically – no subscription, nothing to cancel.</li>
            <li>No account, no ads, no chat. Progress is saved only on this device.</li>
            <li>Works in the browser on phone, tablet and computer – nothing to install.</li>
            <li>A great gift: write the order number and email in the card and unlock it together.</li>
            <li>
              Questions? Email <a href={`mailto:${plan.supportEmail}`}>{plan.supportEmail}</a>.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

/** Riding Space (Reitertagebuch, Trainingsplaner, Rider Coach) – 12 Monate, endet automatisch */
function RidingSpaceProductEn({ status }: { status: RidingSpaceStatus }) {
  const date = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const label = !status.active
    ? `${ridingSpacePriceLabel("en")} for 12 months`
    : status.via === "kauf"
      ? `Unlocked until ${date(status.until)}`
      : status.via === "bestand"
        ? "Included with the Riding Academy"
        : "Included in the membership";
  return (
    <div className={styles.product} id="riding-space">
      <div className={styles.productHead}>
        <strong>{rs.name}</strong>
        <span className={`${styles.pill} ${status.active ? styles.pillOk : ""}`}>{label}</span>
      </div>
      <p className={styles.productInfo}>
        Riding journal, training planner and Rider Coach: record your riding sessions with photos, set goals and track how they develop, plan
        your weeks and months, build a training plan with fixed rules, and get matching exercises from the coach when something isn&apos;t
        working in the saddle. All data stays on your device. 12 months of access that ends automatically – no subscription.
      </p>
      {!status.active && (
        <div className={styles.choice}>
          <div className={`${styles.choiceOption} ${styles.choiceBest}`}>
            <p className={styles.choiceLabel}>Riding Space</p>
            <p className={styles.choicePrice}>{ridingSpacePriceLabel("en")} for 12 months · ends automatically</p>
            <a
              href={rs.checkoutUrl}
              onClick={(e) => (e.currentTarget.href = regionalCheckoutUrl(rs.shopifyProductHandle))}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.shopLink}
            >
              <span>Buy the Riding Space</span>
              <Icon name="external" />
            </a>
            <p className={styles.choiceText}>
              After buying, enter your order number and email address below under &ldquo;Unlock your purchase&rdquo;. The 12 months start on
              the date of purchase.
            </p>
          </div>
        </div>
      )}
      {!status.active && status.expired && <p className={styles.notice}>Your Riding Space expired on {date(status.expired)}.</p>}
    </div>
  );
}
