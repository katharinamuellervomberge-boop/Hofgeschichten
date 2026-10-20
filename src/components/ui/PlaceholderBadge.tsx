import type { ReactNode } from "react";
import styles from "./PlaceholderBadge.module.css";

/** Sichtbare Kennzeichnung für noch nicht produzierte Inhalte. */
export function PlaceholderBadge({ children = "Platzhalter" }: { children?: ReactNode }) {
  return (
    <span className={styles.badge} title="Dieser Inhalt ist ein Platzhalter und wird noch ersetzt.">
      {children}
    </span>
  );
}
