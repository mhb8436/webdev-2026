# Day 27 - Express로 REST API 연습문제

## 연습 1: 메모 API

Express로 메모장 REST API를 만드세요.

### 요구사항

- `npm install express`로 Express를 설치하세요
- 포트 3000에서 서버를 실행하세요
- 메모 데이터는 메모리 배열에 저장하세요
- 각 메모는 `{ id, title, content, createdAt }` 형태입니다
- 다음 엔드포인트를 구현하세요:
  - `GET /api/memos` - 전체 메모 목록 반환
  - `POST /api/memos` - 새 메모 추가 (body에 title, content 전달)
  - `PUT /api/memos/:id` - 메모 수정 (body에 title, content 전달)
  - `DELETE /api/memos/:id` - 메모 삭제
- 적절한 HTTP 상태 코드를 반환하세요 (200, 201, 404 등)

### 힌트

- `express.json()` 미들웨어로 JSON body를 파싱하세요
- `req.params.id`로 URL 파라미터를 받으세요
- `req.body`로 요청 본문을 받으세요
- 존재하지 않는 메모에 대한 에러 처리를 하세요

---

## 연습 2: 미들웨어 연습

커스텀 미들웨어를 만들어 적용하세요.

### 요구사항

- 다음 3개의 미들웨어를 구현하세요:
  1. **요청 로깅 미들웨어**: 요청 메서드, URL, 요청 시간을 콘솔에 출력
     - 형식: `[2025-05-21 10:30:00] GET /api/memos`
  2. **요청 시간 측정 미들웨어**: 요청 처리 시간을 측정하여 응답 헤더 `X-Response-Time`에 추가
     - `res.on('finish', ...)` 이벤트를 활용하세요
  3. **에러 핸들링 미들웨어**: 에러 발생 시 JSON 형태로 에러 응답을 보내는 미들웨어
     - 형식: `{ "error": "에러 메시지", "status": 500 }`
- 간단한 라우트를 만들어 미들웨어가 동작하는지 확인하세요

### 힌트

- 미들웨어 함수는 `(req, res, next)` 형태입니다
- 에러 핸들링 미들웨어는 `(err, req, res, next)` 4개의 매개변수를 받습니다
- `Date.now()`로 시간을 측정하세요
- `res.on('finish', callback)`으로 응답 완료 이벤트를 감지하세요

---

## 연습 3: Router 분리

express.Router()를 사용하여 라우터를 별도 파일로 분리하세요.

### 요구사항

- 다음 파일 구조로 만드세요:
  ```
  practice/
  ├── app.js          (메인 서버)
  ├── routes/
  │   ├── users.js    (사용자 라우터)
  │   └── products.js (상품 라우터)
  ```
- `/api/users` 라우터 (users.js):
  - `GET /api/users` - 사용자 목록
  - `POST /api/users` - 사용자 추가
  - `GET /api/users/:id` - 사용자 조회
  - `DELETE /api/users/:id` - 사용자 삭제
- `/api/products` 라우터 (products.js):
  - `GET /api/products` - 상품 목록
  - `POST /api/products` - 상품 추가
  - `GET /api/products/:id` - 상품 조회
  - `DELETE /api/products/:id` - 상품 삭제
- 각 라우터에 초기 샘플 데이터 2~3개를 넣으세요

### 힌트

- `express.Router()`로 라우터 인스턴스를 생성하세요
- `module.exports = router`로 라우터를 내보내세요
- `app.use('/api/users', usersRouter)`로 라우터를 연결하세요
- 라우터 파일 내에서는 `/` 기준으로 경로를 정의하세요 (접두사는 app.use에서 설정)
