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
  /** Rechtliche Seiten. null = noch nicht vorhanden (Elternbereich zeigt dann „Wird ergänzt“). */
  legal: {
    imprintUrl: "/impressum" as string | null,
    termsUrl: "/agb" as string | null,
    privacyUrl: null as string | null,
    withdrawalUrl: "/widerruf",
    /** Kündigungsbutton nach § 312k BGB – muss auf der Website immer erreichbar sein */
    cancelUrl: "/kuendigen",
  },
};
