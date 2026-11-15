/* [프로그램] 활동 찾기: 이름·준비물·장소·학년·유형으로 차시와 놀이를 찾음
   - 홈의 '활동 찾기' → #find 화면. 글자를 넣으면 바로 결과가 바뀜(여러 낱말은 모두 들어간 것만)
   - 결과를 누르면 그 차시가 열리고, 찾은 활동이 있으면 그 활동 단계로 바로 감 */
let FIDX=null;
const FPLACE=['운동장','체육관·강당','교실'];
const FNOBALL=/공|볼|셔틀|원반|디스크|패들|라켓|배트|글러브|빈백|콩주머니|풍선|스틱|퍽|꼬리|인형|종이컵|신문지/;
const FTOOLU=['foot','sc','tb4','tb56','bad','vb','nb','bb','ck','fd','fb','pk'];   /* 공·라켓이 늘 있는 종목 */
function findIndex(){
  if(FIDX) return FIDX;
  FIDX=[];
  UORDER.forEach(u=>{ const U=UMETA[u]; if(!U) return;
    U.grades.forEach(g=>lessonsOf(u,g).forEach(id=>{ const L=LI(id), r=PL[id]||{}, D=getD(id); if(!L||!D) return;
      const M=D.m||[], preps=M.map(m=>(m.t&&m.t.prep)||'').join(' · ');
      const items=r.items||'', where=[r.place||'', r.prep||'', items, preps].join(' ');
      let pl=[]; if(r.place) pl=[...new Set(placeList(r.place).map(p=>p==='강당'||p==='체육관'?'체육관·강당':p))];
      else { if(/교실/.test(where)) pl.push('교실'); if(/체육관|강당|실내/.test(where)) pl.push('체육관·강당'); if(/운동장/.test(where)) pl.push('운동장'); if(!pl.length) pl=['운동장','체육관·강당']; }
      const gs=String(L.g||g).split('~').map(Number), grades=gs.length>1?Array.from({length:gs[1]-gs[0]+1},(_,k)=>gs[0]+k):gs;
      const acts=M.map((m,k)=>({k:k+1, name:m.name||'', form:m.form||'', text:[m.name,(m.steps||[]).join(' '),m.tip,m.easy,m.hard,m.t&&m.t.prep].join(' ').toLowerCase()}));
      const fun=isFunU(u);
      FIDX.push({id, u, n:L.n, t:L.t, sn:L.sn||'', g:L.g||g, grades, pl, fun, type:fun?'fun':ugroup(u), ev:!!L.ev, items:items||preps, ball:FTOOLU.includes(u)||FNOBALL.test(items+' '+preps+' '+M.map(m=>(m.steps||[]).join(' ')).join(' ')),
        head:[L.t,L.sn,U.title].join(' ').toLowerCase(), body:[items,r.prep,preps,D.goal].join(' ').toLowerCase(), acts});
    })); });
  return FIDX;
}
ui.find=ui.find||{q:'', place:'', grade:'', track:'', type:'', nob:false, ev:false, pair:false, show:30};
const FGROUPS=[
 ['place','장소',FPLACE.map(v=>[v,v])],
 ['grade','학년',[['3','3학년'],['4','4학년'],['5','5학년'],['6','6학년']]],
 ['track','갈래',[['learn','차근차근(단원)'],['fun','오늘 뭐하지?']]],
 ['type','유형',[['inv','영역형'],['field','필드형'],['net','네트형'],['skill','기술형']]]];
const FQUICK=['콘','풍선','줄넘기','빈백','술래','릴레이','이어달리기','빈 곳','작전','심판'];
function findResults(){
  const F=ui.find, terms=F.q.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const out=[];
  findIndex().forEach(x=>{
    if(F.place&&!x.pl.includes(F.place)) return;
    if(F.grade&&!x.grades.includes(+F.grade)) return;
    if(F.track&&(F.track==='fun')!==x.fun) return;
    if(F.type&&x.type!==F.type) return;
    if(F.nob&&x.ball) return;
    if(F.ev&&!x.ev) return;
    if(F.pair&&!x.acts.some(a=>/2인|짝/.test(a.form))) return;
    let score=0, hit=[];
    for(const w of terms){ let s=0;
      if(x.head.includes(w)) s+=5;
      const ah=x.acts.filter(a=>a.text.includes(w)); if(ah.length){ s+=ah.some(a=>a.name.toLowerCase().includes(w))?3:2; ah.forEach(a=>{ if(!hit.includes(a)) hit.push(a); }); }
      if(x.body.includes(w)) s+=1;
      if(!s) return; score+=s; }
    out.push({x,score,hit:hit.sort((a,b)=>a.k-b.k)});
  });
  if(terms.length) out.sort((a,b)=>b.score-a.score);
  return out;
}
function findCardHTML({x,hit}){
  const U=UMETA[x.u], where=x.fun?`오늘 뭐하지? · ${x.pl.join(' · ')}`:`${x.g}학년 ${x.n}차시`;
  const step=hit.length?hit[0].k:0;
  return `<button class="fres" style="--uc:${U.color}" data-action="findgo" data-id="${x.id}" data-k="${step}">
    <span class="frtop"><b>${esc(U.title)}</b> · ${where}${x.ev?' · ★ 평가':''}</span>
    <span class="frt">${esc(x.t)}</span>
    ${hit.length?`<span class="fracts">${hit.slice(0,3).map(a=>`<i>${SLOTS[a.k-1]} · ${esc(a.name)}</i>`).join('')}</span>`:`<span class="fracts"><i class="sub">${esc(x.sn)}</i></span>`}
    <small>${esc((x.items||'').slice(0,60))}${(x.items||'').length>60?'…':''}</small></button>`;
}
function paintFind(){
  const box=document.getElementById('findRes'); if(!box) return;
  const F=ui.find, R=findResults(), any=F.q.trim()||F.place||F.grade||F.track||F.type||F.nob||F.ev||F.pair;
  document.getElementById('findCnt').textContent=any?`${R.length}개 찾음`:`모두 ${R.length}개 · 낱말을 넣거나 아래에서 골라 보세요`;
  box.innerHTML=R.length?R.slice(0,F.show).map(findCardHTML).join('')+(R.length>F.show?`<button class="btn fmore" data-action="fmore">${R.length-F.show}개 더 보기</button>`:'')
    :`<p class="fnone">찾는 것이 없어요. 낱말을 줄이거나 고른 조건을 풀어 보세요.</p>`;
  document.querySelectorAll('[data-action=ff]').forEach(b=>{ const g=b.dataset.g, v=b.dataset.v; b.setAttribute('aria-pressed', g==='cond'? String(!!F[v]) : String(F[g]===v)); });
  const clr=document.getElementById('findClr'); if(clr) clr.hidden=!any;
  const nf=['place','grade','track','type'].filter(k=>F[k]).length+['nob','ev','pair'].filter(k=>F[k]).length, fn=document.getElementById('fnum'); if(fn) fn.textContent=nf?`고른 것 ${nf}`:'';
}
function renderFind(){
  const F=ui.find;
  app.innerHTML=`<section class="findp">
   <h1 class="fit">활동 찾기</h1>
   <div class="fbar"><input id="findQ" type="search" inputmode="search" autocomplete="off" placeholder="예: 콘, 술래, 풍선, 빈 곳, 릴레이" value="${esc(F.q)}" aria-label="찾을 낱말"><button class="btn ghost" id="findClr" data-action="fclear" hidden>모두 지우기</button></div>
   <div class="fquick" aria-label="자주 찾는 낱말">${FQUICK.map(w=>`<button class="pill" data-action="fq" data-v="${w}">${w}</button>`).join('')}</div>
   <details class="fopts" id="fopts" ${F.open??matchMedia('(min-width:760px)').matches?'open':''}><summary>장소 · 학년 · 유형 · 조건 고르기 <b id="fnum"></b></summary>
   ${FGROUPS.map(([g,lab,opts])=>`<div class="fgrp" role="group" aria-label="${lab}"><span>${lab}</span>${opts.map(([v,t])=>`<button class="pill" data-action="ff" data-g="${g}" data-v="${v}" aria-pressed="false">${t}</button>`).join('')}</div>`).join('')}
   <div class="fgrp" role="group" aria-label="조건"><span>조건</span>${[['nob','공·도구 없이'],['pair','짝 활동 있음'],['ev','★ 평가 차시']].map(([v,t])=>`<button class="pill" data-action="ff" data-g="cond" data-v="${v}" aria-pressed="false">${t}</button>`).join('')}</div></details>
   <p class="fcnt" id="findCnt" aria-live="polite"></p>
   <div class="fres-list" id="findRes"></div></section>`;
  paintFind();
}
function findAction(a,t){
  const F=ui.find;
  if(a==='ff'){ const g=t.dataset.g, v=t.dataset.v; if(g==='cond') F[v]=!F[v]; else F[g]=F[g]===v?'':v; if(g==='type'&&F.type) F.track=''; if(g==='track'&&F.track==='fun') F.type=''; F.show=30; paintFind(); return true; }
  if(a==='fq'){ F.q=t.dataset.v; const i=document.getElementById('findQ'); if(i) i.value=F.q; F.show=30; paintFind(); return true; }
  if(a==='fclear'){ Object.assign(F,{q:'',place:'',grade:'',track:'',type:'',nob:false,ev:false,pair:false,show:30}); const i=document.getElementById('findQ'); if(i) i.value=''; paintFind(); return true; }
  if(a==='fmore'){ F.show+=30; paintFind(); return true; }
  if(a==='findgo'){ const raw=t.dataset.id, id=isNaN(+raw)?raw:+raw, k=+t.dataset.k||0; ui.step[id]=k; ui.cleared[id]=false; location.hash='lesson-'+raw; return true; }
  return false;
}
document.addEventListener('input',e=>{ if(e.target&&e.target.id==='findQ'){ ui.find.q=e.target.value; ui.find.show=30; clearTimeout(ui.findT); ui.findT=setTimeout(paintFind,120); } });
document.addEventListener('toggle',e=>{ if(e.target&&e.target.id==='fopts') ui.find.open=e.target.open; },true);
