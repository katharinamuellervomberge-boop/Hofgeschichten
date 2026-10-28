/**
 * Prüft die Inhalte der Reitakademie auf Vollständigkeit und logische Fehler.
 * Aufruf: npm run check:akademie
 *
 * Geprüft wird je Lektion und je Stufe (Leicht/Mittel):
 * – Einstieg, Erklärung, Bild, Übung, mind. 3 Quizfragen, Merksatz vorhanden
 * – jede Frage hat 3–4 Antworten, genau eine ist richtig
 * – jede falsche Antwort hat eine eigene Rückmeldung, jede Frage eine Erklärung
 * – Zuordnen: jede Karte hat ein vorhandenes Ziel, jedes Ziel mind. eine Karte
 * – Suchbild: Ziele liegen im Bild, überlappen nicht
 * – IDs sind eindeutig und folgen dem Schema ra-w<n>-l<m>
 * – keine Platzhalter-Wörter
 */
import { readFileSync } from "node:fs";
import { worlds as catalogWorlds, academyGames as catalogGames } from "../src/content/akademie";
import { allAcademyGames as academyGames, freeWorlds, fullWorlds as worlds } from "../src/content/akademie/inhalte.server";
import { buildCatalogSource, CATALOG_PATH } from "./akademie-katalog-lib";
import { academyModules, isTrialLesson } from "../src/content/akademie/module";
import { lessonActivity } from "../src/content/akademie/activity";
import { forLevel, pick, type Activity, type ByLevel, type Level, type Step } from "../src/engine/types";
import { RIDER_SCENES, SCENE_NAMES } from "../src/components/illustrations/akademie/scene-names";

const LEVELS: Level[] = ["leicht", "mittel"];
const errors: string[] = [];
const warn: string[] = [];
const err = (where: string, msg: string) => errors.push(`${where}: ${msg}`);
const PLACEHOLDER = /(lorem|platzhalter|todo|tbd|xxx|folgt\.)/i;

function text(v: ByLevel<string> | undefined, level: Level): string {
  return v === undefined ? "" : pick(v, level) ?? "";
}

function checkText(where: string, t: string) {
  if (!t || !t.trim()) err(where, "leerer Text");
  if (PLACEHOLDER.test(t)) err(where, `Platzhalter-Wort in „${t.slice(0, 50)}…“`);
}

function checkVisual(where: string, v: unknown) {
  const vis = v as { kind?: string; scene?: string } | undefined;
  if (vis?.kind === "scene" && vis.scene?.startsWith("ak-") && !SCENE_NAMES.includes(vis.scene)) err(where, `unbekannte Szene ${vis.scene}`);
}

function checkStep(where: string, s: Step, level: Level) {
  const w = `${where} [${s.id}/${level}]`;
  switch (s.type) {
    case "story":
      checkText(w, text(s.text, level));
      checkVisual(w, s.visual);
      break;
    case "choice": {
      const opts = forLevel(s.options, level);
      checkText(w + " Frage", text(s.prompt, level));
      checkText(w + " Erklärung", text(s.explain, level));
      if (text(s.explain, level).length < 28) err(w, `Rückmeldung zur richtigen Antwort zu knapp: „${text(s.explain, level)}“`);
      if (opts.length < 3 || opts.length > 4) err(w, `${opts.length} Antworten (erwartet 3–4)`);
      const right = opts.filter((o) => o.correct);
      if (right.length !== 1) err(w, `${right.length} richtige Antworten (erwartet genau 1)`);
      for (const o of opts) {
        checkText(w + ` Antwort ${o.id}`, o.label);
        if (!o.correct && !o.feedback) err(w, `Antwort „${o.label}“ ohne Rückmeldung`);
        checkVisual(w, o.visual);
      }
      const labels = opts.map((o) => o.label.toLowerCase());
      if (new Set(labels).size !== labels.length) err(w, "doppelte Antworttexte");
      checkVisual(w, s.visual);
      break;
    }
    case "multi": {
      const opts = forLevel(s.options, level);
      checkText(w, text(s.prompt, level));
      checkText(w, text(s.explain, level));
      checkText(w, text(s.missing, level));
      if (!opts.some((o) => o.correct)) err(w, "keine richtige Antwort");
      if (!opts.some((o) => !o.correct)) err(w, "keine falsche Antwort");
      for (const o of opts) if (!o.correct && !o.feedback) err(w, `Antwort „${o.label}“ ohne Rückmeldung`);
      break;
    }
    case "match": {
      const targets = forLevel(s.targets, level);
      const items = forLevel(s.items, level);
      checkText(w, text(s.prompt, level));
      if (items.length < 2) err(w, "weniger als 2 Karten");
      for (const i of items) {
        if (!targets.some((t) => t.id === i.target)) err(w, `Karte „${i.label}“ hat kein Ziel ${i.target}`);
        checkText(w + " Karte", i.say);
      }
      for (const t of targets) if (!items.some((i) => i.target === t.id)) err(w, `Ziel „${t.label}“ ohne Karte`);
      break;
    }
    case "hotspots": {
      const targets = forLevel(s.targets, level);
      checkText(w, text(s.prompt, level));
      checkVisual(w, s.scene);
      const sc = s.scene.kind === "scene" ? RIDER_SCENES[s.scene.scene] : undefined;
      if (sc?.zoom) err(w, "Suchbild nutzt eine Nahansicht – die Ziel-Koordinaten passen nur zur vollen Szene");
      if (!targets.length) err(w, "keine Ziele");
      for (const t of targets) {
        if (t.x - t.r < 0 || t.y - t.r < 0 || t.x + t.r > 800 || t.y + t.r > 600) err(w, `Ziel ${t.id} liegt außerhalb des Bildes`);
      }
      for (let a = 0; a < targets.length; a++)
        for (let b = a + 1; b < targets.length; b++) {
          const A = targets[a];
          const B = targets[b];
          if (Math.hypot(A.x - B.x, A.y - B.y) < Math.max(A.r, B.r)) err(w, `Ziele ${A.id} und ${B.id} überlappen zu stark`);
        }
      break;
    }
    default:
      break;
  }
}

function checkActivity(where: string, a: Activity) {
  const ids = a.steps.map((s) => s.id);
  if (new Set(ids).size !== ids.length) err(where, "doppelte Schritt-IDs");
  for (const level of LEVELS) {
    const steps = forLevel(a.steps, level);
    if (steps.length < 3) err(where, `nur ${steps.length} Schritte in Stufe ${level}`);
    for (const s of steps) checkStep(where, s, level);
  }
}

const lessonIds = new Set<string>();
let lessonCount = 0;
let questionCount = 0;

if (worlds.length < 8) err("Akademie", `${worlds.length} Lernwelten (erwartet mindestens 8)`);

worlds.forEach((world, wi) => {
  if (world.id !== `w${wi + 1}`) err(world.id, `Welt-ID sollte w${wi + 1} sein`);
  // Welten 1–8: je 5 Lektionen (Grundkurs); Ausbau-Welten ab 9: 4 bis 12 Lektionen
  if (wi < 8 ? world.lessons.length !== 5 : world.lessons.length < 4 || world.lessons.length > 12) err(world.id, `${world.lessons.length} Lektionen`);
  checkVisual(world.id, world.cover);
  const slugs = new Set<string>();
  world.lessons.forEach((l, li) => {
    lessonCount++;
    const where = `${l.id} „${l.title}“`;
    if (l.id !== `ra-w${wi + 1}-l${li + 1}`) err(where, "ID folgt nicht dem Schema");
    if (lessonIds.has(l.id)) err(where, "doppelte Lektions-ID");
    lessonIds.add(l.id);
    if (slugs.has(l.slug)) err(where, "doppelter Slug");
    slugs.add(l.slug);
    for (const level of LEVELS) {
      checkText(where + " Einstieg", text(l.intro, level));
      checkText(where + " Merksatz", text(l.merksatz, level));
      if (!l.explanation[level].length) err(where, `keine Erklärung in Stufe ${level}`);
      l.explanation[level].forEach((t) => checkText(where + " Erklärung", t));
      const quiz = forLevel(l.quiz, level);
      if (quiz.length < 3) err(where, `nur ${quiz.length} Quizfragen in Stufe ${level}`);
      questionCount += quiz.length;
      if (!forLevel(l.exercise, level).length) err(where, `keine Übung in Stufe ${level}`);
      if (level === "leicht") {
        const long = l.explanation.leicht.find((t) => t.length > 260);
        if (long) warn.push(`${where}: Erklärung in Leicht ist lang (${long.length} Zeichen)`);
      }
    }
    checkVisual(where, l.illustration);
    if (!l.audio || !("intro" in l.audio)) err(where, "Audio-Felder fehlen");
    checkActivity(where, lessonActivity(l));
  });
});

if (lessonCount < 40) err("Akademie", `${lessonCount} Lektionen (erwartet mindestens 40)`);

if (academyGames.length < 4) err("Spiele", `${academyGames.length} Spiele (erwartet mind. 4)`);
for (const g of academyGames) checkActivity(`Spiel ${g.id}`, g.activity);

/* ---------- Module (seit 28.10.2026) ---------- */
if (freeWorlds.length !== 3) err("Akademie", `${freeWorlds.length} Lernwelten 1–3 (erwartet 3)`);
{
  const seen = new Map<string, string>();
  for (const m of academyModules) {
    for (const t of m.topics) for (const id of t.lessons) {
      if (seen.has(id)) err("Module", `${id} steht in ${seen.get(id)} und ${m.id}`);
      seen.set(id, m.id);
      if (!worlds.some((w) => w.lessons.some((l) => l.id === id))) err("Module", `${m.id}: Lektion ${id} gibt es nicht`);
      for (const g of t.games ?? []) if (!academyGames.some((x) => x.slug === g)) err("Module", `${m.id}: Spiel ${g} gibt es nicht`);
    }
    if (!m.topics.some((t) => t.lessons.includes(m.trial))) err("Module", `${m.id}: Probelektion ${m.trial} gehört nicht zum Modul`);
  }
  for (const w of worlds) for (const l of w.lessons) if (!seen.has(l.id)) err("Module", `Lektion ${l.id} ist keinem Modul zugeordnet`);
  if (academyModules.length < 6) err("Module", `${academyModules.length} Module (erwartet mindestens 6)`);
}
if (readFileSync(CATALOG_PATH, "utf8") !== buildCatalogSource())
  err("Katalog", `${CATALOG_PATH} passt nicht mehr zu den Inhalten – bitte \`npm run akademie:katalog\` ausführen`);
if (catalogWorlds.map((w) => w.id).join() !== worlds.map((w) => w.id).join()) err("Katalog", "Reihenfolge der Lernwelten weicht ab");
if (catalogGames.length !== academyGames.length) err("Katalog", "Anzahl der Mini-Spiele weicht ab");
for (const w of catalogWorlds) {
  const full = worlds.find((x) => x.id === w.id);
  if (!full || full.lessons.map((l) => l.id).join() !== w.lessons.map((l) => l.id).join()) err("Katalog", `Lektionen von ${w.id} weichen ab`);
}

/* ---------- Lernvideos ---------- */
import { academyVideos } from "../src/content/akademie/videos";
import { existsSync } from "node:fs";
for (const v of academyVideos) {
  const w = worlds.find((x) => x.slug === v.world);
  if (!w || !w.lessons.some((l) => l.slug === v.lesson)) err("Video", `${v.slug}: Lektion ${v.world}/${v.lesson} gibt es nicht`);
  const l = w?.lessons.find((x) => x.slug === v.lesson);
  if (l && isTrialLesson(l.id)) err("Video", `${v.slug}: Videos gibt es nur in der gekauften Akademie, ${l.id} ist aber eine Probelektion`);
  for (const ext of ["mp4", "jpg"]) if (!existsSync(`private/akademie-video/${v.slug}.${ext}`)) err("Video", `private/akademie-video/${v.slug}.${ext} fehlt`);
}

console.log(`Reitakademie: ${worlds.length} Welten, ${lessonCount} Lektionen, ${questionCount} Quizfragen (beide Stufen zusammen), ${academyGames.length} Spiele.`);
if (warn.length) console.log(`\nHinweise (${warn.length}):\n- ` + warn.join("\n- "));
if (errors.length) {
  console.error(`\n${errors.length} Fehler:\n- ` + errors.join("\n- "));
  process.exit(1);
}
console.log("Alles in Ordnung.");
