# Day 11 - useState로 상태 관리 (CRUD)

> **Phase 3: React** | 학습일: 11일차

---

## 학습 목표

- `useState` 훅으로 컴포넌트 상태를 관리한다
- 불변성(Immutability)을 유지하며 배열/객체를 업데이트한다
- CRUD(추가/조회/수정/삭제) 패턴을 구현한다
- 이벤트 핸들링(`onClick`, `onChange`, `onSubmit`)을 구현한다
- 파생 상태(derived state)를 계산한다

---

## 핵심 개념

### 1. useState

```tsx
const [todos, setTodos] = useState<Todo[]>([]);
const [inputValue, setInputValue] = useState("");
```

### 2. 불변 업데이트 패턴

```tsx
// 추가
setTodos([...todos, { id: nextId, title, done: false }]);

// 삭제
setTodos(todos.filter(t => t.id !== id));

// 수정 (특정 항목의 속성 변경)
setTodos(todos.map(t =>
  t.id === id ? { ...t, done: !t.done } : t
));

// 이미 있으면 수량+1, 없으면 새로 추가
setCartItems(prev => {
  const existing = prev.find(item => item.id === product.id);
  if (existing) {
    return prev.map(item =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }
  return [...prev, { ...product, quantity: 1 }];
});
```

### 3. 파생 상태

```tsx
// 상태에서 계산되는 값 (별도의 state로 관리하지 않음)
const completedCount = todos.filter(t => t.done).length;
const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
const formatPrice = (price: number) => new Intl.NumberFormat('ko-KR').format(price) + '원';
```

### 4. 이벤트 핸들링

```tsx
// 폼 제출
<form onSubmit={(e) => {
  e.preventDefault();      // 페이지 리로드 방지
  handleAdd(inputValue);
  setInputValue("");
}}>

// 입력
<input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />

// 클릭
<button onClick={() => handleDelete(id)}>삭제</button>
```

---

## 실습 파일

### starter/ (직접 구현)

| 파일 | 내용 |
|------|------|
| `src/App.tsx` | useState로 Todo CRUD 구현 |
| `src/components/TodoApp.tsx` | 할일 추가/삭제/토글/통계 |
| `src/components/ShoppingCart.tsx` | 장바구니 (복잡한 상태: 수량 증감, 합계 계산) |

### practice/ (연습 문제)

| 파일 | 내용 |
|------|------|
| `App.tsx` | 기본 CRUD 연습 |

---

## 실행 방법

```bash
cd starter && npm install && npm run dev
```

---

## 정리

| 개념 | 핵심 |
|------|------|
| useState | `const [value, setValue] = useState(초기값)` |
| 추가 | `[...prev, newItem]` (spread) |
| 삭제 | `prev.filter(item => item.id !== id)` |
| 수정 | `prev.map(item => item.id === id ? {...item, ...변경} : item)` |
| 파생 상태 | `filter`, `reduce`로 계산 (별도 state X) |
| 불변성 | 원본을 직접 수정하지 않고 새 객체/배열 생성 |

> **다음 시간**: Day 12 - 필터링, 검색, 정렬, 조건부 렌더링
