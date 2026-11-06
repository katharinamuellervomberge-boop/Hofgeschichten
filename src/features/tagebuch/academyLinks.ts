import { worlds } from "@/content/akademie";
import { allRiderLabExercises, exerciseHref } from "@/content/riderlab/katalog";
import type { DiaryEntry } from "./types";

/**
 * Verwandte Lektionen der Reitakademie zu einem Tagebucheintrag.
 *
 * Die Lektionen haben keine Schlagwörter. Die Zuordnung ist deshalb eine feste,
 * von Hand gepflegte Liste: Stichwort im Eintrag (oder Disziplin) → vorhandene
 * Lektions-IDs. Es werden nur IDs angezeigt, die es im Katalog wirklich gibt.
 * Neue Zuordnung? Einfach eine Zeile ergänzen.
 */

type Rule = { words: RegExp; lessons: string[] };

const RULES: Rule[] = [
  { words: /galopp|angalopp/i, lessons: ["ra-w6-l1", "ra-w6-l3", "ra-w6-l2"] },
  { words: /galoppwechsel|fliegend/i, lessons: ["ra-w13-l11"] },
  { words: /leichttrab/i, lessons: ["ra-w5-l2", "ra-w5-l4"] },
  { words: /aussitz|trab/i, lessons: ["ra-w5-l1", "ra-w5-l3"] },
  { words: /schenkelweichen/i, lessons: ["ra-w13-l6", "ra-w3-l2"] },
  { words: /schulterherein|travers|renvers|traversale|seitengang/i, lessons: ["ra-w13-l7", "ra-w13-l8", "ra-w13-l9"] },
  { words: /schenkel/i, lessons: ["ra-w3-l2"] },
  { words: /\bhände\b|\bhand\b|zügel/i, lessons: ["ra-w2-l3", "ra-w3-l4"] },
  { words: /\bsitz|balance|gleichgewicht/i, lessons: ["ra-w2-l1", "ra-w5-l3"] },
  { words: /absatz|absätze|bügel/i, lessons: ["ra-w2-l2"] },
  { words: /hilfen/i, lessons: ["ra-w3-l1", "ra-w3-l5"] },
  { words: /übergang|übergänge|durchparier|anhalten/i, lessons: ["ra-w6-l4", "ra-w4-l4"] },
  { words: /zirkel|volte/i, lessons: ["ra-w11-l3", "ra-w11-l4"] },
  { words: /handwechsel/i, lessons: ["ra-w11-l2"] },
  { words: /schlangenlinie/i, lessons: ["ra-w11-l5"] },
  { words: /ecke|hufschlag/i, lessons: ["ra-w11-l1"] },
  { words: /stellung|biegung/i, lessons: ["ra-w13-l3"] },
  { words: /rückwärts/i, lessons: ["ra-w13-l10"] },
  { words: /vorhandwendung/i, lessons: ["ra-w13-l5"] },
  { words: /takt|rhythmus/i, lessons: ["ra-w12-l1"] },
  { words: /losgelassen|dehnung/i, lessons: ["ra-w12-l2"] },
  { words: /aufsteig|absteig/i, lessons: ["ra-w1-l4"] },
  { words: /sattel|satteln|trense|trensen/i, lessons: ["ra-w10-l4", "ra-w1-l3"] },
  { words: /putzen|striegel/i, lessons: ["ra-w10-l1"] },
  { words: /hufe\b|auskratz/i, lessons: ["ra-w10-l2"] },
  { words: /führen|anbinden/i, lessons: ["ra-w10-l3"] },
  { words: /springsitz|sprung|springen|hindernis|oxer|steilsprung/i, lessons: ["ra-w14-l1", "ra-w14-l2", "ra-w14-l6"] },
  { words: /distanz|kombination/i, lessons: ["ra-w14-l4", "ra-w14-l5"] },
  { words: /parcours/i, lessons: ["ra-w14-l7"] },
  { words: /angst|unsicher|\bmut\b|mutig|sicherer/i, lessons: ["ra-w12-l4"] },
  { words: /buckel|scheu|erschreck|nicht mitmach/i, lessons: ["ra-w8-l4", "ra-w9-l3"] },
];

/** Disziplin allein → eine passende Einstiegslektion (Gelände, Longieren, Stangenarbeit haben keine eigene Lektion) */
const BY_DISCIPLINE: Record<string, string[]> = {
  Dressur: ["ra-w13-l1"],
  Springen: ["ra-w14-l1"],
  Bodenarbeit: ["ra-w10-l3", "ra-w9-l1"],
};

/**
 * Rider Lab (Übungen für zu Hause): Stichwort → Übungs-IDs. Passt eine Regel, wird zusätzlich
 * zu den Lektionen höchstens eine Rider-Lab-Übung vorgeschlagen.
 */
const RIDER_LAB_RULES: Rule[] = [
  { words: /knie.{0,20}(hoch|rutsch)|bein.{0,20}lang|langes bein|klemm/i, lessons: ["rl-01", "rl-04"] },
  { words: /absatz|absätze|ferse/i, lessons: ["rl-03"] },
  { words: /leichttrab/i, lessons: ["rl-05", "rl-07"] },
  { words: /galopp|hüpf/i, lessons: ["rl-09", "rl-11"] },
  { words: /\bhände\b|\bhand\b|ellbogen|schulter/i, lessons: ["rl-14", "rl-13"] },
  { words: /leichte[nr]? sitz|springsitz|balance|gleichgewicht/i, lessons: ["rl-17", "rl-19"] },
];

export type LessonLink = { id: string; title: string; world: string; href: string };

const index = new Map<string, LessonLink>();
for (const w of worlds)
  for (const l of w.lessons) index.set(l.id, { id: l.id, title: l.title, world: w.title, href: `/akademie/${w.slug}/${l.slug}` });

const rlIndex = new Map<string, LessonLink>();
for (const { area, ex } of allRiderLabExercises()) rlIndex.set(ex.id, { id: ex.id, title: ex.title, world: `Rider Lab · ${area.title}`, href: exerciseHref(area, ex) });

export function relatedLessons(e: DiaryEntry, max = 3): LessonLink[] {
  const lessons = relatedAcademyLessons(e, max);
  const text = [e.wentWell, e.learned, e.practice, e.nextTime, e.moment].filter(Boolean).join(" ");
  if (!text) return lessons;
  for (const r of RIDER_LAB_RULES) {
    if (!r.words.test(text)) continue;
    const hit = r.lessons.map((id) => rlIndex.get(id)).find(Boolean);
    if (hit) return [...lessons, hit];
  }
  return lessons;
}

function relatedAcademyLessons(e: DiaryEntry, max: number): LessonLink[] {
  const text = [e.wentWell, e.learned, e.practice, e.nextTime, e.moment].filter(Boolean).join(" ");
  const ids: string[] = [];
  if (text) for (const r of RULES) if (r.words.test(text)) ids.push(...r.lessons);
  if (e.discipline) ids.push(...(BY_DISCIPLINE[e.discipline] ?? []));
  const seen = new Set<string>();
  const out: LessonLink[] = [];
  for (const id of ids) {
    const hit = index.get(id);
    if (hit && !seen.has(id)) {
      seen.add(id);
      out.push(hit);
      if (out.length >= max) break;
    }
  }
  return out;
}

/** Für die Prüfung: alle in den Rider-Lab-Regeln genannten Übungs-IDs */
export const referencedRiderLabIds = [...new Set(RIDER_LAB_RULES.flatMap((r) => r.lessons))];
export const riderLabExerciseExists = (id: string) => rlIndex.has(id);

/** Für die Prüfung: alle in den Regeln genannten IDs */
export const referencedLessonIds = [...new Set([...RULES.flatMap((r) => r.lessons), ...Object.values(BY_DISCIPLINE).flat()])];
export const lessonExists = (id: string) => index.has(id);
