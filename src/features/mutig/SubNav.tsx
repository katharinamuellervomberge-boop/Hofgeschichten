"use client";

import { usePathname } from "next/navigation";
import Link from "@/i18n/Link";
import styles from "./mutig.module.css";

const ITEMS = [
  ["/mutig-reiten", "Programm"],
  ["/mutig-reiten/leiter", "Mut-Leiter"],
  ["/mutig-reiten/werkzeuge", "Werkzeuge"],
  ["/mutig-reiten/tagebuch", "Tagebuch"],
  ["/mutig-reiten/hilfe", "Hilfe"],
] as const;

export function SubNav() {
  const path = usePathname() ?? "";
  return (
    <nav className={styles.subnav} aria-label="Mutig reiten">
      {ITEMS.map(([href, label]) => (
        <Link key={href} href={href} aria-current={path === href ? "page" : undefined}>
          {label}
        </Link>
      ))}
    </nav>
  );
}
