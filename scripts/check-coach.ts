/**
 * Prüft den Rider Coach: Daten, Verzweigungen (alle Antwortwege), Sicherheitsregeln,
 * Suche (Umgangssprache, Tippfehler) und ob katalog.generated.ts aktuell ist.
 *
 *   npm run check:coach
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { searchProblems } from "../src/content/coach/search";
import { allPaths, buildCoachCatalogSource, checkCoach, COACH_CATALOG_PATH } from "./coach-katalog-lib";
import { coachProblemData } from "../src/content/coach/probleme.server";

const errors = checkCoach();

/** Suchanfrage → erwartetes Problem an erster Stelle */
const SEARCH: [string, string][] = [
  ["Mein Pferd galoppiert nicht an.", "cp-05"],
  ["pferd springt nicht in galopp", "cp-05"],
  ["angalopieren klappt nie", "cp-05"],
  ["Ich verliere meine Steigbügel.", "cp-04"],
  ["steigbugel weg im trab", "cp-04"],
  ["bügl rutscht immer raus", "cp-04"],
  ["Ich kann nicht aussitzen.", "cp-01"],
  ["ich hüpfe im sattel beim traben", "cp-01"],
  ["aussizen", "cp-01"],
  ["Meine Hände sind unruhig.", "cp-08"],
  ["hände wackeln", "cp-08"],
  ["Mein Pferd läuft beim Aufsteigen los.", "cp-10"],
  ["pferd steht nicht still beim aufsitzen", "cp-10"],
  ["Mein Pferd fällt über die innere Schulter.", "cp-09"],
  ["zirkel wird immer kleiner", "cp-09"],
  ["Mein Pferd nimmt die Trense nicht an.", "cp-03"],
  ["macht maul nicht auf fürs gebiss", "cp-03"],
  ["Meine Ferse bleibt nicht tief.", "cp-02"],
  ["absätze gehen hoch", "cp-02"],
  ["Ich klemme mit den Knien.", "cp-07"],
  ["ich klammere mit den beinen", "cp-07"],
  ["mein pferd rennt im trab", "cp-06"],
  ["pferd wird immer schneller", "cp-06"],
];
for (const [q, want] of SEARCH) {
  const hits = searchProblems(q);
  if (hits[0]?.problem.id !== want) errors.push(`Suche „${q}“ → ${hits.map((h) => `${h.problem.id}(${h.score})`).join(", ") || "nichts"}, erwartet ${want}`);
}
for (const q of ["", "   ", "der die das", "xyzzy"]) if (searchProblems(q).length) errors.push(`Suche „${q}“ sollte nichts finden`);

const current = readFileSync(join(process.cwd(), COACH_CATALOG_PATH), "utf8");
if (current !== buildCoachCatalogSource()) errors.push(`${COACH_CATALOG_PATH} ist veraltet – bitte \`npm run coach:katalog\` ausführen`);

if (errors.length) {
  console.error(`Rider Coach: ${errors.length} Fehler`);
  for (const e of errors) console.error(" – " + e);
  process.exit(1);
}
const paths = coachProblemData.reduce((n, p) => n + allPaths(p).length, 0);
console.log(`Rider Coach: ${coachProblemData.length} Probleme, ${paths} Antwortwege, ${SEARCH.length} Suchtests – alles in Ordnung.`);
