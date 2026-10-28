import Link from "next/link";
import { Icon } from "@/components/illustrations/Icons";
import { hofpost, membership as plan } from "@/content/membership";
import type { MembershipStatus } from "@/lib/entitlements/server";
import styles from "./ParentsArea.module.css";

const fmt = (iso: string) => new Date(iso).toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Berlin" });

/** Status der Mitgliedschaft auf diesem Gerät + Weg zur Verkaufsseite. */
export function MembershipPanel({ membership }: { membership: MembershipStatus }) {
  return (
    <section className={`${styles.card} ${styles.premium}`} aria-labelledby="mitgliedschaft" id="mitgliedschaft">
      <h2 id="mitgliedschaft">{plan.shortName}</h2>
      {membership.active ? (
        <>
          <p className={styles.productHead}>
            <span className={`${styles.pill} ${styles.pillOk}`}>Aktiv auf diesem Gerät</span>
          </p>
          <p className={styles.productInfo}>
            Zugang freigeschaltet bis einschließlich {fmt(new Date(new Date(membership.until).getTime() - 1000).toISOString())}. Alle
            Premium-Abenteuer sind spielbar, neue Inhalte öffnen sich jeden Freitag ab {plan.firstReleaseLabel} automatisch.
          </p>
          <p className={styles.settingHint}>
            Hofpost: Lieferadresse ändern oder Brief nicht angekommen? Schreiben Sie mit Ihrer Bestellnummer an {plan.supportEmail}. Adressen
            speichern wir nur im Shop, nicht in der App.
          </p>
          <p className={styles.settingHint}>
            Kündigung: jederzeit über <a href="/kuendigen">„Verträge hier kündigen“</a>. Gerätewechsel: unten „Freischaltung von
            diesem Gerät entfernen“, dann auf dem neuen Gerät freischalten.
          </p>
        </>
      ) : (
        <>
          <p className={styles.productInfo}>
            Ein ganzes Jahr voller Hofabenteuer: jeden Freitag ab {plan.firstReleaseLabel} neue Geschichten, Hofspiele,
            Pferdewissen-Lektionen und Detektivfälle – dazu alle bisherigen Premium-Abenteuer. {plan.name}: {plan.price} einmalig für das ganze
            erste Jahr, danach {plan.followUpPrice} {plan.followUpInterval}.
          </p>
          <p className={styles.productInfo}>
            <strong>Neu: {hofpost.name}.</strong> Dazu jeden Monat ein echter Brief von unseren Pferden an Ihr Kind – {hofpost.price} für das
            erste Jahr inklusive 12 Briefe und Versand. Der erste Brief kommt {hofpost.firstLetterLabel}.
          </p>
          <Link href="/mitgliedschaft" className={styles.shopLink}>
            <span>Mitgliedschaft und Hofpost ansehen</span>
            <Icon name="back" style={{ transform: "rotate(180deg)" }} />
          </Link>
        </>
      )}
    </section>
  );
}
