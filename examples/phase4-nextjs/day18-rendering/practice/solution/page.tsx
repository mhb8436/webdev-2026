// ============================================
// 연습문제 1 & 3 풀이: 서버 컴포넌트 (page.tsx)
// ============================================

// page.tsx는 기본적으로 서버 컴포넌트입니다.
// 서버에서 데이터를 준비하고, 클라이언트 컴포넌트에 props로 전달합니다.

import LikeButton from "./LikeButton";
import StatsChart from "./StatsChart";

// ====== 연습문제 1: 뉴스 데이터 (서버에서 준비) ======
const newsItems = [
  {
    id: 1,
    title: "Next.js 15 출시",
    summary: "새로운 기능들이 추가되었습니다.",
    author: "김개발",
  },
  {
    id: 2,
    title: "React 19 업데이트",
    summary: "서버 컴포넌트가 안정화되었습니다.",
    author: "이리액트",
  },
  {
    id: 3,
    title: "TypeScript 6.0 발표",
    summary: "타입 시스템이 더욱 강력해졌습니다.",
    author: "박타입",
  },
];

// ====== 연습문제 3: 통계 계산 (서버에서 수행) ======
const monthlySales = [
  { month: "1월", amount: 120 },
  { month: "2월", amount: 98 },
  { month: "3월", amount: 150 },
  { month: "4월", amount: 200 },
  { month: "5월", amount: 175 },
  { month: "6월", amount: 220 },
];

// 서버에서 미리 계산 -> 클라이언트에 계산 부담을 주지 않음
const total = monthlySales.reduce((sum, s) => sum + s.amount, 0);
const average = Math.round(total / monthlySales.length);
const maxMonth = monthlySales.reduce((max, s) =>
  s.amount > max.amount ? s : max
);

export default function Home() {
  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: "800px", margin: "0 auto", padding: "24px" }}>
      {/* ====== 연습문제 1: 뉴스 피드 ====== */}
      <section style={{ marginBottom: "48px" }}>
        <h1>최신 뉴스</h1>

        {/* 뉴스 목록 렌더링은 서버 컴포넌트에서 수행 */}
        {/* 이유: 단순한 데이터 표시이므로 클라이언트 JS가 필요 없음 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {newsItems.map((news) => (
            <article
              key={news.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
              }}
            >
              <h2 style={{ margin: "0 0 8px 0" }}>{news.title}</h2>
              <p style={{ color: "#666", margin: "0 0 8px 0" }}>
                {news.summary}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ color: "#999", fontSize: "14px" }}>
                  작성자: {news.author}
                </span>
                {/* LikeButton은 클라이언트 컴포넌트 */}
                {/* 이유: onClick 이벤트와 useState가 필요하므로 */}
                <LikeButton />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ====== 연습문제 3: 통계 차트 ====== */}
      <section>
        <h1>판매 통계 대시보드</h1>
        <div
          style={{
            display: "flex",
            gap: "24px",
            marginBottom: "24px",
            fontSize: "14px",
            color: "#666",
          }}
        >
          <span>
            총 판매액: <strong>{total}만원</strong>
          </span>
          <span>
            월평균: <strong>{average}만원</strong>
          </span>
          <span>
            최고: <strong>{maxMonth.month} ({maxMonth.amount}만원)</strong>
          </span>
        </div>

        {/* StatsChart는 클라이언트 컴포넌트 */}
        {/* 이유: 호버 인터랙션이 필요하므로 */}
        {/* 서버에서 계산한 데이터를 props로 전달 */}
        <StatsChart data={monthlySales} maxAmount={maxMonth.amount} />
      </section>
    </div>
  );
}
