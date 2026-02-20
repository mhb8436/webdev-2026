// Node.js 기본 HTTP 서버 - 완성 코드
const http = require('http');

const PORT = 3000;

// 메모리에 할일 저장
let todos = [];
let nextId = 1;

// HTTP 서버 생성
const server = http.createServer((req, res) => {
  // URL과 HTTP 메서드 확인
  const { url, method } = req;

  // CORS 헤더 설정 (프론트엔드에서 접근할 수 있도록)
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OPTIONS 요청 처리 (CORS 사전 요청)
  if (method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  // 라우팅: 루트 경로
  if (url === '/' && method === 'GET') {
    // 서버 정보 응답
    res.statusCode = 200;
    res.end(JSON.stringify({
      message: '할일 API 서버입니다',
      version: '1.0.0'
    }));

  } else if (url === '/api/todos' && method === 'GET') {
    // 모든 할일 조회
    res.statusCode = 200;
    res.end(JSON.stringify(todos));

  } else if (url === '/api/todos' && method === 'POST') {
    // 새 할일 추가 - request body 파싱
    let body = '';

    // 데이터가 들어올 때마다 body에 추가
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    // 모든 데이터를 받은 후 처리
    req.on('end', () => {
      try {
        const { title } = JSON.parse(body);

        // 제목이 없으면 에러 응답
        if (!title) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: '할일 제목은 필수입니다' }));
          return;
        }

        // 새 할일 객체 생성
        const newTodo = {
          id: nextId++,
          title,
          completed: false,
          createdAt: new Date().toISOString()
        };

        // 배열에 추가
        todos.push(newTodo);

        // 201 Created 응답
        res.statusCode = 201;
        res.end(JSON.stringify(newTodo));
      } catch (error) {
        // JSON 파싱 실패 시 에러 응답
        res.statusCode = 400;
        res.end(JSON.stringify({ error: '잘못된 요청 형식입니다' }));
      }
    });

  } else {
    // 404 응답 - 알 수 없는 경로
    res.statusCode = 404;
    res.end(JSON.stringify({ error: '찾을 수 없는 경로입니다' }));
  }
});

// 서버 시작
server.listen(PORT, () => {
  console.log(`할일 API 서버가 http://localhost:${PORT} 에서 실행중입니다`);
  console.log('사용 가능한 엔드포인트:');
  console.log(`  GET  http://localhost:${PORT}/           - 서버 정보`);
  console.log(`  GET  http://localhost:${PORT}/api/todos   - 할일 목록 조회`);
  console.log(`  POST http://localhost:${PORT}/api/todos   - 할일 추가`);
});
