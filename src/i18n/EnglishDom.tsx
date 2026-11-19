"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import type { DomTranslator } from "./dom-translate";

/** Wörterbücher für die Übersetzung im Browser – je Bereich ein eigener, nachgeladener Teil */
const PACKS = {
  diary: () => import("@/features/tagebuch/riding/en").then((m) => m.diaryTranslator()),
  arena: () => import("@/features/arena/en").then((m) => m.arenaTranslator()),
} satisfies Record<string, () => Promise<DomTranslator>>;

/**
 * Englisch (/en) für Seiten, deren Oberfläche deutsch geschrieben ist: Der Text wird nach dem Rendern
 * im Browser übersetzt (dom-translate.ts). Bis das Wörterbuch geladen ist, bleibt der Inhalt unsichtbar,
 * damit kein Deutsch aufblitzt.
 */
export function EnglishDom({ pack, children }: { pack: keyof typeof PACKS; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useLayoutEffect(() => {
    let alive = true;
    let stop: (() => void) | undefined;
    PACKS[pack]().then((t) => {
      if (!alive || !ref.current) return;
      stop = t.observe(ref.current);
      setReady(true);
    });
    return () => {
      alive = false;
      stop?.();
    };
  }, [pack]);
  return (
    <div ref={ref} style={ready ? undefined : { visibility: "hidden" }}>
      {children}
    </div>
  );
}
