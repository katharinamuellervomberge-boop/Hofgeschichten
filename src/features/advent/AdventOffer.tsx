import { Icon } from "@/components/illustrations/Icons";
import { adventskalender, grosseAkademie } from "@/content/products";
import styles from "./advent.module.css";

export type AdventAccess = "owned" | "member" | null;

export type OfferInfo = {
  access: AdventAccess;
};

/**
 * Produktanzeige für Eltern: Preise, Inhalt und der Weg zur Freischaltung.
 * Kauf-Knöpfe erscheinen erst, wenn die Shop-Links in content/products.ts gesetzt sind.
 */
export function AdventOffer({ access }: OfferInfo) {
  const a = adventskalender;
  if (access) {
    return (
      <section className={styles.offer} aria-labelledby="advent-offer">
        <h2 id="advent-offer" className={styles.sectionTitle}>
          Für Eltern
        </h2>
        <p className={styles.offerOk} style={{ marginTop: "var(--space-3)" }}>
          <Icon name="check" width={24} height={24} />
          {access === "member" ? "In Ihrer Hof-Mitgliedschaft enthalten – alle 24 Türchen sind auf diesem Gerät freigeschaltet." : "Auf diesem Gerät freigeschaltet – alle 24 Türchen."}
        </p>
        <p className={styles.offerFine}>
          Der Spielstand (Hufeisen, Stall, Karte) wird nur auf diesem Gerät gespeichert. Auf einem anderen Gerät beginnt der Kalender neu. Alle Türchen bleiben mindestens bis 31. Januar 2027 offen.
        </p>
      </section>
    );
  }
  const shopOpen = Boolean(a.checkoutUrl);
  return (
    <section className={styles.offer} aria-labelledby="advent-offer" id="kaufen">
      <span className={styles.kicker}>Für Eltern</span>
      <h2 id="advent-offer" className={styles.sectionTitle} style={{ marginTop: "var(--space-1)" }}>
        {a.fullName}
      </h2>
      <p className={styles.offerLead}>{a.parentInfo}</p>
      <ul className={styles.features}>
        {[
          "24 vollständige Geschichten-Kapitel mit Lea, Mila, Ben, Krümel und den Hofpferden",
          "Quiz, Zuordnen, Suchbilder, Entscheidungen, Geheimschrift und Zahlencodes – Fehler dürfen immer wiederholt werden",
          "Ein eigener Weihnachtsstall, der Tag für Tag festlicher wird",
          "24 goldene Hufeisen, ein Fundbuch und eine Urkunde zum Ausdrucken",
          "Ohne Konto, ohne Werbung, ohne Chat – das erste Türchen ist kostenlos",
        ].map((t) => (
          <li key={t}>
            <Icon name="check" />
            {t}
          </li>
        ))}
      </ul>

      <div className={styles.prices}>
        <div className={`${styles.price} ${styles.priceHighlight}`}>
          <span className={styles.priceLabel}>Adventskalender</span>
          <span className={styles.priceValue}>{a.price}</span>
          <span className={styles.priceNote}>einmalig, kein Abo</span>
          {shopOpen ? (
            <a href={a.checkoutUrl!} target="_blank" rel="noopener noreferrer" className={`${styles.btn} ${styles.btnGold} ${styles.btnSmall}`}>
              Zum Shop
              <Icon name="external" />
            </a>
          ) : (
            <span className={styles.priceNote}>Der Kauf im Shop öffnet in Kürze.</span>
          )}
        </div>
        <div className={styles.price}>
          <span className={styles.priceLabel}>Paket: {grosseAkademie.name} + Adventskalender</span>
          <span className={styles.priceValue}>{a.bundlePrice}</span>
          <span className={styles.priceNote}>Beides zusammen, einmalig</span>
          {a.bundleCheckoutUrl && (
            <a href={a.bundleCheckoutUrl} target="_blank" rel="noopener noreferrer" className={`${styles.btn} ${styles.btnGhost} ${styles.btnSmall}`}>
              Paket im Shop
              <Icon name="external" />
            </a>
          )}
        </div>
        <div className={styles.price}>
          <span className={styles.priceLabel}>Hof-Jahresmitglieder</span>
          <span className={styles.priceValue}>inklusive</span>
          <span className={styles.priceNote}>Mit aktiver Mitgliedschaft auf diesem Gerät ist der Kalender sofort offen.</span>
        </div>
      </div>

      <div className={styles.center}>
        <a href="/eltern#abenteuer" className={`${styles.btn} ${styles.btnGhost}`}>
          Schon gekauft? Hier freischalten
        </a>
      </div>
      <p className={styles.offerFine}>
        Freischaltung im Elternbereich mit Bestellnummer und E-Mail-Adresse oder mit einem Freischaltcode. Der Spielstand wird nur auf diesem Gerät gespeichert, eine geräteübergreifende Synchronisierung gibt es nicht.
      </p>
    </section>
  );
}
