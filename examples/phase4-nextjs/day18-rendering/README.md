# Day 18 - 서버와 클라이언트 컴포넌트

> **Phase 4: Next.js** | 학습일: 18일차

---

## 학습 목표

- Server Component와 Client Component의 차이를 이해한다
- `async` 서버 컴포넌트에서 데이터를 패칭한다
- 서버/클라이언트 컴포넌트 간 데이터 전달 패턴을 익힌다
- 적절한 컴포넌트 분리 전략을 세운다

---

## 핵심 개념

### 1. Server Component vs Client Component

| 구분 | Server Component | Client Component |
|------|-----------------|-----------------|
| 기본값 | O (아무 지시어 없으면 서버) | X ('use client' 필요) |
| React 훅 | 사용 불가 | 사용 가능 (useState 등) |
| 이벤트 핸들러 | 사용 불가 | 사용 가능 (onClick 등) |
| async/await | 직접 사용 가능 | useEffect 안에서만 |
| 번들 크기 | 클라이언트 JS에 포함 안됨 | 포함됨 |

### 2. async 서버 컴포넌트

```tsx
export default async function Page() {
  const data = await fetchData();
  return <ClientComponent initialData={data} />;
}
```

### 3. 데이터 전달 패턴

```
서버 컴포넌트 (데이터 패칭)
  └── 클라이언트 컴포넌트 (인터랙션)
        ├── props로 초기 데이터 받음
        └── 이후 상태는 클라이언트에서 관리
```

### 4. 컴포넌트 분리 전략

```
인터랙션이 없는 것 → 서버 컴포넌트 (TodoStats)
인터랙션이 있는 것 → 클라이언트 컴포넌트 (TodoApp, TodoForm)
데이터 패칭 → 서버 컴포넌트 (page.tsx)
상태 관리 → 클라이언트 컴포넌트 (TodoApp)
```

---

## 실습 파일

### starter/ (직접 구현)

| 파일 | 내용 |
|------|------|
| `src/app/page.tsx` | async 서버 컴포넌트 (데이터 패칭) |
| `src/components/TodoApp.tsx` | 'use client' (초기 데이터를 props로 받음) |
| `src/components/TodoForm.tsx` | 'use client' (입력 폼) |
| `src/components/TodoStats.tsx` | 서버 컴포넌트 (통계 표시) |
| `src/lib/todos.ts` | 서버 측 데이터 관리 |
| `src/types/todo.ts` | 공통 타입 정의 |

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
| Server Component | 기본값, async 가능, 훅 불가 |
| Client Component | `'use client'`, 훅/이벤트 사용 |
| 데이터 전달 | 서버에서 패칭 → props로 클라이언트에 전달 |
| lib/ 폴더 | 서버에서만 실행되는 코드 (데이터 로직) |
| 분리 전략 | 'use client' 경계를 최대한 아래로 |

> **다음 시간**: Day 19 - Next.js 세부 기능 (Metadata, Loading, Error)
