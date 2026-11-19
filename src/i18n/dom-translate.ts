import { textKey, type Dict } from "./translate";

/**
 * Übersetzt fertig gerenderte Oberflächen (Riding Space, engine.ts) im Browser.
 *
 * Der Riding Space baut sein HTML selbst aus deutschen Vorlagen. Statt jede Vorlage umzubauen,
 * werden auf Englisch nach jedem Rendern alle Textknoten und einige Attribute nachgeschlagen:
 *  - genaue Treffer über textKey(deutscher Text) im Wörterbuch,
 *  - Muster mit Platzhaltern („{0} Einträge · {1} Training“ → „{0} entries · {1} training“);
 *    die eingesetzten Teile werden selbst wieder nachgeschlagen,
 *  - Rest: Aufteilen an „ · “ und Teile einzeln übersetzen.
 * Daten bleiben deutsch gespeichert; übersetzt wird nur die Anzeige.
 *
 * dict: Schlüssel = textKey(deutsch) → englisch. patterns: deutsches Muster → englisches Muster.
 */

type Pattern = { re: RegExp; en: string; order: number[]; lit: number; probe: string };

const ATTRS = ["aria-label", "title", "placeholder", "alt"];
/** Inhalt nie übersetzen (Eingaben der Nutzerin, Code); Attribute wie placeholder schon */
const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "TEXTAREA", "CODE"]);
const HAS_WORD = /[A-Za-zÄÖÜäöüß]{2,}/;
/** Einheiten, die in eingesetzten Werten klein geschrieben stehen dürfen */
const UNITS = new Set(["min", "h", "km", "m", "cm", "kg", "x", "am", "pm"]);

function escRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildPattern(de: string, en: string): Pattern | null {
  const parts = de.split(/(\{\d+\})/);
  let src = "^";
  const order: number[] = [];
  let lit = 0;
  let probe = "";
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];
    const m = /^\{(\d+)\}$/.exec(p);
    if (m) {
      order.push(+m[1]);
      src += "(.*?)";
      continue;
    }
    if (!p) continue;
    lit += p.replace(/\s/g, "").length;
    const words = p.trim().split(/\s+/);
    for (const w of words) if (w.length > probe.length) probe = w;
    // Leerraum am Platzhalter darf nur am Anfang/Ende fehlen (dort stand evtl. ein Icon),
    // zwischen Wort und Wert bleibt er Pflicht („Mit {0}“ passt nicht auf „Mitschwingen“)
    const lead = /^\s/.test(p) && i > 0 ? (i === 2 && parts[0] === "" ? "\\s*" : "\\s+") : "";
    const trail = /\s$/.test(p) && i < parts.length - 1 ? (i === parts.length - 3 && parts[parts.length - 1] === "" ? "\\s*" : "\\s+") : "";
    src += lead + p.trim().split(/\s+/).map(escRe).join("\\s+") + trail;
  }
  if (!order.length || lit < 2) return null;
  return { re: new RegExp(src + "$"), en, order, lit, probe };
}

export type DomTranslator = {
  text(s: string): string;
  tree(root: Node): void;
  observe(root: Element): () => void;
};

export function createDomTranslator(dict: Dict, patternMap: Record<string, string> = {}): DomTranslator {
  const patterns: Pattern[] = [];
  for (const [de, en] of Object.entries(patternMap)) {
    const p = buildPattern(de, en);
    if (p) patterns.push(p);
  }
  // spezifische Muster (mehr fester Text) zuerst
  patterns.sort((a, b) => b.lit - a.lit);
  const cache = new Map<string, string>();
  const done = new WeakMap<Node, string>();

  function exact(s: string): string | undefined {
    const hit = dict[textKey(s)];
    return hit;
  }

  /** Eingesetzter Wert: übersetzbar, ohne Buchstaben oder wie ein Name (z. B. Pferdename) – sonst passt das Muster nicht */
  function fill(c: string, depth: number): string | undefined {
    const t = c.trim();
    if (!t || !HAS_WORD.test(t)) return t;
    const hit = core(t, depth + 1);
    if (hit !== undefined) return hit;
    const words = t.match(/[A-Za-zÄÖÜäöüß]+/g) ?? [];
    return words.every((w) => /^[A-ZÄÖÜ]/.test(w) || UNITS.has(w)) ? t : undefined;
  }

  function core(s: string, depth: number): string | undefined {
    const e = exact(s);
    if (e !== undefined) return e;
    if (depth > 3) return undefined;
    for (const p of patterns) {
      if (p.probe && !s.includes(p.probe)) continue;
      const m = p.re.exec(s);
      if (!m) continue;
      const byIdx: Record<number, string> = {};
      let ok = true;
      p.order.forEach((n, i) => {
        const v = fill(m[i + 1] ?? "", depth);
        if (v === undefined) ok = false;
        else byIdx[n] = v;
      });
      if (!ok) continue;
      return p.en.replace(/\{(\d+)\}/g, (_, n) => byIdx[+n] ?? "").replace(/\s{2,}/g, " ").trim();
    }
    // Teile wie „Dressur · 45 min · mittel“ einzeln übersetzen – nur wenn alle Teile passen
    for (const sep of [" · ", " – ", ": ", ", ", " / "]) {
      if (!s.includes(sep)) continue;
      const out = s.split(sep).map((x) => fill(x, depth));
      if (out.every((x) => x !== undefined) && out.some((x, i) => x !== s.split(sep)[i].trim())) return out.join(sep);
    }
    return undefined;
  }

  function text(raw: string): string {
    // geschützte Leerzeichen und weiche Trennstellen wie im Wörterbuch behandeln
    const s = raw.replace(/\u00ad/g, "").replace(/\s+/g, " ").trim();
    if (!s || !HAS_WORD.test(s)) return raw;
    let r = cache.get(s);
    if (r === undefined) {
      r = core(s, 0) ?? s;
      if (cache.size > 5000) cache.clear();
      cache.set(s, r);
    }
    if (r === s) return raw;
    if (raw.includes("\u00ad")) return r; // Trennstellen gelten nur für das deutsche Wort
    const lead = raw.match(/^\s*/)![0];
    const trail = raw.match(/\s*$/)![0];
    return lead + r + trail;
  }

  function fixText(n: Text) {
    if (done.get(n) === n.data) return;
    const t = text(n.data);
    if (t !== n.data) n.data = t;
    done.set(n, n.data);
  }

  function fixEl(el: Element) {
    for (const a of ATTRS) {
      const v = el.getAttribute(a);
      if (v && HAS_WORD.test(v)) {
        const t = text(v);
        if (t !== v) el.setAttribute(a, t);
      }
    }
  }

  function tree(root: Node) {
    if (root.nodeType === 3) {
      const parent = (root as Text).parentElement;
      if (!parent || !SKIP_TAGS.has(parent.tagName)) fixText(root as Text);
      return;
    }
    if (root.nodeType !== 1 && root.nodeType !== 11) return;
    if (root.nodeType === 1) {
      fixEl(root as Element);
      if (SKIP_TAGS.has((root as Element).tagName)) return;
    }
    const doc = root.ownerDocument ?? (root as Document);
    const w = doc.createTreeWalker(root, 1 | 4, {
      // Elemente selbst (Attribute) ja, Text in TEXTAREA/SCRIPT/STYLE nein
      acceptNode: (n) => (n.nodeType === 3 && n.parentElement && SKIP_TAGS.has(n.parentElement.tagName) ? 2 : 1),
    });
    let n = w.nextNode();
    while (n) {
      if (n.nodeType === 3) fixText(n as Text);
      else fixEl(n as Element);
      n = w.nextNode();
    }
  }

  function observe(root: Element) {
    tree(root);
    const mo = new MutationObserver((recs) => {
      for (const r of recs) {
        if (r.type === "characterData") tree(r.target);
        else if (r.type === "attributes") fixEl(r.target as Element);
        else r.addedNodes.forEach((n) => tree(n));
      }
    });
    mo.observe(root, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS });
    return () => mo.disconnect();
  }

  return { text, tree, observe };
}
