# Day 16 - React에서 Next.js로

> **Phase 4: Next.js** | 학습일: 16일차

---

## 학습 목표

- Next.js의 개요와 React와의 차이점을 이해한다
- `create-next-app`으로 프로젝트를 생성한다
- App Router 구조(`app/page.tsx`, `layout.tsx`)를 이해한다
- SSR vs CSR의 차이를 이해한다
- `'use client'` 지시어의 역할을 이해한다

---

## 핵심 개념

### 1. SSR vs CSR

| 구분 | CSR (Client Side Rendering) | SSR (Server Side Rendering) |
|------|----------------------------|----------------------------|
| 렌더링 위치 | 브라우저 | 서버 |
| 초기 로딩 | HTML이 비어있음 (JS 다운로드 후 렌더링) | 완성된 HTML이 바로 옴 |
| SEO | 불리함 (빈 HTML) | 유리함 (완성된 HTML) |
| 인터랙션 | JS 로드 후 바로 가능 | hydration 이후 가능 |
| 예시 | React (CRA) | Next.js |

### 2. App Router 구조

```
src/app/
  layout.tsx    ← 전체 레이아웃 (HTML, body 태그 포함)
  page.tsx      ← "/" 경로의 페이지
  globals.css   ← 전역 스타일
```

- `layout.tsx`: 모든 페이지를 감싸는 레이아웃. `children`으로 페이지 내용을 받음
- `page.tsx`: 해당 폴더의 URL 경로에 대응하는 페이지 컴포넌트

### 3. 'use client' 지시어

Next.js에서 컴포넌트는 기본적으로 **서버 컴포넌트**입니다. `useState`, `useEffect` 등 React 훅을 사용하려면 파일 상단에 `'use client'`를 추가해야 합니다.

```tsx
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### 4. 파일 기반 라우팅

| 파일 경로 | URL |
|-----------|-----|
| `src/app/page.tsx` | `/` |
| `src/app/about/page.tsx` | `/about` |
| `src/app/todos/page.tsx` | `/todos` |

---

## 실습 파일

### starter/ (직접 구현)

| 파일 | 내용 |
|------|------|
| `src/app/layout.tsx` | 루트 레이아웃, metadata 설정 |
| `src/app/page.tsx` | 메인 페이지 |
| `src/components/TodoApp.tsx` | 'use client' 할일 앱 컴포넌트 |

### solution/ (완성 코드)

| 파일 | 내용 |
|------|------|
| `src/app/layout.tsx` | 완성된 레이아웃 |
| `src/app/page.tsx` | 완성된 메인 페이지 |
| `src/components/TodoApp.tsx` | 완성된 할일 앱 |

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
| Next.js | React 기반 풀스택 프레임워크 (SSR + CSR) |
| App Router | `app/` 폴더 기반 라우팅 |
| layout.tsx | 공통 레이아웃 (metadata, HTML 구조) |
| page.tsx | URL 경로에 대응하는 페이지 |
| 'use client' | 클라이언트 컴포넌트 지정 (훅 사용 시 필수) |
| SSR | 서버에서 HTML 생성 → SEO 유리 |

> **다음 시간**: Day 17 - 라우팅과 레이아웃
