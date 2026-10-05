import re,glob
deep=sorted(int(re.search(r'ch(\d+)',f).group(1)) for f in glob.glob('chapters/ch*.html') if re.search(r'id="deep-\d+"',open(f).read()))
p='core/course.js';s=open(p).read()
s=re.sub(r'const STATUS=\{[^}]*\};','const STATUS={'+','.join(f'{n}:"deep"' for n in deep)+'};',s)
open(p,'w').write(s);print("deep chapters:",deep)
