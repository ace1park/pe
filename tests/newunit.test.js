/* 새 종목 점검: data/units/견본_새종목.js 를 목록에 켠 것처럼 열어 홈·단원·차시 6단계·학년 보기·오류 알림 확인 */
const path=require('path'), fs=require('fs');
const BASE=process.env.PE_URL||('file://'+path.resolve(__dirname,'..','index.html'));
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch(); const out=[]; const errs=[];
 const T=async(name,fn)=>{ try{ const r=await fn(); out.push((r===true?'OK  ':'FAIL')+' '+name+(r!==true?' '+r:'')); }catch(e){ out.push('ERR  '+name+' '+e.message.split('\n')[0]); } };
 const list=fs.readFileSync(path.resolve(__dirname,'..','data/units/list.js'),'utf8');
 const open=async(extra)=>{ const c=await b.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true}); const p=await c.newPage(); p.on('pageerror',x=>errs.push(x.message));
   await p.route(/data\/units\/list\.js$/,r=>r.fulfill({status:200,contentType:'text/javascript',body:list.replace("loadUnits([","loadUnits(["+extra)}));
   await p.goto(BASE); await p.waitForTimeout(500); return p; };
 let p=await open("'견본_새종목',");
 const ev=(f,a)=>p.evaluate(f,a), go=async h=>{ await ev(h=>{location.hash=h},h); await p.waitForTimeout(150); };
 await T('새 종목 카드가 기존 단원 뒤에', async()=>{ await ev(()=>{store.homeView='sport';render();}); return (await ev(()=>[...document.querySelectorAll('.ucard')].map(a=>a.getAttribute('href')).join(' ')))==='#u-foot-3 #u-tb4 #u-tb56 #u-bad-3 #u-vb-3 #u-ath-3 #u-nb #u-bb #u-zz #u-sc-5 #u-ck #u-fd-3 #u-fb-3' || 'cards'; });
 await T('학년 보기 5·6학년에 나옴', async()=>{ const r=await ev(()=>{store.homeView='grade';store.homeGrade='5';render();const a=!!document.querySelector('.ucard[href="#u-zz"]');store.homeGrade='4';render();const c=!!document.querySelector('.ucard[href="#u-zz"]');return [a,c];}); return (r[0]&&!r[1])||JSON.stringify(r); });
 await T('단원 화면 차시 2개', async()=>{ await go('u-zz'); return (await ev(()=>document.querySelectorAll('.node').length))===2 || 'nodes'; });
 await T('차시 6단계 모두 열림', async()=>{ const r=await ev(()=>{ const bad=[]; for(const id of ['zz-1','zz-2']) for(let k=0;k<6;k++){ try{ ui.route='lesson-'+id; ui.step[id]=k; renderLesson(id); if(!document.querySelector('#app h1')) bad.push(id+'/'+k); }catch(e){ bad.push(id+'/'+k+':'+e.message); } } return bad; }); return !r.length || r.join(', '); });
 await T('약속·정지 신호·대형 그림', async()=>{ await go('lesson-zz-1'); const a=await ev(()=>{ ui.step['zz-1']=0; renderLesson('zz-1'); return document.querySelector('.rules').textContent.includes('디스크는 사람을 향해')&&document.querySelector('.rules').textContent.includes('멈추고 디스크'); }); const d=await ev(()=>{ const r=[]; for(let k=1;k<=4;k++){ ui.step['zz-1']=k; renderLesson('zz-1'); r.push(!!document.querySelector('svg.diagram')); } return r.join(); }); return (a&&d==='true,true,true,true')||(a+' '+d); });
 await T('수업 중 모드', async()=>{ const r=await ev(()=>{ store.classMode=true; ui.step['zz-2']=2; renderLesson('zz-2'); const ok=!!document.querySelector('.cm-name'); store.classMode=false; return ok; }); return r||'cm'; });
 await T('빈 활동은 채움 안내', async()=>{ return (await ev(()=>PL['zz-2'].D.m.length===4)) || 'm'; });
 await T('오류 알림 없음', async()=>{ await go('map'); return (await ev(()=>!document.querySelector('.dataerrbar'))) || 'bar'; });
 await p.context().close();
 // 목록에 없는 파일 이름 → 홈에 알림
 p=await open("'없는파일',");
 await T('없는 파일 알림', async()=>{ await p.evaluate(()=>{location.hash='#map'}); await p.waitForTimeout(200); return (await p.evaluate(()=>{ const b=document.querySelector('.dataerrbar'); return b&&b.textContent.includes('data/units/없는파일.js'); })) || 'no bar'; });
 console.log(out.join('\n')); console.log('errors',errs);
 await b.close(); const bad=out.filter(x=>!x.startsWith('OK')); console.log(bad.length||errs.length?'실패 '+bad.length+'개':'통과 '+out.length+'개'); process.exit(bad.length||errs.length?1:0);})();
