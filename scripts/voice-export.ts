/**
 * Sprecherskript erzeugen: sammelt JEDEN Satz, den die App vorlesen kann.
 *
 *   npm run voice:export
 *
 * Ergebnis:
 *   voice/script.json          – maschinenlesbar (für voice:generate)
 *   voice/sprecherskript.csv   – für Menschen (Excel/Numbers, Semikolon-getrennt)
 *
 * Läuft mit der Bedingung "react-server", damit die Premium-Inhalte
 * (server-only) gelesen werden dürfen. Das Skript läuft nur lokal bzw.
 * im Build, nie im Browser.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { adventures, publishedAdventures } from "@/content/adventures";
import { loadAdventureContent } from "@/content/adventures/registry.server";
import { entdeckenActivity } from "@/content/games/entdecken";
import { games } from "@/content/games";
import { horses } from "@/content/horses";
import { site } from "@/content/site";
import { adventureStamps, freeStamps } from "@/content/stamps";
import { UI_SPEECH } from "@/content/ui-speech";
import { forLevel, LEVELS, pick, type Activity, type Level, type Step } from "@/engine/types";
import { normalizeSpeech, speechId } from "@/lib/voice/hash";
import { phrases } from "@/lib/voice/phrases";

type Entry = {
  id: string;
  text: string;
  /** "free" oder Slug des Premium-Abenteuers */
  access: string;
  area: string;
  level: string;
  direction: string;
};

const entries = new Map<string, Entry>();

const DIR = {
  story: "erzählend, warm, ruhiges Tempo",
  storyQuiet: "leise, geheimnisvoll – spannend, aber nicht gruselig",
  task: "freundlich und klar, langsam für Vorschulkinder",
  taskMittel: "freundlich, lebendig, gut verständlich",
  praise: "fröhlich, lobend, mit einem Lächeln",
  hint: "sanft und ermutigend – nie enttäuscht",
  label: "deutlich, neutral, kurz",
  ui: "einladend, freundlich",
};

function add(text: string | readonly string[], access: string, area: string, level: string, direction: string) {
  for (const raw of typeof text === "string" ? [text] : text) {
    const t = normalizeSpeech(raw);
    if (!t) continue;
    const id = speechId(t);
    const prev = entries.get(id);
    if (prev) {
      // Ein Satz, der auch in kostenlosen Inhalten vorkommt, ist frei abrufbar.
      if (access === "free") prev.access = "free";
      if (!prev.level.includes(level)) prev.level = prev.level ? `${prev.level}, ${level}` : level;
      continue;
    }
    entries.set(id, { id, text: t, access, area, level, direction });
  }
}

function walkStep(step: Step, lv: Level, access: string, area: string) {
  const task = lv === "leicht" ? DIR.task : DIR.taskMittel;
  switch (step.type) {
    case "story": {
      const t = pick(step.text, lv);
      add(t, access, area, lv, /flüster|leise|Nebel/i.test(t) ? DIR.storyQuiet : DIR.story);
      break;
    }
    case "hotspots": {
      const targets = forLevel(step.targets, lv);
      add(pick(step.prompt, lv), access, area, lv, task);
      add(step.missHint ?? phrases.missDefault, access, area, lv, DIR.hint);
      targets.forEach((t, i) => {
        add(t.say ? pick(t.say, lv) : phrases.found(t.label), access, area, lv, DIR.praise);
        if (step.mode === "sequence") {
          add(phrases.whereIs(t.label), access, area, lv, task);
          if (i > 0) add(phrases.andNowWhereIs(t.label), access, area, lv, task);
          add(phrases.thisIs(t.label), access, area, lv, DIR.hint);
          add(phrases.searchedIs(t.label), access, area, lv, DIR.hint);
          add(phrases.notHere(t.label), access, area, lv, DIR.hint);
        }
      });
      forLevel(step.decoys ?? [], lv).forEach((d) => add(d.say, access, area, lv, DIR.hint));
      break;
    }
    case "choice": {
      const options = forLevel(step.options, lv);
      add(pick(step.prompt, lv), access, area, lv, task);
      if (step.layout === "list") options.forEach((o) => add(phrases.optionLabel(o.label), access, area, lv, DIR.label));
      options.filter((o) => !o.correct).forEach((o) => add(o.feedback ?? phrases.tryAgain, access, area, lv, DIR.hint));
      add(pick(step.explain, lv), access, area, lv, DIR.praise);
      break;
    }
    case "match": {
      add(pick(step.prompt, lv), access, area, lv, task);
      forLevel(step.targets, lv).forEach((t) => add(t.label, access, area, lv, DIR.label));
      forLevel(step.items, lv).forEach((i) => {
        add(i.label, access, area, lv, DIR.label);
        add(i.say, access, area, lv, DIR.praise);
        add(i.wrong ?? [phrases.doesNotFit(i.label), phrases.tryOtherTask], access, area, lv, DIR.hint);
      });
      break;
    }
    case "code": {
      add(pick(step.prompt, lv), access, area, lv, task);
      step.digits.forEach((d, i) => {
        add(phrases.digitLabel(i), access, area, lv, DIR.label);
        add(pick(d.riddle, lv), access, area, lv, task);
        add(phrases.digitWrong(i), access, area, lv, DIR.hint);
        add(pick(d.hint, lv), access, area, lv, DIR.hint);
      });
      add(pick(step.success, lv), access, area, lv, DIR.praise);
      break;
    }
    case "cipher": {
      add(pick(step.prompt, lv), access, area, lv, task);
      add(phrases.cipherPick, access, area, lv, DIR.hint);
      new Set(step.message.replace(/\s/g, "").split("")).forEach((l) => add(phrases.cipherRight(l), access, area, lv, DIR.praise));
      // falscher Buchstabe = jede Taste im Schlüssel möglich
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach((l) => add([phrases.cipherWrong(l), pick(step.hint, lv)], access, area, lv, DIR.hint));
      add(pick(step.success, lv), access, area, lv, DIR.praise);
      break;
    }
  }
}

function walkActivity(a: Activity, access: string, area: string) {
  for (const { id: lv } of LEVELS) {
    add(pick(a.intro, lv), access, area, lv, lv === "leicht" ? DIR.task : DIR.taskMittel);
    forLevel(a.steps, lv).forEach((s) => walkStep(s, lv, access, area));
  }
}

/* ---------- Oberfläche ---------- */
Object.entries(UI_SPEECH)
  .filter(([key]) => key !== "tileListen" || site.features.audio) // Hörspiele sind ausgeblendet
  .forEach(([, t]) => add(t, "free", "Oberfläche", "alle", DIR.ui));
LEVELS.forEach((l) => add(phrases.level(l.label, l.ages), "free", "Oberfläche", "alle", DIR.ui));

/* ---------- Pferde ---------- */
add(phrases.horsesHeader(horses.map((h) => h.name)), "free", "Pferde", "alle", DIR.ui);
horses.forEach((h) => {
  add(h.intro, "free", `Pferd ${h.name}`, "alle", DIR.story);
  h.knowledge.forEach((k) => add(k, "free", `Pferd ${h.name}`, "alle", DIR.story));
  walkActivity(entdeckenActivity(h.slug, h.name), "free", `${h.name} entdecken`);
});

/* ---------- Lernspiele ---------- */
games.forEach((g) => {
  for (const { id: lv } of LEVELS) add(phrases.gameTile(g.title, pick(g.activity.intro, lv)), "free", "Spielen", lv, DIR.ui);
  walkActivity(g.activity, "free", g.title);
});

/* ---------- Stempel & Pass ---------- */
add([phrases.stampOwned, phrases.passIntro, phrases.passTap], "free", "Pass", "alle", DIR.ui);
freeStamps.forEach((s) => {
  add([phrases.stampTitle(s.title), s.how], "free", "Pass", "alle", DIR.label);
  add([phrases.newStamp(s.title), phrases.gameDone(s.title)], "free", "Pass", "alle", DIR.praise);
});
const totals = new Set<number>([freeStamps.length]);
let running = freeStamps.length;
publishedAdventures.forEach((a) => {
  running += adventureStamps(a.slug).length;
  totals.add(freeStamps.length + adventureStamps(a.slug).length);
  totals.add(running);
});
totals.forEach((total) => {
  for (let c = 0; c <= total; c++) add(phrases.passCount(c, total), "free", "Pass", "alle", DIR.ui);
});

/* ---------- Abenteuer ---------- */
publishedAdventures.forEach((meta) => {
  add(phrases.adventureLocked(meta.title, meta.teaser), "free", meta.title, "alle", DIR.ui);
  // Ab hier nur nach Kauf hörbar
  const slug = meta.access === "free" ? "free" : meta.slug;
  add(phrases.adventureHeader(meta.title, meta.teaser), slug, meta.title, "alle", DIR.ui);
  meta.missions.forEach((m, i) => {
    add(phrases.missionHeader(i + 1, m.title), slug, meta.title, "alle", DIR.ui);
    if (i > 0) add(phrases.missionDone(i + 1), slug, meta.title, "alle", DIR.praise);
  });
  add(phrases.caseSolved(meta.badge.title), slug, meta.title, "alle", DIR.praise);
  adventureStamps(meta.slug).forEach((s) => {
    add([phrases.stampTitle(s.title), s.how, phrases.newStamp(s.title)], slug, `${meta.title} – Abzeichen`, "alle", DIR.praise);
  });
  const content = loadAdventureContent(meta.slug);
  content?.missions.forEach((m, i) => walkActivity(m, slug, `${meta.title} – Mission ${i + 1}`));
});

if (adventures.some((a) => a.published && !loadAdventureContent(a.slug))) {
  console.warn("Hinweis: Für mindestens ein veröffentlichtes Abenteuer fehlen die Inhalte.");
}

/* ---------- Ausgabe ---------- */
const list = [...entries.values()];
const outDir = path.join(process.cwd(), "voice");
mkdirSync(outDir, { recursive: true });

writeFileSync(path.join(outDir, "script.json"), JSON.stringify({ version: 1, entries: list }, null, 2) + "\n");

const csvCell = (v: string) => `"${v.replace(/"/g, '""')}"`;
const fileOf = (e: Entry) => (e.access === "free" ? `public/voice/${e.id}.mp3` : `private/voice/${e.access}/${e.id}.mp3`);
const rows = [
  ["Kennung", "Bereich", "Stufe", "Zugang", "Regie", "Text", "Datei"],
  ...list.map((e) => [e.id, e.area, e.level, e.access === "free" ? "kostenlos" : `Premium: ${e.access}`, e.direction, e.text, fileOf(e)]),
];
// BOM + Semikolon, damit Excel (de) Umlaute und Spalten korrekt erkennt
writeFileSync(path.join(outDir, "sprecherskript.csv"), "﻿" + rows.map((r) => r.map(csvCell).join(";")).join("\r\n") + "\r\n");

const free = list.filter((e) => e.access === "free").length;
const chars = list.reduce((n, e) => n + e.text.length, 0);
console.log(`Sprecherskript: ${list.length} Sätze (${free} kostenlos, ${list.length - free} Premium), ${chars} Zeichen.`);
console.log("→ voice/sprecherskript.csv und voice/script.json");
