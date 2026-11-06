/* [프로그램] 영상·사진 넣기(이 기기에 저장) + data/links.js 기본 자료 */
/* ===== 가이드 영상·사진 =====
   - 이 기기에만: IndexedDB(브라우저 안) 저장. HTML 파일·링크 모두에서 작동
   - 모두에게 공유: 안내서 링크(아티팩트)에서 편집 권한이 있는 선생님만. 파일은 assets, 목록은 db 'media/<활동키>' */
const MEDIA={local:{}, shared:{}, urls:new Map(), idb:null, db:null, assets:null, canShare:false, cur:null, addKey:null, dest:null, busy:false};
const MAX_SHARED=20*1024*1024, MAX_LOCAL=500*1024*1024;
const ICON_CAM=`<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="5" y="13" width="38" height="27" rx="6" fill="#fff" stroke="${COL.ink}" stroke-width="2.5"/><path d="M16 13 l3,-5 h10 l3,5" fill="${COL.mk}" stroke="${COL.ink}" stroke-width="2.5" stroke-linejoin="round"/><circle cx="24" cy="26" r="8" fill="${COL.blue}" stroke="${COL.ink}" stroke-width="2.5"/><path d="M22 22.5 l6,3.5 l-6,3.5 z" fill="#fff"/></svg>`;
function mid(){ return 'm'+Date.now().toString(36)+Math.random().toString(36).slice(2,7); }
function idbOpen(){ return new Promise(res=>{ try{ if(!window.indexedDB) return res(null); const r=indexedDB.open('pe-guide-media',1);
  r.onupgradeneeded=()=>{ const s=r.result.createObjectStore('m',{keyPath:'id'}); s.createIndex('key','key'); };
  r.onsuccess=()=>res(r.result); r.onerror=()=>res(null); r.onblocked=()=>res(null); }catch(e){ res(null); } }); }
function idbTx(mode,fn){ return new Promise((res,rej)=>{ try{ const tx=MEDIA.idb.transaction('m',mode), r=fn(tx.objectStore('m')); let out;
  if(r) r.onsuccess=()=>{ out=r.result; }; tx.oncomplete=()=>res(out); tx.onerror=()=>rej(tx.error); tx.onabort=()=>rej(tx.error); }catch(e){ rej(e); } }); }
const idbAll=()=>idbTx('readonly',st=>st.getAll());
const idbPut=rec=>idbTx('readwrite',st=>st.put(rec));
const idbDel=id=>idbTx('readwrite',st=>st.delete(id));

async function mediaInit(){
  MEDIA.idb=await idbOpen();
  if(MEDIA.idb){ try{ const all=(await idbAll())||[]; all.sort((a,b)=>a.at-b.at); all.forEach(r=>{ (MEDIA.local[r.key]=MEDIA.local[r.key]||[]).push(r); }); }catch(e){} }
  refreshMedia(); sharedInit();
}
/* data/links.js 의 기본 자료를 모든 기기에 보이게 */
function sharedInit(){
  const L=(typeof LINKS==='object'&&LINKS)||{}, m={};
  Object.entries(L).forEach(([key,list])=>{ if(!Array.isArray(list)) return;
    m[key]=list.filter(x=>Array.isArray(x)&&x[1]).map(([title,url],k)=>{ const u=String(url).trim();
      const kind=/\.(jpe?g|png|gif|webp)$/i.test(u)?'img':/\.(mp4|webm|mov|m4v)$/i.test(u)?'vid':'link';
      return {id:'b'+key+'_'+k, kind, url:u, title:String(title||'')}; }); });
  MEDIA.shared=m; refreshMedia();
}
const mq={};
function sharedWrite(key,mut){
  const p=(mq[key]||Promise.resolve()).then(async()=>{ const ref=MEDIA.db.collection('media').doc(key); const s=await ref.get();
    const items=(s.exists&&Array.isArray(s.data().items))?s.data().items.slice():[]; await ref.set({key, items:mut(items), at:Date.now()}); });
  mq[key]=p.catch(()=>{}); return p;
}
function mediaItems(key){
  return [...(MEDIA.shared[key]||[]).map(x=>Object.assign({},x,{src:'s'})), ...(MEDIA.local[key]||[]).map(x=>Object.assign({},x,{src:'l'}))];
}
function mediaSrc(it){
  if(it.kind==='link') return it.url;
  if(it.src==='s') return it.url;
  let u=MEDIA.urls.get(it.id); const rec=(MEDIA.local[it.key]||[]).find(r=>r.id===it.id);
  if(!u&&rec&&rec.blob){ u=URL.createObjectURL(rec.blob); MEDIA.urls.set(it.id,u); }
  return u||'';
}
function ytId(u){ const m=String(u||'').match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/))([\w-]{11})/); return m?m[1]:null; }
function hostOf(u){ try{ return new URL(u).hostname.replace(/^www\./,''); }catch(e){ return ''; } }
function mTitle(it){ return it.title||(it.kind==='img'?'사진':it.kind==='vid'?'영상':(ytId(it.url)?'유튜브 영상':hostOf(it.url)||'링크')); }
function mediaTile(key,it){
  let th='';
  if(it.kind==='img') th=`<img src="${esc(mediaSrc(it))}" alt="" loading="lazy">`;
  else if(it.kind==='vid') th=`<video src="${esc(mediaSrc(it))}#t=0.1" preload="metadata" muted playsinline></video><span class="mplay">▶</span>`;
  else { const y=ytId(it.url); th=(y?`<img class="ytthumb" src="https://i.ytimg.com/vi/${y}/mqdefault.jpg" alt="" loading="lazy">`:'')+`<span class="mlinkic">${y?'▶':'↗'}</span>`; }
  return `<button class="mtile k-${it.kind}" data-action="mview" data-key="${esc(key)}" data-id="${esc(it.id)}">${th}<span class="mcap">${esc(mTitle(it))}</span>${it.src==='s'?'<i class="mbadge">기본</i>':''}</button>`;
}
function mediaInner(key,whole){
  const items=mediaItems(key), lab=whole?'차시 영상·사진':'활동 시범 영상·사진';
  if(!items.length) return `<button class="mempty" data-action="madd" data-key="${esc(key)}">${ICON_CAM}<b>${lab} 넣기</b><small>시범 사진·영상, 유튜브 링크</small></button>`;
  return `<div class="mhead"><h3>${ICON_CAM}${lab}<em>${items.length}</em></h3><button class="madd" data-action="madd" data-key="${esc(key)}">＋ 넣기</button></div><div class="mstrip">${items.map(it=>mediaTile(key,it)).join('')}</div>`;
}
function mediaHTML(key,whole){ return `<section class="media" data-mkey="${esc(key)}" data-whole="${whole?1:0}">${mediaInner(key,whole)}</section>`; }
function refreshMedia(){
  document.querySelectorAll('.media[data-mkey]').forEach(el=>{ const h=mediaInner(el.dataset.mkey, el.dataset.whole==='1'); if(el._h!==h){ el.innerHTML=h; el._h=h; } });
  const o=document.getElementById('mediaOver');
  if(o.classList.contains('open')&&MEDIA.cur&&!MEDIA.cur.add&&!mediaItems(MEDIA.cur.key).some(x=>x.id===MEDIA.cur.id)) closeMedia();
}
function mOpen(html){ const o=document.getElementById('mediaOver'); document.getElementById('mediaBox').innerHTML=html; o.classList.add('open'); }
function closeMedia(){ const o=document.getElementById('mediaOver'); o.classList.remove('open'); document.getElementById('mediaBox').innerHTML=''; MEDIA.cur=null; }
function actName(key){
  const k=String(key), j=k.lastIndexOf('-'), n=toId(k.slice(0,j)), i=+k.slice(j+1);
  try{ const l=LI(n), D=getD(n); return l.n+'차시 · '+(i===0?'차시 전체':(D.m[i-1]&&D.m[i-1].name)||''); }catch(e){ return ''; }
}
function openMediaView(key,id){
  const items=mediaItems(key), j=items.findIndex(x=>x.id===id); if(j<0) return; const it=items[j];
  MEDIA.cur={key,id,del:false};
  let body;
  if(it.kind==='img') body=`<img class="mbig" src="${esc(mediaSrc(it))}" alt="${esc(mTitle(it))}">`;
  else if(it.kind==='vid') body=`<video class="mbig" src="${esc(mediaSrc(it))}" controls playsinline autoplay></video>`;
  else { const y=ytId(it.url); body=`<div class="mlinkbig">${y?`<img class="ytthumb" src="https://i.ytimg.com/vi/${y}/hqdefault.jpg" alt="">`:''}<a class="btn y" href="${esc(it.url)}" target="_blank" rel="noopener noreferrer">영상 보러 가기 ↗</a><small>${esc(hostOf(it.url))} · 새 창으로 열려요</small></div>`; }
  const canDel = it.src==='l';
  const nav = items.length>1 ? `<button class="mnav" data-action="mstep" data-d="-1" aria-label="이전">‹</button><span class="mcount">${j+1} / ${items.length}</span><button class="mnav" data-action="mstep" data-d="1" aria-label="다음">›</button>` : '';
  mOpen(`<div class="mvtop"><div><b>${esc(mTitle(it))}</b><small>${esc(actName(key))}</small></div><button class="mx" data-action="mclose" aria-label="닫기">✕</button></div>
    <div class="mstage">${body}</div>
    <div class="mvbar">${nav}<span class="msrc">${it.src==='s'?'기본 자료 · 모든 기기에 보여요 (data/links.js)':'이 기기에만 저장'}</span>${canDel?`<button class="mdel" data-action="mdel">지우기</button>`:''}</div>`);
}
function openMediaAdd(key){
  MEDIA.addKey=key; MEDIA.cur={key,add:true}; if(!MEDIA.canShare) MEDIA.dest='l'; else if(!MEDIA.dest) MEDIA.dest='s';
  const share=MEDIA.canShare;
  mOpen(`<div class="mvtop"><div><b>영상·사진 넣기</b><small>${esc(actName(key))} · 자료 번호 <code class="mkey">${esc(key)}</code></small></div><button class="mx" data-action="mclose" aria-label="닫기">✕</button></div>
    ${share?`<div class="seg mdest" role="group" aria-label="저장할 곳">${[['s','모두에게 공유'],['l','이 기기에만']].map(([v,t])=>`<button aria-pressed="${MEDIA.dest===v}" data-action="mdest" data-v="${v}">${t}</button>`).join('')}</div>
      <p class="mhint" id="mDestHint">${MEDIA.dest==='s'?'이 안내서 링크를 여는 선생님 모두가 봐요 · 파일 하나 20MB까지(짧은 영상)':'지금 이 기기(브라우저)에서만 보여요 · 긴 영상도 넣을 수 있어요'}</p>`
     :`<p class="mhint">${MEDIA.idb?'지금 이 기기(브라우저)에만 저장돼요. 다른 기기·선생님과 나누려면 유튜브 링크를 넣으세요.':'이 브라우저는 파일을 저장할 수 없어요. 영상 링크만 넣을 수 있어요.'}</p>`}
    <label class="mfield"><span>제목 (안 써도 돼요)</span><input id="mTitle" maxlength="40" placeholder="예: 공 몰기 시범" autocomplete="off"></label>
    <div class="mpickrow">
      <label class="btn y mfilebtn">사진·영상 고르기<input type="file" id="mFile" accept="image/*,video/*" multiple></label>
      <label class="btn mfilebtn">바로 찍기<input type="file" id="mCam" accept="image/*,video/*" capture="environment"></label>
    </div>
    <div class="mor"><span>또는 영상 링크</span></div>
    <div class="mlinkrow"><input id="mUrl" type="url" inputmode="url" placeholder="https://youtu.be/…" autocomplete="off"><button class="btn" data-action="mlink">넣기</button></div>
    <p class="mstatus" id="mStatus" aria-live="polite"></p>
    <div class="mprivacy"><b>올리기 전에 꼭</b><ul><li>학생이 나오면 보호자 동의를 받은 것만</li><li>얼굴은 뒷모습·먼 거리로 가리기</li><li>이름표·명찰이 보이지 않게</li><li>배경 음악은 저작권 문제 없는 것만</li></ul></div>`);
}
function mStatus(t,bad){ const s=document.getElementById('mStatus'); if(s){ s.textContent=t; s.classList.toggle('bad',!!bad); } }
function kindOf(f){
  if(/^video\//.test(f.type)) return 'vid'; if(/^image\//.test(f.type)) return 'img';
  if(/\.(mov|mp4|m4v|webm)$/i.test(f.name)) return 'vid'; if(/\.(jpe?g|png|gif|webp|heic|heif)$/i.test(f.name)) return 'img'; return null;
}
async function shrinkImage(file){
  try{
    if(/gif|svg/.test(file.type)) return file;
    const url=URL.createObjectURL(file);
    const img=await new Promise((res,rej)=>{ const i=new Image(); i.onload=()=>res(i); i.onerror=rej; i.src=url; });
    const w=img.naturalWidth, h=img.naturalHeight, s=Math.min(1,1600/Math.max(w,h));
    if(s===1&&file.size<1.5e6&&/jpeg|png|webp/.test(file.type)){ URL.revokeObjectURL(url); return file; }
    const c=document.createElement('canvas'); c.width=Math.round(w*s); c.height=Math.round(h*s);
    const g=c.getContext('2d'); g.fillStyle='#fff'; g.fillRect(0,0,c.width,c.height); g.drawImage(img,0,0,c.width,c.height); URL.revokeObjectURL(url);
    return await new Promise(r=>c.toBlob(b=>r(b),'image/jpeg',0.85));
  }catch(e){ return null; }
}
function upErr(e){
  const c=e&&e.code;
  if(c==='too_large') return '20MB가 넘어 공유할 수 없어요. 영상을 짧게 자르거나, 유튜브 링크로 넣거나, \'이 기기에만\'을 고르세요.';
  if(c==='unsupported_type') return '이 파일 형식은 공유할 수 없어요. 사진은 JPG·PNG, 영상은 MP4로 바꾸거나 \'이 기기에만\'을 고르세요.';
  if(c==='quota_or_state') return '공유 저장 공간이 가득 찼어요. 안 쓰는 자료를 지우거나 \'이 기기에만\'을 고르세요.';
  if(c==='rate_limited') return '너무 빨리 올리고 있어요. 잠시 뒤 다시 해 주세요.';
  if(c==='upstream_auth') return '로그인이 풀렸어요. 페이지를 새로 고친 뒤 다시 해 주세요.';
  return '올리지 못했어요. 잠시 뒤 다시 해 주세요.';
}
async function addLocal(rec){
  await idbPut(rec); (MEDIA.local[rec.key]=MEDIA.local[rec.key]||[]).push(rec);
  try{ navigator.storage&&navigator.storage.persist&&navigator.storage.persist(); }catch(e){}
}
async function mediaFiles(files){
  if(MEDIA.busy||!files||!files.length) return; MEDIA.busy=true;
  const key=MEDIA.addKey, dest=MEDIA.dest, title=((document.getElementById('mTitle')||{}).value||'').trim(), n=files.length;
  let ok=0, msg='';
  for(let k=0;k<n;k++){
    const f=files[k], kind=kindOf(f), t=title?(n>1?title+' '+(k+1):title):'';
    if(!kind){ msg='사진·영상 파일만 넣을 수 있어요.'; continue; }
    mStatus(`넣는 중… ${k+1} / ${n}${kind==='vid'?' (영상은 조금 걸려요)':''}`);
    let blob=f; if(kind==='img'){ const b=await shrinkImage(f); if(b) blob=b; }
    try{
      if(dest==='s'){
        if(!MEDIA.assets||!MEDIA.db) throw {code:'not_granted'};
        if(blob.size>MAX_SHARED) throw {code:'too_large'};
        let type=blob.type||'';
        if(kind==='vid'&&!/^video\/(mp4|webm)$/.test(type)) type=/webm$/i.test(f.name)?'video/webm':'video/mp4';
        if(kind==='img'&&!/^image\/(png|jpeg|gif|webp)$/.test(type)) throw {code:'unsupported_type'};
        const r=await MEDIA.assets.upload(blob,{type});
        await sharedWrite(key,items=>items.concat([{id:mid(), kind, asset:r.id, title:t, at:Date.now()}]));
      } else {
        if(!MEDIA.idb){ msg='이 브라우저는 파일을 저장할 수 없어요. 영상 링크로 넣어 주세요.'; break; }
        if(blob.size>MAX_LOCAL){ msg='500MB가 넘는 영상은 넣을 수 없어요. 유튜브 링크로 넣어 주세요.'; continue; }
        await addLocal({id:mid(), key, kind, blob, type:blob.type, title:t, at:Date.now()});
      }
      ok++;
    }catch(e){ msg=dest==='s'?upErr(e):'저장하지 못했어요. 기기 저장 공간을 확인해 주세요.'; }
  }
  MEDIA.busy=false; refreshMedia();
  if(ok&&!msg){ chime(); closeMedia(); return; }
  mStatus((ok?ok+'개를 넣었어요. ':'')+msg, !!msg);
}
async function mediaLink(){
  const inp=document.getElementById('mUrl'); let u=((inp&&inp.value)||'').trim();
  if(!/^https?:\/\//i.test(u)){ if(/^[\w-]+(\.[\w-]+)+(\/|$)/.test(u)) u='https://'+u; else { mStatus('https://로 시작하는 영상 주소를 넣어 주세요.',true); return; } }
  try{ new URL(u); }catch(e){ mStatus('주소가 올바르지 않아요.',true); return; }
  const key=MEDIA.addKey, t=((document.getElementById('mTitle')||{}).value||'').trim(), it={id:mid(), kind:'link', url:u, title:t, at:Date.now()};
  try{
    if(MEDIA.dest==='s'){ if(!MEDIA.db) throw 0; await sharedWrite(key,items=>items.concat([it])); }
    else { if(!MEDIA.idb){ mStatus('이 브라우저는 저장을 지원하지 않아요.',true); return; } await addLocal(Object.assign({key},it)); }
  }catch(e){ mStatus('넣지 못했어요. 잠시 뒤 다시 해 주세요.',true); return; }
  refreshMedia(); chime(); closeMedia();
}
async function mediaDelete(){
  const c=MEDIA.cur; if(!c||c.add) return; const it=mediaItems(c.key).find(x=>x.id===c.id); if(!it) return closeMedia();
  const b=document.querySelector('#mediaBox .mdel');
  if(!c.del){ c.del=true; if(b){ b.textContent='한 번 더 누르면 지워져요'; b.classList.add('sure'); } return; }
  try{
    if(it.src==='s'){ await sharedWrite(c.key,items=>items.filter(x=>x.id!==it.id)); if(it.asset&&MEDIA.assets){ try{ await MEDIA.assets.delete(it.asset); }catch(e){} } }
    else { await idbDel(it.id); MEDIA.local[c.key]=(MEDIA.local[c.key]||[]).filter(x=>x.id!==it.id); const u=MEDIA.urls.get(it.id); if(u){ URL.revokeObjectURL(u); MEDIA.urls.delete(it.id); } }
  }catch(e){ if(b) b.textContent='지우지 못했어요'; return; }
  closeMedia(); refreshMedia();
}
function mediaStep(d){ const c=MEDIA.cur; if(!c) return; const items=mediaItems(c.key), j=items.findIndex(x=>x.id===c.id); if(j<0) return; const nx=items[(j+d+items.length)%items.length]; openMediaView(c.key,nx.id); }
document.getElementById('mediaOver').addEventListener('click',e=>{ if(e.target.id==='mediaOver') closeMedia(); });
document.getElementById('mediaOver').addEventListener('change',e=>{ if(e.target.matches('#mFile,#mCam')){ const fs=Array.from(e.target.files||[]); e.target.value=''; mediaFiles(fs); } });
document.getElementById('mediaOver').addEventListener('keydown',e=>{ if(e.key==='Enter'&&e.target.id==='mUrl'){ e.preventDefault(); mediaLink(); } });
document.addEventListener('error',e=>{ const t=e.target; if(t&&t.classList&&t.classList.contains('ytthumb')) t.remove(); },true);


