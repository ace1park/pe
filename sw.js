/* 내 손 안의 체육 · 서비스 워커 (고칠 일 없음)
   - 처음 열 때 앱 전체를 기기에 저장 → 그 뒤로는 인터넷 없이 작동
   - 인터넷이 될 때는 뒤에서 새 파일을 받아 두고, 다음에 열 때 바뀜(수업 중에 화면이 갑자기 바뀌지 않음)
   - 파일을 고쳐 올려도 이 파일은 그대로 두면 됩니다. 단원 파일은 data/units/list.js 목록을 읽어 저절로 저장합니다. */
const CACHE='pe-app';
const CORE=[
  './',
  'index.html',
  'manifest.webmanifest',
  'css/app.css',
  'fonts/fonts.css',
  'fonts/BlackHanSans.woff2',
  'fonts/GothicA1-400.woff2',
  'fonts/GothicA1-600.woff2',
  'fonts/GothicA1-800.woff2',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png',
  'data/foot.js',
  'js/core.js',
  'js/draw.js',
  'js/foot_diagrams.js',
  'data/foot_missions.js',
  'js/lesson_parts.js',
  'data/units/begin.js',
  'data/units/list.js',
  'data/tb_cards.js',
  'js/sport_diagrams.js',
  'data/units.js',
  'js/units.js',
  'js/screens.js',
  'js/actions.js',
  'data/links.js',
  'js/media.js',
  'js/start.js'
];
self.addEventListener('install',e=>{
  e.waitUntil((async()=>{
    const c=await caches.open(CACHE); let units=[];
    try{ const t=await (await fetch('data/units/list.js',{cache:'no-cache'})).text();
      units=t.replace(/\/\*[\s\S]*?\*\//g,'').split('\n').map(l=>l.replace(/\/\/.*$/,'')).join('\n').match(/'([^']+)'/g)||[]; units=units.map(x=>'data/units/'+x.slice(1,-1)+'.js'); }catch(err){}
    await Promise.all(CORE.concat(units).map(u=>c.add(u).catch(()=>{})));
    await self.skipWaiting(); })());
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  const req=e.request, url=new URL(req.url);
  if(req.method!=='GET' || url.origin!==location.origin) return;           // 유튜브 썸네일 등 바깥 주소는 그대로
  const isPage=req.mode==='navigate';
  const key=isPage?'index.html':req;
  e.respondWith(caches.open(CACHE).then(async cache=>{
    const hit=await cache.match(key,{ignoreSearch:true});
    const net=fetch(req,{cache:'no-cache'}).then(res=>{ if(res&&res.ok&&res.type==='basic') cache.put(key,res.clone()); return res; }).catch(()=>null);
    if(hit){ e.waitUntil(net); return hit; }                            // 저장본 먼저, 새 파일은 뒤에서
    const res=await net; return res || (isPage ? cache.match('index.html') : new Response('',{status:504}));
  }));
});
