import type { Metadata } from "next";
import Link from "@/i18n/Link";
import { ARENA_EXERCISES, arenaHref } from "@/content/arena";
import styles from "@/features/arena/arena.module.css";

export const metadata: Metadata = { title: "Die Reitbahn", robots: { index: false } };

/** Übersicht der Reitbahn-Übungen (Prototyp) */
export default function Page() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <p className="eyebrow">Akademie</p>
        <h1 className={styles.heroTitle}>Die Reitbahn</h1>
        <p className={styles.heroLead}>Sieh die Linie. Versteh die Hilfen. Begreif die Bewegung.</p>
      </header>
      <ol className={styles.exList}>
        {ARENA_EXERCISES.map((e, i) => (
          <li key={e.id}>
            <Link href={arenaHref(e)} className={styles.exItem}>
              <span className={styles.exNum}>{String(i + 1).padStart(2, "0")}</span>
              <span>
                <span className={styles.exTitle}>{e.title}</span>
                <span className={styles.exMeta}>
                  {e.titleDe} · ca. {e.learnMinutes} Min · {e.reviewStatus === "freigegeben" ? "freigegeben" : "Entwurf"}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
