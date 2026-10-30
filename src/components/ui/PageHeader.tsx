import Link from "@/i18n/Link";
import type { ReactNode } from "react";
import { Icon } from "@/components/illustrations/Icons";
import type { Speech } from "@/lib/speech";
import { SpeakButton } from "./SpeakButton";
import styles from "./PageHeader.module.css";

type Props = {
  title: string;
  /** Text zum Vorlesen; Standard ist der Titel */
  spoken?: Speech;
  backHref?: string;
  backLabel?: string;
  children?: ReactNode;
};

export function PageHeader({ title, spoken, backHref, backLabel = "Zurück", children }: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.row}>
        {backHref && (
          <Link href={backHref} className={styles.back} aria-label={backLabel}>
            <Icon name="back" />
          </Link>
        )}
        <h1 className={styles.title}>{title}</h1>
        <SpeakButton text={spoken ?? title} />
      </div>
      {children && <div className={styles.extra}>{children}</div>}
    </header>
  );
}
