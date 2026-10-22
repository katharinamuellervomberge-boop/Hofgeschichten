/**
 * Hof-Mitgliedschaft – zentrale Konfiguration.
 *
 * Alles, was sich Woche für Woche ändert, steht HIER:
 *  - das Angebot (Preis, Laufzeit, Shop-Produkt)
 *  - die Freitagsveröffentlichungen (`releases`)
 *  - die redaktionelle Jahresplanung (`yearPlan`)
 *
 * Neue Freitagsfolge: Eintrag in `releases` ergänzen. Ist sie spielbar,
 * zusätzlich die Inhalte in `src/content/premium/<slug>.server.ts` anlegen und
 * in `src/content/premium/registry.server.ts` eintragen. Die App zeigt die
 * Vorschau sofort und öffnet den Inhalt für Mitglieder automatisch ab `releaseAt`.
 */

export const membership = {
  /** Interne Kennung, auch für Freischaltcodes (nie ändern) */
  slug: "mitgliedschaft",
  name: "Founder-Jahresmitgliedschaft",
  shortName: "Hof-Mitgliedschaft",
  /** Preis der ersten 12 Monate, einmalig zu Beginn fällig (AGB § 4.1) */
  price: "39,90 €",
  /** Rechnerischer Monatswert im ersten Jahr – nur zur Erklärung, es wird nicht monatlich abgerechnet */
  perMonthEquivalent: "3,33 €",
  priceCents: 3990,
  termMonths: 12,
  /** Folgepreis für Founder ab dem 13. Monat (AGB § 4.1 Abs. 4) */
  followUpPrice: "9,90 €",
  followUpInterval: "monatlich",
  /** Geplante reguläre Preise für spätere Neukunden – ausdrücklich noch nicht verbindlich */
  plannedRegular: [
    { label: "Jahresmitgliedschaft", price: "99 € pro Jahr" },
    { label: "Monatsmitgliedschaft", price: "9,90 € pro Monat" },
  ],
  /** Shopify-Produkt (Handle). Eine bezahlte Bestellung mit diesem Produkt schaltet die Mitgliedschaft frei. */
  shopifyProductHandle: "hof-stories-founder-jahresmitgliedschaft",
  /** Shopify-Produkt gid://shopify/Product/10985326346573 (angelegt 22.10.2026, Status Entwurf) */
  /**
   * Link zum Kauf. null = Verkauf noch nicht geöffnet → die Verkaufsseite zeigt
   * KEINEN Kauf-Knopf (keine Platzhalter-Buttons). Erst setzen, wenn das
   * Shop-Produkt aktiv ist und Abo-Option, Widerrufsbelehrung und Datenschutz stehen.
   */
  checkoutUrl: "https://www.horseandharmonie-shop.de/products/hof-stories-founder-jahresmitgliedschaft" as string | null,
  firstReleaseLabel: "November 2026",
  /** Auf wie vielen Geräten ein Mitgliedscode gleichzeitig aktiv sein darf (Server-Standard, per MEMBERSHIP_DEVICE_LIMIT änderbar) */
  defaultDeviceLimit: 1,
  supportEmail: "infohorseandharmonie@gmail.com",
};

/* ---------- Freitagsveröffentlichungen ---------- */

export type ReleaseCategory = "Hofgeschichte" | "Reitakademie" | "Hofspiel" | "Detektivabenteuer";

export type ReleaseArt = "hof" | "sprache" | "stall" | "advent";

export type Release = {
  /** Adresse /hofjahr/<slug> und Schlüssel im Fortschritt (nie ändern) */
  slug: string;
  /** Veröffentlichung (deutsche Zeit). Vorher ist der Inhalt auch für Mitglieder gesperrt. */
  releaseAt: string;
  dateLabel: string;
  title: string;
  category: ReleaseCategory;
  /** Ein Satz für Kinder */
  teaser: string;
  /** Beschreibung für Eltern */
  description: string;
  contents: string[];
  art: ReleaseArt;
  /** true = Inhalte sind fertig gebaut und liegen serverseitig bereit */
  ready: boolean;
};

export const releases: Release[] = [
  {
    slug: "willkommen-auf-dem-hof",
    releaseAt: "2026-11-06T07:00:00+01:00",
    dateLabel: "Freitag, 6. November 2026",
    title: "Willkommen auf dem Hof",
    category: "Hofgeschichte",
    teaser: "Lea, Mila, Ben und Krümel zeigen dir ihren Hof.",
    description: "Eine neue interaktive Geschichte: Die Kinder lernen Lea, Mila, Ben und Hofhund Krümel kennen, treffen kleine Entscheidungen und schließen mit einem Quiz ab.",
    contents: ["Interaktive Hofgeschichte", "Kennenlernen der Charaktere", "Kleine Entscheidungen", "Abschlussquiz"],
    art: "hof",
    ready: false,
  },
  {
    slug: "sprache-der-pferde",
    releaseAt: "2026-11-13T07:00:00+01:00",
    dateLabel: "Freitag, 13. November 2026",
    title: "Die Sprache der Pferde",
    category: "Reitakademie",
    teaser: "Was sagen Ohren, Augen und Körper eines Pferdes?",
    description: "Ein neues Modul der Reitakademie: Pferdekörpersprache an Ohren, Augen und Haltung erkennen, mit interaktiven Wissensfragen und Sammelabzeichen.",
    contents: ["Pferdekörpersprache", "Ohren, Augen und Körperhaltung", "Interaktive Wissensfragen", "Sammelabzeichen"],
    art: "sprache",
    ready: true,
  },
  {
    slug: "ein-tag-auf-dem-hof",
    releaseAt: "2026-11-20T07:00:00+01:00",
    dateLabel: "Freitag, 20. November 2026",
    title: "Ein Tag auf dem Hof",
    category: "Hofspiel",
    teaser: "Übernimm einen ganzen Tag lang Verantwortung auf dem Hof.",
    description: "Das erste große interaktive Hofspiel in sechs Teilen: vom Morgen über Füttern, Stallarbeit, Weide und Pflege bis zum Abendrundgang.",
    contents: ["Pferde versorgen", "Stallarbeit", "Weide", "Pflege", "Verantwortung übernehmen"],
    art: "stall",
    ready: true,
  },
  {
    slug: "geheimnis-vor-dem-ersten-advent",
    releaseAt: "2026-11-27T07:00:00+01:00",
    dateLabel: "Freitag, 27. November 2026",
    title: "Das Geheimnis vor dem ersten Advent",
    category: "Detektivabenteuer",
    teaser: "Ein Rätsel kurz vor dem ersten Advent – findest du die Lösung?",
    description: "Ein interaktives November-Abenteuer mit Rätseln, Hinweisen und einer zusammenhängenden Geschichte.",
    contents: ["Zusammenhängende Geschichte", "Rätsel und Hinweise", "Detektivbuch"],
    art: "advent",
    ready: false,
  },
];

/* ---------- Jahresplanung (redaktionell, keine Zusage bestimmter Spiele) ---------- */

export type Season = "herbst" | "winter" | "fruehling" | "sommer";

export const yearPlan: Array<{ month: string; year: number; theme: string; season: Season }> = [
  { month: "November", year: 2026, theme: "Willkommen auf dem Hof", season: "herbst" },
  { month: "Dezember", year: 2026, theme: "Weihnachten auf dem Hof", season: "winter" },
  { month: "Januar", year: 2027, theme: "Winter im Stall", season: "winter" },
  { month: "Februar", year: 2027, theme: "Freundschaft & Pferdesprache", season: "winter" },
  { month: "März", year: 2027, theme: "Der Frühling erwacht", season: "fruehling" },
  { month: "April", year: 2027, theme: "Neue Abenteuer auf der Weide", season: "fruehling" },
  { month: "Mai", year: 2027, theme: "Das große Hofgeheimnis", season: "fruehling" },
  { month: "Juni", year: 2027, theme: "Sommer in der Reitakademie", season: "sommer" },
  { month: "Juli", year: 2027, theme: "Ferien auf dem Hof", season: "sommer" },
  { month: "August", year: 2027, theme: "Das große Sommerabenteuer", season: "sommer" },
  { month: "September", year: 2027, theme: "Zurück im Stall", season: "herbst" },
  { month: "Oktober", year: 2027, theme: "Geheimnisvoller Herbst", season: "herbst" },
];

export function getRelease(slug: string): Release | undefined {
  return releases.find((r) => r.slug === slug);
}

/** Ist der Veröffentlichungstermin erreicht? (Zeit wird auf dem Server geprüft) */
export function isReleased(r: Release, now: Date = new Date()): boolean {
  return now.getTime() >= new Date(r.releaseAt).getTime();
}
