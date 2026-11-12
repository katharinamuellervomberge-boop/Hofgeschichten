# Sprecherspur für `reiter40`: schneidet die ElevenLabs-Gesamtaufnahme in Sätze, strafft das Tempo,
# legt die Sätze mit Pausen für die Bild-Pointen an und schreibt daraus reiter40-cues.json neu.
# Aufruf: python3 vo_reiter40.py aufnahme.mp3 vo.wav
import numpy as np, scipy.io.wavfile as wf, subprocess, sys, json, os
SR = 44100
SPEED = 1.2  # atempo (Tonhöhe bleibt)
# Satz-Grenzen in der Aufnahme vom 12.11.2026 (Stille-Erkennung + Silbenzählung)
SEG = {
 "01": (0.00, 2.45), "02": (2.96, 4.63), "03": (5.09, 6.41), "04": (6.80, 8.99), "05": (9.41, 11.20),
 "06": (11.47, 12.97), "07": (13.24, 15.12), "08": (15.48, 17.10), "09": (17.52, 18.09), "10": (18.46, 20.59),
 "11": (20.92, 21.55), "12": (21.83, 22.84), "13": (23.18, 24.30), "14": (24.64, 25.94), "15": (26.20, 27.50),
 "16": (27.89, 30.42), "17": (30.76, 35.45), "18": (35.79, 38.90), "19": (39.29, 41.54), "20": (41.83, 42.89),
 "21": (43.21, 45.53),
}
# Pause VOR dem Satz (s, Zielzeit): Platz für Bild-Pointen
GAP = {"01": 0.1, "03": 0.3, "05": 1.25, "06": 0.25, "07": 0.55, "08": 0.6, "09": 1.75, "10": 0.3,
       "11": 0.65, "12": 0.45, "13": 0.1, "14": 0.1, "15": 0.1, "16": 0.2, "17": 0.15, "18": 0.2, "19": 0.3, "20": 0.25, "21": 0.3}
src, out = sys.argv[1], sys.argv[2]
raw = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", src, "-ac", "1", "-ar", str(SR), "-af", f"atempo={SPEED}", "-f", "f32le", "-"], capture_output=True).stdout
x = np.frombuffer(raw, np.float32)
pos = {}; t = 0.0; pieces = []
for k in sorted(SEG):
    a, b = SEG[k]; a = max(0, a - 0.04) / SPEED; b = (b + 0.06) / SPEED
    seg = x[int(a * SR):int(b * SR)].copy()
    f = int(0.01 * SR); seg[:f] *= np.linspace(0, 1, f); seg[-f:] *= np.linspace(1, 0, f)
    t += GAP.get(k, 0.12)
    pos[k] = (round(t, 3), round(t + len(seg) / SR, 3)); pieces.append((t, seg)); t += len(seg) / SR
total = t + 1.3
vo = np.zeros(int(total * SR) + 10, np.float32)
for s, seg in pieces: i = int(s * SR); vo[i:i + len(seg)] += seg
wf.write(out, SR, (np.clip(vo, -1, 1) * 32767).astype(np.int16))
S = lambda k: pos[k][0]; E = lambda k: pos[k][1]; o = lambda sec: sec / SPEED  # Versatz innerhalb eines Satzes
C = {
 "s1": S("02") - 0.1, "s1cut": S("03") - 0.12,
 "s2": S("04") - 0.1, "s2cut": E("04") + 0.05, "s2b": S("05"),
 "s3": S("06") - 0.12, "s3cough2": S("06") + o(0.48), "s3wird": S("06") + o(0.78), "s3cut": E("06") + 0.1,
 "s3big": S("07") + o(0.74), "s3sub": S("07") + o(0.74) + 0.5,
 "s4": S("08") - 0.1, "s4cut": E("08") + 0.05, "s4kurz": S("09"),
 "s5": S("10") - 0.1, "s5cut": E("10") + 0.05, "s5spot": E("10") + 0.3, "s5no": S("11"),
 "s6": S("12") - 0.05, "s6b": S("13"), "s6c": S("14"), "s6d": S("15"),
 "s7": S("16") - 0.1, "s7cut": S("17") - 0.05, "s7th": S("17") + o(0.79), "s7step": o(3.9) / 4,
 "s8": S("18") - 0.1, "s8lab": S("18") + o(1.6),
 "fin": S("19") - 0.05, "fin2": S("19") + o(0.8), "fin3": S("20"), "cta": S("21"), "brand": S("21") + 0.6,
 "total": round(total, 2),
}
C = {k: round(v, 3) for k, v in C.items()}
json.dump(C, open(os.path.join(os.path.dirname(__file__), "../../../src/video/reels/reiter40-cues.json"), "w"), indent=1)
print(json.dumps(pos)); print("total", C["total"])
