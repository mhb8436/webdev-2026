import React, { createContext, useContext, useState, useCallback } from 'react';

// ============================================================
// 문제 1: 다크모드 토글 - 정답
// ============================================================

// 테마 타입 정의
interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

// ThemeContext 생성
const ThemeContext = createContext<ThemeContextType | null>(null);

// ThemeProvider 컴포넌트
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// useTheme 커스텀 훅
function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme은 ThemeProvider 안에서 사용해야 합니다.');
  }
  return context;
}

// 테마 스타일 헬퍼
function getThemeStyle(isDark: boolean): React.CSSProperties {
  return {
    backgroundColor: isDark ? '#1a1a2e' : '#ffffff',
    color: isDark ? '#e0e0e0' : '#333333',
    transition: 'all 0.3s ease',
  };
}

// Header 컴포넌트
function Header() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header
      style={{
        ...getThemeStyle(isDark),
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: `1px solid ${isDark ? '#333' : '#ddd'}`,
      }}
    >
      <h2 style={{ margin: 0 }}>Header</h2>
      <button
        onClick={toggleTheme}
        style={{
          padding: '8px 16px',
          backgroundColor: isDark ? '#e0e0e0' : '#1a1a2e',
          color: isDark ? '#1a1a2e' : '#e0e0e0',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        {isDark ? '라이트모드 전환' : '다크모드 전환'}
      </button>
    </header>
  );
}

// Content 컴포넌트
function Content() {
  const { isDark } = useTheme();

  return (
    <main
      style={{
        ...getThemeStyle(isDark),
        padding: '40px 24px',
        minHeight: '200px',
      }}
    >
      <p style={{ fontSize: '18px' }}>안녕하세요!</p>
      <p style={{ fontSize: '16px', opacity: 0.8 }}>
        현재 테마: {isDark ? '다크 모드' : '라이트 모드'}
      </p>
    </main>
  );
}

// Footer 컴포넌트
function Footer() {
  const { isDark } = useTheme();

  return (
    <footer
      style={{
        ...getThemeStyle(isDark),
        padding: '16px 24px',
        borderTop: `1px solid ${isDark ? '#333' : '#ddd'}`,
        textAlign: 'center',
        fontSize: '14px',
        opacity: 0.7,
      }}
    >
      Footer - {isDark ? '다크 모드' : '라이트 모드'}
    </footer>
  );
}

// 문제 1 전체 앱
function Practice1() {
  return (
    <div>
      <h2>문제 1: 다크모드 토글</h2>
      <ThemeProvider>
        <div
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <Header />
          <Content />
          <Footer />
        </div>
      </ThemeProvider>
    </div>
  );
}

// ============================================================
// 문제 2: 다국어 지원 (i18n) - 정답
// ============================================================

// 지원 언어 타입
type Language = 'ko' | 'en';

// 번역 데이터 객체
const translations: Record<Language, Record<string, string>> = {
  ko: {
    'nav.home': '홈',
    'nav.about': '소개',
    'nav.contact': '연락처',
    'nav.switchLang': 'English',
    'welcome.title': '다국어 지원 앱에 오신 것을 환영합니다!',
    'welcome.description': '이 앱은 Context API를 사용하여 다국어를 지원합니다.',
    'profile.title': '사용자 프로필',
    'profile.name': '이름',
    'profile.nameValue': '홍길동',
    'profile.role': '역할',
    'profile.roleValue': '개발자',
    'profile.bio': '자기소개',
    'profile.bioValue': '프론트엔드 개발을 좋아하는 개발자입니다.',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.switchLang': '한국어',
    'welcome.title': 'Welcome to the Multilingual App!',
    'welcome.description': 'This app supports multiple languages using the Context API.',
    'profile.title': 'User Profile',
    'profile.name': 'Name',
    'profile.nameValue': 'Hong Gildong',
    'profile.role': 'Role',
    'profile.roleValue': 'Developer',
    'profile.bio': 'Bio',
    'profile.bioValue': 'A developer who loves frontend development.',
  },
};

// Language Context 타입 정의
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// LanguageContext 생성
const LanguageContext = createContext<LanguageContextType | null>(null);

// LanguageProvider 컴포넌트
function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('ko');

  const t = useCallback(
    (key: string): string => {
      return translations[language][key] || key;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// useLanguage 커스텀 훅
function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage는 LanguageProvider 안에서 사용해야 합니다.');
  }
  return context;
}

// NavigationBar 컴포넌트
function NavigationBar() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 24px',
        backgroundColor: '#2196F3',
        color: 'white',
      }}
    >
      <div style={{ display: 'flex', gap: '20px' }}>
        <a href="#" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
          {t('nav.home')}
        </a>
        <a href="#" style={{ color: 'white', textDecoration: 'none' }}>
          {t('nav.about')}
        </a>
        <a href="#" style={{ color: 'white', textDecoration: 'none' }}>
          {t('nav.contact')}
        </a>
      </div>
      <button
        onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}
        style={{
          padding: '6px 16px',
          backgroundColor: 'white',
          color: '#2196F3',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        {t('nav.switchLang')}
      </button>
    </nav>
  );
}

// MainContent 컴포넌트
function MainContent() {
  const { t } = useLanguage();

  return (
    <div style={{ padding: '32px 24px' }}>
      <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>{t('welcome.title')}</h3>
      <p style={{ fontSize: '16px', color: '#666' }}>{t('welcome.description')}</p>
    </div>
  );
}

// ProfileCard 컴포넌트
function ProfileCard() {
  const { t } = useLanguage();

  return (
    <div
      style={{
        margin: '0 24px 24px',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
      }}
    >
      <h4 style={{ marginTop: 0, marginBottom: '16px', fontSize: '18px' }}>
        {t('profile.title')}
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <p style={{ margin: 0 }}>
          <strong>{t('profile.name')}:</strong> {t('profile.nameValue')}
        </p>
        <p style={{ margin: 0 }}>
          <strong>{t('profile.role')}:</strong> {t('profile.roleValue')}
        </p>
        <p style={{ margin: 0 }}>
          <strong>{t('profile.bio')}:</strong> {t('profile.bioValue')}
        </p>
      </div>
    </div>
  );
}

// 문제 2 전체 앱
function Practice2() {
  return (
    <div>
      <h2>문제 2: 다국어 지원</h2>
      <LanguageProvider>
        <div
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <NavigationBar />
          <MainContent />
          <ProfileCard />
        </div>
      </LanguageProvider>
    </div>
  );
}

// ============================================================
// 문제 3: 장바구니 전역 상태 - 정답
// ============================================================

// 상품 타입 정의
interface Product {
  id: number;
  name: string;
  price: number;
}

// 장바구니 아이템 타입 정의
interface CartItem extends Product {
  quantity: number;
}

// CartContext 타입 정의
interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  getTotalCount: () => number;
  getTotalPrice: () => number;
}

// 상품 데이터
const products: Product[] = [
  { id: 1, name: '노트북', price: 1200000 },
  { id: 2, name: '키보드', price: 89000 },
  { id: 3, name: '마우스', price: 45000 },
  { id: 4, name: '모니터', price: 350000 },
  { id: 5, name: '헤드셋', price: 78000 },
];

// CartContext 생성
const CartContext = createContext<CartContextType | null>(null);

// CartProvider 컴포넌트
function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: number, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.id !== id));
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }, []);

  const getTotalCount = useCallback(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const getTotalPrice = useCallback(() => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [items]);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, getTotalCount, getTotalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

// useCart 커스텀 훅
function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart는 CartProvider 안에서 사용해야 합니다.');
  }
  return context;
}

// CartIcon 컴포넌트
function CartIcon() {
  const { getTotalCount } = useCart();
  const totalCount = getTotalCount();

  return (
    <div style={{ position: 'relative', fontSize: '24px', cursor: 'pointer' }}>
      <span role="img" aria-label="장바구니">
        🛒
      </span>
      {totalCount > 0 && (
        <span
          style={{
            position: 'absolute',
            top: '-8px',
            right: '-12px',
            backgroundColor: '#f44336',
            color: 'white',
            borderRadius: '50%',
            width: '22px',
            height: '22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 'bold',
          }}
        >
          {totalCount}
        </span>
      )}
    </div>
  );
}

// ProductList 컴포넌트
function ProductList() {
  const { addToCart } = useCart();

  return (
    <div style={{ marginBottom: '24px' }}>
      <h3 style={{ marginBottom: '12px' }}>상품 목록</h3>
      <div
        style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        {products.map((product, index) => (
          <div
            key={product.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
              borderBottom: index < products.length - 1 ? '1px solid #eee' : 'none',
            }}
          >
            <div>
              <span style={{ fontWeight: 'bold', marginRight: '16px' }}>{product.name}</span>
              <span style={{ color: '#666' }}>{product.price.toLocaleString()}원</span>
            </div>
            <button
              onClick={() => addToCart(product)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              장바구니 추가
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Cart 컴포넌트
function Cart() {
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div>
        <h3>장바구니</h3>
        <p style={{ color: '#999', textAlign: 'center', padding: '24px' }}>
          장바구니가 비어있습니다.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3 style={{ marginBottom: '12px' }}>장바구니</h3>
      <div
        style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
              borderBottom: '1px solid #eee',
            }}
          >
            <span style={{ fontWeight: 'bold', minWidth: '80px' }}>{item.name}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#f0f0f0',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '16px',
                }}
              >
                -
              </button>
              <span style={{ minWidth: '24px', textAlign: 'center', fontWeight: 'bold' }}>
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#f0f0f0',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '16px',
                }}
              >
                +
              </button>
            </div>
            <span style={{ minWidth: '120px', textAlign: 'right', color: '#666' }}>
              {(item.price * item.quantity).toLocaleString()}원
            </span>
            <button
              onClick={() => removeFromCart(item.id)}
              style={{
                padding: '6px 12px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '13px',
              }}
            >
              삭제
            </button>
          </div>
        ))}
        <div
          style={{
            padding: '16px',
            backgroundColor: '#f9f9f9',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 'bold',
            fontSize: '18px',
          }}
        >
          <span>총 금액:</span>
          <span style={{ color: '#2196F3' }}>{getTotalPrice().toLocaleString()}원</span>
        </div>
      </div>
    </div>
  );
}

// 문제 3 전체 앱
function Practice3() {
  return (
    <div>
      <h2>문제 3: 장바구니 전역 상태</h2>
      <CartProvider>
        <div
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 24px',
              backgroundColor: '#f5f5f5',
              borderBottom: '1px solid #ddd',
            }}
          >
            <h3 style={{ margin: 0 }}>쇼핑몰</h3>
            <CartIcon />
          </div>
          <div style={{ padding: '24px' }}>
            <ProductList />
            <Cart />
          </div>
        </div>
      </CartProvider>
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
      <h1>Day 15 - Context API 연습문제 (정답)</h1>

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
