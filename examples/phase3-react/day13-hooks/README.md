# Day 13 - useEffect와 커스텀 훅

> **Phase 3: React** | 학습일: 13일차

---

## 학습 목표

- `useEffect`로 사이드 이펙트(API 호출, 타이머, localStorage)를 처리한다
- 클린업 함수로 메모리 누수를 방지한다
- 디바운스 패턴을 구현한다
- 커스텀 훅(`useLocalStorage`, `useDebounce`, `useFetch`)을 만든다
- `useRef`로 DOM 요소를 직접 제어한다

---

## 핵심 개념

### 1. useEffect

```tsx
// 마운트 시 한 번만 실행
useEffect(() => {
  console.log("컴포넌트 마운트");
  return () => console.log("언마운트");  // 클린업
}, []);

// 특정 값 변경 시 실행
useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);
```

### 2. 클린업 (메모리 누수 방지)

```tsx
// 타이머 정리
useEffect(() => {
  const timer = setInterval(() => setCount(c => c + 1), 1000);
  return () => clearInterval(timer);  // 컴포넌트 언마운트 시 정리
}, []);

// 이벤트 리스너 정리
useEffect(() => {
  const handler = (e: KeyboardEvent) => { ... };
  window.addEventListener("keydown", handler);
  return () => window.removeEventListener("keydown", handler);
}, []);
```

### 3. 디바운스 검색

```tsx
const [query, setQuery] = useState("");
const [debouncedQuery, setDebouncedQuery] = useState("");

useEffect(() => {
  const timer = setTimeout(() => setDebouncedQuery(query), 300);
  return () => clearTimeout(timer);  // 이전 타이머 취소
}, [query]);

// debouncedQuery가 변경될 때만 검색 실행
```

### 4. 커스텀 훅

```tsx
// useLocalStorage - localStorage 동기화
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

// 사용
const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
```

```tsx
// useFetch - API 데이터 가져오기
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(url)
      .then(res => res.json())
      .then(data => { if (!cancelled) setData(data); })
      .catch(err => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };  // 경쟁 조건 방지
  }, [url]);

  return { data, loading, error };
}
```

### 5. useRef

```tsx
const inputRef = useRef<HTMLInputElement>(null);

// 자동 포커스
useEffect(() => { inputRef.current?.focus(); }, []);

<input ref={inputRef} />
```

---

## 실습 파일

### starter/ (직접 구현)

| 파일 | 내용 |
|------|------|
| `src/components/UseEffectDemo.tsx` | 타이머, 데이터 가져오기, 디바운스 |
| `src/components/CustomHooks.tsx` | useLocalStorage, useDebounce, useFetch, useToggle, useCounter |
| `src/App.tsx` | localStorage 연동 할일 앱 |

### practice/ (연습 문제)

| 파일 | 내용 |
|------|------|
| `practice-extra.tsx` | useForm, useMediaQuery, useReducer 장바구니 |
| `solution-extra.tsx` | 풀이 |

---

## 실행 방법

```bash
cd starter && npm install && npm run dev
```

---

## 정리

| 개념 | 핵심 |
|------|------|
| useEffect | 사이드 이펙트 처리, `[deps]`로 실행 시점 제어 |
| 클린업 | `return () => { ... }` — 타이머, 이벤트 리스너 정리 |
| 디바운스 | `setTimeout` + `clearTimeout` |
| 커스텀 훅 | `useXxx` — 로직 재사용 (use 접두사 필수) |
| useRef | DOM 접근, 렌더링 없는 값 유지 |

> **다음 시간**: Day 14 - React Router (페이지 라우팅)
