/* [프로그램] 단원·학년·차시 찾기 도구 */
function isFoot(id){ return typeof id==='number'; }
/* 발로 하는 공놀이: 4학년 1~20, 3학년 101~120 (data/foot3.js) */
function fBase(id){ return id>100?id-100:id; }
function fGrade(id){ return id>100?'3':'4'; }
function bkey(key){ const k=String(key), j=k.indexOf('-'), n=+k.slice(0,j); return (j>0&&n>100)?(n-100)+k.slice(j):k; }
function toId(s){ s=String(s); return /^\d+$/.test(s)?+s:s; }
function LI(id){
  if(isFoot(id)){ const b=fBase(id), l=LESSONS.find(x=>x.n===b), s=STAGES[l.s-1]; return {id,unit:'foot',g:fGrade(id),n:b,t:l.t,s:l.s,sn:s.name,c:s.c,ev:!!EVAL[b],evtxt:EVAL[b]||'',ext:false,acts:(DETAIL[id]&&DETAIL[id].m)?DETAIL[id].m.map(m=>m.name):l.acts}; }
  const r=PL[id]; return {id,unit:r.unit,g:r.g,n:r.n,t:r.t,s:r.s,sn:r.sn,c:SCOL[(r.s-1)%6],ev:r.ev,evtxt:r.ev?'평가 차시':'',ext:r.ext,acts:r.D.m.map(m=>m.name),rec:r};
}
function lessonsOf(unit,g){ if(unit==='foot') return LESSONS.map(l=>String(g)==='3'?l.n+100:l.n); return Object.values(PL).filter(r=>r.unit===unit&&r.g===String(g)).sort((a,b)=>a.n-b.n).map(r=>r.id); }
function stagesOf(unit,g){
  if(unit==='foot') return STAGES.map(s=>({n:s.n,name:s.name,range:s.range,c:s.c,ids:LESSONS.filter(l=>l.s===s.n).map(l=>String(g)==='3'?l.n+100:l.n)}));
  const ids=lessonsOf(unit,g), map={};
  ids.forEach(id=>{ const r=PL[id]; (map[r.s]=map[r.s]||{n:r.s,name:r.sn,c:SCOL[(r.s-1)%6],ids:[]}).ids.push(id); });
  return Object.values(map).sort((a,b)=>a.n-b.n).map(x=>({...x,range:PL[x.ids[0]].n+'~'+PL[x.ids[x.ids.length-1]].n}));
}
function unitRoute(unit,g){ const m=UMETA[unit]; if(m.track==='fun') return '#map'; return '#u-'+unit+(m.grades.length>1?'-'+gk(g):''); }
/* 두 갈래: 차근차근 배울까?(단원) · 오늘 뭐하지?(40분 놀이 한 판) */
function isFunU(u){ return !!(UMETA[u]&&UMETA[u].track==='fun'); }
function LUNITS(){ return UORDER.filter(u=>!isFunU(u)); }
function FUNITS(){ return UORDER.filter(isFunU); }
function lessonNo(id){ return isFoot(id)?fBase(id):PL[id].n; }
/* 종목 아이콘 */
const SPICON={
 foot:()=>icBall(32,32,18),
 tb:()=>`<line x1="14" y1="50" x2="44" y2="14" stroke="#b07a3a" stroke-width="7" stroke-linecap="round"/><line x1="14" y1="50" x2="20" y2="43" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`+`<rect x="40" y="38" width="6" height="16" fill="${OR}" stroke="${INK}" stroke-width="1.4"/>`+icBall(43,32,7),
 bm:()=>`<g transform="rotate(-35 30 34)"><ellipse cx="30" cy="22" rx="11" ry="14" fill="#fff" stroke="${INK}" stroke-width="2.4"/><path d="M22,14 h16 M20,22 h20 M22,30 h16 M30,9 v26 M24,11 v22 M36,11 v22" stroke="${INK}" stroke-opacity=".35" stroke-width="1"/><line x1="30" y1="36" x2="30" y2="56" stroke="${INK}" stroke-width="4" stroke-linecap="round"/></g><g transform="translate(46,40) rotate(25)"><polygon points="-6,-10 6,-10 3,2 -3,2" fill="#fff" stroke="${INK}" stroke-width="1.6"/><circle cx="0" cy="5" r="4" fill="${COL.mk}" stroke="${INK}" stroke-width="1.4"/></g>`,
 at:()=>`<path d="M6,46 Q32,20 58,46" fill="none" stroke="${OR}" stroke-width="5"/><path d="M6,54 Q32,28 58,54" fill="none" stroke="${OR}" stroke-width="5" opacity=".6"/>`+`<circle cx="34" cy="13" r="5" fill="${COL.mint}" stroke="${INK}" stroke-width="1.6"/><path d="M33,19 L28,31 L20,30 M28,31 L34,38 L30,46 M33,21 L42,26 M30,24 L22,22" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`,
 vb:()=>`<circle cx="32" cy="32" r="20" fill="#fff" stroke="${INK}" stroke-width="2.6"/><path d="M32,12 Q22,30 30,52 M14,24 Q32,30 50,20 M18,46 Q34,36 52,40" fill="none" stroke="#0e8c8c" stroke-width="3"/>`,
 bb:()=>`<circle cx="32" cy="32" r="20" fill="#e07a2b" stroke="${INK}" stroke-width="2.6"/><path d="M12,32 H52 M32,12 V52 M17,18 Q27,32 17,46 M47,18 Q37,32 47,46" fill="none" stroke="${INK}" stroke-width="2"/>`,
 nb:()=>`<line x1="40" y1="16" x2="40" y2="58" stroke="${INK}" stroke-width="3.5"/><ellipse cx="30" cy="16" rx="11" ry="4" fill="none" stroke="${OR}" stroke-width="3"/><path d="M20,17 l3,12 h14 l3,-12" fill="none" stroke="${INK}" stroke-opacity=".4" stroke-width="1.2"/>`+icBall(18,44,9,COL.mk)
};
function sportIcon(unit,label){ return icWrap(SPICON[UMETA[unit].sport](), label||UMETA[unit].title); }
function anyIcon(id){ return isFoot(id)?lessonIcon(id):sportIcon(PL[id].unit, PL[id].n+'차시 '+PL[id].t); }
/* 처음 화면: 종목 선반 */

/* ===== 새 종목(addUnit) 이어 붙이기 ===== */
const NEWICON={
 '디스크':()=>`<ellipse cx="32" cy="34" rx="22" ry="10" fill="#ffd43b" stroke="${INK}" stroke-width="2.6"/><ellipse cx="32" cy="31" rx="14" ry="5.5" fill="none" stroke="${INK}" stroke-width="1.8" opacity=".55"/><path d="M8,22 q6,-8 14,-6 M48,16 q8,1 10,8" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>`,
 '츄크볼':()=>`<g transform="rotate(-12 30 34)"><rect x="12" y="14" width="34" height="34" rx="3" fill="#dfe7e2" stroke="${INK}" stroke-width="2.6"/><path d="M12,25 H46 M12,36 H46 M23,14 V48 M34,14 V48" stroke="${INK}" stroke-width="1.2" opacity=".5"/><line x1="18" y1="48" x2="14" y2="58" stroke="${INK}" stroke-width="3"/><line x1="40" y1="48" x2="44" y2="58" stroke="${INK}" stroke-width="3"/></g><circle cx="50" cy="20" r="8" fill="#ffd43b" stroke="${INK}" stroke-width="2.2"/>`,
 '플로어볼':()=>`<path d="M44,8 L22,46 Q19,52 12,51 L8,50" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M44,8 L22,46 Q19,52 12,51" fill="none" stroke="#2f6fd6" stroke-width="2.4" stroke-linecap="round"/><circle cx="44" cy="48" r="8" fill="#fff" stroke="${INK}" stroke-width="2.2"/><circle cx="41" cy="46" r="1.6" fill="${INK}"/><circle cx="47" cy="46" r="1.6" fill="${INK}"/><circle cx="44" cy="51" r="1.6" fill="${INK}"/>`,
 '공':()=>icBall(32,32,18),
 '교실':()=>`<rect x="10" y="26" width="44" height="8" rx="2" fill="#e0b77a" stroke="${INK}" stroke-width="2.4"/><path d="M15,34 V52 M49,34 V52" stroke="${INK}" stroke-width="3" stroke-linecap="round"/><circle cx="22" cy="18" r="7" fill="#ffd43b" stroke="${INK}" stroke-width="2.2"/><path d="M36,22 l4,-10 l4,10 z" fill="#e2463b" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/><rect x="38" y="14" width="14" height="10" rx="2" fill="#fff" stroke="${INK}" stroke-width="2" opacity="0"/>`
};
NEWUNITS.forEach(x=>{ if(UMETA[x.id]) return;
  UMETA[x.id]=x.meta; UORDER.push(x.id);
  RULESBY[x.id]=x.rules.length?x.rules:['차례와 자리를 지키기','도구는 던지지 말고 내려놓기','친구와 부딪히지 않게 거리 두기','정지 신호에 바로 멈추기'];
  SIGBY[x.id]=x.signal; SPICON[x.id]=NEWICON[x.icon]||NEWICON['공']; });
