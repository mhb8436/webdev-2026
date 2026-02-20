// ============================================
// 연습문제 1 풀이: 커스텀 404 페이지 (not-found.tsx)
// ============================================

// notFound()가 호출되면 이 컴포넌트가 렌더링됩니다.
// app/not-found.tsx -> 전체 앱의 404
// app/blog/[slug]/not-found.tsx -> 블로그 상세의 404 (더 구체적)

import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        fontFamily: "sans-serif",
        textAlign: "center",
        padding: "80px 24px",
        maxWidth: "500px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ fontSize: "72px", color: "#ddd", margin: "0 0 16px 0" }}>
        404
      </h1>
      <h2 style={{ color: "#333", marginBottom: "16px" }}>
        요청하신 블로그 글을 찾을 수 없습니다
      </h2>
      <p style={{ color: "#666", marginBottom: "32px", lineHeight: "1.6" }}>
        입력하신 주소가 정확한지 확인해주세요.
        <br />
        삭제되었거나 존재하지 않는 페이지입니다.
      </p>
      <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
        <Link
          href="/blog"
          style={{
            padding: "12px 24px",
            backgroundColor: "#0070f3",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
          }}
        >
          블로그 목록으로 돌아가기
        </Link>
        <Link
          href="/"
          style={{
            padding: "12px 24px",
            border: "1px solid #ddd",
            color: "#333",
            textDecoration: "none",
            borderRadius: "4px",
          }}
        >
          홈으로 가기
        </Link>
      </div>
    </div>
  );
}
