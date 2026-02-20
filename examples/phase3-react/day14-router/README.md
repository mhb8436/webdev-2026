# Day 14 - 여러 페이지 만들기 (React Router)

## 학습 목표

- `react-router-dom` 라이브러리 이해 및 사용
- `BrowserRouter`, `Routes`, `Route`로 라우팅 설정
- `Link` 컴포넌트와 `<a>` 태그의 차이 이해
- `useNavigate` 훅으로 프로그래밍 방식 페이지 이동
- 여러 페이지로 앱 구조 분리

## 문제 상황

> "할일 목록, 완료 목록, 통계 페이지를 분리하자"

지금까지 만든 Todo 앱은 모든 기능이 한 페이지에 들어있습니다.
앱이 커지면 페이지를 나눠야 합니다. React에서는 `react-router-dom`을 사용해서
URL에 따라 다른 컴포넌트를 보여줄 수 있습니다.

## 핵심 개념

### 1. 라우팅(Routing)이란?

URL 경로에 따라 다른 페이지(컴포넌트)를 보여주는 것입니다.

- `/` -> 홈 페이지 (전체 할일 목록)
- `/completed` -> 완료 목록 페이지
- `/stats` -> 통계 페이지

### 2. BrowserRouter

브라우저의 History API를 사용하여 URL을 관리합니다.
앱 전체를 감싸서 라우팅 기능을 활성화합니다.

```tsx
import { BrowserRouter } from 'react-router-dom';

<BrowserRouter>
  <App />
</BrowserRouter>
```

### 3. Routes와 Route

URL 경로와 컴포넌트를 매핑합니다.

```tsx
import { Routes, Route } from 'react-router-dom';

<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/about" element={<AboutPage />} />
</Routes>
```

### 4. Link vs `<a>` 태그

| 구분 | `<a>` 태그 | `<Link>` 컴포넌트 |
|------|-----------|-------------------|
| 동작 | 페이지 전체 새로고침 | 페이지 새로고침 없이 이동 |
| 속도 | 느림 (전체 리로드) | 빠름 (필요한 부분만 변경) |
| 상태 | 모든 상태 초기화 | 상태 유지 |

```tsx
import { Link } from 'react-router-dom';

// 좋은 방법: SPA 내부 이동
<Link to="/completed">완료 목록</Link>

// 나쁜 방법: 전체 페이지 리로드 발생
<a href="/completed">완료 목록</a>
```

### 5. useNavigate

코드에서 프로그래밍 방식으로 페이지를 이동할 때 사용합니다.

```tsx
import { useNavigate } from 'react-router-dom';

function SomeComponent() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/stats'); // 통계 페이지로 이동
  };

  return <button onClick={handleClick}>통계 보기</button>;
}
```

## 프로젝트 구조

```
src/
  main.tsx          - BrowserRouter로 App 감싸기
  App.tsx           - Routes 설정 + 상태 관리
  components/
    TodoForm.tsx    - 할일 추가 폼
    TodoItem.tsx    - 할일 항목
    TodoList.tsx    - 할일 목록
    Navbar.tsx      - 네비게이션 바 (Link 사용)
  pages/
    HomePage.tsx    - 메인 페이지 (전체 할일 + 추가 폼)
    CompletedPage.tsx - 완료된 할일 목록
    StatsPage.tsx   - 통계 페이지
  types/
    todo.ts         - 타입 정의
```

## 실습 단계

### 1단계: Navbar 컴포넌트 만들기
`Link` 컴포넌트를 사용하여 홈, 완료 목록, 통계 페이지로 이동하는 네비게이션 바를 만드세요.

### 2단계: 페이지 컴포넌트 만들기
- `HomePage`: 전체 할일 목록과 추가 폼
- `CompletedPage`: 완료된 할일만 표시
- `StatsPage`: 총 개수, 완료, 미완료, 완료율 표시

### 3단계: App.tsx에서 Routes 설정
각 경로에 맞는 페이지 컴포넌트를 연결하세요.

### 4단계: useNavigate 활용
통계 페이지에서 버튼 클릭으로 홈 페이지로 이동하는 기능을 추가하세요.

## 실행 방법

```bash
npm install
npm run dev
```

## 참고 자료

- [React Router 공식 문서](https://reactrouter.com/)
- [React Router Tutorial](https://reactrouter.com/en/main/start/tutorial)
