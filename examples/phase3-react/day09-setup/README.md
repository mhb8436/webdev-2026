# Day 09 - React 프로젝트 시작 (4/14)

## 학습 목표

- Vite를 사용하여 React + TypeScript 프로젝트를 생성할 수 있다
- JSX 문법의 기본 개념을 이해한다
- 컴포넌트 함수를 작성하고 화면에 렌더링할 수 있다

## 문제 (Problem)

**"Vite로 React+TS 프로젝트를 만들고 첫 컴포넌트를 띄우자"**

할일 관리 앱의 첫 단계로, Vite를 이용해 React + TypeScript 프로젝트를 생성하고,
할일 목록을 화면에 렌더링하는 첫 번째 컴포넌트를 만들어 봅니다.

## 핵심 개념

### Vite란?
Vite는 차세대 프론트엔드 빌드 도구입니다. 빠른 개발 서버와 최적화된 빌드를 제공합니다.

### JSX란?
JSX는 JavaScript 안에서 HTML과 유사한 문법을 사용할 수 있게 해주는 문법 확장입니다.
React에서는 JSX를 사용하여 UI를 선언적으로 작성합니다.

### 컴포넌트 함수
React 컴포넌트는 JSX를 반환하는 함수입니다. 컴포넌트 이름은 반드시 대문자로 시작해야 합니다.

```tsx
function MyComponent() {
  return <h1>안녕하세요!</h1>;
}
```

## 프로젝트 설정 방법

### 새 프로젝트를 처음부터 만들 때

```bash
npm create vite@latest todo-app -- --template react-ts
cd todo-app
npm install
npm run dev
```

### 이 실습 파일을 사용할 때

```bash
cd starter    # 또는 cd solution
npm install
npm run dev
```

브라우저에서 `http://localhost:5173`을 열어 결과를 확인합니다.

## 실습 안내

### starter 폴더

`starter/src/App.tsx` 파일을 열어 TODO 주석을 따라 코드를 완성하세요.

1. `Todo` 인터페이스를 정의하세요 (id, title, done)
2. 하드코딩된 할일 목록 배열을 만드세요
3. `todos.map()`을 사용하여 할일 목록을 JSX로 렌더링하세요

### solution 폴더

정답 코드가 포함되어 있습니다. 막히는 부분이 있을 때 참고하세요.

## 주요 문법 정리

### TypeScript 인터페이스
```tsx
interface Todo {
  id: number;
  title: string;
  done: boolean;
}
```

### 배열 렌더링 (map)
```tsx
{todos.map(todo => (
  <li key={todo.id}>{todo.title}</li>
))}
```

> **주의:** `map()`으로 리스트를 렌더링할 때 반드시 `key` 속성을 지정해야 합니다.

## 참고 자료

- [Vite 공식 문서](https://vitejs.dev/)
- [React 공식 문서 - 첫 번째 컴포넌트](https://react.dev/learn/your-first-component)
- [TypeScript 핸드북](https://www.typescriptlang.org/docs/)
