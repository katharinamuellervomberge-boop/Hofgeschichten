/**
 * Erwachsene und Jugendliche aus den Mystery-Files-Fällen (Lindenhof).
 * Sie sprechen in Geschichten (`speaker: "<slug>"`) und erscheinen als
 * Porträt (`{ kind: "person", person: "<slug>" }`). Alle frei erfunden.
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
};

export const people: Person[] = [
  {
    slug: "hanna",
    name: "Hanna Lindner",
    role: "Stallbesitzerin, 41",
    look: { skin: "#E9C4A4", hair: "#2E211B", hairStyle: "bob", shirt: "#A4573A" },
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
  },
  {
    slug: "tilda",
    name: "Tilda Sommer",
    role: "Reitlehrerin, 29",
    look: { skin: "#EFCDB0", hair: "#6E3B3F", hairStyle: "ponytail", shirt: "#344638", scarf: "#D9803E" },
  },
  {
    slug: "mats",
    name: "Mats Keller",
    role: "Stallhelfer, 14",
    look: { skin: "#EFCDB0", hair: "#C9A15E", hairStyle: "spiky", shirt: "#2C2A24", headphones: "#D9803E" },
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
