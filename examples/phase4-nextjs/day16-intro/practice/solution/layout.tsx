// ============================================
// 연습문제 1 & 3 풀이: layout.tsx
// ============================================

import type { Metadata } from "next";

// 연습문제 1: metadata 객체로 사이트 제목 설정
export const metadata: Metadata = {
  title: "나의 포트폴리오",
  description: "프론트엔드 개발자 포트폴리오",
};

// 연습문제 3: 레이아웃에 헤더와 푸터 추가
// children은 현재 URL에 해당하는 page.tsx의 내용이 전달됩니다.
// 예: "/" 경로면 app/page.tsx, "/about" 경로면 app/about/page.tsx가 children으로 들어옵니다.
// 레이아웃은 페이지 전환 시에도 다시 렌더링되지 않아 성능에 유리합니다.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, fontFamily: "sans-serif" }}>
        {/* 헤더: 모든 페이지에 공통으로 표시 */}
        <header
          style={{
            backgroundColor: "#333",
            color: "white",
            padding: "16px 24px",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          My Portfolio
        </header>

        {/* children: 현재 페이지의 내용이 여기에 렌더링됩니다 */}
        <main style={{ minHeight: "calc(100vh - 120px)", padding: "24px" }}>
          {children}
        </main>

        {/* 푸터: 모든 페이지에 공통으로 표시 */}
        <footer
          style={{
            backgroundColor: "#f5f5f5",
            textAlign: "center",
            padding: "16px",
            color: "#666",
            fontSize: "14px",
          }}
        >
          &copy; 2025 My Portfolio. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
