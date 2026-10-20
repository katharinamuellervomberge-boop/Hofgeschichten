import type { AdventureMeta } from "../types";

/**
 * Öffentliche Angaben zu allen Abenteuern – OHNE Spielinhalte.
 * Die Missionen selbst liegen in `<slug>.server.ts` und werden nur
 * serverseitig an freigeschaltete Geräte ausgeliefert.
 *
 * Neues Abenteuer:
 *  1. Eintrag hier ergänzen (published: false, bis es fertig ist)
 *  2. `<slug>.server.ts` mit den Missionen anlegen und in `registry.server.ts` eintragen
 *  3. Produkt in Shopify mit passendem Handle anlegen
 */
export const adventures: AdventureMeta[] = [
  {
    slug: "geisterweide",
    title: "Das Geheimnis der Geisterweide",
    teaser: "Tivolis Halfter ist verschwunden! Löse den Fall in fünf Missionen.",
    parentInfo:
      "Interaktiver Halloween-Detektivfall in fünf zusammenhängenden Missionen: Suchbild, Spuren vergleichen, Pferdekörpersprache, Zahlencode und Auflösung. Spannend und herbstlich, aber nicht gruselig. Spielbar in den Stufen Leicht (4–6) und Mittel (7–9). Jede Mission ist wiederholbar.",
    season: "halloween",
    access: "premium",
    shopifyProductHandle: "das-geheimnis-der-geisterweide",
    priceLabel: "7,90 €",
    missions: [
      { id: "sattelkammer", title: "Die leere Sattelkammer" },
      { id: "spuren", title: "Spuren auf dem Hof" },
      { id: "nebel", title: "Nebel auf der Geisterweide" },
      { id: "schloss", title: "Das Zahlenschloss" },
      { id: "loesung", title: "Das Geheimnis wird gelüftet" },
    ],
    badge: { title: "Meisterdetektiv" },
    published: true,
  },
  {
    /* Interaktive Fassung von Print „Mystery Files · Case 02“. Noch nicht veröffentlicht. */
    slug: "geisterstall",
    title: "Mystery Files: Die Nacht im Geisterstall",
    teaser: "Auf dem Lindenhof brennt nachts die alte Laterne – und Hufspuren führen zu einer verschlossenen Tür. Löse den Fall vor Mitternacht!",
    parentInfo:
      "Interaktive Fassung des Print-Detektivfalls „Mystery Files · Case 02“ in sieben Missionen: Tatort untersuchen, Zeugenaussagen vergleichen, Hufspuren messen, Geheimschrift entziffern, Logikrätsel, Zeitleiste und Alibis prüfen. Für Kinder ab 7 Jahren (Stufe Mittel), etwa 60 bis 90 Minuten. Nebel, Nacht und eine Geisterlegende, aber ohne Gewalt und ohne echten Spuk – die Lösung ist realistisch und herzlich. Jede Mission ist wiederholbar.",
    season: "halloween",
    access: "premium",
    // Shopify-Produkt mit genau diesem Handle anlegen, sonst greift der Shop-Link nicht
    shopifyProductHandle: "mystery-files-die-nacht-im-geisterstall-app",
    priceLabel: "4,90 €",
    levels: ["mittel"],
    ageLabel: "ab 7 Jahren",
    missions: [
      { id: "morgen", title: "Der geheimnisvolle Morgen" },
      { id: "verdaechtige", title: "Wer war in der Nacht da?" },
      { id: "spuren", title: "Spuren und Geheimschrift" },
      { id: "sattelkammer", title: "Die alte Sattelkammer" },
      { id: "zeitleiste", title: "Die Halloween-Zeitleiste" },
      { id: "foto", title: "Der Zettel und das alte Foto" },
      { id: "mitternacht", title: "Mitternacht" },
    ],
    badge: { title: "Spürnase vom Lindenhof" },
    published: false,
  },
  /* ---------- Vorbereitet für nach dem Launch ---------- */
  {
    slug: "november-abenteuer",
    title: "November-Abenteuer (in Planung)",
    teaser: "",
    parentInfo: "",
    season: "november",
    access: "premium",
    shopifyProductHandle: "",
    priceLabel: "",
    missions: [],
    badge: { title: "" },
    published: false,
  },
  {
    slug: "weihnachts-detektive",
    title: "Weihnachts-Detektivwelt (in Planung)",
    teaser: "",
    parentInfo: "",
    season: "weihnachten",
    access: "premium",
    shopifyProductHandle: "",
    priceLabel: "",
    missions: [],
    badge: { title: "" },
    published: false,
  },
];

/**
 * Vorschau für noch nicht veröffentlichte Fälle: Slugs kommagetrennt in
 * NEXT_PUBLIC_PREVIEW_ADVENTURES (z. B. „geisterstall“). Bei Vercel NUR für
 * die Umgebung „Preview“ setzen, nie für „Production“. Freischalten muss man
 * den Fall dort trotzdem mit einem Code.
 */
const PREVIEW = (process.env.NEXT_PUBLIC_PREVIEW_ADVENTURES ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

/** Sichtbar = veröffentlicht oder per Vorschau-Schalter eingeblendet. */
export function isVisible(a: AdventureMeta): boolean {
  return a.published || PREVIEW.includes(a.slug);
}

export const publishedAdventures = adventures.filter(isVisible);

export function getAdventureMeta(slug: string): AdventureMeta | undefined {
  return adventures.find((a) => a.slug === slug && isVisible(a));
}

/** Shop-Link zum Produkt (nur im Elternbereich verwenden). */
export function productUrl(a: AdventureMeta, shopUrl: string): string {
  return a.shopifyProductHandle ? `${shopUrl}/products/${a.shopifyProductHandle}` : shopUrl;
}
