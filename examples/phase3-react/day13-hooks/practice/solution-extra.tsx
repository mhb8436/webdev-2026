// ============================================
// Day 13 - Hooks 심화 연습문제 (풀이)
// ============================================

import { useState, useEffect, useReducer, useCallback } from 'react';

// --- 연습 1: useForm 커스텀 훅 ---
type Validators<T> = {
  [K in keyof T]?: (value: T[K]) => string;
};

function useForm<T extends Record<string, any>>(
  initialValues: T,
  validators?: Validators<T>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const handleChange = (name: keyof T, value: T[keyof T]) => {
    setValues(prev => ({ ...prev, [name]: value }));
    setTouched(prev => ({ ...prev, [name]: true }));

    // 실시간 검증
    if (validators?.[name]) {
      const error = validators[name]!(value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = (onSubmit: (values: T) => void) => {
    // 전체 검증
    const newErrors: Partial<Record<keyof T, string>> = {};
    let hasError = false;

    if (validators) {
      for (const key in validators) {
        const error = validators[key]!(values[key]);
        if (error) {
          newErrors[key] = error;
          hasError = true;
        }
      }
    }

    setErrors(newErrors);
    if (!hasError) {
      onSubmit(values);
    }
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return { values, errors, touched, handleChange, handleSubmit, reset };
}

// useForm 데모
function FormDemo() {
  const { values, errors, handleChange, handleSubmit, reset } = useForm(
    { name: '', email: '', age: '' },
    {
      name: (v) => (!v.trim() ? '이름을 입력하세요' : ''),
      email: (v) => (!v.includes('@') ? '올바른 이메일을 입력하세요' : ''),
      age: (v) => (Number(v) < 1 ? '나이를 입력하세요' : ''),
    }
  );

  return (
    <div>
      <h2>useForm 데모</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div>
          <input
            placeholder="이름"
            value={values.name}
            onChange={e => handleChange('name', e.target.value)}
          />
          {errors.name && <span style={{ color: 'red', marginLeft: 8 }}>{errors.name}</span>}
        </div>
        <div>
          <input
            placeholder="이메일"
            value={values.email}
            onChange={e => handleChange('email', e.target.value)}
          />
          {errors.email && <span style={{ color: 'red', marginLeft: 8 }}>{errors.email}</span>}
        </div>
        <div>
          <input
            placeholder="나이"
            type="number"
            value={values.age}
            onChange={e => handleChange('age', e.target.value)}
          />
          {errors.age && <span style={{ color: 'red', marginLeft: 8 }}>{errors.age}</span>}
        </div>
        <div>
          <button onClick={() => handleSubmit((v) => alert(JSON.stringify(v)))}>
            제출
          </button>
          <button onClick={reset} style={{ marginLeft: 8 }}>초기화</button>
        </div>
      </div>
    </div>
  );
}

// --- 연습 2: useMediaQuery ---
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    setMatches(mql.matches);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

function MediaQueryDemo() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
  const isDark = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <div>
      <h2>useMediaQuery 데모</h2>
      <p>모바일: {isMobile ? 'Yes' : 'No'}</p>
      <p>태블릿: {isTablet ? 'Yes' : 'No'}</p>
      <p>다크모드: {isDark ? 'Yes' : 'No'}</p>
      <p>현재: {isMobile ? '모바일' : isTablet ? '태블릿' : '데스크톱'} 뷰</p>
    </div>
  );
}

// --- 연습 3: useReducer 장바구니 ---
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: { id: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing) {
        return {
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }
    case 'REMOVE_ITEM':
      return {
        items: state.items.filter(item => item.id !== action.payload.id),
      };
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        return {
          items: state.items.filter(item => item.id !== action.payload.id),
        };
      }
      return {
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'CLEAR_CART':
      return { items: [] };
    default:
      return state;
  }
}

const PRODUCTS = [
  { id: 1, name: '커피', price: 4500 },
  { id: 2, name: '케이크', price: 6000 },
  { id: 3, name: '쿠키', price: 2500 },
];

function CartWithReducer() {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      <h2>useReducer 장바구니</h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        {PRODUCTS.map(p => (
          <button
            key={p.id}
            onClick={() => dispatch({ type: 'ADD_ITEM', payload: p })}
          >
            {p.name} ({p.price.toLocaleString()}원)
          </button>
        ))}
      </div>

      {state.items.length === 0 ? (
        <p>장바구니가 비어 있습니다</p>
      ) : (
        <>
          {state.items.map(item => (
            <div key={item.id} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: 4 }}>
              <span>{item.name}</span>
              <button onClick={() =>
                dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity - 1 } })
              }>-</button>
              <span>{item.quantity}</span>
              <button onClick={() =>
                dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity + 1 } })
              }>+</button>
              <span>{(item.price * item.quantity).toLocaleString()}원</span>
              <button onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: { id: item.id } })}>삭제</button>
            </div>
          ))}
          <p style={{ fontWeight: 'bold' }}>
            총 {totalItems}개 / {totalPrice.toLocaleString()}원
          </p>
          <button onClick={() => dispatch({ type: 'CLEAR_CART' })}>비우기</button>
        </>
      )}
    </div>
  );
}

// --- 데모 ---
export default function Day13Practice() {
  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h1>Day 13 연습문제 풀이</h1>
      <FormDemo />
      <hr />
      <MediaQueryDemo />
      <hr />
      <CartWithReducer />
    </div>
  );
}
