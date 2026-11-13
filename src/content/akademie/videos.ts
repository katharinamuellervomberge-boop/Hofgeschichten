/**
 * Lernvideos der Großen Reitakademie (gerendert aus src/video, siehe docs/LERNVIDEOS.md).
 * Die Dateien liegen in private/akademie-video/ und werden nur nach Freischaltung
 * über /api/akademie-video/<slug>.mp4 ausgeliefert.
 */
export type AcademyVideo = {
  slug: string;
  title: string;
  /** Lernwelt und Lektion, in der das Video erscheint */
  world: string;
  lesson: string;
  /** Länge in Sekunden */
  seconds: number;
  /** true = mit Sprecherstimme vertont */
  voiced: boolean;
};

export const academyVideos: AcademyVideo[] = [
  { slug: "schritt-viertakt", title: "Der Schritt im Viertakt", world: "schritt-reiten", lesson: "der-viertakt", seconds: 38, voiced: true },
  { slug: "trab-zweitakt", title: "Der Trab im Zweitakt", world: "trab-reiten", lesson: "der-zweitakt", seconds: 42, voiced: true },
  { slug: "leichttraben-komplett", title: "Leichttraben komplett: warum, wie, treiben, richtiger Fuß", world: "trab-reiten", lesson: "leichttraben", seconds: 70, voiced: true },
  { slug: "richtiger-fuss", title: "Auf dem richtigen Fuß leichttraben", world: "trab-reiten", lesson: "richtiger-fuss", seconds: 51, voiced: true },
  { slug: "galopp-dreitakt", title: "Der Galopp im Dreitakt", world: "galopp-verstehen", lesson: "der-dreitakt", seconds: 51, voiced: true },
  { slug: "bahnfiguren", title: "Bahnfiguren in der Reitbahn", world: "reiten-in-der-bahn", lesson: "ganze-bahn-und-handwechsel", seconds: 66, voiced: true },
  // Neu 02.11.2026 – aus den Social-Media-Erklärvideos weiterentwickelt (src/video/lern)
  { slug: "pferd-lenken", title: "Wie lenkt man ein Pferd?", world: "schritt-reiten", lesson: "anreiten-lenken-anhalten", seconds: 37, voiced: true },
  { slug: "innen-aussen", title: "Innen und außen: innerer Schenkel, äußerer Zügel", world: "die-sprache-der-hilfen", lesson: "zusammenspiel", seconds: 47, voiced: true },
  { slug: "anreiten-durchparieren", title: "Anreiten und Durchparieren – halbe und ganze Parade", world: "galopp-verstehen", lesson: "balance-und-uebergaenge", seconds: 177, voiced: true },
  { slug: "leichter-sitz", title: "Der leichte Sitz im Galopp", world: "besser-reiten", lesson: "sicherer-im-sattel", seconds: 44, voiced: true },
  // Neu 13.11.2026 – Module 10–14, animiert (src/video/ausbau-videos.tsx). voiced: false = Untertitel, Ton folgt über „Lernvideos vertonen“
  { slug: "pferdeverdauung", title: "So funktioniert die Pferdeverdauung", world: "haltung-und-fuetterung", lesson: "verdauungssystem", seconds: 58, voiced: false },
  { slug: "raufutterbedarf", title: "Raufutterbedarf berechnen", world: "haltung-und-fuetterung", lesson: "wie-viel-futter", seconds: 52, voiced: false },
  { slug: "anweiden", title: "Pferde richtig anweiden", world: "haltung-und-fuetterung", lesson: "weide-anweiden-giftpflanzen", seconds: 45, voiced: false },
  { slug: "stallhaltung-vergleichen", title: "Stallhaltung vergleichen", world: "haltung-und-fuetterung", lesson: "haltungsformen", seconds: 44, voiced: false },
  { slug: "hufaufbau", title: "Hufaufbau animiert", world: "pferdegesundheit", lesson: "aufbau-des-hufs", seconds: 50, voiced: false },
  { slug: "pferdezaehne", title: "Pferdezähne verstehen", world: "pferdegesundheit", lesson: "pferdezaehne", seconds: 37, voiced: false },
  { slug: "stallapotheke", title: "Stallapotheke zusammenstellen", world: "pferdegesundheit", lesson: "stallapotheke", seconds: 36, voiced: false },
  { slug: "pferdeohren", title: "Pferdeohren und ihre Bedeutung", world: "pferdeverhalten", lesson: "koerpersprache-verstehen", seconds: 40, voiced: false },
  { slug: "herdenkommunikation", title: "Pferdekommunikation in der Herde", world: "pferdeverhalten", lesson: "herdenverhalten", seconds: 39, voiced: false },
  { slug: "warum-pferde-erschrecken", title: "Warum Pferde erschrecken", world: "pferdeverhalten", lesson: "wahrnehmung", seconds: 50, voiced: false },
  { slug: "koerpersprache-fuehren", title: "Körpersprache beim Führen", world: "pferdeverhalten", lesson: "koerpersprache-fuehren", seconds: 39, voiced: false },
  { slug: "ausbildungsskala", title: "Die Ausbildungsskala animiert", world: "reitlehre-advanced", lesson: "ausbildungsskala-im-detail", seconds: 34, voiced: false },
  { slug: "pferdebiomechanik", title: "Pferdebiomechanik verstehen", world: "reitlehre-advanced", lesson: "biomechanik", seconds: 48, voiced: false },
  { slug: "reiterposition", title: "Die korrekte Reiterposition", world: "reitlehre-advanced", lesson: "unabhaengiger-sitz", seconds: 34, voiced: false },
  { slug: "halbe-paraden", title: "Halbe Paraden erklärt", world: "reitlehre-advanced", lesson: "halbe-paraden", seconds: 47, voiced: false },
  { slug: "anlehnung", title: "Anlehnung verstehen", world: "reitlehre-advanced", lesson: "anlehnung-selbsthaltung", seconds: 36, voiced: false },
  { slug: "stellung-biegung", title: "Stellung vs. Biegung", world: "reitlehre-advanced", lesson: "stellung-und-biegung-verstehen", seconds: 46, voiced: false },
  { slug: "ueber-die-schulter", title: "Über die Schulter fallen", world: "reitlehre-advanced", lesson: "geraderichtung-schiefe", seconds: 45, voiced: false },
  { slug: "galopp-fussfolge", title: "Galopp-Fußfolge", world: "reitlehre-advanced", lesson: "galopp-fussfolge-biomechanik", seconds: 36, voiced: false },
  { slug: "richtig-angaloppieren", title: "Richtig angaloppieren", world: "reitlehre-advanced", lesson: "richtig-angaloppieren", seconds: 47, voiced: false },
  { slug: "galoppfehler", title: "Galoppfehler erkennen", world: "reitlehre-advanced", lesson: "galoppfehler", seconds: 47, voiced: false },
  { slug: "schenkelweichen-schulterherein", title: "Schenkelweichen vs. Schulterherein", world: "reitlehre-advanced", lesson: "seitengaenge-verstehen", seconds: 37, voiced: false },
  { slug: "galoppwechsel", title: "Galoppwechsel verstehen", world: "reitlehre-advanced", lesson: "galoppwechsel-verstehen", seconds: 35, voiced: false },
  { slug: "bergauf-bergab", title: "Sicher bergauf und bergab", world: "gelaende-ausreiten", lesson: "bergauf-bergab", seconds: 31, voiced: false },
  { slug: "erster-galopp-gelaende", title: "Der erste Galopp im Gelände", world: "gelaende-ausreiten", lesson: "traben-galoppieren-gelaende", seconds: 32, voiced: false },
  { slug: "gruppenregeln-ausreiten", title: "Gruppenregeln beim Ausreiten", world: "gelaende-ausreiten", lesson: "reiten-in-der-gruppe", seconds: 30, voiced: false },
  { slug: "gefahren-gelaende", title: "Gefahren im Gelände erkennen", world: "gelaende-ausreiten", lesson: "begegnungen-gelaende", seconds: 36, voiced: false },
  { slug: "nach-dem-reitunfall", title: "Verhalten nach einem Reitunfall", world: "gelaende-ausreiten", lesson: "unfaelle-notfaelle-ausritt", seconds: 32, voiced: false },
];

export function videoForLesson(world: string, lesson: string): AcademyVideo | undefined {
  return academyVideos.find((v) => v.world === world && v.lesson === lesson);
}

export function videoSrc(v: AcademyVideo) {
  return { video: `/api/akademie-video/${v.slug}.mp4`, poster: `/api/akademie-video/${v.slug}.jpg` };
}
