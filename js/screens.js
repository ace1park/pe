/* [프로그램] 화면 만들기: 홈·단원·차시·수업 중 모드·팀 나누기·점수판·안내사항 */
/* ===== 6인부터 고르는 연습·게임 형태 =====
   활동마다 원안 대신 6인(3:3)·8인(4:4)·10인(5:5) 모둠으로 바꿔 진행. 종합 게임은 해당하지 않음 */
const BIGF={
  s6:{size:6, side:3, label:'6인 모둠', vs:'3:3'},
  s8:{size:8, side:4, label:'8인 모둠', vs:'4:4'},
  s10:{size:10, side:5, label:'10인 모둠', vs:'5:5'}
};
/* 종목 열쇠 맞추기: 단원 자료의 sport 값(bm·at)을 배드민턴·육상 규칙에 연결 */
function bsp(sp){ return sp==='bm'?'bad':sp==='at'?'ath':sp; }
function bigList(sp){ return bsp(sp)==='bad'?['s6']:bsp(sp)==='ath'?['s6','s10']:['s6','s8','s10']; }
function bigSide(sp,f){ return bsp(sp)==='bad'?2:bsp(sp)==='ath'?null:BIGF[f].side; }
function bigVs(sp,f){ return bsp(sp)==='bad'?'2:2 복식':bsp(sp)==='ath'?'모둠 대항':BIGF[f].vs; }
/* 모둠 인원: 편이 있는 게임은 '편×2' 이상이 되도록 floor, 육상은 크기에 가깝게 round */
function bigSizes(sp,f,N){
  const sz=BIGF[f].size, side=bigSide(sp,f);
  let cnt = side ? Math.floor(N/Math.max(sz, side*2)) : Math.round(N/sz);
  cnt=Math.max(1,cnt);
  const out=[...Array(cnt)].map((_,i)=>Math.floor(N/cnt)+(i<N%cnt?1:0)); return out;
}
function bigOk(sp,f,N){ const side=bigSide(sp,f), sz=BIGF[f].size;
  if(side){ if(N<side*2) return false; const z=bigSizes(sp,f,N); return Math.min(...z)>=side*2 && Math.max(...z)-side*2<=(bsp(sp)==='bad'?4:side); }
  if(N<sz-1) return false; const z=bigSizes(sp,f,N); return Math.min(...z)>=sz-1 && Math.max(...z)<=sz+2; }
function isWholeGame(n,i){
  const L=LI(n), M=getD(n).m[i-1]; if(!M) return false;
  const nm=M.name||'', sn=L.sn||'';
  if(/리그|라운드|결정전|결승전|결승 후반|시상|친선전|최종전/.test(nm)) return true;
  if((i===2||i===4) && /경기|리그|축제|종합|풋살/.test(sn) && /경기|게임/.test(nm)) return true;
  return false;
}
function bigGroups(sp,f,N,seed){
  const R0=store.people, sizes=bigSizes(sp,f,R0); let nums=[...Array(R0)].map((_,i)=>i+1);
  let s=seed*9301+49297; const rnd=()=>{s=(s*9301+49297)%233280; return s/233280;};
  for(let i=nums.length-1;i>0;i--){ const j=Math.floor(rnd()*(i+1)); [nums[i],nums[j]]=[nums[j],nums[i]]; }
  const out=[]; let p=0; for(const z of sizes){ out.push(nums.slice(p,p+z).sort((a,b)=>a-b)); p+=z; }
  lastMoved=new Set(); if(!absList().length) return out;
  const r=keepGroups(out,bigSizes(sp,f,N)); lastMoved=r.moved; return r.groups;
}
function bigGroupsHTML(sp,f,N,seed){
  const side=bigSide(sp,f), groups=bigGroups(sp,f,N,seed);
  let h='<div class="groups biggroups">';
  groups.forEach((g,gi)=>{
    const A=side?g.slice(0,side):g, B=side?g.slice(side,side*2):[], R=side?g.slice(side*2):[];
    h+=`<div class="grp bigg"><h3>${gi+1}모둠${side?` · ${gi+1}번 구역`:''}<small class="${R.length?'':'n'}">${g.length}명${R.length?` · 교대 ${R.length}명`:''}</small></h3>`;
    if(side){
      h+=`<div class="bside"><b style="--v:${VESTS[0][1]}">빨강</b><div class="jerseys">${A.map(x=>jz(x,VESTS[0][1])).join('')}</div></div>`;
      h+=`<div class="bside"><b style="--v:${VESTS[1][1]}">파랑</b><div class="jerseys">${B.map(x=>jz(x,VESTS[1][1])).join('')}</div></div>`;
      if(R.length) h+=`<div class="bside"><b class="sub">교대</b><div class="jerseys">${R.map(x=>jz(x,'#6f7d73')).join('')}</div></div>`;
    } else h+=`<div class="jerseys">${g.map(x=>jz(x,COL.mint)).join('')}</div>`;
    h+='</div>';
  });
  return h+'</div>'+absLine();
}
function bigHow(sp,f,practice){
  const side=bigSide(sp,f), vs=bigVs(sp,f), k=BIGF[f].label;
  if(bsp(sp)==='bad') return practice
    ? ['모둠 안에서 2명씩 짝 짓기','한 짝은 치고, 다른 짝은 세기·줍기','1분마다 짝끼리 바꾸기']
    : ['2:2 복식으로 한 판 하기','남은 친구는 점수 부르기·심판','점수가 나면 진 쪽 1명 교대'];
  if(bsp(sp)==='ath') return practice
    ? ['모둠마다 줄 하나, 순서 정하기','한 명씩 이 연습 하기','기다리는 친구는 출발 신호·기록']
    : ['모둠끼리 이 게임 이어 하기','모둠 기록 합계 내기','지난번 우리 모둠 기록 넘기기'];
  return practice
    ? [`모둠마다 구역 하나 · 콘 4개로 네모`,`${side}명씩 두 줄로 마주 서서 이 연습 하기`,`한 바퀴 돌면 줄 바꾸기 · 남는 친구는 세기`]
    : [`조끼 2색으로 ${side}명씩 편 나누기`,`같은 규칙으로 ${vs} 하기`,`점수가 나면 교대 1명 들어가기`];
}
function bigOdd(sp,f){
  if(bsp(sp)==='ath') return '모둠 인원이 1명 다르면 모둠 기록은 합계 대신 평균으로 비교함';
  if(bsp(sp)==='bad') return '교대는 점수가 날 때마다 1명씩 · 남는 친구는 점수·심판을 맡아 혼자 쉬는 친구가 없게 함';
  return '교대 친구는 점수가 날 때(또는 1분마다) 막 뛴 친구와 1명씩 바꿈 · 교대가 없는 모둠도 1분마다 위치 바꾸기';
}
function bigFold(n,i,key){
  const sp=UMETA[LI(n).unit].sport;
  if(isWholeGame(n,i)) return `<p class="bignote"><b>종합 게임</b>6~10명 모둠으로 바꾸는 형태에는 해당하지 않아요. 단원에서 정한 팀과 규칙으로 진행해요.${isSmall(todayN())?` 소규모 학급(${todayN()}명)은 '우리 반 나누기'의 팀 수로 줄여서 해요.`:''}</p>`;
  const N=todayN(); let cur=(store.big||{})[key]||''; const practice=(i===1||i===3);
  if(cur&&!bigOk(sp,cur,N)) cur='';
  const can=bigList(sp).filter(f=>bigOk(sp,f,N)); if(!can.length) return '';
  const opts=[['','원안 그대로'],...can.map(f=>[f,`${BIGF[f].label.replace(' 모둠','')} ${bigVs(sp,f)}`])];
  let inner=`<div class="row bigpick">${opts.map(([v,t])=>`<button class="pill" aria-pressed="${cur===v}" data-action="bigform" data-key="${key}" data-v="${v}">${t}</button>`).join('')}</div><p class="bighint">오늘 인원(${N}명)으로 할 수 있는 형태만 나와요.</p>`;
  if(!cur) inner+=`<p class="bighint">${practice?'연습':'게임'}을 6명 이상 모둠으로 바꿔 하고 싶을 때 고르세요. 고르면 모둠 나누기와 진행 방법이 나와요.${isSmall(N)?` 소규모 학급(${N}명)은 반 전체가 한 모둠이 될 수 있어요.`:''}</p>`;
  else { const sz=bigSizes(sp,cur,N);
    inner+=`<div class="bighead"><b>${BIGF[cur].label} · ${bigVs(sp,cur)}</b><span>${N}명 → ${sz.length}모둠 (${sz.join('·')}명)${sz.length>1?` · 구역 ${sz.length}곳`:''}</span></div>
      <ol class="bighow">${bigHow(sp,cur,practice).map(x=>`<li>${esc(x)}</li>`).join('')}</ol>
      ${bigGroupsHTML(sp,cur,N,ui.seed)}
      <div class="oddnote"><b>남는 친구</b> · ${esc(bigOdd(sp,cur))}</div>
      <div class="row" style="margin-top:10px"><button class="btn y" data-action="reshuffle">다시 섞기</button><small style="color:var(--muted);font-weight:600">원안의 활동 이름·규칙은 그대로, 인원만 바꿔요 · 구역 사이는 넉넉히 띄우기</small></div>`; }
  const summ=`연습·게임 형태 바꾸기 <em>${cur?`${BIGF[cur].label} ${bigVs(sp,cur)}`:'6~10명 모둠'}</em>`;
  return fold('big-'+key, summ, inner, ICON_TEAM);
}
function bigChip(key,n){ const f=(store.big||{})[key]; if(!f) return ''; const sp=UMETA[LI(n).unit].sport; if(!bigOk(sp,f,todayN())||isWholeGame(n,+String(key).split('-').pop())) return ''; return `<span class="chip bigchip">${BIGF[f].label} ${bigVs(sp,f)} 진행 중</span>`; }

/* 성공 인증 왕관: 차시 마지막 '수업 끝'을 누르면 차시 번호 공이 왕관으로 바뀜 */
function lessonDone(id){ return !!stampsOf(id)[5]; }
function crownSVG(num,cls=''){ const g='cg'+Math.random().toString(36).slice(2,7);
  return `<svg class="crown ${cls}" viewBox="0 0 100 100" aria-hidden="true"><defs><linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe56b"/><stop offset=".55" stop-color="#ffc21a"/><stop offset="1" stop-color="#e09a00"/></linearGradient></defs>
  <path d="M12 36 L31 58 L50 22 L69 58 L88 36 L83 90 H17 Z" fill="url(#${g})" stroke="#1c2a21" stroke-width="5" stroke-linejoin="round"/>
  <circle cx="12" cy="32" r="7" fill="#ffe56b" stroke="#1c2a21" stroke-width="4"/><circle cx="50" cy="17" r="8" fill="#ffe56b" stroke="#1c2a21" stroke-width="4"/><circle cx="88" cy="32" r="7" fill="#ffe56b" stroke="#1c2a21" stroke-width="4"/>
  <circle cx="50" cy="47" r="5.5" fill="#e2463b" stroke="#1c2a21" stroke-width="2.5"/><path d="M24 44 l3,-6 M76 44 l-3,-6" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".8"/>
  ${num!=null?`<text x="50" y="87" text-anchor="middle" font-family="Black Han Sans, Gothic A1, sans-serif" font-size="${String(num).length>1?38:44}" font-weight="800" fill="#1c2a21" stroke="#fff6cc" stroke-width="6" paint-order="stroke">${num}</text>`:''}</svg>`; }
const CROWN_MINI=`<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M12 36 L31 58 L50 22 L69 58 L88 36 L83 90 H17 Z" fill="#ffc21a" stroke="#1c2a21" stroke-width="8" stroke-linejoin="round"/></svg>`;
function unitProgress(unit){ let done=0,all=0; UMETA[unit].grades.forEach(g=>lessonsOf(unit,g).forEach(id=>{ all++; if(lessonDone(id)) done++; })); return [done,all]; }
/* 단원 카드 학년 표시: 3·4·5·6학년처럼 이어지면 '3~6학년' 한 개로 묶어 한 줄에 */
function gradeLabel(gs){ if(gs.length<2||gs.some(g=>!/^\d$/.test(g))) return gs; const n=gs.map(Number); return n.every((v,i)=>!i||v===n[i-1]+1)?[n[0]+'~'+n[n.length-1]]:gs; }
/* 만든 사람: 홈 아래 · 안내사항 맨 위와 맨 아래에 보임 */
const MAKER='박찬수';
/* 홈: 학년으로 보기 / 종목으로 보기 (고른 방식과 학년은 다음에도 기억) */
const HGRADES=['3','4','5','6'];
function gradeHas(gv,G){ const [a,b]=String(gv).split('~').map(Number); return b?(+G>=a&&+G<=b):String(gv)===String(G); }
function unitGradeFor(u,G){ return UMETA[u].grades.find(gv=>gradeHas(gv,G)); }
function gradeProgress(u,gv){ const ids=lessonsOf(u,gv); return [ids.filter(lessonDone).length, ids.length]; }
function ucardHTML(u,gv){ const m=UMETA[u], [d,a]=gv?gradeProgress(u,gv):unitProgress(u);
  if(!a) return dataErrHTML(u);
  return `<a class="ucard" href="${unitRoute(u,gv||m.grades[0])}" style="--uc:${m.color}"><span class="uicon">${sportIcon(u)}</span>
      <span class="utext"><span class="uarea">${m.area}</span><b class="fit">${m.title}</b><small class="fit">${m.sub}</small>
      <span class="ugr">${gradeLabel(gv?[gv]:m.grades).map(g=>`<i>${g}학년</i>`).join('')}<i class="cnt">${a}차시</i>${d?`<i class="done crowncnt">${CROWN_MINI}<span class="cw">왕관 </span>${d}</i>`:''}</span></span></a>`; }
/* 이어서 하기: 마지막으로 연 차시(왕관을 받았으면 같은 단원의 다음 차시) */
function contHTML(){
  let id=store.last; if(id==null) return '';
  try{ let L=LI(id), tag='이어서 하기';
    if(lessonDone(id)&&isFunU(L.unit)) return '';
    if(lessonDone(id)){ const ids=lessonsOf(L.unit,L.g), k=ids.indexOf(id); if(k<0||k===ids.length-1) return ''; id=ids[k+1]; L=LI(id); tag='다음 차시'; }
    const U=UMETA[L.unit], st=stampsOf(id).filter(Boolean).length;
    return `<a class="contcard" href="#lesson-${id}" style="--uc:${U.color}"><span class="uicon">${sportIcon(L.unit)}</span><span class="ctext"><small>${tag}</small><b class="fit">${isFunU(L.unit)?'오늘 뭐하지? · '+esc(U.title):esc(U.title)+' '+(U.grades.length>1?L.g+'학년 ':'')+L.n+'차시'}</b><span class="fit">${esc(L.t.split(' — ')[0])}</span></span><i>${st?`활동 도장 ${st}/6`:'시작하기'} →</i></a>`;
  }catch(e){ return ''; }
}
function renderShelf(){
  const view=store.homeView==='sport'?'sport':'grade', G=HGRADES.includes(store.homeGrade)?store.homeGrade:null;
  let h=`<section class="hero"><div><h1 class="fit">내 손 안의 <em>체육</em></h1><p class="hlead">${store.track==='fun'?'장소를 고르고 놀이를 누르면 40분 한 판이 바로 시작돼요.':view==='grade'?'학년을 고르고, 종목을 고르고, 차시 번호를 누르면 수업이 시작돼요.':'종목을 고르고, 학년을 고르고, 차시 번호를 누르면 수업이 시작돼요.'}</p></div><div class="art">${heroArt()}</div></section>
  ${(window.DATAERR||[]).length?`<div class="dataerrbar"><b>자료 파일을 확인해 주세요</b>${[...new Set(window.DATAERR)].map(x=>`<span><code>${esc(x)}</code></span>`).join('')}<small>따옴표(")·쉼표(,)·괄호가 빠졌는지 보고, 바로 전에 고친 곳을 되돌리면 다시 나옵니다.</small></div>`:''}
  ${todayHTML()}
  ${contHTML()}
  ${trackHTML()}`;
  if(store.track==='fun'){ h+=funHomeHTML()+toolsHTML(); app.innerHTML=h; return; }
  h+=`<div class="hview" role="group" aria-label="보는 방식">${[['grade','학년으로 보기'],['sport','종목으로 보기']].map(([v,t])=>`<button aria-pressed="${view===v}" data-action="hview" data-v="${v}">${t}</button>`).join('')}</div>`;
  if(view==='grade'){
    h+=`<nav class="hgrade" aria-label="학년 고르기">${HGRADES.map(g=>`<button aria-pressed="${G===g}" data-action="hgrade" data-v="${g}">${g}학년</button>`).join('')}</nav>`;
    if(!G) h+=`<p class="hpick fit">가르치는 학년을 골라 주세요</p>`;
    else { const us=LUNITS().filter(u=>unitGradeFor(u,G)), n=us.reduce((a,u)=>a+gradeProgress(u,unitGradeFor(u,G))[1],0);
      h+=`<h2 class="sec">${G}학년 종목 <small>${n}차시 · ${us.length}개 단원</small></h2><section class="shelf">${us.map(u=>ucardHTML(u,unitGradeFor(u,G))).join('')}</section>`; }
  } else {
    h+=`<h2 class="sec">종목 고르기 <small>${totalLessons()}차시 · ${LUNITS().length}개 단원</small></h2><section class="shelf">${LUNITS().map(u=>ucardHTML(u)).join('')}</section>`;
  }
  h+=toolsHTML()+`<footer class="maker">만든 사람 · ${MAKER}</footer>`;
  app.innerHTML=h;
}
function toolsHTML(){ return `
  <h2 class="sec">수업 도구</h2><section class="tools">
    <a class="tool" href="#teams">${ICON_TEAM}<span>팀 나누기<small>번호로 짝·모둠·팀</small></span></a>
    <a class="tool" href="#score">${ICON_SCORE}<span>점수판<small>골과 페어플레이</small></span></a>
  </section>`; }
/* 두 갈래 고르기: 차근차근 배울까?(단원) · 오늘 뭐하지?(40분 놀이 한 판) */
function trackHTML(){ const t=store.track==='fun'?'fun':'learn';
  return `<div class="htrack" role="group" aria-label="수업 고르기">${[['learn','차근차근 배울까?','단원으로 깊게 배우기'],['fun','오늘 뭐하지?','40분 놀이 한 판']].map(([v,b,s])=>`<button aria-pressed="${t===v}" data-action="track" data-v="${v}"><b>${b}</b><small>${s}</small></button>`).join('')}</div>`; }
function funIds(place){ return FUNITS().flatMap(u=>UMETA[u].grades.flatMap(g=>lessonsOf(u,g))).filter(id=>!place||(PL[id].place||UMETA[PL[id].unit].place)===place); }
const FPLACES=['교실','강당','운동장'];
function funHomeHTML(){
  const has=FPLACES.filter(p=>funIds(p).length);
  if(!has.length) return `<p class="hpick">아직 놀이가 없어요</p>`;
  const P=has.includes(store.fplace)?store.fplace:has[0], ids=funIds(P);
  return `${diceHTML()}<nav class="hgrade fplace" aria-label="장소 고르기">${has.map(p=>`<button aria-pressed="${P===p}" data-action="fplace" data-v="${p}">${p}<small>${funIds(p).length}가지</small></button>`).join('')}</nav>
   <h2 class="sec">${P}에서 <small>${ids.length}가지 · 한 판 40분 · ${todayN()}명</small></h2>
   <section class="fcards">${ids.map(funCardHTML).join('')}</section>`;
}
function funCardHTML(id){
  const r=PL[id], U=UMETA[r.unit], ok=lessonDone(id), st=stampsOf(id).filter(Boolean).length;
  return `<a class="fcard ${ok?'crowned':''}" href="#lesson-${id}" style="--uc:${U.color}"><span class="fno">${r.n}</span>
    <span class="ftext"><b class="fit">${esc(r.t)}</b><small>${esc(r.D.m.map(m=>m.name).join(' → '))}</small><em>준비물 · ${esc(r.items)}</em></span>
    <span class="fgo">${ok?CROWN_MINI+'다시':st?'이어 하기':'시작'} →</span></a>`;
}
/* 단원 화면 */
function qcardHTML(id){
  const L=LI(id), st=stampsOf(id).filter(Boolean).length, ok=lessonDone(id);
  return `<a class="qcard ${ok?'crowned':''}" href="#lesson-${id}"><span class="qicon">${anyIcon(id)}<b>${L.n}</b>${ok?`<span class="qcrown">${crownSVG(null)}</span>`:''}</span>
    <span class="qtext"><span class="qz fit">${L.n}차시${L.ext?' ◇':''}${L.ev?' ★':''} · 활동 도장 ${st}/6</span><h3 class="fit">${esc(L.t.split(' — ')[0])}</h3>${L.t.includes(' — ')?`<span class="qsub fit">${esc(L.t.split(' — ').slice(1).join(' — '))}</span>`:''}</span>
    <span class="qacts">${L.acts.map((a,i)=>`<i>${SLOTS[i]} ${esc(a)}</i>`).join('')}</span>
    ${ok?'<span class="qok">성공 왕관 받은 차시</span>':''}<span class="qgo">${ok?'다시 하기':st?'이어 하기':'시작하기'} →</span></a>`;
}
/* 난이도 기본값: 발로 하는 공놀이 3학년은 '쉽게'부터 */
function diffDefault(n){ return isFoot(n)&&n>100?'easy':'base'; }
/* 단원·차시 수는 자료에서 바로 셈 (자료를 고치면 저절로 맞음) */
function totalLessons(){ return LUNITS().reduce((a,u)=>a+unitProgress(u)[1],0); }
function totalsText(){ const gs=[...new Set(LUNITS().flatMap(u=>UMETA[u].grades.flatMap(g=>String(g).split('~').map(Number))))].sort((a,b)=>a-b); return `${gs[0]}~${gs[gs.length-1]}학년 · ${LUNITS().length}개 단원 · ${totalLessons()}차시`; }
/* 자료 파일을 읽지 못했을 때(따옴표·쉼표 빠짐 등) 알려 주는 칸 */
function dataFile(u){ return u==='foot'?'data/foot.js':'data/units/'+u+'.js'; }
function dataErrHTML(u){ const m=UMETA[u]; return `<div class="ucard dataerr" style="--uc:${m.color}"><span class="utext"><span class="uarea">자료를 읽지 못했어요</span><b>${esc(m.title)}</b><small><code>${dataFile(u)}</code> 파일에서 따옴표(")·쉼표(,)·괄호가 빠졌는지 확인해 주세요. 바로 전에 고친 곳을 되돌리면 다시 나옵니다.</small></span></div>`; }
function renderUnit(unit,g){
  const m=UMETA[unit]; ui.unit=unit; ui.grade=g;
  if(!unitProgress(unit)[1]){ app.innerHTML=`<section class="shelf">${dataErrHTML(unit)}</section>`; return; }
  let h=`<section class="uhead" style="--uc:${m.color}">
    <div class="urow"><span class="uicon">${sportIcon(unit)}</span><div><span class="uarea">${m.area}</span><h1 class="fit">${m.title}</h1><p>${m.sub}</p></div></div>
    ${m.grades.length>1?`<nav class="gtabs" aria-label="학년">${m.grades.map(x=>`<a href="${unitRoute(unit,x)}" ${x===g?'aria-current="page"':''}>${x}학년 <small>${lessonsOf(unit,x).length}차시</small></a>`).join('')}</nav>`:''}
  </section>
  <h2 class="sec">${m.grades.length>1?g+'학년 ':''}단계별 차시 <small>번호를 누르면 시작 · 순서는 자유 · ◇ 선택 차시 · ★ 평가 차시</small></h2>
  <ol class="path">`;
  for(const s of stagesOf(unit,g)){
    const sk=unit+'-'+gk(g)+'-'+s.n, sel=ui.sel[sk];
    h+=`<li class="pstage" style="--c:${s.c}"><span class="pnum">${s.n}</span><div class="pbody">
      <div class="phead"><div><h3 class="fit">${s.n}단계 ${esc(s.name)}</h3><small>${s.range}차시</small></div><svg class="zicon" viewBox="0 0 116 68" aria-hidden="true">${unit==='foot'&&ZICON[s.n]?ZICON[s.n]():`<g transform="translate(26,-1) scale(1.08)">${SPICON[m.sport]()}</g>`}</svg></div>
      <div class="nodes" style="--n:${s.ids.length}">${s.ids.map(id=>{ const L=LI(id), k=stampsOf(id).filter(Boolean).length, ok=lessonDone(id), pop=ok&&ui.justCrowned===id;
        return `<button class="node ${sel===id?'play':''} ${ok?'crowned':''} ${pop?'pop':''}" ${ok?'':`style="background-image:url('${BALLURI}')"`} data-action="open" data-n="${id}" data-sk="${sk}" aria-pressed="${sel===id}" aria-label="${L.n}차시 ${esc(L.t)}${ok?' · 성공 왕관':''}">${ok?crownSVG(L.n):L.n}${L.ev?'<span class="star">★</span>':''}${L.ext?'<span class="ext">◇</span>':''}${!ok&&k?'<span class="doing"></span>':''}</button>`;}).join('')}</div>
      <ul class="ztitles">${s.ids.map(id=>{const L=LI(id); return `<li><b>${L.n}</b>${esc(L.t)}${L.ev?' ★':''}${L.ext?' ◇':''}</li>`;}).join('')}</ul>
      <div class="pick" id="pick-${sk}">${sel?qcardHTML(sel):''}</div>
    </div></li>`;
  }
  h+=`</ol>`;
  if(m.cards) h+=cardsHTML();
  app.innerHTML=h;
  if(ui.justCrowned!=null){ const jc=ui.justCrowned; ui.justCrowned=null; const el=app.querySelector('.node.pop'); if(el){ setTimeout(()=>{ chime(); el.scrollIntoView({behavior:'smooth',block:'center'}); },350); } }
}
/* 티볼 게임 카드 28장 */
function cardsHTML(){
  const cats=[...new Set(TBCARDS.map(c=>c.cat))];
  return `<h2 class="sec">게임 카드 28장 <small>스포츠클럽·체육 행사·자투리 시간에 바로</small></h2><section class="gcards">${cats.map(c=>`<div class="gcat"><h3>${c}</h3><div class="gclist">${TBCARDS.filter(x=>x.cat===c).map(x=>`<button class="gcard" data-action="card" data-no="${x.no}"><b>${String(x.no).padStart(2,'0')}</b><span class="fit">${esc(x.name)}</span><small>${esc(x.people)}</small></button>`).join('')}</div></div>`).join('')}</section>`;
}
function openCard(no){
  const c=TBCARDS.find(x=>x.no===no), box=document.getElementById('peekBox');
  box.style.setProperty('--c',UMETA.tb56.color);
  box.innerHTML=`<p style="margin:0;font-weight:800;color:var(--muted)">게임 카드 ${String(no).padStart(2,'0')} · ${esc(c.cat)}</p><h3 id="peekTitle">${esc(c.name)}</h3>
   <p class="cgoal">${esc(c.goal)}</p>
   <dl class="cdl"><dt>인원</dt><dd>${esc(c.people)}</dd><dt>교구</dt><dd>${esc(c.gear)}</dd><dt>구역</dt><dd>${esc(c.area)}</dd></dl>
   <ol>${c.how.map((x,i)=>`<li><span>${'①②③④⑤'[i]}</span>${esc(x)}</li>`).join('')}</ol>
   <dl class="cdl"><dt>점수</dt><dd>${esc(c.score)}</dd><dt>쉽게</dt><dd>${esc(c.easy)}</dd><dt>어렵게</dt><dd>${esc(c.hard)}</dd><dt>안전</dt><dd>${esc(c.safe)}</dd></dl>
   <div class="row"><button class="btn y" data-action="cardscore">점수판 열기</button><button class="btn" data-action="closepeek">닫기</button></div>`;
  document.getElementById('peek').classList.add('open'); box.querySelector('button').focus();
}

/* ===== 편성 ===== */
function buildGroups(form,people,seed,shuffle=true){
  const R0=store.people, sizes=sizesOf(form,R0);
  let nums=[...Array(R0)].map((_,i)=>i+1);
  if(shuffle){ let s=seed*9301+49297; const rnd=()=>{s=(s*9301+49297)%233280; return s/233280;};
    for(let i=nums.length-1;i>0;i--){ const j=Math.floor(rnd()*(i+1)); [nums[i],nums[j]]=[nums[j],nums[i]]; } }
  const out=[]; let p=0; for(const z of sizes){ out.push(nums.slice(p,p+z).sort((a,b)=>a-b)); p+=z; }
  lastMoved=new Set(); if(!absList().length) return out;
  const r=keepGroups(out,sizesOf(form,todayN())); lastMoved=r.moved; return r.groups;
}
const courtStyle=(form,n)=>form==='six'||(form==='four'&&n>4);
function teamDefs(form,count){
  if((form==='six'||form==='four')&&courtStyle(form,sizesOf(form,todayN()).length)) return [...Array(sizesOf(form,todayN()).length)].map((_,i)=>{ const v=VESTS[(i%2)+(Math.floor(i/2)%2?2:0)]; return {nm:`${Math.floor(i/2)+1}경기장 ${v[0]}`, c:v[1], court:Math.floor(i/2)+1}; });
  if(form==='four') return VESTS.slice(0,sizesOf('four',todayN()).length).map(([n,c])=>({nm:n+' 팀',c}));
  if(form==='half') return VESTS.slice(0,2).map(([n,c])=>({nm:n+' 팀',c}));
  const all=[...VESTS,['보라','#7b4fc9'],['주황','#e0700f']]; return all.slice(0,count).map(([n,c])=>({nm:n+' 팀',c}));
}
function groupsHTML(form,people,seed,shuffle=true){
  const F=FORMS[form], groups=buildGroups(form,people,seed,shuffle), sizes=sizesOf(form,people);
  const base=Math.min(...sizes), uneven=base!==Math.max(...sizes);
  const vests=(form==='four'||form==='six'||form==='half')?teamDefs(form):null, cs=courtStyle(form,groups.length);
  const nM=Math.ceil(groups.length/2), cOK=Math.min(gear().courts||nM,gear().balls||nM)>=nM;
  let h='<div class="groups">';
  groups.forEach((g,i)=>{
    const t=vests?vests[i]:null;
    if(cs&&i%2===0) h+=`<div class="court">${cOK?`${i/2+1}번 경기장`:`${i/2+1}경기`}</div>`;
    else if(form==='four'&&!cs&&!cOK&&i%2===0) h+=`<div class="court">${i/2+1}경기</div>`;
    const title=t?(cs?t.nm.split(' ')[1]+' 팀':t.nm):`${i+1}${F.unit}`;
    const extra=uneven&&g.length>base;
    h+=`<div class="grp" style="${t?`--v:${t.c}`:''}"><h3><span class="gt">${title}</span><small class="${extra?'':'n'}">${g.length}명${extra?' · 홀수 반':''}</small></h3><div class="jerseys">${g.map(x=>jz(x,t?t.c:COL.mint)).join('')}</div></div>`;
  });
  h+='</div>';
  if(uneven) h+=`<div class="oddnote"><b>${people%2?'홀수 반':'인원이 다른 모둠'}</b> · ${esc(oddText(form,sizes))}</div>`;
  h+=smallNote(form,people)+absLine();
  return h;
}
function scoreHTML(key,form,count){
  const defs=teamDefs(form,count), S=store.scores[key]||(store.scores[key]={});
  return `<div class="scores">${defs.map((t,i)=>{ const v=S[i]||{g:0,f:0};
    return `<div class="srow" style="--v:${t.c}">${jersey('',t.c)}<b class="sname fit">${esc(t.nm)}</b>
      ${[['g','골',GOALICON],['f','페어플레이',STARICON]].map(([k,lab,ic])=>`<div class="sc"><span>${ic}${lab}</span><button aria-label="${esc(t.nm)} ${lab} 빼기" data-action="sc" data-key="${key}" data-i="${i}" data-k="${k}" data-d="-1">−</button><output data-sc="${key}|${i}|${k}">${v[k]}</output><button aria-label="${esc(t.nm)} ${lab} 더하기" data-action="sc" data-key="${key}" data-i="${i}" data-k="${k}" data-d="1">+</button></div>`).join('')}
    </div>`;}).join('')}</div>
    <p class="fpx"><b>페어플레이 ★ 주는 때</b> · 넘어진 친구 일으켜 주기 · 판정 받아들이기 · "괜찮아" 말하기 · 같은 편 응원하기</p>
    <button class="btn ghost" data-action="scorereset" data-key="${key}" style="padding:6px 12px">점수 모두 0으로</button>`;
}
function fold(id,summary,inner,icon=''){ return `<details class="fold" id="f-${id}" ${ui.open[id]?'open':''}><summary>${icon}<span>${summary}</span></summary><div class="fold-in">${inner}</div></details>`; }
const ICON_TEAM=`<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 12 L14 9 Q18 12 22 9 L28 12 L33 18 L28 21 L27 38 L9 38 L8 21 L3 18 Z" fill="${COL.blue}" stroke="${COL.ink}" stroke-width="2"/><path d="M20 16 L26 13 Q30 16 34 13 L40 16 L45 22 L40 25 L39 42 L21 42 L20 25 L15 22 Z" fill="${COL.red}" stroke="${COL.ink}" stroke-width="2"/></svg>`;
const ICON_SCORE=`<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="4" y="10" width="40" height="28" rx="6" fill="${COL.ink}"/><text x="24" y="31" text-anchor="middle" font-family="Black Han Sans, sans-serif" font-size="17" fill="${COL.mk}">2:1</text></svg>`;
const ICON_GUIDE=`<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M6 10 Q16 6 24 12 Q32 6 42 10 V38 Q32 34 24 40 Q16 34 6 38 Z" fill="#fff" stroke="${COL.ink}" stroke-width="2.5"/><line x1="24" y1="12" x2="24" y2="40" stroke="${COL.ink}" stroke-width="2"/><path d="M10 17 h9 M10 23 h9 M29 17 h9 M29 23 h9" stroke="${COL.turf||'#168b4b'}" stroke-width="2.5"/></svg>`;
const ICON_PLAN=`<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="9" y="6" width="30" height="38" rx="4" fill="#fff" stroke="${COL.ink}" stroke-width="2.5"/><rect x="17" y="3" width="14" height="7" rx="2" fill="${COL.mk}" stroke="${COL.ink}" stroke-width="2"/><path d="M15 19 h18 M15 26 h18 M15 33 h11" stroke="${COL.ink}" stroke-width="2.5"/></svg>`;

function renderPeek(n){
  const b=fBase(n), l=LESSONS.find(x=>x.n===b), s=STAGES[l.s-1], box=document.getElementById('peekBox');
  box.style.setProperty('--c',s.c);
  box.innerHTML=`<p style="margin:0;font-weight:800;color:var(--muted)">${s.n}단계 ${esc(s.name)} · ${b}차시${EVAL[b]?' · ★ '+EVAL[b]:''}</p>
   <h3 id="peekTitle">${esc(l.t)}</h3>
   <ol>${l.acts.map((a,i)=>`<li><span>${SLOTS[i]}</span>${esc(a)}</li>`).join('')}</ol>
   <p style="margin:0 0 14px;font-size:15px;color:var(--muted)">이 차시의 미션 카드는 아직 넣지 않았어요. 샘플에는 1차시와 14차시만 들어 있어요.</p>
   <button class="btn" data-action="closepeek" style="width:100%">닫기</button>`;
  document.getElementById('peek').classList.add('open'); box.querySelector('button').focus();
}

/* ===== 차시 화면 ===== */
function stepName(k,D){ return k===0?'약속':k===5?'돌아보기':SLOTS[k-1]; }
/* ===== 수업 중 모드: 휴대폰을 힐끗 보고 바로 진행하는 화면 =====
   지금 할 일(활동 이름) · 남은 시간 · 이렇게 해요 · 꿀팁 · 팀 · 다음 활동만 크게. 자세한 지도안은 '자세히'에서 */
function cmPeek(title,inner){
  const box=document.getElementById('peekBox'); box.style.removeProperty('--c');
  box.innerHTML=`<h3 id="peekTitle">${title}</h3>${inner}<div class="row" style="margin-top:12px"><button class="btn" data-action="closepeek">닫기</button></div>`;
  document.getElementById('peek').classList.add('open');
}
function cmTeamInfo(n,i){
  const D=getD(n), M=D.m[i-1], key=n+'-'+i, sp=UMETA[LI(n).unit].sport, N=todayN(), game=(i===2||i===4);
  const bf=(store.big||{})[key];
  if(bf && !isWholeGame(n,i) && bigOk(sp,bf,N)){ const z=bigSizes(sp,bf,N); return {label:`${BIGF[bf].label} ${bigVs(sp,bf)} · ${z.length}모둠`, html:()=>bigGroupsHTML(sp,bf,N,ui.seed)+`<div class="oddnote"><b>남는 친구</b> · ${esc(bigOdd(sp,bf))}</div>`+gearNote(bigSide(sp,bf)?'big':'bignoside',z,game)}; }
  const form=M.fm?(M.fm==='none'?null:M.fm):MFORM[bkey(key)];
  if(!form) return {label:`모두 1인 1공 · ${N}명`, html:null};
  const F=FORMS[form], z=sizesOf(form,N);
  return {label:`${N}명 → ${z.length}${F.unit} (${szText(z)})`, html:()=>groupsHTML(form,N,ui.seed)+gearNote(form,z,game)};
}
function renderClass(n){
  const D=getD(n), l=LI(n), st=stampsOf(n), i=stepOf(n), U=UMETA[l.unit], sp=U.sport;
  document.getElementById('brandTitle').textContent=U.title; document.getElementById('brandSub').textContent='수업 중 모드';
  const M=(i>=1&&i<=4)?D.m[i-1]:null, key=n+'-'+i, title=l.t.split(' — ')[0];
  let h=`<section class="cm" style="--c:${l.c}">
   <div class="cm-top"><a class="cm-back" href="${unitRoute(l.unit,l.g)}" aria-label="단원으로">←</a><b class="cm-where fit">${isFunU(l.unit)?esc(U.title):l.n+'차시'} · ${esc(title)}</b><button class="cm-exit" data-action="classmode" data-v="0">자세히 보기</button></div>
   <nav class="cm-dots" aria-label="차시 순서">${[0,1,2,3,4,5].map(k=>`<button class="${st[k]?'done':''}" ${k===i?'aria-current="step"':''} data-action="step" data-k="${k}">${stepName(k,D)}</button>`).join('')}</nav>`;
  if(i===0){
    const rules=sp==='foot'?RULES:RULESBY[sp];
    h+=`<div class="cm-card"><div class="cm-slot">출발 전 · 약속</div>
      <ol class="cm-steps cm-rules">${rules.map(r=>`<li><span class="fit">${esc(r)}</span></li>`).join('')}</ol>
      <p class="cm-sig"><b>정지 신호</b><span class="fit">${esc(sp==='foot'?SIGNAL:SIGBY[sp])}</span></p>
      ${l.rec&&l.rec.safe?`<p class="cm-tip"><b>오늘 안전</b><span>${esc(l.rec.safe)}</span></p>`:''}
      <div class="cm-row"><button class="cm-chip" data-action="cmpeople">오늘 ${todayN()}명 · 바꾸기</button><button class="cm-chip" data-action="abs0">결석·지각${absList().length?' '+absList().length+'명':''}</button><button class="cm-chip" data-action="gear">경기장·공</button>${mediaItems(n+'-0').length?`<button class="cm-chip" data-action="mview" data-key="${n}-0" data-id="${esc(mediaItems(n+'-0')[0].id)}">차시 영상·사진 ${mediaItems(n+'-0').length}</button>`:''}</div>
      <p class="cm-next">다음 · 연습1 <b>${esc(D.m[0]?D.m[0].name:'')}</b></p></div>`;
  } else if(i===5){
    const em=store.emo[n]||{};
    h+=`<div class="cm-card"><div class="cm-slot">마무리 · 돌아보기</div>
      ${ui.cleared[n]?`<div class="clear crownwin">${crownSVG(l.n,'big')}<b>차시 완료!</b><span>성공 인증 왕관을 받았어요</span></div>`:''}
      <ol class="cm-steps">${D.reflect.map(p=>`<li><span class="fit">${esc(p)}</span></li>`).join('')}</ol>
      <div class="emos cm-emos">${Object.entries(EMOS).map(([g,ws],gi)=>{const k=['pos','mid','neg'][gi]; return `<div class="row">${ws.map(w=>`<button class="${k}" data-action="emo" data-w="${w}">${w}${em[w]?`<i>${em[w]}</i>`:''}</button>`).join('')}</div>`;}).join('')}</div>
      <p class="cm-next">${ui.cleared[n]?'다음 · 처음 화면':'다음 · 수업 끝 ✓'}</p></div>`;
  } else {
    const T=M.lite?{label:'',html:null}:cmTeamInfo(n,i), lv=store.diff[key]||diffDefault(n);
    const lvText=M.lite?'':lv==='easy'?M.easy:lv==='hard'?M.hard:'기본 방법대로 해요';
    const nx=i<4?`${SLOTS[i]} <b>${esc(D.m[i]?D.m[i].name:'')}</b>`:'돌아보기';
    const mi=mediaItems(key);
    h+=`<div class="cm-card"><div class="cm-slot">${SLOTS[i-1]} · 10분${M.eval?' · ★ 평가':''}</div>
      <h1 class="cm-name fit">${esc(M.name)}</h1>
      <button class="cm-time" data-action="play" aria-label="타이머"><span id="bigTime">10:00</span><small data-role="playlabel">눌러서 시작</small><i id="bigProg"></i></button>
      ${M.steps?`<ol class="cm-steps">${M.steps.map(x=>`<li><span class="fit">${esc(x)}</span></li>`).join('')}</ol>`:''}
      ${M.tip?`<p class="cm-tip"><b>꿀팁</b><span>${esc(M.tip)}</span></p>`:''}
      ${M.lite?'':`<div class="cm-lv seg" role="group" aria-label="난이도">${[['easy','쉽게'],['base','기본'],['hard','어렵게']].map(([v,t])=>`<button aria-pressed="${lv===v}" data-action="diff" data-v="${v}" data-key="${key}">${t}</button>`).join('')}</div><p class="cm-lvtext">${esc(lvText)}</p>`}
      <div class="cm-row">${T.label?`<button class="cm-chip" ${T.html?'data-action="cmteams"':'disabled'}>${esc(T.label)}${T.html?' · 보기':''}</button>`:''}${hasDiag(n,i)?`<button class="cm-chip" data-action="cmdiag">대형 그림</button>`:''}${mi.length?`<button class="cm-chip" data-action="mview" data-key="${key}" data-id="${esc(mi[0].id)}">시범 영상·사진 ${mi.length}</button>`:''}</div>
      <p class="cm-next">다음 · ${nx}</p></div>`;
  }
  const nextLabel = i<5 ? `<small>다음</small><span>${stepName(i+1,D)} →</span>` : (ui.cleared[n]?'<small>차시 끝</small><span>단원 화면으로 →</span>':'<small>마무리</small><span>수업 끝! ✓</span>');
  h+=`</section><div class="actionbar cm-bar"><button class="b-stop" data-action="stop" aria-label="정지 신호">정지</button>
    <button class="b-plus" data-action="adj" data-d="60" aria-label="1분 더하기">+1분</button>
    <button class="b-score" data-action="openscore" aria-label="점수판 열기"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="3" fill="currentColor"/><text x="12" y="16" text-anchor="middle" font-size="9" font-family="Black Han Sans, sans-serif" fill="#2b3b31">2:1</text></svg><small>점수판</small></button>
    <button class="b-next" id="nextBtn" data-action="next">${nextLabel}</button></div>`;
  app.innerHTML=h; paintClock(); markMedia(); keepAwake(true);
}

function renderLesson(n){
  if(store.last!==n){ store.last=n; save(); }
  if(store.classMode) return renderClass(n);
  const D=getD(n), l=LI(n), s={c:l.c}, st=stampsOf(n), i=stepOf(n), U=UMETA[l.unit], sp=U.sport;
  document.getElementById('brandTitle').textContent=U.title; document.getElementById('brandSub').textContent=(U.grades.length>1?l.g+'학년':U.grades[0]+'학년')+' · '+l.s+'단계 '+l.sn;
  let h=`<section class="lhead" style="--c:${s.c}"><div class="lhrow"><a class="back" href="${unitRoute(l.unit,l.g)}">← ${isFunU(l.unit)?'오늘 뭐하지?':esc(U.title)+(U.grades.length>1?' '+l.g+'학년':'')}</a><button class="cm-toggle" data-action="classmode" data-v="1"><b>수업 중 모드</b><small>크게 보고 바로 진행</small></button></div>
    <h1><span class="licon">${anyIcon(n)}</span><span class="lno">${isFunU(l.unit)?esc(U.title):l.n+'차시'}${l.ext?' ◇':''}${l.ev?' ★':''}</span><span class="fit">${esc(l.t.split(' — ')[0])}</span></h1>${l.t.includes(' — ')?`<p class="lsubt fit">${esc(l.t.split(' — ').slice(1).join(' — '))}</p>`:''}<p class="goal fit" title="${esc(D.goal)}">오늘의 목표 · ${esc(D.short)}</p>
    <nav class="prog" aria-label="차시 순서">${[0,1,2,3,4,5].map(k=>`<button class="pill2 ${st[k]?'done':''}" ${k===i?'aria-current="step"':''} data-action="step" data-k="${k}">${stepIcon(k)}<span>${stepName(k,D)}</span></button>`).join('')}</nav></section>
  <section class="stage ${(i>=1&&i<=4&&hasDiag(n,i))?'':'one'}">`;
  if(i===0){
    h+=`<div class="card"><div class="slot">출발 전</div><h2>우리의 약속</h2>
      <ul class="rules">${(sp==='foot'?RULES:RULESBY[sp]).map((r,j)=>`<li>${sp==='foot'?RULEICON[j]:`<span class="rnum">${j+1}</span>`}<span class="fit">${esc(r)}</span></li>`).join('')}<li class="sig">${SIGICON}<span class="fit">${esc(sp==='foot'?SIGNAL:SIGBY[sp])}</span></li></ul>
      ${l.unit==='foot'&&l.g==='3'?`<div class="todaysafe g3"><b>3학년 기준</b><span>${esc(FOOT3.기준)}</span></div>`:''}
      ${l.rec&&l.rec.safe?`<div class="todaysafe"><b>오늘의 안전</b><span>${esc(l.rec.safe)}</span></div>`:''}
      <div class="tip"><b>꿀팁</b><span class="fit">다 같이 "약속!" 외치고 출발!</span></div>
      <div class="people pline"><h3>오늘 우리 반 <b>${pText()}</b> <span class="psub">이 인원으로 팀을 나눠요</span></h3>
        ${todayBar()}</div>
      ${mediaHTML(n+'-0',true)}
      <div class="folds">${l.rec?lessonFolds(l.rec,n):''}${glossFold(n+'-0',[...(sp==='foot'?RULES:RULESBY[sp]),l.t,D.goal,...(l.rec?[l.rec.safe,l.rec.odd,l.rec.items,...(l.rec.vars||[])]:[])],l.unit)}${fold('plan-'+n+'-0','선생님 메모',`<dl><dt>준비운동</dt><dd>연습1 처음 1~2분에 발목·무릎 돌리기</dd>${sp==='foot'?`<dt>공</dt><dd>${l.g==='3'?FOOT3.공:'덜 튀는 공(폼 볼, 풋살공 4호)'}</dd>`:''}<dt>정지 신호</dt><dd>아래 빨간 '정지' 버튼(단축키 S): 화면 표시 + 호루라기 소리 ${stopTimes()===1?'한':'두'} 번</dd></dl>`,ICON_PLAN)}</div>
    </div>`;
  } else if(i===5){
    const em=store.emo[n]||{}, all=st.slice(0,5).every(Boolean);
    h+=`<div class="card"><div class="slot">마무리</div><h2>오늘을 돌아봐요</h2>
      ${ui.cleared[n]?`<div class="clear crownwin">${crownSVG(l.n,'big')}<b>차시 완료!</b><span>성공 인증 왕관을 받았어요 · 단원 화면의 ${l.n}차시가 왕관으로 바뀌어요${all?'':' (건너뛴 활동도 있어요)'}</span></div>`:''}
      <div class="prompts">${D.reflect.map(p=>`<p class="fit">${esc(p)}</p>`).join('')}</div>
      <div class="emos">${Object.entries(EMOS).map(([g,ws],gi)=>{const k=['pos','mid','neg'][gi]; return `<div><h3>${FACE[k]}${g}</h3><div class="row">${ws.map(w=>`<button class="${k}" data-action="emo" data-w="${w}">${w}${em[w]?`<i>${em[w]}</i>`:''}</button>`).join('')}</div></div>`;}).join('')}</div>
      <div class="folds">${fold('plan-'+n+'-5','선생님 메모',`<dl><dt>운영</dt><dd>학생이 감정 낱말을 직접 눌러 고름. 숫자는 반 전체 합계이고 이름은 남지 않음</dd><dt>시간</dt><dd>게임2 마지막 1~2분, 스트레칭과 함께</dd><dt>지우기</dt><dd><button class="btn ghost" data-action="emoreset" style="padding:4px 10px">감정 기록 지우기</button> ${lessonDone(n)?'<button class="btn ghost" data-action="uncrown" style="padding:4px 10px">왕관 되돌리기</button>':''}</dd></dl>`,ICON_PLAN)}</div>
    </div>`;
  } else if(D.lite){
    const M=D.m[i-1], key=n+'-'+i, form=ui.liteForm[key]||'none';
    const forms=[['none','1인 1공'],['pair','2인'],['group','4인 모둠'],['six','6팀(3:3)'],['four','4팀'],['half','반 2팀']];
    let grp='';
    const gm=(i===2||i===4);
    if(form!=='none'){ const F=FORMS[form], sz=sizesOf(form,todayN()); grp=groupsHTML(form,todayN(),ui.seed)+`<div class="row" style="margin-top:10px"><button class="btn y" data-action="reshuffle">다시 섞기</button><button class="btn" data-action="abs0">결석·지각</button></div>`+gearNote(form,sz,gm); }
    else grp=gearNote('none',[todayN()],false);
    const summ = form==='none' ? `우리 반 나누기 <em>${todayN()}명 · 1인 1공</em>` : `우리 반 나누기 <em>${todayN()}명 → ${sizesOf(form,todayN()).length}${FORMS[form].unit} (${szText(sizesOf(form,todayN()))})</em>`;
    h+=`<div class="card"><div class="slot">${SLOTS[i-1]} · 10분</div><h2 class="fit">${esc(M.name)}</h2>
      ${(()=>{ const b=fBase(n); return EVAL[b]&&(i===4||(b===7&&i===3)||(b===10&&i===4))?`<div class="chips"><span class="chip">★ ${esc(EVAL[b])}</span></div>`:''; })()}
      <div class="litebox"><b>활동 이름으로 진행하는 차시</b><span>방법·대형 그림은 아직 넣지 않았어요. 지도안을 보며 타이머와 팀 나누기로 진행해요.</span></div>
      ${mediaHTML(key)}
      <div class="folds">${fold('grp-'+key, summ, `<div class="row" style="margin-bottom:10px">${forms.map(([v,t])=>`<button class="pill" aria-pressed="${form===v}" data-action="liteform" data-key="${key}" data-v="${v}">${t}</button>`).join('')}</div>${grp}`, ICON_TEAM)}
      ${bigFold(n,i,key)}${fold('sc-'+key,'점수판 <em>골 · 페어플레이</em>', scoreHTML(key,'free',form==='six'?6:form==='four'?4:2), ICON_SCORE)}</div>
    </div>`;
  } else {
    const M=D.m[i-1], key=n+'-'+i, lv=store.diff[key]||diffDefault(n), form=M.fm?(M.fm==='none'?null:M.fm):MFORM[bkey(key)], sform=M.score||MSCORE[bkey(key)];
    const lvText=lv==='easy'?M.easy:lv==='hard'?M.hard:'기본 방법대로 해요';
    let tools='';
    if(M.subs) tools+=`<div class="tools2">${M.subs.map((x,j)=>`<button class="subchip" data-action="sub" data-j="${j}" data-label="${esc(x.label)}"><b>${esc(x.label)}</b><small>누르면 바로 시작</small></button>`).join('')}</div>`;
    if(M.picker) tools+=`<div class="picker"><button class="btn" data-action="pick">${M.picker.min?'번호 뽑기':'숫자 뽑기'}</button><output id="pickOut" aria-live="polite">?</output><small>${esc(M.picker.label||'이 숫자만큼 모여요')}</small></div>`;
    if(M.light) tools+=`<div class="lightbox"><div class="lightshow" id="lightShow">신호를 눌러요</div><div class="row">${[['g','초록','공 몰기','#2fb35c'],['y','노랑','천천히','#ffd43b'],['r','빨강','멈춤!','#e2463b']].map(([k,t,w,c])=>`<button class="lbtn" style="--lc:${c}" data-action="light" data-w="${w}" data-c="${c}">${t}</button>`).join('')}</div></div>`;
    if(M.ox) tools+=`<div class="oxbox"><div class="oxq" id="oxQ">'다음 문제'를 누르면 문제가 나와요</div><div class="oxa" id="oxA"></div><div class="row"><button class="btn y" data-action="oxnext">다음 문제</button><button class="btn" data-action="oxans">정답 보기</button></div></div>`;
    let folds='';
    if(form){ const F=FORMS[form], sz=sizesOf(form,todayN());
      folds+=fold('grp-'+key,`우리 반 나누기 <em>${todayN()}명 → ${sz.length}${F.unit} (${szText(sz)})</em>`, groupsHTML(form,todayN(),ui.seed)+`<div class="row" style="margin-top:10px"><button class="btn y" data-action="reshuffle">다시 섞기</button><button class="btn" data-action="abs0">결석·지각</button></div>`+gearNote(form,sz,i===2||i===4), ICON_TEAM); }
    folds+=bigFold(n,i,key);
    if(sform) folds+=fold('sc-'+key,'점수판 <em>골 · 페어플레이</em>', sform.startsWith('free')?scoreHTML(key,'free',+sform.slice(4)||2):scoreHTML(key,sform), ICON_SCORE);
    folds+=fold('plan-'+key,'선생님 지도안 <em>목표 · 대형 · 4단계</em>',`<dl>
        <dt>학습 목표</dt><dd>${esc(D.goal)}</dd>
        <dt>대형·준비</dt><dd>${esc(M.t.prep)}</dd>
        <dt>활동 방법</dt><dd><ol>${M.t.how.map(x=>`<li>${esc(x)}</li>`).join('')}</ol></dd>
        <dt>지도 포인트</dt><dd>${esc(M.t.point)}</dd>
        <dt>수준 조절</dt><dd>쉽게: ${esc(M.t.easy)} / 어렵게: ${esc(M.t.hard)}</dd>
        ${M.t.odd?`<dt>홀수 반</dt><dd>${esc(M.t.odd)}</dd>`:''}${M.eval?`<dt>★ 평가</dt><dd>${esc(M.eval)} (교사 관찰)</dd>`:''}</dl>`, ICON_PLAN);
    folds+=glossFold(key,actTexts(M),l.unit);
    h+=`<div class="card"><div class="slot">${SLOTS[i-1]} · 10분</div><h2 class="fit">${esc(M.name)}</h2>
      <div class="chips"><span class="chip">${esc(M.form)}</span><span class="chip">${esc(M.who)}</span>${M.eval?`<span class="chip evalchip">★ ${esc(M.eval.split(' · ')[0])}</span>`:''}${bigChip(key,n)}</div>
      <div class="diagram-wrap m-only">${diagHTML(n,i)}</div>
      <ol class="howto">${M.steps.map(x=>`<li><span class="fit">${esc(x)}</span></li>`).join('')}</ol>
      <div class="tip"><b>꿀팁</b><span class="${M.tw?'wraptip':'fit'}">${esc(M.tip)}</span></div>
      ${tools}
      <div class="level"><div class="seg" role="group" aria-label="난이도 고르기">${[['easy','쉽게'],['base','기본'],['hard','어렵게']].map(([v,t])=>`<button aria-pressed="${lv===v}" data-action="diff" data-v="${v}" data-key="${key}">${t}</button>`).join('')}</div><p class="fit">${esc(lvText)}</p></div>
      ${moreHTML(key)}
      ${mediaHTML(key)}
      ${form?'':`<div class="static">모두 1인 1공 · ${todayN()}명</div>${(gear().balls&&gear().balls<todayN())?gearNote('none',[todayN()],false):''}`}
      <div class="folds">${folds}</div>
    </div>`;
  }
  const dk=(i>=1&&i<=4&&hasDiag(n,i))?n+'-'+i:null;
  h+= dk?`<aside class="clock" aria-label="대형 그림"><div class="lab"><span>대형 그림</span><span>Space 타이머 · → 다음</span></div><div class="diagram-wrap d-only">${diagHTML(n,i)}</div></aside></section>`:`</section>`;
  const nextLabel = i<5 ? `<small>다음</small><span>${stepName(i+1,D)} →</span>` : (ui.cleared[n]?'<small>차시 끝</small><span>단원 화면으로 →</span>':'<small>마무리</small><span>수업 끝! ✓</span>');
  h+=`<div class="actionbar"><button class="b-stop" data-action="stop" aria-label="정지 신호">정지</button>
    <button class="b-timer" data-action="play" aria-label="타이머"><span id="barTime">10:00</span><small data-role="playlabel">눌러서 시작</small><i id="barProg"></i></button>
    <button class="b-plus" data-action="adj" data-d="60" aria-label="1분 더하기">+1분</button>
    <button class="b-score" data-action="openscore" aria-label="점수판 열기"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="3" fill="currentColor"/><text x="12" y="16" text-anchor="middle" font-size="9" font-family="Black Han Sans, sans-serif" fill="#2b3b31">2:1</text></svg><small>점수판</small></button>
    <button class="b-next" id="nextBtn" data-action="next">${nextLabel}</button></div>`;
  app.innerHTML=h; paintClock(); markMedia();
}
function goNext(n){
  const st=stampsOf(n), i=stepOf(n);
  st[i]=true; save();
  if(i<5){ ui.step[n]=i+1; resetClock(); renderLesson(n); window.scrollTo({top:0,behavior:'smooth'}); return; }
  if(!ui.cleared[n]){ ui.cleared[n]=true; ui.justCrowned=n; renderLesson(n); confetti(); beep(2); return; }
  ui.step[n]=0; ui.cleared[n]=false; const L0=LI(n); location.hash=unitRoute(L0.unit,L0.g).slice(1);
}

/* ===== 도구 화면 ===== */
function teamForms(N){ return Object.keys(FORMS).filter(k=> k==='six'?sizesOf('six',N).length>=4 : k==='four'?N>=8 : true); }
function formLabel(k,N){ const z=sizesOf(k,N), n=z.length, mn=Math.min(...z), mx=Math.max(...z), r=mn===mx?mn+'명':mn+'~'+mx+'명';
  if(k==='pair') return '2인 (짝)'; if(k==='group') return `모둠 (${n}모둠 · ${r})`; if(k==='six') return `경기장 ${n/2}곳 · ${n}팀 (${r})`; if(k==='four') return `${n}팀 (${r})`; return `반 2팀 (${r})`; }
function renderTeams(){
  if(BIGF[ui.form]) return renderTeamsBig();
  if(!teamForms(todayN()).includes(ui.form)) ui.form='half';
  const F=FORMS[ui.form], sz=sizesOf(ui.form,todayN());
  app.innerHTML=`<section class="panel"><h1>팀 나누기</h1><p class="lead">출석 번호로 나눠요. 이름은 화면에 나오지 않아요.</p>
   <div class="opts">
    ${peopleHTML(true)}
    <div class="row"><span>오늘</span><button class="pill ${absList().length?'on':''}" data-action="abs0">결석·지각${absList().length?' '+absList().length+'명':''}</button><button class="pill" data-action="gear">경기장·공 · ${gearText()}</button></div>
    <div class="row"><span>대형</span>${teamForms(todayN()).map(k=>`<button class="pill" aria-pressed="${ui.form===k}" data-action="form" data-v="${k}">${formLabel(k,todayN())}</button>`).join('')}</div>
    ${bigTeamsRow()}
    <div class="row"><span>순서</span><button class="pill" aria-pressed="${ui.shuffle}" data-action="shuf" data-v="1">섞기</button><button class="pill" aria-pressed="${!ui.shuffle}" data-action="shuf" data-v="0">번호 순서대로</button>${ui.shuffle?'<button class="btn y" data-action="reshuffle">다시 섞기</button>':''}</div>
   </div>
   <p style="margin:0 0 10px;font-weight:800">${todayN()}명 → ${sz.length}${F.unit} (${sz.join('·')}명, 합계 ${sz.reduce((a,b)=>a+b,0)}명)</p>
   ${groupsHTML(ui.form,todayN(),ui.seed,ui.shuffle)}${gearNote(ui.form,sz,true)}
   <div class="oddnote" style="border-left-color:var(--turf)">리그용 팀은 단원 중반 전에 기능 수준을 고르게 섞어 선생님이 정하고 리그까지 유지함. 이 화면은 차시 안의 짝·모둠·연습 팀용.</div></section>`;
}
function bigTeamsRow(){ const can=Object.keys(BIGF).filter(k=>bigOk('foot',k,todayN())); return can.length?`<div class="row"><span>6~10명 모둠</span>${can.map(k=>`<button class="pill" aria-pressed="${ui.form===k}" data-action="form" data-v="${k}">${BIGF[k].label} (${BIGF[k].vs})</button>`).join('')}</div>`:''; }
function renderTeamsBig(){
  if(!bigOk('foot',ui.form,todayN())) ui.form='half';
  if(!BIGF[ui.form]) return renderTeams();
  const f=ui.form, sz=bigSizes('foot',f,todayN());
  app.innerHTML=`<section class="panel"><h1>팀 나누기</h1><p class="lead">출석 번호로 나눠요. 이름은 화면에 나오지 않아요.</p>
   <div class="opts">
    ${peopleHTML(true)}
    <div class="row"><span>오늘</span><button class="pill ${absList().length?'on':''}" data-action="abs0">결석·지각${absList().length?' '+absList().length+'명':''}</button><button class="pill" data-action="gear">경기장·공 · ${gearText()}</button></div>
    <div class="row"><span>대형</span>${teamForms(todayN()).map(k=>`<button class="pill" aria-pressed="false" data-action="form" data-v="${k}">${formLabel(k,todayN())}</button>`).join('')}</div>
    ${bigTeamsRow()}
    <div class="row"><span>순서</span><button class="btn y" data-action="reshuffle">다시 섞기</button></div>
   </div>
   <p style="margin:0 0 10px;font-weight:800">${BIGF[f].label} (${BIGF[f].vs}) · ${sz.length}모둠 (${sz.join('·')}명, 합계 ${sz.reduce((a,b)=>a+b,0)}명)</p>
   ${bigGroupsHTML('foot',f,todayN(),ui.seed)}${gearNote('big',sz,true)}
   <div class="oddnote"><b>남는 친구</b> · ${esc(bigOdd('foot',f))}</div>
   <div class="oddnote" style="border-left-color:var(--stop)"><b>종합 게임</b> · 리그·순위 결정전·티볼 경기 같은 종합 게임은 이 형태에 해당하지 않음. 단원에서 정한 팀으로 진행함.</div></section>`;
}
function renderScore(){
  app.innerHTML=`<section class="panel"><h1>점수판</h1><p class="lead">골과 페어플레이를 같은 크기로 세요. 둘 다 우리 팀 점수예요.</p>
   <div class="row" style="margin-bottom:12px"><span style="font-weight:800">팀 수</span>${[2,4,6].map(v=>`<button class="pill" aria-pressed="${ui.freeTeams===v}" data-action="teams" data-v="${v}">${v}팀</button>`).join('')}</div>
   ${scoreHTML('free-'+ui.freeTeams,'free',ui.freeTeams)}</section>`;
}
function renderGuide(){
  const key=(cls,txt,sub='')=>`<span class="gkey ${cls}">${txt}${sub?`<small>${sub}</small>`:''}</span>`;
  const sym=(svg,t)=>`<li><svg viewBox="0 0 34 22" aria-hidden="true">${svg}</svg>${t}</li>`;
  const dot=c=>`<circle cx="17" cy="11" r="7" fill="${c}" stroke="#fff" stroke-width="2"/>`;
  app.innerHTML=`<section class="guide">
  <div class="gsec ghead"><h1>안내사항</h1>
   <p class="gmaker">만든 사람 · ${MAKER}</p>
   <p class="glead">${LUNITS().length}개 단원 ${totalLessons()}차시(${LUNITS().map(u=>UMETA[u].title).join('·')})와 '오늘 뭐하지?' 놀이 ${funIds().length}가지를 화면 하나로 진행하는 수업 도우미입니다. 체육관 TV·전자칠판에 띄우거나, 선생님 휴대폰으로 같은 링크를 열어 운동장에서 쓰면 됩니다.</p>
   <div class="gquick">
    <div><b>1</b><span>학년 → 종목 → 차시 번호 누르기</span></div>
    <div><b>2</b><span>노란 카드의 <em>시작하기</em></span></div>
    <div><b>3</b><span>활동마다 <em>타이머</em> → <em>다음</em></span></div>
   </div></div>

  <div class="gsec"><h2><i>1</i>수업 전 준비</h2>
   <ol class="gsteps">
    <li><b>오늘 차시 고르기</b><span>홈 위쪽에서 <b>학년으로 보기</b>(학년을 고르면 그 학년 단원만) 또는 <b>종목으로 보기</b>(${LUNITS().length}개 단원 모두)를 고르고 종목 카드를 누릅니다. 고른 방식과 학년은 다음에도 기억합니다. 지난 시간에 하던 차시는 맨 위 <b>이어서 하기</b>로 바로 열립니다. 단계 길에서 차시 번호(공)를 누르면 안내 카드가 열립니다. 순서대로 하지 않아도 되고, 어느 차시든 바로 시작할 수 있습니다. ◇는 시간이 되면 하는 선택 차시, ★는 관찰 평가를 하는 차시입니다.</span></li>
    <li><b>배울까? 놀까? 고르기</b><span>홈 맨 위 두 버튼 중 하나를 고릅니다. <b>차근차근 배울까?</b>는 단원을 차시 순서대로 배우는 정규 수업, <b>오늘 뭐하지?</b>는 단원과 상관없이 40분 한 판으로 끝나는 놀이입니다. 비 오는 날·자투리 시간·행사 전날에는 '오늘 뭐하지?'에서 교실·강당·운동장을 골라 바로 시작합니다.</span></li>
    <li><b>오늘 인원 고르기</b><span>첫 화면 '약속'의 <b>반 인원</b>을 눌러 출석부 인원을 고릅니다(합반은 25~50명). 결석·지각은 <b>결석·지각</b>에서 번호만 누르면, 나머지 친구 모둠은 그대로 두고 빈자리만 채웁니다. 빠진 번호는 그날만 기억합니다.</span></li>
    <li><b>경기장·공 넣기</b><span>처음 한 번만 하면 됩니다. <b>경기장·공</b>에 학교의 코트 수와 공 수를 넣으면, 모자랄 때 동시에 할 경기 수와 판마다 기다리는 순서를 알려 줍니다.</span></li>
    <li><b>소리 켜기</b><span>TV나 휴대폰 볼륨을 올려 둡니다. 화면을 한 번 누른 뒤부터 소리가 납니다.</span></li>
   </ol></div>

  <div class="gsec"><h2><i>2</i>수업 중 아래 버튼</h2>
   <div class="gbar">
    ${key('k-stop','정지','호루라기')}${key('k-timer','10:00','시작·멈춤')}${key('k-plus','+1분','')}${key('k-plus','점수판','')}${key('k-next','다음 →','도장 자동')}
   </div>
   <ul class="gdesc">
    <li><b>정지</b> 화면 가득 '멈춰!'가 뜨고 호루라기가 두 번 울립니다. 모든 종목이 같은 신호입니다. 타이머도 같이 멈춥니다.</li>
    <li><b>타이머</b> 누르면 10분이 시작되고, 다시 누르면 멈춥니다. 1분 남으면 빨간색이 됩니다.</li>
    <li><b>+1분</b> 활동을 조금 더 하고 싶을 때 1분씩 늘립니다.</li>
    <li><b>점수판</b> 화면 가득 큰 점수판이 열립니다. 팀 수(2·4·6팀)를 고르고 골과 페어플레이 ★를 셉니다. 위쪽 시계로 타이머도 같이 볼 수 있습니다.</li>
    <li><b>다음</b> 다음 활동으로 넘어가고 도장이 자동으로 찍힙니다. 10분이 끝나면 깜빡입니다.</li>
   </ul>
   <p class="gnote">한 차시 순서: <b>약속 → 연습1 → 게임1 → 연습2 → 게임2 → 돌아보기</b> (각 10분, 위쪽 칸을 눌러 앞뒤로 옮겨 갈 수도 있음)</p></div>

  <div class="gsec gbig"><h2><i>3</i>전자칠판에서 쓰기</h2>
   <ul class="gdesc">
    <li><b>여는 법</b> 전자칠판이나 컴퓨터의 Chrome·Edge·웨일 브라우저 주소창에 앱 주소를 넣고, 즐겨찾기(☆)에 추가해 둡니다.</li>
    <li><b>앱으로 설치</b> Chrome·Edge 주소창 오른쪽의 설치 아이콘(또는 메뉴의 '앱 설치')을 누르면 바탕 화면에 아이콘이 생깁니다. 한 번 연 뒤에는 인터넷이 끊겨도 열립니다.</li>
    <li><b>전체 화면</b> 큰 화면에서는 위쪽에 <b>전체 화면</b> 버튼이 나옵니다. 키보드 F 또는 F11로도 됩니다. 나올 때는 같은 버튼을 누르거나 Esc를 누릅니다.</li>
    <li><b>가로로 쓰기</b> 가로 화면에서는 대형 그림과 '이렇게 해요'가 나란히 나와 뒤쪽 학생도 한눈에 봅니다.</li>
    <li><b>글자 크기</b> 화면이 클수록 글자가 저절로 커집니다. 더 키우려면 Ctrl과 +, 줄이려면 Ctrl과 −, 원래대로는 Ctrl과 0을 누릅니다.</li>
    <li><b>터치</b> 전자칠판은 손가락이나 펜으로 버튼을 짧게 한 번 누릅니다. 길게 누르면 칠판 메뉴가 뜰 수 있습니다.</li>
    <li><b>소리</b> 전자칠판·스피커 볼륨을 미리 올리고, 수업 전에 화면을 한 번 눌러 둡니다. 그래야 호루라기·타이머 소리가 납니다.</li>
    <li><b>화면 꺼짐</b> 컴퓨터·전자칠판의 절전(화면 끄기) 시간이 짧으면 수업 중에 화면이 꺼질 수 있습니다. 체육 시간에는 절전 시간을 길게 해 둡니다.</li>
    <li><b>인터넷이 없는 교실</b> 받은 HTML 파일(내손안의체육_안드로이드.html)을 USB로 옮겨 더블클릭하면 인터넷 없이 열립니다.</li>
    <li><b>휴대폰과 함께</b> 기록(도장·인원·감정)은 기기마다 따로 남습니다. 한 수업은 전자칠판이나 휴대폰 중 한 기기로 진행합니다.</li>
   </ul>
   <table class="gkeys"><caption>키보드 단축키</caption><tbody>
    <tr><th><span class="kbd">Space</span></th><td>타이머 시작·멈춤</td></tr>
    <tr><th><span class="kbd">S</span></th><td>정지 신호 (한 번 더 누르면 닫기)</td></tr>
    <tr><th><span class="kbd">→</span></th><td>다음 활동</td></tr>
    <tr><th><span class="kbd">←</span></th><td>앞 활동</td></tr>
    <tr><th><span class="kbd">+</span></th><td>1분 늘리기</td></tr>
    <tr><th><span class="kbd">F</span></th><td>전체 화면 켜기·끄기</td></tr>
    <tr><th><span class="kbd">Esc</span></th><td>열린 창 닫기</td></tr>
   </tbody></table>
   <p class="gnote">단축키는 차시 수업 화면에서 작동합니다(F와 Esc는 어느 화면에서나). 한글 입력 상태에서도 됩니다.</p></div>

  <div class="gsec"><h2><i>4</i>활동 화면 읽는 법</h2>
   <div class="gcard">
    <div class="gc-row"><span class="gtag">대형 그림</span><span>위에서 내려다본 경기장. 누가 어디에 서고 어떻게 움직이는지 보여 줍니다.</span></div>
    <ul class="glegend">
     ${sym(dot(COL.mint),'나(혼자 활동)')}${sym(dot(COL.blue),'우리 편')}${sym(dot(COL.red),'수비·상대')}${sym(dot('#ff9f1c'),'골키퍼')}${sym(dot(COL.obs),'기다림·관찰')}
     ${sym(`<circle cx="17" cy="11" r="5" fill="#fff" stroke="${COL.ink}" stroke-width="1.5"/>`,'공')}
     ${sym(`<line x1="4" y1="11" x2="28" y2="11" stroke="#fff" stroke-width="2.5" stroke-dasharray="5 4"/>`,'패스(점선)')}
     ${sym(`<path d="M4,15 Q17,2 28,12" fill="none" stroke="${COL.mk}" stroke-width="3"/>`,'달리기(노란 선)')}
     ${sym(`<path d="M4,11 l4,-4 l4,8 l4,-8 l4,8 l4,-4 l3,0" fill="none" stroke="#fff" stroke-width="2"/>`,'공 몰기(물결선)')}
     ${sym(`<polygon points="17,3 11,18 23,18" fill="${COL.cone}"/>`,'콘')}
    </ul>
    <div class="gc-row"><span class="gtag">이렇게 해요</span><span>학생에게 읽어 주는 3줄. 한 줄에 한 동작입니다.</span></div>
    <div class="gc-row"><span class="gtag y">꿀팁</span><span>이 활동에서 가장 중요한 한 가지.</span></div>
    <div class="gc-row"><span class="gtag">쉽게·기본·어렵게</span><span>학생이 스스로 고르게 합니다. 고른 단계의 방법이 바로 아래에 나옵니다.</span></div>
    <div class="gc-row"><span class="gtag w">접힌 칸</span><span>필요할 때만 엽니다. <b>우리 반 나누기</b>(번호로 팀 편성), <b>점수판</b>(골·페어플레이), <b>선생님 지도안</b>(목표·준비물·4단계·지도 포인트·홀수 반), <b>낱말 풀이</b>(그 활동에 나온 경기 용어 설명).</span></div>
    <div class="gc-row"><span class="gtag y">수업 중 모드</span><span>차시 화면 위쪽의 <b>수업 중 모드</b>를 누르면 휴대폰을 힐끗 보고 진행하도록 지금 활동 이름, 큰 타이머, 이렇게 해요, 꿀팁, 팀, 다음 활동만 크게 나옵니다. 화면이 꺼지지 않고, 1분 남으면 소리·진동으로 알려 줍니다. 원래 화면은 <b>자세히 보기</b>를 누르면 돌아오며, 고른 모드는 다음에도 기억합니다.</span></div>
    <div class="gc-row"><span class="gtag w">형태 바꾸기</span><span>연습·게임을 <b class="wrap">6인(3:3)·8인(4:4)·10인(5:5) 모둠</b>으로 바꿔 진행할 때 엽니다. 모둠·편·교대 인원이 자동으로 나뉩니다. 리그·순위 결정전 같은 <b>종합 게임</b>은 해당하지 않아 안내 문구만 나옵니다.</span></div>
    <div class="gc-row"><span class="gtag">영상·사진</span><span>활동마다 시범 사진·영상·유튜브 링크를 넣어 두고 학생에게 바로 보여 줍니다. 넣는 법은 아래 자주 묻는 질문에 있습니다.</span></div>
    <div class="gc-row"><span class="gtag y">★ 평가</span><span>평가 활동 표시. 지도안 칸에 관찰할 내용이 적혀 있습니다.</span></div>
    <div class="gc-row"><span class="gtag w">약속 화면</span><span>발로 하는 공놀이를 뺀 단원은 약속 화면 아래 접힌 칸에 그 차시의 <b>오늘 준비</b>(대형·준비물), <b>홀수 반</b>, <b>변형 게임</b>이 들어 있습니다.</span></div>
   </div></div>

  <div class="gsec"><h2><i>5</i>소리 안내</h2>
   <div class="gsounds">
    <div><b>삑</b><span>타이머 시작</span></div>
    <div><b>띵동댕동</b><span>시작·이어서</span></div>
    <div><b>삑삑삑</b><span>10분 끝</span></div>
    <div><b>호루라기 ×2</b><span>정지 신호</span></div>
   </div></div>

  <div class="gsec"><h2><i>6</i>인원 나누기 규칙</h2>
   <p class="glead">출석 번호만으로 짝·모둠·팀을 나눕니다. 아래 표는 화면이 실제로 나누는 값과 같습니다. (모둠 수 · 모둠별 인원)</p>
   ${ruleTableHTML()}
   <ul class="prules">${RULES_PEOPLE.map(([k,v])=>`<li><b>${k}</b><span>${v}</span></li>`).join('')}</ul></div>

  <div class="gsec" id="g-gloss"><h2><i>7</i>낱말 풀이</h2>
   <p class="glead">경기 용어를 몰라도 수업할 수 있게 쉬운 말로 풀었습니다. 활동 화면에서도 그 활동에 나온 낱말만 골라 <b>낱말 풀이</b> 칸에 자동으로 모여 나옵니다.</p>
   ${glossGuideHTML()}</div>

  <div class="gsec"><h2><i>8</i>자주 묻는 질문</h2>
   <dl class="gfaq">
    <dt>홀수 반은 어떻게 하나요?</dt><dd>자동으로 처리합니다. 남는 1명은 3인 1조, 5인 모둠, 교대, 심판 중 활동에 맞는 방법으로 나뉘고, 그 방법이 팀 아래에 적혀 나옵니다.</dd>
    <dt>인원은 어떻게 고르나요?</dt><dd>'약속' 화면의 <b>인원 바꾸기</b>(또는 팀 나누기 화면)에서 먼저 <b>일반학급(추천 · 15~24명)</b>, <b>소규모 학급(가능 · 6~14명)</b>, <b>합반(두 반 · 25~50명)</b> 중 하나를 누르고 반 인원을 고릅니다. 결석·지각은 <b>결석·지각</b>에서 번호로 뺍니다.</dd>
    <dt>소규모 학급(6~14명)도 되나요?</dt><dd>됩니다. '약속' 화면의 <b>반 인원</b>에서 <b>소규모 학급</b>을 누른 뒤 6~14명 중 하나를 고르면 모든 연습·게임·기타 활동의 짝·모둠·팀과 점수판 팀 수가 그 인원에 맞게 다시 나뉩니다(예: 6명이면 4인 모둠 → 3인 2모둠, 6팀 3:3 → 경기장 1곳 2팀). 팀 나누기 화면에도 같은 줄이 있습니다. '연습·게임 형태 바꾸기'와 팀 나누기 화면에는 그 인원으로 할 수 있는 형태만 나옵니다. 종합 게임은 팀 수만 줄여 단원에서 정한 규칙으로 진행합니다.</dd>
    <dt>오늘 결석생이 있어요.</dt><dd>'약속' 화면의 <b>결석·지각</b>을 누르고 빠진 친구 번호만 누릅니다. 나머지 친구 모둠은 그대로 두고 빈자리만 채웁니다. 빠진 번호는 그날만 기억하고, 다음 날에는 원래 인원으로 돌아갑니다.</dd>
    <dt>휴대폰에서 앱처럼 쓰려면?</dt><dd><b>아이폰</b> Safari로 링크를 연 뒤 아래쪽 공유 버튼(네모에 위 화살표) → '홈 화면에 추가' → '추가'.<br><b>안드로이드</b> Chrome으로 링크를 연 뒤 오른쪽 위 ⋮ → '홈 화면에 추가'(또는 '앱 설치'). 삼성 인터넷은 ≡ → '현재 페이지 추가' → '홈 화면'.<br>홈 화면의 아이콘을 누르면 바로 열립니다.</dd>
    <dt>인터넷이 안 되는 체육관에서도 되나요?</dt><dd>공개 주소로 한 번 열어 두면 그 뒤로는 인터넷 없이도 열립니다. '홈 화면에 추가'를 해 두면 아이콘을 눌러 앱처럼 엽니다. 새 내용이 올라오면 인터넷이 될 때 알아서 받아 두고, 다음에 열 때 바뀝니다.</dd>
    <dt>받은 HTML 파일로도 되나요?</dt><dd><b>안드로이드</b>는 파일을 누른 뒤 'Chrome으로 열기'를 고르면 모든 기능이 작동합니다. <b>아이폰</b>은 저장된 HTML의 버튼을 실행하지 못해 파일 앱·카카오톡에서는 읽기 화면만 보입니다. 아이폰은 링크로 쓰세요. 컴퓨터(윈도·맥)는 파일을 더블클릭하면 됩니다.</dd>
    <dt>소리·진동·화면 꺼짐은?</dt><dd>화면을 한 번 누른 뒤부터 소리가 납니다. 아이폰은 옆면 무음 스위치가 켜져 있으면 소리가 나지 않습니다. 정지 신호와 10분 끝 때 안드로이드는 진동도 울립니다(아이폰은 진동 기능을 지원하지 않음). 타이머가 도는 동안에는 화면이 꺼지지 않게 해 두었습니다(지원하는 브라우저에서).</dd>
    <dt>휴대폰과 TV를 같이 써도 되나요?</dt><dd>둘 다 열 수는 있지만 기록(도장·인원·감정)은 기기마다 따로 남습니다. 한 수업은 한 기기로 진행하세요.</dd>
    <dt>학생 이름이 저장되나요?</dt><dd>아니요. 팀은 출석 번호로만 나누고, 돌아보기의 감정 낱말도 반 전체 숫자만 셉니다. 사진·영상은 선생님이 직접 넣은 것만 보입니다.</dd>
    <dt>6명 이상 모둠으로 하고 싶어요.</dt><dd>활동 화면의 <b>연습·게임 형태 바꾸기</b> 칸에서 6인 3:3, 8인 4:4, 10인 5:5 중 하나를 고릅니다(배드민턴은 6인 2:2 복식+교대, 육상은 6인·10인 모둠). 활동 이름과 규칙은 원안 그대로이고 인원만 바뀝니다. 남는 친구는 '교대'로 표시되고 점수가 날 때마다 1명씩 들어갑니다. <b>종합 게임</b>(리그·라운드·순위 결정전·티볼 경기 등)은 단원에서 정한 팀으로 진행해 이 기능에 해당하지 않습니다. 팀 나누기 화면에서도 같은 형태를 고를 수 있습니다.</dd>
    <dt>시범 영상·사진은 어떻게 넣나요?</dt><dd>활동 화면 아래 <b>활동 시범 영상·사진 넣기</b>(약속 화면은 <b>차시 영상·사진 넣기</b>)를 누릅니다. <b>사진·영상 고르기</b>는 앨범에서, <b>바로 찍기</b>는 카메라로 찍어 넣고, 유튜브 주소는 <b>영상 링크</b> 칸에 붙여 넣습니다. 넣은 자료는 작은 그림으로 줄지어 보이고, 누르면 크게 열립니다. 지우기는 크게 연 화면에서 두 번 누릅니다.</dd>
    <dt>넣은 영상을 다른 선생님도 보나요?</dt><dd><b>이 기기에만</b>: 넣은 휴대폰·컴퓨터의 그 브라우저에서만 보입니다. 받은 HTML 파일도 이 방식입니다. <b>모두에게 공유</b>: 안내서 링크의 편집 권한이 있는 선생님에게만 보이는 선택지로, 링크를 여는 모든 사람이 봅니다(파일 하나 20MB까지라 영상은 10~20초 정도). 긴 영상은 유튜브에 '일부 공개'로 올린 뒤 링크를 넣으면 어느 기기에서나 열립니다.</dd>
    <dt>아이폰으로 찍은 영상이 공유가 안 돼요.</dt><dd>공유는 MP4·WebM 영상만 됩니다. 아이폰 영상(MOV)은 올라가지 않을 수 있으니 '이 기기에만'으로 넣거나, 유튜브 링크로 넣으세요. 설정 → 카메라 → 포맷 → '높은 호환성'으로 찍으면 더 잘 올라갑니다.</dd>
    <dt>학생이 나오는 영상을 넣어도 되나요?</dt><dd>보호자 동의를 받은 것만 넣고, 얼굴은 뒷모습·먼 거리로 가리며 이름표가 보이지 않게 찍습니다. 공유 자료는 링크를 여는 모든 사람이 보니, 학생이 나오는 자료는 '이 기기에만'을 권합니다. 배경 음악은 저작권 문제 없는 것만 씁니다.</dd>
    <dt>기록이 사라질 수 있나요?</dt><dd>브라우저 기록을 지우면 도장과 감정 기록이 지워질 수 있습니다. 성적에 쓰는 기록은 따로 적어 두세요.</dd>
    <dt>리그 순위는 어떻게 매기나요?</dt><dd>리그표가 있는 차시(발로 하는 공놀이 19·20차시)의 경기 화면 리그표에 골과 페어플레이 ★를 넣고 '경기 끝'을 누르면 순위가 자동으로 계산됩니다. 이기면 3점, 비기면 2점, 져도 1점이고 ★ 1개는 1점입니다.</dd>
    <dt>다른 종목으로 바꾸려면?</dt><dd>오른쪽 위 홈 버튼 → 종목 카드를 누르면 됩니다. 다른 학년 단원은 '학년으로 보기'에서 학년을 바꾸거나 '종목으로 보기'를 누릅니다. 도장과 점수는 종목·차시마다 따로 남습니다.</dd>
    <dt>경기 용어를 잘 몰라요.</dt><dd>활동 화면 아래 <b>낱말 풀이</b> 칸을 열면 그 활동에 나온 용어만 쉬운 말로 나옵니다. 전체 목록은 이 안내사항의 7번에 있습니다. 학생에게는 '이렇게 해요' 세 줄만 읽어 주어도 활동이 됩니다.</dd>
    <dt>차시를 건너뛰어도 되나요?</dt><dd>됩니다. 홈에서 원하는 차시 번호를 누르면 됩니다. 끝낸 차시는 왕관, 하다 만 차시는 노란 점으로 표시됩니다.</dd>
   </dl></div>

  <div class="gsec gend"><h2><i>✎</i>만든 사람</h2>
   <p class="glead">${MAKER}</p>
   <p class="gnote">수업에서 고칠 곳이나 더 넣고 싶은 활동이 있으면 만든 사람에게 알려 주세요.</p></div>
  </section>`;
}
function curId(){ return ui.route.startsWith('lesson-')?toId(ui.route.slice(7)):null; }
function lessonFolds(r,n){
  let h='';
  h+=fold('prep-'+n,'오늘 준비 <em>대형·준비물</em>',`<dl><dt>대형·준비</dt><dd>${esc(r.prep||'-')}</dd><dt>준비물</dt><dd>${esc(r.items||'-')}</dd>${r.move?`<dt>움직임 요소</dt><dd>${esc(r.move)}</dd>`:''}<dt>학습 목표</dt><dd>${esc(r.D.goal)}</dd></dl>`,ICON_PLAN);
  if(r.odd) h+=fold('odd-'+n,'홀수 반 <em>남는 1명 처리</em>',`<p style="margin:0">${esc(r.odd)}</p>`,ICON_TEAM);
  if(r.vars&&r.vars.length) h+=fold('var-'+n,'변형 게임 <em>'+r.vars.length+'가지</em>',`<ul style="margin:0;padding-left:18px">${r.vars.map(v=>`<li>${esc(v.replace(/^[①②③④⑤]\s*/,''))}</li>`).join('')}</ul>`,ICON_PLAN);
  if(r.evnote) h+=fold('ev-'+n,'★ 평가 <em>관찰 내용</em>',`<p style="margin:0">${esc(r.evnote)}</p>`,ICON_PLAN);
  return h;
}
function render(){
  document.body.classList.toggle('lesson', ui.route.startsWith('lesson-'));
  document.body.dataset.page = ui.route.startsWith('lesson-')?'lesson':(ui.route||'map');
  if(ui.route==='teams') renderTeams();
  else if(ui.route==='score') renderScore();
  else if(ui.route==='guide') renderGuide();
  else if(ui.route.startsWith('lesson-')) renderLesson(curId());
  else if(ui.route.startsWith('u-')){ const [,u,g]=ui.route.split('-'); const m=UMETA[u]; if(m.track==='fun'){ store.track='fun'; save(); renderShelf(); } else { const gg=m.grades.find(x=>gk(x)===g)||m.grades[0]; renderUnit(u,gg); } }
  else renderShelf();
  if(!ui.route.startsWith('lesson-')){ document.getElementById('brandTitle').textContent=ui.route.startsWith('u-')?UMETA[ui.route.split('-')[1]].title:'내 손 안의 체육'; document.getElementById('brandSub').textContent=ui.route.startsWith('u-')?UMETA[ui.route.split('-')[1]].area:totalsText(); }
}
function route(){
  const h=(location.hash||'#map').slice(1);
  const okLesson=h.startsWith('lesson-') && (()=>{ const id=toId(h.slice(7)); return isFoot(id)?((id>=1&&id<=20)||(id>=101&&id<=120)):!!PL[id]; })();
  const okUnit=/^u-[a-z0-9]+(-\d+)?$/.test(h) && !!UMETA[h.split('-')[1]];
  const next=['map','teams','score','guide'].includes(h)||okLesson||okUnit?h:'map';
  if(next!==ui.route){ resetClock(); if(!next.startsWith('lesson-')) keepAwake(false); }
  ui.route=next; document.getElementById('scoreOver').classList.remove('open'); render(); window.scrollTo(0,0);
}
window.addEventListener('hashchange',route);


/* ===== 첫 화면 재미 요소: 오늘 인사 · 오늘의 꿀팁 · 내 왕관 · 놀이 뽑기 주사위 ===== */
const DAYLINE=['일요일 · 쉬는 날도 가볍게 움직이기','월요일 · 한 주를 여는 첫 체육!','화요일 · 몸이 풀리는 날','수요일 · 한 주의 한가운데, 힘내요','목요일 · 조금만 더 달려 볼까요','금요일 · 신나게 한 판!','토요일 · 주말에도 몸 쓰는 하루'];
const TIPS=['물은 목마르기 전에 한 모금','준비운동 2분이 다치는 걸 막아요','"괜찮아!" 한마디가 팀을 살려요','공은 허리 아래로, 웃음은 크게','진 팀에게 먼저 박수 치기','어제보다 한 번 더, 그게 기록이에요','호루라기 두 번이면 바로 멈춤','신발 끈은 출발 전에 꽉','쉬는 친구도 응원으로 함께 뛰어요','처음은 쉽게, 익숙해지면 어렵게','넘어진 친구 먼저 일으키기','잘한 친구 이름 불러 칭찬하기','숨이 차면 코로 마시고 입으로 후','오늘 처음 해 본 동작 하나 찾기'];
function dayNo(){ const d=new Date(); return Math.floor((d-new Date(d.getFullYear(),0,0))/864e5); }
function myCrowns(){ return Object.values(store.stamps||{}).filter(s=>s&&s[5]).length; }
function myStamps(){ return Object.values(store.stamps||{}).reduce((a,s)=>a+(s?s.filter(Boolean).length:0),0); }
const HOMEBALL=`<svg viewBox="0 0 60 70" aria-hidden="true"><ellipse class="bshadow" cx="30" cy="64" rx="14" ry="3.5" fill="rgba(0,0,0,.28)"/><g class="bball">${icBall(30,22,16)}</g></svg>`;
function todayHTML(){
  const k=((ui.tipK??dayNo())%TIPS.length+TIPS.length)%TIPS.length, c=myCrowns(), st=myStamps();
  return `<section class="today"><span class="tball">${HOMEBALL}</span>
    <b class="tday fit">${DAYLINE[new Date().getDay()]}</b>
    <span class="tstat ${c?'':'zero'}" title="${c?`왕관 ${c}개 · 활동 도장 ${st}개`:'차시를 끝내면 왕관을 받아요'}">${CROWN_MINI}<b>${c}</b></span>
    <button class="ttip" data-action="tipnext" aria-label="다음 꿀팁"><i>꿀팁</i><span>${esc(TIPS[k])}</span><em aria-hidden="true">↻</em></button></section>`;
}
const DICE=`<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="6" y="6" width="36" height="36" rx="9" fill="#fff" stroke="${INK}" stroke-width="3"/>${[[16,16],[32,16],[24,24],[16,32],[32,32]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3.6" fill="${INK}"/>`).join('')}</svg>`;
function diceHTML(){ return `<button class="dice" data-action="pickfun"><span class="dicon">${DICE}</span><span><b>놀이 뽑기</b><small>고민될 땐 주사위에 맡겨요</small></span></button><div id="dicebox" aria-live="polite"></div>`; }
function pickFun(){
  const P=FPLACES.find(p=>p===store.fplace&&funIds(p).length)||FPLACES.find(p=>funIds(p).length), ids=funIds(P); if(!ids.length) return;
  const box=document.getElementById('dicebox'), btn=document.querySelector('.dice'); if(!box) return;
  const pick=ids[Math.floor(Math.random()*ids.length)], still=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(still){ box.innerHTML=funCardHTML(pick); chime(); return; }
  btn&&btn.classList.add('rolling'); let t=0;
  const iv=setInterval(()=>{ const id=ids[Math.floor(Math.random()*ids.length)]; box.innerHTML=`<div class="dspin">${esc(PL[id].t)}</div>`; beep(1); if(++t>=9){ clearInterval(iv); btn&&btn.classList.remove('rolling'); box.innerHTML=funCardHTML(pick); box.firstElementChild&&box.firstElementChild.classList.add('picked'); chime(); } },110);
}
