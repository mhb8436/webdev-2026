// ============================================
// 연습문제 2 풀이: Footer (서버 컴포넌트)
// ============================================

// 서버 컴포넌트인 이유:
// - 저작권 정보와 링크를 보여주는 정적 UI입니다.
// - 사용자 상호작용이 없으므로 클라이언트 JS가 필요 없습니다.
// - Link 컴포넌트는 서버 컴포넌트에서도 사용할 수 있습니다.

// 'use client' 선언 없음 -> 서버 컴포넌트 (기본값)

import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#f5f5f5",
        padding: "24px",
        textAlign: "center",
        borderTop: "1px solid #ddd",
      }}
    >
      <div style={{ marginBottom: "12px", display: "flex", justifyContent: "center", gap: "16px" }}>
        <Link href="/about" style={{ color: "#666", fontSize: "14px" }}>
          소개
        </Link>
        <Link href="/privacy" style={{ color: "#666", fontSize: "14px" }}>
          개인정보처리방침
        </Link>
        <Link href="/terms" style={{ color: "#666", fontSize: "14px" }}>
          이용약관
        </Link>
      </div>
      <p style={{ color: "#999", fontSize: "12px", margin: 0 }}>
        &copy; 2025 뉴스 포털. All rights reserved.
      </p>
    </footer>
  );
}
