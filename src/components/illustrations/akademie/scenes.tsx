import type { ComponentType } from "react";
import { ArenaScene, GaitScene, HandsScene, HelmetScene, ZonesScene } from "./AkademieArt";
import { RiderScene } from "./RiderScene";
import { ARENA_FIGURES, GAIT_NAMES, HAND_STYLES, HELMET_FITS, RIDER_SCENES, type RiderSceneConfig } from "./scene-names";

type SceneEntry = { component: ComponentType<{ className?: string }>; viewBox: string; label: string };

const VB = "0 0 800 600";

function rider(cfg: RiderSceneConfig): SceneEntry {
  const { label, ...props } = cfg;
  const Comp = ({ className }: { className?: string }) => <RiderScene {...props} title={label} className={className} />;
  Comp.displayName = `Rider(${label})`;
  return { component: Comp, viewBox: VB, label };
}

function entry<P>(label: string, C: ComponentType<P & { className?: string }>, props: P): SceneEntry {
  const Comp = ({ className }: { className?: string }) => <C {...props} className={className} />;
  Comp.displayName = label;
  return { component: Comp, viewBox: VB, label };
}

/**
 * Szenen der Reitakademie für Geschichten, Suchbilder und Bildantworten.
 * Namen beginnen mit „ak-“ (Liste: scene-names.ts).
 */
export const AK_SCENES: Record<string, SceneEntry> = {
  "ak-zonen": entry("Sicherheitszonen rund ums Pferd", ZonesScene, {}),
  ...Object.fromEntries(HELMET_FITS.map((f) => [`ak-helm-${f}`, entry(`Reithelm (${f})`, HelmetScene, { fit: f })])),
  ...Object.fromEntries(HAND_STYLES.map((h) => [`ak-haende-${h}`, entry(`Zügelhaltung (${h})`, HandsScene, { style: h })])),
  /* Gangarten: mit Titel (Erklärung) und ohne Titel (Rate-Spiel) */
  ...Object.fromEntries(GAIT_NAMES.map((g) => [`ak-gang-${g}`, entry(`Fußfolge ${g}`, GaitScene, { gait: g })])),
  ...Object.fromEntries(GAIT_NAMES.map((g) => [`ak-takt-${g}`, entry("Fußfolge einer Gangart", GaitScene, { gait: g, title: false })])),
  ...Object.fromEntries(ARENA_FIGURES.map((f) => [`ak-bahn-${f}`, entry(`Reitbahn: ${f}`, ArenaScene, { figure: f })])),
  ...Object.fromEntries(Object.entries(RIDER_SCENES).map(([k, cfg]) => [k, rider(cfg)])),
};
