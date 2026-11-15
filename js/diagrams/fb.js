/* [프로그램] 대형 그림 틀 · 플로어볼
   이 종목 그림은 이 파일에만 있음. 다른 종목도 이 그림 이름을 빌려 쓸 수 있음
   그림 이름: fb_faceoff · fb_wall
   범례(그림 아래 설명)는 맨 아래 addLegend에 더함 */

Object.assign(TPL,{
 /* 플로어볼: 페이스오프(가운데에서 마주 서서 시작) */
 fb_faceoff:o=>{ let s=border(30,35,370,215)+ln(200,35,200,215)+`<circle cx="200" cy="125" r="36" fill="none" stroke="#fff" stroke-width="2.5" stroke-dasharray="6 5"/>`;
   s+=pl(176,125)+pl(224,125,COL.red)+bl(200,125)+pl(110,90)+pl(110,165)+pl(290,90,COL.red)+pl(290,165,COL.red)+ps(196,128,122,160);
   return {s,l:['blue:우리 편','red:상대','ball','pass:뒤 친구에게 보내기','mk2:3m 안에 들어가지 않기']}; },
 /* 플로어볼: 벽에 맞혀 되받기 */
 fb_wall:o=>{ let s=`<rect x="352" y="30" width="16" height="190" fill="rgba(255,255,255,.35)" stroke="#fff" stroke-width="2"/>`;
   [[110,70],[110,180]].forEach(([x,y])=>{ s+=pl(x,y,COL.mint)+bl(x+16,y+4)+ps(x+20,y+2,346,125)+ps(346,125,x+30,y+(y<125?16:-16)); });
   if(o.def) s+=pl(230,125,COL.red);
   return {s,l:['me','ball','pass:벽에 맞혀 되받기'].concat(o.def?['red:수비']:[])}; }
});

/* 범례 */
addLegend(()=>{
  const ex={
    fball:[FBALL(17,11,5.5),'플로어볼 공']
  };
  return ex; });
