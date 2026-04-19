import { useState } from "react";

const stocks = [
  {
    ticker: "MSFT",
    name: "마이크로소프트",
    category: "미장",
    price: "$422",
    change: "+4.63%",
    positive: true,
    ytd: "-13%",
    atl: "$355",
    ath: "$555",
    earning: "4월 29일",
    shortScore: 58,
    midScore: 75,
    tag: "핵심픽",
    tagColor: "#22c55e",
    summary: "Mag7 최대 낙오자. P/E 23x로 5년 최저. Azure +39% 성장 중. CapEx 피크아웃 기대.",
    bull: ["RPO $6,250억 수주잔고", "AI 비즈니스 FY26 $250억 궤도", "Forward P/E 5년 최저"],
    bear: ["Azure 성장 둔화 우려", "CapEx $1,000억+ ROI 불확실", "Copilot 침투율 3.3%"],
    levels: [
      { label: "현재가", value: "$422", type: "current" },
      { label: "피보 저항 0.618", value: "$423", type: "resist" },
      { label: "100일 MA", value: "$439", type: "resist" },
      { label: "200일 MA", value: "$475", type: "resist" },
      { label: "핵심 지지", value: "$355~369", type: "support" },
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
    atl: "$146",
    ath: "$349",
    earning: "4월 29일",
    shortScore: 48,
    midScore: 70,
    tag: "저평가",
    tagColor: "#3b82f6",
    summary: "Mag7 중 가장 저렴한 P/E 28x. DOJ 최악 시나리오 해소. Cloud 백로그 $243B.",
    bull: ["Forward P/E 28x — Mag7 최저", "DOJ 강제분리 회피 완료", "Cloud 백로그 $243B"],
    bear: ["CapEx $175~185B FCF 압박", "DOJ 항소 2026 하반기 결정", "AdTech 소송 진행 중"],
    levels: [
      { label: "현재가", value: "$341", type: "current" },
      { label: "52주 ATH", value: "$349", type: "resist" },
      { label: "컨센 목표가", value: "$376", type: "target" },
      { label: "1차 지지", value: "$310~320", type: "support" },
      { label: "200일 MA", value: "$260~270", type: "support" },
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
    atl: "$84",
    ath: "$281",
    earning: "5월 5일",
    shortScore: 25,
    midScore: 62,
    tag: "어닝주의",
    tagColor: "#f59e0b",
    summary: "ATH 턱밑 + 어닝 2주 전. Meta 6GW 딜, EPYC 점유율 확대. $245~250 되돌림 시 진입.",
    bull: ["Meta·OpenAI 6GW GPU 딜", "EPYC 서버 CPU 점유율 확대", "FY26 매출 가이던스 $235M"],
    bear: ["ATH 턱밑 추격 리스크", "중국 수출 통제 $440M 손실", "NVDA Blackwell Ultra 경쟁"],
    levels: [
      { label: "현재가", value: "$277", type: "current" },
      { label: "52주 ATH", value: "$281", type: "resist" },
      { label: "컨센 목표가", value: "$289", type: "target" },
      { label: "1차 지지", value: "$245~250", type: "support" },
      { label: "200일 MA", value: "$196~200", type: "support" },
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
    atl: "$223",
    ath: "$499",
    earning: "4월 22일",
    shortScore: 15,
    midScore: 38,
    tag: "고위험",
    tagColor: "#ef4444",
    summary: "3일 후 어닝. Q1 딜리버리 미스. EPS 역성장. SpaceX IPO·로보택시가 중기 변수.",
    bull: ["달라스·휴스턴 로보택시 출시", "SpaceX IPO Tesla 지분 가치화", "에너지 부문 $12.77B 30% 마진"],
    bear: ["Q1 딜리버리 미스", "EPS $0.36 (QoQ -28%)", "BYD에 글로벌 1위 내줌"],
    levels: [
      { label: "현재가", value: "$400", type: "current" },
      { label: "저항 클러스터", value: "$420~460", type: "resist" },
      { label: "52주 ATH", value: "$499", type: "target" },
      { label: "200일 MA", value: "$363", type: "support" },
      { label: "2026 저점", value: "$361", type: "support" },
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
    atl: "$120",
    ath: "$206",
    earning: "미정",
    shortScore: 45,
    midScore: 58,
    tag: "저평가",
    tagColor: "#3b82f6",
    summary: "Forward P/E 15x 섹터 최저. 배당 3.56%. 애플 모뎀 이탈 우려 선반영 구간.",
    bull: ["Forward P/E 15x (섹터 -29% 할인)", "배당수익률 3.56%", "자동차 분기 $10억+ 다각화"],
    bear: ["Apple 모뎀 이탈 2027", "FY2026 EPS -15% 역성장 예상", "BofA Underperform 커버리지"],
    levels: [
      { label: "현재가", value: "$135", type: "current" },
      { label: "컨센 목표가", value: "$161~168", type: "target" },
      { label: "52주 ATH", value: "$206", type: "resist" },
      { label: "지지구간", value: "$120~130", type: "support" },
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
    atl: "$164",
    ath: "$260",
    earning: "5월 초",
    shortScore: 50,
    midScore: 65,
    tag: "카탈리스트",
    tagColor: "#8b5cf6",
    summary: "WWDC 6월(Gemini Siri), 폴더블 iPhone 가을 출시. AI 내러티브 재점화 기대.",
    bull: ["폴더블 iPhone 2026 가을 확정", "WWDC 6/8~12 Gemini Siri 공개", "iPhone 18 업그레이드 의향 역대 최고"],
    bear: ["AI 기능 반복 지연 리스크", "P/E 32x 멀티플 부담", "中 경쟁 심화"],
    levels: [
      { label: "현재가", value: "~$222", type: "current" },
      { label: "52주 ATH", value: "$260", type: "resist" },
      { label: "1차 지지", value: "$200~210", type: "support" },
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
    atl: "$60,000",
    ath: "$126,000",
    earning: "—",
    shortScore: 40,
    midScore: 55,
    tag: "변동성",
    tagColor: "#f59e0b",
    summary: "ATH -40%. ETF $53B 누적 유입. Fear&Greed 21(극단 공포). 200일 MA $87K 아직 미회복.",
    bull: ["BlackRock IBIT 일일 $2.84억 유입", "거래소 잔고 7년 최저", "반감기 사이클 논리"],
    bear: ["200일 MA $87K 아래 — 장기 약세", "DXY 달러 강세 전환", "고래 분배 압력 지속"],
    levels: [
      { label: "현재가", value: "$76,000", type: "current" },
      { label: "1차 저항 (100일 MA)", value: "$75,000~75,500", type: "resist" },
      { label: "2차 저항", value: "$80,000~80,600", type: "resist" },
      { label: "200일 MA", value: "$87,519", type: "resist" },
      { label: "핵심 지지", value: "$67,000", type: "support" },
      { label: "강지지 피보 0.382", value: "$61,500", type: "support" },
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
    atl: "$24",
    ath: "$85",
    earning: "5월 6일",
    shortScore: 22,
    midScore: 48,
    tag: "테마주",
    tagColor: "#8b5cf6",
    summary: "퀀텀 퓨어플레이 1위. P/S 100x 극단 밸류. DARPA HARQ + 포토닉 네트워크 달성.",
    bull: ["DARPA HARQ 선정 (방산 계약)", "FY2026 가이던스 $235M", "백로그 $370M (4.8배 증가)"],
    bear: ["P/S 100x 극단 밸류에이션", "EBITDA -$510M 적자", "내부자 매도 포착"],
    levels: [
      { label: "현재가", value: "$46", type: "current" },
      { label: "컨센 목표가", value: "$65~67", type: "target" },
      { label: "1차 지지", value: "$35~36", type: "support" },
      { label: "2차 지지", value: "$29~30", type: "support" },
      { label: "52주 ATH", value: "$84.64", type: "resist" },
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
    atl: "₩10,310",
    ath: "₩18,420",
    earning: "5월 7일",
    shortScore: 18,
    midScore: 30,
    tag: "관망",
    tagColor: "#6b7280",
    summary: "2026년 신작 출시 없음. 영업이익 적자 지속. 애널 커버리지 전무. RX·던파 아라드가 2027 카탈리스트.",
    bull: ["블루 아카이브 IP 안정적 수익", "프로젝트 RX 티저 110만 조회수", "던파 IP 멀티플랫폼 확장"],
    bear: ["FY2025 매출 -30%, 영업 적자전환", "2026 신작 출시 없음", "애널 목표가 ₩12,000 (현재가 하회)"],
    levels: [
      { label: "현재가", value: "₩12,130", type: "current" },
      { label: "52주 ATH", value: "₩18,420", type: "resist" },
      { label: "1차 저항", value: "₩14,000~15,000", type: "resist" },
      { label: "52주 저점 (지지)", value: "₩10,310", type: "support" },
    ],
  },
];

const scoreColor = (s) => s >= 70 ? "#22c55e" : s >= 55 ? "#84cc16" : s >= 40 ? "#f59e0b" : s >= 25 ? "#f97316" : "#ef4444";
const scoreLabel = (s) => s >= 70 ? "적극 매수" : s >= 55 ? "분할 진입" : s >= 40 ? "소량 검토" : s >= 25 ? "관망" : "비추";
const categoryColor = { 미장: "#3b82f6", 국장: "#22c55e", 크립토: "#f59e0b" };

function ScoreRing({ score, size = 56 }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const filled = (score / 100) * circ;
  const color = scoreColor(score);
  return (
    <svg width={size} height={size} style={{ display: "block" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={5} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={5}
        strokeDasharray={`${filled} ${circ}`} strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`}
        style={{ transition: "stroke-dasharray 0.6s ease" }} />
      <text x={size/2} y={size/2 + 5} textAnchor="middle" fill={color} fontSize="13" fontWeight="600">{score}%</text>
    </svg>
  );
}

function StockCard({ stock, onClick, selected }) {
  return (
    <div onClick={() => onClick(stock)} style={{
      background: selected ? "rgba(59,130,246,0.12)" : "rgba(255,255,255,0.04)",
      border: selected ? "1px solid rgba(59,130,246,0.5)" : "1px solid rgba(255,255,255,0.08)",
      borderRadius: 12, padding: "14px 16px", cursor: "pointer", transition: "all 0.2s",
    }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom: 8 }}>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap: 6, marginBottom: 2 }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: "#f8fafc" }}>{stock.ticker}</span>
            <span style={{ fontSize: 10, padding: "2px 6px", borderRadius: 4, background: categoryColor[stock.category] + "22", color: categoryColor[stock.category], fontWeight: 500 }}>{stock.category}</span>
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>{stock.name}</div>
        </div>
        <div style={{ textAlign:"right" }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#f8fafc" }}>{stock.price}</div>
          <div style={{ fontSize: 11, color: stock.positive ? "#22c55e" : "#ef4444", fontWeight: 500 }}>{stock.change}</div>
        </div>
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ display:"flex", gap: 12 }}>
          {[{label:"단기", score:stock.shortScore},{label:"중기", score:stock.midScore}].map(({label,score}) => (
            <div key={label} style={{ textAlign:"center" }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 2 }}>{label}</div>
              <ScoreRing score={score} size={44} />
            </div>
          ))}
        </div>
        <span style={{ fontSize: 10, padding: "3px 7px", borderRadius: 4, background: stock.tagColor+"20", color: stock.tagColor, fontWeight: 600 }}>{stock.tag}</span>
      </div>
    </div>
  );
}

function LevelBadge({ type }) {
  const m = {
    current: { bg:"rgba(59,130,246,0.15)", color:"#60a5fa", label:"현재" },
    resist:  { bg:"rgba(239,68,68,0.12)",  color:"#f87171", label:"저항" },
    support: { bg:"rgba(34,197,94,0.12)",  color:"#4ade80", label:"지지" },
    target:  { bg:"rgba(168,85,247,0.12)", color:"#c084fc", label:"목표" },
  };
  const s = m[type] || m.current;
  return <span style={{ fontSize: 10, padding: "2px 6px", borderRadius: 4, background: s.bg, color: s.color, fontWeight: 500 }}>{s.label}</span>;
}

function DetailPanel({ stock }) {
  if (!stock) return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", color:"rgba(255,255,255,0.25)" }}>
      <div style={{ fontSize: 32, marginBottom: 12 }}>📊</div>
      <div style={{ fontSize: 13 }}>종목을 선택하세요</div>
    </div>
  );

  return (
    <div style={{ height:"100%", overflowY:"auto", padding:"0 2px" }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ display:"flex", alignItems:"center", gap: 10, marginBottom: 6, flexWrap:"wrap" }}>
          <span style={{ fontSize: 22, fontWeight: 700, color:"#f8fafc", fontFamily:"monospace" }}>{stock.ticker}</span>
          <span style={{ fontSize: 13, color:"rgba(255,255,255,0.5)" }}>{stock.name}</span>
          {stock.earning !== "—" && (
            <span style={{ fontSize: 11, padding:"2px 8px", borderRadius: 4, background:"rgba(251,191,36,0.15)", color:"#fbbf24", marginLeft:"auto" }}>어닝 {stock.earning}</span>
          )}
        </div>
        <div style={{ display:"flex", gap: 16, fontSize: 12, color:"rgba(255,255,255,0.45)", flexWrap:"wrap" }}>
          <span>현재 <strong style={{ color:"#f8fafc" }}>{stock.price}</strong></span>
          <span>YTD <strong style={{ color: stock.ytd.startsWith("-") ? "#ef4444" : "#22c55e" }}>{stock.ytd}</strong></span>
          <span>52주 저 <strong style={{ color:"#60a5fa" }}>{stock.atl}</strong></span>
          <span>52주 고 <strong style={{ color:"#f8fafc" }}>{stock.ath}</strong></span>
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap: 10, marginBottom: 20 }}>
        {[{label:"단기 매수점수", score:stock.shortScore},{label:"중기 매수점수", score:stock.midScore}].map(({label,score}) => (
          <div key={label} style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding:"12px 14px" }}>
            <div style={{ fontSize: 11, color:"rgba(255,255,255,0.4)", marginBottom: 8 }}>{label}</div>
            <div style={{ display:"flex", alignItems:"center", gap: 10 }}>
              <ScoreRing score={score} size={50} />
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: scoreColor(score) }}>{score}%</div>
                <div style={{ fontSize: 11, color: scoreColor(score), opacity: 0.8 }}>{scoreLabel(score)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, color:"rgba(255,255,255,0.35)", marginBottom: 8, textTransform:"uppercase", letterSpacing: 1 }}>요약</div>
        <p style={{ fontSize: 13, color:"rgba(255,255,255,0.75)", lineHeight: 1.7, margin: 0 }}>{stock.summary}</p>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap: 12, marginBottom: 16 }}>
        {[{title:"강세 논거", items:stock.bull, icon:"▲", color:"#4ade80"}, {title:"리스크", items:stock.bear, icon:"▼", color:"#f87171"}].map(({title,items,icon,color}) => (
          <div key={title}>
            <div style={{ fontSize: 11, color:"rgba(255,255,255,0.35)", marginBottom: 8, textTransform:"uppercase", letterSpacing: 1 }}>{title}</div>
            {items.map((b,i) => (
              <div key={i} style={{ display:"flex", gap: 7, marginBottom: 6, fontSize: 12, color:"rgba(255,255,255,0.65)" }}>
                <span style={{ color, flexShrink: 0, marginTop: 1 }}>{icon}</span>
                <span>{b}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div>
        <div style={{ fontSize: 11, color:"rgba(255,255,255,0.35)", marginBottom: 8, textTransform:"uppercase", letterSpacing: 1 }}>핵심 레벨</div>
        <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius: 8, overflow:"hidden" }}>
          {stock.levels.map((lv,i) => (
            <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 12px", borderBottom: i < stock.levels.length-1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
              <div style={{ display:"flex", alignItems:"center", gap: 8 }}>
                <LevelBadge type={lv.type} />
                <span style={{ fontSize: 12, color:"rgba(255,255,255,0.55)" }}>{lv.label}</span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color:"#f8fafc", fontFamily:"monospace" }}>{lv.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [selected, setSelected] = useState(stocks[0]);
  const [filter, setFilter] = useState("전체");
  const categories = ["전체","미장","국장","크립토"];
  const sorted = [...(filter === "전체" ? stocks : stocks.filter(s => s.category === filter))].sort((a,b) => b.midScore - a.midScore);

  return (
    <div style={{ background:"#0a0f1a", minHeight:"100vh", fontFamily:"'SF Pro Display',-apple-system,sans-serif", color:"#f8fafc", padding:"20px" }}>
      <div style={{ maxWidth: 1100, margin:"0 auto" }}>

        {/* 헤더 */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: 24, flexWrap:"wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: -0.5 }}>
              <span style={{ color:"#60a5fa" }}>종목</span> 분석 대시보드
            </h1>
            <p style={{ fontSize: 12, color:"rgba(255,255,255,0.35)", margin:"4px 0 0" }}>
              2026.04.19 · {stocks.length}개 종목 분석
            </p>
          </div>
          <div style={{ display:"flex", gap: 6, flexWrap:"wrap" }}>
            {categories.map(c => (
              <button key={c} onClick={() => setFilter(c)} style={{
                padding:"5px 12px", borderRadius: 6, fontSize: 12, fontWeight: 500,
                cursor:"pointer", transition:"all 0.15s", border:"none",
                background: filter === c ? "#3b82f6" : "rgba(255,255,255,0.07)",
                color: filter === c ? "#fff" : "rgba(255,255,255,0.55)",
              }}>{c}</button>
            ))}
          </div>
        </div>

        {/* 메인 레이아웃 */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr) 360px", gap: 16, alignItems:"start" }}>
          <div style={{ gridColumn:"1/4", display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap: 10 }}>
            {sorted.map(s => <StockCard key={s.ticker} stock={s} onClick={setSelected} selected={selected?.ticker === s.ticker} />)}
          </div>
          <div style={{ gridColumn:"4/5", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: 18, position:"sticky", top: 20, maxHeight:"calc(100vh - 40px)", minHeight: 500 }}>
            <DetailPanel stock={selected} />
          </div>
        </div>

        {/* 범례 */}
        <div style={{ marginTop: 20, padding:"14px 18px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius: 10 }}>
          <div style={{ display:"flex", gap: 24, flexWrap:"wrap" }}>
            {[
              {range:"70~100%", label:"적극 매수", color:"#22c55e"},
              {range:"55~69%", label:"분할 진입", color:"#84cc16"},
              {range:"40~54%", label:"소량 검토", color:"#f59e0b"},
              {range:"25~39%", label:"관망", color:"#f97316"},
              {range:"0~24%", label:"비추", color:"#ef4444"},
            ].map(item => (
              <div key={item.label} style={{ display:"flex", alignItems:"center", gap: 7 }}>
                <div style={{ width: 10, height: 10, borderRadius:"50%", background: item.color }} />
                <span style={{ fontSize: 11, color:"rgba(255,255,255,0.5)" }}>
                  <span style={{ color: item.color, fontWeight: 600 }}>{item.range}</span> {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
