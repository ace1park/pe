/* [프로그램] 그림(SVG) 그리는 도구·아이콘 */
/* ===== 그림 (SVG) ===== */
const COL={blue:'#2f6fd6',red:'#d9433a',mint:'#25b38f',obs:'#dfe7e2',cone:'#ff7a1a',mk:'#ffd43b',ink:'#1c2a21'};
let uid=0;
function pent(cx,cy,r,rot=-90){ return [...Array(5)].map((_,i)=>{const a=(rot+i*72)*Math.PI/180; return (cx+r*Math.cos(a)).toFixed(1)+','+(cy+r*Math.sin(a)).toFixed(1);}).join(' '); }
function back(x1,y1,x2,y2,d){ const L=Math.hypot(x2-x1,y2-y1)||1; return [x2-(x2-x1)/L*d, y2-(y2-y1)/L*d]; }
const V={
  pl:(x,y,c=COL.blue)=>`<circle cx="${x}" cy="${y}" r="13" fill="${c}" stroke="#fff" stroke-width="3"/><circle cx="${x}" cy="${y}" r="5" fill="rgba(0,0,0,.28)"/>`,
  bl:(x,y,r=6)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="${COL.ink}" stroke-width="2"/><polygon points="${pent(x,y,r*.45)}" fill="${COL.ink}"/>`,
  cn:(x,y)=>`<polygon points="${x},${y-11} ${x-8},${y+7} ${x+8},${y+7}" fill="${COL.cone}" stroke="#fff" stroke-width="1.5"/><line x1="${x-4}" y1="${y-1}" x2="${x+4}" y2="${y-1}" stroke="#fff" stroke-width="2"/>`,
  mk:(x,y)=>`<ellipse cx="${x}" cy="${y}" rx="7" ry="4.5" fill="${COL.mk}" stroke="#a88700" stroke-width="1"/>`,
  ln:(x1,y1,x2,y2)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#fff" stroke-opacity=".85" stroke-width="3" stroke-linecap="round"/>`,
  ps:(x1,y1,x2,y2,d=18)=>{const [a,b]=back(x1,y1,x2,y2,d); return `<line x1="${x1}" y1="${y1}" x2="${a.toFixed(1)}" y2="${b.toFixed(1)}" stroke="#fff" stroke-width="3" stroke-dasharray="7 6" marker-end="url(#w§)"/>`;},
  rn:(x1,y1,x2,y2,bend=30)=>{const mx=(x1+x2)/2,my=(y1+y2)/2,L=Math.hypot(x2-x1,y2-y1)||1,cx=mx-(y2-y1)/L*bend,cy=my+(x2-x1)/L*bend; return `<path d="M${x1},${y1} Q${cx.toFixed(1)},${cy.toFixed(1)} ${x2},${y2}" fill="none" stroke="${COL.mk}" stroke-width="4" stroke-linecap="round" marker-end="url(#y§)"/>`;},
  dr:(x1,y1,x2,y2,amp=6,waves=5)=>{const L=Math.hypot(x2-x1,y2-y1)||1,ux=(x2-x1)/L,uy=(y2-y1)/L,n=40; let d=''; for(let i=0;i<=n;i++){const t=i/n,o=Math.sin(t*Math.PI*2*waves)*amp*(i<n-4?1:(n-i)/4); const x=x1+ux*L*t-uy*o, y=y1+uy*L*t+ux*o; d+=(i?'L':'M')+x.toFixed(1)+','+y.toFixed(1);} return `<path d="${d}" fill="none" stroke="#fff" stroke-width="2.5" stroke-linejoin="round" marker-end="url(#w§)"/>`;},
  zn:(x,y,w,h,f='rgba(255,212,59,.35)')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}" stroke="#fff" stroke-width="2" stroke-dasharray="5 4"/>`,
  ring:(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="rgba(255,255,255,.14)" stroke="#fff" stroke-width="2.5" stroke-dasharray="6 5"/>`,
  sw:(x,y)=>`<circle cx="${x}" cy="${y}" r="9" fill="#fff" stroke="${COL.ink}" stroke-width="2"/><rect x="${x-3}" y="${y-15}" width="6" height="4" fill="${COL.ink}"/><line x1="${x}" y1="${y}" x2="${x+4}" y2="${y-5}" stroke="${COL.red}" stroke-width="2"/>`,
  ps2:(x1,y1,x2,y2,d=18)=>{const [a,b]=back(x1,y1,x2,y2,d), [c,e]=back(x2,y2,x1,y1,d); return `<line x1="${c.toFixed(1)}" y1="${e.toFixed(1)}" x2="${a.toFixed(1)}" y2="${b.toFixed(1)}" stroke="#fff" stroke-width="3" stroke-dasharray="7 6" marker-start="url(#w§)" marker-end="url(#w§)"/>`;},
  tap:(x,y)=>`<path d="M${x-11},${y} q11,-9 22,0" fill="none" stroke="${COL.mk}" stroke-width="2.5" marker-end="url(#y§)" marker-start="url(#y§)"/>`
};
function field(inner,label){
  const u=++uid;
  return `<svg class="diagram" viewBox="0 0 400 250" role="img" aria-label="${esc(label)}"><defs>
  <marker id="w${u}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#fff"/></marker>
  <marker id="y${u}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${COL.mk}"/></marker>
  <pattern id="st${u}" width="50" height="250" patternUnits="userSpaceOnUse"><rect width="25" height="250" fill="#1e9b56"/><rect x="25" width="25" height="250" fill="#178c4b"/></pattern></defs>
  <rect width="400" height="250" rx="14" fill="url(#st${u})"/>${inner.replace(/§/g,u)}</svg>`;
}
const {pl,bl,cn,mk,ln,ps,ps2,rn,dr,zn,ring,sw,tap}=V;
const DIAG={
  '1-1':()=>{let s='';[[90,90],[200,90],[310,90],[90,185],[200,185],[310,185]].forEach(([x,y])=>{s+=mk(x,y+26)+pl(x,y,COL.mint)+bl(x,y+24)+tap(x,y+44);});return s;},
  '1-2':()=>{let s='';[80,200,320].forEach(x=>{s+=pl(x-28,120,COL.mint)+bl(x-28,144)+tap(x-28,163)+pl(x+28,120,COL.obs)+sw(x+28,160);});return s;},
  '1-3':()=>{let s=ln(60,25,60,225)+ln(340,25,340,225);[55,105].forEach(y=>{s+=pl(60,y,COL.mint)+bl(80,y)+dr(92,y,322,y);});[155,205].forEach(y=>{s+=pl(340,y,COL.mint)+bl(320,y)+dr(308,y,80,y,4,6);});return s;},
  '1-4':()=>{let s='';for(let x=40;x<=360;x+=80){s+=mk(x,28)+mk(x,222);} for(let y=28;y<=222;y+=64.6){s+=mk(40,y)+mk(360,y);} s+=ring(285,140,38);
    [[100,80,140,70],[170,170,130,190],[220,75,250,100],[120,130,90,160]].forEach(([x,y,x2,y2])=>{s+=pl(x,y,COL.mint)+bl(x+15,y+8)+dr(x+22,y+10,x2+20,y2+14,3,3);});
    [[268,128],[302,128],[285,158]].forEach(([x,y])=>{s+=pl(x,y,COL.mint);}); s+=bl(285,140,5); return s;},
  '14-1':()=>{let s=ln(25,50,375,50)+ln(25,200,375,200)+cn(352,108)+cn(352,142);
    s+=pl(70,125)+bl(86,132)+pl(145,80)+pl(145,170)+ps(86,128,145,80)+rn(70,125,220,125,-34)+ps(145,170,345,125,22)+pl(60,228,COL.obs); return s;},
  '14-2':()=>{let s='';[[110,40],[200,40],[290,40],[110,130],[290,130],[110,220],[200,220],[290,220]].forEach(([x,y])=>s+=mk(x,y));
    s+=pl(200,58)+pl(126,130)+pl(274,130)+pl(200,202)+bl(142,138)+pl(178,112,COL.red)+pl(224,150,COL.red)+ps(140,124,200,58)+ps(200,58,274,130); return s;},
  '14-3':()=>{let s=ln(100,30,300,30)+ln(100,230,300,230)+ln(100,30,100,230)+ln(300,30,300,230)+ln(200,30,200,230)+ln(100,130,300,130);
    s+=pl(150,80)+bl(166,88)+pl(150,180)+pl(245,75)+pl(262,104,COL.red)+rn(245,75,250,180,-38)+ps(166,88,250,180,20); return s;},
  '14-4':()=>{let s=zn(30,30,32,190)+zn(338,30,32,190)+ln(30,30,370,30)+ln(30,220,370,220)+ln(30,30,30,220)+ln(370,30,370,220)+ln(200,30,200,220);
    s+=pl(150,92)+bl(166,98)+pl(200,175)+pl(255,58)+pl(250,152,COL.red)+pl(305,188,COL.red)+pl(300,86,COL.red)+rn(255,58,352,128,-40)+ps(166,98,352,130,20); return s;}
};
function legendHTML(key){
  const u=key.replace('-','x'), team=key.startsWith('14');
  const mini=(inner)=>`<svg viewBox="0 0 34 22" aria-hidden="true"><defs><marker id="lw${u}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#fff"/></marker><marker id="ly${u}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="${COL.mk}"/></marker></defs>${inner}</svg>`;
  const dot=c=>`<circle cx="17" cy="11" r="7" fill="${c}" stroke="#fff" stroke-width="2"/>`;
  const items=[
    [dot(team?COL.blue:COL.mint), team?'우리 편':'나'],
    [dot(COL.red),'수비'],
    [dot(COL.obs), key==='1-2'?'세는 친구':'관찰'],
    [`<circle cx="17" cy="11" r="5" fill="#fff" stroke="${COL.ink}" stroke-width="1.5"/>`,'공'],
    [`<line x1="4" y1="11" x2="27" y2="11" stroke="#fff" stroke-width="2.5" stroke-dasharray="5 4" marker-end="url(#lw${u})"/>`,'패스'],
    [`<path d="M4,15 Q17,2 28,12" fill="none" stroke="${COL.mk}" stroke-width="3" marker-end="url(#ly${u})"/>`,'달리기'],
    [`<path d="M4,11 l4,-4 l4,8 l4,-8 l4,8 l4,-4 l3,0" fill="none" stroke="#fff" stroke-width="2" marker-end="url(#lw${u})"/>`,'공 몰기'],
    [`<path d="M7,14 q10,-9 20,0" fill="none" stroke="${COL.mk}" stroke-width="2.5" marker-end="url(#ly${u})"/>`,'발로 톡톡']
  ];
  const uses={'1-1':[0,3,7],'1-2':[0,2,3,7],'1-3':[0,3,6],'1-4':[0,3,6],'14-1':[0,2,3,4,5],'14-2':[0,1,3,4],'14-3':[0,1,3,4,5],'14-4':[0,1,3,4,5]}[key]||[];
  return `<ul class="legend2">${uses.map(i=>`<li>${mini(items[i][0])}${items[i][1]}</li>`).join('')}</ul>`;
}
function ballSVG(size=100,fill='#fff'){
  let s=`<circle r="46" fill="${fill}" stroke="${COL.ink}" stroke-width="4"/><polygon points="${pent(0,0,15)}" fill="${COL.ink}"/>`;
  for(let i=0;i<5;i++){const a=(-90+i*72)*Math.PI/180, b=(-90+36+i*72)*Math.PI/180;
    s+=`<line x1="${(15*Math.cos(a)).toFixed(1)}" y1="${(15*Math.sin(a)).toFixed(1)}" x2="${(30*Math.cos(a)).toFixed(1)}" y2="${(30*Math.sin(a)).toFixed(1)}" stroke="${COL.ink}" stroke-width="3"/>`;
    s+=`<polygon points="${pent(44*Math.cos(b),44*Math.sin(b),13,-90+36+i*72+180)}" fill="${COL.ink}" clip-path="url(#bc)"/>`;}
  return `<g><clipPath id="bc"><circle r="45"/></clipPath>${s}</g>`;
}
function heroArt(){
  const pts=[[30,200],[90,150],[60,95],[140,70],[200,110],[250,60]];
  let path='M'+pts.map(p=>p.join(',')).join(' L');
  let s=`<svg viewBox="0 0 360 230" role="img" aria-label="공을 몰고 골대로 가는 길">
   <rect x="250" y="20" width="96" height="70" rx="4" fill="none" stroke="#fff" stroke-width="5"/>
   <g stroke="rgba(255,255,255,.45)" stroke-width="2">${[...Array(7)].map((_,i)=>`<line x1="${262+i*12}" y1="24" x2="${262+i*12}" y2="88"/>`).join('')}${[...Array(4)].map((_,i)=>`<line x1="254" y1="${34+i*14}" x2="342" y2="${34+i*14}"/>`).join('')}</g>
   <path d="${path}" fill="none" stroke="${COL.mk}" stroke-width="5" stroke-dasharray="2 12" stroke-linecap="round"/>
   ${[[90,150],[140,70],[200,110]].map(([x,y])=>`<g transform="translate(${x},${y-6})"><polygon points="0,-16 -12,12 12,12" fill="${COL.cone}" stroke="#fff" stroke-width="2"/><line x1="-6" y1="0" x2="6" y2="0" stroke="#fff" stroke-width="3"/></g>`).join('')}
   <g transform="translate(286,62) scale(.36)">${ballSVG()}</g>
   <g transform="translate(38,196) scale(.42)">${ballSVG(100,COL.mk)}</g>
  </svg>`;
  return s;
}
const ZICON={
 1:()=>`<circle cx="38" cy="34" r="12" fill="${COL.mint}" stroke="#fff" stroke-width="3"/><g transform="translate(66,42) scale(.15)">${ballSVG()}</g><path d="M54,58 q12,8 24,0" fill="none" stroke="${COL.mk}" stroke-width="3"/><path d="M58,24 l4,-6 M68,22 l0,-8 M78,24 l-4,-6" stroke="${COL.mk}" stroke-width="3" stroke-linecap="round"/>`,
 2:()=>`${[[16,48],[44,18],[72,48],[100,18]].map(([x,y])=>`<polygon points="${x},${y-10} ${x-7},${y+7} ${x+7},${y+7}" fill="${COL.cone}" stroke="#fff" stroke-width="1.5"/>`).join('')}<path d="M8,30 Q30,62 44,40 T72,30 T104,44" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="4 4"/>`,
 3:()=>`<circle cx="18" cy="34" r="11" fill="${COL.blue}" stroke="#fff" stroke-width="3"/><circle cx="100" cy="34" r="11" fill="${COL.blue}" stroke="#fff" stroke-width="3"/><line x1="32" y1="34" x2="82" y2="34" stroke="#fff" stroke-width="3" stroke-dasharray="6 5"/><polygon points="84,28 94,34 84,40" fill="#fff"/><g transform="translate(56,52) scale(.12)">${ballSVG()}</g>`,
 4:()=>`<rect x="72" y="12" width="40" height="44" fill="none" stroke="#fff" stroke-width="4"/><path d="M80,14 v40 M88,14 v40 M96,14 v40 M104,14 v40 M74,24 h36 M74,34 h36 M74,44 h36" stroke="rgba(255,255,255,.45)" stroke-width="1.5"/><path d="M14,54 Q40,8 82,32" fill="none" stroke="${COL.mk}" stroke-width="3" stroke-dasharray="4 4"/><g transform="translate(16,52) scale(.13)">${ballSVG()}</g>`,
 5:()=>`<polygon points="58,10 22,56 94,56" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="6 5"/>${[[58,12],[22,54],[94,54]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="10" fill="${COL.blue}" stroke="#fff" stroke-width="3"/>`).join('')}`,
 6:()=>`<rect x="6" y="6" width="104" height="56" rx="4" fill="none" stroke="#fff" stroke-width="3"/><line x1="58" y1="6" x2="58" y2="62" stroke="#fff" stroke-width="2"/><circle cx="58" cy="34" r="10" fill="none" stroke="#fff" stroke-width="2"/><rect x="2" y="24" width="6" height="20" fill="#fff"/><rect x="108" y="24" width="6" height="20" fill="#fff"/>${[[30,22,COL.blue],[38,46,COL.blue],[78,24,COL.red],[86,46,COL.red]].map(([x,y,c])=>`<circle cx="${x}" cy="${y}" r="6" fill="${c}" stroke="#fff" stroke-width="2"/>`).join('')}`
};
const STEPICON=[
 `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 L20 5 V11 C20 16 16.5 20 12 22 C7.5 20 4 16 4 11 V5 Z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 12 l3 3 l5 -6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>`,
 `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 L18.5 19 H5.5 Z" fill="${COL.cone}" stroke="currentColor" stroke-width="1.5"/><line x1="8.5" y1="13" x2="15.5" y2="13" stroke="#fff" stroke-width="2"/><line x1="3" y1="20.5" x2="21" y2="20.5" stroke="currentColor" stroke-width="2"/></svg>`,
 `<svg viewBox="-50 -50 100 100" aria-hidden="true">${'§BALL'}</svg>`,
 `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20 C5 15 3 11.5 3 8.5 C3 5.5 5.5 4 7.6 4 C9.6 4 11 5.2 12 6.8 C13 5.2 14.4 4 16.4 4 C18.5 4 21 5.5 21 8.5 C21 11.5 19 15 12 20 Z" fill="${COL.red}" stroke="currentColor" stroke-width="1.5"/></svg>`
];
function stepIcon(k){ const i=k===0?0:k===5?3:(k%2===1?1:2); return STEPICON[i].replace('§BALL',ballSVG()); }
const NO=(inner)=>`<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="21" fill="#fff"/>${inner}<circle cx="24" cy="24" r="20" fill="none" stroke="${COL.red}" stroke-width="4.5"/><line x1="10" y1="38" x2="38" y2="10" stroke="${COL.red}" stroke-width="4.5"/></svg>`;
const RULEICON=[
 NO(`<circle cx="15" cy="24" r="6" fill="${COL.blue}"/><circle cx="33" cy="24" r="6" fill="${COL.red}"/><path d="M20 24 h7" stroke="${COL.ink}" stroke-width="3"/><path d="M25 20 l4 4 l-4 4" fill="none" stroke="${COL.ink}" stroke-width="2.5"/>`),
 NO(`<path d="M18 40 L24 26 L34 14" fill="none" stroke="${COL.ink}" stroke-width="4" stroke-linecap="round"/><ellipse cx="35" cy="12" rx="5" ry="3" fill="${COL.ink}"/><path d="M12 22 v-9 m-3 3 l3 -3 l3 3" fill="none" stroke="${COL.ink}" stroke-width="2.5"/>`),
 NO(`<circle cx="31" cy="17" r="7" fill="#f2c59b" stroke="${COL.ink}" stroke-width="2"/><circle cx="13" cy="31" r="5" fill="#fff" stroke="${COL.ink}" stroke-width="2"/><path d="M17 28 L25 21" stroke="${COL.ink}" stroke-width="2.5" stroke-dasharray="3 2"/>`),
 NO(`<rect x="9" y="15" width="20" height="18" fill="none" stroke="${COL.ink}" stroke-width="3"/><path d="M14 15v18M19 15v18M24 15v18" stroke="${COL.ink}" stroke-width="1"/><circle cx="36" cy="24" r="5" fill="${COL.blue}"/>`),
];
const SIGICON=`<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="21" fill="#e8eefb"/><path d="M10 22 h18 a8 8 0 1 1 -8 8 h-10 z" fill="${COL.ink}"/><circle cx="20" cy="30" r="3" fill="#fff"/><path d="M33 12 l4 -4 M36 18 l6 -1 M30 9 l0 -5" stroke="${COL.red}" stroke-width="3" stroke-linecap="round"/><text x="38" y="40" font-size="12" font-weight="800" fill="${COL.red}" font-family="sans-serif">×2</text></svg>`;
const FACE={
 pos:`<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="14" fill="#7fd39b" stroke="${COL.ink}" stroke-width="2"/><circle cx="11" cy="13" r="2" fill="${COL.ink}"/><circle cx="21" cy="13" r="2" fill="${COL.ink}"/><path d="M9 19 q7 7 14 0" fill="none" stroke="${COL.ink}" stroke-width="2.4" stroke-linecap="round"/></svg>`,
 mid:`<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="14" fill="${COL.mk}" stroke="${COL.ink}" stroke-width="2"/><circle cx="11" cy="13" r="2" fill="${COL.ink}"/><circle cx="21" cy="13" r="2" fill="${COL.ink}"/><path d="M10 21 h12" stroke="${COL.ink}" stroke-width="2.4" stroke-linecap="round"/></svg>`,
 neg:`<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="14" fill="#9db8ef" stroke="${COL.ink}" stroke-width="2"/><circle cx="11" cy="13" r="2" fill="${COL.ink}"/><circle cx="21" cy="13" r="2" fill="${COL.ink}"/><path d="M9 23 q7 -6 14 0" fill="none" stroke="${COL.ink}" stroke-width="2.4" stroke-linecap="round"/></svg>`
};
function jersey(num,col){ const light=col===COL.mk||col==='#e9b400'||col==='#f7f4df';
  return `<svg class="jersey" viewBox="0 0 48 48" role="img" aria-label="${num}번"><path d="M10 8 L18 4 Q24 9 30 4 L38 8 L46 17 L39 22 L38 44 L10 44 L9 22 L2 17 Z" fill="${col}" stroke="${COL.ink}" stroke-width="2" stroke-linejoin="round"/><text x="24" y="33" text-anchor="middle" font-size="16" font-weight="800" font-family="Gothic A1, sans-serif" fill="${light?COL.ink:'#fff'}">${num}</text></svg>`; }
const GOALICON=`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3,8 h18 M5,8 v11 M7,8 v11 M9.5,8 v11 M12,8 v11 M14.5,8 v11 M17,8 v11 M19,8 v11 M4,11.5 h16 M4,15 h16" stroke="currentColor" stroke-opacity=".35" stroke-width=".9"/><path d="M3,20 V6 H21 V20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const STARICON=`<svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="12,2 15,9 22,9.5 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9.5 9,9" fill="${COL.mk}" stroke="currentColor" stroke-width="1.5"/></svg>`;
function ringSVG(){ const r=96,C=2*Math.PI*r; let ticks=''; for(let i=0;i<10;i++){const a=(i*36-90)*Math.PI/180; ticks+=`<line x1="${110+108*Math.cos(a)}" y1="${110+108*Math.sin(a)}" x2="${110+100*Math.cos(a)}" y2="${110+100*Math.sin(a)}" stroke="rgba(255,255,255,.5)" stroke-width="3"/>`;}
  return `<svg viewBox="0 0 220 220" aria-hidden="true"><circle cx="110" cy="110" r="${r}" fill="none" stroke="rgba(255,255,255,.14)" stroke-width="14"/><circle id="ringP" cx="110" cy="110" r="${r}" fill="none" stroke="${COL.mk}" stroke-width="14" stroke-linecap="round" stroke-dasharray="${C.toFixed(2)}" stroke-dashoffset="0" transform="rotate(-90 110 110)" style="transition:stroke-dashoffset .3s linear"/>${ticks}</svg>`; }



/* ===== 꽃가루 ===== */
function confetti(){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const c=document.getElementById('fx'), x=c.getContext('2d'); c.width=innerWidth; c.height=innerHeight;
  const cols=['#ffd43b','#168b4b','#ffffff','#2f6fd6','#e0700f'];
  const P=[...Array(140)].map(()=>({x:innerWidth/2,y:innerHeight*0.4,vx:(Math.random()-.5)*14,vy:Math.random()*-14-4,r:Math.random()*6+4,c:cols[Math.random()*cols.length|0],a:Math.random()*6}));
  let f=0; (function step(){ x.clearRect(0,0,c.width,c.height);
    P.forEach(p=>{p.vy+=.45;p.x+=p.vx;p.y+=p.vy;p.a+=.2;x.save();x.translate(p.x,p.y);x.rotate(p.a);x.fillStyle=p.c;x.fillRect(-p.r/2,-p.r/4,p.r,p.r/2);x.restore();});
    if(++f<110) requestAnimationFrame(step); else x.clearRect(0,0,c.width,c.height); })();
}


