import { useState } from "react";
import { stocks, analysisDate, getScoreColor, getScoreLabel } from "./data/stocks";

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
    current: { bg:"rgba(59,130,246,0.15)",  color:"#60a5fa",  label:"현재" },
    resist:  { bg:"rgba(239,68,68,0.12)",   color:"#f87171",  label:"저항" },
    support: { bg:"rgba(34,197,94,0.12)",   color:"#4ade80",  label:"지지" },
    target:  { bg:"rgba(168,85,247,0.12)",  color:"#c084fc",  label:"목표" },
    stop:    { bg:"rgba(239,68,68,0.2)",    color:"#ef4444",  label:"손절" },
  };
  const s = m[type] || m.current;
  return <span style={{ fontSize: 10, padding: "2px 6px", borderRadius: 4, background: s.bg, color: s.color, fontWeight: 500 }}>{s.label}</span>;
}

function SectionTitle({ children }) {
  return (
    <div style={{ fontSize: 10, color:"rgba(255,255,255,0.35)", marginBottom: 10, textTransform:"uppercase", letterSpacing: 1.2, fontWeight: 600 }}>
      {children}
    </div>
  );
}

function DetailPanel({ stock }) {
  const [tab, setTab] = useState("overview");

  if (!stock) return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", color:"rgba(255,255,255,0.25)" }}>
      <div style={{ fontSize: 32, marginBottom: 12 }}>📊</div>
      <div style={{ fontSize: 13 }}>종목을 선택하세요</div>
    </div>
  );

  const tabs = [
    { id: "overview", label: "개요" },
    { id: "metrics", label: "지표" },
    { id: "analysis", label: "분석" },
    { id: "levels", label: "레벨" },
  ];

  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column" }}>
      {/* 헤더 */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ display:"flex", alignItems:"center", gap: 8, marginBottom: 4, flexWrap:"wrap" }}>
          <span style={{ fontSize: 20, fontWeight: 700, color:"#f8fafc", fontFamily:"monospace" }}>{stock.ticker}</span>
          <span style={{ fontSize: 12, color:"rgba(255,255,255,0.45)" }}>{stock.name}</span>
          <span style={{ fontSize: 10, padding:"2px 7px", borderRadius: 4, background: categoryColor[stock.category]+"22", color: categoryColor[stock.category], fontWeight: 500 }}>{stock.category}</span>
          {stock.earning !== "—" && (
            <span style={{ fontSize: 10, padding:"2px 7px", borderRadius: 4, background:"rgba(251,191,36,0.15)", color:"#fbbf24", marginLeft:"auto" }}>어닝 {stock.earning}</span>
          )}
        </div>

        {/* 가격 행 */}
        <div style={{ display:"flex", gap: 12, flexWrap:"wrap", fontSize: 11, marginBottom: 8 }}>
          <span style={{ color:"#f8fafc", fontWeight: 600, fontSize: 16 }}>{stock.price}</span>
          <span style={{ color: stock.positive ? "#22c55e" : "#ef4444", fontWeight: 600, alignSelf:"center" }}>{stock.change}</span>
          <span style={{ color:"rgba(255,255,255,0.4)", alignSelf:"center" }}>YTD <strong style={{ color: stock.ytd.startsWith("-") ? "#ef4444" : "#22c55e" }}>{stock.ytd}</strong></span>
        </div>

        {/* 메타 행 */}
        <div style={{ display:"flex", gap: 10, flexWrap:"wrap", fontSize: 10, color:"rgba(255,255,255,0.35)" }}>
          {stock.marketCap && <span>시총 <span style={{ color:"rgba(255,255,255,0.6)" }}>{stock.marketCap}</span></span>}
          {stock.per && <span>P/E <span style={{ color:"rgba(255,255,255,0.6)" }}>{stock.per}</span></span>}
          {stock.forwardPer && <span>Fwd P/E <span style={{ color:"rgba(255,255,255,0.6)" }}>{stock.forwardPer}</span></span>}
          <span>52H <span style={{ color:"rgba(255,255,255,0.6)" }}>{stock.ath}</span></span>
          <span>52L <span style={{ color:"rgba(255,255,255,0.6)" }}>{stock.atl}</span></span>
        </div>
      </div>

      {/* 탭 */}
      <div style={{ display:"flex", gap: 4, marginBottom: 14, borderBottom:"1px solid rgba(255,255,255,0.07)", paddingBottom: 10 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding:"4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 500,
            cursor:"pointer", border:"none", transition:"all 0.15s",
            background: tab === t.id ? "#3b82f6" : "rgba(255,255,255,0.06)",
            color: tab === t.id ? "#fff" : "rgba(255,255,255,0.5)",
          }}>{t.label}</button>
        ))}
      </div>

      {/* 탭 콘텐츠 */}
      <div style={{ flex: 1, overflowY:"auto", paddingRight: 2 }}>
        {tab === "overview" && <OverviewTab stock={stock} />}
        {tab === "metrics" && <MetricsTab stock={stock} />}
        {tab === "analysis" && <AnalysisTab stock={stock} />}
        {tab === "levels" && <LevelsTab stock={stock} />}
      </div>
    </div>
  );
}

function OverviewTab({ stock }) {
  return (
    <div>
      {/* 점수 */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap: 10, marginBottom: 16 }}>
        {[{label:"단기 매수점수", score:stock.shortScore},{label:"중기 매수점수", score:stock.midScore}].map(({label,score}) => (
          <div key={label} style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding:"12px 14px" }}>
            <div style={{ fontSize: 10, color:"rgba(255,255,255,0.4)", marginBottom: 8 }}>{label}</div>
            <div style={{ display:"flex", alignItems:"center", gap: 10 }}>
              <ScoreRing score={score} size={48} />
              <div>
                <div style={{ fontSize: 17, fontWeight: 700, color: getScoreColor(score) }}>{score}%</div>
                <div style={{ fontSize: 10, color: getScoreColor(score), opacity: 0.85 }}>{getScoreLabel(score)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 요약 */}
      <div style={{ marginBottom: 16 }}>
        <SectionTitle>요약</SectionTitle>
        <p style={{ fontSize: 12, color:"rgba(255,255,255,0.75)", lineHeight: 1.75, margin: 0 }}>{stock.summary}</p>
      </div>

      {/* 배경 */}
      {stock.context && (
        <div style={{ marginBottom: 16 }}>
          <SectionTitle>배경</SectionTitle>
          <p style={{ fontSize: 12, color:"rgba(255,255,255,0.6)", lineHeight: 1.75, margin: 0 }}>{stock.context}</p>
        </div>
      )}

      {/* 주목 포인트 */}
      {stock.watchPoints && (
        <div>
          <SectionTitle>주목 포인트</SectionTitle>
          <div style={{ display:"flex", flexDirection:"column", gap: 6 }}>
            {stock.watchPoints.map((pt, i) => (
              <div key={i} style={{ display:"flex", gap: 8, fontSize: 12, color:"rgba(255,255,255,0.65)" }}>
                <span style={{ color:"#60a5fa", flexShrink: 0 }}>◆</span>
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MetricsTab({ stock }) {
  return (
    <div>
      {/* 핵심 지표 */}
      {stock.keyMetrics && (
        <div style={{ marginBottom: 16 }}>
          <SectionTitle>핵심 지표</SectionTitle>
          <div style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.06)", borderRadius: 8, overflow:"hidden" }}>
            {stock.keyMetrics.map((m, i) => (
              <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", padding:"7px 12px", borderBottom: i < stock.keyMetrics.length-1 ? "1px solid rgba(255,255,255,0.04)" : "none", gap: 12 }}>
                <span style={{ fontSize: 11, color:"rgba(255,255,255,0.45)", flexShrink: 0, minWidth: 80 }}>{m.label}</span>
                <span style={{ fontSize: 11, color:"rgba(255,255,255,0.8)", fontFamily:"monospace", textAlign:"right" }}>{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 온체인 (BTC 전용) */}
      {stock.onchain && (
        <div style={{ marginBottom: 16 }}>
          <SectionTitle>온체인 시그널</SectionTitle>
          <div style={{ display:"flex", flexDirection:"column", gap: 6 }}>
            {stock.onchain.map((oc, i) => (
              <div key={i} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)", borderRadius: 8, padding:"8px 12px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: 2 }}>
                  <span style={{ fontSize: 11, color:"rgba(255,255,255,0.45)" }}>{oc.label}</span>
                  <span style={{ fontSize: 11, color:"#f8fafc", fontFamily:"monospace" }}>{oc.value}</span>
                </div>
                <div style={{ fontSize: 10, color:"#60a5fa" }}>→ {oc.signal}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 정부 계약 (IONQ 전용) */}
      {stock.govContracts && (
        <div style={{ marginBottom: 16 }}>
          <SectionTitle>정부·방산 계약</SectionTitle>
          <div style={{ display:"flex", flexDirection:"column", gap: 6 }}>
            {stock.govContracts.map((c, i) => (
              <div key={i} style={{ display:"flex", gap: 8, fontSize: 11, color:"rgba(255,255,255,0.65)" }}>
                <span style={{ color:"#8b5cf6", flexShrink: 0 }}>▸</span>
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 파이프라인 (넥슨게임즈 전용) */}
      {stock.pipeline && (
        <div>
          <SectionTitle>신작 파이프라인</SectionTitle>
          <div style={{ display:"flex", flexDirection:"column", gap: 8 }}>
            {stock.pipeline.map((p, i) => (
              <div key={i} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)", borderRadius: 8, padding:"10px 12px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color:"#f8fafc" }}>{p.name}</span>
                  <span style={{ fontSize: 10, padding:"2px 7px", borderRadius: 4, background:"rgba(107,114,128,0.2)", color:"#9ca3af" }}>{p.timeline}</span>
                </div>
                <p style={{ fontSize: 11, color:"rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.6 }}>{p.detail}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SpaceX IPO 연결 (TSLA 전용) */}
      {stock.spacexIpoConnection && (
        <div>
          <SectionTitle>{stock.spacexIpoConnection.title}</SectionTitle>
          <div style={{ display:"flex", flexDirection:"column", gap: 6 }}>
            {stock.spacexIpoConnection.points.map((pt, i) => (
              <div key={i} style={{ display:"flex", gap: 8, fontSize: 11, color:"rgba(255,255,255,0.65)" }}>
                <span style={{ color:"#ef4444", flexShrink: 0 }}>▸</span>
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AnalysisTab({ stock }) {
  const scenarioColors = {
    0: { bg:"rgba(34,197,94,0.1)", border:"rgba(34,197,94,0.25)", accent:"#4ade80" },
    1: { bg:"rgba(59,130,246,0.1)", border:"rgba(59,130,246,0.25)", accent:"#60a5fa" },
    2: { bg:"rgba(239,68,68,0.1)", border:"rgba(239,68,68,0.25)", accent:"#f87171" },
  };

  return (
    <div>
      {/* 강세/약세 */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap: 12, marginBottom: 16 }}>
        {[{title:"강세 논거", items:stock.bull, icon:"▲", color:"#4ade80"}, {title:"리스크", items:stock.bear, icon:"▼", color:"#f87171"}].map(({title,items,icon,color}) => (
          <div key={title}>
            <SectionTitle>{title}</SectionTitle>
            {items.map((b,i) => (
              <div key={i} style={{ display:"flex", gap: 7, marginBottom: 6, fontSize: 11, color:"rgba(255,255,255,0.65)" }}>
                <span style={{ color, flexShrink: 0, marginTop: 1 }}>{icon}</span>
                <span>{b}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* 시나리오 */}
      {stock.scenarios && (
        <div>
          <SectionTitle>시나리오 분석</SectionTitle>
          <div style={{ display:"flex", flexDirection:"column", gap: 8 }}>
            {stock.scenarios.map((sc, i) => {
              const c = scenarioColors[i] || scenarioColors[1];
              return (
                <div key={i} style={{ background: c.bg, border:`1px solid ${c.border}`, borderRadius: 8, padding:"10px 12px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: 4 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: c.accent }}>{sc.name}</span>
                    <span style={{ fontSize: 11, padding:"1px 7px", borderRadius: 10, background: c.border, color: c.accent, fontWeight: 600 }}>{sc.probability}</span>
                  </div>
                  <div style={{ fontSize: 11, color:"rgba(255,255,255,0.5)", marginBottom: 3 }}>{sc.condition}</div>
                  <div style={{ fontSize: 12, color:"#f8fafc", fontFamily:"monospace" }}>→ {sc.target}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function LevelsTab({ stock }) {
  return (
    <div>
      <SectionTitle>핵심 레벨</SectionTitle>
      <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius: 8, overflow:"hidden", marginBottom: 16 }}>
        {stock.levels.map((lv, i) => (
          <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 12px", borderBottom: i < stock.levels.length-1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
            <div style={{ display:"flex", alignItems:"center", gap: 8 }}>
              <LevelBadge type={lv.type} />
              <span style={{ fontSize: 11, color:"rgba(255,255,255,0.5)" }}>{lv.label}</span>
            </div>
            <span style={{ fontSize: 12, fontWeight: 600, color:"#f8fafc", fontFamily:"monospace" }}>{lv.value}</span>
          </div>
        ))}
      </div>

      {/* 시나리오 요약 (레벨 탭에서도 간략 표시) */}
      {stock.scenarios && (
        <div>
          <SectionTitle>가격 시나리오</SectionTitle>
          <div style={{ display:"flex", flexDirection:"column", gap: 6 }}>
            {stock.scenarios.map((sc, i) => (
              <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"6px 10px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)", borderRadius: 6 }}>
                <span style={{ fontSize: 11, color:"rgba(255,255,255,0.6)" }}>{sc.name}</span>
                <div style={{ display:"flex", gap: 10, alignItems:"center" }}>
                  <span style={{ fontSize: 11, color:"#f8fafc", fontFamily:"monospace" }}>{sc.target}</span>
                  <span style={{ fontSize: 10, color:"rgba(255,255,255,0.35)" }}>{sc.probability}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
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
      <div style={{ maxWidth: 1200, margin:"0 auto" }}>

        {/* 헤더 */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: 24, flexWrap:"wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: -0.5 }}>
              <span style={{ color:"#60a5fa" }}>종목</span> 분석 대시보드
            </h1>
            <p style={{ fontSize: 12, color:"rgba(255,255,255,0.35)", margin:"4px 0 0" }}>
              {analysisDate} · {stocks.length}개 종목 분석
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
        <div style={{ display:"grid", gridTemplateColumns:"1fr 380px", gap: 16, alignItems:"start" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap: 10 }}>
            {sorted.map(s => <StockCard key={s.ticker} stock={s} onClick={setSelected} selected={selected?.ticker === s.ticker} />)}
          </div>
          <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: 18, position:"sticky", top: 20, maxHeight:"calc(100vh - 40px)", minHeight: 500, overflow: "hidden", display:"flex", flexDirection:"column" }}>
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
