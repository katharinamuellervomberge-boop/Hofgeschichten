/**
 * Rider Lab: Übersicht (ohne Inhalte) erzeugen und die Übungsdaten prüfen.
 * Genutzt von scripts/riderlab-katalog.ts und scripts/check-riderlab.ts.
 */
import { riderLabAreas } from "../src/content/riderlab/uebungen.server";
import { loopLength, poseAt, solve } from "../src/features/riderlab/kinematics";

export const RL_CATALOG_PATH = "src/content/riderlab/katalog.generated.ts";

export function buildRiderLabCatalog() {
  return riderLabAreas.map((a) => ({
    id: a.id,
    slug: a.slug,
    number: a.number,
    title: a.title,
    problem: a.problem,
    intro: a.intro,
    tint: a.tint,
    exercises: a.exercises.map((e) => ({ id: e.id, slug: e.slug, number: e.number, title: e.title, doseLabel: e.doseLabel })),
  }));
}

export function buildRiderLabCatalogSource() {
  return `/* Automatisch erzeugt mit \`npm run riderlab:katalog\` – nicht von Hand ändern. */
import type { RiderLabAreaInfo } from "./katalog";

/** Rider Lab: fünf Bereiche mit je vier Übungen – nur Titel und Dosierung, keine Inhalte */
export const riderLabCatalog: RiderLabAreaInfo[] = ${JSON.stringify(buildRiderLabCatalog(), null, 2)};
`;
}

/** Fachliche/technische Prüfung der Übungsdaten. Gibt Fehlertexte zurück (leer = alles gut). */
export function checkRiderLab(): string[] {
  const errors: string[] = [];
  if (riderLabAreas.length !== 5) errors.push(`Erwartet 5 Bereiche, gefunden ${riderLabAreas.length}`);
  const ids = new Set<string>();
  let n = 0;
  for (const a of riderLabAreas) {
    if (a.exercises.length !== 4) errors.push(`${a.title}: erwartet 4 Übungen, gefunden ${a.exercises.length}`);
    for (const e of a.exercises) {
      n++;
      if (ids.has(e.id)) errors.push(`doppelte ID ${e.id}`);
      ids.add(e.id);
      if (e.number !== n) errors.push(`${e.id}: Nummer ${e.number}, erwartet ${n}`);
      if (e.steps.length < 1 || e.steps.length > 4) errors.push(`${e.id}: ${e.steps.length} Schritte (max. 4)`);
      for (const k of ["goal", "aha", "transfer", "doseLabel"] as const) if (!e[k]?.trim()) errors.push(`${e.id}: ${k} fehlt`);
      const check = (label: string, frames: typeof e.anim.frames) => {
        if (frames.length < 2) errors.push(`${e.id} ${label}: zu wenige Keyframes`);
        if (frames[0].t !== 0) errors.push(`${e.id} ${label}: erster Keyframe muss bei t = 0 liegen`);
        for (let i = 1; i < frames.length; i++) if (frames[i].t < frames[i - 1].t) errors.push(`${e.id} ${label}: Keyframes nicht sortiert`);
        const T = loopLength(frames);
        const view = e.anim.view === "front" ? "front" : "side";
        for (let i = 0; i <= 40; i++) {
          const j = solve(poseAt(frames, (T * i) / 40, view).pose, view);
          for (const [k, p] of Object.entries(j)) if (!Number.isFinite(p[0]) || !Number.isFinite(p[1])) errors.push(`${e.id} ${label}: Gelenk ${k} ungültig`);
        }
      };
      check("Animation", e.anim.frames);
      if (!e.anim.mistake) errors.push(`${e.id}: keine Fehlervariante`);
      else check("Fehler", e.anim.mistake.frames);
      // Sicherheit: keine Texte, die Druck auf die Ferse oder Klemmen empfehlen
      const all = [e.goal, ...e.steps, e.aha, e.transfer].join(" ").toLowerCase();
      if (/ferse(n)? (nach unten )?drücken|absatz runterdrücken|knie (fest )?zusammendrücken/.test(all)) errors.push(`${e.id}: Text empfiehlt Drücken/Klemmen`);
    }
  }
  if (n !== 20) errors.push(`Erwartet 20 Übungen, gefunden ${n}`);
  return errors;
}
