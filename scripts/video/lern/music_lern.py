# Ruhige Lernvideo-Musik (D-Dur, Zupfklänge + Fläche), unter der Stimme abgesenkt.
# Aufruf: python3 music_lern.py <slug> <out_mix.wav>
import json, subprocess, sys
import numpy as np, scipy.io.wavfile as wf
SR = 44100
slug, out_path = sys.argv[1], sys.argv[2]
tm = json.load(open("/home/claude/katharinamuellervomberge-boop/hofgeschichten/src/video/lern/timing.json"))[slug]
T = tm["total"]; n = int(SR * T)
mus = np.zeros((n, 2))
mid = lambda m: 440 * 2 ** ((m - 69) / 12)
def add(sig, start, pan=0.5, g=1.0):
    i = int(start * SR); j = min(n, i + len(sig))
    if i >= n or j <= i: return
    mus[i:j, 0] += sig[: j - i] * (1 - pan) * g; mus[i:j, 1] += sig[: j - i] * pan * g
def note(f, dur, amp, decay=3.0):
    t = np.arange(int(SR * dur)) / SR
    w = np.sin(2 * np.pi * f * t) + 0.3 * np.sin(2 * np.pi * 2 * f * t) + 0.08 * np.sin(2 * np.pi * 3 * f * t)
    return w * np.minimum(1, t / 0.008) * np.exp(-t * decay) * amp
def pad(f, dur, amp):
    t = np.arange(int(SR * dur)) / SR
    w = sum(np.sin(2 * np.pi * f * k * t + k) / k ** 1.5 for k in (1, 2, 3))
    env = np.minimum(1, t / 1.2) * np.minimum(1, (dur - t) / 1.2)
    return w * env * amp
root = 50; beat = 0.75
prog = [[0, 7, 12, 16], [-5, 7, 11, 14], [-3, 9, 12, 16], [-7, 9, 12, 17]]
t0 = 0.0; b = 0
end = T - 1.5
while t0 < end:
    ch = [root + x for x in prog[b % 4]]
    for m in ch[1:]: add(pad(mid(m), beat * 4 + 1.0, 0.035), t0, 0.5)
    add(note(mid(ch[0] - 12), beat * 4, 0.16, 1.2), t0)
    for k in range(8):
        tt = t0 + k * beat / 2
        if tt < end and k % 2 == 0 or (k == 5):
            add(note(mid(ch[1 + (k // 2) % 3] + 12), beat, 0.045, 4.5), tt, 0.3 + 0.4 * ((k // 2) % 2))
    b += 1; t0 += beat * 4
# Glöckchen zum Merksatz
mk = [l for l in tm["lines"] if l["id"] == "merke"][0]["start"]
for i, m in enumerate([74, 78, 81, 86]): add(note(mid(m), 2.0, 0.05, 2.5), mk - 0.2 + i * 0.1, 0.4 + 0.1 * i)
fo = int(SR * 2.0); mus[-fo:] *= np.linspace(1, 0, fo)[:, None]
mus /= np.abs(mus).max() / 0.7
# Absenken während gesprochen wird
duck = np.ones(n)
for l in tm["lines"]:
    a = int((l["start"] - 0.15) * SR); e = int((l["end"] + 0.1) * SR)
    duck[max(0, a):min(n, e)] = 0.45
k = int(SR * 0.25); duck = np.convolve(duck, np.ones(k) / k, mode="same")
mus *= duck[:, None]
wf.write("/home/claude/lv/m.wav", SR, (mus * 32767).astype(np.int16))
aud = f"/home/claude/lv/aud/{tm['audio']}.mp3"
subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", "/home/claude/lv/m.wav", "-i", aud, "-filter_complex",
    "[0:a]volume=0.30[m];[1:a]adelay=400|400,volume=1.0[v];[m][v]amix=inputs=2:normalize=0:duration=first,loudnorm=I=-16:TP=-1.5[o]",
    "-map", "[o]", "-ar", "44100", out_path], check=True)
print("ok", slug, round(T, 2))
