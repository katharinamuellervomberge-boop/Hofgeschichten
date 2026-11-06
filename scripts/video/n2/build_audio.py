import sys,json,subprocess,numpy as np,scipy.io.wavfile as wf
sys.path.insert(0,'/home/claude/r10'); from rec import rec
R='/home/claude/hofgeschichten/src/video/reels/'
CFG={
 1:('c01-traversale-reel','traversale','f0',['c1','d1'],'g2'),
 2:('c02-faul-reel','faul','f1',['b1','d1','e1'],'g2'),
 3:('c03-uebersetzer-reel','uebersetzer','f1',['b1','c1','d1','e1'],'f2'),
 4:('c04-mythen-reel','mythen','e1',['b0','c0','d0'],'e1'),
 5:('c05-angaloppieren-reel','angaloppieren','f0',['c0','d0','e0'],'g2'),
 6:('c06-figuren-reel','figuren','e1',['b1','c1','d0'],'e3'),
 7:('c07-challenge-reel','challenge','e1',['d1'],'e2'),
 8:('c08-fuehren-reel','fuehren','f1',['b1','c1','c2','d1'],'f2'),
 9:('c09-sitz-reel','sitz','e1',['b1','c1','d1'],'f2'),
 10:('c10-gangart-reel','gangart','d0',['b1','c1'],'e1'),
}
CUTS={7:[(10.35,20.4)],10:[(3.26,4.4),(4.30,4.4),(5.26,4.4)]}
SR=44100
def sh(c): subprocess.run(c,shell=True,check=True,stderr=subprocess.DEVNULL)
for n in [int(x) for x in sys.argv[1:]] or CFG:
    f,comp,mi,acc,fi=CFG[n]; A=f'/home/claude/r10/aud/{comp}'
    lines=rec(R+f+'.tsx'); ids=[l[0] for l in lines]
    z=[[round(a+0.4,3),round(b-a,3)] for _,a,b in lines]
    json.dump(z,open(A+'-zeiten.json','w'))
    # Stimme (mit eingefügten Pausen)
    src=f'/home/claude/r10/R{n}.mp3'
    if n in CUTS:
        parts=[];prev=0;fl=[]
        for i,(c,g) in enumerate(CUTS[n]):
            fl.append(f'[0:a]atrim={prev}:{c},asetpts=PTS-STARTPTS[p{i}];aevalsrc=0|0:d={g}:s=44100[s{i}]')
            parts+= [f'[p{i}]',f'[s{i}]']; prev=c
        k=len(CUTS[n]); fl.append(f'[0:a]atrim=start={prev},asetpts=PTS-STARTPTS[p{k}]'); parts.append(f'[p{k}]')
        sh(f'ffmpeg -y -i {src} -filter_complex "{";".join(fl)};{"".join(parts)}concat=n={len(parts)}:v=0:a=1[o]" -map "[o]" -ar 44100 -ac 2 {A}-voice.wav')
    else:
        sh(f'ffmpeg -y -i {src} -ar 44100 -ac 2 {A}-voice.wav')
    idx=lambda i: ids.index(i)
    sh(f'python3 /home/claude/work/music_reel.py {A}-zeiten.json {A}-music.wav {idx(mi)} "{",".join(str(idx(a)) for a in acc)}" {idx(fi)}')
    if n==10:
        sr,m=wf.read(A+'-music.wav'); m=m.astype(np.float64)
        G=4.4; cuts=[3.26,4.30,5.26]; tot=len(m)
        env=np.ones(tot); cl=np.zeros(tot)
        PAT={'schritt':(1.12,[0,.28,.56,.84]),'trab':(0.72,[0,.36]),'galopp':(0.78,[0,.14,.28])}
        rng=np.random.default_rng(3)
        def clop(amp,f):
            t=np.arange(int(sr*0.12))/sr
            nz=rng.standard_normal(len(t))
            return (0.7*np.sin(2*np.pi*f*t)*np.exp(-t*45)+0.5*nz*np.exp(-t*120)+0.3*np.sin(2*np.pi*f*2.7*t)*np.exp(-t*70))*amp
        def put(sig,t0):
            i=int(t0*sr); j=min(tot,i+len(sig))
            if 0<=i<tot: cl[i:j]+=sig[:j-i]
        def play(g,a,d,amp):
            cyc,b=PAT[g]; t=0;k=0
            while t<d:
                for j,bb in enumerate(b):
                    tt=t+bb
                    if tt<d:
                        put(clop(amp*(1.0 if not(g=='galopp' and j==1) else 1.25),180+40*((j+k)%3)),a+tt)
                        if g=='trab': put(clop(amp*0.8,210),a+tt+0.018)
                t+=cyc;k+=1
        for i,(c,g) in enumerate(zip(cuts,['trab','galopp','schritt'])):
            a=c+i*G+0.4+0.15; d=G-0.35; play(g,a,d,0.95)
            i0=int((a-0.3)*sr); i1=int((a+d+0.2)*sr); env[i0:i1]=0.12
        S=lambda id: lines[idx(id)][1]+0.4
        play('schritt',S('d1'),S('d2')-0.1-S('d1'),0.45); play('trab',S('d2'),S('d4')-0.1-S('d2'),0.45); play('galopp',S('d4'),S('e1')-S('d4')-0.1,0.45)
        from scipy.ndimage import uniform_filter1d
        env=uniform_filter1d(env,int(0.15*sr))
        m=m*env[:,None]+cl[:,None]*32767*0.5
        wf.write(A+'-music.wav',sr,np.clip(m,-32767,32767).astype(np.int16))
    sh(f'ffmpeg -y -i {A}-music.wav -i {A}-voice.wav -filter_complex "[0:a]volume=0.32[m];[1:a]adelay=400|400[v];[m][v]amix=inputs=2:normalize=0:duration=longest,loudnorm=I=-15:TP=-1.5:LRA=11[o]" -map "[o]" -ar 44100 {A}-mix.wav')
    print(n,comp,'ok')
