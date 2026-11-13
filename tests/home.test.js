/* 홈 버튼 점검: 모든 화면을 맨 아래까지 내려도 위쪽 홈 버튼이 보이는지 (320×568 · 390×844 · 가로 844×390 · 1280×800) */
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch(); let bad=0;
for(const vp of [[320,568],[390,844],[844,390],[1280,800]]){ const p=await (await b.newContext({viewport:{width:vp[0],height:vp[1]}})).newPage();
await p.goto('file://'+require('path').resolve(__dirname,'..','index.html')+'#map');await p.waitForTimeout(800);
const routes=await p.evaluate(()=>{ const r=['map','guide','teams','score']; Object.keys(UMETA).forEach(u=>UMETA[u].grades.forEach(g=>r.push('u-'+u+'-'+gk(g)))); return r.concat(['lesson-1','lesson-101','lesson-20']); });
const out=[];
for(const h of routes){ await p.evaluate(h=>{location.hash=h},h); await p.waitForTimeout(120); await p.evaluate(()=>window.scrollTo(0,document.documentElement.scrollHeight)); await p.waitForTimeout(80);
  const v=await p.evaluate(()=>{const e=document.querySelector('.t-home').getBoundingClientRect(); return [Math.round(e.top),Math.round(e.width),Math.round(e.right)];});
  if(v[0]<0||v[1]===0||v[2]>vp[0]) out.push(h+' '+v); }
bad+=out.length; console.log(vp.join('x'), out.length?out.join(' | '):'모든 화면 맨 아래에서도 홈 보임'); }
await b.close(); console.log(bad?'실패':'통과'); if(bad) process.exitCode=1;})();
