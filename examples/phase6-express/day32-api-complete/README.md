# Day 32 - 풀스택 완성: React + Express

> **Phase 6: Express** | 학습일: 32일차

---

## 학습 목표

- CORS(교차 출처 리소스 공유)를 이해하고 설정한다
- Vite 프록시로 개발 환경 CORS를 해결한다
- React에서 fetch/axios로 Express API를 호출한다
- AuthContext로 토큰과 사용자 정보를 전역 관리한다
- React + Express 풀스택 할일 앱을 완성한다

---

## 핵심 개념

### 1. CORS (교차 출처 리소스 공유)

```
프론트엔드: http://localhost:5173
백엔드:     http://localhost:3000
→ 다른 포트 = 다른 출처 = CORS 필요!
```

```javascript
// Express에서 CORS 허용
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173' }));
```

### 2. Vite 프록시

```typescript
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
});
// /api로 시작하는 요청 → 자동으로 백엔드로 전달
```

### 3. API 호출 함수

```typescript
// api/todos.ts
export async function fetchTodos(token: string) {
  const res = await fetch('/api/todos', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function createTodo(title: string, token: string) {
  const res = await fetch('/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  });
  return res.json();
}
```

### 4. AuthContext

```typescript
const { token, user, login, logout } = useAuth();

// 로그인 후 토큰을 localStorage에 저장
// API 호출 시 Authorization 헤더에 포함
// 새로고침 시 localStorage에서 복원
```

### 5. 풀스택 아키텍처

```
client/ (React + Vite)          server/ (Express + Prisma)
├── src/                         ├── src/
│   ├── api/        ←── fetch ──→│   ├── routes/
│   ├── context/                 │   ├── middleware/
│   ├── pages/                   │   └── swagger.js
│   └── components/              └── prisma/
```

---

## 실습 파일

### starter/ (직접 구현)

| 파일 | 내용 |
|------|------|
| `server/src/index.js` | Express 서버 (CORS 설정) |
| `server/src/routes/auth.js` | 인증 API |
| `server/src/routes/todos.js` | 할일 CRUD API |
| `client/vite.config.ts` | 프록시 설정 |
| `client/src/api/` | API 호출 함수 |
| `client/src/context/AuthContext.tsx` | 인증 상태 관리 |
| `client/src/pages/` | 로그인, 회원가입, 할일 페이지 |

### solution/ (완성 코드)

동일 구조의 완성된 코드

---

## 실행 방법

```bash
# 터미널 1: 서버
cd server && npm install && npm run db:migrate && npm run dev

# 터미널 2: 클라이언트
cd client && npm install && npm run dev
```

브라우저에서 `http://localhost:5173` 접속

---

## 정리

| 개념 | 핵심 |
|------|------|
| CORS | 다른 출처 간 리소스 공유 (`cors` 미들웨어) |
| Vite 프록시 | 개발 환경 CORS 우회 (`/api` → 백엔드) |
| fetch + token | `Authorization: Bearer <token>` 헤더 |
| AuthContext | 토큰/사용자 정보 전역 관리 |
| 풀스택 | React (프론트) + Express (백엔드) + Prisma (DB) |

> **축하합니다!** 32일간의 웹 풀스택 과정을 완료했습니다.
