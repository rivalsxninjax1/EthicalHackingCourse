# CYBERLAB project memory (paste this file into any new chat to continue)

Goal: 64-hour ethical hacking course. 16 modules x 4 h = 64 h exactly. Slick, accessible, offline-first, no frameworks.
Every chapter follows: concept > visual > analogy > technical > tool > safe demo > lab > challenge > quiz > recap.
Always ask: what, why, how, where can it fail, how an attacker thinks, how a defender thinks, how we verify.
All labs: localhost / private ranges / intentionally vulnerable apps only. Mark "LAB ONLY". Simulated output is labelled SIMULATION.
Never invent CVEs, statistics, commands or certifications. Prefer OWASP, NIST, MITRE ATT&CK, RFCs, vendor docs. Say "Course Completion Record", never "certification".

## Structure
index.html            dashboard
core/course.js        BRAND, STATUS, module metadata M (16 entries), 4-hour block plan BL
core/engine.js        shared helpers + deep() renderer + bindDeep() (explore, tabs, quiz, hints, lab checklist)
core/shell.js         sidebar, dashboard, chapter page, outline fallback
core/styles.css       design system
chapters/chNN.html    one file per module. Deep chapters contain <script id="deep-NN">DEEP[N]={...}</script>
chapters/_template.html  copy to start a chapter
Progress is saved in localStorage key "cyberlab" (done, quiz, notes, lab).

## Build one chapter (token-cheap)
1. Open chapters/chNN.html. Paste a DEEP[N]={...} script before <script>boot()</script>.
2. Set STATUS[N]="deep" in core/course.js. Nothing else changes.

## DEEP[N] fields (see chapters/ch01.html for a full example)
stage(0-6), level, plan[], obj[], why[], simple, tech[], dive[], ana, anaStop,
viz[{t, ord?, items[{n,w,r,c}]}]  (n=name, w=what it is, r=attacker's question, c=defender's control; ord=1 makes an ordered animated flow)
tables[{t,h[],r[[]]}], av[[attacker steps],[defender steps]], rules[[title,text]], roe (sample doc text),
tools[{n,p,u,c,s,d}], try[[title,text,code?]] (need, install, setup, verify, experiment, observe, understand, break it, fix it),
check[], ch{q,h[],s}, proj[title,text], mist[], quiz[{t:"mc"|"tf"|"order",q,o,a,why}], recap[], next, inst[[title,[items]]]
Glossary terms: write {{term}} in any string; add definitions to GL in core/engine.js.

## Status
| Module | Status |
|---|---|
| 01 Foundations | deep |
| 02-16 | outline (auto-generated from core/course.js) |

## Still to build (from the master prompt)
Per-chapter visuals (TCP/DNS/HTTP/TLS, port scanner, SQLi, XSS, auth, privesc, AD, segmentation, attack path, finding builder),
simulated terminal, classroom/presentation mode, global search, glossary page, command reference, tool cards, lab catalog,
revision and cheat-sheet modes, instructor mode, XP/badges, assessment model + capstone scorecard, completion record, device checklist.
Suggested order: 02 Networking, 03 Linux/Windows, 04 Recon, 05 Scanning, then continue in order.

## Prompt to continue
"Using PROJECT.md, build the deep content for Module NN. Output only the DEEP[N] script and any new visual component."
