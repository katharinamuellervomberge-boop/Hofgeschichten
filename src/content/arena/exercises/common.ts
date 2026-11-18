import type { Explanation, Gait, Mistake, Phase, PhaseKind, Rein } from "../types";

/**
 * Gemeinsame Bausteine für Phasen der Bahnfiguren (Welle 1, 18.11.2026).
 * Formuliert nach klassischer deutscher Reitlehre (FN); Texte sagen innen/außen,
 * Buchstaben in [ ] werden beim Spiegeln ersetzt.
 */

type Base = { id: string; from: number; to: number; title: string; summary: string; pause?: boolean; hand?: Rein; extra?: Explanation[]; mistakes?: string[]; gait?: Gait };

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
    gait: o.gait ?? "trab",
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
    gait: o.gait ?? "trab",
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
    gait: o.gait ?? "trab",
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
    gait: o.gait ?? "trab",
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

/* ===================== Übergänge (Welle 2, 18.11.2026) ===================== */

const HALF_HALT: Explanation = {
  evidence: "lehre",
  text: "Die halbe Parade ist ein kurzes Zusammenwirken von Gewicht, Schenkel und Zügel. Sie macht das Pferd aufmerksam und bereitet jeden Übergang vor.",
};

/** Übergang vorbereiten: halbe Paraden. Mit bend: das Pferd bleibt gestellt (Zirkel, Galopp). */
export function prepare(o: Base & { look: string; bend?: "links" | "rechts"; gait: Gait }): Phase {
  const bent = !!o.bend;
  return {
    id: o.id,
    kind: "vorbereiten",
    title: o.title,
    timelineStart: o.from,
    timelineEnd: o.to,
    bend: o.bend ?? "keine",
    hand: o.hand,
    gait: o.gait,
    pause: o.pause,
    summary: o.summary,
    highlightedAids: ["sitz", "innenSchenkel", "aussenSchenkel", "aussenZuegel"],
    aids: {
      blick: { state: "aktiv", text: o.look },
      oberkoerper: { state: "neutral", text: "Aufrecht, Schultern über den Hüften – nicht nach vorn kippen." },
      sitz: { state: "aktiv", text: "Ein, zwei halbe Paraden: kurz tiefer und fester sitzen, Schenkel dran, Hand kurz aushalten – dann sofort wieder weich." },
      gewicht: bent ? { state: "begleitend", text: "Leicht innen, wie in der Wendung." } : { state: "neutral", text: "Gleichmäßig auf beiden Gesäßknochen." },
      innenSchenkel: bent
        ? { state: "aktiv", text: "Am Gurt, treibt im Rhythmus weiter, damit das Pferd aktiv bleibt." }
        : { state: "aktiv", text: "Beide Schenkel bleiben am Gurt dran, damit das Pferd aktiv bleibt – auch vor einem Übergang nach unten." },
      aussenSchenkel: bent
        ? { state: "verwahrend", text: "Bleibt verwahrend hinter dem Gurt." }
        : { state: "aktiv", text: "Beide Schenkel bleiben am Gurt dran, damit das Pferd aktiv bleibt – auch vor einem Übergang nach unten." },
      innenZuegel: bent ? { state: "nachgebend", text: "Hält die Stellung, ohne festzuhalten." } : { state: "begleitend", text: "Gleichmäßige Verbindung; bei der halben Parade kurz aushalten, dann wieder leichter." },
      aussenZuegel: bent ? { state: "verwahrend", text: "Bei der halben Parade kurz aushalten, dann wieder leichter." } : { state: "begleitend", text: "Gleichmäßige Verbindung; bei der halben Parade kurz aushalten, dann wieder leichter." },
    },
    explanations: [HALF_HALT, { evidence: "vereinfachung", text: "Wie viele halbe Paraden nötig sind, hängt vom Pferd ab – manche reagieren schon auf eine." }, ...(o.extra ?? [])],
    commonMistakeIds: o.mistakes ?? ["unvorbereitet"],
  };
}

const UP_LABEL: Partial<Record<Gait, string>> = { schritt: "Schritt", trab: "Trab" };

/** Übergang nach oben (Anreiten, Antraben): beide Schenkel treiben, die Hand lässt nach vorn heraus */
export function upward(o: Base & { look: string; gait: Gait; bend?: "links" | "rechts" }): Phase {
  const trab = o.gait === "trab";
  return {
    id: o.id,
    kind: "ausfuehren",
    title: o.title,
    timelineStart: o.from,
    timelineEnd: o.to,
    bend: o.bend ?? "keine",
    hand: o.hand,
    gait: o.gait,
    pause: o.pause,
    summary: o.summary,
    highlightedAids: ["innenSchenkel", "aussenSchenkel", "innenZuegel", "aussenZuegel"],
    aids: {
      blick: { state: "aktiv", text: o.look },
      oberkoerper: { state: "aktiv", text: "Senkrecht bleiben und mit der Bewegung mitgehen – nicht vorlehnen und nicht zurückfallen." },
      sitz: { state: "aktiv", text: trab ? "Die ersten Tritte weich aussitzen oder gleich leichttraben – in jedem Fall geschmeidig in die neue Bewegung mitgehen." : "Das Becken geht weich in die Schrittbewegung mit." },
      gewicht: o.bend ? { state: "begleitend", text: "Leicht innen, wie in der Wendung." } : { state: "neutral", text: "Gleichmäßig auf beiden Gesäßknochen." },
      innenSchenkel: { state: "aktiv", text: `Beide Schenkel treiben gleichzeitig am Gurt – kurz und deutlich. Sobald das Pferd im ${UP_LABEL[o.gait] ?? "neuen Tempo"} ist, liegen sie wieder nur an.` },
      aussenSchenkel: o.bend
        ? { state: "verwahrend", text: "Treibt mit, bleibt aber eine Handbreit hinter dem Gurt und hält die Hinterhand auf der Linie." }
        : { state: "aktiv", text: `Beide Schenkel treiben gleichzeitig am Gurt – kurz und deutlich. Sobald das Pferd im ${UP_LABEL[o.gait] ?? "neuen Tempo"} ist, liegen sie wieder nur an.` },
      innenZuegel: { state: "nachgebend", text: "Die Hand gibt etwas nach, damit das Pferd nach vorn gehen kann – die Verbindung bleibt." },
      aussenZuegel: { state: "nachgebend", text: "Die Hand gibt etwas nach, damit das Pferd nach vorn gehen kann – die Verbindung bleibt." },
    },
    explanations: [
      { evidence: "lehre", text: "Beim Übergang nach oben treiben beide Schenkel, die Hand lässt die Bewegung nach vorn heraus. Wer gleichzeitig treibt und festhält, gibt widersprüchliche Signale." },
      ...(o.extra ?? []),
    ],
    commonMistakeIds: o.mistakes ?? ["festhalten", "vorlehnen"],
  };
}

/** Übergang nach unten (Parade): Gewicht, Schenkel und Zügel zusammen – nie nur ziehen */
export function downward(o: Base & { look: string; gait: Gait; toGait: Gait; bend?: "links" | "rechts" }): Phase {
  const toHalt = o.toGait === "halt";
  const fromCanter = o.gait === "galopp";
  return {
    id: o.id,
    kind: "ausfuehren",
    title: o.title,
    timelineStart: o.from,
    timelineEnd: o.to,
    bend: o.bend ?? "keine",
    hand: o.hand,
    gait: o.gait,
    pause: o.pause,
    summary: o.summary,
    highlightedAids: ["sitz", "innenSchenkel", "aussenZuegel", "innenZuegel"],
    aids: {
      blick: { state: "aktiv", text: o.look },
      oberkoerper: { state: "aktiv", text: "Aufrecht bleiben, Schultern zurück über die Hüften – nicht nach vorn kippen." },
      sitz: {
        state: "aktiv",
        text: fromCanter
          ? "Den Galoppsprung nicht mehr mitschieben: tiefer und ruhiger sitzen und auf den ersten Trabtritt warten."
          : toHalt
            ? "Tiefer und ruhiger sitzen, das Becken geht die Bewegung immer weniger mit, bis das Pferd steht."
            : "Ein paar Tritte vorher aussitzen, dann tiefer und ruhiger sitzen – das Becken geht die Bewegung weniger mit.",
      },
      gewicht: o.bend ? { state: "begleitend", text: "Leicht innen, wie in der Wendung." } : { state: "neutral", text: "Gleichmäßig auf beiden Gesäßknochen." },
      innenSchenkel: { state: "aktiv", text: "Bleibt dran, damit das Pferd mit der Hinterhand nachtritt und nicht nach vorn auseinanderfällt." },
      aussenSchenkel: o.bend
        ? { state: "verwahrend", text: "Bleibt verwahrend hinter dem Gurt." }
        : { state: "aktiv", text: toHalt ? "Beide Schenkel liegen an und halten das Pferd gerade, damit es geschlossen zum Stehen kommt." : "Bleibt dran, damit das Pferd mit der Hinterhand nachtritt und nicht nach vorn auseinanderfällt." },
      innenZuegel: { state: "aktiv", text: "Annehmen und wieder nachgeben – im Rhythmus der Bewegung, nie dauerhaft ziehen." },
      aussenZuegel: { state: "aktiv", text: toHalt ? "Annehmen und nachgeben, bis das Pferd steht. Dann gibt die Hand nach." : "Annehmen und nachgeben. Sobald das Pferd in der neuen Gangart ist, gibt die Hand nach." },
    },
    explanations: [
      { evidence: "lehre", text: "Ein Übergang nach unten ist eine Parade: Gewicht, Schenkel und Zügel wirken zusammen. Ein Ruck am Zügel ist keine Parade." },
      { evidence: "vereinfachung", text: "Wird nur am Zügel gezogen, hebt das Pferd oft den Kopf, drückt den Rücken weg und fällt auf die Vorhand. Die Schenkel sorgen dafür, dass die Hinterbeine weiter unter den Körper treten." },
      ...(o.extra ?? []),
    ],
    commonMistakeIds: o.mistakes ?? ["ziehen", "vorlehnen"],
  };
}

/** Stehen: Zeitphase am Haltepunkt (timelineStart = timelineEnd) */
export function standing(o: { id: string; at: number; title: string; summary: string; extra?: Explanation[]; pause?: boolean; hand?: Rein }): Phase {
  return {
    id: o.id,
    kind: "halten",
    title: o.title,
    timelineStart: o.at,
    timelineEnd: o.at,
    halt: true,
    bend: "keine",
    hand: o.hand,
    gait: "halt",
    pause: o.pause ?? true,
    summary: o.summary,
    highlightedAids: ["innenSchenkel", "aussenSchenkel", "innenZuegel"],
    aids: {
      blick: { state: "aktiv", text: "Geradeaus über die Ohren des Pferdes." },
      oberkoerper: { state: "neutral", text: "Aufrecht und ruhig." },
      sitz: { state: "begleitend", text: "Ruhig und ausbalanciert sitzen bleiben, das Becken still." },
      gewicht: { state: "neutral", text: "Gleichmäßig auf beiden Gesäßknochen." },
      innenSchenkel: { state: "begleitend", text: "Beide Schenkel liegen weich an und halten das Pferd gerade und aufmerksam." },
      aussenSchenkel: { state: "begleitend", text: "Beide Schenkel liegen weich an und halten das Pferd gerade und aufmerksam." },
      innenZuegel: { state: "nachgebend", text: "Sobald das Pferd steht, gibt die Hand leicht nach – es soll stehen, nicht festgehalten werden." },
      aussenZuegel: { state: "nachgebend", text: "Sobald das Pferd steht, gibt die Hand leicht nach – es soll stehen, nicht festgehalten werden." },
    },
    explanations: [
      { evidence: "lehre", text: "Das Pferd soll gerade, geschlossen und ruhig stehen – das Gewicht auf allen vier Beinen, aufmerksam für die nächste Hilfe." },
      ...(o.extra ?? []),
    ],
    commonMistakeIds: ["schief-halt"],
  };
}

/** Angaloppieren (FN): innen gestellt, innerer Schenkel am Gurt gibt den Impuls, äußerer verwahrt hinter dem Gurt */
export function canterDepart(o: Base & { look: string; bend: "links" | "rechts" }): Phase {
  return {
    id: o.id,
    kind: "ausfuehren",
    title: o.title,
    timelineStart: o.from,
    timelineEnd: o.to,
    bend: o.bend,
    hand: o.hand,
    gait: "galopp",
    pause: o.pause,
    summary: o.summary,
    highlightedAids: ["innenSchenkel", "aussenSchenkel", "gewicht", "innenZuegel"],
    aids: {
      blick: { state: "aktiv", text: o.look },
      oberkoerper: { state: "aktiv", text: "Aufrecht bleiben, nicht nach vorn werfen. Die innere Hüfte geht mit dem ersten Galoppsprung etwas vor." },
      sitz: { state: "aktiv", text: "Eine halbe Parade vorher. Im Moment des Angaloppierens weich in die Galoppbewegung mitgehen." },
      gewicht: { state: "aktiv", text: "Etwas mehr Gewicht auf den inneren Gesäßknochen – über Knie und Absatz, ohne zu kippen." },
      innenSchenkel: { state: "aktiv", text: "Am Gurt. Er gibt den Impuls zum Angaloppieren." },
      aussenSchenkel: { state: "verwahrend", text: "Eine Handbreit hinter dem Gurt, verwahrend. Er hält die Hinterhand auf der Linie und unterstützt den Galoppsprung." },
      innenZuegel: { state: "aktiv", text: "Stellt leicht nach innen und gibt im Moment des Absprungs nach." },
      aussenZuegel: { state: "verwahrend", text: "Begrenzt Stellung und Tempo und lässt den ersten Galoppsprung nach vorn heraus." },
    },
    explanations: [
      { evidence: "lehre", text: "Nach FN-Lehre: Pferd innen gestellt, innerer Gesäßknochen vermehrt belastet, innerer Schenkel am Gurt gibt den Impuls, äußerer Schenkel verwahrt eine Handbreit hinter dem Gurt." },
      { evidence: "biomechanik", text: "Der Galopp ist ein Dreitakt. Er beginnt mit dem äußeren Hinterbein, das innere Beinpaar greift weiter vor (auf der linken Hand Linksgalopp, auf der rechten Rechtsgalopp). Deshalb muss die Hinterhand vor dem Angaloppieren aktiv und auf der Linie sein." },
      { evidence: "vereinfachung", text: "Manche Pferde haben gelernt, auf den äußeren Schenkel als Signal anzugaloppieren. Entscheidend ist, dass die Hilfe für dein Pferd eindeutig ist und immer gleich gegeben wird." },
      ...(o.extra ?? []),
    ],
    commonMistakeIds: o.mistakes ?? ["falscher-galopp", "vorlehnen"],
  };
}

/** Im Galopp bleiben: Galopphilfen bleiben bestehen, Sitz geht in jedem Sprung mit */
export function canterHold(o: Base & { look: string; bend: "links" | "rechts" }): Phase {
  return {
    id: o.id,
    kind: "halten",
    title: o.title,
    timelineStart: o.from,
    timelineEnd: o.to,
    bend: o.bend,
    hand: o.hand,
    gait: "galopp",
    pause: o.pause,
    summary: o.summary,
    highlightedAids: ["sitz", "innenSchenkel", "aussenSchenkel"],
    aids: {
      blick: { state: "aktiv", text: o.look },
      oberkoerper: { state: "begleitend", text: "Aufrecht, die Schultern bleiben ruhig – die Bewegung passiert im Becken." },
      sitz: { state: "aktiv", text: "In jedem Galoppsprung weich mitgehen, ohne zu schieben." },
      gewicht: { state: "begleitend", text: "Leicht innen." },
      innenSchenkel: { state: "aktiv", text: "Am Gurt, treibt im Galopprhythmus, wenn das Pferd langsamer wird." },
      aussenSchenkel: { state: "verwahrend", text: "Bleibt verwahrend hinter dem Gurt – die Galopphilfe bleibt bestehen." },
      innenZuegel: { state: "nachgebend", text: "Hält die leichte Stellung und gibt immer wieder nach." },
      aussenZuegel: { state: "verwahrend", text: "Begrenzt das Tempo und geht mit der Nickbewegung des Pferdes mit." },
    },
    explanations: [{ evidence: "lehre", text: "Im Galopp bleibt die Hilfengebung des Angaloppierens bestehen: Stellung innen, innerer Schenkel am Gurt, äußerer Schenkel verwahrend hinter dem Gurt." }, ...(o.extra ?? [])],
    commonMistakeIds: o.mistakes ?? ["eilig"],
  };
}

Object.assign(MISTAKES, {
  unvorbereitet: {
    id: "unvorbereitet",
    title: "Der Übergang kommt überraschend",
    notice: "Das Pferd reagiert spät, eilt weg oder stolpert in die neue Gangart.",
    factors: ["Keine halbe Parade vorher", "Die Hilfe kommt erst am Punkt statt kurz davor"],
    correction: "Eine Pferdelänge vorher mit einer halben Parade ankündigen, dann am Punkt die Hilfe geben.",
  },
  ziehen: {
    id: "ziehen",
    title: "Du ziehst am Zügel",
    notice: "Das Pferd hebt den Kopf, öffnet das Maul, drückt den Rücken weg oder bremst mit der Vorhand.",
    factors: ["Der Zügel wirkt allein, ohne Sitz und Schenkel", "Die Hand gibt nicht nach, wenn das Pferd reagiert"],
    correction: "Sitz und Schenkel zuerst, die Hand nimmt an und gibt nach. Sobald das Pferd reagiert: nachgeben.",
    relatedExerciseId: "ex-hilfe-5",
  },
  festhalten: {
    id: "festhalten",
    title: "Du treibst und hältst gleichzeitig fest",
    notice: "Das Pferd reagiert zögerlich, wird kurz im Hals oder springt unruhig an.",
    factors: ["Die Hand gibt beim Treiben nicht nach", "Unsicherheit, das Pferd könnte zu schnell werden"],
    correction: "Im Moment des Treibens die Hand etwas vorgehen lassen. Erst danach wieder begrenzen.",
  },
  vorlehnen: {
    id: "vorlehnen",
    title: "Du lehnst dich nach vorn",
    notice: "Beim Übergang kippt dein Oberkörper vor, das Pferd fällt auf die Vorhand oder eilt.",
    factors: ["Der Versuch, „mitzuhelfen“", "Unsicherheit im neuen Tempo"],
    correction: "Schultern über den Hüften lassen und mit dem Becken mitgehen, nicht mit dem Oberkörper.",
  },
  "schief-halt": {
    id: "schief-halt",
    title: "Das Pferd steht schief oder nicht geschlossen",
    notice: "Die Hinterhand weicht zur Seite, ein Bein bleibt zurück oder das Pferd tritt noch einige Schritte.",
    factors: ["Ein Schenkel liegt nicht an", "Die Parade kommt nur über die Zügel", "Ohne Bande fehlt die seitliche Begrenzung"],
    correction: "Beide Schenkel gleichmäßig anlegen, beide Zügel gleich führen. Lieber über ein, zwei Schritte geschlossen halten als abrupt.",
  },
  "falscher-galopp": {
    id: "falscher-galopp",
    title: "Das Pferd springt im falschen Galopp an",
    notice: "Das äußere statt des inneren Beinpaars greift weiter vor (Außengalopp) – oder das Pferd trabt nur schneller.",
    factors: ["Keine Stellung nach innen", "Hinterhand weicht nach außen aus", "Das Gewicht rutscht nach außen", "Das Tempo im Trab ist zu hoch"],
    correction: "Zurück zum Trab, ruhig stellen, halbe Parade und in einer Ecke oder auf dem Zirkel neu angaloppieren.",
  },
  eilig: {
    id: "eilig",
    title: "Der Galopp wird eilig",
    notice: "Die Sprünge werden flach und schnell, das Pferd zieht.",
    factors: ["Du schiebst mit dem Sitz", "Die halben Paraden fehlen", "Das Pferd verliert das Gleichgewicht"],
    correction: "Ruhig mitgehen statt schieben, mit halben Paraden das Tempo regulieren; lieber auf dem Zirkel galoppieren.",
    relatedExerciseId: "ex-gal-7",
  },
} satisfies Record<string, Mistake>);

export const X_HALT_NOTE: Explanation = {
  evidence: "lehre",
  text: "Bei X hilft keine Bande. Das Pferd muss gut an den Hilfen stehen: Beide Schenkel und beide Zügel halten es gerade, sonst weicht die Hinterhand aus. Darum ist Halten bei X schwieriger als an einem Buchstaben auf dem Hufschlag.",
};
