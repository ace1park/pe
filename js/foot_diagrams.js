/* [프로그램] 발로 하는 공놀이 대형 그림 틀 */
/* ===== 대형 그림 틀 (2~13·15~20차시) ===== */
const GKC='#ff9f1c';
function legendList(ids,u){
  const mini=(inner)=>`<svg viewBox="0 0 34 22" aria-hidden="true"><defs><marker id="lw${u}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#fff"/></marker><marker id="ly${u}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="${COL.mk}"/></marker></defs>${inner}</svg>`;
  const dot=c=>`<circle cx="17" cy="11" r="7" fill="${c}" stroke="#fff" stroke-width="2"/>`;
  const L={
    me:[dot(COL.mint),'나'], blue:[dot(COL.blue),'우리 편'], red:[dot(COL.red),'수비'], obs:[dot(COL.obs),'관찰·기다림'], gk:[dot(GKC),'골키퍼'],
    ball:[`<circle cx="17" cy="11" r="5" fill="#fff" stroke="${COL.ink}" stroke-width="1.5"/>`,'공'],
    pass:[`<line x1="4" y1="11" x2="27" y2="11" stroke="#fff" stroke-width="2.5" stroke-dasharray="5 4" marker-end="url(#lw${u})"/>`,'패스'],
    run:[`<path d="M4,15 Q17,2 28,12" fill="none" stroke="${COL.mk}" stroke-width="3" marker-end="url(#ly${u})"/>`,'달리기'],
    drib:[`<path d="M4,11 l4,-4 l4,8 l4,-8 l4,8 l4,-4 l3,0" fill="none" stroke="#fff" stroke-width="2" marker-end="url(#lw${u})"/>`,'공 몰기'],
    tap:[`<path d="M7,14 q10,-9 20,0" fill="none" stroke="${COL.mk}" stroke-width="2.5" marker-end="url(#ly${u})"/>`,'발로 톡톡'],
    cone:[`<polygon points="17,3 11,18 23,18" fill="${COL.cone}" stroke="#fff" stroke-width="1"/>`,'콘'],
    mk:[`<ellipse cx="17" cy="11" rx="7" ry="4.5" fill="${COL.mk}"/>`,'원 마커']
  };
  return `<ul class="legend2">${ids.map(id=>{const [k,lab]=id.split(':'); const it=L[k]; return it?`<li>${mini(it[0])}${lab||it[1]}</li>`:'';}).join('')}</ul>`;
}
const gkp=(x,y)=>pl(x,y,GKC);
const goalR=(x,y,h=50)=>{ const line=x<200?x+10:x, back=x<200?x:x+10, top=y-h/2; let net=''; for(let k=1;k<5;k++) net+=`<line x1="${Math.min(line,back)}" y1="${top+h*k/5}" x2="${Math.max(line,back)}" y2="${top+h*k/5}" stroke="#fff" stroke-opacity=".6" stroke-width="1"/>`;
  return `<path d="M${line},${top} H${back} V${top+h} H${line}" fill="rgba(255,255,255,.18)" stroke="#fff" stroke-width="2"/>${net}<circle cx="${line}" cy="${top}" r="3.6" fill="#fff" stroke="${COL.ink}" stroke-width="1.2"/><circle cx="${line}" cy="${top+h}" r="3.6" fill="#fff" stroke="${COL.ink}" stroke-width="1.2"/>`; };
const goalC=(x,y,h=40)=>cn(x,y-h/2)+cn(x,y+h/2);
const border=(x1,y1,x2,y2)=>ln(x1,y1,x2,y1)+ln(x1,y2,x2,y2)+ln(x1,y1,x1,y2)+ln(x2,y1,x2,y2);
const mkBox=()=>{let s='';for(let x=40;x<=360;x+=80){s+=mk(x,28)+mk(x,222);} for(let y=28;y<=222;y+=64.6){s+=mk(40,y)+mk(360,y);} return s;};
const TPL={
 grid:o=>{ let s=mkBox(); if(o.mid) s+=ln(200,28,200,222)+`<circle cx="120" cy="125" r="26" fill="none" stroke="#fff" stroke-width="5" opacity=".7"/><path d="M262,99 l52,52 M314,99 l-52,52" stroke="#fff" stroke-width="5" opacity=".7"/>`;
   if(o.cones) [[90,60],[150,200],[250,150],[320,70],[200,95],[300,205]].forEach(([x,y],k)=>{ s+= k%2? `<polygon points="${x-8},${y-6} ${x+8},${y-6} ${x},${y+9}" fill="${COL.cone}" stroke="#fff" stroke-width="1.5"/>` : cn(x,y); });
   if(o.gates) [[110,70],[290,70],[200,125],[110,185],[290,185]].forEach(([x,y])=>s+=cn(x-14,y)+cn(x+14,y));
   if(o.zone) s+=zn(170,28,60,194,'rgba(255,255,255,.16)');
   [[90,110,130,90],[160,175,200,200],[250,75,285,55],[300,160,330,190],[130,55,170,40]].forEach(([x,y,x2,y2],k)=>{ if(o.mid&&k===4) return; s+=pl(x,y,COL.mint)+bl(x+14,y+8)+dr(x+20,y+10,x2+18,y2+12,3,3); });
   (o.red||[]).forEach(([x,y])=>s+=pl(x,y,COL.red));
   if(o.light) s+=`<rect x="330" y="36" width="22" height="58" rx="6" fill="${COL.ink}"/><circle cx="341" cy="48" r="6" fill="#ff5a4f"/><circle cx="341" cy="65" r="6" fill="${COL.mk}"/><circle cx="341" cy="82" r="6" fill="#4cd07d"/>`;
   return {s, l:['me','ball','drib'].concat(o.red?['red:'+(o.redLab||'수비')]:[]).concat(o.cones||o.gates?['cone']:[]) }; },
 lane:o=>{ let s=ln(60,25,60,225)+ln(340,25,340,225);
   if(o.zones) s+=cn(160,40)+cn(160,210)+cn(280,40)+cn(280,210)+`<line x1="160" y1="40" x2="160" y2="210" stroke="#fff" stroke-dasharray="4 6" opacity=".6"/><line x1="280" y1="40" x2="280" y2="210" stroke="#fff" stroke-dasharray="4 6" opacity=".6"/>`;
   if(o.tagger){ s+=pl(365,125,COL.red); [60,100,150,195].forEach((y,k)=>{ const x=110+k*35; s+=pl(x,y,COL.mint)+bl(x+16,y+4)+dr(x+24,y+4,x+60,y+4,3,2); }); return {s,l:['me','red:술래','ball','drib']}; }
   if(o.parallel){ s+=pl(90,80,COL.mint)+pl(90,170,COL.mint)+bl(106,86)+rn(90,80,300,80,0)+rn(90,170,300,170,0)+ps(108,90,230,165,4); return {s,l:['me','ball','pass','run']}; }
   if(o.pass){ s+=pl(80,90,COL.mint)+bl(96,96)+dr(100,96,180,96,4,3)+pl(250,160,COL.mint)+ps(190,100,240,152); return {s,l:['me','ball','drib','pass']}; }
   [60,120,190].forEach(y=>{ s+=pl(60,y,COL.mint)+bl(80,y)+dr(92,y,322,y,o.zones?2:5,o.zones?3:5); });
   if(o.turn) s+=`<path d="M322,60 q20,0 20,20 q0,20 -20,20" fill="none" stroke="${COL.mk}" stroke-width="3.5" marker-end="url(#y§)"/>`;
   return {s,l:['me','ball','drib'].concat(o.zones?['cone']:[]).concat(o.turn?['run:끌어 돌기']:[])}; },
 spots:o=>{ let s=''; [[90,95],[200,95],[310,95],[90,190],[200,190],[310,190]].forEach(([x,y])=>{ s+=mk(x,y+22)+pl(x,y,COL.mint)+bl(x,y+22);
     if(o.up) s+=`<path d="M${x+16},${y+20} v-34" stroke="${COL.mk}" stroke-width="3" marker-end="url(#y§)"/>`;
     if(o.cone){ s+=cn(x,y-40)+rn(x,y-14,x+26,y-56,-10); } }); return {s,l:['me','ball'].concat(o.up?['run:차올리기']:[]).concat(o.cone?['cone','run:속이고 빠지기']:[])}; },
 circle:o=>{ let s=ring(200,125,86); const P=[[200,39],[286,125],[200,211],[114,125]]; P.forEach(([x,y])=>s+=pl(x,y,o.c||COL.mint));
   if(o.lift) P.forEach(([x,y])=>s+=bl(x,y+20)+`<path d="M${x+14},${y+18} v-26" stroke="${COL.mk}" stroke-width="3" marker-end="url(#y§)"/>`);
   else s+=bl(214,52)+ps(200,39,114,125)+ps(114,125,286,125)+ps(286,125,200,211);
   return {s,l:o.lift?['me','ball','run:차올리기']:['me','ball','pass']}; },
 pairs:o=>{ let s=''; const ys=[55,125,195], xl=o.long?50:90, xr=o.long?350:310;
   ys.forEach((y,k)=>{ s+=pl(xl,y,o.mirror?COL.blue:COL.mint);
     if(o.gk){ s+=goalC(xr+18,y,44)+gkp(xr,y)+bl(xl+18,y+6)+ps(xl+22,y,xr,y); return; }
     s+=pl(xr,y,o.catchr?COL.obs:(o.mirror?COL.red:COL.mint));
     if(o.gate) s+=cn(200,y-14)+cn(200,y+14);
     if(o.mirror){ s+=`<path d="M${xl},${y-20} h-0" />`+rn(xl,y,xl,y-30,14)+rn(xr,y,xr,y-30,-14); return; }
     if(o.catchr){ s+=`<path d="M${xr-14},${y-8} Q200,${y-55} ${xl+16},${y-8}" fill="none" stroke="#fff" stroke-width="2.5" stroke-dasharray="4 5" marker-end="url(#w§)"/>`+bl(xl+20,y-10); return; }
     if(o.roll){ s+=ps(xr-16,y,xl+16,y)+bl(xr-22,y+8); return; }
     s+=bl(xl+18,y+6)+ps(xl+22,y,xr,y); });
   const l= o.gk?['me','gk','ball','pass']: o.mirror?['blue:공격','red','run:옆걸음']: o.catchr?['me','obs:던져 주는 친구','ball','pass:던지기']: o.roll?['me','ball','pass:굴려 주기']:['me','ball','pass'];
   if(o.gate) l.push('cone'); return {s,l}; },
 net:o=>{ let s=border(40,40,360,210)+`<line x1="200" y1="40" x2="200" y2="210" stroke="#fff" stroke-width="5"/>`;
   s+=pl(110,90)+pl(120,170)+pl(280,85,COL.red)+pl(290,165,COL.red)+bl(134,170)+`<path d="M134,165 Q200,70 270,150" fill="none" stroke="#fff" stroke-width="2.5" stroke-dasharray="6 5" marker-end="url(#w§)"/>`;
   return {s,l:['blue','red:상대','ball','pass:넘기기']}; },
 circle1v1:o=>{ let s=''; [[110,125],[290,125]].forEach(([x,y])=>{ s+=ring(x,y,75)+pl(x-12,y,COL.blue)+bl(x-32,y+6)+pl(x+28,y-10,COL.red); }); return {s,l:['blue:지키는 사람','red:빼내는 사람','ball']}; },
 zigzag:o=>{ let s=''; const cx=[120,160,200,240,280,320]; cx.forEach((x,k)=>s+=cn(x,k%2?95:135));
   s+=`<path d="M70,115 C95,160 110,150 140,115 S180,70 180,115 S220,160 220,115 S260,70 260,115 S300,160 300,115" fill="none" stroke="#fff" stroke-width="2.5" marker-end="url(#w§)"/>`;
   s+=pl(55,115,COL.mint)+bl(72,115); if(o.queue) s+=pl(25,160,COL.obs)+pl(55,165,COL.obs);
   if(o.relay) s+=rn(320,180,70,180,0);
   if(o.circuit) s+=ln(300,200,360,200)+ring(372,115,14);
   return {s,l:['me','ball','drib','cone'].concat(o.queue?['obs:기다림']:[]).concat(o.relay?['run:돌아오기']:[])}; },
 eight:o=>{ let s=cn(130,125)+cn(270,125)+`<path d="M200,125 C240,60 310,70 300,125 C290,180 240,190 200,125 C160,60 90,70 100,125 C110,180 160,190 200,125" fill="none" stroke="#fff" stroke-width="2.5" marker-end="url(#w§)"/>`+pl(200,100,COL.mint)+bl(214,112)+pl(60,200,COL.obs);
   return {s,l:['me','obs:세는 친구','ball','drib','cone']}; },
 lane1v1:o=>{ let s=border(50,60,350,190); if(o.gates) s+=cn(350,95)+cn(350,125)+cn(350,155)+cn(350,185); else s+=ln(350,60,350,190);
   if(o.back) s+=cn(50,105)+cn(50,145);
   s+=pl(90,125)+bl(108,130)+pl(220,125,COL.red)+rn(90,125,330,100,40);
   if(o.back) s+=rn(220,125,62,125,-30);
   return {s,l:['blue:공격','red','ball','run'].concat(o.gates||o.back?['cone']:[])}; },
 treasure:o=>{ let s=mkBox(); [[60,48,VESTS[0][1]],[340,48,VESTS[1][1]],[60,202,VESTS[2][1]],[340,202,VESTS[3][1]]].forEach(([x,y,c])=>s+=`<circle cx="${x}" cy="${y}" r="22" fill="${c}" opacity=".45" stroke="#fff" stroke-width="2"/>`);
   [[192,118],[208,118],[200,132],[186,132],[214,132]].forEach(([x,y])=>s+=bl(x,y,5));
   s+=pl(150,95,VESTS[0][1])+bl(136,86)+dr(130,84,72,56,3,3)+pl(250,160,VESTS[3][1])+bl(266,170)+dr(272,172,328,196,3,3)+pl(250,90,VESTS[1][1])+pl(150,160,VESTS[2][1]);
   return {s,l:['blue:각 팀','ball','drib']}; },
 bowling:o=>{ let s=ln(60,30,60,220);
   if(o.goal){ s+=goalR(340,125,110); if(o.corners) s+=cn(334,80)+cn(334,170); }
   else if(o.dist) [[150,2],[240,3],[330,4]].forEach(([x,n])=>{ for(let k=0;k<n;k++) s+=cn(x,125-((n-1)*12)+k*24); });
   else [[300,125],[318,113],[318,137],[336,101],[336,125],[336,149]].forEach(([x,y])=>s+=cn(x,y));
   if(o.lines) [[160,'5'],[220,'8'],[280,'11']].forEach(([x])=>s+=`<line x1="${x}" y1="40" x2="${x}" y2="210" stroke="#fff" stroke-dasharray="6 6" opacity=".6"/>`);
   s+=pl(40,125,COL.mint)+bl(78,125)+ps(84,125,o.goal?330:(o.dist?230:290),o.goal?(o.corners?82:125):125,12)+pl(30,175,COL.obs)+pl(30,75,COL.obs);
   return {s,l:['me','obs:기다림','ball','pass:차기','cone']}; },
 shuttle:o=>{ let s=''; [70,45,20].forEach(x=>s+=pl(x,125,x===70?COL.mint:COL.obs)); [330,355,380].forEach(x=>s+=pl(x,125,x===330?COL.mint:COL.obs));
   s+=bl(88,130)+ps(90,120,312,120)+rn(70,140,380,165,-40); return {s,l:['me','obs:기다림','ball','pass','run:패스하고 따라가기']}; },
 middle:o=>{ let s=pl(60,125,COL.mint)+pl(340,125,COL.mint)+pl(200,125,COL.blue)+bl(78,130)+ps(80,125,182,125)+`<path d="M200,98 a27,27 0 1,1 -26,20" fill="none" stroke="${COL.mk}" stroke-width="3.5" marker-end="url(#y§)"/>`+ps(218,125,322,125)+pl(60,205,COL.obs);
   return {s,l:['me:끝 친구','blue:가운데','obs:기다림','ball','pass','run:몸 돌리기']}; },
 square:o=>{ let s=mk(110,45)+mk(290,45)+mk(290,205)+mk(110,205); [[110,45],[290,45],[290,205],[110,205]].forEach(([x,y])=>s+=pl(x,y,COL.mint)); s+=bl(126,52)+ps(110,45,290,45)+ps(290,45,290,205)+ps(290,205,110,205);
   return {s,l:['me','ball','pass','mk']}; },
 rondo:o=>{ let s=''; [[110,40],[290,40],[110,210],[290,210]].forEach(([x,y])=>s+=mk(x,y)); const A=[[200,52],[124,125],[276,125],[200,198]].slice(0,o.a||3); A.forEach(([x,y])=>s+=pl(x,y));
   (o.r===2?[[180,112],[222,145]]:[[205,125]]).forEach(([x,y])=>s+=pl(x,y,COL.red)); s+=bl(140,132)+ps(140,122,200,52)+ps(200,52,276,125);
   return {s,l:['blue','red','ball','pass','mk']}; },
 triangle:o=>{ let s=cn(90,200)+cn(310,200)+cn(200,45); s+=pl(90,180,COL.mint)+pl(310,180,COL.mint)+pl(200,65,COL.mint)+pl(70,210,COL.obs)+bl(108,186)+dr(112,182,190,190,3,3)+ps(200,190,295,182,16)+rn(110,205,325,215,-12);
   return {s,l:['me','obs:기다림','ball','drib','pass','cone']}; },
 game:o=>{ let s=border(30,30,370,220)+ln(200,30,200,220);
   if(o.four) s+=goalC(30,80,36)+goalC(30,170,36)+goalC(370,80,36)+goalC(370,170,36);
   else if(o.cones) [[45,70],[45,125],[45,180],[355,70],[355,125],[355,180]].forEach(([x,y])=>s+=cn(x,y));
   else if(!o.noGoal) s+=goalR(20,125,60)+goalR(370,125,60);
   const nb=o.n||3, B=[[150,95],[110,165],[250,60],[90,90],[170,190]].slice(0,nb), R=[[235,115],[290,170],[300,85],[320,130],[250,195]].slice(0,nb);
   B.forEach(([x,y])=>s+=pl(x,y)); R.forEach(([x,y])=>s+=pl(x,y,COL.red));
   if(o.gk) s+=gkp(48,125)+gkp(352,125);
   if(o.side){ for(let k=0;k<4;k++){ s+=pl(70+k*40,12,COL.obs)+pl(70+k*40,238,COL.obs);} }
   if(o.waves){ s+=pl(8,30,COL.obs)+pl(8,55,COL.obs)+pl(392,195,COL.obs)+pl(392,220,COL.obs); }
   s+=bl(166,101)+ps(166,95,250,60)+rn(110,165,250,175,30);
   return {s,l:['blue','red:상대','ball','pass','run'].concat(o.gk?['gk']:[]).concat(o.side||o.waves?['obs:기다림']:[]).concat(o.four||o.cones?['cone']:[])}; },
 shoot:o=>{ let s=goalR(370,125,o.wide?120:90)+ln(250,30,250,220);
   if(o.gk) s+=gkp(352,125);
   if(o.two){ s+=pl(120,90)+bl(136,96)+pl(140,170)+pl(230,120,COL.red)+ps(138,100,260,165)+rn(140,170,270,170,-20)+ps(270,165,362,140,8); if(o.three) s+=pl(90,125)+pl(260,70,COL.red); return {s,l:['blue','red','ball','pass','run']}; }
   if(o.side){ s+=pl(230,215,COL.blue)+bl(246,210)+ps(240,205,240,135)+pl(230,125,COL.mint)+ps(250,125,358,110,8)+pl(150,125,COL.obs); return {s,l:['blue:패스하는 친구','me','obs:기다림','ball','pass']}; }
   if(o.drib){ s+=pl(60,125,COL.mint)+bl(78,128)+dr(84,128,220,128,4,4)+cn(232,128)+ps(244,128,358,118,8)+pl(30,175,COL.obs); return {s,l:['me','obs:기다림','ball','drib','pass:슛','cone']}; }
   s+=pl(210,125,COL.mint)+bl(230,128)+ps(236,126,358,95,8)+pl(330,215,COL.obs)+pl(150,100,COL.obs)+pl(150,150,COL.obs);
   return {s,l:['me','ball','pass:슛'].concat(o.gk?['gk']:[]).concat(['obs:기다림'])}; },
 press:o=>{ let s=border(70,30,330,220)+goalC(70,125,50)+goalC(330,125,50);
   s+=pl(140,90)+bl(156,96)+pl(160,185)+pl(200,110,COL.red)+pl(240,170,COL.red)+rn(240,150,214,118,-10)+rn(200,110,165,98,0);
   return {s,l:['blue:공격','red:수비','ball','run:다가가기·받치기','cone']}; },
 kickin:o=>{ let s=border(30,30,370,220)+ln(200,30,200,220); s+=pl(180,220,COL.blue)+bl(198,214)+pl(150,140)+rn(150,140,240,150,-30)+ps(198,212,246,158)+(o.def?pl(210,175,COL.red):'');
   return {s,l:['blue','ball','pass:다시 시작','run'].concat(o.def?['red:상대']:[])}; },
 shape:o=>{ let s=ln(30,30,370,30)+ln(30,220,370,220)+ln(30,30,30,220)+ln(370,30,370,220)+ln(200,30,200,220)+goalR(20,125,60);
   s+=gkp(50,125)+pl(120,75)+pl(120,175)+pl(220,90)+pl(220,160);
   if(o.gk){ s+=bl(66,128)+ps(62,128,108,170)+ps(132,170,210,165); return {s,l:['gk','blue','ball','pass']}; }
   s+=bl(300,200,7)+[[120,75],[120,175],[220,90],[220,160]].map(([x,y])=>rn(x,y,x+40,y+18,-10)).join('');
   return {s,l:['gk','blue','ball','run:함께 이동']}; },
 stations:o=>{ let s=''; const B=[[30,40],[150,40],[270,40],[90,140],[210,140]].slice(0,o.n||3);
   B.forEach(([x,y],k)=>{ s+=`<rect x="${x}" y="${y}" width="100" height="74" rx="12" fill="rgba(255,255,255,.16)" stroke="#fff" stroke-width="2.5"/>`;
     const icon=k%3===0? cn(x+30,y+40)+cn(x+50,y+30)+cn(x+70,y+40) : k%3===1? pl(x+25,y+37,COL.mint)+pl(x+78,y+37,COL.mint)+`<line x1="${x+40}" y1="${y+37}" x2="${x+62}" y2="${y+37}" stroke="#fff" stroke-width="2.5" stroke-dasharray="4 4"/>` : goalR(x+80,y+37,40)+bl(x+34,y+40);
     s+=icon; });
   for(let k=0;k<B.length-1;k++){ const [x,y]=B[k],[x2,y2]=B[k+1]; s+=rn(x+100,y+37,x2,y2+37,-12); }
   return {s,l:['me','ball','cone','run:다음 자리']}; }
};

