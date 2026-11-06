# Musik für Hofgeschichten-Reels (Ableitung von music_hilfen.py).
# Aufruf: python3 music_reel.py zeiten.json out.wav MERKE_INDEX "AKZENT_INDIZES" ENDE_INDEX
import numpy as np, scipy.io.wavfile as wf, sys, json
SR=44100
L=json.load(open(sys.argv[1])); out_path=sys.argv[2]
mi=int(sys.argv[3]); acc=[int(x) for x in sys.argv[4].split(",") if x]; fi=int(sys.argv[5])
T=L[-1][0]+L[-1][1]+2.6; n=int(SR*T); out=np.zeros((n,2))
def add(sig,start,pan=0.5):
    i=int(start*SR); j=min(n,i+len(sig))
    if i>=n or j<=i or i<0: return
    out[i:j,0]+=sig[:j-i]*(1-pan); out[i:j,1]+=sig[:j-i]*pan
mid=lambda m:440*2**((m-69)/12)
def note(f,dur,amp,decay=3.0):
    t=np.arange(int(SR*dur))/SR
    w=np.sin(2*np.pi*f*t)+0.35*np.sin(2*np.pi*2*f*t)+0.1*np.sin(2*np.pi*3*f*t)
    return w*np.minimum(1,t/0.006)*np.exp(-t*decay)*amp
def clop(amp,f=240):
    t=np.arange(int(SR*0.09))/SR
    return (np.sin(2*np.pi*f*t)+0.4*np.sin(2*np.pi*f*2.3*t))*np.exp(-t*60)*amp
root=55; beat=0.75; merke=L[mi][0]; end_music=merke-0.1
prog=[[0,12,16,19],[-5,7,11,14],[-3,9,12,16],[-7,9,12,17]]
mel=[(16,1),(19,1),(21,2),(19,1),(16,1),(14,2),(12,1),(14,1),(16,1),(19,1),(16,4)]
t0=0;b=0
while t0<end_music:
    ch=[root+x for x in prog[(b//2)%4]]
    add(note(mid(ch[0]),beat*2.2,0.22,1.8),t0)
    for k in range(4):
        tt=t0+k*beat/2
        if tt<end_music: add(note(mid(ch[1+k%3]),beat*0.8,0.05,5),tt,0.35+0.3*(k%2))
    b+=1; t0+=2*beat
tt=4*beat
while tt<end_music-0.5:
    for m,d in mel:
        if tt>=end_music-0.4: break
        add(note(mid(root+12+m),d*beat*0.9,0.08,3),tt,0.6); tt+=d*beat/2
k=0
while k*0.8<end_music: add(clop(0.07,250 if k%2==0 else 300),k*0.8); k+=1
for j,i in enumerate(acc): add(note(mid(84+2*j),0.5,0.07,6),L[i][0]+0.1,0.5)
for m in [55,62,67,71,74,79]: add(note(mid(m),5.5,0.12,0.8),merke)
for i,m in enumerate([86,90,93,98]): add(note(mid(m),2.0,0.05,3),L[fi][0]+i*0.09,0.4+0.1*i)
for m in [67,71,74]: add(note(mid(m),6.0,0.05,0.4),L[fi][0])
fo=int(SR*1.4); out[-fo:]*=np.linspace(1,0,fo)[:,None]
out/=np.abs(out).max()/0.7
wf.write(out_path,SR,(out*32767).astype(np.int16)); print("ok",round(T,2))
