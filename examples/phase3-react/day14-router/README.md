# Day 14 - React Router: 페이지 라우팅과 인증 가드

> **Phase 3: React** | 학습일: 14일차

---

## 학습 목표

- `react-router-dom`으로 SPA 라우팅을 구현한다
- `Link`와 `<a>` 태그의 차이를 이해한다
- `useNavigate`, `useParams`를 활용한다
- 인증 가드(ProtectedRoute)를 구현한다
- 역할 기반 접근 제어(RBAC)를 React에서 구현한다

---

## 핵심 개념

### 1. 기본 라우팅

```tsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">홈</Link>           {/* 페이지 리로드 없이 이동 */}
        <Link to="/about">소개</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### 2. 동적 라우트 파라미터

```tsx
import { useParams } from "react-router-dom";

function UserDetail() {
  const { id } = useParams<{ id: string }>();
  return <h1>사용자 {id}</h1>;
}
```

### 3. 프로그래밍 방식 이동

```tsx
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const handleLogin = () => {
    // 로그인 처리 후...
    navigate("/dashboard");         // 이동
    navigate("/dashboard", { replace: true });  // 뒤로가기 불가
  };
}
```

### 4. 인증 가드 (ProtectedRoute)

```tsx
function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

// 사용
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

### 5. 역할 기반 접근 제어

```tsx
function RoleProtectedRoute({ children, requiredRole }: {
  children: ReactNode;
  requiredRole: string;
}) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== requiredRole) return <div>접근 권한이 없습니다</div>;
  return <>{children}</>;
}

<Route path="/admin" element={
  <RoleProtectedRoute requiredRole="admin">
    <AdminPage />
  </RoleProtectedRoute>
} />
```

---

## 실습 파일

### starter/ (직접 구현)

| 파일 | 내용 |
|------|------|
| `src/App.tsx` | Routes 설정 |
| `src/components/Navbar.tsx` | Link 네비게이션 |
| `src/components/ProtectedRoute.tsx` | AuthContext, ProtectedRoute, RoleProtectedRoute |
| `src/pages/` | HomePage, CompletedPage, StatsPage |

### practice/ (연습 문제)

| 파일 | 내용 |
|------|------|
| `App.tsx` | 라우팅 연습 |

---

## 실행 방법

```bash
cd starter && npm install && npm run dev
```

---

## 정리

| 개념 | 핵심 |
|------|------|
| Link | `<Link to="/">` — SPA 내부 이동 (리로드 없음) |
| Route | `<Route path="/users/:id" element={<Comp />} />` |
| useParams | 동적 URL 파라미터 가져오기 |
| useNavigate | 코드에서 페이지 이동 |
| ProtectedRoute | 인증 여부 확인 후 렌더링 or 리다이렉트 |
| Navigate | `<Navigate to="/login" replace />` |

> **다음 시간**: Day 15 - Context API (전역 상태 관리)
