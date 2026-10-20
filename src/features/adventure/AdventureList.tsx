import Link from "next/link";
import { Icon } from "@/components/illustrations/Icons";
import { PageHeader } from "@/components/ui/PageHeader";
import type { AdventureMeta } from "@/content/types";
import { AdventureCover } from "./AdventureCover";
import { UI_SPEECH } from "@/content/ui-speech";
import styles from "./Adventure.module.css";

export function AdventureList({ list, owned }: { list: AdventureMeta[]; owned: string[] }) {
  return (
    <div className="page">
      <PageHeader title="Abenteuer" spoken={UI_SPEECH.adventuresHeader} />
      <ul className={styles.list}>
        {list.map((a) => {
          const has = a.access === "free" || owned.includes(a.slug);
          return (
            <li key={a.slug}>
              <Link href={`/abenteuer/${a.slug}`} className={styles.listCard}>
                <div className={styles.listCover}>
                  <AdventureCover slug={a.slug} />
                  <span className={styles.season}>Halloween</span>
                </div>
                <div className={styles.listBody}>
                  <h2 className={styles.listTitle}>{a.title}</h2>
                  <p className={styles.listTeaser}>{a.teaser}</p>
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
      <p className={styles.soon}>Weitere Abenteuer folgen – im November und zu Weihnachten.</p>
    </div>
  );
}
