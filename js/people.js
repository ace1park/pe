/* [프로그램] 인원 나누기 더하기: 결석·지각 바로 반영 · 교구·경기장 조건 · 합반(25~50명) · 규칙표
   - 반 인원(store.people)은 그대로 두고, 오늘 빠진 번호만 따로 기억함(날짜가 바뀌면 저절로 비워짐)
   - 처음 나눈 모둠을 그대로 두고, 빠진 친구 자리만 채움 → 옮기는 친구가 가장 적음
   - 경기장·공 수를 넣으면 동시에 할 경기 수와 기다리는 방법을 알려 줌(안 넣으면 '충분'으로 봄) */

/* ===== 1. 결석·지각 ===== */
function todayStr(){ const d=new Date(); return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate(); }
function absList(){ const a=store.absent; if(!a||a.d!==todayStr()||!Array.isArray(a.list)) return []; return a.list.filter(x=>x>=1&&x<=store.people); }
function absSet(){ return new Set(absList()); }
const MINP=4;                                   // 오늘 인원은 4명보다 적게 줄이지 않음
function todayN(){ return store.people-absList().length; }   // 오늘 실제로 함께하는 인원
function pText(){ const k=absList().length; return k?`${todayN()}명 (반 ${store.people}명 중 ${k}명 빠짐)`:`${store.people}명`; }
function toggleAbs(x){ let l=absList(); const back=l.includes(x); l=back?l.filter(v=>v!==x):l.concat(x).sort((a,b)=>a-b);
  if(store.people-l.length<MINP) return false; store.absent={d:todayStr(),list:l}; save(); return true; }
function clearAbs(){ store.absent={d:todayStr(),list:[]}; save(); }

/* 처음 나눈 모둠(반 전체 기준)에서 빠진 친구만 빼고, 모자란 모둠만 채움. 자리를 옮긴 번호는 moved 에 */
let lastMoved=new Set();
function keepGroups(base,sizes){
  const abs=absSet(), g=base.map(m=>m.filter(v=>!abs.has(v)));
  const keep=g.map((m,j)=>j).sort((a,b)=>g[b].length-g[a].length||a-b).slice(0,sizes.length);
  const tg=[...sizes].sort((a,b)=>b-a), target={};
  [...keep].sort((a,b)=>g[b].length-g[a].length||a-b).forEach((j,k)=>target[j]=tg[k]);
  keep.sort((a,b)=>a-b);
  const pool=[]; g.forEach((m,j)=>{ if(!(j in target)) pool.push(...m); else pool.push(...m.slice(target[j])); });
  const moved=new Set(pool);
  const out=keep.map(j=>{ const m=g[j].slice(0,target[j]); while(m.length<target[j]&&pool.length) m.push(pool.shift()); return m.sort((a,b)=>a-b); });
  return {groups:out, moved};
}
function jz(x,c){ const s=jersey(x,c); return lastMoved.has(x)?s.replace('class="jersey"','class="jersey moved"'):s; }
function absLine(){ const l=absList(); if(!l.length) return '';
  return `<div class="absline"><b>오늘 빠짐</b><span>${l.map(x=>x+'번').join(' · ')}</span>${lastMoved.size?`<em>노란 테두리 = 자리를 옮긴 친구 ${lastMoved.size}명</em>`:'<em>옮긴 친구 없음</em>'}</div>`; }
function absHTML(){ const a=absSet();
  return `<p class="pnote">빠진 번호를 누르세요. 늦게 온 친구는 한 번 더 누르면 들어와요.</p>
   <p class="pnote">나머지 친구의 모둠은 그대로 두고, 모자란 곳만 채워요.</p>
   <div class="absgrid">${[...Array(store.people)].map((_,i)=>i+1).map(x=>`<button aria-pressed="${a.has(x)}" aria-label="${x}번${a.has(x)?' 빠짐':''}" data-action="abs" data-v="${x}">${x}</button>`).join('')}</div>
   <p class="abssum">오늘 <b>${pText()}</b></p>
   ${a.size?'<div class="row"><button class="btn" data-action="absclear">모두 왔어요 (빠짐 지우기)</button></div>':''}`; }
function openAbs(){ cmPeek('결석·지각 · 빠진 번호 누르기', absHTML()); }

/* ===== 2. 교구·경기장 ===== */
function gear(){ return store.gear||{}; }
function gearHTML(){ const g=gear(), c=g.courts||0, b=g.balls||0;
  return `<p class="pnote">우리 학교에 있는 만큼 고르세요. 모자라면 동시에 할 경기 수와 기다리는 방법을 알려 줘요.</p>
   <div class="gearrow"><span>경기장(코트)</span><div class="row">${[0,1,2,3,4,5,6].map(v=>`<button class="pill" aria-pressed="${c===v}" data-action="gearc" data-v="${v}">${v?v+'곳':'충분'}</button>`).join('')}</div></div>
   <div class="gearrow"><span>공</span><div class="row">${[0,4,6,8,10,12,16,20,24].map(v=>`<button class="pill" aria-pressed="${b===v}" data-action="gearb" data-v="${v}">${v?v+'개':'충분'}</button>`).join('')}
     <span class="gstep"><button class="btn" aria-label="공 하나 빼기" data-action="gearb" data-d="-1">−</button><output>${b?b+'개':'충분'}</output><button class="btn" aria-label="공 하나 더하기" data-action="gearb" data-d="1">+</button></span></div></div>
   <p class="pnote">한 번 고르면 다음 수업에도 기억해요. 경기장 한 곳 = 두 팀이 맞붙는 곳(골대 한 쌍, 코트 한 면, 네트 한 개).</p>`; }
function openGear(){ cmPeek('교구·경기장 · 우리 학교 조건', gearHTML()); }
function gearText(){ const g=gear(); if(!g.courts&&!g.balls) return '경기장·공 충분'; return [g.courts?`경기장 ${g.courts}곳`:'경기장 충분', g.balls?`공 ${g.balls}개`:'공 충분'].join(' · '); }

/* 형태마다 맞붙는 경기 수(M)와 필요한 공(대략) */
function needOf(kind,sizes){
  const n=sizes.length, sum=sizes.reduce((a,b)=>a+b,0);
  if(kind==='none') return {M:0, B:sum, unit:'명'};
  if(kind==='pair') return {M:0, B:n, unit:'조'};
  if(kind==='group'||kind==='bignoside') return {M:0, B:n, unit:'모둠'};
  if(kind==='half') return {M:1, B:1, unit:'경기'};
  if(kind==='big') return {M:n, B:n, unit:'모둠'};
  return {M:Math.ceil(n/2), B:Math.ceil(n/2), unit:'경기'};   // six · four
}
function gcd(a,b){ return b?gcd(b,a%b):a; }
/* 경기 M개를 경기장 C곳에서 돌아가며: 판마다 하는 경기·기다리는 경기 */
function rotation(M,C){ const R=M/gcd(M,C), rows=[];
  for(let r=0;r<R;r++){ const play=[...Array(C)].map((_,j)=>(r*C+j)%M).sort((a,b)=>a-b); rows.push({play, wait:[...Array(M).keys()].filter(x=>!play.includes(x))}); }
  return rows; }
/* game: 게임 칸(게임1·2, 팀 나누기 화면)이면 true → 경기장 계산까지, 연습이면 공만 */
function gearNote(kind,sizes,game){
  const g=gear(), C=g.courts||0, Bh=g.balls||0;
  if(!C&&!Bh) return `<p class="gearlink"><button class="linkbtn" data-action="gear">경기장·공 수 넣기</button><span>모자랄 때 기다리는 방법을 알려 줘요</span></p>`;
  const {M,B}=needOf(kind,sizes), lines=[];
  const name=k=>kind==='big'?`${k+1}모둠`:`${k+1}경기`;
  if(game&&M>0){
    const eff=Math.min(C||M, Bh||M, M);
    if(eff>=M) lines.push(`<p><b>경기장</b>${M}곳 필요 · 모두 동시에 해요</p>`);
    else { const rows=rotation(M,eff), R=rows.length, mins=Math.max(1,Math.floor(9/R*2)/2);
      lines.push(`<p><b>${C&&C<=(Bh||C)?`경기장 ${C}곳`:`공 ${Bh}개`}</b>한 번에 ${eff}경기 · ${M-eff}경기는 기다려요</p>`);
      lines.push(`<table class="rot"><thead><tr><th>판</th><th>하는 경기</th><th>기다리는 경기</th></tr></thead><tbody>${rows.slice(0,6).map((r,k)=>`<tr><td>${k+1}판</td><td>${r.play.map(name).join(' · ')}</td><td>${r.wait.map(name).join(' · ')}</td></tr>`).join('')}</tbody></table>`);
      lines.push(`<p class="pnote">판마다 약 ${mins}분 · 호루라기로 판 바꾸기${R>6?' · 6판 뒤에는 처음부터 되풀이':''}</p>`);
      lines.push(`<p class="pnote">기다리는 경기: 심판·점수 부르기·응원을 맡고, 판이 끝나면 바로 들어가요.</p>`); }
  }
  if(Bh && Bh<B && !(game&&M>0)){
    if(kind==='none'){ const k=Math.ceil(B/Bh); lines.push(`<p><b>공 ${Bh}개</b>${k}명에 공 1개 · 한 명씩 하고, 기다리는 친구는 세기·응원</p><p class="pnote">30초마다 공을 넘겨요.</p>`); }
    else { const u=needOf(kind,sizes).unit; lines.push(`<p><b>공 ${Bh}개</b>${B}${u} 중 ${Bh}${u}만 공을 써요</p><p class="pnote">공이 없는 ${u}는 공 없이 동작 따라 하기 → 1분마다 공 넘기기.</p>`); }
  } else if(Bh && !(game&&M>0)) lines.push(`<p><b>공</b>${B}개 필요 · ${Bh}개 있어 충분해요</p>`);
  if(!lines.length) return '';
  return `<div class="gearnote"><div class="ghd"><b>우리 학교 조건</b><span>${gearText()}</span><button class="linkbtn" data-action="gear">바꾸기</button></div>${lines.join('')}</div>`;
}

/* ===== 3. 오늘 인원 줄(약속 화면·팀 나누기 화면) ===== */
function todayBar(){
  return `<div class="todaybar"><button class="cm-chip" data-action="cmpeople">반 인원 ${store.people}명</button><button class="cm-chip ${absList().length?'on':''}" data-action="abs0">결석·지각${absList().length?` ${absList().length}명`:''}</button><button class="cm-chip" data-action="gear">경기장·공</button></div>`; }

/* ===== 4. 규칙표(안내사항) ===== 화면의 계산 함수로 바로 만드니 표와 실제 나누기가 늘 같음 */
const RULE_NS=[6,8,10,12,14,16,18,20,21,22,23,24,26,30,35,40,46,50];
function ruleTableHTML(){
  const cols=[['pair','짝'],['group','모둠'],['six','3:3 팀'],['four','팀 경기'],['half','반 2팀']];
  return `<p class="rulehint">빨간 인원은 홀수 · 굵은 숫자는 모둠(팀) 수</p><div class="ruletbl"><table><thead><tr><th>인원</th>${cols.map(([,t])=>`<th>${t}</th>`).join('')}</tr></thead><tbody>${RULE_NS.map(N=>`<tr${N%2?' class="odd"':''}><th>${N}명</th>${cols.map(([f])=>{ const z=sizesOf(f,N); return `<td><b>${z.length}</b>${FORMS[f].unit}<small>${szText(z).split('·').join('·<wbr>')}</small></td>`; }).join('')}</tr>`).join('')}</tbody></table></div>`; }
const RULES_PEOPLE=[
  ['기본','학급 20~23명은 미리 정한 표대로 나눔. 그 밖의 인원(6~50명)은 같은 규칙으로 계산함'],
  ['홀수','남는 1명을 혼자 두지 않음. 짝은 3인 1조, 모둠·팀은 1명 많은 쪽이 교대·기록을 맡음'],
  ['고르게','모둠끼리 인원 차이는 1명까지. 많은 모둠을 앞에, 적은 모둠을 뒤에 둠'],
  ['소규모','14명 이하는 모둠·팀 수를 줄이고, 6~10명 모둠은 반 전체가 한 모둠이 될 수 있음'],
  ['합반','25~50명은 3:3 팀을 7명당 2팀, 팀 경기를 12명당 2팀으로 늘림. 조끼는 경기장마다 2색'],
  ['결석·지각','빠진 친구만 빼고 처음 모둠을 그대로 둠. 인원이 모자란 모둠만 다른 모둠에서 1명씩 채워 옮기는 친구가 가장 적음'],
  ['경기장','경기장보다 경기가 많으면 판을 나눠 돌아가며 함. 모든 경기가 같은 횟수만큼 쉬고, 쉬는 경기는 심판·점수·응원'],
  ['공','공이 모자라면 공을 함께 씀(2~4명에 1개, 30초~1분마다 넘기기). 경기는 공 수만큼만 동시에 함'],
  ['형태 바꾸기','연습·게임을 6·8·10명 모둠(3:3·4:4·5:5)으로 바꿀 수 있음. 오늘 인원으로 되는 형태만 보여 줌. 리그 같은 종합 게임은 바꾸지 않음'],
];

/* 아래 화면 다시 그리기(창을 연 채로) */
function refreshUnder(){ const n=curId(); if(n) renderLesson(n); else render(); }
function peopleBox(){ return `<div class="people cm-people">${peopleHTML(false)}</div><p class="pnote">출석부 인원을 고르세요. 오늘 빠진 친구는 <button class="linkbtn" data-action="abs0">결석·지각</button>에서 번호로 빼요.</p>`; }
