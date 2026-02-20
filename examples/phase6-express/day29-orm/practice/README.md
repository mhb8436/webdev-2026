# Day 29 - ORM (Prisma) 연습 문제

## 사전 준비

```bash
npm init -y
npm install express @prisma/client
npm install -D prisma
npx prisma init
```

`schema.prisma` 파일을 프로젝트에 맞게 설정한 후:

```bash
npx prisma migrate dev --name init
```

---

## 문제 1: 블로그 ORM

Prisma를 사용하여 블로그 게시글 CRUD API를 만드세요.

### 요구사항

- **Post 모델 정의**: `id`(Int, 자동증가), `title`(String), `content`(String), `published`(Boolean, 기본값 false), `authorName`(String), `createdAt`(DateTime, 기본값 now()), `updatedAt`(DateTime, 자동 업데이트)
- **API 엔드포인트**:
  - `POST /api/posts` - 새 게시글 작성 (`title`, `content`, `authorName` 전달)
  - `GET /api/posts` - 전체 게시글 목록 조회
  - `GET /api/posts/:id` - 특정 게시글 상세 조회
  - `PUT /api/posts/:id` - 게시글 수정 (`title`, `content`, `published` 변경 가능)
  - `DELETE /api/posts/:id` - 게시글 삭제
- Prisma Client의 `create`, `findMany`, `findUnique`, `update`, `delete` 메서드를 사용하세요.

### 예상 결과

```
POST /api/posts
Body: { "title": "첫 글", "content": "안녕하세요!", "authorName": "홍길동" }
응답: { "id": 1, "title": "첫 글", "content": "안녕하세요!", "published": false, "authorName": "홍길동", ... }

GET /api/posts
응답: [{ "id": 1, "title": "첫 글", ... }, ...]

PUT /api/posts/1
Body: { "published": true }
응답: { "id": 1, "title": "첫 글", "published": true, ... }

DELETE /api/posts/1
응답: { "message": "게시글이 삭제되었습니다." }
```

---

## 문제 2: 관계 설정

User와 Post 모델을 1:N 관계로 정의하고, 사용자와 게시글을 연결하는 API를 만드세요.

### 요구사항

- **User 모델**: `id`(Int, 자동증가), `name`(String), `email`(String, unique)
- **Post 모델**: `id`(Int, 자동증가), `title`(String), `content`(String), `authorId`(Int, User와 외래키 관계)
- User와 Post는 1:N 관계 (한 사용자가 여러 글을 작성)
- **API 엔드포인트**:
  - `POST /api/users` - 사용자 생성
  - `GET /api/users` - 사용자 목록 조회 (작성한 글 포함)
  - `GET /api/users/:id/posts` - 특정 사용자의 글 목록 조회
  - `POST /api/users/:id/posts` - 특정 사용자로 글 작성
- `include`를 사용하여 관계 데이터를 함께 조회하세요.

### 예상 결과

```
POST /api/users
Body: { "name": "김영희", "email": "kim@example.com" }
응답: { "id": 1, "name": "김영희", "email": "kim@example.com" }

POST /api/users/1/posts
Body: { "title": "첫 번째 글", "content": "내용입니다." }
응답: { "id": 1, "title": "첫 번째 글", "content": "내용입니다.", "authorId": 1 }

GET /api/users
응답: [{ "id": 1, "name": "김영희", "email": "kim@example.com", "posts": [{ ... }] }]

GET /api/users/1/posts
응답: [{ "id": 1, "title": "첫 번째 글", "content": "내용입니다.", "authorId": 1 }]
```

---

## 문제 3: Prisma 쿼리 연습

Prisma의 다양한 쿼리 기능을 활용하는 API 엔드포인트를 만드세요.

### 요구사항

Product 모델을 사용합니다: `id`(Int), `name`(String), `price`(Int), `category`(String), `inStock`(Boolean), `createdAt`(DateTime)

- **조건 검색 (where)**: `GET /api/products/search?category=전자기기&minPrice=10000&maxPrice=50000`
  - `category`로 필터링하고, `price`가 `minPrice` 이상 `maxPrice` 이하인 상품을 검색
- **정렬 (orderBy)**: `GET /api/products?sort=price&order=asc`
  - 쿼리 파라미터로 정렬 기준(`sort`)과 방향(`order`: asc/desc)을 받아 정렬
- **페이지네이션 (skip/take)**: `GET /api/products?page=1&limit=10`
  - `page`와 `limit`로 페이지네이션을 구현하고, 전체 개수도 함께 반환
- **관계 포함 (include)**: `GET /api/products/:id?includeCategory=true`
  - 쿼리 파라미터에 따라 관계 데이터를 포함하여 조회 (Category 모델이 있다고 가정)
- **필드 선택 (select)**: `GET /api/products/names`
  - `id`와 `name` 필드만 선택하여 반환

### 예상 결과

```
GET /api/products/search?category=전자기기&minPrice=10000&maxPrice=50000
응답: [{ "id": 1, "name": "무선 마우스", "price": 25000, "category": "전자기기", ... }]

GET /api/products?sort=price&order=asc
응답: [가격 오름차순으로 정렬된 상품 목록]

GET /api/products?page=2&limit=5
응답: { "data": [...], "total": 50, "page": 2, "limit": 5, "totalPages": 10 }

GET /api/products/names
응답: [{ "id": 1, "name": "무선 마우스" }, { "id": 2, "name": "키보드" }, ...]
```
