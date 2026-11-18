# Ton für `dating` (18.11.2026): 0 … Schnitt = Romantik (Klavier-Arpeggio + Streicherfläche),
# Plattenkratzer, danach trockener Comedy-Beat (Pizzicato-Bass, Plucks, Snaps) + Szenen-SFX, Stimme mit Ducking.
# Aufruf: python3 dating_audio.py lines.json vo.wav out.wav
import numpy as np, scipy.io.wavfile as wf, scipy.signal as ss, sys, json
SR = 44100
lj, vop, outp = sys.argv[1:4]
L = json.load(open(lj)); T = L["total"]; n = int(SR * T)
S = lambda k: L["lines"][k][0]; E = lambda k: L["lines"][k][1]
mus = np.zeros((n, 2)); fx = np.zeros((n, 2)); rng = np.random.default_rng(5)
def add(buf, sig, st, pan=0.5):
    i = int(st * SR); j = min(n, i + len(sig))
    if i < 0 or i >= n or j <= i: return
    buf[i:j, 0] += sig[:j-i] * (1 - pan); buf[i:j, 1] += sig[:j-i] * pan
mid = lambda m: 440 * 2 ** ((m - 69) / 12); tt = lambda d: np.arange(int(SR * d)) / SR
def lp(x, hi): b, a = ss.butter(2, hi/(SR/2)); return ss.lfilter(b, a, x)
def bp(x, lo, hi): b, a = ss.butter(2, [lo/(SR/2), hi/(SR/2)], "band"); return ss.lfilter(b, a, x)
def piano(m, d=1.6, a=0.16):
    t = tt(d); f = mid(m); return (np.sin(2*np.pi*f*t) + 0.4*np.sin(4*np.pi*f*t) + 0.15*np.sin(6*np.pi*f*t)) * np.minimum(1, t/0.004) * np.exp(-t*2.2) * a
def pad(ms, d, a=0.06):
    t = tt(d); s = sum(np.sin(2*np.pi*mid(m)*t*(1 + 0.002*np.sin(t*5 + i))) for i, m in enumerate(ms))
    return s * np.minimum(1, t/0.8) * np.minimum(1, (d - t)/0.3) * a / len(ms)
def pluck(m, a=0.18, d=0.25):
    t = tt(d); f = mid(m); return np.sin(2*np.pi*f*t) * np.exp(-t*18) * a
def snap(a=0.12): x = rng.standard_normal(int(SR*0.05)); return bp(x, 1500, 6000) * np.exp(-np.linspace(0, 9, len(x))) * a
def kick(a=0.3): t = tt(0.2); return np.sin(2*np.pi*np.cumsum(50 + 90*np.exp(-t*30))/SR) * np.exp(-t*14) * a
def whoosh(a=0.25, d=0.2):
    x = rng.standard_normal(int(SR*d)); t = tt(d); return bp(x, 800, 6000) * np.sin(np.pi*t/d)**2 * a
def blip(m, a=0.18, d=0.12):
    t = tt(d); f = mid(m)*(1 + 0.25*np.exp(-t*40)); return np.sin(2*np.pi*np.cumsum(f)/SR) * np.exp(-t*28) * a

CUT = S("03") - 0.25
# Romantik bis zum Schnitt
for i, m in enumerate([60, 64, 67, 72, 64, 67, 71, 76, 62, 65, 69, 74]):
    st = 0.05 + i * 0.27
    if st < CUT: add(mus, piano(m, 1.4, 0.12), st, 0.35 + 0.3 * (i % 2))
add(mus, pad([48, 55, 64, 67], CUT + 0.02, 0.10), 0.0)
add(mus, pad([72, 76, 79], CUT + 0.02, 0.04), 0.0)
# Plattenkratzer
d = 0.35; t = tt(d); x = rng.standard_normal(len(t))
scr = bp(x, 400, 3000) * np.abs(np.sin(2*np.pi*(9*t + 30*t**2))) * np.exp(-t*3) * 0.5
add(fx, scr, CUT - 0.05)
# Comedy-Beat ab Schnitt (112 bpm, Pizzicato)
beat = 60 / 112; st = CUT + 0.25; i = 0
bass = [43, 43, 50, 43, 41, 41, 48, 41]; mel = [67, 0, 71, 69, 0, 67, 64, 0]
while st < T - 1.2:
    b = i % 8
    add(mus, pluck(bass[b], 0.26, 0.3), st)
    if b % 2 == 0: add(mus, kick(0.22), st)
    if b % 2 == 1: add(mus, snap(0.12), st, 0.6)
    if mel[b]: add(mus, pluck(mel[b] + 12, 0.09, 0.2), st + beat / 2, 0.65)
    st += beat / 2 * 2 if False else beat; i += 1
add(mus, pluck(43, 0.3, 0.6), T - 1.15); add(mus, pluck(55, 0.18, 0.6), T - 1.15); add(mus, kick(0.25), T - 1.15)
# Szenen-SFX
for k in ["04", "05", "06", "07", "09"]: add(fx, whoosh(), S(k) - 0.18)
for i in range(4):   # Matsch
    y = rng.standard_normal(int(SR*0.18)); add(fx, lp(y, 600) * np.exp(-np.linspace(0, 6, len(y))) * 0.25, S("03") + 0.2 + i*0.42, 0.4)
q = tt(0.5); add(fx, np.sin(2*np.pi*np.cumsum(1800 + 500*np.sin(q*20))/SR) * np.exp(-q*5) * 0.03, S("03") + 0.5, 0.7)  # Quietschen
add(fx, kick(0.35), S("04") + 0.1); add(fx, blip(60, 0.12, 0.3), S("04") + 0.85)   # Heu-Plumps, Stare
for i in range(6): add(fx, lp(rng.standard_normal(int(SR*0.06)), 1200) * 0.12, S("05") + 0.6 + i*0.2, 0.3)  # Kauen
for i in range(8): add(fx, blip(74 + (i % 3), 0.07, 0.08), S("06") + 0.2 + i*0.16, 0.6)   # Schabracken
cr = tt(E("08") - S("07") + 0.3); add(fx, np.sin(2*np.pi*4200*cr) * (np.sin(2*np.pi*18*cr) > 0.7) * 0.025, S("07") - 0.1, 0.5)  # Grillen
add(fx, blip(55, 0.25, 0.4), S("08") - 0.05)   # „3 hours later“
for i, m in enumerate([79, 83, 86]): add(fx, blip(m, 0.15, 0.15), S("10") + 0.1 + i*0.12, 0.6)  # Herzchen

sr, v = wf.read(vop); v = v.astype(np.float64) / 32768
if v.ndim > 1: v = v.mean(axis=1)
v = v[:n]; vo = np.zeros(n); vo[:len(v)] = v
env = np.convolve(np.abs(vo), np.ones(int(SR*0.12))/int(SR*0.12), "same"); duck = 1 - 0.55*np.clip(env*12, 0, 1)
out = mus * duck[:, None] * 0.9 + fx + np.stack([vo, vo], 1) * 1.0
out /= max(1e-6, np.abs(out).max()) / 0.95
wf.write(outp, SR, (out * 32767).astype(np.int16)); print("ok", T)
