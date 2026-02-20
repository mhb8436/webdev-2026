# Day 19 - Next.js 세부 기능 활용

## 날짜
4월 28일 (월)

## 학습 목표
- Metadata API를 사용하여 SEO에 최적화된 메타데이터 설정하기
- `next/image`를 활용한 이미지 최적화 이해하기
- `loading.tsx`로 로딩 UI 구현하기 (React Suspense 기반)
- `error.tsx`로 에러 처리 구현하기 ('use client' 필수)
- `not-found.tsx`로 404 페이지 커스터마이징하기
- 동적 라우트에서 `generateMetadata`로 동적 메타데이터 생성하기

## 문제 (Problem)
> "메타데이터, 이미지 최적화, 로딩/에러 처리를 추가하자"

Day 18에서 만든 서버/클라이언트 렌더링 기반 할일 앱에 Next.js의 세부 기능들을 추가합니다. SEO를 위한 메타데이터, 사용자 경험을 위한 로딩/에러 처리, 그리고 개별 할일 상세 페이지를 구현합니다.

## 핵심 개념

### Metadata API

Next.js App Router에서는 `metadata` 객체를 export하여 `<head>` 태그의 메타데이터를 설정합니다.

```tsx
// 정적 메타데이터
export const metadata: Metadata = {
  title: '할일 앱',
  description: 'Next.js로 만든 할일 관리 앱',
};
```

#### title 템플릿

`layout.tsx`에서 title 템플릿을 설정하면 하위 페이지에서 일관된 제목을 사용할 수 있습니다.

```tsx
// layout.tsx
export const metadata: Metadata = {
  title: {
    template: '%s | 할일 앱',  // %s에 하위 페이지 제목이 들어감
    default: '할일 앱',
  },
};

// todos/page.tsx
export const metadata: Metadata = {
  title: '할일 목록',  // 결과: "할일 목록 | 할일 앱"
};
```

#### 동적 메타데이터 (generateMetadata)

동적 라우트에서는 `generateMetadata` 함수를 사용합니다.

```tsx
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const todo = getTodoById(params.id);
  return {
    title: todo?.title ?? '할일을 찾을 수 없습니다',
  };
}
```

### 로딩 UI (loading.tsx)

`loading.tsx` 파일을 만들면 해당 라우트 세그먼트의 로딩 상태를 자동으로 처리합니다. React Suspense 기반으로 동작합니다.

```
src/app/
  loading.tsx       ← 전역 로딩 UI
  todos/
    loading.tsx     ← /todos 전용 로딩 UI
    page.tsx
```

### 에러 처리 (error.tsx)

`error.tsx`는 **반드시 클라이언트 컴포넌트**여야 합니다. `error`와 `reset` props를 받습니다.

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

### 404 페이지 (not-found.tsx)

`not-found.tsx`는 `notFound()` 함수가 호출되거나 매칭되지 않는 URL에 대해 표시됩니다.

```tsx
import { notFound } from 'next/navigation';

// 동적 라우트에서 사용
const todo = getTodoById(id);
if (!todo) {
  notFound(); // not-found.tsx가 렌더링됨
}
```

### next/image

`next/image`는 이미지를 자동으로 최적화합니다.

```tsx
import Image from 'next/image';

<Image
  src="/logo.png"
  alt="로고"
  width={100}
  height={100}
  priority  // LCP 이미지에 사용
/>
```

## 프로젝트 구조

```
day19-features/
├── README.md
├── starter/
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.ts
│   └── src/
│       ├── app/
│       │   ├── layout.tsx          ← TODO: metadata 설정
│       │   ├── page.tsx
│       │   ├── globals.css
│       │   ├── loading.tsx         ← TODO: 전역 로딩 UI
│       │   ├── error.tsx           ← TODO: 에러 페이지
│       │   ├── not-found.tsx       ← TODO: 404 페이지
│       │   ├── todos/
│       │   │   ├── page.tsx
│       │   │   ├── loading.tsx     ← TODO: 할일 목록 로딩 UI
│       │   │   └── [id]/
│       │   │       ├── page.tsx    ← TODO: 할일 상세 페이지
│       │   │       └── not-found.tsx ← TODO: 할일 없을 때
│       │   ├── completed/
│       │   │   └── page.tsx
│       │   └── stats/
│       │       └── page.tsx        ← metadata export
│       ├── components/
│       │   ├── Navbar.tsx
│       │   ├── TodoApp.tsx         ← 'use client'
│       │   ├── TodoItem.tsx
│       │   ├── TodoList.tsx
│       │   ├── TodoForm.tsx
│       │   └── LoadingSpinner.tsx  ← TODO: 재사용 로딩 컴포넌트
│       ├── lib/
│       │   └── todos.ts
│       └── types/
│           └── todo.ts
└── solution/
    └── (동일 구조, 모든 TODO 완성)
```

## 실행 방법

```bash
# starter 또는 solution 폴더에서
npm install
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

## 구현 가이드

### Step 1: Metadata 설정 (layout.tsx)
- `title`을 템플릿 방식으로 설정 (`template`과 `default`)
- `description`, `keywords` 등 SEO 메타데이터 추가
- `openGraph` 설정으로 소셜 미디어 공유 최적화

### Step 2: LoadingSpinner 컴포넌트 만들기
- CSS 애니메이션을 사용한 스피너 UI
- 재사용 가능하도록 별도 컴포넌트로 분리

### Step 3: loading.tsx 구현
- `app/loading.tsx`: 전역 로딩 UI
- `app/todos/loading.tsx`: 할일 목록 전용 로딩 UI
- LoadingSpinner 컴포넌트 활용

### Step 4: error.tsx 구현
- `'use client'` 지시어 필수
- `error.message`로 에러 메시지 표시
- `reset()` 함수로 다시 시도 버튼 구현

### Step 5: not-found.tsx 구현
- `app/not-found.tsx`: 전역 404 페이지
- `Link` 컴포넌트로 홈 이동 링크

### Step 6: 할일 상세 페이지 (todos/[id]/page.tsx)
- `getTodoById()` 함수로 할일 조회
- 할일이 없으면 `notFound()` 호출
- `generateMetadata`로 동적 메타데이터 생성

### Step 7: 통계 페이지 메타데이터 (stats/page.tsx)
- 정적 metadata export 추가

## 힌트
- `error.tsx`는 반드시 `'use client'`가 필요합니다. 에러 바운더리는 클라이언트에서 동작합니다.
- `loading.tsx`는 해당 폴더의 `page.tsx`가 로딩 중일 때 자동으로 표시됩니다.
- `notFound()`는 `next/navigation`에서 import합니다.
- `generateMetadata`는 `async` 함수로 선언합니다.
- 전역 `not-found.tsx`와 개별 폴더의 `not-found.tsx`를 구분하세요.

## 참고 자료
- [Next.js 공식 문서 - Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Next.js 공식 문서 - Loading UI](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)
- [Next.js 공식 문서 - Error Handling](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
- [Next.js 공식 문서 - not-found.js](https://nextjs.org/docs/app/api-reference/file-conventions/not-found)
- [Next.js 공식 문서 - Image](https://nextjs.org/docs/app/building-your-application/optimizing/images)
