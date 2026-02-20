// ============================================
// 연습문제 1 풀이: 홈 페이지 (/)
// ============================================

import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>미니 쇼핑몰에 오신 것을 환영합니다!</h1>
      <p>다양한 IT 액세서리를 만나보세요.</p>

      <div style={{ marginTop: "24px" }}>
        <h2>추천 상품</h2>
        <p>
          <Link
            href="/products"
            style={{ color: "#0070f3", textDecoration: "underline" }}
          >
            상품 목록 보러가기 &rarr;
          </Link>
        </p>
      </div>
    </div>
  );
}
