import type { Metadata } from "next";
import Link from "@/i18n/Link";
import { arenaFigures, arenaHref, variantsOf } from "@/content/arena";
import styles from "@/features/arena/arena.module.css";
import { DiaryPreview } from "@/features/tagebuch/DiaryPreview";
import { hasRidingSpace } from "@/lib/entitlements/server";

export const metadata: Metadata = { title: "Die Reitbahn – Riding Space", robots: { index: false } };
export const dynamic = "force-dynamic";

/** Übersicht der Reitbahn-Übungen – Teil des Riding Space */
export default async function Page() {
  if (!(await hasRidingSpace())) return <DiaryPreview />;
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <p className="eyebrow">Riding Space</p>
        <h1 className={styles.heroTitle}>Die Reitbahn</h1>
        <p className={styles.heroLead}>Sieh die Linie. Versteh die Hilfen. Begreif die Bewegung.</p>
      </header>
      {(
        [
          ["bahnfigur", "Bahnfiguren"],
          ["uebergang", "Übergänge"],
        ] as const
      ).map(([cat, heading]) => {
        const all = arenaFigures();
        const list = all.filter((e) => e.category === cat);
        if (!list.length) return null;
        return (
          <section key={cat} className={styles.exGroup}>
            <h2 className={styles.blockTitle}>{heading}</h2>
            <ol className={styles.exList}>
              {list.map((e) => (
                <li key={e.id}>
                  <Link href={arenaHref(e)} className={styles.exItem}>
                    <span className={styles.exNum}>{String(all.indexOf(e) + 1).padStart(2, "0")}</span>
                    <span>
                      <span className={styles.exTitle}>{e.title}</span>
                      <span className={styles.exMeta}>
                        {[e.changesRein ? "mit Handwechsel" : null, variantsOf(e).length > 1 ? variantsOf(e).map((v) => v.variantLabel).join(" / ") : null, `ca. ${e.learnMinutes} Min`, e.reviewStatus === "freigegeben" ? null : "Entwurf"]
                          .filter(Boolean)
                          .join(" · ")}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        );
      })}
    </div>
  );
}
