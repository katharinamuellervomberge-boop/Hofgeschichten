/**
 * Prüft die Premium-Inhalte (Hofspiel, Premium-Lektionen) und die Freitags-Konfiguration.
 * Aufruf: npm run check:premium
 */
import { hoftagParts } from "../src/content/premium/ein-tag-auf-dem-hof.server";
import { spracheDerPferde } from "../src/content/premium/sprache-der-pferde.server";
import { lessonActivity } from "../src/content/akademie/activity";
import { forLevel, pick, type Activity, type Level, type Step } from "../src/engine/types";
import { releases } from "../src/content/membership";
import { hofjahrBadges, HOFTAG_STEPS } from "../src/content/hofjahr";
import * as fs from "node:fs";

const itemsSrc = fs.readFileSync("src/components/illustrations/ItemIcons.tsx", "utf8");
const akSrc = fs.readFileSync("src/components/illustrations/akademie/AkIcons.tsx", "utf8");
const sceneSrc = fs.readFileSync("src/engine/VisualView.tsx", "utf8");
const errs: string[] = [];
const err = (w: string, m: string) => errs.push(`${w}: ${m}`);
const PH = /(lorem|platzhalter|todo|tbd|xxx)/i;

function checkVisual(w: string, v: any) {
  if (!v) return;
  if (v.kind === "item" && !new RegExp(`\\| "${v.name}"`).test(itemsSrc) && !akSrc.includes(`"${v.name}"`)) err(w, `unbekanntes Item ${v.name}`);
  if (v.kind === "scene" && !sceneSrc.includes(`"${v.scene}"`) && !v.scene.startsWith("ak-")) err(w, `unbekannte Szene ${v.scene}`);
}
function text(w: string, t: any, level: Level) {
  const s = t === undefined ? "" : pick(t, level);
  if (!s || !String(s).trim()) err(w, "leerer Text");
  if (PH.test(String(s))) err(w, "Platzhalter-Wort");
}
function check(a: Activity) {
  const ids = new Set<string>();
  for (const s of a.steps) { if (ids.has(s.id)) err(a.id, `doppelte Schritt-ID ${s.id}`); ids.add(s.id); }
  for (const level of ["leicht", "mittel"] as Level[]) {
    const steps = forLevel(a.steps, level);
    if (!steps.length) err(a.id, `keine Schritte in ${level}`);
    text(`${a.id}/intro`, a.intro, level);
    for (const s of steps as Step[]) {
      const w = `${a.id}/${s.id}/${level}`;
      if ("prompt" in s) text(w, (s as any).prompt, level);
      if (s.type === "story") { text(w, s.text, level); checkVisual(w, s.visual); }
      if (s.type === "choice") {
        const o = forLevel(s.options, level);
        if (o.filter((x) => x.correct).length !== 1) err(w, "nicht genau eine richtige Antwort");
        if (o.length < 2 || o.length > 4) err(w, `${o.length} Antworten`);
        o.filter((x) => !x.correct && !x.feedback).forEach((x) => err(w, `falsche Antwort ${x.id} ohne Rückmeldung`));
        o.forEach((x) => checkVisual(w, x.visual));
        text(w, s.explain, level); checkVisual(w, s.visual);
      }
      if (s.type === "multi") {
        const o = forLevel(s.options, level);
        if (!o.some((x) => x.correct)) err(w, "keine richtige Antwort");
        if (!o.some((x) => !x.correct)) err(w, "keine falsche Antwort");
        o.filter((x) => !x.correct && !x.feedback).forEach((x) => err(w, `falsche Antwort ${x.id} ohne Rückmeldung`));
        o.forEach((x) => checkVisual(w, x.visual));
        text(w, s.missing, level); text(w, s.explain, level);
      }
      if (s.type === "match") {
        const t = forLevel(s.targets, level); const it = forLevel(s.items, level);
        it.forEach((x) => { if (!t.some((y) => y.id === x.target)) err(w, `Karte ${x.id} ohne Ziel`); checkVisual(w, x.visual); if (!x.say) err(w, `Karte ${x.id} ohne Text`); });
        t.forEach((y) => { if (!it.some((x) => x.target === y.id)) err(w, `Ziel ${y.id} ohne Karte`); checkVisual(w, y.visual); });
      }
      if (s.type === "hotspots") {
        checkVisual(w, s.scene);
        const all = [...forLevel(s.targets, level), ...forLevel(s.decoys ?? [], level)];
        if (!forLevel(s.targets, level).length) err(w, "keine Ziele");
        all.forEach((h) => { if (h.x - h.r < 0 || h.y - h.r < 0 || h.x + h.r > 800 || h.y + h.r > 600) err(w, `${h.id} ragt aus dem Bild`); });
        for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) {
          const d = Math.hypot(all[i].x - all[j].x, all[i].y - all[j].y);
          if (d < all[i].r + all[j].r) err(w, `${all[i].id} überlappt ${all[j].id}`);
        }
      }
    }
  }
}
Object.values(hoftagParts).forEach(check);
check(lessonActivity(spracheDerPferde));
for (const level of ["leicht", "mittel"] as Level[]) {
  const q = spracheDerPferde.quiz.filter((x) => !x.levels || x.levels.includes(level));
  if (q.length < 3) err("ra-p1-l1", `nur ${q.length} Quizfragen in ${level}`);
}
if (new Set(releases.map((r) => r.slug)).size !== releases.length) err("releases", "doppelte Slugs");
releases.forEach((r) => { const d = new Date(r.releaseAt); if (isNaN(+d) || d.getUTCDay() !== 5) err(r.slug, "Termin ist kein Freitag"); });
if (Object.keys(hoftagParts).join() !== HOFTAG_STEPS.map((s) => s.id).join()) err("hoftag", "Teile stimmen nicht mit HOFTAG_STEPS überein");
console.log(`Geprüft: ${Object.keys(hoftagParts).length} Hoftag-Teile, 1 Premium-Lektion, ${releases.length} Freitagsfolgen, ${hofjahrBadges.length} Abzeichen`);
console.log(errs.length ? errs.join("\n") : "Keine Fehler.");
process.exit(errs.length ? 1 : 0);
