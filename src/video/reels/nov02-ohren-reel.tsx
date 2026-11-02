import { getHorse } from "@/content/horses";
import { Arrow, Brand, COL, Caption, CommentCard, E, FONT_BODY, Header, HookText, NodHorse, PAPER, Pop, S, T, Title, W, H, back, ease, hs, lerp, mkLines, sm, win, wordAt, type Place } from "./nov-kit";

/* November 02 (9:16): „Was Pferdeohren wirklich verraten“ – Pferdekopf frontal.
   Ohren: beide nach vorn (Aufmerksamkeit nach vorn) · unabhängig (zwei Geräuschquellen) · eng angelegt (Warnsignal).
   Ohrbewegung plausibel: Ohrmuschel dreht um die Ohrbasis (Öffnung wandert zur Seite/nach hinten), angelegt = flach nach
   hinten gedrückt, Öffnung nicht mehr sichtbar. Danach ganze Körpersprache (Seitenansicht) + Kommentarfrage. */

const REC: Array<[string, string, number, number]> = [
  ["a1", "Die Ohren deines Pferdes verraten dir eine ganze Menge.", 0, 3.26],
  ["a2", "Aber Vorsicht:", 3.65, 4.52],
  ["a3", "Eine Ohrenstellung bedeutet nicht immer dasselbe!", 4.85, 7.55],
  ["b", "Sind beide Ohren nach vorne gerichtet, konzentriert sich dein Pferd häufig auf etwas vor sich.", 8.05, 13.08],
  ["c", "Bewegt es die Ohren unabhängig voneinander, kann es verschiedene Geräusche gleichzeitig verfolgen.", 13.49, 18.5],
  ["d", "Eng angelegte Ohren können ein Warnsignal für Unwohlsein, Angst oder Abwehr sein.", 18.91, 24.13],
  ["e1", "Aber die Ohren allein reichen nicht aus.", 24.54, 26.77],
  ["e2", "Du musst immer die gesamte Körpersprache beachten.", 27.17, 30.25],
  ["f", "Welche Ohrenstellung zeigt dein Pferd am häufigsten?", 30.62, 33.29],
];
export const N02_LINES = mkLines(REC);
const L = N02_LINES;
export const N02_TOTAL = E(L, "f") + 2.8;
const at = (id: string, w: string) => wordAt(L, id, w);

const LOOK = getHorse("tonga")!.look;
const INNER = "#4A3020";

/** Ohrstellung: tilt = Neigung nach außen (Grad), turn = Öffnung dreht weg (0 vorn … 1 zur Seite … 2 nach hinten), lay = anlegen (0–1) */
type Ear = { tilt: number; turn: number; lay: number };
const FWD: Ear = { tilt: 6, turn: 0, lay: 0 };
const SIDE: Ear = { tilt: 34, turn: 0.55, lay: 0 };
const BACKE: Ear = { tilt: 26, turn: 1.95, lay: 0 };
const FLAT: Ear = { tilt: 100, turn: 2, lay: 1 };
const RELAX: Ear = { tilt: 48, turn: 0.9, lay: 0.15 };
const mix = (a: Ear, b: Ear, u: number): Ear => ({ tilt: lerp(a.tilt, b.tilt, u), turn: lerp(a.turn, b.turn, u), lay: lerp(a.lay, b.lay, u) });

function EarShape({ side, e }: { side: -1 | 1; e: Ear }) {
  const open = Math.cos((Math.min(e.turn, 2) * Math.PI) / 2); // 1 = Öffnung nach vorn, 0 = seitlich, -1 = nach hinten
  const sx = 0.55 + 0.45 * Math.abs(open);
  const sy = 1 - 0.55 * e.lay;
  const innerO = Math.max(0, open);
  return (
    <g transform={`translate(0 ${26 * e.lay}) rotate(${side * e.tilt}) scale(${sx * (1 - 0.15 * e.lay)} ${sy})`}>
      <path d="M-30,6 C-40,-60 -18,-122 0,-156 C18,-122 40,-60 30,6 Z" fill={open < 0 ? LOOK.coatShade : LOOK.coat} stroke="#3B2C22" strokeOpacity=".3" strokeWidth="2" />
      {innerO > 0.02 && (
        <g opacity={innerO} transform={`translate(${side * (1 - innerO) * -10} 0) scale(${0.35 + 0.65 * innerO} 1)`}>
          <path d="M-17,-6 C-22,-56 -9,-104 0,-128 C9,-104 22,-56 17,-6 Z" fill={INNER} />
          <path d="M-8,-20 q4,-40 8,-80 M8,-20 q-4,-40 -8,-80" stroke="#C9B9A6" strokeWidth="2" opacity=".7" fill="none" />
        </g>
      )}
    </g>
  );
}

/** Pferdekopf frontal (lokal: Stirnmitte = 0,0) */
function FrontHead({ x, y, s, left, right, tense = 0, blink = 0 }: { x: number; y: number; s: number; left: Ear; right: Ear; tense?: number; blink?: number }) {
  const line = { stroke: "#3B2C22", strokeOpacity: 0.3, strokeWidth: 2 };
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* Hals */}
      <path d="M-120,120 C-150,260 -190,420 -230,560 L230,560 C190,420 150,260 120,120 Z" fill={LOOK.coatShade} />
      {/* Ohren hinter dem Kopf */}
      <g transform="translate(-92 -228)"><EarShape side={-1} e={left} /></g>
      <g transform="translate(92 -228)"><EarShape side={1} e={right} /></g>
      {/* Kopf */}
      <path d="M-150,-120 C-160,-220 -90,-262 0,-264 C90,-262 160,-220 150,-120 C140,20 102,140 94,240 C90,300 62,334 0,336 C-62,334 -90,300 -94,240 C-102,140 -140,20 -150,-120 Z" fill={LOOK.coat} {...line} />
      {/* Stirnschopf */}
      <path d="M-40,-262 C-30,-200 -10,-170 10,-150 C20,-190 40,-230 50,-258 C20,-272 -10,-272 -40,-262 Z" fill={LOOK.mane} />
      {/* Stern */}
      <path d="M0,-130 l12,22 l24,4 l-18,16 l4,24 l-22,-12 l-22,12 l4,-24 l-18,-16 l24,-4 Z" fill="#F7F3EC" />
      {/* Augen seitlich */}
      {[-1, 1].map((sd) => (
        <g key={sd} transform={`translate(${sd * 136} -70)`}>
          <ellipse rx="18" ry={22 * (1 - blink)} fill="#1A120D" transform={`rotate(${sd * 18})`} />
          {blink < 0.5 && <circle cx={sd * 4} cy={-6} r="5" fill="#fff" opacity=".8" />}
          {tense > 0.01 && <path d={`M${-sd * 6},-30 q${sd * 18},-12 ${sd * 30},2`} stroke="#3B2C22" strokeWidth="5" fill="none" opacity={tense} strokeLinecap="round" />}
        </g>
      ))}
      {/* Nüstern: angespannt = enger, länger */}
      {[-1, 1].map((sd) => (
        <ellipse key={sd} cx={sd * 46} cy={268} rx={16 - 5 * tense} ry={26 + 6 * tense} fill="#2A1D16" transform={`rotate(${sd * -20} ${sd * 46} 268)`} />
      ))}
      <path d={`M-30,318 Q0,${326 - 6 * tense} 30,318`} stroke="#2A1D16" strokeWidth="4" fill="none" strokeLinecap="round" />
    </g>
  );
}

/* Geräuschquelle (Lautsprecher-Wellen) */
function Sound({ x, y, o, dir, pulse }: { x: number; y: number; o: number; dir: -1 | 1; pulse: number }) {
  if (o <= 0.01) return null;
  return (
    <g opacity={o} transform={`translate(${x} ${y}) scale(${dir} 1)`} fill="none" stroke={COL.honey} strokeWidth="9" strokeLinecap="round">
      <circle r="44" fill={COL.honey} stroke="none" />
      <path d="M-16 -12 h10 l14 -12 v48 l-14 -12 h-10 Z" fill={PAPER} stroke="none" />
      {[0, 1, 2].map((i) => (
        <path key={i} opacity={1 - ((pulse + i / 3) % 1)} d={`M${60 + i * 26} -30 q20 30 0 60`} />
      ))}
    </g>
  );
}

const HEAD = { x: 540, y: 1010, s: 1.18 };

function earState(t: number): { l: Ear; r: Ear } {
  // Einstieg: neugieriges Zucken
  const hookFlick = Math.max(0, Math.sin(t * 3.2)) * (1 - sm((t - E(L, "a3")) / 0.4));
  let l = mix(FWD, SIDE, hookFlick * 0.6);
  let r = mix(FWD, SIDE, Math.max(0, Math.sin(t * 3.2 + 2)) * 0.6 * (1 - sm((t - E(L, "a3")) / 0.4)));
  // b: beide nach vorn
  const bK = sm((t - S(L, "b")) / 0.4);
  l = mix(l, FWD, bK);
  r = mix(r, FWD, bK);
  // c: unabhängig – links nach vorn-seitlich, rechts nach hinten, dann umgekehrt
  const cA = S(L, "c");
  const cO = win(t, cA, E(L, "c") + 0.1, 0.4);
  if (cO > 0) {
    const ph = sm((t - cA - 0.3) / 0.5) - sm((t - at("c", "verschiedene")) / 0.6);
    const ph2 = sm((t - at("c", "verschiedene")) / 0.6);
    l = mix(l, mix(SIDE, BACKE, ph2), cO * Math.max(ph, ph2));
    r = mix(r, mix(BACKE, SIDE, ph2), cO * Math.max(ph, ph2));
  }
  // d: eng angelegt
  const dK = sm((t - at("d", "angelegte") + 0.3) / 0.5) * (1 - sm((t - S(L, "e1")) / 0.6));
  l = mix(l, FLAT, dK);
  r = mix(r, FLAT, dK);
  return { l, r };
}

/* Antwort-Kacheln mit kleinen Köpfen */
const TILES: Array<[string, Ear, Ear]> = [
  ["nach vorn", FWD, FWD],
  ["unabhängig", mix(FWD, SIDE, 0.5), BACKE],
  ["locker seitlich", RELAX, RELAX],
  ["angelegt", FLAT, FLAT],
];

const SIDE_PL: Place = { x: 70, y: 690, k: 2.9 };

export function renderN02(t: number) {
  const pulse = (t * 1.4) % 1;
  const { l, r } = earState(t);
  const tense = sm((t - at("d", "angelegte")) / 0.5) * (1 - sm((t - S(L, "e1")) / 0.6));
  const bt = t % 3.1;
  const blink = bt < 0.18 ? Math.sin((bt / 0.18) * Math.PI) : 0;
  // Kopf verschwindet bei „gesamte Körpersprache“, Seitenansicht kommt
  const toBody = sm((t - S(L, "e2") + 0.3) / 0.6);
  const endA = S(L, "f") - 0.2;
  const endO = win(t, endA, N02_TOTAL + 1);
  const headO = (1 - toBody);
  const bodyO = toBody * (1 - sm((t - endA) / 0.4));
  const hookO = win(t, 0, E(L, "a1") + 0.1);
  const hideHead = Math.max(hookO, endO);
  const bO = win(t, S(L, "b"), E(L, "b"));
  const cO = win(t, S(L, "c"), E(L, "c"));
  const dO = win(t, S(L, "d"), E(L, "d"));
  const eye = (sd: number): [number, number] => [HEAD.x + sd * 136 * HEAD.s, HEAD.y - 70 * HEAD.s];
  const earTip = (sd: number): [number, number] => [HEAD.x + sd * 110 * HEAD.s, HEAD.y - 360 * HEAD.s];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect width={W} height={H} fill={COL.bg} />
      <circle cx={540} cy={1000} r={470} fill={COL.sandLight} opacity={0.55 * headO} />
      {headO > 0.01 && (
        <g opacity={headO} transform={`translate(540 1000) scale(${1 - 0.15 * toBody}) translate(-540 -1000)`}>
          <FrontHead x={HEAD.x} y={HEAD.y} s={HEAD.s} left={l} right={r} tense={tense} blink={blink} />
        </g>
      )}

      {/* b: beide nach vorn – Aufmerksamkeit nach vorn */}
      {bO > 0 && (
        <g opacity={bO}>
          {[-1, 1].map((sd) => (
            <g key={sd} opacity={ease((t - S(L, "b") - 0.3) / 0.4)}>
              <circle cx={earTip(sd)[0]} cy={earTip(sd)[1] + 70} r={70 + 8 * Math.sin(t * 6)} fill="none" stroke={COL.honey} strokeWidth="7" />
            </g>
          ))}
          <Pop t={t} a={S(L, "b") + 0.3} x={540} y={470} text="beide Ohren nach vorn" fill={COL.forest} size={36} />
          <Pop t={t} a={at("b", "konzentriert")} x={540} y={1500} text="👀 Fokus auf etwas vor sich" fill={COL.forestDeep} size={34} />
        </g>
      )}
      {/* c: zwei Geräuschquellen */}
      {cO > 0 && (
        <g opacity={cO}>
          <Sound x={130} y={560} o={ease((t - S(L, "c") - 0.2) / 0.4)} dir={1} pulse={pulse} />
          <Sound x={950} y={760} o={ease((t - S(L, "c") - 0.5) / 0.4)} dir={-1} pulse={pulse} />
          <Pop t={t} a={S(L, "c") + 0.4} x={540} y={470} text="Ohren drehen unabhängig" fill={COL.forest} size={36} />
          <Pop t={t} a={at("c", "verschiedene")} x={540} y={1500} text="hört in zwei Richtungen" fill={COL.forestDeep} size={34} />
        </g>
      )}
      {/* d: angelegt */}
      {dO > 0 && (
        <g opacity={dO}>
          <Pop t={t} a={at("d", "angelegte")} x={540} y={470} text="⚠ eng angelegt" fill={COL.rust} size={40} />
          <Pop t={t} a={at("d", "Unwohlsein") - 0.05} x={220} y={1500} text="Unwohlsein" fill={COL.rust} size={32} />
          <Pop t={t} a={at("d", "Angst") - 0.05} x={540} y={1500} text="Angst" fill={COL.rust} size={32} />
          <Pop t={t} a={at("d", "Abwehr") - 0.05} x={850} y={1500} text="Abwehr" fill={COL.rust} size={32} />
        </g>
      )}
      {/* e: ganze Körpersprache */}
      {bodyO > 0.01 && (
        <g opacity={bodyO}>
          <rect x={0} y={1350} width={W} height={180} fill="#E3D3B4" />
          <NodHorse t={t} pl={SIDE_PL} look={LOOK} nod={Math.sin(t * 1.2) * 1.5} id="n02" />
          {(
            [
              ["Ohren", [312, 36], [700, 560]],
              ["Augen", [330, 78], [930, 700]],
              ["Maul & Nüstern", [362, 128], [880, 880]],
              ["Kopfhaltung", [290, 100], [420, 600]],
              ["Körperspannung", [190, 140], [260, 830]],
              ["Schweif", [96, 190], [170, 1160]],
            ] as Array<[string, [number, number], [number, number]]>
          ).map(([label, p, to], i) => {
            const k = ease((t - S(L, "e2") - 0.1 - i * 0.28) / 0.35);
            if (k <= 0) return null;
            const from = hs(SIDE_PL, p);
            return (
              <g key={label} opacity={k}>
                <path d={`M${from[0]} ${from[1]} L${to[0]} ${to[1]}`} stroke={COL.forest} strokeWidth="4" />
                <circle cx={from[0]} cy={from[1]} r="9" fill={COL.forest} />
                <Pop t={t} a={S(L, "e2") - 0.1 + i * 0.28} x={to[0]} y={to[1]} text={label} fill={COL.forest} size={30} />
              </g>
            );
          })}
        </g>
      )}
      {win(t, S(L, "e1"), E(L, "e1")) > 0 && (
        <g opacity={win(t, S(L, "e1"), E(L, "e1"))}>
          <Pop t={t} a={S(L, "e1") + 0.2} x={540} y={470} text="Ohren allein? Reicht nicht!" fill={COL.rust} size={38} />
        </g>
      )}

      {/* Ende: Antwort-Kacheln */}
      {endO > 0 && (
        <g opacity={endO}>
          <CommentCard t={t} a={endA} lines={["Welche Ohrenstellung zeigt", "dein Pferd am häufigsten?"]} sub="Schreib’s in die Kommentare 👇" y={190} />
          {TILES.map(([label, el, er], i) => {
            const k = back((t - endA - 0.5 - i * 0.18) / 0.45);
            if (k <= 0.01) return null;
            const cx = 300 + (i % 2) * 480;
            const cy = 720 + Math.floor(i / 2) * 420;
            return (
              <g key={label} opacity={Math.min(1, k)} transform={`translate(${cx} ${cy}) scale(${Math.max(0.01, k)}) translate(${-cx} ${-cy})`}>
                <rect x={cx - 220} y={cy - 190} width={440} height={390} rx="36" fill={PAPER} stroke={COL.forest} strokeWidth="5" />
                <circle cx={cx - 170} cy={cy - 140} r="34" fill={COL.honey} />
                <T x={cx - 170} y={cy - 126} size={40} color={COL.forestDeep}>{String.fromCharCode(65 + i)}</T>
                <clipPath id={`n02-t${i}`}><rect x={cx - 216} y={cy - 186} width={432} height={300} /></clipPath>
                <g clipPath={`url(#n02-t${i})`}><FrontHead x={cx} y={cy - 2} s={0.34} left={el} right={er} tense={i === 3 ? 1 : 0} /></g>
                <T x={cx} y={cy + 168} size={34} font={FONT_BODY} weight={700} color={COL.forestDeep}>{label}</T>
              </g>
            );
          })}
          <Brand t={t} a={E(L, "f") - 0.3} sub="Pferde verstehen · Reitakademie · Link in der Bio" />
        </g>
      )}

      <Header t={t} label="Die Hofgeschichten · Pferde verstehen" hide={hideHead} />
      <HookText t={t} end={E(L, "a1") + 0.1} lines={[
        { text: "Glaubst du, du kannst", at: -0.9 },
        { text: "dein Pferd lesen?", at: 0.4 },
        { text: "Dann schau auf seine Ohren!", at: 1.4, hi: true, size: 76 },
      ]} />
      <Title t={t} a={S(L, "a2")} b={E(L, "a3")} top="Aber Vorsicht!" sub="eine Ohrenstellung bedeutet nicht immer dasselbe" color={COL.rust} />
      <Title t={t} a={S(L, "b")} b={E(L, "b")} top="Beide Ohren nach vorn" sub="häufig: konzentriert auf etwas vor sich" color={COL.forest} />
      <Title t={t} a={S(L, "c")} b={E(L, "c")} top="Ohren unabhängig" sub="verfolgt mehrere Geräusche gleichzeitig" color={COL.forest} />
      <Title t={t} a={S(L, "d")} b={E(L, "d")} top="Eng angelegt" sub="kann ein Warnsignal sein" color={COL.rust} />
      <Title t={t} a={S(L, "e1")} b={E(L, "e2")} top="Immer das ganze Pferd" sub="die gesamte Körpersprache zählt" color={COL.forestDeep} />
      <Caption t={t} lines={L} skip={["f"]} y={1600} />
      {eye(1)[0] < 0 && <Arrow from={[0, 0]} to={[1, 1]} />}
    </svg>
  );
}
