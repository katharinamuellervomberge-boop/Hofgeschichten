import { PageHeader } from "@/components/ui/PageHeader";
import { ACADEMY_TIERS } from "@/content/akademie";
import { UnlockHint } from "./AcademyOverview";
import styles from "./akademie.module.css";

/** Seite einer verschlossenen Lernwelt, Lektion oder eines Spiels der Großen Akademie – ohne Inhalte. */
export function AcademyLocked({ title }: { title: string }) {
  return (
    <div className="page">
      <PageHeader title={title} backHref={ACADEMY_TIERS.gross.href} backLabel="Zurück zur Großen Akademie" />
      <div className={styles.stack}>
        <UnlockHint />
      </div>
    </div>
  );
}
