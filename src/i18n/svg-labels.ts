"use client";

import { useLocale } from "./LocaleProvider";

/**
 * Beschriftungen in den Akademie-Bildern (SVG). Deutsch ist der Quelltext;
 * englische Fassung in britischem Reitenglisch.
 */
const EN: Record<string, string> = {
  // Sicherheit, Helm
  "Abstand!": "Keep your distance!",
  "Abstand: eine Pferdelänge": "Distance: one horse length",
  "direkt vorn: sieht dich kaum": "directly in front: can barely see you",
  "schräg von vorn": "from the front, at an angle",
  Kinnriemen: "Chin strap",
  Schirm: "Peak",
  "feste Schale": "Hard shell",
  // Reitbahn
  "erster Hufschlag": "outside track",
  "zweiter Hufschlag": "inside track",
  "linke Hand": "left rein",
  "rechte Hand": "right rein",
  Tete: "Lead rider",
  Bande: "Arena wall",
  Reitrichtung: "Direction of travel",
  "Dressurviereck 20 × 60 m": "Dressage arena 20 × 60 m",
  "Hier sitzen die Richter bei C": "The judges sit here at C",
  // Gangarten
  "Schritt · Viertakt": "Walk · four-beat",
  "Trab · Zweitakt": "Trot · two-beat",
  "Rechtsgalopp · Dreitakt": "Right-lead canter · three-beat",
  "Linksgalopp · Dreitakt": "Left-lead canter · three-beat",
  "vorn links": "front left",
  "vorn rechts": "front right",
  "hinten links": "hind left",
  "hinten rechts": "hind right",
  // Hilfen
  Gewicht: "Weight",
  Schenkel: "Leg",
  Zügel: "Rein",
  Stimme: "Voice",
  "am Gurt": "at the girth",
  "hinter dem Gurt": "behind the girth",
  // Springen
  "1 · Anreiten": "1 · Approach",
  "2 · Absprung": "2 · Take-off",
  "3 · Flugphase": "3 · Flight",
  "4 · Landung": "4 · Landing",
  "5 · Weiterreiten": "5 · Getaway",
  Steilsprung: "Vertical",
  Oxer: "Oxer",
  Triplebarre: "Triple bar",
  Mauer: "Wall",
  Wassergraben: "Water jump",
  Kreuzsprung: "Cross-pole",
  Cavaletti: "Cavaletti",
  Weite: "Spread",
  "1 Galoppsprung": "1 canter stride",
  "2 Galoppsprünge": "2 canter strides",
  "Distanz zählen": "Count the distance",
  "Dreifache Kombination": "Treble combination",
  "ca. 10,5–11 m": "approx. 10.5–11 m",
  "ca. 7,5–8 m": "approx. 7.5–8 m",
  "ca. 18 m · 4 Galoppsprünge (je ca. 3,5 m)": "approx. 18 m · 4 canter strides (approx. 3.5 m each)",
  // Seitengänge
  "Geradeaus: 2 Hufspuren": "Straight: 2 tracks",
  Schenkelweichen: "Leg-yield",
  "Schulterherein: 3 Hufspuren": "Shoulder-in: 3 tracks",
  "Travers: 4 Hufspuren": "Travers: 4 tracks",
  "Renvers: 4 Hufspuren": "Renvers: 4 tracks",
  Traversale: "Half-pass",
  Vorhandwendung: "Turn on the forehand",
  Hinterhandwendung: "Turn on the haunches",
  Rückwärtsrichten: "Rein-back",
  "Pirouette im Galopp": "Canter pirouette",
  "Vorderbeine treten auf der Stelle": "Front legs step on the spot",
  "Hinterbeine treten auf der Stelle": "Hind legs step on the spot",
  "kleiner Kreis der Hinterbeine": "small circle of the hind legs",
  "diagonale Beinpaare, Schritt für Schritt zurück": "diagonal pairs of legs, step by step backwards",
};

export function translateSvgLabel(text: string, locale: string): string {
  return locale === "en" ? (EN[text.trim()] ?? text) : text;
}

/** Hook für Beschriftungen in Bildern */
export function useSvgLabel(): (text: string) => string {
  const locale = useLocale();
  return (text) => translateSvgLabel(text, locale);
}
