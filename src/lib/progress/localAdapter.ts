import { emptyAdvent, emptyProgress, PROGRESS_VERSION, type AdventProgress, type Progress, type ProgressAdapter } from "./types";

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

const isStrMap = (v: unknown): v is Record<string, string> =>
  !!v && typeof v === "object" && !Array.isArray(v) && Object.values(v).every((x) => typeof x === "string");

/** Adventskalender-Spielstand prüfen; Unbrauchbares wird verworfen */
function migrateAdvent(raw: unknown): AdventProgress | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const a = raw as Partial<AdventProgress>;
  const doors: Record<string, number> = {};
  if (a.doors && typeof a.doors === "object")
    for (const [k, v] of Object.entries(a.doors)) if (/^([1-9]|1\d|2[0-4])$/.test(k) && typeof v === "number") doors[k] = v;
  const last =
    a.last && typeof a.last.door === "number" && typeof a.last.part === "number" && typeof a.last.at === "number" ? a.last : null;
  return {
    ...emptyAdvent,
    doors,
    decos: Array.isArray(a.decos) ? a.decos.filter((x): x is string => typeof x === "string") : [],
    stall: isStrMap(a.stall) ? a.stall : {},
    card: isStrMap(a.card) ? a.card : {},
    last,
  };
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
    advent: migrateAdvent(r.advent),
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
