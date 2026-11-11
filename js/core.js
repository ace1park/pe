/* [프로그램] 인원 편성·기록 저장·소리·타이머 */
/* ===== 인원 편성 (02_수업설계_표준.md 4절) ===== */
const FORMS = {
  pair:{label:'2인 (짝)', use:'짝 패스, 1:1 겨루기', size:{20:[2,2,2,2,2,2,2,2,2,2],21:[2,2,2,2,2,2,2,2,2,3],22:[2,2,2,2,2,2,2,2,2,2,2],23:[2,2,2,2,2,2,2,2,2,2,3]}, unit:'조',
        odd:'3인 1조: 하는 사람·받는 사람·세는 사람(또는 심판)으로 돌아가며 맡기'},
  group:{label:'4인 모둠 (5모둠)', use:'릴레이, 공 지키기, 볼링', size:{20:[4,4,4,4,4],21:[5,4,4,4,4],22:[5,5,4,4,4],23:[5,5,5,4,4]}, unit:'모둠',
        odd:'5인 모둠: 1명은 관찰·기록을 맡고 판마다 교대'},
  six:{label:'6팀 (3:3, 경기장 3곳)', use:'소규모 게임, 엔드존 축구', size:{20:[4,4,3,3,3,3],21:[4,4,4,3,3,3],22:[4,4,4,4,3,3],23:[4,4,4,4,4,3]}, unit:'팀',
        odd:'4명 팀: 경기는 3명, 골이 날 때마다 1명 교대'},
  four:{label:'4팀 (5~6명)', use:'4:2 공 지키기, 2:1, 미니 풋살', size:{20:[5,5,5,5],21:[6,5,5,5],22:[6,6,5,5],23:[6,6,6,5]}, unit:'팀',
        odd:'6명 팀: 경기 인원을 같게 맞추고 1분마다 1명 교대'},
  half:{label:'반 2팀', use:'콘 뒤집기, 번호 부르기 축구', size:{20:[10,10],21:[11,10],22:[11,11],23:[12,11]}, unit:'팀',
        odd:'1명 많은 팀: 골이 날 때마다 1명 교대해 경기 인원 같게'}
};
const VESTS = [['빨강','#d9433a'],['파랑','#2f6fd6'],['노랑','#e9b400'],['초록','#168b4b']];
/* 소규모 학급(6~14명)도 같은 대형으로: 표에 없는 인원은 계산해서 나눔 */
/* 인원 선택: 일반학급(추천) 15~24명 · 소규모 학급(가능) 6~14명 · 합반 25~50명 */
const PCAT={reg:{name:'일반학급',tag:'추천',range:'15~24명',nums:[15,16,17,18,19,20,21,22,23,24]}, small:{name:'소규모 학급',tag:'가능',range:'14명 이하',nums:[6,7,8,9,10,11,12,13,14]}, big:{name:'합반',tag:'두 반',range:'25~50명',nums:[...Array(26)].map((_,i)=>25+i)}};
const isSmall=N=>N<=14, isBig=N=>N>=25;
const pcatOf=N=>isSmall(N)?'small':isBig(N)?'big':'reg';
function peopleHTML(pill){
  const cat=ui.pcat||pcatOf(store.people);
  const tabs=`<div class="pcat" role="group" aria-label="학급 크기">${Object.entries(PCAT).map(([k,c])=>`<button aria-pressed="${cat===k}" data-action="pcat" data-v="${k}"><b>${c.name}</b><small><i class="${k}">${c.tag}</i>${c.range}</small></button>`).join('')}</div>`;
  const nums=PCAT[cat].nums.map(v=>`<button ${pill?'class="pill"':''} aria-pressed="${store.people===v}" data-action="people" data-v="${v}">${v}명</button>`).join('');
  const tip=cat==='big'?`<p class="pnote">두 반이 함께하면 번호를 이어서 써요. 예) 1반 22명이면 2반 1번이 23번</p>`:'';
  return pill?`<div class="row prow"><span>인원</span><div class="pwrap">${tabs}<div class="pnums">${nums}</div>${tip}</div></div>`:`${tabs}<div class="pp nums">${nums}</div>${tip}`;
}
function spread(N,cnt){ cnt=Math.max(1,Math.min(cnt,N)); return [...Array(cnt)].map((_,i)=>Math.floor(N/cnt)+(i<N%cnt?1:0)); }
function sizesOf(form,N){
  const F=FORMS[form]; if(F.size[N]) return F.size[N];
  if(form==='pair') return N%2?[...Array((N-3)/2)].map(()=>2).concat([3]):[...Array(N/2)].map(()=>2);
  if(form==='group') return spread(N,Math.max(2,Math.round(N/4)));
  if(form==='six') return spread(N,N>24?2*Math.floor(N/7):Math.max(2,Math.min(6,2*Math.floor(N/6))));
  if(form==='four') return spread(N,N>24?2*Math.round(N/12):N>=8?4:2);
  return spread(N,2);
}
function szText(sz){ const c={}; sz.forEach(v=>c[v]=(c[v]||0)+1); return Object.keys(c).map(Number).sort((a,b)=>b-a).map(v=>v+'명'+(c[v]>1?'×'+c[v]:'')).join('·'); }
function oddText(form,sizes){
  const mx=Math.max(...sizes), mn=Math.min(...sizes);
  if(form==='pair') return FORMS.pair.odd;
  if(form==='group') return `${mx}인 모둠: 1명은 관찰·기록을 맡고 판마다 교대`;
  if(form==='six') return `${mx}명 팀: 경기는 ${mn}명, 골이 날 때마다 1명 교대`;
  if(form==='four') return `${mx}명 팀: 경기 인원을 같게 맞추고 1분마다 1명 교대`;
  return '1명 많은 팀: 골이 날 때마다 1명 교대해 경기 인원 같게';
}
function smallNote(form,N){ if(!isSmall(N)) return ''; const n=sizesOf(form,N).length;
  const t={pair:'짝 활동은 그대로', group:`${n}모둠으로 줄여 운영`, six:n>2?`경기장 ${n/2}곳`:'경기장 1곳 · 두 팀이 바로 맞붙기', four:n===4?'4팀 · 쉬는 팀 없이 2경기 동시':'2팀으로 줄여 바로 맞붙기', half:'반 2팀'}[form]||'';
  return `<div class="oddnote smallnote"><b>소규모 학급 ${N}명</b> · ${t} · 구역은 인원에 맞게 줄이기</div>`; }


/* ===== 상태 ===== */
const KEY='pe-guide-v1';
let store={stamps:{}, emo:{}, diff:{}, people:22, scores:{}};
try{ const raw=localStorage.getItem(KEY); if(raw) store=Object.assign(store,JSON.parse(raw)); }catch(e){}
function save(){ try{ localStorage.setItem(KEY, JSON.stringify(store)); }catch(e){} }
let ui={route:'', step:{1:0,14:0}, form:'four', shuffle:true, seed:1, freeTeams:2, scores:{}, open:{}, cleared:{}};
function stampsOf(n){ return store.stamps[n] || (store.stamps[n]=[false,false,false,false,false,false]); }
const MFORM={'1-2':'pair','14-1':'group','14-2':'four','14-3':'group','14-4':'six'};
const MSCORE={'14-2':'four','14-4':'six'};
const PLAYABLE=[1,14]; // 미션 카드까지 다 넣은 차시
ui.sel={1:0,2:0,3:0,4:0,5:0,6:0}; ui.liteForm={};
function stepOf(n){ return ui.step[n]||0; }
function getD(n){
  if(DETAIL[n]) return DETAIL[n];
  if(typeof PL!=='undefined' && PL[n]) return PL[n].D;
  const b=n>100?n-100:n, l=LESSONS.find(x=>x.n===b);
  return {lite:true, goal:l.t+(EVAL[b]?' ('+EVAL[b]+')':''), short:l.t,
    reflect:['오늘 가장 잘된 동작은?','오늘 나를 도와준 친구 한 명','오늘 기분을 낱말 하나로!'],
    m:l.acts.map(a=>({name:a, lite:true}))};
}
const BALLURI=`data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20viewBox%3D%27-50%20-50%20100%20100%27%3E%3Cpolygon%20points%3D%270.0%2C-15.0%2014.3%2C-4.6%208.8%2C12.1%20-8.8%2C12.1%20-14.3%2C-4.6%27%20fill%3D%27rgba%280%2C0%2C0%2C0.14%29%27/%3E%3Cpolygon%20points%3D%2717.0%2C-23.5%2011.6%2C-40.2%2025.9%2C-50.6%2040.1%2C-40.2%2034.7%2C-23.5%27%20fill%3D%27rgba%280%2C0%2C0%2C0.14%29%27/%3E%3Cpolygon%20points%3D%2727.6%2C9.0%2041.8%2C-1.4%2056.1%2C9.0%2050.7%2C25.7%2033.0%2C25.7%27%20fill%3D%27rgba%280%2C0%2C0%2C0.14%29%27/%3E%3Cpolygon%20points%3D%27-0.0%2C29.0%2014.3%2C39.4%208.8%2C56.1%20-8.8%2C56.1%20-14.3%2C39.4%27%20fill%3D%27rgba%280%2C0%2C0%2C0.14%29%27/%3E%3Cpolygon%20points%3D%27-27.6%2C9.0%20-33.0%2C25.7%20-50.7%2C25.7%20-56.1%2C9.0%20-41.8%2C-1.4%27%20fill%3D%27rgba%280%2C0%2C0%2C0.14%29%27/%3E%3Cpolygon%20points%3D%27-17.0%2C-23.5%20-34.7%2C-23.5%20-40.1%2C-40.2%20-25.9%2C-50.6%20-11.6%2C-40.2%27%20fill%3D%27rgba%280%2C0%2C0%2C0.14%29%27/%3E%3C/svg%3E`;
const app=document.getElementById('app');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ===== 소리 ===== */
let actx=null;
function beep(times=3){
  try{
    actx = actx || new (window.AudioContext||window.webkitAudioContext)();
    if(actx.state==='suspended') actx.resume();
    for(let i=0;i<times;i++){
      const o=actx.createOscillator(), g=actx.createGain();
      o.type='square'; o.frequency.value=880;
      const t=actx.currentTime+i*0.32;
      g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(0.25,t+0.02); g.gain.exponentialRampToValueAtTime(0.0001,t+0.25);
      o.connect(g).connect(actx.destination); o.start(t); o.stop(t+0.26);
    }
  }catch(e){}
}

/* 출발 소리 (시작하기 · 이어 하기) */
function chime(){
  try{
    actx = actx || new (window.AudioContext||window.webkitAudioContext)();
    if(actx.state==='suspended') actx.resume();
    const t0=actx.currentTime+0.02;
    [523.25,659.25,783.99,1046.5].forEach((f,k)=>{
      const t=t0+k*0.11, len=k===3?0.5:0.16;
      const o=actx.createOscillator(), g=actx.createGain();
      o.type='triangle'; o.frequency.value=f;
      g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(0.35,t+0.015); g.gain.exponentialRampToValueAtTime(0.0001,t+len);
      o.connect(g).connect(actx.destination); o.start(t); o.stop(t+len+0.02);
    });
  }catch(e){}
}

/* 호루라기 두 번 (정지 신호) */
function whistle(times=2){
  try{
    actx = actx || new (window.AudioContext||window.webkitAudioContext)();
    if(actx.state==='suspended') actx.resume();
    const t0=actx.currentTime+0.03, dur=0.45;
    const nbuf=actx.createBuffer(1, actx.sampleRate*dur, actx.sampleRate), nd=nbuf.getChannelData(0);
    for(let i=0;i<nd.length;i++) nd[i]=Math.random()*2-1;
    [0,0.62].slice(0,times).forEach(off=>{
      const t=t0+off;
      const out=actx.createGain();
      out.gain.setValueAtTime(0.0001,t);
      out.gain.exponentialRampToValueAtTime(0.55,t+0.03);
      out.gain.setValueAtTime(0.55,t+dur-0.08);
      out.gain.exponentialRampToValueAtTime(0.0001,t+dur);
      out.connect(actx.destination);
      // 구슬이 떨리는 소리: 주파수를 빠르게 흔듦
      const o=actx.createOscillator(); o.type='sine'; o.frequency.value=2900;
      const lfo=actx.createOscillator(); lfo.frequency.value=26;
      const lg=actx.createGain(); lg.gain.value=220; lfo.connect(lg).connect(o.frequency);
      const o2=actx.createOscillator(); o2.type='sine'; o2.frequency.value=5800;
      const lg2=actx.createGain(); lg2.gain.value=440; lfo.connect(lg2).connect(o2.frequency);
      const g2=actx.createGain(); g2.gain.value=0.18;
      o.connect(out); o2.connect(g2).connect(out);
      // 바람 소리
      const n=actx.createBufferSource(); n.buffer=nbuf;
      const bp=actx.createBiquadFilter(); bp.type='bandpass'; bp.frequency.value=3000; bp.Q.value=2.5;
      const ng=actx.createGain(); ng.gain.value=0.22;
      n.connect(bp).connect(ng).connect(out);
      [o,o2,lfo,n].forEach(x=>{ x.start(t); x.stop(t+dur+0.02); });
    });
  }catch(e){}
}
function stopTimes(){ try{ const n=curId(); if(n==null) return 2; const sp=UMETA[LI(n).unit].sport; return /^호루라기 한 번/.test(SIGBY[sp]||'')?1:2; }catch(e){ return 2; } }
function openStop(){ const o=document.getElementById('stopOver'); if(!o.classList.contains('open')){ o.classList.add('open'); whistle(stopTimes()); buzz([400,200,400]); } if(main.run){ main.run=false; paintClock(); } }


/* ===== 타이머 ===== */
const main={total:600,left:600,run:false,end:0};
const sub={j:-1,cfg:null,left:0,run:false,end:0};
let tick=null;
function fmt(s){ s=Math.max(0,Math.ceil(s)); return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0'); }
function digitsHTML(str){ return [...str].map(ch=>ch===':'?'<span class="c">:</span>':'<span>'+ch+'</span>').join(''); }
function loop(){
  const now=Date.now();
  if(main.run){ main.left=(main.end-now)/1000; if(main.left<=60 && main.left>0 && !main.warned && main.total>90){ main.warned=true; beep(1); buzz(200); toast('1분 남았어요'); } if(main.left>60) main.warned=false; if(main.left<=0){ main.left=0; main.run=false; beep(3); buzz([300,150,300,150,300]); keepAwake(false); toast('10분 끝! 공 멈추고 모여요'); document.getElementById('nextBtn')?.classList.add('pulse'); } }
  if(sub.run){ sub.left=(sub.end-now)/1000; if(sub.left<=0){ beep(2); toast(sub.cfg.end);
    if(sub.cfg.repeat && main.run){ sub.left=sub.cfg.sec; sub.end=now+sub.cfg.sec*1000; } else { sub.run=false; sub.left=0; } } }
  paintClock();
}
function startTick(){ if(!tick) tick=setInterval(loop,200); }
/* 화면 꺼짐 막기(타이머가 도는 동안) · 진동(안드로이드) */
let wakeLock=null;
async function keepAwake(on){ try{ if(on){ if(!wakeLock && navigator.wakeLock){ wakeLock=await navigator.wakeLock.request('screen'); wakeLock.addEventListener('release',()=>{wakeLock=null;}); } } else if(wakeLock){ await wakeLock.release(); wakeLock=null; } }catch(e){} }
document.addEventListener('visibilitychange',()=>{ if(document.visibilityState==='visible' && main.run) keepAwake(true); });
function buzz(p){ try{ if(navigator.vibrate && navigator.vibrate(p)) return; }catch(e){} flashScreen(Array.isArray(p)?Math.ceil(p.length/2):1); }
/* 진동이 없는 기기(아이폰)는 화면 가장자리를 깜빡여 알림 */
function flashScreen(n){ try{ const f=document.getElementById('flashFx'); if(!f) return; f.style.setProperty('--n',n); f.classList.remove('on'); void f.offsetWidth; f.classList.add('on'); }catch(e){} }
function toggleMain(){ startTick(); if(main.run){ main.run=false; } else { const resume=main.left>0&&main.left<main.total; if(main.left<=0) main.left=main.total; main.end=Date.now()+main.left*1000; main.run=true; resume?chime():beep(1); } keepAwake(main.run); paintClock(); }
function addMin(d){ main.left=Math.max(0,main.left+d); main.total=Math.max(main.total,main.left); if(main.run) main.end=Date.now()+main.left*1000; paintClock(); }
function resetClock(){ main.total=600; main.left=600; main.run=false; sub.run=false; sub.cfg=null; sub.j=-1; }
function paintClock(){
  const str=fmt(main.left), warn=main.left<=60;
  const d=document.getElementById('digits'); if(d){ d.innerHTML=digitsHTML(str); d.className='digits'+(main.left<=0?' over':warn?' warn':''); }
  const rp=document.getElementById('ringP'); if(rp){ const C=2*Math.PI*96; rp.setAttribute('stroke-dashoffset',(C*(1-main.left/main.total)).toFixed(2)); rp.setAttribute('stroke',warn?'#ff8a7f':'#ffd43b'); }
  const ot=document.getElementById('ovTime'); if(ot) ot.textContent=str;
  const bt=document.getElementById('barTime'); if(bt){ bt.textContent=str; const b=bt.parentElement; b.classList.toggle('running',main.run); b.classList.toggle('warn',warn); }
  const bp=document.getElementById('barProg'); if(bp) bp.style.width=(main.left/main.total*100)+'%';
  const gt=document.getElementById('bigTime'); if(gt){ gt.textContent=str; const b=gt.parentElement; b.classList.toggle('running',main.run); b.classList.toggle('warn',warn); b.classList.toggle('over',main.left<=0); }
  const gp=document.getElementById('bigProg'); if(gp) gp.style.width=(main.left/main.total*100)+'%';
  document.querySelectorAll('[data-role=playlabel]').forEach(x=>x.textContent=main.run?'눌러서 멈춤':(main.left<main.total?'눌러서 이어 하기':'눌러서 시작'));
  document.querySelectorAll('[data-role=playbtn]').forEach(x=>x.textContent=main.run?'멈춤':'시작');
  document.querySelectorAll('.subchip').forEach(b=>{ const on=sub.run&&sub.j===+b.dataset.j; b.classList.toggle('on',on);
    b.querySelector('b').textContent=on?fmt(sub.left):b.dataset.label; b.querySelector('small').textContent=on?'누르면 멈춤':'누르면 바로 시작'; });
}
let toastT=null;
function toast(msg){ const t=document.getElementById('toast'); t.textContent=msg; t.classList.add('on'); clearTimeout(toastT); toastT=setTimeout(()=>t.classList.remove('on'),5000); }

