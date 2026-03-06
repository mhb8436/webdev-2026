# Day 19 - Next.js 세부 기능 활용

> **Phase 4: Next.js** | 학습일: 19일차

---

## 학습 목표

- Metadata API로 SEO 최적화 메타데이터를 설정한다
- `loading.tsx`로 로딩 UI를 구현한다 (React Suspense 기반)
- `error.tsx`로 에러 처리를 구현한다
- `not-found.tsx`로 404 페이지를 커스터마이징한다
- `generateMetadata`로 동적 메타데이터를 생성한다

---

## 핵심 개념

### 1. Metadata API

```tsx
// 정적 메타데이터
export const metadata: Metadata = {
  title: '할일 앱',
  description: 'Next.js로 만든 할일 관리 앱',
};

// title 템플릿 (layout.tsx)
export const metadata: Metadata = {
  title: {
    template: '%s | 할일 앱',
    default: '할일 앱',
  },
};
```

### 2. 동적 메타데이터

```tsx
export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  const todo = getTodoById(params.id);
  return { title: todo?.title ?? '할일을 찾을 수 없습니다' };
}
```

### 3. 로딩 UI (loading.tsx)

`loading.tsx` 파일을 만들면 해당 라우트의 로딩 상태를 자동 처리합니다.

```
src/app/
  loading.tsx         ← 전역 로딩 UI
  todos/
    loading.tsx       ← /todos 전용 로딩 UI
```

### 4. 에러 처리 (error.tsx)

```tsx
'use client'; // 필수!

export default function Error({ error, reset }: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>오류가 발생했습니다</h2>
      <p>{error.message}</p>
      <button onClick={reset}>다시 시도</button>
    </div>
  );
}
```

### 5. 404 페이지 (not-found.tsx)

```tsx
import { notFound } from 'next/navigation';

const todo = getTodoById(id);
if (!todo) notFound(); // not-found.tsx가 렌더링됨
```

---

## 실습 파일

### starter/ (직접 구현)

| 파일 | 내용 |
|------|------|
| `src/app/layout.tsx` | metadata 템플릿 설정 |
| `src/app/loading.tsx` | 전역 로딩 UI |
| `src/app/error.tsx` | 에러 페이지 ('use client') |
| `src/app/not-found.tsx` | 404 페이지 |
| `src/app/todos/[id]/page.tsx` | 할일 상세 + generateMetadata |
| `src/components/LoadingSpinner.tsx` | 재사용 로딩 컴포넌트 |

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
| Metadata | `export const metadata` — SEO 메타데이터 |
| title 템플릿 | `template: '%s | 앱이름'` — 하위 페이지 제목 자동 조합 |
| generateMetadata | 동적 라우트에서 async 메타데이터 생성 |
| loading.tsx | React Suspense 기반 자동 로딩 UI |
| error.tsx | 'use client' 필수, `reset()` 다시 시도 |
| not-found.tsx | `notFound()` 호출 시 렌더링 |

> **다음 시간**: Day 20 - API Route로 백엔드 만들기
