/**
 * Englisch: Oberflächentexte prüfen, die erst im Browser übersetzt werden (i18n/dom-translate.ts).
 *   npm run check:en-ui           → Fehler, wenn ein sichtbarer deutscher Text keine Übersetzung hat
 *   npm run check:en-ui -- riding → offene Texte eines Bereichs als „deutsch|“-Liste
 * Gefunden werden Texte in Vorlagen und JSX (scripts/en-ui-keys.ts). Ein Muster „{0} Text“ gilt als
 * übersetzt, wenn „Text“ allein übersetzt ist (dort steht im Browser ein Icon).
 */
import { textKey, type Dict } from "../src/i18n/translate";
import { uiKeys } from "./en-ui-keys";
import katalog from "../src/content/akademie/en/katalog.json";
import riding from "../src/features/tagebuch/riding/en.json";
import views from "../src/features/tagebuch/en-views.json";
import arena from "../src/features/arena/en.json";
import riderlab from "../src/features/riderlab/en.json";
import rlTitles from "../src/content/riderlab/en-titles.json";
import training from "../src/content/training/en.json";
import coach from "../src/content/coach/en.json";

type Pack = { exact: Dict; patterns: Record<string, string> };
const AREAS: { id: string; files: string[]; skipLines?: Record<string, number[]>; packs: Pack[]; extra?: Dict[] }[] = [
  {
    id: "riding",
    files: ["src/features/tagebuch/riding/engine.ts"],
    skipLines: { "src/features/tagebuch/riding/engine.ts": [17] }, // CSS
    packs: [riding, views],
    extra: [katalog, rlTitles, training, coach],
  },
  {
    id: "tagebuch",
    files: ["src/features/tagebuch/DiaryApp.tsx", "src/features/tagebuch/ui.tsx", "src/features/tagebuch/views/BackupPanel.tsx", "src/features/tagebuch/views/ProfileView.tsx", "src/features/tagebuch/views/MomentsView.tsx", "src/features/tagebuch/views/ReviewView.tsx", "src/features/tagebuch/stats.ts", "src/features/tagebuch/backup.ts"],
    packs: [views, riding],
  },
  {
    id: "reitbahn",
    files: ["src/features/arena/ArenaPlayer.tsx", "src/features/arena/ArenaView.tsx", "src/features/arena/RiderTop.tsx", "src/features/arena/SaveButton.tsx", "src/features/arena/ArenaExerciseScreen.tsx", "src/app/tagebuch/reitbahn/page.tsx", "src/content/arena/geometry.ts"],
    packs: [arena],
  },
  {
    id: "riderlab",
    files: ["src/features/riderlab/RiderLabScreens.tsx", "src/features/riderlab/Trainer.tsx", "src/features/riderlab/RiderLabTeaser.tsx", "src/features/riderlab/ExerciseAnimation.tsx", "src/features/riderlab/Figure.tsx", "src/content/riderlab/katalog.ts"],
    packs: [riderlab],
    extra: [rlTitles],
  },
];

/** Technische oder absichtlich deutsche Texte */
const IGNORE = new Set(["use client", "(prefers-reduced-motion: reduce)", "Rider Lab", "Riding Space", "Coach", "Rider Coach", "Training", "Timeline", "Status", "Start", "Phase", "Timing", "Dead Bug", "Glute Bridge March", "Wall Sit", "Riding Journal", "Training Management", "Pause", "Aha!", "Halt",
  // englische Texte in /en-Zweigen, Dateinamen, Tasten, Adressen
  "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "The Arena – Riding Space", "application/json,.json", "reitertagebuch-{0}.json", "reitertagebuch-{0}.json", "ArrowRight", "ArrowLeft", "/akademie#ak-buy",
]);

const arg = process.argv[2];
let missing = 0;
for (const a of AREAS) {
  const exact: Dict = Object.assign({}, ...(a.extra ?? []), ...a.packs.map((p) => p.exact));
  const patterns: Record<string, string> = Object.assign({}, ...a.packs.map((p) => p.patterns));
  const open: string[] = [];
  for (const f of a.files) {
    const r = uiKeys(f, { skipLines: a.skipLines?.[f] });
    for (const s of r.exact) if (!IGNORE.has(s) && exact[textKey(s)] === undefined) open.push(s);
    for (const p of r.patterns) {
      if (patterns[p] !== undefined || IGNORE.has(p) || /\}\{/.test(p)) continue; // nebeneinander stehende Platzhalter: Teile werden einzeln übersetzt
      const m = /^\{0\} (.+)$/.exec(p) ?? /^(.+) \{0\}$/.exec(p);
      if (m && (exact[textKey(m[1])] !== undefined || IGNORE.has(m[1]))) continue;
      if (/^(translate|rotate|scale)\(/.test(p)) continue;
      open.push(p);
    }
  }
  const uniq = [...new Set(open)];
  missing += uniq.length;
  if (arg && arg === a.id) console.log(uniq.map((s) => `${s}|`).join("\n"));
  else if (!arg) console.log(`${a.id.padEnd(10)} offen: ${uniq.length}${uniq.length ? "  z. B. " + uniq.slice(0, 5).join(" · ") : ""}`);
}
if (!arg) {
  console.log(missing ? `Englisch (Oberfläche): ${missing} Texte fehlen noch.` : "Englisch (Oberfläche): alles übersetzt.");
  if (missing) process.exit(1);
}
