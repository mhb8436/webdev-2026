# Day 32 - 프론트엔드 연동 완성 연습 문제

## 사전 준비

```bash
npm init -y
npm install express cors dotenv
```

---

## 문제 1: CORS 이해하기

Express 서버에 cors 미들웨어를 다양한 방식으로 설정하세요.

### 요구사항

- **기본 CORS 설정**: 모든 origin을 허용하는 기본 설정
- **특정 origin만 허용**: `http://localhost:5173`과 `http://localhost:3001`만 허용하는 설정
- **특정 HTTP 메서드만 허용**: GET, POST만 허용하는 설정 (PUT, DELETE는 차단)
- **커스텀 헤더 허용**: `Authorization`, `Content-Type` 헤더를 허용
- **인증 정보 포함**: `credentials: true` 설정으로 쿠키 전송 허용
- CORS가 무엇이고 왜 필요한지를 코드 주석으로 설명하세요
- 테스트용 API 엔드포인트를 만들어 각 설정의 효과를 확인할 수 있게 하세요

### 예상 결과

```
GET /api/test
-> 허용된 origin에서 요청 시: 정상 응답
-> 허용되지 않은 origin에서 요청 시: CORS 에러

OPTIONS /api/test (preflight 요청)
-> 응답 헤더에 Access-Control-Allow-Origin, Access-Control-Allow-Methods 등이 포함됨
```

---

## 문제 2: API 클라이언트

fetch를 사용하여 Express 서버의 책(Book) API와 통신하는 클라이언트 코드를 작성하세요.

### 요구사항

- **서버 (server.js)**:
  - 메모리 배열에 책 데이터 저장: `id`, `title`, `author`, `year`
  - `GET /api/books` - 전체 책 목록 조회
  - `POST /api/books` - 새 책 추가
  - `PUT /api/books/:id` - 책 정보 수정
  - `DELETE /api/books/:id` - 책 삭제
- **클라이언트 (client.js)**:
  - `getBooks()` - GET 요청으로 책 목록 조회
  - `createBook(bookData)` - POST 요청으로 책 추가
  - `updateBook(id, bookData)` - PUT 요청으로 책 수정
  - `deleteBook(id)` - DELETE 요청으로 책 삭제
  - 모든 함수에서 에러 핸들링 (try/catch)
  - 응답 상태 코드 검사 (`response.ok`)
  - `Content-Type: application/json` 헤더 설정
  - `main()` 함수에서 각 API 호출을 순서대로 테스트

### 예상 결과

```
=== 책 API 클라이언트 테스트 ===

[책 추가]
{ id: 1, title: "JavaScript 완벽 가이드", author: "David Flanagan", year: 2020 }

[전체 목록 조회]
[ { id: 1, title: "JavaScript 완벽 가이드", ... } ]

[책 수정]
{ id: 1, title: "JavaScript 완벽 가이드 (7판)", author: "David Flanagan", year: 2020 }

[책 삭제]
{ message: "책이 삭제되었습니다." }
```

---

## 문제 3: 환경별 설정

development와 production 환경에 따라 다른 설정을 사용하는 구조를 만드세요.

### 요구사항

- **환경 파일 분리**:
  - `.env.development`: 개발 환경 설정
    - `PORT=3000`
    - `API_URL=http://localhost:3000`
    - `LOG_LEVEL=debug`
    - `CORS_ORIGIN=http://localhost:5173`
  - `.env.production`: 프로덕션 환경 설정
    - `PORT=8080`
    - `API_URL=https://api.myapp.com`
    - `LOG_LEVEL=error`
    - `CORS_ORIGIN=https://myapp.com`
- **설정 모듈 (config.js)**:
  - `NODE_ENV`에 따라 적절한 `.env` 파일 로드
  - 설정값을 객체로 내보내기
- **서버 적용 (server.js)**:
  - config 모듈에서 설정을 가져와 서버에 적용
  - PORT, CORS_ORIGIN, LOG_LEVEL을 환경에 따라 다르게 사용
  - 로그 미들웨어: development에서는 상세 로그, production에서는 에러만 출력
- **실행 방법**:
  - 개발: `NODE_ENV=development node server.js`
  - 프로덕션: `NODE_ENV=production node server.js`

### 예상 결과

```
# 개발 환경
NODE_ENV=development node server.js
-> [개발 모드] 서버가 http://localhost:3000 에서 실행 중
-> CORS 허용 origin: http://localhost:5173
-> 로그 레벨: debug
-> 모든 요청 상세 로그 출력

# 프로덕션 환경
NODE_ENV=production node server.js
-> [프로덕션 모드] 서버가 http://localhost:8080 에서 실행 중
-> CORS 허용 origin: https://myapp.com
-> 로그 레벨: error
-> 에러 요청만 로그 출력
```
