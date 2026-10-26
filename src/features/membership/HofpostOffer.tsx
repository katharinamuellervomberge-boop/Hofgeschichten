import Link from "next/link";
import { HofpostArt } from "@/components/illustrations/HofpostArt";
import { Icon } from "@/components/illustrations/Icons";
import { hofpost, membership as plan } from "@/content/membership";
import { site } from "@/content/site";
import type { MembershipStatus } from "@/lib/entitlements/server";
import styles from "./SalesPage.module.css";

const INSIDE = [
  "Alles aus der Founder-Mitgliedschaft „Mein Hof“: jeden Freitag Neues, Große Reitakademie, alle Detektivfälle",
  "12 echte Briefe – jeden Monat einer von Tivoli, Scrabble, Tonga oder Hofhund Krümel",
  "In jedem Brief: Pferdefoto, eine Aufgabe zum Malen, Basteln oder Entdecken, ein Sticker",
  "Ein Geheimwort im Brief öffnet eine Überraschung in der App",
  "Im ersten Brief: Sammelmappe und Stickerbogen",
  hofpost.shippingLabel,
];

/** Verkaufsabschnitt „Mein Hof + Hofpost“ (Founder-Jahresabo). Nur für Eltern, nie im Kinderbereich. */
export function HofpostOffer({ status }: { status: MembershipStatus }) {
  return (
    <section id="hofpost" aria-labelledby="sp-hofpost" className={`${styles.section} ${styles.hofpost}`}>
      <div className={styles.hofpostArt}>
        <HofpostArt />
        <span className={styles.hofpostBadge}>Neu</span>
      </div>
      <div className={styles.hofpostBody}>
        <p className="eyebrow">{hofpost.founderName}</p>
        <h2 id="sp-hofpost" className={styles.h2}>
          Echte Post vom Hof – jeden Monat.
        </h2>
        <p className={styles.lead} style={{ marginTop: 0 }}>
          Die App für jeden Tag und dazu ein Brief im Briefkasten, adressiert an Ihr Kind. Ein Jahr lang, zwölf Mal.
        </p>

        <div className={styles.price}>
          <span className={styles.priceLabel}>Jahresabo mit Hofpost · Founder-Preis</span>
          <span className={styles.priceValue}>
            {hofpost.price} <small>für das ganze erste Jahr</small>
          </span>
          <span className={styles.priceNote}>
            <strong>Einmaliger Jahresbeitrag inklusive 12 Briefe und Versand</strong> (rechnerisch {hofpost.perMonthEquivalent} im Monat). Regulär ab
            2027: {hofpost.regularPrice} im Jahr. Einzeln wären App und Briefe {hofpost.separateValue} wert. Nur {hofpost.founderSeats} Founder-Plätze, bis{" "}
            {hofpost.founderUntilLabel}.
          </span>
        </div>

        <p className={styles.shipNote}>
          <Icon name="star" />
          <span>
            <strong>Der erste Brief kommt {hofpost.firstLetterLabel}.</strong> Die App-Mitgliedschaft können Sie sofort nach dem Kauf
            freischalten. Bestellschluss für den Januar-Brief: {hofpost.orderDeadlineJanuary}.
          </span>
        </p>

        <ul className={styles.facts}>
          {INSIDE.map((t) => (
            <li key={t}>
              <Icon name="check" />
              <span>{t}</span>
            </li>
          ))}
        </ul>

        <HofpostCta status={status} />
        <p className={styles.ctaHint}>
          Schon Founder-Mitglied? Die Hofpost zum Dazubuchen folgt in Kürze. · <Link href="#bedingungen">Bedingungen</Link>
        </p>
      </div>
    </section>
  );
}

function HofpostCta({ status }: { status: MembershipStatus }) {
  if (!hofpost.checkoutUrl) {
    return (
      <p className={styles.soon} role="note">
        Die Hofpost ist in Kürze im {site.shopLabel} erhältlich.
      </p>
    );
  }
  return (
    <div className={styles.ctaWrap}>
      <a href={hofpost.checkoutUrl} className={`${styles.cta} ${styles.ctaHofpost}`} target="_blank" rel="noopener noreferrer">
        Jahresabo mit Hofpost bestellen
        <Icon name="external" />
      </a>
      <p className={styles.ctaHint}>
        Sicherer Checkout im Horse &amp; Harmonie Shop; dort geben Sie die Lieferadresse an. Den Vornamen Ihres Kindes für die Anrede im
        Brief fragen wir nach dem Kauf per E-Mail ab.{" "}
        {status.active
          ? "Die App-Mitgliedschaft ist auf diesem Gerät bereits aktiv."
          : `Den Freischaltcode für die App erhalten Sie nach dem Kauf per E-Mail (Fragen: ${plan.supportEmail}).`}
      </p>
    </div>
  );
}

/** Kurzer Hinweis im Hero auf die Hofpost */
export function HofpostHint() {
  return (
    <a href="#hofpost" className={styles.hofpostHint}>
      <Icon name="letter" />
      <span>
        <strong>Neu: mit echten Briefen vom Hof</strong> – {hofpost.price} im ersten Jahr, Versand ab Januar
      </span>
    </a>
  );
}
