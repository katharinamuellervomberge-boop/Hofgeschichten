/**
 * Erwachsene und Jugendliche aus den Mystery-Files-Fällen (Lindenhof).
 * Sie sprechen in Geschichten (`speaker: "<slug>"`) und erscheinen als
 * Porträt (`{ kind: "person", person: "<slug>" }`). Alle frei erfunden.
 * Hanna, Wilhelm, Tilda und Mats sind zugleich die festen Erwachsenen des Hofs
 * (Hofbesitzerin, Stallmeister, Reitlehrerin, Stallhelfer) – gemalte Bilder seit 27.10.2026.
 */
export type PersonLook = {
  skin: string;
  hair: string;
  hairStyle: "bun" | "ponytail" | "spiky" | "short" | "bob";
  shirt: string;
  hat?: { type: "cap" | "brim"; color: string };
  glasses?: boolean;
  /** Dicker Zimmermannsbleistift hinter dem Ohr */
  pencil?: boolean;
  mustache?: string;
  scarf?: string;
  headphones?: string;
};

export type Person = {
  slug: string;
  name: string;
  /** Kurze Rolle für Karten, z. B. „Stallmeister, 62“ */
  role: string;
  look: PersonLook;
  /** Gemaltes Porträt in /public/people (<base>-160|320|640.webp); ohne → SVG-Rückfall */
  portrait?: { base: string; alt: string };
  /** Gemalte Ganzkörperansicht (<base>-512|1024.webp, Hochformat 2:3) für Szenen und Cover */
  fullBody?: { base: string; alt: string };
};

export const people: Person[] = [
  {
    slug: "hanna",
    name: "Hanna Lindner",
    role: "Stallbesitzerin, 41",
    look: { skin: "#E9C4A4", hair: "#2E211B", hairStyle: "bob", shirt: "#A4573A" },
    portrait: { base: "/people/hanna", alt: "Hanna Lindner, Hofbesitzerin mit dunklem Bob und rostroter Fleecejacke" },
    fullBody: { base: "/people/hanna-ganz", alt: "Hanna Lindner in rostroter Fleecejacke, Jeans und Stallstiefeln, mit Führstrick in der Hand" },
  },
  {
    slug: "wilhelm",
    name: "Wilhelm Brandt",
    role: "Stallmeister, 62",
    look: {
      skin: "#E7C2A0",
      hair: "#B9AFA2",
      hairStyle: "short",
      shirt: "#6E3B3F",
      hat: { type: "cap", color: "#344638" },
      pencil: true,
      mustache: "#B9AFA2",
    },
    portrait: { base: "/people/wilhelm", alt: "Wilhelm Brandt, Stallmeister mit grauem Schnurrbart, grüner Schiebermütze und Bleistift hinterm Ohr" },
    fullBody: { base: "/people/wilhelm-ganz", alt: "Wilhelm Brandt in kariertem Flanellhemd und Gummistiefeln, auf eine Mistgabel gestützt" },
  },
  {
    slug: "tilda",
    name: "Tilda Sommer",
    role: "Reitlehrerin, 29",
    look: { skin: "#EFCDB0", hair: "#6E3B3F", hairStyle: "ponytail", shirt: "#344638", scarf: "#D9803E" },
    portrait: { base: "/people/tilda", alt: "Tilda Sommer, Reitlehrerin mit rotbraunem Pferdeschwanz und orangefarbenem Halstuch" },
    fullBody: { base: "/people/tilda-ganz", alt: "Tilda Sommer in grünem Shirt, Reithose und Reitstiefeln, mit Gerte in der Hand" },
  },
  {
    slug: "mats",
    name: "Mats Keller",
    role: "Stallhelfer, 14",
    look: { skin: "#EFCDB0", hair: "#C9A15E", hairStyle: "spiky", shirt: "#2C2A24", headphones: "#D9803E" },
    portrait: { base: "/people/mats", alt: "Mats Keller, Stallhelfer mit blonden Strubbelhaaren und orangefarbenen Kopfhörern um den Hals" },
    fullBody: { base: "/people/mats-ganz", alt: "Mats Keller in dunklem T-Shirt, Jeans und Gummistiefeln, mit einem Heunetz über der Schulter" },
  },
  {
    slug: "voss",
    name: "Albert Voss",
    role: "Nachbar, 58",
    look: {
      skin: "#E7C2A0",
      hair: "#8C7A68",
      hairStyle: "short",
      shirt: "#344638",
      hat: { type: "brim", color: "#2C2A24" },
      glasses: true,
      mustache: "#8C7A68",
    },
  },
  {
    slug: "greta",
    name: "Oma Greta",
    role: "Zeugin, 79",
    look: { skin: "#F0D2B8", hair: "#F2EEE6", hairStyle: "bun", shirt: "#6E3B3F", glasses: true, scarf: "#C99A4E" },
  },
];

export function getPerson(slug: string): Person | undefined {
  return people.find((p) => p.slug === slug);
}
