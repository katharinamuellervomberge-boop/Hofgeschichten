import Link from "next/link";
import { Icon } from "@/components/illustrations/Icons";
import { PageHeader } from "@/components/ui/PageHeader";
import { Shelf } from "@/components/ui/Shelf";
import { site } from "@/content/site";
import type { AdventureMeta } from "@/content/types";
import { AdventureCover } from "./AdventureCover";
import { UI_SPEECH } from "@/content/ui-speech";
import styles from "./Adventure.module.css";

const SEASON: Record<AdventureMeta["season"], string> = {
  halloween: "Halloween",
  november: "November",
  weihnachten: "Weihnachten",
  winter: "Winter",
  ganzjaehrig: "Ganzjährig",
};

/**
 * Abenteuer = Add-ons. Gleiche Regel wie überall: kostenlose Abenteuer (falls
 * vorhanden) oben im Gratis-Regal, die Detektivfälle zum Freischalten darunter.
 */
export function AdventureList({ list, owned }: { list: AdventureMeta[]; owned: string[] }) {
  const free = list.filter((a) => a.access === "free");
  const premium = list.filter((a) => a.access !== "free");
  return (
    <div className="page">
      <PageHeader title="Abenteuer" spoken={UI_SPEECH.adventuresHeader} />
      <div className={styles.shelves}>
        {free.length > 0 && (
          <Shelf kind="gratis" id="abenteuer-gratis" title="Abenteuer für alle">
            <Cards list={free} owned={owned} />
          </Shelf>
        )}
        <Shelf
          kind="premium"
          id="abenteuer-premium"
          title="Detektivfälle"
          label="Zum Freischalten"
          lead={`Jeder Fall einzeln – oder alle zusammen in der Mitgliedschaft „${site.clubName}“.`}
        >
          <Cards list={premium} owned={owned} />
        </Shelf>
      </div>
      <p className={styles.soon}>Weitere Abenteuer folgen – im November und zu Weihnachten.</p>
    </div>
  );
}

function Cards({ list, owned }: { list: AdventureMeta[]; owned: string[] }) {
  return (
      <ul className={styles.list}>
        {list.map((a) => {
          const has = a.access === "free" || owned.includes(a.slug);
          return (
            <li key={a.slug}>
              <Link href={`/abenteuer/${a.slug}`} className={styles.listCard}>
                <div className={styles.listCover}>
                  <AdventureCover slug={a.slug} />
                  <span className={styles.season}>{SEASON[a.season]}</span>
                </div>
                <div className={styles.listBody}>
                  <h2 className={styles.listTitle}>{a.title}</h2>
                  <p className={styles.listTeaser}>{a.teaser}</p>
                  {a.ageLabel && <p className={styles.listAge}>Für Detektive {a.ageLabel}</p>}
                  <span className={`${styles.status} ${has ? styles.statusOpen : ""}`}>
                    <Icon name={has ? "play" : "lock"} width={18} height={18} />
                    {has ? "Spielen" : "Von Eltern freischaltbar"}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
  );
}
