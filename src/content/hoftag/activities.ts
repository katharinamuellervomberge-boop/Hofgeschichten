import type { ActivityId, Option, PlaceId, SceneId } from "./types";

/**
 * Nachmittagsaktivitäten (MVP: drei). Jede besteht aus wenigen Schritten mit
 * Auswahl – falsche Antworten geben einen Tipp, dann neuer Versuch.
 * Weitere Aktivitäten (Reitplatz, kleiner Ausritt, ruhige Pflegeeinheit)
 * einfach hier ergänzen und in ACTIVITY_IDS aufnehmen.
 */
export type ActivityStep = { id: string; text: string; options: Option[] };

export type Activity = {
  id: ActivityId;
  title: string;
  place: PlaceId;
  scene: SceneId;
  intro: string;
  steps: ActivityStep[];
};

export const ACTIVITIES: Record<ActivityId, Activity> = {
  spaziergang: {
    id: "spaziergang",
    title: "Spaziergang",
    place: "paddock",
    scene: "hof",
    intro: "Heute machst du mit {name} einen Spaziergang über den Hof und am Waldrand entlang.",
    steps: [
      {
        id: "s1",
        text: "Wo gehst du beim Führen?",
        options: [
          { id: "a", label: "Links neben der Schulter", correct: true, feedback: "Genau! So sieht {name} dich und du hast alles im Blick." },
          { id: "b", label: "Direkt vor dem Kopf", correct: false, feedback: "Fast! Vor dem Pferd kann es dich anrempeln, wenn es sich erschreckt." },
          { id: "c", label: "Hinter dem Pferd", correct: false, feedback: "Nicht ganz. Hinter dem Pferd siehst du nichts – und es sieht dich nicht." },
        ],
      },
      {
        id: "s2",
        text: "Am Wegrand steht leckeres Gras. {name} zieht hin. Was tust du?",
        options: [
          { id: "a", label: "Ruhig weitergehen und freundlich am Strick erinnern", correct: true, feedback: "Genau! Wir bestimmen das Tempo – freundlich und klar." },
          { id: "b", label: "Loslassen, damit {name} fressen kann", correct: false, feedback: "Fast! Den Führstrick lässt man nie los. Frei herumlaufen ist gefährlich." },
        ],
      },
      {
        id: "s3",
        text: "Ein Fahrrad klingelt hinter euch. {name} hebt den Kopf. Was hilft?",
        options: [
          { id: "a", label: "Stehen bleiben, ruhig sprechen, schauen lassen", correct: true, feedback: "Genau! Wenn {name} schauen darf, merkt {name}: Alles ungefährlich." },
          { id: "b", label: "Schnell wegrennen", correct: false, feedback: "Fast! Rennen zeigt dem Pferd: Hier ist Gefahr. Ruhe hilft mehr." },
        ],
      },
    ],
  },
  bodenarbeit: {
    id: "bodenarbeit",
    title: "Bodenarbeit",
    place: "reitplatz",
    scene: "reitplatz",
    intro: "Auf dem Reitplatz übt Tilda mit dir Bodenarbeit: Du führst {name} und gibst kleine Zeichen.",
    steps: [
      {
        id: "b1",
        text: "{name} soll anhalten. Was machst du?",
        options: [
          { id: "a", label: "Selbst stehen bleiben und „Hoo“ sagen", correct: true, feedback: "Genau! Pferde achten sehr auf unseren Körper." },
          { id: "b", label: "Kräftig am Strick ziehen", correct: false, feedback: "Fast! Ziehen ist unangenehm. Erst Körper und Stimme, dann ganz leicht der Strick." },
        ],
      },
      {
        id: "b2",
        text: "Jetzt soll {name} einen Schritt zurückgehen.",
        options: [
          { id: "a", label: "Zum Pferd drehen und ruhig einen Schritt auf die Brust zugehen", correct: true, feedback: "Genau! {name} weicht zurück. Gleich loben!" },
          { id: "b", label: "Am Schweif ziehen", correct: false, feedback: "Fast! Am Schweif zieht man nie – das ist gefährlich und tut weh." },
        ],
      },
      {
        id: "b3",
        text: "{name} hat alles richtig gemacht. Und jetzt?",
        options: [
          { id: "a", label: "Loben: am Hals kraulen und eine Pause machen", correct: true, feedback: "Genau! Lob und Pause zeigen dem Pferd: Das war richtig." },
          { id: "b", label: "Gleich zehnmal wiederholen", correct: false, feedback: "Fast! Zu viele Wiederholungen machen müde. Lieber kurz üben und loben." },
        ],
      },
    ],
  },
  stangen: {
    id: "stangen",
    title: "Stangenarbeit",
    place: "reitplatz",
    scene: "reitplatz",
    intro: "Tilda hat Stangen auf den Boden gelegt. Du führst {name} im Schritt darüber.",
    steps: [
      {
        id: "t1",
        text: "Wie gehst du auf die Stangen zu?",
        options: [
          { id: "a", label: "Gerade und in der Mitte", correct: true, feedback: "Genau! Gerade über die Mitte – so kann {name} gut sehen, wo die Stangen liegen." },
          { id: "b", label: "Schräg über die Ecke", correct: false, feedback: "Fast! Schräg verrutschen die Abstände. Lieber gerade." },
        ],
      },
      {
        id: "t2",
        text: "Welches Tempo ist richtig?",
        options: [
          { id: "a", label: "Ruhiger, gleichmäßiger Schritt", correct: true, feedback: "Genau! So hat {name} Zeit, die Beine zu sortieren." },
          { id: "b", label: "Ganz schnell rennen", correct: false, feedback: "Fast! Beim Führen gehen wir im Schritt – sicher für dich und dein Pferd." },
        ],
      },
      {
        id: "t3",
        text: "Wofür ist Stangenarbeit gut?",
        options: [
          { id: "a", label: "Das Pferd lernt, auf seine Beine zu achten", correct: true, feedback: "Genau! Stangen machen geschickt und stärken die Muskeln." },
          { id: "b", label: "Damit das Pferd springen lernt", correct: false, feedback: "Nicht ganz. Bodenstangen liegen flach – es geht ums Hinschauen und Trittsicherheit." },
        ],
      },
    ],
  },
};

export const ACTIVITY_IDS: ActivityId[] = ["spaziergang", "bodenarbeit", "stangen"];
