"use client";

import { createContext, useContext, type ComponentType } from "react";
import { Horse } from "@/components/illustrations/Horse";
import { HorseHead } from "@/components/illustrations/HorseHead";
import { isItemName, ItemIcon } from "@/components/illustrations/ItemIcons";
import { KidPortrait } from "@/components/illustrations/KidPortrait";
import { Puppy } from "@/components/illustrations/Puppy";
import { GeisterweideScene } from "@/components/illustrations/scenes/Geisterweide";
import { HofScene } from "@/components/illustrations/scenes/Hof";
import { HuetteInnenScene, HuetteScene } from "@/components/illustrations/scenes/Huette";
import { SattelkammerScene } from "@/components/illustrations/scenes/Sattelkammer";
import { isTrackName, Track } from "@/components/illustrations/Tracks";
import { getCharacter } from "@/content/characters";
import { getHorse } from "@/content/horses";
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
