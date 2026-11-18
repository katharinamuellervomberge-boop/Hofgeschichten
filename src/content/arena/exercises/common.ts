import type { Explanation, Mistake, Phase, PhaseKind, Rein } from "../types";

/**
 * Gemeinsame Bausteine für Phasen der Bahnfiguren (Welle 1, 18.11.2026).
 * Formuliert nach klassischer deutscher Reitlehre (FN); Texte sagen innen/außen,
 * Buchstaben in [ ] werden beim Spiegeln ersetzt.
 */

type Base = { id: string; from: number; to: number; title: string; summary: string; pause?: boolean; hand?: Rein; extra?: Explanation[]; mistakes?: string[] };

const STRAIGHT_EXPLAIN: Explanation = {
  evidence: "lehre",
  text: "Auf geraden Linien ist das Pferd geradegerichtet: Die Hinterhufe folgen den Vorderhufen, es gibt keine Biegung. „Innen“ meint hier nur die Seite zur Bahnmitte – deshalb zeigt die Zeichnung links und rechts.",
};

/** Geradeaus auf dem Hufschlag oder einer Bahnlinie */
export function straight(o: Base & { look: string }): Phase {
  return {
    id: o.id,
    kind: "halten",
    title: o.title,
    timelineStart: o.from,
    timelineEnd: o.to,
    bend: "keine",
    hand: o.hand,
    gait: "trab",
    pause: o.pause,
    summary: o.summary,
    highlightedAids: ["blick", "sitz"],
    aids: {
      blick: { state: "aktiv", text: o.look },
      oberkoerper: { state: "neutral", text: "Schultern über den Hüften, parallel zu den Schultern des Pferdes." },
      sitz: { state: "begleitend", text: "Aufrecht und locker im Takt mitschwingen." },
      gewicht: { state: "neutral", text: "Beide Gesäßknochen gleichmäßig belastet." },
      innenSchenkel: { state: "begleitend", text: "Beide Schenkel liegen am Gurt und halten das Pferd im Takt fleißig." },
      aussenSchenkel: { state: "begleitend", text: "Beide Schenkel liegen am Gurt und halten das Pferd im Takt fleißig." },
      innenZuegel: { state: "begleitend", text: "Gleichmäßige, weiche Verbindung auf beiden Zügeln." },
      aussenZuegel: { state: "begleitend", text: "Gleichmäßige, weiche Verbindung auf beiden Zügeln." },
    },
    explanations: [STRAIGHT_EXPLAIN, ...(o.extra ?? [])],
    commonMistakeIds: o.mistakes ?? [],
  };
}

/** Einleiten einer Wendung (Ecke, Volte, Bogen): Stellung, Blick, Gewicht, beide Schenkel */
export function turnIn(o: Base & { bend: "links" | "rechts"; look: string; kind?: PhaseKind }): Phase {
  return {
    id: o.id,
    kind: o.kind ?? "einleiten",
    title: o.title,
    timelineStart: o.from,
    timelineEnd: o.to,
    bend: o.bend,
    hand: o.hand,
    gait: "trab",
    pause: o.pause,
    summary: o.summary,
    highlightedAids: ["blick", "innenSchenkel", "innenZuegel", "aussenZuegel"],
    aids: {
      blick: { state: "aktiv", text: o.look },
      oberkoerper: { state: "aktiv", text: "Die Schultern drehen leicht mit und bleiben parallel zu den Schultern des Pferdes, die Hüften parallel zu seinen Hüften." },
      sitz: { state: "aktiv", text: "Vorher eine halbe Parade: kurz tiefer sitzen, dann wieder weich mitschwingen." },
      gewicht: { state: "aktiv", text: "Den inneren Gesäßknochen etwas mehr belasten, indem inneres Knie und innerer Absatz tiefer werden. Nicht in der Hüfte einknicken." },
      innenSchenkel: { state: "aktiv", text: "Am Gurt, im Takt treibend. Er hält das Pferd fleißig und ist der Bezugspunkt für die Biegung." },
      aussenSchenkel: { state: "verwahrend", text: "Eine Handbreit hinter dem Gurt. Er passt auf, dass die Hinterhand nicht nach außen ausweicht." },
      innenZuegel: { state: "aktiv", text: "Fragt mit leichtem Eindrehen der Hand nach Stellung, bis du das innere Auge ahnst – dann wieder leichter werden." },
      aussenZuegel: { state: "verwahrend", text: "Bleibt in gleichmäßiger Verbindung, lässt die Stellung zu, begrenzt sie und führt die äußere Schulter mit herum." },
    },
    explanations: [
      { evidence: "lehre", text: "Auf gebogenen Linien wird das Pferd so gebogen, dass die Hinterhufe in die Spur der Vorderhufe treten. Die Wendung beginnt mit Blick und Gewicht, die Zügel begleiten nur." },
      ...(o.extra ?? []),
    ],
    commonMistakeIds: o.mistakes ?? ["zug", "knick"],
  };
}

/** Auf der gebogenen Linie bleiben: Hilfen werden leiser */
export function turnHold(o: Base & { bend: "links" | "rechts"; look: string }): Phase {
  return {
    id: o.id,
    kind: "halten",
    title: o.title,
    timelineStart: o.from,
    timelineEnd: o.to,
    bend: o.bend,
    hand: o.hand,
    gait: "trab",
    pause: o.pause,
    summary: o.summary,
    highlightedAids: ["innenSchenkel", "innenZuegel", "aussenZuegel"],
    aids: {
      blick: { state: "aktiv", text: o.look },
      oberkoerper: { state: "begleitend", text: "Schultern bleiben mitgedreht, beide Schultern auf gleicher Höhe." },
      sitz: { state: "begleitend", text: "Gleichmäßig im Takt mitschwingen." },
      gewicht: { state: "begleitend", text: "Leicht innen, ohne nach innen zu kippen." },
      innenSchenkel: { state: "aktiv", text: "Im Takt am Gurt – kurz einsetzen, dann wieder nur anliegen lassen. Kein Dauerdruck." },
      aussenSchenkel: { state: "verwahrend", text: "Liegt ruhig hinter dem Gurt und wird nur aktiv, wenn die Hinterhand nach außen drängt." },
      innenZuegel: { state: "nachgebend", text: "Gibt immer wieder ein wenig nach, damit die Stellung nicht festgehalten wird." },
      aussenZuegel: { state: "verwahrend", text: "Gleichmäßig und elastisch. Er hält Tempo und Linie, ohne zu ziehen." },
    },
    explanations: [
      { evidence: "lehre", text: "Der äußere Zügel ist der verwahrende Zügel: Er begrenzt Stellung und Tempo. Der innere Zügel stellt und gibt nach." },
      ...(o.extra ?? []),
    ],
    commonMistakeIds: o.mistakes ?? ["innen", "aussen"],
  };
}

/** Umstellen: alte Biegung aufgeben, kurz gerade, neue Biegung anfragen */
export function change(o: Base & { nextBend: "links" | "rechts"; look: string }): Phase {
  return {
    id: o.id,
    kind: "einleiten",
    title: o.title,
    timelineStart: o.from,
    timelineEnd: o.to,
    bend: "wechsel",
    nextBend: o.nextBend,
    hand: o.hand,
    gait: "trab",
    pause: o.pause,
    summary: o.summary,
    highlightedAids: ["sitz", "innenSchenkel", "aussenSchenkel", "innenZuegel"],
    aids: {
      blick: { state: "aktiv", text: o.look },
      oberkoerper: { state: "aktiv", text: "Die Schultern drehen langsam in die neue Richtung mit – ohne Ruck." },
      sitz: { state: "aktiv", text: "Eine halbe Parade kündigt das Umstellen an. Ein, zwei Tritte geradeaus, dann die neue Seite." },
      gewicht: { state: "aktiv", text: "Das Gewicht wandert auf den neuen inneren Gesäßknochen – über Knie und Absatz, nicht über die Hüfte." },
      innenSchenkel: { state: "aktiv", text: "Der bisher äußere Schenkel kommt nach vorn an den Gurt und wird zum neuen inneren Schenkel." },
      aussenSchenkel: { state: "verwahrend", text: "Der bisher innere Schenkel geht eine Handbreit zurück und verwahrt jetzt die Hinterhand." },
      innenZuegel: { state: "aktiv", text: "Der neue innere Zügel fragt nach der neuen Stellung, nachdem der alte innere Zügel nachgegeben hat." },
      aussenZuegel: { state: "verwahrend", text: "Der neue äußere Zügel gibt so viel nach, dass die neue Stellung möglich wird, und bleibt dann in Verbindung." },
    },
    explanations: [
      { evidence: "lehre", text: "Beim Umstellen wird erst die alte Stellung aufgegeben, das Pferd ist kurz gerade, dann folgt die neue Stellung und Biegung. Alle Hilfen tauschen gemeinsam die Seite." },
      { evidence: "vereinfachung", text: "„Erst gerade, dann neu“ ist eine Merkhilfe. Bei geübten Pferden geht das Umstellen fließend über wenige Tritte." },
      ...(o.extra ?? []),
    ],
    commonMistakeIds: o.mistakes ?? ["umstellen"],
  };
}

/** Häufige Fehler, die viele Figuren teilen */
export const MISTAKES: Record<string, Mistake> = {
  innen: {
    id: "innen",
    title: "Das Pferd fällt nach innen",
    notice: "Die Linie wird enger, das Pferd drängt mit der inneren Schulter nach innen.",
    factors: ["Der innere Schenkel wirkt nicht oder zu selten", "Dein Blick wandert nach innen statt auf die Linie", "Zu viel innerer Zügel – die äußere Verbindung geht verloren", "Dein Gewicht kippt nach innen"],
    correction: "Inneren Schenkel kurz und deutlich am Gurt einsetzen, auf die Linie schauen, äußeren Zügel ruhig anstehen lassen.",
    relatedExerciseId: "ex-dr-4",
  },
  aussen: {
    id: "aussen",
    title: "Das Pferd drängt nach außen",
    notice: "Die Linie wird weiter oder eckig, das Pferd läuft über die äußere Schulter.",
    factors: ["Die äußeren Hilfen sind zu passiv", "Zu viel Stellung nach innen", "Das Tempo ist zu hoch"],
    correction: "Stellung verringern, äußeren Zügel und äußeren Schenkel verwahrend einsetzen, Tempo über den Sitz ruhiger machen.",
    relatedExerciseId: "ex-trab-1",
  },
  zug: {
    id: "zug",
    title: "Du ziehst am inneren Zügel",
    notice: "Der Hals ist stark nach innen gestellt, das Pferd läuft trotzdem geradeaus weiter oder über die Schulter weg.",
    factors: ["Der innere Zügel wird als Lenkrad benutzt", "Am äußeren Zügel fehlt die Verbindung", "Blick und Gewicht leiten die Wendung nicht ein"],
    correction: "Die Wendung mit Blick und Gewicht beginnen, den inneren Zügel nur stellen lassen und immer wieder leicht nachgeben.",
    relatedExerciseId: "ex-hilfe-5",
  },
  knick: {
    id: "knick",
    title: "Du knickst in der Hüfte ein",
    notice: "Eine Schulter sackt ab, dein Gewicht rutscht nach außen, obwohl du innen sitzen willst.",
    factors: ["Du versuchst, dich zur Seite zu lehnen", "Wenig seitliche Stabilität im Rumpf"],
    correction: "Inneres Knie und inneren Absatz tief werden lassen, beide Schultern auf gleicher Höhe halten. Seitliche Stabilität kannst du im Rider Lab üben.",
  },
  takt: {
    id: "takt",
    title: "Der Takt geht verloren",
    notice: "Das Pferd wird in der Wendung langsamer oder eiliger.",
    factors: ["Die Linie ist für den Ausbildungsstand zu eng", "Die treibenden Hilfen kommen nicht im Rhythmus", "Das Pferd verliert das Gleichgewicht"],
    correction: "Die Linie etwas großzügiger reiten, im Takt mitzählen und die treibende Hilfe im Rhythmus einsetzen.",
    relatedExerciseId: "ex-trab-1",
  },
  umstellen: {
    id: "umstellen",
    title: "Das Umstellen kommt zu spät oder zu abrupt",
    notice: "Das Pferd wird beim Richtungswechsel schief, eilig oder wirft den Kopf.",
    factors: ["Das Umstellen beginnt erst im neuen Bogen", "Die Hilfen wechseln nicht gemeinsam, zum Beispiel nur die Zügel", "Es fehlt der kurze Moment geradeaus"],
    correction: "Eine Pferdelänge früher ankündigen, kurz geraderichten und dann Blick, Gewicht, Schenkel und Zügel gemeinsam auf die neue Seite nehmen.",
    relatedExerciseId: "ex-hilfe-5",
  },
  schief: {
    id: "schief",
    title: "Das Pferd läuft auf der geraden Linie schief",
    notice: "Die Hinterhand weicht zu einer Seite aus, das Pferd schlängelt oder kommt nicht am Punkt an.",
    factors: ["Kein fester Zielpunkt für den Blick", "Ein Zügel hält mehr als der andere", "Ungleich belastete Gesäßknochen"],
    correction: "Den Zielpunkt früh anschauen, beide Zügel gleich führen, beide Schenkel gleich anlegen.",
  },
  ecke: {
    id: "ecke",
    title: "Die Ecke wird abgekürzt",
    notice: "Das Pferd schneidet die Ecke ab und kommt schräg auf die nächste Seite.",
    factors: ["Der innere Schenkel wirkt zu wenig", "Der Blick geht zu früh auf die nächste Seite", "Die Ecke ist für den Ausbildungsstand zu tief angelegt – das Pferd weicht aus"],
    correction: "Eine Pferdelänge vorher ankündigen, innerer Schenkel am Gurt, Blick durch die Ecke. Lieber etwas flacher, dafür im Gleichgewicht.",
  },
};

export const SAFETY = [
  "Lahmt das Pferd, geht es auf einer Hand deutlich klamm, verweigert es die Biegung oder zeigt Schmerzzeichen: nicht weiterreiten, sondern Tierarzt oder Physiotherapeutin hinzuziehen.",
  "Auf hartem oder rutschigem Boden enge Linien vermeiden.",
];

export const PURPOSE = {
  sitz: "Gibt Takt und Tempo vor und kündigt mit halben Paraden Neues an.",
  gewicht: "Etwas mehr Gewicht innen unterstützt die Wendung – ohne zur Seite zu kippen.",
  innenSchenkel: "Hält das Pferd fleißig und ist der Bezugspunkt für Stellung und Biegung.",
  aussenSchenkel: "Verwahrt die Hinterhand, damit sie auf der Linie bleibt.",
  innenZuegel: "Fragt nach Stellung – und gibt nach, sobald das Pferd sie anbietet.",
  aussenZuegel: "Begrenzt Stellung und Tempo und führt die äußere Schulter.",
  blick: "Der Blick dreht Kopf und Schultern mit und zeigt dir die Linie.",
  oberkoerper: "Schultern parallel zu den Schultern des Pferdes, Hüften parallel zu seinen Hüften.",
} as const;

/** Standardfragen zur Seitenzuordnung */
export const Q_INNER_LEG = {
  id: "q-schenkel",
  prompt: "Du reitest auf der {hand} Hand in die Wendung. Welcher Schenkel liegt am Gurt und treibt?",
  options: [
    { id: "links", text: "Der linke Schenkel" },
    { id: "rechts", text: "Der rechte Schenkel" },
    { id: "beide", text: "Beide liegen hinter dem Gurt" },
  ],
  answer: { rule: "innenSeite" as const },
  explanation: "In der Wendung ist das Pferd nach innen gebogen. Der innere Schenkel – auf der {hand} Hand der {innen} – liegt am Gurt.",
};

export const Q_OUTER_REIN = {
  id: "q-zuegel",
  prompt: "Welcher Zügel begrenzt auf der {hand} Hand die Stellung und führt die äußere Schulter?",
  options: [
    { id: "links", text: "Der linke Zügel" },
    { id: "rechts", text: "Der rechte Zügel" },
  ],
  answer: { rule: "aussenSeite" as const },
  explanation: "Das ist der äußere, verwahrende Zügel – auf der {hand} Hand der {aussen}.",
};
