# Musik + Soundeffekte für das Reel „Reiter in 40 Sekunden erklärt“ (comp reiter40, ohne Sprecher).
# Zeiten aus src/video/reels/reiter40-cues.json (dieselben wie im Bild).
# Aufruf: python3 sfx_reiter40.py out.wav   → danach ffmpeg loudnorm (siehe unten)
import numpy as np, scipy.io.wavfile as wf, scipy.signal as ss, sys, json, os
SR = 44100
C = json.load(open(os.path.join(os.path.dirname(__file__), "../../../src/video/reels/reiter40-cues.json")))
T = C["total"]; n = int(SR * T)
mus = np.zeros((n, 2)); fx = np.zeros((n, 2))
rng = np.random.default_rng(7)

def add(buf, sig, start, pan=0.5):
    i = int(start * SR); j = min(n, i + len(sig))
    if i >= n or j <= i or i < 0: return
    buf[i:j, 0] += sig[:j - i] * (1 - pan); buf[i:j, 1] += sig[:j - i] * pan
mid = lambda m: 440 * 2 ** ((m - 69) / 12)
tt = lambda d: np.arange(int(SR * d)) / SR
def note(f, dur, amp, decay=3.0):
    t = tt(dur); w = np.sin(2*np.pi*f*t) + 0.35*np.sin(2*np.pi*2*f*t) + 0.1*np.sin(2*np.pi*3*f*t)
    return w * np.minimum(1, t/0.006) * np.exp(-t*decay) * amp
def bp(x, lo, hi):
    b, a = ss.butter(2, [lo/(SR/2), hi/(SR/2)], "band"); return ss.lfilter(b, a, x)
def lp(x, hi):
    b, a = ss.butter(2, hi/(SR/2)); return ss.lfilter(b, a, x)
def noise(d): return rng.standard_normal(int(SR*d))

# ---------- Effekte ----------
def whoosh(amp=0.35, d=0.22):
    t = tt(d); x = noise(d)
    out = np.zeros_like(x); seg = 64
    for k in range(0, len(x), seg * 16):  # Sweep: Band wandert nach oben
        f = 500 + 3500 * (k / len(x)); out[k:k+seg*16] = bp(x[k:k+seg*16], f*0.6, min(f*1.6, 18000))
    return out * np.sin(np.pi * t / d) ** 2 * amp
def tick(amp=0.25): t = tt(0.03); return np.sin(2*np.pi*2800*t) * np.exp(-t*220) * amp
def blip(m, amp=0.22, d=0.12):
    t = tt(d); f = mid(m) * (1 + 0.25 * np.exp(-t*40)); return np.sin(2*np.pi*np.cumsum(f)/SR) * np.exp(-t*28) * amp
def kaching():
    s = np.zeros(int(SR*0.7)); s[:len(note(mid(96),0.7,0.25,5))] += note(mid(96),0.7,0.25,5)
    b = note(mid(100),0.6,0.22,5); s[int(SR*0.07):int(SR*0.07)+len(b)] += b
    z = bp(noise(0.08),3000,9000)*np.exp(-tt(0.08)*50)*0.3; s[:len(z)] += z; return s
def cough(human=True, amp=0.5):
    d = 0.24 if human else 0.42; t = tt(d); x = noise(d)
    x = bp(x, 250, 2400) if human else lp(x, 600) + 0.6*np.sin(2*np.pi*70*t)
    env = np.minimum(1, t/0.008) * np.exp(-t*(16 if human else 7))
    return x * env * amp
def stab(ms, amp=0.18, d=0.9, decay=2.5):
    t = tt(d); s = np.zeros_like(t)
    for m in ms:
        f = mid(m); s += (2*((t*f) % 1) - 1) * 0.5 + np.sin(2*np.pi*f*t)
    s = lp(s, 2200); return s * np.minimum(1, t/0.01) * np.exp(-t*decay) * amp / len(ms)
def timpani(amp=0.5): t = tt(0.9); return (np.sin(2*np.pi*55*t*(1+0.1*np.exp(-t*8))) + lp(noise(0.9),300)*0.3) * np.exp(-t*4) * amp
def clop(amp=0.12, f=260): t = tt(0.08); return (np.sin(2*np.pi*f*t)+0.4*np.sin(2*np.pi*f*2.3*t))*np.exp(-t*60)*amp
def shutter(amp=0.18):
    a = bp(noise(0.02),2000,8000)*np.exp(-tt(0.02)*200); b = bp(noise(0.03),1500,6000)*np.exp(-tt(0.03)*150)
    s = np.zeros(int(SR*0.09)); s[:len(a)] += a; s[int(SR*0.05):int(SR*0.05)+len(b)] += b*0.8; return s*amp*3

# Schnitte
for c in ["s1","s1cut","s2","s2cut","s3","s3cut","s4","s4cut","s5","s5cut","s6","s7","s7cut","s8","fin"]:
    add(fx, whoosh(), C[c] - 0.08, 0.45)
# Hook: Stoppuhr tickt
for k in range(8): add(fx, tick(0.18), k * 0.25)
add(fx, blip(84), 0.55)
# Szene 1: Uhr tickt, dann Zeitraffer-Pfeifen
k = C["s1"]
while k < C["s1cut"] - 0.1: add(fx, tick(0.2), k, 0.4); k += 0.5
t = tt(0.4); add(fx, np.sin(2*np.pi*np.cumsum(600+2400*t/0.4)/SR)*np.sin(np.pi*t/0.4)*0.15, C["s1cut"])
add(fx, stab([57, 64, 69], 0.16, 0.5, 6), C["s1cut"] + 0.15)
add(fx, blip(79), C["s1cut"] + 0.6)
# Szene 2: Spind rumpelt, Warenkorb-Blips, Kasse
add(fx, lp(noise(0.3),400)*np.exp(-tt(0.3)*10)*0.4, C["s2"] + 0.35)
add(fx, blip(76), C["s2"] + 0.5)
for i in range(4): add(fx, blip(79 + i*3), C["s2cut"] + 0.15 + i*0.3, 0.4 + 0.07*i)
add(fx, kaching(), C["s2cut"] + 1.4)
add(fx, blip(72, 0.2, 0.2), C["s2b"])
# Szene 3: Husten (Mensch egal, Pferd ALARM)
VO = len(sys.argv) > 2
if not VO: add(fx, cough(True, 0.4), C["s3"] + 0.15); add(fx, cough(True, 0.35), C["s3cough2"])
add(fx, cough(False, 0.6), C["s3cut"] + 0.3)
add(fx, stab([60, 66, 72], 0.28, 0.8, 3), C["s3big"]); add(fx, timpani(0.35), C["s3big"])
for i in range(4): add(fx, blip(84 + i, 0.18), C["s3sub"] + i*0.28, 0.3 + 0.13*i)
# Szene 4: Häkchen in Serie, dann „kurz.“ in Stille
add(fx, blip(72), C["s4"] + 0.6)
step = (C["s4kurz"] - 0.2 - C["s4cut"] - 0.1) / 8
for i in range(8): add(fx, blip(72 + i*2, 0.2), C["s4cut"] + 0.1 + i*step, 0.35 + 0.04*i)
add(fx, note(mid(48), 0.5, 0.18, 6), C["s4kurz"])
# Szene 5: Fleck – dramatisch
add(fx, blip(81), C["s5"] + 0.5)
add(fx, stab([45, 52], 0.3, 0.35, 8), C["s5spot"]); add(fx, stab([46, 53], 0.3, 0.35, 8), C["s5spot"] + 0.22)
add(fx, stab([41, 48, 53, 56], 0.42, 1.4, 1.6), C["s5no"]); add(fx, timpani(0.6), C["s5no"])
# Szene 6: Hufschlag (Trab) + Ding je „letzte Runde“
k = C["s6"]
while k < C["s7"] - 0.1: add(fx, clop(0.12, 250), k, 0.4); add(fx, clop(0.1, 300), k + 0.17, 0.6); k += 0.34
for i, c in enumerate(["s6", "s6b", "s6c", "s6d"]): add(fx, note(mid(84 + 2*i), 0.4, 0.12, 7), C[c] + 0.05)
# Szene 7: Regen leise, Gedankenblasen
rain = bp(noise(C["s8"] - C["s7"]), 2000, 9000) * 0.05; add(fx, rain, C["s7"])
for i in range(3): add(fx, blip(74 + i*2, 0.18), C["s7cut"] + 0.45 + i*0.3)
for i in range(5): add(fx, blip(86 - i*2, 0.2, 0.15), C["s7th"] + i*C["s7step"], 0.2 + 0.15*i)
# Szene 8: Kamera-Auslöser
for i in range(9): add(fx, shutter(0.14), C["s8"] + 0.1 + i*0.08, 0.3 + 0.05*i)
for i in range(6): add(fx, shutter(0.2), C["s8lab"] + i*0.3, 0.5)
# Finale
add(fx, note(mid(67), 0.6, 0.12, 5), C["fin2"])
add(fx, blip(91, 0.2, 0.2), C["fin3"])
add(fx, blip(84), C["cta"])

# ---------- Musik (Hofgeschichten-Synth, schneller) ----------
root = 55; beat = 0.5
prog = [[0,12,16,19],[-5,7,11,14],[-3,9,12,16],[-7,9,12,17]]
mel = [(16,1),(19,1),(21,2),(19,1),(16,1),(14,2),(12,1),(14,1),(16,1),(19,1),(16,4)]
silent = [(C["s3big"]-0.05, C["s3big"]+0.5), (C["s4kurz"]-0.05, C["s5"]), (C["s5spot"]-0.05, C["s6"]-0.05), (C["fin"]-0.05, T)]
quiet = lambda x: any(a <= x < b for a, b in silent)
t0 = 0; b = 0
while t0 < C["fin"]:
    ch = [root + x for x in prog[(b//2) % 4]]
    if not quiet(t0): add(mus, note(mid(ch[0]), beat*2.2, 0.22, 1.8), t0)
    for k in range(4):
        x = t0 + k*beat/2
        if not quiet(x): add(mus, note(mid(ch[1+k%3]), beat*0.8, 0.05, 5), x, 0.35+0.3*(k%2))
    b += 1; t0 += 2*beat
x = 4*beat
while x < C["fin"] - 0.3:
    for m, d in mel:
        if x >= C["fin"] - 0.3: break
        if not quiet(x): add(mus, note(mid(root+12+m), d*beat*0.9, 0.08, 3), x, 0.6)
        x += d*beat/2
# Gate-Kanten weich (kein Klick beim Stummschalten)
g = np.ones(n)
for a, bb in silent:
    i, j = int(a*SR), min(n, int(bb*SR)); g[i:j] = 0
g = np.convolve(g, np.ones(441)/441, "same"); mus *= g[:, None]
# Schlussakkord
for m in [55, 62, 67, 71, 74, 79]: add(mus, note(mid(m), 4.5, 0.12, 0.9), C["fin"])
for i, m in enumerate([86, 90, 93, 98]): add(mus, note(mid(m), 2.0, 0.05, 3), C["cta"] + i*0.09, 0.4 + 0.1*i)

mus /= np.abs(mus).max() / 0.7; fx /= np.abs(fx).max() / 0.9
if VO:  # Stimme dazu, Musik unter der Stimme absenken (Ducking)
    sr2, v = wf.read(sys.argv[2]); v = v.astype(float) / 32768
    v = np.pad(v, (0, max(0, n - len(v))))[:n]
    env = np.convolve(np.abs(v), np.ones(int(SR*0.25))/(SR*0.25), "same")
    duck = 1 - 0.55 * np.clip(env / 0.03, 0, 1)
    out = mus * 0.38 * duck[:, None] + fx * 0.55 + np.stack([v, v], 1) * 1.0
else:
    out = mus * 0.45 + fx * 0.8
fo = int(SR * 1.2); out[-fo:] *= np.linspace(1, 0, fo)[:, None]
out /= np.abs(out).max() / 0.9
wf.write(sys.argv[1], SR, (out * 32767).astype(np.int16)); print("ok", T)
