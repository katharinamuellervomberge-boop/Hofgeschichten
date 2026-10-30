"use client";

import { useLocale } from "@/i18n/LocaleProvider";
import { phrases, phrasesEn } from "@/lib/voice/phrases";

/** Feste Oberflächentexte des Spielkerns in beiden Sprachen */
const TEXTS = {
  de: {
    next: "Weiter",
    check: "Prüfen",
    start: "Spiel starten",
    progress: "Fortschritt",
    tapPicture: "Bild zum Antippen",
    found: "gefunden",
    foundList: "Gefunden",
    notFound: "Noch nicht gefunden",
    somethingInteresting: "Etwas Interessantes",
    dropHere: "Hierhin legen",
    tray: "Karten",
    selected: " – ausgewählt, jetzt eine Aufgabe antippen",
    multi: "Mehrere Antworten möglich",
    notHere: (label: string) => `„${label}“ passt hier nicht.`,
    back: "Zurück",
    readAloud: "Vorlesen",
  },
  en: {
    next: "Next",
    check: "Check",
    start: "Start",
    progress: "Progress",
    tapPicture: "Picture to tap",
    found: "found",
    foundList: "Found",
    notFound: "Not found yet",
    somethingInteresting: "Something interesting",
    dropHere: "Put here",
    tray: "Cards",
    selected: " – selected, now tap where it belongs",
    multi: "Several answers possible",
    notHere: (label: string) => `“${label}” doesn't fit here.`,
    back: "Back",
    readAloud: "Read aloud",
  },
};

export type EngineTexts = (typeof TEXTS)["de"];

export function useEngineTexts(): EngineTexts {
  return TEXTS[useLocale()];
}

/** Vorlese- und Rückmeldesätze in der Sprache der App */
export function usePhrases(): typeof phrases {
  return useLocale() === "en" ? phrasesEn : phrases;
}
