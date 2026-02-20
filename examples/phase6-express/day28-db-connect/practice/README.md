# Day 28 - 데이터베이스 연동 (SQLite) 연습문제

## 연습 1: 게시판 API + DB

SQLite로 게시판 CRUD API를 구현하세요.

### 요구사항

- `npm install express better-sqlite3`로 패키지를 설치하세요
- 포트 3000에서 서버를 실행하세요
- `posts` 테이블을 생성하세요:
  - `id` - INTEGER PRIMARY KEY AUTOINCREMENT
  - `title` - TEXT NOT NULL
  - `content` - TEXT NOT NULL
  - `author` - TEXT NOT NULL
  - `created_at` - TEXT DEFAULT (datetime('now', 'localtime'))
- 다음 엔드포인트를 구현하세요:
  - `GET /api/posts` - 전체 게시글 목록 (최신순 정렬)
  - `GET /api/posts/:id` - 특정 게시글 조회
  - `POST /api/posts` - 게시글 작성 (body에 title, content, author 전달)
  - `PUT /api/posts/:id` - 게시글 수정
  - `DELETE /api/posts/:id` - 게시글 삭제
- 샘플 데이터 3~5개를 초기 삽입하세요

### 힌트

- `new Database('posts.db')`로 데이터베이스를 생성하세요
- `db.prepare(sql).run(params)`으로 INSERT, UPDATE, DELETE를 실행하세요
- `db.prepare(sql).all()`로 여러 행을 조회하세요
- `db.prepare(sql).get(id)`로 단일 행을 조회하세요

---

## 연습 2: 검색 기능

SQLite의 LIKE를 활용하여 게시글 검색 기능을 구현하세요.

### 요구사항

- 연습 1의 게시판 API에 검색 엔드포인트를 추가하세요
- `GET /api/posts/search?q=키워드` 엔드포인트를 만드세요
- 제목(`title`) 또는 내용(`content`)에서 키워드를 검색하세요
- SQL의 `WHERE title LIKE '%키워드%' OR content LIKE '%키워드%'`를 사용하세요
- 검색 결과가 없으면 빈 배열 `[]`을 반환하세요
- 검색어가 없으면 400 에러를 반환하세요

### 힌트

- `req.query.q`로 쿼리 파라미터를 받으세요
- LIKE 쿼리에서 `%`는 와일드카드입니다
- prepared statement에서 `?`를 사용하여 SQL 인젝션을 방지하세요
- 검색어를 `%${keyword}%` 형태로 만들어 전달하세요

---

## 연습 3: 페이지네이션

게시글 목록에 페이지네이션을 구현하세요.

### 요구사항

- `GET /api/posts?page=1&limit=10` 형태로 페이지네이션을 구현하세요
- 기본값: page=1, limit=10
- SQL의 `LIMIT`과 `OFFSET`을 활용하세요
- 응답 형식:
  ```json
  {
    "data": [...게시글 배열],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalCount": 48,
      "limit": 10,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
  ```
- 총 게시글 수(`COUNT(*)`)를 조회하여 총 페이지 수를 계산하세요
- 테스트를 위해 게시글 25개 이상을 초기 삽입하세요

### 힌트

- `OFFSET = (page - 1) * limit`으로 계산하세요
- `Math.ceil(totalCount / limit)`로 총 페이지 수를 계산하세요
- `parseInt(req.query.page) || 1`로 기본값을 설정하세요
- `SELECT COUNT(*) as count FROM posts`로 총 개수를 조회하세요
