# Day 20 - API Route로 백엔드 만들기

> **Phase 4: Next.js** | 학습일: 20일차

---

## 학습 목표

- Route Handlers (`app/api/route.ts`)를 이해한다
- HTTP 메서드별 핸들러(GET, POST, PUT, DELETE)를 구현한다
- `NextRequest`, `NextResponse` 객체를 사용한다
- 프론트엔드에서 `fetch`로 API를 호출한다
- 풀스택 할일 앱을 완성한다

---

## 핵심 개념

### 1. Route Handlers

```
src/app/api/
  todos/
    route.ts        → GET /api/todos, POST /api/todos
    [id]/
      route.ts      → GET /api/todos/:id, PUT, DELETE
```

### 2. HTTP 메서드별 핸들러

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: '조회 성공' });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ data: body }, { status: 201 });
}
```

### 3. 동적 라우트 파라미터

```typescript
// app/api/todos/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
}
```

### 4. HTTP 상태 코드

| 코드 | 의미 | 사용 시점 |
|------|------|-----------|
| 200 | OK | 조회/수정 성공 |
| 201 | Created | 새 리소스 생성 성공 |
| 400 | Bad Request | 잘못된 요청 |
| 404 | Not Found | 리소스를 찾을 수 없음 |

### 5. 프론트엔드 fetch 연동

```typescript
// 조회
const response = await fetch('/api/todos');
const todos = await response.json();

// 추가
await fetch('/api/todos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: '새 할일' }),
});
```

---

## 실습 파일

### starter/ (직접 구현)

| 파일 | 내용 |
|------|------|
| `src/app/api/todos/route.ts` | GET (목록), POST (추가) |
| `src/app/api/todos/[id]/route.ts` | GET (상세), PUT (수정), DELETE (삭제) |
| `src/components/TodoApp.tsx` | fetch 연동 할일 앱 |
| `src/lib/todos.ts` | 서버 측 데이터 저장소 |

### solution/ (완성 코드)

동일 구조의 완성된 코드

---

## 실행 방법

```bash
cd starter && npm install && npm run dev
```

API 테스트:
```bash
# 할일 목록 조회
curl http://localhost:3000/api/todos

# 할일 추가
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "새로운 할일"}'
```

---

## 정리

| 개념 | 핵심 |
|------|------|
| Route Handlers | `app/api/todos/route.ts` — API 엔드포인트 |
| NextRequest | 요청 객체 (`request.json()`, `request.url`) |
| NextResponse | 응답 객체 (`NextResponse.json()`) |
| 동적 라우트 | `[id]/route.ts` — `params.id`로 접근 |
| fetch 연동 | 클라이언트에서 `/api/todos`로 CRUD |

> **다음 시간**: Day 21 - SQL 기본 (Phase 5 시작)
