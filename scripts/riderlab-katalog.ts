/**
 * Schreibt src/content/riderlab/katalog.generated.ts – die Übersicht des Rider Lab
 * OHNE Übungsinhalte. Nach jeder Änderung an src/content/riderlab/uebungen.server.ts ausführen:
 *
 *   npm run riderlab:katalog
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { buildRiderLabCatalogSource, RL_CATALOG_PATH } from "./riderlab-katalog-lib";

writeFileSync(join(process.cwd(), RL_CATALOG_PATH), buildRiderLabCatalogSource());
console.log(`Geschrieben: ${RL_CATALOG_PATH}`);
