"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/illustrations/Icons";
import { site } from "@/content/site";
import { useProgress } from "@/lib/progress/store";
import { newStamps } from "@/lib/progress/stamps";
import styles from "./AppShell.module.css";

const NAV: Array<{ href: string; label: string; icon: IconName; hidden?: boolean }> = [
  { href: "/", label: "Start", icon: "home" },
  { href: "/hoeren", label: "Hören", icon: "headphones", hidden: !site.features.audio },
  { href: "/pferde", label: "Pferde", icon: "horseshoe" },
  { href: "/spielen", label: "Spielen", icon: "puzzle" },
  { href: "/abenteuer", label: "Abenteuer", icon: "lupe" },
  { href: "/pass", label: "Pass", icon: "pass" },
].filter((n) => !n.hidden);

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
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${styles.navItem} ${active ? styles.active : ""}`}
                  aria-current={active ? "page" : undefined}
                >
                  <span className={styles.navIcon}>
                    <Icon name={item.icon} />
                    {item.href === "/pass" && fresh > 0 && (
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
