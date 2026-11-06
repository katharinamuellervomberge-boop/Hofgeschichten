/**
 * Prüft das Rider Lab: 5 Bereiche, 20 Übungen, max. 4 Schritte, gültige Animationen
 * mit Fehlervariante, und ob katalog.generated.ts noch zu den Daten passt.
 *
 *   npm run check:riderlab
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { referencedRiderLabIds, riderLabExerciseExists } from "../src/features/tagebuch/academyLinks";
import { buildRiderLabCatalogSource, checkRiderLab, RL_CATALOG_PATH } from "./riderlab-katalog-lib";

const errors = checkRiderLab();
const current = readFileSync(join(process.cwd(), RL_CATALOG_PATH), "utf8");
for (const id of referencedRiderLabIds) if (!riderLabExerciseExists(id)) errors.push(`Reitertagebuch verweist auf unbekannte Übung ${id}`);
if (current !== buildRiderLabCatalogSource()) errors.push(`${RL_CATALOG_PATH} ist veraltet – bitte \`npm run riderlab:katalog\` ausführen`);

if (errors.length) {
  console.error(`Rider Lab: ${errors.length} Fehler`);
  for (const e of errors) console.error(" – " + e);
  process.exit(1);
}
console.log("Rider Lab: 5 Bereiche, 20 Übungen – alles in Ordnung.");
