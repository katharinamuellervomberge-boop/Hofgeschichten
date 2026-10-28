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
export const grosseAkademie = {
  /** Kennung für Freischaltcodes und das Berechtigungs-Cookie (nie ändern) */
  slug: "grosse-akademie",
  name: "Die Reitakademie",
  /**
   * true = Mitglieder bekommen die Akademie automatisch dazu (bis 27.10.2026 so).
   * Seit 28.10.2026 auf Wunsch der Inhaberin false – für alle Mitglieder, auch bestehende.
   */
  includedInMembership: false,
  /** Preis für den Einzelkauf, z. B. "9,90 €". null = noch nicht festgelegt */
  price: "14,90 €" as string | null,
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

/** Alle Paket-Kennungen, die im Berechtigungs-Cookie stehen dürfen */
export const productSlugs: string[] = [grosseAkademie.slug];
