import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";
import { riderLabAreas, loadExercise } from "@/content/riderlab/uebungen.server";
import { isTrialExercise } from "@/content/riderlab/katalog";
import { RiderLabArea, RiderLabExercise, RiderLabHome, RiderLabLocked } from "@/features/riderlab/RiderLabScreens";
import { AcademyHome } from "@/features/akademie/AcademyHome";
import { DiaryApp } from "@/features/tagebuch/DiaryApp";
import { saveDiary } from "@/features/tagebuch/db";
import { progressActions } from "@/lib/progress/store";
import { AppShell } from "@/components/layout/AppShell";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import "@/styles/globals.css";

const unlocked = new URLSearchParams(location.search).get("u") === "1";
function Content({ h }: { h: string }) {
  const parts = h.split("/").filter(Boolean);
  if (parts[0] === "tagebuch") return <DiaryApp view={parts.slice(1, 3)} />;
  if (parts[0] === "akademie" && parts.length === 1) return <AcademyHome unlocked={unlocked} />;
  if (parts[1] !== "rider-lab") return <p id="other">Andere Seite: {h}</p>;
  if (parts.length === 2) return <RiderLabHome unlocked={unlocked} previews={Object.fromEntries(riderLabAreas.map((a) => [a.slug, a.exercises[0].anim]))} />;
  if (parts.length === 3) { const a = riderLabAreas.find((x) => x.slug === parts[2])!; return <RiderLabArea slug={parts[2]} unlocked={unlocked} preview={a.exercises[0].anim} />; }
  const f = loadExercise(parts[2], parts[3])!;
  if (!unlocked && !isTrialExercise(f.area, f.ex.id)) return <RiderLabLocked areaSlug={parts[2]} title={f.ex.title} />;
  return <RiderLabExercise key={f.ex.id} areaSlug={parts[2]} ex={f.ex} unlocked={unlocked} />;
}
window.addEventListener("error", (e) => { (window as any).__errs = [...((window as any).__errs || []), String(e.message)]; });
function App() {
  const [h, setH] = useState(location.hash.slice(1) || "/akademie/rider-lab");
  useEffect(() => { const f = () => { setH(location.hash.slice(1)); window.scrollTo(0, 0); }; addEventListener("hashchange", f); return () => removeEventListener("hashchange", f); }, []);
  return <AppShell><Content h={h} /></AppShell>;
}
async function seed() {
  const q = new URLSearchParams(location.search);
  if (q.get("seed") !== "1") return;
  const img = await fetch("/horses/tivoli-480.webp").then((r) => r.blob()).then((b) => createImageBitmap(b));
  const c = document.createElement("canvas"); c.width = img.width; c.height = img.height; c.getContext("2d")!.drawImage(img, 0, 0);
  const photo = c.toDataURL("image/jpeg", 0.85);
  const now = "2026-11-06T17:00:00.000Z";
  for (const id of ["rl-01", "rl-05", "rl-09"]) progressActions.completeGame(id);
  progressActions.setAcademyPath("teen" as any);
  await saveDiary({
    version: 1,
    profile: { name: "Lea", level: "Fortgeschritten", ridingSince: "2022" },
    horses: [
      { id: "horse-1", name: "Tivoli", relation: "schule", breed: "Schecke", age: "14", photo, likes: "Möhren und Kraulen am Mähnenkamm", createdAt: now },
      { id: "horse-2", name: "Scrabble", relation: "rb", breed: "Hannoveraner", age: "16", createdAt: now },
    ],
    entries: [
      { id: "entry-1", date: "2026-11-06", horseId: "horse-1", minutes: 45, discipline: "Reitunterricht", mood: "lehrreich", wentWell: "Zum ersten Mal sauber angaloppiert!", learned: "Beim Leichttraben rutschen meine Knie immer hoch.", nextTime: "Bein lang werden lassen, nicht klemmen.", favorite: true, photo, createdAt: now, updatedAt: now },
      { id: "entry-2", date: "2026-11-04", horseId: "horse-2", minutes: 30, discipline: "Stangenarbeit", mood: "super", moment: "Am Ende hat er mir den Kopf auf die Schulter gelegt.", favorite: true, createdAt: now, updatedAt: now },
      { id: "entry-3", date: "2026-11-02", horseId: "horse-1", minutes: 30, discipline: "Dressur", mood: "gut", wentWell: "Ecken schön ausgeritten.", createdAt: now, updatedAt: now },
    ],
    goals: [
      { id: "goal-1", title: "Sicher angaloppieren", status: "geschafft", createdAt: now, achievedAt: now },
      { id: "goal-2", title: "Ruhigere Hände", status: "uebe", createdAt: now },
      { id: "goal-3", title: "Leichttraben lernen", status: "uebe", createdAt: now },
    ],
  } as any);
}
seed().finally(() => createRoot(document.getElementById("root")!).render(<LocaleProvider locale="de"><App /></LocaleProvider>));
