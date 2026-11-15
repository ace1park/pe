/* [프로그램] 대형 그림 틀 · 술래잡기
   이 종목 그림은 이 파일에만 있음. 다른 종목도 이 그림 이름을 빌려 쓸 수 있음
   그림 이름: tg_free · tg_tag · tg_slide · tg_flip · tg_plank · tg_kho · tg_tail · tg_corner · tg_border
   범례(그림 아래 설명)는 맨 아래 addLegend에 더함 */


/* ===== 술래잡기(오늘 뭐하지?) 그림 =====
   tg_free 흩어져 움직이기 · tg_tag 술래 쫓기 · tg_slide 빈백 바닥 밀기 · tg_flip 빈백 뒤집기 · tg_plank 엎드려 하이파이브
   tg_kho 스틱 교대 술래 · tg_tail 꼬리잡기 · tg_corner 네 모서리 기지 · tg_border 가운데 선 돌파 */
const TAIL=(x,y)=>`<path d="M${x+6},${y+8} q8,6 3,16" fill="none" stroke="${COL.mk}" stroke-width="4" stroke-linecap="round"/>`;
const STICK=(x,y)=>`<rect x="${x-2.5}" y="${y-18}" width="5" height="22" rx="2.5" fill="#29c4e8" stroke="#fff" stroke-width="1.2" transform="rotate(30 ${x} ${y})"/>`;
const DOLL=(x,y)=>`<g><ellipse cx="${x-3}" cy="${y-10}" rx="2.6" ry="6" fill="#fff" stroke="${COL.ink}" stroke-width="1"/><ellipse cx="${x+3}" cy="${y-10}" rx="2.6" ry="6" fill="#fff" stroke="${COL.ink}" stroke-width="1"/><circle cx="${x}" cy="${y-2}" r="5" fill="#fff" stroke="${COL.ink}" stroke-width="1.2"/></g>`;
const EARS=(x,y)=>`<path d="M${x-6},${y-12} l-3,-12 M${x+6},${y-12} l3,-12" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`;
const BAG2=(x,y,c)=>`<rect x="${x-8}" y="${y-6}" width="16" height="12" rx="4" fill="${c}" stroke="#fff" stroke-width="1.5"/>`;
const RPS=(x,y)=>`<g><rect x="${x-26}" y="${y-9}" width="52" height="18" rx="9" fill="#fff" stroke="${COL.ink}" stroke-width="1.2"/>${T(x,y+4,'가위바위보',COL.ink,10)}</g>`;
const FLIP=(x,y)=>`<path d="M${x-10},${y-12} a10,10 0 1,1 12,14" fill="none" stroke="#fff" stroke-width="2.2" marker-end="url(#w§)"/>`;
const CHARGE=(x,y,w=78,h=50)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="rgba(255,212,59,.28)" stroke="${COL.mk}" stroke-width="2" stroke-dasharray="5 4"/>`+T(x+w/2,y+h/2+4,'체력충전소',COL.mk,11);
const FIELD=()=>cn(24,24)+cn(376,24)+cn(24,226)+cn(376,226)+`<rect x="24" y="24" width="352" height="202" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="2" stroke-dasharray="6 6"/>`;
const SP=[[70,70],[160,55],[250,80],[340,60],[95,150],[200,135],[300,150],[60,205],[170,200],[280,205],[350,195]];
Object.assign(TPL,{
 tg_free:o=>{ let s=o.field?FIELD():mkBox(); const P=SP.slice(0,o.pair?6:9);
   if(o.pair){ P.forEach(([x,y],k)=>{ s+=pl(x,y,COL.mint)+pl(x-26,y+16,COL.blue)+rn(x+12,y,x+46,y+(k%2?22:-22),-10); }); return {s,l:['me:앞 친구','blue:따라가는 친구','run:방향 바꿔 달리기']}; }
   P.forEach(([x,y],k)=>{ s+=pl(x,y,COL.mint);
     if(o.obj==='bag') s+=XB.bag(x+16,y-12,5.5);
     if(o.tail) s+=TAIL(x,y);
     if(o.hop) s+=EARS(x,y)+`<path d="M${x-10},${y+20} q10,-12 20,0" fill="none" stroke="${COL.mk}" stroke-width="2.4" marker-end="url(#y§)"/>`;
     else if(o.stop) s+=`<circle cx="${x}" cy="${y}" r="24" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="1.5" stroke-dasharray="3 4"/>`;
     else if(!o.rps) s+=rn(x+14,y+4,x+44,y+(k%2?24:-18),-12); });
   if(o.rps) [[150,110],[280,175]].forEach(([x,y])=>s+=pl(x-16,y,COL.mint)+pl(x+16,y,COL.blue)+RPS(x,y-26));
   return {s,l:['me'].concat(o.rps?['blue:만난 친구','rps:만나면 가위바위보']:o.hop?['run:토끼처럼 깡충']:o.stop?['mk2:둘레 1m 비우기']:['run:흩어져 움직이기']).concat(o.obj==='bag'?['x_bag:양면 빈백']:[]).concat(o.tail?['tail:꼬리']:[])}; },
 tg_tag:o=>{ let s=mkBox();
   if(o.m==='pair'){ [[90,80],[260,80],[90,180],[260,180]].forEach(([x,y])=>{ s+=pl(x,y,COL.red)+(o.obj==='stick'?STICK(x+14,y-6):'')+pl(x+70,y,COL.blue)+`<path d="M${x+20},${y} H${x+54}" stroke="#fff" stroke-width="2.2" stroke-dasharray="3 4" marker-end="url(#w§)"/>`; });
     return {s,l:['red:대는 사람','blue:짝'].concat(o.obj==='stick'?['stick:플레이스틱(어깨 아래 톡)']:['run:손바닥으로 등 톡'])}; }
   const R=[[130,100],[270,160],[300,70]], B=[[70,60],[190,60],[350,120],[90,190],[200,200],[330,210],[220,120]];
   R.forEach(([x,y])=>{ s+=pl(x,y,COL.red)+(o.obj==='bag'?XB.bag(x+16,y-12,5.5):o.obj==='stick'?STICK(x+15,y-6):''); });
   B.forEach(([x,y],k)=>{ if(o.rescue&&k===4){ s+=pl(x,y,COL.obs)+EARS(x,y); return; } s+=pl(x,y,COL.blue); });
   s+=rn(144,96,186,70,-10)+rn(70,74,46,110,10)+rn(256,160,214,194,10)+rn(330,206,368,170,-10);
   if(o.rescue) s+=YP(150,206)+DOLL(150,190)+rn(166,206,186,204,-6);
   return {s,l:['red:술래','blue:피하는 친구'].concat(o.rescue?['obs:잡힌 친구(토끼 귀)','mk3:구조대']:[]).concat(o.obj==='bag'?['x_bag:술래가 든 빈백']:o.obj==='stick'?['stick:플레이스틱']:[]).concat(o.rescue?['doll:토끼 인형']:[]).concat(['run:피해 달리기'])}; },
 tg_slide:o=>{ let s=mkBox();
   if(o.pair){ [[70,70],[70,180],[230,70],[230,180]].forEach(([x,y])=>{ s+=pl(x,y,COL.mint)+XB.bag(x+20,y+10,5.5)+`<path d="M${x+28},${y+12} H${x+100}" stroke="#fff" stroke-width="2.2" stroke-dasharray="2 4" marker-end="url(#w§)"/>`+pl(x+118,y,COL.blue)+(o.jump?`<path d="M${x+108},${y-16} q10,-16 20,0" fill="none" stroke="${COL.mk}" stroke-width="2.4" marker-end="url(#y§)"/>`:''); });
     return {s,l:['me:미는 사람','blue:짝','x_bag:빈백','pass:바닥으로 밀기'].concat(o.jump?['run:두 발 모아 폴짝']:[])}; }
   if(o.lanes){ s+=ln(40,40,360,40)+ln(40,210,360,210); [70,130,190,250,310].forEach((x,k)=>{ s+=pl(x,22,COL.red)+pl(x+20,228,COL.red); if(k%2===0) s+=XB.bag(x,48,5)+`<path d="M${x},56 L${x+14},118" stroke="#fff" stroke-width="2" stroke-dasharray="2 4" marker-end="url(#w§)"/>`; });
     [[60,125],[150,140],[240,115],[330,135]].forEach(([x,y])=>s+=pl(x,y,COL.blue)+rn(x+12,y,x+40,y,0));
     return {s,l:['red:옆줄에서 미는 팀','blue:건너는 팀','x_bag:빈백','pass:바닥으로 밀기','run:건너가기']}; }
   SP.slice(0,9).forEach(([x,y],k)=>{ s+=pl(x,y,COL.mint); if(k%3===0) s+=XB.bag(x+18,y+12,5.5)+`<path d="M${x+26},${y+14} l38,${k%2?14:-10}" stroke="#fff" stroke-width="2" stroke-dasharray="2 4" marker-end="url(#w§)"/>`; else s+=XB.bag(x-16,y-12,5); });
   return {s,l:['me','x_bag:1인 1빈백','pass:발 쪽으로 바닥 밀기']}; },
 tg_flip:o=>{ let s=mkBox(); [[80,60,1],[150,95,0],[220,55,1],[300,90,0],[340,170,1],[260,140,0],[180,180,1],[100,150,0],[60,205,1],[300,205,0],[200,120,1]].forEach(([x,y,c])=>s+=BAG2(x,y,c?COL.blue:COL.red));
   if(o.rps){ [[130,125],[280,60]].forEach(([x,y])=>s+=(o.low?`<rect x="${x-34}" y="${y-6}" width="28" height="12" rx="6" fill="${COL.blue}" opacity=".6"/><rect x="${x+6}" y="${y-6}" width="28" height="12" rx="6" fill="${COL.red}" opacity=".6"/>`:'')+pl(x-18,y,COL.blue)+pl(x+18,y,COL.red)+RPS(x,y-24)); s+=FLIP(150,95);
     return {s,l:['blue:파랑 팀','red:빨강 팀'].concat(o.low?['mk2:엎드려 하이파이브']:[]).concat(['rps:만나면 가위바위보','flip:이기면 하나 뒤집기','bag2:양면 빈백(두 색)'])}; }
   [[110,60],[250,150]].forEach(([x,y])=>s+=pl(x,y,COL.blue)); [[190,170],[330,110]].forEach(([x,y])=>s+=pl(x,y,COL.red)); s+=FLIP(150,95)+FLIP(260,140);
   return {s,l:['blue:파랑 팀','red:빨강 팀','flip:상대 색 뒤집기','bag2:양면 빈백(두 색)']}; },
 tg_plank:o=>{ let s=''; const P=o.pair?[[110,80],[290,80],[110,180],[290,180]]:[[80,70],[200,70],[320,70],[80,180],[200,180],[320,180]];
   P.forEach(([x,y])=>{ if(o.pair){ s+=`<rect x="${x-70}" y="${y-7}" width="50" height="14" rx="7" fill="${COL.mint}" stroke="#fff" stroke-width="2"/><circle cx="${x-16}" cy="${y}" r="9" fill="${COL.mint}" stroke="#fff" stroke-width="2.5"/><rect x="${x+20}" y="${y-7}" width="50" height="14" rx="7" fill="${COL.blue}" stroke="#fff" stroke-width="2"/><circle cx="${x+16}" cy="${y}" r="9" fill="${COL.blue}" stroke="#fff" stroke-width="2.5"/>`+(o.rps?RPS(x,y-26):`<path d="M${x-6},${y-16} l6,-8 l6,8" fill="none" stroke="${COL.mk}" stroke-width="2.4"/>`); }
     else s+=`<rect x="${x-34}" y="${y-7}" width="52" height="14" rx="7" fill="${COL.mint}" stroke="#fff" stroke-width="2"/><circle cx="${x+22}" cy="${y}" r="9" fill="${COL.mint}" stroke="#fff" stroke-width="2.5"/><line x1="${x+16}" y1="${y+8}" x2="${x+16}" y2="${y+20}" stroke="#fff" stroke-width="3"/>`; });
   return {s,l:o.pair?['me','blue:짝'].concat(o.rps?['rps:엎드린 채 가위바위보']:['mk2:손바닥 하이파이브']):['me:엎드려 버티기']}; },
 tg_kho:o=>{ let s='';
   if(o.m==='pass'||o.m==='tap'){ const X=[70,120,170,220,270,320]; s+=X.map(x=>mk(x,140)).join('');
     X.forEach((x,k)=>s+=pl(x,125,COL.red)+`<path d="M${x},${k%2?107:143} l0,${k%2?-8:8}" stroke="#fff" stroke-width="2.4" marker-end="url(#w§)"/>`);
     if(o.m==='tap'){ s+=YP(145,70)+`<path d="M152,82 L166,112" stroke="${COL.mk}" stroke-width="2.4" marker-end="url(#y§)"/>`+rn(170,140,240,200,-20); return {s,l:['red:앉아 기다리는 친구','mk3:"코!" 하고 어깨 톡','run:톡 받으면 출발']}; }
     s+=STICK(84,118)+ps(84,112,112,112)+T(98,96,'코!',COL.mk,13); return {s,l:['red:한 줄로 선 팀','stick:플레이스틱','pass:"코!" 외치며 건네기','mk:서는 자리']}; }
   s+=`<line x1="200" y1="30" x2="200" y2="220" stroke="#fff" stroke-width="2" stroke-dasharray="6 5"/>`+cn(200,22)+cn(200,228);
   [50,85,120,155,190].forEach((y,k)=>s+=mk(200,y+6)+pl(200,y,COL.red)+`<path d="M${k%2?188:212},${y} l${k%2?-8:8},0" stroke="#fff" stroke-width="2.2" marker-end="url(#w§)"/>`);
   if(o.m==='line') s=`<line x1="200" y1="30" x2="200" y2="220" stroke="#fff" stroke-width="4"/>`+cn(200,22)+cn(200,228);
   s+=pl(250,110,COL.red)+STICK(264,104)+rn(262,118,300,150,-10)+[[310,160],[110,70],[120,190]].map(([x,y])=>pl(x,y,COL.blue)).join('')+rn(124,70,160,40,-10)+[[30,236],[56,236]].map(([x,y])=>pl(x,y,COL.obs)).join('');
   return {s,l:o.m==='line'?['red:술래(가운데 줄 넘지 않기)','blue:피하는 3명','obs:교대 기다림','stick:플레이스틱','mk2:가운데 줄','cone:끝 콘']:['red:수비 팀(엇갈려 서기)','blue:공격 3명','obs:들어갈 차례','stick:플레이스틱 교대','run','cone:끝 콘']}; },
 tg_tail:o=>{ let s=FIELD(); if(o.charge) s+=CHARGE(290,170);
   if(o.m==='pair'||o.m==='feint'){ [[80,80],[250,80],[80,170],[250,170]].forEach(([x,y],k)=>{ if(o.ring) s+=`<circle cx="${x+30}" cy="${y}" r="44" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="2" stroke-dasharray="4 5"/>`;
       s+=pl(x,y,COL.mint)+TAIL(x,y)+pl(x+60,y,COL.red)+(o.m==='feint'?`<path d="M${x+52},${y-14} q-14,-18 -26,-6" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="3 3"/>`+rn(x+50,y+12,x+14,y+26,-16):rn(x+48,y-8,x+18,y-22,10)); });
     return {s,l:['me:꼬리 단 친구','red:꼬리 노리는 친구','tail:꼬리'].concat(o.m==='feint'?['run:속이고 반대로 돌아 들어가기']:['run:돌아 들어가기']).concat(o.ring?['mk2:둘만의 원']:[])}; }
   const R=o.m==='tagger'?[[140,100],[260,150],[320,70]]:[];
   SP.slice(0,o.charge?9:10).forEach(([x,y],k)=>{ if(R.some(([a,b])=>Math.abs(a-x)<30&&Math.abs(b-y)<30)) return; s+=pl(x,y,COL.mint)+TAIL(x,y)+(o.three?`<path d="M${x-10},${y+4} q-8,6 -4,14" fill="none" stroke="${COL.mk}" stroke-width="3.4"/><path d="M${x+12},${y-2} q8,6 6,14" fill="none" stroke="${COL.mk}" stroke-width="3.4"/>`:'')+(k%3===0?rn(x+14,y,x+40,y+(k%2?20:-20),-10):''); });
   R.forEach(([x,y])=>s+=pl(x,y,COL.red)+rn(x+12,y,x+40,y-14,-8));
   if(!R.length&&!o.three) s+=`<path d="M180,195 q14,-6 22,4" stroke="#fff" stroke-width="2.2" fill="none"/>`;
   return {s,l:['me'+(o.m==='tagger'?':꼬리 단 친구':'')].concat(R.length?['red:꼬리 없는 술래']:[]).concat(['tail:'+(o.three?'꼬리(옆구리 둘 · 허리 뒤 하나)':'꼬리'),'run']).concat(o.charge?['mk2:체력충전소(운동하고 다시)']:[])}; },
 tg_corner:o=>{ let s=FIELD(); const C=[[54,54],[346,54],[54,196],[346,196]]; C.forEach(([x,y])=>s+=HOOPG(x,y,22)+mk(x,y));
   if(o.relay){ C.forEach(([x,y],k)=>{ s+=pl(x+(x<200?36:-36),y,[COL.blue,COL.red,COL.mint,COL.obs][k])+rn(x+(x<200?50:-50),y,200+(x<200?-14:14),125+(y<125?-10:10),k%2?10:-10); }); s+=cn(200,125);
     return {s,l:['blue:모둠','ring:우리 기지(후프)','cone:팔찌 놓는 곳','run:다녀오기']}; }
   const P=[[150,100],[250,100],[200,150],[140,180],[270,170],[200,70]]; P.forEach(([x,y])=>s+=pl(x,y,o.tag&&x===200&&y===150?COL.red:COL.mint)+(o.tail?TAIL(x,y):''));
   if(o.tag) s+=pl(54,54,COL.blue)+rn(214,150,250,170,-8); else s+=rn(150,100,72,64,10)+rn(270,170,330,190,-10)+rn(200,70,330,60,-12);
   return {s,l:(o.tag?['me:피하는 친구','red:술래','blue:후프에서 5초 쉬기']:['me']).concat(o.tail?['tail:꼬리']:[]).concat(['ring:모서리 기지(후프)','run'])}; },
 tg_border:o=>{ let s=FIELD()+`<line x1="200" y1="24" x2="200" y2="226" stroke="#fff" stroke-width="3" stroke-dasharray="7 5"/>`+`<rect x="24" y="24" width="44" height="202" fill="rgba(47,111,214,.25)"/><rect x="332" y="24" width="44" height="202" fill="rgba(217,67,58,.25)"/>`;
   if(o.m==='cross'){ [[120,70],[120,125],[120,180]].forEach(([x,y])=>s+=pl(x,y,COL.blue)+TAIL(x,y)+rn(x+14,y,320,y+(y<125?16:y>125?-16:0),-10)); if(o.def) [[240,90],[270,160],[220,190]].forEach(([x,y])=>s+=pl(x,y,COL.red));
     return {s,l:['blue:건너는 팀'].concat(o.def?['red:가운데 수비']:[]).concat(['tail:꼬리','run:반대 끝선까지','mk2:가운데 선'])}; }
   s+=HOOPG(46,40,14)+HOOPG(354,40,14); [[150,80],[160,170],[260,120]].forEach(([x,y])=>s+=pl(x,y,COL.blue)+TAIL(x,y)); [[240,70],[250,190],[130,125]].forEach(([x,y])=>s+=pl(x,y,COL.red)+TAIL(x,y));
   s+=rn(274,120,336,150,-12)+`<path d="M352,150 l8,6 -8,6" fill="none" stroke="${COL.mk}" stroke-width="3"/>`;
   return {s,l:['blue:파랑 팀','red:빨강 팀','tail:꼬리 셋','run:상대 득점 구역으로','ring:우리 후프(왕꼬리 넣기)','mk2:가운데 선']}; }
});

/* 범례 */
addLegend(()=>{
  const ex={
    tail:[`<path d="M12,4 q8,6 3,16" fill="none" stroke="#ffd43b" stroke-width="4" stroke-linecap="round"/>`,'꼬리'],
    stick:[`<rect x="14" y="2" width="5" height="18" rx="2.5" fill="#29c4e8" stroke="#fff" transform="rotate(30 17 11)"/>`,'플레이스틱'],
    doll:[DOLL(17,17),'토끼 인형'],
    rps:[`<rect x="3" y="5" width="28" height="12" rx="6" fill="#fff" stroke="#1c2a21"/>`,'가위바위보'],
    flip:[`<path d="M8,10 a8,8 0 1,1 10,11" fill="none" stroke="#fff" stroke-width="2.2"/>`,'뒤집기'],
    bag2:[`<rect x="5" y="5" width="12" height="12" rx="3" fill="#2f6fd6" stroke="#fff"/><rect x="17" y="5" width="12" height="12" rx="3" fill="#d9433a" stroke="#fff"/>`,'양면 빈백']
  };
  return ex; });
