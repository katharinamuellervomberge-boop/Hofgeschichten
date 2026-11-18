"use client";

import { useEffect, useState } from "react";
import styles from "./arena.module.css";

/** Merkliste der Reitbahn – nur auf diesem Gerät (später austauschbar gegen ein Konto) */
const KEY = "hofgeschichten.arena.saved.v1";

function read(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(v) ? v.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function SaveButton({ id }: { id: string }) {
  const [saved, setSaved] = useState(false);
  useEffect(() => setSaved(read().includes(id)), [id]);
  const toggle = () => {
    const list = read();
    const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* Speicher voll oder gesperrt – Zustand bleibt nur für diese Sitzung */
    }
    setSaved(next.includes(id));
  };
  return (
    <button type="button" className={styles.secondaryBtn} aria-pressed={saved} onClick={toggle}>
      {saved ? "Gemerkt" : "Für später merken"}
    </button>
  );
}
