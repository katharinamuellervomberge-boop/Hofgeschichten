/**
 * Sichtbare deutsche Texte einer Oberflächen-Datei mit HTML-Vorlagen (z. B. riding/engine.ts) finden.
 * Liefert genaue Texte (exact) und Muster mit Platzhaltern (patterns), wie sie nach dem Rendern
 * als Textknoten bzw. in aria-label/title/placeholder/alt stehen. Genutzt von scripts/en-riding.ts.
 */
import ts from "typescript";
import { readFileSync } from "node:fs";
import { needsTranslation } from "../src/i18n/translate";

const ATTR = /\b(?:aria-label|title|placeholder|alt)="([^"]*)"/g;

/** Kennungen, CSS, Pfade, Formate – keine sichtbaren Texte */
function technical(s: string): boolean {
  const t = s.trim();
  if (!needsTranslation(t)) return true;
  if (/^[a-z0-9_.:-]+$/.test(t)) return true; // ids wie "all", "uebe", "ra-w2-l1", "de-DE"
  if (/^[a-z]+[A-Z][A-Za-z]*$/.test(t)) return true; // Feldnamen wie "wentWell"
  if (/^&\w+;$/.test(t)) return true; // HTML-Entitäten
  if (/^[#[]|\[data-|^[A-Z]+$|^[a-z]+\/[\w.*-]*$|^(?:Escape|Enter|Tab)$/.test(t)) return true; // Selektoren, Tasten, MIME
  if (/^[a-z]{2}-[A-Z]{2}$/.test(t)) return true;
  if (/^\/[\w/-]*$/.test(t)) return true; // Pfade
  if (/[{};]\s*$/.test(t) && /:/.test(t)) return true; // CSS
  if (/^(?:var|rgba?|calc|url|rotate|translate|scale)\(/.test(t)) return true;
  if (/^[a-z-]+:\s*[^ ]+$/.test(t)) return true; // "background:{0}"
  return false;
}

function addRun(run: string, exact: Set<string>, patterns: Set<string>, html = false) {
  // Platzhalter neu durchnummerieren
  let i = 0;
  const map = new Map<string, number>();
  const s = run
    .replace(/\{(\d+)\}/g, (_, n) => {
      if (!map.has(n)) map.set(n, i++);
      return `{${map.get(n)}}`;
    })
    .replace(/&nbsp;/g, " ")
    .replace(/&shy;|\u00ad/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
  if (!s) return;
  const words = s.replace(/\{\d+\}/g, " ");
  if (technical(words) || !/[A-Za-zÄÖÜäöüß]{2,}/.test(words)) return;
  if (/\{\d+\}/.test(s)) {
    patterns.add(s);
    // In HTML-Vorlagen kann an einem Platzhalter ein Icon stehen: dann steht der feste Text allein im Textknoten
    if (html)
      for (const piece of s.split(/\{\d+\}/)) {
        const p = piece.trim().replace(/^[·:,–-]\s*|\s*[·:,–-]$/g, "").trim();
        if (!p || /^[.,;:)“"]/.test(p) || /[(„"]$/.test(p)) continue;
        if (!technical(p) && /[A-Za-zÄÖÜäöüß]{2,}/.test(p)) exact.add(p);
      }
  } else exact.add(s);
}

/** Text einer Vorlage (mit {n} für ${…}) in Textläufe zwischen Tags zerlegen */
function fromHtml(tpl: string, exact: Set<string>, patterns: Set<string>) {
  for (const m of tpl.matchAll(ATTR)) addRun(m[1], exact, patterns, true);
  const noTags = tpl.replace(/<[^>]*>/g, "\u0001");
  for (const run of noTags.split("\u0001")) addRun(run, exact, patterns, true);
}

export function uiKeys(file: string, opts: { skipLines?: number[] } = {}) {
  const src = readFileSync(file, "utf8");
  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, file.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const exact = new Set<string>();
  const patterns = new Set<string>();
  const skip = new Set(opts.skipLines ?? []);
  const visit = (n: ts.Node) => {
    if (ts.isImportDeclaration(n) || ts.isExportDeclaration(n)) return;
    const line = sf.getLineAndCharacterOfPosition(n.getStart()).line + 1;
    if (skip.has(line)) return;
    if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) {
      const t = n.text;
      if (t.includes("<")) fromHtml(t, exact, patterns);
      else if (!technical(t)) addRun(t, exact, patterns);
      return;
    }
    if (ts.isTemplateExpression(n)) {
      const t = n.head.text + n.templateSpans.map((s, i) => `{${i}}` + s.literal.text).join("");
      if (t.includes("<")) fromHtml(t, exact, patterns);
      else addRun(t, exact, patterns);
    }
    if (ts.isJsxText(n)) addRun(n.text, exact, patterns);
    ts.forEachChild(n, visit);
  };
  visit(sf);
  return { exact: [...exact], patterns: [...patterns] };
}
