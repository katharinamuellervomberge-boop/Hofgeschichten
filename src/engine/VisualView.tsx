"use client";

import { createContext, useContext, type ComponentType } from "react";
import { Horse } from "@/components/illustrations/Horse";
import { HorseHead } from "@/components/illustrations/HorseHead";
import { isItemName, ItemIcon } from "@/components/illustrations/ItemIcons";
import { KidPortrait } from "@/components/illustrations/KidPortrait";
import { PersonPortrait } from "@/components/illustrations/PersonPortrait";
import { Puppy } from "@/components/illustrations/Puppy";
import { GeisterweideScene } from "@/components/illustrations/scenes/Geisterweide";
import { HofScene } from "@/components/illustrations/scenes/Hof";
import { HuetteInnenScene, HuetteScene } from "@/components/illustrations/scenes/Huette";
import {
  AlterStallScene,
  AltesFotoScene,
  GeheimzettelScene,
  GeisterstallCover,
  HofplanScene,
  HufabdruckScene,
  HufspurScene,
  LindenhofSattelkammerScene,
  SchluesselbrettScene,
  SchwarzesBrettScene,
  StallgasseScene,
} from "@/components/illustrations/scenes/Lindenhof";
import { SattelkammerScene } from "@/components/illustrations/scenes/Sattelkammer";
import { isTrackName, Track } from "@/components/illustrations/Tracks";
import { getCharacter } from "@/content/characters";
import { getHorse } from "@/content/horses";
import { getPerson } from "@/content/people";
import { MoodIcon } from "./MoodIcon";
import type { ClueDef, Visual } from "./types";
import styles from "./engine.module.css";

/** Szenen-Registry: neue Szene = Komponente + viewBox hier eintragen. */
export const SCENES: Record<string, { component: ComponentType<{ className?: string }>; viewBox: string; label: string }> = {
  sattelkammer: { component: SattelkammerScene, viewBox: "0 0 800 600", label: "Sattelkammer" },
  hof: { component: HofScene, viewBox: "0 0 800 600", label: "Hofplatz" },
  geisterweide: { component: GeisterweideScene, viewBox: "0 0 800 600", label: "Geisterweide" },
  huette: { component: HuetteScene, viewBox: "0 0 800 600", label: "Weidehütte" },
  "huette-innen": { component: HuetteInnenScene, viewBox: "0 0 800 600", label: "In der Hütte" },
  /* Mystery Files · Die Nacht im Geisterstall (Lindenhof) */
  "lh-stallgasse": { component: StallgasseScene, viewBox: "0 0 800 600", label: "Stallgasse" },
  "lh-brett": { component: SchwarzesBrettScene, viewBox: "0 0 800 600", label: "Schwarzes Brett" },
  "lh-plan": { component: HofplanScene, viewBox: "0 0 800 600", label: "Hofplan" },
  "lh-hufabdruck": { component: HufabdruckScene, viewBox: "0 0 800 600", label: "Hufabdruck" },
  "lh-hufspur": { component: HufspurScene, viewBox: "0 0 800 600", label: "Hufspur" },
  "lh-geheimzettel": { component: GeheimzettelScene, viewBox: "0 0 800 600", label: "Geheimzettel" },
  "lh-sattelkammer": { component: LindenhofSattelkammerScene, viewBox: "0 0 800 600", label: "Alte Sattelkammer" },
  "lh-schluesselbrett": { component: SchluesselbrettScene, viewBox: "0 0 800 600", label: "Schlüsselbrett" },
  "lh-foto": { component: AltesFotoScene, viewBox: "0 0 800 600", label: "Altes Foto" },
  "lh-alter-stall": { component: AlterStallScene, viewBox: "0 0 800 600", label: "Alter Stall" },
  "lh-cover": { component: GeisterstallCover, viewBox: "0 0 800 600", label: "Lindenhof bei Nacht" },
};

/** viewBox der Pferde-Illustration (für Körperteil-Hotspots) */
export const HORSE_VIEWBOX = "70 20 320 292";

export function viewBoxOf(v: Visual): string {
  if (v.kind === "scene") return SCENES[v.scene]?.viewBox ?? "0 0 800 600";
  if (v.kind === "horse") return HORSE_VIEWBOX;
  return "0 0 100 100";
}

/* ---------- Detektivbuch-Kontext ---------- */

export const ClueContext = createContext<{ clues: Record<string, ClueDef>; collected: string[] }>({
  clues: {},
  collected: [],
});

export function useClues() {
  return useContext(ClueContext);
}

/* ---------- Darstellung ---------- */

export function VisualView({ v, className, decorative }: { v: Visual; className?: string; decorative?: boolean }) {
  const { clues, collected } = useClues();
  switch (v.kind) {
    case "item":
      return isItemName(v.name) ? <ItemIcon name={v.name} className={className} title={decorative ? undefined : v.name} /> : null;
    case "count":
      return (
        <div className={`${styles.count} ${className ?? ""}`} role="img" aria-label={`${v.n}`}>
          {Array.from({ length: v.n }, (_, i) =>
            isItemName(v.name) ? <ItemIcon key={i} name={v.name} className={styles.countItem} /> : null,
          )}
        </div>
      );
    case "head": {
      const h = getHorse(v.horse);
      return h ? <HorseHead look={h.look} mood={v.mood} className={className} title={`${h.name}s Kopf`} /> : null;
    }
    case "horse": {
      const h = getHorse(v.horse);
      return h ? <Horse look={h.look} uid={`v-${v.horse}`} flip={v.flip} className={className} title={h.name} /> : null;
    }
    case "track":
      return isTrackName(v.track) ? <Track track={v.track} className={className} /> : null;
    case "scene": {
      const S = SCENES[v.scene];
      return S ? <S.component className={className} /> : null;
    }
    case "kid": {
      const k = getCharacter(v.kid);
      return k ? <KidPortrait kid={k} className={className} /> : null;
    }
    case "puppy":
      return <Puppy pose={v.pose} className={className} />;
    case "mood":
      return <MoodIcon mood={v.mood} className={className} />;
    case "clue": {
      const c = clues[v.clue];
      return c ? <VisualView v={c.visual} className={className} /> : null;
    }
    case "person": {
      const p = getPerson(v.person);
      return p ? <PersonPortrait person={p} className={className} /> : null;
    }
    case "tag":
      return (
        <span className={`${styles.tag} ${className ?? ""}`} aria-hidden={decorative || undefined}>
          {v.text}
        </span>
      );
    case "doc": {
      const d = v.doc;
      return (
        <div className={`${styles.docWrap} ${className ?? ""}`}>
        <div className={`${styles.doc} ${styles[`doc_${d.style}`] ?? ""}`}>
          {d.label && <p className={styles.docLabel}>{d.label}</p>}
          {d.title && <p className={styles.docTitle}>{d.title}</p>}
          {d.table ? (
            <table className={styles.docTable}>
              <thead>
                <tr>
                  {d.table[0].map((h, i) => (
                    <th key={i} scope="col">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {d.table.slice(1).map((row, r) => (
                  <tr key={r}>
                    {row.map((c, i) => (
                      <td key={i}>{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
          {d.lines.length > 0 && (
            <ul className={styles.docLines}>
              {d.lines.map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ul>
          )}
        </div>
        </div>
      );
    }
    case "notebook":
      return (
        <div className={`${styles.notebook} ${className ?? ""}`}>
          <p className={styles.notebookTitle}>Detektivbuch</p>
          {collected.length === 0 ? (
            <p className={styles.notebookEmpty}>Noch keine Hinweise.</p>
          ) : (
            <ul className={styles.notebookList}>
              {collected
                .filter((id) => clues[id])
                .map((id) => (
                  <li key={id}>
                    <VisualView v={clues[id].visual} className={styles.notebookIcon} decorative />
                    <span>{clues[id].label}</span>
                  </li>
                ))}
            </ul>
          )}
        </div>
      );
  }
}
