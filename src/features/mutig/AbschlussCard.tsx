"use client";

import { useState } from "react";
import { WEGE } from "@/content/mutig/katalog";
import { mutigReiten } from "@/content/products";
import { currentStepIndex, isConsolidated, type MutigState } from "./logic";
import styles from "./mutig.module.css";

/** Zusammenfassung für das Gespräch – entsteht auf dem Gerät, wird nur auf Wunsch geteilt */
function summary(s: MutigState) {
  const fest = s.ladder.filter(isConsolidated).length;
  const last = Object.values(s.units).filter((u) => u.after !== null).at(-1)?.after ?? null;
  const step = s.ladder[currentStepIndex(s.ladder)];
  return [
    s.weg ? `Weg: ${WEGE[s.weg].titel}` : null,
    s.ziel ? `Ziel: ${s.ziel}` : null,
    s.start !== null ? `Angst beim Start: ${s.start} von 10` : null,
    last !== null ? `Angst zuletzt: ${last} von 10` : null,
    `Gefestigte Stufen: ${fest} von ${s.ladder.length}`,
    step ? `Aktuelle Stufe: ${step.t}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

/** Kostenloses Abschlussgespräch – sichtbar, sobald alle 30 Einheiten geschafft sind */
export function AbschlussCard({ state }: { state: MutigState }) {
  const [copied, setCopied] = useState(false);
  if (!state.done.includes(30)) return null;
  const g = mutigReiten.abschlussgespraech;
  const text = summary(state);
  const mail =
    `mailto:${g.bookingEmail}?subject=${encodeURIComponent("Mutig reiten – Abschlussgespräch")}` +
    `&body=${encodeURIComponent(`Hallo,\n\nich habe Mutig reiten abgeschlossen und möchte gern mein kostenloses Abschlussgespräch buchen.\n\nBestellnummer: \nMögliche Termine: \n\nMein Stand (freiwillig):\n${text}\n`)}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className={styles.cardForest} aria-labelledby="mr-gespraech">
      <p className={styles.kicker}>Geschenkt zum Abschluss</p>
      <h2 id="mr-gespraech" className={styles.h2}>Dein kostenloses Abschlussgespräch</h2>
      <p className={styles.muted}>
        {g.minutes} Minuten per Zoom: Wir schauen gemeinsam auf deine sechs Wochen, dein Ziel und darauf, wie du nach dem Programm dranbleibst.
      </p>
      <div className={styles.row}>
        <a className={styles.btn} href={g.bookingUrl ?? mail} target={g.bookingUrl ? "_blank" : undefined} rel="noopener noreferrer">
          {g.bookingUrl ? "Termin buchen" : "Termin anfragen"}
        </a>
        <button className={styles.btnGhost} type="button" onClick={copy}>
          {copied ? "Kopiert" : "Meinen Stand kopieren"}
        </button>
      </div>
      <p className={styles.muted}>
        Halte zur Buchung deine Bestellnummer bereit. Deinen Stand teilst du nur, wenn du möchtest – er liegt sonst nur auf diesem Gerät.
      </p>
    </section>
  );
}
