import { Caption, Chip, COL, E, FONT_BODY, Header, PAPER, S, T, W, H, back, clamp01, ease, lerp, seq, sm, win, type VLine } from "./rkit";
import { LOOKS, world, type Pt } from "./top";

/* Reihe „Warum eigentlich …?“ · Folge 1 (9:16): „Warum steigt man von links aufs Pferd?“
   Von oben: Pferd blickt nach oben, seine linke Seite ist links im Bild. Reitersoldat mit Schwert an der linken Hüfte.
   Von links: rechtes Bein schwingt frei über die Kruppe, Schwert bleibt außen. Von rechts: Schwert müsste übers Pferd.
   Heute: Gewohnheit (führen, satteln, aufsteigen von links) – Tipp: beide Seiten üben. */

/** Zeiten GESCHÄTZT (noch keine Aufnahme) – nach der Aufnahme durch echte Zeiten ersetzen wie in koerper-reel.tsx */
export const LINKS_LINES: VLine[] = seq([
  ["hook", "Warum steigt man eigentlich immer von links aufs Pferd?", 3.6],
  ["frueher", "Das kommt aus der Zeit der Ritter und Reitersoldaten.", 3.4],
  ["schwert", "Die meisten waren Rechtshänder – also hing das Schwert links am Gürtel.", 4.2],
  ["auf", "Von links konnte das rechte Bein frei über das Pferd schwingen. Von rechts wäre das Schwert im Weg gewesen.", 6.2],
  ["heute", "Heute ist es Gewohnheit – darum führen und satteln wir meist auch von links.", 4.6],
  ["tipp", "Aber ein gutes Pferd lernt beide Seiten kennen!", 2.8],
  ["tease", "Wusstest du's? Mehr Pferdewissen gibt's in der Reitakademie.", 3.6],
], 0.4, 0.4);
const L = LINKS_LINES;
export const LINKS_TOTAL = E(L, "tease") + 2.6;

/** Wortmarken – nach der Aufnahme echte Zeiten eintragen (ohne VO-Versatz), sonst anteilig nach Zeichen */
const MARKS: Record<string, number> = {};
function at(id: string, word: string) {
  if (MARKS[`${id}|${word}`] !== undefined) return MARKS[`${id}|${word}`];
  const l = L.find((x) => x.id === id)!;
  const i = Math.max(0, l.text.indexOf(word));
  return l.start + (l.dur * i) / l.text.length;
}

/* ---------- Pferd von oben, ohne Reiter ---------- */
const HC: Pt = [540, 1040];
const ANG = -90;
const SC = 7.2;
const w = (p: Pt) => world(HC, ANG, SC, p);
const LOOK = LOOKS.tonga;

function BareHorse({ t }: { t: number }) {
  const sw = Math.sin(t * 1.3) * 2.5;
  const nod = Math.sin(t * 0.9) * 1.2;
  const line = { stroke: "#3B2C22", strokeOpacity: 0.35, strokeWidth: 1.4 };
  return (
    <g transform={`translate(${HC[0]} ${HC[1]}) rotate(${ANG}) scale(${SC})`}>
      <ellipse cx="6" cy="3" rx="42" ry="18" fill="#000" opacity=".1" />
      <path d={`M-26 0 Q-38 ${sw} -46 ${sw * 1.8}`} stroke={LOOK.mane} strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d={`M10 -11 Q26 -9 44 ${-5 + nod} L44 ${5 + nod} Q26 9 10 11 Z`} fill={LOOK.coat} {...line} />
      <path d={`M10 0 L44 ${nod}`} stroke={LOOK.mane} strokeWidth="5" strokeLinecap="round" />
      <ellipse cx="55" cy={nod} rx="13" ry="7.5" fill={LOOK.coat} {...line} />
      <path d={`M44 ${-5 + nod} l-3 -7 l8 3 Z M44 ${5 + nod} l-3 7 l8 -3 Z`} fill={LOOK.coat} {...line} />
      <path d={`M42 ${nod} L47 ${nod}`} stroke={LOOK.mane} strokeWidth="5" strokeLinecap="round" />
      <path d="M-28 -6 Q-30 -15 -16 -15 L12 -15 Q24 -14 24 0 Q24 14 12 15 L-16 15 Q-30 15 -28 6 Z" fill={LOOK.coat} {...line} />
      {/* Sattel mit Steigbügeln */}
      <rect x="-8" y="-13" width="20" height="26" rx="6" fill="#7A4B2C" stroke="#4A2E1C" strokeWidth="1.2" />
      <path d="M-2 -13 L-2 -18 M-2 13 L-2 18" stroke="#4A2E1C" strokeWidth="1.4" />
      <rect x="-5" y="-21" width="6" height="3.4" rx="1.2" fill="#B9BEC4" />
      <rect x="-5" y="17.6" width="6" height="3.4" rx="1.2" fill="#B9BEC4" />
      {/* Zügel */}
      <path d="M12 -6 L44 -4 M12 6 L44 4" stroke="#3E2C22" strokeWidth="1.2" fill="none" />
    </g>
  );
}

/* ---------- Mensch von oben (Blick nach oben) ---------- */
type Who = "soldat" | "kind";
function Person({ p, who, sword = true, glowSword = 0, glowHand = 0, seated = 0, o = 1, pulse = 0, s = 2.1 }: { p: Pt; who: Who; sword?: boolean; glowSword?: number; glowHand?: number; seated?: number; o?: number; pulse?: number; s?: number }) {
  const coat = who === "soldat" ? "#4F6A86" : COL.forest;
  const head = who === "soldat" ? "#9AA3AC" : "#26201C";
  // im Sattel: Beine nach beiden Seiten
  const leg = 46 * seated;
  return (
    <g opacity={o} transform={`translate(${p[0]} ${p[1]}) scale(${s})`}>
      <ellipse cx="0" cy="8" rx="44" ry="22" fill="#000" opacity={0.1 * (1 - seated)} />
      {seated > 0.05 && (
        <g opacity={seated} stroke="#3E2C22" strokeWidth="13" strokeLinecap="round">
          <path d={`M-14 10 L${-14 - leg} 22`} />
          <path d={`M14 10 L${14 + leg} 22`} />
        </g>
      )}
      {/* Schwert an der linken Hüfte (im Bild links) */}
      {sword && (
        <g transform={`rotate(${lerp(14, 4, seated)} -36 4)`}>
          {glowSword > 0.01 && <rect x={-50} y={-14} width={28} height={112} rx="14" fill={COL.honey} opacity={0.35 * glowSword + 0.15 * pulse * glowSword} />}
          <rect x={-39} y={4} width={7} height={84} rx="3" fill="#C9CED3" stroke="#6E747A" strokeWidth="2" />
          <rect x={-47} y={-2} width={23} height={7} rx="3" fill="#8A6A3A" />
          <rect x={-39} y={-14} width={7} height={14} rx="3" fill="#5E4636" />
        </g>
      )}
      {/* Schultern + Arme */}
      <ellipse cx="0" cy="4" rx="38" ry="17" fill={coat} />
      <path d="M-30 6 L-38 -18 M30 6 L38 -18" stroke={coat} strokeWidth="12" strokeLinecap="round" />
      <circle cx="-38" cy="-20" r="7" fill="#E6C3A3" />
      <circle cx="38" cy="-20" r="7" fill="#E6C3A3" />
      {glowHand > 0.01 && <circle cx="38" cy="-20" r={18 + 3 * pulse} fill="none" stroke={COL.honey} strokeWidth="5" opacity={glowHand} />}
      {/* Kopf (Helm) */}
      <circle cx="0" cy="0" r="17" fill={head} />
      {who === "soldat" ? <path d="M-4 -16 L4 -16 L3 6 L-3 6 Z" fill="#7C858E" /> : <path d="M-12 -12 Q0 -24 12 -12" fill="none" stroke={COL.honey} strokeWidth="4" />}
    </g>
  );
}

/* ---------- Boden ---------- */
function Sand() {
  return (
    <g>
      <rect x={0} y={470} width={W} height={1070} fill="#E3D3B4" />
      <g fill="#D3BF9C">
        {Array.from({ length: 46 }, (_, i) => {
          const x = (i * 211) % W;
          const y = 520 + ((i * 137) % 980);
          return <ellipse key={i} cx={x} cy={y} rx={i % 3 ? 14 : 22} ry="5" transform={`rotate(${(i * 37) % 180} ${x} ${y})`} />;
        })}
      </g>
      <rect x={0} y={466} width={W} height={120} fill="url(#lr-fade)" />
      <defs>
        <linearGradient id="lr-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={COL.bg} />
          <stop offset="1" stopColor={COL.bg} stopOpacity="0" />
        </linearGradient>
      </defs>
    </g>
  );
}

function Pop({ t, a, x, y, text, fill, size = 32, o = 1 }: { t: number; a: number; x: number; y: number; text: string; fill: string; size?: number; o?: number }) {
  const k = back((t - a) / 0.4);
  if (k <= 0.01 || o <= 0) return null;
  return (
    <g opacity={Math.min(1, k) * o} transform={`translate(${x} ${y}) scale(${Math.max(0.01, k)}) translate(${-x} ${-y})`}>
      <Chip x={x} y={y} text={text} fill={fill} size={size} />
    </g>
  );
}

/** gestrichelter Bogen mit Pfeilspitze, wird gezeichnet (u = 0…1) */
function Bow({ d, len, u, col, w = 9 }: { d: string; len: number; u: number; col: string; w?: number }) {
  if (u <= 0.01) return null;
  return (
    <g>
      <path d={d} fill="none" stroke={PAPER} strokeWidth={w + 8} strokeLinecap="round" strokeDasharray={`${len * u} ${len}`} />
      <path d={d} fill="none" stroke={col} strokeWidth={w} strokeLinecap="round" strokeDasharray={`${len * u} ${len}`} />
    </g>
  );
}

function Title({ t, id, top, sub, color = COL.forestDeep, end, start }: { t: number; id: string; top: string; sub?: string; color?: string; end?: number; start?: number }) {
  const a = start ?? S(L, id);
  const o = win(t, a, end ?? E(L, id));
  if (o <= 0) return null;
  const k1 = ease((t - a) / 0.4);
  const k2 = ease((t - a - 0.25) / 0.4);
  return (
    <g opacity={o}>
      <g opacity={k1} transform={`translate(0 ${(1 - k1) * 30})`}>
        <T x={540} y={290} size={Math.min(84, 900 / (top.length * 0.53))} color={color}>{top}</T>
      </g>
      {sub && (
        <g opacity={k2} transform={`translate(0 ${(1 - k2) * 30})`}>
          <T x={540} y={366} size={40} font={FONT_BODY} weight={700} color={COL.inkSoft}>{sub}</T>
        </g>
      )}
    </g>
  );
}

/** Hook: dunkle Titelkarte, Reihen-Kennung oben */
function Hook({ t }: { t: number }) {
  const o = win(t, 0, E(L, "hook") + 0.1, 0.35);
  if (o <= 0) return null;
  const k = (d: number) => ease((t + 0.4 - d) / 0.45);
  const q = back((t - 0.9) / 0.5);
  return (
    <g opacity={o}>
      <rect width={W} height={H} fill={COL.forestDeep} />
      <rect x={250} y={420} width={580} height={1080} rx="20" fill={COL.forest} opacity=".55" />
      <rect x={290} y={460} width={500} height={1000} rx="12" fill="none" stroke={COL.sand} strokeWidth="4" strokeDasharray="14 14" opacity=".35" />
      <g opacity={k(0)}>
        <rect x={290} y={300} width={500} height={70} rx="35" fill={COL.honey} />
        <T x={540} y={347} size={34} font={FONT_BODY} weight={700} color={COL.forestDeep}>Warum eigentlich …? · Folge 1</T>
      </g>
      <g opacity={k(0.1)} transform={`translate(0 ${(1 - k(0.1)) * 40})`}>
        <T x={540} y={700} size={86} color={PAPER}>Warum steigt man</T>
      </g>
      <g opacity={k(0.25)} transform={`translate(540 830) scale(${Math.max(0.01, 0.6 + 0.4 * Math.min(1.2, k(0.25)))}) translate(-540 -830)`}>
        <T x={540} y={860} size={150} color={COL.honey} italic>von links</T>
      </g>
      <g opacity={k(0.4)} transform={`translate(0 ${(1 - k(0.4)) * 40})`}>
        <T x={540} y={990} size={86} color={PAPER}>aufs Pferd?</T>
      </g>
      <g transform={`translate(540 1200) scale(${Math.max(0.01, q)})`} opacity={Math.min(1, q)}>
        <circle r="80" fill={COL.rust} />
        <T x={0} y={34} size={110} color={PAPER}>?</T>
      </g>
    </g>
  );
}

function Tease({ t }: { t: number }) {
  const a = S(L, "tease") - 0.1;
  const k = ease((t - a) / 0.45);
  if (k <= 0) return null;
  const pulse = 1 + 0.02 * Math.sin(Math.max(0, t - a - 2) * 5);
  return (
    <g opacity={k} transform={`translate(540 ${1540 + (1 - k) * 40}) scale(${pulse}) translate(-540 -1540)`}>
      <rect x={90} y={1420} width={900} height={250} rx="36" fill={COL.honey} />
      <T x={540} y={1497} size={52} color={COL.forestDeep}>Wusstest du’s?</T>
      <T x={540} y={1557} size={38} font={FONT_BODY} weight={700} color={COL.forestDeep}>Welche Warum-Frage als Nächstes? 💬</T>
      <T x={540} y={1625} size={32} font={FONT_BODY} weight={700} color={COL.brownDeep}>Mehr Pferdewissen · Reitakademie · Link in der Bio</T>
    </g>
  );
}

/* ---------- Szene ---------- */
const LEFT: Pt = [300, 1040]; // neben dem Sattel, linke Pferdeseite
const RIGHT: Pt = [780, 1040];
const SEAT: Pt = w([0, 0]);

export function renderLinks(t: number) {
  const pulse = 0.5 + 0.5 * Math.sin(t * 6);
  const hookO = win(t, 0, E(L, "hook"));
  const hideHead = hookO;

  // Soldat erscheint bei „Ritter“, steigt bei „rechte Bein“ auf, wird bei „Heute“ zum Kind
  const appear = back((t - at("frueher", "Ritter")) / 0.5);
  const legT = at("auf", "rechte Bein");
  const mount = sm((t - legT - 0.3) / 1.4);
  const toKid = sm((t - S(L, "heute") + 0.1) / 0.4);
  const swordGlow = win(t, at("schwert", "also hing"), E(L, "schwert")) + win(t, at("auf", "Von links"), at("auf", "Von rechts"));
  const handGlow = win(t, at("schwert", "Rechtshänder"), at("schwert", "also hing"));
  const pos: Pt = [lerp(LEFT[0], SEAT[0], mount), lerp(LEFT[1], SEAT[1], mount)];

  // Bein-Bogen über die Kruppe (von links nach rechts)
  const croup = w([-24, 0]);
  const legBow = `M${LEFT[0] + 70} ${LEFT[1] + 50} Q${croup[0]} ${croup[1] + 170} ${RIGHT[0] - 40} ${LEFT[1] + 60}`;
  const legU = ease((t - legT) / 1.0) * win(t, legT, at("auf", "Von rechts"));
  const okO = win(t, legT + 0.8, at("auf", "Von rechts"));

  // falsche Seite: Geist-Soldat rechts, Schwert müsste übers Pferd
  const wrongA = at("auf", "Von rechts");
  const wrongO = win(t, wrongA, E(L, "auf"));
  const swordBow = `M${RIGHT[0] - 80} ${RIGHT[1] + 110} Q${SEAT[0]} ${SEAT[1] - 30} ${LEFT[0] + 60} ${RIGHT[1] + 80}`;
  const swU = ease((t - wrongA - 0.5) / 1.0) * wrongO;

  // Heute: Liste „von links“
  const heuteO = win(t, S(L, "heute"), E(L, "heute"));
  // Tipp: Kinder auf beiden Seiten
  const tippO = win(t, S(L, "tipp"), LINKS_TOTAL + 1);
  const kidSeatOff = 1 - sm((t - S(L, "tipp") + 0.1) / 0.5);

  const sceneO = win(t, S(L, "frueher") - 0.2, LINKS_TOTAL + 1);
  const soldierO = appear > 0.01 ? Math.min(1, appear) * (1 - toKid) : 0;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect width={W} height={H} fill={COL.bg} />
      <g opacity={sceneO}>
        <Sand />
        {/* Seitenbeschriftung */}
        <g opacity={win(t, S(L, "frueher") + 0.3, E(L, "heute"))}>
          <T x={130} y={1400} size={34} font={FONT_BODY} weight={700} color={COL.brownDeep}>LINKS</T>
          <T x={950} y={1400} size={34} font={FONT_BODY} weight={700} color={COL.brownDeep}>RECHTS</T>
        </g>
        <BareHorse t={t} />
        {/* Soldat */}
        {soldierO > 0.01 && (
          <g transform={`translate(${pos[0]} ${pos[1]}) scale(${Math.max(0.01, Math.min(1.15, appear))}) translate(${-pos[0]} ${-pos[1]})`}>
            <Person p={pos} who="soldat" seated={mount} glowSword={clamp01(swordGlow)} glowHand={handGlow} o={soldierO} pulse={pulse} />
          </g>
        )}
        {/* Kind: heute (im Sattel), beim Tipp wieder daneben auf beiden Seiten */}
        {toKid > 0.01 && tippO <= 0 && <Person p={SEAT} who="kind" sword={false} seated={1} o={toKid} />}
        {tippO > 0 && (
          <g opacity={tippO}>
            <Person p={[lerp(SEAT[0], LEFT[0], 1 - kidSeatOff), lerp(SEAT[1], LEFT[1], 1 - kidSeatOff)]} who="kind" sword={false} seated={kidSeatOff} />
            <g opacity={back((t - S(L, "tipp") - 0.5) / 0.4) > 0.01 ? Math.min(1, back((t - S(L, "tipp") - 0.5) / 0.4)) : 0}>
              <Person p={RIGHT} who="kind" sword={false} />
            </g>
          </g>
        )}
        {/* Bein schwingt über die Kruppe */}
        <Bow d={legBow} len={760} u={legU} col={COL.honey} w={12} />
        {okO > 0 && (
          <g opacity={okO}>
            <Pop t={t} a={legT + 0.3} x={540} y={1480} text="✓ rechtes Bein schwingt frei drüber" fill={COL.forest} size={32} />
            <Pop t={t} a={legT + 1.2} x={230} y={1300} text="Schwert bleibt außen" fill={COL.forestDeep} size={28} />
          </g>
        )}
        {/* falsche Seite */}
        {wrongO > 0 && (
          <g opacity={wrongO}>
            <Person p={RIGHT} who="soldat" glowSword={1} pulse={pulse} o={0.9} />
            <Bow d={swordBow} len={620} u={swU} col={COL.rust} w={11} />
            <g opacity={ease((t - wrongA - 1.2) / 0.3)}>
              <circle cx={SEAT[0]} cy={SEAT[1] - 10} r={46} fill={COL.rust} />
              <T x={SEAT[0]} y={SEAT[1] + 10} size={64} color={PAPER}>✗</T>
            </g>
            <Pop t={t} a={wrongA + 0.9} x={540} y={1480} text="✗ von rechts: Schwert im Weg" fill={COL.rust} size={32} />
          </g>
        )}
        {/* Schwert-Hinweis */}
        <Pop t={t} a={at("schwert", "Rechtshänder")} x={830} y={820} text="Rechtshänder" fill={COL.forestDeep} size={30} o={win(t, S(L, "schwert"), E(L, "schwert"))} />
        <Pop t={t} a={at("schwert", "Schwert links")} x={200} y={1300} text="Schwert links" fill={COL.honey} size={30} o={win(t, S(L, "schwert"), E(L, "schwert"))} />
        {/* Heute: alles von links */}
        {heuteO > 0 && (
          <g opacity={heuteO}>
            {(["führen", "satteln", "aufsteigen"] as const).map((s, i) => (
              <Pop key={s} t={t} a={(i === 0 ? at("heute", "führen") : i === 1 ? at("heute", "satteln") : at("heute", "Gewohnheit")) + 0.1} x={190} y={700 + i * 100} text={`← ${s}`} fill={COL.forest} size={32} />
            ))}
          </g>
        )}
        {tippO > 0 && (
          <g opacity={win(t, S(L, "tipp"), E(L, "tipp"))}>
            <Pop t={t} a={S(L, "tipp") + 0.3} x={200} y={1290} text="✓ links" fill={COL.forest} size={32} />
            <Pop t={t} a={S(L, "tipp") + 0.8} x={880} y={1290} text="✓ rechts" fill={COL.forest} size={32} />
          </g>
        )}
      </g>

      <Header t={t} label="Warum eigentlich …? · Folge 1" hide={hideHead} />
      <Title t={t} id="frueher" top="Das kommt von früher" sub="Ritter und Reitersoldaten" end={E(L, "schwert")} />
      <Title t={t} id="auf" top="Von links aufsteigen" sub="das rechte Bein schwingt drüber" end={at("auf", "Von rechts") - 0.1} color={COL.forest} />
      <Title t={t} id="auf" start={at("auf", "Von rechts")} top="Von rechts?" sub="das Schwert wäre im Weg" color={COL.rust} />
      <Title t={t} id="heute" top="Heute: Gewohnheit" sub="darum machen wir fast alles von links" />
      <Title t={t} id="tipp" top="Tipp: beide Seiten üben" sub="ein gutes Pferd kennt beide" color={COL.forest} end={LINKS_TOTAL + 1} />
      <Caption t={t} lines={L} skip={["hook", "tease"]} y={1560} />
      <Tease t={t} />
      <Hook t={t} />
    </svg>
  );
}
