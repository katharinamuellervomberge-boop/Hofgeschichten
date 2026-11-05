"use client";

import { useState, type ReactNode } from "react";
import { ItemIcon, isItemName } from "@/components/illustrations/ItemIcons";
import { SpeakButton } from "@/components/ui/SpeakButton";
import { ACTIVITIES } from "@/content/hoftag/activities";
import { GROOM_HINTS, GROOM_ORDER, GROOM_TOOLS, GROOM_ZONES, ZONE_LABEL, type GroomToolId, type GroomZone } from "@/content/hoftag/groom";
import { getPlace, toPlace } from "@/content/hoftag/places";
import type {
  ActivityTask,
  CheckTask,
  ChoiceTask,
  CollectTask,
  DayState,
  FeedTask,
  FillTask,
  GotoTask,
  GroomTask,
  HorseId,
  Option,
  PlaceId,
  TaskDef,
  TimeOfDay,
} from "@/content/hoftag/types";
import { fillText } from "./engine";
import { HofMap } from "./HofMap";
import { Btn, Feedback, Speech, StatGrid } from "./parts";
import { CollectArt, Scene } from "./Scene";
import { sfx } from "./sound";
import styles from "./hoftag.module.css";

type Props = {
  task: TaskDef;
  day: DayState;
  time: TimeOfDay;
  onDone: () => void;
};

type ViewProps<T extends TaskDef> = {
  task: T;
  day: DayState;
  time: TimeOfDay;
  t: (s: string) => string;
  finish: () => void;
};

/** Eine Aufgabe: Einleitung, Interaktion, Lernmoment, Weiter */
export function TaskView({ task, day, time, onDone }: Props) {
  const [finished, setFinished] = useState(false);
  const t = (s: string) => fillText(s, day.horse);
  const finish = () => {
    setFinished(true);
    window.setTimeout(() => sfx.done(), 380);
  };
  const place = getPlace(task.place);
  const doneText = "done" in task ? task.done : null;

  let body: ReactNode = null;
  const common = { day, time, t, finish };
  switch (task.kind) {
    case "goto":
      body = <GotoView task={task} {...common} />;
      break;
    case "choice":
      body = <ChoiceView task={task} {...common} />;
      break;
    case "check":
      body = <CheckView task={task} {...common} />;
      break;
    case "collect":
      body = <CollectView task={task} {...common} />;
      break;
    case "fill":
      body = <FillView task={task} {...common} />;
      break;
    case "feed":
      body = <FeedView task={task} {...common} />;
      break;
    case "groom":
      body = <GroomView task={task} {...common} />;
      break;
    case "activity":
      body = <ActivityView task={task} {...common} />;
      break;
  }

  const intro = task.kind === "activity" ? ACTIVITIES[day.activity].intro : task.intro;

  return (
    <section className={styles.task} aria-labelledby="task-title">
      <div className={styles.taskHead}>
        <div>
          <p className={styles.eyebrow}>{place.name}</p>
          <h2 id="task-title" className={styles.taskTitle}>
            {t(task.title)}
          </h2>
        </div>
      </div>

      {intro && (
        <Speech who={task.speaker}>
          <p>{t(intro)}</p>
          <SpeakButton text={t(intro)} size="sm" label="Vorlesen" className={styles.speak} />
        </Speech>
      )}

      {body}

      {finished && (
        <div className={styles.done} role="status">
          {doneText && <p className={styles.doneText}>{t(doneText)}</p>}
          {task.learn && (
            <p className={styles.learn}>
              <span className={styles.learnTag}>Pferdewissen</span>
              {t(task.learn)}
            </p>
          )}
          <Btn
            onClick={() => {
              sfx.tap();
              onDone();
            }}
            variant="gold"
          >
            Weiter
          </Btn>
        </div>
      )}
    </section>
  );
}

/* ---------- Hofkarte ---------- */

function GotoView({ task, time, t, finish }: ViewProps<GotoTask>) {
  const [wrong, setWrong] = useState<PlaceId | null>(null);
  const [ok, setOk] = useState(false);
  const pick = (id: PlaceId) => {
    if (ok) return;
    if (id === task.target) {
      setOk(true);
      sfx.hufe();
      setWrong(null);
      finish();
    } else {
      setWrong(id);
      sfx.tryAgain();
    }
  };
  const target = getPlace(task.target);
  return (
    <div className={styles.stack}>
      <HofMap time={time} highlight={wrong || ok ? task.target : null} onSelect={pick} />
      {wrong && !ok && (
        <Feedback ok={false}>
          Fast! Das ist {getPlace(wrong).article} {getPlace(wrong).name}. Schau noch einmal genau hin – {target.article === "das" ? "das" : target.article} {target.name} leuchtet jetzt.
        </Feedback>
      )}
      {ok && <Feedback ok>{t(`Genau! Ab ${toPlace(target)}.`)}</Feedback>}
    </div>
  );
}

/* ---------- Auswahl ---------- */

function Options({
  options,
  t,
  onCorrect,
  columns,
}: {
  options: Option[];
  t: (s: string) => string;
  onCorrect: () => void;
  columns?: boolean;
}) {
  const [tried, setTried] = useState<string[]>([]);
  const [answer, setAnswer] = useState<Option | null>(null);
  const solved = answer?.correct ?? false;
  return (
    <div className={styles.stack}>
      <div className={`${styles.options} ${columns ? styles.optionsRow : ""}`}>
        {options.map((o) => {
          const isTried = tried.includes(o.id);
          const state = solved && o.correct ? styles.optRight : isTried && !o.correct ? styles.optWrong : "";
          return (
            <button
              key={o.id}
              type="button"
              className={`${styles.option} ${state}`}
              disabled={solved || (isTried && !o.correct)}
              onClick={() => {
                setTried((x) => [...x, o.id]);
                setAnswer(o);
                if (o.correct) {
                  sfx.right();
                  onCorrect();
                } else sfx.tryAgain();
              }}
            >
              {t(o.label)}
            </button>
          );
        })}
      </div>
      {answer && <Feedback ok={answer.correct}>{t(answer.feedback)}</Feedback>}
    </div>
  );
}

function ChoiceView({ task, day, time, t, finish }: ViewProps<ChoiceTask>) {
  const yesNo = task.options.length === 2 && task.options.every((o) => o.label.length <= 5);
  return (
    <div className={styles.stack}>
      {task.scene && (
        <div className={styles.sceneFrame}>
          <Scene scene={task.scene} time={time} horse={sceneHorse(task.scene, day.horse)} dirty={task.scene === "box" && time === "morgen"} className={styles.scene} />
        </div>
      )}
      {task.showStats && <StatGrid stats={day.stats} />}
      <p className={styles.question}>{t(task.question)}</p>
      <Options options={task.options} t={t} onCorrect={finish} columns={yesNo} />
    </div>
  );
}

function sceneHorse(scene: string, horse: HorseId): HorseId | null {
  return scene === "boxtuer" || scene === "paddock" || scene === "putzplatz" || scene === "reitplatz" ? horse : null;
}

/* ---------- Anschauen ---------- */

function CheckView({ task, day, time, t, finish }: ViewProps<CheckTask>) {
  const [seen, setSeen] = useState<string[]>([]);
  const last = task.spots.find((s) => s.id === seen[seen.length - 1]);
  const tap = (id: string) => {
    if (seen.includes(id)) return;
    const next = [...seen, id];
    setSeen(next);
    sfx.tap();
    if (next.length === task.spots.length) finish();
  };
  return (
    <div className={styles.stack}>
      <div className={styles.sceneFrame}>
        <Scene scene={task.scene} time={time} horse={sceneHorse(task.scene, day.horse)} dirty={task.scene === "box" && time === "morgen"} className={styles.scene}>
          {task.spots.map((s) => (
            <Spot key={s.id} x={s.x} y={s.y} r={s.r ?? 38} label={s.label} done={seen.includes(s.id)} onTap={() => tap(s.id)} />
          ))}
        </Scene>
        <Counter value={seen.length} total={task.spots.length} />
      </div>
      {last?.note ? <Feedback ok>{t(last.note)}</Feedback> : <p className={styles.hint}>Tippe auf die leuchtenden Stellen.</p>}
    </div>
  );
}

function Spot({ x, y, r, label, done, onTap }: { x: number; y: number; r: number; label: string; done: boolean; onTap: () => void }) {
  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={label}
      aria-pressed={done}
      className={`${styles.spot} ${done ? styles.spotDone : ""}`}
      onClick={onTap}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onTap();
        }
      }}
    >
      <circle cx={x} cy={y} r={r} className={styles.spotHit} />
      <circle cx={x} cy={y} r={Math.min(r, 30)} className={styles.spotRing} />
      {done && <path d={`M${x - 10} ${y}l7 7 14-15`} className={styles.spotCheck} />}
    </g>
  );
}

function Counter({ value, total }: { value: number; total: number }) {
  return (
    <span className={styles.counter} aria-live="polite">
      {value} / {total}
    </span>
  );
}

/* ---------- Einsammeln ---------- */

const CONTAINER: Record<CollectTask["container"], { name: string; icon: "schubkarre" | "heu" | "eimer" } | null> = {
  schubkarre: { name: "Schubkarre", icon: "schubkarre" },
  heunetz: { name: "Heunetz", icon: "heu" },
  korb: { name: "Korb", icon: "eimer" },
  keiner: null,
};

const COLLECT_SOUND: Record<CollectTask["item"], () => void> = {
  mist: () => sfx.mist(),
  stroh: () => sfx.rascheln(),
  spaene: () => sfx.rascheln(0.3),
  heu: () => sfx.rascheln(),
  schlamm: () => sfx.buerste(),
  stein: () => sfx.kratzen(),
  ding: () => sfx.klirr(),
};

function CollectView({ task, day, time, t, finish }: ViewProps<CollectTask>) {
  const [got, setGot] = useState<string[]>([]);
  const tap = (id: string) => {
    if (got.includes(id)) return;
    const next = [...got, id];
    setGot(next);
    COLLECT_SOUND[task.item]();
    if (next.length === task.spots.length) finish();
  };
  const c = CONTAINER[task.container];
  const fill = got.length / task.spots.length;
  const horse = task.scene === "boxtuer" || task.scene === "putzplatz" ? day.horse : null;
  return (
    <div className={styles.stack}>
      <div className={styles.sceneFrame}>
        <Scene scene={task.scene} time={time} horse={horse} className={styles.scene}>
          {task.spots.map((s) => {
            const done = got.includes(s.id);
            const icon = s.icon && isItemName(s.icon) ? s.icon : null;
            return (
              <g
                key={s.id}
                role="button"
                tabIndex={0}
                aria-label={s.label}
                aria-pressed={done}
                className={`${styles.collect} ${done ? styles.collected : ""}`}
                onClick={() => tap(s.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    tap(s.id);
                  }
                }}
              >
                <circle cx={s.x} cy={s.y} r={s.r ?? 42} className={styles.spotHit} />
                {icon ? (
                  !done && (
                    <g transform={`translate(${s.x - 34} ${s.y - 34})`} className={styles.collectIcon}>
                      <ItemIcon name={icon} size={68} />
                    </g>
                  )
                ) : (
                  <CollectArt item={task.item} x={s.x} y={s.y} collected={done} />
                )}
              </g>
            );
          })}
        </Scene>
        <Counter value={got.length} total={task.spots.length} />
      </div>
      {c && (
        <div className={styles.container} aria-label={`${c.name}: ${got.length} von ${task.spots.length}`}>
          <ItemIcon name={c.icon} className={styles.containerIcon} />
          <span className={styles.containerTrack}>
            <span className={styles.containerFill} style={{ width: `${fill * 100}%` }} />
          </span>
          <span className={styles.containerName}>{c.name}</span>
        </div>
      )}
      {!got.length && <p className={styles.hint}>{t("Tippe auf alles, was weg muss oder fehlt.")}</p>}
    </div>
  );
}

/* ---------- Wasser ---------- */

function FillView({ task, time, finish }: ViewProps<FillTask>) {
  const [n, setN] = useState(0);
  const level = n / task.taps;
  const full = n >= task.taps;
  const tap = () => {
    if (full) return;
    const next = n + 1;
    setN(next);
    sfx.wasser();
    if (next >= task.taps) finish();
  };
  const name = task.vessel === "eimer" ? "Eimer" : task.vessel === "traenke" ? "Tränke" : "Trog";
  return (
    <div className={styles.stack}>
      <div className={styles.fillStage} data-time={time}>
        <svg viewBox="0 0 320 200" className={styles.fillArt} aria-hidden>
          <ellipse cx="160" cy="186" rx="120" ry="10" fill="#000" opacity=".1" />
          {/* Gefäß */}
          <path d="M60 70h200l-16 110H76Z" fill="#9AA3A0" stroke="#5E4636" strokeWidth="4" />
          <clipPath id="fill-clip">
            <path d="M64 74h192l-15 102H79Z" />
          </clipPath>
          <rect x="60" y={176 - 102 * level} width="200" height={102 * level + 4} fill="#8FB3BE" clipPath="url(#fill-clip)" className={styles.water} />
          <ellipse cx="160" cy="70" rx="100" ry="12" fill="none" stroke="#5E4636" strokeWidth="4" />
          {!full && n > 0 && <path d="M160 0v60" stroke="#8FB3BE" strokeWidth="10" strokeLinecap="round" className={styles.pour} key={n} />}
        </svg>
      </div>
      <button type="button" className={styles.bigTap} onClick={tap} disabled={full}>
        <ItemIcon name="wasser" className={styles.bigTapIcon} />
        <span>{full ? `${name} ist voll` : `Wasser eingießen (${n}/${task.taps})`}</span>
      </button>
    </div>
  );
}

/* ---------- Füttern ---------- */

function FeedView({ task, t, finish }: ViewProps<FeedTask>) {
  const [inTrough, setIn] = useState<string[]>([]);
  const [last, setLast] = useState<Option | null>(null);
  const needed = task.options.filter((o) => o.correct).map((o) => o.id);
  const complete = needed.every((id) => inTrough.includes(id));
  const pick = (o: Option) => {
    if (complete || inTrough.includes(o.id)) return;
    setLast(o);
    if (!o.correct) {
      sfx.tryAgain();
      return;
    }
    sfx.futter();
    const next = [...inTrough, o.id];
    setIn(next);
    if (needed.every((id) => next.includes(id))) finish();
  };
  return (
    <div className={styles.stack}>
      <p className={styles.question}>{t(task.question)}</p>
      <div className={styles.trough} aria-label="Futtertrog">
        <svg viewBox="0 0 320 90" className={styles.troughArt} aria-hidden>
          <path d="M14 20h292l-24 62H38Z" fill="#80634D" stroke="#5E4636" strokeWidth="4" />
          <ellipse cx="160" cy="20" rx="146" ry="10" fill="#5E4636" />
        </svg>
        <div className={styles.troughItems}>
          {inTrough.map((id) => {
            const o = task.options.find((x) => x.id === id);
            return o?.icon && isItemName(o.icon) ? <ItemIcon key={id} name={o.icon} className={styles.troughItem} title={o.label} /> : null;
          })}
        </div>
      </div>
      <div className={styles.feedGrid}>
        {task.options.map((o) => {
          const used = inTrough.includes(o.id);
          const wrong = last?.id === o.id && !o.correct;
          return (
            <button key={o.id} type="button" className={`${styles.feedItem} ${used ? styles.feedUsed : ""} ${wrong ? styles.feedWrong : ""}`} onClick={() => pick(o)} disabled={used || complete}>
              {o.icon && isItemName(o.icon) && <ItemIcon name={o.icon} className={styles.feedIcon} />}
              <span>{t(o.label)}</span>
            </button>
          );
        })}
      </div>
      {last && <Feedback ok={last.correct}>{t(last.feedback)}</Feedback>}
    </div>
  );
}

/* ---------- Putzen ---------- */

function GroomView({ day, time, t, finish }: ViewProps<GroomTask>) {
  const [tool, setTool] = useState<GroomToolId | null>(null);
  const [step, setStep] = useState(0);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [shine, setShine] = useState<GroomZone | null>(null);
  const current = GROOM_ORDER[step] ?? null;
  const done = current === null;

  const use = (zone: GroomZone) => {
    if (done) return;
    if (!tool) {
      sfx.tryAgain();
      setMsg({ ok: false, text: "Wähle zuerst unten ein Putzzeug aus dem Putzkasten." });
      return;
    }
    const tl = GROOM_TOOLS.find((x) => x.id === tool)!;
    if (tl.zone !== zone) {
      sfx.tryAgain();
      setMsg({ ok: false, text: `Fast! ${tl.name === "Hufkratzer" ? "Den" : "Die"} ${tl.name} gehört nicht an ${zone === "maehne" ? "Mähne und Schweif" : zone === "hufe" ? "die Hufe" : "das Fell"}. Schau noch einmal genau hin.` });
      return;
    }
    if (tool !== current) {
      sfx.tryAgain();
      setMsg({ ok: false, text: `Tilda hat einen Tipp: ${GROOM_HINTS[current]}` });
      return;
    }
    setMsg({ ok: true, text: t(tl.does) });
    if (zone === "hufe") sfx.kratzen();
    else sfx.buerste();
    setShine(zone);
    window.setTimeout(() => setShine(null), 900);
    const next = step + 1;
    setStep(next);
    setTool(null);
    if (next >= GROOM_ORDER.length) finish();
  };

  const toolArticle = (id: GroomToolId) => (id === "hufkratzer" ? "der" : "die");

  return (
    <div className={styles.stack}>
      <div className={styles.sceneFrame}>
        <Scene scene="putzplatz" time={time} horse={day.horse} className={styles.scene}>
          {/* Staub im Fell, bis gestriegelt und gebürstet ist */}
          {step < 2 &&
            [0, 1, 2, 3, 4].map((i) => (
              <circle key={i} cx={330 + i * 46} cy={250 + (i % 2) * 34} r={14} fill="#B8A07C" opacity={step === 0 ? 0.55 : 0.25} />
            ))}
          {(Object.keys(GROOM_ZONES) as GroomZone[]).map((zone) =>
            GROOM_ZONES[zone].map((z, i) => (
              <g
                key={`${zone}-${i}`}
                role="button"
                tabIndex={0}
                aria-label={ZONE_LABEL[zone]}
                className={`${styles.zone} ${tool ? styles.zoneArmed : ""}`}
                onClick={() => use(zone)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    use(zone);
                  }
                }}
              >
                <circle cx={z.x} cy={z.y} r={z.r} className={styles.zoneHit} />
                {shine === zone && <circle cx={z.x} cy={z.y} r={z.r * 0.8} className={styles.shine} />}
              </g>
            )),
          )}
        </Scene>
        <Counter value={step} total={GROOM_ORDER.length} />
      </div>

      {!done && <p className={styles.hint}>{GROOM_HINTS[current]}</p>}

      <div className={styles.tools} role="radiogroup" aria-label="Putzkasten">
        {GROOM_TOOLS.map((g) => {
          const used = GROOM_ORDER.indexOf(g.id) < step;
          return (
            <button
              key={g.id}
              type="button"
              role="radio"
              aria-checked={tool === g.id}
              className={`${styles.tool} ${tool === g.id ? styles.toolOn : ""} ${used ? styles.toolUsed : ""}`}
              onClick={() => {
                setTool(g.id);
                sfx.tap();
                setMsg(null);
              }}
              disabled={done}
            >
              <ItemIcon name={g.icon} className={styles.toolIcon} />
              <span>{g.name}</span>
            </button>
          );
        })}
      </div>
      {tool && !msg && <p className={styles.hint}>Jetzt tippe am Pferd auf die Stelle, wo {toolArticle(tool)} {GROOM_TOOLS.find((g) => g.id === tool)?.name} hingehört.</p>}
      {msg && <Feedback ok={msg.ok}>{msg.text}</Feedback>}
    </div>
  );
}

/* ---------- Aktivität ---------- */

function ActivityView({ day, time, t, finish }: ViewProps<ActivityTask>) {
  const a = ACTIVITIES[day.activity];
  const [step, setStep] = useState(0);
  const [solved, setSolved] = useState(false);
  const s = a.steps[step];
  const last = step === a.steps.length - 1;
  return (
    <div className={styles.stack}>
      <div className={styles.sceneFrame}>
        <Scene scene={a.scene} time={time} horse={day.horse} className={styles.scene} />
        <Counter value={step + (solved ? 1 : 0)} total={a.steps.length} />
      </div>
      {s && (
        <div key={s.id} className={styles.stack}>
          <p className={styles.question}>{t(s.text)}</p>
          <Options
            options={s.options}
            t={t}
            onCorrect={() => {
              setSolved(true);
              if (last) finish();
            }}
          />
          {solved && !last && (
            <Btn
              variant="primary"
              onClick={() => {
                setStep(step + 1);
                setSolved(false);
              }}
            >
              Nächster Schritt
            </Btn>
          )}
        </div>
      )}
    </div>
  );
}
