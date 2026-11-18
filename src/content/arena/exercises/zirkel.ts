import type { ArenaExercise, Segment } from "../types";

/**
 * Übung 01 – Zirkel (20-m-Zirkel an der A-Seite), geschrieben für die linke Hand.
 *
 * Linie: auf dem Hufschlag der K-Seite von E Richtung K, 10 m vor A abwenden,
 * ein ganzer Zirkel (gegen den Uhrzeigersinn), danach weiter auf dem Hufschlag.
 * Der Zirkel berührt: Hufschlag oben 4 m nach K · A · Hufschlag unten 4 m nach F ·
 * Mittellinie 20 m von A (20 × 40: X; 20 × 60: 2 m hinter L).
 *
 * Fachlich geprüft und freigegeben (18.11.2026).
 *
 * Meterangaben der Phasen: Anfahrt 0–16 · Zirkel 16–78,83 · Ausreiten 78,83–84,83.
 */

const CIRCLE: Segment[] = [
  { kind: "line", from: { x: 26, y: 0 }, to: { x: 10, y: 0 }, gait: "trab" },
  // gegen den Uhrzeigersinn = abnehmender Bildschirmwinkel; Start oben (−90°), ein voller Kreis
  { kind: "arc", center: { x: 10, y: 10 }, r: 10, startDeg: -90, endDeg: -450, gait: "trab" },
  { kind: "line", from: { x: 10, y: 0 }, to: { x: 4, y: 0 }, gait: "trab" },
];

const CIRCLE_END = 16 + 2 * Math.PI * 10; // 78,83 m

export const zirkel: ArenaExercise = {
  id: "arena_circle_20m",
  slug: "zirkel",
  title: "20-Meter-Zirkel",
  titleDe: "Zirkel",
  description: "Eine runde Linie, die die ganze Bahnbreite nutzt. Hier lernst du, wie Blick, Sitz, Schenkel und Zügel zusammenarbeiten, damit das Pferd gleichmäßig auf der Kreislinie bleibt.",
  category: "bahnfigur",
  difficulty: 1,
  learnMinutes: 8,
  arenaSizes: ["20x40", "20x60"],
  defaultSize: "20x40",
  authoredRein: "links",
  hasMirror: true,
  objectives: [
    "Eine gleichmäßig runde Kreislinie reiten, die an vier Punkten den Rand berührt",
    "Stellung und Biegung mit inneren und äußeren Hilfen zusammen anfragen",
    "Takt und Tempo auf der gebogenen Linie halten",
    "Hilfen wieder lösen und gerade auf den Hufschlag zurückkehren",
  ],
  prerequisites: ["Sicher im Leichttraben", "Ganze Bahn auf beiden Händen"],
  path: { "20x40": CIRCLE, "20x60": CIRCLE },
  annotations: {
    "20x40": [
      { at: { x: 10, y: 0 }, label: "4 m nach K" },
      { at: { x: 10, y: 20 }, label: "4 m nach F" },
    ],
    "20x60": [
      { at: { x: 10, y: 0 }, label: "4 m nach K" },
      { at: { x: 10, y: 20 }, label: "4 m nach F" },
      { at: { x: 20, y: 10 }, label: "2 m hinter L" },
    ],
  },
  durationSec: 30,
  phases: [
    {
      id: "z1",
      kind: "vorbereiten",
      title: "Ankommen und vorbereiten",
      timelineStart: 0,
      timelineEnd: 10,
      bend: "keine",
      gait: "trab",
      pause: true,
      summary: "Gerade auf dem Hufschlag, gleichmäßiger Takt. Eine halbe Parade kündigt an: Gleich kommt etwas Neues.",
      highlightedAids: ["sitz", "blick"],
      aids: {
        sitz: { state: "aktiv", text: "Aufrecht mitschwingen. Für die halbe Parade kurz tiefer und fester sitzen, dann sofort wieder weich werden." },
        gewicht: { state: "neutral", text: "Beide Gesäßknochen gleichmäßig belastet." },
        innenSchenkel: { state: "begleitend", text: "Beide Schenkel liegen am Gurt und halten das Pferd im Takt fleißig." },
        aussenSchenkel: { state: "begleitend", text: "Beide Schenkel liegen am Gurt und halten das Pferd im Takt fleißig." },
        innenZuegel: { state: "begleitend", text: "Gleichmäßige, weiche Verbindung auf beiden Zügeln." },
        aussenZuegel: { state: "begleitend", text: "Gleichmäßige, weiche Verbindung auf beiden Zügeln." },
        blick: { state: "aktiv", text: "Geradeaus den Hufschlag entlang – und schon den Punkt suchen, an dem du abwendest." },
        oberkoerper: { state: "neutral", text: "Schultern über den Hüften, Schultern parallel zu den Schultern des Pferdes." },
      },
      explanations: [
        { evidence: "lehre", text: "Auf der geraden Linie ist das Pferd geradegerichtet: Es hat keine Biegung. „Innen“ meint hier nur die Seite zur Bahnmitte, deshalb zeigt die Zeichnung links und rechts." },
        { evidence: "vereinfachung", text: "Die halbe Parade ist ein kurzes Zusammenspiel von Sitz, Schenkel und Zügel, kein Ziehen. Wie viel nötig ist, hängt vom Pferd ab." },
      ],
      commonMistakeIds: ["takt"],
    },
    {
      id: "z2",
      kind: "einleiten",
      title: "Stellen und abwenden",
      timelineStart: 10,
      timelineEnd: 26,
      bend: "links",
      gait: "trab",
      pause: true,
      summary: "Etwa eine Pferdelänge vor dem Zirkelpunkt das Pferd nach innen stellen und mit Blick, Gewicht und beiden Schenkeln auf die Kreislinie führen.",
      highlightedAids: ["blick", "innenSchenkel", "aussenZuegel", "innenZuegel"],
      aids: {
        blick: { state: "aktiv", text: "Auf die Kreislinie schauen, etwa ein Viertel des Zirkels voraus – Richtung A." },
        oberkoerper: { state: "aktiv", text: "Die Schultern drehen leicht mit, sodass sie parallel zu den Schultern des Pferdes bleiben. Die Hüften bleiben parallel zu den Hüften des Pferdes." },
        sitz: { state: "aktiv", text: "Im Takt mitschwingen, nicht nach vorne kippen." },
        gewicht: { state: "aktiv", text: "Den inneren Gesäßknochen etwas mehr belasten, indem inneres Knie und innerer Absatz tiefer werden. Nicht in der Hüfte einknicken." },
        innenSchenkel: { state: "aktiv", text: "Am Gurt, im Takt treibend. Er hält das Pferd fleißig und ist der Bezugspunkt für die Biegung." },
        aussenSchenkel: { state: "verwahrend", text: "Etwa eine Handbreit hinter dem Gurt. Er passt auf, dass die Hinterhand nicht nach außen ausweicht." },
        innenZuegel: { state: "aktiv", text: "Fragt mit leichtem Eindrehen der Hand nach Stellung, bis du das innere Auge des Pferdes ahnst – dann sofort wieder leichter werden." },
        aussenZuegel: { state: "verwahrend", text: "Bleibt in gleichmäßiger Verbindung. Er lässt die Stellung zu, begrenzt sie und führt die äußere Schulter auf die Kreislinie." },
      },
      explanations: [
        { evidence: "lehre", text: "Nach der klassischen deutschen Reitlehre wird das Pferd auf gebogenen Linien so gebogen, dass die Hinterhufe in die Spur der Vorderhufe treten. Auf dem Zirkel heißt das: Das Pferd ist auf der Kreislinie geradegerichtet." },
        { evidence: "biomechanik", text: "Messungen an der Wirbelsäule des Pferdes zeigen, dass sich der Rumpf seitlich nur wenig biegen kann; ein großer Teil der sichtbaren Biegung entsteht im Hals. Die „gleichmäßige Biegung vom Genick bis zum Schweif“ ist deshalb eher ein Lehrbild als eine genaue Beschreibung." },
        { evidence: "vereinfachung", text: "„Das Pferd biegt sich um den inneren Schenkel“ ist ein Bild. Der Schenkel biegt nicht mechanisch, er ist ein Signal, auf das das Pferd zu reagieren gelernt hat." },
      ],
      commonMistakeIds: ["zug", "knick"],
    },
    {
      id: "z3",
      kind: "halten",
      title: "Auf der Kreislinie bleiben",
      timelineStart: 26,
      timelineEnd: CIRCLE_END - 3,
      bend: "links",
      gait: "trab",
      pause: true,
      summary: "Die Hilfen werden leiser. Du reitest von Berührpunkt zu Berührpunkt und korrigierst nur, wenn das Pferd die Linie verlässt.",
      highlightedAids: ["innenSchenkel", "innenZuegel", "aussenZuegel"],
      aids: {
        blick: { state: "aktiv", text: "Immer zum nächsten Berührpunkt: A, Hufschlag gegenüber, Mittellinie, Hufschlag." },
        oberkoerper: { state: "begleitend", text: "Schultern bleiben mitgedreht, beide Schultern auf gleicher Höhe." },
        sitz: { state: "begleitend", text: "Gleichmäßig im Takt mitschwingen." },
        gewicht: { state: "begleitend", text: "Leicht innen, ohne nach innen zu kippen." },
        innenSchenkel: { state: "aktiv", text: "Im Takt am Gurt – kurz einsetzen, dann wieder nur anliegen lassen. Kein Dauerdruck." },
        aussenSchenkel: { state: "verwahrend", text: "Liegt ruhig hinter dem Gurt und wird nur aktiv, wenn die Hinterhand nach außen drängt." },
        innenZuegel: { state: "nachgebend", text: "Gibt immer wieder ein wenig nach, damit die Stellung nicht festgehalten wird." },
        aussenZuegel: { state: "verwahrend", text: "Gleichmäßig und elastisch. Er hält Tempo und Linie, ohne zu ziehen." },
      },
      explanations: [
        { evidence: "lehre", text: "In der FN-Lehre heißt der äußere Zügel verwahrend: Er begrenzt Stellung und Tempo. Der innere Zügel stellt und gibt nach." },
        { evidence: "vereinfachung", text: "Keine Hilfe wirkt allein. Wie viel innen und außen nötig ist, hängt vom Pferd, seinem Ausbildungsstand und vom Moment ab." },
      ],
      commonMistakeIds: ["innen", "aussen", "takt"],
    },
    {
      id: "z4",
      kind: "abschliessen",
      title: "Zurück auf den Hufschlag",
      timelineStart: CIRCLE_END - 3,
      timelineEnd: 1000,
      bend: "keine",
      gait: "trab",
      pause: true,
      summary: "Kurz vor dem Hufschlag Stellung aufgeben, geradeaus schauen und das Pferd gerade auf dem Hufschlag weitertraben lassen.",
      highlightedAids: ["blick", "innenZuegel"],
      aids: {
        blick: { state: "aktiv", text: "Geradeaus den Hufschlag entlang Richtung K." },
        oberkoerper: { state: "neutral", text: "Schultern wieder gerade, parallel zum Hufschlag." },
        sitz: { state: "begleitend", text: "Beide Gesäßknochen gleich belastet." },
        gewicht: { state: "neutral", text: "Gleichmäßig auf beiden Seiten." },
        innenSchenkel: { state: "begleitend", text: "Beide Schenkel wieder gleichmäßig am Gurt." },
        aussenSchenkel: { state: "begleitend", text: "Beide Schenkel wieder gleichmäßig am Gurt." },
        innenZuegel: { state: "nachgebend", text: "Die Stellung aufgeben: Die Hand, die gestellt hat, wird wieder neutral." },
        aussenZuegel: { state: "begleitend", text: "Beide Zügel wieder gleichmäßig." },
      },
      explanations: [
        { evidence: "lehre", text: "Eine Hilfe endet, wenn das Pferd reagiert hat. Das Nachgeben gehört zur Hilfe dazu." },
      ],
      commonMistakeIds: [],
    },
  ],
  aidPurpose: {
    sitz: "Gibt Takt und Tempo vor und kündigt mit halben Paraden Neues an.",
    gewicht: "Etwas mehr Gewicht innen unterstützt die Wendung – ohne zur Seite zu kippen.",
    innenSchenkel: "Hält das Pferd fleißig und ist der Bezugspunkt für Stellung und Biegung.",
    aussenSchenkel: "Verwahrt die Hinterhand, damit sie auf der Linie bleibt.",
    innenZuegel: "Fragt nach Stellung – und gibt nach, sobald das Pferd sie anbietet.",
    aussenZuegel: "Begrenzt Stellung und Tempo und führt die äußere Schulter.",
    blick: "Der Blick dreht Kopf und Schultern mit und zeigt dir die Linie.",
    oberkoerper: "Schultern parallel zu den Schultern des Pferdes, Hüften parallel zu seinen Hüften.",
  },
  whyItWorks: [
    { evidence: "lehre", text: "Der Zirkel ist eine der Grundfiguren der Reitlehre: Er verbindet gleichmäßigen Takt mit einer gebogenen Linie. Deshalb eignet er sich, um Stellung, Biegung und das Zusammenspiel der Hilfen zu üben." },
    { evidence: "vereinfachung", text: "Stell dir vor, das Pferd läuft zwischen deinen Hilfen wie in einem weichen Kanal: Innen gibt die Richtung und den Schwung, außen begrenzt. Das Bild hilft beim Lernen, ist aber keine Beschreibung der Mechanik." },
    { evidence: "biomechanik", text: "Auf gebogenen Linien verteilt das Pferd die Last ungleich auf die Beine. Ein gleichmäßiger, nicht zu kleiner Kreis und ein ruhiges Tempo machen es ihm leichter, im Gleichgewicht zu bleiben." },
  ],
  mistakes: [
    {
      id: "innen",
      title: "Das Pferd fällt nach innen",
      notice: "Der Zirkel wird kleiner, das Pferd drängt mit der inneren Schulter zur Mitte.",
      factors: ["Der innere Schenkel wirkt nicht oder zu selten", "Dein Blick wandert zur Bahnmitte statt auf die Linie", "Zu viel innerer Zügel – die äußere Verbindung geht verloren", "Dein Gewicht kippt nach innen"],
      correction: "Den inneren Schenkel kurz und deutlich am Gurt einsetzen, zum nächsten Berührpunkt schauen und den äußeren Zügel ruhig anstehen lassen.",
      relatedExerciseId: "ex-dr-4",
    },
    {
      id: "aussen",
      title: "Das Pferd drängt nach außen",
      notice: "Der Zirkel wird größer oder eckig, das Pferd läuft über die äußere Schulter.",
      factors: ["Die äußeren Hilfen sind zu passiv", "Zu viel Stellung nach innen", "Das Tempo ist zu hoch"],
      correction: "Stellung verringern, äußeren Zügel und äußeren Schenkel verwahrend einsetzen, Tempo über den Sitz ruhiger machen.",
      relatedExerciseId: "ex-trab-1",
    },
    {
      id: "zug",
      title: "Du ziehst am inneren Zügel",
      notice: "Der Hals ist stark nach innen gestellt, das Pferd läuft trotzdem nach außen, wirft den Kopf oder öffnet das Maul.",
      factors: ["Der innere Zügel wird als Lenkrad benutzt", "Am äußeren Zügel fehlt die Verbindung"],
      correction: "Den inneren Zügel immer wieder leicht nachgeben. Die Wendung über Blick, Gewicht und die äußeren Hilfen einleiten.",
      relatedExerciseId: "ex-hilfe-5",
    },
    {
      id: "knick",
      title: "Du knickst in der Hüfte ein",
      notice: "Eine Schulter sackt ab, dein Gewicht rutscht nach außen, obwohl du innen sitzen willst.",
      factors: ["Du versuchst, dich zur Seite zu lehnen", "Wenig seitliche Stabilität im Rumpf"],
      correction: "Inneres Knie und inneren Absatz tief werden lassen, beide Schultern auf gleicher Höhe halten. Seitliche Stabilität kannst du im Rider Lab üben.",
    },
    {
      id: "takt",
      title: "Der Takt geht verloren",
      notice: "Das Pferd wird auf der Kreislinie langsamer oder eiliger.",
      factors: ["Die Linie ist für den Ausbildungsstand zu eng", "Die treibenden Hilfen kommen nicht im Rhythmus", "Das Pferd verliert das Gleichgewicht"],
      correction: "Den Zirkel ruhig etwas größer reiten, im Takt mitzählen und die treibende Hilfe im Rhythmus einsetzen.",
      relatedExerciseId: "ex-trab-1",
    },
  ],
  tips: [
    "Merke dir die vier Berührpunkte und reite von Punkt zu Punkt – so wird der Kreis rund statt eiförmig.",
    "Zähle im Trab leise mit. Wird der Takt unregelmäßig, ist der Kreis gerade zu schwer.",
    "Reite den Zirkel auf beiden Händen. Fällt eine Seite deutlich schwerer, ist das normal und ein guter Hinweis für dein Training.",
  ],
  safetyNotes: [
    "Lahmt das Pferd, geht es auf einer Hand deutlich klamm, verweigert es die Biegung oder zeigt Schmerzzeichen: nicht weiterreiten, sondern Tierarzt oder Physiotherapeutin hinzuziehen.",
    "Auf hartem oder rutschigem Boden enge Linien vermeiden.",
  ],
  quiz: [
    {
      id: "q1",
      prompt: "Du reitest den Zirkel auf der {hand} Hand. Welcher Schenkel liegt am Gurt und treibt?",
      options: [
        { id: "links", text: "Der linke Schenkel" },
        { id: "rechts", text: "Der rechte Schenkel" },
        { id: "beide", text: "Beide liegen hinter dem Gurt" },
      ],
      answer: { rule: "innenSeite" },
      explanation: "Auf dem Zirkel ist das Pferd zur Kreismitte gebogen. Der innere Schenkel – auf der {hand} Hand der {innen} – liegt am Gurt und treibt.",
    },
    {
      id: "q2",
      prompt: "Welcher Zügel begrenzt auf der {hand} Hand die Stellung und hält die äußere Schulter auf der Linie?",
      options: [
        { id: "links", text: "Der linke Zügel" },
        { id: "rechts", text: "Der rechte Zügel" },
      ],
      answer: { rule: "aussenSeite" },
      explanation: "Das ist der äußere, verwahrende Zügel – auf der {hand} Hand der {aussen}.",
    },
    {
      id: "q3",
      prompt: "Wo berührt der Zirkel an der A-Seite die Mittellinie?",
      options: [
        { id: "X", text: "Bei X" },
        { id: "L2", text: "2 m hinter L, Richtung X" },
        { id: "D", text: "Bei D" },
      ],
      answer: { rule: "mittellinienPunkt" },
      explanation: "Der Zirkel ist 20 m groß, er berührt die Mittellinie also 20 m von A entfernt. In der 20 × 40-Bahn liegt dort X, in der 20 × 60-Bahn liegt X erst bei 30 m.",
    },
    {
      id: "q4",
      prompt: "Das Pferd fällt auf dem Zirkel nach innen. Was hilft eher?",
      options: [
        { id: "a", text: "Den inneren Zügel stärker annehmen" },
        { id: "b", text: "Inneren Schenkel kurz am Gurt einsetzen, auf die Linie schauen, äußeren Zügel ruhig halten" },
        { id: "c", text: "Den Oberkörper nach außen lehnen" },
      ],
      answer: "b",
      explanation: "Mehr innerer Zügel macht es meist schlimmer. Der innere Schenkel, dein Blick und ein ruhiger äußerer Zügel führen das Pferd zurück auf die Linie.",
    },
  ],
  relatedLessons: [
    { id: "ra-w7-l3", title: "Zirkel und Volte", href: "/akademie/reiten-in-der-bahn/zirkel-und-volte" },
    { id: "ra-w11-l3", title: "Zirkelfiguren", href: "/akademie/alle-bahnfiguren/zirkelfiguren" },
  ],
  relatedLibraryIds: ["ex-dr-4", "ex-trab-1", "ex-hilfe-5"],
  relatedSkillIds: ["skill_line", "skill_bend", "skill_rhythm"],
  reviewStatus: "freigegeben",
  reviewNote: "Fachlich geprüft und freigegeben durch die Inhaberin am 18.11.2026.",
};
