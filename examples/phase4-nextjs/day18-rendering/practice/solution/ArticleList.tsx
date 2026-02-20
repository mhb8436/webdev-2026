// ============================================
// 연습문제 2 풀이: ArticleList (서버 컴포넌트)
// ============================================

// 서버 컴포넌트인 이유:
// - 데이터(기사 목록)를 가져와 표시하는 역할입니다.
// - 사용자 상호작용이 없으며, 단순히 데이터를 렌더링합니다.
// - 실제로는 DB나 API에서 데이터를 직접 가져올 수 있습니다.
// - 서버에서 HTML을 완성하여 전송하므로 초기 로딩이 빠릅니다.

// 'use client' 선언 없음 -> 서버 컴포넌트 (기본값)

import LikeButton from "./LikeButton";

const articles = [
  {
    id: 1,
    title: "2025년 프론트엔드 트렌드",
    summary: "올해 주목해야 할 프론트엔드 기술들을 정리했습니다.",
    date: "2025-04-24",
  },
  {
    id: 2,
    title: "서버 컴포넌트의 장점",
    summary: "React Server Components가 왜 중요한지 알아봅니다.",
    date: "2025-04-23",
  },
  {
    id: 3,
    title: "타입스크립트 실전 팁",
    summary: "실무에서 유용한 TypeScript 패턴을 소개합니다.",
    date: "2025-04-22",
  },
];

export default function ArticleList() {
  return (
    <section>
      <h2>기사 목록</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {articles.map((article) => (
          <article
            key={article.id}
            style={{
              padding: "16px",
              border: "1px solid #eee",
              borderRadius: "8px",
            }}
          >
            <h3 style={{ margin: "0 0 8px 0" }}>{article.title}</h3>
            <p style={{ color: "#666", margin: "0 0 8px 0" }}>
              {article.summary}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ color: "#999", fontSize: "13px" }}>
                {article.date}
              </span>
              {/* LikeButton은 클라이언트 컴포넌트 - 서버 컴포넌트에서 import 가능 */}
              <LikeButton />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
