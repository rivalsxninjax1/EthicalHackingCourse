const fs=require('fs'),cp=require('child_process');
for(const f of fs.readdirSync('chapters').filter(x=>/^ch\d+\.html$/.test(x)).sort()){
  const m=fs.readFileSync('chapters/'+f,'utf8').match(/<script id="deep-\d+">([\s\S]*?)<\/script>/);
  if(!m){console.log(f,'outline');continue}
  const tmp='tools/_check_'+f+'.js';fs.writeFileSync(tmp,m[1]);
  const r=cp.spawnSync('node',['--check',tmp],{encoding:'utf8'});
  console.log(f,r.status===0?'OK':'ERROR\n'+r.stderr.split('\n').slice(0,6).join('\n'));
  fs.unlinkSync(tmp);
}
