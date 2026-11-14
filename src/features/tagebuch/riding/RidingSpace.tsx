"use client";

import { useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { worlds } from "@/content/akademie";
import { allRiderLabExercises, exerciseHref } from "@/content/riderlab/katalog";
import { localizePath } from "@/i18n/locale";
import { useLocale } from "@/i18n/LocaleProvider";
import { saveWholeDiary } from "../store";
import type { DiaryData } from "../types";
import { mountRidingSpace } from "./engine";

type LinkInfo = { title: string; href: string };

/** Lektionen und Rider-Lab-Übungen der App (nur Titel und Adresse, keine Inhalte) */
function buildLinks(): Record<string, LinkInfo> {
  const out: Record<string, LinkInfo> = {};
  for (const w of worlds) for (const l of w.lessons) out[l.id] = { title: l.title, href: `/akademie/${w.slug}/${l.slug}` };
  for (const { area, ex } of allRiderLabExercises()) out[ex.id] = { title: ex.title, href: exerciseHref(area, ex) };
  return out;
}

/**
 * Riding Space (seit 14.11.2026): Übersicht, Tagebuch, Trainingsplaner und Fortschritt.
 * Die Oberfläche selbst steckt in engine.ts; hier wird sie mit Speicher und Router verbunden.
 */
export function RidingSpace({ data, view }: { data: DiaryData; view: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const api = useRef<{ setData: (d: DiaryData) => void; destroy: () => void } | null>(null);
  const router = useRouter();
  const locale = useLocale();
  const links = useMemo(buildLinks, []);
  const first = useRef({ data, view });

  useEffect(() => {
    if (!ref.current) return;
    api.current = mountRidingSpace(ref.current, {
      data: first.current.data,
      view: first.current.view,
      links,
      save: (d: unknown) => saveWholeDiary(d),
      navigate: (href: string) => router.push(localizePath(href, locale)),
      onRoute: (path: string) => {
        if (window.location.pathname !== path) window.history.replaceState(null, "", path);
      },
    });
    return () => {
      api.current?.destroy();
      api.current = null;
    };
  }, [links, router, locale]);

  useEffect(() => {
    api.current?.setData(data);
  }, [data]);

  return <div ref={ref} />;
}
