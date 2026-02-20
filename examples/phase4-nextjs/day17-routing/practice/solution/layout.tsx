// ============================================
// 연습문제 1 & 3 풀이: 루트 레이아웃 + 활성 링크 네비게이션
// ============================================

import type { Metadata } from "next";
import Navigation from "./Navigation";

export const metadata: Metadata = {
  title: "미니 쇼핑몰",
  description: "Next.js 라우팅 연습",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, fontFamily: "sans-serif" }}>
        {/* 연습문제 3: 활성 링크가 표시되는 네비게이션 */}
        <Navigation />

        <main style={{ padding: "24px", maxWidth: "960px", margin: "0 auto" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
