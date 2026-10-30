"use client";

import Link from "@/i18n/Link";
import { useEffect, useRef, useState } from "react";
import { StampSeal } from "@/components/illustrations/StampSeal";
import { allStamps } from "@/content/stamps";
import { earnedStamps } from "@/lib/progress/stamps";
import { readProgress, useProgress } from "@/lib/progress/store";
import { speak } from "@/lib/speech";
import { phrases } from "@/lib/voice/phrases";
import styles from "./NewStampNotice.module.css";

/**
 * Zeigt einen Stempel, sobald er auf DIESER Seite neu verdient wurde.
 * (Stempel, die schon beim Öffnen vorhanden waren, werden nicht erneut gefeiert.)
 */
export function NewStampNotice() {
  const progress = useProgress();
  const baseline = useRef<Set<string> | null>(null);
  const [shown, setShown] = useState<string[]>([]);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (baseline.current === null) {
      // Ausgangslage direkt aus dem Speicher (nicht aus dem Hydrations-Snapshot)
      baseline.current = earnedStamps(readProgress());
    }
    const now = earnedStamps(progress);
    const fresh = [...now].filter((id) => !baseline.current!.has(id));
    if (fresh.length) {
      baseline.current = now;
      setShown(fresh);
      setDismissed(false);
      const first = allStamps().find((s) => s.id === fresh[0]);
      if (first) speak(phrases.newStamp(first.title));
    }
  }, [progress]);

  if (!shown.length || dismissed) return null;
  const list = allStamps().filter((s) => shown.includes(s.id));

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true" aria-labelledby="stamp-title">
      <div className={styles.card}>
        <p className={styles.kicker}>Neuer Stempel!</p>
        <div className={styles.seals}>
          {list.map((s, i) => (
            <StampSeal key={s.id} stamp={s} earned tilt={i % 2 ? 6 : -6} className={styles.seal} />
          ))}
        </div>
        <h2 id="stamp-title" className={styles.title}>
          {list.map((s) => s.title).join(" & ")}
        </h2>
        <div className={styles.actions}>
          <Link href="/pass" className={styles.primary}>
            Zum Pass
          </Link>
          <button type="button" className={styles.secondary} onClick={() => setDismissed(true)}>
            Weiter
          </button>
        </div>
      </div>
    </div>
  );
}
