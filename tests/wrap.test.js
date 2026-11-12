/* 짧은 이름표(10~16자 이하)와 아이콘이 줄바뀜되는지 점검: 폭 320·360·390·768 (질문 제목 dt는 제외) */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();
const widths=(process.argv[2]||'320,360,390,768').split(',').map(Number);
const out={};
for(const W of widths){
 const p=await (await b.newContext({viewport:{width:W,height:900},deviceScaleFactor:1})).newPage();
 await p.goto('file://'+require('path').resolve(__dirname,'..','index.html')+'');await p.waitForTimeout(700);
 const routes=await p.evaluate(()=>{ const r=['#guide','#teams','#score'];
   UORDER.forEach(u=>UMETA[u].grades.forEach(g=>{ r.push(unitRoute(u,g)); const id=lessonsOf(u,g)[0]; r.push('#lesson-'+id); }));
   return [...new Set(r)]; });
 const states=[['home-grade',()=>{store.track='learn';store.homeView='grade';store.homeGrade=null;render();}],
   ...['3','4','5','6'].map(g=>['home-g'+g,`store.track='learn';store.homeView='grade';store.homeGrade='${g}';render();`]),
   ['home-sport',"store.track='learn';store.homeView='sport';render();"],['home-fun',"store.track='fun';render();"]];
 const check=async(tag)=>p.evaluate(()=>{
   const res=[]; const vis=e=>{const r=e.getBoundingClientRect(); return r.width>0&&r.height>0&&getComputedStyle(e).visibility!=='hidden';};
   document.querySelectorAll('#app *, header *, .actionbar *').forEach(e=>{
     if(!vis(e)) return;
     const tn=[...e.childNodes].filter(n=>n.nodeType===3&&n.textContent.trim());
     if(!tn.length) return;
     const txt=e.textContent.trim().replace(/\s+/g,' ');
     if(txt.length>16) return;
     if([...e.children].some(c=>{const cs=getComputedStyle(c); return !cs.display.startsWith('inline')||cs.position==='absolute'||c.tagName==='BR';})) return;
     const R=[]; const r0=document.createRange(); r0.selectNodeContents(e); [...r0.getClientRects()].forEach(c=>{ if(c.width>1&&c.height>1) R.push([c.top,c.bottom]); });
     const lines=[]; R.sort((a,b)=>a[0]-b[0]).forEach(([t,bm])=>{ const L=lines.find(l=>Math.min(l[1],bm)-Math.max(l[0],t)>2); if(L){L[0]=Math.min(L[0],t);L[1]=Math.max(L[1],bm);} else lines.push([t,bm]); });
     if(lines.length>1) res.push(['WRAP',e.tagName.toLowerCase()+'.'+[...e.classList].join('.'),txt]);
   });
   // icon + label split: svg and following text on different rows
   document.querySelectorAll('#app li, #app button, #app a, #app .gkey, #app .gc-row, #app div').forEach(e=>{
     if(!vis(e)) return; const sv=[...e.children].find(c=>c.tagName==='svg'); if(!sv) return;
     const tn=[...e.childNodes].filter(n=>n!==sv&&((n.nodeType===3&&n.textContent.trim())||(n.nodeType===1&&n.tagName!=='svg'&&getComputedStyle(n).display.startsWith('inline'))));
     if(!tn.length) return; const s=sv.getBoundingClientRect();
     tn.forEach(n=>{ const r=document.createRange(); r.selectNodeContents(n); const c=r.getClientRects()[0]; if(c&&c.top>=s.bottom-2) res.push(['ICONSPLIT',e.tagName.toLowerCase()+'.'+[...e.classList].join('.'),e.textContent.trim().slice(0,20)]); });
   });
   return res; });
 for(const [tag,fn] of states){ await p.evaluate(typeof fn==='string'?fn:fn.toString().replace(/^\(\)=>\{|\}$/g,'')); await p.waitForTimeout(150); (out[tag+'@'+W]=await check()); }
 for(const r of routes){ await p.evaluate(h=>{location.hash=h},r); await p.waitForTimeout(220);
   if(r.startsWith('#lesson-')){ for(const k of [0,1,2,5]){ await p.evaluate(k=>{const el=document.querySelector(`[data-action="step"][data-k="${k}"]`); el&&el.click();},k); await p.waitForTimeout(120); out[r+'/'+k+'@'+W]=await check(); } }
   else out[r+'@'+W]=await check(); }
 await p.close();
}
const agg={};
for(const [k,v] of Object.entries(out)) for(const [t,sel,txt] of v){ const key=t+' | '+sel+' | '+txt; (agg[key]=agg[key]||[]).push(k); }
const rows=Object.entries(agg).sort((a,b)=>b[1].length-a[1].length);
const real=rows.filter(([k])=>!/^WRAP \| dt\./.test(k));
rows.forEach(([k,v])=>console.log(k,' ← ',v.length,v.slice(0,3).join(' ')));
console.log(real.length?'줄바뀜 '+real.length+'곳':'통과: 짧은 이름표·아이콘 줄바뀜 없음');
if(real.length) process.exitCode=1;
await b.close();})();
