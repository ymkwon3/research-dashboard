import { useState, useEffect } from "react";
import { getScoreColor, getScoreLabel } from "./data/stocks";
import { fetchLatestStocks, fetchDatesForTicker, fetchStockByDateAndTicker } from "./data/firestore";

const categoryColor = { 미장: "#3b82f6", 국장: "#22c55e", 크립토: "#f59e0b" };

function ScoreRing({ score, size = 56 }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const filled = (score / 100) * circ;
  const color = getScoreColor(score);
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

function LevelBadge({ type }) {
  const m = {
    current: { bg:"rgba(59,130,246,0.15)",  color:"#60a5fa",  label:"현재" },
    resist:  { bg:"rgba(239,68,68,0.12)",   color:"#f87171",  label:"저항" },
    support: { bg:"rgba(34,197,94,0.12)",   color:"#4ade80",  label:"지지" },
    target:  { bg:"rgba(168,85,247,0.12)",  color:"#c084fc",  label:"목표" },
    stop:    { bg:"rgba(239,68,68,0.22)",   color:"#ef4444",  label:"손절" },
  };
  const s = m[type] || m.current;
  return <span style={{ fontSize: 10, padding: "2px 6px", borderRadius: 4, background: s.bg, color: s.color, fontWeight: 600 }}>{s.label}</span>;
}

function SectionBox({ title, children, style }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "16px", ...style }}>
      {title && <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: 1.2, fontWeight: 600, marginBottom: 12 }}>{title}</div>}
      {children}
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// 리스트 카드
// ────────────────────────────────────────────────────────────
function StockCard({ stock, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={() => onClick(stock)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(59,130,246,0.08)" : "rgba(255,255,255,0.04)",
        border: hovered ? "1px solid rgba(59,130,246,0.4)" : "1px solid rgba(255,255,255,0.08)",
        borderRadius: 14, padding: "16px", cursor: "pointer",
        transition: "all 0.2s", transform: hovered ? "translateY(-2px)" : "none",
      }}
    >
      {/* 상단: 티커 + 가격 */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom: 10 }}>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap: 7, marginBottom: 3 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#f8fafc" }}>{stock.ticker}</span>
            <span style={{ fontSize: 10, padding:"2px 7px", borderRadius: 4, background: categoryColor[stock.category]+"22", color: categoryColor[stock.category], fontWeight: 600 }}>{stock.category}</span>
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{stock.name}</div>
        </div>
        <div style={{ textAlign:"right" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#f8fafc" }}>{stock.price}</div>
          <div style={{ fontSize: 11, color: stock.positive ? "#22c55e" : "#ef4444", fontWeight: 600 }}>{stock.change}</div>
        </div>
      </div>

      {/* 요약 한줄 */}
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, marginBottom: 12, overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>
        {stock.summary}
      </div>

      {/* 하단: 점수 + 태그 */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ display:"flex", gap: 14 }}>
          {[{label:"단기", score:stock.shortScore},{label:"중기", score:stock.midScore}].map(({label,score}) => (
            <div key={label} style={{ textAlign:"center" }}>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", marginBottom: 2 }}>{label}</div>
              <ScoreRing score={score} size={40} />
            </div>
          ))}
        </div>
        <div style={{ textAlign:"right" }}>
          <span style={{ fontSize: 11, padding:"3px 8px", borderRadius: 5, background: stock.tagColor+"20", color: stock.tagColor, fontWeight: 700 }}>{stock.tag}</span>
          {stock.earning !== "—" && (
            <div style={{ fontSize: 10, color:"rgba(251,191,36,0.7)", marginTop: 4 }}>어닝 {stock.earning}</div>
          )}
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// 리스트 뷰
// ────────────────────────────────────────────────────────────
function ListView({ onSelect }) {
  const [filter, setFilter] = useState("전체");
  const [stocks, setStocks] = useState([]);
  const [analysisDate, setAnalysisDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLatestStocks()
      .then(({ stocks, date }) => {
        setStocks(stocks);
        setAnalysisDate(date);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const categories = ["전체","미장","국장","크립토"];
  const sorted = [...(filter === "전체" ? stocks : stocks.filter(s => s.category === filter))].sort((a,b) => b.midScore - a.midScore);

  if (loading) return (
    <div style={{ background:"#0a0f1a", minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", color:"rgba(255,255,255,0.4)", fontFamily:"'SF Pro Display',-apple-system,sans-serif" }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ fontSize: 28, marginBottom: 12 }}>⏳</div>
        <div style={{ fontSize: 14 }}>데이터 불러오는 중...</div>
      </div>
    </div>
  );

  if (error) return (
    <div style={{ background:"#0a0f1a", minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", color:"#f87171", fontFamily:"'SF Pro Display',-apple-system,sans-serif" }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ fontSize: 28, marginBottom: 12 }}>⚠️</div>
        <div style={{ fontSize: 14 }}>데이터 로드 실패: {error}</div>
        <div style={{ fontSize: 12, marginTop: 8, color:"rgba(255,255,255,0.3)" }}>.env 파일의 Firebase 설정을 확인해주세요.</div>
      </div>
    </div>
  );

  return (
    <div style={{ background:"#0a0f1a", minHeight:"100vh", fontFamily:"'SF Pro Display',-apple-system,sans-serif", color:"#f8fafc", padding:"28px 24px" }}>
      <div style={{ maxWidth: 1100, margin:"0 auto" }}>

        {/* 헤더 */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: 28, flexWrap:"wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, letterSpacing: -0.5 }}>
              <span style={{ color:"#60a5fa" }}>종목</span> 분석 대시보드
            </h1>
            <p style={{ fontSize: 12, color:"rgba(255,255,255,0.35)", margin:"5px 0 0" }}>
              {analysisDate ?? "—"} · {stocks.length}개 종목 분석
            </p>
          </div>
          <div style={{ display:"flex", gap: 6 }}>
            {categories.map(c => (
              <button key={c} onClick={() => setFilter(c)} style={{
                padding:"6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600,
                cursor:"pointer", transition:"all 0.15s", border:"none",
                background: filter === c ? "#3b82f6" : "rgba(255,255,255,0.07)",
                color: filter === c ? "#fff" : "rgba(255,255,255,0.5)",
              }}>{c}</button>
            ))}
          </div>
        </div>

        {/* 카드 그리드 */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap: 14 }}>
          {sorted.map(s => <StockCard key={s.ticker} stock={s} onClick={(stock) => onSelect(stock, analysisDate)} />)}
        </div>

        {/* 범례 */}
        <div style={{ marginTop: 24, padding:"12px 18px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)", borderRadius: 10 }}>
          <div style={{ display:"flex", gap: 24, flexWrap:"wrap" }}>
            {[
              {range:"70~100%", label:"적극 매수", color:"#22c55e"},
              {range:"55~69%", label:"분할 진입", color:"#84cc16"},
              {range:"40~54%", label:"소량 검토", color:"#f59e0b"},
              {range:"25~39%", label:"관망", color:"#f97316"},
              {range:"0~24%", label:"비추", color:"#ef4444"},
            ].map(item => (
              <div key={item.label} style={{ display:"flex", alignItems:"center", gap: 7 }}>
                <div style={{ width: 8, height: 8, borderRadius:"50%", background: item.color }} />
                <span style={{ fontSize: 11, color:"rgba(255,255,255,0.45)" }}>
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

// ────────────────────────────────────────────────────────────
// 상세 페이지
// ────────────────────────────────────────────────────────────
function DetailPage({ stock: initialStock, analysisDate: initialDate, onBack }) {
  const scenarioAccent = ["#4ade80", "#60a5fa", "#f87171"];

  const [stock, setStock] = useState(initialStock);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [availableDates, setAvailableDates] = useState([]);
  const [dateLoading, setDateLoading] = useState(false);

  useEffect(() => {
    fetchDatesForTicker(initialStock.ticker).then(setAvailableDates);
  }, [initialStock.ticker]);

  const handleDateChange = async (date) => {
    if (date === selectedDate) return;
    setDateLoading(true);
    const data = await fetchStockByDateAndTicker(date, initialStock.ticker);
    if (data) {
      setStock(data);
      setSelectedDate(date);
    }
    setDateLoading(false);
  };

  return (
    <div style={{ background:"#0a0f1a", minHeight:"100vh", fontFamily:"'SF Pro Display',-apple-system,sans-serif", color:"#f8fafc", padding:"24px" }}>
      <div style={{ maxWidth: 1200, margin:"0 auto" }}>

        {/* 상단 네비게이션 */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom: 20, flexWrap:"wrap", gap: 12 }}>
          <button onClick={onBack} style={{ display:"flex", alignItems:"center", gap: 6, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding:"6px 14px", color:"rgba(255,255,255,0.7)", fontSize: 13, cursor:"pointer", fontWeight: 500 }}>
            ← 목록으로
          </button>

          {/* 날짜 드롭다운 (분석 날짜가 2개 이상일 때만 표시) */}
          {availableDates.length > 1 && (
            <div style={{ display:"flex", alignItems:"center", gap: 8 }}>
              <span style={{ fontSize: 11, color:"rgba(255,255,255,0.3)" }}>분석 날짜</span>
              <select
                value={selectedDate ?? ""}
                onChange={(e) => handleDateChange(e.target.value)}
                disabled={dateLoading}
                style={{
                  background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.12)",
                  borderRadius: 8, padding:"5px 10px", fontSize: 12, fontWeight: 600,
                  color:"#f8fafc", cursor: dateLoading ? "default" : "pointer",
                  outline:"none", appearance:"none", WebkitAppearance:"none",
                  backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='rgba(255,255,255,0.4)'/%3E%3C/svg%3E")`,
                  backgroundRepeat:"no-repeat", backgroundPosition:"right 9px center",
                  paddingRight: 28, opacity: dateLoading ? 0.5 : 1,
                }}
              >
                {availableDates.map(date => (
                  <option key={date} value={date} style={{ background:"#1e293b", color:"#f8fafc" }}>{date}</option>
                ))}
              </select>
              {dateLoading && <span style={{ fontSize: 11, color:"rgba(255,255,255,0.3)" }}>로딩 중...</span>}
            </div>
          )}
        </div>

        {/* 종목 헤더 */}
        <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding:"20px 24px", marginBottom: 20 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap: 16 }}>
            {/* 좌: 이름 + 태그들 */}
            <div>
              <div style={{ display:"flex", alignItems:"center", gap: 10, marginBottom: 6, flexWrap:"wrap" }}>
                <span style={{ fontSize: 28, fontWeight: 800, color:"#f8fafc", fontFamily:"monospace", letterSpacing: -1 }}>{stock.ticker}</span>
                <span style={{ fontSize: 15, color:"rgba(255,255,255,0.5)", fontWeight: 400 }}>{stock.name}</span>
                <span style={{ fontSize: 11, padding:"3px 9px", borderRadius: 5, background: categoryColor[stock.category]+"22", color: categoryColor[stock.category], fontWeight: 600 }}>{stock.category}</span>
                <span style={{ fontSize: 11, padding:"3px 9px", borderRadius: 5, background: stock.tagColor+"20", color: stock.tagColor, fontWeight: 700 }}>{stock.tag}</span>
                {stock.earning !== "—" && (
                  <span style={{ fontSize: 11, padding:"3px 9px", borderRadius: 5, background:"rgba(251,191,36,0.15)", color:"#fbbf24", fontWeight: 600 }}>어닝 {stock.earning}</span>
                )}
                {selectedDate && (
                  <span style={{ fontSize: 11, padding:"3px 9px", borderRadius: 5, background:"rgba(255,255,255,0.07)", color:"rgba(255,255,255,0.4)", marginLeft:"auto" }}>{selectedDate} 기준</span>
                )}
              </div>
              {/* 가격 */}
              <div style={{ display:"flex", alignItems:"baseline", gap: 10 }}>
                <span style={{ fontSize: 26, fontWeight: 700, color:"#f8fafc" }}>{stock.price}</span>
                <span style={{ fontSize: 15, color: stock.positive ? "#22c55e" : "#ef4444", fontWeight: 600 }}>{stock.change}</span>
                <span style={{ fontSize: 13, color:"rgba(255,255,255,0.4)" }}>YTD <span style={{ color: stock.ytd.startsWith("-") ? "#ef4444" : "#22c55e", fontWeight: 600 }}>{stock.ytd}</span></span>
              </div>
            </div>

            {/* 우: 스코어 링 */}
            <div style={{ display:"flex", gap: 20 }}>
              {[{label:"단기 매수점수", score:stock.shortScore},{label:"중기 매수점수", score:stock.midScore}].map(({label,score}) => (
                <div key={label} style={{ textAlign:"center" }}>
                  <div style={{ fontSize: 10, color:"rgba(255,255,255,0.4)", marginBottom: 6 }}>{label}</div>
                  <ScoreRing score={score} size={60} />
                  <div style={{ fontSize: 11, color: getScoreColor(score), fontWeight: 600, marginTop: 4 }}>{getScoreLabel(score)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 메타 정보 바 */}
          <div style={{ display:"flex", gap: 20, marginTop: 16, paddingTop: 16, borderTop:"1px solid rgba(255,255,255,0.06)", flexWrap:"wrap" }}>
            {[
              stock.marketCap && { label:"시총", value: stock.marketCap },
              stock.per && { label:"P/E", value: stock.per },
              stock.forwardPer && { label:"Forward P/E", value: stock.forwardPer },
              stock.fiveYearAvgPer && { label:"5Y 평균 P/E", value: stock.fiveYearAvgPer },
              stock.priceSales && { label:"P/S", value: stock.priceSales },
              { label:"52주 고", value: stock.ath },
              { label:"52주 저", value: stock.atl },
            ].filter(Boolean).map(({ label, value }) => (
              <div key={label}>
                <div style={{ fontSize: 10, color:"rgba(255,255,255,0.3)", marginBottom: 2 }}>{label}</div>
                <div style={{ fontSize: 13, color:"rgba(255,255,255,0.8)", fontWeight: 600 }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 3단 본문 */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap: 16, marginBottom: 16 }}>

          {/* 컬럼 1: 요약 + 배경 + 주목포인트 */}
          <div style={{ display:"flex", flexDirection:"column", gap: 16 }}>
            <SectionBox title="요약">
              <p style={{ fontSize: 13, color:"rgba(255,255,255,0.75)", lineHeight: 1.8, margin: 0 }}>{stock.summary}</p>
            </SectionBox>

            {stock.context && (
              <SectionBox title="배경">
                <p style={{ fontSize: 12, color:"rgba(255,255,255,0.6)", lineHeight: 1.8, margin: 0 }}>{stock.context}</p>
              </SectionBox>
            )}

            {stock.watchPoints && (
              <SectionBox title="주목 포인트">
                <div style={{ display:"flex", flexDirection:"column", gap: 8 }}>
                  {stock.watchPoints.map((pt, i) => (
                    <div key={i} style={{ display:"flex", gap: 8, fontSize: 12, color:"rgba(255,255,255,0.65)" }}>
                      <span style={{ color:"#60a5fa", flexShrink: 0, marginTop: 1 }}>◆</span>
                      <span style={{ lineHeight: 1.6 }}>{pt}</span>
                    </div>
                  ))}
                </div>
              </SectionBox>
            )}
          </div>

          {/* 컬럼 2: 핵심 지표 + 특수 섹션 */}
          <div style={{ display:"flex", flexDirection:"column", gap: 16 }}>
            {stock.keyMetrics && (
              <SectionBox title="핵심 지표">
                <div>
                  {stock.keyMetrics.map((m, i) => (
                    <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", padding:"6px 0", borderBottom: i < stock.keyMetrics.length-1 ? "1px solid rgba(255,255,255,0.05)" : "none", gap: 12 }}>
                      <span style={{ fontSize: 11, color:"rgba(255,255,255,0.4)", flexShrink: 0 }}>{m.label}</span>
                      <span style={{ fontSize: 11, color:"rgba(255,255,255,0.8)", fontFamily:"monospace", textAlign:"right" }}>{m.value}</span>
                    </div>
                  ))}
                </div>
              </SectionBox>
            )}

            {/* BTC 온체인 */}
            {stock.onchain && (
              <SectionBox title="온체인 시그널">
                <div style={{ display:"flex", flexDirection:"column", gap: 8 }}>
                  {stock.onchain.map((oc, i) => (
                    <div key={i} style={{ background:"rgba(255,255,255,0.03)", borderRadius: 8, padding:"8px 10px" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom: 2 }}>
                        <span style={{ fontSize: 11, color:"rgba(255,255,255,0.45)" }}>{oc.label}</span>
                        <span style={{ fontSize: 11, color:"#f8fafc", fontFamily:"monospace" }}>{oc.value}</span>
                      </div>
                      <div style={{ fontSize: 10, color:"#60a5fa" }}>→ {oc.signal}</div>
                    </div>
                  ))}
                </div>
              </SectionBox>
            )}

            {/* IONQ 정부 계약 */}
            {stock.govContracts && (
              <SectionBox title="정부·방산 계약">
                <div style={{ display:"flex", flexDirection:"column", gap: 7 }}>
                  {stock.govContracts.map((c, i) => (
                    <div key={i} style={{ display:"flex", gap: 8, fontSize: 11, color:"rgba(255,255,255,0.65)" }}>
                      <span style={{ color:"#8b5cf6", flexShrink: 0 }}>▸</span>
                      <span style={{ lineHeight: 1.6 }}>{c}</span>
                    </div>
                  ))}
                </div>
              </SectionBox>
            )}

            {/* TSLA SpaceX */}
            {stock.spacexIpoConnection && (
              <SectionBox title={stock.spacexIpoConnection.title}>
                <div style={{ display:"flex", flexDirection:"column", gap: 7 }}>
                  {stock.spacexIpoConnection.points.map((pt, i) => (
                    <div key={i} style={{ display:"flex", gap: 8, fontSize: 11, color:"rgba(255,255,255,0.65)" }}>
                      <span style={{ color:"#ef4444", flexShrink: 0 }}>▸</span>
                      <span style={{ lineHeight: 1.6 }}>{pt}</span>
                    </div>
                  ))}
                </div>
              </SectionBox>
            )}

            {/* 팔란티어 비즈니스 모델 */}
            {stock.businessModel && (
              <>
                <SectionBox title="정부 부문">
                  <div style={{ display:"flex", flexDirection:"column", gap: 6 }}>
                    <div style={{ fontSize: 12, color:"#4ade80", fontWeight: 600, marginBottom: 4 }}>{stock.businessModel.government.revenue}</div>
                    {stock.businessModel.government.keyContracts.map((c, i) => (
                      <div key={i} style={{ display:"flex", gap: 8, fontSize: 11, color:"rgba(255,255,255,0.65)" }}>
                        <span style={{ color:"#8b5cf6", flexShrink: 0 }}>▸</span>
                        <span style={{ lineHeight: 1.6 }}>{c}</span>
                      </div>
                    ))}
                    <div style={{ fontSize: 10, color:"#60a5fa", marginTop: 4, padding:"6px 8px", background:"rgba(96,165,250,0.08)", borderRadius: 6 }}>
                      해자: {stock.businessModel.government.moat}
                    </div>
                  </div>
                </SectionBox>
                <SectionBox title="상업 부문">
                  <div style={{ display:"flex", flexDirection:"column", gap: 7 }}>
                    <div style={{ fontSize: 12, color:"#4ade80", fontWeight: 600 }}>{stock.businessModel.commercial.revenue}</div>
                    {[
                      { label: "AIP 드라이버", value: stock.businessModel.commercial.aipDriver },
                      { label: "핵심 지표", value: stock.businessModel.commercial.keyMetric },
                      { label: "고객 증가", value: stock.businessModel.commercial.customerGrowth },
                    ].map(({ label, value }) => (
                      <div key={label} style={{ display:"flex", gap: 10, alignItems:"flex-start" }}>
                        <span style={{ fontSize: 10, color:"rgba(255,255,255,0.35)", flexShrink: 0, paddingTop: 2, width: 56 }}>{label}</span>
                        <span style={{ fontSize: 11, color:"rgba(255,255,255,0.7)", lineHeight: 1.6 }}>{value}</span>
                      </div>
                    ))}
                  </div>
                </SectionBox>
              </>
            )}

            {/* 트리니티항공 브랜딩 현황 */}
            {stock.brandingStatus && (
              <SectionBox title="브랜딩 현황">
                <div style={{ display:"flex", flexDirection:"column", gap: 7 }}>
                  {[
                    { label: "종목명", value: stock.brandingStatus.stockName },
                    { label: "영문명", value: stock.brandingStatus.englishName },
                    { label: "운항 브랜드", value: stock.brandingStatus.operationBrand },
                    { label: "사명 의미", value: stock.brandingStatus.meaning },
                    { label: "모회사", value: stock.brandingStatus.parent },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display:"flex", gap: 10, alignItems:"flex-start" }}>
                      <span style={{ fontSize: 10, color:"rgba(255,255,255,0.35)", flexShrink: 0, paddingTop: 2, width: 60 }}>{label}</span>
                      <span style={{ fontSize: 11, color:"rgba(255,255,255,0.7)", lineHeight: 1.6 }}>{value}</span>
                    </div>
                  ))}
                </div>
              </SectionBox>
            )}

            {/* 팔란티어 버리 숏 분석 */}
            {stock.bearCaseAnalysis?.burry && (
              <SectionBox title="버리 공매도 분석">
                <div style={{ display:"flex", flexDirection:"column", gap: 8 }}>
                  <div style={{ fontSize: 11, padding:"6px 10px", background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.2)", borderRadius: 6, color:"#f87171" }}>
                    포지션: {stock.bearCaseAnalysis.burry.position}
                  </div>
                  <div style={{ fontSize: 10, color:"rgba(255,255,255,0.3)", textTransform:"uppercase", letterSpacing: 1 }}>숏 논거</div>
                  {stock.bearCaseAnalysis.burry.thesis.map((t, i) => (
                    <div key={i} style={{ display:"flex", gap: 8, fontSize: 11, color:"rgba(255,255,255,0.6)" }}>
                      <span style={{ color:"#f87171", flexShrink: 0 }}>▼</span>
                      <span style={{ lineHeight: 1.6 }}>{t}</span>
                    </div>
                  ))}
                  <div style={{ fontSize: 11, padding:"8px 10px", background:"rgba(34,197,94,0.08)", border:"1px solid rgba(34,197,94,0.15)", borderRadius: 6, color:"#4ade80", lineHeight: 1.6, marginTop: 2 }}>
                    반론: {stock.bearCaseAnalysis.burry.counterArgument}
                  </div>
                </div>
              </SectionBox>
            )}

            {/* HMM 지정학 연결구조 */}
            {stock.geopoliticsConnection && (
              <SectionBox title={stock.geopoliticsConnection.title}>
                <div style={{ display:"flex", flexDirection:"column", gap: 7 }}>
                  {stock.geopoliticsConnection.points.map((pt, i) => (
                    <div key={i} style={{ display:"flex", gap: 8, fontSize: 11, color:"rgba(255,255,255,0.65)" }}>
                      <span style={{ color:"#f59e0b", flexShrink: 0 }}>▸</span>
                      <span style={{ lineHeight: 1.6 }}>{pt}</span>
                    </div>
                  ))}
                </div>
              </SectionBox>
            )}

            {/* HMM 수급 구조 */}
            {stock.supplyDemand && (
              <SectionBox title={stock.supplyDemand.title}>
                <div style={{ display:"flex", flexDirection:"column", gap: 8 }}>
                  {[
                    { label: "수요", value: stock.supplyDemand.demand, color: "#60a5fa" },
                    { label: "공급", value: stock.supplyDemand.supply, color: "#f87171" },
                    { label: "결론", value: stock.supplyDemand.conclusion, color: "#f8fafc" },
                    { label: "완충요인", value: stock.supplyDemand.mitigation, color: "#a3a3a3" },
                  ].map(({ label, value, color }) => (
                    <div key={label} style={{ display:"flex", gap: 10, alignItems:"flex-start" }}>
                      <span style={{ fontSize: 10, color:"rgba(255,255,255,0.35)", flexShrink: 0, paddingTop: 2, width: 44 }}>{label}</span>
                      <span style={{ fontSize: 11, color, lineHeight: 1.6 }}>{value}</span>
                    </div>
                  ))}
                </div>
              </SectionBox>
            )}

            {/* 삼성전자 사업부문 */}
            {stock.businessSegments && (
              <SectionBox title="사업 부문">
                <div style={{ display:"flex", flexDirection:"column", gap: 10 }}>
                  {stock.businessSegments.map((seg, i) => (
                    <div key={i} style={{ background:"rgba(255,255,255,0.03)", borderRadius: 8, padding:"10px 12px" }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color:"#f8fafc", marginBottom: 4 }}>{seg.name}</div>
                      <p style={{ fontSize: 11, color:"rgba(255,255,255,0.5)", margin: "0 0 5px", lineHeight: 1.6 }}>{seg.detail}</p>
                      <div style={{ fontSize: 10, color:"#60a5fa" }}>→ {seg.outlook}</div>
                    </div>
                  ))}
                </div>
              </SectionBox>
            )}

            {/* SK하이닉스 HBM 로드맵 */}
            {stock.hbmRoadmap && (
              <SectionBox title="HBM 로드맵">
                <div style={{ display:"flex", flexDirection:"column", gap: 10 }}>
                  {stock.hbmRoadmap.map((h, i) => (
                    <div key={i} style={{ background:"rgba(255,255,255,0.03)", borderRadius: 8, padding:"10px 12px" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: 5 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color:"#f8fafc" }}>{h.gen}</span>
                        <span style={{ fontSize: 10, padding:"2px 7px", borderRadius: 4, background:"rgba(34,197,94,0.15)", color:"#4ade80" }}>{h.status}</span>
                      </div>
                      <p style={{ fontSize: 11, color:"rgba(255,255,255,0.5)", margin: "0 0 4px", lineHeight: 1.6 }}>{h.detail}</p>
                      <div style={{ fontSize: 10, color:"#f59e0b" }}>점유율: {h.share}</div>
                      {h.customers && <div style={{ fontSize: 10, color:"rgba(255,255,255,0.35)", marginTop: 2 }}>고객: {h.customers}</div>}
                      {h.tsmc && <div style={{ fontSize: 10, color:"rgba(255,255,255,0.35)", marginTop: 2 }}>TSMC: {h.tsmc}</div>}
                    </div>
                  ))}
                </div>
              </SectionBox>
            )}

            {/* SK하이닉스 생산 인프라 */}
            {stock.infrastructure && (
              <SectionBox title="생산 인프라">
                <div style={{ display:"flex", flexDirection:"column", gap: 7 }}>
                  {stock.infrastructure.map((inf, i) => (
                    <div key={i} style={{ display:"flex", gap: 10, alignItems:"flex-start", padding:"6px 0", borderBottom: i < stock.infrastructure.length-1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color:"#60a5fa", flexShrink: 0, minWidth: 90 }}>{inf.facility}</span>
                      <span style={{ fontSize: 11, color:"rgba(255,255,255,0.55)", lineHeight: 1.5 }}>{inf.detail}</span>
                    </div>
                  ))}
                </div>
              </SectionBox>
            )}

            {/* SK하이닉스 주요 고객 */}
            {stock.keyCustomers && (
              <SectionBox title="주요 고객">
                <div style={{ display:"flex", flexDirection:"column", gap: 7 }}>
                  {stock.keyCustomers.map((c, i) => {
                    const statusColor = c.status === "핵심" ? "#4ade80" : c.status === "협의" ? "#f59e0b" : "#60a5fa";
                    return (
                      <div key={i} style={{ display:"flex", gap: 10, alignItems:"flex-start", padding:"6px 0", borderBottom: i < stock.keyCustomers.length-1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                        <div style={{ flexShrink: 0, display:"flex", flexDirection:"column", alignItems:"flex-start", gap: 3, minWidth: 90 }}>
                          <span style={{ fontSize: 11, fontWeight: 600, color:"#f8fafc" }}>{c.name}</span>
                          <span style={{ fontSize: 9, padding:"1px 5px", borderRadius: 3, background:`${statusColor}22`, color: statusColor }}>{c.status}</span>
                        </div>
                        <span style={{ fontSize: 11, color:"rgba(255,255,255,0.55)", lineHeight: 1.5 }}>{c.detail}</span>
                      </div>
                    );
                  })}
                </div>
              </SectionBox>
            )}

            {/* 넥슨 파이프라인 */}
            {stock.pipeline && (
              <SectionBox title="신작 파이프라인">
                <div style={{ display:"flex", flexDirection:"column", gap: 10 }}>
                  {stock.pipeline.map((p, i) => (
                    <div key={i} style={{ background:"rgba(255,255,255,0.03)", borderRadius: 8, padding:"10px 12px" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: 4 }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color:"#f8fafc" }}>{p.name}</span>
                        <span style={{ fontSize: 10, padding:"2px 7px", borderRadius: 4, background:"rgba(107,114,128,0.2)", color:"#9ca3af" }}>{p.timeline}</span>
                      </div>
                      <p style={{ fontSize: 11, color:"rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.6 }}>{p.detail}</p>
                    </div>
                  ))}
                </div>
              </SectionBox>
            )}
          </div>

          {/* 컬럼 3: 강세/약세 + 시나리오 */}
          <div style={{ display:"flex", flexDirection:"column", gap: 16 }}>
            <SectionBox title="강세 논거">
              <div style={{ display:"flex", flexDirection:"column", gap: 7 }}>
                {stock.bull.map((b, i) => (
                  <div key={i} style={{ display:"flex", gap: 8, fontSize: 12, color:"rgba(255,255,255,0.7)" }}>
                    <span style={{ color:"#4ade80", flexShrink: 0, marginTop: 1 }}>▲</span>
                    <span style={{ lineHeight: 1.6 }}>{b}</span>
                  </div>
                ))}
              </div>
            </SectionBox>

            <SectionBox title="리스크">
              <div style={{ display:"flex", flexDirection:"column", gap: 7 }}>
                {stock.bear.map((b, i) => (
                  <div key={i} style={{ display:"flex", gap: 8, fontSize: 12, color:"rgba(255,255,255,0.7)" }}>
                    <span style={{ color:"#f87171", flexShrink: 0, marginTop: 1 }}>▼</span>
                    <span style={{ lineHeight: 1.6 }}>{b}</span>
                  </div>
                ))}
              </div>
            </SectionBox>

            {stock.scenarios && (
              <SectionBox title="시나리오 분석">
                <div style={{ display:"flex", flexDirection:"column", gap: 10 }}>
                  {stock.scenarios.map((sc, i) => (
                    <div key={i} style={{ background:`rgba(255,255,255,0.03)`, border:`1px solid ${scenarioAccent[i]}33`, borderRadius: 10, padding:"12px 14px" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: 5 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: scenarioAccent[i] }}>{sc.name}</span>
                        <span style={{ fontSize: 12, padding:"2px 8px", borderRadius: 10, background:`${scenarioAccent[i]}22`, color: scenarioAccent[i], fontWeight: 600 }}>{sc.probability}</span>
                      </div>
                      <div style={{ fontSize: 11, color:"rgba(255,255,255,0.45)", marginBottom: 4 }}>{sc.condition}</div>
                      <div style={{ fontSize: 13, color:"#f8fafc", fontFamily:"monospace", fontWeight: 600 }}>→ {sc.target}</div>
                    </div>
                  ))}
                </div>
              </SectionBox>
            )}
          </div>
        </div>

        {/* 핵심 레벨 (풀 width) */}
        <SectionBox title="핵심 레벨">
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))", gap: 8 }}>
            {stock.levels.map((lv, i) => (
              <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 14px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)", borderRadius: 8 }}>
                <div style={{ display:"flex", alignItems:"center", gap: 8 }}>
                  <LevelBadge type={lv.type} />
                  <span style={{ fontSize: 12, color:"rgba(255,255,255,0.55)" }}>{lv.label}</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color:"#f8fafc", fontFamily:"monospace" }}>{lv.value}</span>
              </div>
            ))}
          </div>
        </SectionBox>

      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// 루트
// ────────────────────────────────────────────────────────────
export default function App() {
  const [selected, setSelected] = useState(null); // { stock, date }

  if (selected) {
    return <DetailPage stock={selected.stock} analysisDate={selected.date} onBack={() => setSelected(null)} />;
  }
  return <ListView onSelect={(stock, date) => setSelected({ stock, date })} />;
}
