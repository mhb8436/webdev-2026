// ============================================
// Day 11 - 장바구니 (복잡한 상태 관리)
// ============================================
// 학습목표: 배열/객체 상태, 불변 업데이트, 파생 상태
// 파일위치: src/components/ShoppingCart.tsx

import { useState } from 'react';

// --- 타입 정의 ---
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

// --- 샘플 상품 데이터 ---
const PRODUCTS: Product[] = [
  { id: 1, name: '노트북', price: 1200000, image: '💻' },
  { id: 2, name: '키보드', price: 89000, image: '⌨️' },
  { id: 3, name: '마우스', price: 45000, image: '🖱️' },
  { id: 4, name: '모니터', price: 350000, image: '🖥️' },
  { id: 5, name: '헤드셋', price: 78000, image: '🎧' },
];

// TODO 1: ProductCard 컴포넌트
// - 상품 정보 표시 (이미지, 이름, 가격)
// - "장바구니 담기" 버튼
// - props: product, onAddToCart

// TODO 2: CartItemRow 컴포넌트
// - 장바구니 항목 표시
// - 수량 증가/감소 버튼 (+, -)
// - 삭제 버튼
// - 소계 표시 (가격 × 수량)
// - props: item, onUpdateQuantity, onRemove

// TODO 3: ShoppingCart 메인 컴포넌트
// - const [cartItems, setCartItems] = useState<CartItem[]>([]);
//
// - addToCart: 이미 있으면 수량+1, 없으면 새로 추가
//   힌트: find로 기존 항목 확인 → map으로 수량 업데이트 or spread로 추가
//
// - updateQuantity: 수량 변경 (0 이하면 제거)
//   힌트: quantity <= 0 ? filter로 제거 : map으로 수량 변경
//
// - removeFromCart: 항목 제거
//   힌트: filter(item => item.id !== id)
//
// - clearCart: 전체 비우기

// TODO 4: 파생 상태 계산
// - 총 상품 수: cartItems.reduce((sum, item) => sum + item.quantity, 0)
// - 총 금액: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
// - 가격 포맷: new Intl.NumberFormat('ko-KR').format(price) + '원'

// TODO 5: 레이아웃
// - 왼쪽: 상품 목록 (ProductCard 그리드)
// - 오른쪽: 장바구니 (CartItemRow 리스트 + 합계)

export default function ShoppingCart() {
  return <div>TODO: 장바구니 구현</div>;
}
