// ============================================
// Day 10 - 컴포넌트 연습문제 (풀이)
// ============================================

import { useState } from 'react';

// --- 연습 1: 상품 카드 ---
interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  inStock: boolean;
  onBuy: (name: string) => void;
}

function ProductCard({ name, price, image, inStock, onBuy }: ProductCardProps) {
  const priceColor = price >= 10000 ? '#e74c3c' : '#2c3e50';
  const formatted = new Intl.NumberFormat('ko-KR').format(price) + '원';

  return (
    <div style={{
      border: '1px solid #ddd', borderRadius: 8, padding: 16,
      textAlign: 'center', opacity: inStock ? 1 : 0.5,
    }}>
      <div style={{ fontSize: 48 }}>{image}</div>
      <h3>{name}</h3>
      <p style={{ color: priceColor, fontWeight: 'bold', fontSize: 18 }}>
        {formatted}
      </p>
      {inStock ? (
        <button onClick={() => onBuy(name)} style={{ padding: '8px 24px' }}>
          구매하기
        </button>
      ) : (
        <button disabled style={{ padding: '8px 24px', cursor: 'not-allowed' }}>
          품절
        </button>
      )}
    </div>
  );
}

// --- 연습 2: 아코디언 ---
interface AccordionItem {
  question: string;
  answer: string;
}

function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {items.map((item, index) => (
        <div key={index} style={{ borderBottom: '1px solid #eee' }}>
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            style={{
              width: '100%', padding: '12px 16px', border: 'none',
              background: 'none', cursor: 'pointer', textAlign: 'left',
              fontWeight: 'bold', fontSize: 16,
              display: 'flex', justifyContent: 'space-between',
            }}
          >
            <span>{item.question}</span>
            <span>{openIndex === index ? '▲' : '▼'}</span>
          </button>
          {openIndex === index && (
            <div style={{ padding: '0 16px 16px', color: '#555' }}>
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// --- 연습 3: 별점 ---
interface StarRatingProps {
  maxStars?: number;
  value: number;
  onChange: (rating: number) => void;
}

function StarRating({ maxStars = 5, value, onChange }: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState(0);

  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {Array.from({ length: maxStars }, (_, i) => {
        const starValue = i + 1;
        const filled = starValue <= (hoverValue || value);
        return (
          <span
            key={i}
            onClick={() => onChange(starValue)}
            onMouseEnter={() => setHoverValue(starValue)}
            onMouseLeave={() => setHoverValue(0)}
            style={{
              fontSize: 32, cursor: 'pointer',
              color: filled ? '#f1c40f' : '#ddd',
            }}
          >
            ★
          </span>
        );
      })}
      <span style={{ marginLeft: 8, fontSize: 18, alignSelf: 'center' }}>
        {value}/{maxStars}
      </span>
    </div>
  );
}

// --- 데모 ---
export default function Day10Practice() {
  const [rating, setRating] = useState(3);

  const products = [
    { name: '노트북', price: 1200000, image: '💻', inStock: true },
    { name: '연필', price: 500, image: '✏️', inStock: true },
    { name: '태블릿', price: 800000, image: '📱', inStock: false },
  ];

  const faqItems = [
    { question: '배송은 얼마나 걸리나요?', answer: '보통 2~3일 소요됩니다.' },
    { question: '반품이 가능한가요?', answer: '7일 이내 반품 가능합니다.' },
    { question: '결제 방법은?', answer: '카드, 계좌이체, 간편결제를 지원합니다.' },
  ];

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h1>Day 10 연습문제 풀이</h1>

      <h2>상품 카드</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {products.map(p => (
          <ProductCard
            key={p.name}
            {...p}
            onBuy={(name) => console.log(`${name} 구매!`)}
          />
        ))}
      </div>

      <h2>FAQ 아코디언</h2>
      <Accordion items={faqItems} />

      <h2>별점</h2>
      <StarRating value={rating} onChange={setRating} />
    </div>
  );
}
