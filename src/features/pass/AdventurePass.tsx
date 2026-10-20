"use client";

import { useEffect, useState } from "react";
import { StampSeal } from "@/components/illustrations/StampSeal";
import { PageHeader } from "@/components/ui/PageHeader";
import { publishedAdventures } from "@/content/adventures";
import { adventureStamps, freeStamps } from "@/content/stamps";
import type { StampInfo } from "@/content/types";
import { earnedStamps, newStamps } from "@/lib/progress/stamps";
import { progressActions, readProgress, useProgress } from "@/lib/progress/store";
import { speak } from "@/lib/speech";
import { phrases } from "@/lib/voice/phrases";
import styles from "./AdventurePass.module.css";

const TILTS = [-7, 4, -3, 6, -5, 3, -4, 7, -2];

function StampGrid({ list, earned, fresh }: { list: StampInfo[]; earned: Set<string>; fresh: string[] }) {
  return (
    <ul className={styles.grid}>
      {list.map((s, i) => {
        const has = earned.has(s.id);
        return (
          <li key={s.id}>
            <button
              type="button"
              className={`${styles.slot} ${has ? styles.has : ""}`}
              onClick={() => speak([phrases.stampTitle(s.title), has ? phrases.stampOwned : s.how])}
              aria-label={`${s.title}: ${has ? "gesammelt" : s.how}`}
            >
              <StampSeal stamp={s} earned={has} tilt={TILTS[i % TILTS.length]} className={styles.seal} />
              <span className={styles.title}>{s.title}</span>
              {!has && <span className={styles.how}>{s.how}</span>}
              {fresh.includes(s.id) && <span className={styles.new}>Neu!</span>}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

/** Abenteuerpass: Stempel der Hofwelt und – falls freigeschaltet – Detektiv-Abzeichen. */
export function AdventurePass({ owned }: { owned: string[] }) {
  const progress = useProgress();
  const earned = earnedStamps(progress);
  const [fresh, setFresh] = useState<string[]>([]);

  // Neue Stempel kurz hervorheben und dann als gesehen markieren
  useEffect(() => {
    const n = newStamps(readProgress());
    if (!n.length) return;
    setFresh(n);
    const t = window.setTimeout(() => progressActions.markStampsSeen(n), 1200);
    return () => window.clearTimeout(t);
  }, []);

  const ownedAdventures = publishedAdventures.filter((a) => a.access === "free" || owned.includes(a.slug));
  const all = [...freeStamps, ...ownedAdventures.flatMap((a) => adventureStamps(a.slug))];
  const count = all.filter((s) => earned.has(s.id)).length;

  return (
    <div className="page">
      <PageHeader
        title="Mein Abenteuerpass"
        spoken={[phrases.passIntro, phrases.passCount(count, all.length), phrases.passTap]}
      />

      <section className={styles.passport} aria-label="Stempel der Hofwelt">
        <div className={styles.cover}>
          <div>
            <p className={styles.kicker}>Die Hofgeschichten</p>
            <p className={styles.count}>
              <strong>{count}</strong> von {all.length} Stempeln
            </p>
          </div>
          <div className={styles.meter} aria-hidden>
            <span style={{ width: `${(count / Math.max(1, all.length)) * 100}%` }} />
          </div>
        </div>
        <h2 className={styles.sectionTitle}>Hofwelt</h2>
        <StampGrid list={freeStamps} earned={earned} fresh={fresh} />

        {ownedAdventures.map((a) => (
          <div key={a.slug} className={styles.adventure}>
            <h2 className={styles.sectionTitle}>Detektiv-Abzeichen: {a.title}</h2>
            <StampGrid list={adventureStamps(a.slug)} earned={earned} fresh={fresh} />
          </div>
        ))}
      </section>

      <p className={styles.note}>
        Dein Pass wird nur auf diesem Gerät gespeichert. Es gibt kein Konto und nichts wird verschickt.
      </p>
    </div>
  );
}
