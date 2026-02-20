# Day 14 연습문제 - React Router

## 학습 목표
- React Router로 SPA에서 페이지 전환을 구현할 수 있다
- useParams, useNavigate 등 라우터 훅을 활용할 수 있다
- NavLink로 활성 링크 스타일을 적용할 수 있다
- 404 페이지를 처리할 수 있다

---

## 문제 1: 미니 블로그

블로그의 기본 라우팅 구조를 만드세요.

### 요구사항
- 4개 페이지를 라우팅하세요:
  - **홈** (`/`): 블로그 소개 및 최신 글 미리보기
  - **글 목록** (`/posts`): 모든 글의 제목과 요약을 리스트로 표시
  - **글 상세** (`/posts/:id`): 선택한 글의 전체 내용을 표시
  - **소개** (`/about`): 블로그 작성자 소개
- 글 데이터는 배열로 준비하세요 (최소 3개, id/title/content/date 포함)
- 글 목록에서 제목을 클릭하면 해당 글의 상세 페이지(`/posts/:id`)로 이동
- `useParams`로 URL의 `id`를 가져와서 해당 글을 표시하세요
- 존재하지 않는 글 ID에 대해 "글을 찾을 수 없습니다" 메시지를 표시하세요

### 예시 글 데이터
```typescript
const posts = [
  { id: 1, title: 'React 시작하기', content: 'React는...', date: '2024-04-14' },
  { id: 2, title: 'TypeScript 기초', content: 'TypeScript는...', date: '2024-04-13' },
  { id: 3, title: 'Vite 사용법', content: 'Vite는...', date: '2024-04-12' },
];
```

---

## 문제 2: 네비게이션 바

활성 링크 스타일과 404 페이지를 구현하세요.

### 요구사항
- 상단에 네비게이션 바를 만드세요 (홈, 글 목록, 소개 링크)
- `NavLink`를 사용하여 현재 페이지의 링크에 active 스타일을 적용하세요
  - 활성 링크: 굵은 글씨, 밑줄, 다른 색상
  - 비활성 링크: 기본 스타일
- 정의되지 않은 URL(예: `/xyz`)에 접속하면 404 페이지를 표시하세요
- 404 페이지에 "홈으로 돌아가기" 링크를 포함하세요

### 힌트
```tsx
<NavLink
  to="/posts"
  style={({ isActive }) => ({
    fontWeight: isActive ? 'bold' : 'normal',
    color: isActive ? '#3498db' : '#666',
  })}
>
  글 목록
</NavLink>
```

---

## 문제 3: 로그인 시뮬레이션

로그인 상태에 따른 페이지 리다이렉트를 구현하세요.

### 요구사항
- `useState`로 로그인 상태(`isLoggedIn`)를 관리하세요 (실제 인증 없음)
- 로그인 페이지(`/login`): 이름 입력 후 로그인 버튼 클릭
- 대시보드(`/dashboard`): 로그인한 사용자만 접근 가능
- 로그인하지 않은 상태에서 `/dashboard`에 접근하면 `/login`으로 리다이렉트
- 로그인 상태에서 `/login`에 접근하면 `/dashboard`로 리다이렉트
- 대시보드에 "로그아웃" 버튼을 만들고, 클릭 시 `/login`으로 이동
- `useNavigate`를 활용하세요

### 힌트
```tsx
const navigate = useNavigate();

// 로그인 후 대시보드로 이동
const handleLogin = () => {
  setIsLoggedIn(true);
  navigate('/dashboard');
};
```

---

## 설치 및 실행

```bash
# React Router 설치
npm install react-router-dom

# 실행
npm run dev
```

## 주의사항
- `BrowserRouter`로 앱 전체를 감싸야 합니다 (보통 main.tsx에서)
- `Routes` 안에 `Route`를 정의합니다
- `*` 경로로 404 페이지를 처리합니다
