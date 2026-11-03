/**
 * Prüft den Adventskalender „Das Geheimnis des Winterhofs“.
 * Aufruf: npm run check:advent
 *
 *  - 24 Türchen, Tag 1–24 lückenlos, Titel wie im Auftrag
 *  - jedes Kapitel vollständig (ca. 150–250 Wörter), keine Platzhalter
 *  - jedes Spiel lösbar (richtige Antworten vorhanden, Codes/Geheimschrift gültig)
 *  - Bilder und Szenen existieren, Fundstück und Belohnung vorhanden
 *  - Dekorationen: Plätze gültig, jedes Ziel erreichbar
 *  - Datumslogik (Europe/Berlin): 30.11., 1.12., 6.12., 24.12., 1.1., 31.1., Sommer 2027
 */
import { ADVENT_DOORS } from "../src/content/advent/doors.server";
import { adventState, isDoorOpenByDate, parseTestDate } from "../src/content/advent/schedule";
import { CARD_AREAS, DECOS, FULL_STALL, STALL_SLOTS } from "../src/content/advent/decor";
import { forLevel, pick, type Level, type Step, type Visual } from "../src/engine/types";
import * as fs from "node:fs";

const itemsSrc = fs.readFileSync("src/components/illustrations/ItemIcons.tsx", "utf8");
const akSrc = fs.readFileSync("src/components/illustrations/akademie/AkIcons.tsx", "utf8");
const sceneSrc = fs.readFileSync("src/engine/VisualView.tsx", "utf8");
const errs: string[] = [];
const err = (w: string, m: string) => errs.push(`${w}: ${m}`);
const PH = /(lorem|platzhalter|todo|tbd|xxx|folgt noch)/i;

const TITLES = [
  "Der geheimnisvolle Brief", "Tivolis Kuschelfell", "Krümels verschwundene Mütze", "Die große Putz-Challenge",
  "Tonga und die Winterweide", "Nikolaus im Stall", "Das richtige Sattelzeug", "Wilhelms alte Stallkarte",
  "Der Weihnachtskranz", "Scrabbles Wintertag", "Die geheimnisvollen Hufspuren", "Ein Tag mit Tilda",
  "Das verschwundene Halfter", "Die Pferdesprache", "Der Weihnachtsstall", "Leas großes Pferdequiz",
  "Das Rätsel der alten Sattelkammer", "Krümels Weihnachtsmission", "Die richtige Winterpflege", "Ein Geschenk für Tivoli",
  "Die verlorenen Hufeisen", "Die Lichter am Hof", "Der letzte Hinweis", "Weihnachten bei Hofgeschichten",
];

function checkVisual(w: string, v: Visual | undefined) {
  if (!v) return;
  if (v.kind === "item" && !new RegExp(`\\| "${v.name}"`).test(itemsSrc) && !akSrc.includes(`"${v.name}"`)) err(w, `unbekanntes Item ${v.name}`);
  if (v.kind === "scene" && !sceneSrc.includes(`"${v.scene}":`) && !new RegExp(`\\n\\s+${v.scene}:`).test(sceneSrc)) err(w, `unbekannte Szene ${v.scene}`);
}
function text(w: string, s: unknown) {
  const t = String(s ?? "");
  if (!t.trim()) err(w, "leerer Text");
  if (PH.test(t)) err(w, `Platzhalter-Wort: ${t.slice(0, 40)}`);
}

function checkStep(w: string, s: Step, level: Level) {
  if ("prompt" in s) text(w, pick((s as unknown as { prompt: string }).prompt, level));
  switch (s.type) {
    case "story":
      text(w, pick(s.text, level));
      checkVisual(w, s.visual);
      break;
    case "choice":
      checkVisual(w, s.visual);
      if (forLevel(s.options, level).filter((o) => o.correct).length !== 1) err(w, "Quiz braucht genau eine richtige Antwort");
      for (const o of s.options) { text(w, o.label); checkVisual(w, o.visual); if (!o.correct && !o.feedback) err(w, `falsche Antwort ohne Rückmeldung: ${o.label}`); }
      text(w, pick(s.explain, level));
      break;
    case "multi":
      if (!s.options.some((o) => o.correct)) err(w, "keine richtige Antwort");
      for (const o of s.options) { checkVisual(w, o.visual); if (!o.correct && !o.feedback) err(w, `ohne Rückmeldung: ${o.label}`); }
      break;
    case "match": {
      const t = new Set(s.targets.map((x) => x.id));
      for (const i of s.items) { if (!t.has(i.target)) err(w, `Ziel fehlt: ${i.target}`); checkVisual(w, i.visual); text(w, i.say); }
      for (const id of t) if (!s.items.some((i) => i.target === id)) err(w, `Ziel ohne Teil: ${id}`);
      break;
    }
    case "hotspots":
      checkVisual(w, s.scene);
      if (!s.targets.length) err(w, "keine Ziele");
      for (const a of s.targets) for (const b of [...s.targets, ...(s.decoys ?? [])])
        if (a !== b && Math.hypot(a.x - b.x, a.y - b.y) < Math.max(a.r, b.r)) err(w, `Ziele überlappen: ${a.id}/${b.id}`);
      break;
    case "code":
      for (const d of s.digits) { const a = pick(d.answer, level); if (!Number.isInteger(a) || a < 0 || a > 9) err(w, `Code-Ziffer ungültig: ${a}`); text(w, pick(d.hint, level)); }
      break;
    case "cipher":
      if (!/^[A-Z ]+$/.test(s.message)) err(w, `Geheimschrift nur A–Z: ${s.message}`);
      break;
  }
}

/* ---------- Türchen ---------- */
if (ADVENT_DOORS.length !== 24) err("Kalender", `${ADVENT_DOORS.length} statt 24 Türchen`);
const decoIds = new Set(DECOS.map((d) => d.id));
const slotIds = new Set(STALL_SLOTS.map((s) => s.id));
const words: number[] = [];

ADVENT_DOORS.forEach((d, i) => {
  const w = `Türchen ${d.day}`;
  if (d.day !== i + 1) err(w, "Reihenfolge/Nummer stimmt nicht");
  if (d.title !== TITLES[i]) err(w, `Titel „${d.title}“ ≠ „${TITLES[i]}“`);
  checkVisual(`${w}/kapitel`, { kind: "scene", scene: d.chapter.scene });
  const n = d.chapter.paragraphs.join(" ").split(/\s+/).filter(Boolean).length;
  words.push(n);
  if (n < 150 || n > 260) err(w, `Kapitel hat ${n} Wörter (Ziel 150–250)`);
  d.chapter.paragraphs.forEach((p) => text(`${w}/kapitel`, p));
  if (!d.parts.length) err(w, "keine Interaktion");
  const ids = new Set<string>();
  for (const part of d.parts) {
    text(`${w}/teil`, part.title);
    if (part.kind === "steps") {
      for (const s of part.steps) {
        if (ids.has(s.id)) err(w, `doppelte Schritt-ID ${s.id}`);
        ids.add(s.id);
        for (const level of ["leicht", "mittel"] as Level[]) checkStep(`${w}/${s.id}`, s, level);
      }
    }
    if (part.kind === "decorate") {
      for (const r of part.goal.required) {
        const deco = DECOS.find((x) => x.id === r);
        if (!deco) err(w, `Deko fehlt: ${r}`);
        else if (deco.day > d.day) err(w, `Deko ${r} erst ab Tag ${deco.day}`);
      }
      const available = new Set(DECOS.filter((x) => x.day <= d.day).map((x) => x.slot));
      if ((part.goal.minPlaced ?? 0) > available.size) err(w, "Mindestanzahl Plätze nicht erreichbar");
    }
    if (part.kind === "surprise" && part.boxes.length < 2) err(w, "Überraschung braucht mehrere Kästchen");
  }
  text(`${w}/belohnung`, d.reward.message);
  text(`${w}/fundstück`, d.reward.found.title);
  if (d.day < 24) text(`${w}/teaser`, d.teaser);
});

/* ---------- Dekorationen ---------- */
for (const deco of DECOS) {
  if (!slotIds.has(deco.slot)) err(`Deko ${deco.id}`, `unbekannter Platz ${deco.slot}`);
  if (deco.day < 9) err(`Deko ${deco.id}`, "vor dem 9. Dezember (erste Stall-Deko) freigeschaltet");
}
for (const [slot, id] of Object.entries(FULL_STALL)) if (!slotIds.has(slot) || !decoIds.has(id)) err("Finale-Stall", `${slot}/${id}`);
if (decoIds.size !== DECOS.length) err("Deko", "doppelte IDs");
if (CARD_AREAS.some((a) => a.options.length < 2)) err("Karte", "zu wenig Auswahl");

/* ---------- Datum (Europe/Berlin) ---------- */
const at = (iso: string) => new Date(iso);
const expect = (label: string, got: unknown, want: unknown) => {
  if (JSON.stringify(got) !== JSON.stringify(want)) err(`Datum ${label}`, `${JSON.stringify(got)} statt ${JSON.stringify(want)}`);
};
expect("30.11. 23:59 MEZ", adventState(at("2026-11-30T22:59:00Z")).phase, "before");
expect("30.11. Countdown", adventState(at("2026-11-30T10:00:00Z")).daysUntilStart, 1);
expect("1.12. 00:00 MEZ", adventState(at("2026-11-30T23:00:00Z")).unlocked, 1);
expect("1.12. Tür 2 zu", isDoorOpenByDate(2, at("2026-12-01T12:00:00Z")), false);
expect("6.12.", adventState(at("2026-12-06T08:00:00Z")).unlocked, 6);
expect("6.12. heute", adventState(at("2026-12-06T08:00:00Z")).today, 6);
expect("6.12. Tür 7 zu", isDoorOpenByDate(7, at("2026-12-06T22:59:00Z")), false);
expect("7.12. 00:00 MEZ", isDoorOpenByDate(7, at("2026-12-06T23:00:00Z")), true);
expect("24.12.", adventState(at("2026-12-24T15:00:00Z")).unlocked, 24);
expect("24.12. Phase", adventState(at("2026-12-24T15:00:00Z")).phase, "running");
expect("25.12.", adventState(at("2026-12-25T10:00:00Z")).phase, "after");
expect("1.1.2027", adventState(at("2027-01-01T10:00:00Z")).unlocked, 24);
expect("31.1.2027", isDoorOpenByDate(24, at("2027-01-31T22:00:00Z")), true);
expect("Sommer 2027", adventState(at("2027-07-01T10:00:00Z")).unlocked, 24);
expect("Tür 0/25", [isDoorOpenByDate(0, at("2027-01-01T10:00:00Z")), isDoorOpenByDate(25, at("2027-01-01T10:00:00Z"))], [false, false]);
expect("Testdatum", parseTestDate("2026-12-06") && adventState(parseTestDate("2026-12-06")!).unlocked, 6);
expect("Testdatum ungültig", parseTestDate("6.12."), null);

console.log(`Adventskalender: ${ADVENT_DOORS.length} Türchen, Kapitel ${Math.min(...words)}–${Math.max(...words)} Wörter (Ø ${Math.round(words.reduce((a, b) => a + b, 0) / words.length)}), ${DECOS.length} Dekorationen.`);
if (errs.length) {
  console.error(errs.map((e) => `✗ ${e}`).join("\n"));
  process.exit(1);
}
console.log("✓ Alles geprüft.");
