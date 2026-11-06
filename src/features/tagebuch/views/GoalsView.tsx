"use client";

import { useCallback, useState } from "react";
import type { Notify } from "../DiaryApp";
import { deleteGoal, saveGoal, setGoalStatus } from "../store";
import { formatDay } from "../stats";
import { today } from "../sanitize";
import { GOAL_STATUS, GOAL_SUGGESTIONS, type DiaryData, type Goal, type GoalStatus } from "../types";
import { Celebration, Chips, DeleteButton, EmptyState, Field, SubHeader, TextArea } from "../ui";
import s from "../tagebuch.module.css";

const isoDay = (iso: string) => today(new Date(iso));

export function GoalsView({ data, notify }: { data: DiaryData; notify: Notify }) {
  const [editing, setEditing] = useState<Goal | "new" | null>(null);
  const [preset, setPreset] = useState("");
  const [party, setParty] = useState<string | null>(null);
  const closeParty = useCallback(() => setParty(null), []);

  const taken = new Set(data.goals.map((g) => g.title.toLowerCase()));
  const suggestions = GOAL_SUGGESTIONS.filter((t) => !taken.has(t.toLowerCase()));
  const byStatus = (st: GoalStatus) => data.goals.filter((g) => g.status === st);

  async function changeStatus(g: Goal, st: GoalStatus) {
    try {
      await setGoalStatus(g.id, st);
      if (st === "geschafft") setParty(g.title);
    } catch {
      notify("Das hat nicht geklappt.");
    }
  }

  return (
    <div className={s.stack}>
      <SubHeader
        title="Meine Ziele"
        intro="Deine eigenen Ziele, in deinem Tempo. Hier gibt es keine Rangliste."
        action={
          !editing ? (
            <button type="button" className={s.btnSmall} onClick={() => { setPreset(""); setEditing("new"); }}>
              + Ziel
            </button>
          ) : undefined
        }
      />

      {editing && (
        <GoalForm
          key={editing === "new" ? `new-${preset}` : editing.id}
          data={data}
          goal={editing === "new" ? undefined : editing}
          preset={preset}
          onDone={(msg, achieved) => {
            setEditing(null);
            if (msg) notify(msg);
            if (achieved) setParty(achieved);
          }}
        />
      )}

      {!editing && suggestions.length > 0 && (
        <section className={s.section}>
          <h2 className={s.h3}>Ideen für dein nächstes Ziel</h2>
          <div className={s.chips}>
            {suggestions.map((t) => (
              <button key={t} type="button" className={s.chip} onClick={() => { setPreset(t); setEditing("new"); }}>
                + {t}
              </button>
            ))}
          </div>
        </section>
      )}

      {data.goals.length === 0 && !editing ? (
        <EmptyState art="star" title="Was möchtest du als Nächstes lernen?" text="Such dir oben eine Idee aus oder schreib dein ganz eigenes Ziel auf." />
      ) : (
        (["uebe", "neu", "geschafft"] as const).map((st) => {
          const list = byStatus(st);
          if (list.length === 0) return null;
          const label = GOAL_STATUS.find((x) => x.id === st)!.label;
          return (
            <section key={st} className={s.section}>
              <h2 className={s.monthHead}>
                {label} <span className={s.count}>{list.length}</span>
              </h2>
              <ul className={s.list}>
                {list.map((g) => {
                  const horse = data.horses.find((h) => h.id === g.horseId);
                  return (
                    <li key={g.id} className={`${s.goal} ${g.status === "geschafft" ? s.goalDone : ""}`}>
                      <div className={s.goalMain}>
                        <p className={s.goalTitle}>
                          {g.status === "geschafft" && <span aria-hidden>✓ </span>}
                          {g.title}
                        </p>
                        {g.description && <p className={s.goalText}>{g.description}</p>}
                        <p className={s.goalMeta}>
                          {[horse ? `mit ${horse.name}` : undefined, `seit ${formatDay(isoDay(g.createdAt))}`, g.achievedAt ? `geschafft am ${formatDay(isoDay(g.achievedAt))}` : undefined]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      </div>
                      <div className={s.goalActions}>
                        {g.status === "neu" && (
                          <button type="button" className={s.btnGhost} onClick={() => changeStatus(g, "uebe")}>
                            Ich übe
                          </button>
                        )}
                        {g.status !== "geschafft" ? (
                          <button type="button" className={s.btnPrimarySmall} onClick={() => changeStatus(g, "geschafft")}>
                            Geschafft!
                          </button>
                        ) : (
                          <button type="button" className={s.btnText} onClick={() => changeStatus(g, "uebe")}>
                            Doch noch üben
                          </button>
                        )}
                        <button type="button" className={s.btnText} onClick={() => setEditing(g)}>
                          Bearbeiten
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })
      )}

      {party && <Celebration title={party} onClose={closeParty} />}
    </div>
  );
}

function GoalForm({ data, goal, preset, onDone }: { data: DiaryData; goal?: Goal; preset: string; onDone: (msg?: string, achieved?: string) => void }) {
  const [title, setTitle] = useState(goal?.title ?? preset);
  const [description, setDescription] = useState(goal?.description ?? "");
  const [horseId, setHorseId] = useState(goal?.horseId ?? "");
  const [status, setStatus] = useState<GoalStatus | "">(goal?.status ?? "neu");
  const [err, setErr] = useState<string | undefined>();
  const [busy, setBusy] = useState(false);

  return (
    <div className={s.stack}>
      <form
        className={`${s.card} ${s.form}`}
        noValidate
        onSubmit={async (e) => {
          e.preventDefault();
          if (!title.trim()) return setErr("Wie heißt dein Ziel?");
          setBusy(true);
          const st = status || "neu";
          try {
            await saveGoal({ id: goal?.id, title, description, horseId: horseId || undefined, status: st });
            const newlyDone = st === "geschafft" && goal?.status !== "geschafft";
            onDone(goal ? "Ziel gespeichert" : newlyDone ? undefined : "Neues Ziel angelegt", newlyDone ? title.trim() : undefined);
          } catch {
            setBusy(false);
            setErr("Speichern hat nicht geklappt. Bitte nochmal versuchen.");
          }
        }}
      >
        <h2 className={s.cardTitle}>{goal ? "Ziel bearbeiten" : "Neues Ziel"}</h2>
        <Field label="Titel" required value={title} onChange={(v) => { setTitle(v); setErr(undefined); }} error={err} placeholder="z. B. Sicher angaloppieren" />
        <TextArea label="Beschreibung (freiwillig)" value={description} onChange={setDescription} max={600} rows={2} />
        {data.horses.length > 0 && (
          <Chips label="Mit welchem Pferd? (freiwillig)" value={horseId} onChange={setHorseId} options={data.horses.map((h) => ({ value: h.id, label: h.name }))} />
        )}
        <Chips label="Status" value={status} onChange={setStatus} options={GOAL_STATUS.map((x) => ({ value: x.id, label: x.label }))} />
        <div className={s.actions}>
          <button type="submit" className={s.btnPrimary} disabled={busy}>
            {busy ? "Speichert …" : "Speichern"}
          </button>
          <button type="button" className={s.btnGhost} onClick={() => onDone()}>
            Abbrechen
          </button>
        </div>
      </form>
      {goal && (
        <DeleteButton
          label="Ziel löschen"
          question={`„${goal.title}“ wirklich löschen?`}
          onConfirm={async () => {
            try {
              await deleteGoal(goal.id);
              onDone("Ziel gelöscht");
            } catch {
              setErr("Löschen hat nicht geklappt.");
            }
          }}
        />
      )}
    </div>
  );
}
