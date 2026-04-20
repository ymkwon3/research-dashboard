/**
 * Firestore 업로드 스크립트
 *
 * 사용법:
 *   1. scripts/upload-data.json 에 데이터 작성 (Claude가 자동으로 작성함)
 *   2. node scripts/upload.js
 *
 * upload-data.json 형식:
 * {
 *   "date": "2026-04-26",
 *   "stocks": [ ...stocks 배열... ]
 * }
 */
import { readFileSync } from "fs";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// .env 읽기
const env = {};
readFileSync(".env", "utf-8").split("\n").forEach(line => {
  const idx = line.indexOf("=");
  if (idx > 0) env[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
});

// upload-data.json 읽기
let uploadData;
try {
  uploadData = JSON.parse(readFileSync("scripts/upload-data.json", "utf-8"));
} catch {
  console.error("❌ scripts/upload-data.json 파일을 찾을 수 없거나 형식이 잘못되었습니다.");
  process.exit(1);
}

const { date, stocks } = uploadData;
if (!date || !stocks?.length) {
  console.error("❌ date와 stocks 필드가 필요합니다.");
  process.exit(1);
}

const app = initializeApp({
  apiKey:            env.VITE_FIREBASE_API_KEY,
  authDomain:        env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             env.VITE_FIREBASE_APP_ID,
});

const db = getFirestore(app);

console.log(`📦 ${stocks.length}개 종목 → Firestore (${date}) 업로드 중...`);

for (const stock of stocks) {
  await setDoc(doc(db, "stocks", stock.ticker), { ...stock, latestDate: date });
  await setDoc(doc(db, "stocks", stock.ticker, "analyses", date), { ...stock, date });
  console.log(`  ✓ ${stock.ticker}`);
}

console.log(`✅ 완료 — ${date} 분석 데이터 업로드 완료`);
process.exit(0);
