/* [프로그램] 대형 그림 틀 · 피클볼
   이 종목 그림은 이 파일에만 있음. 다른 종목도 이 그림 이름을 빌려 쓸 수 있음
   그림 이름: pk_solo · pk_carry · pk_pair · pk_target · pk_zones · pk_lines · pk_quad · pk_single · pk_double
   범례(그림 아래 설명)는 맨 아래 addLegend에 더함 */


/* ===== 피클볼 그림: 키친(네트 앞 노란 구역)이 있는 코트 · 패들 · 구멍 난 공 =====
   pk_solo 혼자(wall: 벽치기) · pk_carry 패들에 공 올리고 콘 돌기 · pk_pair 짝 주고받기(nonet 네트 없이 · side 좌우로 · vol 바로 치기 · deep 깊게)
   pk_target 표적(zone: kitchen 키친 · deep 뒤쪽 · serve 대각선 서브 · hoop 바닥 후프) · pk_zones 세 구역 · pk_lines 두 줄 번갈아
   pk_quad 네 칸 승진 · pk_single 1 대 1(narrow 좁은 코트) · pk_double 2 대 2(front 둘 다 키친 선) */
const PAD=(x,y,rot=30)=>`<g transform="translate(${x},${y}) rotate(${rot})"><rect x="-6" y="-17" width="12" height="15" rx="5" fill="#ff7a1a" stroke="#fff" stroke-width="1.6"/><line x1="0" y1="-2" x2="0" y2="7" stroke="#fff" stroke-width="3" stroke-linecap="round"/></g>`;
function pkCourt(o={}){
  if(o.nonet) return `<line x1="200" y1="40" x2="200" y2="210" stroke="#fff" stroke-width="2.5" stroke-dasharray="4 7"/>`;
  const x0=o.short?110:40, x1=o.short?290:360;
  return `<rect x="150" y="35" width="100" height="180" fill="rgba(255,212,59,.3)"/>`+border(x0,35,x1,215)+ln(150,35,150,215)+ln(250,35,250,215)+(o.short?'':ln(40,125,150,125)+ln(250,125,360,125))
    +`<text x="175" y="52" text-anchor="middle" fill="#fff" font-size="12" font-weight="800" font-family="Gothic A1,sans-serif">키친</text><text x="225" y="52" text-anchor="middle" fill="#fff" font-size="12" font-weight="800" font-family="Gothic A1,sans-serif">키친</text>`
    +`<line x1="200" y1="28" x2="200" y2="222" stroke="#fff" stroke-width="5"/><circle cx="200" cy="28" r="5" fill="#fff" stroke="${COL.ink}"/><circle cx="200" cy="222" r="5" fill="#fff" stroke="${COL.ink}"/>`;
}
const pkP=(x,y,c=COL.blue,face=1)=>pl(x,y,c)+PAD(x+face*14,y-8,face*30);
const PKL=(o={})=>o.nonet?['mk2:가운데 선','paddle']:['net','kitchen','paddle'];
Object.assign(TPL,{
 pk_solo:o=>{ let s='';
   if(o.wall){ s+=`<rect x="352" y="30" width="16" height="190" fill="rgba(255,255,255,.35)" stroke="#fff" stroke-width="2"/>`;
     [[230,70],[230,180]].forEach(([x,y])=>{ s+=mk(x,y+20)+pkP(x,y,COL.mint)+bl(x+30,y+2)+ps2(x+36,y,346,y); }); s+=pl(110,125,COL.obs);
     return {s,l:['me','obs:기다림','ball','pass2:벽에 치고 받기','paddle','wall']}; }
   s=mkBox(); [[100,90],[200,90],[300,90],[100,180],[200,180],[300,180]].forEach(([x,y])=>{ s+=pkP(x,y,COL.mint)+bl(x+16,y-40)+`<path d="M${x+16},${y-20} v-12" stroke="${COL.mk}" stroke-width="2.5" marker-end="url(#y§)" marker-start="url(#y§)"/>`; });
   return {s,l:['me','ball','tap:톡톡 튀기기','paddle']}; },
 pk_carry:o=>{ let s=ln(60,30,60,220); [70,180].forEach(y=>{ s+=pl(40,y,COL.obs)+pl(40,y+26>220?y-26:y+26,COL.obs)+cn(320,y)+pkP(130,y,COL.blue)+bl(144,y-14)+rn(150,y,300,y-18,-16)+rn(330,y+8,170,y+20,-16); });
   return {s,l:['blue:가는 사람','obs:기다림','ball:패들 위의 공','run:콘 돌아오기','cone','paddle']}; },
 pk_pair:o=>{ let s=pkCourt(o); const xa=o.nonet?120:o.vol?140:o.deep?70:132, xb=o.nonet?280:o.vol?260:o.deep?330:268;
   s+=pkP(xa,125,COL.mint)+pkP(xb,125,COL.blue,-1)+bl(xa+28,112);
   if(o.vol) s+=ps2(xa+20,118,xb-20,118); else s+=arc2(xa+22,110,xb-22,110,o.deep?60:34);
   if(o.side) s+=rn(xb,105,xb,60,-10)+rn(xb,145,xb,190,10);
   if(!o.nonet&&!o.deep) s+=mk(xb-22,150)+mk(xa+22,150);
   return {s,l:['me','blue:짝','ball',o.vol?'pass2:튀기 전에 바로 치기':'pass2:한 번 튀겨 주고받기'].concat(o.side?['run:좌우로 옮겨 받기']:[]).concat(PKL(o))}; },
 pk_target:o=>{ let s=pkCourt({nonet:o.zone==='hoop'});
   if(o.zone==='hoop'){ s=`<circle cx="270" cy="125" r="34" fill="rgba(255,255,255,.1)" stroke="${COL.mk}" stroke-width="4"/>`+pkP(110,125,COL.mint)+bl(136,114)+arc(138,110,262,118,40)+pl(60,70,COL.obs)+pl(60,180,COL.obs);
     return {s,l:['me','obs:기다림','ball','pass:살짝 밀어 보내기','ring','paddle']}; }
   if(o.zone==='serve'){ s+=`<rect x="250" y="35" width="110" height="90" fill="rgba(255,255,255,.18)" stroke="#fff" stroke-width="2" stroke-dasharray="6 5"/>`+pkP(26,170,COL.mint)+bl(48,160)+arc(52,156,318,82,46)+pl(20,215,COL.obs)+mk(330,70)+mk(300,95);
     return {s,l:['me:서브하는 사람','obs:기다림','ball','pass:대각선으로 서브','mk:표적','paddle','kitchen']}; }
   if(o.zone==='deep'){ s+=`<rect x="320" y="35" width="40" height="180" fill="rgba(255,255,255,.2)" stroke="#fff" stroke-width="2" stroke-dasharray="6 5"/><text x="340" y="232" text-anchor="middle" fill="#fff" font-size="12" font-weight="800" font-family="Gothic A1,sans-serif">깊게</text>`+pkP(110,125,COL.mint)+bl(138,112)+arc(140,108,334,96,64)+pl(70,70,COL.obs)+pl(70,180,COL.obs);
     return {s,l:['me','obs:기다림','ball','pass:뒤쪽 구역으로 깊게','paddle','net','kitchen']}; }
   s+=`<circle cx="226" cy="75" r="11" fill="none" stroke="${COL.mk}" stroke-width="3"/><circle cx="230" cy="125" r="15" fill="none" stroke="${COL.mk}" stroke-width="3"/>`+mk(226,178)+pkP(126,125,COL.mint)+bl(152,114)+arc(154,110,226,120,34)+pl(70,70,COL.obs)+pl(70,180,COL.obs);
   return {s,l:['me','obs:기다림','ball','pass:키친 안 표적에 살짝','ring:표적(후프·원 마커·양동이)','paddle','net','kitchen']}; },
 pk_zones:o=>{ let s=`<rect x="250" y="35" width="40" height="180" fill="rgba(255,212,59,.3)"/>`+border(250,35,370,215)+ln(290,35,290,215)+ln(330,35,330,215)+`<line x1="250" y1="28" x2="250" y2="222" stroke="#fff" stroke-width="5"/>`;
   [['키친','업',270],['가운데','가슴',310],['뒤쪽','다운',350]].forEach(([a,b,x])=>s+=`<text x="${x}" y="54" text-anchor="middle" fill="#fff" font-size="12" font-weight="800" font-family="Gothic A1,sans-serif">${a}</text><text x="${x}" y="206" text-anchor="middle" fill="${COL.mk}" font-size="12" font-weight="800" font-family="Gothic A1,sans-serif">${b}</text>`);
   s+=pkP(350,125,COL.mint)+rn(338,140,282,140,14)+pkP(150,90,COL.blue)+pkP(150,165,COL.blue)+pl(60,90,COL.obs)+pl(60,165,COL.obs);
   return {s,l:['me','blue:모둠','obs:기다림','run:구역 옮기며 높이 바꾸기','paddle','kitchen']}; },
 pk_lines:o=>{ let s=pkCourt({short:true}); s+=pkP(130,125,COL.blue)+pkP(270,125,COL.red,-1)+bl(156,112)+arc(158,108,248,108,30);
   [98,72,46].forEach(x=>s+=pl(x,125,COL.blue)); [302,328,354].forEach(x=>s+=pl(x,125,COL.red)); s+=rn(130,145,46,160,16)+rn(270,145,354,160,-16);
   return {s,l:['blue:우리 줄','red:건너편 줄','ball','pass:넘기기','run:치고 줄 뒤로','paddle','net','kitchen']}; },
 pk_quad:o=>{ let s=border(80,35,320,215)+ln(200,35,200,215)+ln(80,125,320,125);
   [[140,80,1],[260,80,2],[140,170,3],[260,170,4]].forEach(([x,y,n])=>s+=`<text x="${x+30}" y="${y-22}" fill="${n===4?COL.mk:'#fff'}" font-size="18" font-weight="900" font-family="Gothic A1,sans-serif">${n}${n===4?' 왕':''}</text>`+pkP(x,y,n===4?COL.mint:COL.blue));
   s+=bl(276,160)+arc(274,160,156,96,26)+[40,40,40].map((x,k)=>pl(x,120+k*30,COL.obs)).join('')+rn(140,104,58,112,10);
   return {s,l:['blue:칸 주인','me:4번 칸(왕)','obs:기다리는 줄','ball','pass:아무 칸으로 보내기','run:실수하면 줄 뒤로','paddle']}; },
 pk_single:o=>{ let s=pkCourt({short:o.short}); if(o.short){ s+=pkP(128,125,COL.blue)+pkP(272,125,COL.red,-1)+bl(154,112)+arc(156,108,248,108,30)+pl(40,90,COL.obs)+pl(40,160,COL.obs); return {s,l:['blue:나','red:상대','obs:기다림·판정','ball','pass2:키친에 튄 공만 넘기기','net','kitchen','paddle']}; }
   if(o.narrow) s+=`<rect x="40" y="35" width="320" height="90" fill="rgba(28,42,33,.35)"/>`;
   const y=o.narrow?170:125; s+=pkP(70,y,COL.blue)+pkP(330,y,COL.red,-1)+bl(98,y-12)+arc(100,y-16,300,y-16,50)+pl(20,232,COL.obs)+pl(50,232,COL.obs);
   return {s,l:['blue:나','red:상대','obs:기다림·판정','ball','pass2:주고받기'].concat(o.narrow?['shade']:[]).concat(['net','kitchen','paddle'])}; },
 pk_double:o=>{ let s=pkCourt(); const B=o.front?[[132,80],[132,170]]:[[70,80],[70,170]], R=o.front||o.both?[[268,80],[268,170]]:[[330,80],[330,170]];
   B.forEach(([x,y])=>s+=pkP(x,y,COL.blue)); R.forEach(([x,y])=>s+=pkP(x,y,COL.red,-1));
   s+=bl(B[0][0]+28,B[0][1]-12)+arc(B[0][0]+30,B[0][1]-16,R[1][0]-26,R[1][1]-10,o.front?30:50);
   if(o.run) s+=rn(70,80,120,80,-8)+rn(70,170,120,170,8);
   if(!o.front) s+=pl(24,236,COL.obs);
   return {s,l:['blue:우리 짝','red:상대','ball','pass:넘기기'].concat(o.run?['run:둘이 함께 앞으로']:[]).concat(['net','kitchen','paddle'])}; }
});

/* 범례 */
addLegend(()=>{
  const ex={
    paddle:[PAD(17,16,30),'패들'],
    pball:[PBALL(17,11,5.5),'피클볼 공'],
    kitchen:[`<rect x="5" y="3" width="24" height="16" fill="rgba(255,212,59,.45)" stroke="#fff"/>`,'키친(공중 공 치기 금지)'],
    wall:[`<rect x="13" y="2" width="8" height="18" fill="rgba(255,255,255,.6)" stroke="#fff"/>`,'벽'],
    shade:[`<rect x="5" y="3" width="24" height="16" fill="rgba(28,42,33,.55)" stroke="#fff"/>`,'어두운 쪽은 쓰지 않음']
  };
  return ex; });
