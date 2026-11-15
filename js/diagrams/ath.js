/* [프로그램] 대형 그림 틀 · 육상
   이 종목 그림은 이 파일에만 있음. 다른 종목도 이 그림 이름을 빌려 쓸 수 있음
   그림 이름: at_run · at_relay · at_hurdle · at_jump · at_throw · at_agility · at_start · at_shuttle · at_oval · at_ladder · at_bounce · at_sjump · at_throw2 · at_balance · at_hurdle2 · at_relay2 · at_course
   범례(그림 아래 설명)는 맨 아래 addLegend에 더함 */

function lanes(n=4){ let s=''; const top=38, h=(212-38)/n; for(let k=0;k<=n;k++) s+=ln(30,top+k*h,370,top+k*h); s+=`<line x1="60" y1="${top}" x2="60" y2="212" stroke="#fff" stroke-width="4"/><line x1="350" y1="${top}" x2="350" y2="212" stroke="${COL.mk}" stroke-width="4" stroke-dasharray="8 6"/>`; return {s,top,h}; }
Object.assign(TPL,{
 at_run:o=>{ const L=lanes(4); let s=L.s; for(let k=0;k<4;k++){ const y=L.top+L.h*(k+.5); s+=pl(76,y,COL.mint)+rn(92,y,336,y,0); } return {s,l:['me','run:달리기']}; },
 at_relay:o=>{ const L=lanes(4); let s=L.s+zn(190,38,50,174,'rgba(255,212,59,.3)'); for(let k=0;k<4;k++){ const y=L.top+L.h*(k+.5); s+=pl(120,y,COL.blue)+SV.baton(134,y)+rn(140,y,196,y,0)+pl(232,y,COL.mint); } return {s,l:['blue:주는 사람','me:받는 사람','run','mk:인계 구역']}; },
 at_hurdle:o=>{ const L=lanes(3); let s=L.s; for(let k=0;k<3;k++){ const y=L.top+L.h*(k+.5); [150,230,310].forEach(x=>s+=SV.hurdle(x,y)); s+=pl(80,y,COL.mint)+`<path d="M96,${y} Q123,${y-30} 150,${y-6} T230,${y-6} T310,${y-6}" fill="none" stroke="${COL.mk}" stroke-width="3.5" marker-end="url(#y§)"/>`; } return {s,l:['me','run:넘어가기','hurdle']}; },
 at_jump:o=>{ let s=ln(30,105,250,105)+ln(30,145,250,145)+`<rect x="262" y="70" width="100" height="110" rx="6" fill="rgba(255,212,59,.45)" stroke="#fff" stroke-width="2.5"/><line x1="250" y1="98" x2="250" y2="152" stroke="#fff" stroke-width="5"/>`+pl(70,125,COL.mint)+rn(86,125,246,125,0)+`<path d="M250,120 Q290,60 320,118" fill="none" stroke="${COL.mk}" stroke-width="3.5" stroke-dasharray="6 4" marker-end="url(#y§)"/>`+pl(50,200,COL.obs)+pl(80,200,COL.obs); return {s,l:['me','obs:기다림','run:도움닫기·뛰기','mat']}; },
 at_throw:o=>{ let s=`<line x1="80" y1="25" x2="80" y2="225" stroke="#fff" stroke-width="5"/>`; [110,180,250].forEach(r=>s+=`<path d="M80,${125-r*.85} A${r},${r*.85} 0 0,1 80,${125+r*.85}" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="2" stroke-dasharray="5 6" transform="translate(0,0)"/>`);
   [70,125,180].forEach(y=>s+=pl(64,y,COL.mint)); s+=bl(82,118)+arc(86,118,280,118,60)+pl(30,70,COL.obs)+pl(30,180,COL.obs); return {s,l:['me','obs:안전선 뒤 기다림','ball','pass:던지기']}; },
 at_agility:o=>{ let s=`<rect x="90" y="100" width="150" height="50" fill="none" stroke="#fff" stroke-width="2.5"/>`; for(let x=115;x<240;x+=25) s+=`<line x1="${x}" y1="100" x2="${x}" y2="150" stroke="#fff" stroke-width="2.5"/>`; [[270,95],[300,155],[330,95],[360,155]].forEach(([x,y])=>s+=cn(x,y)); s+=pl(55,125,COL.mint)+`<path d="M72,125 H240 C255,125 260,90 270,110 S290,170 300,150 S320,80 330,110 S355,160 360,140" fill="none" stroke="${COL.mk}" stroke-width="3.5" marker-end="url(#y§)"/>`; return {s,l:['me','run:빠르게 바꾸기','cone']}; }
});
const WEDGE=(x,y)=>`<rect x="${x-4}" y="${y-16}" width="8" height="32" rx="3" fill="#ffd43b" stroke="#fff" stroke-width="1.5"/>`;
Object.assign(TPL,{
 /* 육상: 출발 */
 at_start:o=>{ const L=lanes(4); let s=L.s+`<line x1="80" y1="${L.top}" x2="80" y2="212" stroke="#fff" stroke-width="5"/>`+T(80,30,'출발선');
   for(let k=0;k<4;k++){ const y=L.top+L.h*(k+.5); s+=pl(70,y,COL.mint)+rn(88,y,o.react?150:200,y,0); if(o.react&&k%2) s+=cn(160,y); }
   s+=YP(30,232)+(o.react?T(78,240,'"땅!" 손뼉 · 깃발','#fff',11):'')+(o.roll?mk(46,L.top+L.h*.5):'');
   return {s,l:['me','mk3:신호 주는 사람','run:출발해 달리기'].concat(o.react?['cone:멈추는 자리']:[])}; },
 /* 왕복 달리기 */
 at_shuttle:o=>{ let s=`<line x1="80" y1="30" x2="80" y2="220" stroke="#fff" stroke-width="4"/><line x1="320" y1="30" x2="320" y2="220" stroke="${COL.mk}" stroke-width="4" stroke-dasharray="8 6"/>`+T(80,24,'출발')+T(320,24,o.m||'10m 반환선');
   [70,125,180].forEach(y=>{ s+=pl(58,y,COL.mint)+mk(320,y)+`<path d="M74,${y-6} H312 Q330,${y} 312,${y+6} H90" fill="none" stroke="${COL.mk}" stroke-width="3" marker-end="url(#y§)"/>`; });
   s+=pl(26,90,COL.obs)+pl(26,160,COL.obs);
   return {s,l:['me','obs:기다림·세는 친구','mk:밟고 도는 자리','run:왕복 달리기']}; },
 /* 둘레 달리기 · 경보 */
 at_oval:o=>{ let s=`<ellipse cx="200" cy="125" rx="168" ry="92" fill="none" stroke="#fff" stroke-width="3"/><ellipse cx="200" cy="125" rx="128" ry="58" fill="none" stroke="#fff" stroke-width="3"/>`;
   [[0,COL.mint],[1.4,COL.blue],[2.6,COL.blue],[3.9,COL.blue],[5.1,COL.blue]].forEach(([a,c])=>s+=pl(200+Math.cos(a)*148,125+Math.sin(a)*75,c));
   s+=`<path d="M356,140 Q360,200 280,208" fill="none" stroke="${COL.mk}" stroke-width="3.5" marker-end="url(#y§)"/>`+cn(200,125)+(o.walk?T(200,130+22,'경보: 한 발은 늘 땅에'):'')+(o.time?YP(200,98)+sw(220,100):'');
   return {s,l:['me','blue:함께 달리는 친구','run:'+(o.walk?'걸어서 돌기(경보)':'트랙 따라 돌기')].concat(o.time?['mk3:시간 알려 주는 사람']:[])}; },
 /* 칸 밟기 · 사다리 · 후프 · 마커 간격 */
 at_ladder:o=>{ let s=''; const ys=[80,170];
   ys.forEach(y=>{ s+=pl(50,y,COL.mint)+pl(24,y,COL.obs);
     if(o.m==='hoop'){ [110,150,190,230,270].forEach((x,k)=>s+=`<circle cx="${x}" cy="${y+(k%2?14:-14)}" r="16" fill="none" stroke="${COL.mk}" stroke-width="3"/>`); s+=`<path d="M66,${y} L110,${y-14} L150,${y+14} L190,${y-14} L230,${y+14} L270,${y-14} L340,${y}" fill="none" stroke="#fff" stroke-width="2.4" stroke-dasharray="4 4" marker-end="url(#w§)"/>`; }
     else if(o.m==='mk'){ let x=90; [24,30,36,44,54,64].forEach(g=>{ x+=g; s+=mk(x,y); }); s+=rn(66,y-10,340,y-10,-8)+T(110,y+26,'좁게',COL.mk,11)+T(320,y+26,'넓게',COL.mk,11); }
     else { s+=`<rect x="90" y="${y-20}" width="200" height="40" fill="none" stroke="#fff" stroke-width="2.5"/>`; for(let x=115;x<290;x+=25) s+=`<line x1="${x}" y1="${y-20}" x2="${x}" y2="${y+20}" stroke="#fff" stroke-width="2.5"/>`;
       s+=`<path d="M66,${y} H340" fill="none" stroke="${COL.mk}" stroke-width="3" stroke-dasharray="2 10" stroke-linecap="round" marker-end="url(#y§)"/>`+cn(350,y); } });
   return {s,l:['me','obs:다음 사람','run:'+(o.m==='hoop'?'한 발씩 후프 밟기':o.m==='mk'?'마커마다 한 걸음':'칸마다 빠른 발')].concat(o.m==='mk'?['mk']:o.m==='hoop'?['ring:후프']:['cone'])}; },
 /* 좌우 넘기(스피드 바운스) · 십자 뛰기 */
 at_bounce:o=>{ let s=''; [[90,80],[200,80],[310,80],[90,180],[200,180],[310,180]].forEach(([x,y],k)=>{
     if(o.cross){ s+=`<rect x="${x-24}" y="${y-24}" width="48" height="48" fill="none" stroke="#fff" stroke-width="2"/><line x1="${x}" y1="${y-24}" x2="${x}" y2="${y+24}" stroke="#fff" stroke-width="2"/><line x1="${x-24}" y1="${y}" x2="${x+24}" y2="${y}" stroke="#fff" stroke-width="2"/>`+[[-12,-12,1],[12,-12,2],[12,12,3],[-12,12,4]].map(([a,b,t])=>T(x+a,y+b+4,t,COL.mk,11)).join('');
       if(k<3) s+=pl(x-12,y+12,COL.mint); else s+=pl(x-50,y,COL.obs); }
     else if(o.rope){ s+=k<3?pl(x,y,COL.mint)+`<ellipse cx="${x}" cy="${y-6}" rx="18" ry="26" fill="none" stroke="${COL.cone}" stroke-width="2.6"/>`:pl(x,y,COL.obs)+sw(x+22,y); }
     else { s+=WEDGE(x,y)+(k<3?pl(x-22,y,COL.mint)+`<path d="M${x-14},${y-18} Q${x},${y-36} ${x+14},${y-18}" fill="none" stroke="${COL.mk}" stroke-width="2.6" marker-end="url(#y§)" marker-start="url(#y§)"/>`:pl(x-40,y,COL.obs)+sw(x+30,y)); } });
   if(o.rope) return {s,l:['me','obs:세는 친구','bar:줄넘기 줄']};
   return {s,l:['me','obs:세는 친구'].concat(o.cross?['run:1→2→3→4 순서로 뛰기']:['run:두 발 모아 좌우로 넘기','wedge'])}; },
 /* 제자리멀리뛰기 · 삼단뛰기 · 수직 점프 · 높이뛰기 */
 at_sjump:o=>{ let s='';
   if(o.m==='vert'){ s+=`<rect x="300" y="25" width="20" height="200" fill="rgba(255,255,255,.3)" stroke="#fff" stroke-width="2"/>`; [60,90,120,150].forEach((y,k)=>s+=`<line x1="292" y1="${y}" x2="300" y2="${y}" stroke="#fff" stroke-width="2"/>`+T(280,y+4,(4-k)*10,'#fff',10));
     s+=pl(272,185,COL.mint)+`<path d="M272,168 V80" stroke="${COL.mk}" stroke-width="3" marker-end="url(#y§)"/>`+mk(298,82)+pl(160,185,COL.obs)+pl(120,185,COL.obs)+CLIP(210,185);
     return {s,l:['me','obs:기다림','mk:손끝 닿은 자리','clip:기록지','run:제자리에서 위로']}; }
   if(o.m==='high'){ s+=`<rect x="250" y="80" width="110" height="90" rx="6" fill="rgba(255,212,59,.45)" stroke="#fff" stroke-width="2.5"/><line x1="240" y1="70" x2="240" y2="180" stroke="#fff" stroke-width="2"/><circle cx="240" cy="70" r="4" fill="#fff"/><circle cx="240" cy="180" r="4" fill="#fff"/><path d="M240,74 Q246,125 240,176" fill="none" stroke="${COL.cone}" stroke-width="3"/>`;
     s+=pl(70,210,COL.mint)+`<path d="M84,204 Q190,200 226,140" fill="none" stroke="${COL.mk}" stroke-width="3" stroke-dasharray="2 9" stroke-linecap="round"/><path d="M228,136 Q262,90 296,130" fill="none" stroke="${COL.mk}" stroke-width="3.5" marker-end="url(#y§)"/>`+pl(40,70,COL.obs)+pl(70,70,COL.obs);
     return {s,l:['me','obs:기다림','run:비스듬히 달려와 뛰어넘기','bar:고무줄(낮게 시작)','mat']}; }
   s+=`<line x1="80" y1="40" x2="80" y2="210" stroke="#fff" stroke-width="5"/>`+T(80,32,'구름선');
   [[150,'1m'],[200,'1.5m'],[250,'2m']].forEach(([x,t])=>s+=`<line x1="${x}" y1="60" x2="${x}" y2="190" stroke="#fff" stroke-opacity=".55" stroke-width="2" stroke-dasharray="5 5"/>`+T(x,206,t,'#fff',11));
   if(o.m==='triple'){ s+=pl(64,125,COL.mint)+[[80,150],[150,215],[215,290]].map(([a,b],k)=>`<path d="M${a+6},120 Q${(a+b)/2},${86+k*6} ${b},120" fill="none" stroke="${COL.mk}" stroke-width="3" marker-end="url(#y§)"/>`+T(b,108,k+1,COL.mk,12)).join('');
     return {s,l:['me','run:깡충 · 깡충 · 폴짝(세 번 이어 뛰기)','mk2:거리 선']}; }
   [80,125,170].forEach(y=>s+=pl(62,y,COL.mint)); s+=`<path d="M80,118 Q140,58 210,118" fill="none" stroke="${COL.mk}" stroke-width="3.5" marker-end="url(#y§)"/>`+mk(214,128)+pl(30,90,COL.obs)+pl(30,160,COL.obs);
   return {s,l:['me','obs:기다림','run:두 발 모아 멀리 뛰기','mk:뒤꿈치 닿은 자리','mk2:거리 선']}; },
 /* 던지기: 과녁 · 점수 구역 · 뒤로 · 앉아서 · 돌아서 */
 at_throw2:o=>{ let s=`<line x1="80" y1="30" x2="80" y2="220" stroke="#fff" stroke-width="5"/>`+T(80,24,'던지는 선');
   const P=()=>[70,125,180].forEach(y=>s+=pl(60,y,COL.mint));
   if(o.m==='target'){ P(); [[170,80,'1'],[220,170,'2'],[280,110,'3'],[340,190,'5']].forEach(([x,y,t])=>s+=HOOPG(x,y,20,t)); s+=bl(78,118)+arc(82,114,272,108,48); s+=pl(28,90,COL.obs)+pl(28,160,COL.obs);
     return {s,l:['me','obs:기다림','ball','pass:던져 넣기','ring:과녁(숫자는 점수)']}; }
   if(o.m==='zone'){ [[120,'1점','rgba(255,255,255,.08)'],[190,'2점','rgba(255,255,255,.16)'],[260,'3점','rgba(255,212,59,.25)'],[330,'5점','rgba(255,212,59,.4)']].forEach(([x,t,f])=>s+=`<rect x="${x-35}" y="40" width="70" height="170" fill="${f}" stroke="#fff" stroke-width="1.5" stroke-dasharray="5 5"/>`+T(x,58,t)); P(); s+=bl(78,118)+arc(82,114,250,140,60);
     return {s,l:['me','ball','pass:던지기','mk2:점수 구역']}; }
   if(o.m==='back'){ [70,125,180].forEach(y=>s+=pl(100,y,COL.mint)+`<path d="M108,${y-10} l-6,-8 m6,8 l6,-8" stroke="#fff" stroke-width="2"/>`); s=s.replace('x1="80" y1="30" x2="80" y2="220"','x1="80" y1="30" x2="80" y2="220"'); s+=`<path d="M100,108 Q120,40 250,100" fill="none" stroke="#fff" stroke-width="2.6" stroke-dasharray="6 5" marker-end="url(#w§)"/>`+bl(250,100)+T(160,232,'등을 보이고 서서 머리 위로 뒤로');
     return {s,l:['me','ball','pass:두 손으로 뒤로 던지기']}; }
   if(o.m==='sit'){ [70,125,180].forEach(y=>s+=`<ellipse cx="62" cy="${y+10}" rx="18" ry="6" fill="rgba(255,255,255,.35)"/>`+pl(60,y,COL.mint)); s+=bl(78,118)+`<path d="M84,118 L230,118" stroke="#fff" stroke-width="2.6" stroke-dasharray="6 5" marker-end="url(#w§)"/>`+mk(150,200)+mk(200,200)+mk(250,200)+T(200,232,'앉아서 가슴에서 밀기');
     return {s,l:['me','ball','pass:가슴에서 앞으로 밀기','mk:거리 표시']}; }
   if(o.m==='spin'){ s+=`<circle cx="60" cy="125" r="34" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="4 5"/>`+pl(60,125,COL.mint)+`<path d="M60,85 A40,40 0 1,1 26,108" fill="none" stroke="${COL.mk}" stroke-width="3" marker-end="url(#y§)"/>`+bl(96,112)+arc(100,108,300,120,60)+pl(30,220,COL.obs)+pl(60,220,COL.obs);
     return {s,l:['me','obs:선 뒤 기다림','run:한 바퀴 돌기','ball','pass:돌고 던지기']}; }
   P(); [[160,'5m'],[240,'10m'],[320,'15m']].forEach(([x,t])=>s+=`<line x1="${x}" y1="40" x2="${x}" y2="210" stroke="#fff" stroke-opacity=".55" stroke-width="2" stroke-dasharray="5 5"/>`+T(x,222,t,'#fff',11));
   s+=bl(78,118)+(o.step?`<path d="M30,140 L52,130" stroke="${COL.mk}" stroke-width="3" marker-end="url(#y§)"/>`:'')+arc(82,114,280,96,70)+mk(282,104);
   return {s,l:['me','ball','pass:어깨 너머로 던지기','mk:떨어진 자리','mk2:거리 선'].concat(o.step?['run:한 걸음 내딛기']:[])}; },
 /* 한 발 서기 · 균형 */
 at_balance:o=>{ let s=mkBox(); [[100,90],[200,90],[300,90],[100,175],[200,175],[300,175]].forEach(([x,y],k)=>{ s+=pl(x,y,k%3===1?COL.obs:COL.mint)+(k%3===1?sw(x+22,y-14):`<path d="M${x-14},${y+20} h28" stroke="#fff" stroke-width="2.5"/><circle cx="${x+4}" cy="${y+20}" r="3" fill="${COL.mk}"/>`); });
   if(o.move) s+=rn(100,90,180,80,-14)+rn(300,175,220,185,-14);
   return {s,l:['me:한 발로 서기','obs:시간 재는 친구'].concat(o.move?['run:움직이다 멈춰 한 발']:[])}; },
 /* 허들 왕복 이어달리기 */
 at_hurdle2:o=>{ let s=''; [75,175].forEach((y,k)=>{ const c=k?COL.red:COL.blue; [60,40,20].forEach(x=>s+=pl(x,y,c)); [130,190,250].forEach(x=>s+=SV.hurdle(x,y-14)); s+=cn(330,y)+`<path d="M78,${y-14} Q104,${y-44} 130,${y-20} T190,${y-20} T250,${y-20} T320,${y-12}" fill="none" stroke="${COL.mk}" stroke-width="3" marker-end="url(#y§)"/>`+rn(330,y+16,80,y+24,-6); if(o.baton) s+=SV.baton(60,y+20); });
   return {s,l:['blue:한 팀','red:다른 팀','hurdle','run:넘어가서 콘 돌아 옆길로','cone'].concat(o.baton?['mk:배턴']:[])}; },
 /* 왕복 이어달리기(마주 보고 손바닥 치기) · 곡선 인계 */
 at_relay2:o=>{ let s='';
   if(o.curve){ s+=`<path d="M40,210 L180,210 A110,95 0 0,0 180,20 L40,20" fill="none" stroke="#fff" stroke-width="3"/><path d="M40,170 L180,170 A70,55 0 0,0 180,60 L40,60" fill="none" stroke="#fff" stroke-width="3"/>`+`<path d="M230,62 A92,75 0 0,1 280,130 L254,130 A66,55 0 0,0 218,82 Z" fill="rgba(255,212,59,.35)" stroke="#fff" stroke-dasharray="5 4"/>`;
     s+=pl(150,190,COL.blue)+SV.baton(166,190)+`<path d="M170,188 Q250,186 266,138" fill="none" stroke="${COL.mk}" stroke-width="3" marker-end="url(#y§)"/>`+pl(258,96,COL.mint)+rn(250,82,170,40,10);
     return {s,l:['blue:주는 사람','me:받는 사람','run','mk:인계 구역']}; }
   [70,180].forEach((y,k)=>{ const c=k?COL.red:COL.blue; [80,56,32].forEach(x=>s+=pl(x,y,c)); [320,344,368].forEach(x=>s+=pl(x,y,c)); s+=`<path d="M98,${y-6} H300" fill="none" stroke="${COL.mk}" stroke-width="3" marker-end="url(#y§)"/>`+`<path d="M300,${y+8} H98" fill="none" stroke="${COL.mk}" stroke-width="2.5" stroke-dasharray="5 4" marker-end="url(#y§)"/>`+(o.obj?SV.baton(96,y+18):''); });
   s+=`<line x1="200" y1="40" x2="200" y2="210" stroke="#fff" stroke-opacity=".4" stroke-width="2" stroke-dasharray="4 6"/>`;
   return {s,l:['blue:한 팀','red:다른 팀','run:건너편 친구 손바닥 치기'].concat(o.obj?['mk:배턴']:[])}; },
 /* 복합 코스: 사다리 → 허들 → 지그재그 → 결승선 */
 at_course:o=>{ let s=`<rect x="40" y="40" width="110" height="36" fill="none" stroke="#fff" stroke-width="2.5"/>`; for(let x=62;x<150;x+=22) s+=`<line x1="${x}" y1="40" x2="${x}" y2="76" stroke="#fff" stroke-width="2.5"/>`;
   [220,280,340].forEach(x=>s+=SV.hurdle(x,58)); [[330,140],[280,170],[230,140],[180,170]].forEach(([x,y])=>s+=cn(x,y)); s+=`<line x1="60" y1="190" x2="60" y2="230" stroke="${COL.mk}" stroke-width="5"/>`+T(84,240,'결승선',COL.mk,11);
   s+=pl(24,58,COL.mint)+`<path d="M40,58 H190 Q220,30 250,54 T310,54 T370,80 Q380,120 340,130 L290,165 L240,135 L190,165 L130,200 L70,210" fill="none" stroke="${COL.mk}" stroke-width="3" stroke-dasharray="2 8" stroke-linecap="round" marker-end="url(#y§)"/>`+pl(24,100,COL.obs)+YP(100,120)+sw(120,122);
   return {s,l:['me','obs:다음 사람','mk3:시간 재는 사람','run:코스 따라가기','hurdle','cone']}; }
});

/* 범례 */
addLegend(()=>{
  const ex={
    hurdle:[`<rect x="12" y="3" width="10" height="16" fill="#e0700f" stroke="#fff"/>`,'허들'],
    mat:[`<rect x="6" y="4" width="22" height="14" rx="3" fill="rgba(255,212,59,.7)" stroke="#fff"/>`,'매트·모래밭'],
    wedge:[`<rect x="13" y="3" width="8" height="16" rx="3" fill="#ffd43b" stroke="#fff"/>`,'낮은 스펀지 장애물'],
    bar:[`<path d="M4,6 Q17,14 30,6" fill="none" stroke="#ff7a1a" stroke-width="3"/>`,'고무줄']
  };
  return ex; });
