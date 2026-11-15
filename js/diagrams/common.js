/* [프로그램] 대형 그림 틀 · 함께 쓰는 부품 · 공 바꾸기(tplOf) · 새 종목 기본 그림(gen_*) · 함께 쓰는 장면
   모든 종목 그림 파일보다 먼저 불러옴. 여러 종목이 함께 쓰는 그림 부품과 그림 틀은 여기에 둠
   그림 이름: gen_solo · gen_pair · gen_group · gen_relay · gen_net · gen_goal · gen_zone · gen_spread · gen_talk · gen_watch · gen_courts · gen_ref · gen_line · gen_home · gen_shadow
   범례(그림 아래 설명)는 맨 아래 addLegend에 더함 */


/* 여러 종목이 함께 쓰는 그림 부품: 티 · 베이스 · 셔틀콕 · 라켓 · 골대 등 */
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
function nbCourt(){ return border(30,35,370,215)+ln(143,35,143,215)+ln(257,35,257,215)+`<path d="M30,80 A45,45 0 0,1 30,170" fill="none" stroke="#fff" stroke-width="2.5"/><path d="M370,80 A45,45 0 0,0 370,170" fill="none" stroke="#fff" stroke-width="2.5"/><circle cx="200" cy="125" r="10" fill="none" stroke="#fff" stroke-width="2"/>`+SV.post(40,125)+SV.post(360,125); }
function bbCourt(){ return border(30,35,370,215)+ln(200,35,200,215)+`<circle cx="200" cy="125" r="22" fill="none" stroke="#fff" stroke-width="2.5"/><rect x="30" y="98" width="62" height="54" fill="rgba(224,112,15,.28)" stroke="#fff" stroke-width="2.5"/><rect x="308" y="98" width="62" height="54" fill="rgba(224,112,15,.28)" stroke="#fff" stroke-width="2.5"/><path d="M30,50 Q150,125 30,200" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="2"/><path d="M370,50 Q250,125 370,200" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="2"/>`+SV.hoop(46,125,-1)+SV.hoop(354,125,1); }
const arc=(x1,y1,x2,y2,h=40)=>`<path d="M${x1},${y1} Q${(x1+x2)/2},${Math.min(y1,y2)-h} ${x2},${y2}" fill="none" stroke="#fff" stroke-width="2.6" stroke-dasharray="6 5" marker-end="url(#w§)"/>`;
const arc2=(x1,y1,x2,y2,h=40)=>arc(x1,y1,x2,y2,h).replace('marker-end=','marker-start="url(#w§)" marker-end=');
Object.assign(TPL,{
/* ===== 새 종목에도 쓰는 기본 대형 그림 (addUnit의 '그림'에 이름을 적거나, 형태에 따라 저절로 고름) =====
   gen_solo 혼자 · gen_pair 짝 · gen_group 모둠 원 · gen_relay 이어달리기 줄 · gen_net 네트 경기 · gen_goal 골 경기 · gen_zone 구역 지키기 */
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

/* 원반 · 플로어볼 공 그림 부품. 그림 이름에 disc: true 는 원반, fball: true 는 구멍 난 플로어볼 공으로 바꿔 그림 */
const DISC=(x,y,r=6)=>`<g><ellipse cx="${x}" cy="${y}" rx="${(r*1.75).toFixed(1)}" ry="${(r*.85).toFixed(1)}" fill="#ffe14d" stroke="${COL.ink}" stroke-width="2"/><ellipse cx="${x}" cy="${y-.6}" rx="${(r*1.05).toFixed(1)}" ry="${(r*.45).toFixed(1)}" fill="none" stroke="${COL.ink}" stroke-width="1" opacity=".55"/></g>`;
const FBALL=(x,y,r=6)=>`<g><circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="${COL.ink}" stroke-width="2"/>${[[-.4,-.35],[.4,-.35],[0,.42],[-.45,.3],[.45,.3]].map(([a,b])=>`<circle cx="${(x+a*r).toFixed(1)}" cy="${(y+b*r).toFixed(1)}" r="${(r*.16).toFixed(1)}" fill="${COL.ink}"/>`).join('')}</g>`;
const BALLRE=/<circle cx="([\d.]+)" cy="([\d.]+)" r="([\d.]+)" fill="#fff" stroke="#1c2a21" stroke-width="2"\/><polygon points="[^"]*" fill="#1c2a21"\/>/g;
Object.assign(TPL,{
 /* 모두 함께 쓰는 '흩어져 서기'(도구를 들고 제자리 연습) */
 gen_spread:o=>{ let s=mkBox(); [[100,90],[200,90],[300,90],[100,170],[200,170],[300,170]].forEach(([x,y])=>s+=pl(x,y,COL.mint)+bl(x+16,y-12)); return {s,l:['me','ball']}; }
});

/* 그림 그리기: 원반·플로어볼 공으로 바꿔 그림 */
function tplOf(d){
  const r=TPL[d.t](d);
  if(d.disc){ r.s=r.s.replace(BALLRE,(m,x,y,rr)=>DISC(+x,+y,+rr)); r.l=r.l.map(id=>id==='ball'?'disc':id.startsWith('ball:')?'disc'+id.slice(4):/^pass:(차기|슛|패스하고 따라가기)$/.test(id)?'pass:던지기':id==='pass'?'pass:던지기':id); }
  else if(d.pball){ r.s=r.s.replace(BALLRE,(m,x,y,rr)=>PBALL(+x,+y,+rr)); r.l=r.l.map(id=>id==='ball'?'pball':id.startsWith('ball:')?'pball'+id.slice(4):id); }
  else if(d.fball){ r.s=r.s.replace(BALLRE,(m,x,y,rr)=>FBALL(+x,+y,+rr)); r.l=r.l.map(id=>id==='ball'?'fball':id.startsWith('ball:')?'fball'+id.slice(4):id); }
  return r;
}

/* 피클볼 공 · 패들 부품(여러 종목 그림에서 함께 씀) */
const PBALL=(x,y,r=6)=>`<g><circle cx="${x}" cy="${y}" r="${r}" fill="#d8f25a" stroke="${COL.ink}" stroke-width="2"/>${[[-.4,-.35],[.4,-.35],[0,.42],[-.45,.3],[.45,.3]].map(([a,b])=>`<circle cx="${(x+a*r).toFixed(1)}" cy="${(y+b*r).toFixed(1)}" r="${(r*.15).toFixed(1)}" fill="${COL.ink}"/>`).join('')}</g>`;

/* ===== 종목 공 바꾸기 · 장면 더하기 (티볼·배드민턴·배구·육상·넷볼·농구) =====
   그림 이름에 ball:'shuttle'|'vball'|'bball'|'nball'|'sball'|'bag' 를 붙이면 축구공 대신 그 종목 공으로 그림
   racket:true 패들 → 라켓 · nopad:true 패들 지우기 · nokit:true 키친 지우기 · lab:{run:'새 이름'} 범례 이름 바꾸기('' 이면 빼기) */
const XB={
  shuttle:(x,y)=>SV.shuttle(x,y),
  vball:(x,y,r=6)=>`<g><circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="${COL.ink}" stroke-width="2"/><path d="M${x-r*.9},${y-r*.3} Q${x},${y-r*.2} ${x+r*.35},${y-r*.95}" fill="none" stroke="${COL.blue}" stroke-width="1.6"/><path d="M${x-r*.5},${y+r*.85} Q${x+r*.1},${y+r*.1} ${x+r*.95},${y+r*.2}" fill="none" stroke="#e8b40f" stroke-width="1.6"/></g>`,
  bball:(x,y,r=6)=>`<g><circle cx="${x}" cy="${y}" r="${r}" fill="#e8721c" stroke="${COL.ink}" stroke-width="2"/><path d="M${x-r},${y} H${x+r} M${x},${y-r} V${y+r}" stroke="${COL.ink}" stroke-width="1.1"/><path d="M${x-r*.7},${y-r*.7} Q${x-r*.25},${y} ${x-r*.7},${y+r*.7} M${x+r*.7},${y-r*.7} Q${x+r*.25},${y} ${x+r*.7},${y+r*.7}" fill="none" stroke="${COL.ink}" stroke-width="1.1"/></g>`,
  nball:(x,y,r=6)=>`<g><circle cx="${x}" cy="${y}" r="${r}" fill="#fff4dc" stroke="${COL.ink}" stroke-width="2"/><path d="M${x-r*.95},${y+r*.1} Q${x},${y-r*.55} ${x+r*.95},${y+r*.1} M${x},${y-r} Q${x+r*.45},${y} ${x},${y+r}" fill="none" stroke="${COL.ink}" stroke-width="1" opacity=".7"/></g>`,
  sball:(x,y,r=6)=>`<g><circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="${COL.ink}" stroke-width="2"/><path d="M${x-r*.55},${y-r*.75} Q${x-r*.05},${y} ${x-r*.55},${y+r*.75} M${x+r*.55},${y-r*.75} Q${x+r*.05},${y} ${x+r*.55},${y+r*.75}" fill="none" stroke="${COL.red}" stroke-width="1.3" stroke-dasharray="1.6 1.2"/></g>`,
  bag:(x,y,r=6)=>`<rect x="${x-r}" y="${y-r*.8}" width="${r*2}" height="${r*1.6}" rx="${r*.45}" fill="#e05a9c" stroke="${COL.ink}" stroke-width="1.8"/>`
};
const XBN={shuttle:'셔틀콕',vball:'배구공',bball:'농구공',nball:'공',sball:'공',bag:'콩주머니'};
const PADRE=/<g transform="translate\(([-\d.]+),([-\d.]+)\) rotate\(([-\d.]+)\)"><rect x="-6" y="-17" width="12" height="15" rx="5"[^>]*\/><line[^>]*\/><\/g>/g;
const RKT=(x,y,rot=30)=>`<g transform="translate(${x},${y}) rotate(${rot})"><ellipse cx="0" cy="-12" rx="6" ry="8" fill="rgba(255,255,255,.18)" stroke="#fff" stroke-width="2"/><line x1="0" y1="-4" x2="0" y2="8" stroke="#fff" stroke-width="2.8" stroke-linecap="round"/></g>`;
const KITRE=/<rect x="150" y="35" width="100" height="180" fill="rgba\(255,212,59,.3\)"\/>|<text x="(?:175|225)" y="52"[^>]*>키친<\/text>/g;
const _tplOf0=tplOf;
tplOf=function(d){
  const r=_tplOf0(d), k=d.ball;
  if(k&&XB[k]){
    r.s=r.s.replace(BALLRE,(m,x,y,rr)=>XB[k](+x,+y,+rr));
    r.l=r.l.map(id=>{ const [a,b]=id.split(':');
      if(a==='ball') return k==='shuttle'?'shuttle'+(b?':'+b:''):'x_'+k+(b?':'+b:'');
      if(a==='drib'&&(!b||b==='공 몰기')) return 'drib:'+(k==='bball'||k==='nball'?'드리블':'공 몰고 가기');
      if(a==='tap') return 'tap:'+(b&&!/발/.test(b)?b:'손으로 톡톡');
      if(id==='pass:차기') return 'pass:던지기';
      if(a==='gk') return null;
      return id; }).filter(Boolean);
  }
  if(d.racket){ r.s=r.s.replace(PADRE,(m,x,y,rot)=>RKT(+x,+y,+rot)); r.l=r.l.map(id=>id==='paddle'?'racket':id); }
  if(d.nopad){ r.s=r.s.replace(PADRE,''); r.l=r.l.filter(id=>id!=='paddle'); }
  if(d.nokit){ r.s=r.s.replace(KITRE,''); r.l=r.l.filter(id=>id!=='kitchen'); }
  if(d.lab){ r.l=r.l.map(id=>{ const a=id.split(':')[0], v=d.lab[a]; return v===undefined?id:v===''?null:a+':'+v; }).filter(Boolean);
    Object.keys(d.lab).forEach(a=>{ if(d.lab[a]&&!r.l.some(id=>id.split(':')[0]===a)) r.l.push(a+':'+d.lab[a]); }); }
  return r;
};

/* 장면에 쓰는 작은 그림 */
const BOARD=(x,y,w=70,h=48)=>`<g><rect x="${x-w/2}" y="${y-h/2}" width="${w}" height="${h}" rx="5" fill="#fff" stroke="${COL.ink}" stroke-width="2"/><rect x="${x-w/2+8}" y="${y-h/2+8}" width="${w-16}" height="${h-16}" fill="none" stroke="#7aa88f" stroke-width="1.6"/><line x1="${x}" y1="${y-h/2+8}" x2="${x}" y2="${y+h/2-8}" stroke="#7aa88f" stroke-width="1.6"/><circle cx="${x-12}" cy="${y-4}" r="3" fill="${COL.blue}"/><circle cx="${x-16}" cy="${y+8}" r="3" fill="${COL.blue}"/><circle cx="${x+12}" cy="${y}" r="3" fill="${COL.red}"/><path d="M${x-10},${y-4} q12,-10 20,2" fill="none" stroke="${COL.ink}" stroke-width="1.3" stroke-dasharray="2 2"/></g>`;
const CLIP=(x,y)=>`<rect x="${x-7}" y="${y-9}" width="14" height="18" rx="2" fill="#fff" stroke="${COL.ink}" stroke-width="1.5"/><line x1="${x-4}" y1="${y-3}" x2="${x+4}" y2="${y-3}" stroke="${COL.ink}" stroke-width="1"/><line x1="${x-4}" y1="${y+1}" x2="${x+4}" y2="${y+1}" stroke="${COL.ink}" stroke-width="1"/>`;
const SCORE=(x,y,a='3',b='2')=>`<g><rect x="${x-22}" y="${y-14}" width="44" height="28" rx="4" fill="${COL.ink}" stroke="#fff" stroke-width="2"/><text x="${x-10}" y="${y+6}" text-anchor="middle" fill="#7fc4ff" font-size="15" font-weight="900" font-family="Gothic A1,sans-serif">${a}</text><text x="${x+10}" y="${y+6}" text-anchor="middle" fill="#ff8f86" font-size="15" font-weight="900" font-family="Gothic A1,sans-serif">${b}</text></g>`;
const NETV=(x,y1=35,y2=215)=>`<line x1="${x}" y1="${y1-7}" x2="${x}" y2="${y2+7}" stroke="#fff" stroke-width="5"/><circle cx="${x}" cy="${y1-7}" r="4.5" fill="#fff" stroke="${COL.ink}"/><circle cx="${x}" cy="${y2+7}" r="4.5" fill="#fff" stroke="${COL.ink}"/>`;
const T=(x,y,t,c='#fff',fs=12)=>`<text x="${x}" y="${y}" text-anchor="middle" fill="${c}" font-size="${fs}" font-weight="800" font-family="Gothic A1,sans-serif">${t}</text>`;
const YP=(x,y)=>pl(x,y,COL.mk);
const HOOPG=(x,y,r=18,n)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="rgba(255,255,255,.1)" stroke="${COL.mk}" stroke-width="3.5"/>`+(n!==undefined?T(x,y+5,n,'#fff',13):'');
Object.assign(TPL,{
 /* 작전판 앞 모둠 회의 · 반 전체 둥글게 · 짝 기록 */
 gen_talk:o=>{ let s='';
   if(o.m==='class'){ s+=`<circle cx="200" cy="125" r="88" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="2" stroke-dasharray="4 6"/>`+BOARD(200,125,74,50);
     for(let k=0;k<12;k++){ const a=k/12*Math.PI*2; s+=pl(200+Math.cos(a)*92,125+Math.sin(a)*84,k%2?COL.blue:COL.red); }
     return {s,l:['blue','red:다른 팀','board:우리 반 규칙판']}; }
   if(o.m==='pair'){ [[80,80],[200,80],[320,80],[80,180],[200,180],[320,180]].forEach(([x,y])=>s+=pl(x-26,y,COL.mint)+pl(x+26,y,COL.blue)+CLIP(x,y));
     return {s,l:['me','blue:짝','clip:기록지']}; }
   [[110,125,COL.blue],[290,125,COL.red]].forEach(([cx,cy,c])=>{ s+=BOARD(cx,cy,60,42); for(let k=0;k<5;k++){ const a=-Math.PI/2+k/5*Math.PI*2+.3; s+=pl(cx+Math.cos(a)*62,cy+Math.sin(a)*62,c); } });
   return {s,l:['blue:우리 모둠','red:다른 모둠','board:작전판']}; },
 /* 하는 사람 · 봐 주는 사람 */
 gen_watch:o=>{ let s='';
   [[90,70],[90,180],[250,70],[250,180]].forEach(([x,y])=>{ s+=pl(x,y,COL.mint)+(o.noball?'':bl(x+16,y-14))+`<path d="M${x+6},${y-24} q14,-14 26,0" fill="none" stroke="${COL.mk}" stroke-width="2.5" marker-end="url(#y§)"/>`+pl(x+80,y,COL.obs)+CLIP(x+100,y)+`<line x1="${x+66}" y1="${y}" x2="${x+20}" y2="${y}" stroke="#fff" stroke-width="1.6" stroke-dasharray="2 4"/>`; });
   return {s,l:['me:하는 사람','obs:봐 주는 친구','clip:관찰 기록지'].concat(o.noball?[]:['ball']).concat(['run:동작'])}; },
 /* 코트 여러 개에서 리그 · 순위전 */
 gen_courts:o=>{ let s=''; const X=[22,147,272];
   X.forEach((x,k)=>{ s+=border(x,50,x+106,200)+(o.kind==='goal'?ln(x,125,x+106,125)+`<circle cx="${x+53}" cy="58" r="7" fill="none" stroke="${COL.cone}" stroke-width="3"/><circle cx="${x+53}" cy="192" r="7" fill="none" stroke="${COL.cone}" stroke-width="3"/>`:o.kind==='field'?`<path d="M${x+53},192 L${x+90},150 L${x+53},108 L${x+16},150 Z" fill="none" stroke="#fff" stroke-width="2"/>`:`<line x1="${x-4}" y1="125" x2="${x+110}" y2="125" stroke="#fff" stroke-width="4"/>`)+T(x+53,42,(k+1)+'코트');
     s+=pl(x+32,88)+pl(x+76,88)+pl(x+32,165,COL.red)+pl(x+76,165,COL.red)+(k===1?bl(x+52,104):''); });
   s+=rn(110,214,170,214,-10)+rn(235,214,295,214,-10)+pl(200,232,COL.obs)+YP(30,232)+SCORE(372,232,'2','1').replace(/<g>/,'<g transform="scale(.8) translate(93,58)">');
   return {s,l:['blue:한 팀','red:상대 팀','obs:다음 팀·기록','mk3:심판','run:다음 경기 코트로']}; },
 /* 심판 · 기록 맡기 */
 gen_ref:o=>{ let s=o.c==='bb'?bbCourt():o.c==='nb'?nbCourt():o.c==='tb'?diamond():court();
   if(o.c==='tb'){ s+=pl(176,214,COL.blue)+pl(300,118,COL.red)+pl(200,72,COL.red)+pl(118,150,COL.red)+YP(240,222)+sw(258,224)+pl(40,232,COL.obs)+CLIP(62,232)+SCORE(352,232); return {s,l:['blue:공격','red:수비','mk3:심판(판정 동작)','obs:기록','clip:기록지','base']}; }
   s+=pl(110,90)+pl(150,165)+pl(260,90,COL.red)+pl(300,160,COL.red)+bl(124,96)+YP(200,236)+sw(218,238)+pl(60,236,COL.obs)+CLIP(82,236)+SCORE(340,236);
   return {s,l:['blue','red:상대','ball','mk3:심판(손짓으로 알리기)','obs:기록·점수판','clip:기록지'].concat(o.c?[]:['net'])}; },
 /* 줄 서서 머리 위·다리 사이로 넘기기 */
 gen_line:o=>{ let s='';
   [[80,COL.blue],[170,COL.red]].forEach(([y,c])=>{ [300,250,200,150,100].forEach(x=>s+=pl(x,y,c)); s+=bl(285,y-16)+arc(282,y-18,214,y-18,20)+arc(232,y+20,164,y+20,-14).replace(/Q([\d.]+),([\d.]+)/,(m,a,b)=>'Q'+a+','+(+b+30))+rn(100,y+22,312,y+26,-12); });
   return {s,l:['blue:우리 팀','red:다른 팀','ball','pass:머리 위 · 다리 사이로 넘기기','run:맨 뒤 사람이 앞으로']}; },
 /* 가운데 자리에서 네 구석 다녀오기 */
 gen_home:o=>{ let s=border(60,30,340,220)+(o.net?NETV(200,30,220).replace(/x1="200"/g,'x1="200"'):'')+mk(200,125); const C=[[95,62],[305,62],[95,188],[305,188]];
   C.forEach(([x,y])=>s+=cn(x,y)); s+=pl(200,125,COL.mint)+rn(206,112,292,70,-14)+rn(296,82,214,124,-14)+rn(188,136,104,180,-14).replace(/stroke-width="[\d.]+"/,'stroke-width="2.4" stroke-dasharray="5 4"');
   if(o.shuttle) C.forEach(([x,y])=>s+=SV.shuttle(x+18,y-2));
   s+=pl(30,90,COL.obs)+pl(30,160,COL.obs);
   return {s,l:['me','obs:기다림','mk:가운데 자리','cone','run:다녀와서 가운데로']}; },
 /* 줄지어 서서 동작 따라 하기(매단 공 · 거울) */
 gen_shadow:o=>{ let s=YP(200,40)+T(200,22,'시범'); const X=[70,150,250,330];
   if(o.net) s+=`<line x1="20" y1="72" x2="380" y2="72" stroke="#fff" stroke-width="4"/>`;
   X.forEach(x=>{ s+=pl(x,165,COL.mint)+`<path d="M${x-22},${o.low?190:150} Q${x-6},${o.low?150:108} ${x+20},${o.low?128:126}" fill="none" stroke="${COL.mk}" stroke-width="3" marker-end="url(#y§)"/>`;
     if(o.hang) s+=`<line x1="${x+8}" y1="80" x2="${x+8}" y2="112" stroke="#fff" stroke-width="1.5"/>`+bl(x+8,118);
     if(o.mark) s+=mk(x-10,198)+mk(x+12,192); });
   return {s,l:['mk3:보여 주는 사람(선생님)','me','run:동작 따라 하기'].concat(o.hang?['ball:매달린 공']:[]).concat(o.mark?['mk:발 놓는 자리']:[]).concat(o.net?['net']:[])}; }
});

/* 범례 */
addLegend(()=>{
  const ex={
    net:[`<line x1="17" y1="2" x2="17" y2="20" stroke="#fff" stroke-width="4"/>`,'네트'],
    disc:[DISC(17,11,5),'원반'],
    ring:[`<circle cx="17" cy="11" r="8" fill="none" stroke="#ffd43b" stroke-width="3"/>`,'훌라후프(표적)'],
    ezone:[`<rect x="5" y="3" width="24" height="16" fill="rgba(255,212,59,.45)" stroke="#fff" stroke-dasharray="3 2"/>`,'득점 구역'],
    mk2:[`<line x1="4" y1="11" x2="30" y2="11" stroke="#fff" stroke-width="2" stroke-dasharray="3 4"/>`,'선'],
    mk3:[`<circle cx="17" cy="11" r="7" fill="#ffd43b" stroke="#fff" stroke-width="2"/>`,'보여 주는 사람'],
    board:[`<rect x="7" y="4" width="20" height="14" rx="2" fill="#fff" stroke="#1c2a21"/>`,'작전판'],
    clip:[CLIP(17,11),'기록지']
  };
  Object.keys(XB).forEach(k=>{ if(k!=='shuttle') ex['x_'+k]=[XB[k](17,11,5.5),XBN[k]]; });
  return ex; });
