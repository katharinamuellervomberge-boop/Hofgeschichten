import type { Horse } from "./types";

/**
 * Die drei echten Pferde der Hofgeschichten.
 * Steckbrief-Angaben: geliefert von Horse & Harmonie (19.10.2026).
 *
 * Porträts: Aquarelle von Horse & Harmonie (19.10.2026), in /public/horses.
 * Die gezeichneten SVG-Pferde (Spiele, Szenen) sind farblich daran angepasst.
 * Noch offen: das Geschlecht von Tonga (Texte bleiben bis dahin neutral).
 */
export const horses: Horse[] = [
  {
    slug: "tivoli",
    name: "Tivoli",
    intro: "Das ist Tivoli. Er ist verspielt, lieb und spürt genau, wie es dir geht. Und er schnuppert gern an Menschen.",
    look: {
      coat: "#B0683A",
      coatShade: "#8C4F2B",
      mane: "#5A3C2A",
      maneLight: "#E6D9C2",
      hoof: "#7A6656",
      face: "blaze",
      pinto: true,
      points: "#F3EEE4",
    },
    lookIsPlaceholder: false,
    portrait: { base: "/horses/tivoli", alt: "Tivoli, ein fuchsfarben-weißer Schecke mit Blesse" },
    facts: [
      { label: "Alter", value: "14 Jahre" },
      { label: "Rasse/Typ", value: "Schecke" },
      { label: "Charakter", value: "verspielt, lieb, empathisch" },
      { label: "Besonderheit", value: "schnuppert gern an Menschen" },
    ],
    knowledge: [
      "Pferde begrüßen sich, indem sie sich gegenseitig an den Nüstern beschnuppern. Wenn Tivoli an dir schnuppert, sagt er Hallo.",
      "Ein Schecke hat große weiße und farbige Flächen im Fell. Tivoli ist fuchsfarben und weiß – kein Schecke sieht aus wie der andere.",
      "Pferde können im Stehen dösen. Ihre Beine haben dafür einen besonderen Halte-Mechanismus.",
    ],
    tint: "#E8DCC4",
    size: 1,
    pronoun: "er",
  },
  {
    slug: "scrabble",
    name: "Scrabble",
    intro: "Das ist Scrabble. Er ist ein sehr großes Pferd – und trotzdem der süßeste und verknuddeltste auf dem Hof.",
    look: {
      coat: "#3A2C25",
      coatShade: "#251C18",
      mane: "#17110E",
      hoof: "#6E6258",
      face: "blaze",
      socks: ["frontFar", "hindNear", "hindFar"],
    },
    lookIsPlaceholder: false,
    portrait: { base: "/horses/scrabble", alt: "Scrabble, ein großes dunkelbraunes Pferd mit Blesse und weißen Beinen" },
    facts: [
      { label: "Alter", value: "16 Jahre" },
      { label: "Rasse/Typ", value: "Hannoveraner" },
      { label: "Charakter", value: "leistungsbereit und sehr verknuddelt" },
      { label: "Besonderheit", value: "ein sehr großes Pferd – und der süßeste" },
    ],
    knowledge: [
      "Hannoveraner sind eine deutsche Warmblut-Rasse. Viele von ihnen sind groß und werden im Springen und in der Dressur geritten.",
      "Wie groß ein Pferd ist, misst man am Widerrist – dem höchsten Punkt am Rücken, kurz hinter der Mähne.",
      "Der lange weiße Streifen auf Scrabbles Gesicht heißt Blesse. Weiße Beine nennt man Stiefel oder Socken.",
    ],
    tint: "#DDE3D6",
    size: 1.18,
    pronoun: "er",
  },
  {
    slug: "tonga",
    name: "Tonga",
    intro: "Das ist Tonga. Tonga ist sehr feinfühlig und strahlt so viel Ruhe aus, dass man sich ganz sicher fühlt.",
    look: {
      coat: "#8A4A26",
      coatShade: "#6B381C",
      mane: "#1F1712",
      hoof: "#3A302A",
      face: "star",
      points: "#241A15",
    },
    lookIsPlaceholder: false,
    portrait: { base: "/horses/tonga", alt: "Tonga, ein braunes Pferd mit Stern und schwarzen Beinen" },
    facts: [
      { label: "Alter", value: "14 Jahre" },
      { label: "Rasse/Typ", value: "Trakehner" },
      { label: "Charakter", value: "sehr fühlend und sensibel" },
      { label: "Besonderheit", value: "strahlt Ruhe aus und lässt einen sich sicher fühlen" },
    ],
    knowledge: [
      "Trakehner sind die älteste deutsche Warmblut-Rasse. Sie stammen ursprünglich aus Ostpreußen.",
      "Pferde spüren sehr genau, wie wir uns fühlen. Wer ruhig ist, hilft auch dem Pferd, ruhig zu bleiben.",
      "Tonga ist ein Brauner: braunes Fell, aber schwarze Mähne, schwarzer Schweif und schwarze Beine. Der weiße Fleck auf der Stirn heißt Stern.",
    ],
    tint: "#EADBC8",
    size: 1,
    pronoun: null,
  },
];

export function getHorse(slug: string): Horse | undefined {
  return horses.find((h) => h.slug === slug);
}
