"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { EVIDENCE_LABEL, fillText, quizAnswer } from "@/content/arena";
import { AID_LABEL, aidLabel, buildTrack, durationFor, forRein, phaseAtTime, phaseStartTimes, phasesFor, sampleAt } from "@/content/arena/geometry";
import type { AidId, AidState, ArenaExercise, ArenaSize, Rein } from "@/content/arena/types";
import { ArenaView, type Layers } from "./ArenaView";
import { RiderTop } from "./RiderTop";
import styles from "./arena.module.css";

type Mode = "ansehen" | "lernen" | "ueben";
const RATES = [0.5, 1, 1.5] as const;
const AIDS: AidId[] = ["blick", "oberkoerper", "sitz", "gewicht", "innenSchenkel", "aussenSchenkel", "innenZuegel", "aussenZuegel"];
const STATE_LABEL: Record<AidState, string> = { aktiv: "aktiv", verwahrend: "verwahrend", nachgebend: "gibt nach", neutral: "neutral", begleitend: "begleitend" };
const BEND_LABEL = { links: "nach links", rechts: "nach rechts", keine: "keine (gerade)", wechsel: "wird umgestellt" } as const;
const GAIT_LABEL = { halt: "Halt", schritt: "Schritt", trab: "Trab", galopp: "Galopp" } as const;
const LAYER_LABEL: Record<keyof Layers, string> = { linie: "Linie", buchstaben: "Buchstaben", richtung: "Richtung", hilfen: "Phasen", erklaerungen: "Notizen" };

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);
  return reduced;
}

/**
 * Die Reitbahn – interaktive Übung. EINE Zeitleiste (t in Sekunden) steuert Pferd, Linie,
 * Phase, Hilfen und Erklärung; alles andere wird daraus berechnet. Dadurch kann nichts
 * auseinanderlaufen, und Anhalten hält alles gleichzeitig an.
 */
export function ArenaPlayer({ variants, initial = 0 }: { variants: ArenaExercise[]; initial?: number }) {
  const reduced = useReducedMotion();
  const [variantIdx, setVariantIdx] = useState(initial);
  const exercise = variants[Math.min(variantIdx, variants.length - 1)];
  const [rein, setRein] = useState<Rein>("links");
  const [size, setSize] = useState<ArenaSize>(exercise.defaultSize);
  const [mode, setMode] = useState<Mode>("ansehen");
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const [rate, setRate] = useState<(typeof RATES)[number]>(1);
  const [layers, setLayers] = useState<Layers>({ linie: true, buchstaben: true, richtung: true, hilfen: true, erklaerungen: true });
  const [selected, setSelected] = useState<AidId | null>(null);
  const [aidsOpen, setAidsOpen] = useState(true);

  const ex = useMemo(() => forRein(exercise, rein), [exercise, rein]);
  const segments = ex.path[size];
  const phases = phasesFor(ex, size);
  const duration = durationFor(ex, size);
  const track = useMemo(() => buildTrack(segments, duration), [segments, duration]);
  const phaseTimes = useMemo(() => phaseStartTimes(track, phases), [phases, track]);
  const annotations = ex.annotations[size];
  const sample = sampleAt(track, t);
  const phase = phaseAtTime(phases, phaseTimes, t);
  const phaseIdx = phases.indexOf(phase);
  const hand = phase.hand ?? rein;
  const ended = t >= track.totalTime - 1e-6;

  /* ---- gemeinsame Zeitleiste ---- */
  const tRef = useRef(t);
  tRef.current = t;
  const modeRef = useRef(mode);
  modeRef.current = mode;

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000) * rate;
      last = now;
      const from = tRef.current;
      let to = Math.min(track.totalTime, from + dt);
      let stop = to >= track.totalTime;
      if (modeRef.current === "lernen") {
        // Im Lern-Modus an jedem Phasenanfang anhalten
        const i = phaseTimes.findIndex((pt, k) => k > 0 && phases[k].pause && pt > from + 1e-6 && pt <= to);
        if (i > 0) {
          to = phaseTimes[i];
          stop = true;
        }
      }
      tRef.current = to;
      setT(to);
      if (stop) setPlaying(false);
      else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, rate, track, phaseTimes, phases]);

  // Hand oder Bahn gewechselt: an derselben Phase weitermachen (gut zum Vergleichen)
  const pendingPhase = useRef<number | null>(null);
  const switchTo = useCallback(
    (fn: () => void) => {
      setPlaying(false);
      pendingPhase.current = phaseIdx;
      fn();
    },
    [phaseIdx],
  );
  useEffect(() => {
    const i = pendingPhase.current;
    if (i == null) return;
    pendingPhase.current = null;
    setT(phaseTimes[Math.min(i, phaseTimes.length - 1)] + (i === 0 ? 0 : 0.001));
  }, [phaseTimes]);

  const toggle = () => {
    if (ended) setT(0);
    setPlaying((p) => !p);
  };
  const restart = () => {
    setPlaying(false);
    setT(0);
  };
  const stepPhase = (d: 1 | -1) => {
    setPlaying(false);
    const cur = phaseIdx;
    // Zurück: an den Anfang der laufenden Phase, wenn wir schon mitten drin sind
    const target = d === -1 && t - phaseTimes[cur] > 0.4 ? cur : Math.min(phases.length - 1, Math.max(0, cur + d));
    setT(phaseTimes[target] + (target === 0 ? 0 : 0.001));
  };
  const goPhase = (i: number) => {
    setPlaying(false);
    setT(phaseTimes[i] + (i === 0 ? 0 : 0.001));
  };
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === " " || e.key === "k") {
      e.preventDefault();
      toggle();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      stepPhase(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      stepPhase(-1);
    }
  };

  const states = useMemo(() => {
    const out: Partial<Record<AidId, AidState>> = {};
    for (const a of AIDS) {
      const ins = phase.aids[a];
      if (ins) out[a] = ins.state;
    }
    return out;
  }, [phase]);

  const handLabel = rein === "links" ? "linken Hand" : "rechten Hand";
  const arenaLabel = `${ex.titleDe}${exercise.variantLabel ? " " + exercise.variantLabel : ""}, Start auf der ${handLabel}, Bahn ${size.replace("x", " × ")} Meter. Phase ${phaseIdx + 1} von ${phases.length}: ${phase.title}.`;
  const sel = selected ? phase.aids[selected] : undefined;

  return (
    <section className={styles.player} aria-label="Interaktive Reitbahn">
      {/* Auswahl: Hand, Bahn, Modus */}
      <div className={styles.toolbar}>
        {variants.length > 1 && (
          <div className={styles.seg} role="group" aria-label="Variante">
            {variants.map((v, i) => (
              <button key={v.id} type="button" aria-pressed={variantIdx === i} className={variantIdx === i ? styles.segOn : ""} onClick={() => switchTo(() => setVariantIdx(i))}>
                {v.variantLabel ?? v.title}
              </button>
            ))}
          </div>
        )}
        <div className={styles.seg} role="group" aria-label="Starthand">
          {(["links", "rechts"] as const).map((r) => (
            <button key={r} type="button" aria-pressed={rein === r} className={rein === r ? styles.segOn : ""} onClick={() => switchTo(() => setRein(r))} disabled={!exercise.hasMirror && r === "rechts"}>
              {r === "links" ? "Start links" : "Start rechts"}
            </button>
          ))}
        </div>
        <div className={styles.seg} role="group" aria-label="Bahngröße">
          {exercise.arenaSizes.map((s) => (
            <button key={s} type="button" aria-pressed={size === s} className={size === s ? styles.segOn : ""} onClick={() => switchTo(() => setSize(s))}>
              {s.replace("x", " × ")}
            </button>
          ))}
        </div>
        <div className={styles.seg} role="group" aria-label="Lernmodus">
          {(
            [
              ["ansehen", "Ansehen"],
              ["lernen", "Lernen"],
              ["ueben", "Üben"],
            ] as const
          ).map(([m, l]) => (
            <button
              key={m}
              type="button"
              aria-pressed={mode === m}
              className={mode === m ? styles.segOn : ""}
              onClick={() => {
                setMode(m);
                setPlaying(false);
              }}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.stage}>
        <div className={styles.arenaCol}>
          {/* Bahn */}
          <div className={styles.arenaBox} tabIndex={0} onKeyDown={onKey} aria-describedby="arena-keys">
            <ArenaView
              size={size}
              segments={segments}
              track={track}
              phases={phases}
              phaseTimes={phaseTimes}
              annotations={annotations}
              layers={layers}
              sample={sample}
              label={arenaLabel}
            />
            <p id="arena-keys" className="visually-hidden">
              Leertaste: Abspielen oder Anhalten. Pfeiltasten: vorige oder nächste Phase.
            </p>
          </div>
          <p className={styles.symbolNote}>Pferd als Symbol: zeigt Ort und Richtung, nicht die Biegung.</p>

          {/* Zustand */}
          <dl className={styles.status} aria-live="polite">
            <div>
              <dt>Hand</dt>
              <dd>{hand}</dd>
            </div>
            <div>
              <dt>Biegung</dt>
              <dd>{phase.bend === "wechsel" && phase.nextBend ? `→ ${phase.nextBend}` : BEND_LABEL[phase.bend]}</dd>
            </div>
            <div>
              <dt>Gangart</dt>
              <dd>{GAIT_LABEL[sample.gait]}</dd>
            </div>
            <div>
              <dt>Phase</dt>
              <dd>
                {phaseIdx + 1}/{phases.length}
              </dd>
            </div>
          </dl>

          {/* Steuerung */}
          <div className={styles.controls}>
            <button type="button" className={styles.iconBtn} onClick={restart} aria-label="Von vorn">
              <svg viewBox="0 0 24 24" aria-hidden>
                <path d="M4 12a8 8 0 1 0 2.5-5.8M4 4v4h4" />
              </svg>
            </button>
            <button type="button" className={styles.iconBtn} onClick={() => stepPhase(-1)} aria-label="Vorige Phase">
              <svg viewBox="0 0 24 24" aria-hidden>
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
            <button type="button" className={styles.playBtn} onClick={toggle} aria-label={playing ? "Anhalten" : ended ? "Noch einmal abspielen" : "Abspielen"}>
              {playing ? (
                <svg viewBox="0 0 24 24" aria-hidden>
                  <path d="M8 5v14M16 5v14" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden>
                  <path d="M7 5l12 7-12 7z" className={styles.fillIcon} />
                </svg>
              )}
            </button>
            <button type="button" className={styles.iconBtn} onClick={() => stepPhase(1)} aria-label="Nächste Phase">
              <svg viewBox="0 0 24 24" aria-hidden>
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
            <div className={styles.rates} role="group" aria-label="Geschwindigkeit">
              {RATES.map((r) => (
                <button key={r} type="button" aria-pressed={rate === r} className={rate === r ? styles.rateOn : ""} onClick={() => setRate(r)}>
                  {String(r).replace(".", ",")}×
                </button>
              ))}
            </div>
          </div>
          <div className={styles.timeline}>
            <input
              type="range"
              min={0}
              max={track.totalTime}
              step={0.05}
              value={t}
              onChange={(e) => {
                setPlaying(false);
                setT(Number(e.target.value));
              }}
              aria-label="Zeitleiste"
              aria-valuetext={`Phase ${phaseIdx + 1}: ${phase.title}`}
              className={styles.range}
            />
            <div className={styles.ticks} aria-hidden>
              {phaseTimes.map((pt, i) => (
                <span key={i} style={{ left: `${(pt / track.totalTime) * 100}%` }} className={i <= phaseIdx ? styles.tickOn : ""} />
              ))}
            </div>
          </div>

          {/* Ebenen */}
          <fieldset className={styles.layers}>
            <legend>Anzeigen</legend>
            {(Object.keys(layers) as (keyof Layers)[]).map((k) => (
              <label key={k} className={styles.switch}>
                <input type="checkbox" checked={layers[k]} onChange={(e) => setLayers((l) => ({ ...l, [k]: e.target.checked }))} />
                <span>{LAYER_LABEL[k]}</span>
              </label>
            ))}
          </fieldset>
        </div>

        <div className={styles.sideCol}>
          {mode === "ueben" ? (
            <Practice key={exercise.id} exercise={ex} rein={rein} size={size} />
          ) : (
            <>
              {/* Phase und Erklärung */}
              <article className={styles.phaseCard} aria-live="polite">
                <p className="eyebrow">
                  Phase {phaseIdx + 1} · {phaseKindLabel(phase.kind)}
                </p>
                <h2 className={styles.phaseTitle}>{phase.title}</h2>
                <p className={styles.phaseSummary}>{phase.summary}</p>
                {layers.erklaerungen &&
                  phase.explanations.map((x, i) => (
                    <p key={i} className={styles.explain}>
                      <span className={`${styles.evidence} ${styles["ev_" + x.evidence]}`}>{EVIDENCE_LABEL[x.evidence]}</span>
                      {x.text}
                    </p>
                  ))}
                {mode === "lernen" && !playing && !ended && (
                  <button type="button" className={styles.nextBtn} onClick={() => setPlaying(true)}>
                    {t === 0 ? "Los geht’s" : "Weiter"}
                  </button>
                )}
              </article>

              {/* Hilfen */}
              <section className={styles.aidsCard} aria-label="Hilfen in dieser Phase">
                <button type="button" className={styles.aidsHead} aria-expanded={aidsOpen} onClick={() => setAidsOpen((o) => !o)}>
                  <span className="eyebrow">Hilfen in dieser Phase</span>
                  <svg viewBox="0 0 24 24" aria-hidden className={aidsOpen ? styles.chevUp : ""}>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {aidsOpen && (
                  <div className={styles.aidsBody}>
                    <div className={styles.riderWrap}>
                      <RiderTop bend={phase.bend} rein={hand} nextBend={phase.nextBend} states={states} highlighted={phase.highlightedAids} selected={selected} />
                      {phase.bend === "keine" && <p className={styles.straightNote}>Gerade Linie: keine Biegung. Die Seiten heißen hier links und rechts.</p>}
                      {phase.bend === "wechsel" && <p className={styles.straightNote}>Umstellen: Die Zeichnung zeigt schon die neue Seite.</p>}
                    </div>
                    <ul className={styles.aidList}>
                      {AIDS.filter((a) => phase.aids[a]).map((a) => {
                        const ins = phase.aids[a]!;
                        const on = selected === a;
                        return (
                          <li key={a}>
                            <button type="button" aria-pressed={on} className={`${styles.aidBtn} ${on ? styles.aidOn : ""} ${phase.highlightedAids.includes(a) ? styles.aidKey : ""}`} onClick={() => setSelected(on ? null : a)}>
                              <span className={styles.aidName}>{aidLabel(a, phase.bend, hand, phase.nextBend)}</span>
                              <span className={styles.aidState}>{STATE_LABEL[ins.state]}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                    {selected && sel && (
                      <div className={styles.aidDetail}>
                        <h3>{aidLabel(selected, phase.bend, hand, phase.nextBend)}</h3>
                        <dl>
                          <dt>Wozu</dt>
                          <dd>{ex.aidPurpose[selected] ?? AID_LABEL[selected]}</dd>
                          <dt>Jetzt</dt>
                          <dd>{sel.text}</dd>
                          <dt>Timing</dt>
                          <dd>Hängt von der Phase und von der Antwort des Pferdes ab: einsetzen, Reaktion abwarten, wieder leiser werden.</dd>
                        </dl>
                        <p className={styles.important}>Wie eine Hilfe wirkt, hängt von Timing, Stärke, Zusammenspiel und dem Ausbildungsstand des Pferdes ab.</p>
                      </div>
                    )}
                  </div>
                )}
              </section>
            </>
          )}

          {/* Schritt für Schritt (auch ohne Animation nutzbar) */}
          <section className={styles.steps} aria-label="Schritt für Schritt">
            <p className="eyebrow">{reduced ? "Schritt für Schritt (Animation reduziert)" : "Schritt für Schritt"}</p>
            <ol>
              {phases.map((p, i) => (
                <li key={p.id}>
                  <button type="button" aria-current={i === phaseIdx ? "step" : undefined} className={i === phaseIdx ? styles.stepOn : ""} onClick={() => goPhase(i)}>
                    <span className={styles.stepNum}>{i + 1}</span>
                    <span>
                      <span className={styles.stepTitle}>{p.title}</span>
                      <span className={styles.stepMeta}>
                        Biegung {p.bend === "wechsel" && p.nextBend ? `wird nach ${p.nextBend} umgestellt` : BEND_LABEL[p.bend]}
                        {p.hand && p.hand !== rein ? " · neue Hand" : ""}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </section>
  );
}

function phaseKindLabel(k: string) {
  return { vorbereiten: "Vorbereiten", einleiten: "Einleiten", ausfuehren: "Ausführen", halten: "Halten", abschliessen: "Abschließen" }[k] ?? k;
}

/* ---------- Üben: regelbasierte Fragen ---------- */

function Practice({ exercise, rein, size }: { exercise: ArenaExercise; rein: Rein; size: ArenaSize }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const qs = exercise.quiz;
  const done = i >= qs.length;

  useEffect(() => {
    setI(0);
    setPicked(null);
    setScore(0);
  }, [rein, size]);

  if (done)
    return (
      <article className={styles.phaseCard}>
        <p className="eyebrow">Üben · {rein === "links" ? "linke" : "rechte"} Hand</p>
        <h2 className={styles.phaseTitle}>
          {score} von {qs.length} richtig
        </h2>
        <p className={styles.phaseSummary}>Wechsle die Hand und probiere es noch einmal – die Antworten ändern sich mit.</p>
        <button
          type="button"
          className={styles.nextBtn}
          onClick={() => {
            setI(0);
            setPicked(null);
            setScore(0);
          }}
        >
          Noch einmal
        </button>
      </article>
    );

  const q = qs[i];
  const right = quizAnswer(q, rein, size);
  return (
    <article className={styles.phaseCard}>
      <p className="eyebrow">
        Frage {i + 1} von {qs.length}
      </p>
      <h2 className={styles.quizQ}>{fillText(q.prompt, rein)}</h2>
      <div className={styles.quizOpts} role="group" aria-label="Antworten">
        {q.options.map((o) => {
          const state = picked == null ? "" : o.id === right ? styles.optRight : o.id === picked ? styles.optWrong : styles.optDim;
          return (
            <button
              key={o.id}
              type="button"
              disabled={picked != null}
              className={`${styles.opt} ${state}`}
              onClick={() => {
                setPicked(o.id);
                if (o.id === right) setScore((s) => s + 1);
              }}
            >
              {fillText(o.text, rein)}
              {picked != null && o.id === right && <span className={styles.optMark}> · richtig</span>}
              {picked === o.id && o.id !== right && <span className={styles.optMark}> · nicht ganz</span>}
            </button>
          );
        })}
      </div>
      {picked != null && (
        <div aria-live="polite">
          <p className={styles.explain}>{fillText(q.explanation, rein)}</p>
          <button
            type="button"
            className={styles.nextBtn}
            onClick={() => {
              setI(i + 1);
              setPicked(null);
            }}
          >
            {i + 1 < qs.length ? "Nächste Frage" : "Ergebnis"}
          </button>
        </div>
      )}
    </article>
  );
}
