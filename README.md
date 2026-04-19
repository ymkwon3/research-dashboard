# 종목 분석 대시보드

주식(미장/국장) 및 크립토 매수점수 분석 대시보드.

## 배포 주소
`https://<본인 GitHub 유저명>.github.io/trading-dashboard/`

## 로컬 실행
```bash
npm install
npm run dev
```

## 종목 추가/수정
`src/App.jsx` 상단 `stocks` 배열에 객체 추가:
```js
{
  ticker: "NVDA",
  name: "엔비디아",
  category: "미장",          // 미장 | 국장 | 크립토
  price: "$950",
  change: "+2.5%",
  positive: true,
  ytd: "+20%",
  atl: "$500",
  ath: "$1,000",
  earning: "5월 28일",
  shortScore: 55,            // 0~100
  midScore: 70,
  tag: "AI대장",
  tagColor: "#22c55e",
  summary: "한 줄 요약",
  bull: ["강세 논거 1", "강세 논거 2", "강세 논거 3"],
  bear: ["리스크 1", "리스크 2", "리스크 3"],
  levels: [
    { label: "현재가", value: "$950", type: "current" },
    { label: "저항", value: "$1,000", type: "resist" },
    { label: "지지", value: "$850", type: "support" },
    { label: "목표가", value: "$1,200", type: "target" },
  ],
}
```
