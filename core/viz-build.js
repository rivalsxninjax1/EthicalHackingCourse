/* Attack Surface Builder. viz item {t, layers:[{n, items:[[label,note]]}]}. Placeholders {o} organisation, {d} domain.
   Pure templating in the browser: it never performs a lookup, and refuses real-looking domains. */
const ASB={};
function asb(id,x){ASB[id]=x;return `<div class="viz" data-asb="${id}"><b>${x.t}</b> <span class="lab-only">FICTIONAL · NO REAL LOOKUPS</span><div class="ctl"><input class="in" data-o value="Acme Cyber Lab" aria-label="Fictional organisation name"><input class="in" data-d value="acme.test" aria-label="Fictional domain, ending in .test"><button class="btn" data-ab="n">Reveal next layer</button><button class="btn g" data-ab="r">Reset</button></div><div class="pnl" data-w aria-live="polite"><p>Enter a fictional organisation, then reveal each layer.</p></div><div data-l></div></div>`}
document.addEventListener("click",e=>{const b=e.target.closest("[data-ab]");if(!b)return;const bx=b.closest("[data-asb]"),x=ASB[bx.dataset.asb],L=bx.querySelector("[data-l]"),w=bx.querySelector("[data-w]");let i=+(bx.dataset.i||0);
if(b.dataset.ab=="r"){L.innerHTML="";bx.dataset.i=0;w.innerHTML="<p>Enter a fictional organisation, then reveal each layer.</p>";return}
if(i>=x.layers.length)return;
let d=bx.querySelector("[data-d]").value.toLowerCase().replace(/[^a-z0-9.-]/g,""),o=esc(bx.querySelector("[data-o]").value||"Acme Cyber Lab");
if(!/\.(test|example|invalid|localhost)$|^example\.(com|net|org)$/.test(d)){d="acme.test";w.innerHTML="<p><b>Fictional domains only.</b> Use a name ending in .test, .example or .invalid. Using acme.test instead.</p>"}else w.innerHTML=`<p>Layer ${i+1} of ${x.layers.length}</p>`;
const ly=x.layers[i],f=s=>gl(s.replace(/\{d\}/g,d).replace(/\{o\}/g,o));
L.insertAdjacentHTML("beforeend",`<div class="card" style="margin-top:8px"><b>${i+1}. ${ly.n}</b>${ly.items.map(t=>`<p style="margin:6px 0"><code>${f(t[0])}</code> · ${f(t[1])}</p>`).join("")}</div>`);bx.dataset.i=i+1});
