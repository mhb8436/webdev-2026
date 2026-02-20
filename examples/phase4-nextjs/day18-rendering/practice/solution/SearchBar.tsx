// ============================================
// 연습문제 2 풀이: SearchBar (클라이언트 컴포넌트)
// ============================================

// 클라이언트 컴포넌트인 이유:
// - 사용자가 텍스트를 입력하는 인터랙션이 필요합니다.
// - useState로 입력값 상태를 관리해야 합니다.
// - onChange, onSubmit 등 이벤트 핸들러를 사용합니다.
// - 이러한 기능은 브라우저에서만 동작합니다.

"use client";

import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      alert(`"${query}" 검색 결과를 표시합니다.`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        gap: "8px",
        padding: "16px",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
      }}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="뉴스를 검색하세요..."
        style={{
          flex: 1,
          padding: "10px 16px",
          border: "1px solid #ddd",
          borderRadius: "4px",
          fontSize: "16px",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "10px 24px",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        검색
      </button>
    </form>
  );
}
