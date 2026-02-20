# Day 30 - JWT 인증 연습 문제

## 사전 준비

```bash
npm init -y
npm install express jsonwebtoken bcryptjs
```

---

## 문제 1: 회원가입/로그인 API

bcrypt로 비밀번호를 해싱하여 저장하고, 로그인 시 JWT 토큰을 발급하는 API를 만드세요.

### 요구사항

- 데이터는 메모리 배열(`users`)에 저장
- **POST /api/auth/register**: 회원가입
  - `username`, `email`, `password`를 받아 사용자 생성
  - 비밀번호는 `bcrypt.hash()`로 해싱하여 저장 (saltRounds: 10)
  - 이미 존재하는 email이면 409 상태코드와 에러 메시지 반환
  - 성공 시 사용자 정보 반환 (비밀번호 제외)
- **POST /api/auth/login**: 로그인
  - `email`, `password`를 받아 인증
  - `bcrypt.compare()`로 비밀번호 검증
  - 성공 시 JWT 토큰 발급 (`jwt.sign()`)
  - 토큰 payload에 `id`, `username`, `email`, `role` 포함
  - 토큰 만료 시간: 1시간

### 예상 결과

```
POST /api/auth/register
Body: { "username": "홍길동", "email": "hong@example.com", "password": "password123" }
응답: { "id": 1, "username": "홍길동", "email": "hong@example.com" }

POST /api/auth/login
Body: { "email": "hong@example.com", "password": "password123" }
응답: { "token": "eyJhbGciOiJIUzI1NiIs...", "user": { "id": 1, "username": "홍길동" } }

POST /api/auth/login
Body: { "email": "hong@example.com", "password": "wrongpassword" }
응답: (401) { "error": "비밀번호가 일치하지 않습니다." }
```

---

## 문제 2: 인증 미들웨어

Authorization 헤더에서 Bearer 토큰을 추출하고 검증하는 미들웨어를 만드세요.

### 요구사항

- **authMiddleware 함수**:
  - `Authorization` 헤더에서 `Bearer <token>` 형식의 토큰 추출
  - `jwt.verify()`로 토큰 검증
  - 유효한 토큰이면 `req.user`에 디코딩된 사용자 정보 저장 후 `next()` 호출
  - 토큰이 없으면 401 상태코드: `"인증 토큰이 필요합니다."`
  - 토큰이 유효하지 않으면 401 상태코드: `"유효하지 않은 토큰입니다."`
- **GET /api/profile**: 인증된 사용자만 접근 가능
  - `authMiddleware`를 적용
  - `req.user`의 정보를 반환

### 예상 결과

```
GET /api/profile
Headers: { "Authorization": "Bearer eyJhbGciOi..." }
응답: { "id": 1, "username": "홍길동", "email": "hong@example.com" }

GET /api/profile
Headers: {} (토큰 없음)
응답: (401) { "error": "인증 토큰이 필요합니다." }

GET /api/profile
Headers: { "Authorization": "Bearer invalidtoken" }
응답: (401) { "error": "유효하지 않은 토큰입니다." }
```

---

## 문제 3: 역할 기반 접근 제어

사용자에 역할(role)을 추가하고, 특정 역할만 접근 가능한 API를 만드세요.

### 요구사항

- 사용자 데이터에 `role` 필드 추가 (기본값: `'user'`, 가능한 값: `'user'`, `'admin'`)
- **roleMiddleware(requiredRole)**: 역할 검사 미들웨어
  - `req.user.role`이 `requiredRole`과 일치하는지 확인
  - 일치하지 않으면 403 상태코드: `"접근 권한이 없습니다."`
  - 이 미들웨어는 `authMiddleware` 다음에 사용
- **GET /api/admin/users**: admin만 접근 가능
  - `authMiddleware`와 `roleMiddleware('admin')`을 순서대로 적용
  - 모든 사용자 목록 반환 (비밀번호 제외)
- **DELETE /api/admin/users/:id**: admin만 접근 가능
  - 특정 사용자 삭제

### 예상 결과

```
// 일반 사용자로 로그인 후
GET /api/admin/users
Headers: { "Authorization": "Bearer <user_token>" }
응답: (403) { "error": "접근 권한이 없습니다." }

// admin으로 로그인 후
GET /api/admin/users
Headers: { "Authorization": "Bearer <admin_token>" }
응답: [{ "id": 1, "username": "관리자", "email": "admin@example.com", "role": "admin" }, ...]

DELETE /api/admin/users/2
Headers: { "Authorization": "Bearer <admin_token>" }
응답: { "message": "사용자가 삭제되었습니다." }
```
