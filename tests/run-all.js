/* 모든 점검을 차례로 실행: node run-all.js  (빠르게: node run-all.js quick) */
const {spawnSync}=require('child_process');
const quick=process.argv[2]==='quick';
const jobs=[
  ['기능 점검 · iPhone 13', 'func.test.js', {DEV:'iPhone 13'}],
  ['기능 점검 · Galaxy S9+', 'func.test.js', {DEV:'Galaxy S9+'}],
  ...(quick?[]:[
    ['기능 점검 · Pixel 7', 'func.test.js', {DEV:'Pixel 7'}],
    ['기능 점검 · iPhone SE', 'func.test.js', {DEV:'iPhone SE'}],
  ]),
  ['수업 중 모드 점검', 'classmode.test.js', {DEV:'Galaxy S9+'}],
  ['화면 점검 · 390px', 'screens.test.js', {WIDTH:'390'}],
  ...(quick?[]:[
    ['화면 점검 · 360px', 'screens.test.js', {WIDTH:'360'}],
    ['인원 점검 · 6~50명', 'people.test.js', {}],
    ['글자 점검 · 360px', 'text.test.js', {WIDTH:'360'}],
    ['글자 점검 · 390px', 'text.test.js', {WIDTH:'390'}],
    ['글자 점검 · 1280px', 'text.test.js', {WIDTH:'1280'}],
    ['누르기 점검', 'clicks.test.js', {}],
    ['차시 원 한 줄 점검', 'nodes.test.js', {}],
    ['줄바뀜 점검 · 320~768px', 'wrap.test.js', {}],
    ['새 종목 넣기 점검', 'newunit.test.js', {}],
  ]),
];
let fail=0; const sum=[];
for(const [name,file,env] of jobs){
  process.stdout.write(`\n▶ ${name}\n`);
  const t=Date.now();
  const r=spawnSync(process.execPath,[file],{cwd:__dirname,env:{...process.env,...env},stdio:'inherit'});
  const ok=r.status===0; if(!ok) fail++;
  sum.push(`${ok?'통과':'실패'}  ${name}  (${Math.round((Date.now()-t)/1000)}초)`);
}
console.log('\n===== 결과 =====\n'+sum.join('\n'));
process.exit(fail?1:0);
