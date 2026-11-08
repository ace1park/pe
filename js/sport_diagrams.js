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
Object.assign(TPL,{
 tb_throw:o=>{ let s=ln(60,25,60,225)+ln(340,25,340,225); [60,125,190].forEach(y=>{ s+=pl(80,y,COL.mint)+pl(320,y,COL.mint)+bl(98,y-6)+arc(100,y-8,304,y-8,34); }); return {s,l:['me','ball','pass:던지기']}; },
 tb_hit:o=>{ let s=diamond(); const {H}=DIA; s+=SV.tee(H[0],H[1]-18)+pl(176,214,COL.blue)+`<line x1="182" y1="204" x2="196" y2="196" stroke="${COL.ink}" stroke-width="4" stroke-linecap="round"/>`+arc(200,206,262,72,40)+pl(300,85,COL.red)+pl(120,85,COL.red)+pl(215,120,COL.red)+`<line x1="40" y1="236" x2="140" y2="236" stroke="#fff" stroke-dasharray="5 5"/>`+pl(60,236,COL.obs)+pl(90,236,COL.obs); return {s,l:['blue:치는 사람','red:수비','obs:대기선','ball','pass:친 공','tee','base']}; },
 tb_run:o=>{ let s=diamond(); const {H,F,S,T}=DIA; s+=pl(210,214,COL.blue)+rn(214,214,292,148,-18)+rn(300,130,212,60,-18)+rn(188,58,108,132,-18)+pl(100,160,COL.obs)+pl(312,154,COL.red); return {s,l:['blue:달리는 사람','red:수비','run:달려 나가기','base']}; },
 tb_field:o=>{ let s=diamond(); const {F,S,T}=DIA; s+=pl(318,150,COL.red)+pl(200,72,COL.red)+pl(118,150,COL.red)+pl(250,95,COL.red)+pl(160,40,COL.red)+bl(262,100)+ps(258,104,312,140,16)+arc(170,40,250,92,20); return {s,l:['red:수비','ball','pass:던지기','base']}; },
 tb_game:o=>{ let s=diamond(); const {H}=DIA; s+=SV.tee(H[0],H[1]-18)+pl(176,214,COL.blue)+pl(318,152,COL.blue)+[[300,118],[200,72],[118,150],[250,60],[140,60]].map(([x,y])=>pl(x,y,COL.red)).join('')+arc(200,206,140,64,30)+rn(318,152,206,60,-16)+pl(50,236,COL.obs)+pl(80,236,COL.obs); return {s,l:['blue:공격','red:수비','obs:대기','ball','run','tee','base']}; },
 bm_solo:o=>{ let s=mkBox(); [[100,90],[200,90],[300,90],[100,180],[200,180],[300,180]].forEach(([x,y])=>{ s+=pl(x,y,COL.mint)+SV.racket(x+14,y-8)+SV.shuttle(x+20,y-38)+`<path d="M${x+30},${y-20} v-16" stroke="${COL.mk}" stroke-width="2.5" marker-end="url(#y§)"/>`; }); return {s,l:['me','shuttle','run:위로 띄우기']}; },
 bm_pair:o=>{ let s=court()+pl(110,125)+SV.racket(124,117)+pl(290,125,COL.red)+SV.racket(276,117)+SV.shuttle(240,66)+arc(130,112,270,112,60); return {s,l:['blue','red:상대','shuttle','pass:셔틀콕 길','net']}; },
 bm_double:o=>{ let s=court()+pl(150,80)+pl(95,170)+pl(255,85,COL.red)+pl(305,165,COL.red)+SV.racket(164,72)+SV.shuttle(232,52)+arc(166,70,290,150,70); return {s,l:['blue:우리 짝','red:상대','shuttle','pass:셔틀콕 길','net']}; },
 at_run:o=>{ const L=lanes(4); let s=L.s; for(let k=0;k<4;k++){ const y=L.top+L.h*(k+.5); s+=pl(76,y,COL.mint)+rn(92,y,336,y,0); } return {s,l:['me','run:달리기']}; },
 at_relay:o=>{ const L=lanes(4); let s=L.s+zn(190,38,50,174,'rgba(255,212,59,.3)'); for(let k=0;k<4;k++){ const y=L.top+L.h*(k+.5); s+=pl(120,y,COL.blue)+SV.baton(134,y)+rn(140,y,196,y,0)+pl(232,y,COL.mint); } return {s,l:['blue:주는 사람','me:받는 사람','run','mk:인계 구역']}; },
 at_hurdle:o=>{ const L=lanes(3); let s=L.s; for(let k=0;k<3;k++){ const y=L.top+L.h*(k+.5); [150,230,310].forEach(x=>s+=SV.hurdle(x,y)); s+=pl(80,y,COL.mint)+`<path d="M96,${y} Q123,${y-30} 150,${y-6} T230,${y-6} T310,${y-6}" fill="none" stroke="${COL.mk}" stroke-width="3.5" marker-end="url(#y§)"/>`; } return {s,l:['me','run:넘어가기','hurdle']}; },
 at_jump:o=>{ let s=ln(30,105,250,105)+ln(30,145,250,145)+`<rect x="262" y="70" width="100" height="110" rx="6" fill="rgba(255,212,59,.45)" stroke="#fff" stroke-width="2.5"/><line x1="250" y1="98" x2="250" y2="152" stroke="#fff" stroke-width="5"/>`+pl(70,125,COL.mint)+rn(86,125,246,125,0)+`<path d="M250,120 Q290,60 320,118" fill="none" stroke="${COL.mk}" stroke-width="3.5" stroke-dasharray="6 4" marker-end="url(#y§)"/>`+pl(50,200,COL.obs)+pl(80,200,COL.obs); return {s,l:['me','obs:기다림','run:도움닫기·뛰기','mat']}; },
 at_throw:o=>{ let s=`<line x1="80" y1="25" x2="80" y2="225" stroke="#fff" stroke-width="5"/>`; [110,180,250].forEach(r=>s+=`<path d="M80,${125-r*.85} A${r},${r*.85} 0 0,1 80,${125+r*.85}" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="2" stroke-dasharray="5 6" transform="translate(0,0)"/>`);
   [70,125,180].forEach(y=>s+=pl(64,y,COL.mint)); s+=bl(82,118)+arc(86,118,280,118,60)+pl(30,70,COL.obs)+pl(30,180,COL.obs); return {s,l:['me','obs:안전선 뒤 기다림','ball','pass:던지기']}; },
 at_agility:o=>{ let s=`<rect x="90" y="100" width="150" height="50" fill="none" stroke="#fff" stroke-width="2.5"/>`; for(let x=115;x<240;x+=25) s+=`<line x1="${x}" y1="100" x2="${x}" y2="150" stroke="#fff" stroke-width="2.5"/>`; [[270,95],[300,155],[330,95],[360,155]].forEach(([x,y])=>s+=cn(x,y)); s+=pl(55,125,COL.mint)+`<path d="M72,125 H240 C255,125 260,90 270,110 S290,170 300,150 S320,80 330,110 S355,160 360,140" fill="none" stroke="${COL.mk}" stroke-width="3.5" marker-end="url(#y§)"/>`; return {s,l:['me','run:빠르게 바꾸기','cone']}; },
 nb_pair:o=>{ let s=''; [60,125,190].forEach(y=>{ s+=pl(90,y)+pl(310,y)+bl(108,y+4)+ps(110,y,292,y); }); return {s,l:['blue','ball','pass']}; },
 nb_group:o=>{ let s=mk(110,45)+mk(290,45)+mk(290,205)+mk(110,205); [[110,45],[290,45],[290,205],[110,205]].forEach(([x,y])=>s+=pl(x,y)); s+=pl(200,125,COL.red)+`<circle cx="200" cy="125" r="34" fill="none" stroke="#fff" stroke-dasharray="4 5"/>`+bl(126,52)+ps(110,45,290,45)+ps(290,45,290,205)+ps(290,205,110,205); return {s,l:['blue','red:수비(90cm)','ball','pass','mk']}; },
 nb_shoot:o=>{ let s=`<rect x="20" y="20" width="360" height="210" fill="none"/>`+border(170,35,370,215)+`<path d="M370,60 A75,75 0 0,0 370,190" fill="none" stroke="#fff" stroke-width="3"/>`+SV.post(355,125)+pl(305,105)+bl(320,98)+`<path d="M320,96 Q340,60 352,116" fill="none" stroke="#fff" stroke-width="2.6" stroke-dasharray="5 4" marker-end="url(#w§)"/>`+pl(300,165)+pl(220,125,COL.obs)+pl(195,125,COL.obs); return {s,l:['blue:슛하는 사람','obs:기다림','ball','pass:슛','hoop']}; },
 nb_court:o=>{ let s=nbCourt(); [[90,90],[180,160],[220,80],[300,150]].forEach(([x,y])=>s+=pl(x,y)); [[120,165],[200,110],[290,95],[330,170]].forEach(([x,y])=>s+=pl(x,y,COL.red)); s+=bl(106,96)+ps(100,96,172,152)+ps(186,152,214,90)+ps(228,86,292,142); return {s,l:['blue','red:상대','ball','pass','hoop']}; },
 vb_solo:o=>{ let s=mkBox(); [[100,170],[200,170],[300,170],[150,95],[250,95]].forEach(([x,y])=>{ s+=pl(x,y,COL.mint)+bl(x,y-40,7)+`<path d="M${x+14},${y-16} v-28" stroke="${COL.mk}" stroke-width="2.5" marker-end="url(#y§)"/>`; }); return {s,l:['me','ball','run:위로 띄우기']}; },
 vb_pair:o=>{ let s=''; [60,125,190].forEach(y=>{ s+=pl(90,y)+pl(310,y)+bl(110,y-12)+arc(112,y-12,292,y-12,32); }); return {s,l:['blue','ball','pass:띄워 보내기']}; },
 vb_group:o=>{ const P4=[[130,70],[270,70],[270,180],[130,180]]; let s=`<circle cx="200" cy="125" r="78" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="2" stroke-dasharray="4 6"/>`; P4.forEach(([x,y])=>s+=pl(x,y)); s+=bl(148,62,7)+arc(148,60,256,60,30)+arc(272,88,272,164,0).replace('Q','Q')+arc(256,186,148,186,30); return {s,l:['blue','ball','pass:띄워 이어 주기']}; },
 vb_court:o=>{ let s=court(); [[90,80],[150,125],[90,170]].forEach(([x,y])=>s+=pl(x,y)); [[310,80],[250,125],[310,170]].forEach(([x,y])=>s+=pl(x,y,COL.red)); s+=bl(104,166,7)+arc(104,164,150,112,36)+arc(160,112,282,80,56); return {s,l:['blue','red:상대','ball','pass:받고 넘기기','net']}; },
 vb_serve:o=>{ let s=court()+`<line x1="300" y1="35" x2="300" y2="215" stroke="#fff" stroke-opacity=".4" stroke-dasharray="5 5"/><line x1="200" y1="125" x2="360" y2="125" stroke="#fff" stroke-opacity=".4" stroke-dasharray="5 5"/>`+pl(26,150)+bl(40,140,7)+arc(42,138,330,170,70); [[250,80],[250,170],[330,80]].forEach(([x,y])=>s+=pl(x,y,COL.red)); s+=pl(70,70,COL.obs)+pl(70,180,COL.obs); return {s,l:['blue:서브하는 사람','red:받는 사람','obs:기다림','ball','pass:서브','net']}; },
 vb_zones:o=>{ let s=court()+zn(282,37,76,86,'rgba(255,212,59,.35)')+`<line x1="280" y1="35" x2="280" y2="215" stroke="#fff" stroke-dasharray="5 5"/><line x1="200" y1="125" x2="360" y2="125" stroke="#fff" stroke-dasharray="5 5"/>`; [['1',240,80],['2',320,80],['3',240,170],['4',320,170]].forEach(([t,x,y])=>s+=`<text x="${x+26}" y="${y+34}" text-anchor="middle" font-size="15" font-weight="800" fill="#fff" opacity=".85">${t}</text>`); [[240,80],[240,170],[320,170]].forEach(([x,y])=>s+=pl(x,y,COL.red)); s+=pl(120,90)+pl(120,165)+bl(136,84,7)+arc(138,80,320,84,64); return {s,l:['blue','red:상대','ball','pass:빈 구역으로','mk:빈 구역','net']}; },
 vb_spike:o=>{ let s=court()+pl(176,80)+bl(176,52,7)+`<path d="M176,62 v-0" stroke="none"/>`+pl(140,150)+rn(140,150,186,104,-10)+`<path d="M190,66 L262,160" fill="none" stroke="#fff" stroke-width="2.8" stroke-dasharray="6 4" marker-end="url(#w§)"/>`+pl(224,96,COL.red)+`<path d="M214,80 v-14 M234,80 v-14" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`+pl(300,170,COL.red)+pl(90,110); return {s,l:['blue','red:막는 사람','ball','run:뛰어 들어가기','pass:내려치기','net']}; },
 bb_solo:o=>{ let s=mkBox(); [[90,90,140,70],[160,170,205,195],[250,75,295,60],[300,165,335,190],[120,195,85,160]].forEach(([x,y,x2,y2])=>{ s+=pl(x,y,COL.mint)+bl(x+14,y+8)+dr(x+20,y+10,x2+18,y2+12,3,3); }); return {s,l:['me','ball','drib:드리블']}; },
 bb_relay:o=>{ let s=ln(60,30,60,220); [70,125,180].forEach((y,k)=>{ [130,190,250,310].forEach((x,j)=>s+=cn(x,y+(j%2?14:-14))); s+=pl(76,y,[COL.blue,COL.red,COL.mint][k])+bl(92,y+6)+`<path d="M96,${y+6} C115,${y-30} 145,${y-30} 160,${y} S205,${y+34} 220,${y} S265,${y-34} 280,${y} S320,${y+30} 340,${y}" fill="none" stroke="#fff" stroke-width="2.4" stroke-dasharray="3 3" marker-end="url(#w§)"/>`+pl(40,y,COL.obs); }); return {s,l:['blue:팀','obs:기다림','ball','drib:드리블','cone']}; },
 bb_pair:o=>{ let s=''; [60,125,190].forEach((y,k)=>{ s+=pl(90,y)+pl(310,y)+bl(108,y+4)+(k===1?`<path d="M112,${y+2} L200,${y+26} L292,${y+2}" fill="none" stroke="#fff" stroke-width="2.6" stroke-dasharray="6 5" marker-end="url(#w§)"/>`:ps(110,y,292,y)); }); return {s,l:['blue','ball','pass:패스']}; },
 bb_shoot:o=>{ let s=bbHalf()+pl(262,125)+bl(276,118)+`<path d="M278,114 Q318,62 348,118" fill="none" stroke="#fff" stroke-width="2.6" stroke-dasharray="5 4" marker-end="url(#w§)"/>`+pl(330,170,COL.mint)+pl(234,125,COL.obs)+pl(208,125,COL.obs)+pl(182,125,COL.obs); return {s,l:['blue:슛하는 사람','me:리바운드','obs:기다림','ball','pass:슛','basket']}; },
 bb_half:o=>{ let s=bbHalf(); [[200,80],[200,175],[275,60]].forEach(([x,y])=>s+=pl(x,y)); [[240,110],[300,150]].forEach(([x,y])=>s+=pl(x,y,COL.red)); s+=bl(214,86)+ps(214,84,262,64)+rn(200,175,300,120,-20); return {s,l:['blue:공격','red:수비','ball','pass','run:빈 곳으로','basket']}; },
 bb_court:o=>{ let s=bbCourt(); [[110,80],[150,175],[255,70],[300,175]].forEach(([x,y])=>s+=pl(x,y)); [[90,150],[200,72],[225,185],[330,120]].forEach(([x,y])=>s+=pl(x,y,COL.red)); s+=bl(124,86)+ps(124,90,146,160)+ps(164,166,244,80)+ps(268,80,296,160); return {s,l:['blue','red:상대','ball','pass','basket']}; },
 bb_defend:o=>{ let s=bbHalf()+pl(220,125)+bl(236,132)+dr(242,132,282,150,3,2)+pl(290,128,COL.red)+`<path d="M280,112 l10,-10 l10,10" fill="none" stroke="#fff" stroke-width="2.4"/>`+pl(220,60,COL.obs)+pl(220,190,COL.obs); return {s,l:['blue:공격','red:수비','obs:기다림','ball','drib:드리블','basket']}; },
 nb_defend:o=>{ let s=pl(130,125)+bl(146,130)+pl(200,125,COL.red)+`<circle cx="130" cy="125" r="42" fill="none" stroke="${COL.mk}" stroke-width="2" stroke-dasharray="5 5"/>`+pl(310,70)+pl(310,180)+ps(148,118,298,76)+rn(200,125,250,98,-14); return {s,l:['blue:공격','red:수비','ball','pass','run:가로채기','mk:90cm']}; }
});
/* 범례 추가 항목 */
const _legendList=legendList;
legendList=function(ids,u){
  const extra={tee:[SV.tee(17,14),'티'],base:[SV.base(17,11),'베이스'],shuttle:[SV.shuttle(17,12),'셔틀콕'],net:[`<line x1="17" y1="2" x2="17" y2="20" stroke="#fff" stroke-width="4"/>`,'네트'],hurdle:[`<rect x="12" y="3" width="10" height="16" fill="#e0700f" stroke="#fff"/>`,'허들'],mat:[`<rect x="6" y="4" width="22" height="14" rx="3" fill="rgba(255,212,59,.7)" stroke="#fff"/>`,'매트·모래밭'],hoop:[SV.post(17,11),'골대'],basket:[SV.hoop(14,11,1),'골대']};
  const base=_legendList(ids.filter(id=>!extra[id.split(':')[0]]),u);
  const add=ids.filter(id=>extra[id.split(':')[0]]).map(id=>{const [k,lab]=id.split(':'); return `<li><svg viewBox="0 0 34 22" aria-hidden="true">${extra[k][0]}</svg>${lab||extra[k][1]}</li>`;}).join('');
  return base.replace('</ul>',add+'</ul>');
};


/* ===== 새 종목에도 쓰는 기본 대형 그림 (addUnit의 '그림'에 이름을 적거나, 형태에 따라 저절로 고름) =====
   gen_solo 혼자 · gen_pair 짝 · gen_group 모둠 원 · gen_relay 이어달리기 줄 · gen_net 네트 경기 · gen_goal 골 경기 · gen_zone 구역 지키기 */
Object.assign(TPL,{
 gen_solo:o=>{ const r=TPL.bb_solo(o); r.l=['me','ball','drib:도구 다루며 이동']; return r; },
 gen_pair:o=>{ const r=TPL.bb_pair(o); r.l=['blue','ball','pass:주고받기']; return r; },
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
