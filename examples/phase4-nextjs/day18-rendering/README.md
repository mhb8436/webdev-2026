# Day 18 - 서버와 클라이언트 컴포넌트 (Phase 4)

## 날짜
4월 27일 (일)

## 학습 목표
- Server Component(기본)와 Client Component(`'use client'`) 차이 이해
- `async` 서버 컴포넌트에서 데이터 패칭
- 서버/클라이언트 컴포넌트 간 데이터 전달 패턴
- 적절한 컴포넌트 분리 전략

## 문제 (Problem)
> "서버에서 할일 데이터를 불러오고 클라이언트에서 인터랙션하자"

localStorage 대신 서버 측 데이터 저장소를 사용하여 초기 데이터를 서버에서 불러오고, 클라이언트에서는 인터랙션만 담당하도록 분리합니다.

## 핵심 개념

### Server Component vs Client Component

| 구분 | Server Component | Client Component |
|------|-----------------|-----------------|
| 기본값 | O (아무 지시어 없으면 서버) | X ('use client' 필요) |
| 실행 위치 | 서버에서만 | 서버 + 브라우저 |
| React 훅 | 사용 불가 | 사용 가능 (useState, useEffect 등) |
| 이벤트 핸들러 | 사용 불가 (onClick 등) | 사용 가능 |
| async/await | 직접 사용 가능 | 사용 불가 (useEffect 안에서만) |
| 데이터 패칭 | 직접 DB/API 접근 가능 | fetch API 사용 |
| 번들 크기 | 클라이언트 JS에 포함 안됨 | 클라이언트 JS에 포함됨 |

### async 서버 컴포넌트

서버 컴포넌트는 `async` 함수로 만들 수 있어 직접 데이터를 패칭할 수 있습니다.

```tsx
// 서버 컴포넌트 - async 직접 사용 가능
export default async function Page() {
  const data = await fetchData(); // 서버에서 직접 데이터 가져오기
  return <ClientComponent initialData={data} />;
}
```

### 데이터 전달 패턴

서버에서 가져온 데이터를 클라이언트 컴포넌트에 props로 전달하는 패턴:

```
서버 컴포넌트 (데이터 패칭)
  └── 클라이언트 컴포넌트 (인터랙션)
        ├── props로 초기 데이터 받음
        └── 이후 상태는 클라이언트에서 관리
```

### 서버 측 데이터 관리 (lib/todos.ts)

Next.js에서는 서버 측 코드를 `lib/` 폴더에 모아둡니다. 이 코드는 서버에서만 실행됩니다.

```tsx
// src/lib/todos.ts - 서버에서만 실행되는 코드
let todos: Todo[] = [...]; // 메모리 저장소 (실제로는 DB 사용)

export async function getTodos() { ... }
export async function addTodo(title: string) { ... }
```

### 컴포넌트 분리 전략

```
인터랙션이 없는 것 → 서버 컴포넌트 (TodoStats)
인터랙션이 있는 것 → 클라이언트 컴포넌트 (TodoApp, TodoForm)
데이터 패칭 → 서버 컴포넌트 (page.tsx)
상태 관리 → 클라이언트 컴포넌트 (TodoApp)
```

## 프로젝트 구조

```
day18-rendering/
├── starter/
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.ts
│   └── src/
│       ├── app/
│       │   ├── layout.tsx
│       │   ├── page.tsx          ← 서버 컴포넌트 (데이터 패칭)
│       │   ├── globals.css
│       │   ├── todos/page.tsx
│       │   ├── completed/page.tsx
│       │   └── stats/page.tsx
│       ├── components/
│       │   ├── Navbar.tsx
│       │   ├── TodoApp.tsx       ← 클라이언트 (초기 데이터를 props로 받음)
│       │   ├── TodoItem.tsx
│       │   ├── TodoList.tsx
│       │   ├── TodoForm.tsx      ← 클라이언트 (입력 폼)
│       │   └── TodoStats.tsx     ← 서버 컴포넌트 (통계만 표시)
│       ├── lib/
│       │   └── todos.ts          ← 서버 측 데이터 관리
│       └── types/
│           └── todo.ts           ← 공통 타입 정의
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

### Step 1: 공통 타입 정의 (types/todo.ts)
- `Todo` 인터페이스를 별도 파일로 분리
- 서버/클라이언트 모두에서 import 가능

### Step 2: 서버 측 데이터 관리 (lib/todos.ts)
- 메모리 기반 할일 저장소 구현
- `getTodos()`, `addTodo()`, `toggleTodo()`, `deleteTodo()` 함수
- `async` 함수로 구현 (나중에 DB 연동 시 자연스럽게 전환)

### Step 3: 서버 컴포넌트에서 데이터 패칭 (page.tsx)
- `async` 서버 컴포넌트로 `getTodos()` 호출
- 가져온 데이터를 클라이언트 컴포넌트에 props로 전달

### Step 4: 클라이언트 컴포넌트 분리
- `TodoApp` - 초기 데이터를 props로 받아 상태 관리
- `TodoForm` - 새 할일 입력 전용 컴포넌트
- `TodoStats` - 서버 컴포넌트로 변환 (인터랙션 없음)

### Step 5: 통계 페이지를 서버 컴포넌트로
- `TodoStats`는 데이터를 표시만 하므로 서버 컴포넌트로 구현
- 서버에서 직접 데이터를 읽어 렌더링

## 힌트
- `'use client'` 경계를 최대한 아래로 내리세요 (필요한 컴포넌트에만 사용)
- 서버 컴포넌트에서 클라이언트 컴포넌트로 데이터를 전달할 때는 직렬화 가능한(serializable) 데이터만 가능합니다 (함수 전달 불가)
- `lib/todos.ts`의 메모리 저장소는 서버가 재시작되면 초기화됩니다 (개발 중에는 정상)
- `revalidatePath()`나 `router.refresh()`로 서버 데이터를 다시 가져올 수 있습니다

## 참고 자료
- [Next.js 공식 문서 - 서버 컴포넌트](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Next.js 공식 문서 - 클라이언트 컴포넌트](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
- [Next.js 공식 문서 - 데이터 패칭](https://nextjs.org/docs/app/building-your-application/data-fetching)
