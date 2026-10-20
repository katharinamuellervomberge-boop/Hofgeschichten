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

export const publishedAdventures = adventures.filter((a) => a.published);

export function getAdventureMeta(slug: string): AdventureMeta | undefined {
  return adventures.find((a) => a.slug === slug && a.published);
}

/** Shop-Link zum Produkt (nur im Elternbereich verwenden). */
export function productUrl(a: AdventureMeta, shopUrl: string): string {
  return a.shopifyProductHandle ? `${shopUrl}/products/${a.shopifyProductHandle}` : shopUrl;
}
