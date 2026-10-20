import { site } from "./site";

/**
 * Feste Vorlesetexte der Oberfläche (Startseite, Seitenköpfe).
 * Werden ins Sprecherskript übernommen – Texte nur hier ändern.
 */
export const UI_SPEECH = {
  welcome: `Willkommen bei den Hofgeschichten. ${site.claim} Tippe auf ein Pferd oder auf ein großes Bild.`,
  tileListen: "Hörspiele. Hier kannst du Geschichten vom Hof hören.",
  tileHorses: "Die Pferde. Lerne Tivoli, Scrabble und Tonga kennen.",
  tileGames: "Spielen. Hier gibt es Lernspiele rund ums Pferd.",
  tileAdventures: "Abenteuer. Hier löst du Detektivfälle auf dem Hof.",
  tilePass: "Mein Abenteuerpass. Hier sammelst du Stempel.",
  gamesHeader: "Spielen. Such dir ein Spiel aus. Oben kannst du leicht oder mittel wählen.",
  adventuresHeader: "Detektiv-Abenteuer. Tippe auf ein Abenteuer.",
} as const;
