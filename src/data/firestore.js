import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

// 리스트 뷰: 모든 종목의 최신 분석 데이터 반환
export async function fetchLatestStocks() {
  const snapshot = await getDocs(collection(db, "stocks"));
  const stocks = snapshot.docs.map((d) => d.data());
  const date = stocks[0]?.latestDate ?? null;
  return { stocks, date };
}

// 상세 페이지: 특정 ticker의 분석 날짜 목록 반환 (최신순)
export async function fetchDatesForTicker(ticker) {
  const snapshot = await getDocs(collection(db, "stocks", ticker, "analyses"));
  return snapshot.docs
    .map((d) => d.id)
    .sort((a, b) => b.localeCompare(a));
}

// 상세 페이지: 특정 ticker의 특정 날짜 분석 데이터 반환
export async function fetchStockByDateAndTicker(date, ticker) {
  const snap = await getDoc(doc(db, "stocks", ticker, "analyses", date));
  if (!snap.exists()) return null;
  return snap.data();
}
