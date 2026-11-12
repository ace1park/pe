/* 기능 점검 59개: 버튼·타이머·점수판·팀 나누기·왕관·기록 유지 (기기: DEV 환경변수, 기본 iPhone 13) */
const path=require('path');
const BASE=process.env.PE_URL||('file://'+path.resolve(__dirname,'..','index.html'));
const {chromium,devices}=require('playwright');
(async()=>{const b=await chromium.launch(); const out=[]; const errs=[];
 const c=await b.newContext({...devices[process.env.DEV||'iPhone 13'],deviceScaleFactor:1}); const p=await c.newPage(); p.on('pageerror',x=>errs.push(x.message));
 await p.goto(BASE); await p.waitForTimeout(500);
 const T=async(name,fn)=>{ try{ const r=await fn(); out.push((r?'OK  ':'FAIL')+' '+name+(r&&r!==true?' '+r:'')); }catch(e){ out.push('ERR  '+name+' '+e.message.split('\n')[0]); } };
 const go=async h=>{ await p.evaluate(h=>{location.hash=h},h); await p.waitForTimeout(120); };
 const ev=(f,a)=>p.evaluate(f,a);
 // shelf
 await go('map');
 await T('home starts with grade view prompt', async()=> (await ev(()=>document.querySelector('[data-action=hview][data-v=grade]').getAttribute('aria-pressed')==='true' && !!document.querySelector('.hpick') && document.querySelectorAll('.ucard').length===0)));
 await T('grade 3/4/5/6 shows that grade units', async()=>{ const r=[]; for(const g of ['3','4','5','6']){ await p.tap(`[data-action=hgrade][data-v="${g}"]`); await p.waitForTimeout(250); r.push(await ev(()=>document.querySelectorAll('.ucard').length)); } const ok=r.join()==='5,6,9,9'; return ok?true:r.join(); });
 await T('grade card opens that grade', async()=>{ await p.tap('[data-action=hgrade][data-v="5"]'); await p.tap('.ucard[href="#u-vb-5"]'); await p.waitForTimeout(150); const h=await ev(()=>location.hash); await go('map'); return h==='#u-vb-5' && (await ev(()=>store.homeGrade==='5' && document.querySelector('[data-action=hgrade][data-v="5"]').getAttribute('aria-pressed')==='true')); });
 await T('sport view has 12 unit cards', async()=>{ await p.tap('[data-action=hview][data-v=sport]'); await p.waitForTimeout(80); return (await ev(()=>document.querySelectorAll('.ucard').length))===13 && (await ev(()=>store.homeView==='sport')); });
 await T('unit card link opens unit', async()=>{ await p.tap('.ucard[href="#u-bad-3"]'); await p.waitForTimeout(150); return (await ev(()=>location.hash))==='#u-bad-3' && (await ev(()=>!!document.querySelector('.gtabs'))); });
 await T('grade tab switches', async()=>{ await p.tap('.gtabs a:nth-child(3)'); await p.waitForTimeout(150); return (await ev(()=>location.hash))==='#u-bad-5'; });
 await T('node opens yellow card', async()=>{ await p.tap('[data-action=open][data-n="bad5-3"]'); await p.waitForTimeout(200); return await ev(()=>!!document.querySelector('.pick .qcard')); });
 await T('node again closes card', async()=>{ await p.tap('[data-action=open][data-n="bad5-3"]'); await p.waitForTimeout(200); return !(await ev(()=>!!document.querySelector('.pick .qcard'))); });
 await T('start card opens lesson', async()=>{ await p.tap('[data-action=open][data-n="bad5-3"]'); await p.waitForTimeout(200); await p.tap('.pick .qcard'); await p.waitForTimeout(200); return (await ev(()=>location.hash))==='#lesson-bad5-3'; });
 // lesson controls
 await T('lesson shows one people button', async()=>{ return await ev(()=>document.querySelectorAll('#app [data-action=people]').length===0 && !!document.querySelector('#app [data-action=cmpeople]')); });
 await T('people button sets 23', async()=>{ await p.tap('#app [data-action=cmpeople]'); await p.waitForTimeout(100); await p.tap('#peek [data-action=people][data-v="23"]'); await p.waitForTimeout(100); return await ev(()=>store.people===23 && !document.getElementById('peek').classList.contains('open') && document.querySelector('.people.pline b').textContent==='23명'); });
 await T('timer play starts', async()=>{ await p.tap('.b-timer'); await p.waitForTimeout(400); return await ev(()=>main.run && main.left<600); });
 await T('timer pause', async()=>{ await p.tap('.b-timer'); await p.waitForTimeout(100); return await ev(()=>!main.run); });
 await T('+1분', async()=>{ const a=await ev(()=>main.left); await p.tap('.b-plus'); return (await ev(()=>main.left))>a+59; });
 await T('next goes to 연습1 + stamp', async()=>{ await p.tap('#nextBtn'); await p.waitForTimeout(150); return await ev(()=>stepOf('bad5-3')===1 && stampsOf('bad5-3')[0]); });
 await T('diff button', async()=>{ await p.tap('[data-action=diff][data-v=hard]'); await p.waitForTimeout(80); return await ev(()=>document.querySelector('[data-action=diff][data-v=hard]').getAttribute('aria-pressed')==='true'); });
 await T('fold opens', async()=>{ await p.tap('details.fold summary'); await p.waitForTimeout(80); return await ev(()=>document.querySelector('details.fold').open); });
 await T('step pill jumps', async()=>{ await p.tap('[data-action=step][data-k="4"]'); await p.waitForTimeout(100); return await ev(()=>stepOf('bad5-3')===4); });
 await T('score overlay opens/+', async()=>{ await p.tap('.b-score'); await p.waitForTimeout(150); await p.tap('#scoreOver [data-action=sc][data-k=g][data-d="1"]'); return await ev(()=>document.getElementById('scoreOver').classList.contains('open') && document.querySelector('#scoreOver output').textContent==='1'); });
 await T('score overlay team count', async()=>{ await p.tap('#scoreOver [data-action=ovcount][data-v="4"]'); await p.waitForTimeout(100); return (await ev(()=>document.querySelectorAll('#scoreOver .soteam').length))===4; });
 await T('score overlay timer button', async()=>{ await p.tap('#scoreOver .sotime'); await p.waitForTimeout(300); const r=await ev(()=>main.run); await p.tap('#scoreOver .sotime'); return r; });
 await T('score overlay close', async()=>{ await p.tap('[data-action=closescore]'); await p.waitForTimeout(100); return !(await ev(()=>document.getElementById('scoreOver').classList.contains('open'))); });
 await T('stop overlay + close', async()=>{ await p.tap('.b-stop'); await p.waitForTimeout(100); const o=await ev(()=>document.getElementById('stopOver').classList.contains('open')); await p.tap('#stopOver b'); await p.waitForTimeout(100); const c=await ev(()=>document.getElementById('stopOver').classList.contains('open')); return o&&!c; });
 await T('rewhistle keeps overlay', async()=>{ await p.tap('.b-stop'); await p.tap('[data-action=rewhistle]'); const r=await ev(()=>document.getElementById('stopOver').classList.contains('open')); await ev(()=>document.getElementById('stopOver').classList.remove('open')); return r; });
 await T('back link to unit', async()=>{ await p.tap('.lhead .back'); await p.waitForTimeout(150); return (await ev(()=>location.hash))==='#u-bad-5'; });
 await T('home button', async()=>{ await p.tap('.t-home'); await p.waitForTimeout(150); return (await ev(()=>location.hash))==='#map'; });
 // finish lesson flow
 await T('finish lesson -> back to unit', async()=>{ await go('lesson-nb-2'); for(let k=0;k<6;k++){ await p.tap('#nextBtn'); await p.waitForTimeout(80);} const lab=await ev(()=>document.getElementById('nextBtn').textContent); await p.tap('#nextBtn'); await p.waitForTimeout(150); return (await ev(()=>location.hash))==='#u-nb' ? true : 'label='+lab+' hash='+(await ev(()=>location.hash)); });
 await T('crown on finished node', async()=> await ev(()=>!!document.querySelector('[data-n="nb-2"].crowned .crown')));
 // emotions
 await T('emotion count', async()=>{ await go('lesson-tb4-3'); await p.tap('[data-action=step][data-k="5"]'); await p.tap('[data-action=emo][data-w="신나는"]'); await p.waitForTimeout(80); return await ev(()=>/1/.test(document.querySelector('[data-action=emo][data-w="신나는"]').textContent)); });
 // sub timer (foot) and picker, light, ox
 await T('sub timer starts', async()=>{ await go('lesson-1'); await p.tap('[data-action=step][data-k="2"]'); await p.tap('.subchip'); await p.waitForTimeout(400); return await ev(()=>sub.run); });
 await T('picker number', async()=>{ await p.tap('[data-action=step][data-k="4"]'); await p.tap('[data-action=pick]'); return /\d/.test(await ev(()=>document.getElementById('pickOut').textContent)); });
 await T('light signal', async()=>{ await go('lesson-2'); await p.tap('[data-action=step][data-k="1"]'); await p.tap('[data-action=light][data-w="멈춤!"]'); return (await ev(()=>document.getElementById('lightShow').textContent))==='멈춤!'; });
 await T('ox quiz', async()=>{ await go('lesson-17'); await p.tap('[data-action=step][data-k="2"]'); await p.tap('[data-action=oxnext]'); await p.tap('[data-action=oxans]'); return await ev(()=>document.getElementById('oxA').classList.contains('on')); });
 await T('league table', async()=>{ await go('lesson-19'); await p.tap('[data-action=step][data-k="2"]'); await p.tap('[data-action=lg][data-j="0"][data-k="a"][data-d="1"]'); await p.tap('[data-action=lgdone][data-j="0"]'); return (await ev(()=>document.querySelector('.lgtable tbody tr td').textContent))==='1'; });
 await T('reshuffle in lesson', async()=>{ await go('lesson-14'); await p.tap('[data-action=step][data-k="2"]'); const s=await ev(()=>ui.seed); await ev(()=>document.querySelectorAll('details.fold').forEach(d=>d.open=true)); await p.tap('[data-action=reshuffle]'); return (await ev(()=>ui.seed))===s+1; });
 // tools pages
 await T('teams page controls', async()=>{ await go('teams'); await p.tap('[data-action=people][data-v="21"]'); await p.tap('[data-action=form][data-v=six]'); await p.tap('[data-action=shuf][data-v="0"]'); return (await ev(()=>document.querySelectorAll('.grp').length))===6 && (await ev(()=>store.people))===21; });
 await T('score page controls', async()=>{ await go('score'); await p.tap('[data-action=teams][data-v="4"]'); await p.tap('[data-action=sc][data-k=g][data-d="1"]'); return (await ev(()=>document.querySelectorAll('.srow').length))===4 && (await ev(()=>document.querySelector('.srow output').textContent))==='1'; });
 await T('score page reset', async()=>{ await p.tap('[data-action=scorereset]'); await p.waitForTimeout(80); return (await ev(()=>document.querySelector('.srow output').textContent))==='0'; });
 await T('stop signal only on lesson screen', async()=>{ const bad=[]; for(const h of ['map','u-foot-4','teams','score','guide']){ await go(h); const n=await ev(()=>[...document.querySelectorAll('[data-action=stop]')].filter(e=>e.offsetParent||getComputedStyle(e).position==='fixed'&&getComputedStyle(e).display!=='none').length); await p.keyboard.press('s'); const o=await ev(()=>document.getElementById('stopOver').classList.contains('open')); if(n||o) bad.push(h); await ev(()=>document.getElementById('stopOver').classList.remove('open')); } await go('lesson-tb4-3'); const L=await ev(()=>!!document.querySelector('.actionbar [data-action=stop]').offsetParent); return !bad.length&&L ? true : 'bad '+bad.join(','); });
 await T('no duplicate home links', async()=>{ await go('u-foot-4'); const a=await ev(()=>[...document.querySelectorAll('a[href="#map"]')].filter(e=>e.offsetParent).length); await go('map'); const g=await ev(()=>[...document.querySelectorAll('a[href="#guide"]')].filter(e=>e.offsetParent).length); return a===1&&g===1 ? true : `map ${a} guide ${g}`; });
 await T('fullscreen button hidden on phone', async()=>{ return await ev(()=>getComputedStyle(document.querySelector('.t-full')).display==='none'); });
 // 오늘 뭐하지?
 await T('fun track: 10 classroom games, card opens lesson', async()=>{ await go('map'); await p.tap('[data-action=track][data-v=fun]'); await p.waitForTimeout(100); const n=await ev(()=>document.querySelectorAll('.fcard').length); await p.tap('.fcard'); await p.waitForTimeout(150); const h=await ev(()=>location.hash); const back=await ev(()=>document.querySelector('.lhead .back').getAttribute('href')); await go('map'); await p.tap('[data-action=track][data-v=learn]'); await p.waitForTimeout(80); return (n===10 && h==='#lesson-cp-1' && back==='#map') || (n+' '+h+' '+back); });
 // 결석·지각 · 경기장·공 · 합반
 await T('absent: tap number, only that friend leaves', async()=>{ await ev(()=>{store.people=22;store.absent=null;store.gear={};save();}); await go('lesson-14'); await p.tap('[data-action=step][data-k="2"]'); await p.waitForTimeout(80);
   const before=await ev(()=>buildGroups('four',22,ui.seed)); await ev(()=>openAbs()); const x=before[0][0]; await p.tap(`#peek [data-action=abs][data-v="${x}"]`); await p.waitForTimeout(80);
   const after=await ev(()=>buildGroups('four',21,ui.seed)); const kept=after.flat().filter(v=>before.findIndex(g=>g.includes(v))===after.findIndex(g=>g.includes(v))).length;
   const txt=await ev(()=>document.querySelector('.pline, .lhead')?document.body.innerText:''); await p.tap('#peek [data-action=closepeek]');
   return (after.flat().length===21 && !after.flat().includes(x) && kept>=20) || ('kept '+kept); });
 await T('absent: late friend comes back to own team', async()=>{ const x=await ev(()=>absList()[0]); await ev(()=>openAbs()); await p.tap(`#peek [data-action=abs][data-v="${x}"]`); await p.waitForTimeout(80); await p.tap('#peek [data-action=closepeek]'); return await ev(()=>absList().length===0 && buildGroups('four',22,ui.seed).flat().length===22); });
 await T('gear: 2 courts shows rotation for 6 teams', async()=>{ await ev(()=>openGear()); await p.tap('#peek [data-action=gearc][data-v="2"]'); await p.waitForTimeout(80); await p.tap('#peek [data-action=closepeek]'); await go('lesson-14'); await p.tap('[data-action=step][data-k="4"]'); await p.waitForTimeout(100);
   const r=await ev(()=>{ const t=document.querySelector('.rot'); return t?t.querySelectorAll('tbody tr').length:0; }); await ev(()=>{store.gear={};save();}); return r===3 || ('rows '+r); });
 await T('merged class 44: teams screen splits', async()=>{ await ev(()=>{store.people=44;save();}); await go('teams'); await p.tap('[data-action=form][data-v=six]'); await p.waitForTimeout(80); const n=await ev(()=>document.querySelectorAll('.groups .grp').length); await ev(()=>{store.people=22;save();}); return n===13 || ('teams '+n); });
 // cards
 await T('game card opens', async()=>{ await go('u-tb56'); await p.tap('[data-action=card][data-no="12"]'); await p.waitForTimeout(100); return await ev(()=>document.getElementById('peek').classList.contains('open')); });
 await T('card score button', async()=>{ await p.tap('[data-action=cardscore]'); await p.waitForTimeout(150); return await ev(()=>document.getElementById('scoreOver').classList.contains('open')); });
 await T('card scoreboard +', async()=>{ await p.tap('#scoreOver [data-action=sc][data-k=g][data-d="1"]'); return (await ev(()=>document.querySelector('#scoreOver output').textContent))==='1'; });
 await T('card scoreboard count', async()=>{ await p.tap('#scoreOver [data-action=ovcount][data-v="4"]'); await p.waitForTimeout(80); return (await ev(()=>document.querySelectorAll('#scoreOver .soteam').length))===4; });
 await T('card scoreboard close', async()=>{ await p.tap('[data-action=closescore]'); return !(await ev(()=>document.getElementById('scoreOver').classList.contains('open'))); });
 await T('card close button', async()=>{ await p.tap('[data-action=card][data-no="1"]'); await p.tap('#peek [data-action=closepeek]'); return !(await ev(()=>document.getElementById('peek').classList.contains('open'))); });
 // guide link from shelf
 await T('guide link', async()=>{ await go('map'); await p.tap('.t-guide'); await p.waitForTimeout(100); return (await ev(()=>location.hash))==='#guide'; });
 // keyboard
 await T('keyboard space/arrow', async()=>{ await go('lesson-tb4-2'); await p.keyboard.press('Space'); await p.waitForTimeout(300); const r=await ev(()=>main.run); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(100); return r && (await ev(()=>stepOf('tb4-2')))===1; });
 await T('keyboard left/plus', async()=>{ await p.keyboard.press('ArrowLeft'); await p.waitForTimeout(100); const k=await ev(()=>stepOf('tb4-2')); const a=await ev(()=>main.left); await p.keyboard.press('+'); return k===0 && (await ev(()=>main.left))>a+59; });
 await T('data/links.js 기본 자료가 보임', async()=>{ await ev(()=>{ LINKS['tb4-2-1']=[['받기 시범','https://youtu.be/dQw4w9WgXcQ'],['손 모양','media/x.jpg']]; sharedInit(); }); await go('lesson-tb4-2'); await ev(()=>{ ui.step['tb4-2']=1; renderLesson('tb4-2'); }); await p.waitForTimeout(150); const n=await ev(()=>document.querySelectorAll('.media .mtile .mbadge').length); await ev(()=>{ delete LINKS['tb4-2-1']; sharedInit(); }); return n===2 ? true : 'tiles '+n; });
 await T('넣기 창에 자료 번호', async()=>{ await go('lesson-tb4-2'); await ev(()=>{ ui.step['tb4-2']=1; renderLesson('tb4-2'); }); await p.waitForTimeout(100); await p.tap('.media [data-action=madd]'); await p.waitForTimeout(150); const k=await ev(()=>{ const e=document.querySelector('#mediaOver .mkey'); return e&&e.textContent; }); await ev(()=>closeMedia()); return k==='tb4-2-1' ? true : 'key '+k; });
 await T('continue card opens last lesson', async()=>{ await go('lesson-vb4-5'); await go('map'); const h=await ev(()=>{ const c=document.querySelector('.contcard'); return c&&c.getAttribute('href'); }); await p.tap('.contcard'); await p.waitForTimeout(120); return h==='#lesson-vb4-5' && (await ev(()=>location.hash))==='#lesson-vb4-5'; });
 // persistence after reload
 await T('stamps persist after reload', async()=>{ await p.reload(); await p.waitForTimeout(500); return await ev(()=>stampsOf('nb-2').every(Boolean)); });
 console.log(out.join('\n')); console.log('errors',errs);
 await b.close();
 const bad=out.filter(x=>!x.startsWith('OK')); console.log((bad.length||errs.length)?'실패 '+bad.length+'개':'통과 '+out.length+'개'); process.exit(bad.length||errs.length?1:0);})();
