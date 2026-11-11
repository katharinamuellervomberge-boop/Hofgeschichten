/** Schreibt src/content/coach/katalog.generated.ts (Übungstitel ohne Inhalte) – `npm run coach:katalog` */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { buildCoachCatalogSource, COACH_CATALOG_PATH } from "./coach-katalog-lib";

writeFileSync(join(process.cwd(), COACH_CATALOG_PATH), buildCoachCatalogSource());
console.log(`${COACH_CATALOG_PATH} geschrieben.`);
