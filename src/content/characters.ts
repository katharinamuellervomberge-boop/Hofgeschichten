import type { Character } from "./types";

/**
 * Die Hofkinder. Beschreibungen und Aussehen sind Platzhalter,
 * bis die finalen Figurenbeschreibungen vorliegen.
 */
export const characters: Character[] = [
  {
    slug: "lea",
    name: "Lea",
    description: "Figurenbeschreibung folgt.",
    placeholder: true,
    look: { skin: "#F1D2B8", hair: "#9A4E2C", hairStyle: "braid", shirt: "#344638" },
  },
  {
    slug: "mila",
    name: "Mila",
    description: "Figurenbeschreibung folgt.",
    placeholder: true,
    look: { skin: "#C99273", hair: "#2E211B", hairStyle: "curls", shirt: "#80634D" },
  },
  {
    slug: "ben",
    name: "Ben",
    description: "Figurenbeschreibung folgt.",
    placeholder: true,
    look: { skin: "#EBC6A6", hair: "#C9A15E", hairStyle: "short", shirt: "#5E7360" },
  },
];

export function getCharacter(slug: string): Character | undefined {
  return characters.find((c) => c.slug === slug);
}
