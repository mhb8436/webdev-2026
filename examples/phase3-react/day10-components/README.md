# Day 10 - 컴포넌트 분리와 합성

> **Phase 3: React** | 학습일: 10일차

---

## 학습 목표

- 하나의 컴포넌트를 역할별로 분리한다
- Props 인터페이스를 TypeScript로 정의한다
- 콜백 함수를 Props로 전달한다 (자식→부모 통신)
- 조건부 렌더링(`&&`, 삼항 연산자)을 활용한다
- 리스트 렌더링과 `key`의 역할을 이해한다

---

## 핵심 개념

### 1. 컴포넌트 분리 원칙

```
App
├── TodoForm        (입력 폼)
└── TodoList        (목록)
    └── TodoItem    (개별 항목)
```

> 각 컴포넌트는 **하나의 역할**만 담당합니다.

### 2. Props로 콜백 전달

```tsx
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li>
      <input type="checkbox" checked={todo.done} onChange={() => onToggle(todo.id)} />
      <span>{todo.title}</span>
      <button onClick={() => onDelete(todo.id)}>삭제</button>
    </li>
  );
}
```

### 3. 조건부 렌더링

```tsx
// && 연산자: 조건이 참일 때만 렌더링
{todos.length === 0 && <p>할일이 없습니다</p>}

// 삼항 연산자: 조건에 따라 다르게 렌더링
<span style={{ textDecoration: todo.done ? "line-through" : "none" }}>
  {todo.title}
</span>

// 역할별 배지
{user.role === "admin" ? <Badge color="red">관리자</Badge>
  : user.role === "editor" ? <Badge color="blue">편집자</Badge>
  : <Badge color="gray">사용자</Badge>}
```

---

## 실습 파일

### starter/ (직접 구현)

| 파일 | 내용 |
|------|------|
| `src/components/TodoItem.tsx` | 개별 할일 컴포넌트 |
| `src/components/TodoList.tsx` | 목록 컴포넌트 |
| `src/components/TodoForm.tsx` | 입력 폼 컴포넌트 |
| `src/components/UserList.tsx` | 사용자 목록, 역할별 배지, 조건부 스타일 |
| `src/App.tsx` | 컴포넌트 조합 |

### practice/ (연습 문제)

| 파일 | 내용 |
|------|------|
| `practice-extra.tsx` | 상품 카드, 아코디언, 별점 컴포넌트 |
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
| 컴포넌트 분리 | 역할별로 나누기 (Form, List, Item) |
| Props 인터페이스 | `interface XxxProps { ... }` |
| 콜백 Props | `onDelete: (id: number) => void` |
| 조건부 렌더링 | `&&`, 삼항 연산자 |
| key | `map()` 시 고유 식별자 필수 |

> **다음 시간**: Day 11 - useState로 상태 관리 (CRUD)
