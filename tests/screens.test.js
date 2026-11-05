/* 화면 점검: 302차시 × 6단계 화면을 모두 열어 오류·대형 그림 누락·글자 넘침 확인 (WIDTH 환경변수, 기본 390) */
const path=require('path');
const BASE=process.env.PE_URL||('file://'+path.resolve(__dirname,'..','index.html'));
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const e=[];
 const p=await b.newPage({viewport:{width:+(process.env.WIDTH||390),height:844}}); p.on('pageerror',x=>e.push(x.message));
 await p.goto(BASE); await p.waitForTimeout(600);
 const ids=await p.evaluate(()=>[...Array.from({length:20},(_,i)=>i+1), ...Object.keys(PL)]);
 let over=[], nodiag=[], cnt=0;
 for(const id of ids){ await p.evaluate(id=>{location.hash='lesson-'+id},id); await p.waitForTimeout(25);
   for(let k=0;k<=5;k++){ await p.evaluate(k=>document.querySelector(`[data-action=step][data-k="${k}"]`).click(),k); cnt++;
     if(k>=1&&k<=4){ const ok=await p.evaluate(()=>!!document.querySelector('.m-only svg.diagram')); if(!ok) nodiag.push(id+'-'+k); }
     const ov=await p.evaluate(()=>{ fitAll(); return [...document.querySelectorAll('.fit')].filter(x=>x.offsetParent&&x.scrollWidth>x.clientWidth+1).map(x=>x.textContent.slice(0,30)); });
     if(ov.length) over.push(id+'-'+k+':'+ov.join('|'));
   } }
 // unit pages
 for(const h of ['map','u-foot','u-tb4','u-tb56','u-bad-3','u-bad-6','u-ath-3','u-ath-6','u-nb','guide','teams','score']){ await p.evaluate(h=>location.hash=h,h); await p.waitForTimeout(60); }
 await p.evaluate(()=>location.hash='u-tb56'); await p.waitForTimeout(100); await p.click('[data-action=card][data-no="5"]'); await p.waitForTimeout(100);
 console.log('screens',cnt,'errors',e.slice(0,5),'nodiag',nodiag.slice(0,10),nodiag.length,'over',over.length, over.filter(x=>!x.includes("꿀팁")).slice(0,40));
 await b.close(); process.exit(e.length||nodiag.length||over.length?1:0);})();
