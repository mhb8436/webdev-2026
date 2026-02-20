// ============================================
// 연습문제 1 & 2 풀이: LikeButton (클라이언트 컴포넌트)
// ============================================

// 클라이언트 컴포넌트인 이유:
// 1. useState로 좋아요 카운트 상태를 관리합니다.
// 2. onClick 이벤트 핸들러를 사용합니다.
// 3. 사용자와 직접 상호작용하는 UI입니다.
// 이러한 기능은 브라우저에서만 동작하므로 'use client'가 필수입니다.

"use client";

import { useState } from "react";

export default function LikeButton() {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleClick = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{
        padding: "6px 16px",
        border: isLiked ? "1px solid #e74c3c" : "1px solid #ddd",
        borderRadius: "20px",
        backgroundColor: isLiked ? "#fdf2f2" : "white",
        color: isLiked ? "#e74c3c" : "#666",
        cursor: "pointer",
        fontSize: "14px",
      }}
    >
      {isLiked ? "&#10084;" : "&#9825;"} &#xC88B;&#xC544;&#xC694; {likes}
    </button>
  );
}
