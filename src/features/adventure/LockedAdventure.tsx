import Link from "next/link";
import { Icon } from "@/components/illustrations/Icons";
import { PageHeader } from "@/components/ui/PageHeader";
import type { AdventureMeta } from "@/content/types";
import { AdventureCover } from "./AdventureCover";
import { phrases } from "@/lib/voice/phrases";
import styles from "./Adventure.module.css";

/**
 * Ansicht für Kinder, wenn das Abenteuer auf diesem Gerät nicht freigeschaltet ist.
 * Bewusst ohne Preis und ohne Kauf-Knopf: Käufe erledigen Erwachsene im Elternbereich.
 */
export function LockedAdventure({ meta }: { meta: AdventureMeta }) {
  return (
    <div className="page">
      <PageHeader
        title={meta.title}
        spoken={phrases.adventureLocked(meta.title, meta.teaser)}
        backHref="/abenteuer"
        backLabel="Zurück zu den Abenteuern"
      />
      <div className={styles.hero}>
        <AdventureCover slug={meta.slug} />
      </div>
      <div className={styles.lockedCard}>
        <span className={styles.lockIcon} aria-hidden>
          <Icon name="lock" />
        </span>
        <p className={styles.lockedText}>{meta.teaser}</p>
        <p className={styles.lockedHint}>Dieses Abenteuer können deine Eltern freischalten.</p>
        <ol className={styles.missionPreview}>
          {meta.missions.map((m, i) => (
            <li key={m.id}>
              <span className={styles.missionNo}>{i + 1}</span>
              {m.title}
            </li>
          ))}
        </ol>
        <Link href="/eltern#abenteuer" className={styles.parentLink}>
          <Icon name="parents" width={22} height={22} />
          Für Eltern: Freischalten
        </Link>
      </div>
    </div>
  );
}
