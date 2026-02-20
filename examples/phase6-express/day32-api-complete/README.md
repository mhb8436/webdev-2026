# Day 32 - 프론트엔드 연동 완성 (5/29~6/1)

## 학습 목표

- **CORS**: 교차 출처 리소스 공유의 개념과 설정
- **fetch/axios**: 브라우저에서 API 호출하는 방법
- **프록시**: 개발 환경에서 CORS 우회를 위한 프록시 설정
- **환경변수**: 클라이언트/서버의 환경변수 관리
- **풀스택 아키텍처**: React + Express 풀스택 앱 구조

## 문제 정의

> "React 프론트엔드와 Express 백엔드를 연동해서 풀스택 앱을 완성하자"

지금까지 만든 Express API 서버와 React 프론트엔드를 연동하여
실제로 동작하는 풀스택 할일 관리 앱을 완성합니다.

## 핵심 개념

### 1. CORS (교차 출처 리소스 공유)

브라우저는 보안상 다른 도메인의 API를 직접 호출할 수 없습니다.

```
프론트엔드: http://localhost:5173
백엔드:     http://localhost:3000
→ 다른 포트 = 다른 출처 = CORS 필요!
```

### 2. Vite 프록시 설정

개발 환경에서는 Vite 프록시로 CORS 문제를 간단히 해결합니다.

```typescript
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
});
// /api로 시작하는 요청은 자동으로 백엔드로 전달됨
```

### 3. 인증 컨텍스트 (AuthContext)

React Context를 사용하여 토큰과 사용자 정보를 전역으로 관리합니다.

```typescript
// 로그인 후 토큰을 저장하고, API 호출 시 헤더에 포함
const { token, login, logout } = useAuth();
```

### 4. 풀스택 아키텍처

```
client/ (React + Vite)          server/ (Express + Prisma)
├── src/                         ├── src/
│   ├── api/        ←── fetch ──→│   ├── routes/
│   ├── context/                 │   ├── middleware/
│   ├── pages/                   │   └── swagger.js
│   └── components/              └── prisma/
```

## 프로젝트 구조

```
day32-api-complete/
├── starter/
│   ├── server/          ← Express 백엔드
│   │   ├── package.json
│   │   ├── .env
│   │   ├── prisma/
│   │   └── src/
│   └── client/          ← React 프론트엔드
│       ├── package.json
│       ├── vite.config.ts
│       └── src/
└── solution/
    ├── server/
    └── client/
```

## 실습 단계

### Step 1: 서버 설정 확인

서버는 Day 31의 솔루션을 그대로 사용합니다. 먼저 서버를 실행해보세요.

```bash
cd server
npm install
npm run db:migrate
npm run dev
```

### Step 2: API 호출 함수 작성

`client/src/api/` 폴더에 인증과 할일 API 호출 함수를 작성하세요.

### Step 3: AuthContext 구현

`client/src/context/AuthContext.tsx`에서 토큰 관리 컨텍스트를 만드세요.

### Step 4: 페이지 컴포넌트 구현

로그인, 회원가입, 할일 목록 페이지를 만드세요.

### Step 5: 라우팅과 보호된 라우트

인증되지 않은 사용자는 로그인 페이지로 리다이렉트되도록 설정하세요.

## 실행 방법

```bash
# 터미널 1: 서버 실행
cd server
npm install
npm run db:migrate
npm run dev

# 터미널 2: 클라이언트 실행
cd client
npm install
npm run dev
```

브라우저에서 `http://localhost:5173`에 접속하세요.

## 체크리스트

- [ ] 서버와 클라이언트가 각각 실행되는가?
- [ ] Vite 프록시를 통해 API 호출이 되는가?
- [ ] 회원가입 후 자동 로그인되는가?
- [ ] 로그인/로그아웃이 정상 동작하는가?
- [ ] 할일 CRUD가 모두 동작하는가?
- [ ] 새로고침해도 로그인 상태가 유지되는가?
- [ ] 인증되지 않은 사용자는 로그인 페이지로 이동하는가?

## 축하합니다!

Phase 6를 완료했습니다! 이제 여러분은 풀스택 웹 앱을 만들 수 있습니다.

- 백엔드: Express + Prisma + JWT 인증 + Swagger 문서
- 프론트엔드: React + TypeScript + Context API + React Router
- 연동: CORS + Vite 프록시 + fetch API
