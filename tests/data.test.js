/* 자료 점검: 모든 종목 · 학년 · 차시를 훑어서 빠진 칸이나 깨진 글자를 찾음
   - 차시마다 활동 4개 (연습1 · 게임1 · 연습2 · 게임2)
   - 활동마다 방법(4단계, 발로 하는 공놀이는 3단계) · 지도 포인트 · 쉽게/어렵게 · 대형 그림
   - 그림 틀 이름이 실제로 있는지, 그림이 오류 없이 그려지는지
   - 오늘 뭐하지? 놀이의 장소가 교실 · 강당 · 운동장 가운데 있는지('강당 · 운동장'처럼 여러 곳 가능)
   - 'undefined' · 'NaN' · 출처 · 공식 규칙 같은 넣지 않기로 한 말이 없는지
   새 종목 파일(data/units/*.js)을 고친 뒤 이 점검만 따로 돌려도 됨: node data.test.js */
const path=require('path'), fs=require('fs');
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch(); const errs=[];
 const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage(); p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+path.resolve(__dirname,'..','index.html')+'#map'); await p.waitForTimeout(700);
 const r=await p.evaluate(()=>{
  const BAD=/undefined|NaN|\[object|�|TODO|공식 규칙|정식 규칙|규정상|출처|인디스쿨/;
  const out={lessons:0,acts:0,units:0,fail:[]}; const F=(m)=>{ if(out.fail.length<40) out.fail.push(m); out.nfail=(out.nfail||0)+1; };
  UORDER.forEach(u=>{ out.units++;
   UMETA[u].grades.forEach(g=>lessonsOf(u,g).forEach(id=>{ out.lessons++;
    const D=getD(id), ms=(D&&D.m)||[], foot=isFoot(id);
    if(ms.length!==4) F(`${id} 활동 ${ms.length}개`);
    if(UMETA[u].track==='fun'){ const ps=placesOf(id); if(!ps.length||ps.some(p=>!FPLACES.includes(p))) F(`${id} 장소 '${PL[id].place}' (교실·강당·운동장 가운데에서 · 로 이어 적기)`); }
    if(!foot){ const rec=PL[id]||{}; ['items','safe','odd'].forEach(f=>{ if(!rec[f]) F(`${id} '${f}' 칸 비어 있음`); }); }
    ms.forEach((M,i)=>{ out.acts++; const at=`${id} 활동${i+1}(${M.name||'이름 없음'})`;
     const need=foot?3:4;
     if(!M.name) F(at+' 이름 없음');
     if(!M.steps||M.steps.length!==need) F(`${at} 방법 ${(M.steps||[]).length}단계 (${need}단계여야 함)`);
     if(!M.tip) F(at+' 지도 포인트 없음');
     if(!M.lite&&(!M.easy||!M.hard)) F(at+' 쉽게/어렵게 없음');
     if(!hasDiag(id,i+1)) F(at+' 대형 그림 없음');
     if(M.d){ if(!TPL[M.d.t]) F(`${at} 그림 틀 '${M.d.t}' 없음`);
       else { try{ const t=tplOf(M.d); if(!t||!t.s) F(at+' 그림이 비어 있음'); legendList(t.l||[],u); }catch(e){ F(`${at} 그림 오류: ${e.message}`); } } }
     const m=JSON.stringify(M).match(BAD); if(m) F(`${at} 넣지 않기로 한 말 '${m[0]}'`);
    });
    const m2=JSON.stringify(PL[id]||{}).match(BAD); if(m2) F(`${id} 차시 정보에 '${m2[0]}'`);
   }));
  });
  return out; });
 /* 앱 파일 수(tests · tools · .github 빼고): GitHub 웹 화면은 한 번에 100개까지 올림 */
 const root=path.resolve(__dirname,'..'); let nApp=0; (function walk(d){ for(const f of fs.readdirSync(d,{withFileTypes:true})){ if(['tests','tools','.github','.git','node_modules'].includes(f.name)&&d===root) continue; if(f.name==='node_modules') continue; const p=path.join(d,f.name); if(f.isDirectory()) walk(p); else nApp++; } })(root);
 console.log(`앱 파일 ${nApp}개`+(nApp>90?' — 90개를 넘음: 앱 묶음과 점검 묶음을 나눠 올리기':''));
 console.log(`종목 ${r.units}개 · 차시 ${r.lessons}개 · 활동 ${r.acts}개 훑음`);
 const ok=!r.nfail&&!errs.length;
 if(r.nfail){ console.log(`FAIL 고칠 곳 ${r.nfail}군데`); r.fail.forEach(x=>console.log('  - '+x)); }
 if(errs.length) console.log('FAIL 화면 오류', errs);
 if(ok) console.log('OK   빠진 칸 · 깨진 글자 · 그림 오류 없음');
 await b.close(); process.exit(ok?0:1);
})();
