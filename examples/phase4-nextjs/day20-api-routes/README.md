# Day 20 - API Route로 백엔드 만들기

## 날짜
4월 29일 (화)

## 학습 목표
- Next.js Route Handlers (`app/api/route.ts`) 이해하기
- HTTP 메서드별 핸들러 구현 (GET, POST, PUT, DELETE)
- `NextRequest`, `NextResponse` 객체 사용법
- 프론트엔드에서 `fetch`로 API 호출하기
- 풀스택 할일 앱 완성하기

## 문제 (Problem)
> "Next.js API Route로 할일 CRUD REST API를 만들자"

Day 19까지는 서버 컴포넌트에서 직접 데이터를 가져왔습니다. 이제 API Route를 만들어 REST API 엔드포인트를 구성하고, 클라이언트 컴포넌트에서 `fetch`로 데이터를 주고받는 풀스택 구조를 만듭니다.

## 핵심 개념

### Route Handlers (API Routes)

Next.js App Router에서는 `app/api/` 폴더 안에 `route.ts` 파일을 만들어 API 엔드포인트를 정의합니다.

```
src/app/api/
  todos/
    route.ts        → GET /api/todos, POST /api/todos
    [id]/
      route.ts      → GET /api/todos/:id, PUT /api/todos/:id, DELETE /api/todos/:id
```

### HTTP 메서드별 핸들러

각 HTTP 메서드에 대응하는 함수를 export합니다.

```typescript
import { NextRequest, NextResponse } from 'next/server';

// GET 요청 처리
export async function GET(request: NextRequest) {
  return NextResponse.json({ message: '조회 성공' });
}

// POST 요청 처리
export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ data: body }, { status: 201 });
}
```

### NextRequest / NextResponse

| 객체 | 설명 |
|------|------|
| `NextRequest` | 요청 객체. `request.json()`, `request.url`, `request.nextUrl` 등 |
| `NextResponse` | 응답 객체. `NextResponse.json()`, `NextResponse.redirect()` 등 |

### 동적 라우트 파라미터

```typescript
// app/api/todos/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  // id를 사용하여 데이터 조회
}
```

### HTTP 상태 코드

| 코드 | 의미 | 사용 시점 |
|------|------|-----------|
| 200 | OK | 조회/수정 성공 |
| 201 | Created | 새 리소스 생성 성공 |
| 400 | Bad Request | 잘못된 요청 (필수 필드 누락 등) |
| 404 | Not Found | 리소스를 찾을 수 없음 |
| 500 | Internal Server Error | 서버 내부 오류 |

### 프론트엔드 fetch 연동

```typescript
// 할일 목록 조회
const response = await fetch('/api/todos');
const todos = await response.json();

// 할일 추가
const response = await fetch('/api/todos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: '새 할일' }),
});
```

## 프로젝트 구조

```
day20-api-routes/
├── README.md
├── starter/
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.ts
│   └── src/
│       ├── app/
│       │   ├── layout.tsx
│       │   ├── page.tsx
│       │   ├── globals.css
│       │   ├── loading.tsx
│       │   ├── error.tsx
│       │   ├── not-found.tsx
│       │   ├── api/
│       │   │   └── todos/
│       │   │       ├── route.ts       ← TODO: GET, POST
│       │   │       └── [id]/
│       │   │           └── route.ts   ← TODO: GET, PUT, DELETE
│       │   ├── todos/
│       │   │   └── page.tsx
│       │   ├── completed/
│       │   │   └── page.tsx
│       │   └── stats/
│       │       └── page.tsx
│       ├── components/
│       │   ├── Navbar.tsx
│       │   ├── TodoApp.tsx            ← TODO: fetch 연동으로 변경
│       │   ├── TodoItem.tsx
│       │   ├── TodoList.tsx
│       │   ├── TodoForm.tsx
│       │   └── LoadingSpinner.tsx
│       ├── lib/
│       │   └── todos.ts              ← 서버 측 데이터 저장소
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

API 테스트:
```bash
# 할일 목록 조회
curl http://localhost:3000/api/todos

# 할일 추가
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "새로운 할일"}'

# 할일 수정 (토글)
curl -X PUT http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'

# 할일 삭제
curl -X DELETE http://localhost:3000/api/todos/1
```

## 구현 가이드

### Step 1: API Route 구조 이해
- `app/api/todos/route.ts` -> GET /api/todos, POST /api/todos
- `app/api/todos/[id]/route.ts` -> GET/PUT/DELETE /api/todos/:id
- `NextRequest`, `NextResponse` import

### Step 2: GET /api/todos 구현
- `getTodos()`로 모든 할일 가져오기
- `NextResponse.json()`으로 JSON 응답 반환

### Step 3: POST /api/todos 구현
- `request.json()`으로 요청 body 파싱
- `title` 필드 유효성 검사
- `addTodo()`로 새 할일 추가
- 201 상태 코드로 응답

### Step 4: GET /api/todos/:id 구현
- `params.id`로 ID 추출
- `getTodoById()`로 조회
- 없으면 404 응답

### Step 5: PUT /api/todos/:id 구현
- `request.json()`으로 수정 내용 파싱
- `updateTodo()`로 업데이트
- 없으면 404 응답

### Step 6: DELETE /api/todos/:id 구현
- `deleteTodo()`로 삭제
- 없으면 404 응답

### Step 7: TodoApp.tsx에서 fetch 연동
- localStorage 대신 `/api/todos`에서 데이터 가져오기
- 추가/토글/삭제 시 API 호출
- `useEffect`로 초기 데이터 로드

## 힌트
- `request.json()`은 비동기 함수이므로 `await`를 사용합니다.
- `NextResponse.json(data, { status: 201 })` 형태로 상태 코드를 지정합니다.
- PUT 요청에서는 `title`과 `completed` 필드를 모두 처리하세요.
- 프론트엔드의 `fetch`에서 `method`와 `headers`를 올바르게 설정하세요.
- API Route에서 에러가 발생하면 적절한 상태 코드와 메시지를 반환하세요.

## 참고 자료
- [Next.js 공식 문서 - Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Next.js 공식 문서 - NextRequest](https://nextjs.org/docs/app/api-reference/functions/next-request)
- [Next.js 공식 문서 - NextResponse](https://nextjs.org/docs/app/api-reference/functions/next-response)
- [MDN - Fetch API](https://developer.mozilla.org/ko/docs/Web/API/Fetch_API)
- [MDN - HTTP 상태 코드](https://developer.mozilla.org/ko/docs/Web/HTTP/Status)
