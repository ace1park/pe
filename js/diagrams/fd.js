/* [프로그램] 대형 그림 틀 · 플라잉 디스크
   이 종목 그림은 이 파일에만 있음. 다른 종목도 이 그림 이름을 빌려 쓸 수 있음
   그림 이름: fd_basket · fd_course · fd_target · fd_ult
   범례(그림 아래 설명)는 맨 아래 addLegend에 더함 */


/* 그림 이름에 disc: true 를 붙이면 공 대신 원반으로 그림(아래 tplOf · 함께 쓰는 파일) */
const DGBASKET=(x,y,k=1)=>`<g transform="translate(${x},${y}) scale(${k})"><line x1="0" y1="-20" x2="0" y2="16" stroke="#fff" stroke-width="3"/><path d="M-12,-14 L12,-14 L8,-2 L-8,-2 Z" fill="none" stroke="#fff" stroke-width="2"/><ellipse cx="0" cy="2" rx="13" ry="4" fill="rgba(255,255,255,.25)" stroke="#fff" stroke-width="2.5"/><line x1="-10" y1="16" x2="10" y2="16" stroke="#fff" stroke-width="3"/></g>`;
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
   return {s,l:['blue:공격','red:수비'].slice(0,o.def===false?1:2).concat(['ball','pass:던져서만 앞으로','run:득점 구역으로','ezone']).concat(o.mark?['ring1m']:[])}; }
});

/* 범례 */
addLegend(()=>{
  const ex={
    dgoal:[DGBASKET(17,12,.6),'바구니(목표)'],
    ring1m:[`<circle cx="17" cy="11" r="8" fill="none" stroke="#ffd43b" stroke-width="2" stroke-dasharray="3 3"/>`,'막는 사람 1m']
  };
  return ex; });
