/* [프로그램] 대형 그림 고르기·차시 아이콘·리그표·큰 점수판 */
let dgN=0;
function hasDiag(n,i){ const D=getD(n), M=D.m[i-1]; return !!(DIAG[bkey(n+'-'+i)] || (M&&M.d&&TPL[M.d.t])); }
function diagHTML(n,i){
  const key=bkey(n+'-'+i), M=getD(n).m[i-1];
  if(DIAG[key]) return field(DIAG[key](), M.name+' 대형 그림')+legendHTML(key);
  const r=TPL[M.d.t](M.d); return field(r.s, M.name+' 대형 그림')+legendList(r.l,'g'+(++dgN))+(isFoot(n)?'':'<p class="dgcap">종목 대형 예시 · 실제 자리와 거리는 지도안의 \'대형·준비\'를 따름</p>');
}

/* ===== 차시·단계 아이콘 (설명과 같은 장면) ===== */
let icN=0;
const INK='#1c2a21';
function icBall(x,y,r=7,f='#fff'){ return `<circle cx="${x}" cy="${y}" r="${r}" fill="${f}" stroke="${INK}" stroke-width="1.8"/><polygon points="${pent(x,y,r*.42)}" fill="${INK}"/>`+[0,1,2,3,4].map(k=>{const a=(-90+k*72)*Math.PI/180; return `<line x1="${(x+r*.42*Math.cos(a)).toFixed(1)}" y1="${(y+r*.42*Math.sin(a)).toFixed(1)}" x2="${(x+r*.95*Math.cos(a)).toFixed(1)}" y2="${(y+r*.95*Math.sin(a)).toFixed(1)}" stroke="${INK}" stroke-width="1.2"/>`;}).join(''); }
function icMan(x,y,c,s=1){ return `<g transform="translate(${x},${y}) scale(${s})"><circle cx="0" cy="-11" r="5" fill="${c}" stroke="${INK}" stroke-width="1.6"/><path d="M-7,12 L-5,-3 Q0,-6.5 5,-3 L7,12 Z" fill="${c}" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/></g>`; }
function icShoe(x,y,rot=0,c='#2f6fd6'){ return `<g transform="translate(${x},${y}) rotate(${rot})"><path d="M-13,-5 L3,-5 Q13,-5 15,2 L15,5 L-13,5 Z" fill="${c}" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/><line x1="-13" y1="5.5" x2="15" y2="5.5" stroke="${INK}" stroke-width="3"/><path d="M-5,-5 v-6 h6 v6" fill="${c}" stroke="${INK}" stroke-width="1.6"/></g>`; }
function icCone(x,y,s=1){ return `<g transform="translate(${x},${y}) scale(${s})"><polygon points="0,-10 -7,7 7,7" fill="${COL.cone}" stroke="${INK}" stroke-width="1.4"/><line x1="-3.6" y1="-1" x2="3.6" y2="-1" stroke="#fff" stroke-width="2"/><rect x="-9" y="7" width="18" height="2.5" fill="${COL.cone}" stroke="${INK}" stroke-width="1"/></g>`; }
function icGoal(x,y,w,h,col=INK){ let net=''; for(let k=1;k<6;k++) net+=`<line x1="${x+w*k/6}" y1="${y}" x2="${x+w*k/6}" y2="${y+h}" stroke="${col}" stroke-opacity=".35" stroke-width="1"/>`; for(let k=1;k<4;k++) net+=`<line x1="${x}" y1="${y+h*k/4}" x2="${x+w}" y2="${y+h*k/4}" stroke="${col}" stroke-opacity=".35" stroke-width="1"/>`;
  return net+`<path d="M${x},${y+h} V${y} H${x+w} V${y+h}" fill="none" stroke="${col}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>`; }
function icArrow(d,col=INK,dash=false,id){ return `<path d="${d}" fill="none" stroke="${col}" stroke-width="2.6" stroke-linecap="round" ${dash?'stroke-dasharray="4 4"':''} marker-end="url(#${id})"/>`; }
function icWrap(inner,label){ const id='ia'+(++icN), idw='iw'+icN, idy='iy'+icN;
  return `<svg viewBox="0 0 64 64" role="img" aria-label="${esc(label)}"><defs>
   <marker id="${id}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="${INK}"/></marker>
   <marker id="${idy}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#e0700f"/></marker></defs>
   <circle cx="32" cy="32" r="30" fill="#fff"/>${inner.replace(/#A#/g,id).replace(/#Y#/g,idy)}</svg>`; }
const OR='#e0700f';
const LICON={
 1:()=>icBall(32,44,11)+icShoe(30,25,0)+`<path d="M13,44 q-4,-7 0,-14 M51,44 q4,-7 0,-14" fill="none" stroke="${OR}" stroke-width="2.6" stroke-linecap="round"/>`,
 2:()=>`<g transform="translate(32,16) scale(.6)">${icShoe(0,0,0)}</g><g transform="translate(12,36) scale(.55)">${icShoe(0,0,0,COL.mint)}</g><g transform="translate(52,36) scale(-.55,.55)">${icShoe(0,0,0,'#e0700f')}</g>`+icBall(32,34,8)+icArrow('M18,52 q5,-5 10,0 t10,0 t8,0',INK,false,'#A#'),
 3:()=>icBall(40,12,6)+icArrow('M40,20 Q44,28 40,34',OR,true,'#Y#')+icShoe(40,44,0)+icBall(14,44,6)+`<path d="M5,40 h3 M4,44 h4 M5,48 h3" stroke="${INK}" stroke-width="2"/>`+icArrow('M21,44 H25',OR,false,'#Y#'),
 4:()=>icBall(14,50,6)+icMan(30,38,COL.blue,1.1)+icMan(50,36,COL.red,1)+`<path d="M38,32 l6,-2" stroke="${INK}" stroke-width="2"/><path d="M22,22 q8,-8 16,0" fill="none" stroke="${OR}" stroke-width="2.4"/>`,
 5:()=>icCone(22,22,.8)+icCone(32,44,.8)+icCone(44,22,.8)+icBall(10,40,5.5)+icArrow('M16,40 C22,56 28,30 32,30 S40,56 46,40 S54,28 56,34',INK,false,'#A#'),
 6:()=>icBall(14,32,8)+`<path d="M26,32 h4 M34,32 h7" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>`+icArrow('M45,32 H58',OR,false,'#Y#')+`<path d="M2,26 h4 M0,32 h5 M2,38 h4" stroke="${OR}" stroke-width="2"/>`,
 7:()=>icMan(36,30,COL.red,1)+icMan(14,44,COL.blue,.9)+icBall(22,52,5)+icArrow('M28,54 Q44,62 54,42',OR,false,'#Y#'),
 8:()=>icMan(14,34,COL.blue,.9)+icMan(50,34,COL.blue,.9)+icBall(24,46,5.5)+icArrow('M31,46 H44',INK,true,'#A#')+`<path d="M18,52 q4,4 10,2" fill="none" stroke="${OR}" stroke-width="2.4"/>`,
 9:()=>icMan(30,32,COL.blue,1.05)+icBall(42,48,6)+icArrow('M46,16 A18,18 0 1,1 16,20',OR,false,'#Y#'),
 10:()=>icShoe(18,46,-20)+icBall(36,48,6)+icArrow('M40,40 Q46,10 54,22',INK,true,'#A#'),
 11:()=>icMan(16,22,COL.blue,.8)+icMan(16,48,COL.blue,.8)+icArrow('M26,20 H50',OR,false,'#Y#')+icArrow('M26,46 H50',OR,false,'#Y#')+icBall(28,28,4.5)+icArrow('M30,30 L46,42',INK,true,'#A#'),
 12:()=>icGoal(10,12,44,26)+`<circle cx="46" cy="19" r="5" fill="none" stroke="${COL.red}" stroke-width="2.4"/><circle cx="46" cy="19" r="1.6" fill="${COL.red}"/>`+icBall(28,52,6)+icArrow('M32,46 L43,24',OR,false,'#Y#'),
 13:()=>icGoal(14,8,36,20)+icMan(40,46,COL.blue,.9)+icBall(32,54,4.5)+icArrow('M4,56 H25',INK,true,'#A#')+icArrow('M38,36 L32,24',OR,false,'#Y#'),
 14:()=>`<rect x="12" y="12" width="40" height="40" fill="none" stroke="${INK}" stroke-width="2.4"/><path d="M32,12 V52 M12,32 H52" stroke="${INK}" stroke-width="2"/>`+`<circle cx="22" cy="22" r="5" fill="${COL.blue}" stroke="${INK}"/><circle cx="42" cy="22" r="5" fill="${COL.red}" stroke="${INK}"/><circle cx="22" cy="42" r="5" fill="${COL.blue}" stroke="${INK}"/><circle cx="42" cy="42" r="6" fill="none" stroke="${OR}" stroke-width="2.4" stroke-dasharray="3 3"/>`+icArrow('M48,18 Q56,30 46,38',OR,false,'#Y#'),
 15:()=>icMan(32,30,COL.red,1.1)+`<path d="M24,30 L12,26 M40,30 L52,26" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>`+icBall(32,54,5.5)+`<path d="M10,46 h8 M46,46 h8" stroke="${OR}" stroke-width="2.6" stroke-linecap="round"/><path d="M10,46 l3,-3 M10,46 l3,3 M54,46 l-3,-3 M54,46 l-3,3" stroke="${OR}" stroke-width="2.2"/>`,
 16:()=>`<circle cx="18" cy="32" r="8" fill="${COL.blue}" stroke="${INK}" stroke-width="1.6"/><circle cx="46" cy="32" r="8" fill="${COL.red}" stroke="${INK}" stroke-width="1.6"/>`+icArrow('M20,20 Q32,8 44,20',OR,false,'#Y#')+icArrow('M44,44 Q32,56 20,44',OR,false,'#Y#'),
 17:()=>`<rect x="12" y="10" width="30" height="40" rx="4" fill="#fff" stroke="${INK}" stroke-width="2.2"/><rect x="20" y="7" width="14" height="6" rx="2" fill="${COL.mk}" stroke="${INK}" stroke-width="1.6"/><path d="M17,22 l3,3 l5,-6 M17,33 l3,3 l5,-6" fill="none" stroke="#2fb35c" stroke-width="2.4"/><path d="M29,23 h9 M29,34 h9 M17,43 h21" stroke="${INK}" stroke-width="2"/>`+`<path d="M38,46 h12 a6,6 0 1 1 -6,6 h-6 z" fill="${INK}"/><circle cx="44" cy="52" r="2" fill="#fff"/>`,
 18:()=>`<rect x="12" y="18" width="40" height="28" rx="3" fill="#2a9a59" stroke="${INK}" stroke-width="2"/><path d="M32,18 V46" stroke="#fff" stroke-width="1.6"/><circle cx="32" cy="32" r="5" fill="none" stroke="#fff" stroke-width="1.4"/><rect x="8" y="27" width="4" height="10" fill="#fff" stroke="${INK}"/><rect x="52" y="27" width="4" height="10" fill="#fff" stroke="${INK}"/>`+`<circle cx="16" cy="32" r="3.2" fill="${GKC}" stroke="${INK}"/><circle cx="24" cy="25" r="3.2" fill="${COL.blue}" stroke="${INK}"/><circle cx="24" cy="39" r="3.2" fill="${COL.blue}" stroke="${INK}"/><circle cx="41" cy="25" r="3.2" fill="${COL.blue}" stroke="${INK}"/><circle cx="41" cy="39" r="3.2" fill="${COL.blue}" stroke="${INK}"/>`,
 19:()=>`<rect x="8" y="12" width="40" height="38" rx="3" fill="#fff" stroke="${INK}" stroke-width="2.2"/><path d="M8,22 H48 M8,32 H48 M8,41 H48 M22,12 V50" stroke="${INK}" stroke-width="1.6"/>`+[[15,27,VESTS[0][1]],[15,36,VESTS[1][1]],[15,46,VESTS[2][1]]].map(([x,y,c])=>`<circle cx="${x}" cy="${y}" r="3" fill="${c}"/>`).join('')+icBall(48,46,9),
 20:()=>`<path d="M20,12 H44 V24 Q44,38 32,40 Q20,38 20,24 Z" fill="${COL.mk}" stroke="${INK}" stroke-width="2"/><path d="M20,16 Q10,16 12,24 Q14,30 21,30 M44,16 Q54,16 52,24 Q50,30 43,30" fill="none" stroke="${INK}" stroke-width="2"/><rect x="29" y="40" width="6" height="8" fill="${COL.mk}" stroke="${INK}" stroke-width="1.6"/><rect x="22" y="48" width="20" height="6" rx="2" fill="${INK}"/><polygon points="${(()=>{let p=[];for(let k=0;k<10;k++){const r=k%2?3:7,a=(-90+k*36)*Math.PI/180;p.push((32+r*Math.cos(a)).toFixed(1)+','+(25+r*Math.sin(a)).toFixed(1));}return p.join(' ');})()}" fill="#fff" stroke="${INK}" stroke-width="1.2"/>`
};
function lessonIcon(n){ const b=fBase(n), l=LESSONS.find(x=>x.n===b); return icWrap(LICON[b](), b+'차시 '+l.t+' 그림'); }
/* 단계 아이콘 (어두운 바탕용) */
const ZW='#fff';
Object.assign(ZICON,{
 1:()=>`<g transform="translate(36,4) scale(.9)">${icBall(32,44,11)}${icShoe(30,25,0,COL.mint)}</g><path d="M30,44 q-4,-7 0,-14 M98,44 q4,-7 0,-14" fill="none" stroke="${COL.mk}" stroke-width="3" stroke-linecap="round"/>`,
 2:()=>[[34,22],[58,46],[82,22]].map(([x,y])=>icCone(x,y,.9)).join('')+`<g>${icBall(12,40,6)}</g><path d="M20,40 C30,58 44,28 58,30 S74,58 86,40 S100,26 106,32" fill="none" stroke="${ZW}" stroke-width="3" stroke-linecap="round"/><polygon points="108,34 100,34 104,27" fill="${ZW}"/>`,
 3:()=>`<g>${icMan(18,38,COL.blue,1)}${icMan(98,38,COL.blue,1)}</g>${icBall(30,48,5.5)}<line x1="38" y1="44" x2="84" y2="40" stroke="${ZW}" stroke-width="3" stroke-dasharray="6 5"/><polygon points="90,40 82,36 82,44" fill="${ZW}"/>`,
 4:()=>icGoal(64,10,44,30,ZW)+icBall(18,54,6.5)+`<path d="M24,48 Q46,10 92,20" fill="none" stroke="${COL.mk}" stroke-width="3" stroke-dasharray="5 4"/><polygon points="96,21 88,16 88,25" fill="${COL.mk}"/>`,
 5:()=>`<polygon points="22,54 58,12 94,54" fill="none" stroke="${ZW}" stroke-width="2.6" stroke-dasharray="6 5"/>`+[[22,54],[58,14],[94,54]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="8" fill="${COL.blue}" stroke="${ZW}" stroke-width="2.5"/>`).join('')+`<circle cx="58" cy="40" r="8" fill="${COL.red}" stroke="${ZW}" stroke-width="2.5"/>`,
 6:()=>`<rect x="10" y="8" width="96" height="52" rx="4" fill="none" stroke="${ZW}" stroke-width="2.6"/><line x1="58" y1="8" x2="58" y2="60" stroke="${ZW}" stroke-width="2"/><circle cx="58" cy="34" r="9" fill="none" stroke="${ZW}" stroke-width="2"/>`+`<rect x="2" y="24" width="8" height="20" fill="rgba(255,255,255,.3)" stroke="${ZW}" stroke-width="2.4"/><rect x="106" y="24" width="8" height="20" fill="rgba(255,255,255,.3)" stroke="${ZW}" stroke-width="2.4"/>`+[[32,22,COL.blue],[40,46,COL.blue],[76,24,COL.red],[84,46,COL.red]].map(([x,y,c])=>`<circle cx="${x}" cy="${y}" r="6" fill="${c}" stroke="${ZW}" stroke-width="2"/>`).join('')+icBall(58,34,4)
});

/* ===== 6단계 추가 설명 · 스테이션 예시 · 리그표 ===== */
function miniDiag(key){ const [n,i]=key.split('-').map(Number); if(DIAG[key]) return field(DIAG[key](),''); const M=getD(n).m[i-1]; const r=TPL[M.d.t](M.d); return field(r.s,''); }
const SETPLAY={
 a:()=>field(ln(30,220,370,220)+pl(180,214)+bl(198,210)+pl(232,165)+ps(196,206,228,176)+rn(180,206,270,140,-30)+ps(240,160,262,146,10)+pl(260,110,COL.red),'짧게 주고 돌기'),
 b:()=>field(ln(30,220,370,220)+pl(90,214)+bl(108,210)+pl(150,170,COL.red)+pl(120,150)+pl(310,60)+`<path d="M108,204 Q210,40 300,70" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="7 6" marker-end="url(#w§)"/>`,'길게 바꾸기'),
 c:()=>field(ln(30,220,370,220)+goalR(370,110,70)+pl(300,214)+bl(318,208)+pl(220,150)+rn(220,150,335,125,-30)+ps(312,204,330,140,6)+pl(300,110,COL.red)+gkp(352,110),'골대 앞 들어가기')
};
const MORE={
 '17-4':{title:'우리 반 미니 풋살 규칙 예시',kind:'rules',items:[
   ['시작','가운데 점에서 킥오프로 시작'],['나간 공','옆줄 밖: 나간 자리에서 킥인 / 끝줄 밖: 골대 앞에서 다시 시작'],['금지 동작','태클·밀기·잡기·허리 위로 차기'],['반칙','벌 없이 상대 팀 킥으로 다시 시작'],['교대','4명 팀은 골이 날 때마다 1명 교대'],['페어플레이','넘어진 친구 일으키기, 판정 받아들이기 → ★']],note:'학급 회의로 바꿔도 됨. 공식 규칙 세부는 확인 필요'},
 '18-1':{title:'자리별 역할',kind:'roles',items:[
   ['gk','골키퍼','골대 앞을 지키고 손으로 공 잡기','잡은 공은 손으로 굴려 수비에게'],
   ['def','수비 (2명)','우리 골대 쪽에서 상대 막기','공을 뺏으면 옆이나 앞으로 이어주기'],
   ['att','공격 (2명)','상대 골대 쪽 빈 공간으로 움직이기','받으면 앞을 보고 슛이나 패스']]},
 '18-4':{title:'자리별 역할',kind:'roles',items:[
   ['gk','골키퍼','골대 앞을 지키고 손으로 공 잡기','잡은 공은 손으로 굴려 수비에게'],
   ['def','수비 (2명)','우리 골대 쪽에서 상대 막기','공을 뺏으면 옆이나 앞으로 이어주기'],
   ['att','공격 (2명)','상대 골대 쪽 빈 공간으로 움직이기','받으면 앞을 보고 슛이나 패스']],note:'판마다 자리를 바꿔 모든 학생이 골키퍼·수비·공격을 한 번씩 맡음'},
 '19-1':{title:'작전 카드 예시 (하나 고르기)',kind:'cards',items:[
   {name:'넓게 벌리기',lines:['공격 둘은 옆줄 가까이','가운데를 비워 패스 길 만들기'],point:'공 가진 친구와 3m 이상 떨어지기'},
   {name:'패스 3번 공격',lines:['슛 전에 패스 3번','서로 다른 친구에게'],point:'서두르지 않고 빈 친구 찾기'},
   {name:'함께 수비',lines:['가까운 1명이 다가가기','다른 1명은 뒤에서 받치기'],point:'둘이 한 줄로 서지 않기'},
   {name:'3초 되찾기',lines:['뺏기면 가까운 2명이 바로 다가가기','나머지는 자기 자리로'],point:'3초가 지나면 자리 지키기'}],note:'팀 회의 순서: 자리 정하기 → 작전 고르기 → 구호 정하기 → 걸으며 맞춰 보기'},
 '19-2':{title:'리그 진행 방법',kind:'league'},
 '19-3':{title:'보완 스테이션 3곳',kind:'stations',pick:'1라운드에서 패스가 자주 끊겼다면 ①, 슛이 빗나갔다면 ②, 골을 많이 내줬다면 ③',items:[
   {name:'① 패스 · 셔틀 패스',from:'8-3',lines:['두 줄 6m, 맞은편으로 패스','패스하고 반대쪽 줄 뒤로'],point:'받을 때 멈추고 고개 들기',lv:'쉽게 2터치 / 어렵게 1터치'},
   {name:'② 슛 · 몰고 가서 슛',from:'12-3',lines:['콘까지 몰고 멈추기','골대 구석으로 슛'],point:'디딤발 끝은 골대 쪽',lv:'쉽게 멈춘 뒤 슛 / 어렵게 몰다가 바로'},
   {name:'③ 수비 · 압박과 받치기',from:'15-3',lines:['1명은 다가가 길 막기','1명은 2~3m 뒤 받치기'],point:'뒤 친구가 말로 알려 주기',lv:'쉽게 공격 걷기 / 어렵게 공격 패스 자유'}]},
 '19-4':{title:'리그 진행 방법',kind:'league'},
 '20-1':{title:'복습 서킷 스테이션 5곳',kind:'stations',pick:'4인 모둠 5개가 스테이션 5곳에 하나씩. 1분마다 정지 신호 → 시계 방향으로 이동',items:[
   {name:'① 지그재그 몰기',from:'5-1',lines:['콘 6개 사이 지그재그','끝 콘 돌아 돌아오기'],point:'콘 앞에서 속도 줄이기',lv:'5차시'},
   {name:'② 문 사이 패스',from:'8-1',lines:['짝과 5m 마주 보기','콘 문 사이로 발 안쪽 패스'],point:'디딤발은 공 옆',lv:'8차시'},
   {name:'③ 받아서 돌기',from:'9-1',lines:['가운데서 받기','몸 돌려 반대쪽에 패스'],point:'받기 전에 뒤 보기',lv:'9차시'},
   {name:'④ 발등 이어주기',from:'10-1',lines:['짝과 10m','발등으로 길게 차기'],point:'발목 펴고 발끝은 아래',lv:'10차시'},
   {name:'⑤ 구석 슛',from:'12-2',lines:['멈춘 공 차기','골대 구석 콘 맞히기'],point:'차기 전 구석 보기',lv:'12차시'}]},
 '20-2':{title:'리그 진행 방법',kind:'league'},
 '20-3':{title:'킥인 작전 예시',kind:'setplay',items:[
   {name:'짧게 주고 돌기',sp:'a',lines:['가까운 친구에게 짧게 킥인','킥인한 사람이 안쪽으로 달려 다시 받기'],point:'주고 바로 달리기'},
   {name:'길게 바꾸기',sp:'b',lines:['수비가 몰린 쪽 반대편 친구 찾기','발등으로 길게 보내기'],point:'받는 친구는 넓게 서 있기'},
   {name:'골대 앞 들어가기',sp:'c',lines:['한 명이 늦게 골대 앞으로','킥인은 그 앞쪽 빈 곳으로'],point:'늦게 출발해 빠르게 들어가기'}]},
 '20-4':{title:'순위 결정전과 시상',kind:'awards',items:[
   ['🏆','순위 결정전','리그표 1–2위, 3–4위끼리 5분 경기'],
   ['★','페어플레이상','상대 팀이 추천한 선수 (팀마다 1명)'],
   ['📣','응원상','교대·대기 때 가장 크게 응원한 팀'],
   ['🤝','협력상','전원 터치 골을 가장 많이 넣은 팀'],
   ['🌱','성장상','1차시보다 가장 많이 는 친구 (친구·교사 추천)']],note:'모든 팀이 상을 하나 이상 받도록 부문을 나눠 줌. 진행 순서: 결정전 → 상대 팀 추천 → 시상 → 단원 돌아보기'}
};
const LTEAMS=[['A','빨강',VESTS[0][1]],['B','파랑',VESTS[1][1]],['C','노랑',VESTS[2][1]],['D','초록',VESTS[3][1]]];
const LMATCH=[[1,0,1],[1,2,3],[2,0,2],[2,1,3],[3,0,3],[3,1,2]];
const LROUND={'19-2':1,'19-4':2,'20-2':3};
/* 리그표는 학년마다 따로 (3학년: store.league3) */
function leagueStore(key){ const g3=+String(key).split('-')[0]>100; const k=g3?'league3':'league'; return store[k]||(store[k]={}); }
function leagueRows(key){ const L=leagueStore(key||''); const T=LTEAMS.map((t,k)=>({k,t,pts:0,fp:0,gf:0,ga:0,pl:0}));
  LMATCH.forEach((m,j)=>{ const r=L[j]; if(!r||!r.done) return; const a=T[m[1]], b=T[m[2]]; a.pl++; b.pl++; a.gf+=r.a; a.ga+=r.b; b.gf+=r.b; b.ga+=r.a; a.fp+=r.fa; b.fp+=r.fb;
    if(r.a>r.b){a.pts+=3;b.pts+=1;} else if(r.a<r.b){b.pts+=3;a.pts+=1;} else {a.pts+=2;b.pts+=2;} });
  T.forEach(x=>x.sum=x.pts+x.fp); const S=[...T].sort((x,y)=>y.sum-x.sum||y.fp-x.fp); let rank=0,prev=null; S.forEach((x,i)=>{ if(prev===null||x.sum!==prev.sum||x.fp!==prev.fp) rank=i+1; x.rank=rank; prev=x; }); return S; }
function leagueHTML(key){
  const L=leagueStore(key), round=LROUND[bkey(key)], g3=key!==bkey(key);
  const cnt=(j,k)=>{ const r=L[j]||{a:0,b:0,fa:0,fb:0,done:false}; return `<span class="lgc"><button data-action="lg" data-j="${j}" data-k="${k}" data-d="-1" aria-label="빼기">−</button><output>${r[k]}</output><button data-action="lg" data-j="${j}" data-k="${k}" data-d="1" aria-label="더하기">+</button></span>`; };
  const chip=t=>`<span class="lgteam" style="--v:${t[2]}">${t[0]} ${t[1]}</span>`;
  let h=`<div class="lgrule"><div><b>경기</b>${g3?FOOT3.리그규칙:'5 대 5(골키퍼 포함) · 4분 경기, 1분 인사·기록'}</div><div><b>경기 점수</b>이기면 3 · 비기면 2 · 져도 1(끝까지 뛴 점수)</div><div><b>페어플레이</b>★ 1개 = 1점, 경기 점수에 더함</div><div><b>같은 점수</b>페어플레이 점수가 많은 팀이 앞, 그래도 같으면 공동 순위</div><div><b>쉬는 사람</b>교대 대기 = 기록원·응원단</div></div>
  <div class="lgmatches">`;
  const mrow=([r,a,b],j)=>{ const R=L[j]||{}; return `<div class="lgm ${r===round?'now':''} ${R.done?'done':''}">
     <div class="lgl1"><span class="lgr">${r}라운드</span>${chip(LTEAMS[a])}<span class="vs">대</span>${chip(LTEAMS[b])}</div>
     <div class="lgl2"><span class="lab">골</span>${cnt(j,'a')}<span class="colon">:</span>${cnt(j,'b')}</div>
     <div class="lgl2 fp"><span class="lab">페어플레이 ★</span>${cnt(j,'fa')}<span class="colon">:</span>${cnt(j,'fb')}<button class="lgdone" data-action="lgdone" data-j="${j}" aria-pressed="${!!R.done}">${R.done?'경기 끝 ✓':'경기 끝'}</button></div></div>`; };
  LMATCH.forEach((m,j)=>{ if(m[0]===round) h+=mrow(m,j); });
  h+=`</div>${fold('lgall-'+key,'다른 라운드 경기 <em>결과 보기·고치기</em>',`<div class="lgmatches">${LMATCH.map((m,j)=>m[0]===round?'':mrow(m,j)).join('')}</div>`,ICON_SCORE)}<table class="lgtable"><thead><tr><th>순위</th><th>팀</th><th>경기</th><th>경기 점수</th><th>페어 ★</th><th>합계</th></tr></thead><tbody>${leagueRows(key).map(x=>`<tr><td>${x.pl?x.rank:'-'}</td><td>${chip(x.t)}</td><td>${x.pl}</td><td>${x.pts}</td><td>${x.fp}</td><td><b>${x.sum}</b></td></tr>`).join('')}</tbody></table>
  <div class="row" style="margin-top:8px"><small style="color:var(--muted);font-weight:600">'경기 끝'을 누른 경기만 순위에 들어가요 · 이 기기에만 저장</small><button class="btn ghost" data-action="lgreset" style="padding:4px 10px;margin-left:auto">리그표 지우기</button></div>`;
  return h;
}
function moreHTML(key){
  let X=MORE[bkey(key)]; if(!X) return '';
  if(key!==bkey(key) && X.kind==='roles') X=Object.assign({},X,{items:X.items.filter(r=>r[0]!=='gk'),note:'판마다 자리를 바꿔 모든 학생이 수비·공격을 한 번씩 맡음'});
  let body='';
  if(X.kind==='league') body=leagueHTML(key);
  else if(X.kind==='rules') body=`<ol class="mrules">${X.items.map(([a,b])=>`<li><b>${a}</b><span>${b}</span></li>`).join('')}</ol>`;
  else if(X.kind==='roles') body=`<div class="mroles">${X.items.map(([k,t,a,b])=>`<div class="mrole"><svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="14" fill="${k==='gk'?GKC:COL.blue}" stroke="${COL.ink}" stroke-width="2.5"/>${k==='gk'?`<path d="M12,18 h4 v-5 M28,18 h-4 v-5" stroke="#fff" stroke-width="2.5" fill="none"/>`:k==='def'?`<path d="M13,22 l7,-8 l7,8" stroke="#fff" stroke-width="3" fill="none"/>`:`<path d="M15,13 l9,7 l-9,7" stroke="#fff" stroke-width="3" fill="none"/>`}</svg><div><b>${t}</b><span>${a}</span><span>${b}</span></div></div>`).join('')}</div>`;
  else if(X.kind==='awards') body=`<div class="mawards">${X.items.map(([i,t,d])=>`<div><span class="ai">${i}</span><b>${t}</b><span>${d}</span></div>`).join('')}</div>`;
  else { body=(X.pick?`<p class="mpick">${X.pick}</p>`:'')+`<div class="mcards">${X.items.map(it=>`<div class="mcard">${it.from?miniDiag(it.from):it.sp?SETPLAY[it.sp]():''}<h4>${it.name}</h4><ul>${it.lines.map(x=>`<li>${x}</li>`).join('')}</ul>${it.point?`<p class="mpoint"><b>꿀팁</b>${it.point}</p>`:''}${it.lv?`<p class="mlv">${it.lv.endsWith('차시')?'배운 차시 · ':''}${it.lv}</p>`:''}</div>`).join('')}</div>`; }
  return `<section class="more"><h3>${X.title}</h3>${body}${X.note?`<p class="mnote">${X.note}</p>`:''}</section>`;
}


/* ===== 큰 점수판 (아래 버튼 줄에서 열기) ===== */
function scoreSetup(n){
  if(n==null) return {base:'free-card', key:'free-card-'+((ui.ovCount&&ui.ovCount['free-card'])||2), form:'free', cnt:(ui.ovCount&&ui.ovCount['free-card'])||2, title:'게임 카드', slot:''};
  const i=stepOf(n), D=getD(n), M=(i>=1&&i<=4)?D.m[i-1]:null, key=M?n+'-'+i:'L'+n+'-free';
  let form=null;
  if(M){ const sf=M.score||MSCORE[bkey(n+'-'+i)]; const fm=M.fm||MFORM[bkey(n+'-'+i)];
    if(sf==='four'||sf==='six'||sf==='half') form=sf; else if(fm==='four'||fm==='six'||fm==='half') form=fm; }
  const nT=form?sizesOf(form,todayN()).length:2, cnt=(ui.ovCount&&ui.ovCount[key])||(nT>6?6:nT);
  const useForm = form && cnt===nT ? form : 'free';
  return {base:key, key:useForm==='free'?key+'-'+cnt:key, form:useForm, cnt, title:M?M.name:(i===0?'약속':'돌아보기'), slot:M?SLOTS[i-1]:''};
}
function openScoreOver(n){
  const o=document.getElementById('scoreOver'); const S=scoreSetup(n); const defs=teamDefs(S.form,S.cnt); const sc=store.scores[S.key]||(store.scores[S.key]={});
  o.innerHTML=`<div class="sohead"><div class="sotitle"><small>${S.slot?S.slot+' · ':''}점수판</small><b class="fit">${esc(S.title)}</b></div>
    <button class="sotime" data-action="play" aria-label="타이머"><span id="ovTime">${fmt(main.left)}</span><small data-role="playlabel">눌러서 시작</small></button>
    <button class="soclose" data-action="closescore">닫기 ✕</button></div>
   <div class="sorow"><span>팀 수</span>${[2,4,6].map(v=>`<button class="pill" aria-pressed="${S.cnt===v}" data-action="ovcount" data-key="${S.base}" data-v="${v}">${v}팀</button>`).join('')}
    <button class="btn ghost" data-action="scorereset" data-key="${S.key}" style="margin-left:auto;padding:6px 12px">모두 0으로</button></div>
   <div class="sogrid n${defs.length}">${defs.map((t,i)=>{ const v=sc[i]||{g:0,f:0};
     return `<div class="soteam" style="--v:${t.c}"><h3>${jersey('',t.c)}<span class="fit">${esc(t.nm)}</span></h3>
       <div class="sogoal"><button data-action="sc" data-key="${S.key}" data-i="${i}" data-k="g" data-d="-1" aria-label="${esc(t.nm)} 골 빼기">−</button><output data-sc="${S.key}|${i}|g">${v.g}</output><button data-action="sc" data-key="${S.key}" data-i="${i}" data-k="g" data-d="1" aria-label="${esc(t.nm)} 골 더하기">+</button></div>
       <div class="sofp"><span>${STARICON}페어플레이</span><button data-action="sc" data-key="${S.key}" data-i="${i}" data-k="f" data-d="-1" aria-label="${esc(t.nm)} 페어플레이 빼기">−</button><output data-sc="${S.key}|${i}|f">${v.f}</output><button data-action="sc" data-key="${S.key}" data-i="${i}" data-k="f" data-d="1" aria-label="${esc(t.nm)} 페어 더하기">+</button></div></div>`; }).join('')}</div>
   <p class="sonote">골과 페어플레이 ★를 함께 세요 · 활동 카드의 점수판과 같은 점수예요</p>`;
  o.classList.add('open'); paintClock(); fitSoon();
}

