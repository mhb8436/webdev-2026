# Day 17 - 라우팅과 레이아웃

> **Phase 4: Next.js** | 학습일: 17일차

---

## 학습 목표

- App Router의 폴더 기반 라우팅을 이해한다
- `layout.tsx` 중첩 개념을 이해한다
- `Link` 컴포넌트로 클라이언트 사이드 네비게이션을 구현한다
- `usePathname()`으로 현재 경로를 감지한다

---

## 핵심 개념

### 1. 폴더 기반 라우팅

App Router에서는 `app/` 폴더 안의 디렉토리 구조가 곧 URL 구조입니다.

```
src/app/
├── layout.tsx        ← 전체 레이아웃
├── page.tsx          ← "/" 경로
├── todos/
│   └── page.tsx      ← "/todos" 경로
├── completed/
│   └── page.tsx      ← "/completed" 경로
└── stats/
    └── page.tsx      ← "/stats" 경로
```

### 2. Link 컴포넌트

```tsx
import Link from 'next/link';

// <a> 태그 대신 Link 사용 — 페이지 리로드 없이 이동
<Link href="/todos">할일 목록</Link>
```

### 3. usePathname()

현재 URL 경로를 가져오는 훅입니다. 네비게이션에서 현재 페이지를 강조할 때 유용합니다.

```tsx
'use client';
import { usePathname } from 'next/navigation';

const pathname = usePathname(); // 예: "/todos"
```

### 4. 레이아웃 중첩

각 폴더에 `layout.tsx`를 두면 레이아웃이 중첩됩니다.

```
RootLayout (app/layout.tsx)
  └── TodosLayout (app/todos/layout.tsx)
        └── TodosPage (app/todos/page.tsx)
```

---

## 실습 파일

### starter/ (직접 구현)

| 파일 | 내용 |
|------|------|
| `src/app/layout.tsx` | Navbar 포함 루트 레이아웃 |
| `src/app/page.tsx` | 메인 페이지 |
| `src/app/todos/page.tsx` | 미완료 할일 |
| `src/app/completed/page.tsx` | 완료된 할일 |
| `src/app/stats/page.tsx` | 할일 통계 |
| `src/components/Navbar.tsx` | Link + usePathname 네비게이션 |
| `src/components/TodoApp.tsx` | 할일 관리 컴포넌트 |

### solution/ (완성 코드)

동일 구조의 완성된 코드

---

## 실행 방법

```bash
cd starter && npm install && npm run dev
```

브라우저에서 `http://localhost:3000` 접속

---

## 정리

| 개념 | 핵심 |
|------|------|
| 폴더 기반 라우팅 | `app/todos/page.tsx` → `/todos` |
| Link | `<Link href="/todos">` — SPA 네비게이션 (리로드 없음) |
| usePathname | 현재 URL 경로 가져오기 (클라이언트 컴포넌트) |
| 레이아웃 중첩 | 각 폴더의 `layout.tsx`가 상위 layout 안에 렌더링 |
| Navbar | Link + usePathname으로 활성 메뉴 표시 |

> **다음 시간**: Day 18 - 서버와 클라이언트 컴포넌트
