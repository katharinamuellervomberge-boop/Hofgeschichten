import sys,json,subprocess
sys.path.insert(0,'/home/claude/hofgeschichten/scripts/video/n2'); from rec import rec
R='/home/claude/hofgeschichten/src/video/reels/'; M='/home/claude/hofgeschichten/scripts/video/n2/music_reel.py'
CFG={1:('rf1-aussitzen-reel','rf-aussitzen','f1',['c0','d0','e0'],'g1'),
     2:('rf2-ferse-reel','rf-ferse','f1',['c0','d0','e0'],'g1'),
     3:('rf3-trense-reel','rf-trense','g1',['c0','d0','e0'],'h1'),
     4:('rf4-kleeblatt-reel','rf-kleeblatt','f1',['b1','c0','d1','e1'],'g1')}
sh=lambda c: subprocess.run(c,shell=True,check=True,stderr=subprocess.DEVNULL)
for n,(f,comp,mi,acc,fi) in [(k,CFG[k]) for k in ([int(x) for x in sys.argv[1:]] or CFG)]:
    A=f'/home/claude/work/aud/{comp}'; lines=rec(R+f+'.tsx'); ids=[l[0] for l in lines]
    json.dump([[round(a+0.4,3),round(b-a,3)] for _,a,b in lines],open(A+'-zeiten.json','w'))
    sh(f'ffmpeg -y -i /home/claude/work/rf{n}.mp3 -ar 44100 -ac 2 {A}-voice.wav')
    sh(f'python3 {M} {A}-zeiten.json {A}-music.wav {ids.index(mi)} "{",".join(str(ids.index(a)) for a in acc)}" {ids.index(fi)}')
    sh(f'ffmpeg -y -i {A}-music.wav -i {A}-voice.wav -filter_complex "[0:a]volume=0.32[m];[1:a]adelay=400|400[v];[m][v]amix=inputs=2:normalize=0:duration=longest,loudnorm=I=-15:TP=-1.5:LRA=11[o]" -map "[o]" -ar 44100 {A}-mix.wav')
    print(n,comp,'ok')
