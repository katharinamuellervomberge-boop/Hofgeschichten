"use client";

import { cleanDiary, today } from "./sanitize";
import type { DiaryData } from "./types";

/** Sicherungsdatei: reines JSON, bleibt bei der Familie. Kein Upload irgendwohin. */

const MARK = "hofgeschichten-reitertagebuch";
const MAX_FILE = 60 * 1024 * 1024;

export function downloadBackup(data: DiaryData) {
  const json = JSON.stringify({ app: MARK, exportedAt: new Date().toISOString(), diary: data });
  const url = URL.createObjectURL(new Blob([json], { type: "application/json" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `reitertagebuch-${today()}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export type ReadResult = { ok: true; data: DiaryData } | { ok: false; reason: string };

export async function readBackup(file: File): Promise<ReadResult> {
  if (file.size > MAX_FILE) return { ok: false, reason: "Die Datei ist zu groß." };
  try {
    const parsed: unknown = JSON.parse(await file.text());
    const obj = parsed as { app?: unknown; diary?: unknown };
    if (!obj || obj.app !== MARK) return { ok: false, reason: "Das ist keine Sicherung des Reitertagebuchs." };
    const data = cleanDiary(obj.diary);
    return data ? { ok: true, data } : { ok: false, reason: "Die Sicherung ist beschädigt oder zu neu für diese App." };
  } catch {
    return { ok: false, reason: "Die Datei konnte nicht gelesen werden." };
  }
}
