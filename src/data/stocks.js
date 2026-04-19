export const stocks = [
  {
    ticker: "MSFT",
    name: "마이크로소프트",
    category: "미장",
    price: "$422",
    change: "+4.63%",
    positive: true,
    ytd: "-13%",
    ath: "$555",
    atl: "$355",
    marketCap: "$3.14T",
    per: "23.4x",
    forwardPer: "20~22x",
    fiveYearAvgPer: "32.4x",
    earning: "4월 29일",
    shortScore: 58,
    midScore: 75,
    tag: "핵심픽",
    tagColor: "#22c55e",

    summary: "Mag7 최대 낙오자. ATH $555 대비 -24%. P/E 23x로 5년 최저 수준. Azure +39% YoY 성장 중이나 CapEx ROI 우려로 시장이 과도하게 할인 중. 4월 29일 어닝이 분기점.",

    context: "Q2 FY2026에서 EPS $4.14(컨센 $3.97 상회), 매출 $81.27B(컨센 상회)로 숫자는 좋았지만 Azure 성장률이 40%→39%로 1%p 둔화, 영업이익률 가이던스 하회로 주가 -7% 급락. 이후 하락 지속해 3월 $343 저점 형성 후 반등 중.",

    keyMetrics: [
      { label: "FY2025 매출", value: "$245B" },
      { label: "Q2 FY2026 매출", value: "$81.27B (+18% YoY)" },
      { label: "Q2 FY2026 EPS", value: "$4.14 (컨센 대비 +6.2%)" },
      { label: "Azure 성장률", value: "+39% YoY (가이던스 37~38%)" },
      { label: "Microsoft Cloud 분기", value: "$50B+ (사상 최초)" },
      { label: "Copilot 유료 시트", value: "1,500만 (M365 4.5억 중 3.3%)" },
      { label: "상업 RPO", value: "$6,250억 (YoY +110%)" },
      { label: "Q2 CapEx", value: "$375억 (YoY +66%)" },
      { label: "Q3 예상 CapEx", value: "$269억 (피크아웃 기대)" },
      { label: "FY2026 EPS 컨센", value: "$16.46 (YoY +20.7%)" },
      { label: "AI 비즈니스 연환산", value: "$130억 → FY26 $250억 궤도" },
      { label: "OpenAI 계약", value: "Azure 서비스 $2,500억 구매 계약" },
    ],

    bull: [
      "RPO $6,250억 — 수년치 매출 이미 계약됨",
      "Azure +39% YoY, AI 용량 추가로 재가속 기대",
      "P/E 23x — 5년 평균 32.4x 대비 -28% 할인",
      "OpenAI $2,500억 Azure 구매 계약으로 구조적 수요 고정",
      "AI 비즈니스 FY26 $250억, FY27 $400~500억 궤도",
      "Q3 CapEx $269억으로 피크아웃 — FCF 회복 내러티브",
      "기관 LEAPS: Dec 2026 $575 콜 20만 계약+ 매수 포착",
      "Copilot 유료 시트 1,500만 — 일일 사용량 3배 증가",
    ],

    bear: [
      "Azure 성장 40%→39% 둔화에 시장 과민 반응 지속 가능",
      "2026년 연간 CapEx $1,000~1,200억 ROI 불확실",
      "Copilot 침투율 3.3% — 기업 파일럿 단계 정체",
      "Death Cross 차트 구조 (50일 MA < 200일 MA)",
      "50일 MA $387, 100일 MA $439, 200일 MA $475 모두 현재가 위",
      "AI 에이전트 수익화 증명까지 시간 필요",
    ],

    scenarios: [
      { name: "강세", condition: "Azure ≥38% + CapEx $269억 이하 확인", target: "$460~480", probability: "40%" },
      { name: "중립", condition: "Azure 37~38% + 가이던스 유지", target: "$440~450", probability: "40%" },
      { name: "약세", condition: "Azure <37% + Copilot 실망", target: "$380~390 재테스트", probability: "20%" },
    ],

    levels: [
      { label: "현재가", value: "$422", type: "current" },
      { label: "피보나치 0.618 저항", value: "$423", type: "resist" },
      { label: "100일 MA", value: "$426~439", type: "resist" },
      { label: "피보나치 0.786", value: "$480", type: "resist" },
      { label: "200일 MA", value: "$458~475", type: "resist" },
      { label: "52주 ATH", value: "$555.45", type: "resist" },
      { label: "애널 컨센서스 목표가", value: "$587", type: "target" },
      { label: "1차 지지", value: "$395~400", type: "support" },
      { label: "핵심 지지 (3월 저점권)", value: "$355~369", type: "support" },
      { label: "Bull thesis 손절선", value: "$340", type: "stop" },
    ],

    watchPoints: [
      "4/29 어닝: Azure 성장률 37~38% 유지 여부",
      "4/29 어닝: Q3 CapEx 가이던스 — 피크아웃 확인",
      "Copilot 기업 배포 확대 속도",
      "OpenAI와 독점 계약 구조 변화 여부",
    ],
  },

  {
    ticker: "GOOGL",
    name: "알파벳",
    category: "미장",
    price: "$341",
    change: "+1.71%",
    positive: true,
    ytd: "+0.7%",
    ath: "$349",
    atl: "$146",
    marketCap: "$4.1T",
    per: "28~30x",
    forwardPer: "28x",
    earning: "4월 29일",
    shortScore: 48,
    midScore: 70,
    tag: "저평가",
    tagColor: "#3b82f6",

    summary: "Mag7 중 가장 저렴한 P/E 28x. DOJ Chrome/Android 강제 분리 시나리오 4/8 해소. Cloud 백로그 $243B. 연간 매출 $400B 첫 돌파. 4/29 어닝 + Google Cloud Next(4/22~24) 이벤트 집중.",

    context: "FY2025 매출 $402.8B(+15% YoY), 순이익 $132.2B(+32% YoY). Q4 2025 매출 $113.8B(+18%), EPS $2.82(컨센 $2.63 대비 +7%). Cloud Q4 +48% YoY. 2월 고점 $349에서 -7% 조정 후 재반등 중. YTD +0.7%로 사실상 보합.",

    keyMetrics: [
      { label: "FY2025 매출", value: "$402.8B (사상 첫 $400B 돌파)" },
      { label: "FY2025 순이익", value: "$132.2B (+32% YoY)" },
      { label: "영업이익률", value: "32.8%" },
      { label: "ROE", value: "35.7%" },
      { label: "Q4 2025 Cloud 매출", value: "$17.66B (+48% YoY)" },
      { label: "Cloud 백로그", value: "$240~243B" },
      { label: "Google Search 연간", value: "$224.5B (일 $6.15억)" },
      { label: "Q4 Search 성장", value: "+17% YoY" },
      { label: "YouTube 연간", value: "$60B+ (광고+구독)" },
      { label: "2026 CapEx 가이던스", value: "$175~185B (2025년 $91.4B 대비 2배)" },
      { label: "FY2025 FCF", value: "$73.3B" },
      { label: "현금 및 유가증권", value: "$110B+" },
      { label: "자사주 매입", value: "$70B 프로그램 진행 중" },
      { label: "Q1 2026 컨센", value: "매출 $107B (+19% YoY), EPS $2.67~2.82" },
    ],

    bull: [
      "Forward P/E 28x — Mag7 중 최저 (MSFT 22x 제외)",
      "DOJ 강제분리 회피 — Chrome/Android 유지, 4/8 '선택화면' 명령으로 해소",
      "Cloud 백로그 $243B — 다년간 매출 가시성",
      "AI Overview 도입 후 Search 사용량 오히려 증가 (캐니발라이제이션 없음)",
      "Waymo 밸류에이션 $126B — 숨겨진 자산",
      "SpaceX 지분 투자 → 예상 수익 $100B+",
      "Gemini Robotics-ER 1.6 출시 — AI 하드웨어 확장",
      "Google I/O 5/19~20 추가 카탈리스트",
    ],

    bear: [
      "CapEx $175~185B — FCF 압박 (2025년 $73.3B 대비 2배 이상 투자)",
      "DOJ 항소 진행 중 — 2026 하반기 DC항소법원 결정",
      "AdTech 소송: AdX 강제 매각 리스크 (3개 혐의 유죄)",
      "Choice Screen 도입 시 Search 트래픽 3년간 5~8% 감소 가능 ($15~25B 영향)",
      "Perplexity·OpenAI SearchGPT 검색 점유율 잠식",
      "EU 규제: 경쟁사에 Google 데이터 공유 명령",
      "어닝 기대치 이미 높음 — 컨센 부합만으론 주가 반응 제한적",
    ],

    scenarios: [
      { name: "강세", condition: "Cloud 성장 40%+ 유지 + Search 광고 서프라이즈", target: "$370~380 (ATH 돌파)", probability: "40%" },
      { name: "중립", condition: "컨센 부합", target: "$340~355", probability: "40%" },
      { name: "약세", condition: "Cloud 성장 35% 미만 + CapEx 추가 증가", target: "$310~320", probability: "20%" },
    ],

    levels: [
      { label: "현재가", value: "$341", type: "current" },
      { label: "52주 ATH (2월 고점)", value: "$349~350", type: "resist" },
      { label: "컨센서스 목표가 (44명)", value: "$355~376", type: "target" },
      { label: "Citi 목표가", value: "$405", type: "target" },
      { label: "1차 지지 (4월 초 저점)", value: "$310~320", type: "support" },
      { label: "2차 지지", value: "$290~295", type: "support" },
      { label: "200일 MA", value: "$260~270", type: "support" },
    ],

    watchPoints: [
      "4/22~24 Google Cloud Next — Gemini 기업용 발표",
      "4/29 어닝: Cloud 성장률 40% 유지 여부가 핵심",
      "4/29 어닝: 2026 CapEx 가이던스 추가 상향 여부",
      "DOJ 항소심 일정 및 결과",
      "AdTech 소송 AdX 매각 명령 여부",
    ],
  },

  {
    ticker: "AMD",
    name: "AMD",
    category: "미장",
    price: "$277",
    change: "+6.00%",
    positive: true,
    ytd: "+35%",
    ath: "$281",
    atl: "$84",
    marketCap: "$453B",
    per: "105x (Trailing)",
    forwardPer: "38x",
    earning: "5월 5일",
    shortScore: 25,
    midScore: 62,
    tag: "어닝주의",
    tagColor: "#f59e0b",

    summary: "ATH $281 바로 턱밑, 한 달 +42% 랠리 후 어닝 2주 전. 단기 추격은 리스크/리워드 최악 구간. Meta·OpenAI 6GW GPU 딜은 실질적. $245~250 되돌림 또는 어닝 확인 후 진입이 논리적.",

    context: "Q4 2025: 매출 $10.27B(컨센 $9.72B 상회), EPS $1.53(컨센 $1.32 상회), 데이터센터 $5.38B(+39% YoY 신기록). Q1 2026 컨센 EPS $1.28(QoQ -16%). BofA 목표가 $310 상향. 11일 연속 상승 (2005년 이후 최장).",

    keyMetrics: [
      { label: "Q4 2025 매출", value: "$10.27B (컨센 +$550M 상회)" },
      { label: "Q4 2025 EPS", value: "$1.53 (컨센 $1.32 +16% 상회)" },
      { label: "데이터센터 Q4 매출", value: "$5.38B (+39% YoY 신기록)" },
      { label: "FCF Q4", value: "$2.08B (+90.8% YoY 신기록)" },
      { label: "Q1 2026 가이던스", value: "매출 $9.8B ±$300M" },
      { label: "Q1 2026 컨센 EPS", value: "$1.28 (QoQ -16%)" },
      { label: "Q1 중국 MI308 매출", value: "약 $100M (제한적)" },
      { label: "중국 수출통제 손실", value: "FY2025 약 $440M 손실" },
      { label: "애널 컨센서스", value: "37 Buy, 12 Hold, 0 Sell" },
      { label: "컨센 목표가", value: "$289.35" },
      { label: "BofA 목표가", value: "$310" },
    ],

    bull: [
      "Meta 6GW + OpenAI 6GW GPU 딜 — 파이프라인 가시성 실질적",
      "Oracle 5만 GPU 슈퍼클러스터 Q3 2026 배포",
      "AWS EC2 5세대 EPYC 출시 — CPU 점유율 확대",
      "TSMC 3월 매출 +45% YoY — AI 인프라 수요 재확인",
      "BofA GW당 $15~20B 순매출, 26~27년 데이터센터 +60% 성장 전망",
      "프랑스 정부 AI 협력 + Alice Recoque 엑사스케일 수퍼컴퓨터",
      "MI450 GPU + Helios 랙 스케일 아키텍처 H2 2026 출시",
    ],

    bear: [
      "ATH 턱밑 ($277/$281) 에서 어닝 2주 전 추격 — 최악의 R/R",
      "Q1 EPS 컨센 $1.28 — QoQ -16% 역성장",
      "중국 수출통제 구조적 제한 지속 (Q1에 $100M만 반영)",
      "NVDA Blackwell Ultra '시장 2세대 앞선다' — GPU 경쟁 열위",
      "Trailing P/E 105x, Forward 38x — 완벽한 실행 선반영",
      "Cathie Wood AMD 포지션 축소",
    ],

    scenarios: [
      { name: "어닝 서프라이즈", condition: "EPS $1.28 상회 + H2 가이던스 강세", target: "$300~310", probability: "35%" },
      { name: "컨센 부합", condition: "EPS 부합 + 가이던스 유지", target: "$265~280", probability: "40%" },
      { name: "미스", condition: "EPS 미스 또는 중국 리스크 확대", target: "$240~245", probability: "25%" },
    ],

    levels: [
      { label: "현재가", value: "$277", type: "current" },
      { label: "52주 ATH", value: "$281.05", type: "resist" },
      { label: "컨센서스 목표가", value: "$289", type: "target" },
      { label: "BofA 목표가", value: "$310", type: "target" },
      { label: "1차 지지 (이전 저항 돌파)", value: "$245~250", type: "support" },
      { label: "2차 지지 (100일 SMA)", value: "$215", type: "support" },
      { label: "어닝 베어케이스", value: "$221", type: "support" },
      { label: "200일 SMA", value: "$196~200", type: "support" },
    ],

    watchPoints: [
      "5/5 어닝: EPS $1.28 대비 서프라이즈 여부",
      "MI450 출시 일정 및 초기 하이퍼스케일러 채택",
      "중국 수출통제 추가 강화 여부",
      "Q2 가이던스 — 데이터센터 $6B+ 돌파 여부",
    ],
  },

  {
    ticker: "TSLA",
    name: "테슬라",
    category: "미장",
    price: "$400",
    change: "+3.01%",
    positive: true,
    ytd: "0%",
    ath: "$498.83",
    atl: "$222.79",
    marketCap: "$1.27T",
    per: "105x (Trailing)",
    forwardPer: "불명확",
    earning: "4월 22일",
    shortScore: 15,
    midScore: 38,
    tag: "고위험",
    tagColor: "#ef4444",

    summary: "어닝 3일 전. Q1 딜리버리 미스 + EPS 역성장 + 재고 누적. 자동차 사업 구조적 약화. $1.27T 시총은 로보택시/AI 내러티브에 전적으로 의존 중. SpaceX IPO(6월)가 중기 변수.",

    context: "FY2025: 매출 $94.83B(-3% YoY, 첫 연간 매출 감소), GAAP EPS $1.08(-47% YoY). Q1 2026 딜리버리 358,023대(컨센 365,645 미스). 생산 408,000대 vs 딜리버리 358,023대 — 재고 5만대 누적. BYD 226만대로 글로벌 1위 등극.",

    keyMetrics: [
      { label: "FY2025 매출", value: "$94.83B (-3% YoY, 첫 역성장)" },
      { label: "FY2025 GAAP EPS", value: "$1.08 (-47% YoY)" },
      { label: "Q1 2026 딜리버리", value: "358,023대 (컨센 미스 7,600대)" },
      { label: "Q1 생산 잉여", value: "약 5만대 재고 누적" },
      { label: "Q1 컨센 EPS", value: "$0.36 (QoQ -28%)" },
      { label: "에너지 부문 연간", value: "$12.77B (마진 30%)" },
      { label: "오스틴 로보택시", value: "135대 운행 중" },
      { label: "달라스·휴스턴", value: "4/18 로보택시 출시 발표" },
      { label: "2026 CapEx 계획", value: "$20B+ (AI·로봇·반도체)" },
      { label: "BYD 연간 딜리버리", value: "226만대 (테슬라 163만대 상회)" },
      { label: "$14.5B 소송", value: "진행 중" },
    ],

    bull: [
      "달라스·휴스턴 로보택시 출시 — 오스틴 외 도시 확장",
      "SpaceX IPO(6월 목표) → Tesla SpaceX 지분 가치 현실화",
      "Terafab 칩 공장 Austin — Tesla+SpaceX AI 인프라 통합",
      "에너지 부문 $12.77B 마진 30% — 자동차와 별개 성장 중",
      "Optimus 로봇 2026년 생산 가속",
      "AI5 칩 마일스톤 + AI6 티저",
      "글로벌 누적 판매 900만대 — 잠재적 FSD 구독 전환 기반",
    ],

    bear: [
      "Q1 딜리버리 미스 + EPS $0.36 역성장 — 어닝 쇼크 가능성",
      "FY2025 첫 연간 매출 역성장 — 자동차 사업 구조적 약화",
      "BYD에 글로벌 EV 1위 내줌 (226만 vs 163만대)",
      "재고 누적 패턴 지속 (FY2025 115,938대 잉여)",
      "머스크 DOGE 활동 — 브랜드 훼손, 유럽 점유율 1.4%",
      "P/E 105x — 자동차 회사 기준 정당화 불가, 전적으로 AI 내러티브 의존",
      "Cybertruck 수요 부진 (SpaceX가 지탱)",
      "$14.5B 소송 리스크",
    ],

    spacexIpoConnection: {
      title: "SpaceX IPO ↔ Tesla 관계",
      points: [
        "2026년 3월 Tesla의 xAI 지분→SpaceX 지분 전환 규제 승인 완료",
        "SpaceX IPO 목표: 6월, 밸류에이션 $1.75T, $75B 조달",
        "Tesla 보유 SpaceX 지분이 IPO 후 처음으로 시장 가치 현실화",
        "Terafab: Austin AI 칩 공장 Tesla+SpaceX 공동 설립 발표",
        "Wedbush Dan Ives: 2027년 Tesla-SpaceX 합병 예측",
        "리스크: SpaceX IPO 흥행 시 Tesla에서 SpaceX로 자본 이탈 가능",
      ],
    },

    scenarios: [
      { name: "어닝 서프라이즈", condition: "EPS $0.36 상회 + 로보택시 확장 가속", target: "$440~460", probability: "25%" },
      { name: "컨센 부합", condition: "EPS 부합 + 현상 유지", target: "$390~420", probability: "40%" },
      { name: "어닝 쇼크", condition: "EPS 미스 + 가이던스 하향", target: "$330~360", probability: "35%" },
    ],

    levels: [
      { label: "현재가", value: "$400", type: "current" },
      { label: "심리적 마지노선", value: "$400", type: "current" },
      { label: "저항 클러스터", value: "$420~460", type: "resist" },
      { label: "52주 ATH", value: "$498.83", type: "resist" },
      { label: "200일 MA", value: "$363", type: "support" },
      { label: "4월 초 저점", value: "$361", type: "support" },
      { label: "어닝 베어케이스", value: "$330~350", type: "support" },
      { label: "컨센서스 목표가", value: "$414", type: "target" },
    ],

    watchPoints: [
      "4/22 어닝: EPS $0.36 달성 여부 + Q2 가이던스",
      "로보택시 달라스·휴스턴 실제 운행 스케일",
      "SpaceX IPO 일정 확정 및 Tesla 지분 가치 공개",
      "Optimus 생산 대수 업데이트",
      "머스크 DOGE 참여 축소 여부",
    ],
  },

  {
    ticker: "BTC",
    name: "비트코인",
    category: "크립토",
    price: "$76,000",
    change: "+0.78%",
    positive: true,
    ytd: "-5%",
    ath: "$125,900",
    atl: "$60,000",
    marketCap: "$1.55T",
    per: "N/A",
    earning: "—",
    shortScore: 40,
    midScore: 55,
    tag: "변동성",
    tagColor: "#f59e0b",

    summary: "ATH $126K 대비 -40%. 2026 저점 $60K에서 +25% 반등. Fear&Greed 21(극단 공포). ETF $53B 누적 유입으로 기관화 진행 중. 그러나 200일 MA $87K 아직 미회복, DXY 달러 강세 전환이 역풍.",

    context: "2025년 10월 ATH $125,900 후 2026년 1월 -10.1%, 2월 -14.8% 하락. 4월 초 $60,000대 저점 후 반등. 달러(DXY)가 2026년 3월 신고점 형성 — BTC-DXY 역상관 확고. 반감기(2024년 4월) 이후 연간 인플레이션 1% 미만.",

    keyMetrics: [
      { label: "2025년 10월 ATH", value: "$125,900" },
      { label: "2026 저점", value: "~$60,000 (4월 초)" },
      { label: "ATH 대비 하락", value: "-52%" },
      { label: "Fear & Greed Index", value: "21 (극단적 공포)" },
      { label: "ETF 누적 순유입", value: "$53B (출시 후 2년)" },
      { label: "BlackRock IBIT 일일 유입", value: "$284M (4/17)" },
      { label: "4월 ETF 일일 최대 유입", value: "$471M (4/6)" },
      { label: "거래소 BTC 잔고", value: "7년 최저" },
      { label: "Strategy 보유량", value: "780,897 BTC" },
      { label: "발행 BTC", value: "19,685,000 / 21,000,000" },
      { label: "현재 블록 보상", value: "3.125 BTC (연 인플레 <1%)" },
      { label: "200일 MA", value: "$87,519" },
      { label: "100일 MA", value: "$75,000~75,500" },
    ],

    onchain: [
      { label: "Fear & Greed", value: "21 — 극단 공포", signal: "역발상 매수 신호" },
      { label: "거래소 잔고", value: "7년 최저", signal: "공급 감소 = 강세" },
      { label: "고래 비율", value: "상승 중 (2026 내내)", signal: "분배 압력 경고" },
      { label: "ETF 30일 순유입", value: "+30,000 BTC 이상", signal: "기관 축적 지속" },
      { label: "200일 MA 대비", value: "현재가 -12%", signal: "장기 약세 구조" },
      { label: "펀딩비", value: "중립~약세", signal: "과열 없음, 롱 청산 위험 낮음" },
    ],

    bull: [
      "BlackRock IBIT 등 ETF 구조적 기관 수요 — 출시 2년에 $53B 유입",
      "거래소 BTC 보유량 7년 최저 — 매도 가능 공급 감소",
      "Fear&Greed 21 극단 공포 — 과거 사이클 바닥 구간과 일치",
      "Strategy 780,897 BTC 보유 + 지속 매수",
      "Morgan Stanley BTC ETF 출시 (4/18) — 기관 접근성 확대",
      "반감기 사이클: 2024년 4월 이후 연 인플레 1% 미만",
      "4월은 역사적 평균 +33.4% 수익률 월",
    ],

    bear: [
      "200일 MA $87,519 아직 미회복 — 장기 기술적 약세 구조",
      "DXY 달러 2026년 3월 신고점 형성 — BTC 역풍 (ATH와 DXY 반전이 19일 차이)",
      "고래 비율 2026년 내내 상승 — 대형 보유자 거래소 이동 (분배)",
      "베어 플래그 패턴 경고 (3일봉 차트)",
      "금 1년 +64% vs BTC -5% — 헷지 자산 경쟁에서 금 우세",
      "JPMorgan Q1 디지털 자산 유입 $110억 — 2025 대비 급감",
      "$75K 저항 6차례 돌파 실패 — 딜러 음의 감마로 변동성 증폭",
    ],

    scenarios: [
      { name: "강세", condition: "$75,500 일봉 돌파 확정 + DXY 약세 전환", target: "$87,000~90,000 (200일 MA)", probability: "35%" },
      { name: "횡보", condition: "$70~77K 레인지 지속", target: "$70,000~77,000", probability: "35%" },
      { name: "약세", condition: "$67K 3일봉 종가 이탈", target: "$61,500 → $60,000", probability: "30%" },
    ],

    levels: [
      { label: "현재가", value: "$76,000", type: "current" },
      { label: "1차 저항 (100일 MA / 음의 감마)", value: "$75,000~75,500", type: "resist" },
      { label: "2차 저항 (양의 감마 구간)", value: "$80,000~80,600", type: "resist" },
      { label: "200일 MA (장기 추세선)", value: "$87,519", type: "resist" },
      { label: "ATH", value: "$125,900", type: "resist" },
      { label: "1차 지지", value: "$70,000~72,000", type: "support" },
      { label: "핵심 지지 (마지노선)", value: "$67,000", type: "support" },
      { label: "강지지 피보나치 0.382", value: "$61,500", type: "support" },
      { label: "2026 저점", value: "~$60,000", type: "support" },
    ],

    watchPoints: [
      "$75,500 일봉 종가 돌파 여부 (단기 방향성 결정)",
      "DXY $100.60 돌파 확정 여부 — BTC 역풍 강도",
      "주간 ETF 순유입 지속 여부",
      "고래 거래소 이동량 변화",
      "연준 금리 정책 방향",
    ],
  },

  {
    ticker: "IONQ",
    name: "아이온큐",
    category: "미장",
    price: "$46",
    change: "+20.2%",
    positive: true,
    ytd: "-20%",
    ath: "$84.64",
    atl: "$23.49",
    marketCap: "$16B",
    per: "N/A (적자)",
    priceSales: "~100x (Trailing) / ~67x (FY26 가이던스 기준)",
    earning: "5월 6일",
    shortScore: 22,
    midScore: 48,
    tag: "테마주",
    tagColor: "#8b5cf6",

    summary: "상장 퀀텀 기업 중 유일하게 실적 있는 회사. 2025년 첫 $100M GAAP 매출 돌파. DARPA HARQ + 포토닉 네트워크 달성으로 4/14 +20% 급등. P/S 100x는 극단적이나 정부 계약·백로그 실질적.",

    context: "4/14 World Quantum Day에 DARPA HARQ 선정 + 두 상업용 양자컴퓨터 포토닉 얽힘 최초 달성 + Nvidia Ising 오픈소스 모델 출시(섹터 테일윈드)로 당일 +20.2%. YTD -20%에서 저점 대비 +95% 반등 중.",

    keyMetrics: [
      { label: "FY2025 매출", value: "$130M (YoY +202%, 상장 퀀텀 기업 첫 $100M 돌파)" },
      { label: "Q4 2025 매출", value: "$61.9M (컨센 $40.3M 대비 +54% 서프라이즈)" },
      { label: "Q4 2025 EPS", value: "+$1.93 (컨센 -$0.51 대비 +480% 서프라이즈, 일회성)" },
      { label: "FY2026 가이던스", value: "$225~245M (미드포인트 $235M)" },
      { label: "FY2026 EBITDA 가이던스", value: "-$310~330M (적자 지속)" },
      { label: "백로그 (RPO)", value: "$370M (FY2024 $77M 대비 4.8배)" },
      { label: "현금·투자자산", value: "$3.3B (런웨이 5년+)" },
      { label: "영업 현금흐름 FY2025", value: "-$283M" },
      { label: "EBITDA", value: "-$510M (마진 -390%)" },
      { label: "임직원 수", value: "1,132명" },
      { label: "애널 컨센", value: "Strong Buy, 목표가 $65~67" },
    ],

    govContracts: [
      "DARPA HARQ 프로그램 선정 (4/14) — 이기종 양자 아키텍처",
      "DARPA Quantum Benchmarking Initiative Phase B (2025 하반기)",
      "Missile Defense Agency SHIELD IDIQ 프레임워크 (2026년 2월)",
      "AFRL $21.1M 보안 양자 네트워크 계약 (2025년 1월)",
      "Golden Dome 계약 (2026년 2월)",
      "ARLIS SEQCURE 프로그램 (공군 지원)",
    ],

    bull: [
      "상장 퀀텀 기업 중 유일한 실제 매출 ($130M FY2025)",
      "백로그 $370M — 4.8배 급증, 수년치 가시성",
      "DARPA HARQ: 정부 인정 = 장기 방산 계약 앞마당",
      "포토닉 양자 네트워크 최초 달성 — 기술 리더십 증명",
      "현금 $3.3B — 파산 리스크 없음, 5년+ 런웨이",
      "2026년 말 256큐비트 6세대 시스템 출시",
      "SkyWater 인수로 반도체 수직통합 — 장기 비용 구조 개선",
      "Nvidia Ising 협력 — AI+양자 컨버전스 수혜",
    ],

    bear: [
      "P/S 100x (Trailing) / 67x (FY26 기준) — 완벽 실행 수년 선반영",
      "EBITDA -$510M, 2026년 -$310~330M 손실 지속",
      "영업 현금흐름 -$283M, 2026년 더 악화",
      "이사 Robert T. Cardillo, John W. Raymond 내부자 매도",
      "SkyWater 인수 통합 복잡성 추가",
      "퀀텀 실용화 타임라인 여전히 불확실",
      "IBM·Google·NVDA 직접 하드웨어 진출 시 경쟁 위험",
      "52주 고점 $84.64 대비 -46% — 아직 추세 전환 미확인",
    ],

    scenarios: [
      { name: "강세", condition: "5/6 어닝 매출 서프라이즈 + 256큐비트 출시 일정 확정", target: "$55~65", probability: "30%" },
      { name: "중립", condition: "가이던스 유지 + 정부 계약 지속", target: "$40~50", probability: "40%" },
      { name: "약세", condition: "테마 식음 + 퀀텀 타임라인 지연", target: "$25~30", probability: "30%" },
    ],

    levels: [
      { label: "현재가", value: "$46", type: "current" },
      { label: "컨센서스 목표가", value: "$65~67 (+50%)", type: "target" },
      { label: "Jefferies·Rosenblatt 목표가", value: "$100", type: "target" },
      { label: "1차 지지 (4/14 갭업 시작점)", value: "$35~36", type: "support" },
      { label: "2차 지지", value: "$29~30", type: "support" },
      { label: "52주 저점권", value: "$23~25", type: "support" },
      { label: "52주 ATH", value: "$84.64", type: "resist" },
    ],

    watchPoints: [
      "5/6 어닝: Q1 2026 매출 컨센 $49.7M 달성 여부",
      "SkyWater 인수 완료 일정",
      "256큐비트 시스템 출시 타임라인 확정",
      "추가 방산 계약 수주 여부",
      "IBM·Google 경쟁 동향",
    ],
  },

  {
    ticker: "QCOM",
    name: "퀄컴",
    category: "미장",
    price: "$135",
    change: "+2.1%",
    positive: true,
    ytd: "-21%",
    ath: "$206",
    atl: "$120",
    marketCap: "$163.5B",
    per: "N/A",
    forwardPer: "15.4x (섹터 평균 21.6x 대비 -29%)",
    earning: "미정",
    shortScore: 45,
    midScore: 58,
    tag: "저평가",
    tagColor: "#3b82f6",

    summary: "YTD -21%, 52주 고점 $206 대비 -35%. Forward P/E 15.4x로 섹터 최저. 배당수익률 3.56%, 23년 연속 인상. Apple 모뎀 이탈(2027) 우려가 선반영된 구간. 자동차·IoT·AI 엣지 다각화가 반등 키.",

    keyMetrics: [
      { label: "Q4 CY2025 매출", value: "$12.25B (+5% YoY, 컨센 상회)" },
      { label: "Q4 CY2025 조정 EPS", value: "$3.50 (컨센 +3%)" },
      { label: "영업이익률", value: "36%" },
      { label: "자동차 분기 매출", value: "$10억+" },
      { label: "배당수익률", value: "3.56%" },
      { label: "배당 연속 인상", value: "23년" },
      { label: "배당 성향", value: "35%" },
      { label: "FY2026 EPS 컨센", value: "$8.52 (YoY -15.4%)" },
      { label: "12개월 목표가 컨센", value: "$161~168" },
      { label: "애널 커버리지", value: "32명 — Moderate Buy" },
    ],

    bull: [
      "Forward P/E 15.4x — 섹터 평균 21.6x 대비 -29% 극단 할인",
      "배당수익률 3.56%, 23년 연속 인상 (기술주 평균 1.4% 대비 2.5배)",
      "자동차 분기 $10억+ 돌파 — 고마진 다각화 진행 중",
      "IoT·AI 엣지 컴퓨팅 성장 — 모바일 의존도 지속 감소",
      "Apple 이탈 악재 이미 상당 부분 선반영 (고점 대비 -35%)",
      "컨센 목표가 $161~168 — 현재 대비 +23% 업사이드",
    ],

    bear: [
      "Apple 모뎀 사업 이탈 2027 — FY2026 EPS -15.4% 역성장",
      "BofA Underperform, JPMorgan 하향조정 등 연이은 매도 의견",
      "FY2026~27 EPS 역성장 구간 — 주가 모멘텀 부재",
      "중국 스마트폰 시장 성장 둔화",
      "Arm Holdings 자체 칩 생산 확대로 경쟁 심화",
    ],

    levels: [
      { label: "현재가", value: "$135", type: "current" },
      { label: "컨센서스 목표가", value: "$161~168", type: "target" },
      { label: "BofA 목표가", value: "$145 (Underperform)", type: "resist" },
      { label: "52주 ATH", value: "$206", type: "resist" },
      { label: "지지 구간", value: "$120~130", type: "support" },
    ],

    watchPoints: [
      "다음 분기 실적: 자동차·IoT 매출 성장 지속 여부",
      "Apple 내부 모뎀 개발 진행 속도 (2027 이탈 시점)",
      "AI 엣지 칩 수주 현황",
      "중국 화웨이 스마트폰 경쟁 동향",
    ],
  },

  {
    ticker: "AAPL",
    name: "애플",
    category: "미장",
    price: "$222",
    change: "-0.5%",
    positive: false,
    ytd: "-5%",
    ath: "$260",
    atl: "$164",
    marketCap: "$3.74T",
    per: "32x (Trailing)",
    earning: "5월 초",
    shortScore: 50,
    midScore: 65,
    tag: "카탈리스트",
    tagColor: "#8b5cf6",

    summary: "Mag7 중 상대적으로 낙폭 작음(-5%). AI 기능 지연으로 내러티브 공백. 폴더블 iPhone 가을 확정 + WWDC 6/8~12 Gemini Siri 공개가 재점화 트리거. P/E 32x는 부담.",

    context: "Google Gemini 기반 Apple Intelligence 탑재 계약 체결. Morgan Stanley 조사에서 iPhone 18 업그레이드 의향 역대 최고. Q1 2026 스마트폰 시장 -6% YoY에서도 Apple은 +5% 성장(21% 점유율). 글로벌 PC 시장 Q1 2026 +4% YoY.",

    keyMetrics: [
      { label: "시가총액", value: "$3.74T (Nvidia·MSFT·GOOGL와 1위 경쟁)" },
      { label: "FY2026 매출 컨센", value: "$461.68B (+10.94% YoY)" },
      { label: "FY2026 EPS 컨센", value: "$8.40 (+12.6% YoY)" },
      { label: "iPhone 시장 점유율", value: "21% (Q1 2026)" },
      { label: "서비스 구독자", value: "2.7억 (YouTube+Google One 합산)" },
      { label: "폴더블 iPhone", value: "2026년 가을 확정 (BofA 공급망 확인)" },
      { label: "WWDC 2026", value: "6월 8~12일, Gemini Siri 공개 예정" },
    ],

    bull: [
      "폴더블 iPhone 2026년 가을 출시 확정 — 업그레이드 사이클 촉발",
      "WWDC 6/8~12 Gemini 기반 Siri 오버홀 — AI 내러티브 재점화",
      "iPhone 18 업그레이드 의향 Morgan Stanley 조사 역대 최고",
      "Apple Intelligence + Google 모델 결합 — AI 기능 대폭 강화",
      "서비스 부문 고마진 성장 지속",
      "Q1 2026 스마트폰 시장 -6%에도 Apple +5% 역성장",
    ],

    bear: [
      "AI 기능 지연 반복 — 투자자 신뢰 훼손",
      "P/E 32x — 5년 평균 대비 고평가, 실행 오류 용납 어려움",
      "중국 Huawei·Xiaomi 경쟁 심화",
      "Qualcomm 모뎀 이탈 프리미엄 상실 가능성",
      "EU 규제 DMA 준수 비용",
    ],

    levels: [
      { label: "현재가", value: "~$222", type: "current" },
      { label: "52주 ATH", value: "$260", type: "resist" },
      { label: "컨센서스 목표가", value: "$240~250", type: "target" },
      { label: "1차 지지", value: "$200~210", type: "support" },
      { label: "52주 저점", value: "$164", type: "support" },
    ],

    watchPoints: [
      "WWDC 6/8~12: Gemini Siri 기능 완성도",
      "5월 초 어닝: 서비스 부문 마진 추이",
      "폴더블 iPhone 공급망 확인 및 출시 일정",
      "중국 매출 반등 여부",
    ],
  },

  {
    ticker: "225570",
    name: "넥슨게임즈",
    category: "국장",
    price: "₩12,130",
    change: "+1.34%",
    positive: true,
    ytd: "-34%",
    ath: "₩18,420",
    atl: "₩10,310",
    marketCap: "N/A",
    per: "N/A (적자)",
    earning: "5월 7일",
    shortScore: 18,
    midScore: 30,
    tag: "관망",
    tagColor: "#6b7280",

    summary: "2026년 신작 출시 없음. FY2025 매출 -30%, 영업이익 적자전환. 애널리스트 커버리지 사실상 전무(목표가 ₩12,000으로 현재가 하회). 프로젝트 RX·던파 아라드는 2027년 카탈리스트. 지금은 관망이 답.",

    context: "2013년 설립, 2017년 코스닥 상장, 2022년 넥슨지티와 합병. 블루 아카이브(일본·글로벌), 서든어택(PC), 퍼스트 디센던트(콘솔/PC), V4·HIT2(모바일) 서비스 중. 신작 개발 인건비 증가가 비용 구조 악화 주범.",

    keyMetrics: [
      { label: "FY2025 매출 변화", value: "YoY -30%" },
      { label: "FY2025 영업이익", value: "적자전환" },
      { label: "FY2025 순이익", value: "적자전환" },
      { label: "현재 주가", value: "₩12,130" },
      { label: "52주 고점", value: "₩18,420 (고점 대비 -34%)" },
      { label: "52주 저점", value: "₩10,310" },
      { label: "애널 목표가", value: "₩12,000 (현재가 하회)" },
      { label: "다음 실적", value: "2026년 5월 7일" },
    ],

    pipeline: [
      { name: "프로젝트 RX", detail: "블루 아카이브 개발진(IO본부), PC·모바일 서브컬처, UE5, 티저 110만 조회", timeline: "2027년 이후 예상" },
      { name: "우치 더 웨이페어러", detail: "전우치전 모티브 트리플A급 신작, 티저 최초 공개", timeline: "2027년 이후 예상" },
      { name: "던전앤파이터: 아라드", detail: "던파 IP 오픈월드 RPG, PC·콘솔·모바일 크로스플랫폼", timeline: "2027년 이후 예상" },
      { name: "프로젝트 DX", detail: "야생의 땅: 듀랑고 IP 활용", timeline: "미정" },
    ],

    bull: [
      "블루 아카이브 일본·글로벌 안정적 수익 기반 (4주년 이벤트 호조)",
      "프로젝트 RX 티저 110만 조회 — 블루 아카이브 개발진 신작",
      "던파 IP 멀티플랫폼 — 글로벌 팬덤 기반 확실",
      "52주 저점 ₩10,310 강한 지지선 형성",
      "2026년은 완성도 집중 → 2027년 신작 모멘텀 기대",
    ],

    bear: [
      "FY2025 매출 -30%, 영업이익·순이익 적자전환",
      "2026년 신작 출시 없음 — 비용 지출은 지속, 매출 증가 없음",
      "애널 커버리지 사실상 1개, 목표가 ₩12,000 (현재가 하회)",
      "모바일 시장 성장 둔화 + 대형사 견고한 매출에 경쟁 불리",
      "코스닥 외국인·기관 수급 관심 없음",
    ],

    levels: [
      { label: "현재가", value: "₩12,130", type: "current" },
      { label: "애널 목표가", value: "₩12,000", type: "resist" },
      { label: "1차 저항", value: "₩14,000~15,000", type: "resist" },
      { label: "52주 ATH", value: "₩18,420", type: "resist" },
      { label: "52주 저점 (강지지)", value: "₩10,310", type: "support" },
    ],

    watchPoints: [
      "5/7 어닝: 비용 피크아웃 + 블루 아카이브 매출 서프라이즈",
      "프로젝트 RX 출시 일정 공식 발표",
      "외국인·기관 수급 변화",
      "코스닥 게임 섹터 전반적 분위기",
    ],
  },
];

export const analysisDate = "2026.04.19";

export const getScoreLabel = (score) => {
  if (score >= 70) return "적극 매수";
  if (score >= 55) return "분할 진입";
  if (score >= 40) return "소량 검토";
  if (score >= 25) return "관망";
  return "비추";
};

export const getScoreColor = (score) => {
  if (score >= 70) return "#22c55e";
  if (score >= 55) return "#84cc16";
  if (score >= 40) return "#f59e0b";
  if (score >= 25) return "#f97316";
  return "#ef4444";
};
