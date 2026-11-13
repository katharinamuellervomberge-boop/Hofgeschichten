# Ton für Sprecher-Reels mit vo_place.py: Musikbett (Hofgeschichten-Synth), Whoosh an Schnitten, Pops, Stinger, Stimme + Ducking.
# Aufruf: python3 viral_audio.py <reel> lines.json vo.wav out.wav   (reel: reitersprache | bahnranking)
import numpy as np, scipy.io.wavfile as wf, scipy.signal as ss, sys, json
SR = 44100
reel, lj, vop, outp = sys.argv[1:5]
L = json.load(open(lj)); T = L["total"]; n = int(SR * T)
S = lambda k: L["lines"][k][0]; E = lambda k: L["lines"][k][1]
mus = np.zeros((n, 2)); fx = np.zeros((n, 2)); rng = np.random.default_rng(3)
def add(buf, sig, st, pan=0.5):
    i = int(st * SR); j = min(n, i + len(sig))
    if i < 0 or i >= n or j <= i: return
    buf[i:j, 0] += sig[:j-i] * (1 - pan); buf[i:j, 1] += sig[:j-i] * pan
mid = lambda m: 440 * 2 ** ((m - 69) / 12); tt = lambda d: np.arange(int(SR * d)) / SR
def note(f, d, a, dec=3.0):
    t = tt(d); return (np.sin(2*np.pi*f*t) + 0.35*np.sin(4*np.pi*f*t) + 0.1*np.sin(6*np.pi*f*t)) * np.minimum(1, t/0.006) * np.exp(-t*dec) * a
def bp(x, lo, hi): b, a = ss.butter(2, [lo/(SR/2), hi/(SR/2)], "band"); return ss.lfilter(b, a, x)
def lp(x, hi): b, a = ss.butter(2, hi/(SR/2)); return ss.lfilter(b, a, x)
def whoosh(a=0.3, d=0.2):
    x = rng.standard_normal(int(SR*d)); t = tt(d); o = np.zeros_like(x); c = int(SR*0.02)
    for k in range(0, len(x), c): f = 500 + 3500*k/len(x); o[k:k+c] = bp(x[k:k+c], f*0.6, min(f*1.6, 18000))
    return o * np.sin(np.pi*t/d)**2 * a
def blip(m, a=0.2, d=0.12):
    t = tt(d); f = mid(m)*(1 + 0.25*np.exp(-t*40)); return np.sin(2*np.pi*np.cumsum(f)/SR) * np.exp(-t*28) * a
def stab(ms, a=0.25, d=0.9, dec=2.5):
    t = tt(d); s = sum((2*((t*mid(m)) % 1) - 1)*0.5 + np.sin(2*np.pi*mid(m)*t) for m in ms)
    return lp(s, 2200) * np.minimum(1, t/0.01) * np.exp(-t*dec) * a / len(ms)
def timp(a=0.4): t = tt(0.8); return (np.sin(2*np.pi*55*t) + lp(rng.standard_normal(len(t)), 300)*0.3) * np.exp(-t*4) * a
def clop(a=0.1, f=260): t = tt(0.08); return (np.sin(2*np.pi*f*t) + 0.4*np.sin(2*np.pi*f*2.3*t)) * np.exp(-t*60) * a

if reel == "reitersprache":
    starts = [S(k) - 0.12 for k in ["03","04","06","07","09","11","13","14","16","17","19"]]
    for s in [S("02") - 0.05] + starts: add(fx, whoosh(), s - 0.06)
    for k in ["05","08","10","12","15"]: add(fx, blip(84, 0.22), S(k) - 0.02, 0.7)
    add(fx, stab([60, 66, 72], 0.3, 0.7, 3), S("06") - 0.12 + 0.7); add(fx, timp(0.3), S("06") + 0.58)
    for k in ["03","04","06","07","09","11","13","14","16"]: add(fx, note(mid(88), 0.3, 0.05, 8), E(k) + 0.3, 0.3)
    add(fx, blip(60, 0.2, 0.25), S("18"))
    for i in range(3): add(fx, blip(76 + 3*i, 0.16), S("19") + 0.6 + 0.3 + i*0.2)
    add(fx, blip(91, 0.2, 0.2), S("20") + 0.6)
    quiet = [(S("18") - 0.1, E("18") + 0.2)]; mend = S("20") - 0.1; fin = S("20")
elif reel == "eindecken":
    NOTE = E("21") + 0.35
    cuts = [S(k) - 0.05 for k in ["02","04","09","13","15","16","17","18","19","21","22","23","24"]]
    for c in cuts: add(fx, whoosh(0.28), c - 0.06)
    for i, k in enumerate(["04","05","06","07","08","09","10","11","12"]): add(fx, blip(72 + i, 0.18), S(k) - 0.02, 0.3 + 0.05*i)
    add(fx, stab([45, 52], 0.3, 0.6, 5), S("13") - 0.05); add(fx, timp(0.35), S("13") - 0.05)
    add(fx, stab([41, 48, 53], 0.3, 0.8, 3), S("15") - 0.05)
    r = rng.standard_normal(int(SR*(E("15") - S("15") + 0.6))); add(fx, bp(r, 1500, 7000) * 0.05 * np.minimum(1, np.linspace(0, 6, len(r))), S("15"))
    k = S("14")
    while k < S("19"): add(fx, clop(0.05, 900), k, 0.5); k += 0.18
    for i in range(5): add(fx, blip(84 + 2*i, 0.12, 0.08), S("17") - 0.05 + i*0.12, 0.4)
    k = S("19")
    while k < E("19"): add(fx, clop(0.06, 2400), k, 0.6); k += 0.07
    add(fx, stab([48, 55, 60, 64], 0.25, 1.0, 2.5), S("21") + 1.6)
    add(fx, blip(88, 0.3, 0.25), NOTE); add(fx, blip(93, 0.3, 0.3), NOTE + 0.13)
    add(fx, stab([45, 51], 0.35, 0.9, 3), NOTE + 0.9); add(fx, timp(0.4), NOTE + 0.9)
    add(fx, stab([60, 64, 67], 0.25, 0.8, 3), S("23") + 0.6)
    quiet = [(S("21") - 0.1, S("22") + 0.1)]; mend = S("24") + 0.2; fin = E("24") + 0.1
else:
    cuts = [S("03")-0.1, S("04")-0.05, S("05")-0.1, S("06")-0.05, S("07")-0.1, S("08")-0.05, S("09")-0.05, S("10")-0.1, S("11")-0.05, S("12")-0.1, S("13")-0.05, S("15")-0.1]
    for s in [S("02")-0.05] + cuts: add(fx, whoosh(), s - 0.06)
    for k, m in [("03", 72), ("05", 74), ("07", 76), ("10", 79)]: add(fx, blip(m, 0.22), S(k) - 0.1)
    for k in ["04", "06", "11"]: add(fx, stab([57, 63], 0.18, 0.4, 7), S(k) - 0.03)
    add(fx, stab([45, 52], 0.3, 0.6, 5), S("08") - 0.05); add(fx, timp(0.35), S("08") - 0.05)
    add(fx, stab([48, 55, 60, 64], 0.3, 1.2, 2), S("12") - 0.1); add(fx, timp(0.4), S("12") - 0.1)
    add(fx, stab([41, 48, 53], 0.3, 0.8, 3), S("13") - 0.05)
    for i in range(4): add(fx, blip(79 + 2*i, 0.18), S("14") + 0.2 + i*0.35, 0.3 + 0.13*i)
    for i in range(4): add(fx, blip(84 + i, 0.18), S("15") - 0.1 + 0.6 + i*0.3, 0.4)
    k = S("03") - 0.1
    while k < S("15") - 0.2: add(fx, clop(0.05, 250), k, 0.4); add(fx, clop(0.04, 300), k + 0.19, 0.6); k += 0.38
    quiet = [(S("08") - 0.1, S("08") + 0.6), (S("13") - 0.1, S("13") + 0.4)]; mend = S("15") - 0.1; fin = S("15")

# Musik
root = 55; beat = 0.5
prog = [[0,12,16,19],[-5,7,11,14],[-3,9,12,16],[-7,9,12,17]]
mel = [(16,1),(19,1),(21,2),(19,1),(16,1),(14,2),(12,1),(14,1),(16,1),(19,1),(16,4)]
t0 = 0; b = 0
while t0 < mend:
    ch = [root + x for x in prog[(b//2) % 4]]
    add(mus, note(mid(ch[0]), beat*2.2, 0.22, 1.8), t0)
    for q in range(4): add(mus, note(mid(ch[1+q%3]), beat*0.8, 0.05, 5), t0 + q*beat/2, 0.35 + 0.3*(q%2))
    b += 1; t0 += 2*beat
x = 4*beat
while x < mend - 0.3:
    for m, d in mel:
        if x >= mend - 0.3: break
        add(mus, note(mid(root+12+m), d*beat*0.9, 0.08, 3), x, 0.6); x += d*beat/2
g = np.ones(n)
for a, c in quiet: g[int(a*SR):int(c*SR)] = 0
g[int(mend*SR):] = 0
g = np.convolve(g, np.ones(441)/441, "same"); mus *= g[:, None]
for m in [55, 62, 67, 71, 74, 79]: add(mus, note(mid(m), 4.0, 0.12, 0.9), fin)
mus /= np.abs(mus).max() / 0.7; fx /= np.abs(fx).max() / 0.9
sr2, v = wf.read(vop); v = v.astype(float) / 32768; v = np.pad(v, (0, max(0, n - len(v))))[:n]
env = np.convolve(np.abs(v), np.ones(int(SR*0.25))/(SR*0.25), "same"); duck = 1 - 0.55*np.clip(env/0.03, 0, 1)
out = mus*0.38*duck[:, None] + fx*0.55 + np.stack([v, v], 1)
fo = int(SR*1.0); out[-fo:] *= np.linspace(1, 0, fo)[:, None]; out /= np.abs(out).max()/0.9
wf.write(outp, SR, (out*32767).astype(np.int16)); print("ok", T)
