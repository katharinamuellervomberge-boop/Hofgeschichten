/**
 * Einzeln kaufbare Pakete (außer Abenteuern, die stehen in adventures/index.ts).
 *
 * Die Reitakademie (früher „Große Reitakademie“) ist seit 28.10.2026 ein eigenes
 * Produkt: einmalig (seit 08.11.2026 29,90 €), dauerhafter Zugriff, kein Abo. Sie schaltet alle
 * Module frei; je Modul ist eine Probelektion kostenlos (module.ts).
 * Die Mitgliedschaft enthält die Akademie NICHT mehr (Schalter `includedInMembership`).
 *
 * Solange `checkoutUrl` null ist, zeigt die App KEINEN Kauf-Knopf für den
 * Einzelkauf (keine Platzhalter-Buttons) – nur den Weg über die Mitgliedschaft.
 */
export const grosseAkademie = {
  /** Kennung für Freischaltcodes und das Berechtigungs-Cookie (nie ändern) */
  slug: "grosse-akademie",
  name: "Die Reitakademie",
  /**
   * true = Mitglieder bekommen die Akademie automatisch dazu (bis 27.10.2026 so).
   * Seit 28.10.2026 auf Wunsch der Inhaberin false – für alle Mitglieder, auch bestehende.
   */
  includedInMembership: false,
  /**
   * Preis für den Einzelkauf. Verlauf: 14,90 € (bis 31.10.2026), 19,90 € (ab 01.11.2026),
   * 29,90 € (ab 07.11.2026, in der App angepasst am 08.11.2026) – Stand Produktseite im Shop.
   */
  price: "29,90 €" as string | null,
  /** Shopify-Produkt (Handle). Eine bezahlte Bestellung damit schaltet die Große Akademie frei. */
  shopifyProductHandle: "die-hofgeschichten-die-grosse-reitakademie-interaktiver-reitwissen-kurs" as string | null,
  /** Shopify-Produkt gid://shopify/Product/10990621163853 (angelegt 25.10.2026, aktiv seit 26.10.2026) */
  /**
   * Link zum Shop-Produkt. null = Einzelkauf noch nicht geöffnet.
   * Erst setzen, wenn das Produkt im Shop aktiv ist und die Freischaltkarte hängt:
   * "https://www.horseandharmonie-shop.de/products/die-hofgeschichten-die-grosse-reitakademie-interaktiver-reitwissen-kurs"
   */
  checkoutUrl: "https://www.horseandharmonie-shop.de/products/die-hofgeschichten-die-grosse-reitakademie-interaktiver-reitwissen-kurs" as string | null,
  /** Kurzbeschreibung für Eltern */
  parentInfo:
    "14 Module mit 157 interaktiven Lektionen – von Pferde verstehen, Umgang und Reiten lernen über Haltung, Fütterung, Gesundheit, Verhalten und Gelände bis zu Reitlehre Advanced, Dressur und Springen – mit Quiz, Übungen, 38 animierten Lernvideos, dem Rider Lab (20 Übungen für zu Hause) und Teilnahmezertifikat. Einmalzahlung, kein Abo.",
};

/**
 * Englische Version (seit 30.10.2026): gleiches Shopify-Produkt, englische Shop-Seite
 * über die Märkte USA (/en-us, US-Dollar) und Vereinigtes Königreich (/en-gb, Pfund).
 * Die Freischaltung läuft dadurch unverändert über Bestellnummer + E-Mail.
 */
const SHOP_BASE = "https://www.horseandharmonie-shop.de";

export function academyPriceLabel(locale: "de" | "en" = "de"): string {
  const de = grosseAkademie.price ?? "29,90 €";
  return locale === "en" ? `€${de.replace(/\s*€/, "").replace(",", ".")}` : de;
}

export function academyCheckoutUrl(locale: "de" | "en" = "de"): string | null {
  if (!grosseAkademie.checkoutUrl || !grosseAkademie.shopifyProductHandle) return grosseAkademie.checkoutUrl;
  return locale === "en" ? `${SHOP_BASE}/en/products/${grosseAkademie.shopifyProductHandle}` : grosseAkademie.checkoutUrl;
}

/** Im Browser: passender englischer Markt (USA oder UK) für den Kauf-Link */
export function regionalCheckoutUrl(): string {
  const handle = grosseAkademie.shopifyProductHandle ?? "";
  let us = false;
  try {
    const lang = navigator.language || "";
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    us = lang === "en-US" || tz.startsWith("America/");
  } catch {
    us = false;
  }
  // /en-us und /en-gb leiten Besucher aus anderen Ländern auf die deutsche Seite um – dann lieber /en (Shopify zeigt die Landeswährung)
  return `${SHOP_BASE}/${us ? "en-us" : "en"}/products/${handle}`;
}

/**
 * Adventskalender „Das Geheimnis des Winterhofs“ (Dezember 2026, seit 03.11.2026 vorbereitet).
 *
 * Preismodell (geplant):
 *  - Einzelpreis 12,90 €
 *  - Paket Reitakademie + Adventskalender 25,00 € – eigenes Shop-Produkt, schaltet beides frei
 *  - Hof-Mitglieder (Founder-Jahresmitgliedschaft, auch mit Hofpost): inklusive
 *
 * Solange `checkoutUrl` null ist, zeigt die App KEINEN Kauf-Knopf (wie bei der Akademie):
 * erst setzen, wenn das Produkt im Shop aktiv ist.
 * Wichtig für die Freischaltung per Bestellnummer: Produkttitel im Shop beginnen mit
 * „Die Hofgeschichten –“ und enthalten „Adventskalender“ (Rückfall in shopify.ts).
 */
export const adventskalender = {
  /** Kennung für Freischaltcodes und das Berechtigungs-Cookie (nie ändern) */
  slug: "adventskalender",
  name: "Das Geheimnis des Winterhofs",
  fullName: "HOFgeschichten – Das Geheimnis des Winterhofs",
  subtitle: "24 Tage. 24 Abenteuer. Ein Weihnachtsgeheimnis.",
  price: "12,90 €",
  bundlePrice: "25,00 €",
  /** Jahresmitglieder bekommen den Kalender ohne Aufpreis */
  includedInMembership: true,
  /** Geplanter Shopify-Handle des Einzelprodukts */
  shopifyProductHandle: "die-hofgeschichten-adventskalender-das-geheimnis-des-winterhofs",
  /** Geplanter Shopify-Handle des Pakets „Reitakademie + Adventskalender“ */
  bundleProductHandle: "die-hofgeschichten-reitakademie-adventskalender",
  /** Shop-Link Einzelprodukt. null = Kauf noch nicht geöffnet */
  /** Shopify gid://shopify/Product/11008604045645 (aktiv seit 03.11.2026) */
  checkoutUrl: "https://www.horseandharmonie-shop.de/products/die-hofgeschichten-adventskalender-das-geheimnis-des-winterhofs" as string | null,
  /** Shopify gid://shopify/Product/11008604176717 (aktiv seit 03.11.2026) */
  bundleCheckoutUrl: "https://www.horseandharmonie-shop.de/products/die-hofgeschichten-reitakademie-adventskalender" as string | null,
  /** Türchen, die ohne Kauf spielbar sind (Kennenlernen) */
  freeDoors: [1] as number[],
  parentInfo:
    "24 interaktive Türchen vom 1. bis 24. Dezember: eine fortlaufende Weihnachts-Detektivgeschichte mit Lea, Mila, Ben, Krümel und den Hofpferden, spielerisches Pferdewissen, ein eigener Weihnachtsstall zum Dekorieren, 24 goldene Hufeisen zum Sammeln und eine Urkunde zum Ausdrucken. Für Kinder von 5 bis 12 Jahren. Einmalzahlung, kein Abo; alle Türchen bleiben mindestens bis 31. Januar 2027 offen.",
};

/**
 * Spiel „Hofgeschichten – Mein Tag am Hof“ (seit 05.11.2026).
 *  - in der Hof-Mitgliedschaft inklusive
 *  - zusätzlich einzeln freischaltbar (Preis und Shop-Produkt noch offen)
 *  - ohne Freischaltung: der erste Hoftag zum Kennenlernen
 * Keine In-App-Käufe für Futter oder Pflege – alles im Spiel ist immer frei verfügbar.
 *
 * Solange `checkoutUrl` null ist, zeigt die App KEINEN Kauf-Knopf (wie bei der Akademie).
 * Für die Freischaltung per Bestellnummer: Produkttitel im Shop mit „Mein Tag am Hof“ (shopify.ts).
 */
export const meinTagAmHof = {
  /** Kennung für Freischaltcodes und das Berechtigungs-Cookie (nie ändern) */
  slug: "mein-tag-am-hof",
  name: "Mein Tag am Hof",
  fullName: "Hofgeschichten – Mein Tag am Hof",
  subtitle: "Dein Pferd. Dein Stall. Dein Tag.",
  /** Einzelpreis – noch nicht festgelegt */
  price: null as string | null,
  includedInMembership: true,
  /** Geplanter Shopify-Handle des Einzelprodukts */
  shopifyProductHandle: "die-hofgeschichten-mein-tag-am-hof",
  /** Shop-Link. null = Einzelkauf noch nicht geöffnet */
  checkoutUrl: null as string | null,
  /** Hoftage, die ohne Freischaltung spielbar sind */
  freeDays: 1,
  parentInfo:
    "Ein interaktives Pferdepflege-Spiel: Ihr Kind übernimmt einen ganzen Tag lang Verantwortung für Tivoli, Tonga oder Scrabble – Füttern, Wasser, Ausmisten, Putzen, Beobachten und Bewegung. Jeder Tag bringt neue kleine Ereignisse. Kein Zeitdruck, keine Strafen, keine Käufe im Spiel. Für Kinder von 6 bis 12 Jahren.",
};

/** Alle Paket-Kennungen, die im Berechtigungs-Cookie stehen dürfen */
/**
 * Riding Space (seit 14.11.2026 eigenes Produkt): Reitertagebuch, Trainingsplaner und Rider Coach.
 * 49,90 € für 12 Monate, endet automatisch – kein Abo, keine Verlängerung.
 * Freischaltung über Bestellnummer + E-Mail; gültig ab Kaufdatum für `termDays` Tage.
 * Nicht im Berechtigungs-Feld `adventures`, sondern mit eigenem Ablaufdatum im Cookie (token.ts, Feld `r`).
 *
 * Bestandsschutz: Wer die Reitakademie vor `legacyCutoff` gekauft hat (damals „mit Reitertagebuch“),
 * behält Tagebuch, Planer und Coach dauerhaft (token.ts, Feld `l`). Hof-Mitglieder behalten den Zugang ebenfalls.
 */
export const ridingSpace = {
  slug: "riding-space",
  name: "Riding Space",
  price: "49,90 €",
  termDays: 365,
  shopifyProductHandle: "riding-space-reitertagebuch-trainingsplaner-rider-coach",
  checkoutUrl: "https://www.horseandharmonie-shop.de/products/riding-space-reitertagebuch-trainingsplaner-rider-coach",
  /** Akademie-Käufe vor diesem Zeitpunkt enthalten das Tagebuch weiterhin (Unix-Sekunden, 15.11.2026 00:00 MEZ) */
  legacyCutoff: Math.floor(Date.UTC(2026, 10, 14, 23, 0, 0) / 1000),
  parentInfo:
    "Reitertagebuch, Trainingsplaner und Rider Coach: Reitstunden mit Fotos festhalten, Ziele mit Verlauf, Wochen- und Monatsplanung, regelbasierter Plan-Builder und ein Coach, der bei Problemen im Sattel passende Übungen vorschlägt. Alle Daten bleiben auf dem Gerät. 12 Monate Zugang, endet automatisch – kein Abo.",
};

export const productSlugs: string[] = [grosseAkademie.slug, adventskalender.slug, meinTagAmHof.slug];
