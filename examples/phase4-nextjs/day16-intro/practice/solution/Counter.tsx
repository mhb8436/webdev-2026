// ============================================
// 연습문제 2 풀이: 'use client' 이해하기
// ============================================

// 'use client'를 파일 최상단에 선언해야 하는 이유:
// 1. Next.js App Router에서 모든 컴포넌트는 기본적으로 "서버 컴포넌트"입니다.
// 2. 서버 컴포넌트는 서버에서만 실행되므로 useState, useEffect, onClick 등을 사용할 수 없습니다.
// 3. 사용자와 상호작용하는 기능(이벤트 핸들러, 상태 관리)이 필요하면
//    반드시 'use client'를 선언하여 클라이언트 컴포넌트로 만들어야 합니다.
// 4. page.tsx에 직접 useState를 쓰면 에러가 발생합니다. (서버 컴포넌트이므로)
//    따라서 클라이언트 기능이 필요한 부분만 별도 컴포넌트로 분리하는 것이 좋습니다.

"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        padding: "24px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        display: "inline-block",
      }}
    >
      <p style={{ fontSize: "24px", marginBottom: "16px" }}>
        현재 카운트: <strong>{count}</strong>
      </p>
      <button
        onClick={() => setCount(count + 1)}
        style={{
          padding: "8px 24px",
          fontSize: "16px",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        +1 증가
      </button>
    </div>
  );
}
