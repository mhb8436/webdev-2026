// ============================================
// 연습문제 1 풀이: 장바구니 페이지 (/cart/page.tsx)
// ============================================
// 실제 프로젝트에서는 app/cart/page.tsx 경로에 위치해야 합니다.

import Link from "next/link";

export default function CartPage() {
  return (
    <div style={{ textAlign: "center", padding: "48px 0" }}>
      <h1>장바구니</h1>
      <p style={{ fontSize: "48px", marginBottom: "8px" }}>
        &#128722;
      </p>
      <p style={{ color: "#999", fontSize: "18px" }}>장바구니가 비어있습니다.</p>
      <Link
        href="/products"
        style={{
          display: "inline-block",
          marginTop: "16px",
          padding: "12px 24px",
          backgroundColor: "#0070f3",
          color: "white",
          textDecoration: "none",
          borderRadius: "4px",
        }}
      >
        쇼핑하러 가기
      </Link>
    </div>
  );
}
