// ============================================
// 연습문제 1 풀이: 상품 상세 페이지 (/products/[id]/page.tsx)
// ============================================
// 실제 프로젝트에서는 app/products/[id]/page.tsx 경로에 위치해야 합니다.

import Link from "next/link";

const products = [
  { id: 1, name: "무선 키보드", price: 29000, desc: "조용한 타건감의 블루투스 키보드" },
  { id: 2, name: "무선 마우스", price: 19000, desc: "인체공학적 디자인의 무선 마우스" },
  { id: 3, name: "USB 허브", price: 15000, desc: "4포트 USB 3.0 허브" },
  { id: 4, name: "모니터 받침대", price: 35000, desc: "높이 조절 가능한 알루미늄 받침대" },
  { id: 5, name: "마우스패드", price: 12000, desc: "대형 게이밍 마우스패드" },
];

// Next.js App Router에서 동적 라우트의 params는 props로 전달됩니다.
// /products/3 으로 접근하면 params.id = "3" (문자열)
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div>
        <h1>상품을 찾을 수 없습니다</h1>
        <p>요청한 상품 ID: {id}</p>
        <Link href="/products">목록으로 돌아가기</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p style={{ fontSize: "24px", color: "#e74c3c", fontWeight: "bold" }}>
        {product.price.toLocaleString()}원
      </p>
      <p style={{ color: "#666", lineHeight: "1.6" }}>{product.desc}</p>

      <div style={{ marginTop: "24px" }}>
        <Link
          href="/products"
          style={{
            color: "#0070f3",
            textDecoration: "none",
            padding: "8px 16px",
            border: "1px solid #0070f3",
            borderRadius: "4px",
          }}
        >
          &larr; 목록으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
