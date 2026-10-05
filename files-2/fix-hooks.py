import glob,os
p='core/engine.js';s=open(p).read()
if 'return term(id,x)' not in s: s=s.replace('if(x.actors)return seq(id,x);','if(x.actors)return seq(id,x);if(x.cmds)return term(id,x);',1)
if 'return asb(id,x)' not in s: s=s.replace('if(x.cmds)return term(id,x);','if(x.cmds)return term(id,x);if(x.layers)return asb(id,x);',1)
open(p,'w').write(s)
for f in glob.glob('chapters/ch*.html'):
    t=open(f).read()
    if 'viz-term.js' not in t: t=t.replace('viz-seq.js"></script>','viz-seq.js"></script><script src="../core/viz-term.js"></script>',1)
    if 'viz-build.js' not in t: t=t.replace('viz-term.js"></script>','viz-term.js"></script><script src="../core/viz-build.js"></script>',1)
    open(f,'w').write(t)
print("hooks ok:",'return term(id,x)' in s,'return asb(id,x)' in s)
