# Day 11 - 할일 추가/삭제 기능 (4/16)

## 학습 목표

- `useState` 훅을 사용하여 컴포넌트 상태를 관리할 수 있다
- 이벤트 핸들링(`onClick`, `onChange`, `onSubmit`)을 구현할 수 있다
- 불변성을 유지하면서 상태를 업데이트할 수 있다

## 문제 (Problem)

**"useState로 할일을 동적으로 추가하고 삭제하자"**

Day 10에서 분리한 컴포넌트들에 실제 동작하는 상태 관리 로직을 추가합니다.
사용자가 할일을 추가, 삭제, 완료 토글할 수 있는 기능을 구현합니다.

## 핵심 개념

### useState
React에서 컴포넌트의 상태를 관리하는 훅(Hook)입니다.

```tsx
const [상태값, 상태변경함수] = useState<타입>(초기값);
```

### 불변성 (Immutability)
React에서 상태를 업데이트할 때는 기존 배열/객체를 직접 수정하지 않고,
새로운 배열/객체를 만들어서 교체해야 합니다.

```tsx
// 올바른 방법 - 새 배열 생성
setTodos([...todos, newTodo]);

// 잘못된 방법 - 기존 배열 직접 수정
todos.push(newTodo); // React가 변경을 감지하지 못함
```

### 이벤트 핸들링

```tsx
// onClick 이벤트
<button onClick={() => handleDelete(id)}>삭제</button>

// onChange 이벤트
<input onChange={(e) => setTitle(e.target.value)} />

// onSubmit 이벤트
<form onSubmit={(e) => {
  e.preventDefault();
  handleAdd(title);
}}>
```

## 실행 방법

```bash
cd starter    # 또는 cd solution
npm install
npm run dev
```

## 실습 안내

### starter 폴더

`src/App.tsx` 파일의 TODO 주석을 따라 다음 기능을 구현하세요:

1. `useState`로 `todos` 상태를 관리하세요
2. `handleAdd` 함수: 새 할일을 배열에 추가
3. `handleDelete` 함수: 해당 id의 할일을 배열에서 제거
4. `handleToggle` 함수: 해당 id의 할일 완료 상태를 반전

### solution 폴더

정답 코드가 포함되어 있습니다. 막히는 부분이 있을 때 참고하세요.

## 주요 문법 정리

### 배열에 항목 추가
```tsx
setTodos([...todos, { id: nextId, title, done: false }]);
```

### 배열에서 항목 제거
```tsx
setTodos(todos.filter(todo => todo.id !== id));
```

### 배열 항목의 속성 변경
```tsx
setTodos(todos.map(todo =>
  todo.id === id ? { ...todo, done: !todo.done } : todo
));
```

## 참고 자료

- [React 공식 문서 - useState](https://react.dev/reference/react/useState)
- [React 공식 문서 - 이벤트에 응답하기](https://react.dev/learn/responding-to-events)
- [React 공식 문서 - 상태 업데이트하기](https://react.dev/learn/updating-arrays-in-state)
