import re,sys,json
def rec(path):
    s=open(path).read()
    g=re.search(r"export const (?:CH|GA)_GAP = ([\d.]+)",s)
    G=float(g.group(1)) if g else 0
    i=s.index("const REC"); s=s[i:s.index("\n];",i)]
    out=[]
    for m in re.finditer(r'\["(\w+)",\s*"((?:[^"\\]|\\.)*)",\s*([^,\]]+),\s*([^\]]+)\]',s):
        a=eval(m.group(3).replace("G",str(G)));b=eval(m.group(4).replace("G",str(G)))
        out.append((m.group(1),round(a,3),round(b,3)))
    return out
if __name__=="__main__":
    for f in sys.argv[1:]:
        print(f,[x[0] for x in rec(f)])
