"use client";

import { useRef, useState } from "react";
import type { Notify } from "../DiaryApp";
import { downloadBackup, readBackup } from "../backup";
import { replaceDiary } from "../store";
import type { DiaryData } from "../types";
import s from "../tagebuch.module.css";

/** Hinweis zur Speicherung + Sicherungsdatei (Gerätewechsel). */
export function BackupPanel({ data, notify, persisted }: { data: DiaryData; notify: Notify; persisted: boolean }) {
  const ref = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState<DiaryData | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const hasData = data.horses.length + data.entries.length + data.goals.length > 0;

  return (
    <section className={`${s.card} ${s.backup}`} aria-labelledby="tb-backup">
      <h2 id="tb-backup" className={s.cardTitle}>
        Dein Tagebuch bleibt bei dir
      </h2>
      <p className={s.small}>
        Alles, was du hier einträgst, wird <strong>nur auf diesem Gerät</strong> gespeichert – niemand sonst kann es lesen, auch wir nicht. Teilt ihr euch ein
        Gerät, sieht allerdings jeder, der hier die App öffnet, dieses Tagebuch.
      </p>
      <p className={s.small}>
        Wenn du die Browserdaten löschst oder das Gerät wechselst, ist das Tagebuch weg. Lade deshalb ab und zu eine <strong>Sicherung</strong> herunter.
        {!persisted && " Tipp fürs iPhone und iPad: Füge die App zum Home-Bildschirm hinzu, dann bleibt das Tagebuch sicher erhalten."}
      </p>
      <div className={s.actions}>
        <button type="button" className={s.btnGhost} disabled={!hasData} onClick={() => downloadBackup(data)}>
          Sicherung herunterladen
        </button>
        <button type="button" className={s.btnText} onClick={() => ref.current?.click()}>
          Sicherung wiederherstellen
        </button>
      </div>
      {err && <p className={s.error}>{err}</p>}
      {pending && (
        <div className={s.confirm}>
          <p>
            Sicherung mit {pending.horses.length} Pferden, {pending.entries.length} Reitstunden und {pending.goals.length} Zielen gefunden.
            {hasData && " Dein jetziges Tagebuch auf diesem Gerät wird dabei ersetzt."}
          </p>
          <div className={s.actions}>
            <button
              type="button"
              className={s.btnPrimarySmall}
              onClick={async () => {
                try {
                  await replaceDiary(pending);
                  setPending(null);
                  notify("Sicherung wiederhergestellt");
                } catch {
                  setErr("Wiederherstellen hat nicht geklappt. Vielleicht ist auf dem Gerät zu wenig Platz.");
                }
              }}
            >
              Wiederherstellen
            </button>
            <button type="button" className={s.btnGhost} onClick={() => setPending(null)}>
              Abbrechen
            </button>
          </div>
        </div>
      )}
      <input
        ref={ref}
        type="file"
        accept="application/json,.json"
        hidden
        onChange={async (e) => {
          const f = e.target.files?.[0];
          e.target.value = "";
          if (!f) return;
          setErr(null);
          const r = await readBackup(f);
          if (r.ok) setPending(r.data);
          else setErr(r.reason);
        }}
      />
    </section>
  );
}
