/**
 * Schreibt src/content/akademie/katalog-gross.generated.ts – die Übersicht der
 * Großen Akademie OHNE Lektionsinhalte (Titel, Bilder, Abzeichen, Lektions-IDs).
 * So kann der Browser die gesperrten Welten anzeigen, ohne die Inhalte zu bekommen.
 *
 *   npm run akademie:katalog        (nach jeder Änderung an Welten 4–8 oder den Spielen der Großen Akademie)
 *
 * `npm run check:akademie` meldet einen Fehler, wenn die Datei nicht mehr passt.
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { buildCatalogSource, CATALOG_PATH } from "./akademie-katalog-lib";

const target = join(process.cwd(), CATALOG_PATH);
writeFileSync(target, buildCatalogSource());
console.log(`Geschrieben: ${CATALOG_PATH}`);
