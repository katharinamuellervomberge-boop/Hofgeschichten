/**
 * Einzeln kaufbare Pakete (außer Abenteuern, die stehen in adventures/index.ts).
 *
 * Die Große Reitakademie ist auf zwei Wegen erhältlich:
 *  1. in der Hof-Mitgliedschaft enthalten
 *  2. einzeln kaufbar (eigenes Shop-Produkt + Freischaltcode)
 *
 * Solange `checkoutUrl` null ist, zeigt die App KEINEN Kauf-Knopf für den
 * Einzelkauf (keine Platzhalter-Buttons) – nur den Weg über die Mitgliedschaft.
 */
export const grosseAkademie = {
  /** Kennung für Freischaltcodes und das Berechtigungs-Cookie (nie ändern) */
  slug: "grosse-akademie",
  name: "Die große Reitakademie",
  /** Preis für den Einzelkauf, z. B. "9,90 €". null = noch nicht festgelegt */
  price: null as string | null,
  /** Shopify-Produkt (Handle). Eine bezahlte Bestellung damit schaltet die Große Akademie frei. */
  shopifyProductHandle: null as string | null,
  /** Link zum Shop-Produkt. null = Einzelkauf noch nicht geöffnet */
  checkoutUrl: null as string | null,
  /** Kurzbeschreibung für Eltern */
  parentInfo:
    "Lernwelten 4–8 (Schritt, Trab, Galopp, Reiten in der Bahn, Fair zum Pferd) mit 25 Lektionen, die Mini-Spiele „Gangarten-Quiz“ und „Bahnfiguren-Meister“ und die Urkunde „Reitwissen-Profi“. Animationen und Lernvideos (z. B. Leichttraben, Bahnfiguren) kommen nach und nach dazu.",
};

/** Alle Paket-Kennungen, die im Berechtigungs-Cookie stehen dürfen */
export const productSlugs: string[] = [grosseAkademie.slug];
