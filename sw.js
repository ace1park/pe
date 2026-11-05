/* 내 손 안의 체육 · 서비스 워커
   - 처음 열 때 앱 전체(화면·글꼴·아이콘)를 기기에 저장 → 그 뒤로는 인터넷 없이 작동
   - 인터넷이 될 때는 뒤에서 새 파일을 받아 두고, 다음에 열 때 바뀜(수업 중에 화면이 갑자기 바뀌지 않음) */
const VERSION='pe-20261105-1002';
const CORE=['./','index.html','manifest.webmanifest','fonts/fonts.css','fonts/BlackHanSans.woff2','fonts/GothicA1-400.woff2','fonts/GothicA1-600.woff2','fonts/GothicA1-800.woff2','icons/icon-192.png','icons/icon-512.png','icons/icon-maskable-512.png','icons/apple-touch-icon.png'];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(VERSION).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  const req=e.request, url=new URL(req.url);
  if(req.method!=='GET' || url.origin!==location.origin) return;           // 유튜브 썸네일 등 바깥 주소는 그대로
  const isPage=req.mode==='navigate';
  const key=isPage?'index.html':req;
  e.respondWith(caches.open(VERSION).then(async cache=>{
    const hit=await cache.match(key,{ignoreSearch:true});
    const net=fetch(req).then(res=>{ if(res&&res.ok&&res.type==='basic') cache.put(key,res.clone()); return res; }).catch(()=>null);
    if(hit){ e.waitUntil(net); return hit; }                            // 저장본 먼저, 새 파일은 뒤에서
    const res=await net; return res || (isPage ? cache.match('index.html') : new Response('',{status:504}));
  }));
});
