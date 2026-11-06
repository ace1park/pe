/* 파일용 HTML 안에 넣는 '읽기 화면'(메신저·파일 미리보기용)을 앱 자료로 새로 만듦 · make_single.py가 부름 */
const {chromium}=require('playwright');
const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage();
 await p.goto('file://'+require('path').resolve(__dirname,'..','index.html')); await p.waitForTimeout(600);
 const withDiag = true;
 const html=await p.evaluate((withDiag)=>{
  const E=esc;
  let o='';
  const units=UORDER;
  o+=`<header class="st-head"><b>내 손 안의 체육</b><span>읽기 화면 · ${units.length}개 단원 ${units.reduce((a,u)=>a+UMETA[u].grades.reduce((b,g)=>b+lessonsOf(u,g).length,0),0)}차시</span></header>
  <div class="st-note"><b>미리보기 화면입니다.</b> 휴대폰의 파일·메일·메신저 미리보기에서는 타이머·소리·점수판·팀 나누기가 작동하지 않아 이 읽기 화면이 보입니다. 전체 기능은 Safari·Chrome 같은 브라우저로 링크를 열어 쓰세요. 아래 목록에서 단원과 차시를 누르면 해당 내용으로 이동합니다.</div>
  <nav class="st-toc" id="st-top"><h2>단원 목록</h2><ul>`;
  units.forEach(u=>{ const m=UMETA[u]; o+=`<li><b>${E(m.title)}</b> <small>${E(m.area)}</small><div>${m.grades.map(g=>`<a href="#st-${u}-${gk(g)}">${g}학년 (${lessonsOf(u,g).length}차시)</a>`).join(' ')}${m.cards?` <a href="#st-cards">게임 카드 28장</a>`:''}</div></li>`; });
  o+=`</ul></nav>`;
  units.forEach(u=>{ const m=UMETA[u], sp=m.sport;
    m.grades.forEach(g=>{
      o+=`<section class="st-unit" id="st-${u}-${gk(g)}"><h2>${E(m.title)} · ${g}학년</h2><p class="st-sub">${E(m.area)} · ${E(m.sub)}</p>`;
      const rules=sp==='foot'?RULES:RULESBY[sp], sig=sp==='foot'?SIGNAL:SIGBY[sp];
      o+=`<div class="st-box"><h3>우리의 약속</h3><ol>${rules.map(r=>`<li>${E(r)}</li>`).join('')}</ol><p><b>정지 신호</b> ${E(sig)}</p></div>`;
      stagesOf(u,g).forEach(s=>{ o+=`<div class="st-stage"><h3>${s.n}단계 ${E(s.name)} <small>${s.range}차시</small></h3><ul>${s.ids.map(id=>{const L=LI(id); return `<li><a href="#st-L-${id}">${L.n}차시 ${E(L.t)}${L.ext?' ◇':''}${L.ev?' ★':''}</a></li>`;}).join('')}</ul></div>`; });
      o+=`<p class="st-up"><a href="#st-top">↑ 단원 목록</a></p></section>`;
      lessonsOf(u,g).forEach(id=>{
        const L=LI(id), D=getD(id), r=L.rec;
        o+=`<article class="st-les" id="st-L-${id}"><h3><span>${E(m.title)} ${g}학년 · ${L.s}단계</span>${L.n}차시 ${E(L.t)}${L.ext?' ◇ 확장':''}${L.ev?' ★ 평가':''}</h3>
          <p class="st-goal"><b>학습 목표</b> ${E(D.goal)}</p>`;
        if(r){ o+=`<dl class="st-dl">${r.prep?`<dt>대형·준비</dt><dd>${E(r.prep)}</dd>`:''}${r.items?`<dt>준비물</dt><dd>${E(r.items)}</dd>`:''}${r.move?`<dt>움직임 요소</dt><dd>${E(r.move)}</dd>`:''}${r.safe?`<dt>안전</dt><dd>${E(r.safe)}</dd>`:''}${r.odd?`<dt>홀수 반</dt><dd>${E(r.odd)}</dd>`:''}</dl>`; }
        D.m.forEach((M,k)=>{
          const t=M.t||{};
          o+=`<div class="st-act"><h4><span>${SLOTS[k]} · 10분</span>${E(M.name)} <small>[${E(M.form||'')}]</small></h4>`;
          if(withDiag && isFoot(id)){ try{ o+=`<div class="st-dg">${diagHTML(id,k+1)}</div>`; }catch(e){} }
          o+=`<p class="st-k">이렇게 해요</p><ol class="st-steps">${(t.how&&t.how.length?t.how:M.steps).map(x=>`<li>${E(x)}</li>`).join('')}</ol>
            ${t.point?`<p><b>지도 포인트</b> ${E(t.point)}</p>`:''}
            <p><b>쉽게</b> ${E(t.easy||M.easy)} &nbsp;/&nbsp; <b>어렵게</b> ${E(t.hard||M.hard)}</p>
            ${!r&&t.odd?`<p><b>홀수 반</b> ${E(t.odd)}</p>`:''}${!r&&t.prep?`<p><b>대형·준비</b> ${E(t.prep)}</p>`:''}
            ${M.eval?`<p class="st-ev"><b>★ 평가</b> ${E(M.eval)}</p>`:''}</div>`;
        });
        if(r&&r.vars&&r.vars.length) o+=`<div class="st-box"><b>변형 게임</b><ul>${r.vars.map(v=>`<li>${E(v.replace(/^[①②③④⑤]\s*/,''))}</li>`).join('')}</ul></div>`;
        if(r&&r.evnote) o+=`<p class="st-ev"><b>★ 평가</b> ${E(r.evnote)}</p>`;
        o+=`<p class="st-up"><a href="#st-${u}-${gk(g)}">↑ ${E(m.title)} ${g}학년 목록</a> · <a href="#st-top">단원 목록</a></p></article>`;
      });
    });
  });
  o+=`<section class="st-unit" id="st-cards"><h2>티볼 심화 · 게임 카드 28장</h2>${TBCARDS.map(c=>`<div class="st-act"><h4><span>카드 ${String(c.no).padStart(2,'0')} · ${E(c.cat)}</span>${E(c.name)}</h4><p><b>목적</b> ${E(c.goal)}</p><p><b>인원</b> ${E(c.people)} · <b>교구</b> ${E(c.gear)} · <b>구역</b> ${E(c.area)}</p><ol class="st-steps">${c.how.map(x=>`<li>${E(x)}</li>`).join('')}</ol><p><b>점수</b> ${E(c.score)}</p><p><b>쉽게</b> ${E(c.easy)} / <b>어렵게</b> ${E(c.hard)}</p><p><b>안전</b> ${E(c.safe)}</p></div>`).join('')}<p class="st-up"><a href="#st-top">↑ 단원 목록</a></p></section>`;
  return o;
 }, withDiag);
 fs.writeFileSync(require('path').join(__dirname,'preview.html'), html);
 console.log(withDiag?'diag':'plain', (html.length/1024/1024).toFixed(2)+'MB');
 await b.close();})();
