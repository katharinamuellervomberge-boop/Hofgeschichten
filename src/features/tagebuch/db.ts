"use client";

import { cleanDiary } from "./sanitize";
import { emptyDiary, type DiaryData } from "./types";

/**
 * Speicherung des Reitertagebuchs ausschließlich auf diesem Gerät (IndexedDB).
 * Keine Übertragung an Server. Ein Datensatz „diary“ enthält das ganze Tagebuch.
 * Bei Bedarf bittet die App den Browser um dauerhafte Speicherung
 * (`navigator.storage.persist`), damit er die Daten nicht von selbst aufräumt.
 */

const DB_NAME = "hofgeschichten-tagebuch";
const STORE = "diary";
const KEY = "data";

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
function db(): Promise<IDBDatabase> {
  if (!dbPromise) dbPromise = open().catch((e) => { dbPromise = null; throw e; });
  return dbPromise;
}

export async function loadDiary(): Promise<DiaryData> {
  const d = await db();
  const raw = await new Promise<unknown>((resolve, reject) => {
    const req = d.transaction(STORE, "readonly").objectStore(STORE).get(KEY);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  if (raw === undefined) return emptyDiary;
  return cleanDiary(raw) ?? emptyDiary;
}

export async function saveDiary(data: DiaryData): Promise<void> {
  const d = await db();
  await new Promise<void>((resolve, reject) => {
    const tx = d.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(data, KEY);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error("write-failed"));
    tx.onabort = () => reject(tx.error ?? new Error("write-aborted"));
  });
}

/** Browser um dauerhafte Speicherung bitten (still, ohne Nachfrage-Dialog in den meisten Browsern) */
export async function requestPersistence(): Promise<boolean> {
  try {
    if (!navigator.storage?.persist) return false;
    if (await navigator.storage.persisted?.()) return true;
    return await navigator.storage.persist();
  } catch {
    return false;
  }
}
