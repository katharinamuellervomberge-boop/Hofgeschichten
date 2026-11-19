"use client";

import { useEffect, useState } from "react";
import type { CheckAnswers } from "@/content/mutig/katalog";
import { emptyState, today, type MutigState } from "./logic";

/**
 * Speicherung von „Mutig reiten“ ausschließlich auf diesem Gerät (IndexedDB).
 * Keine Übertragung an Server. Sicherung als JSON-Datei, Wiederherstellen und Löschen in „Deine Daten“.
 */

const DB_NAME = "hofgeschichten-mutig";
const STORE = "state";
const KEY = "data";
const CHECK_KEY = "hofgeschichten.mutig.check.v1";
const MARK = "hofgeschichten-mutig-reiten";

function open(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") return reject(new Error("no-indexeddb"));
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error ?? new Error("open-failed"));
    req.onblocked = () => reject(new Error("blocked"));
  });
}

let dbPromise: Promise<IDBDatabase> | null = null;
const db = () => (dbPromise ??= open().catch((e) => { dbPromise = null; throw e; }));

function clean(raw: unknown): MutigState | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Partial<MutigState>;
  if (r.v !== 1) return null;
  return {
    ...emptyState,
    ...r,
    done: Array.isArray(r.done) ? r.done.filter((n) => Number.isInteger(n) && n >= 1 && n <= 30) : [],
    units: r.units && typeof r.units === "object" ? r.units : {},
    ladder: Array.isArray(r.ladder) ? r.ladder.filter((s) => s && typeof s.t === "string" && Array.isArray(s.runs)) : [],
    notes: r.notes && typeof r.notes === "object" ? r.notes : {},
    notesDate: r.notesDate && typeof r.notesDate === "object" ? r.notesDate : {},
    diary: Array.isArray(r.diary) ? r.diary : [],
  };
}

async function read(): Promise<MutigState> {
  const d = await db();
  const raw = await new Promise<unknown>((resolve, reject) => {
    const req = d.transaction(STORE, "readonly").objectStore(STORE).get(KEY);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return clean(raw) ?? emptyState;
}

async function write(data: MutigState | undefined): Promise<void> {
  const d = await db();
  await new Promise<void>((resolve, reject) => {
    const tx = d.transaction(STORE, "readwrite");
    if (data === undefined) tx.objectStore(STORE).delete(KEY);
    else tx.objectStore(STORE).put(data, KEY);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error("write-failed"));
    tx.onabort = () => reject(tx.error ?? new Error("write-aborted"));
  });
}

async function persist() {
  try {
    if (navigator.storage?.persist && !(await navigator.storage.persisted?.())) await navigator.storage.persist();
  } catch {
    /* still – Daten bleiben trotzdem gespeichert */
  }
}

/* ---------- gemeinsamer Zustand aller Seiten ---------- */

let cache: MutigState | null = null;
let loading: Promise<MutigState> | null = null;
const subs = new Set<(s: MutigState) => void>();

function load() {
  if (cache) return Promise.resolve(cache);
  loading ??= read().then((s) => (cache = s));
  return loading;
}

export async function updateMutig(fn: (s: MutigState) => MutigState) {
  const next = fn(await load());
  cache = next;
  subs.forEach((f) => f(next));
  await write(next);
  void persist();
}

export function useMutig() {
  const [state, setState] = useState<MutigState | null>(cache);
  const [error, setError] = useState(false);
  useEffect(() => {
    subs.add(setState);
    load().then(setState, () => setError(true));
    return () => void subs.delete(setState);
  }, []);
  return { state, error, update: updateMutig };
}

/* ---------- Ergebnis des kostenlosen Angst-Checks ---------- */

export function saveCheck(a: CheckAnswers) {
  try {
    localStorage.setItem(CHECK_KEY, JSON.stringify({ date: today(), a }));
  } catch {
    /* privater Modus */
  }
}

export function loadCheck(): CheckAnswers | null {
  try {
    const raw = localStorage.getItem(CHECK_KEY);
    const p = raw ? (JSON.parse(raw) as { a?: CheckAnswers }) : null;
    return p?.a && typeof p.a === "object" ? p.a : null;
  } catch {
    return null;
  }
}

/* ---------- Sicherung ---------- */

export function downloadBackup(s: MutigState) {
  const json = JSON.stringify({ app: MARK, exportedAt: new Date().toISOString(), data: s });
  const url = URL.createObjectURL(new Blob([json], { type: "application/json" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `mutig-reiten-${today()}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export async function restoreBackup(file: File): Promise<string | null> {
  if (file.size > 5 * 1024 * 1024) return "Die Datei ist zu groß.";
  try {
    const obj = JSON.parse(await file.text()) as { app?: unknown; data?: unknown };
    if (obj?.app !== MARK) return "Das ist keine Sicherung von „Mutig reiten“.";
    const data = clean(obj.data);
    if (!data) return "Die Sicherung ist beschädigt oder zu neu für diese App.";
    await updateMutig(() => data);
    return null;
  } catch {
    return "Die Datei konnte nicht gelesen werden.";
  }
}

export async function deleteAll() {
  cache = { ...emptyState };
  subs.forEach((f) => f(cache!));
  await write(undefined);
  try {
    localStorage.removeItem(CHECK_KEY);
  } catch {
    /* egal */
  }
}
