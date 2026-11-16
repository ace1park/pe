/* 활동 찾기 점검: 낱말 · 장소 · 학년 · 유형 · 조건 · 결과를 누르면 그 활동 단계로 · 지우기 · 화면 밖 넘침 */
const path=require('path');
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch(); const out=[]; const errs=[]; const T=(n,ok)=>out.push((ok?'OK  ':'FAIL')+' '+n);
 for(const [w,h] of [[320,640],[390,844],[1280,800]]){
  const c=await b.newContext({viewport:{width:w,height:h},isMobile:w<800,hasTouch:w<800}); const p=await c.newPage(); p.on('pageerror',e=>errs.push(e.message));
  const tap=s=>w<800?p.tap(s):p.click(s); const cnt=()=>p.evaluate(()=>parseInt(document.getElementById('findCnt').textContent.replace(/[^0-9]/g,''))||0);
  await p.goto('file://'+path.resolve(__dirname,'..','index.html')+'#map'); await p.waitForTimeout(600);
  await tap('.hfind'); await p.waitForTimeout(250);
  T(w+' 찾기 화면 열림', await p.evaluate(()=>document.body.dataset.page==='find'));
  const all=await cnt(); T(w+' 전체 500개 넘음', all>500);
  await p.fill('#findQ','술래'); await p.waitForTimeout(250); const n1=await cnt(); T(w+' 낱말로 줄어듦', n1>0&&n1<all);
  if(!(await p.evaluate(()=>document.getElementById('fopts').open))) { await tap('#fopts>summary'); await p.waitForTimeout(100); }
  await tap('[data-action=ff][data-g=place][data-v="운동장"]'); await p.waitForTimeout(150); const n2=await cnt(); T(w+' 장소로 더 줄어듦', n2>0&&n2<=n1);
  T(w+' 넘침 없음', await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await tap('[data-action=fclear]'); await p.waitForTimeout(150); T(w+' 모두 지우기', (await cnt())===all);
  await tap('[data-action=ff][data-g=cond][data-v=nob]'); await p.waitForTimeout(150);
  T(w+' 공·도구 없이: 공 종목 없음', await p.evaluate(()=>![...document.querySelectorAll('.fres .frtop b')].some(x=>/공놀이|티볼|배드민턴|배구|농구|넷볼|피클볼|플로어볼|츄크볼|디스크|축구/.test(x.textContent))));
  await tap('[data-action=fclear]'); await p.fill('#findQ','풍선'); await p.waitForTimeout(250);
  const want=await p.evaluate(()=>{const b=document.querySelector('.fres'); return [b.dataset.id,+b.dataset.k];});
  await tap('.fres'); await p.waitForTimeout(350);
  T(w+' 결과 누르면 그 활동 단계', await p.evaluate(w=>location.hash==='#lesson-'+w[0] && stepOf(curId())===w[1],want));
  await c.close(); }
 console.log(out.join('\n')); console.log('errors',errs); const fail=out.some(x=>x.startsWith('FAIL'))||errs.length; console.log(fail?'실패':'통과 '+out.length+'개'); if(fail) process.exitCode=1; await b.close(); })();
