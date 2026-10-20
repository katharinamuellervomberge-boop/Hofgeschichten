export const site = {
  name: "Die Hofgeschichten",
  claim: "Echte Pferde. Große Abenteuer.",
  producer: "Horse & Harmonie Kids Originals",
  shopUrl: "https://horseandharmonie-shop.de",
  shopLabel: "horseandharmonie-shop.de",
  /**
   * Funktionsschalter. Hörspiele sind für den Launch ausgeblendet;
   * Code, Inhalte und Player bleiben erhalten (true = wieder sichtbar).
   */
  features: {
    audio: false,
    /**
     * Vorlesen (Lautsprecher-Knöpfe, automatisches Vorlesen, KI-Stimme).
     * Für den Launch aus – kommt zusammen mit den Hörspielen zurück.
     * true = wieder an; Sprecherskript und Stimm-Knopf sind erhalten (docs/STIMME.md).
     */
    voice: false,
  },
  /** Platzhalter – vor Veröffentlichung durch echte Seiten/Links ersetzen. */
  legal: {
    imprintUrl: null as string | null,
    privacyUrl: null as string | null,
  },
};
