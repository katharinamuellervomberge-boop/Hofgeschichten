"use client";

import { usePathname } from "next/navigation";
import Link from "@/i18n/Link";
import { localizePath, stripLocale } from "@/i18n/locale";
import { useLocale } from "@/i18n/LocaleProvider";
import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/illustrations/Icons";
import { useProgress } from "@/lib/progress/store";
import { newStamps } from "@/lib/progress/stamps";
import styles from "./AppShell.module.css";

type NavItem = { href: string; label: string; icon: IconName; hidden?: boolean; also?: string[] };

/**
 * Feste Leiste seit 28.10.2026 – fünf Punkte, überall gleich:
 * Start · Reitakademie · Spielen · Hofwelt · Profil
 * `also`: Seiten, bei denen der Punkt ebenfalls als aktiv markiert wird.
 */
const ALL_NAV: NavItem[] = [
  { href: "/", label: "Start", icon: "home" },
  { href: "/akademie", label: "Reitakademie", icon: "academy" },
  { href: "/spielen", label: "Spielen", icon: "puzzle" },
  /* Geschichten, Pferde, Figuren, Detektivfälle, Wochenpakete und Mitgliedschaft */
  { href: "/hofwelt", label: "Hofwelt", icon: "barn", also: ["/pferde", "/abenteuer", "/hofjahr", "/hoeren", "/mitgliedschaft"] },
  /* Lernfortschritt, Pass, Käufe und Einstellungen */
  { href: "/profil", label: "Profil", icon: "pass", also: ["/pass", "/eltern"] },
];
const NAV = ALL_NAV.filter((n) => !n.hidden);

/**
 * Englische Version (seit 30.10.2026): zunächst Start, Reitakademie und Freischaltung.
 * Weitere Bereiche kommen dazu, sobald sie übersetzt sind.
 */
const NAV_EN: NavItem[] = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/akademie", label: "Riding Academy", icon: "academy" },
  { href: "/eltern", label: "Unlock", icon: "parents" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
}

export function AppShell({ children }: { children: ReactNode }) {
  const locale = useLocale();
  const en = locale === "en";
  const pathname = stripLocale(usePathname() ?? "/");
  const progress = useProgress();
  const fresh = newStamps(progress).length;
  const inParents = pathname.startsWith("/eltern");
  const nav = en ? NAV_EN : NAV;
  // Sprachwechsel als normaler Link (volles Neuladen), damit Layout und Sprache sicher wechseln
  const switchHref = en ? pathname : localizePath(pathname, "en");

  return (
    <div className={styles.shell}>
      <header className={styles.topbar}>
        <Link href="/" className={styles.brand} aria-label={en ? "Hofgeschichten – home" : "Die Hofgeschichten – Startseite"}>
          <span className={styles.brandMark} aria-hidden>
            <Icon name="horseshoe" />
          </span>
          <span className={styles.brandText}>{en ? "Hofgeschichten" : "Die Hofgeschichten"}</span>
        </Link>
        <a href={switchHref} className={styles.lang} hrefLang={en ? "de" : "en"} lang={en ? "de" : "en"} aria-label={en ? "Deutsche Version" : "English version"}>
          {en ? "DE" : "EN"}
        </a>
        {!en && (
        <Link
          href="/eltern"
          className={`${styles.parents} ${inParents ? styles.parentsActive : ""}`}
          aria-current={inParents ? "page" : undefined}
        >
          <Icon name="parents" />
          <span>Eltern</span>
        </Link>
        )}
      </header>

      <main className={styles.main}>{children}</main>

      <nav className={styles.nav} aria-label={en ? "Main navigation" : "Hauptnavigation"}>
        <ul>
          {nav.map((item) => {
            const active = isActive(pathname, item.href) || (item.also ?? []).some((h) => isActive(pathname, h));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${styles.navItem} ${active ? styles.active : ""}`}
                  aria-current={active ? "page" : undefined}
                >
                  <span className={styles.navIcon}>
                    <Icon name={item.icon} />
                    {item.href === "/profil" && fresh > 0 && (
                      <span className={styles.dot} aria-label={`${fresh} neue Stempel`} />
                    )}
                  </span>
                  <span className={styles.navLabel}>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
