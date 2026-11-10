# Treibende, lizenzfreie Musik für das Werbevideo (120 BPM, selbst erzeugt).
# Aufruf: python3 music_promo.py out.wav
import numpy as np, scipy.io.wavfile as wf, sys

SR = 44100
T = 16.9
n = int(SR * T)
out = np.zeros((n, 2))
rng = np.random.default_rng(7)
BEAT = 0.5

def add(sig, start, pan=0.5, gain=1.0):
    i = int(start * SR)
    if i >= n or i < 0:
        return
    j = min(n, i + len(sig))
    out[i:j, 0] += sig[: j - i] * (1 - pan) * gain * 2
    out[i:j, 1] += sig[: j - i] * pan * gain * 2

mid = lambda m: 440 * 2 ** ((m - 69) / 12)
tt = lambda d: np.arange(int(SR * d)) / SR

def kick(a=0.9):
    t = tt(0.32)
    f = 45 + 95 * np.exp(-t * 28)
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-t * 9) * a

def clap(a=0.35):
    t = tt(0.22)
    x = rng.standard_normal(len(t))
    x = np.diff(np.concatenate([[0], x]))
    env = np.exp(-t * 22) + 0.6 * np.exp(-((t - 0.012) ** 2) / 0.00002)
    return x * env * a

def hat(a=0.10, d=0.05):
    t = tt(d)
    x = rng.standard_normal(len(t))
    x = np.diff(np.diff(np.concatenate([[0, 0], x])))
    return x * np.exp(-t * 70) * a

def pluck(f, d=0.35, a=0.12):
    t = tt(d)
    w = np.sign(np.sin(2 * np.pi * f * t)) * 0.35 + np.sin(2 * np.pi * f * t) + 0.3 * np.sin(4 * np.pi * f * t)
    return w * np.exp(-t * 9) * np.minimum(1, t / 0.004) * a

def bass(f, d, a=0.32):
    t = tt(d)
    w = np.sin(2 * np.pi * f * t) + 0.45 * np.sin(4 * np.pi * f * t) + 0.18 * np.sin(6 * np.pi * f * t)
    env = np.minimum(1, t / 0.01) * np.exp(-t * 2.2)
    return w * env * a

def pad(fs, d, a=0.05):
    t = tt(d)
    w = sum(np.sin(2 * np.pi * f * t) + 0.3 * np.sin(2 * np.pi * f * 2.003 * t) for f in fs)
    env = np.minimum(1, t / 0.4) * np.minimum(1, (d - t) / 0.4)
    return w * env * a

def riser(d, a=0.25):
    t = tt(d)
    x = rng.standard_normal(len(t))
    x = np.diff(np.concatenate([[0], x])) * (t / d) ** 2
    tone = np.sin(2 * np.pi * np.cumsum(200 + 1400 * (t / d) ** 2) / SR) * 0.3 * (t / d) ** 2
    return (x * 0.6 + tone) * a

def impact(a=0.8):
    t = tt(1.6)
    boom = np.sin(2 * np.pi * np.cumsum(30 + 60 * np.exp(-t * 6)) / SR) * np.exp(-t * 2.5)
    x = rng.standard_normal(len(t))
    crash = np.diff(np.concatenate([[0], x])) * np.exp(-t * 3) * 0.35
    return (boom + crash) * a

def whoosh(a=0.14):
    t = tt(0.35)
    x = rng.standard_normal(len(t))
    env = np.sin(np.pi * t / 0.35) ** 2
    return np.diff(np.concatenate([[0], x])) * env * a

# Akkorde je Takt (2 s): Am – F – C – G (Grundtöne)
prog = [(57, [69, 72, 76]), (53, [65, 69, 72]), (48, [67, 72, 76]), (55, [67, 71, 74])]

def chord_at(t):
    return prog[int(t // 2.0) % 4]

FULL = [(0.0, 9.8), (10.62, 15.6)]
full = lambda t: any(a <= t < b for a, b in FULL)
b = 0
while b * BEAT < 15.6:
    t = b * BEAT
    root, ch = chord_at(t)
    hook = t < 3.62
    if full(t):
        add(kick(0.8 if hook else 0.95), t)
        if b % 2 == 1: add(clap(0.3 if hook else 0.35), t, 0.5)
        add(hat(0.08), t + BEAT / 2, 0.65)
        add(hat(0.05, 0.03), t + BEAT / 4, 0.35)
        if not hook: add(bass(mid(root - 12), BEAT * 0.9), t + (BEAT / 2 if b % 2 == 0 else 0), 0.5)
    for k in range(2):
        m = ch[(b * 2 + k) % 3] + (12 if t > 10.6 else 0)
        add(pluck(mid(m), a=0.1), t + k * BEAT / 2, 0.3 + 0.4 * k)
    b += 1
# Hook-Stopp auf "NICHT WEITER?"
add(impact(0.5), 2.55)
# Rider-Lab-Aufbau: Wirbel + Riser
rt = 9.8; step = 0.125
while rt < 10.6:
    add(clap(0.1 + 0.25 * (rt - 9.8) / 0.8), rt, 0.5); rt += step
add(riser(0.85, 0.3), 9.78)
for c, a in [(3.62, 0.8), (6.86, 0.7), (10.62, 1.0), (13.36, 0.8)]:
    add(impact(a), c)
for c in [4.86, 8.28, 11.74, 12.24, 12.74]:
    add(whoosh(), c - 0.15, 0.5)
add(pad([mid(57), mid(60), mid(64), mid(69)], 2.4, 0.07), 14.4)
add(pluck(mid(81), 1.2, 0.14), 14.5)
fo = int(SR * 1.0)
out[-fo:] *= np.linspace(1, 0, fo)[:, None]
out = np.tanh(out * 0.9)
out /= np.abs(out).max() / 0.85
wf.write(sys.argv[1], SR, (out * 32767).astype(np.int16))
print("ok", T)
