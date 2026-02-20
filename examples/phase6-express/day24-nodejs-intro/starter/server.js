// Node.js 기본 HTTP 서버
const http = require('http');

const PORT = 3000;

// 메모리에 할일 저장
let todos = [];
let nextId = 1;

// TODO: HTTP 서버 생성
const server = http.createServer((req, res) => {
  // TODO: URL과 HTTP 메서드 확인
  const { url, method } = req;

  // TODO: CORS 헤더 설정
  res.setHeader('Content-Type', 'application/json');

  // TODO: 라우팅
  if (url === '/api/todos' && method === 'GET') {
    // TODO: 모든 할일 조회
    // 힌트: res.statusCode = 200;
    // 힌트: res.end(JSON.stringify(todos));

  } else if (url === '/api/todos' && method === 'POST') {
    // TODO: 새 할일 추가 (request body 파싱 필요)
    // 힌트: req.on('data', ...) 와 req.on('end', ...) 이벤트 사용
    // 힌트: body를 JSON.parse()로 파싱
    // 힌트: 새 할일 객체에 id, title, completed 포함

  } else if (url === '/' && method === 'GET') {
    // TODO: 서버 정보 응답
    // 힌트: { message: "할일 API 서버입니다", version: "1.0.0" }

  } else {
    // TODO: 404 응답
    // 힌트: res.statusCode = 404;
    // 힌트: { error: "찾을 수 없는 경로입니다" }

  }
});

// TODO: 서버 시작
// server.listen(PORT, () => { ... });
