// ============================================
// 연습문제 3 풀이: 에러 복구 UI (error.tsx)
// ============================================

// error.tsx는 반드시 클라이언트 컴포넌트여야 합니다.
// React의 Error Boundary를 기반으로 동작합니다.
// props로 error 객체와 reset 함수를 받습니다.

"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // 에러 로깅 (실제로는 에러 추적 서비스에 전송)
  useEffect(() => {
    console.error("에러 발생:", error);
  }, [error]);

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
      {/* 에러 아이콘 */}
      <div
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          backgroundColor: "#fef2f2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 24px",
          fontSize: "36px",
        }}
      >
        &#9888;
      </div>

      <h1 style={{ color: "#333", marginBottom: "12px" }}>
        문제가 발생했습니다!
      </h1>

      <p
        style={{
          color: "#666",
          lineHeight: "1.6",
          marginBottom: "12px",
        }}
      >
        죄송합니다. 페이지를 불러오는 중 오류가 발생했습니다.
      </p>

      {/* 개발 모드에서만 에러 상세 메시지 표시 */}
      {error.message && (
        <p
          style={{
            backgroundColor: "#f8f8f8",
            padding: "12px 16px",
            borderRadius: "8px",
            fontSize: "14px",
            color: "#e74c3c",
            marginBottom: "32px",
            fontFamily: "monospace",
          }}
        >
          {error.message}
        </p>
      )}

      <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
        {/* reset()은 에러가 발생한 컴포넌트를 다시 렌더링합니다 */}
        <button
          onClick={() => reset()}
          style={{
            padding: "12px 24px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          다시 시도
        </button>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "12px 24px",
            border: "1px solid #ddd",
            color: "#333",
            textDecoration: "none",
            borderRadius: "4px",
            fontSize: "16px",
          }}
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
