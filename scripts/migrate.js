/**
 * stocks.js 데이터를 새 구조(stocks/{ticker}/analyses/{date})로 Firestore에 업로드.
 * 실행: node scripts/migrate.js
 */
import { readFileSync } from "fs";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const env = {};
readFileSync(".env", "utf-8").split("\n").forEach(line => {
  const idx = line.indexOf("=");
  if (idx > 0) env[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
});

const app = initializeApp({
  apiKey:            env.VITE_FIREBASE_API_KEY,
  authDomain:        env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             env.VITE_FIREBASE_APP_ID,
});

const db = getFirestore(app);

const { stocks } = await import("../src/data/stocks.js");
const ANALYSIS_DATE = "2026-04-19";

console.log(`📦 ${stocks.length}개 종목 → stocks/{ticker}/analyses/${ANALYSIS_DATE} 업로드 중...`);

for (const stock of stocks) {
  const stockData = { ...stock, latestDate: ANALYSIS_DATE };
  const analysisData = { ...stock, date: ANALYSIS_DATE };

  // stocks/{ticker} — 최신 데이터 + latestDate 내장
  await setDoc(doc(db, "stocks", stock.ticker), stockData);

  // stocks/{ticker}/analyses/{date} — 날짜별 스냅샷
  await setDoc(doc(db, "stocks", stock.ticker, "analyses", ANALYSIS_DATE), analysisData);

  console.log(`  ✓ ${stock.ticker}`);
}

console.log(`✅ 완료`);
process.exit(0);
