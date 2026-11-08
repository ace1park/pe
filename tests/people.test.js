/* 인원 점검: 소규모 6~14명·일반학급 15~24명·합반 25~50명마다 모든 차시 화면·점수판·팀 나누기를 그려 오류와 모둠 합계 확인 */
const path=require('path');
const BASE=process.env.PE_URL||('file://'+path.resolve(__dirname,'..','index.html'));
const {chromium,devices}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext(devices['Pixel 7'])).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto(BASE);await p.waitForTimeout(500);
const r={screens:0,bad:[],nb:0};
for(const N0 of [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,31,38,44,50]){
 await p.reload(); await p.waitForTimeout(300);
 const q=await p.evaluate((N0)=>{ const bad=[]; let screens=0;
 for(const N of [N0]){ store.people=N;
  for(const f of Object.keys(FORMS)){ const z=sizesOf(f,N); if(z.reduce((a,b)=>a+b,0)!==N) bad.push('sum '+f+N); if(Math.min(...z)<2) bad.push('tiny '+f+N+' '+z); }
  for(const u of UORDER) for(const g of UMETA[u].grades) for(const id of lessonsOf(u,g)){
    for(let k=0;k<6;k++){ ui.step[id]=k; try{ renderLesson(id); screens++;
      app.querySelectorAll('.groups').forEach(G=>{ const n=G.querySelectorAll('.jersey, svg.jsy, .jerseys > *').length; });
      // open all folds content exists
      const txt=app.textContent; if(/undefined|NaN/.test(txt)) bad.push('text '+id+'-'+k+' N'+N);
      if(k>=1&&k<=4){ const D=getD(id); const M=D.m[k-1]; const key=id+'-'+k; const sp=UMETA[LI(id).unit].sport;
        if(!isWholeGame(id,k)) for(const f of bigList(sp)) if(bigOk(sp,f,N)){ const z=bigSizes(sp,f,N); if(z.reduce((a,b)=>a+b,0)!==N) bad.push('bigsum'); const side=bigSide(sp,f); if(side&&Math.min(...z)<side*2) bad.push('bigsmall '+sp+f+N+z); } }
      if(k>=1&&k<=4){ openScoreOver(id); const t=document.getElementById('scoreOver').textContent; if(/undefined|NaN/.test(t)) bad.push('score '+id+'-'+k+' N'+N); document.getElementById('scoreOver').classList.remove('open'); }
    }catch(e){ bad.push(id+'-'+k+' N'+N+' '+e.message); } } }
  for(const f of Object.keys(FORMS)) for(const k of [1,2,3]){ if(N-k<MINP) continue; store.absent={d:todayStr(),list:[...Array(k)].map((_,j)=>1+j*2)}; const G=buildGroups(f,0,7), fl=G.flat(), ab=absSet(); if(fl.length!==todayN()||new Set(fl).size!==fl.length||fl.some(x=>ab.has(x))) bad.push('abs '+f+N+'-'+k); const z=sizesOf(f,todayN()); if(G.map(g=>g.length).sort((a,b)=>b-a).join()!==[...z].sort((a,b)=>b-a).join()) bad.push('abssize '+f+N+'-'+k); }
  store.absent={d:todayStr(),list:[2]}; store.gear={courts:2,balls:6};
  for(const id of [lessonsOf('foot','4')[13],lessonsOf('foot','3')[17]]) for(let k=1;k<5;k++){ ui.step[id]=k; renderLesson(id); if(/undefined|NaN/.test(app.textContent)) bad.push('gear '+id+'-'+k+' N'+N); }
  store.absent=null; store.gear={};
  for(const f of [...Object.keys(FORMS),...Object.keys(BIGF)]){ ui.form=f; try{ renderTeams(); if(/undefined|NaN/.test(app.textContent)) bad.push('teams '+f+N);}catch(e){bad.push('teams '+f+N+e.message);} }
 }
 store.people=22; save(); return {screens,bad:bad.slice(0,30),nb:bad.length};},N0);
 r.screens+=q.screens; r.nb+=q.nb; r.bad.push(...q.bad); process.stdout.write(N0+'명 ');
}
console.log('');
console.log('화면',r.screens,'문제',r.nb,r.bad,'오류',errs); console.log(r.nb||errs.length?'실패':'통과');
await b.close(); process.exit(r.nb||errs.length?1:0);})();
