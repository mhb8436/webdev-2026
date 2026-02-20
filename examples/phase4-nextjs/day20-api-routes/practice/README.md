# Day 20 연습문제 - API Route로 백엔드 만들기

## 연습문제 1: 방명록 API

### 목표
방명록 시스템의 API Route를 구현하고 프론트엔드에서 연동하세요.

### 요구사항
- `/api/guestbook` 경로에 `route.ts` 파일을 만드세요.
- **GET** `/api/guestbook` - 전체 방명록 목록을 반환합니다.
- **POST** `/api/guestbook` - 새 방명록 항목을 추가합니다.
- 데이터는 메모리 배열(전역 변수)에 저장합니다.
- 각 항목에는 `id`, `name`(이름), `message`(메시지), `createdAt`(작성시간)을 포함합니다.
- `name` 또는 `message`가 비어있으면 400 에러를 반환하세요.
- `NextRequest`, `NextResponse`를 사용하세요.
- 프론트엔드에서 `fetch`로 목록 조회와 작성 기능을 구현하세요.

### API 스펙

#### GET /api/guestbook
**응답 (200 OK):**
```json
[
  {
    "id": 1,
    "name": "홍길동",
    "message": "안녕하세요! 좋은 사이트네요.",
    "createdAt": "2025-04-29T10:30:00.000Z"
  },
  {
    "id": 2,
    "name": "김철수",
    "message": "방문 기념으로 글 남깁니다!",
    "createdAt": "2025-04-29T11:00:00.000Z"
  }
]
```

#### POST /api/guestbook
**요청 body:**
```json
{
  "name": "이영희",
  "message": "감사합니다!"
}
```

**성공 응답 (201 Created):**
```json
{
  "id": 3,
  "name": "이영희",
  "message": "감사합니다!",
  "createdAt": "2025-04-29T12:00:00.000Z"
}
```

**실패 응답 (400 Bad Request):**
```json
{
  "error": "이름과 메시지는 필수입니다"
}
```

### 힌트
- 메모리 배열은 파일 상단에 `let entries = [...]` 형태로 선언합니다.
- `new Date().toISOString()`으로 작성시간을 기록합니다.
- `request.json()`은 `await`를 사용해야 합니다.
- `NextResponse.json(data, { status: 201 })`로 상태 코드를 지정합니다.

---

## 연습문제 2: 검색 API

### 목표
쿼리 파라미터를 사용하는 검색 API를 만드세요.

### 요구사항
- `/api/search` 경로에 `route.ts` 파일을 만드세요.
- **GET** `/api/search?q=키워드` - 도서 목록에서 키워드를 검색합니다.
- 하드코딩된 도서 데이터에서 제목 또는 저자에 키워드가 포함된 항목을 반환합니다.
- 쿼리 파라미터 `q`가 없거나 빈 문자열이면 400 에러를 반환하세요.
- 검색 결과 개수(`count`)도 응답에 포함하세요.
- 대소문자를 구분하지 않고 검색하세요.

### 도서 데이터
```typescript
const books = [
  { id: 1, title: "JavaScript 완벽 가이드", author: "데이비드 플래너건", year: 2020 },
  { id: 2, title: "리액트를 다루는 기술", author: "김민준", year: 2019 },
  { id: 3, title: "모던 JavaScript 튜토리얼", author: "일리아 칸토르", year: 2021 },
  { id: 4, title: "TypeScript 프로그래밍", author: "보리스 체르니", year: 2020 },
  { id: 5, title: "Next.js 실전 프로젝트", author: "이정환", year: 2023 },
  { id: 6, title: "Node.js 디자인 패턴", author: "마리오 카시아로", year: 2022 },
  { id: 7, title: "클린 코드", author: "로버트 마틴", year: 2013 },
  { id: 8, title: "리팩터링 2판", author: "마틴 파울러", year: 2020 },
];
```

### API 스펙

#### GET /api/search?q=javascript
**성공 응답 (200 OK):**
```json
{
  "query": "javascript",
  "count": 2,
  "results": [
    { "id": 1, "title": "JavaScript 완벽 가이드", "author": "데이비드 플래너건", "year": 2020 },
    { "id": 3, "title": "모던 JavaScript 튜토리얼", "author": "일리아 칸토르", "year": 2021 }
  ]
}
```

#### GET /api/search (q 없음)
**실패 응답 (400 Bad Request):**
```json
{
  "error": "검색어(q)는 필수입니다"
}
```

#### GET /api/search?q=없는키워드
**성공 응답 (200 OK):**
```json
{
  "query": "없는키워드",
  "count": 0,
  "results": []
}
```

### 힌트
- `request.nextUrl.searchParams.get('q')`로 쿼리 파라미터를 가져옵니다.
- `String.prototype.toLowerCase()`로 대소문자 구분 없이 비교합니다.
- `Array.prototype.filter()`로 검색 조건에 맞는 항목만 필터링합니다.
- 제목(`title`)과 저자(`author`) 모두에서 검색하세요.

---

## 연습문제 3: RESTful 메모장 API

### 목표
완전한 CRUD 기능을 가진 RESTful 메모장 API를 만드세요.

### 요구사항
- `/api/notes` 경로에 `route.ts` 파일을 만드세요 (GET 목록, POST 추가).
- `/api/notes/[id]` 경로에 `route.ts` 파일을 만드세요 (GET 조회, PUT 수정, DELETE 삭제).
- 각 메모에는 `id`, `title`(제목), `content`(내용), `createdAt`, `updatedAt` 필드가 있습니다.
- 적절한 HTTP 상태코드를 사용하세요:
  - 200: 조회/수정/삭제 성공
  - 201: 새 메모 생성 성공
  - 400: 잘못된 요청 (필수 필드 누락)
  - 404: 메모를 찾을 수 없음
- 프론트엔드 페이지에서 모든 CRUD 기능을 테스트할 수 있게 구현하세요.

### API 스펙

#### GET /api/notes - 전체 목록
**응답 (200 OK):**
```json
[
  {
    "id": "1",
    "title": "회의록",
    "content": "오늘 회의에서 논의된 내용...",
    "createdAt": "2025-04-29T09:00:00.000Z",
    "updatedAt": "2025-04-29T09:00:00.000Z"
  }
]
```

#### POST /api/notes - 새 메모 추가
**요청 body:**
```json
{
  "title": "새 메모",
  "content": "메모 내용입니다."
}
```

**성공 응답 (201 Created):**
```json
{
  "id": "2",
  "title": "새 메모",
  "content": "메모 내용입니다.",
  "createdAt": "2025-04-29T10:00:00.000Z",
  "updatedAt": "2025-04-29T10:00:00.000Z"
}
```

**실패 응답 (400 Bad Request):**
```json
{
  "error": "제목은 필수입니다"
}
```

#### GET /api/notes/[id] - 특정 메모 조회
**성공 응답 (200 OK):**
```json
{
  "id": "1",
  "title": "회의록",
  "content": "오늘 회의에서 논의된 내용...",
  "createdAt": "2025-04-29T09:00:00.000Z",
  "updatedAt": "2025-04-29T09:00:00.000Z"
}
```

**실패 응답 (404 Not Found):**
```json
{
  "error": "메모를 찾을 수 없습니다"
}
```

#### PUT /api/notes/[id] - 수정
**요청 body:**
```json
{
  "title": "수정된 제목",
  "content": "수정된 내용"
}
```

**성공 응답 (200 OK):**
```json
{
  "id": "1",
  "title": "수정된 제목",
  "content": "수정된 내용",
  "createdAt": "2025-04-29T09:00:00.000Z",
  "updatedAt": "2025-04-29T11:00:00.000Z"
}
```

#### DELETE /api/notes/[id] - 삭제
**성공 응답 (200 OK):**
```json
{
  "message": "메모가 삭제되었습니다"
}
```

### 힌트
- `params.id`로 동적 라우트 파라미터를 가져옵니다.
- PUT 요청에서 `updatedAt`을 현재 시간으로 갱신하세요.
- `title`과 `content` 중 하나만 보내도 수정이 가능하도록 하세요.
- DELETE 후에는 메모리 배열에서 해당 항목을 제거합니다.
- `crypto.randomUUID()` 또는 증가하는 숫자로 ID를 생성할 수 있습니다.

---

## curl 테스트 예시

```bash
# 방명록 목록 조회
curl http://localhost:3000/api/guestbook

# 방명록 작성
curl -X POST http://localhost:3000/api/guestbook \
  -H "Content-Type: application/json" \
  -d '{"name": "홍길동", "message": "안녕하세요!"}'

# 도서 검색
curl "http://localhost:3000/api/search?q=javascript"

# 메모 전체 목록
curl http://localhost:3000/api/notes

# 메모 추가
curl -X POST http://localhost:3000/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title": "새 메모", "content": "내용입니다."}'

# 메모 조회
curl http://localhost:3000/api/notes/1

# 메모 수정
curl -X PUT http://localhost:3000/api/notes/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "수정된 제목", "content": "수정된 내용"}'

# 메모 삭제
curl -X DELETE http://localhost:3000/api/notes/1
```

## 참고 자료
- [Next.js 공식 문서 - Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Next.js 공식 문서 - NextRequest](https://nextjs.org/docs/app/api-reference/functions/next-request)
- [Next.js 공식 문서 - NextResponse](https://nextjs.org/docs/app/api-reference/functions/next-response)
- [MDN - Fetch API](https://developer.mozilla.org/ko/docs/Web/API/Fetch_API)
- [MDN - HTTP 상태 코드](https://developer.mozilla.org/ko/docs/Web/HTTP/Status)
