# 프로그램 지도 (어느 파일에 무엇이 있나)

> 수업 글만 고칠 때는 `수정하는_법.md`를 보면 됩니다. 이 문서는 프로그램(`js`) 자체를 고칠 때 보는 지도입니다.
> Claude에게 고쳐 달라고 할 때도 이 문서를 함께 주면 빠릅니다.

## 1. 큰 그림

- 빌드(변환) 과정이 없는 정적 웹앱입니다. `index.html`이 아래 순서대로 파일을 불러오고, 모든 파일이 같은 전역 공간을 씁니다.
- **불러오는 순서가 중요합니다.** 뒤 파일은 앞 파일에 있는 이름을 씁니다. 새 파일을 넣을 때는 `index.html`의 `<script>`와 `sw.js`의 `CORE` 목록 두 곳에 같은 순서로 넣습니다.
- 오프라인: `sw.js`가 `CORE` 목록 파일을 저장해 두고, 인터넷이 되면 새 파일로 바꿉니다(다음 실행 때 반영).
- 기록: 휴대폰 안 `localStorage`의 `pe-guide-v1` 한 곳에 저장합니다(`js/core.js`의 `store`).

## 2. 불러오는 순서와 하는 일

| 순서 | 파일 | 하는 일 |
|---|---|---|
| 1 | `js/version.js` | 판 번호 `APP_VER`, 바뀐 점 `APP_NOTES` |
| 2 | `data/foot.js` | 발로 하는 공놀이 단계·차시·약속 |
| 3 | `js/core.js` | 인원 편성(`FORMS`), 기록 저장(`store`, `save`), 소리·타이머, 차시 자료 꺼내기(`getD`), 글자 안전 처리(`esc`) |
| 4 | `js/people.js` | 인원·결석·팀 나누기, 홀수 반 처리 |
| 5 | `js/draw.js` | 그림 색(`COL`), 아이콘, 종목 공 아이콘(`sportBallSVG`, `ballURIOf`), 단계 아이콘 |
| 6 | `js/foot_diagrams.js` | 그림 틀 모음 `TPL`, 축구 대형 그림, 범례 만들기 `legendList`, **범례 더하기 `addLegend`** |
| 7–8 | `data/foot_missions.js`, `data/foot3.js` | 발로 하는 공놀이 활동, 3학년 판 |
| 9 | `js/lesson_parts.js` | 활동마다 대형 그림 고르기(`hasDiag`), 차시 아이콘, 리그표, 큰 점수판 |
| 10–11 | `data/units/begin.js`, `data/units/list.js` | 종목 차시 모음 `PL`과 넣는 도구(`addUnit`), **종목 목록**(새 종목은 여기 한 줄) |
| 12 | `data/tb_cards.js` | 티볼 게임 카드 28장 |
| 13 | `js/diagrams/common.js` → 종목별 `*.js` | 대형 그림 틀(아래 3번) |
| 14 | `data/units.js` | 단원 이름·색·학년·약속 |
| 15 | `js/units.js` | 단원·학년·차시 찾기(`lessonsOf`, `isFoot`), 홈 아이콘 |
| 16 | `js/gloss.js` | 낱말 풀이 표 `GLOSS` |
| 17 | `js/screens.js` | 모든 화면 그리기(홈·단원·차시·안내사항·팀·점수판), 주소(#) 따라 화면 바꾸기 `route` |
| 18 | `js/find.js` | 활동 찾기 화면 |
| 19 | `js/actions.js` | 버튼 누르기 처리(`data-a="..."` 이름별), 타이머, 길게 누르기 |
| 20–21 | `data/links.js`, `js/media.js` | 영상·사진 링크 |
| 22 | `js/start.js` | 시작, 새 판 알림 |

## 3. 대형 그림 틀 (`js/diagrams/`)

종목 자료 파일(`data/units/종목.js`)과 **같은 이름으로 나란히** 있습니다. 피구 그림은 `dg.js`, 술래잡기 그림은 `tg.js`처럼 찾으면 됩니다.
모든 파일이 같은 모양입니다: 머리말(그림 이름 목록) → 그 종목만 쓰는 부품 → `Object.assign(TPL,{...})` 그림 틀 → 맨 아래 `addLegend` 범례.
종목 자료의 `d: {t:'그림 이름', ...옵션}`이 이 틀을 부릅니다.

| 파일 | 종목 | 그림 이름 |
|---|---|---|
| `common.js` | 함께 쓰는 것 (가장 먼저 불러옴) | 그림 부품 `SV`, 공 바꾸기 `tplOf`, 새 종목 기본 그림 `gen_*`, 함께 쓰는 장면(`gen_talk` 등) |
| `tb.js` | 티볼 | `tb_*` |
| `bad.js` | 배드민턴 | `bm_*` |
| `vb.js` | 배구형 게임 | `vb_*` |
| `ath.js` | 육상 | `at_*` |
| `nb.js` | 넷볼 | `nb_*` |
| `bb.js` | 농구 | `bb_*` |
| `ck.js` | 츄크볼 | `gen_bounder*` |
| `fd.js` | 플라잉 디스크 | `fd_*` |
| `fb.js` | 플로어볼 | `fb_*` |
| `pk.js` | 피클볼 | `pk_*` |
| `cp.js` | 교실놀이 | `cl_*` |
| `tg.js` | 술래잡기 | `tg_*` |
| `dg.js` | 피구 | `dg_*` |

- 발로 하는 공놀이·축구형 그림은 `js/foot_diagrams.js`에 있습니다.
- 그림 이름은 그 종목 파일에 두지만, 다른 종목도 빌려 쓸 수 있습니다. 예: 배드민턴·배구가 피클볼 그림 `pk_pair`를 `racket: true`로 빌려 씀.
- 부품을 두 종목 이상이 쓰면 `common.js`에, 한 종목만 쓰면 그 종목 파일에 둡니다.

**새 그림을 더하는 법**
1. 그 종목 파일의 `Object.assign(TPL,{ ... })` 맨 끝에 `, 새이름:o=>{ ... return {s, l:[...]}; }`
2. 범례에 새 물건이 있으면 같은 파일 맨 아래 `addLegend`의 `ex` 안에 `키:[작은 SVG, '이름']` 한 줄
   - 범례 키는 `'키'` 또는 `'키:바꿀 이름'`으로 씁니다. 같은 키가 여러 파일에 있으면 나중에 불러온 파일의 것이 쓰입니다.
3. `수정하는_법.md` 7번 표에 그림 이름과 옵션을 한 줄 적습니다.
4. `tests/data.test.js`를 돌려 그림 이름이 틀리지 않았는지 확인합니다.

**새 종목의 그림 파일 만들기**: `fb.js`(가장 짧음)를 복사해 `js/diagrams/새종목.js`로 저장하고 내용을 바꾼 뒤, `index.html`과 `sw.js`에서 `dg.js` 다음 줄에 넣습니다.

## 4. 자주 고치는 곳

| 고칠 것 | 파일 · 찾을 낱말 |
|---|---|
| 버튼 하나의 동작 | `js/actions.js`에서 `case '버튼이름'` (버튼의 `data-a` 값) |
| 홈 화면 | `js/screens.js`의 `renderShelf` |
| 종목 묶음(영역형·필드형…) | `js/screens.js`의 `UGROUPS` |
| 안내사항 글 | `js/screens.js`의 `renderGuide` |
| 함께 쓰는 약속 | `js/screens.js`의 `TERMS` |
| 타이머 시간 정하기 | `js/screens.js`의 `openTimeSet`, `js/actions.js`의 `tset`·`tapply` |
| 기록 내보내기·가져오기 | `js/screens.js`의 `recExport`·`recApply` |
| 활동 찾기의 거르기 단추 | `js/find.js`의 `FGROUPS`·`FQUICK` |
| 종목 공 아이콘 | `js/draw.js`의 `SPB`(모양)·`SPBOF`(종목별 공) |
| 색·글자 크기 | `css/app.css` 맨 위 `:root` |

## 5. 고친 뒤 확인

1. `tests` 폴더에서 `node data.test.js` (1분): 빠진 칸·깨진 글자·그림 오류
2. `npm run test:quick` (2~3분) 또는 `npm test` (전체)
3. `js/version.js`의 `APP_VER`·`APP_NOTES`와 `CHANGELOG.md`에 한 줄
4. 새 파일을 만들었다면 `index.html`과 `sw.js` 두 곳에 넣었는지 확인
