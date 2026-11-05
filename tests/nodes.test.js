/* 차시 원 점검: 모든 단원·학년의 단계마다 차시 원이 한 줄에 다 들어가는지 (세로 320·360·390·430·768px, 가로 1280px) */
const path=require('path');
const BASE=process.env.PE_URL||('file://'+path.resolve(__dirname,'..','index.html'));
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch(); let bad=[], checked=0, minSize=999;
 for(const [w,h] of [[320,640],[360,780],[390,844],[430,932],[768,1024],[1280,800]]){
  const c=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:1,isMobile:w<900,hasTouch:w<900}); const p=await c.newPage();
  await p.goto(BASE); await p.waitForTimeout(400);
  const r=await p.evaluate(async()=>{ const out=[]; let n=0, mn=999;
   for(const u of UORDER) for(const g of UMETA[u].grades){ location.hash=unitRoute(u,g); await new Promise(r=>setTimeout(r,60));
    document.querySelectorAll('.pbody .nodes').forEach((box,si)=>{ n++; const ns=[...box.querySelectorAll('.node')]; const tops=new Set(ns.map(e=>Math.round(e.getBoundingClientRect().top))); const bb=box.getBoundingClientRect(); const last=ns[ns.length-1].getBoundingClientRect();
     ns.forEach(e=>mn=Math.min(mn,e.getBoundingClientRect().width));
     if(tops.size>1||last.right>bb.right+1) out.push(`${u}${g} ${si+1}단계 (${ns.length}개)`); }); }
   return {out,n,mn}; });
  checked+=r.n; minSize=Math.min(minSize,r.mn); r.out.forEach(x=>bad.push(w+'px '+x)); await c.close(); }
 console.log('단계 수',checked,'· 가장 작은 원',Math.round(minSize)+'px'); bad.slice(0,20).forEach(x=>console.log('  줄바뀜',x));
 await b.close(); console.log(bad.length?'실패 '+bad.length+'개':'통과'); process.exit(bad.length?1:0);})();
