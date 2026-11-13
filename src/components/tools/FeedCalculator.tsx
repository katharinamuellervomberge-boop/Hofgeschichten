"use client";

import { useState } from "react";
import styles from "./tools.module.css";

/**
 * Fütterungsrechner der Reitakademie (Modul 10, Lektion 7).
 * Pädagogisch: zeigt die Mindestmenge Raufutter (1,5 kg TS je 100 kg KM) und rechnet
 * sie in Frischmasse um. Keine Rationsberatung – Einflussfaktoren werden erklärt, nicht berechnet.
 */

type Feed = { id: string; label: string; ts: number; min: number; max: number };

const FEEDS: Feed[] = [
  { id: "heu", label: "Heu", ts: 86, min: 83, max: 90 },
  { id: "heulage", label: "Heulage", ts: 60, min: 45, max: 75 },
  { id: "gras", label: "Weidegras", ts: 20, min: 15, max: 30 },
];

const FACTORS: Array<{ id: string; label: string; text: string }> = [
  { id: "dick", label: "Pferd ist zu dick", text: "Mindestmenge trotzdem halten – energieärmeres Heu, ein Strohanteil (bis etwa ein Drittel) und mehr Bewegung senken die Energie, nicht weniger Raufutter." },
  { id: "duenn", label: "Pferd ist zu dünn", text: "Oft mehr oder energiereicheres Raufutter; vorher Zähne und Gesundheit prüfen lassen." },
  { id: "arbeit", label: "Viel Training", text: "Der Energiebedarf steigt. Zuerst Raufuttermenge und -qualität anpassen, erst dann über Kraftfutter nachdenken." },
  { id: "senior", label: "Senior", text: "Zähne prüfen lassen; bei schlechtem Kauen helfen eingeweichte Heucobs. Gewicht engmaschig kontrollieren." },
  { id: "winter", label: "Kälte, Nässe, Wind", text: "Mehr Raufutter hält warm – die Verdauung im Dickdarm erzeugt Wärme." },
  { id: "krank", label: "Stoffwechsel- oder Hufrehe-Pferd", text: "Futterplan nur mit Tierärztin oder Fütterungsberatung erstellen; Heuanalyse auf Zucker sinnvoll." },
];

const kg = (x: number) => x.toLocaleString("de-DE", { maximumFractionDigits: 1, minimumFractionDigits: 1 });

export function FeedCalculator() {
  const [mode, setMode] = useState<"gewicht" | "massband">("gewicht");
  const [weight, setWeight] = useState(550);
  const [girth, setGirth] = useState(190);
  const [length, setLength] = useState(160);
  const [feedId, setFeedId] = useState("heu");
  const [ts, setTs] = useState(86);
  const [straw, setStraw] = useState(0);
  const [factors, setFactors] = useState<string[]>([]);

  const feed = FEEDS.find((f) => f.id === feedId)!;
  const bw = mode === "gewicht" ? weight : Math.round((girth * girth * length) / 11880);
  const tsTotal = (bw / 100) * 1.5;
  const tsStraw = tsTotal * (straw / 100);
  const tsMain = tsTotal - tsStraw;
  const fmMain = tsMain / (ts / 100);
  const fmStraw = tsStraw / 0.88;

  const pickFeed = (id: string) => {
    const f = FEEDS.find((x) => x.id === id)!;
    setFeedId(id);
    setTs(f.ts);
  };
  const toggle = (id: string) => setFactors((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  return (
    <div className={styles.tool} aria-label="Fütterungsrechner">
      <p className={styles.toolLabel}>Fütterungsrechner</p>

      <fieldset className={styles.group}>
        <legend>1. Körpergewicht</legend>
        <div className={styles.seg} role="radiogroup" aria-label="Gewicht bestimmen">
          <button type="button" aria-pressed={mode === "gewicht"} onClick={() => setMode("gewicht")}>Gewicht bekannt</button>
          <button type="button" aria-pressed={mode === "massband"} onClick={() => setMode("massband")}>Mit Maßband schätzen</button>
        </div>
        {mode === "gewicht" ? (
          <label className={styles.field}>
            <span>Gewicht: <strong>{weight} kg</strong></span>
            <input type="range" min={150} max={900} step={10} value={weight} onChange={(e) => setWeight(+e.target.value)} />
          </label>
        ) : (
          <>
            <label className={styles.field}>
              <span>Brustumfang: <strong>{girth} cm</strong></span>
              <input type="range" min={120} max={240} step={1} value={girth} onChange={(e) => setGirth(+e.target.value)} />
            </label>
            <label className={styles.field}>
              <span>Rumpflänge (Buggelenk bis Sitzbeinhöcker): <strong>{length} cm</strong></span>
              <input type="range" min={100} max={200} step={1} value={length} onChange={(e) => setLength(+e.target.value)} />
            </label>
            <p className={styles.note}>
              Schätzung: {girth}² × {length} ÷ 11 880 ≈ <strong>{bw} kg</strong>. Formeln können einige Prozent danebenliegen.
            </p>
          </>
        )}
      </fieldset>

      <fieldset className={styles.group}>
        <legend>2. Raufutter</legend>
        <div className={styles.seg} role="radiogroup" aria-label="Raufutterart">
          {FEEDS.map((f) => (
            <button key={f.id} type="button" aria-pressed={feedId === f.id} onClick={() => pickFeed(f.id)}>
              {f.label}
            </button>
          ))}
        </div>
        <label className={styles.field}>
          <span>Trockensubstanz (TS) laut Analyse oder Lieferant: <strong>{ts} %</strong></span>
          <input type="range" min={feed.min} max={feed.max} step={1} value={ts} onChange={(e) => setTs(+e.target.value)} />
        </label>
        <label className={styles.field}>
          <span>Anteil Stroh an der Trockensubstanz: <strong>{straw} %</strong></span>
          <input type="range" min={0} max={40} step={5} value={straw} onChange={(e) => setStraw(+e.target.value)} />
        </label>
      </fieldset>

      <div className={styles.result} aria-live="polite">
        <p className={styles.resultTitle}>Mindestmenge pro Tag</p>
        <p>
          {bw} kg Pferd → <strong>{kg(tsTotal)} kg Trockensubstanz</strong> (1,5 kg je 100 kg)
        </p>
        <p className={styles.big}>
          ≈ {kg(fmMain)} kg {feed.label}
          {straw > 0 && <> + {kg(fmStraw)} kg Stroh</>}
        </p>
        <p className={styles.formula}>
          Rechnung: {kg(tsMain)} kg TS ÷ {ts} % = {kg(fmMain)} kg Frischmasse
          {straw > 0 && <> · {kg(tsStraw)} kg TS ÷ 88 % = {kg(fmStraw)} kg Stroh</>}
        </p>
      </div>

      <fieldset className={styles.group}>
        <legend>3. Was den Bedarf verändert</legend>
        <div className={styles.chips}>
          {FACTORS.map((f) => (
            <button key={f.id} type="button" aria-pressed={factors.includes(f.id)} onClick={() => toggle(f.id)}>
              {f.label}
            </button>
          ))}
        </div>
        {factors.length > 0 && (
          <ul className={styles.factorList}>
            {FACTORS.filter((f) => factors.includes(f.id)).map((f) => (
              <li key={f.id}>
                <strong>{f.label}:</strong> {f.text}
              </li>
            ))}
          </ul>
        )}
      </fieldset>

      <p className={styles.disclaimer}>
        Lernwerkzeug, keine Rationsberechnung. Die Mindestmenge gilt für gesunde Pferde. Bei Erkrankungen, starkem Über- oder Untergewicht
        und für Zucht- und Sportpferde gehört der Futterplan in fachkundige Hände.
      </p>
    </div>
  );
}
