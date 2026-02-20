// ============================================
// 연습문제 1 풀이: 상품 목록 페이지 (/products/page.tsx)
// ============================================
// 실제 프로젝트에서는 app/products/page.tsx 경로에 위치해야 합니다.

import Link from "next/link";

const products = [
  { id: 1, name: "무선 키보드", price: 29000, desc: "조용한 타건감의 블루투스 키보드" },
  { id: 2, name: "무선 마우스", price: 19000, desc: "인체공학적 디자인의 무선 마우스" },
  { id: 3, name: "USB 허브", price: 15000, desc: "4포트 USB 3.0 허브" },
  { id: 4, name: "모니터 받침대", price: 35000, desc: "높이 조절 가능한 알루미늄 받침대" },
  { id: 5, name: "마우스패드", price: 12000, desc: "대형 게이밍 마우스패드" },
];

export default function ProductsPage() {
  return (
    <div>
      <h1>상품 목록</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h3 style={{ margin: "0 0 4px 0" }}>{product.name}</h3>
              <p style={{ margin: 0, color: "#666" }}>
                {product.price.toLocaleString()}원
              </p>
            </div>
            <Link
              href={`/products/${product.id}`}
              style={{
                color: "#0070f3",
                textDecoration: "none",
                padding: "8px 16px",
                border: "1px solid #0070f3",
                borderRadius: "4px",
              }}
            >
              상세보기 &rarr;
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
