import Link from "@/i18n/Link";
import type { ReactNode } from "react";
import { site } from "@/content/site";
import { LocalizedText } from "@/i18n/LocalizedText";
import styles from "./LegalPage.module.css";

/** Gemeinsamer Rahmen für Impressum, AGB und spätere Rechtstexte. */
export function LegalPage({ title, subtitle, children }: { title: string; subtitle?: ReactNode; children: ReactNode }) {
  return (
    <div className={`page ${styles.wrap}`}>
      <Link href="/eltern" className={styles.back}>
        <LocalizedText de="← Zum Elternbereich" en="← Back to unlocking" />
      </Link>
      <article className={styles.card}>
        <header>
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </header>
        {children}
      </article>
    </div>
  );
}

export function LegalSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className={styles.section}>
      <h2>{heading}</h2>
      {children}
    </section>
  );
}

export const legalStyles = styles;

/** Kleine Linkzeile (Impressum · AGB · Datenschutz · Widerruf · Kündigung) für Startseite und Elternbereich. */
export function LegalLinks({ locale = "de" }: { locale?: "de" | "en" }) {
  const items = (locale === "en" ? [
    { href: site.legal.imprintUrl, label: "Legal notice" },
    { href: site.legal.termsUrl, label: "Terms" },
    { href: site.legal.privacyUrl, label: "Privacy" },
    { href: site.legal.withdrawalUrl, label: "Right of withdrawal" },
    { href: site.legal.cancelUrl, label: "Cancel a contract" },
  ] : [
    { href: site.legal.imprintUrl, label: "Impressum" },
    { href: site.legal.termsUrl, label: "AGB" },
    { href: site.legal.privacyUrl, label: "Datenschutz" },
    { href: site.legal.withdrawalUrl, label: "Widerruf" },
    { href: site.legal.cancelUrl, label: "Verträge hier kündigen" },
  ]).filter((i): i is { href: string; label: string } => Boolean(i.href));
  if (items.length === 0) return null;
  return (
    <ul className={styles.links} aria-label={locale === "en" ? "Legal" : "Rechtliches"}>
      {items.map((i) => (
        <li key={i.label}>
          <Link href={i.href}>{i.label}</Link>
        </li>
      ))}
    </ul>
  );
}
