/**
 * 기존 stocks.js 데이터를 Firestore에 업로드하는 1회성 스크립트.
 * 실행: node scripts/migrate.js
 */
import { readFileSync } from "fs";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// .env 파일에서 Firebase config 읽기
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

console.log(`📦 ${stocks.length}개 종목 → Firestore analyses/${ANALYSIS_DATE} 업로드 중...`);

await setDoc(doc(db, "analyses", ANALYSIS_DATE), {
  date: ANALYSIS_DATE,
  stocks,
});

console.log(`✅ 완료`);
process.exit(0);
