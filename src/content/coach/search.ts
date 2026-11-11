import { coachProblems } from "./index";
import type { CoachProblemInfo } from "./types";

/**
 * Rider Coach – Problemsuche ohne KI und ohne Server: Suchbegriffe und Synonyme je Problem
 * (index.ts → terms), Umlaute egal (ü/ue/u), kleine Tippfehler (1–2 Buchstaben), Wortanfänge
 * („galoppiert“ ↔ „galoppieren“, „Bügel“ ↔ „Bügellänge“) und Füllwörter werden ignoriert.
 *
 * Später austauschbar gegen eine semantische Suche: gleiche Signatur `searchProblems(query)`.
 */

const STOP = new Set(
  (
    "ich mein meine meinen meinem meiner mir mich du dein deine das der die den dem des ein eine einen einem einer und oder aber beim bei im in am an auf aus mit " +
    "immer staendig standig nicht kein keine nie so sehr zu es er sie wenn wird werden ist bin bist sind habe hab hat haben kann koennen konnen klappt geht gehts mehr gerade " +
    "pferd pferde pferdchen reiten reite reiter reiterin dann wie was warum wieso weshalb oft total voll irgendwie richtig mal noch schon jedes jedem jeden " +
    "hilfe problem probleme bitte einfach dabei dass uns wir man vom zum zur von fur fuer ueber uber"
  ).split(" "),
);

/** Kleinbuchstaben, ß → ss, Umlaute und ihre Umschreibungen auf den Grundbuchstaben */
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/ß/g, "ss")
    .replace(/ä|ae/g, "a")
    .replace(/ö|oe/g, "o")
    .replace(/ü|ue/g, "u")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function tokens(s: string): string[] {
  return normalize(s)
    .split(" ")
    .filter((t) => t.length > 1 && !STOP.has(t));
}

/** Damerau-Levenshtein mit Abbruch über `max` */
function distance(a: string, b: string, max: number): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const d: number[][] = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    let rowMin = Infinity;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      rowMin = Math.min(rowMin, d[i][j]);
    }
    if (rowMin > max) return max + 1;
  }
  return d[a.length][b.length];
}

function prefixLen(a: string, b: string): number {
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  return i;
}

/** Passen zwei Wörter zusammen? Gleich, gleicher Wortstamm/Wortanfang oder kleiner Tippfehler. */
export function tokenMatch(q: string, t: string): boolean {
  if (q === t) return true;
  const short = Math.min(q.length, t.length);
  if (short >= 4) {
    const p = prefixLen(q, t);
    // gleicher Anfang: „galoppiert“/„galoppieren“, „hand“/„hande“, „bugel“/„bugellange“
    if (p >= short || p >= Math.max(5, short - 2)) return true;
  }
  if (short < 4) return false;
  const max = short >= 8 ? 2 : 1;
  return distance(q, t, max) <= max;
}

type Indexed = { info: CoachProblemInfo; terms: string[][] };

function buildIndex(list: CoachProblemInfo[]): Indexed[] {
  return list.map((info) => ({ info, terms: [info.title, ...info.terms].map(tokens).filter((t) => t.length > 0) }));
}

const defaultIndex = buildIndex(coachProblems);

export type SearchHit = { problem: CoachProblemInfo; score: number };

/**
 * Probleme zu einer freien Eingabe, beste zuerst.
 * Bewertung je Suchbegriff: Anteil der Begriffswörter, die in der Eingabe vorkommen;
 * ganze Treffer zählen mehr. Plus ein kleiner Bonus je Eingabewort, das überhaupt passt.
 */
export function searchProblems(query: string, opts: { max?: number; min?: number; list?: CoachProblemInfo[] } = {}): SearchHit[] {
  const { max = 5, min = 2, list } = opts;
  const q = tokens(query);
  if (q.length === 0) return [];
  const index = list ? buildIndex(list) : defaultIndex;
  const hits: SearchHit[] = [];
  for (const { info, terms } of index) {
    let best = 0;
    const used = new Set<string>();
    for (const term of terms) {
      let m = 0;
      for (const t of term) {
        const hit = q.find((x) => tokenMatch(x, t));
        if (hit) {
          m++;
          used.add(hit);
        }
      }
      if (m === 0) continue;
      const n = term.length;
      const s = (m / n) * (2 + n) + (m === n ? 2 : 0);
      if (s > best) best = s;
    }
    const score = best + 0.5 * used.size;
    if (score >= min) hits.push({ problem: info, score: Math.round(score * 100) / 100 });
  }
  return hits.sort((a, b) => b.score - a.score).slice(0, max);
}
