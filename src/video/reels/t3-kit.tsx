import { COL, FONT_BODY, PAPER, Phone, T, back, ease, lerp, sm } from "./nov-kit";
import { HomeScreen } from "./nov-akademie";
import { Big } from "./viral-kit";
import { Tag } from "./hg1-haenger-reel";

/* Tagesset 03 (18.11.2026): gemeinsame Bausteine. Akademie-Abschluss wie `festhalten`/`haenger`. */

/** Akademie-Handy mit markiertem Modul (1–5) + Endkarte nach `fin` */
export function AkCTA({ t, a, b, fin, module, title, id }: { t: number; a: number; b: number; fin: number; module: 1 | 2 | 3 | 4 | 5; title: string[]; id: string }) {
  const py = lerp(1960, 440, ease((t - a + 0.1) / 0.6));
  const scroll = module > 3 ? 420 * sm((t - a - 0.6) / 1.4) : 0;
  const hi = sm((t - b - 0.2) / 0.3);
  const names = ["Pferde verstehen", "Umgang mit Pferden", "Reiten lernen", "Reiterhilfen", "Bahnfiguren"];
  return (
    <g>
      <Big t={t} a={a - 0.1} lines={title} y={190} size={84} />
      <Phone x={280} y={py} w={520} id={id}>
        <g transform={`translate(296 ${py + 16})`}>
          <HomeScreen scroll={scroll} />
          {hi > 0.01 && <rect x={10} y={404 + (module - 1) * 168 - 6 - scroll} width={468} height={164} rx="22" fill="none" stroke={COL.honey} strokeWidth={6 + 2 * Math.sin(t * 6)} opacity={hi} />}
        </g>
      </Phone>
      {hi > 0.01 && t < fin && <Tag x={540} y={1440} text={`Modul ${module}: ${names[module - 1]}`} size={34} fill={COL.honey} color={COL.forestDeep} o={hi} />}
      {t >= fin && (
        <g opacity={Math.min(1, back((t - fin) / 0.4))}>
          <rect x={90} y={1400} width={900} height={250} rx="44" fill={COL.forest} />
          <T x={540} y={1490} size={52} color={PAPER}>Hofgeschichten Reitakademie</T>
          <T x={540} y={1560} size={40} font={FONT_BODY} weight={800} color={COL.honey}>einmalig 29,90 € · dauerhaft</T>
          <T x={540} y={1622} size={44} font={FONT_BODY} weight={900} color={PAPER}>Link in Bio</T>
        </g>
      )}
    </g>
  );
}

/** Pulsierender Ring (Körperpunkt markieren) */
export function Ring({ x, y, col, o, r = 26, t, n }: { x: number; y: number; col: string; o: number; r?: number; t: number; n?: string }) {
  if (o <= 0.01) return null;
  const pulse = 0.5 + 0.5 * Math.sin(t * 6);
  return (
    <g opacity={Math.min(1, o)}>
      <circle cx={x} cy={y} r={r + 6 * pulse} fill="none" stroke={col} strokeWidth="7" />
      {n ? (
        <g>
          <circle cx={x + r + 22} cy={y - r - 18} r={26} fill={col} />
          <T x={x + r + 22} y={y - r - 7} size={30} font={FONT_BODY} weight={900} color={PAPER}>{n}</T>
        </g>
      ) : <circle cx={x} cy={y} r={r * 0.4} fill={col} opacity=".35" />}
    </g>
  );
}

/** ✓ / ✗ Plakette */
export function Mark2({ t, a, x, y, ok, r = 46 }: { t: number; a: number; x: number; y: number; ok: boolean; r?: number }) {
  const k = back((t - a) / 0.35);
  if (k <= 0.01) return null;
  return (
    <g transform={`translate(${x} ${y}) scale(${Math.max(0.01, k)})`}>
      <circle r={r} fill={ok ? COL.forest : COL.rust} />
      <T x={0} y={r * 0.4} size={r * 1.2} font={FONT_BODY} weight={900} color={PAPER}>{ok ? "✓" : "✗"}</T>
    </g>
  );
}

/** Kopfzeile „label“ (klein, rost) + großer Titel */
export function StepHead({ t, a, label, title, size = 96, dots, n }: { t: number; a: number; label: string; title: string; size?: number; dots?: number; n?: number }) {
  const k = ease((t - a) / 0.3);
  return (
    <g>
      <g opacity={k}>
        {dots && n !== undefined && Array.from({ length: dots }, (_, i) => <circle key={i} cx={540 - (dots - 1) * 18 + i * 36} cy={86} r={11} fill={i < n ? COL.honey : COL.sand} />)}
        <T x={540} y={150} size={30} font={FONT_BODY} weight={800} color={COL.rust}>{label}</T>
      </g>
      <Big t={t} a={a} lines={[title]} y={265} size={size} />
    </g>
  );
}

/** Rider-Academy-Abschluss: Handy mit Modul, drei Pillen, Endkarte „REITEN ENDLICH VERSTEHEN. · Rider Academy – Link in Bio“ (kein Preis) */
export function RiderCTA({ t, a, b, fin, module, title, id }: { t: number; a: number; b: number; fin: number; module: 1 | 2 | 3 | 4 | 5; title: string[]; id: string }) {
  const py = lerp(1960, 470, ease((t - a + 0.1) / 0.6));
  const scroll = module > 3 ? 420 * sm((t - a - 0.6) / 1.4) : 0;
  const hi = sm((t - a - 1.2) / 0.3);
  const pills = ["Reiten endlich verstehen.", "Schritt für Schritt.", "Einfach erklärt."];
  return (
    <g>
      <Big t={t} a={a - 0.1} lines={title} y={190} size={80} />
      <g transform={`translate(540 ${470}) scale(0.86) translate(-540 -470)`}>
        <Phone x={280} y={py} w={520} id={id}>
          <g transform={`translate(296 ${py + 16})`}>
            <HomeScreen scroll={scroll} />
            {hi > 0.01 && <rect x={10} y={404 + (module - 1) * 168 - 6 - scroll} width={468} height={164} rx="22" fill="none" stroke={COL.honey} strokeWidth={6 + 2 * Math.sin(t * 6)} opacity={hi} />}
          </g>
        </Phone>
      </g>
      {t < fin && pills.map((p, i) => {
        const at = b + i * ((fin - b) / 3);
        const nx = b + (i + 1) * ((fin - b) / 3);
        return t >= at && t < nx ? <Tag key={p} x={540} y={1450} text={p} size={48} fill={[COL.forest, COL.honey, COL.rust][i]} color={i === 1 ? COL.forestDeep : PAPER} o={ease((t - at) / 0.2)} /> : null;
      })}
      {t >= fin && (
        <g opacity={Math.min(1, back((t - fin) / 0.4))}>
          <rect x={70} y={1360} width={940} height={260} rx="44" fill={COL.forest} />
          <T x={540} y={1460} size={58} color={PAPER}>REITEN ENDLICH VERSTEHEN.</T>
          <T x={540} y={1550} size={46} font={FONT_BODY} weight={900} color={COL.honey}>Rider Academy – Link in Bio</T>
        </g>
      )}
    </g>
  );
}
