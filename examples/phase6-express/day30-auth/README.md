# Day 30 - 인증: JWT와 bcrypt

> **Phase 6: Express** | 학습일: 30일차

---

## 학습 목표

- JWT(JSON Web Token) 토큰 기반 인증을 구현한다
- bcrypt로 비밀번호를 안전하게 해싱한다
- 인증 미들웨어를 작성한다
- 회원가입/로그인 API를 구현한다
- RBAC(역할 기반 접근 제어)를 구현한다
- Rate Limiting으로 API를 보호한다

---

## 핵심 개념

### 1. JWT (JSON Web Token)

```
토큰 구조: header.payload.signature

Header:  { "alg": "HS256", "typ": "JWT" }
Payload: { "userId": 1, "email": "user@test.com" }
Signature: HMACSHA256(header + payload, secret)
```

```javascript
const jwt = require('jsonwebtoken');

// 토큰 발급
const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
  expiresIn: '24h',
});

// 토큰 검증
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

### 2. bcrypt — 비밀번호 해싱

```javascript
const bcrypt = require('bcrypt');

// 해싱 (회원가입)
const hashed = await bcrypt.hash('mypassword', 10);

// 검증 (로그인)
const isMatch = await bcrypt.compare('mypassword', hashed);
```

### 3. 인증 미들웨어

```javascript
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: '토큰 없음' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: '유효하지 않은 토큰' });
  }
}

// 사용: 인증이 필요한 라우트에 적용
router.get('/api/todos', authMiddleware, getTodos);
```

### 4. 인증 흐름

```
1. 회원가입: POST /api/auth/register → 비밀번호 해싱 → 토큰 반환
2. 로그인:   POST /api/auth/login → 비밀번호 비교 → 토큰 반환
3. API 호출: Authorization: Bearer <token> → 미들웨어 검증 → 본인 데이터만 반환
```

### 5. RBAC (역할 기반 접근 제어)

```javascript
function requireRole(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: '권한 없음' });
    }
    next();
  };
}

// admin만 접근 가능
router.delete('/users/:id', authMiddleware, requireRole('admin'), deleteUser);
```

### 6. Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15분
  max: 100,                   // 최대 100회
  message: { error: '요청이 너무 많습니다' },
});

app.use('/api/', limiter);
```

---

## 실습 파일

### starter/ (직접 구현)

| 파일 | 내용 |
|------|------|
| `src/middleware/auth.js` | JWT 인증 미들웨어 |
| `src/routes/auth.js` | 회원가입/로그인 라우트 |
| `src/routes/todos.js` | 인증 적용 할일 CRUD |
| `src/middleware/rbac.js` | 역할 기반 접근 제어 |
| `src/middleware/rateLimit.js` | Rate Limiting 설정 |
| `src/middleware/validation.js` | 입력 검증 미들웨어 |
| `src/routes/auth-refresh.js` | 토큰 갱신 (Refresh Token) |

### solution/ (완성 코드)

동일 구조의 완성된 코드

---

## 실행 방법

```bash
npm install
npm run db:migrate
npm run dev
```

```bash
# 회원가입
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@test.com","password":"password123"}'

# 로그인 → 토큰 받기
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123"}'

# 인증된 API 호출
curl http://localhost:3000/api/todos \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 정리

| 개념 | 핵심 |
|------|------|
| JWT | 토큰 기반 인증 (`jwt.sign`, `jwt.verify`) |
| bcrypt | 비밀번호 해싱 (`hash`, `compare`) |
| 인증 미들웨어 | `Authorization: Bearer <token>` 검증 |
| RBAC | 역할별 접근 제어 (`requireRole('admin')`) |
| Rate Limiting | API 호출 횟수 제한 (DDoS 방지) |
| Refresh Token | Access Token 만료 시 갱신 |

> **다음 시간**: Day 31 - API 문서 (Swagger)
