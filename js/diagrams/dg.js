/* [프로그램] 대형 그림 틀 · 피구
   이 종목 그림은 이 파일에만 있음. 다른 종목도 이 그림 이름을 빌려 쓸 수 있음
   그림 이름: dg_court · dg_circle · dg_four · dg_target · dg_pair · dg_shield · dg_power
   범례(그림 아래 설명)는 맨 아래 addLegend에 더함 */


/* ===== 피구(오늘 뭐하지?) 그림 =====
   dg_court 두 칸 피구(n 공 수 · big 짐볼 · disc 원반 · roll 굴리기 · out 외야 · back 복귀 · sizes 크기 다른 공 · score 점수)
   dg_circle 원형 피구(roll · aim 콘 맞히기 · pass 넘기기 · vip 왕 지키기 · big 짐볼) · dg_four 네 칸 피구(pass · roll · dodge)
   dg_target 짐볼 밀기(m:'aim' 콘 위 짐볼 맞히기) · dg_pair 짝 연습(m: roll · catch · disc · guard · tri) · dg_shield 보호막 피구 · dg_power 초능력 카드 피구 */
const GYM=(x,y,r=17)=>`<g><circle cx="${x}" cy="${y}" r="${r}" fill="#7fc4ff" stroke="${COL.ink}" stroke-width="2.4"/><ellipse cx="${x-r*.35}" cy="${y-r*.4}" rx="${r*.3}" ry="${r*.18}" fill="#fff" opacity=".7"/></g>`;
const SOFT=(x,y,r=6.5,c='#ff8fb8')=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" stroke="${COL.ink}" stroke-width="1.8"/>`;
const CARD=(x,y,t)=>`<g><rect x="${x-22}" y="${y-13}" width="44" height="26" rx="4" fill="#fff" stroke="${COL.mk}" stroke-width="2.5"/>${T(x,y+4,t,COL.ink,9)}</g>`;
const DGOUT=()=>`<rect x="18" y="18" width="364" height="214" rx="8" fill="rgba(255,255,255,.07)" stroke="#fff" stroke-opacity=".5" stroke-width="1.5" stroke-dasharray="5 5"/>`+T(200,32,'외야(둘레)','#fff',10);
const DGIN=()=>border(54,44,346,206)+`<line x1="200" y1="44" x2="200" y2="206" stroke="#fff" stroke-width="3"/>`;
const dgThrow=(x1,y1,x2,y2,roll)=>roll?`<path d="M${x1},${y1} L${x2},${y2}" stroke="#fff" stroke-width="2.6" stroke-dasharray="2 5" marker-end="url(#w§)"/>`:`<path d="M${x1},${y1} Q${(x1+x2)/2},${Math.min(y1,y2)-26} ${x2},${y2}" fill="none" stroke="#fff" stroke-width="2.6" stroke-dasharray="6 5" marker-end="url(#w§)"/>`;
const DGB=[[95,80],[130,155],[160,100],[90,185]], DGR=[[305,80],[270,155],[240,100],[310,185]];
Object.assign(TPL,{
 dg_court:o=>{ let s=(o.out?DGOUT():'')+DGIN(); DGB.forEach(([x,y])=>s+=pl(x,y)); DGR.forEach(([x,y])=>s+=pl(x,y,COL.red));
   const n=o.n||1, BP=[[262,120],[150,60],[290,190],[120,120],[250,60]];
   for(let k=0;k<Math.min(n,5);k++){ const [x,y]=BP[k]; s+=o.disc?DISC(x,y,6):o.sizes?(k===0?GYM(x,y,10):SOFT(x,y,k%2?5:7,k%2?'#ffd43b':'#ff8fb8')):SOFT(x,y); }
   if(o.big) s+=GYM(200,125,18);
   s+=dgThrow(258,116,146,104,o.roll);
   if(o.out){ s+=pl(372,130,COL.blue)+pl(28,90,COL.red); if(o.back) s+=rn(366,146,318,196,10); }
   if(o.score) s+=SCORE(200,228,'5','4');
   return {s,l:['blue:한 팀','red:다른 팀'].concat(o.disc?['x_disc:스펀지 원반']:o.sizes?['x_soft:크기가 다른 말랑한 공']:['x_soft:말랑한 공']).concat(o.big?['x_gym:짐볼']:[]).concat([o.roll?'pass:굴리기(무릎 아래)':'pass:어깨 아래로 던지기']).concat(o.out?['mk2:외야(맞으면 가서 계속 참여)']:[]).concat(o.back?['run:받거나 맞히면 우리 칸으로']:[])}; },
 dg_circle:o=>{ let s=`<circle cx="200" cy="125" r="88" fill="rgba(255,255,255,.06)" stroke="#fff" stroke-width="3"/>`; const out=[];
   for(let k=0;k<10;k++){ const a=k/10*Math.PI*2; out.push([200+Math.cos(a)*104,125+Math.sin(a)*100]); }
   out.forEach(([x,y])=>s+=pl(x,y,COL.red));
   if(o.aim){ s+=cn(200,125)+SOFT(126,150)+dgThrow(118,160,190,130,true); return {s,l:['red:원 둘레에 선 친구','x_soft:말랑한 공','cone:가운데 콘','pass:굴려 맞히기']}; }
   if(o.vip){ s+=YP(206,125)+pl(176,106)+pl(176,148)+`<path d="M164,94 l-6,-6 M164,160 l-6,6" stroke="#fff" stroke-width="2.4"/>`+SOFT(110,170)+dgThrow(112,164,164,150,o.roll);
     return {s,l:['mk3:왕','blue:수호대(맞아도 무효 · 막기만, 공격 못 함)','red:원 밖 팀','x_soft:말랑한 공','pass:'+(o.roll?'굴려 맞히기':'던지기')]}; }
   [[180,100],[225,90],[205,150],[160,140],[245,135]].forEach(([x,y])=>s+=pl(x,y));
   if(o.big) s+=GYM(150,195,15)+dgThrow(140,186,176,152,true); else s+=SOFT(290,90)+dgThrow(286,96,232,112,o.roll);
   if(o.pass) s+=`<path d="M300,170 Q330,125 300,80" fill="none" stroke="#fff" stroke-width="2.2" stroke-dasharray="5 4" marker-end="url(#w§)"/><path d="M290,62 Q240,22 190,30" fill="none" stroke="#fff" stroke-width="2.2" stroke-dasharray="5 4" marker-end="url(#w§)"/>`+rn(205,150,160,170,10);
   return {s,l:['red:원 밖 팀','blue:원 안 팀'].concat(o.big?['x_gym:짐볼']:['x_soft:말랑한 공']).concat([o.pass?'pass:빠르게 넘기기':o.roll||o.big?'pass:굴리기':'pass:어깨 아래로 던지기']).concat(o.pass?['run:공 반대쪽으로 피하기']:[])}; },
 dg_four:o=>{ let s=border(60,30,340,220)+ln(200,30,200,220)+ln(60,125,340,125); const C=[[130,78,COL.blue],[270,78,COL.red],[130,172,COL.mint],[270,172,COL.mk]];
   C.forEach(([x,y,c])=>{ s+=pl(x-22,y-12,c)+pl(x+22,y+10,c)+(o.pass?'':pl(x+18,y-22,c)); });
   if(o.pass){ s+=rn(150,72,250,72,-12)+rn(290,90,290,160,-12)+rn(250,178,150,178,-12)+rn(110,160,110,90,-12)+SOFT(170,64); return {s,l:['blue:한 칸에 한 명씩','x_soft:말랑한 공','run:시계 방향으로 넘기기']}; }
   if(o.dodge){ s+=YP(30,125)+SOFT(48,120)+dgThrow(52,120,110,92,true)+rn(108,66,150,100,-10); return {s,l:['blue:우리 칸','mk3:공 굴리는 선생님','x_soft:말랑한 공','run:공 반대쪽 빈 곳으로']}; }
   s+=SOFT(250,66)+SOFT(150,190)+dgThrow(248,72,146,96,o.roll)+dgThrow(160,184,252,170,o.roll)+`<path d="M126,82 C150,40 230,40 250,62" fill="none" stroke="${COL.mk}" stroke-width="2.4" stroke-dasharray="2 5" marker-end="url(#y§)"/>`;
   return {s,l:['blue:파랑 팀','red:빨강 팀','me:초록 팀','mk3:노랑 팀','x_soft:말랑한 공',o.roll?'pass:굴리기(무릎 아래)':'pass:아무 칸에나 던지기','run:맞으면 맞힌 팀 칸으로']}; },
 dg_target:o=>{ let s='';
   if(o.m==='aim'){ s+=`<line x1="80" y1="30" x2="80" y2="220" stroke="#fff" stroke-width="4"/>`+T(80,24,'던지는 선')+cn(300,140)+GYM(300,118,20); [70,125,180].forEach(y=>s+=pl(60,y,COL.mint)); s+=SOFT(78,118)+dgThrow(84,114,282,112,false)+pl(28,90,COL.obs)+pl(28,160,COL.obs);
     return {s,l:['me','obs:기다림','x_gym:콘 위 짐볼','x_soft:말랑한 공','pass:던져 맞히기']}; }
   s+=`<line x1="30" y1="30" x2="30" y2="220" stroke="${COL.mk}" stroke-width="4"/><line x1="370" y1="30" x2="370" y2="220" stroke="${COL.mk}" stroke-width="4"/><line x1="200" y1="30" x2="200" y2="220" stroke="#fff" stroke-width="2" stroke-dasharray="6 5"/><line x1="130" y1="30" x2="130" y2="220" stroke="#fff" stroke-opacity=".6" stroke-width="2"/><line x1="270" y1="30" x2="270" y2="220" stroke="#fff" stroke-opacity=".6" stroke-width="2"/>`+T(130,24,'던지는 선')+T(270,24,'던지는 선');
   s+=GYM(212,125,22)+`<path d="M238,125 H268" stroke="${COL.mk}" stroke-width="4" marker-end="url(#y§)"/>`;
   [[90,70],[100,125],[90,180]].forEach(([x,y])=>s+=pl(x,y)+SOFT(x+14,y-10)); [[310,70],[300,125],[310,180]].forEach(([x,y])=>s+=pl(x,y,COL.red));
   s+=dgThrow(108,64,192,112,false)+dgThrow(114,122,190,128,false)+T(36,236,'끝 선',COL.mk,10)+T(364,236,'끝 선',COL.mk,10);
   return {s,l:['blue:한 팀','red:다른 팀','x_gym:짐볼','x_soft:말랑한 공','pass:짐볼을 맞혀 밀기','run:상대 끝 선을 넘기면 1점']}; },
 dg_pair:o=>{ let s=''; const m=o.m||'catch';
   if(m==='tri'){ [[110,125],[290,125]].forEach(([cx,cy])=>{ const P=[[cx,cy-60],[cx-55,cy+40],[cx+55,cy+40]]; P.forEach(([x,y])=>s+=pl(x,y,COL.mint)); s+=SOFT(P[0][0]+14,P[0][1]+6)+ps(P[0][0],P[0][1],P[2][0],P[2][1])+ps(P[2][0],P[2][1],P[1][0],P[1][1])+ps(P[1][0],P[1][1],P[0][0],P[0][1]); });
     return {s,l:['me','x_soft:말랑한 공','pass:받으면 3초 안에 넘기기']}; }
   [60,125,190].forEach((y,k)=>{ s+=pl(80,y,COL.blue)+pl(320,y,COL.mint);
     if(m==='roll') s+=cn(200,y)+SOFT(98,y+6)+dgThrow(104,y+6,190,y+6,true);
     else if(m==='disc') s+=DISC(104,y-6,6)+`<path d="M110,${y-10} Q210,${y-30} 304,${y-6}" fill="none" stroke="#fff" stroke-width="2.4" stroke-dasharray="6 5" marker-end="url(#w§)"/>`+(k===1?rn(320,y,320,y+30,10):'');
     else if(m==='guard') s=s.replace(pl(320,y,COL.mint),'')+YP(330,y)+pl(250,y,COL.mint)+SOFT(110,y+6)+dgThrow(116,y+6,232,y+6,true)+rn(250,y-16,250,y-38,10).replace(/stroke-width="[\d.]+"/,'stroke-width="2.4"');
     else if(m==='gym') s+=GYM(110,y,12)+dgThrow(124,y,296,y,true);
     else s+=(o.sizes?(k===0?GYM(104,y-8,10):SOFT(104,y-6,k===1?7:5,k===1?'#ff8fb8':'#ffd43b')):SOFT(104,y-6))+`<path d="M110,${y-10} Q210,${y-36} 304,${y-8}" fill="none" stroke="#fff" stroke-width="2.4" stroke-dasharray="6 5" marker-start="url(#w§)" marker-end="url(#w§)"/>`; });
   const L={roll:['blue:굴리는 사람','me:짝','x_soft:말랑한 공','cone:가운데 콘','pass:굴려 맞히기'],disc:['blue:던지는 사람','me:받거나 피하는 사람','x_disc:스펀지 원반','pass:손등 쪽으로 낮게 던지기'],guard:['blue:굴리는 사람','me:수호대(손으로 막기)','mk3:왕','x_soft:말랑한 공','pass:왕 쪽으로 굴리기','run:옆걸음으로 막아 서기'],gym:['blue','me:짝','x_gym:짐볼','pass:두 손으로 굴리기'],catch:['blue','me:짝',o.sizes?'x_soft:큰 공 · 중간 공 · 작은 공':'x_soft:말랑한 공','pass2:가슴 쪽으로 주고받기']};
   return {s,l:L[m]||L.catch}; },
 dg_shield:o=>{ let s=DGIN(); s+=YP(110,125)+pl(150,100,COL.mint)+pl(150,150,COL.mint)+pl(90,70)+pl(90,185);
   DGR.forEach(([x,y])=>s+=pl(x,y,COL.red)); s+=SOFT(262,120)+dgThrow(258,116,166,100,false)+`<path d="M168,90 l10,10 m0,-10 l-10,10" stroke="#fff" stroke-width="3"/>`;
   return {s,l:['mk3:왕','me:수호대(맞아도 무효 · 막기만, 공격 못 함)','blue:팀원','red:다른 팀','x_soft:말랑한 공','pass:던지기']}; },
 dg_power:o=>{ let s=DGOUT()+DGIN(); DGB.forEach(([x,y])=>s+=pl(x,y)); DGR.forEach(([x,y])=>s+=pl(x,y,COL.red));
   s+=`<circle cx="130" cy="155" r="22" fill="rgba(255,212,59,.25)" stroke="${COL.mk}" stroke-width="3" stroke-dasharray="4 3"/>`+SOFT(262,120)+dgThrow(258,116,150,150,false);
   s+=CARD(120,224,'보호막')+(o.one?'':CARD(176,224,'부활')+CARD(280,224,'쌍둥이 공')+CARD(336,224,'얼음'));
   if(!o.one) s+=GYM(200,125,14);
   return {s,l:['blue:한 팀','red:다른 팀','aura:보호막(10초 맞아도 무효)','card:초능력 카드','x_soft:말랑한 공'].concat(o.one?[]:['x_gym:거인 공(짐볼)']).concat(['pass:어깨 아래로 던지기'])}; }
});
XB.soft=(x,y,r=6)=>SOFT(x,y,r);
XBN.soft='말랑한 공';
XB.gym=(x,y,r=6)=>GYM(x,y,r*1.6);
XBN.gym='짐볼';
XB.disc=(x,y,r=6)=>DISC(x,y,r);
XBN.disc='스펀지 원반';

/* 범례 */
addLegend(()=>{
  const ex={
    x_soft:[SOFT(17,11,6),'말랑한 공'],
    x_gym:[GYM(17,11,9),'짐볼'],
    x_disc:[DISC(17,11,5.5),'스펀지 원반'],
    card:[`<rect x="7" y="4" width="20" height="14" rx="3" fill="#fff" stroke="#ffd43b" stroke-width="2"/>`,'초능력 카드'],
    aura:[`<circle cx="17" cy="11" r="8" fill="rgba(255,212,59,.3)" stroke="#ffd43b" stroke-width="2" stroke-dasharray="3 2"/>`,'보호막']
  };
  return ex; });
