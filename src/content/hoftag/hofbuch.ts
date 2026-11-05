/**
 * „Mein Hofbuch“ – Sammelbereich. Im MVP füllen sich Pferdewissen,
 * Fundstücke, Abzeichen und Tageserfolge. Pferdekarten und besondere
 * Momente sind als Bereiche vorbereitet.
 */
export type KnowledgeCard = { id: string; title: string; text: string; topic: Topic };

export type Topic = "versorgung" | "pflege" | "verhalten" | "gesundheit" | "verantwortung";

export const TOPICS: Record<Topic, string> = {
  versorgung: "Futter & Wasser",
  pflege: "Pflege",
  verhalten: "Pferde verstehen",
  gesundheit: "Gesundheit",
  verantwortung: "Verantwortung",
};

export const KNOWLEDGE: KnowledgeCard[] = [
  { id: "wasser", topic: "versorgung", title: "Immer frisches Wasser", text: "Pferde trinken 30 bis 50 Liter am Tag. Frisches Wasser muss immer da sein." },
  { id: "raufutter", topic: "versorgung", title: "Raufutter zuerst", text: "Heu und Gras halten die Verdauung in Gang. Pferde fressen viele kleine Portionen über den Tag." },
  { id: "futterlager", topic: "versorgung", title: "Futter richtig lagern", text: "Futter bleibt in festen Tonnen trocken und sicher vor Mäusen." },
  { id: "heuqualitaet", topic: "versorgung", title: "Gutes Heu", text: "Gutes Heu riecht frisch, ist trocken und staubt nicht." },
  { id: "leckerli", topic: "versorgung", title: "Leckerli", text: "Nur wenige Stücke – und immer auf der flachen Hand." },
  { id: "putzen", topic: "pflege", title: "Richtig putzen", text: "Erst Striegel, dann Kardätsche, dann Mähne und Schweif, zum Schluss die Hufe." },
  { id: "hufe", topic: "pflege", title: "Hufe auskratzen", text: "Steine und Schmutz im Huf drücken. Darum kratzen wir die Hufe vor und nach der Bewegung aus." },
  { id: "hufeisen", topic: "pflege", title: "Hufeisen", text: "Der Hufschmied passt Hufeisen jedem Pferd einzeln an. Sie schützen die Hufe." },
  { id: "ausmisten", topic: "pflege", title: "Saubere Box", text: "Mist und nasses Stroh müssen täglich raus – Ammoniak schadet Lunge und Hufen." },
  { id: "waelzen", topic: "verhalten", title: "Wälzen", text: "Wälzen pflegt Haut und Fell. Danach schüttelt sich das Pferd." },
  { id: "doesen", topic: "verhalten", title: "Dösen im Stehen", text: "Pferde ruhen mehrmals am Tag, oft im Stehen mit einem angewinkelten Hinterbein." },
  { id: "ohren", topic: "verhalten", title: "Ohren lesen", text: "Die Ohren zeigen, wohin ein Pferd gerade aufmerksam ist." },
  { id: "herde", topic: "verhalten", title: "Herdentiere", text: "Pferde brauchen andere Pferde. Zusammen fühlen sie sich sicher." },
  { id: "fluchttier", topic: "verhalten", title: "Fluchttiere", text: "Bei Gefahr laufen Pferde weg. Ruhe und Geduld geben ihnen Sicherheit." },
  { id: "abschnauben", topic: "verhalten", title: "Abschnauben", text: "Kauen, Lecken und Abschnauben zeigen: Das Pferd entspannt sich." },
  { id: "begruessen", topic: "verhalten", title: "Richtig begrüßen", text: "Ansprechen, von vorn-seitlich kommen, ruhig bewegen." },
  { id: "grenzen", topic: "verhalten", title: "Klare Grenzen", text: "Ruhig und freundlich, aber klar – so fühlt sich ein Pferd sicher." },
  { id: "fuehren", topic: "verhalten", title: "Sicher führen", text: "Links neben der Schulter gehen, Tor immer schließen, Strick nie loslassen." },
  { id: "gesund", topic: "gesundheit", title: "Täglicher Gesundheits-Check", text: "Augen, Nüstern, Fell, Beine und Appetit – jeden Tag kurz anschauen." },
  { id: "wohlfuehlen", topic: "gesundheit", title: "Geht es meinem Pferd gut?", text: "Es frisst, ruht sich aus, hat klare Augen und ein glattes Fell." },
  { id: "atmung", topic: "gesundheit", title: "Ruhige Atmung", text: "Im Stehen atmet ein Pferd ruhig, etwa 8- bis 16-mal pro Minute." },
  { id: "asthma", topic: "gesundheit", title: "Staub und Asthma", text: "Pferde mit Asthma brauchen frische Luft, bedampftes Heu und staubarme Einstreu." },
  { id: "bewegung", topic: "gesundheit", title: "Jeden Tag Bewegung", text: "Bewegung hält Muskeln, Gelenke und Verdauung gesund." },
  { id: "verantwortung", topic: "verantwortung", title: "Verantwortung", text: "Ein Pferd braucht jeden Tag Futter, Wasser, Bewegung, Pflege und Gesellschaft – auch wenn es regnet." },
];

export function getCard(id: string): KnowledgeCard | undefined {
  return KNOWLEDGE.find((c) => c.id === id);
}

/** Bereiche des Hofbuchs (Reihenfolge = Anzeige) */
export const HOFBUCH_SECTIONS = [
  { id: "wissen", title: "Pferdewissen", ready: true },
  { id: "abzeichen", title: "Abzeichen", ready: true },
  { id: "funde", title: "Entdeckte Gegenstände", ready: true },
  { id: "tage", title: "Tageserfolge", ready: true },
  { id: "momente", title: "Besondere Momente", ready: false },
  { id: "karten", title: "Pferdekarten", ready: false },
] as const;
