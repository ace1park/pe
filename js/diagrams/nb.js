/* [프로그램] 대형 그림 틀 · 넷볼
   이 종목 그림은 이 파일에만 있음. 다른 종목도 이 그림 이름을 빌려 쓸 수 있음
   그림 이름: nb_pair · nb_group · nb_shoot · nb_court · nb_defend · nb_zones
   범례(그림 아래 설명)는 맨 아래 addLegend에 더함 */

Object.assign(TPL,{
 nb_pair:o=>{ let s=''; [60,125,190].forEach(y=>{ s+=pl(90,y)+pl(310,y)+bl(108,y+4)+ps2(110,y,292,y); }); return {s,l:['blue','ball','pass2']}; },
 nb_group:o=>{ let s=mk(110,45)+mk(290,45)+mk(290,205)+mk(110,205); [[110,45],[290,45],[290,205],[110,205]].forEach(([x,y])=>s+=pl(x,y)); s+=pl(200,125,COL.red)+`<circle cx="200" cy="125" r="34" fill="none" stroke="#fff" stroke-dasharray="4 5"/>`+bl(126,52)+ps(110,45,290,45)+ps(290,45,290,205)+ps(290,205,110,205); return {s,l:['blue','red:수비(90cm)','ball','pass','mk']}; },
 nb_shoot:o=>{ let s=`<rect x="20" y="20" width="360" height="210" fill="none"/>`+border(170,35,370,215)+`<path d="M370,60 A75,75 0 0,0 370,190" fill="none" stroke="#fff" stroke-width="3"/>`+SV.post(355,125)+pl(305,105)+bl(320,98)+`<path d="M320,96 Q340,60 352,116" fill="none" stroke="#fff" stroke-width="2.6" stroke-dasharray="5 4" marker-end="url(#w§)"/>`+pl(300,165)+pl(220,125,COL.obs)+pl(195,125,COL.obs); return {s,l:['blue:슛하는 사람','obs:기다림','ball','pass:슛','hoop']}; },
 nb_court:o=>{ let s=nbCourt(); [[90,90],[180,160],[220,80],[300,150]].forEach(([x,y])=>s+=pl(x,y)); [[120,165],[200,110],[290,95],[330,170]].forEach(([x,y])=>s+=pl(x,y,COL.red)); s+=bl(106,96)+ps(100,96,172,152)+ps(186,152,214,90)+ps(228,86,292,142); return {s,l:['blue','red:상대','ball','pass','hoop']}; },
 nb_defend:o=>{ let s=pl(130,125)+bl(146,130)+pl(200,125,COL.red)+`<circle cx="130" cy="125" r="42" fill="none" stroke="${COL.mk}" stroke-width="2" stroke-dasharray="5 5"/>`+pl(310,70)+pl(310,180)+ps(148,118,298,76)+rn(200,125,250,98,-14); return {s,l:['blue:공격','red:수비','ball','pass','run:가로채기','mk:90cm']}; },
 /* 넷볼: 구역과 자리 · 센터 패스 */
 nb_zones:o=>{ let s=nbCourt()+`<rect x="30" y="35" width="113" height="180" fill="rgba(47,111,214,.18)"/><rect x="257" y="35" width="113" height="180" fill="rgba(217,67,58,.18)"/>`+T(86,52,'우리 골 구역')+T(200,52,'가운데')+T(314,52,'공격 구역');
   if(o.center){ s+=pl(200,125)+bl(214,120)+ps(214,124,260,170)+[[170,80],[230,80],[170,175],[260,170]].map(([x,y])=>pl(x,y)).join('')+[[230,175],[150,125],[250,125]].map(([x,y])=>pl(x,y,COL.red)).join('');
     return {s,l:['blue:우리 편','red:상대','ball','pass:가운데에서 시작 패스','hoop']}; }
   [[60,95],[110,150],[190,90],[220,170],[300,95],[340,150]].forEach(([x,y],k)=>s+=pl(x,y)+T(x,y+28,['막기1','막기2','가운데1','가운데2','슛1','슛2'][k],COL.mk,10));
   return {s,l:['blue:자리마다 다닐 수 있는 구역','hoop']}; }
});

/* 범례 */
addLegend(()=>{
  const ex={
    hoop:[SV.post(17,11),'골대']
  };
  return ex; });
