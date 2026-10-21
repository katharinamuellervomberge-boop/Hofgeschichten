import type { Character } from "./types";

/**
 * Die Hofkinder. Porträts sind final (21.10.), Beschreibungen folgen noch.
 */
export const characters: Character[] = [
  {
    slug: "lea",
    name: "Lea",
    description: "Figurenbeschreibung folgt.",
    placeholder: false,
    look: { skin: "#E9B48E", hair: "#5A3420", hairStyle: "braid", shirt: "#344638" },
    portrait: { base: "/kids/lea", alt: "Lea, ein Mädchen mit braunem Pferdeschwanz und Sommersprossen" },
  },
  {
    slug: "mila",
    name: "Mila",
    description: "Figurenbeschreibung folgt.",
    placeholder: false,
    look: { skin: "#ECB38C", hair: "#E1B260", hairStyle: "curls", shirt: "#80634D" },
    portrait: { base: "/kids/mila", alt: "Mila, ein Mädchen mit langen, welligen blonden Haaren und Sommersprossen" },
  },
  {
    slug: "ben",
    name: "Ben",
    description: "Figurenbeschreibung folgt.",
    placeholder: false,
    look: { skin: "#E8AE86", hair: "#5E3A22", hairStyle: "short", shirt: "#5E7360" },
    portrait: { base: "/kids/ben", alt: "Ben, ein Junge mit strubbeligen braunen Haaren und Sommersprossen" },
  },
];

export function getCharacter(slug: string): Character | undefined {
  return characters.find((c) => c.slug === slug);
}
