/**
 * 기존 stocks.js 데이터를 Firestore에 마이그레이션하는 1회성 스크립트.
 *
 * 사전 준비:
 *   1. Firebase Console → 프로젝트 설정 → 서비스 계정 → 새 비공개 키 생성
 *   2. 다운로드한 JSON 파일을 프로젝트 루트에 serviceAccountKey.json 으로 저장
 *   3. npm install firebase-admin (최초 1회)
 *
 * 실행:
 *   node scripts/migrate.js
 */

import { readFileSync } from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

let admin;
try {
  admin = require("firebase-admin");
} catch {
  console.error("firebase-admin 패키지가 없습니다. 아래 명령어로 설치하세요:");
  console.error("  npm install firebase-admin");
  process.exit(1);
}

let serviceAccount;
try {
  serviceAccount = JSON.parse(readFileSync("./serviceAccountKey.json", "utf-8"));
} catch {
  console.error("serviceAccountKey.json 파일을 찾을 수 없습니다.");
  console.error("Firebase Console → 프로젝트 설정 → 서비스 계정에서 키를 생성하세요.");
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// ─── 마이그레이션할 데이터 ────────────────────────────────────
// src/data/stocks.js 내용을 아래에 붙여넣으세요 (analysisDate 포함)
const ANALYSIS_DATE = "2026-04-19"; // YYYY-MM-DD 형식으로 수정

// stocks 배열 — src/data/stocks.js 의 export const stocks = [...] 내용 그대로 복사
const stocks = [
  // 여기에 src/data/stocks.js 의 배열 내용을 붙여넣으세요
];
// ─────────────────────────────────────────────────────────────

async function migrate() {
  if (stocks.length === 0) {
    console.error("stocks 배열이 비어있습니다. 스크립트 상단에 데이터를 붙여넣어 주세요.");
    process.exit(1);
  }

  const docRef = db.collection("analyses").doc(ANALYSIS_DATE);
  await docRef.set({
    date: ANALYSIS_DATE,
    stocks,
  });

  console.log(`✅ ${ANALYSIS_DATE} 문서에 ${stocks.length}개 종목 업로드 완료`);
  process.exit(0);
}

migrate().catch((err) => {
  console.error("마이그레이션 실패:", err);
  process.exit(1);
});
