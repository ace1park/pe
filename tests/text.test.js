/* 글자 점검: 화면 너비(기본 390px)에서 모든 화면의 글자 잘림·화면 밖 넘침·한 줄 요소 줄바뀜 확인. 사용: node text.test.js 360 */
const path=require('path');
const BASE=process.env.PE_URL||('file://'+path.resolve(__dirname,'..','index.html'));
const {chromium}=require('playwright');
const W=+(process.argv[2]||process.env.WIDTH||390), H=+(process.argv[3]||844), MODE=process.argv[4]||'all';
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:W<900,isMobile:W<900});
const p=await ctx.newPage();
await p.goto(BASE);
await p.evaluate(async()=>{ await document.fonts.load('400 20px "Black Han Sans"','가나다'); await document.fonts.load('800 20px "Gothic A1"','가나다'); await document.fonts.load('600 20px "Gothic A1"','가나다'); await document.fonts.load('400 20px "Gothic A1"','가나다'); await document.fonts.ready; });
const body=(MODE,WARM)=>{
 const out=[];
 const SINGLE='.fit, button, .chip, .pill, summary, .slot, .gtag, .qz, .lno, .mbadge, .bignote b, .pcat b, .pcat small, .grp h3, .court, .lab, .tip b, h1, h2, h3, .uarea, .ugr i, .brand b, .brand small';
 function lines(rects){ const tops=[]; rects.forEach(q=>{ if(!tops.some(t=>Math.abs(t-q.top)<4)) tops.push(q.top); }); return tops.length; }
 function check(where){
  { const vw=document.documentElement.clientWidth, dw=document.documentElement.scrollWidth; if(dw>vw+1) out.push({w:where,type:'PAGE-OVERFLOW',cls:'doc',text:dw+'>'+vw}); }
  const scope=document.body; const walker=document.createTreeWalker(scope,NodeFilter.SHOW_TEXT);
  const perEl=new Map();
  while(walker.nextNode()){ const t=walker.currentNode; if(!t.textContent.trim()) continue; const el=t.parentElement; if(!el||el.closest('svg,script,style,#static,[hidden]')) continue;
    if(!el.offsetParent && getComputedStyle(el).position!=='fixed') continue;
    const r=document.createRange(); r.selectNodeContents(t); const rects=[...r.getClientRects()].filter(x=>x.width>0.5); if(!rects.length) continue;
    // clipping
    let a=el, clipped=false;
    while(a&&a!==document.documentElement){ const s=getComputedStyle(a); const ox=s.overflowX; if(ox==='hidden'||ox==='clip'){ if(s.textOverflow==='ellipsis') break; const bb=a.getBoundingClientRect(); if(rects.some(q=>q.right>bb.right+1.5||q.left<bb.left-1.5)){ clipped=a; break; } } a=a.parentElement; }
    const vw=document.documentElement.clientWidth; if(!clipped && !el.closest('.tw,.mstrip') && rects.some(q=>q.right>vw+1)) clipped='viewport';
    if(clipped) out.push({w:where,type:'clip',cls:el.className||el.tagName,text:t.textContent.trim().slice(0,50)});
    const n=lines(rects); if(n>1){ const fs=parseFloat(getComputedStyle(el).fontSize); const last=rects[rects.length-1];
      const host=el.closest(SINGLE);
      const orphan=last.width<fs*2.3;
      if(host||orphan) out.push({w:where,type:(el.closest('.fit')?'fitwrap':host?'wrap':'')+(orphan?'+orphan':''),cls:(el.tagName+'.'+el.className).slice(0,40),text:t.textContent.trim().replace(/\s+/g,' ').slice(0,60)}); }
  }
 }
 const openAll=()=>document.querySelectorAll('#app details').forEach(d=>d.open=true);
 const run=(where,fn)=>{ try{ fn(); openAll(); if(WARM){ document.body.getBoundingClientRect(); return; } fitAll(); check(where);}catch(e){ out.push({w:where,type:'err',text:e.message}); } };
 if(MODE!=='lessons'){
 run('shelf',()=>{ store.homeView='sport'; ui.route='map'; render(); });
 for(const g of [null,'3','4','5','6']) run('home-'+(g||'pick'),()=>{ store.homeView='grade'; store.homeGrade=g; store.last='vb4-5'; ui.route='map'; render(); });
 run('guide',()=>{ store.gsec='all'; ui.route='guide'; render(); });
 run('score',()=>{ ui.route='score'; render(); });
 for(const f of [...Object.keys(FORMS),...Object.keys(BIGF)]) run('teams-'+f,()=>{ ui.route='teams'; ui.form=f; render(); });
 for(const u of UORDER) for(const g of UMETA[u].grades) run('unit-'+u+g,()=>{ location.hash; ui.route='u-'+u+'-'+gk(g); for(const k in ui.sel) ui.sel[k]=0; renderUnit(u,g); });
 // unit with qcard open for first lesson each stage
 for(const u of UORDER) for(const g of UMETA[u].grades) for(const s of stagesOf(u,g)) run('qcard-'+s.ids[0],()=>{ ui.sel[u+'-'+gk(g)+'-'+s.n]=s.ids[0]; renderUnit(u,g); });
 }
 if(MODE!=='pages'){
 for(const u of UORDER) for(const g of UMETA[u].grades) for(const id of lessonsOf(u,g)) for(let k=0;k<6;k++) run('L'+id+'-'+k,()=>{ ui.route='lesson-'+id; ui.step[id]=k; document.body.classList.add('lesson'); renderLesson(id); });
 }
 return out;};
await p.evaluate(`(${body})(${JSON.stringify(MODE)},true)`); await p.waitForTimeout(1500); await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(500);
const res=await p.evaluate(`(${body})(${JSON.stringify(MODE)},false)`);
const agg={}; res.forEach(r=>{ const k=r.type+' | '+r.cls; (agg[k]=agg[k]||[]).push(r.w+': '+r.text); });
console.log('W',W,'issues',res.length);
Object.entries(agg).sort((a,b)=>b[1].length-a[1].length).forEach(([k,v])=>{ console.log(v.length,k); [...new Set(v)].slice(0,4).forEach(x=>console.log('    ',x)); });
const hard=res.filter(r=>r.type==='clip'||r.type==='PAGE-OVERFLOW'||r.type==='err');
console.log(hard.length?'실패: 잘림·화면 밖 넘침 '+hard.length+'곳':'통과: 잘림·화면 밖 넘침 없음 (줄바뀜·짧은 끝줄은 참고용)');
await b.close(); process.exit(hard.length?1:0);})();
