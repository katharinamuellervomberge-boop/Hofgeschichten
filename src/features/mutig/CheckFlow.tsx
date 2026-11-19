"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "@/i18n/Link";
import { CHECK, HELP, TYPEN, WEGE, ladderTemplate, type CheckAnswers } from "@/content/mutig/katalog";
import { Barometer } from "./Barometer";
import { fearWord, stateFromCheck, typesFromAnswers, warnFromAnswers, wegFromAnswers } from "./logic";
import { loadCheck, saveCheck, updateMutig } from "./store";
import styles from "./mutig.module.css";

type Props = {
  /** free: kostenloser Angst-Check · onboarding: Start des gekauften Programms */
  mode: "free" | "onboarding";
  owned: boolean;
  checkoutUrl: string | null;
  price: string | null;
};

/**
 * Angst-Check: 11 Fragen, Ergebnis mit Weg, Mut-Typ, Startwert und den ersten Stufen.
 * Läuft ohne Konto; Antworten bleiben auf dem Gerät (localStorage bzw. IndexedDB nach dem Kauf).
 */
export function CheckFlow({ mode, owned, checkoutUrl, price }: Props) {
  const router = useRouter();
  const [a, setA] = useState<CheckAnswers>({});
  const [i, setI] = useState(-1);
  const [phase, setPhase] = useState<"intro" | "q" | "warn" | "result">("intro");
  const [saved, setSaved] = useState<CheckAnswers | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => setSaved(loadCheck()), []);

  // Frage 10 (Freigabe) nur nach Sturz oder Geburt
  const questions = useMemo(() => {
    const q1 = a.q1;
    return CHECK.filter((q) => q.id !== "q10" || q1 === 0 || q1 === 2);
  }, [a.q1]);

  const q = phase === "q" ? questions[i] : null;

  function next() {
    if (i + 1 < questions.length) return setI(i + 1);
    saveCheck(a);
    setPhase(warnFromAnswers(a) ? "warn" : "result");
  }

  function takeSaved() {
    if (!saved) return;
    setA(saved);
    setPhase(warnFromAnswers(saved) ? "warn" : "result");
  }

  async function start() {
    setBusy(true);
    try {
      await updateMutig((s) => stateFromCheck(a, s));
      router.push("/mutig-reiten");
    } finally {
      setBusy(false);
    }
  }

  if (phase === "intro") {
    return (
      <div className={styles.narrow}>
        <div className={styles.hero}>
          <p className={styles.kicker}>{mode === "onboarding" ? "Dein Start" : "Kostenlos · 3 Minuten"}</p>
          <h1 className={styles.h1}>{mode === "onboarding" ? "Schön, dass du da bist." : "Der Angst-Check"}</h1>
          <p className={styles.lead}>
            {mode === "onboarding"
              ? "Bevor es losgeht, beantwortest du ein paar Fragen. Daraus entstehen dein Weg, dein Mut-Typ und der Vorschlag für deine Mut-Leiter."
              : "Finde heraus, welcher Mut-Typ du bist, wo du heute stehst und wie deine ersten Schritte aussehen könnten."}
          </p>
          <div className={styles.row}>
            <button className={styles.btn} type="button" onClick={() => { setA({}); setI(0); setPhase("q"); }}>
              {saved && mode === "onboarding" ? "Check neu machen" : "Check starten"}
            </button>
            {saved && (
              <button className={styles.btnGhost} type="button" onClick={takeSaved}>
                {mode === "onboarding" ? "Mein Ergebnis übernehmen" : "Mein letztes Ergebnis"}
              </button>
            )}
          </div>
        </div>
        <p className={styles.xs}>
          Deine Antworten bleiben auf diesem Gerät. Der Check ist eine Selbsteinschätzung und keine Diagnose; die Mut-Typen sind
          Reflexionsprofile, kein wissenschaftlicher Test.
        </p>
      </div>
    );
  }

  if (q) {
    const v = a[q.id];
    const canGo = q.type === "multi" || q.type === "text" || v !== undefined;
    return (
      <div className={styles.narrow}>
        <div className={styles.progressTop}>
          <button className={styles.btnLink} type="button" onClick={() => (i === 0 ? setPhase("intro") : setI(i - 1))}>
            Zurück
          </button>
          <span>
            Frage {i + 1} von {questions.length}
          </span>
        </div>
        <div className={styles.card}>
          <h1 className={styles.h2}>{q.t}</h1>
          {q.hint && <p className={styles.muted}>{q.hint}</p>}
          {q.type === "scale" && <Barometer value={typeof v === "number" ? v : null} onChange={(n) => setA({ ...a, [q.id]: n })} label={q.t} />}
          {(q.type === "one" || q.type === "multi") && (
            <div className={styles.choices}>
              {q.o.map((o, k) => {
                const on = q.type === "one" ? v === k : Array.isArray(v) && v.includes(k);
                return (
                  <button
                    key={o}
                    type="button"
                    className={styles.choice}
                    aria-pressed={on}
                    onClick={() => {
                      if (q.type === "one") return setA({ ...a, [q.id]: k });
                      const cur = Array.isArray(v) ? v : [];
                      setA({ ...a, [q.id]: on ? cur.filter((x) => x !== k) : [...cur, k] });
                    }}
                  >
                    {o}
                  </button>
                );
              })}
            </div>
          )}
          {q.type === "text" && (
            <input
              className={styles.input}
              value={typeof v === "string" ? v : ""}
              placeholder={q.placeholder}
              maxLength={140}
              onChange={(e) => setA({ ...a, [q.id]: e.target.value })}
              aria-label={q.t}
            />
          )}
          <button className={styles.btn} type="button" disabled={!canGo} onClick={next}>
            {i + 1 < questions.length ? "Weiter" : "Ergebnis ansehen"}
          </button>
        </div>
      </div>
    );
  }

  if (phase === "warn") {
    return (
      <div className={styles.narrow}>
        <div className={styles.card}>
          <h1 className={styles.h2}>Danke, dass du das so ehrlich angegeben hast.</h1>
          <p className={styles.p}>
            Was du beschreibst, klingt nach mehr als Angst beim Reiten. Dafür gibt es gute Hilfe, und du musst das nicht allein tragen.
          </p>
          <ul className={styles.steps}>
            <li>Sprich mit deiner Hausärztin oder deinem Hausarzt.</li>
            <li>
              Einen Termin bei einer Psychotherapeutin vermittelt der Terminservice unter <strong>{HELP.terminservice}</strong>.
            </li>
            <li>
              Wenn es dir gerade schlecht geht: Die TelefonSeelsorge ist rund um die Uhr erreichbar, kostenlos und anonym, unter{" "}
              <strong>{HELP.seelsorge}</strong> oder <strong>{HELP.seelsorge2}</strong>.
            </li>
          </ul>
          <p className={styles.muted}>Mutig reiten kannst du begleitend nutzen. Es ersetzt keine ärztliche oder psychotherapeutische Hilfe.</p>
          <button className={styles.btn} type="button" onClick={() => setPhase("result")}>
            Zu meinem Ergebnis
          </button>
        </div>
      </div>
    );
  }

  // Ergebnis
  const weg = wegFromAnswers(a);
  const [t1, t2] = typesFromAnswers(a);
  const typ = TYPEN[t1];
  const ziel = typeof a.q12 === "string" ? a.q12 : "";
  const steps = ladderTemplate(weg, ziel);
  const startValue = typeof a.q4 === "number" ? a.q4 : null;
  return (
    <div className={styles.narrow}>
      <div className={styles.hero}>
        <p className={styles.kicker}>Dein Mut-Typ</p>
        <h1 className={styles.h1}>{typ.name}</h1>
        <p className={styles.lead}>{typ.erkennen}</p>
        <p className={styles.p}>
          <strong>Deine Stärke:</strong> {typ.staerke}
        </p>
        <p className={styles.p}>
          <strong>Dein erstes Werkzeug:</strong> {typ.werkzeug}
        </p>
        <p className={styles.muted}>Dein zweiter Typ: {TYPEN[t2].name}</p>
      </div>

      <div className={styles.card}>
        <p className={styles.kicker}>Dein Weg</p>
        <h2 className={styles.h2}>{WEGE[weg].titel}</h2>
        <p className={styles.muted}>{WEGE[weg].text}</p>
        {startValue !== null && (
          <p className={styles.p}>
            Startwert auf dem Mut-Barometer: <strong>{startValue} von 10</strong> – {fearWord(startValue)}
          </p>
        )}
        {ziel && (
          <p className={styles.p}>
            Dein Ziel: <strong>{ziel}</strong>
          </p>
        )}
      </div>

      <div className={styles.card}>
        <h2 className={styles.h2}>Die ersten Stufen deiner Mut-Leiter</h2>
        <ol className={styles.steps}>
          {steps.slice(0, 3).map((s) => (
            <li key={s.t}>{s.t}</li>
          ))}
        </ol>
        {mode === "free" && <p className={styles.muted}>Deine Leiter hat 10 Stufen – bis zu deinem eigenen Ziel. Die ganze Leiter gibt es im Programm.</p>}
      </div>

      {mode === "onboarding" ? (
        <div className={styles.card}>
          <p className={styles.p}>Du kannst alle Stufen später umbenennen, teilen und an dich anpassen.</p>
          <button className={styles.btn} type="button" onClick={start} disabled={busy}>
            Programm starten
          </button>
        </div>
      ) : owned ? (
        <Link className={styles.btn} href="/mutig-reiten">
          Zu meinem Programm
        </Link>
      ) : (
        <div className={styles.cardForest}>
          <h2 className={styles.h2}>Mutig reiten – 6 Wochen, in kleinen Schritten</h2>
          <p className={styles.muted}>30 kurze Einheiten mit Audio, deine ganze Mut-Leiter, das Mut-Barometer und 8 Werkzeuge für Kopf und Körper.</p>
          <div className={styles.row}>
            {checkoutUrl && (
              <a className={styles.btn} href={checkoutUrl}>
                Programm holen{price ? ` · ${price}` : ""}
              </a>
            )}
            <Link className={styles.btnGhost} href="/mutig-reiten">
              Mehr erfahren
            </Link>
          </div>
        </div>
      )}
      <p className={styles.xs}>Selbsteinschätzung, keine Diagnose. Die Mut-Typen sind Reflexionsprofile, kein validierter Test.</p>
    </div>
  );
}
