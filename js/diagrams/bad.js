/* [프로그램] 대형 그림 틀 · 배드민턴
   이 종목 그림은 이 파일에만 있음. 다른 종목도 이 그림 이름을 빌려 쓸 수 있음
   그림 이름: bm_solo · bm_pair · bm_double
   범례(그림 아래 설명)는 맨 아래 addLegend에 더함 */

Object.assign(TPL,{
 bm_solo:o=>{ let s=mkBox(); [[100,90],[200,90],[300,90],[100,180],[200,180],[300,180]].forEach(([x,y])=>{ s+=pl(x,y,COL.mint)+SV.racket(x+14,y-8)+SV.shuttle(x+20,y-38)+`<path d="M${x+30},${y-20} v-16" stroke="${COL.mk}" stroke-width="2.5" marker-end="url(#y§)"/>`; }); return {s,l:['me','shuttle','run:위로 띄우기']}; },
 bm_pair:o=>{ let s=court()+pl(110,125)+SV.racket(124,117)+pl(290,125,COL.red)+SV.racket(276,117)+SV.shuttle(240,66)+arc2(130,112,270,112,60); return {s,l:['blue','red:상대','shuttle','pass2:주고받는 셔틀콕 길','net']}; },
 bm_double:o=>{ let s=court()+pl(150,80)+pl(95,170)+pl(255,85,COL.red)+pl(305,165,COL.red)+SV.racket(164,72)+SV.shuttle(232,52)+arc(166,70,290,150,70); return {s,l:['blue:우리 짝','red:상대','shuttle','pass:셔틀콕 길','net']}; }
});

/* 범례 */
addLegend(()=>{
  const ex={
    shuttle:[SV.shuttle(17,12),'셔틀콕'],
    racket:[RKT(17,16,30),'라켓']
  };
  return ex; });
