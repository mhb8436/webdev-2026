# Day 24 - Node.js 첫 서버, http 모듈 연습문제

## 연습 1: 시간 서버

http 모듈을 사용하여 현재 시간을 JSON으로 반환하는 서버를 만드세요.

### 요구사항

- 포트 3000에서 서버를 실행하세요
- 모든 요청에 대해 JSON 형태로 현재 시간을 응답하세요
- 응답 형식: `{ "time": "2025-05-18T10:30:00", "message": "현재 시간입니다" }`
- Content-Type을 `application/json`으로 설정하세요
- 상태 코드 200을 반환하세요

### 힌트

- `new Date().toISOString()`으로 ISO 형식 시간 문자열을 얻을 수 있습니다
- `JSON.stringify()`로 객체를 JSON 문자열로 변환하세요
- `res.writeHead()`로 상태 코드와 헤더를 설정하세요

---

## 연습 2: 간단한 라우터

URL 경로에 따라 다른 응답을 보내는 서버를 만드세요.

### 요구사항

- 포트 3000에서 서버를 실행하세요
- Content-Type을 `text/html; charset=utf-8`로 설정하세요
- 라우팅 규칙:
  - `/` → `<h1>홈페이지</h1><p>환영합니다!</p>` (상태 코드 200)
  - `/about` → `<h1>소개</h1><p>Node.js 학습 중입니다.</p>` (상태 코드 200)
  - `/contact` → `<h1>연락처</h1><p>이메일: test@example.com</p>` (상태 코드 200)
  - 그 외 경로 → `<h1>404</h1><p>페이지를 찾을 수 없습니다.</p>` (상태 코드 404)

### 힌트

- `req.url`로 요청 URL 경로를 확인할 수 있습니다
- `if/else` 또는 `switch` 문으로 라우팅을 구현하세요

---

## 연습 3: JSON API 서버

학생 데이터를 메모리에 저장하고, API 요청에 JSON 배열로 응답하는 서버를 만드세요.

### 요구사항

- 포트 3000에서 서버를 실행하세요
- 초기 학생 데이터 3명을 배열에 저장하세요 (id, name, grade 필드)
- `GET /api/students` → 전체 학생 목록을 JSON 배열로 응답
- `GET /api/students/1` → id가 1인 학생 정보를 JSON으로 응답
- 존재하지 않는 학생 id → `{ "error": "학생을 찾을 수 없습니다" }` (상태 코드 404)
- Content-Type을 `application/json; charset=utf-8`로 설정하세요

### 힌트

- `req.url.startsWith()`로 URL 경로를 분기하세요
- `req.url.split('/')`로 URL에서 id를 추출할 수 있습니다
- `Array.find()`로 특정 학생을 찾으세요
