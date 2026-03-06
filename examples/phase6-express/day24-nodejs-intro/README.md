# Day 24 - Node.js 첫 서버

> **Phase 6: Express** | 학습일: 24일차

---

## 학습 목표

- Node.js 런타임의 개념과 특징을 이해한다
- `http` 내장 모듈로 서버를 생성한다
- `fs` 모듈로 파일을 읽고 쓴다
- JSON 형식으로 응답을 보내는 방법을 익힌다
- URL과 HTTP 메서드에 따라 라우팅한다

---

## 핵심 개념

### 1. Node.js란?

```
브라우저 JavaScript → DOM 조작, 사용자 인터페이스
Node.js JavaScript  → 파일 시스템, 네트워크, 서버 구축
```

### 2. http 모듈로 서버 만들기

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');

  if (req.url === '/api/todos' && req.method === 'GET') {
    res.end(JSON.stringify(todos));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

server.listen(3000, () => {
  console.log('서버가 3000번 포트에서 실행중');
});
```

### 3. 요청 객체 (req) 속성

| 속성 | 설명 | 예시 |
|------|------|------|
| `req.url` | 요청 URL | `/api/todos` |
| `req.method` | HTTP 메서드 | `GET`, `POST` |

### 4. fs 모듈 (파일 시스템)

```javascript
const fs = require('fs');

// 동기 읽기/쓰기
const data = fs.readFileSync('todos.json', 'utf-8');
fs.writeFileSync('todos.json', JSON.stringify(todos, null, 2));

// 파일 존재 확인
if (fs.existsSync('todos.json')) { ... }
```

### 5. POST 요청 body 읽기

```javascript
if (req.method === 'POST') {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    const { title } = JSON.parse(body);
    // 할일 추가 처리
  });
}
```

---

## 실습 파일

### starter/ (직접 구현)

| 파일 | 내용 |
|------|------|
| `server.js` | http 모듈 기본 서버 (GET/POST) |
| `02_fs_operations.js` | fs 모듈 파일 읽기/쓰기 연습 |
| `03_http_server.js` | URL/메서드별 라우팅 서버 |

### solution/ (완성 코드)

| 파일 | 내용 |
|------|------|
| `server.js` | 완성된 할일 API 서버 |
| `02_fs_operations.js` | 파일 CRUD 예제 |
| `03_http_server.js` | 라우팅 + JSON 응답 서버 |

---

## 실행 방법

```bash
node solution/server.js
```

```bash
# 서버 정보 확인
curl http://localhost:3000

# 할일 추가
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Node.js 공부하기"}'
```

---

## 정리

| 개념 | 핵심 |
|------|------|
| Node.js | Chrome V8 엔진 기반 JavaScript 런타임 |
| http 모듈 | `createServer()` + `listen()`으로 서버 생성 |
| req/res | 요청 객체 / 응답 객체 |
| fs 모듈 | `readFileSync`, `writeFileSync` 파일 I/O |
| JSON 응답 | `res.setHeader('Content-Type', 'application/json')` |

> **다음 시간**: Day 25 - 모듈 시스템과 파일 저장
