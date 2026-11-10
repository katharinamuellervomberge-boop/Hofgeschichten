import sys
comp, total, render, file = sys.argv[1:5]
p='/home/claude/hofgeschichten/scripts/video/reel-harness.tsx'; s=open(p).read()
imp=f'import {{ {total}, {render} }} from "@/video/reels/{file}";'
if imp not in s:
    s=s.replace('import { BEIN_TOTAL, renderBein } from "@/video/reels/bein-reel";','import { BEIN_TOTAL, renderBein } from "@/video/reels/bein-reel";\n'+imp)
    s=s.replace('  bein: { total: () => BEIN_TOTAL, render: renderBein },',f'  bein: {{ total: () => BEIN_TOTAL, render: renderBein }},\n  "{comp}": {{ total: () => {total}, render: {render} }},')
    open(p,'w').write(s)
print("ok")
