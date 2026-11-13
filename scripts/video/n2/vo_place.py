# Allgemein: ElevenLabs-Gesamtaufnahme → Sätze schneiden, Tempo straffen, mit Pausen neu anlegen.
# Aufruf: python3 vo_place.py aufnahme.mp3 plan.json vo.wav lines.json
# plan.json: {"speed":1.15, "tail":1.4, "lines":[["01", start, ende, pause_vorher(, tempo)], ...]}
#   optionales 5. Feld = eigenes Tempo für diesen Satz (Zeiten in der Originalaufnahme)
# lines.json (für das Reel): {"total":…, "lines":{"01":[start, ende], …}}  (Zeiten im Reel)
import numpy as np, scipy.io.wavfile as wf, subprocess, sys, json
SR = 44100
src, plan, out, lines_out = sys.argv[1:5]
P = json.load(open(plan)); sp = P.get("speed", 1.0)
raw = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", src, "-ac", "1", "-ar", str(SR), "-af", f"atempo={sp}", "-f", "f32le", "-"], capture_output=True).stdout
x = np.frombuffer(raw, np.float32)
t = 0.0; pos = {}; pieces = []
x1 = None
def stretch(seg, f):
    r = subprocess.run(["ffmpeg", "-loglevel", "error", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", "-", "-af", f"atempo={f}", "-f", "f32le", "-"], input=seg.tobytes(), capture_output=True).stdout
    return np.frombuffer(r, np.float32).copy()
for row in P["lines"]:
    k, a, b, gap = row[:4]
    if len(row) > 4:
        if x1 is None:
            x1 = np.frombuffer(subprocess.run(["ffmpeg", "-loglevel", "error", "-i", src, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True).stdout, np.float32)
        seg = stretch(x1[int(max(0, a - 0.04) * SR):int((b + 0.06) * SR)], row[4])
    else:
        a = max(0, a - 0.04) / sp; b = (b + 0.06) / sp
        seg = x[int(a * SR):int(b * SR)].copy()
    f = int(0.01 * SR); seg[:f] *= np.linspace(0, 1, f); seg[-f:] *= np.linspace(1, 0, f)
    t += gap; pos[k] = [round(t, 3), round(t + len(seg) / SR, 3)]; pieces.append((t, seg)); t += len(seg) / SR
total = round(t + P.get("tail", 1.4), 2)
vo = np.zeros(int(total * SR) + 10, np.float32)
for s, seg in pieces: vo[int(s * SR):int(s * SR) + len(seg)] += seg
wf.write(out, SR, (np.clip(vo, -1, 1) * 32767).astype(np.int16))
json.dump({"total": total, "speed": sp, "lines": pos}, open(lines_out, "w"), indent=1)
print("total", total)
