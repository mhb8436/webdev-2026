# Day 16 - React에서 Next.js로 (Phase 4 시작)

## 날짜
4월 23일 (수)

## 학습 목표
- Next.js의 개요와 React와의 차이점 이해
- `create-next-app`으로 프로젝트 생성하기
- App Router 구조 이해 (`app/page.tsx`, `layout.tsx`)
- SSR(서버 사이드 렌더링) vs CSR(클라이언트 사이드 렌더링) 개념

## 문제 (Problem)
> "React 할일 앱을 Next.js App Router로 마이그레이션하자"

Phase 3에서 만든 React 할일 앱을 Next.js 프레임워크로 옮깁니다. Next.js의 App Router 구조를 사용하여 동일한 기능을 구현하면서, 서버 사이드 렌더링의 장점을 경험합니다.

## 핵심 개념

### SSR vs CSR

| 구분 | CSR (Client Side Rendering) | SSR (Server Side Rendering) |
|------|----------------------------|----------------------------|
| 렌더링 위치 | 브라우저 | 서버 |
| 초기 로딩 | HTML이 비어있음 (JS 다운로드 후 렌더링) | 완성된 HTML이 바로 옴 |
| SEO | 불리함 (빈 HTML) | 유리함 (완성된 HTML) |
| 인터랙션 | JS 로드 후 바로 가능 | hydration 이후 가능 |
| 예시 | React (CRA) | Next.js |

### App Router 구조

```
src/app/
  layout.tsx    ← 전체 레이아웃 (HTML, body 태그 포함)
  page.tsx      ← "/" 경로의 페이지
  globals.css   ← 전역 스타일
```

- `layout.tsx`: 모든 페이지를 감싸는 레이아웃. `children`으로 페이지 내용을 받음
- `page.tsx`: 해당 폴더의 URL 경로에 대응하는 페이지 컴포넌트
- `globals.css`: 전역 CSS 스타일

### 'use client' 지시어

Next.js에서 컴포넌트는 기본적으로 **서버 컴포넌트**입니다. `useState`, `useEffect` 등 React 훅을 사용하려면 파일 상단에 `'use client'`를 추가해야 합니다.

```tsx
'use client'; // 이 지시어가 있어야 useState 사용 가능

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### 파일 기반 라우팅 (File-based Routing)

| 파일 경로 | URL |
|-----------|-----|
| `src/app/page.tsx` | `/` |
| `src/app/about/page.tsx` | `/about` |
| `src/app/todos/page.tsx` | `/todos` |

## 프로젝트 구조

```
day16-intro/
├── starter/          ← 직접 구현해볼 시작 코드
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.ts
│   └── src/
│       ├── app/
│       │   ├── layout.tsx
│       │   ├── page.tsx
│       │   └── globals.css
│       └── components/
│           └── TodoApp.tsx
└── solution/         ← 완성된 정답 코드
    ├── package.json
    ├── tsconfig.json
    ├── next.config.ts
    └── src/
        ├── app/
        │   ├── layout.tsx
        │   ├── page.tsx
        │   └── globals.css
        └── components/
            └── TodoApp.tsx
```

## 실행 방법

```bash
# starter 또는 solution 폴더에서
npm install
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

## 구현 가이드

### Step 1: 프로젝트 구조 이해하기
- `package.json`의 의존성 확인 (next, react, react-dom)
- `tsconfig.json`의 `@/*` 경로 별칭(alias) 확인
- `next.config.ts` 설정 파일 확인

### Step 2: layout.tsx 완성하기
- HTML `lang` 속성을 `"ko"`로 설정
- `metadata`에 제목과 설명 작성
- `globals.css` import

### Step 3: TodoApp 클라이언트 컴포넌트 구현
- `'use client'` 지시어 추가
- React Phase에서 만든 로직을 가져오기 (useState, localStorage)
- 할일 추가, 삭제, 토글 기능

### Step 4: page.tsx에서 TodoApp 렌더링
- 서버 컴포넌트인 page.tsx에서 클라이언트 컴포넌트 import
- 'use client'가 page.tsx에 필요한지 생각해보기

## 힌트
- `page.tsx` 자체에 `'use client'`를 넣지 않아도 됩니다. 클라이언트 컴포넌트인 `TodoApp`을 import해서 사용하면 됩니다.
- `layout.tsx`는 서버 컴포넌트로 유지합니다 (metadata를 export하기 위해).
- localStorage는 브라우저에서만 사용 가능하므로 `useEffect` 안에서 접근해야 합니다.

## 참고 자료
- [Next.js 공식 문서 - App Router](https://nextjs.org/docs/app)
- [Next.js 공식 문서 - 서버 컴포넌트](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Next.js 공식 문서 - 클라이언트 컴포넌트](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
