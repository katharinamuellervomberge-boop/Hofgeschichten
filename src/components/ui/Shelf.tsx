import type { ReactNode } from "react";
import { Icon } from "@/components/illustrations/Icons";
import styles from "./Shelf.module.css";

export type ShelfKind = "gratis" | "premium";

/**
 * Ein „Regal“ auf einer Bereichsseite. Feste Regel in der ganzen App:
 * oben das Gratis-Regal (grün), darunter das Premium-Regal (gold) – nie gemischt.
 */
export function Shelf({
  kind,
  title,
  lead,
  label,
  id,
  children,
}: {
  kind: ShelfKind;
  title: string;
  lead?: ReactNode;
  /** Text im Etikett; Standard „Gratis“ bzw. „Premium“ */
  label?: string;
  id: string;
  children: ReactNode;
}) {
  return (
    <section className={`${styles.shelf} ${styles[kind]}`} aria-labelledby={id}>
      <div className={styles.head}>
        <ShelfLabel kind={kind}>{label}</ShelfLabel>
        <h2 id={id} className={styles.title}>
          {title}
        </h2>
        {lead && <p className={styles.lead}>{lead}</p>}
      </div>
      {children}
    </section>
  );
}

/** Das Etikett allein – auch für einzelne Karten (gleiche Farben wie die Regale) */
export function ShelfLabel({ kind, children, onDark }: { kind: ShelfKind; children?: ReactNode; onDark?: boolean }) {
  return (
    <span className={`${styles.label} ${kind === "gratis" ? styles.labelGratis : styles.labelPremium} ${onDark ? styles.onDark : ""}`}>
      <Icon name={kind === "gratis" ? "check" : "star"} />
      {children ?? (kind === "gratis" ? "Gratis" : "Premium")}
    </span>
  );
}
