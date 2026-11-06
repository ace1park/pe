/* 차시 자료를 담는 그릇 (지우지 마세요)
   - 예전 단원(티볼·배드민턴·배구·육상·넷볼·농구): addLessons([...])
   - 새 종목(뉴스포츠 등): addUnit({단원 정보}, [차시들])  → 견본: data/units/견본_새종목.js */
const PL={};
/* 자료 파일에 따옴표·쉼표가 빠졌을 때 어느 파일 몇째 줄인지 모아 두었다가 홈 화면에 알림 */
window.DATAERR=[];
window.addEventListener('error',e=>{
  const t=e.target, src=t&&t.tagName==='SCRIPT'?String(t.src||''):'';
  if(src){ const m=src.match(/data\/.*\.js/); if(m) window.DATAERR.push(decodeURI(m[0])+' · 열지 못했어요 (목록의 파일 이름, 따옴표·쉼표 확인)'); return; }
  const m=String(e.filename||'').match(/data\/.*\.js/); if(m) window.DATAERR.push(decodeURI(m[0])+' · '+(e.lineno||'?')+'번째 줄 근처'); },true);
const NEWUNITS=[];
function addLessons(list){ list.forEach(l=>{ PL[l.id]=l; }); }
function addUnit(u, list){
  try{
    const id=String(u.번호표||'').trim(); if(!id) throw new Error('번호표가 없어요');
    const grades=(u.학년&&u.학년.length?u.학년:['5~6']).map(String);
    NEWUNITS.push({id, meta:{title:u.이름||id, sub:u.설명||'', area:u.영역||'스포츠', grades, sport:id, color:u.색||'#168b4b'},
      rules:u.약속||[], signal:u.정지신호||'호루라기 두 번 = 멈추고 선생님 보기', icon:u.아이콘||''});
    const FM={'개인':'none','2인':'pair','짝':'pair','3인':'group','모둠':'group','팀':'four','경기':'four'};
    const WHO={'개인':'혼자 · 각자','2인':'짝과 둘이','짝':'짝과 둘이','3인':'세 명이','모둠':'모둠 친구와','팀':'우리 팀과','경기':'우리 팀과'};
    const PIC={'개인':'gen_solo','2인':'gen_pair','짝':'gen_pair','3인':'gen_group','모둠':'gen_group','팀':'gen_goal','경기':'gen_goal'};
    const stageName={};
    list.forEach(c=>{
      const g=String(c.학년||grades[0]), s=+c.단계||1;
      if(c.단계이름) stageName[g+'-'+s]=c.단계이름;
      const acts=(c.활동||[]).slice(0,4).map(a=>{
        const form=a.형태||'모둠', kids=a.이렇게해요||a.방법||[], how=a.방법||a.이렇게해요||[];
        return {tw:false, name:a.이름||'', form, fm:FM[form]||'group', who:a.누구와||WHO[form]||'', steps:kids, tip:a.꿀팁||'', easy:a.쉽게||'', hard:a.어렵게||'',
          eval:a.평가||'', d:{t:a.그림||PIC[form]||'gen_group'}, t:{prep:a.대형||c.대형||'', how, point:a.지도포인트||a.꿀팁||'', easy:a.쉽게||'', hard:a.어렵게||'', odd:a.홀수반||c.홀수반||''}};
      });
      while(acts.length<4) acts.push({tw:false,name:'(활동을 적어 주세요)',form:'모둠',fm:'group',who:'',steps:['활동 방법을 적어 주세요'],tip:'',easy:'',hard:'',eval:'',d:{t:'gen_group'},t:{prep:'',how:[],point:'',easy:'',hard:'',odd:''}});
      const lid=id+(grades.length>1?g.replace('~',''):'')+'-'+c.차시;
      PL[lid]={id:lid, unit:id, g, n:+c.차시, t:c.제목||'', s, sn:stageName[g+'-'+s]||(s+'단계'), ext:!!c.선택차시, ev:!!c.평가차시,
        items:c.준비물||'', prep:c.대형||'', safe:c.안전||'', odd:c.홀수반||'', vars:c.변형게임||[], evnote:c.평가내용||'', move:'',
        D:{goal:c.목표||'', short:c.제목||'', reflect:c.돌아보기||['오늘 가장 잘된 동작은?','오늘 나를 도와준 친구 한 명','오늘 기분을 낱말 하나로!'], m:acts}};
    });
  }catch(e){ window.DATAERR.push(String(u&&u.번호표||'새 종목')+': '+e.message); }
}
/* 단원 파일 불러오기 (data/units/list.js 가 부름) */
function loadUnits(names){ names.forEach(n=>document.write('<script src="data/units/'+encodeURI(n)+'.js"><\/script>')); }
