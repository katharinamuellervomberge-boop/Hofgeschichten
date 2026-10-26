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
  { slug: "leichttraben", title: "Leichttraben – so geht’s!", world: "trab-reiten", lesson: "leichttraben", seconds: 56, voiced: true },
  { slug: "richtiger-fuss", title: "Auf dem richtigen Fuß leichttraben", world: "trab-reiten", lesson: "richtiger-fuss", seconds: 51, voiced: true },
  { slug: "galopp-dreitakt", title: "Der Galopp im Dreitakt", world: "galopp-verstehen", lesson: "der-dreitakt", seconds: 51, voiced: true },
  { slug: "bahnfiguren", title: "Bahnfiguren in der Reitbahn", world: "reiten-in-der-bahn", lesson: "ganze-bahn-und-handwechsel", seconds: 66, voiced: true },
];

export function videoForLesson(world: string, lesson: string): AcademyVideo | undefined {
  return academyVideos.find((v) => v.world === world && v.lesson === lesson);
}

export function videoSrc(v: AcademyVideo) {
  return { video: `/api/akademie-video/${v.slug}.mp4`, poster: `/api/akademie-video/${v.slug}.jpg` };
}
