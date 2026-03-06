// ============================================
// Day 11 - 장바구니 (복잡한 상태 관리) (풀이)
// ============================================

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

// --- 가격 포맷 ---
function formatPrice(price: number): string {
  return new Intl.NumberFormat('ko-KR').format(price) + '원';
}

// --- 1. 상품 카드 컴포넌트 ---
function ProductCard({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart: (product: Product) => void;
}) {
  return (
    <div style={{
      border: '1px solid #ddd', borderRadius: 8, padding: 16,
      textAlign: 'center', backgroundColor: '#fff',
    }}>
      <div style={{ fontSize: 48 }}>{product.image}</div>
      <h3 style={{ margin: '8px 0 4px' }}>{product.name}</h3>
      <p style={{ color: '#e74c3c', fontWeight: 'bold', fontSize: 18 }}>
        {formatPrice(product.price)}
      </p>
      <button
        onClick={() => onAddToCart(product)}
        style={{
          padding: '8px 16px', backgroundColor: '#3498db', color: '#fff',
          border: 'none', borderRadius: 4, cursor: 'pointer', width: '100%',
        }}
      >
        장바구니 담기
      </button>
    </div>
  );
}

// --- 2. 장바구니 항목 컴포넌트 ---
function CartItemRow({
  item,
  onUpdateQuantity,
  onRemove,
}: {
  item: CartItem;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '8px 0', borderBottom: '1px solid #eee',
    }}>
      <span style={{ fontSize: 24 }}>{item.image}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 'bold' }}>{item.name}</div>
        <div style={{ color: '#888', fontSize: 14 }}>{formatPrice(item.price)}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          style={{ width: 28, height: 28, cursor: 'pointer' }}
        >
          -
        </button>
        <span style={{ minWidth: 24, textAlign: 'center' }}>{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          style={{ width: 28, height: 28, cursor: 'pointer' }}
        >
          +
        </button>
      </div>
      <div style={{ minWidth: 100, textAlign: 'right', fontWeight: 'bold' }}>
        {formatPrice(item.price * item.quantity)}
      </div>
      <button
        onClick={() => onRemove(item.id)}
        style={{
          background: 'none', border: 'none', color: '#e74c3c',
          cursor: 'pointer', fontSize: 18,
        }}
      >
        ✕
      </button>
    </div>
  );
}

// --- 3. 메인 장바구니 컴포넌트 ---
export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // 장바구니에 추가 (이미 있으면 수량+1)
  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // 수량 변경 (0 이하면 제거)
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  // 항목 제거
  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // 전체 비우기
  const clearCart = () => setCartItems([]);

  // --- 4. 파생 상태 ---
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: 20 }}>
      <h1>쇼핑몰</h1>

      <div style={{ display: 'flex', gap: 24 }}>
        {/* 왼쪽: 상품 목록 */}
        <div style={{ flex: 1 }}>
          <h2>상품 목록</h2>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 16,
          }}>
            {PRODUCTS.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </div>

        {/* 오른쪽: 장바구니 */}
        <div style={{
          width: 380, backgroundColor: '#f9f9f9',
          borderRadius: 8, padding: 16, height: 'fit-content',
        }}>
          <h2>장바구니 ({totalItems}개)</h2>

          {cartItems.length === 0 ? (
            <p style={{ color: '#888', textAlign: 'center', padding: 40 }}>
              장바구니가 비어 있습니다
            </p>
          ) : (
            <>
              {cartItems.map(item => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))}

              <div style={{
                marginTop: 16, paddingTop: 16,
                borderTop: '2px solid #333',
              }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  fontSize: 18, fontWeight: 'bold',
                }}>
                  <span>총 금액</span>
                  <span style={{ color: '#e74c3c' }}>{formatPrice(totalPrice)}</span>
                </div>
                <button
                  onClick={clearCart}
                  style={{
                    marginTop: 12, width: '100%', padding: '10px',
                    backgroundColor: '#e74c3c', color: '#fff',
                    border: 'none', borderRadius: 4, cursor: 'pointer',
                  }}
                >
                  장바구니 비우기
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
