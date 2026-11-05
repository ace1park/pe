# 자동 점검 (tests)

앱을 고친 뒤 화면과 버튼이 그대로 잘 작동하는지 컴퓨터에서 자동으로 확인하는 파일들입니다. 휴대폰에서 앱을 쓰는 데에는 필요 없습니다.

## 점검 종류

| 파일 | 확인하는 것 |
|---|---|
| `func.test.js` | 버튼·타이머·+1분·점수판·정지 신호·팀 나누기·감정 기록·왕관·리그표·게임 카드·기록 유지 등 44가지 |
| `classmode.test.js` | 수업 중 모드: 켜기·큰 타이머·+1분·팀 보기·대형 그림·난이도·정지·점수판·인원 바꾸기·왕관·1분 알림·끄기 |
| `screens.test.js` | 234차시 × 6단계 화면을 모두 열어 오류, 대형 그림 누락, 글자 넘침 |
| `people.test.js` | 소규모 학급 6~12명, 일반학급 16~24명마다 모든 화면·점수판·팀 나누기와 모둠 인원 합계 |
| `text.test.js` | 화면 너비별 글자 잘림, 화면 밖 넘침, 한 줄이어야 할 곳의 줄바뀜 |
| `clicks.test.js` | 여러 화면의 모든 버튼과 링크를 하나씩 눌러 오류 |
| `run-all.js` | 위 점검을 기기·너비별로 모두 실행하고 결과 요약 |

## 실행 방법 (컴퓨터)

1. [Node.js](https://nodejs.org) LTS 설치
2. 이 `tests` 폴더에서 터미널을 열고:

```bash
npm install
npx playwright install chromium
npm test            # 전체 점검 (10~20분)
npm run test:quick  # 빠른 점검 (2~3분)
```

하나만 돌릴 때:

```bash
DEV="Galaxy S9+" node func.test.js
WIDTH=360 node screens.test.js
node text.test.js 360
```

기본으로 한 단계 위 폴더의 `index.html`을 엽니다. 올린 주소를 점검하려면 `PE_URL=https://아이디.github.io/저장소이름/ npm test`처럼 실행합니다.

## 참고

- 마지막 줄에 `통과` 또는 `실패`가 나오고, 실패하면 무엇이 문제인지 위에 적혀 나옵니다.
- 크롬(Chromium)으로 휴대폰 크기를 흉내 내는 점검입니다. 실제 아이폰 Safari 확인은 휴대폰으로 직접 열어 보세요.
- `text.test.js`의 '짧은 끝줄(orphan)'은 긴 설명 문단의 마지막 줄이 짧게 남은 것으로, 참고용이며 실패로 치지 않습니다.
