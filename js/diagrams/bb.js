/* [프로그램] 대형 그림 틀 · 농구
   이 종목 그림은 이 파일에만 있음. 다른 종목도 이 그림 이름을 빌려 쓸 수 있음
   그림 이름: bb_solo · bb_relay · bb_pair · bb_shoot · bb_half · bb_court · bb_defend · bb_spots · bb_fast
   범례(그림 아래 설명)는 맨 아래 addLegend에 더함 */

function bbHalf(){ return border(150,35,370,215)+`<path d="M150,95 A30,30 0 0,1 150,155" fill="none" stroke="#fff" stroke-width="2.5"/><rect x="300" y="98" width="70" height="54" fill="rgba(224,112,15,.28)" stroke="#fff" stroke-width="2.5"/><path d="M370,45 Q220,125 370,205" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="2"/>`+SV.hoop(354,125,1); }
Object.assign(TPL,{
 bb_solo:o=>{ let s=mkBox(); [[90,90,140,70],[160,170,205,195],[250,75,295,60],[300,165,335,190],[120,195,85,160]].forEach(([x,y,x2,y2])=>{ s+=pl(x,y,COL.mint)+bl(x+14,y+8)+dr(x+20,y+10,x2+18,y2+12,3,3); }); return {s,l:['me','ball','drib:드리블']}; },
 bb_relay:o=>{ let s=ln(60,30,60,220); [70,125,180].forEach((y,k)=>{ [130,190,250,310].forEach((x,j)=>s+=cn(x,y+(j%2?14:-14))); s+=pl(76,y,[COL.blue,COL.red,COL.mint][k])+bl(92,y+6)+`<path d="M96,${y+6} C115,${y-30} 145,${y-30} 160,${y} S205,${y+34} 220,${y} S265,${y-34} 280,${y} S320,${y+30} 340,${y}" fill="none" stroke="#fff" stroke-width="2.4" stroke-dasharray="3 3" marker-end="url(#w§)"/>`+pl(40,y,COL.obs); }); return {s,l:['blue:팀','obs:기다림','ball','drib:드리블','cone']}; },
 bb_pair:o=>{ let s=''; [60,125,190].forEach((y,k)=>{ s+=pl(90,y)+pl(310,y)+bl(108,y+4)+(k===1?`<path d="M112,${y+2} L200,${y+26} L292,${y+2}" fill="none" stroke="#fff" stroke-width="2.6" stroke-dasharray="6 5" marker-start="url(#w§)" marker-end="url(#w§)"/>`:ps2(110,y,292,y)); }); return {s,l:['blue','ball','pass2']}; },
 bb_shoot:o=>{ let s=bbHalf()+pl(262,125)+bl(276,118)+`<path d="M278,114 Q318,62 348,118" fill="none" stroke="#fff" stroke-width="2.6" stroke-dasharray="5 4" marker-end="url(#w§)"/>`+pl(330,170,COL.mint)+pl(234,125,COL.obs)+pl(208,125,COL.obs)+pl(182,125,COL.obs); return {s,l:['blue:슛하는 사람','me:리바운드','obs:기다림','ball','pass:슛','basket']}; },
 bb_half:o=>{ let s=bbHalf(); [[200,80],[200,175],[275,60]].forEach(([x,y])=>s+=pl(x,y)); [[240,110],[300,150]].forEach(([x,y])=>s+=pl(x,y,COL.red)); s+=bl(214,86)+ps(214,84,262,64)+rn(200,175,300,120,-20); return {s,l:['blue:공격','red:수비','ball','pass','run:빈 곳으로','basket']}; },
 bb_court:o=>{ let s=bbCourt(); [[110,80],[150,175],[255,70],[300,175]].forEach(([x,y])=>s+=pl(x,y)); [[90,150],[200,72],[225,185],[330,120]].forEach(([x,y])=>s+=pl(x,y,COL.red)); s+=bl(124,86)+ps(124,90,146,160)+ps(164,166,244,80)+ps(268,80,296,160); return {s,l:['blue','red:상대','ball','pass','basket']}; },
 bb_defend:o=>{ let s=bbHalf()+pl(220,125)+bl(236,132)+dr(242,132,282,150,3,2)+pl(290,128,COL.red)+`<path d="M280,112 l10,-10 l10,10" fill="none" stroke="#fff" stroke-width="2.4"/>`+pl(220,60,COL.obs)+pl(220,190,COL.obs); return {s,l:['blue:공격','red:수비','obs:기다림','ball','drib:드리블','basket']}; },
 /* 농구: 다섯 자리 슛 · 레이업 길 */
 bb_spots:o=>{ let s=bbHalf();
   if(o.lay){ s+=pl(200,60)+bl(214,66)+`<path d="M214,72 Q260,80 290,100" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="3 3"/>`+`<ellipse cx="300" cy="108" rx="7" ry="4" fill="${COL.mk}"/>`+T(300,98,'하나',COL.mk,11)+`<ellipse cx="322" cy="118" rx="7" ry="4" fill="${COL.mk}"/>`+T(330,140,'둘',COL.mk,11)+`<path d="M326,112 Q340,96 352,118" fill="none" stroke="#fff" stroke-width="2.6" stroke-dasharray="5 4" marker-end="url(#w§)"/>`+pl(180,40,COL.obs)+pl(160,40,COL.obs);
     return {s,l:['blue:슛하는 사람','obs:기다림','ball','mk:하나·둘 발 자리','pass:올려 놓기','basket']}; }
   [[300,60,1],[240,80,2],[220,125,3],[240,170,4],[300,190,5]].forEach(([x,y,t])=>s+=mk(x,y)+T(x,y-10,t,COL.mk,13)); s+=pl(220,125,COL.mint)+bl(234,120)+`<path d="M236,116 Q300,70 346,118" fill="none" stroke="#fff" stroke-width="2.6" stroke-dasharray="5 4" marker-end="url(#w§)"/>`+pl(330,170,COL.blue)+rn(220,140,236,170,-10);
   return {s,l:['me:슛하는 사람','blue:공 주워 주는 친구','ball','pass:슛','mk:슛 자리(번호 순서)','run:다음 자리로','basket']}; },
 /* 농구·넷볼: 빠르게 앞으로(2 대 1 · 3 대 2 · 나란히 달리기) */
 bb_fast:o=>{ let s=o.nb?nbCourt():bbCourt(); const n=o.n||2;
   const B=n===3?[[110,70],[110,125],[110,180]]:[[110,90],[110,165]], R=(o.d===0?[]:o.d===2?[[270,95],[270,155]]:[[270,125]]);
   B.forEach(([x,y])=>s+=pl(x,y)+rn(x+14,y,x+130,y+(y<125?14:y>125?-14:0),-6)); R.forEach(([x,y])=>s+=pl(x,y,COL.red)); s+=bl(124,96)+ps(126,100,176,160);
   return {s,l:['blue:공격','red:수비'].slice(0,R.length?2:1).concat(['ball','pass','run:나란히 달리기',o.nb?'hoop':'basket'])}; }
});

/* 범례 */
addLegend(()=>{
  const ex={
    basket:[SV.hoop(14,11,1),'골대']
  };
  return ex; });
