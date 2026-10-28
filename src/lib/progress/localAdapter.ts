import { emptyProgress, PROGRESS_VERSION, type Progress, type ProgressAdapter } from "./types";

const KEY = "hofgeschichten.progress.v1";

function safeStorage(): Storage | null {
  try {
    if (typeof window === "undefined") return null;
    const s = window.localStorage;
    const probe = "__hg_probe__";
    s.setItem(probe, "1");
    s.removeItem(probe);
    return s;
  } catch {
    // Privater Modus, blockierte Website-Daten o. Ä. – App funktioniert trotzdem, nur ohne Speichern.
    return null;
  }
}

/** Unbekannte oder kaputte Daten werden verworfen bzw. mit Standardwerten ergänzt. */
function migrate(raw: unknown): Progress | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Partial<Progress>;
  if (r.version !== PROGRESS_VERSION) return null;
  return {
    ...emptyProgress,
    ...r,
    settings: { ...emptyProgress.settings, ...(r.settings ?? {}) },
    episodes: r.episodes ?? {},
    horsesVisited: Array.isArray(r.horsesVisited) ? r.horsesVisited : [],
    games: r.games ?? {},
    adventures: r.adventures ?? {},
    seenStamps: Array.isArray(r.seenStamps) ? r.seenStamps : [],
    // Nur interne Adressen übernehmen
    last:
      r.last && typeof r.last.href === "string" && r.last.href.startsWith("/") && !r.last.href.startsWith("//") && typeof r.last.title === "string"
        ? r.last
        : null,
    version: PROGRESS_VERSION,
  };
}

export const localAdapter: ProgressAdapter = {
  load() {
    const s = safeStorage();
    if (!s) return null;
    try {
      const txt = s.getItem(KEY);
      return txt ? migrate(JSON.parse(txt)) : null;
    } catch {
      return null;
    }
  },
  save(progress) {
    const s = safeStorage();
    if (!s) return;
    try {
      s.setItem(KEY, JSON.stringify(progress));
    } catch {
      /* Speicher voll oder blockiert – still ignorieren */
    }
  },
  clear() {
    const s = safeStorage();
    try {
      s?.removeItem(KEY);
    } catch {
      /* ignorieren */
    }
  },
  subscribe(onExternalChange) {
    if (typeof window === "undefined") return () => {};
    const handler = (e: StorageEvent) => {
      if (e.key === KEY) onExternalChange();
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  },
};
