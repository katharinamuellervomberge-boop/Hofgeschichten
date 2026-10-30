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
  return locale === "en" ? `${SHOP_BASE}/en-gb/products/${grosseAkademie.shopifyProductHandle}` : grosseAkademie.checkoutUrl;
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
  return `${SHOP_BASE}/${us ? "en-us" : "en-gb"}/products/${handle}`;
}

/** Alle Paket-Kennungen, die im Berechtigungs-Cookie stehen dürfen */
export const productSlugs: string[] = [grosseAkademie.slug];
