// ============================================
// 연습문제 2 풀이: Header (서버 컴포넌트)
// ============================================

// 서버 컴포넌트인 이유:
// - 사이트 로고와 제목만 표시하는 정적 UI입니다.
// - useState, useEffect, onClick 등이 필요 없습니다.
// - 서버 컴포넌트로 두면 JavaScript 번들에 포함되지 않아
//   클라이언트에 전송되는 JS 크기가 줄어듭니다.

// 'use client' 선언 없음 -> 서버 컴포넌트 (기본값)

export default function Header() {
  return (
    <header
      style={{
        backgroundColor: "#1a1a2e",
        color: "white",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <span style={{ fontSize: "24px" }}>&#9733;</span>
      <h1 style={{ margin: 0, fontSize: "20px" }}>뉴스 포털</h1>
    </header>
  );
}
