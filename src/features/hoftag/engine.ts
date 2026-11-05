import { ACTIVITIES, ACTIVITY_IDS } from "@/content/hoftag/activities";
import { EVENTS } from "@/content/hoftag/events";
import { PHASES, PHASE_ORDER } from "@/content/hoftag/day";
import { horseProfiles } from "@/content/hoftag/horses";
import { BADGES } from "@/content/hoftag/progression";
import type {
  ActivityId,
  ChoiceTask,
  DayRecord,
  DayState,
  HoftagProgress,
  HorseId,
  RandomEvent,
  StatKey,
  Stats,
  TaskDef,
  TimeOfDay,
} from "@/content/hoftag/types";

/**
 * Spiellogik von „Mein Tag am Hof“ – reine Funktionen ohne React,
 * damit sie leicht zu testen und zu erweitern sind.
 */

export const HORSE_NAMES: Record<HorseId, string> = { tivoli: "Tivoli", tonga: "Tonga", scrabble: "Scrabble" };

/** Platzhalter ersetzen: {name} → Pferdename */
export function fillText(text: string, horse: HorseId): string {
  return text.replaceAll("{name}", HORSE_NAMES[horse]);
}

/** Kleiner, reproduzierbarer Zufall (mulberry32) */
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

function pickWeighted<T extends { weight?: number }>(list: T[], r: () => number): T | undefined {
  const total = list.reduce((s, x) => s + (x.weight ?? 1), 0);
  let roll = r() * total;
  for (const x of list) {
    roll -= x.weight ?? 1;
    if (roll <= 0) return x;
  }
  return list[list.length - 1];
}

/** Zwei Ereignisse in verschiedenen Tagesabschnitten, passend zum Pferd */
export function pickEvents(horse: HorseId, r: () => number, avoid: string[] = []): RandomEvent[] {
  const pool = EVENTS.filter((e) => !e.horses || e.horses.includes(horse));
  const fresh = pool.filter((e) => !avoid.includes(e.id));
  const source = fresh.length >= 2 ? fresh : pool;
  const chosen: RandomEvent[] = [];
  let candidates = [...source];
  while (chosen.length < 2 && candidates.length) {
    const e = pickWeighted(candidates, r);
    if (!e) break;
    chosen.push(e);
    candidates = candidates.filter((c) => c.id !== e.id && c.phase !== e.phase);
  }
  return chosen;
}

export function newDay(progress: HoftagProgress, horse: HorseId, now: number): DayState {
  const seed = (now ^ (progress.daysCompleted * 7919)) >>> 0;
  const r = rng(seed);
  const lastEvents = progress.history[0]?.events ?? [];
  const events = pickEvents(horse, r, lastEvents);
  const profile = horseProfiles[horse];
  const lastActivity = progress.history[0]?.activity;
  const activities = ACTIVITY_IDS.filter((a) => a !== lastActivity);
  const activity = activities[Math.floor(r() * activities.length)] ?? "spaziergang";
  const obs = profile.observations[Math.floor(r() * profile.observations.length)];
  const longTrust = progress.trust[horse] ?? 0;

  const stats: Stats = { ...profile.start };
  stats.vertrauen = clamp(stats.vertrauen + Math.min(30, longTrust / 4));
  for (const e of events) {
    for (const [k, v] of Object.entries(e.startStats ?? {})) stats[k as StatKey] = clamp(stats[k as StatKey] + (v ?? 0));
  }

  return {
    number: progress.daysCompleted + 1,
    horse,
    seed,
    events: events.map((e) => e.id),
    activity,
    observation: obs.id,
    phase: "morgen",
    completedTasks: [],
    stats,
    earned: { trust: 0, knowledge: 0, xp: 0 },
    summary: [],
    seenEvents: [],
    cards: [],
    found: [],
    startedAt: now,
    finishedAt: null,
  };
}

/** Aufgabe mit pferdespezifischen Abweichungen */
function applyVariant(task: TaskDef, horse: HorseId): TaskDef {
  const v = task.variants?.[horse];
  return v ? ({ ...task, ...v } as TaskDef) : task;
}

function observationTask(day: DayState): ChoiceTask {
  const profile = horseProfiles[day.horse];
  const obs = profile.observations.find((o) => o.id === day.observation) ?? profile.observations[0];
  return {
    id: "mi-beobachten",
    kind: "choice",
    title: "Beobachten",
    teaser: "Was macht {name} gerade?",
    place: "paddock",
    speaker: "hanna",
    scene: "paddock",
    intro: obs.text,
    question: obs.question,
    options: obs.options,
    learn: obs.learn,
    knowledgeCard: obs.knowledgeCard,
    reward: { stats: { wohl: 5 }, trust: 1, knowledge: 2, xp: 15 },
    summary: "beobachtet",
  };
}

export function eventsOf(day: DayState): RandomEvent[] {
  return day.events.map((id) => EVENTS.find((e) => e.id === id)).filter((e): e is RandomEvent => !!e);
}

/** Alle Aufgaben eines Abschnitts in Reihenfolge (inklusive Ereignis-Aufgaben) */
export function tasksForPhase(day: DayState, phase: TimeOfDay): TaskDef[] {
  const def = PHASES.find((p) => p.id === phase);
  if (!def) return [];
  const list = def.tasks.filter((t) => !t.horses || t.horses.includes(day.horse)).map((t) => applyVariant(t, day.horse));
  const extra = eventsOf(day)
    .filter((e) => e.phase === phase && e.task)
    .map((e) => applyVariant(e.task as TaskDef, day.horse));
  if (phase === "mittag") extra.push(observationTask(day));
  if (phase === "nachmittag") {
    const a = ACTIVITIES[day.activity];
    const i = list.findIndex((t) => t.id === "n-aktivitaet");
    if (i >= 0) list[i] = { ...list[i], title: a.title, place: a.place, intro: a.intro, teaser: `Heute steht ${a.title} auf dem Plan.` };
  }
  return [list[0], ...extra, ...list.slice(1)].filter(Boolean);
}

export function allTasks(day: DayState): Array<{ phase: TimeOfDay; task: TaskDef }> {
  return PHASE_ORDER.flatMap((phase) => tasksForPhase(day, phase).map((task) => ({ phase, task })));
}

export function currentTask(day: DayState): { phase: TimeOfDay; task: TaskDef } | null {
  return allTasks(day).find((x) => !day.completedTasks.includes(x.task.id)) ?? null;
}

/** Ereignis, das gemeldet werden soll, bevor die nächste Aufgabe startet */
export function pendingEvent(day: DayState): RandomEvent | null {
  const cur = currentTask(day);
  if (!cur) return null;
  return eventsOf(day).find((e) => e.phase === cur.phase && !day.seenEvents.includes(e.id)) ?? null;
}

export function phaseProgress(day: DayState): { phase: TimeOfDay; done: number; total: number }[] {
  return PHASE_ORDER.map((phase) => {
    const list = tasksForPhase(day, phase);
    return { phase, done: list.filter((t) => day.completedTasks.includes(t.id)).length, total: list.length };
  });
}

export function completeTask(day: DayState, task: TaskDef): DayState {
  if (day.completedTasks.includes(task.id)) return day;
  const stats = { ...day.stats };
  for (const [k, v] of Object.entries(task.reward.stats ?? {})) stats[k as StatKey] = clamp(stats[k as StatKey] + (v ?? 0));
  // Wohlbefinden folgt den Grundbedürfnissen ein wenig mit
  stats.wohl = clamp(Math.max(stats.wohl, (stats.wasser + stats.futter + stats.pflege + stats.bewegung) / 4));
  const next: DayState = {
    ...day,
    stats,
    completedTasks: [...day.completedTasks, task.id],
    earned: {
      trust: day.earned.trust + (task.reward.trust ?? 0),
      knowledge: day.earned.knowledge + (task.reward.knowledge ?? 0),
      xp: day.earned.xp + (task.reward.xp ?? 0),
    },
    summary: task.summary && !day.summary.includes(task.summary) ? [...day.summary, task.summary] : day.summary,
    cards: task.knowledgeCard && !day.cards.includes(task.knowledgeCard) ? [...day.cards, task.knowledgeCard] : day.cards,
  };
  // Fundstück eines Ereignisses
  const ev = eventsOf(day).find((e) => e.task?.id === task.id && e.found);
  if (ev?.found && !next.found.includes(ev.found)) next.found = [...next.found, ev.found];
  // Putzen umfasst auch die Hufe
  if (task.kind === "groom" && !next.summary.includes("hufe")) next.summary = [...next.summary, "hufe"];
  const cur = currentTask(next);
  return { ...next, phase: cur ? cur.phase : "abend" };
}

export function markEventSeen(day: DayState, id: string): DayState {
  return day.seenEvents.includes(id) ? day : { ...day, seenEvents: [...day.seenEvents, id] };
}

/** Bonus für einen abgeschlossenen Tag */
export const DAY_BONUS = { xp: 20, trust: 2 };

/** Tag abschließen: Fortschritt gutschreiben (nur einmal) */
export function finishDay(p: HoftagProgress, now: number): HoftagProgress {
  const day = p.day;
  if (!day || day.finishedAt) return p;
  const xp = day.earned.xp + DAY_BONUS.xp;
  const trust = day.earned.trust + DAY_BONUS.trust;
  const record: DayRecord = {
    number: day.number,
    horse: day.horse,
    date: now,
    xp,
    trust,
    knowledge: day.earned.knowledge,
    events: day.events,
    activity: day.activity,
  };
  const history = [record, ...p.history].slice(0, 20);
  const badges = [...p.badges];
  const add = (id: string) => {
    if (!badges.includes(id) && BADGES.some((b) => b.id === id)) badges.push(id);
  };
  add("erster-tag");
  const cared = new Set(history.map((h) => h.horse));
  if (cared.size >= 3) add("alle-pferde");
  if (p.daysCompleted + 1 >= 5) add("fuenf-tage");
  return {
    ...p,
    xp: p.xp + xp,
    knowledge: p.knowledge + day.earned.knowledge,
    trust: { ...p.trust, [day.horse]: (p.trust[day.horse] ?? 0) + trust },
    cards: [...p.cards, ...day.cards.filter((c) => !p.cards.includes(c))],
    found: [...p.found, ...day.found.filter((f) => !p.found.includes(f))],
    badges,
    daysCompleted: p.daysCompleted + 1,
    history,
    day: { ...day, finishedAt: now },
    lastPlayedAt: now,
  };
}

/** Mehr als zwei Tage nicht gespielt? Dann begrüßen wir freundlich – ohne Folgen fürs Pferd. */
export function isReturning(p: HoftagProgress, now: number): boolean {
  return !!p.lastPlayedAt && now - p.lastPlayedAt > 2 * 24 * 60 * 60 * 1000;
}

export function activityOf(id: ActivityId) {
  return ACTIVITIES[id];
}
