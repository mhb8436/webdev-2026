# Day 15 - 전역 상태와 프로젝트 정리 (Context API)

## 학습 목표

- `Context API`의 개념과 필요성 이해
- `createContext`, `useContext`로 전역 상태 관리
- `Provider` 패턴으로 데이터 공유
- 커스텀 훅(`useTodos`)으로 Context 사용 단순화
- 프로젝트 폴더 구조 정리

## 문제 상황

> "어느 페이지에서든 할일 데이터를 공유하자"

Day 14에서 라우터를 추가했지만, 상태(todos)와 핸들러(handleAdd, handleToggle 등)를
App.tsx에서 각 페이지로 props로 전달하고 있습니다.

이 방식의 문제점:
- App.tsx가 모든 상태와 핸들러를 관리해야 해서 복잡해짐
- 새 페이지를 추가할 때마다 props를 계속 전달해야 함
- 컴포넌트 깊이가 깊어지면 **props drilling** 문제 발생

## 핵심 개념

### 1. Props Drilling 문제

```
App (todos 상태)
  -> HomePage (props로 전달)
    -> TodoList (props로 전달)
      -> TodoItem (여기서 사용)
```

컴포넌트가 깊어질수록 중간 컴포넌트들이 사용하지 않는 props를 전달만 해야 합니다.

### 2. Context API

React에 내장된 전역 상태 관리 도구입니다.
Provider로 감싼 하위 컴포넌트 어디서든 데이터에 접근할 수 있습니다.

```
TodoProvider (Context에 todos 저장)
  -> App
    -> HomePage (useTodos()로 직접 접근)
    -> CompletedPage (useTodos()로 직접 접근)
    -> StatsPage (useTodos()로 직접 접근)
```

### 3. Context 만드는 3단계

#### 1단계: Context 생성

```tsx
import { createContext } from 'react';

// Context 객체 생성 (기본값은 null)
const TodoContext = createContext<TodoContextType | null>(null);
```

#### 2단계: Provider 컴포넌트 만들기

```tsx
export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);

  // 모든 상태와 핸들러를 value로 전달
  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
}
```

#### 3단계: 커스텀 훅으로 사용

```tsx
export function useTodos() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos는 TodoProvider 안에서만 사용할 수 있습니다');
  }
  return context;
}
```

### 4. Provider 패턴

Provider로 앱을 감싸면 하위 모든 컴포넌트에서 Context에 접근 가능합니다.

```tsx
// main.tsx
<TodoProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</TodoProvider>
```

### 5. 프로젝트 폴더 구조

```
src/
  main.tsx              - 앱 진입점 (Provider, Router 설정)
  App.tsx               - Routes만 정의 (깔끔!)
  components/           - 재사용 가능한 UI 컴포넌트
    TodoForm.tsx
    TodoItem.tsx
    TodoList.tsx
    TodoFilter.tsx
    Navbar.tsx
  contexts/             - Context 정의 및 Provider
    TodoContext.tsx
  hooks/                - 커스텀 훅
    useTodos.ts
  pages/                - 페이지 컴포넌트
    HomePage.tsx
    CompletedPage.tsx
    StatsPage.tsx
  types/                - TypeScript 타입 정의
    todo.ts
```

## 실습 단계

### 1단계: TodoContext 만들기
`contexts/TodoContext.tsx`에서 Context를 생성하고 TodoProvider를 구현하세요.

### 2단계: useTodos 커스텀 훅 만들기
`hooks/useTodos.ts`에서 Context를 쉽게 사용할 수 있는 훅을 만드세요.

### 3단계: main.tsx에서 Provider 설정
TodoProvider로 앱 전체를 감싸세요.

### 4단계: 페이지 컴포넌트 수정
props 대신 `useTodos()`를 사용하도록 모든 페이지를 수정하세요.

### 5단계: App.tsx 정리
App.tsx에서 상태 관리 코드를 제거하고 Routes만 남기세요.

## Before vs After

### Before (Day 14 방식)
```tsx
// App.tsx - 상태 + 핸들러 + 라우팅 모두 담당
function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const handleAdd = (title: string) => { /* ... */ };
  // ... 핸들러들

  return (
    <Routes>
      <Route path="/" element={<HomePage todos={todos} onAdd={handleAdd} ... />} />
    </Routes>
  );
}
```

### After (Day 15 방식)
```tsx
// App.tsx - 라우팅만 담당 (깔끔!)
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/completed" element={<CompletedPage />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </>
  );
}

// HomePage.tsx - useTodos()로 직접 데이터 접근
function HomePage() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
  // ...
}
```

## 실행 방법

```bash
npm install
npm run dev
```

## 참고 자료

- [React Context 공식 문서](https://react.dev/learn/passing-data-deeply-with-context)
- [useContext Hook](https://react.dev/reference/react/useContext)
