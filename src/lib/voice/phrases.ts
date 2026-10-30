/**
 * Alle zusammengesetzten Sätze, die vorgelesen werden.
 *
 * Wichtig: App UND Sprecherskript (scripts/voice-export.ts) bauen Sätze
 * ausschließlich über diese Funktionen. So hat jeder Satz, den die App
 * sagt, auch eine passende Aufnahme im Skript.
 *
 * Längere Ansagen werden als Liste einzelner Sätze gesprochen (Segmente),
 * damit nicht jede Kombination einzeln aufgenommen werden muss.
 */

export const ORDINALS = ["erste", "zweite", "dritte", "vierte"] as const;

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const phrases = {
  /* ----- Suchbild ----- */
  whereIs: (label: string) => `Wo ist ${label}?`,
  andNowWhereIs: (label: string) => `Und jetzt: Wo ist ${label}?`,
  thisIs: (label: string) => `Das ist ${label}.`,
  searchedIs: (label: string) => `Gesucht ist ${label}.`,
  notHere: (label: string) => `Hier ist nicht ${label}. Versuch es woanders.`,
  found: (label: string) => `Gefunden: ${label}!`,
  missDefault: "Da ist nichts. Schau dir das Bild noch einmal genau an.",

  /* ----- Auswahl ----- */
  tryAgain: "Hmm, noch nicht. Versuch es noch einmal!",
  optionLabel: (label: string) => `${label.replace(/[.!?]$/, "")}.`,

  /* ----- Zuordnen ----- */
  doesNotFit: (item: string) => `${item} passt hier nicht.`,
  tryOtherTask: "Probier eine andere Aufgabe.",

  /* ----- Zahlenschloss ----- */
  digitLabel: (i: number) => `${cap(ORDINALS[i])} Zahl:`,
  digitWrong: (i: number) => `Die ${ORDINALS[i]} Zahl stimmt noch nicht.`,

  /* ----- Geheimschrift ----- */
  cipherPick: "Tippe auf ein Zeichen und dann auf den passenden Buchstaben.",
  cipherWrong: (letter: string) => `Das Zeichen für ${letter} sieht anders aus.`,
  cipherRight: (letter: string) => `Richtig, das ist ein ${letter}!`,

  /* ----- Stempel & Abschluss ----- */
  newStamp: (title: string) => `Super! Du hast einen neuen Stempel bekommen: ${title}.`,
  gameDone: (title: string) => `Geschafft! Super gemacht. Du hast den Stempel ${title}.`,
  stampTitle: (title: string) => `${title}.`,
  stampOwned: "Den hast du schon!",
  missionDone: (next: number) => `Mission geschafft! Weiter geht's mit Mission ${next}.`,
  caseSolved: (badge: string) => `Fall gelöst! Du bist jetzt ${badge}!`,
  missionHeader: (n: number, title: string) => `Mission ${n}: ${title}`,

  /* ----- Seiten ----- */
  level: (label: string, ages: string) => `${label}. Für ${ages.replace(/\s*–\s*/, " bis ")}.`,
  passIntro: "Dein Abenteuerpass.",
  passCount: (count: number, total: number) => `Du hast ${count} von ${total} Stempeln.`,
  passTap: "Tippe auf einen Stempel.",
  horsesHeader: (names: string[]) => `Die Pferde vom Hof: ${names.join(", ")}. Tippe auf ein Pferd.`,
  adventureHeader: (title: string, teaser: string) => [`${title}.`, teaser, "Tippe auf eine Mission."],
  adventureLocked: (title: string, teaser: string) => [`${title}.`, teaser, "Dieses Abenteuer können deine Eltern freischalten."],
  gameTile: (title: string, intro: string) => [`${title}.`, intro],
};

const ORDINALS_EN = ["first", "second", "third", "fourth"] as const;

/** Englische Fassung (gleiche Schlüssel) – für die englische Version der App */
export const phrasesEn: typeof phrases = {
  whereIs: (label) => `Where is ${label}?`,
  andNowWhereIs: (label) => `And now: where is ${label}?`,
  thisIs: (label) => `That is ${label}.`,
  searchedIs: (label) => `We're looking for ${label}.`,
  notHere: (label) => `${cap(label)} isn't here. Try somewhere else.`,
  found: (label) => `Found: ${label}!`,
  missDefault: "Nothing there. Take another close look at the picture.",
  tryAgain: "Hmm, not quite. Try again!",
  optionLabel: (label) => `${label.replace(/[.!?]$/, "")}.`,
  doesNotFit: (item) => `${item} doesn't fit here.`,
  tryOtherTask: "Try another one.",
  digitLabel: (i) => `${cap(ORDINALS_EN[i])} number:`,
  digitWrong: (i) => `The ${ORDINALS_EN[i]} number isn't right yet.`,
  cipherPick: "Tap a symbol and then the matching letter.",
  cipherWrong: (letter) => `The symbol for ${letter} looks different.`,
  cipherRight: (letter) => `Right, that's a ${letter}!`,
  newStamp: (title) => `Great! You've got a new stamp: ${title}.`,
  gameDone: (title) => `Done! Well played. You've earned the stamp ${title}.`,
  stampTitle: (title) => `${title}.`,
  stampOwned: "You already have this one!",
  missionDone: (next) => `Mission complete! On to mission ${next}.`,
  caseSolved: (badge) => `Case solved! You're now ${badge}!`,
  missionHeader: (n, title) => `Mission ${n}: ${title}`,
  level: (label, ages) => `${label}. For ages ${ages.replace(/\s*–\s*/, " to ")}.`,
  passIntro: "Your adventure pass.",
  passCount: (count, total) => `You have ${count} of ${total} stamps.`,
  passTap: "Tap a stamp.",
  horsesHeader: (names) => `The horses on the farm: ${names.join(", ")}. Tap a horse.`,
  adventureHeader: (title, teaser) => [`${title}.`, teaser, "Tap a mission."],
  adventureLocked: (title, teaser) => [`${title}.`, teaser, "Your parents can unlock this adventure."],
  gameTile: (title, intro) => [`${title}.`, intro],
};
