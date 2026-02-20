// Day 10 연습문제 정답 - 컴포넌트 분리, Props

import Header from './components/Header';
import ProductList from './components/ProductList';
import type { Product } from './components/ProductList';
import ReviewCard from './components/ReviewCard';
import FamilyList from './components/FamilyList';

// ============================================
// 문제 1: 상품 카탈로그 데이터
// ============================================
const products: Product[] = [
  {
    id: 1,
    name: '무선 이어폰',
    price: 89000,
    imageUrl: 'https://via.placeholder.com/200x160?text=Earbuds',
    description: '고음질 블루투스 이어폰',
  },
  {
    id: 2,
    name: '노트북 거치대',
    price: 35000,
    imageUrl: 'https://via.placeholder.com/200x160?text=Stand',
    description: '알루미늄 접이식 거치대',
  },
  {
    id: 3,
    name: '기계식 키보드',
    price: 120000,
    imageUrl: 'https://via.placeholder.com/200x160?text=Keyboard',
    description: '적축 기계식 키보드',
  },
  {
    id: 4,
    name: 'USB-C 허브',
    price: 45000,
    imageUrl: 'https://via.placeholder.com/200x160?text=Hub',
    description: '7포트 멀티 허브',
  },
];

// ============================================
// 문제 2: 리뷰 데이터
// ============================================
const reviews = [
  { id: 1, author: '김철수', content: '정말 좋은 상품이에요! 매일 사용하고 있습니다.', score: 5 },
  { id: 2, author: '이영희', content: '가격 대비 괜찮지만 배송이 좀 느렸어요.', score: 3 },
  { id: 3, author: '박민수', content: '디자인이 예쁘고 품질도 좋습니다.', score: 4 },
  { id: 4, author: '최지연', content: '기대 이하였어요. 개선이 필요합니다.', score: 2 },
];

// ============================================
// 문제 3: 가족 데이터
// ============================================
const familyMembers = [
  { id: 1, name: '김영호', relation: '아버지', age: 55, message: '항상 건강하자!' },
  { id: 2, name: '이미영', relation: '어머니', age: 52, message: '맛있는 거 많이 먹자~' },
  { id: 3, name: '김민수', relation: '형', age: 28, message: '운동 같이 하자' },
  { id: 4, name: '김수진', relation: '동생', age: 22, message: '오빠 용돈 줘!' },
];

// ============================================
// 메인 App 컴포넌트
// ============================================
function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Day 10 연습문제 정답</h1>

      <section style={{ marginBottom: '40px' }}>
        <h2>문제 1: 상품 카탈로그</h2>
        <Header storeName="테크 스토어" productCount={products.length} />
        <ProductList products={products} />
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>문제 2: 별점 컴포넌트</h2>
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            author={review.author}
            content={review.content}
            score={review.score}
          />
        ))}
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>문제 3: 가족 소개 페이지</h2>
        <FamilyList members={familyMembers} />
      </section>
    </div>
  );
}

export default App;
