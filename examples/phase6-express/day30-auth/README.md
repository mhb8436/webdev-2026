# Day 30 - 로그인 기능 추가 (5/27)

## 학습 목표

- **JWT(JSON Web Token)**: 토큰 기반 인증의 원리와 구조 이해
- **bcrypt**: 비밀번호 해싱과 안전한 저장 방법
- **인증 미들웨어**: Express에서 요청마다 토큰을 검증하는 방법
- **토큰 발급/검증**: JWT 토큰 생성과 검증 흐름
- **회원가입/로그인**: 사용자 등록과 인증 API 구현

## 문제 정의

> "회원가입/로그인으로 내 할일만 볼 수 있게 하자"

지금까지 만든 Todo API는 누구나 모든 할일을 볼 수 있습니다.
실제 서비스에서는 사용자별로 자신의 할일만 관리할 수 있어야 합니다.
오늘은 회원가입과 로그인 기능을 추가하고, 인증된 사용자만 자신의 할일에 접근할 수 있도록 만들겠습니다.

## 핵심 개념

### 1. JWT (JSON Web Token)

```
토큰 구조: header.payload.signature

Header:  { "alg": "HS256", "typ": "JWT" }
Payload: { "userId": 1, "email": "user@test.com", "iat": 1234567890 }
Signature: HMACSHA256(base64(header) + "." + base64(payload), secret)
```

JWT는 서버가 클라이언트에게 발급하는 "신분증" 같은 것입니다.
클라이언트는 이 토큰을 매 요청마다 함께 보내서 자신이 누구인지 증명합니다.

### 2. bcrypt - 비밀번호 해싱

```javascript
// 비밀번호를 절대 평문으로 저장하지 않음!
const hashed = await bcrypt.hash('mypassword', 10); // salt rounds: 10
// 결과: $2b$10$N9qo8uLOickgx2ZMRZoMye...

// 비밀번호 검증
const isMatch = await bcrypt.compare('mypassword', hashed); // true
```

### 3. 인증 흐름

```
1. 회원가입: POST /api/auth/register → 비밀번호 해싱 후 저장 → 토큰 반환
2. 로그인:   POST /api/auth/login → 비밀번호 비교 → 토큰 반환
3. API 호출: GET /api/todos + Authorization: Bearer <token> → 미들웨어에서 검증 → 본인 데이터만 반환
```

## 실습 단계

### Step 1: User 모델 추가

`prisma/schema.prisma`에서 User 모델의 주석을 해제하고 Todo와의 관계를 설정하세요.

### Step 2: 인증 미들웨어 구현

`src/middleware/auth.js`에서 JWT 토큰을 검증하는 미들웨어를 완성하세요.

### Step 3: 회원가입/로그인 라우트 구현

`src/routes/auth.js`에서 register와 login 엔드포인트를 완성하세요.

### Step 4: Todo 라우트에 인증 적용

`src/routes/todos.js`에서 인증 미들웨어를 적용하고, userId로 필터링하세요.

## 실행 방법

```bash
npm install
npm run db:migrate
npm run dev
```

## API 테스트

```bash
# 회원가입
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@test.com","password":"password123"}'

# 로그인
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123"}'

# 인증이 필요한 할일 조회 (토큰 필요)
curl http://localhost:3000/api/todos \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# 할일 생성 (토큰 필요)
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"title":"공부하기","priority":"high"}'
```

## 체크리스트

- [ ] User 모델을 Prisma 스키마에 추가했는가?
- [ ] bcrypt로 비밀번호를 해싱하여 저장하는가?
- [ ] JWT 토큰을 발급하고 검증하는가?
- [ ] 인증 미들웨어가 올바르게 동작하는가?
- [ ] 인증된 사용자만 자신의 할일에 접근할 수 있는가?
- [ ] 에러 처리가 적절한가? (중복 이메일, 잘못된 비밀번호 등)

## 다음 단계

Day 31에서는 Swagger를 사용하여 API 문서를 자동 생성하는 방법을 배웁니다.
