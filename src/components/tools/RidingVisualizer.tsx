"use client";

import { useEffect, useRef, useState } from "react";
import { AnimHorse, legsOnGround, type Gait, type LegId } from "@/components/illustrations/akademie/AnimHorse";
import { getHorse } from "@/content/horses";
import { VisualView } from "@/engine/VisualView";
import styles from "./tools.module.css";

/**
 * Reitlehre-Visualizer (Modul 13): Fußfolgen animiert (mit Zeitlupe) sowie
 * Seitengänge und Wendungen von oben mit Stellung, Biegung und Hilfen.
 */

type MovingGait = Exclude<Gait, "stand">;

const GAITS: Array<{ id: MovingGait; label: string; beats: LegId[][]; text: string }> = [
  { id: "schritt", label: "Schritt", beats: [["HL"], ["VL"], ["HR"], ["VR"]], text: "Viertakt ohne Schwebephase: hinten links – vorne links – hinten rechts – vorne rechts. Immer zwei oder drei Hufe am Boden." },
  { id: "trab", label: "Trab", beats: [["HL", "VR"], ["HR", "VL"]], text: "Zweitakt in diagonalen Beinpaaren mit Schwebephase dazwischen." },
  { id: "galopp-rechts", label: "Rechtsgalopp", beats: [["HL"], ["HR", "VL"], ["VR"]], text: "Dreitakt: hinten links – hinten rechts mit vorne links – vorne rechts, dann Schwebe. Das rechte Beinpaar greift weiter vor." },
  { id: "galopp-links", label: "Linksgalopp", beats: [["HR"], ["HL", "VR"], ["VL"]], text: "Dreitakt: hinten rechts – hinten links mit vorne rechts – vorne links, dann Schwebe. Das linke Beinpaar greift weiter vor." },
];

const LEG_LABEL: Record<LegId, string> = { VL: "vorne links", VR: "vorne rechts", HL: "hinten links", HR: "hinten rechts" };
const BEAT_COLORS = ["#C99A4E", "#5E7360", "#A4573A", "#80634D"];

const MOVES: Array<{ id: string; label: string; scene: string; what: string; help: string[] }> = [
  {
    id: "gerade",
    label: "Gerade",
    scene: "ak-oben-gerade",
    what: "Hinterhufe spuren in die Spur der Vorderhufe. Grundlage für alles Weitere.",
    help: ["Gewicht gleichmäßig auf beiden Gesäßknochen", "Beide Schenkel am Gurt", "Gleichmäßige Verbindung an beiden Zügeln", "Bei Schiefe: Schultern vor die Hinterhand (Schultervor)"],
  },
  {
    id: "schenkelweichen",
    label: "Schenkelweichen",
    scene: "ak-oben-schenkelweichen",
    what: "Vorwärts-seitwärts, Stellung gegen die Bewegungsrichtung, keine Biegung. Lösende Übung.",
    help: ["Gewicht leicht auf der Seite der Stellung", "Schenkel der Stellungsseite eine Handbreit hinter dem Gurt treibt vorwärts-seitwärts", "Anderer Schenkel nimmt auf und verwahrt", "Äußerer Zügel begrenzt die Stellung"],
  },
  {
    id: "schulterherein",
    label: "Schulterherein",
    scene: "ak-oben-schulterherein",
    what: "Vorhand ca. 30° nach innen, drei Hufschläge, Biegung weg von der Bewegungsrichtung. Geraderichtung und Lastaufnahme des inneren Hinterbeins.",
    help: ["Gewicht innen", "Innerer Schenkel am Gurt treibt vorwärts-seitwärts", "Äußerer Schenkel verwahrt hinter dem Gurt", "Beide Zügel führen die Schultern herein, äußerer begrenzt"],
  },
  {
    id: "travers",
    label: "Travers",
    scene: "ak-oben-travers",
    what: "Kruppe herein, vier Hufschläge, Biegung in Bewegungsrichtung.",
    help: ["Gewicht innen", "Innerer Schenkel am Gurt für die Biegung", "Äußerer Schenkel hinter dem Gurt führt die Hinterhand herein", "Innerer Zügel stellt, äußerer begrenzt"],
  },
  {
    id: "renvers",
    label: "Renvers",
    scene: "ak-oben-renvers",
    what: "Spiegelbild des Travers: Hinterhand auf dem Hufschlag, Vorhand innen, Biegung in Bewegungsrichtung.",
    help: ["Gewicht auf der Seite der Biegung", "Schenkel der Biegungsseite am Gurt", "Anderer Schenkel hinter dem Gurt führt die Hinterhand", "Zügel: stellen und begrenzen wie im Travers"],
  },
  {
    id: "traversale",
    label: "Traversale",
    scene: "ak-oben-traversale",
    what: "Travers auf schräger Linie: Pferd parallel zur langen Seite, Vorhand etwas voraus, Biegung in Bewegungsrichtung.",
    help: ["Gewicht in Bewegungsrichtung", "Innerer Schenkel am Gurt", "Äußerer Schenkel hinter dem Gurt treibt seitwärts", "Äußerer Zügel begrenzt, Vorhand führt"],
  },
  {
    id: "vorhandwendung",
    label: "Vorhandwendung",
    scene: "ak-oben-vorhandwendung",
    what: "Hinterhand tritt um die Vorhand herum. Gehorsamsübung auf den seitwärtstreibenden Schenkel.",
    help: ["Aus dem Halten", "Schenkel der Stellungsseite hinter dem Gurt treibt Tritt für Tritt seitwärts", "Anderer Schenkel verwahrt", "Zügel verhindern Vortreten"],
  },
  {
    id: "hinterhandwendung",
    label: "Hinterhandwendung",
    scene: "ak-oben-hinterhandwendung",
    what: "Vorhand tritt um die Hinterhand herum, Hinterbeine treten auf kleinem Kreis im Takt weiter.",
    help: ["Gewicht innen", "Innerer Schenkel am Gurt erhält den Takt", "Äußerer Schenkel verwahrt hinter dem Gurt", "Äußerer Zügel führt die Vorhand herum"],
  },
];

export function RidingVisualizer({ start }: { start?: string }) {
  const startGait = GAITS.find((g) => g.id === start);
  const startMove = MOVES.find((m) => m.id === start);
  const [view, setView] = useState<"gait" | "move">(startMove ? "move" : "gait");
  const [gaitId, setGaitId] = useState<MovingGait>(startGait?.id ?? "schritt");
  const [moveId, setMoveId] = useState(startMove?.id ?? "schulterherein");
  const [slow, setSlow] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [time, setTime] = useState(0);
  const last = useRef<number | null>(null);

  useEffect(() => {
    if (view !== "gait" || !playing) {
      last.current = null;
      return;
    }
    let raf = 0;
    const tick = (now: number) => {
      if (last.current != null) setTime((t) => t + ((now - last.current!) / 1000) * (slow ? 0.25 : 1));
      last.current = now;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [view, playing, slow]);

  const gait = GAITS.find((g) => g.id === gaitId)!;
  const move = MOVES.find((m) => m.id === moveId)!;
  const look = getHorse("tivoli")!.look;
  const ground = legsOnGround(gait.id, time);

  return (
    <div className={styles.tool} aria-label="Reitlehre-Visualizer">
      <p className={styles.toolLabel}>Reitlehre-Visualizer</p>
      <div className={styles.seg} role="radiogroup" aria-label="Ansicht">
        <button type="button" aria-pressed={view === "gait"} onClick={() => setView("gait")}>Fußfolgen</button>
        <button type="button" aria-pressed={view === "move"} onClick={() => setView("move")}>Seitengänge und Wendungen</button>
      </div>

      {view === "gait" ? (
        <>
          <div className={styles.chips}>
            {GAITS.map((g) => (
              <button key={g.id} type="button" aria-pressed={gaitId === g.id} onClick={() => setGaitId(g.id)}>
                {g.label}
              </button>
            ))}
          </div>
          <svg viewBox="40 60 340 260" className={styles.stage} role="img" aria-label={`${gait.label}, animiert`}>
            <AnimHorse look={look} gait={gait.id} time={time} />
          </svg>
          <div className={styles.hooves} aria-hidden>
            {(["HL", "VL", "HR", "VR"] as LegId[]).map((leg) => {
              const beat = gait.beats.findIndex((b) => b.includes(leg));
              const on = ground.includes(leg);
              return (
                <span key={leg} className={styles.hoof} style={{ background: on ? BEAT_COLORS[beat] : "transparent", borderColor: BEAT_COLORS[beat] }}>
                  <b>{beat + 1}</b>
                  {LEG_LABEL[leg]}
                </span>
              );
            })}
          </div>
          <p className={styles.note}>{ground.length === 0 ? "Schwebephase – kein Huf am Boden!" : `Am Boden: ${ground.map((l) => LEG_LABEL[l]).join(", ")}`}</p>
          <div className={styles.seg}>
            <button type="button" aria-pressed={!playing} onClick={() => setPlaying((p) => !p)}>{playing ? "Pause" : "Abspielen"}</button>
            <button type="button" aria-pressed={slow} onClick={() => setSlow((s) => !s)}>Zeitlupe</button>
          </div>
          <p className={styles.explain}>{gait.text}</p>
        </>
      ) : (
        <>
          <div className={styles.chips}>
            {MOVES.map((m) => (
              <button key={m.id} type="button" aria-pressed={moveId === m.id} onClick={() => setMoveId(m.id)}>
                {m.label}
              </button>
            ))}
          </div>
          <div className={styles.sceneBox}>
            <VisualView v={{ kind: "scene", scene: move.scene }} />
          </div>
          <p className={styles.explain}>{move.what}</p>
          <ul className={styles.factorList}>
            {move.help.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
