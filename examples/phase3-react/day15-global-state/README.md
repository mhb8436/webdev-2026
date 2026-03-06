# Day 15 - Context API: 전역 상태 관리

> **Phase 3: React** | 학습일: 15일차

---

## 학습 목표

- Props Drilling 문제를 이해한다
- `createContext`, `useContext`로 전역 상태를 관리한다
- Provider 패턴으로 데이터를 공유한다
- 커스텀 훅(`useTodos`, `useTheme`)으로 Context 사용을 단순화한다
- 테마(다크모드) 전환을 구현한다

---

## 핵심 개념

### 1. Props Drilling 문제

```
App (todos 상태)
  → Layout (props 전달만)
    → Sidebar (props 전달만)
      → TodoList (여기서 사용)
```

> 중간 컴포넌트가 사용하지 않는 props를 전달만 해야 하는 문제

### 2. Context API 3단계

```tsx
// 1단계: Context 생성
const ThemeContext = createContext<ThemeContextType | null>(null);

// 2단계: Provider 컴포넌트
function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const toggleTheme = () => setTheme(t => t === "light" ? "dark" : "light");

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3단계: 커스텀 훅
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme은 ThemeProvider 안에서만 사용 가능");
  return context;
}
```

### 3. Provider로 앱 감싸기

```tsx
// main.tsx
<ThemeProvider>
  <TodoProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </TodoProvider>
</ThemeProvider>
```

### 4. 어디서든 사용

```tsx
function Header() {
  const { theme, toggleTheme } = useTheme();
  return (
    <header style={{ background: theme === "dark" ? "#333" : "#fff" }}>
      <button onClick={toggleTheme}>
        {theme === "dark" ? "라이트 모드" : "다크 모드"}
      </button>
    </header>
  );
}

function TodoPage() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
  // Props 전달 없이 직접 접근!
}
```

---

## 실습 파일

### starter/ (직접 구현)

| 파일 | 내용 |
|------|------|
| `src/context/ThemeContext.tsx` | 테마 Context/Provider/Hook |
| `src/contexts/TodoContext.tsx` | 할일 Context/Provider |
| `src/hooks/useTodos.ts` | 할일 커스텀 훅 |
| `src/App.tsx` | Routes만 남긴 깔끔한 구조 |

### practice/ (연습 문제)

| 파일 | 내용 |
|------|------|
| `App.tsx` | Context 적용 연습 |

---

## Before vs After

| 항목 | Before (Props) | After (Context) |
|------|---------------|-----------------|
| App.tsx | 상태 + 핸들러 + 라우팅 | 라우팅만 |
| 페이지 | `props`로 데이터 수신 | `useTodos()`로 직접 접근 |
| 새 페이지 추가 | props 전달 추가 필요 | 훅 호출만 하면 됨 |

---

## 실행 방법

```bash
cd starter && npm install && npm run dev
```

---

## 정리

| 개념 | 핵심 |
|------|------|
| createContext | 전역 데이터 컨텍스트 생성 |
| Provider | 하위 컴포넌트에 데이터 제공 |
| useContext | Provider의 값에 접근 |
| 커스텀 훅 | `useTheme()`, `useTodos()` — 사용 편의성 |
| Props Drilling | Context로 해결 |

> **다음 시간**: Day 16 - Next.js 시작 (SSR, App Router)
