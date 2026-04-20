import { collection, getDocs, doc, getDoc, orderBy, query } from "firebase/firestore";
import { db } from "../lib/firebase";

const COLLECTION = "analyses";

// 가장 최신 날짜의 stocks 반환 (리스트 뷰용)
export async function fetchLatestStocks() {
  const q = query(collection(db, COLLECTION), orderBy("date", "desc"));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return { stocks: [], date: null };
  const latest = snapshot.docs[0].data();
  return { stocks: latest.stocks ?? [], date: latest.date };
}

// 특정 ticker가 있는 모든 날짜 목록 반환 (상세 페이지 날짜 탭용)
export async function fetchDatesForTicker(ticker) {
  const q = query(collection(db, COLLECTION), orderBy("date", "desc"));
  const snapshot = await getDocs(q);
  const dates = [];
  snapshot.docs.forEach((d) => {
    const { date, stocks } = d.data();
    if (stocks?.some((s) => s.ticker === ticker)) {
      dates.push(date);
    }
  });
  return dates; // 최신순 정렬
}

// 특정 날짜의 특정 ticker 데이터 반환
export async function fetchStockByDateAndTicker(date, ticker) {
  const snap = await getDoc(doc(db, COLLECTION, date));
  if (!snap.exists()) return null;
  const stocks = snap.data().stocks ?? [];
  return stocks.find((s) => s.ticker === ticker) ?? null;
}
