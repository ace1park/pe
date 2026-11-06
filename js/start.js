/* [프로그램] 홈 화면에 추가 안내·시작 */
/* ===== 홈 화면에 추가 안내 (아이폰 Safari · 안드로이드 Chrome) ===== */
const PLATFORM=(()=>{ const ua=navigator.userAgent||''; const ios=/iPhone|iPad|iPod/.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1); return {ios, android:/Android/.test(ua), standalone:(window.matchMedia&&matchMedia('(display-mode: standalone)').matches)||navigator.standalone===true}; })();
document.documentElement.classList.toggle('is-ios',PLATFORM.ios); document.documentElement.classList.toggle('is-standalone',PLATFORM.standalone);
let deferredInstall=null;
function installBar(html){ const b=document.getElementById('installBar'); b.innerHTML=html+`<button class="ib-x" data-action="installno" aria-label="닫기">다음에</button>`; b.hidden=false; }
function installDismissed(){ try{ return +localStorage.getItem('pe-install-no')>Date.now(); }catch(e){ return false; } }
window.addEventListener('beforeinstallprompt',e=>{ e.preventDefault(); deferredInstall=e; if(!installDismissed()) installBar(`<div class="ib-t"><b>앱으로 설치하기</b><span>홈 화면에서 바로 열고, 인터넷 없이도 써요</span></div><button class="ib-go" data-action="installgo">설치</button>`); });
window.addEventListener('appinstalled',()=>{ document.getElementById('installBar').hidden=true; });
function maybeIOSInstall(){
  if(!PLATFORM.ios||PLATFORM.standalone||location.protocol!=='https:'||installDismissed()) return;
  installBar(`<div class="ib-t"><b>아이폰에서 앱처럼 쓰기</b><span>아래 <svg viewBox="0 0 24 24" class="ib-share" aria-label="공유"><path d="M12 3v12M7 8l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 11H5v10h14V11h-1" fill="none" stroke="currentColor" stroke-width="2.2"/></svg> 공유 → <b>홈 화면에 추가</b> → 추가</span></div>`);
}
setTimeout(maybeIOSInstall,1500);

function markMedia(){ document.querySelectorAll('.media[data-mkey]').forEach(el=>{ el._h=mediaInner(el.dataset.mkey, el.dataset.whole==='1'); }); }
/* ===== 시작 ===== */
try{ const stn=document.getElementById('static'); if(stn) stn.remove(); }catch(e){}
function start(){ ui.route=''; route(); if(!MEDIA.started){ MEDIA.started=true; mediaInit(); } }
start();

