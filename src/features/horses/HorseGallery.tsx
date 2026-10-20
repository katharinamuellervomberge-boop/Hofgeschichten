import Link from "next/link";
import { HorsePortrait } from "@/components/illustrations/HorsePortrait";
import { PageHeader } from "@/components/ui/PageHeader";
import { SpeakButton } from "@/components/ui/SpeakButton";
import type { Horse as HorseT } from "@/content/types";
import { phrases } from "@/lib/voice/phrases";
import styles from "./HorseGallery.module.css";

export function HorseGallery({ horses }: { horses: HorseT[] }) {
  return (
    <div className="page">
      <PageHeader
        title="Die Pferde"
        spoken={phrases.horsesHeader(horses.map((h) => h.name))}
      />
      <ul className={styles.grid}>
        {horses.map((h) => (
          <li key={h.slug} className={styles.item}>
            <Link href={`/pferde/${h.slug}`} className={styles.card} style={{ background: h.tint }}>
              <HorsePortrait horse={h} className={styles.horse} sizes="(min-width: 720px) 300px, 80vw" />
              <span className={styles.name}>{h.name}</span>
            </Link>
            <SpeakButton text={h.intro} label={`${h.name} vorlesen`} size="sm" className={styles.speak} />
          </li>
        ))}
      </ul>
    </div>
  );
}
