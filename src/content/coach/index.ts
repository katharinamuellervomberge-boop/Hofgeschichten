import type { CoachCategory, CoachProblemInfo } from "./types";

/**
 * Rider Coach – öffentlicher Katalog (für Suche und Vorschau, auch ohne Kauf sichtbar).
 * Enthält KEINE Lösungsinhalte. Die stehen in probleme.server.ts.
 *
 * Neues Problem: hier eintragen (id, slug, Suchbegriffe) UND in probleme.server.ts anlegen,
 * dann `npm run check:coach`.
 */

export const COACH_TITLE = "Rider Coach";
export const COACH_QUESTION = "Was klappt beim Reiten gerade nicht?";
export const COACH_PLACEHOLDER = "Was möchtest du beim Reiten verbessern?";
export const coachHref = "/coach";
export const problemHref = (p: { slug: string }) => `/coach/${p.slug}`;
export const coachExerciseHref = (id: string) => `/coach/uebung/${id}`;

export const coachCategories: CoachCategory[] = [
  { id: "sitz", title: "Sitz und Balance", text: "Aussitzen, Bein, Knie, Steigbügel" },
  { id: "hilfen", title: "Hände und Hilfen", text: "Ruhige Hände, feine Zügelführung" },
  { id: "gangarten", title: "Gangarten und Linien", text: "Angaloppieren, Tempo, Zirkel" },
  { id: "umgang", title: "Vor dem Reiten", text: "Trensen, Aufsteigen" },
];

export const coachProblems: CoachProblemInfo[] = [
  {
    id: "cp-01",
    slug: "aussitzen",
    title: "Ich kann nicht aussitzen.",
    category: "sitz",
    teaser: "Du hüpfst im Sattel, wirst steif oder rutschst – statt ruhig mitzugehen.",
    terms: [
      "aussitzen", "aussitzen klappt nicht", "hüpfen", "hüpfe im sattel", "hopse", "hopsen", "springe im sattel", "fliege raus",
      "sitze unruhig im trab", "trab sitzen", "sitzen bleiben im trab", "durchgeschüttelt", "rücken tut weh beim aussitzen", "steif im trab",
      "becken mitgehen", "mitschwingen", "sitztrab", "aus sitzen",
    ],
  },
  {
    id: "cp-02",
    slug: "ferse-tief",
    title: "Meine Ferse bleibt nicht tief.",
    category: "sitz",
    teaser: "Die Ferse rutscht hoch, das Bein wird kurz oder du drückst krampfhaft nach unten.",
    terms: [
      "ferse", "fersen tief", "absatz", "absätze", "absatz tief", "hacke", "hacken", "zehenspitzen", "ferse rutscht hoch",
      "ferse geht hoch", "fuß rutscht", "bein rutscht hoch", "bein zu kurz", "langes bein", "sprunggelenk",
    ],
  },
  {
    id: "cp-03",
    slug: "trense",
    title: "Mein Pferd nimmt die Trense nicht an.",
    category: "umgang",
    teaser: "Kopf hoch, Maul zu, Ausweichen beim Trensen – oft steckt mehr dahinter als Ungehorsam.",
    terms: [
      "trense", "trensen", "auftrensen", "gebiss", "gebiss nehmen", "maul auf", "maul zu", "kopf hoch beim trensen", "zaum", "zäumen",
      "trense anziehen", "kopf weg", "nimmt gebiss nicht", "trensen geht nicht", "kopfscheu",
    ],
  },
  {
    id: "cp-04",
    slug: "steigbuegel",
    title: "Ich verliere ständig meine Steigbügel.",
    category: "sitz",
    teaser: "Im Trab oder Galopp rutscht der Fuß raus und du musst den Bügel suchen.",
    terms: [
      "steigbügel", "bügel", "bügel verlieren", "steigbügel verlieren", "bügel rutscht", "fuß rutscht raus", "bügel weg",
      "steigbuegel", "steigbügl", "bügel suchen", "fuß aus dem bügel", "bügel fallen", "bügellänge",
    ],
    demo: true,
  },
  {
    id: "cp-05",
    slug: "angaloppieren",
    title: "Mein Pferd galoppiert nicht an.",
    category: "gangarten",
    teaser: "Statt anzugaloppieren trabt dein Pferd schneller, springt falsch an oder fällt gleich zurück.",
    terms: [
      "galopp", "angaloppieren", "angalopieren", "galoppieren", "galoppiert nicht", "galoppiert nicht an", "springt nicht an",
      "kein galopp", "galopp klappt nicht", "trabt schneller statt galopp", "falscher galopp", "falsch angesprungen",
      "kreuzgalopp", "galopphilfe", "galoppeinsatz", "angallopieren",
    ],
  },
  {
    id: "cp-06",
    slug: "trab-schneller",
    title: "Mein Pferd wird im Trab immer schneller.",
    category: "gangarten",
    teaser: "Dein Pferd eilt, wird flach und lässt sich schwer wieder einfangen.",
    terms: [
      "schneller", "immer schneller", "eilt", "eilig", "rennt", "rennen", "zieht", "zieht weg", "zu schnell", "tempo",
      "trab zu schnell", "läuft weg", "nicht bremsen", "bremsen", "rast", "gas", "durchgehen", "tempokontrolle",
    ],
  },
  {
    id: "cp-07",
    slug: "knie-klemmen",
    title: "Ich klemme mit den Knien.",
    category: "sitz",
    teaser: "Knie und Oberschenkel halten fest – das Bein wird kurz und unruhig.",
    terms: [
      "knie", "knie klemmen", "klemmen", "klammern", "festhalten mit den beinen", "oberschenkel fest", "knie hoch", "knie rutscht hoch",
      "beine zusammendrücken", "knieschluss", "klammer", "verkrampft beine", "angespannte beine",
    ],
  },
  {
    id: "cp-08",
    slug: "unruhige-haende",
    title: "Meine Hände sind unruhig.",
    category: "hilfen",
    teaser: "Die Hände wackeln, springen mit oder ziehen – und das Pferd spürt jede Bewegung im Maul.",
    terms: [
      "hände", "hand", "unruhige hände", "hände wackeln", "hände hüpfen", "zügel", "zügelhand", "ruhige hand", "ziehe am zügel",
      "zügel ziehen", "hände springen", "arme steif", "ellbogen", "zügelführung", "hände still halten",
    ],
  },
  {
    id: "cp-09",
    slug: "zirkel-nach-innen",
    title: "Mein Pferd fällt auf dem Zirkel nach innen.",
    category: "gangarten",
    teaser: "Der Zirkel wird kleiner, das Pferd drängt über die innere Schulter.",
    terms: [
      "zirkel", "zirkel wird kleiner", "nach innen", "fällt nach innen", "innere schulter", "schulter", "drängt nach innen",
      "kreis", "runde wird kleiner", "volte", "wendung", "über die schulter", "kippt nach innen", "zirkel eiert",
    ],
  },
  {
    id: "cp-10",
    slug: "aufsteigen",
    title: "Mein Pferd bleibt beim Aufsteigen nicht stehen.",
    category: "umgang",
    teaser: "Dein Pferd läuft los, tritt weg oder dreht sich, sobald du aufsteigen willst.",
    terms: [
      "aufsteigen", "aufsitzen", "läuft los", "läuft beim aufsteigen los", "steht nicht still", "stehen bleiben", "geht weg",
      "tritt weg", "dreht sich weg", "aufsteigehilfe", "aufstieghilfe", "aufstieg", "rennt los beim aufsteigen", "zappelt",
    ],
  },
];

export const getProblemInfo = (slug: string) => coachProblems.find((p) => p.slug === slug);
export const problemInfoById = (id: string) => coachProblems.find((p) => p.id === id);
export const demoProblem = coachProblems.find((p) => p.demo)!;

/** Beispiele unter dem Suchfeld */
export const coachExamples = ["cp-05", "cp-04", "cp-01", "cp-08", "cp-10", "cp-09", "cp-03"]
  .map((id) => problemInfoById(id))
  .filter((p): p is CoachProblemInfo => !!p);
