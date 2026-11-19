import { CHECK, ladderTemplate, type CheckAnswers } from "@/content/mutig/katalog";
import type { TypId, Weg } from "@/content/mutig/types";

/* ---------- Gespeicherter Zustand (nur auf diesem Gerät) ---------- */

export type Run = { id: string; date: string; fuerchte: string; passiert: string; fear: number; begleitung: boolean };
export type Step = { id: string; t: string; saddle: boolean; runs: Run[] };
export type UnitLog = { date: string; before: number | null; after: number | null; note: string };
export type DiaryEntry = { id: string; date: string; title: string; before: number | null; after: number | null; text: string };

export type MutigState = {
  v: 1;
  onboarded: boolean;
  startedAt: string | null;
  weg: Weg | null;
  typ: TypId | null;
  typ2: TypId | null;
  start: number | null;
  ziel: string;
  freigabe: "ja" | "noch" | "nicht-noetig" | null;
  begleitung: string;
  warn: boolean;
  done: number[];
  units: Record<string, UnitLog>;
  ladder: Step[];
  notes: Record<string, string>;
  notesDate: Record<string, string>;
  diary: DiaryEntry[];
};

export const emptyState: MutigState = {
  v: 1, onboarded: false, startedAt: null, weg: null, typ: null, typ2: null, start: null, ziel: "",
  freigabe: null, begleitung: "", warn: false, done: [], units: {}, ladder: [], notes: {}, notesDate: {}, diary: [],
};

export const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
/** Datum als JJJJ-MM-TT in Ortszeit */
export const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
export const dateLabel = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, (m || 1) - 1, d || 1).toLocaleDateString("de-DE", { day: "numeric", month: "short" });
};

export const fearWord = (v: number | null) =>
  v === null ? "" : v <= 1 ? "kaum Angst" : v <= 3 ? "leichte Anspannung" : v <= 5 ? "spürbar, aber machbar" : v <= 7 ? "deutliche Angst" : "sehr starke Angst";

/* ---------- Angst-Check auswerten ---------- */

const pick = (a: CheckAnswers, id: string): number[] => {
  const v = a[id];
  return Array.isArray(v) ? v : typeof v === "number" ? [v] : [];
};

export function wegFromAnswers(a: CheckAnswers): Weg {
  const q1 = pick(a, "q1")[0];
  return q1 === 0 ? "sturz" : q1 === 2 ? "geburt" : "wieder";
}

/** Mut-Typ: eigene Reflexionsprofile, kein validierter Test */
export function typesFromAnswers(a: CheckAnswers): [TypId, TypId] {
  const s: Record<TypId, number> = { kopfkino: 0, feinfuehlig: 0, beschuetzerin: 0, ehrgeizig: 0, erfahren: 0 };
  const q1 = pick(a, "q1")[0];
  if (q1 === 0) s.erfahren += 2;
  if (q1 === 1) s.ehrgeizig += 1;
  if (q1 === 2) s.beschuetzerin += 2;
  if (q1 === 3) s.kopfkino += 1;
  const body = pick(a, "q5").length;
  s.feinfuehlig += body >= 3 ? 3 : body;
  for (const i of pick(a, "q6")) {
    if (i === 0) s.kopfkino += 2;
    if (i === 1) s.erfahren += 2;
    if (i === 2) s.ehrgeizig += 2;
    if (i === 3) s.ehrgeizig += 1;
    if (i === 4) s.beschuetzerin += 3;
  }
  for (const i of pick(a, "q3")) {
    if (i === 3 || i === 6 || i === 7) s.kopfkino += 1;
    if (i === 4) s.ehrgeizig += 1;
  }
  const order: TypId[] = ["erfahren", "beschuetzerin", "kopfkino", "feinfuehlig", "ehrgeizig"];
  const sorted = [...order].sort((x, y) => s[y] - s[x]);
  return [sorted[0], sorted[1]];
}

export function warnFromAnswers(a: CheckAnswers) {
  return pick(a, "q11").length > 0;
}

export function freigabeFromAnswers(a: CheckAnswers): MutigState["freigabe"] {
  const q = pick(a, "q10")[0];
  return q === 0 ? "ja" : q === 1 ? "noch" : q === 2 ? "nicht-noetig" : null;
}

export function stateFromCheck(a: CheckAnswers, prev: MutigState): MutigState {
  const weg = wegFromAnswers(a);
  const [typ, typ2] = typesFromAnswers(a);
  const ziel = typeof a.q12 === "string" ? a.q12.trim() : "";
  const q9 = pick(a, "q9")[0];
  const start = typeof a.q4 === "number" ? a.q4 : null;
  return {
    ...prev,
    onboarded: true,
    startedAt: prev.startedAt ?? today(),
    weg, typ, typ2, start, ziel,
    freigabe: freigabeFromAnswers(a),
    begleitung: q9 === 0 ? "Reitlehrerin" : q9 === 1 ? "Freundin oder Familie" : "",
    warn: warnFromAnswers(a),
    ladder: prev.ladder.length ? prev.ladder : ladderTemplate(weg, ziel).map((x) => ({ id: uid(), t: x.t, saddle: x.saddle, runs: [] })),
  };
}

export const checkComplete = (a: CheckAnswers) =>
  CHECK.every((q) => q.type === "multi" || q.type === "text" || a[q.id] !== undefined);

/* ---------- Mut-Leiter ---------- */

/** Gefestigt: 3 Durchgänge mit Angst ≤ 4, an mindestens zwei Tagen (eigene Setzung, keine Sicherheitsgarantie) */
export function isConsolidated(s: Step) {
  const ok = s.runs.filter((r) => r.fear <= 4);
  return ok.length >= 3 && new Set(ok.map((r) => r.date)).size >= 2;
}

/** Aktuelle Stufe: die erste, die noch nicht gefestigt ist */
export function currentStepIndex(ladder: Step[]) {
  const i = ladder.findIndex((s) => !isConsolidated(s));
  return i === -1 ? ladder.length - 1 : i;
}

export const saddleLocked = (st: MutigState) => st.freigabe === "noch";

/** Höchstens eine neue Stufe pro Tag: wurde heute schon eine andere Stufe zum ersten Mal begonnen? */
export function newStepToday(ladder: Step[], exceptId: string) {
  const t = today();
  return ladder.some((s) => s.id !== exceptId && s.runs.length > 0 && s.runs[0].date === t);
}

/* ---------- Einheiten ---------- */

export const nextUnit = (st: MutigState) => {
  for (let n = 1; n <= 30; n++) if (!st.done.includes(n)) return n;
  return 31;
};

/** Reihenfolge: eine Einheit öffnet, wenn die vorherige abgeschlossen ist */
export const unitUnlockedInOrder = (st: MutigState, n: number) => n === 1 || st.done.includes(n - 1);
