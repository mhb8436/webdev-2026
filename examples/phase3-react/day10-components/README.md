# Day 10 - 컴포넌트 쪼개기 (4/15)

## 학습 목표

- 하나의 컴포넌트를 여러 개의 작은 컴포넌트로 분리할 수 있다
- Props를 통해 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달할 수 있다
- TypeScript로 Props 타입(인터페이스)을 정의할 수 있다
- children prop의 개념을 이해한다

## 문제 (Problem)

**"할일 앱을 TodoItem, TodoList, TodoForm으로 분리하자"**

Day 09에서 만든 단일 App 컴포넌트를 역할별로 분리합니다.
각 컴포넌트에 적절한 Props 인터페이스를 TypeScript로 정의합니다.

## 핵심 개념

### 컴포넌트 분리
큰 컴포넌트를 작은 단위로 나누면 코드의 재사용성과 유지보수성이 높아집니다.

### Props (속성)
부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하는 방법입니다.

```tsx
// 부모 컴포넌트
<TodoItem todo={myTodo} onDelete={handleDelete} />

// 자식 컴포넌트
interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => void;
}

function TodoItem({ todo, onDelete }: TodoItemProps) {
  return <li>{todo.title}</li>;
}
```

### 컴포넌트 구조

```
App
├── TodoForm        (할일 입력 폼)
└── TodoList        (할일 목록)
    └── TodoItem    (개별 할일 항목)
```

## 실행 방법

```bash
cd starter    # 또는 cd solution
npm install
npm run dev
```

## 실습 안내

### starter 폴더

다음 파일들의 TODO 주석을 따라 코드를 완성하세요:

1. `src/types/todo.ts` - Todo 타입이 이미 정의되어 있습니다
2. `src/components/TodoItem.tsx` - 개별 할일 항목 컴포넌트
3. `src/components/TodoList.tsx` - 할일 목록 컴포넌트
4. `src/components/TodoForm.tsx` - 할일 입력 폼 컴포넌트
5. `src/App.tsx` - 위 컴포넌트들을 조합하는 루트 컴포넌트

### solution 폴더

정답 코드가 포함되어 있습니다. 막히는 부분이 있을 때 참고하세요.

## 주요 문법 정리

### Props 인터페이스 정의
```tsx
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}
```

### 구조 분해 할당으로 Props 받기
```tsx
function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  // ...
}
```

### 콜백 함수 Props
```tsx
// 부모에서 함수를 전달
<TodoForm onAdd={handleAdd} />

// 자식에서 호출
function TodoForm({ onAdd }: TodoFormProps) {
  onAdd('새 할일');
}
```

## 참고 자료

- [React 공식 문서 - Props 전달하기](https://react.dev/learn/passing-props-to-a-component)
- [React 공식 문서 - 컴포넌트로 사고하기](https://react.dev/learn/thinking-in-react)
