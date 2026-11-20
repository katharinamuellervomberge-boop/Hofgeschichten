"use client";

import { usePathname } from "next/navigation";
import Link from "@/i18n/Link";
import { localizePath, stripLocale } from "@/i18n/locale";
import { useLocale } from "@/i18n/LocaleProvider";
import type { ReactNode } from "react";
import { useProgress } from "@/lib/progress/store";
import { newStamps } from "@/lib/progress/stamps";
import styles from "./AppShell.module.css";

type Glyph = "home" | "academy" | "space" | "lab" | "profile" | "unlock";
type NavItem = { href: string; label: string; glyph: Glyph; hidden?: boolean; also?: string[]; title?: string };

/**
 * Leiste seit 18.11.2026 (Designsystem 2.0):
 * Start · Akademie · Riding Space · Rider Lab · Profil
 * Spielen und die früheren Hofwelt-Seiten bleiben erreichbar (Kachel auf der Startseite,
 * Direktlinks für Käufer); dort ist „Start“ markiert.
 * `also`: Seiten, bei denen der Punkt ebenfalls als aktiv markiert wird.
 */
const ALL_NAV: NavItem[] = [
  { href: "/", label: "Start", glyph: "home", also: ["/spielen", "/hoftag"] },
  { href: "/akademie", label: "Akademie", glyph: "academy", title: "Reitakademie" },
  /* Riding Space: Tagebuch, Planer, Coach, Fortschritt – mit Kauf oder Bestandsschutz, sonst Vorschau */
  { href: "/tagebuch", label: "Riding Space", glyph: "space", title: "Riding Space – Tagebuch, Planer, Coach" },
  /* Rider Lab – Übungen für den Reitersitz, Teil der Reitakademie */
  { href: "/akademie/rider-lab", label: "Rider Lab", glyph: "lab" },
  /* Lernfortschritt, Pass, Käufe und Einstellungen */
  { href: "/profil", label: "Profil", glyph: "profile", also: ["/pass", "/eltern"] },
];
const NAV = ALL_NAV.filter((n) => !n.hidden);

/**
 * Englische Version (seit 30.10.2026): Start, Reitakademie, Riding Space, Rider Lab (seit 19.11.2026) und Freischaltung.
 * Profil, Spielen und Hofwelt folgen, sobald sie übersetzt sind.
 */
const NAV_EN: NavItem[] = [
  { href: "/", label: "Home", glyph: "home" },
  { href: "/akademie", label: "Academy", glyph: "academy", title: "Riding Academy" },
  { href: "/tagebuch", label: "Riding Space", glyph: "space", title: "Riding Space – journal, planner, coach" },
  { href: "/akademie/rider-lab", label: "Rider Lab", glyph: "lab" },
  { href: "/eltern", label: "Unlock", glyph: "unlock" },
];

/** Feine Linien-Symbole der Leiste (1.5 px, currentColor) */
function NavGlyph({ name }: { name: Glyph }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden focusable="false">
      {name === "home" && <path {...p} d="M4 11l8-6 8 6v9h-5v-6H9v6H4z" />}
      {name === "academy" && <path {...p} d="M4 5h6a2 2 0 0 1 2 2v12a2 2 0 0 0-2-2H4zM20 5h-6a2 2 0 0 0-2 2v12a2 2 0 0 1 2-2h6z" />}
      {name === "space" && (
        <g {...p}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 4v3M12 17v3M4 12h3M17 12h3" />
          <circle cx="12" cy="12" r="1.4" fill="currentColor" />
        </g>
      )}
      {name === "lab" && (
        <g {...p}>
          <circle cx="12" cy="5" r="2" />
          <path d="M12 7v7M12 14l-4 6M12 14l4 6M6 10h12" />
        </g>
      )}
      {name === "profile" && (
        <g {...p}>
          <circle cx="12" cy="9" r="3.5" />
          <path d="M5 20c1.2-3.5 4-5 7-5s5.8 1.5 7 5" />
        </g>
      )}
      {name === "unlock" && (
        <g {...p}>
          <rect x="5" y="11" width="14" height="9" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 7.5-2" />
        </g>
      )}
    </svg>
  );
}

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
          <span>Eltern</span>
        </Link>
        )}
      </header>

      <main className={styles.main}>{children}</main>

      <nav className={styles.nav} aria-label={en ? "Main navigation" : "Hauptnavigation"}>
        <ul>
          {nav.map((item) => {
            const inLab = isActive(pathname, "/akademie/rider-lab");
            const active =
              (item.href === "/akademie" && inLab ? false : isActive(pathname, item.href)) ||
              (item.also ?? []).some((h) => isActive(pathname, h));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${styles.navItem} ${active ? styles.active : ""}`}
                  aria-current={active ? "page" : undefined}
                  title={item.title}
                >
                  <span className={styles.navIcon}>
                    <NavGlyph name={item.glyph} />
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
