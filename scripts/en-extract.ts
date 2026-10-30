/**
 * Englische Version der Reitakademie: offene Übersetzungen finden.
 *   npm run en:extract            → Übersicht je Bereich
 *   npm run en:extract -- w3      → offene Texte von Welt 3 als JSON { schlüssel: deutsch }
 *   npm run check:en              → Fehler, wenn noch etwas fehlt
 * Die Übersetzungen stehen in src/content/akademie/en/*.json (Schlüssel = textKey(deutscher Text)).
 * Texte aus katalog.json gelten auch in den Lernwelten und Spielen.
 */
import { collectTexts, textKey, type Dict } from "../src/i18n/translate";
import { enSources } from "./en-sources";
import katalog from "../src/content/akademie/en/katalog.json";

const arg = process.argv[2];
const check = arg === "--check";
let missing = 0;
for (const src of enSources()) {
  const shared: Dict = src.id === "katalog" ? {} : (katalog as Dict);
  const all = collectTexts(src.data);
  const open = all.filter((s) => src.dict[textKey(s)] === undefined && shared[textKey(s)] === undefined);
  missing += open.length;
  if (arg && !check) {
    if (src.id !== arg) continue;
    const out: Record<string, string> = {};
    for (const s of open) out[textKey(s)] = s;
    console.log(JSON.stringify(out, null, 1));
  } else console.log(`${src.id.padEnd(10)} ${String(all.length).padStart(4)} Texte, offen: ${open.length}`);
}
if (check) {
  console.log(missing ? `Englisch: ${missing} Texte fehlen noch.` : "Englisch: alles übersetzt.");
  if (missing) process.exit(1);
}
