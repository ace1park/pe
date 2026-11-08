/* [프로그램] 버튼·키보드 동작, 전체 화면, 한 줄 맞춤 */
/* ===== 동작 ===== */
document.addEventListener('toggle',e=>{ if(e.target.matches&&e.target.matches('details.fold')) ui.open[e.target.id.slice(2)]=e.target.open; },true);
document.addEventListener('click',e=>{
  if(e.target.closest('.qcard')) chime();
  const t=e.target.closest('[data-action]'); if(!t) return;
  const a=t.dataset.action, n=curId();
  switch(a){
    case 'open': { const k=toId(t.dataset.n), sk=t.dataset.sk; ui.sel[sk]=ui.sel[sk]===k?0:k; render();
      if(ui.sel[sk]){ const c=document.getElementById('pick-'+sk); c&&c.scrollIntoView({behavior:'smooth',block:'nearest'}); } break; }
    case 'card': openCard(+t.dataset.no); break;
    case 'cardscore': document.getElementById('peek').classList.remove('open'); ui.route=ui.route; openScoreOver(null); break;
    case 'liteform': ui.liteForm[t.dataset.key]=t.dataset.v; renderLesson(n); break;
    case 'bigform': { store.big=store.big||{}; if(t.dataset.v) store.big[t.dataset.key]=t.dataset.v; else delete store.big[t.dataset.key]; save(); ui.open['big-'+t.dataset.key]=true; renderLesson(n); break; }
    case 'closepeek': document.getElementById('peek').classList.remove('open'); break;
    case 'installno': document.getElementById('installBar').hidden=true; try{ localStorage.setItem('pe-install-no',Date.now()+14*864e5); }catch(e){} break;
    case 'installgo': if(deferredInstall){ deferredInstall.prompt(); deferredInstall.userChoice.finally(()=>{ deferredInstall=null; document.getElementById('installBar').hidden=true; }); } break;
    case 'classmode': store.classMode=t.dataset.v==='1'; save(); renderLesson(n); window.scrollTo(0,0); if(store.classMode) chime(); else if(!main.run) keepAwake(false); break;
    case 'cmteams': { const i=stepOf(n), T=cmTeamInfo(n,i); if(T.html) cmPeek('우리 반 나누기 · '+esc(T.label), T.html()+`<div class="row" style="margin-top:10px"><button class="btn y" data-action="cmreshuffle">다시 섞기</button></div>`); break; }
    case 'cmreshuffle': { ui.seed++; const i=stepOf(n), T=cmTeamInfo(n,i); if(T.html) cmPeek('우리 반 나누기 · '+esc(T.label), T.html()+`<div class="row" style="margin-top:10px"><button class="btn y" data-action="cmreshuffle">다시 섞기</button></div>`); break; }
    case 'cmdiag': { const i=stepOf(n); cmPeek('대형 그림 · '+esc(getD(n).m[i-1].name), `<div class="diagram-wrap cm-diag">${diagHTML(n,i)}</div>`); break; }
    case 'cmpeople': cmPeek('우리 반은 몇 명?', peopleBox()); break;
    case 'step': ui.step[n]=+t.dataset.k; ui.cleared[n]=false; resetClock(); renderLesson(n); break;
    case 'next': goNext(n); break;
    case 'play': toggleMain(); break;
    case 'reset': main.left=main.total=600; main.run=false; paintClock(); break;
    case 'adj': addMin(+t.dataset.d); break;
    case 'sub': { const M=getD(n).m[stepOf(n)-1], j=+t.dataset.j; startTick();
      if(sub.run&&sub.j===j){ sub.run=false; } else { sub.j=j; sub.cfg=M.subs[j]; sub.left=sub.cfg.sec; sub.end=Date.now()+sub.cfg.sec*1000; sub.run=true; beep(1); }
      paintClock(); break; }
    case 'pick': { const M=getD(n).m[stepOf(n)-1], P=M.picker||{}; const lo=P.min||2, hi=P.max||5; const o=document.getElementById('pickOut'); const prev=+o.textContent||0; let v; do{ v=lo+Math.floor(Math.random()*(hi-lo+1)); }while(v===prev&&hi>lo); o.textContent=v; beep(1); break; }
    case 'light': { const b=document.getElementById('lightShow'); b.textContent=t.dataset.w; b.style.background=t.dataset.c; b.style.color=t.dataset.c==='#ffd43b'?'#1c2a21':'#fff'; beep(1); break; }
    case 'oxnext': { const Q=getD(n).m[stepOf(n)-1].ox; ui.oxi=((ui.oxi??-1)+1)%Q.length; document.getElementById('oxQ').textContent=(ui.oxi+1)+'. '+Q[ui.oxi].q; const a=document.getElementById('oxA'); a.textContent=''; a.className='oxa'; beep(1); break; }
    case 'oxans': { const Q=getD(n).m[stepOf(n)-1].ox; if(ui.oxi==null||ui.oxi<0) break; const it=Q[ui.oxi], a=document.getElementById('oxA'); a.innerHTML=`<b>${it.a}</b><small>${esc(it.why)}</small>`; a.className='oxa on '+(it.a==='O'?'o':'x'); chime(); break; }
    case 'diff': store.diff[t.dataset.key]=t.dataset.v; save(); renderLesson(n); break;
    case 'hview': store.homeView=t.dataset.v; save(); render(); break;
    case 'hgrade': store.homeGrade=t.dataset.v; save(); render(); break;
    case 'pcat': ui.pcat=t.dataset.v; if(t.closest('#peek')){ cmPeek('우리 반은 몇 명?', peopleBox()); break; } n?renderLesson(n):renderTeams(); break;
    case 'people': store.people=+t.dataset.v; ui.pcat=pcatOf(store.people); save(); refreshUnder(); if(t.closest('#peek')) document.getElementById('peek').classList.remove('open'); break;
    case 'abs0': openAbs(); break;
    case 'abs': { if(!toggleAbs(+t.dataset.v)) toast(`오늘 인원은 ${MINP}명보다 적게 줄일 수 없어요`); refreshUnder(); openAbs(); break; }
    case 'absclear': clearAbs(); refreshUnder(); openAbs(); break;
    case 'gear': openGear(); break;
    case 'gearc': store.gear=Object.assign({},gear(),{courts:+t.dataset.v}); save(); refreshUnder(); openGear(); break;
    case 'gearb': { const g=gear(); let v=t.dataset.d?Math.max(0,(g.balls||0)+ +t.dataset.d):+t.dataset.v; store.gear=Object.assign({},g,{balls:Math.min(v,60)}); save(); refreshUnder(); openGear(); break; }
    case 'emo': { const em=store.emo[n]||(store.emo[n]={}); em[t.dataset.w]=(em[t.dataset.w]||0)+1; save(); renderLesson(n); break; }
    case 'emoreset': store.emo[n]={}; save(); renderLesson(n); break;
    case 'uncrown': store.stamps[n]=[false,false,false,false,false,false]; ui.cleared[n]=false; save(); renderLesson(n); break;
    case 'form': ui.form=t.dataset.v; renderTeams(); break;
    case 'shuf': ui.shuffle=t.dataset.v==='1'; renderTeams(); break;
    case 'reshuffle': ui.seed++; n?renderLesson(n):renderTeams(); break;
    case 'teams': ui.freeTeams=+t.dataset.v; renderScore(); break;
    case 'sc': { const key=t.dataset.key, S=store.scores[key]||(store.scores[key]={}), i=+t.dataset.i, k=t.dataset.k; const v=S[i]||(S[i]={g:0,f:0}); v[k]=Math.max(0,v[k]+ +t.dataset.d); save();
      document.querySelectorAll(`output[data-sc="${key}|${i}|${k}"]`).forEach(o=>o.textContent=v[k]); t.parentElement.querySelector('output').textContent=v[k]; if(+t.dataset.d>0&&t.closest('#scoreOver')) beep(1); break; }
    case 'openscore': openScoreOver(n); break;
    case 'closescore': document.getElementById('scoreOver').classList.remove('open'); if(n) renderLesson(n); break;
    case 'ovcount': ui.ovCount=ui.ovCount||{}; ui.ovCount[t.dataset.key]=+t.dataset.v; openScoreOver(n); break;
    case 'scorereset': store.scores[t.dataset.key]={}; save(); if(document.getElementById('scoreOver').classList.contains('open')) openScoreOver(n); else render(); break;
    case 'lg': { const L=leagueStore(n+'-'), j=+t.dataset.j, k=t.dataset.k; const r=L[j]||(L[j]={a:0,b:0,fa:0,fb:0,done:false}); r[k]=Math.max(0,r[k]+ +t.dataset.d); save(); renderLesson(n); break; }
    case 'lgdone': { const L=leagueStore(n+'-'), j=+t.dataset.j; const r=L[j]||(L[j]={a:0,b:0,fa:0,fb:0,done:false}); r.done=!r.done; save(); renderLesson(n); if(r.done) chime(); break; }
    case 'lgreset': store[n>100?'league3':'league']={}; save(); renderLesson(n); break;
    case 'stop': openStop(); break;
    case 'full': toggleFull(); break;
    case 'rewhistle': e.stopPropagation(); whistle(); break;
    case 'unstop': document.getElementById('stopOver').classList.remove('open'); break;
    case 'madd': openMediaAdd(t.dataset.key); break;
    case 'mview': openMediaView(t.dataset.key,t.dataset.id); break;
    case 'mclose': closeMedia(); break;
    case 'mdel': mediaDelete(); break;
    case 'mstep': mediaStep(+t.dataset.d); break;
    case 'mlink': mediaLink(); break;
    case 'mdest': { MEDIA.dest=t.dataset.v; document.querySelectorAll('#mediaBox .mdest button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===MEDIA.dest)); const hh=document.getElementById('mDestHint'); if(hh) hh.textContent=MEDIA.dest==='s'?'이 안내서 링크를 여는 선생님 모두가 봐요 · 파일 하나 20MB까지(짧은 영상)':'지금 이 기기(브라우저)에서만 보여요 · 긴 영상도 넣을 수 있어요'; break; }
  }
});
document.getElementById('peek').addEventListener('click',e=>{ if(e.target.id==='peek') e.currentTarget.classList.remove('open'); });
document.addEventListener('keydown',e=>{
  if(e.target.matches('input,textarea')) return;
  const o=document.getElementById('stopOver');
  if(e.key==='Escape'){ closeMedia(); document.getElementById('peek').classList.remove('open'); o.classList.remove('open'); document.getElementById('scoreOver').classList.remove('open'); }
  if((e.key==='s'||e.key==='S'||e.key==='ㄴ')&&(o.classList.contains('open')||ui.route.startsWith('lesson-'))){ if(o.classList.contains('open')) o.classList.remove('open'); else openStop(); }
  if((e.key==='f'||e.key==='F'||e.key==='ㄹ')&&!e.ctrlKey&&!e.metaKey){ toggleFull(); }
  if(ui.route.startsWith('lesson-') && !document.getElementById('mediaOver').classList.contains('open') && !document.getElementById('peek').classList.contains('open')){
    const n=curId();
    if(e.code==='Space'){ e.preventDefault(); toggleMain(); }
    if(e.key==='ArrowRight'){ e.preventDefault(); goNext(n); }
    if(e.key==='ArrowLeft'){ e.preventDefault(); const k=ui.step[n]||0; if(k>0){ ui.step[n]=k-1; ui.cleared[n]=false; resetClock(); renderLesson(n); } }
    if(e.key==='+'||e.key==='='){ addMin(60); }
  }
});


/* ===== 전체 화면 (전자칠판·컴퓨터) ===== */
function fullOn(){ return !!(document.fullscreenElement||document.webkitFullscreenElement); }
function toggleFull(){ const d=document.documentElement; try{ if(fullOn()){ (document.exitFullscreen||document.webkitExitFullscreen).call(document); } else { const r=(d.requestFullscreen||d.webkitRequestFullscreen); if(r){ const pr=r.call(d); if(pr&&pr.catch) pr.catch(()=>{}); } } }catch(err){} }
function paintFull(){ const b=document.querySelector('.t-full'); if(b) b.textContent=fullOn()?'전체 화면 끝':'전체 화면'; }
document.addEventListener('fullscreenchange',paintFull); document.addEventListener('webkitfullscreenchange',paintFull);
if((document.fullscreenEnabled||document.webkitFullscreenEnabled) && !matchMedia('(display-mode: standalone)').matches) document.body.classList.add('canfull');
/* ===== 한 줄 맞춤 ===== */
function fitAll(){
  /* 한 줄 맞춤: 같은 목록(방법·약속·질문) 안의 줄은 같은 크기로 줄이고, 65%까지 줄인 뒤 자간을 좁혀도 넘치는 줄만 그 크기로 두 줄 */
  const els=[...document.querySelectorAll('.fit')];
  els.forEach(el=>{ el.style.fontSize=''; el.style.whiteSpace=''; el.style.textWrap=''; el.style.wordBreak=''; el.style.letterSpacing=''; });
  const over=el=>el.scrollWidth>el.clientWidth+1;
  const groups=new Map();
  els.forEach(el=>{ const g=el.closest('.howto,.rules,.prompts,.cm-steps')||el; if(!groups.has(g)) groups.set(g,[]); groups.get(g).push(el); });
  groups.forEach(list=>{
    if(!list.some(over)) return;
    const base=parseFloat(getComputedStyle(list[0]).fontSize), brand=list[0].matches('.brand b,.cm-where');
    const floor=brand?Math.max(11,base*0.5):Math.max(12,Math.round(base*0.65));
    let size=base;
    const setAll=v=>list.forEach(el=>el.style.fontSize=v+'px');
    while(size>floor){ size-=1; setAll(size); if(!list.some(over)) return; }
    list.forEach(el=>el.style.letterSpacing='-0.04em'); if(!list.some(over)) return;
    if(brand) return;
    list.filter(over).forEach(el=>{ el.style.letterSpacing=''; el.style.whiteSpace='normal'; el.style.textWrap='balance'; el.style.wordBreak='keep-all'; });
  });
}
let fitRaf=0; function fitSoon(){ cancelAnimationFrame(fitRaf); fitRaf=requestAnimationFrame(fitAll); }
new MutationObserver(fitSoon).observe(document.getElementById('app'),{childList:true});
window.addEventListener('resize',fitSoon); window.addEventListener('orientationchange',fitSoon);
if(document.fonts&&document.fonts.ready) document.fonts.ready.then(fitSoon);
/* 한글 글꼴은 글자 묶음별로 늦게 내려받아짐: 새 글꼴이 들어올 때마다 다시 맞춤 */
try{ document.fonts&&document.fonts.addEventListener&&document.fonts.addEventListener('loadingdone',fitSoon); }catch(e){}

/* 아이폰·아이패드: 첫 터치 때 소리 켜기 */
function unlockAudio(){ try{ actx = actx || new (window.AudioContext||window.webkitAudioContext)(); if(actx.state==='suspended') actx.resume(); const b=actx.createBuffer(1,1,22050), s=actx.createBufferSource(); s.buffer=b; s.connect(actx.destination); s.start(0); }catch(e){} document.removeEventListener('touchend',unlockAudio,true); document.removeEventListener('click',unlockAudio,true); }
document.addEventListener('touchend',unlockAudio,true); document.addEventListener('click',unlockAudio,true);
document.getElementById('stopOver').addEventListener('click',e=>{ if(!e.target.closest('[data-action=rewhistle]')) e.currentTarget.classList.remove('open'); });
