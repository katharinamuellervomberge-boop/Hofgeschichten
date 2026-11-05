"use client";

/**
 * Stallgeräusche für „Mein Tag am Hof“ – direkt im Browser erzeugt (Web Audio),
 * ohne Audiodateien und ohne Abhängigkeiten. Leise, weich, nie schrill.
 *
 * Später können echte Aufnahmen (z. B. /public/hoftag/sfx/wasser.mp3) einzelne
 * Geräusche ersetzen – die Aufrufe im Spiel (`sfx.wasser()` …) bleiben gleich.
 */

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let noiseBuf: AudioBuffer | null = null;
let enabled = true;

function audio(): { c: AudioContext; out: GainNode } | null {
  if (!enabled || typeof window === "undefined") return null;
  try {
    if (!ctx) {
      const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.55;
      master.connect(ctx.destination);
    }
    if (ctx.state === "suspended") void ctx.resume();
    return { c: ctx, out: master! };
  } catch {
    return null;
  }
}

function noise(c: AudioContext): AudioBuffer {
  if (noiseBuf) return noiseBuf;
  const len = c.sampleRate * 2;
  noiseBuf = c.createBuffer(1, len, c.sampleRate);
  const d = noiseBuf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  return noiseBuf;
}

/** Gefiltertes Rauschen mit Hüllkurve */
function hiss(
  at: number,
  dur: number,
  o: { type?: BiquadFilterType; freq: number; freqTo?: number; q?: number; gain?: number; attack?: number },
) {
  const a = audio();
  if (!a) return null;
  const { c, out } = a;
  const src = c.createBufferSource();
  src.buffer = noise(c);
  src.loop = true;
  const f = c.createBiquadFilter();
  f.type = o.type ?? "bandpass";
  f.frequency.setValueAtTime(o.freq, at);
  if (o.freqTo) f.frequency.exponentialRampToValueAtTime(o.freqTo, at + dur);
  f.Q.value = o.q ?? 1;
  const g = c.createGain();
  const peak = o.gain ?? 0.3;
  g.gain.setValueAtTime(0.0001, at);
  g.gain.exponentialRampToValueAtTime(peak, at + (o.attack ?? 0.02));
  g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  src.connect(f).connect(g).connect(out);
  src.start(at, Math.random());
  src.stop(at + dur + 0.05);
  return { f, g };
}

/** Kurzer Ton */
function tone(at: number, freq: number, dur: number, o: { type?: OscillatorType; gain?: number; freqTo?: number } = {}) {
  const a = audio();
  if (!a) return;
  const { c, out } = a;
  const osc = c.createOscillator();
  osc.type = o.type ?? "sine";
  osc.frequency.setValueAtTime(freq, at);
  if (o.freqTo) osc.frequency.exponentialRampToValueAtTime(o.freqTo, at + dur);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, at);
  g.gain.exponentialRampToValueAtTime(o.gain ?? 0.2, at + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  osc.connect(g).connect(out);
  osc.start(at);
  osc.stop(at + dur + 0.05);
}

const now = () => audio()?.c.currentTime ?? 0;
const rnd = (a: number, b: number) => a + Math.random() * (b - a);

export const sfx = {
  /** leises Holz-Klicken */
  tap() {
    const t = now();
    tone(t, 820, 0.05, { type: "triangle", gain: 0.12, freqTo: 600 });
    hiss(t, 0.03, { freq: 3000, q: 0.8, gain: 0.05 });
  },
  /** richtig: zwei weiche Glockentöne */
  right() {
    const t = now();
    tone(t, 784, 0.45, { type: "triangle", gain: 0.16 });
    tone(t + 0.11, 1175, 0.6, { type: "triangle", gain: 0.13 });
  },
  /** nicht ganz: freundliches, tiefes „hm-hm“ */
  tryAgain() {
    const t = now();
    tone(t, 330, 0.18, { gain: 0.12 });
    tone(t + 0.16, 294, 0.24, { gain: 0.1 });
  },
  /** Aufgabe geschafft */
  done() {
    const t = now();
    [523, 659, 784, 1047].forEach((f, i) => tone(t + i * 0.09, f, 0.6, { type: "triangle", gain: 0.12 }));
  },
  /** fließendes Wasser in Eimer oder Tränke, mit Blubbern */
  wasser() {
    const t = now();
    const dur = 1.1;
    const w = hiss(t, dur, { freq: 900, q: 1.3, gain: 0.22, attack: 0.06 });
    if (w) for (let s = 0; s < dur; s += 0.05) w.f.frequency.setValueAtTime(rnd(500, 1500), t + s);
    hiss(t, dur, { type: "lowpass", freq: 500, gain: 0.12, attack: 0.08 });
    for (let i = 0; i < 6; i++) tone(t + rnd(0.1, 1), rnd(380, 520), 0.07, { gain: 0.06, freqTo: rnd(800, 1100) });
  },
  /** Stroh / Heu raschelt */
  rascheln(dur = 0.4) {
    const t = now();
    const r = hiss(t, dur, { type: "highpass", freq: 2200, gain: 0.14, attack: 0.01 });
    if (r) for (let s = 0.02; s < dur - 0.04; s += 0.035) r.g.gain.setValueAtTime(rnd(0.03, 0.16), t + s);
  },
  /** Mistgabel: Rascheln, dann dumpfer Plumps in die Schubkarre */
  mist() {
    sfx.rascheln(0.25);
    const t = now() + 0.18;
    tone(t, 120, 0.2, { gain: 0.35, freqTo: 50 });
    hiss(t, 0.15, { type: "lowpass", freq: 400, gain: 0.2 });
  },
  /** Bürstenstrich */
  buerste() {
    const t = now();
    hiss(t, 0.2, { freq: 3200, freqTo: 2400, q: 0.7, gain: 0.16, attack: 0.05 });
    hiss(t + 0.24, 0.2, { freq: 3000, freqTo: 2200, q: 0.7, gain: 0.14, attack: 0.05 });
  },
  /** Hufkratzer schabt, kleiner Stein klickt */
  kratzen() {
    const t = now();
    hiss(t, 0.28, { freq: 1300, freqTo: 2600, q: 4, gain: 0.14, attack: 0.03 });
    tone(t + 0.3, 2600, 0.12, { gain: 0.06 });
  },
  /** etwas Metallisches (Eimer, Stein, Hufeisen) */
  klirr() {
    const t = now();
    tone(t, 2300, 0.18, { gain: 0.07 });
    tone(t, 3450, 0.12, { gain: 0.05 });
  },
  /** Hufschläge auf Kies – das Pferd geht mit */
  hufe() {
    const t = now();
    [0, 0.2, 0.42, 0.62, 0.84, 1.04].forEach((d, i) => {
      hiss(t + d, 0.06, { type: "lowpass", freq: 1400, gain: i % 2 ? 0.16 : 0.2 });
      tone(t + d, 260, 0.06, { gain: 0.12, freqTo: 150 });
    });
  },
  /** Abschnauben: flatterndes Pusten durch die Nüstern */
  schnauben(vol = 1) {
    const a = audio();
    if (!a) return;
    const { c, out } = a;
    const t = c.currentTime;
    const n = hiss(t, 0.8, { type: "lowpass", freq: 900, freqTo: 500, gain: 0.3 * vol, attack: 0.05 });
    if (!n) return;
    const lfo = c.createOscillator();
    lfo.frequency.value = 26;
    const depth = c.createGain();
    depth.gain.value = 0.12 * vol;
    lfo.connect(depth).connect(n.g.gain);
    lfo.start(t);
    lfo.stop(t + 0.85);
    void out;
  },
  /** Heu kauen / Futter in den Trog */
  futter() {
    sfx.rascheln(0.3);
    const t = now() + 0.1;
    [0, 0.12, 0.24].forEach((d) => hiss(t + d, 0.05, { type: "lowpass", freq: 900, gain: 0.1 }));
  },
};

/* ---------- Hintergrund: Vögel am Tag, Grillen am Abend, ab und zu ein Schnauben ---------- */

let ambTimer: number | null = null;

function chirp(vol: number) {
  const t = now();
  const n = Math.floor(rnd(2, 5));
  const base = rnd(2600, 3600);
  for (let i = 0; i < n; i++) tone(t + i * rnd(0.08, 0.13), base, 0.07, { gain: 0.035 * vol, freqTo: base * rnd(1.15, 1.4) });
}

function crickets() {
  const t = now();
  for (let i = 0; i < 4; i++) tone(t + i * 0.06, 4300, 0.035, { gain: 0.018 });
}

export function startAmbience(time: "morgen" | "vormittag" | "mittag" | "nachmittag" | "abend") {
  stopAmbience();
  if (!enabled || typeof window === "undefined") return;
  const tick = () => {
    if (time === "abend") {
      crickets();
      if (Math.random() < 0.08) sfx.schnauben(0.35);
      ambTimer = window.setTimeout(tick, rnd(700, 1600));
    } else {
      chirp(time === "morgen" ? 1.2 : 0.8);
      if (Math.random() < 0.12) sfx.schnauben(0.3);
      ambTimer = window.setTimeout(tick, rnd(2500, 6500));
    }
  };
  ambTimer = window.setTimeout(tick, 1200);
}

export function stopAmbience() {
  if (ambTimer !== null) window.clearTimeout(ambTimer);
  ambTimer = null;
}

export function setSoundEnabled(on: boolean) {
  enabled = on;
  if (!on) stopAmbience();
}
