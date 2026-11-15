/* [프로그램] 대형 그림 틀 · 츄크볼
   이 종목 그림은 이 파일에만 있음. 다른 종목도 이 그림 이름을 빌려 쓸 수 있음
   그림 이름: gen_bounder · gen_bounder_court · gen_bounder_two
   범례(그림 아래 설명)는 맨 아래 addLegend에 더함 */


/* ===== 튀는 골대(바운더) 그림: 츄크볼처럼 탄력 그물에 맞혀 튀어 나오게 하는 종목 =====
   gen_bounder 슛·받기 연습 · gen_bounder_court 원네트 경기 · gen_bounder_two 투네트 경기 */
const BND=(x,y,dir=-1)=>{ const w=13, h=30; return `<g transform="translate(${x},${y})"><polygon points="0,${-h} ${dir*w},${-h+6} ${dir*w},${h-6} 0,${h}" fill="rgba(255,255,255,.25)" stroke="#fff" stroke-width="3"/>`+
  [-18,-6,6,18].map(v=>`<line x1="0" y1="${v}" x2="${dir*w}" y2="${v*0.8}" stroke="#fff" stroke-opacity=".6" stroke-width="1.2"/>`).join('')+`<line x1="${dir*w*.5}" y1="${-h+3}" x2="${dir*w*.5}" y2="${h-3}" stroke="#fff" stroke-opacity=".6" stroke-width="1.2"/></g>`; };
const NOGO=(x,y,r=46,dir=-1)=>`<path d="M${x},${y-r} A${r},${r} 0 0,${dir<0?0:1} ${x},${y+r}" fill="rgba(217,67,58,.22)" stroke="${COL.mk}" stroke-width="2.5" stroke-dasharray="5 4"/>`;
const BTXT=(x,y,t)=>`<text x="${x}" y="${y}" fill="#fff" font-size="12" font-weight="800" text-anchor="middle" font-family="Gothic A1,sans-serif">${t}</text>`;
const BOUNCE=(x1,y1,x2,y2)=>`<path d="M${x1},${y1} Q${(x1+x2)/2+(y2-y1)*.15},${Math.min(y1,y2)-26} ${x2},${y2}" fill="none" stroke="${COL.mk}" stroke-width="3" marker-end="url(#y§)"/>`;
Object.assign(TPL,{
 gen_bounder:o=>{ let s=border(30,35,370,215)+NOGO(352,125)+BND(352,125)+BTXT(318,58,'바운더')+BTXT(296,212,'금지 구역');
   s+=pl(150,125,COL.mint)+bl(166,130)+ps(170,125,326,125)+BOUNCE(330,118,230,62)+BOUNCE(330,132,240,190)+BOUNCE(330,125,250,125);
   s+=pl(218,58)+pl(226,194)+pl(236,125)+pl(70,85,COL.obs)+pl(70,165,COL.obs);
   return {s,l:['me:슛하는 사람','blue:받는 사람','obs:기다림','ball','pass:슛','run:튀는 공']}; },
 gen_bounder_court:o=>{ let s=border(30,35,370,215)+NOGO(352,125)+BND(352,125)+BTXT(296,212,'금지 구역');
   [[90,80],[120,175],[200,110]].forEach(([x,y])=>s+=pl(x,y)); [[255,70],[262,125],[255,182],[170,190]].forEach(([x,y])=>s+=pl(x,y,COL.red));
   s+=bl(104,86)+ps(104,90,116,158)+ps(134,170,188,120)+ps(214,112,326,124)+BOUNCE(330,120,262,100);
   return {s,l:['blue:공격','red:수비(자리만)','ball','pass:이어주기·슛','run:튀는 공']}; },
 gen_bounder_two:o=>{ let s=border(30,35,370,215)+ln(200,35,200,215)+NOGO(48,125,40,1)+BND(48,125,1)+NOGO(352,125,40)+BND(352,125)+BTXT(200,28,'센터라인');
   [[120,80],[160,170],[240,110],[290,180]].forEach(([x,y])=>s+=pl(x,y)); [[110,150],[200,70],[275,70],[300,135]].forEach(([x,y])=>s+=pl(x,y,COL.red));
   s+=bl(134,86)+ps(134,90,156,158)+ps(174,166,230,118)+ps(252,112,328,124)+BOUNCE(330,118,300,150);
   return {s,l:['blue:공격','red:수비(자리만)','ball','pass:이어주기·슛','run:튀는 공']}; }
});
