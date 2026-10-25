import Link from "next/link";
import { site } from "@/content/site";
import { Icon } from "@/components/illustrations/Icons";
import { ReleaseArt } from "@/components/illustrations/ReleaseArt";
import { PageHeader } from "@/components/ui/PageHeader";
import type { Release } from "@/content/membership";
import styles from "./hofjahr.module.css";

/**
 * Vorschau für Kinder: noch nicht freigeschaltet oder noch nicht veröffentlicht.
 * Bewusst ohne Preis und ohne Kauf-Knopf – das erledigen Erwachsene im Elternbereich.
 */
export function ReleaseLocked({ release, member }: { release: Release; member: boolean }) {
  const date = release.dateLabel.replace(/ 2026$/, "");
  return (
    <div className="page">
      <PageHeader title={release.title} backHref="/hofjahr" backLabel={`Zurück zu ${site.clubName}`} />
      <div className={styles.stack}>
        <div className={styles.heroArt}>
          <ReleaseArt art={release.art} />
        </div>
        <div className={styles.lockCard}>
          <span className={styles.lockIcon} aria-hidden>
            <Icon name={member ? "star" : "lock"} />
          </span>
          <h2 className={styles.lockTitle}>{member ? `Ab ${date} geht es los!` : release.teaser}</h2>
          <p className={styles.lockHint}>
            {member
              ? "Noch ein bisschen Geduld. Am Freitag öffnet sich dieses Abenteuer für dich."
              : `Ab ${date} gehört dieses Abenteuer zur Mitgliedschaft „${site.clubName}“. Deine Eltern können im Elternbereich mehr darüber lesen.`}
          </p>
          {!member && (
            <Link href="/eltern#mitgliedschaft" className={styles.parentLink}>
              <Icon name="parents" width={22} height={22} />
              Für Eltern
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
