import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/content/site";
import styles from "./LegalPage.module.css";

/** Gemeinsamer Rahmen für Impressum, AGB und spätere Rechtstexte. */
export function LegalPage({ title, subtitle, children }: { title: string; subtitle?: ReactNode; children: ReactNode }) {
  return (
    <div className={`page ${styles.wrap}`}>
      <Link href="/eltern" className={styles.back}>
        ← Zum Elternbereich
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

/** Kleine Linkzeile (Impressum · AGB · Datenschutz) für Startseite und Elternbereich. */
export function LegalLinks() {
  const items = [
    { href: site.legal.imprintUrl, label: "Impressum" },
    { href: site.legal.termsUrl, label: "AGB" },
    { href: site.legal.privacyUrl, label: "Datenschutz" },
  ].filter((i): i is { href: string; label: string } => Boolean(i.href));
  if (items.length === 0) return null;
  return (
    <ul className={styles.links} aria-label="Rechtliches">
      {items.map((i) => (
        <li key={i.label}>
          <Link href={i.href}>{i.label}</Link>
        </li>
      ))}
    </ul>
  );
}
