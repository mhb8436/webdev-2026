# Day 17 - 라우팅과 레이아웃 (Phase 4)

## 날짜
4월 24일 (목)

## 학습 목표
- App Router의 폴더 기반 라우팅 이해
- `layout.tsx` 중첩 개념 이해
- `page.tsx`와 `layout.tsx`의 역할 차이
- `Link` 컴포넌트로 클라이언트 사이드 네비게이션
- `usePathname()`으로 현재 경로 감지

## 문제 (Problem)
> "할일, 완료, 통계 페이지를 Next.js 파일 기반 라우팅으로 구현하자"

단일 페이지로 구성되었던 할일 앱을 여러 페이지로 나누고, 네비게이션 바를 통해 페이지 간 이동을 구현합니다.

## 핵심 개념

### 폴더 기반 라우팅 (File-based Routing)

App Router에서는 `app/` 폴더 안의 디렉토리 구조가 곧 URL 구조입니다.

```
src/app/
├── layout.tsx        ← 전체 레이아웃 (모든 페이지 공통)
├── page.tsx          ← "/" 경로
├── globals.css
├── todos/
│   └── page.tsx      ← "/todos" 경로
├── completed/
│   └── page.tsx      ← "/completed" 경로
└── stats/
    └── page.tsx      ← "/stats" 경로
```

### Link 컴포넌트

Next.js의 `Link` 컴포넌트는 클라이언트 사이드 네비게이션을 제공합니다. 페이지 전체를 새로 불러오지 않고 필요한 부분만 교체합니다.

```tsx
import Link from 'next/link';

// <a> 태그 대신 Link 사용 - 페이지 전환이 빠르고 부드러움
<Link href="/todos">할일 목록</Link>
```

### usePathname()

현재 URL 경로를 가져오는 훅입니다. 네비게이션에서 현재 페이지를 강조할 때 유용합니다.

```tsx
'use client'; // 훅을 사용하므로 클라이언트 컴포넌트
import { usePathname } from 'next/navigation';

const pathname = usePathname(); // 예: "/todos"
```

### 레이아웃 중첩 (Nested Layouts)

각 폴더에 `layout.tsx`를 두면 레이아웃이 중첩됩니다. 하위 layout은 상위 layout 안에 렌더링됩니다.

```
RootLayout (app/layout.tsx)
  └── TodosLayout (app/todos/layout.tsx)  ← 선택적
        └── TodosPage (app/todos/page.tsx)
```

## 프로젝트 구조

```
day17-routing/
├── starter/
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.ts
│   └── src/
│       ├── app/
│       │   ├── layout.tsx
│       │   ├── page.tsx
│       │   ├── globals.css
│       │   ├── todos/
│       │   │   └── page.tsx
│       │   ├── completed/
│       │   │   └── page.tsx
│       │   └── stats/
│       │       └── page.tsx
│       └── components/
│           ├── Navbar.tsx
│           ├── TodoApp.tsx
│           ├── TodoItem.tsx
│           └── TodoList.tsx
└── solution/
    └── (동일 구조, 완성된 코드)
```

## 실행 방법

```bash
# starter 또는 solution 폴더에서
npm install
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

## 구현 가이드

### Step 1: Navbar 컴포넌트 만들기
- `Link` 컴포넌트로 각 페이지 링크 생성
- `usePathname()`으로 현재 활성 페이지 표시
- 'use client' 지시어 필요 (usePathname 훅 사용)

### Step 2: Root Layout에 Navbar 추가
- `layout.tsx`에서 Navbar를 `{children}` 위에 배치
- 모든 페이지에서 공통으로 보이는 네비게이션

### Step 3: 각 페이지 구현
- `/` - 메인 페이지 (전체 할일 목록)
- `/todos` - 미완료 할일만 표시
- `/completed` - 완료된 할일만 표시
- `/stats` - 할일 통계 (전체, 완료, 미완료 개수)

### Step 4: 컴포넌트 분리
- `TodoItem` - 개별 할일 항목 컴포넌트
- `TodoList` - 할일 목록 렌더링 컴포넌트
- `TodoApp` - 전체 할일 관리 컴포넌트

## 힌트
- `usePathname()`은 클라이언트에서만 동작하므로 Navbar는 `'use client'` 컴포넌트
- 각 페이지에서 동일한 `TodoApp` 상태를 공유하려면 Context 또는 상위 layout에서 상태 관리 필요
- 이 단계에서는 각 페이지가 독립적으로 localStorage에서 데이터를 불러오는 방식으로 구현해도 됩니다

## 참고 자료
- [Next.js 공식 문서 - 라우팅](https://nextjs.org/docs/app/building-your-application/routing)
- [Next.js 공식 문서 - Link 컴포넌트](https://nextjs.org/docs/app/api-reference/components/link)
- [Next.js 공식 문서 - 레이아웃](https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates)
