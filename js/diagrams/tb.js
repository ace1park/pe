/* [프로그램] 대형 그림 틀 · 티볼
   이 종목 그림은 이 파일에만 있음. 다른 종목도 이 그림 이름을 빌려 쓸 수 있음
   그림 이름: tb_throw · tb_hit · tb_run · tb_field · tb_game · tb_catch · tb_tees · tb_zones · tb_pos · tb_force · tb_relay
   범례(그림 아래 설명)는 맨 아래 addLegend에 더함 */

Object.assign(TPL,{
 tb_throw:o=>{ let s=ln(60,25,60,225)+ln(340,25,340,225); [60,125,190].forEach(y=>{ s+=pl(80,y,COL.mint)+pl(320,y,COL.mint)+bl(98,y-6)+arc2(100,y-8,304,y-8,34); }); return {s,l:['me','ball','pass2:던지고 받기']}; },
 tb_hit:o=>{ let s=diamond(); const {H}=DIA; s+=SV.tee(H[0],H[1]-18)+pl(176,214,COL.blue)+`<line x1="182" y1="204" x2="196" y2="196" stroke="${COL.ink}" stroke-width="4" stroke-linecap="round"/>`+arc(200,206,262,72,40)+pl(300,85,COL.red)+pl(120,85,COL.red)+pl(215,120,COL.red)+`<line x1="40" y1="236" x2="140" y2="236" stroke="#fff" stroke-dasharray="5 5"/>`+pl(60,236,COL.obs)+pl(90,236,COL.obs); return {s,l:['blue:치는 사람','red:수비','obs:대기선','ball','pass:친 공','tee','base']}; },
 tb_run:o=>{ let s=diamond(); const {H,F,S,T}=DIA; s+=pl(210,214,COL.blue)+rn(214,214,292,148,-18)+rn(300,130,212,60,-18)+rn(188,58,108,132,-18)+pl(100,160,COL.obs)+pl(312,154,COL.red); return {s,l:['blue:달리는 사람','red:수비','run:달려 나가기','base']}; },
 tb_field:o=>{ let s=diamond(); const {F,S,T}=DIA; s+=pl(318,150,COL.red)+pl(200,72,COL.red)+pl(118,150,COL.red)+pl(250,95,COL.red)+pl(160,40,COL.red)+bl(262,100)+ps(258,104,312,140,16)+arc(170,40,250,92,20); return {s,l:['red:수비','ball','pass:던지기','base']}; },
 tb_game:o=>{ let s=diamond(); const {H}=DIA; s+=SV.tee(H[0],H[1]-18)+pl(176,214,COL.blue)+pl(318,152,COL.blue)+[[300,118],[200,72],[118,150],[250,60],[140,60]].map(([x,y])=>pl(x,y,COL.red)).join('')+arc(200,206,140,64,30)+rn(318,152,206,60,-16)+pl(50,236,COL.obs)+pl(80,236,COL.obs); return {s,l:['blue:공격','red:수비','obs:대기','ball','run','tee','base']}; },
 /* 티볼: 짝 받기(뜬공 · 땅볼 · 낙하 지점) */
 tb_catch:o=>{ let s='';
   [60,125,190].forEach((y,k)=>{ s+=pl(80,y,COL.blue)+pl(300,y,COL.mint)+bl(98,y-6);
     if(o.m==='ground') s+=`<path d="M100,${y+4} L284,${y+4}" stroke="#fff" stroke-width="2.6" stroke-dasharray="3 5" marker-end="url(#w§)"/>`+`<path d="M292,${y+16} q8,6 16,0" stroke="#fff" stroke-width="2.4" fill="none"/>`;
     else if(o.m==='move') s+=arc(100,y-10,250,y-6,50)+`<path d="M244,${y-2} l12,12 m0,-12 l-12,12" stroke="${COL.mk}" stroke-width="3"/>`+rn(300,y,262,y,-10);
     else s+=arc(100,y-10,286,y-12,o.m==='low'?20:78); });
   return {s,l:['blue:던져 주는 사람','me:받는 사람','ball'].concat(o.m==='ground'?['pass:굴려 주기']:o.m==='move'?['pass:높이 던져 주기','run:떨어질 자리로','mk:떨어질 자리']:['pass:'+(o.m==='low'?'가슴 높이로 던지기':'높이 던져 주기')])}; },
 /* 티볼: 치기 연습 자리(그물 · 토스) */
 tb_tees:o=>{ let s=`<line x1="340" y1="30" x2="340" y2="220" stroke="#fff" stroke-width="4"/>`+[50,80,110,140,170,200].map(y=>`<line x1="330" y1="${y}" x2="350" y2="${y}" stroke="#fff" stroke-opacity=".5"/>`).join('')+T(350,24,'그물·벽');
   [70,125,180].forEach(y=>{ s+=SV.tee(200,y+6)+pl(176,y+14,COL.mint)+`<line x1="182" y1="${y+4}" x2="196" y2="${y-4}" stroke="${COL.ink}" stroke-width="4" stroke-linecap="round"/>`+`<path d="M206,${y} L326,${y-6}" stroke="#fff" stroke-width="2.4" stroke-dasharray="5 5" marker-end="url(#w§)"/>`+(o.toss?pl(232,y+30,COL.blue):pl(110,y+14,COL.obs)); });
   return {s,l:['me:치는 사람'].concat(o.toss?['blue:옆에서 살짝 올려 주는 사람']:['obs:뒤에서 봐 주는 친구']).concat(['ball','pass:친 공','tee'])}; },
 /* 티볼: 필드 점수 구역 · 빈 곳 */
 tb_zones:o=>{ let s=diamond(); const {H}=DIA;
   if(o.gap){ [[300,118],[200,72],[118,150],[250,60]].forEach(([x,y])=>s+=pl(x,y,COL.red)); s+=`<circle cx="120" cy="60" r="30" fill="rgba(255,212,59,.35)" stroke="${COL.mk}" stroke-width="2.5" stroke-dasharray="5 4"/>`+T(120,64,'빈 곳',COL.ink)+SV.tee(H[0],H[1]-18)+pl(176,214)+arc(200,206,124,72,30);
     return {s,l:['blue:치는 사람','red:수비','ball','pass:빈 곳으로 치기','mk:빈 곳','tee','base']}; }
   s+=`<path d="M200,228 L360,60 A230,230 0 0,0 40,60 Z" fill="none"/>`+`<path d="M86,92 Q200,10 314,92" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="6 5"/><path d="M60,58 Q200,-30 340,58" fill="none" stroke="${COL.mk}" stroke-width="3" stroke-dasharray="6 5"/>`+T(200,110,'1점')+T(200,44,'2점')+T(200,14,o.hr?'홈런 구역':'3점',COL.mk);
   s+=SV.tee(H[0],H[1]-18)+pl(176,214)+arc(200,206,280,40,40)+pl(60,236,COL.obs)+pl(90,236,COL.obs);
   return {s,l:['blue:치는 사람','obs:대기','ball','pass:멀리 치기','mk2:점수 구역 선','tee','base']}; },
 /* 티볼: 수비 자리(번호) · 배치 바꾸기 */
 tb_pos:o=>{ let s=diamond(); const P=[[316,124,'1루'],[258,92,'2루 옆'],[142,92,'유격'],[84,124,'3루'],[200,160,'가운데'],[330,40,'외야'],[70,40,'외야']];
   P.forEach(([x,y,t])=>s+=pl(x,y,COL.red)+T(x,y+28,t,'#fff',10));
   if(o.shift) s+=rn(142,92,104,66,-10)+rn(258,92,296,66,10)+T(200,240,'치는 사람 보고 자리 옮기기',COL.mk,11);
   return {s,l:['red:수비 자리'].concat(o.shift?['run:자리 옮기기']:[]).concat(['base'])}; },
 /* 티볼: 베이스 커버 · 먼저 아웃 · 사이에 낀 주자 */
 tb_force:o=>{ let s=diamond(); const {F,S}=DIA;
   if(o.rundown){ s+=pl(250,95,COL.blue)+pl(296,130,COL.red)+pl(212,66,COL.red)+bl(284,126)+ps(282,124,226,74)+rn(250,95,276,118,8).replace(/stroke="[^"]+"/,'stroke="#fff"')+rn(250,95,224,74,-8);
     return {s,l:['blue:베이스 사이 주자','red:수비','ball','pass:서로 던져 몰기','run:앞뒤로 피하기','base']}; }
   s+=pl(310,140,COL.red)+pl(212,120,COL.red)+bl(222,126)+ps(222,124,298,146)+pl(176,214,COL.blue)+rn(190,214,288,160,-18)+`<circle cx="300" cy="140" r="22" fill="none" stroke="${COL.mk}" stroke-width="2.5" stroke-dasharray="4 4"/>`;
   return {s,l:['red:수비(베이스 밟고 받기)','blue:주자','ball','pass:베이스로 던지기','run:달리기 경주','base']}; },
 /* 티볼: 이어 던지기 · 베이스 돌기 릴레이 */
 tb_relay:o=>{ let s=diamond(); const {H,F,S,T:TT}=DIA;
   if(o.cut){ s+=[[340,40],[290,70],[240,100],[200,140]].map(([x,y])=>pl(x,y,COL.red)).join('')+bl(330,48)+ps(330,46,300,66)+ps(282,76,252,94)+ps(232,108,206,130)+ps(200,152,200,206)+sw(60,232)+pl(40,232,COL.obs);
     return {s,l:['red:이어 던지는 수비','obs:시간 재는 사람','ball','pass:이어 던지기','base']}; }
   s+=[[176,214],[160,226],[144,236]].map(([x,y])=>pl(x,y,COL.blue)).join('')+[[224,214],[240,226],[256,236]].map(([x,y])=>pl(x,y,COL.red)).join('')+`<path d="M204,212 L290,142 L206,64 L112,138 L190,214" fill="none" stroke="${COL.mk}" stroke-width="3" stroke-dasharray="2 9" stroke-linecap="round" marker-end="url(#y§)"/>`;
   return {s,l:['blue:한 팀','red:다른 팀','run:베이스 밟으며 한 바퀴','base']}; }
});

/* 범례 */
addLegend(()=>{
  const ex={
    tee:[SV.tee(17,14),'티'],
    base:[SV.base(17,11),'베이스']
  };
  return ex; });
