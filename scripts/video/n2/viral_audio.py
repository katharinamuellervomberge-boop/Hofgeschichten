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
elif reel == "pov2":
    # Tierdoku (17.11. abends): REC-Piep, Zeitlupe (Musik weg), Alarm, Entwarnung, Wah-wah
    add(fx, blip(96, 0.08, 0.06), S("01") - 0.25, 0.5)
    for k in ["04", "07", "10", "11"]: add(fx, whoosh(0.3), S(k) - 0.2)
    add(fx, blip(76, 0.2), S("03") + 0.05); add(fx, blip(81, 0.2), S("03") + 0.65)
    r = rng.standard_normal(int(SR*3.0)); env = np.sin(np.linspace(0, np.pi, len(r)))
    add(fx, bp(r, 250, 2200) * 0.16 * env, S("06") - 0.2, 0.4); add(fx, bp(r, 250, 2200) * 0.16 * env, S("06") - 0.15, 0.6)
    add(fx, stab([41, 47, 53], 0.4, 0.9, 3), S("07") + 0.15); add(fx, timp(0.45), S("07") + 0.15)
    for i in range(4): add(fx, note(mid(84 if i % 2 == 0 else 79), 0.22, 0.12, 6), S("07") + 0.5 + i*0.28, 0.5)
    for i in range(3): add(fx, clop(0.05, 600), S("08") + 0.8 + i*0.32, 0.5)
    add(fx, blip(79, 0.2), S("09") + 0.05); add(fx, blip(84, 0.25), S("09") + 0.22)
    for i, m in enumerate([67, 66, 65, 61]): add(fx, note(mid(m), 0.45 if i < 3 else 0.9, 0.14, 3 if i < 3 else 1.5), S("10") + 0.4 + i*0.4, 0.5)
    add(fx, blip(84, 0.2), S("11")); add(fx, blip(88, 0.2), S("11") + 0.15)
    quiet = [(S("04") - 0.05, S("07") + 0.1)]
    mend = S("11") + 1.0; fin = S("11")
elif reel == "rl2":
    for k in ["03", "06", "09", "12"]: add(fx, whoosh(0.3), S(k) - 0.15)
    for k in ["03", "06", "09"]: add(fx, stab([57, 64], 0.3, 0.4, 6), S(k) + 0.02)
    for i in range(4): add(fx, blip(76 + 2*i, 0.12, 0.1), S("04") + i*0.08, 0.3 + 0.1*i)
    for i in range(8): add(fx, blip(80 + (i % 4)*2, 0.12, 0.1), S("05") + (i % 4)*0.08 + (i // 4)*0.12, 0.3 + 0.05*i)
    tb = tt(0.5); add(fx, np.sin(2*np.pi*np.cumsum(260*(1 + 1.2*np.exp(-tb*8)))/SR) * np.exp(-tb*5) * 0.2, S("07") + 0.05, 0.5)
    for i in range(4): add(fx, blip(84, 0.08, 0.08), S("08") + 0.2 + i*0.17, 0.3 + 0.13*i)
    add(fx, blip(76, 0.2), S("10"), 0.4)
    for i in range(4): add(fx, blip(79, 0.12), S("11") + i*0.15, 0.6)
    add(fx, stab([60, 67], 0.25, 0.3, 6), S("11") + 1.0); add(fx, blip(91, 0.15), S("11") + 1.1)
    add(fx, blip(84, 0.2), S("12") + 0.3); add(fx, blip(88, 0.2), S("12") + 0.45)
    quiet = []
    mend = S("12") + 1.2; fin = S("12")
elif reel in ("pov", "rlsaetze"):
    # Funny-Reels ohne Sprecher (18.11.2026)
    for k in ["02", "03", "04", "05"]: add(fx, whoosh(0.3), S(k) - 0.2)
    if reel == "pov":
        r = rng.standard_normal(int(SR*2.2)); env = np.sin(np.linspace(0, np.pi, len(r)))
        add(fx, bp(r, 300, 2500) * 0.18 * env, S("02"), 0.3); add(fx, bp(r, 300, 2500) * 0.18 * env, S("02") + 0.05, 0.7)
        add(fx, stab([41, 47, 53], 0.4, 0.9, 3), S("03")); add(fx, timp(0.45), S("03"))
        for i, m in enumerate([40, 39, 36]): add(fx, stab([m, m + 6], 0.3, 0.5, 5), S("03") + 0.55 + i*0.38); add(fx, timp(0.3), S("03") + 0.55 + i*0.38)
        for i, m in enumerate([67, 66, 65, 61]): add(fx, note(mid(m), 0.5 if i < 3 else 1.0, 0.16, 3 if i < 3 else 1.5), S("04") + 0.3 + i*0.42, 0.5)
        add(fx, blip(84, 0.2), S("05")); add(fx, blip(88, 0.2), S("05") + 0.15)
        quiet = [(S("03") - 0.05, S("04") - 0.1)]
    else:
        add(fx, stab([57, 64], 0.3, 0.4, 6), S("02") + 0.05)
        for i, m in enumerate([79, 76, 72]): add(fx, blip(m, 0.18, 0.12), S("02") + 1.4 + i*0.2, 0.7)
        add(fx, stab([60], 0.25, 0.3, 6), S("03") + 0.05)
        t0 = S("03") + 1.0; add(fx, note(mid(96), 1.4, 0.25, 2.2), t0, 0.5); add(fx, note(mid(103), 1.2, 0.12, 2.6), t0 + 0.05, 0.5)
        r = rng.standard_normal(int(SR*0.35)); add(fx, bp(r, 3000, 9000) * 0.12 * np.exp(-np.linspace(0, 6, len(r))), t0, 0.5)
        add(fx, stab([55, 62], 0.3, 0.4, 6), S("04") + 0.05)
        add(fx, blip(76, 0.2), S("04") + 0.8, 0.4); add(fx, blip(79, 0.2), S("04") + 1.3, 0.6)
        tb = tt(0.5); add(fx, np.sin(2*np.pi*np.cumsum(220*(1 + 1.5*np.exp(-tb*8))*(1 + 0.2*np.sin(tb*60)))/SR) * np.exp(-tb*5) * 0.2, S("04") + 1.85, 0.5)
        add(fx, blip(84, 0.2), S("05") + 0.3); add(fx, blip(88, 0.2), S("05") + 0.45)
        quiet = []
    mend = S("05") + 1.2; fin = S("05") + 0.3
elif reel in ("mathe", "aussenschulter", "schlaf", "handseite", "phasen", "festhalten", "sicht", "leichttraben", "haenger", "kneten", "pferdesicht", "tempo", "anlehnung", "tempo-en", "anlehnung-en"):
    # Tagesset 01 (15.11.2026): Whoosh an Szenenschnitten, Blips/Stabs an Pointen
    C = {
        "mathe": dict(cut=["03","07","11","15","19","23","24"], blip=[("04",72),("08",74),("12",76),("16",79)], ok=["06","10","14","18"], stab=["23"], quiet=[("23",0.0,0.5)], mend="25", fin="25"),
        "aussenschulter": dict(cut=["05","08","13","15"], blip=[("04",76),("06",72),("07",72),("09",79),("10",81),("11",83),("12",84)], ok=[], stab=["05"], quiet=[], mend="16", fin="16"),
        "schlaf": dict(cut=["03","08","10","12","14","16"], blip=[("04",79),("07",76),("09",84),("18",84),("20",86)], ok=[], stab=["11","15"], quiet=[("10",-0.1,1.3)], mend="21", fin="21"),
        "phasen": dict(cut=["02","06","10","14","19","24"], blip=[("05",79),("09",70),("12",67),("13",65),("23",86)], ok=[], stab=["17","24"], quiet=[("16",-0.2,1.6)], mend="25", fin="25"),
        "festhalten": dict(cut=["03","07","08","13","16","18"], blip=[("02",72),("05",70),("09",79),("10",81),("11",83),("12",86),("14",84)], ok=[], stab=["07"], quiet=[], mend="18", fin="18"),
        "sicht": dict(cut=["03","05","08","10","11","13","15"], blip=[("02",72),("06",84),("09",72),("12",81),("14",84)], ok=[], stab=["07"], quiet=[], mend="15", fin="15"),
        "leichttraben": dict(cut=["02","03","04","07","14","16","20"], blip=[("06",79),("09",84),("10",79),("11",84),("12",79),("17",72),("19",86)], ok=[], stab=["03"], quiet=[], mend="20", fin="20"),
        "haenger": dict(cut=["03","07","11","13","16","17"], blip=[("02",72),("04",67),("06",79),("12",70),("15",70),("18",84)], ok=[], stab=[], quiet=[], mend="18", fin="18"),
        "kneten": dict(cut=["04","06","07","11","15","17"], blip=[("02",72),("05",76),("08",79),("13",72),("14",79),("18",84)], ok=[], stab=["15"], quiet=[], mend="18", fin="18"),
        "pferdesicht": dict(cut=["03","07","10","12","14"], blip=[("02",72),("04",79),("05",70),("06",76),("08",79),("11",84),("13",76),("15",84)], ok=[], stab=[], quiet=[], mend="15", fin="15"),
        "tempo": dict(cut=["05","10","13","23","25"], blip=[("04",76),("08",72),("09",79),("11",79),("15",72),("16",74),("17",76),("18",79),("19",84),("22",84),("24",79),("26",84)], ok=[], stab=["03"], quiet=[], mend="26", fin="26"),
        "tempo-en": dict(cut=["05","10","13","23","25"], blip=[("04",76),("08",72),("09",79),("11",79),("15",72),("16",74),("17",76),("18",79),("19",84),("22",84),("24",79),("26",84)], ok=[], stab=["03"], quiet=[], mend="26", fin="26"),
        "anlehnung": dict(cut=["04","05","07","09","11","14","18","20","21","23"], blip=[("03",76),("06",79),("08",72),("10",84),("13",79),("15",72),("16",76),("17",79),("19",84),("22",88)], ok=[], stab=["04","09"], quiet=[], mend="23", fin="23"),
        "anlehnung-en": dict(cut=["04","05","07","09","11","14","18","20","21","23"], blip=[("03",76),("06",79),("08",72),("10",84),("13",79),("15",72),("16",76),("17",79),("19",84),("22",88)], ok=[], stab=["04","09"], quiet=[], mend="23", fin="23"),
        "handseite": dict(cut=["04","05","09","11","13","15"], blip=[("02",84),("07",79),("08",84),("09",76),("10",81),("12",84)], ok=[], stab=[], quiet=[], mend="15", fin="15"),
    }[reel]
    for k in C["cut"]: add(fx, whoosh(0.28), S(k) - 0.18)
    for k, m in C["blip"]: add(fx, blip(m, 0.2), S(k) - 0.02, 0.6)
    for k in C["ok"]: add(fx, blip(84, 0.18, 0.1), E(k) - 0.4, 0.4); add(fx, blip(91, 0.18, 0.15), E(k) - 0.28, 0.4)
    for k in C["stab"]: add(fx, stab([45, 52], 0.3, 0.6, 5), S(k) - 0.05); add(fx, timp(0.35), S(k) - 0.05)
    if reel == "haenger":
        # Hänger 17.11.2026: Markierungen Rampe/Kante/Schatten, hohle Huftritte auf der Rampe
        d8 = E("08") - S("08")
        for i in range(3): add(fx, blip(76 + 3*i, 0.16), S("08") + 0.05 + i*d8/3, 0.3 + 0.2*i)
        for i in range(3): add(fx, clop(0.16, 150), S("10") + 0.9 + i*0.42, 0.55); add(fx, clop(0.06, 95), S("10") + 0.93 + i*0.42, 0.55)
        for i, st in enumerate([S("13") + 0.4, S("13") + 1.0, S("14") + 2.0]): add(fx, blip(84 + 2*i, 0.14, 0.1), st, 0.4)
    if reel == "kneten":
        # Schwamm-Drücken: zwei weiche Quietsch-Blips
        for st in [S("09") + 0.75, S("10") - 0.05]: add(fx, blip(88, 0.12, 0.14), st, 0.6)
    quiet = [(S(k) + a, S(k) + b) for k, a, b in C["quiet"]]; mend = S(C["mend"]) + 0.2; fin = E(C["fin"]) + 0.1
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
