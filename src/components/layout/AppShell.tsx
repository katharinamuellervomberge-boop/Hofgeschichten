"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "/";
  const progress = useProgress();
  const fresh = newStamps(progress).length;
  const inParents = pathname.startsWith("/eltern");

  return (
    <div className={styles.shell}>
      <header className={styles.topbar}>
        <Link href="/" className={styles.brand} aria-label="Die Hofgeschichten – Startseite">
          <span className={styles.brandMark} aria-hidden>
            <Icon name="horseshoe" />
          </span>
          <span className={styles.brandText}>Die Hofgeschichten</span>
        </Link>
        <Link
          href="/eltern"
          className={`${styles.parents} ${inParents ? styles.parentsActive : ""}`}
          aria-current={inParents ? "page" : undefined}
        >
          <Icon name="parents" />
          <span>Eltern</span>
        </Link>
      </header>

      <main className={styles.main}>{children}</main>

      <nav className={styles.nav} aria-label="Hauptnavigation">
        <ul>
          {NAV.map((item) => {
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
