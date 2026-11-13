import { COL, FONT_BODY, PAPER, Phone, T, back, ease } from "./nov-kit";
import { Mark } from "./n2-kit";
import { Big, Face, Frame } from "./viral-kit";
import { Horse, type RugId } from "./edk-eindecken-reel";

/* Story-/Aufmerksamkeitsvideo (comp `story`, 13.11.2026), ohne Stimme, 15 s: Decke gestern? → Reitertagebuch → App. Kein Preis. */
export const STY_TOTAL = 15;
const C = [0, 2.6, 4.2, 5.6, 8.8, 10.8, 12.5];
const pop = (t: number, a: number) => back((t - a) / 0.25);
const CYC: RugId[] = ["g100", "g200", "regen", "ohne", "g150"];

function Diary({ t }: { t: number }) {
  const a = C[3];
  const rows: Array<[string, string]> = [["Pferd", "Tivoli"], ["Wetter", "6 °C · Wind"], ["Decke", "100 g"], ["Notiz", "hat gepasst ✓"]];
  return (
    <Phone x={260} y={560} w={560} id="sty">
      <g transform="translate(276 576)">
        <rect width={528} height={1080} fill={PAPER} />
        <rect width={528} height={150} fill={COL.forest} />
        <T x={264} y={96} size={44} color={PAPER}>📓 Reitertagebuch</T>
        <T x={40} y={230} size={34} anchor="start" font={FONT_BODY} weight={800} color={COL.inkSoft}>Freitag, 13. November</T>
        {rows.map(([k, v], i) => {
          const s = pop(t, a + 0.4 + i * 0.45);
          if (s <= 0.01) return null;
          return (
            <g key={k} opacity={Math.min(1, s)} transform={`translate(0 ${290 + i * 170})`}>
              <rect x={24} width={480} height={140} rx="26" fill={COL.bg} stroke={COL.sandLight} strokeWidth="4" />
              <T x={52} y={56} size={30} anchor="start" font={FONT_BODY} weight={700} color={COL.inkSoft}>{k}</T>
              <T x={52} y={112} size={44} anchor="start" color={i === 3 ? COL.forest : COL.forestDeep}>{v}</T>
            </g>
          );
        })}
      </g>
    </Phone>
  );
}

export function renderSTY(t: number) {
  const [, c1, c2, c3, c4, c5, c6] = C;
  let s;
  if (t < c1) {
    const rug = CYC[Math.floor(t / 0.3) % CYC.length];
    s = (<g><Big t={t} a={0} lines={["Welche Decke hatte", "dein Pferd"]} y={300} size={88} /><Big t={t} a={0.5} lines={["GESTERN?"]} y={560} size={170} col={COL.rust} shake={12} /><Horse t={t} id="styA" rug={rug} y={1660} k={2.4} /></g>);
  } else if (t < c2) {
    s = (<g><Big t={t} a={c1} lines={["…und hat sie", "gepasst?"]} y={420} size={120} /><Face t={t} x={540} y={1150} r={200} kind="reiter" mood="confused" a={c1 + 0.1} /></g>);
  } else if (t < c3) {
    s = (<g><Big t={t} a={c2} lines={["Du weißt es", "nicht mehr."]} y={700} size={130} col={COL.rust} shake={16} /><Face t={t} x={540} y={1300} r={150} kind="reiter" mood="dizzy" a={c2 + 0.2} /></g>);
  } else if (t < c4) {
    s = (<g><Big t={t} a={c3} lines={["Schreib's ins", "Reitertagebuch."]} y={260} size={96} col={COL.forest} /><Diary t={t} /></g>);
  } else if (t < c5) {
    const it: Array<[string, string]> = [["📓", "Reitertagebuch"], ["🎓", "Reitakademie"], ["💪", "Rider Lab"]];
    s = (<g><Big t={t} a={c4} lines={["Alles drin:"]} y={420} size={110} />{it.map(([e, l], i) => { const k = pop(t, c4 + 0.3 + i * 0.4); return k > 0.01 ? (<g key={l} opacity={Math.min(1, k)} transform={`translate(540 ${700 + i * 260}) scale(${Math.max(0.01, Math.min(1.08, k))}) translate(-540 ${-(700 + i * 260)})`}><rect x={140} y={620 + i * 260} width={800} height={180} rx="50" fill={i === 0 ? COL.rust : COL.forestDeep} /><T x={540} y={735 + i * 260} size={70} color={PAPER}>{`${e} ${l}`}</T></g>) : null; })}</g>);
  } else if (t < c6) {
    s = (<g><Big t={t} a={c5} lines={["Deine ganze", "Pferdewelt."]} y={640} size={130} /><Big t={t} a={c5 + 0.6} lines={["In einer App."]} y={980} size={130} col={COL.rust} /></g>);
  } else {
    const k = ease((t - c6 - 0.6) / 0.4);
    s = (<g><Big t={t} a={c6} lines={["Einmal kaufen.", "Kein Abo."]} y={560} size={130} col={COL.forestDeep} /><Mark x={540} y={900} ok k={pop(t, c6 + 0.3)} r={70} />
      <g opacity={k} transform={`translate(0 ${(1 - k) * 30})`}><rect x={140} y={1080} width={800} height={200} rx="60" fill={COL.rust} /><T x={540} y={1170} size={60} color={PAPER}>👆 Link in der Bio</T><T x={540} y={1240} size={42} font={FONT_BODY} weight={800} color={COL.honey}>hofgeschichten.app</T></g>
      <T x={540} y={1840} size={30} font={FONT_BODY} weight={700} color={COL.forestDeep}>Hofgeschichten | Die Reitakademie</T></g>);
  }
  return <Frame t={t} cuts={[...C.slice(1), ...[0.3, 0.6, 0.9, 1.2, 1.5, 1.8, 2.1]]}>{s}</Frame>;
}
