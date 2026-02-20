// ============================================
// 연습문제 3 풀이: 에러 발생 테스트 페이지 (메인 page.tsx)
// ============================================

// 이 페이지는 랜덤으로 에러를 발생시켜 error.tsx를 테스트합니다.
// 서버 컴포넌트에서 에러가 발생하면 가장 가까운 error.tsx가 처리합니다.

import Link from "next/link";

const quotes = [
  "오늘도 좋은 하루 되세요!",
  "작은 노력이 큰 변화를 만듭니다.",
  "코딩은 문제를 해결하는 예술입니다.",
  "배움에는 끝이 없습니다.",
];

export default function HomePage() {
  // 랜덤으로 에러를 발생시킵니다 (약 30% 확률)
  const random = Math.random();
  if (random < 0.3) {
    throw new Error("랜덤 에러가 발생했습니다! 페이지를 다시 로드해보세요.");
  }

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
        padding: "24px",
      }}
    >
      <h1>랜덤 명언</h1>
      <blockquote
        style={{
          fontSize: "24px",
          fontStyle: "italic",
          color: "#333",
          borderLeft: "4px solid #0070f3",
          padding: "16px 24px",
          margin: "24px 0",
          backgroundColor: "#f0f7ff",
          borderRadius: "0 8px 8px 0",
        }}
      >
        &ldquo;{randomQuote}&rdquo;
      </blockquote>

      <p style={{ color: "#999" }}>
        이 페이지는 약 30% 확률로 에러가 발생합니다. 새로고침해서 error.tsx를
        테스트하세요.
      </p>

      <nav style={{ marginTop: "24px" }}>
        <Link
          href="/blog/nextjs-intro"
          style={{ color: "#0070f3", marginRight: "16px" }}
        >
          블로그 글 보기
        </Link>
        <Link
          href="/blog/없는글"
          style={{ color: "#0070f3" }}
        >
          존재하지 않는 글 (404 테스트)
        </Link>
      </nav>
    </div>
  );
}
