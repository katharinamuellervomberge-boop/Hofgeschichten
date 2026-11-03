/**
 * Einzeln kaufbare Pakete (außer Abenteuern, die stehen in adventures/index.ts).
 *
 * Die Reitakademie (früher „Große Reitakademie“) ist seit 28.10.2026 ein eigenes
 * Produkt: 14,90 € einmalig, dauerhafter Zugriff, kein Abo. Sie schaltet alle
 * Module frei; je Modul ist eine Probelektion kostenlos (module.ts).
 * Die Mitgliedschaft enthält die Akademie NICHT mehr (Schalter `includedInMembership`).
 *
 * Solange `checkoutUrl` null ist, zeigt die App KEINEN Kauf-Knopf für den
 * Einzelkauf (keine Platzhalter-Buttons) – nur den Weg über die Mitgliedschaft.
 */
/** 1.11.2026, 00:00 Uhr in Deutschland (MEZ) */
const PRICE_CHANGE_AT = Date.parse("2026-10-31T23:00:00Z");

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
   * Preis für den Einzelkauf. Einführungspreis 14,90 € bis 31.10.2026,
   * ab 1.11.2026 (00:00 Uhr deutscher Zeit) 19,90 € – Stand Produktseite im Shop.
   */
  get price(): string | null {
    return Date.now() >= PRICE_CHANGE_AT ? "19,90 €" : "14,90 €";
  },
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
    "Neun Module mit über 80 interaktiven Lektionen – Pferde verstehen, Umgang mit Pferden, Reiten lernen, Reiterhilfen, Bahnfiguren und Bahnregeln, Besser reiten, Dressur (bis zu Piaffe und Passage), Springen (Springsitz, Sprungphasen, Hindernisse, Distanzen, Parcours) und Akademie-Abschluss – mit Quiz, Übungen, 6 animierten Lernvideos und Teilnahmezertifikat. Drei Lernwege: Kids (6–11), Teen (12–17) und Adult (ab 18). Einmalzahlung, kein Abo.",
};

/**
 * Englische Version (seit 30.10.2026): gleiches Shopify-Produkt, englische Shop-Seite
 * über die Märkte USA (/en-us, US-Dollar) und Vereinigtes Königreich (/en-gb, Pfund).
 * Die Freischaltung läuft dadurch unverändert über Bestellnummer + E-Mail.
 */
const SHOP_BASE = "https://www.horseandharmonie-shop.de";

export function academyPriceLabel(locale: "de" | "en" = "de"): string {
  const de = grosseAkademie.price ?? "19,90 €";
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
 *  - Reitakademie-Kunden 8,90 € – gleiches Shop-Produkt, Rabatt über einen Shopify-Rabattcode,
 *    der NUR serverseitig an geprüfte Akademie-Besitzer angezeigt wird (siehe docs/ADVENTSKALENDER.md)
 *  - Paket Reitakademie + Adventskalender 27,90 € – eigenes Shop-Produkt, schaltet beides frei
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
  academyPrice: "8,90 €",
  bundlePrice: "27,90 €",
  /** Jahresmitglieder bekommen den Kalender ohne Aufpreis */
  includedInMembership: true,
  /** Geplanter Shopify-Handle des Einzelprodukts */
  shopifyProductHandle: "die-hofgeschichten-adventskalender-das-geheimnis-des-winterhofs",
  /** Geplanter Shopify-Handle des Pakets „Reitakademie + Adventskalender“ */
  bundleProductHandle: "die-hofgeschichten-reitakademie-und-adventskalender",
  /** Shop-Link Einzelprodukt. null = Kauf noch nicht geöffnet */
  checkoutUrl: null as string | null,
  /** Shop-Link Paket. null = Kauf noch nicht geöffnet */
  bundleCheckoutUrl: null as string | null,
  /** Türchen, die ohne Kauf spielbar sind (Kennenlernen) */
  freeDoors: [1] as number[],
  parentInfo:
    "24 interaktive Türchen vom 1. bis 24. Dezember: eine fortlaufende Weihnachts-Detektivgeschichte mit Lea, Mila, Ben, Krümel und den Hofpferden, spielerisches Pferdewissen, ein eigener Weihnachtsstall zum Dekorieren, 24 goldene Hufeisen zum Sammeln und eine Urkunde zum Ausdrucken. Für Kinder von 5 bis 12 Jahren. Einmalzahlung, kein Abo; alle Türchen bleiben mindestens bis 31. Januar 2027 offen.",
};

/** Alle Paket-Kennungen, die im Berechtigungs-Cookie stehen dürfen */
export const productSlugs: string[] = [grosseAkademie.slug, adventskalender.slug];
