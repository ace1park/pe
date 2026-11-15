/* [프로그램] 대형 그림 틀 · 배구형 게임
   이 종목 그림은 이 파일에만 있음. 다른 종목도 이 그림 이름을 빌려 쓸 수 있음
   그림 이름: vb_solo · vb_pair · vb_group · vb_court · vb_serve · vb_zones · vb_spike · vb_cloth · vb_rot · vb_block
   범례(그림 아래 설명)는 맨 아래 addLegend에 더함 */

Object.assign(TPL,{
 vb_solo:o=>{ let s=mkBox(); [[100,170],[200,170],[300,170],[150,95],[250,95]].forEach(([x,y])=>{ s+=pl(x,y,COL.mint)+bl(x,y-40,7)+`<path d="M${x+14},${y-16} v-28" stroke="${COL.mk}" stroke-width="2.5" marker-end="url(#y§)"/>`; }); return {s,l:['me','ball','run:위로 띄우기']}; },
 vb_pair:o=>{ let s=''; [60,125,190].forEach(y=>{ s+=pl(90,y)+pl(310,y)+bl(110,y-12)+arc2(112,y-12,292,y-12,32); }); return {s,l:['blue','ball','pass2:띄워 주고받기']}; },
 vb_group:o=>{ const P4=[[130,70],[270,70],[270,180],[130,180]]; let s=`<circle cx="200" cy="125" r="78" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="2" stroke-dasharray="4 6"/>`; P4.forEach(([x,y])=>s+=pl(x,y)); s+=bl(148,62,7)+arc(148,60,256,60,30)+arc(272,88,272,164,0).replace('Q','Q')+arc(256,186,148,186,30); return {s,l:['blue','ball','pass:띄워 이어 주기']}; },
 vb_court:o=>{ let s=court(); [[90,80],[150,125],[90,170]].forEach(([x,y])=>s+=pl(x,y)); [[310,80],[250,125],[310,170]].forEach(([x,y])=>s+=pl(x,y,COL.red)); s+=bl(104,166,7)+arc(104,164,150,112,36)+arc(160,112,282,80,56); return {s,l:['blue','red:상대','ball','pass:받고 넘기기','net']}; },
 vb_serve:o=>{ let s=court()+`<line x1="300" y1="35" x2="300" y2="215" stroke="#fff" stroke-opacity=".4" stroke-dasharray="5 5"/><line x1="200" y1="125" x2="360" y2="125" stroke="#fff" stroke-opacity=".4" stroke-dasharray="5 5"/>`+pl(26,150)+bl(40,140,7)+arc(42,138,330,170,70); [[250,80],[250,170],[330,80]].forEach(([x,y])=>s+=pl(x,y,COL.red)); s+=pl(70,70,COL.obs)+pl(70,180,COL.obs); return {s,l:['blue:서브하는 사람','red:받는 사람','obs:기다림','ball','pass:서브','net']}; },
 vb_zones:o=>{ let s=court()+zn(282,37,76,86,'rgba(255,212,59,.35)')+`<line x1="280" y1="35" x2="280" y2="215" stroke="#fff" stroke-dasharray="5 5"/><line x1="200" y1="125" x2="360" y2="125" stroke="#fff" stroke-dasharray="5 5"/>`; [['1',240,80],['2',320,80],['3',240,170],['4',320,170]].forEach(([t,x,y])=>s+=`<text x="${x+26}" y="${y+34}" text-anchor="middle" font-size="15" font-weight="800" fill="#fff" opacity=".85">${t}</text>`); [[240,80],[240,170],[320,170]].forEach(([x,y])=>s+=pl(x,y,COL.red)); s+=pl(120,90)+pl(120,165)+bl(136,84,7)+arc(138,80,320,84,64); return {s,l:['blue','red:상대','ball','pass:빈 구역으로','mk:빈 구역','net']}; },
 vb_spike:o=>{ let s=court()+pl(176,80)+bl(176,52,7)+`<path d="M176,62 v-0" stroke="none"/>`+pl(140,150)+rn(140,150,186,104,-10)+`<path d="M190,66 L262,160" fill="none" stroke="#fff" stroke-width="2.8" stroke-dasharray="6 4" marker-end="url(#w§)"/>`+pl(224,96,COL.red)+`<path d="M214,80 v-14 M234,80 v-14" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`+pl(300,170,COL.red)+pl(90,110); return {s,l:['blue','red:막는 사람','ball','run:뛰어 들어가기','pass:내려치기','net']}; },
 /* 보자기로 받아 넘기기 */
 vb_cloth:o=>{ let s=court(); const P=[[[100,95],[100,155],COL.blue],[[300,95],[300,155],COL.red]];
   P.forEach(([a,b,c])=>s+=`<path d="M${a[0]-4},${a[1]+12} Q${a[0]+22},125 ${b[0]-4},${b[1]-12} L${b[0]+14},${b[1]-12} Q${a[0]+40},125 ${a[0]+14},${a[1]+12} Z" fill="rgba(255,212,59,.8)" stroke="#fff" stroke-width="2"/>`+pl(...a,c)+pl(...b,c));
   s+=bl(124,108)+arc(128,104,272,108,60)+pl(40,232,COL.obs)+pl(70,232,COL.obs);
   return {s,l:['blue:보자기 잡은 짝','red:상대 짝','obs:다음 짝','ball','pass:보자기로 받아 튕겨 넘기기','cloth','net']}; },
 /* 여섯 자리 · 세 자리와 자리 돌기 */
 vb_rot:o=>{ let s=border(40,35,360,215)+NETV(360,35,215); const n=o.n||6;
   const P=n===3?[[290,70,1],[290,180,2],[130,125,3]]:n===4?[[290,70,1],[290,180,2],[130,70,3],[130,180,4]]:[[300,180,2],[300,125,3],[300,70,4],[150,70,5],[150,125,6],[150,180,1]];
   P.forEach(([x,y,t])=>s+=pl(x,y)+T(x+22,y-14,t,COL.mk,15));
   if(o.rot!==false) for(let k=0;k<P.length;k++){ const [x1,y1]=P[k], [x2,y2]=P[(k+1)%P.length]; s+=rn(x1+(x2-x1)*.25,y1+(y2-y1)*.25,x1+(x2-x1)*.75,y1+(y2-y1)*.75,8); }
   return {s,l:['blue:우리 팀','run:자리 돌기(시계 방향)','net']}; },
 /* 막기: 두 손 올려 벽 */
 vb_block:o=>{ let s=court(); [[176,70],[176,180]].forEach(([x,y])=>s+=pl(x,y,COL.red)+`<path d="M${x-6},${y-16} v-14 M${x+6},${y-16} v-14" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/>`);
   [[232,70],[232,180]].forEach(([x,y])=>s+=pl(x,y)+bl(x-6,y-26)+`<path d="M${x-8},${y-28} L${x-34},${y-6}" stroke="#fff" stroke-width="2.6" stroke-dasharray="5 4" marker-end="url(#w§)"/>`);
   if(o.cones) [[90,90],[110,160],[70,200]].forEach(([x,y])=>s+=cn(x,y));
   s+=pl(330,90,COL.obs)+pl(330,160,COL.obs);
   return {s,l:['red:막는 사람(두 손 벽)','blue:치는 사람','obs:기다림','ball','pass:내려치기','net'].concat(o.cones?['cone:맞히는 콘']:[])}; }
});

/* 범례 */
addLegend(()=>{
  const ex={
    cloth:[`<rect x="6" y="6" width="22" height="10" rx="3" fill="rgba(255,212,59,.85)" stroke="#fff"/>`,'보자기']
  };
  return ex; });
