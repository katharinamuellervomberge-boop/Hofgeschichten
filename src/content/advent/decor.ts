/**
 * Dekorationen für „Mein Weihnachtsstall“ (Adventskalender).
 *
 * Der Stall hat feste Plätze (`STALL_SLOTS`). Jede Dekoration gehört zu genau
 * einem Platz und wird durch ein Türchen freigeschaltet (`day`).
 * Am 1. Dezember ist der Stall noch schlicht – die erste Dekoration gibt es am 9. Dezember.
 * Gezeichnet werden die Dekorationen in components/illustrations/advent/WinterStall.tsx.
 *
 * Pferdesicher gedacht: Alles hängt außerhalb der Reichweite der Pferdemäuler,
 * Lichter sind LED – echte Kerzen gehören nie in einen Stall.
 */

export type StallSlot = { id: string; label: string };

export const STALL_SLOTS: StallSlot[] = [
  { id: "giebel", label: "Giebel" },
  { id: "traufe", label: "Dachkante" },
  { id: "lichter", label: "Beleuchtung" },
  { id: "sterne", label: "Sterne" },
  { id: "schilder", label: "Pferdeschilder" },
  { id: "schleifen", label: "Boxentüren" },
  { id: "decken", label: "Decken" },
  { id: "karte", label: "Karte für Tivoli" },
  { id: "laternen", label: "Laternen" },
  { id: "baum", label: "Baum" },
  { id: "geschenke", label: "Geschenke" },
  { id: "kruemel", label: "Krümel" },
];

export type Deco = {
  id: string;
  slot: string;
  name: string;
  /** Türchen, das die Dekoration freischaltet */
  day: number;
  /** Ein Satz für die Belohnung */
  text: string;
};

export const DECOS: Deco[] = [
  { id: "adventskranz", slot: "giebel", name: "Adventskranz", day: 9, text: "Der Kranz aus Tannengrün mit vier LED-Kerzen – hoch oben am Giebel." },
  { id: "decke-gruen", slot: "decken", name: "Tannengrüne Weihnachtsdecken", day: 10, text: "Drei tannengrüne Festtagsdecken – als Schmuck über den Boxentüren." },
  { id: "tannengirlande", slot: "traufe", name: "Tannengirlande", day: 11, text: "Eine lange Girlande aus Tannenzweigen für die Dachkante." },
  { id: "decke-bordeaux", slot: "decken", name: "Bordeauxrote Weihnachtsdecken", day: 12, text: "Weinrote Festtagsdecken mit goldenem Rand – nur zum Schmücken." },
  { id: "schleifen-rot", slot: "schleifen", name: "Rote Weihnachtsschleifen", day: 13, text: "Drei große rote Schleifen für die Boxentüren." },
  { id: "sterne-stroh", slot: "sterne", name: "Strohsterne", day: 14, text: "Selbst gebastelte Strohsterne zwischen den Boxen." },
  { id: "pferdeschilder", slot: "schilder", name: "Festliche Pferdeschilder", day: 15, text: "Holzschilder mit Ilex-Zweig für Tivoli, Scrabble und Tonga." },
  { id: "sterne-gold", slot: "sterne", name: "Goldsterne", day: 15, text: "Glänzende Sterne aus Goldpapier." },
  { id: "geschenkkisten", slot: "geschenke", name: "Geschenkkisten", day: 16, text: "Ein Stapel Geschenkkisten mit Schleifen." },
  { id: "laternen", slot: "laternen", name: "Marthas Laternen", day: 17, text: "Zwei alte Messinglaternen – mit LED-Licht statt Kerze." },
  { id: "kruemel-schleife", slot: "kruemel", name: "Krümels Festtagsschleife", day: 18, text: "Eine rote Schleife für Krümel, den Hofhund." },
  { id: "schleifen-gold", slot: "schleifen", name: "Goldene Schleifen", day: 19, text: "Goldene Schleifen für die Boxentüren." },
  { id: "karte-tivoli", slot: "karte", name: "Deine Karte für Tivoli", day: 20, text: "Deine Weihnachtskarte hängt an Tivolis Box." },
  { id: "weihnachtsbaum", slot: "baum", name: "Weihnachtsbaum", day: 21, text: "Eine kleine Tanne neben dem Stall." },
  { id: "lichterkette", slot: "lichter", name: "Festliche Beleuchtung", day: 22, text: "Warme LED-Lichterketten entlang der Dachkante." },
  { id: "baum-lichter", slot: "baum", name: "Weihnachtsbaum mit Lichtern", day: 22, text: "Die Tanne leuchtet – mit Kugeln und LED-Lichtern." },
  { id: "stern-gross", slot: "giebel", name: "Großer Giebelstern", day: 23, text: "Ein großer leuchtender Stern für den Giebel." },
  { id: "hufeisen-gold", slot: "giebel", name: "Das goldene Hufeisen", day: 24, text: "Das goldene Hufeisen des Winterhofs – mit Tannenkranz." },
];

export function getDeco(id: string): Deco | undefined {
  return DECOS.find((d) => d.id === id);
}

export function decosForDay(day: number): Deco[] {
  return DECOS.filter((d) => d.day === day);
}

/** Für das Finale: der vollständig geschmückte Stall (jeweils die festlichste Variante) */
export const FULL_STALL: Record<string, string> = {
  giebel: "hufeisen-gold",
  traufe: "tannengirlande",
  lichter: "lichterkette",
  sterne: "sterne-gold",
  schilder: "pferdeschilder",
  schleifen: "schleifen-rot",
  decken: "decke-bordeaux",
  karte: "karte-tivoli",
  laternen: "laternen",
  baum: "baum-lichter",
  geschenke: "geschenkkisten",
  kruemel: "kruemel-schleife",
};

/** Weihnachtskarte für Tivoli (Türchen 20): Bereiche und Auswahl */
export const CARD_AREAS: Array<{ id: string; label: string; options: Array<{ id: string; label: string }> }> = [
  {
    id: "papier",
    label: "Papier",
    options: [
      { id: "creme", label: "Creme" },
      { id: "tanne", label: "Tannengrün" },
      { id: "bordeaux", label: "Bordeaux" },
      { id: "nacht", label: "Winternacht" },
    ],
  },
  {
    id: "motiv",
    label: "Bild",
    options: [
      { id: "tivoli", label: "Tivoli" },
      { id: "hufeisen", label: "Goldenes Hufeisen" },
      { id: "stern", label: "Stern" },
      { id: "zweig", label: "Tannenzweig" },
    ],
  },
  {
    id: "rahmen",
    label: "Rahmen",
    options: [
      { id: "gold", label: "Goldrand" },
      { id: "tannen", label: "Tannenzweige" },
      { id: "punkte", label: "Lichterpunkte" },
    ],
  },
  {
    id: "gruss",
    label: "Gruß",
    options: [
      { id: "g1", label: "Frohe Weihnachten, lieber Tivoli!" },
      { id: "g2", label: "Danke, dass du immer an mir schnupperst." },
      { id: "g3", label: "Für den liebsten Schecken der Welt." },
      { id: "g4", label: "Ich hab dich lieb, Tivoli!" },
    ],
  },
];

export function cardGreeting(card: Record<string, string>): string {
  const g = CARD_AREAS.find((a) => a.id === "gruss")!.options.find((o) => o.id === card.gruss);
  return g?.label ?? "";
}
