/* [프로그램] 대형 그림 틀 · 교실놀이
   이 종목 그림은 이 파일에만 있음. 다른 종목도 이 그림 이름을 빌려 쓸 수 있음
   그림 이름: cl_spread · cl_pair · cl_circle · cl_halves · cl_relay · cl_target · cl_seatnet · cl_station · cl_front
   범례(그림 아래 설명)는 맨 아래 addLegend에 더함 */


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

/* 범례 */
addLegend(()=>{
  const ex={
    cl_box:[`<rect x="9" y="6" width="16" height="12" fill="#c9a06a" stroke="#6b4b22"/>`,'상자'],
    cl_rings:[`<circle cx="17" cy="11" r="8" fill="none" stroke="#ffd43b" stroke-width="3"/>`,'과녁'],
    cl_cupb:[`<path d="M11,18 L23,18 L21,4 L13,4 Z" fill="#9db8ef" stroke="#55534d"/>`,'거꾸로 놓인 컵']
  };
  Object.keys(CL.lab).forEach(k=>ex['cl_'+k]=[`<g transform="translate(0,2)">${CL.o(k,17,9)}</g>`,CL.lab[k]]);
  return ex; });
