# Day 09 - React 시작: Vite + TypeScript, 컴포넌트, Props

> **Phase 3: React** | 학습일: 9일차

---

## 학습 목표

- Vite로 React + TypeScript 프로젝트를 생성한다
- JSX 문법과 컴포넌트 함수를 이해한다
- Props로 부모→자식 데이터를 전달한다
- `children` prop을 활용한 래퍼 컴포넌트를 만든다
- 배열을 `map()`으로 렌더링하고 `key`를 부여한다

---

## 핵심 개념

### 1. Vite + React + TypeScript

```bash
npm create vite@latest todo-app -- --template react-ts
cd todo-app && npm install && npm run dev
```

### 2. JSX

JavaScript 안에서 HTML과 유사한 문법으로 UI를 작성합니다.

```tsx
function App() {
  const name = "홍길동";
  return (
    <div>
      <h1>안녕하세요, {name}님!</h1>   {/* 중괄호로 JS 표현식 사용 */}
      <p>{2 + 3}</p>                    {/* 계산 가능 */}
    </div>
  );
}
```

### 3. Props (속성)

```tsx
// Props 타입 정의
interface ProfileProps {
  name: string;
  age: number;
  isOnline?: boolean;  // 선택적
}

// 컴포넌트에서 Props 받기
function ProfileCard({ name, age, isOnline = false }: ProfileProps) {
  return (
    <div>
      <h2>{name} ({age}세)</h2>
      <span>{isOnline ? "온라인" : "오프라인"}</span>
    </div>
  );
}

// 부모에서 사용
<ProfileCard name="홍길동" age={30} isOnline />
```

### 4. children prop

```tsx
interface CardProps {
  title: string;
  children: React.ReactNode;
}

function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
}

// 사용
<Card title="프로필">
  <p>이름: 홍길동</p>
  <p>직업: 개발자</p>
</Card>
```

### 5. 배열 렌더링

```tsx
const todos = [
  { id: 1, title: "공부하기", done: false },
  { id: 2, title: "운동하기", done: true },
];

{todos.map(todo => (
  <li key={todo.id}>{todo.title}</li>  // key 필수!
))}
```

---

## 실습 파일

### starter/ (직접 구현)

| 파일 | 내용 |
|------|------|
| `src/App.tsx` | Todo 인터페이스 정의, 배열 렌더링 |
| `src/components/Profile.tsx` | Props, children, 조건부 렌더링 |

### practice/ (연습 문제)

| 파일 | 내용 |
|------|------|
| `App.tsx` | 컴포넌트 분리 연습 |

---

## 실행 방법

```bash
cd starter   # 또는 cd solution
npm install
npm run dev
# 브라우저에서 http://localhost:5173
```

---

## 정리

| 개념 | 핵심 |
|------|------|
| Vite | `npm create vite@latest --template react-ts` |
| JSX | HTML-like 문법, `{}`로 JS 표현식 삽입 |
| Props | 부모→자식 데이터 전달, 인터페이스로 타입 정의 |
| children | `React.ReactNode` 타입, 래퍼 컴포넌트 |
| key | 배열 렌더링 시 고유 식별자 필수 |

> **다음 시간**: Day 10 - 컴포넌트 분리와 합성
