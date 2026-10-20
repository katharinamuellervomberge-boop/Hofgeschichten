import type { Episode } from "./types";

/**
 * Hörspielbibliothek.
 *
 * V1 enthält ausschließlich PLATZHALTER: Titel, Texte und Audio
 * (eine kurze Melodie) sind keine produzierten Folgen.
 * Neue Folgen: Eintrag ergänzen, MP3 nach /public/audio legen,
 * `status: "published"` setzen.
 */
export const episodes: Episode[] = [
  {
    slug: "folge-1",
    number: 1,
    title: "Platzhalter: Ein Morgen mit Tivoli",
    teaser: "Platzhaltertext – hier steht später die Beschreibung der ersten Folge.",
    audioSrc: "/audio/platzhalter-folge-1.mp3",
    durationSeconds: 32,
    horse: "tivoli",
    characters: ["lea", "ben"],
    status: "placeholder",
    access: "free",
    coverTint: "#E8DCC4",
  },
  {
    slug: "folge-2",
    number: 2,
    title: "Platzhalter: Scrabble und die Herde",
    teaser: "Platzhaltertext – hier steht später die Beschreibung der zweiten Folge.",
    audioSrc: "/audio/platzhalter-folge-2.mp3",
    durationSeconds: 31,
    horse: "scrabble",
    characters: ["mila"],
    status: "placeholder",
    access: "free",
    coverTint: "#DDE3D6",
  },
  {
    slug: "folge-3",
    number: 3,
    title: "Platzhalter: Tonga beim Hufschmied",
    teaser: "Platzhaltertext – hier steht später die Beschreibung der dritten Folge.",
    audioSrc: "/audio/platzhalter-folge-3.mp3",
    durationSeconds: 30,
    horse: "tonga",
    characters: ["lea", "mila", "ben"],
    status: "placeholder",
    access: "free",
    coverTint: "#EADBC8",
  },
];

export function getEpisode(slug: string): Episode | undefined {
  return episodes.find((e) => e.slug === slug);
}
