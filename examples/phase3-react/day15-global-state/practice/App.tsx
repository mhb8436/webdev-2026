import React, { createContext, useContext, useState, useCallback } from 'react';

// ============================================================
// 문제 1: 다크모드 토글
// ============================================================

// TODO: 테마 타입 정의
// interface ThemeContextType {
//   isDark: boolean;
//   toggleTheme: () => void;
// }

// TODO: ThemeContext 생성
// const ThemeContext = ...

// TODO: ThemeProvider 컴포넌트 구현
// - useState로 isDark 상태 관리
// - toggleTheme 함수 구현
// - children을 ThemeContext.Provider로 감싸기
function ThemeProvider({ children }: { children: React.ReactNode }) {
  // 여기에 구현하세요
  return <>{children}</>;
}

// TODO: useTheme 커스텀 훅 구현
// - useContext(ThemeContext)로 값을 가져오기
// - context가 없으면 에러 던지기
function useTheme() {
  // 여기에 구현하세요
  return { isDark: false, toggleTheme: () => {} };
}

// TODO: Header 컴포넌트 구현
// - useTheme 훅 사용
// - 테마에 따라 배경색, 글자색 변경
// - 테마 전환 버튼 포함
function Header() {
  return (
    <header>
      <h1>Header</h1>
      {/* TODO: 테마 전환 버튼 추가 */}
    </header>
  );
}

// TODO: Content 컴포넌트 구현
// - useTheme 훅 사용
// - 현재 테마 모드 표시
function Content() {
  return (
    <main>
      <p>안녕하세요!</p>
      {/* TODO: 현재 테마 모드 표시 */}
    </main>
  );
}

// TODO: Footer 컴포넌트 구현
// - useTheme 훅 사용
// - 현재 테마 모드 표시
function Footer() {
  return (
    <footer>
      {/* TODO: 현재 테마 모드 표시 */}
    </footer>
  );
}

// 문제 1 전체 앱
function Practice1() {
  return (
    <div>
      <h2>문제 1: 다크모드 토글</h2>
      {/* TODO: ThemeProvider로 감싸기 */}
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

// ============================================================
// 문제 2: 다국어 지원 (i18n)
// ============================================================

// TODO: 번역 데이터 객체 정의
// const translations = {
//   ko: { ... },
//   en: { ... },
// };

// TODO: Language 타입 정의
// type Language = 'ko' | 'en';
// interface LanguageContextType {
//   language: Language;
//   setLanguage: (lang: Language) => void;
//   t: (key: string) => string;
// }

// TODO: LanguageContext 생성
// const LanguageContext = ...

// TODO: LanguageProvider 컴포넌트 구현
// - useState로 language 상태 관리 (기본값: 'ko')
// - t 함수 구현: 현재 언어에 맞는 번역 반환, 없으면 키 반환
function LanguageProvider({ children }: { children: React.ReactNode }) {
  // 여기에 구현하세요
  return <>{children}</>;
}

// TODO: useLanguage 커스텀 훅 구현
function useLanguage() {
  // 여기에 구현하세요
  return {
    language: 'ko' as const,
    setLanguage: (_lang: 'ko' | 'en') => {},
    t: (key: string) => key,
  };
}

// TODO: NavigationBar 컴포넌트 구현
// - useLanguage 훅 사용
// - 메뉴 항목 번역 적용
// - 언어 전환 버튼 포함
function NavigationBar() {
  return (
    <nav>
      {/* TODO: 번역된 메뉴 항목 표시 */}
      {/* TODO: 언어 전환 버튼 */}
    </nav>
  );
}

// TODO: MainContent 컴포넌트 구현
// - useLanguage 훅 사용
// - 환영 메시지 번역 적용
function MainContent() {
  return (
    <div>
      {/* TODO: 번역된 환영 메시지 표시 */}
    </div>
  );
}

// TODO: ProfileCard 컴포넌트 구현
// - useLanguage 훅 사용
// - 프로필 정보 번역 적용
function ProfileCard() {
  return (
    <div>
      {/* TODO: 번역된 프로필 정보 표시 */}
    </div>
  );
}

// 문제 2 전체 앱
function Practice2() {
  return (
    <div>
      <h2>문제 2: 다국어 지원</h2>
      {/* TODO: LanguageProvider로 감싸기 */}
      <NavigationBar />
      <MainContent />
      <ProfileCard />
    </div>
  );
}

// ============================================================
// 문제 3: 장바구니 전역 상태
// ============================================================

// TODO: 타입 정의
// interface Product {
//   id: number;
//   name: string;
//   price: number;
// }
//
// interface CartItem extends Product {
//   quantity: number;
// }
//
// interface CartContextType {
//   items: CartItem[];
//   addToCart: (product: Product) => void;
//   removeFromCart: (id: number) => void;
//   updateQuantity: (id: number, quantity: number) => void;
//   getTotalCount: () => number;
//   getTotalPrice: () => number;
// }

// TODO: 상품 데이터 정의
// const products: Product[] = [
//   { id: 1, name: '노트북', price: 1200000 },
//   { id: 2, name: '키보드', price: 89000 },
//   { id: 3, name: '마우스', price: 45000 },
//   { id: 4, name: '모니터', price: 350000 },
//   { id: 5, name: '헤드셋', price: 78000 },
// ];

// TODO: CartContext 생성
// const CartContext = ...

// TODO: CartProvider 컴포넌트 구현
// - useState로 items(CartItem[]) 상태 관리
// - addToCart: 이미 있으면 수량 증가, 없으면 추가
// - removeFromCart: 해당 상품 삭제
// - updateQuantity: 수량 변경, 0 이하면 삭제
// - getTotalCount: 전체 수량 합계
// - getTotalPrice: 전체 금액 합계
function CartProvider({ children }: { children: React.ReactNode }) {
  // 여기에 구현하세요
  return <>{children}</>;
}

// TODO: useCart 커스텀 훅 구현
function useCart() {
  // 여기에 구현하세요
  return {
    items: [] as any[],
    addToCart: (_product: any) => {},
    removeFromCart: (_id: number) => {},
    updateQuantity: (_id: number, _quantity: number) => {},
    getTotalCount: () => 0,
    getTotalPrice: () => 0,
  };
}

// TODO: CartIcon 컴포넌트 구현
// - useCart 훅의 getTotalCount 사용
// - 장바구니 아이콘과 총 개수 배지 표시
function CartIcon() {
  return (
    <div>
      {/* TODO: 장바구니 아이콘과 배지 */}
    </div>
  );
}

// TODO: ProductList 컴포넌트 구현
// - products 배열을 순회하며 상품 카드 표시
// - 각 상품에 "장바구니 추가" 버튼
// - useCart 훅의 addToCart 사용
function ProductList() {
  return (
    <div>
      <h3>상품 목록</h3>
      {/* TODO: 상품 목록 렌더링 */}
    </div>
  );
}

// TODO: Cart 컴포넌트 구현
// - useCart 훅 사용
// - 장바구니 아이템 목록 표시
// - 수량 변경 버튼 (+/-), 삭제 버튼
// - 총 금액 표시
function Cart() {
  return (
    <div>
      <h3>장바구니</h3>
      {/* TODO: 장바구니 아이템 렌더링 */}
      {/* TODO: 총 금액 표시 */}
    </div>
  );
}

// 문제 3 전체 앱
function Practice3() {
  return (
    <div>
      <h2>문제 3: 장바구니 전역 상태</h2>
      {/* TODO: CartProvider로 감싸기 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>쇼핑몰</h3>
        <CartIcon />
      </div>
      <ProductList />
      <Cart />
    </div>
  );
}

// ============================================================
// 메인 App 컴포넌트
// ============================================================

export default function App() {
  const [currentPractice, setCurrentPractice] = useState(1);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Day 15 - Context API 연습문제</h1>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button
          onClick={() => setCurrentPractice(1)}
          style={{
            padding: '10px 20px',
            backgroundColor: currentPractice === 1 ? '#4CAF50' : '#ddd',
            color: currentPractice === 1 ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          문제 1: 다크모드
        </button>
        <button
          onClick={() => setCurrentPractice(2)}
          style={{
            padding: '10px 20px',
            backgroundColor: currentPractice === 2 ? '#4CAF50' : '#ddd',
            color: currentPractice === 2 ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          문제 2: 다국어
        </button>
        <button
          onClick={() => setCurrentPractice(3)}
          style={{
            padding: '10px 20px',
            backgroundColor: currentPractice === 3 ? '#4CAF50' : '#ddd',
            color: currentPractice === 3 ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          문제 3: 장바구니
        </button>
      </div>

      <hr style={{ marginBottom: '20px' }} />

      {currentPractice === 1 && <Practice1 />}
      {currentPractice === 2 && <Practice2 />}
      {currentPractice === 3 && <Practice3 />}
    </div>
  );
}
