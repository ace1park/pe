/* 누르기 점검: 여러 화면의 모든 버튼·링크를 하나씩 눌러 오류 확인 (컴퓨터·휴대폰 크기) */
const path=require('path');
const BASE=process.env.PE_URL||('file://'+path.resolve(__dirname,'..','index.html'));
const {chromium,devices}=require('playwright');
(async()=>{const b=await chromium.launch();
 const res=[]; const errs=[];
 async function newPage(vp){ const c=await b.newContext(vp==='phone'?{...devices['iPhone 13'],deviceScaleFactor:1}:{viewport:{width:1440,height:900}}); const p=await c.newPage(); p.on('pageerror',x=>errs.push(vp+': '+x.message)); p.on('dialog',d=>{errs.push('dialog '+d.message()); d.dismiss();}); await p.goto(BASE); await p.waitForTimeout(500); return p; }
 const screens=['map','u-foot','u-tb4','u-tb56','u-bad-3','u-bad-5','u-ath-4','u-nb','teams','score','guide'];
 const lessons=[1,7,14,17,19,20,'tb4-1','tb4-24','tb56-11','tb56-20','bad3-5','bad6-13','ath3-1','ath6-26','nb-1','nb-17'];
 for(const vp of ['desktop','phone']){
  const p=await newPage(vp);
  // every clickable on every screen
  const targets=[...screens.map(s=>({h:s})),...lessons.flatMap(id=>[0,1,2,3,4,5].map(k=>({h:'lesson-'+id,k})))];
  for(const T of targets){
    await p.evaluate(h=>{location.hash=h},T.h); await p.waitForTimeout(60);
    if(T.k!=null){ await p.evaluate(k=>{const b=document.querySelector(`[data-action=step][data-k="${k}"]`); b&&b.click();},T.k); await p.waitForTimeout(40); }
    // open all folds
    await p.evaluate(()=>document.querySelectorAll('details.fold').forEach(d=>d.open=true));
    const n=await p.evaluate(()=>[...document.querySelectorAll('[data-action]')].filter(e=>e.offsetParent||e.closest('.actionbar')).length);
    for(let i=0;i<n;i++){
      const info=await p.evaluate(i=>{ const els=[...document.querySelectorAll('[data-action]')].filter(e=>e.offsetParent||e.closest('.actionbar')); const e=els[i]; if(!e) return null; return {a:e.dataset.action,t:(e.textContent||'').trim().slice(0,20)}; },i);
      if(!info) continue;
      if(['stop','next','closepeek','unstop','closescore','open','card','cardscore','openscore'].includes(info.a)) continue; // tested separately
      const before=errs.length;
      await p.evaluate(i=>{ const els=[...document.querySelectorAll('[data-action]')].filter(e=>e.offsetParent||e.closest('.actionbar')); els[i]&&els[i].click(); },i);
      await p.waitForTimeout(15);
      if(errs.length>before) res.push(`${vp} ${T.h}${T.k!=null?' step'+T.k:''} [${info.a}] "${info.t}" -> ${errs[errs.length-1]}`);
      // restore route/step if changed
      const cur=await p.evaluate(()=>location.hash.slice(1));
      if(cur!==T.h){ await p.evaluate(h=>{location.hash=h},T.h); await p.waitForTimeout(40); }
      if(T.k!=null){ await p.evaluate(k=>{const b=document.querySelector(`[data-action=step][data-k="${k}"]`); b&&b.click();},T.k); }
      await p.evaluate(()=>{ document.getElementById('scoreOver').classList.remove('open'); document.getElementById('stopOver').classList.remove('open'); document.getElementById('peek').classList.remove('open'); document.querySelectorAll('details.fold').forEach(d=>d.open=true); });
    }
    // links
    const hrefs=await p.evaluate(()=>[...document.querySelectorAll('a[href^="#"]')].filter(a=>a.offsetParent).map(a=>a.getAttribute('href')));
    for(const h of [...new Set(hrefs)]){ const ok=await p.evaluate(h=>{ const x=h.slice(1); location.hash=x; return true; },h); await p.waitForTimeout(30); const r=await p.evaluate(()=>location.hash.slice(1)); if(r!==h.slice(1)) res.push(`${vp} ${T.h} link ${h} -> went to ${r}`); await p.evaluate(h=>{location.hash=h},T.h); await p.waitForTimeout(30); if(T.k!=null){ await p.evaluate(k=>{const b=document.querySelector(`[data-action=step][data-k="${k}"]`); b&&b.click();},T.k);} }
  }
  await p.context().close();
 }
 console.log('click errors:',res.length); res.slice(0,40).forEach(x=>console.log(' ',x)); console.log('all errors', [...new Set(errs)].slice(0,20));
 await b.close(); console.log(res.length||errs.length?'실패':'통과'); process.exit(res.length||errs.length?1:0);})();
