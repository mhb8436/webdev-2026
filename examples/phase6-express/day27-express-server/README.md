# Day 27 - Express로 할일 API (5/21)

## 학습 목표

- Express 프레임워크 설치 및 기본 구조 이해
- `app.get()`, `app.post()`, `app.put()`, `app.delete()` 라우트 설정
- 미들웨어 개념 이해 (`cors`, `express.json()`)
- Router를 사용한 라우트 분리

## 문제

> "Express로 깔끔한 할일 REST API를 만들자"

HTTP 모듈을 직접 사용하면 코드가 복잡해집니다. Express를 사용하면 간결하고 구조적인 REST API를 만들 수 있습니다. 이번 과제에서는 Express 프레임워크를 사용하여 할일 CRUD API를 구축합니다.

## 핵심 개념

### Express란?

Node.js를 위한 빠르고 간결한 웹 프레임워크입니다. 라우팅, 미들웨어, 요청/응답 처리를 쉽게 해줍니다.

### 미들웨어 (Middleware)

요청과 응답 사이에서 실행되는 함수입니다. 요청을 가공하거나, 로깅하거나, 인증을 처리하는 등의 역할을 합니다.

```
요청 -> [cors] -> [express.json()] -> [라우트 핸들러] -> 응답
```

### Router 분리

관련된 라우트를 별도 파일로 분리하여 코드를 깔끔하게 관리할 수 있습니다.

```javascript
// routes/todos.js
const router = express.Router();
router.get('/', handler);
module.exports = router;

// index.js
app.use('/api/todos', todoRouter);
```

### REST API 설계

| 메서드 | 경로 | 설명 |
|--------|------|------|
| GET | /api/todos | 모든 할일 조회 |
| GET | /api/todos/:id | 특정 할일 조회 |
| POST | /api/todos | 할일 추가 |
| PUT | /api/todos/:id | 할일 수정 |
| DELETE | /api/todos/:id | 할일 삭제 |

### HTTP 상태 코드

| 코드 | 의미 | 사용 시점 |
|------|------|----------|
| 200 | OK | 조회/수정 성공 |
| 201 | Created | 생성 성공 |
| 400 | Bad Request | 잘못된 요청 (title 누락 등) |
| 404 | Not Found | 리소스를 찾을 수 없음 |
| 500 | Server Error | 서버 내부 오류 |

## 프로젝트 구조

```
day27-express-server/
├── README.md
├── starter/               # 시작 코드 (TODO 채우기)
│   ├── package.json
│   ├── .env
│   └── src/
│       ├── index.js       # 서버 진입점
│       └── routes/
│           └── todos.js   # 할일 라우터
└── solution/              # 완성 코드
    ├── package.json
    ├── .env
    └── src/
        ├── index.js
        └── routes/
            └── todos.js
```

## 실행 방법

```bash
# starter 또는 solution 디렉토리에서
npm install
npm run dev
```

## 테스트 방법

```bash
# 서버 상태 확인
curl http://localhost:3000/

# 할일 추가
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Express 배우기"}'

# 모든 할일 조회
curl http://localhost:3000/api/todos

# 특정 할일 조회 (id는 실제 값으로 변경)
curl http://localhost:3000/api/todos/<id>

# 할일 수정
curl -X PUT http://localhost:3000/api/todos/<id> \
  -H "Content-Type: application/json" \
  -d '{"title": "Express 마스터", "done": true}'

# 할일 삭제
curl -X DELETE http://localhost:3000/api/todos/<id>
```

## 도전 과제

1. 할일 필터링 기능 추가 (완료/미완료)
2. 정렬 기능 추가 (생성일, 우선순위)
3. 요청 로깅 미들웨어 직접 만들기
4. 에러 처리 미들웨어 추가
