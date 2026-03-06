# Day 27 - Express 서버

> **Phase 6: Express** | 학습일: 27일차

---

## 학습 목표

- Express 프레임워크를 설치하고 기본 구조를 이해한다
- `app.get()`, `app.post()` 등 라우트를 설정한다
- 미들웨어 개념을 이해한다 (`cors`, `express.json()`)
- Router로 라우트를 분리한다
- MVC 패턴과 서비스 레이어를 이해한다

---

## 핵심 개념

### 1. Express 기본 구조

```javascript
const express = require('express');
const app = express();

app.use(express.json());  // JSON body 파싱 미들웨어

app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.listen(3000, () => console.log('서버 실행 중'));
```

### 2. 미들웨어 (Middleware)

```
요청 → [cors] → [express.json()] → [로깅] → [라우트 핸들러] → 응답
```

```javascript
// 커스텀 로깅 미들웨어
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();  // 다음 미들웨어로 전달
});
```

### 3. Router 분리

```javascript
// routes/todos.js
const router = express.Router();
router.get('/', (req, res) => { ... });
router.post('/', (req, res) => { ... });
router.put('/:id', (req, res) => { ... });
router.delete('/:id', (req, res) => { ... });
module.exports = router;

// index.js
app.use('/api/todos', require('./routes/todos'));
```

### 4. 라우팅 패턴

```javascript
// 경로 파라미터
app.get('/api/todos/:id', (req, res) => {
  const { id } = req.params;
});

// 쿼리 스트링
app.get('/api/todos', (req, res) => {
  const { done, page, limit } = req.query;
});

// 라우트 체이닝
router.route('/:id')
  .get(getById)
  .put(update)
  .delete(remove);
```

### 5. REST API 설계

| 메서드 | 경로 | 설명 | 상태코드 |
|--------|------|------|----------|
| GET | /api/todos | 목록 조회 | 200 |
| GET | /api/todos/:id | 상세 조회 | 200/404 |
| POST | /api/todos | 추가 | 201 |
| PUT | /api/todos/:id | 수정 | 200/404 |
| DELETE | /api/todos/:id | 삭제 | 204/404 |

---

## 실습 파일

### starter/ (직접 구현)

| 파일 | 내용 |
|------|------|
| `src/index.js` | Express 서버 진입점 |
| `src/routes/todos.js` | 할일 CRUD 라우터 |
| `src/02_routing.js` | 라우팅 패턴 연습 (params, query, Router) |
| `src/03_middleware.js` | 미들웨어 작성 연습 |
| `src/05_mvc_pattern.js` | MVC 패턴 구현 |
| `src/06_service_layer.js` | 서비스 레이어 패턴 |

### solution/ (완성 코드)

| 파일 | 내용 |
|------|------|
| `src/index.js` | 완성된 Express 서버 |
| `src/routes/todos.js` | 완성된 CRUD 라우터 |
| `src/02_routing.js` | 라우팅 패턴 예제 |
| `src/03_middleware.js` | 미들웨어 예제 |
| `src/05_mvc_pattern.js` | MVC 패턴 예제 |
| `src/06_service_layer.js` | 서비스 레이어 예제 |

---

## 실행 방법

```bash
npm install && npm run dev
```

```bash
# 할일 CRUD 테스트
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Express 배우기"}'

curl http://localhost:3000/api/todos
```

---

## 정리

| 개념 | 핵심 |
|------|------|
| Express | Node.js 웹 프레임워크 (간결한 라우팅) |
| 미들웨어 | 요청→응답 사이 실행되는 함수 (`next()`) |
| Router | 라우트를 파일로 분리 (`express.Router()`) |
| req.params | URL 파라미터 (`:id`) |
| req.query | 쿼리 스트링 (`?done=true`) |
| MVC | Model-View-Controller 패턴 |

> **다음 시간**: Day 28 - 데이터베이스 연동
