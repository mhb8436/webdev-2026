# Day 24 - Node.js 첫 서버 (5/18)

## 학습 목표

- Node.js 런타임의 개념과 특징을 이해한다
- `http` 내장 모듈을 사용하여 서버를 생성한다
- `createServer`와 `listen` 메서드의 역할을 이해한다
- JSON 형식으로 응답을 보내는 방법을 익힌다

## 문제 상황

> "Node.js로 '할일 API 서버입니다' 응답하는 서버를 띄우자"

지금까지 브라우저에서 JavaScript를 실행했다면, 이제는 **서버 측**에서 JavaScript를 실행해보겠습니다.
Node.js의 `http` 모듈을 사용하여 간단한 할일 API 서버를 만들어봅시다.

## 핵심 개념

### 1. Node.js란?

Node.js는 Chrome V8 엔진 위에서 동작하는 **JavaScript 런타임**입니다.
브라우저 없이도 JavaScript를 실행할 수 있게 해줍니다.

```
브라우저 JavaScript → DOM 조작, 사용자 인터페이스
Node.js JavaScript  → 파일 시스템, 네트워크, 서버 구축
```

### 2. http 모듈

Node.js에 내장된 `http` 모듈로 웹 서버를 만들 수 있습니다.

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  // req: 요청 객체 (클라이언트가 보낸 정보)
  // res: 응답 객체 (서버가 보내는 정보)
  res.end('안녕하세요!');
});
```

### 3. createServer 콜백

`createServer`에 전달하는 콜백 함수는 **요청이 들어올 때마다** 실행됩니다.

- `req.url` - 요청 URL (예: `/api/todos`)
- `req.method` - HTTP 메서드 (예: `GET`, `POST`)
- `res.setHeader()` - 응답 헤더 설정
- `res.statusCode` - 상태 코드 설정
- `res.end()` - 응답 전송

### 4. JSON 응답 보내기

```javascript
res.setHeader('Content-Type', 'application/json');
res.end(JSON.stringify({ message: '할일 API 서버입니다' }));
```

### 5. listen으로 서버 시작

```javascript
server.listen(3000, () => {
  console.log('서버가 3000번 포트에서 실행중입니다');
});
```

## 실행 방법

```bash
# starter 또는 solution 디렉토리에서
node server.js
```

서버 실행 후 브라우저에서 확인:
- http://localhost:3000 → 서버 정보
- http://localhost:3000/api/todos → 할일 목록

터미널에서 POST 요청 테스트:
```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Node.js 공부하기"}'
```

## 단계별 가이드

### Step 1: 기본 서버 띄우기

`starter/server.js`를 열고, 서버가 루트 경로(`/`)에 JSON 응답을 보내도록 작성합니다.

### Step 2: GET /api/todos 구현

메모리에 저장된 할일 배열을 JSON으로 반환합니다.

### Step 3: POST /api/todos 구현

요청 본문(body)을 파싱하여 새 할일을 추가합니다.
Node.js에서 POST body는 `data`와 `end` 이벤트로 읽어야 합니다.

### Step 4: 404 처리

알 수 없는 경로에 대해 404 상태 코드와 에러 메시지를 반환합니다.

## 프로젝트 구조

```
day24-nodejs-intro/
├── README.md
├── starter/
│   └── server.js      ← 여기서 코드를 작성하세요
└── solution/
    └── server.js      ← 완성된 코드 참고
```

## 확인 사항

- [ ] `node server.js`로 서버가 정상 시작되는가?
- [ ] `http://localhost:3000`에서 서버 정보가 JSON으로 응답되는가?
- [ ] `GET /api/todos`로 할일 목록을 조회할 수 있는가?
- [ ] `POST /api/todos`로 새 할일을 추가할 수 있는가?
- [ ] 존재하지 않는 경로에 404 응답이 오는가?

## 다음 단계

Day 25에서는 할일 데이터를 **파일에 저장**하여 서버를 재시작해도 데이터가 유지되도록 만들겠습니다.
