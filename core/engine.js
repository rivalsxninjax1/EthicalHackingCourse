/* Shared helpers + deep-chapter engine. Chapters never edit this file. */
const $=q=>document.querySelector(q),esc=t=>String(t).replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]));
let S={done:{},quiz:{},notes:{},lab:{}};try{S=Object.assign(S,JSON.parse(localStorage.getItem("cyberlab")||"{}"))}catch(e){}
const save=()=>{try{localStorage.setItem("cyberlab",JSON.stringify(S))}catch(e){}};
const bl=()=>`<div class="blocks">${BL.map(b=>`<div style="flex:${b[1]};background:${b[2]}" title="${b[0]} ${b[1]} min">${b[1]}′</div>`).join("")}</div><div class="leg">${BL.map(b=>`<span><span style="color:${b[2]}">■</span> ${b[0]} ${b[1]} min</span>`).join("")}</div>`;

/* Shared deep-chapter engine. To deepen a chapter, add a <script id="deep-NN"> that sets DEEP[N]. Nothing else changes. */
const DEEP={},EX={},GL={"CIA triad":"Confidentiality, Integrity, Availability: the three core security goals.","asset":"Anything of value to the organisation: data, systems, people, reputation.","threat":"Anything that could cause harm to an asset: an actor, event or condition.","vulnerability":"A weakness that a threat could take advantage of.","exploit":"A method or code that takes advantage of a vulnerability.","risk":"The likelihood of harm combined with its impact.","attack surface":"All the points where an attacker can try to interact with a system.","attack vector":"The path or method used to reach a target.","authentication":"Proving who you are.","authorization":"Deciding what an authenticated identity may do.","scope":"The written list of systems, times and actions a test may cover.","rules of engagement":"Agreed limits on how testing is performed, and who to contact.","red team":"Emulates real attackers to test detection and response.","blue team":"Defends: monitors, detects, responds and hardens.","purple team":"Red and blue working together to improve detection.","SIEM":"Security Information and Event Management: central log collection and alerting.","least privilege":"Giving only the access needed to do a job.","defense in depth":"Layered controls so one failure is not fatal."};
const gl=t=>t.replace(/\{\{(.+?)\}\}/g,(_,k)=>`<abbr class="gl" tabindex="0" title="${esc(GL[k]||"")}">${k}</abbr>`);
const ulf=a=>`<ul class="o">${a.map(x=>`<li>${gl(x)}</li>`).join("")}</ul>`;
const tabf=(g,a)=>`<div class="tabs" role="tablist">${a.map((x,i)=>`<button role="tab" data-tab="${g}:${i}" class="${i?"":"on"}">${x[0]}</button>`).join("")}</div>`+a.map((x,i)=>`<div class="tp" data-g="${g}" data-i="${i}"${i?" hidden":""}>${x[1]}</div>`).join("");
const tbl=(h,r)=>`<div class="sc"><table><tr>${h.map(x=>`<th>${x}</th>`).join("")}</tr>${r.map(a=>`<tr>${a.map(c=>`<td>${gl(c)}</td>`).join("")}</tr>`).join("")}</table></div>`;
function explore(id,x){if(x.actors)return seq(id,x);if(x.cmds)return term(id,x);if(x.layers)return asb(id,x);return `<div class="viz" data-ex="${id}"><b>${x.t}</b><div class="${x.ord?"flow":"chips"}">${x.items.map((it,i)=>`<button class="chip" data-i="${i}" aria-pressed="false">${x.ord?`<small>${i+1}</small>`:""}${it.n}</button>`).join(x.ord?'<span class="ar" aria-hidden="true">›</span>':"")}</div>${x.ord?'<div class="trk"><div class="dot"></div></div>':""}<div class="pnl" aria-live="polite"><p>Click a node to explore it.</p></div>${x.ord?'<div class="ctl"><button class="btn" data-nx>Next stage</button><button class="btn g" data-rs>Reset</button></div>':""}</div>`}
function deep(m){const d=DEEP[m.id];d.viz.forEach((x,i)=>EX[m.id+"-"+i]=x);const lab=S.lab=S.lab||{};
const ST=["I don’t know what I’m looking at","I understand how it works","I can inspect it","I can find weaknesses","I can safely validate them","I can explain the impact","I can document the finding"];
return `<div id="deep"><div class="chips" aria-label="Student journey">${ST.map((s,i)=>`<span class="badge" ${i==d.stage?'style="border-color:var(--acc);color:var(--acc)"':""}>${i+1}. ${s}</span>`).join("")}</div>
<span class="badge">${d.level}</span>
<h2>Time plan</h2>${bl()}${ulf(d.plan)}
<h2>By the end you can</h2>${ulf(d.obj)}
<h2>Why this matters</h2><div class="card">${ulf(d.why)}</div>
<h2>Concept, three depths</h2>${tabf("dp",[["Simple",`<p>${gl(d.simple)}</p>`],["Technical",ulf(d.tech)],["Deep dive",ulf(d.dive)]])}
<h2>Real-world analogy</h2><div class="card"><p>${gl(d.ana)}</p><p><b>Where the analogy stops:</b> ${gl(d.anaStop)}</p></div>
<h2>Visual labs</h2>${d.viz.map((x,i)=>explore(m.id+"-"+i,x)).join("")}
${d.tables.map(t=>`<h2>${t.t}</h2>${tbl(t.h,t.r)}`).join("")}
<h2>Two ways to look at the same work</h2>${tabf("av",[["Ethical hacker’s view",ulf(d.av[0])],["Defender’s view",ulf(d.av[1])]])}
<h2>Rules of the game</h2><div class="grid">${d.rules.map(r=>`<div class="card"><b>${r[0]}</b><p>${gl(r[1])}</p></div>`).join("")}</div>
<div class="term" style="margin-top:12px"><span class="sim">SAMPLE DOCUMENT</span>${esc(d.roe)}</div>
<h2>Toolbox</h2><div class="grid">${d.tools.map(t=>`<div class="card"><b>${t.n}</b><p><b>Purpose:</b> ${t.p}<br><b>Use it when:</b> ${t.u}<br><b>Common mistake:</b> ${t.c}<br><b>Safe example:</b> ${t.s}<br><b>Defensive relevance:</b> ${t.d}</p></div>`).join("")}</div>
<h2>Try it yourself: build your lab <span class="lab-only">LAB ONLY</span></h2><p class="lead" style="font-size:15px">Authorisation boundary: only the containers and VMs you create below.</p>
${d.try.map(s=>`<details><summary>${s[0]}</summary><p>${gl(s[1])}</p>${s[2]?`<div class="term">${esc(s[2])}</div>`:""}</details>`).join("")}
<div class="card" style="margin-top:10px"><b>Lab checklist</b> <span id="lc" style="color:var(--mut)"></span>${d.check.map((c,i)=>`<label style="display:block;margin:6px 0"><input type="checkbox" data-lab="${m.id}-${i}" ${lab[m.id+"-"+i]?"checked":""}> ${c}</label>`).join("")}</div>
<h2>Challenge</h2><div class="card"><p>${gl(d.ch.q)}</p>${d.ch.h.map((h,i)=>`<p class="hint" hidden><b>Hint ${i+1}.</b> ${gl(h)}</p>`).join("")}<div class="ctl"><button class="btn g" data-hint>Show next hint</button><button class="btn g" data-sol>Reveal solution</button></div><p class="sol" hidden><b>Solution.</b> ${gl(d.ch.s)}</p></div>
<div class="card" style="margin-top:10px"><b>Mini project: ${d.proj[0]}</b><p>${gl(d.proj[1])}</p></div>
<h2>Common mistakes</h2>${ulf(d.mist)}
<h2>Knowledge check</h2><p id="qs" class="note">Score 0 / ${d.quiz.length}</p>${d.quiz.map((q,i)=>`<div class="card qz" data-qi="${i}" style="margin:8px 0"><p style="margin-top:0"><b>${i+1}. ${gl(q.q)}</b> <span class="badge">${{mc:"Multiple choice",tf:"True / false",order:"Click in order"}[q.t]}</span></p>${(q.t=="tf"?["True","False"]:q.o).map((o,j)=>`<button class="opt" data-qa="${j}">${o}</button>`).join("")}<p class="seq note"></p><div class="why note" aria-live="polite"></div></div>`).join("")}
<h2>Recap</h2>${ulf(d.recap)}
<h2>Next mission</h2><div class="card">${gl(d.next)}</div>
<h2>Instructor notes</h2>${d.inst.map(s=>`<details><summary>${s[0]}</summary>${ulf(s[1])}</details>`).join("")}</div>`}
function bindDeep(m){const d=DEEP[m.id],r=$("#deep"),Q=d.quiz,ans={},osq={};
const lc=()=>{$("#lc").textContent=`(${d.check.filter((c,i)=>S.lab[m.id+"-"+i]).length} / ${d.check.length})`};lc();
const sel=(bx,i)=>{const it=EX[bx.dataset.ex].items[i],n=EX[bx.dataset.ex].items.length;bx.querySelectorAll(".chip").forEach((b,j)=>{b.classList.toggle("on",j==i);b.setAttribute("aria-pressed",j==i)});const dt=bx.querySelector(".dot");if(dt)dt.style.left=(i/(n-1)*100)+"%";bx.querySelector(".pnl").innerHTML=`<p><b>${it.n}.</b> ${gl(it.w)}</p><p><span class="lb a">Attacker’s question</span>${gl(it.r)}</p><p><span class="lb d">Defender’s control</span>${gl(it.c)}</p>`;bx.dataset.cur=i};
const fin=(qi,ok)=>{if(ans[qi]!==undefined)return;ans[qi]=ok;r.querySelector(`[data-qi="${qi}"] .why`).innerHTML=(ok?"<b>Correct. </b>":"<b>Not quite. </b>")+gl(Q[qi].why);const s=Object.values(ans).filter(Boolean).length;$("#qs").textContent=`Score ${s} / ${Q.length} · answered ${Object.keys(ans).length}`;S.quiz[m.id]=s;save()};
r.onclick=e=>{const t=e.target.closest("button");if(!t)return;const bx=t.closest("[data-ex]");
if(bx&&t.classList.contains("chip"))return sel(bx,+t.dataset.i);
if(bx&&t.hasAttribute("data-nx"))return sel(bx,Math.min(+(bx.dataset.cur??-1)+1,EX[bx.dataset.ex].items.length-1));
if(bx&&t.hasAttribute("data-rs")){bx.dataset.cur=-1;bx.querySelectorAll(".chip").forEach(b=>b.classList.remove("on"));bx.querySelector(".dot").style.left="0";bx.querySelector(".pnl").innerHTML="<p>Click a node to explore it.</p>";return}
if(t.dataset.tab){const [g,i]=t.dataset.tab.split(":");r.querySelectorAll(`[data-tab^="${g}:"]`).forEach(b=>b.classList.toggle("on",b===t));r.querySelectorAll(`.tp[data-g="${g}"]`).forEach(p=>p.hidden=p.dataset.i!=i);return}
if(t.hasAttribute("data-hint")){const h=r.querySelector(".hint[hidden]");if(h)h.hidden=false;return}
if(t.hasAttribute("data-sol")){r.querySelector(".sol").hidden=false;return}
const qc=t.closest(".qz");if(qc&&t.dataset.qa!==undefined){const qi=+qc.dataset.qi,q=Q[qi];if(ans[qi]!==undefined)return;
if(q.t=="order"){if(t.disabled)return;t.disabled=true;(osq[qi]=osq[qi]||[]).push(q.o[+t.dataset.qa]);qc.querySelector(".seq").textContent="Your order: "+osq[qi].join(" → ");if(osq[qi].length==q.o.length)fin(qi,osq[qi].join("|")==q.a.join("|"))}
else{const j=+t.dataset.qa;qc.querySelectorAll(".opt").forEach((b,k)=>{b.classList.toggle("ok",k==q.a);b.classList.toggle("no",k==j&&j!=q.a)});fin(qi,j==q.a)}}};
r.onchange=e=>{const t=e.target;if(t.dataset.lab){S.lab[t.dataset.lab]=t.checked;save();lc()}}}
