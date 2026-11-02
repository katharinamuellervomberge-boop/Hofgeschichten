import json, re, subprocess, sys
ROOT = "/home/claude/katharinamuellervomberge-boop/hofgeschichten/src/video/lern/"
LINES = json.load(open(ROOT + "lines.json"))
MAP = {"leichttraben-komplett": "a4", "leichter-sitz": "a1", "pferd-lenken": "a2", "innen-aussen": "a5", "anreiten-durchparieren": "a3"}
VO = 0.4

def speech(f):
    out = subprocess.run(["ffmpeg", "-i", f, "-af", "silencedetect=noise=-38dB:d=0.22", "-f", "null", "-"], capture_output=True, text=True).stderr
    dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f], capture_output=True, text=True).stdout)
    ss = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", out)]
    se = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", out)]
    segs, cur = [], 0.0
    for a, b in zip(ss, se):
        if a > cur + 0.05: segs.append([cur, a])
        cur = b
    if dur > cur + 0.05: segs.append([cur, dur])
    return segs, dur

def weight(text):
    return len(re.sub(r"[^\wäöüÄÖÜß]", "", text)) + 6 * len(re.findall(r"[.!?:–]", text))

result = {}
for slug, aud in MAP.items():
    segs, dur = speech(f"/home/claude/lv/aud/{aud}.mp3")
    lines = LINES[slug]
    n, m = len(lines), len(segs)
    W = [weight(t) for _, t in lines]
    speechT = sum(b - a for a, b in segs)
    exp = [w / sum(W) * speechT for w in W]
    INF = 1e18
    # dp[i][j]: first i lines use first j segs
    dp = [[INF] * (m + 1) for _ in range(n + 1)]; bk = [[0] * (m + 1) for _ in range(n + 1)]
    dp[0][0] = 0
    for i in range(1, n + 1):
        for j in range(i, m - (n - i) + 1):
            for k in range(i - 1, j):
                if dp[i - 1][k] >= INF: continue
                d = sum(b - a for a, b in segs[k:j])
                gap = segs[j][0] - segs[j - 1][1] if j < m else 1.0
                c = dp[i - 1][k] + (d - exp[i - 1]) ** 2 / max(exp[i - 1], 1) - 2.5 * min(gap, 1.2)
                if c < dp[i][j]: dp[i][j], bk[i][j] = c, k
    cuts, j = [], m
    for i in range(n, 0, -1):
        k = bk[i][j]; cuts.append((k, j)); j = k
    cuts.reverse()
    out = []
    for (k, j), (lid, text) in zip(cuts, lines):
        ls = segs[k:j]
        # caption chunks at sentence-ish punctuation
        parts = [p.strip() for p in re.split(r"(?<=[.!?])\s+|\s+–\s+(?=\S)", text) if p.strip()]
        # keep dashes visible: rebuild with dash where split
        chunks = []
        rest = text
        for p in parts:
            idx = rest.find(p)
            chunks.append(p); rest = rest[idx + len(p):]
        # merge tiny chunks
        merged = []
        for c in chunks:
            if merged and (len(c) < 18 or len(merged[-1]) < 18) and len(merged[-1]) + len(c) < 70: merged[-1] += (" – " if not merged[-1].endswith((".", "!", "?", ":")) else " ") + c
            else: merged.append(c)
        # map chunk char positions onto speech time of this line
        tot = sum(b - a for a, b in ls); cw = [weight(c) for c in merged]; acc = 0; ch = []
        def at(x):  # speech-time x → absolute
            for a, b in ls:
                if x <= b - a: return a + x
                x -= b - a
            return ls[-1][1]
        for c, w in zip(merged, cw):
            s = at(acc / sum(cw) * tot); acc += w; e = at(acc / sum(cw) * tot)
            ch.append({"text": c, "start": round(s + VO, 2), "end": round(e + VO, 2)})
        out.append({"id": lid, "start": round(ls[0][0] + VO, 2), "end": round(ls[-1][1] + VO, 2), "chunks": ch, "nseg": j - k})
    result[slug] = {"audio": aud, "total": round(dur + VO + 2.2, 2), "lines": out}
    print(slug, aud, f"{dur:.1f}s", [(l["id"], l["start"], l["end"], l["nseg"]) for l in out])
json.dump(result, open(ROOT + "timing.json", "w"), ensure_ascii=False, indent=1)
