# Day 26 - npm 패키지 활용

> **Phase 6: Express** | 학습일: 26일차

---

## 학습 목표

- `npm init`으로 프로젝트를 초기화하고 `package.json` 구조를 이해한다
- `npm install`로 패키지를 설치하고 사용한다
- `dotenv`로 환경 변수를 관리한다
- `uuid`로 고유 ID를 생성한다
- `nodemon`으로 개발 효율을 높인다
- `scripts` 필드로 명령어를 등록한다

---

## 핵심 개념

### 1. package.json

```json
{
  "name": "todo-server",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "dotenv": "^16.4.0",
    "uuid": "^9.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.0"
  }
}
```

### 2. dotenv — 환경 변수 관리

```
# .env
PORT=3000
DATA_DIR=./data
DB_HOST=localhost
```

```javascript
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const DATA_DIR = process.env.DATA_DIR || './data';
```

### 3. uuid — 고유 ID 생성

```javascript
const { v4: uuidv4 } = require('uuid');
const id = uuidv4();
// "550e8400-e29b-41d4-a716-446655440000"
```

### 4. nodemon — 자동 재시작

```bash
npm install --save-dev nodemon

# scripts에 등록
"dev": "nodemon server.js"

# 실행
npm run dev  # 파일 변경 시 자동 재시작
```

---

## 실습 파일

### starter/ (직접 구현)

| 파일 | 내용 |
|------|------|
| `package.json` | 패키지 설정 |
| `.env` | 환경 변수 (PORT, DATA_DIR) |
| `server.js` | dotenv + uuid 적용 서버 |
| `02_dotenv.js` | dotenv 상세 활용 연습 |

### solution/ (완성 코드)

| 파일 | 내용 |
|------|------|
| `package.json` | 완성된 패키지 설정 |
| `.env` | 환경 변수 |
| `server.js` | dotenv + uuid 적용 완성 |
| `02_dotenv.js` | 환경 변수 활용 예제 |

---

## 실행 방법

```bash
npm install
npm run dev
```

```bash
# 할일 추가 (UUID가 id로 사용됨)
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "npm 패키지 공부하기"}'
```

---

## 정리

| 개념 | 핵심 |
|------|------|
| npm init | `package.json` 생성 (프로젝트 초기화) |
| npm install | 패키지 설치 (`dependencies`에 기록) |
| scripts | `npm start`, `npm run dev` 명령어 등록 |
| dotenv | `.env` 파일 → `process.env`로 접근 |
| uuid | 충돌 없는 고유 ID 생성 (`uuidv4()`) |
| nodemon | 파일 변경 감지 → 자동 재시작 |

> **다음 시간**: Day 27 - Express 서버
