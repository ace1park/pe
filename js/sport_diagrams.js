/* [프로그램] 티볼·배드민턴·배구·육상·넷볼·농구 대형 그림 틀 */
/* ===== 종목별 대형 그림 (티볼·배드민턴·육상·넷볼) ===== */
const SV={
  base:(x,y)=>`<rect x="${x-7}" y="${y-7}" width="14" height="14" transform="rotate(45 ${x} ${y})" fill="#fff" stroke="${COL.ink}" stroke-width="1.5"/>`,
  tee:(x,y)=>`<rect x="${x-3}" y="${y-2}" width="6" height="12" fill="${COL.cone}" stroke="${COL.ink}" stroke-width="1"/><circle cx="${x}" cy="${y-6}" r="5" fill="#fff" stroke="${COL.ink}" stroke-width="1.6"/>`,
  shuttle:(x,y)=>`<g transform="translate(${x},${y})"><polygon points="-6,-8 6,-8 3,2 -3,2" fill="#fff" stroke="${COL.ink}" stroke-width="1.2"/><circle cx="0" cy="4" r="3.6" fill="${COL.mk}" stroke="${COL.ink}" stroke-width="1"/></g>`,
  racket:(x,y)=>`<g transform="translate(${x},${y}) rotate(35)"><ellipse cx="0" cy="-9" rx="6" ry="8" fill="none" stroke="#fff" stroke-width="2.2"/><line x1="0" y1="-1" x2="0" y2="9" stroke="#fff" stroke-width="2.6"/></g>`,
  hurdle:(x,y)=>`<g><line x1="${x-3}" y1="${y-13}" x2="${x-3}" y2="${y+13}" stroke="#fff" stroke-width="2"/><line x1="${x+3}" y1="${y-13}" x2="${x+3}" y2="${y+13}" stroke="#fff" stroke-width="2"/><rect x="${x-5}" y="${y-13}" width="10" height="26" fill="${COL.cone}" opacity=".85"/></g>`,
  baton:(x,y)=>`<rect x="${x-7}" y="${y-2.5}" width="14" height="5" rx="2" fill="${COL.mk}" stroke="${COL.ink}" stroke-width="1"/>`,
  post:(x,y)=>`<circle cx="${x}" cy="${y}" r="9" fill="none" stroke="${COL.mk}" stroke-width="3"/><circle cx="${x}" cy="${y}" r="3" fill="#fff" stroke="${COL.ink}" stroke-width="1"/>`,
  hoop:(x,y,dir=1)=>`<line x1="${x+dir*8}" y1="${y-15}" x2="${x+dir*8}" y2="${y+15}" stroke="#fff" stroke-width="4"/><circle cx="${x}" cy="${y}" r="7" fill="none" stroke="${COL.cone}" stroke-width="3"/>`
};
const DIA={H:[200,228],F:[300,140],S:[200,52],T:[100,140]};
function diamond(){ const {H,F,S,T}=DIA; return `<path d="M${H} L${F} L${S} L${T} Z" fill="rgba(200,150,90,.35)" stroke="#fff" stroke-width="2.5"/>`+ln(H[0],H[1],380,48)+ln(H[0],H[1],20,48)+SV.base(...F)+SV.base(...S)+SV.base(...T)+`<polygon points="${H[0]-7},${H[1]-6} ${H[0]+7},${H[1]-6} ${H[0]+7},${H[1]+2} ${H[0]},${H[1]+8} ${H[0]-7},${H[1]+2}" fill="#fff" stroke="${COL.ink}" stroke-width="1.5"/>`; }
function court(){ return border(40,35,360,215)+`<line x1="120" y1="35" x2="120" y2="215" stroke="#fff" stroke-opacity=".5" stroke-width="2"/><line x1="280" y1="35" x2="280" y2="215" stroke="#fff" stroke-opacity=".5" stroke-width="2"/><line x1="200" y1="28" x2="200" y2="222" stroke="#fff" stroke-width="5"/><circle cx="200" cy="28" r="5" fill="#fff" stroke="${COL.ink}"/><circle cx="200" cy="222" r="5" fill="#fff" stroke="${COL.ink}"/>`; }
function lanes(n=4){ let s=''; const top=38, h=(212-38)/n; for(let k=0;k<=n;k++) s+=ln(30,top+k*h,370,top+k*h); s+=`<line x1="60" y1="${top}" x2="60" y2="212" stroke="#fff" stroke-width="4"/><line x1="350" y1="${top}" x2="350" y2="212" stroke="${COL.mk}" stroke-width="4" stroke-dasharray="8 6"/>`; return {s,top,h}; }
function nbCourt(){ return border(30,35,370,215)+ln(143,35,143,215)+ln(257,35,257,215)+`<path d="M30,80 A45,45 0 0,1 30,170" fill="none" stroke="#fff" stroke-width="2.5"/><path d="M370,80 A45,45 0 0,0 370,170" fill="none" stroke="#fff" stroke-width="2.5"/><circle cx="200" cy="125" r="10" fill="none" stroke="#fff" stroke-width="2"/>`+SV.post(40,125)+SV.post(360,125); }
function bbCourt(){ return border(30,35,370,215)+ln(200,35,200,215)+`<circle cx="200" cy="125" r="22" fill="none" stroke="#fff" stroke-width="2.5"/><rect x="30" y="98" width="62" height="54" fill="rgba(224,112,15,.28)" stroke="#fff" stroke-width="2.5"/><rect x="308" y="98" width="62" height="54" fill="rgba(224,112,15,.28)" stroke="#fff" stroke-width="2.5"/><path d="M30,50 Q150,125 30,200" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="2"/><path d="M370,50 Q250,125 370,200" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="2"/>`+SV.hoop(46,125,-1)+SV.hoop(354,125,1); }
function bbHalf(){ return border(150,35,370,215)+`<path d="M150,95 A30,30 0 0,1 150,155" fill="none" stroke="#fff" stroke-width="2.5"/><rect x="300" y="98" width="70" height="54" fill="rgba(224,112,15,.28)" stroke="#fff" stroke-width="2.5"/><path d="M370,45 Q220,125 370,205" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="2"/>`+SV.hoop(354,125,1); }
const arc=(x1,y1,x2,y2,h=40)=>`<path d="M${x1},${y1} Q${(x1+x2)/2},${Math.min(y1,y2)-h} ${x2},${y2}" fill="none" stroke="#fff" stroke-width="2.6" stroke-dasharray="6 5" marker-end="url(#w§)"/>`;
const arc2=(x1,y1,x2,y2,h=40)=>arc(x1,y1,x2,y2,h).replace('marker-end=','marker-start="url(#w§)" marker-end=');
Object.assign(TPL,{
 tb_throw:o=>{ let s=ln(60,25,60,225)+ln(340,25,340,225); [60,125,190].forEach(y=>{ s+=pl(80,y,COL.mint)+pl(320,y,COL.mint)+bl(98,y-6)+arc2(100,y-8,304,y-8,34); }); return {s,l:['me','ball','pass2:던지고 받기']}; },
 tb_hit:o=>{ let s=diamond(); const {H}=DIA; s+=SV.tee(H[0],H[1]-18)+pl(176,214,COL.blue)+`<line x1="182" y1="204" x2="196" y2="196" stroke="${COL.ink}" stroke-width="4" stroke-linecap="round"/>`+arc(200,206,262,72,40)+pl(300,85,COL.red)+pl(120,85,COL.red)+pl(215,120,COL.red)+`<line x1="40" y1="236" x2="140" y2="236" stroke="#fff" stroke-dasharray="5 5"/>`+pl(60,236,COL.obs)+pl(90,236,COL.obs); return {s,l:['blue:치는 사람','red:수비','obs:대기선','ball','pass:친 공','tee','base']}; },
 tb_run:o=>{ let s=diamond(); const {H,F,S,T}=DIA; s+=pl(210,214,COL.blue)+rn(214,214,292,148,-18)+rn(300,130,212,60,-18)+rn(188,58,108,132,-18)+pl(100,160,COL.obs)+pl(312,154,COL.red); return {s,l:['blue:달리는 사람','red:수비','run:달려 나가기','base']}; },
 tb_field:o=>{ let s=diamond(); const {F,S,T}=DIA; s+=pl(318,150,COL.red)+pl(200,72,COL.red)+pl(118,150,COL.red)+pl(250,95,COL.red)+pl(160,40,COL.red)+bl(262,100)+ps(258,104,312,140,16)+arc(170,40,250,92,20); return {s,l:['red:수비','ball','pass:던지기','base']}; },
 tb_game:o=>{ let s=diamond(); const {H}=DIA; s+=SV.tee(H[0],H[1]-18)+pl(176,214,COL.blue)+pl(318,152,COL.blue)+[[300,118],[200,72],[118,150],[250,60],[140,60]].map(([x,y])=>pl(x,y,COL.red)).join('')+arc(200,206,140,64,30)+rn(318,152,206,60,-16)+pl(50,236,COL.obs)+pl(80,236,COL.obs); return {s,l:['blue:공격','red:수비','obs:대기','ball','run','tee','base']}; },
 bm_solo:o=>{ let s=mkBox(); [[100,90],[200,90],[300,90],[100,180],[200,180],[300,180]].forEach(([x,y])=>{ s+=pl(x,y,COL.mint)+SV.racket(x+14,y-8)+SV.shuttle(x+20,y-38)+`<path d="M${x+30},${y-20} v-16" stroke="${COL.mk}" stroke-width="2.5" marker-end="url(#y§)"/>`; }); return {s,l:['me','shuttle','run:위로 띄우기']}; },
 bm_pair:o=>{ let s=court()+pl(110,125)+SV.racket(124,117)+pl(290,125,COL.red)+SV.racket(276,117)+SV.shuttle(240,66)+arc2(130,112,270,112,60); return {s,l:['blue','red:상대','shuttle','pass2:주고받는 셔틀콕 길','net']}; },
 bm_double:o=>{ let s=court()+pl(150,80)+pl(95,170)+pl(255,85,COL.red)+pl(305,165,COL.red)+SV.racket(164,72)+SV.shuttle(232,52)+arc(166,70,290,150,70); return {s,l:['blue:우리 짝','red:상대','shuttle','pass:셔틀콕 길','net']}; },
 at_run:o=>{ const L=lanes(4); let s=L.s; for(let k=0;k<4;k++){ const y=L.top+L.h*(k+.5); s+=pl(76,y,COL.mint)+rn(92,y,336,y,0); } return {s,l:['me','run:달리기']}; },
 at_relay:o=>{ const L=lanes(4); let s=L.s+zn(190,38,50,174,'rgba(255,212,59,.3)'); for(let k=0;k<4;k++){ const y=L.top+L.h*(k+.5); s+=pl(120,y,COL.blue)+SV.baton(134,y)+rn(140,y,196,y,0)+pl(232,y,COL.mint); } return {s,l:['blue:주는 사람','me:받는 사람','run','mk:인계 구역']}; },
 at_hurdle:o=>{ const L=lanes(3); let s=L.s; for(let k=0;k<3;k++){ const y=L.top+L.h*(k+.5); [150,230,310].forEach(x=>s+=SV.hurdle(x,y)); s+=pl(80,y,COL.mint)+`<path d="M96,${y} Q123,${y-30} 150,${y-6} T230,${y-6} T310,${y-6}" fill="none" stroke="${COL.mk}" stroke-width="3.5" marker-end="url(#y§)"/>`; } return {s,l:['me','run:넘어가기','hurdle']}; },
 at_jump:o=>{ let s=ln(30,105,250,105)+ln(30,145,250,145)+`<rect x="262" y="70" width="100" height="110" rx="6" fill="rgba(255,212,59,.45)" stroke="#fff" stroke-width="2.5"/><line x1="250" y1="98" x2="250" y2="152" stroke="#fff" stroke-width="5"/>`+pl(70,125,COL.mint)+rn(86,125,246,125,0)+`<path d="M250,120 Q290,60 320,118" fill="none" stroke="${COL.mk}" stroke-width="3.5" stroke-dasharray="6 4" marker-end="url(#y§)"/>`+pl(50,200,COL.obs)+pl(80,200,COL.obs); return {s,l:['me','obs:기다림','run:도움닫기·뛰기','mat']}; },
 at_throw:o=>{ let s=`<line x1="80" y1="25" x2="80" y2="225" stroke="#fff" stroke-width="5"/>`; [110,180,250].forEach(r=>s+=`<path d="M80,${125-r*.85} A${r},${r*.85} 0 0,1 80,${125+r*.85}" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="2" stroke-dasharray="5 6" transform="translate(0,0)"/>`);
   [70,125,180].forEach(y=>s+=pl(64,y,COL.mint)); s+=bl(82,118)+arc(86,118,280,118,60)+pl(30,70,COL.obs)+pl(30,180,COL.obs); return {s,l:['me','obs:안전선 뒤 기다림','ball','pass:던지기']}; },
 at_agility:o=>{ let s=`<rect x="90" y="100" width="150" height="50" fill="none" stroke="#fff" stroke-width="2.5"/>`; for(let x=115;x<240;x+=25) s+=`<line x1="${x}" y1="100" x2="${x}" y2="150" stroke="#fff" stroke-width="2.5"/>`; [[270,95],[300,155],[330,95],[360,155]].forEach(([x,y])=>s+=cn(x,y)); s+=pl(55,125,COL.mint)+`<path d="M72,125 H240 C255,125 260,90 270,110 S290,170 300,150 S320,80 330,110 S355,160 360,140" fill="none" stroke="${COL.mk}" stroke-width="3.5" marker-end="url(#y§)"/>`; return {s,l:['me','run:빠르게 바꾸기','cone']}; },
 nb_pair:o=>{ let s=''; [60,125,190].forEach(y=>{ s+=pl(90,y)+pl(310,y)+bl(108,y+4)+ps2(110,y,292,y); }); return {s,l:['blue','ball','pass2']}; },
 nb_group:o=>{ let s=mk(110,45)+mk(290,45)+mk(290,205)+mk(110,205); [[110,45],[290,45],[290,205],[110,205]].forEach(([x,y])=>s+=pl(x,y)); s+=pl(200,125,COL.red)+`<circle cx="200" cy="125" r="34" fill="none" stroke="#fff" stroke-dasharray="4 5"/>`+bl(126,52)+ps(110,45,290,45)+ps(290,45,290,205)+ps(290,205,110,205); return {s,l:['blue','red:수비(90cm)','ball','pass','mk']}; },
 nb_shoot:o=>{ let s=`<rect x="20" y="20" width="360" height="210" fill="none"/>`+border(170,35,370,215)+`<path d="M370,60 A75,75 0 0,0 370,190" fill="none" stroke="#fff" stroke-width="3"/>`+SV.post(355,125)+pl(305,105)+bl(320,98)+`<path d="M320,96 Q340,60 352,116" fill="none" stroke="#fff" stroke-width="2.6" stroke-dasharray="5 4" marker-end="url(#w§)"/>`+pl(300,165)+pl(220,125,COL.obs)+pl(195,125,COL.obs); return {s,l:['blue:슛하는 사람','obs:기다림','ball','pass:슛','hoop']}; },
 nb_court:o=>{ let s=nbCourt(); [[90,90],[180,160],[220,80],[300,150]].forEach(([x,y])=>s+=pl(x,y)); [[120,165],[200,110],[290,95],[330,170]].forEach(([x,y])=>s+=pl(x,y,COL.red)); s+=bl(106,96)+ps(100,96,172,152)+ps(186,152,214,90)+ps(228,86,292,142); return {s,l:['blue','red:상대','ball','pass','hoop']}; },
 vb_solo:o=>{ let s=mkBox(); [[100,170],[200,170],[300,170],[150,95],[250,95]].forEach(([x,y])=>{ s+=pl(x,y,COL.mint)+bl(x,y-40,7)+`<path d="M${x+14},${y-16} v-28" stroke="${COL.mk}" stroke-width="2.5" marker-end="url(#y§)"/>`; }); return {s,l:['me','ball','run:위로 띄우기']}; },
 vb_pair:o=>{ let s=''; [60,125,190].forEach(y=>{ s+=pl(90,y)+pl(310,y)+bl(110,y-12)+arc2(112,y-12,292,y-12,32); }); return {s,l:['blue','ball','pass2:띄워 주고받기']}; },
 vb_group:o=>{ const P4=[[130,70],[270,70],[270,180],[130,180]]; let s=`<circle cx="200" cy="125" r="78" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="2" stroke-dasharray="4 6"/>`; P4.forEach(([x,y])=>s+=pl(x,y)); s+=bl(148,62,7)+arc(148,60,256,60,30)+arc(272,88,272,164,0).replace('Q','Q')+arc(256,186,148,186,30); return {s,l:['blue','ball','pass:띄워 이어 주기']}; },
 vb_court:o=>{ let s=court(); [[90,80],[150,125],[90,170]].forEach(([x,y])=>s+=pl(x,y)); [[310,80],[250,125],[310,170]].forEach(([x,y])=>s+=pl(x,y,COL.red)); s+=bl(104,166,7)+arc(104,164,150,112,36)+arc(160,112,282,80,56); return {s,l:['blue','red:상대','ball','pass:받고 넘기기','net']}; },
 vb_serve:o=>{ let s=court()+`<line x1="300" y1="35" x2="300" y2="215" stroke="#fff" stroke-opacity=".4" stroke-dasharray="5 5"/><line x1="200" y1="125" x2="360" y2="125" stroke="#fff" stroke-opacity=".4" stroke-dasharray="5 5"/>`+pl(26,150)+bl(40,140,7)+arc(42,138,330,170,70); [[250,80],[250,170],[330,80]].forEach(([x,y])=>s+=pl(x,y,COL.red)); s+=pl(70,70,COL.obs)+pl(70,180,COL.obs); return {s,l:['blue:서브하는 사람','red:받는 사람','obs:기다림','ball','pass:서브','net']}; },
 vb_zones:o=>{ let s=court()+zn(282,37,76,86,'rgba(255,212,59,.35)')+`<line x1="280" y1="35" x2="280" y2="215" stroke="#fff" stroke-dasharray="5 5"/><line x1="200" y1="125" x2="360" y2="125" stroke="#fff" stroke-dasharray="5 5"/>`; [['1',240,80],['2',320,80],['3',240,170],['4',320,170]].forEach(([t,x,y])=>s+=`<text x="${x+26}" y="${y+34}" text-anchor="middle" font-size="15" font-weight="800" fill="#fff" opacity=".85">${t}</text>`); [[240,80],[240,170],[320,170]].forEach(([x,y])=>s+=pl(x,y,COL.red)); s+=pl(120,90)+pl(120,165)+bl(136,84,7)+arc(138,80,320,84,64); return {s,l:['blue','red:상대','ball','pass:빈 구역으로','mk:빈 구역','net']}; },
 vb_spike:o=>{ let s=court()+pl(176,80)+bl(176,52,7)+`<path d="M176,62 v-0" stroke="none"/>`+pl(140,150)+rn(140,150,186,104,-10)+`<path d="M190,66 L262,160" fill="none" stroke="#fff" stroke-width="2.8" stroke-dasharray="6 4" marker-end="url(#w§)"/>`+pl(224,96,COL.red)+`<path d="M214,80 v-14 M234,80 v-14" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`+pl(300,170,COL.red)+pl(90,110); return {s,l:['blue','red:막는 사람','ball','run:뛰어 들어가기','pass:내려치기','net']}; },
 bb_solo:o=>{ let s=mkBox(); [[90,90,140,70],[160,170,205,195],[250,75,295,60],[300,165,335,190],[120,195,85,160]].forEach(([x,y,x2,y2])=>{ s+=pl(x,y,COL.mint)+bl(x+14,y+8)+dr(x+20,y+10,x2+18,y2+12,3,3); }); return {s,l:['me','ball','drib:드리블']}; },
 bb_relay:o=>{ let s=ln(60,30,60,220); [70,125,180].forEach((y,k)=>{ [130,190,250,310].forEach((x,j)=>s+=cn(x,y+(j%2?14:-14))); s+=pl(76,y,[COL.blue,COL.red,COL.mint][k])+bl(92,y+6)+`<path d="M96,${y+6} C115,${y-30} 145,${y-30} 160,${y} S205,${y+34} 220,${y} S265,${y-34} 280,${y} S320,${y+30} 340,${y}" fill="none" stroke="#fff" stroke-width="2.4" stroke-dasharray="3 3" marker-end="url(#w§)"/>`+pl(40,y,COL.obs); }); return {s,l:['blue:팀','obs:기다림','ball','drib:드리블','cone']}; },
 bb_pair:o=>{ let s=''; [60,125,190].forEach((y,k)=>{ s+=pl(90,y)+pl(310,y)+bl(108,y+4)+(k===1?`<path d="M112,${y+2} L200,${y+26} L292,${y+2}" fill="none" stroke="#fff" stroke-width="2.6" stroke-dasharray="6 5" marker-start="url(#w§)" marker-end="url(#w§)"/>`:ps2(110,y,292,y)); }); return {s,l:['blue','ball','pass2']}; },
 bb_shoot:o=>{ let s=bbHalf()+pl(262,125)+bl(276,118)+`<path d="M278,114 Q318,62 348,118" fill="none" stroke="#fff" stroke-width="2.6" stroke-dasharray="5 4" marker-end="url(#w§)"/>`+pl(330,170,COL.mint)+pl(234,125,COL.obs)+pl(208,125,COL.obs)+pl(182,125,COL.obs); return {s,l:['blue:슛하는 사람','me:리바운드','obs:기다림','ball','pass:슛','basket']}; },
 bb_half:o=>{ let s=bbHalf(); [[200,80],[200,175],[275,60]].forEach(([x,y])=>s+=pl(x,y)); [[240,110],[300,150]].forEach(([x,y])=>s+=pl(x,y,COL.red)); s+=bl(214,86)+ps(214,84,262,64)+rn(200,175,300,120,-20); return {s,l:['blue:공격','red:수비','ball','pass','run:빈 곳으로','basket']}; },
 bb_court:o=>{ let s=bbCourt(); [[110,80],[150,175],[255,70],[300,175]].forEach(([x,y])=>s+=pl(x,y)); [[90,150],[200,72],[225,185],[330,120]].forEach(([x,y])=>s+=pl(x,y,COL.red)); s+=bl(124,86)+ps(124,90,146,160)+ps(164,166,244,80)+ps(268,80,296,160); return {s,l:['blue','red:상대','ball','pass','basket']}; },
 bb_defend:o=>{ let s=bbHalf()+pl(220,125)+bl(236,132)+dr(242,132,282,150,3,2)+pl(290,128,COL.red)+`<path d="M280,112 l10,-10 l10,10" fill="none" stroke="#fff" stroke-width="2.4"/>`+pl(220,60,COL.obs)+pl(220,190,COL.obs); return {s,l:['blue:공격','red:수비','obs:기다림','ball','drib:드리블','basket']}; },
 nb_defend:o=>{ let s=pl(130,125)+bl(146,130)+pl(200,125,COL.red)+`<circle cx="130" cy="125" r="42" fill="none" stroke="${COL.mk}" stroke-width="2" stroke-dasharray="5 5"/>`+pl(310,70)+pl(310,180)+ps(148,118,298,76)+rn(200,125,250,98,-14); return {s,l:['blue:공격','red:수비','ball','pass','run:가로채기','mk:90cm']}; }
});
/* 범례 추가 항목 */
const _legendList=legendList;
legendList=function(ids,u){
  const extra={tee:[SV.tee(17,14),'티'],base:[SV.base(17,11),'베이스'],shuttle:[SV.shuttle(17,12),'셔틀콕'],net:[`<line x1="17" y1="2" x2="17" y2="20" stroke="#fff" stroke-width="4"/>`,'네트'],hurdle:[`<rect x="12" y="3" width="10" height="16" fill="#e0700f" stroke="#fff"/>`,'허들'],mat:[`<rect x="6" y="4" width="22" height="14" rx="3" fill="rgba(255,212,59,.7)" stroke="#fff"/>`,'매트·모래밭'],hoop:[SV.post(17,11),'골대'],basket:[SV.hoop(14,11,1),'골대'],disc:[DISC(17,11,5),'원반'],fball:[FBALL(17,11,5.5),'플로어볼 공'],dgoal:[DGBASKET(17,12,.6),'바구니(목표)'],ring:[`<circle cx="17" cy="11" r="8" fill="none" stroke="#ffd43b" stroke-width="3"/>`,'훌라후프(표적)'],ring1m:[`<circle cx="17" cy="11" r="8" fill="none" stroke="#ffd43b" stroke-width="2" stroke-dasharray="3 3"/>`,'막는 사람 1m'],ezone:[`<rect x="5" y="3" width="24" height="16" fill="rgba(255,212,59,.45)" stroke="#fff" stroke-dasharray="3 2"/>`,'득점 구역']};
  const base=_legendList(ids.filter(id=>!extra[id.split(':')[0]]),u);
  const add=ids.filter(id=>extra[id.split(':')[0]]).map(id=>{const [k,lab]=id.split(':'); return `<li><svg viewBox="0 0 34 22" aria-hidden="true">${extra[k][0]}</svg>${lab||extra[k][1]}</li>`;}).join('');
  return base.replace('</ul>',add+'</ul>');
};


/* ===== 새 종목에도 쓰는 기본 대형 그림 (addUnit의 '그림'에 이름을 적거나, 형태에 따라 저절로 고름) =====
   gen_solo 혼자 · gen_pair 짝 · gen_group 모둠 원 · gen_relay 이어달리기 줄 · gen_net 네트 경기 · gen_goal 골 경기 · gen_zone 구역 지키기 */
Object.assign(TPL,{
 gen_solo:o=>{ const r=TPL.bb_solo(o); r.l=['me','ball','drib:도구 다루며 이동']; return r; },
 gen_pair:o=>{ const r=TPL.bb_pair(o); r.l=['blue','ball','pass2']; return r; },
 gen_group:o=>{ const r=TPL.vb_group(o); r.l=['blue','ball','pass:모둠 안에서 주고받기']; return r; },
 gen_relay:o=>{ const r=TPL.bb_relay(o); r.l=['blue:팀','obs:기다림','ball','drib:돌아오기','cone']; return r; },
 gen_net:o=>{ const r=TPL.vb_court(o); r.l=['blue','red:상대','ball','pass:넘기기']; return r; },
 gen_goal:o=>{ let s=border(30,35,370,215)+ln(200,35,200,215)+`<circle cx="200" cy="125" r="20" fill="none" stroke="#fff" stroke-width="2.5"/>`+goalR(20,125,60)+goalR(370,125,60);
   [[120,80],[150,170],[245,110]].forEach(([x,y])=>s+=pl(x,y)); [[280,75],[300,175],[175,120]].forEach(([x,y])=>s+=pl(x,y,COL.red));
   s+=bl(134,86)+ps(134,90,148,158)+ps(164,166,240,118)+ps(258,112,350,125); return {s,l:['blue','red:상대','ball','pass']}; },
 gen_zone:o=>{ let s=border(40,35,360,215)+ln(200,35,200,215)+mk(120,125)+mk(280,125);
   [[90,70],[90,180],[160,125]].forEach(([x,y])=>s+=pl(x,y)); [[240,125],[310,70],[310,180]].forEach(([x,y])=>s+=pl(x,y,COL.red));
   s+=bl(174,130)+ps(176,128,300,78); return {s,l:['blue','red:상대','ball','pass','mk:구역']}; }
});

/* ===== 튀는 골대(바운더) 그림: 츄크볼처럼 탄력 그물에 맞혀 튀어 나오게 하는 종목 =====
   gen_bounder 슛·받기 연습 · gen_bounder_court 원네트 경기 · gen_bounder_two 투네트 경기 */
const BND=(x,y,dir=-1)=>{ const w=13, h=30; return `<g transform="translate(${x},${y})"><polygon points="0,${-h} ${dir*w},${-h+6} ${dir*w},${h-6} 0,${h}" fill="rgba(255,255,255,.25)" stroke="#fff" stroke-width="3"/>`+
  [-18,-6,6,18].map(v=>`<line x1="0" y1="${v}" x2="${dir*w}" y2="${v*0.8}" stroke="#fff" stroke-opacity=".6" stroke-width="1.2"/>`).join('')+`<line x1="${dir*w*.5}" y1="${-h+3}" x2="${dir*w*.5}" y2="${h-3}" stroke="#fff" stroke-opacity=".6" stroke-width="1.2"/></g>`; };
const NOGO=(x,y,r=46,dir=-1)=>`<path d="M${x},${y-r} A${r},${r} 0 0,${dir<0?0:1} ${x},${y+r}" fill="rgba(217,67,58,.22)" stroke="${COL.mk}" stroke-width="2.5" stroke-dasharray="5 4"/>`;
const BTXT=(x,y,t)=>`<text x="${x}" y="${y}" fill="#fff" font-size="12" font-weight="800" text-anchor="middle" font-family="Gothic A1,sans-serif">${t}</text>`;
const BOUNCE=(x1,y1,x2,y2)=>`<path d="M${x1},${y1} Q${(x1+x2)/2+(y2-y1)*.15},${Math.min(y1,y2)-26} ${x2},${y2}" fill="none" stroke="${COL.mk}" stroke-width="3" marker-end="url(#y§)"/>`;
Object.assign(TPL,{
 gen_bounder:o=>{ let s=border(30,35,370,215)+NOGO(352,125)+BND(352,125)+BTXT(318,58,'바운더')+BTXT(296,212,'금지 구역');
   s+=pl(150,125,COL.mint)+bl(166,130)+ps(170,125,326,125)+BOUNCE(330,118,230,62)+BOUNCE(330,132,240,190)+BOUNCE(330,125,250,125);
   s+=pl(218,58)+pl(226,194)+pl(236,125)+pl(70,85,COL.obs)+pl(70,165,COL.obs);
   return {s,l:['me:슛하는 사람','blue:받는 사람','obs:기다림','ball','pass:슛','run:튀는 공']}; },
 gen_bounder_court:o=>{ let s=border(30,35,370,215)+NOGO(352,125)+BND(352,125)+BTXT(296,212,'금지 구역');
   [[90,80],[120,175],[200,110]].forEach(([x,y])=>s+=pl(x,y)); [[255,70],[262,125],[255,182],[170,190]].forEach(([x,y])=>s+=pl(x,y,COL.red));
   s+=bl(104,86)+ps(104,90,116,158)+ps(134,170,188,120)+ps(214,112,326,124)+BOUNCE(330,120,262,100);
   return {s,l:['blue:공격','red:수비(자리만)','ball','pass:이어주기·슛','run:튀는 공']}; },
 gen_bounder_two:o=>{ let s=border(30,35,370,215)+ln(200,35,200,215)+NOGO(48,125,40,1)+BND(48,125,1)+NOGO(352,125,40)+BND(352,125)+BTXT(200,28,'센터라인');
   [[120,80],[160,170],[240,110],[290,180]].forEach(([x,y])=>s+=pl(x,y)); [[110,150],[200,70],[275,70],[300,135]].forEach(([x,y])=>s+=pl(x,y,COL.red));
   s+=bl(134,86)+ps(134,90,156,158)+ps(174,166,230,118)+ps(252,112,328,124)+BOUNCE(330,118,300,150);
   return {s,l:['blue:공격','red:수비(자리만)','ball','pass:이어주기·슛','run:튀는 공']}; }
});

/* ===== 플라잉 디스크 · 플로어볼 그림 =====
   그림 이름에 disc: true 를 붙이면 공 대신 원반, fball: true 를 붙이면 구멍 난 플로어볼 공으로 그림 */
const DISC=(x,y,r=6)=>`<g><ellipse cx="${x}" cy="${y}" rx="${(r*1.75).toFixed(1)}" ry="${(r*.85).toFixed(1)}" fill="#ffe14d" stroke="${COL.ink}" stroke-width="2"/><ellipse cx="${x}" cy="${y-.6}" rx="${(r*1.05).toFixed(1)}" ry="${(r*.45).toFixed(1)}" fill="none" stroke="${COL.ink}" stroke-width="1" opacity=".55"/></g>`;
const FBALL=(x,y,r=6)=>`<g><circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="${COL.ink}" stroke-width="2"/>${[[-.4,-.35],[.4,-.35],[0,.42],[-.45,.3],[.45,.3]].map(([a,b])=>`<circle cx="${(x+a*r).toFixed(1)}" cy="${(y+b*r).toFixed(1)}" r="${(r*.16).toFixed(1)}" fill="${COL.ink}"/>`).join('')}</g>`;
const DGBASKET=(x,y,k=1)=>`<g transform="translate(${x},${y}) scale(${k})"><line x1="0" y1="-20" x2="0" y2="16" stroke="#fff" stroke-width="3"/><path d="M-12,-14 L12,-14 L8,-2 L-8,-2 Z" fill="none" stroke="#fff" stroke-width="2"/><ellipse cx="0" cy="2" rx="13" ry="4" fill="rgba(255,255,255,.25)" stroke="#fff" stroke-width="2.5"/><line x1="-10" y1="16" x2="10" y2="16" stroke="#fff" stroke-width="3"/></g>`;
const BALLRE=/<circle cx="([\d.]+)" cy="([\d.]+)" r="([\d.]+)" fill="#fff" stroke="#1c2a21" stroke-width="2"\/><polygon points="[^"]*" fill="#1c2a21"\/>/g;
const EZ=(x,w=44)=>`<rect x="${x}" y="35" width="${w}" height="180" fill="rgba(255,212,59,.28)" stroke="#fff" stroke-width="2" stroke-dasharray="6 5"/>`;
Object.assign(TPL,{
 /* 디스크골프: 던지는 자리 → 바구니 */
 fd_basket:o=>{ let s=ln(50,40,50,210)+DGBASKET(330,130,1.4);
   [[90,80],[90,170]].forEach(([x,y])=>s+=pl(x,y,COL.obs)); s+=pl(120,125,COL.mint)+bl(136,128)+arc(140,122,316,118,52);
   if(o.lie) s+=mk(230,150)+`<line x1="140" y1="132" x2="226" y2="150" stroke="#fff" stroke-width="2" stroke-dasharray="3 4" opacity=".7"/>`;
   return {s,l:['me:던지는 사람','obs:기다림','ball','pass:던지기','dgoal'].concat(o.lie?['mk:떨어진 자리']:[])}; },
 /* 홀 여러 개를 도는 코스 */
 fd_course:o=>{ let s=''; const H=[[90,190],[200,70],[320,180]];
   H.forEach(([x,y],k)=>{ s+=DGBASKET(x+30,y-6,.9)+`<text x="${x-18}" y="${y+26}" fill="#fff" font-size="14" font-weight="800" font-family="Gothic A1,sans-serif">${k+1}번 홀</text>`; });
   s+=mk(40,120)+pl(40,95,COL.mint)+bl(54,100)+arc(58,96,112,176,40)+`<path d="M130,170 Q170,110 214,72" fill="none" stroke="${COL.mk}" stroke-width="3" stroke-dasharray="2 9" stroke-linecap="round"/><path d="M236,74 Q300,100 340,166" fill="none" stroke="${COL.mk}" stroke-width="3" stroke-dasharray="2 9" stroke-linecap="round"/>`+pl(250,210,COL.obs)+pl(276,214,COL.obs);
   return {s,l:['me','obs:다음 모둠','ball','pass:던지기','run:홀 사이 걷는 길','dgoal','mk:출발']}; },
 /* 표적 맞히기: 훌라후프·콘 */
 fd_target:o=>{ let s=ln(60,30,60,220);
   [[240,70,26],[300,125,30],[240,180,26]].forEach(([x,y,r],k)=>s+=`<circle cx="${x}" cy="${y}" r="${r}" fill="rgba(255,255,255,.1)" stroke="${COL.mk}" stroke-width="4"/><text x="${x}" y="${y+5}" text-anchor="middle" fill="#fff" font-size="14" font-weight="800">${k===1?3:k+1}</text>`);
   s+=pl(90,125,COL.mint)+bl(106,128)+arc(110,122,280,118,40)+pl(36,80,COL.obs)+pl(36,170,COL.obs);
   return {s,l:['me','obs:기다림','ball','pass:던지기','ring']}; },
 /* 얼티미트: 양 끝 득점 구역, 원반은 던져서만 앞으로 */
 fd_ult:o=>{ let s=border(30,35,370,215)+EZ(30)+EZ(326); const n=o.n||4;
   const B=[[110,80],[160,170],[230,100],[300,150],[200,200]].slice(0,n), R=[[140,110],[190,140],[255,70],[320,110],[230,180]].slice(0,o.def===false?0:n);
   B.forEach(([x,y])=>s+=pl(x,y)); R.forEach(([x,y])=>s+=pl(x,y,COL.red));
   if(o.mark) s+=`<circle cx="110" cy="80" r="26" fill="none" stroke="${COL.mk}" stroke-width="2" stroke-dasharray="4 4"/>`;
   s+=bl(124,86)+ps(124,90,152,158)+ps(172,164,222,108)+rn(300,150,350,110,-20);
   return {s,l:['blue:공격','red:수비'].slice(0,o.def===false?1:2).concat(['ball','pass:던져서만 앞으로','run:득점 구역으로','ezone']).concat(o.mark?['ring1m']:[])}; },
 /* 플로어볼: 페이스오프(가운데에서 마주 서서 시작) */
 fb_faceoff:o=>{ let s=border(30,35,370,215)+ln(200,35,200,215)+`<circle cx="200" cy="125" r="36" fill="none" stroke="#fff" stroke-width="2.5" stroke-dasharray="6 5"/>`;
   s+=pl(176,125)+pl(224,125,COL.red)+bl(200,125)+pl(110,90)+pl(110,165)+pl(290,90,COL.red)+pl(290,165,COL.red)+ps(196,128,122,160);
   return {s,l:['blue:우리 편','red:상대','ball','pass:뒤 친구에게 보내기','mk2:3m 안에 들어가지 않기']}; },
 /* 모두 함께 쓰는 '흩어져 서기'(도구를 들고 제자리 연습) */
 gen_spread:o=>{ let s=mkBox(); [[100,90],[200,90],[300,90],[100,170],[200,170],[300,170]].forEach(([x,y])=>s+=pl(x,y,COL.mint)+bl(x+16,y-12)); return {s,l:['me','ball']}; },
 /* 플로어볼: 벽에 맞혀 되받기 */
 fb_wall:o=>{ let s=`<rect x="352" y="30" width="16" height="190" fill="rgba(255,255,255,.35)" stroke="#fff" stroke-width="2"/>`;
   [[110,70],[110,180]].forEach(([x,y])=>{ s+=pl(x,y,COL.mint)+bl(x+16,y+4)+ps(x+20,y+2,346,125)+ps(346,125,x+30,y+(y<125?16:-16)); });
   if(o.def) s+=pl(230,125,COL.red);
   return {s,l:['me','ball','pass:벽에 맞혀 되받기'].concat(o.def?['red:수비']:[])}; }
});
/* 그림 그리기: 원반·플로어볼 공으로 바꿔 그림 */
function tplOf(d){
  const r=TPL[d.t](d);
  if(d.disc){ r.s=r.s.replace(BALLRE,(m,x,y,rr)=>DISC(+x,+y,+rr)); r.l=r.l.map(id=>id==='ball'?'disc':id.startsWith('ball:')?'disc'+id.slice(4):/^pass:(차기|슛|패스하고 따라가기)$/.test(id)?'pass:던지기':id==='pass'?'pass:던지기':id); }
  else if(d.pball){ r.s=r.s.replace(BALLRE,(m,x,y,rr)=>PBALL(+x,+y,+rr)); r.l=r.l.map(id=>id==='ball'?'pball':id.startsWith('ball:')?'pball'+id.slice(4):id); }
  else if(d.fball){ r.s=r.s.replace(BALLRE,(m,x,y,rr)=>FBALL(+x,+y,+rr)); r.l=r.l.map(id=>id==='ball'?'fball':id.startsWith('ball:')?'fball'+id.slice(4):id); }
  return r;
}

/* ===== 교실놀이 그림: 나무 바닥 · 벽 쪽으로 민 책상 · 교실 물건 =====
   obj: np 신문지 공 · balloon 풍선 · cup 종이컵 · bag 콩주머니 · chair 의자 · card 낱말 카드 · 없으면 몸만 */
const CL={
 floor:()=>`<rect width="400" height="250" rx="14" fill="#d8b07a"/>${[50,100,150,200].map(y=>`<line x1="0" y1="${y}" x2="400" y2="${y}" stroke="#b98e57" stroke-width="1.5"/>`).join('')}`+[30,95,160,225,290,355].map(x=>`<rect x="${x}" y="6" width="36" height="16" rx="2" fill="#f3e1c2" stroke="#8a6a3e" stroke-width="1.5"/><rect x="${x}" y="228" width="36" height="16" rx="2" fill="#f3e1c2" stroke="#8a6a3e" stroke-width="1.5"/>`).join(''),
 o:(k,x,y)=>({
   np:`<circle cx="${x}" cy="${y}" r="7" fill="#e9e6df" stroke="#55534d" stroke-width="1.6"/><path d="M${x-4},${y-2} l3,2 l2,-3 l3,3" fill="none" stroke="#7d7a72" stroke-width="1"/>`,
   balloon:`<ellipse cx="${x}" cy="${y-3}" rx="7" ry="9" fill="#ff6b9a" stroke="#8a2449" stroke-width="1.5"/><path d="M${x},${y+6} q3,5 0,10" fill="none" stroke="#8a2449" stroke-width="1.2"/>`,
   cup:`<path d="M${x-6},${y-7} L${x+6},${y-7} L${x+4},${y+7} L${x-4},${y+7} Z" fill="#fff" stroke="#55534d" stroke-width="1.6"/>`,
   bag:`<rect x="${x-7}" y="${y-6}" width="14" height="12" rx="4" fill="#e2463b" stroke="#7a1f19" stroke-width="1.5"/>`,
   chair:`<g stroke="#5a3d1c" stroke-width="2"><rect x="${x-8}" y="${y-2}" width="16" height="5" fill="#a0713b"/><line x1="${x-7}" y1="${y+3}" x2="${x-7}" y2="${y+11}"/><line x1="${x+7}" y1="${y+3}" x2="${x+7}" y2="${y+11}"/><line x1="${x-7}" y1="${y-2}" x2="${x-7}" y2="${y-13}"/></g>`,
   card:`<rect x="${x-7}" y="${y-9}" width="14" height="18" rx="2" fill="#fff" stroke="#55534d" stroke-width="1.5"/><line x1="${x-4}" y1="${y-3}" x2="${x+4}" y2="${y-3}" stroke="#55534d"/><line x1="${x-4}" y1="${y+2}" x2="${x+3}" y2="${y+2}" stroke="#55534d"/>`
 }[k]||''),
 lab:{np:'신문지 공',balloon:'풍선',cup:'종이컵',bag:'콩주머니',chair:'의자',card:'낱말 카드'}
};
const clL=o=>o.obj?['cl_'+o.obj]:[];
Object.assign(TPL,{
 cl_spread:o=>{ let s=CL.floor(); const P=[[80,80],[200,70],[320,80],[110,170],[230,165],[330,175]];
   if(o.train){ [[90,95],[130,95],[170,95]].forEach(([x,y],k)=>s+=pl(x,y,k?COL.blue:COL.mint)); [[230,165],[270,165],[310,165]].forEach(([x,y],k)=>s+=pl(x,y,k?COL.blue:COL.mint)); s+=rn(195,95,240,130,-20)+rn(205,165,165,128,-20); return {s,l:['me:맨 앞','blue:뒤에 붙은 친구','run:걸어서 이동']}; }
   P.forEach(([x,y])=>{ s+=pl(x,y,COL.mint)+(o.obj?CL.o(o.obj,x+20,y-14):''); if(o.up) s+=`<path d="M${x+20},${y-26} v-16" stroke="${COL.mk}" stroke-width="2.5" marker-end="url(#y§)"/>`; if(o.walk) s+=rn(x,y,x+34,y+22,-16); });
   return {s,l:['me'].concat(clL(o)).concat(o.up?['run:위로 띄우기']:[]).concat(o.walk?['run:걸어서 이동']:[])}; },
 cl_pair:o=>{ let s=CL.floor(); [70,125,180].forEach(y=>{ s+=pl(120,y,COL.mint)+pl(280,y,COL.blue);
     if(o.gate) s+=CL.o('cup',200,y-12)+CL.o('cup',200,y+12);
     if(o.obj && !o.side) s+=CL.o(o.obj,142,y-4)+(o.pass===false?'':ps2(152,y,262,y)); else if(o.obj) s+=CL.o(o.obj,200,y);
     else s+=`<line x1="138" y1="${y}" x2="262" y2="${y}" stroke="#fff" stroke-width="2" stroke-dasharray="2 6" opacity=".9"/>`; });
   return {s,l:['me','blue:짝'].concat(clL(o)).concat(o.obj&&!o.side&&o.pass!==false?['pass2']:o.obj?[]:['mk2:마주 보기'])}; },
 cl_circle:o=>{ let s=CL.floor(); const C=o.two?[[120,125],[280,125]]:[[200,125]];
   C.forEach(([cx,cy])=>{ const r=o.two?58:72, P=[0,1,2,3].map(k=>{const a=(-90+k*90)*Math.PI/180; return [cx+r*Math.cos(a),cy+r*Math.sin(a)];});
     s+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="rgba(255,255,255,.18)" stroke="#fff" stroke-width="2" stroke-dasharray="5 5"/>`;
     P.forEach(([x,y])=>s+=pl(x,y,COL.blue)); if(o.obj) s+=CL.o(o.obj,P[0][0]+18,P[0][1]);
     if(o.pass) s+=ps(P[0][0],P[0][1],P[1][0],P[1][1])+ps(P[1][0],P[1][1],P[2][0],P[2][1])+ps(P[2][0],P[2][1],P[3][0],P[3][1]); });
   return {s,l:['blue:모둠'].concat(clL(o)).concat(o.pass?[o.obj?'pass:이어 보내기':'pass:옆 친구에게 전달']:[])}; },
 cl_halves:o=>{ let s=CL.floor(); if(!o.mix) s+=`<line x1="200" y1="28" x2="200" y2="222" stroke="#fff" stroke-width="3" stroke-dasharray="8 6"/>`;
   const A=o.mix?[[80,70],[170,180],[260,90],[330,170]]:[[70,70],[110,160],[150,100]], B=o.mix?[[120,140],[210,60],[300,130],[350,70]]:[[250,90],[290,170],[330,100]];
   A.forEach(([x,y])=>s+=pl(x,y,COL.blue)); B.forEach(([x,y])=>s+=pl(x,y,COL.red));
   const Os=o.mix?[[60,130],[140,90],[190,130],[240,170],[280,60],[330,120],[100,200],[370,200]]:[[60,120],[150,190],[170,60],[240,140],[320,60],[350,180]];
   Os.forEach(([x,y],k)=>s+= o.obj==='cup'&&o.mix&&k%2 ? `<path d="M${x-6},${y+7} L${x+6},${y+7} L${x+4},${y-7} L${x-4},${y-7} Z" fill="#9db8ef" stroke="#55534d" stroke-width="1.6"/>` : CL.o(o.obj||'np',x,y));
   if(!o.mix) s+=arc(122,150,262,128,40);
   return {s,l:o.mix?['blue:바로 팀','red:거꾸로 팀','cl_cup:바로 놓인 컵','cl_cupb:거꾸로 놓인 컵']:['blue:한 팀','red:다른 팀'].concat(clL(o)).concat(['pass:우리 쪽에서 상대 쪽으로','mk2:가운데 선'])}; },
 cl_relay:o=>{ let s=CL.floor()+`<line x1="70" y1="40" x2="70" y2="210" stroke="#fff" stroke-width="3"/>`;
   [70,125,180].forEach((y,k)=>{ s+=pl(50,y,COL.obs)+pl(26,y,COL.obs)+pl(92,y,[COL.blue,COL.red,COL.mint][k])+(o.obj?CL.o(o.obj,112,y-14):'')+mk(300,y)+(o.obj?CL.o(o.obj,300,y-14):'')+rn(110,y+6,288,y+6,-18)+rn(290,y-8,112,y-10,24); });
   return {s,l:['blue:모둠','obs:기다림','run:걸어서 다녀오기','mk:원 마커'].concat(clL(o))}; },
 cl_target:o=>{ let s=CL.floor()+`<line x1="110" y1="40" x2="110" y2="210" stroke="#fff" stroke-width="3"/>`; const T=o.tgt||'box';
   if(T==='box') s+=`<rect x="300" y="105" width="44" height="34" fill="#c9a06a" stroke="#6b4b22" stroke-width="2"/><path d="M300,105 l10,-10 h44 l-10,10" fill="#e0c08f" stroke="#6b4b22" stroke-width="2"/>`;
   if(T==='rings') [[315,125,46,1],[315,125,30,2],[315,125,14,3]].forEach(([x,y,r,p])=>s+=`<circle cx="${x}" cy="${y}" r="${r}" fill="${p===3?'rgba(255,212,59,.6)':'rgba(255,255,255,.15)'}" stroke="${COL.mk}" stroke-width="3"/>`);
   if(T==='cups'||T==='cup1'){ const pts=T==='cup1'?[[320,125]]:[[300,125],[318,113],[318,137],[336,101],[336,125],[336,149]]; pts.forEach(([x,y])=>s+=CL.o('cup',x,y)); }
   s+=pl(130,125,COL.mint)+(o.obj?CL.o(o.obj,148,112):'')+(o.roll?ps(152,128,290,125):arc(150,112,300,112,46))+pl(80,85,COL.obs)+pl(80,165,COL.obs);
   if(o.two) s+=pl(130,190,COL.red)+ps(150,186,296,140);
   return {s,l:['me','obs:기다림'].concat(o.two?['red:다른 팀']:[]).concat(clL(o)).concat([o.roll?'pass:굴리기':o.slide?'pass:밀어 보내기':'pass:던지기']).concat(T==='box'?['cl_box']:T==='rings'?['cl_rings']:['cl_cup:세워 둔 컵'])}; },
 cl_seatnet:o=>{ let s=CL.floor()+`<line x1="200" y1="40" x2="200" y2="210" stroke="#fff" stroke-width="4"/>`+CL.o('chair',200,30)+CL.o('chair',200,212);
   [[120,80],[90,150],[140,190],[150,120]].forEach(([x,y])=>s+=CL.o('chair',x,y+16)+pl(x,y,COL.blue)); [[280,80],[310,150],[260,190],[250,120]].forEach(([x,y])=>s+=CL.o('chair',x,y+16)+pl(x,y,COL.red));
   s+=CL.o('balloon',178,96)+arc(160,100,260,110,50);
   return {s,l:['blue:한 팀(앉아서)','red:다른 팀(앉아서)','cl_balloon','pass:쳐서 넘기기','net:줄넘기 줄 네트']}; },
 cl_station:o=>{ let s=CL.floor(); const S=[[90,75,'1'],[310,75,'2'],[310,180,'3'],[90,180,'4']];
   S.forEach(([x,y,t])=>{ s+=`<rect x="${x-46}" y="${y-30}" width="92" height="60" rx="10" fill="rgba(255,255,255,.3)" stroke="#fff" stroke-width="2"/><text x="${x-34}" y="${y-12}" font-size="16" font-weight="800" fill="#5a3d1c">${t}</text>`+pl(x+4,y+6,COL.blue)+CL.o('chair',x+28,y+4); });
   s+=rn(140,70,262,70,-14)+rn(312,110,312,148,-14)+rn(262,184,140,184,-14);
   return {s,l:['blue:모둠','cl_chair','run:신호에 다음 자리로']}; },
 cl_front:o=>{ let s=CL.floor()+`<rect x="150" y="30" width="100" height="10" rx="3" fill="#2f4f3a"/>`+pl(200,62,o.teams?COL.blue:COL.mk);
   if(o.obj) s+=CL.o(o.obj,226,52);
   [[80,150],[140,150],[200,150],[260,150],[320,150],[110,200],[170,200],[230,200],[290,200]].forEach(([x,y],k)=>s+=pl(x,y,o.teams?(x<200||(x===200&&k<5)?COL.blue:COL.red):COL.mint));
   return {s,l:[o.teams?'blue:표현하는 사람·우리 팀':'mk3:앞에서 보여 주는 사람(선생님)',o.teams?'red:다른 팀':'me'].concat(clL(o))}; }
});
/* 교실놀이 범례 */
(function(){ const _ll=legendList; legendList=function(ids,u){
  const ex={cl_box:[`<rect x="9" y="6" width="16" height="12" fill="#c9a06a" stroke="#6b4b22"/>`,'상자'],cl_rings:[`<circle cx="17" cy="11" r="8" fill="none" stroke="#ffd43b" stroke-width="3"/>`,'과녁'],
    cl_cupb:[`<path d="M11,18 L23,18 L21,4 L13,4 Z" fill="#9db8ef" stroke="#55534d"/>`,'거꾸로 놓인 컵'],mk2:[`<line x1="4" y1="11" x2="30" y2="11" stroke="#fff" stroke-width="2" stroke-dasharray="3 4"/>`,'선'],
    mk3:[`<circle cx="17" cy="11" r="7" fill="#ffd43b" stroke="#fff" stroke-width="2"/>`,'보여 주는 사람']};
  Object.keys(CL.lab).forEach(k=>ex['cl_'+k]=[`<g transform="translate(0,2)">${CL.o(k,17,9)}</g>`,CL.lab[k]]);
  const base=_ll(ids.filter(id=>!ex[id.split(':')[0]]),u);
  const add=ids.filter(id=>ex[id.split(':')[0]]).map(id=>{const [k,lab]=id.split(':'); return `<li><svg viewBox="0 0 34 22" aria-hidden="true">${ex[k][0]}</svg>${lab||ex[k][1]}</li>`;}).join('');
  return base.replace('</ul>',add+'</ul>'); };
  function o_lab(){ return '종이컵'; } })();

/* ===== 피클볼 그림: 키친(네트 앞 노란 구역)이 있는 코트 · 패들 · 구멍 난 공 =====
   pk_solo 혼자(wall: 벽치기) · pk_carry 패들에 공 올리고 콘 돌기 · pk_pair 짝 주고받기(nonet 네트 없이 · side 좌우로 · vol 바로 치기 · deep 깊게)
   pk_target 표적(zone: kitchen 키친 · deep 뒤쪽 · serve 대각선 서브 · hoop 바닥 후프) · pk_zones 세 구역 · pk_lines 두 줄 번갈아
   pk_quad 네 칸 승진 · pk_single 1 대 1(narrow 좁은 코트) · pk_double 2 대 2(front 둘 다 키친 선) */
const PBALL=(x,y,r=6)=>`<g><circle cx="${x}" cy="${y}" r="${r}" fill="#d8f25a" stroke="${COL.ink}" stroke-width="2"/>${[[-.4,-.35],[.4,-.35],[0,.42],[-.45,.3],[.45,.3]].map(([a,b])=>`<circle cx="${(x+a*r).toFixed(1)}" cy="${(y+b*r).toFixed(1)}" r="${(r*.15).toFixed(1)}" fill="${COL.ink}"/>`).join('')}</g>`;
const PAD=(x,y,rot=30)=>`<g transform="translate(${x},${y}) rotate(${rot})"><rect x="-6" y="-17" width="12" height="15" rx="5" fill="#ff7a1a" stroke="#fff" stroke-width="1.6"/><line x1="0" y1="-2" x2="0" y2="7" stroke="#fff" stroke-width="3" stroke-linecap="round"/></g>`;
function pkCourt(o={}){
  if(o.nonet) return `<line x1="200" y1="40" x2="200" y2="210" stroke="#fff" stroke-width="2.5" stroke-dasharray="4 7"/>`;
  const x0=o.short?110:40, x1=o.short?290:360;
  return `<rect x="150" y="35" width="100" height="180" fill="rgba(255,212,59,.3)"/>`+border(x0,35,x1,215)+ln(150,35,150,215)+ln(250,35,250,215)+(o.short?'':ln(40,125,150,125)+ln(250,125,360,125))
    +`<text x="175" y="52" text-anchor="middle" fill="#fff" font-size="12" font-weight="800" font-family="Gothic A1,sans-serif">키친</text><text x="225" y="52" text-anchor="middle" fill="#fff" font-size="12" font-weight="800" font-family="Gothic A1,sans-serif">키친</text>`
    +`<line x1="200" y1="28" x2="200" y2="222" stroke="#fff" stroke-width="5"/><circle cx="200" cy="28" r="5" fill="#fff" stroke="${COL.ink}"/><circle cx="200" cy="222" r="5" fill="#fff" stroke="${COL.ink}"/>`;
}
const pkP=(x,y,c=COL.blue,face=1)=>pl(x,y,c)+PAD(x+face*14,y-8,face*30);
const PKL=(o={})=>o.nonet?['mk2:가운데 선','paddle']:['net','kitchen','paddle'];
Object.assign(TPL,{
 pk_solo:o=>{ let s='';
   if(o.wall){ s+=`<rect x="352" y="30" width="16" height="190" fill="rgba(255,255,255,.35)" stroke="#fff" stroke-width="2"/>`;
     [[230,70],[230,180]].forEach(([x,y])=>{ s+=mk(x,y+20)+pkP(x,y,COL.mint)+bl(x+30,y+2)+ps2(x+36,y,346,y); }); s+=pl(110,125,COL.obs);
     return {s,l:['me','obs:기다림','ball','pass2:벽에 치고 받기','paddle','wall']}; }
   s=mkBox(); [[100,90],[200,90],[300,90],[100,180],[200,180],[300,180]].forEach(([x,y])=>{ s+=pkP(x,y,COL.mint)+bl(x+16,y-40)+`<path d="M${x+16},${y-20} v-12" stroke="${COL.mk}" stroke-width="2.5" marker-end="url(#y§)" marker-start="url(#y§)"/>`; });
   return {s,l:['me','ball','tap:톡톡 튀기기','paddle']}; },
 pk_carry:o=>{ let s=ln(60,30,60,220); [70,180].forEach(y=>{ s+=pl(40,y,COL.obs)+pl(40,y+26>220?y-26:y+26,COL.obs)+cn(320,y)+pkP(130,y,COL.blue)+bl(144,y-14)+rn(150,y,300,y-18,-16)+rn(330,y+8,170,y+20,-16); });
   return {s,l:['blue:가는 사람','obs:기다림','ball:패들 위의 공','run:콘 돌아오기','cone','paddle']}; },
 pk_pair:o=>{ let s=pkCourt(o); const xa=o.nonet?120:o.vol?140:o.deep?70:132, xb=o.nonet?280:o.vol?260:o.deep?330:268;
   s+=pkP(xa,125,COL.mint)+pkP(xb,125,COL.blue,-1)+bl(xa+28,112);
   if(o.vol) s+=ps2(xa+20,118,xb-20,118); else s+=arc2(xa+22,110,xb-22,110,o.deep?60:34);
   if(o.side) s+=rn(xb,105,xb,60,-10)+rn(xb,145,xb,190,10);
   if(!o.nonet&&!o.deep) s+=mk(xb-22,150)+mk(xa+22,150);
   return {s,l:['me','blue:짝','ball',o.vol?'pass2:튀기 전에 바로 치기':'pass2:한 번 튀겨 주고받기'].concat(o.side?['run:좌우로 옮겨 받기']:[]).concat(PKL(o))}; },
 pk_target:o=>{ let s=pkCourt({nonet:o.zone==='hoop'});
   if(o.zone==='hoop'){ s=`<circle cx="270" cy="125" r="34" fill="rgba(255,255,255,.1)" stroke="${COL.mk}" stroke-width="4"/>`+pkP(110,125,COL.mint)+bl(136,114)+arc(138,110,262,118,40)+pl(60,70,COL.obs)+pl(60,180,COL.obs);
     return {s,l:['me','obs:기다림','ball','pass:살짝 밀어 보내기','ring','paddle']}; }
   if(o.zone==='serve'){ s+=`<rect x="250" y="35" width="110" height="90" fill="rgba(255,255,255,.18)" stroke="#fff" stroke-width="2" stroke-dasharray="6 5"/>`+pkP(26,170,COL.mint)+bl(48,160)+arc(52,156,318,82,46)+pl(20,215,COL.obs)+mk(330,70)+mk(300,95);
     return {s,l:['me:서브하는 사람','obs:기다림','ball','pass:대각선으로 서브','mk:표적','paddle','kitchen']}; }
   if(o.zone==='deep'){ s+=`<rect x="320" y="35" width="40" height="180" fill="rgba(255,255,255,.2)" stroke="#fff" stroke-width="2" stroke-dasharray="6 5"/><text x="340" y="232" text-anchor="middle" fill="#fff" font-size="12" font-weight="800" font-family="Gothic A1,sans-serif">깊게</text>`+pkP(110,125,COL.mint)+bl(138,112)+arc(140,108,334,96,64)+pl(70,70,COL.obs)+pl(70,180,COL.obs);
     return {s,l:['me','obs:기다림','ball','pass:뒤쪽 구역으로 깊게','paddle','net','kitchen']}; }
   s+=`<circle cx="226" cy="75" r="11" fill="none" stroke="${COL.mk}" stroke-width="3"/><circle cx="230" cy="125" r="15" fill="none" stroke="${COL.mk}" stroke-width="3"/>`+mk(226,178)+pkP(126,125,COL.mint)+bl(152,114)+arc(154,110,226,120,34)+pl(70,70,COL.obs)+pl(70,180,COL.obs);
   return {s,l:['me','obs:기다림','ball','pass:키친 안 표적에 살짝','ring:표적(후프·원 마커·양동이)','paddle','net','kitchen']}; },
 pk_zones:o=>{ let s=`<rect x="250" y="35" width="40" height="180" fill="rgba(255,212,59,.3)"/>`+border(250,35,370,215)+ln(290,35,290,215)+ln(330,35,330,215)+`<line x1="250" y1="28" x2="250" y2="222" stroke="#fff" stroke-width="5"/>`;
   [['키친','업',270],['가운데','가슴',310],['뒤쪽','다운',350]].forEach(([a,b,x])=>s+=`<text x="${x}" y="54" text-anchor="middle" fill="#fff" font-size="12" font-weight="800" font-family="Gothic A1,sans-serif">${a}</text><text x="${x}" y="206" text-anchor="middle" fill="${COL.mk}" font-size="12" font-weight="800" font-family="Gothic A1,sans-serif">${b}</text>`);
   s+=pkP(350,125,COL.mint)+rn(338,140,282,140,14)+pkP(150,90,COL.blue)+pkP(150,165,COL.blue)+pl(60,90,COL.obs)+pl(60,165,COL.obs);
   return {s,l:['me','blue:모둠','obs:기다림','run:구역 옮기며 높이 바꾸기','paddle','kitchen']}; },
 pk_lines:o=>{ let s=pkCourt({short:true}); s+=pkP(130,125,COL.blue)+pkP(270,125,COL.red,-1)+bl(156,112)+arc(158,108,248,108,30);
   [98,72,46].forEach(x=>s+=pl(x,125,COL.blue)); [302,328,354].forEach(x=>s+=pl(x,125,COL.red)); s+=rn(130,145,46,160,16)+rn(270,145,354,160,-16);
   return {s,l:['blue:우리 줄','red:건너편 줄','ball','pass:넘기기','run:치고 줄 뒤로','paddle','net','kitchen']}; },
 pk_quad:o=>{ let s=border(80,35,320,215)+ln(200,35,200,215)+ln(80,125,320,125);
   [[140,80,1],[260,80,2],[140,170,3],[260,170,4]].forEach(([x,y,n])=>s+=`<text x="${x+30}" y="${y-22}" fill="${n===4?COL.mk:'#fff'}" font-size="18" font-weight="900" font-family="Gothic A1,sans-serif">${n}${n===4?' 왕':''}</text>`+pkP(x,y,n===4?COL.mint:COL.blue));
   s+=bl(276,160)+arc(274,160,156,96,26)+[40,40,40].map((x,k)=>pl(x,120+k*30,COL.obs)).join('')+rn(140,104,58,112,10);
   return {s,l:['blue:칸 주인','me:4번 칸(왕)','obs:기다리는 줄','ball','pass:아무 칸으로 보내기','run:실수하면 줄 뒤로','paddle']}; },
 pk_single:o=>{ let s=pkCourt({short:o.short}); if(o.short){ s+=pkP(128,125,COL.blue)+pkP(272,125,COL.red,-1)+bl(154,112)+arc(156,108,248,108,30)+pl(40,90,COL.obs)+pl(40,160,COL.obs); return {s,l:['blue:나','red:상대','obs:기다림·판정','ball','pass2:키친에 튄 공만 넘기기','net','kitchen','paddle']}; }
   if(o.narrow) s+=`<rect x="40" y="35" width="320" height="90" fill="rgba(28,42,33,.35)"/>`;
   const y=o.narrow?170:125; s+=pkP(70,y,COL.blue)+pkP(330,y,COL.red,-1)+bl(98,y-12)+arc(100,y-16,300,y-16,50)+pl(20,232,COL.obs)+pl(50,232,COL.obs);
   return {s,l:['blue:나','red:상대','obs:기다림·판정','ball','pass2:주고받기'].concat(o.narrow?['shade']:[]).concat(['net','kitchen','paddle'])}; },
 pk_double:o=>{ let s=pkCourt(); const B=o.front?[[132,80],[132,170]]:[[70,80],[70,170]], R=o.front||o.both?[[268,80],[268,170]]:[[330,80],[330,170]];
   B.forEach(([x,y])=>s+=pkP(x,y,COL.blue)); R.forEach(([x,y])=>s+=pkP(x,y,COL.red,-1));
   s+=bl(B[0][0]+28,B[0][1]-12)+arc(B[0][0]+30,B[0][1]-16,R[1][0]-26,R[1][1]-10,o.front?30:50);
   if(o.run) s+=rn(70,80,120,80,-8)+rn(70,170,120,170,8);
   if(!o.front) s+=pl(24,236,COL.obs);
   return {s,l:['blue:우리 짝','red:상대','ball','pass:넘기기'].concat(o.run?['run:둘이 함께 앞으로']:[]).concat(['net','kitchen','paddle'])}; }
});
/* 피클볼 범례 · 공 바꾸기 */
const _legendList2=legendList;
legendList=function(ids,u){
  const extra={paddle:[PAD(17,16,30),'패들'],pball:[PBALL(17,11,5.5),'피클볼 공'],kitchen:[`<rect x="5" y="3" width="24" height="16" fill="rgba(255,212,59,.45)" stroke="#fff"/>`,'키친(공중 공 치기 금지)'],wall:[`<rect x="13" y="2" width="8" height="18" fill="rgba(255,255,255,.6)" stroke="#fff"/>`,'벽'],shade:[`<rect x="5" y="3" width="24" height="16" fill="rgba(28,42,33,.55)" stroke="#fff"/>`,'어두운 쪽은 쓰지 않음']};
  const base=_legendList2(ids.filter(id=>!extra[id.split(':')[0]]),u);
  const add=ids.filter(id=>extra[id.split(':')[0]]).map(id=>{const [k,lab]=id.split(':'); return `<li><svg viewBox="0 0 34 22" aria-hidden="true">${extra[k][0]}</svg>${lab||extra[k][1]}</li>`;}).join('');
  return base.replace('</ul>',add+'</ul>');
};

/* ===== 교실놀이 그림 더하기: 스카프 · 신문지 한 장 · 3칸 과녁 · 컵 쌓기 책상 · 신문지 섬 =====
   cl_grid(nums: 숫자 칸) · cl_stack(pair 둘이서 · relay 이어 하기) · cl_island · cl_spread(help: 떨어뜨린 친구 돕기) */
(function(){
  const _o=CL.o;
  CL.o=(k,x,y)=>({
    scarf:`<path d="M${x-8},${y-6} q4,-5 8,0 t8,0 l-2,12 q-4,4 -7,0 t-7,0 Z" fill="#6fd0f2" stroke="#1d6a86" stroke-width="1.4" opacity=".95"/>`,
    sheet:`<rect x="${x-9}" y="${y-7}" width="18" height="14" fill="#efece4" stroke="#55534d" stroke-width="1.4"/><line x1="${x-6}" y1="${y-3}" x2="${x+6}" y2="${y-3}" stroke="#9a968c"/><line x1="${x-6}" y1="${y+1}" x2="${x+6}" y2="${y+1}" stroke="#9a968c"/><line x1="${x-6}" y1="${y+4}" x2="${x+2}" y2="${y+4}" stroke="#9a968c"/>`,
    stack:[[-6,4],[0,4],[6,4],[-3,-6],[3,-6]].slice(0,5).map(([a,b],i)=>i<3||i>2?`<path d="M${x+a-3},${y+b-4} L${x+a+3},${y+b-4} L${x+a+2},${y+b+4} L${x+a-2},${y+b+4} Z" fill="#ff8a3d" stroke="#7a3a10" stroke-width="1"/>`:'').join('')
  }[k]||_o(k,x,y));
  Object.assign(CL.lab,{scarf:'스카프(비닐봉지)',sheet:'신문지 한 장',stack:'컵 탑(3개)'});
  const pyr=(x,y)=>[[x-9,y+8],[x+9,y+8],[x,y-8]].map(([a,b])=>`<path d="M${a-8},${b-8} L${a+8},${b-8} L${a+6},${b+8} L${a-6},${b+8} Z" fill="#ff8a3d" stroke="#7a3a10" stroke-width="1.4"/>`).join('');
  const desk=(x,y,w,h)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="#c9a06a" stroke="#6b4b22" stroke-width="2"/>`;
  const _sp=TPL.cl_spread;
  Object.assign(TPL,{
   cl_spread:o=>{ if(!o.help) return _sp(o); const r=_sp(Object.assign({},o,{help:false}));
     r.s+=pl(300,130,COL.obs)+CL.o(o.obj||'bag',300,156)+pl(230,130,COL.mint)+rn(243,138,288,150,-12);
     r.l=r.l.concat(['obs:얼음(떨어뜨린 친구)','run:주워서 얹어 주기']); return r; },
   cl_grid:o=>{ let s=CL.floor()+`<line x1="110" y1="40" x2="110" y2="210" stroke="#fff" stroke-width="3"/>`;
     for(let i=0;i<3;i++) for(let j=0;j<3;j++){ const x=255+i*34, y=74+j*34;
       s+=`<rect x="${x}" y="${y}" width="34" height="34" fill="rgba(255,255,255,.25)" stroke="#fff" stroke-width="2"/>`;
       if(o.nums) s+=`<text x="${x+17}" y="${y+23}" text-anchor="middle" font-size="16" font-weight="800" fill="#5a3d1c">${[2,7,4,9,1,6,3,8,5][i*3+j]}</text>`; }
     if(!o.nums) s+=`<rect x="${255+5}" y="${74+5}" width="24" height="24" rx="6" fill="#e2463b" stroke="#7a1f19"/><rect x="${289+5}" y="${108+5}" width="24" height="24" rx="6" fill="#2f6fd6" stroke="#173a7a"/><rect x="${323+5}" y="${74+5}" width="24" height="24" rx="6" fill="#e2463b" stroke="#7a1f19"/>`;
     s+=pl(132,100,o.nums?COL.mint:COL.red)+CL.o('bag',150,88)+arc(150,88,290,104,44)+pl(80,70,COL.obs)+pl(80,180,COL.obs);
     if(!o.nums) s+=pl(132,165,COL.blue)+CL.o('bag',150,153)+arc(150,153,310,160,30);
     return {s,l:(o.nums?['me']:['red:한 팀','blue:다른 팀']).concat(['obs:기다림','cl_bag','pass:칸에 던지기','mk2:던지는 선'])}; },
   cl_stack:o=>{ let s=CL.floor();
     if(o.relay){ [70,125,180].forEach((y,k)=>{ s+=desk(270,y-22,90,44)+pyr(294,y)+pyr(336,y)+pl(70,y,COL.obs)+pl(44,y,COL.obs)+pl(100,y,[COL.blue,COL.red,COL.mint][k])+rn(116,y+4,262,y+4,-16)+rn(262,y-10,116,y-10,22); });
       return {s,l:['blue:모둠','obs:기다림','run:걸어가서 쌓고 내리고 돌아오기','cl_cup:쌓기 컵']}; }
     s+=desk(110,70,180,70)+pyr(150,100)+pyr(200,100)+pyr(250,100);
     if(o.pair) s+=pl(170,170,COL.mint)+pl(230,170,COL.blue)+`<text x="148" y="205" font-size="13" font-weight="800" fill="#5a3d1c">오른손</text><text x="210" y="205" font-size="13" font-weight="800" fill="#5a3d1c">왼손</text>`;
     else s+=pl(200,170,COL.mint)+pl(330,170,COL.blue)+sw(330,135);
     return {s,l:o.pair?['me','blue:짝','cl_cup:쌓기 컵']:['me','blue:시간 재는 짝','cl_cup:쌓기 컵']}; },
   cl_island:o=>{ let s=CL.floor(); [[110,95],[290,95],[200,185]].forEach(([x,y])=>{ s+=`<rect x="${x-48}" y="${y-34}" width="96" height="68" fill="#efece4" stroke="#55534d" stroke-width="2"/><line x1="${x}" y1="${y-34}" x2="${x}" y2="${y+34}" stroke="#9a968c" stroke-width="2" stroke-dasharray="5 4"/>`;
       [[-22,-14],[22,-14],[-22,14],[22,14]].forEach(([a,b])=>s+=pl(x+a,y+b,COL.blue)); });
     s+=`<path d="M346,50 q30,10 10,40" fill="none" stroke="${COL.mk}" stroke-width="3" marker-end="url(#y§)"/>`;
     return {s,l:['blue:모둠','cl_sheet','mk2:다음 판에 반으로 접는 선','run:판마다 좁히기']}; }
  });
})();
