// ============================================
// Day 24 - Express 없이 HTTP 서버 만들기
// ============================================
// 학습목표: Node.js http 모듈로 직접 REST API 구현

const http = require('http');
const url = require('url');

const PORT = 3000;
let todos = [];
let nextId = 1;

// TODO 1: HTTP 서버 생성
// const server = http.createServer((req, res) => { ... });

// TODO 2: 요청 파싱
// const parsedUrl = url.parse(req.url, true);
// const pathname = parsedUrl.pathname;
// const method = req.method;

// TODO 3: JSON 응답 헬퍼
// function sendJSON(res, statusCode, data) {
//   res.writeHead(statusCode, { 'Content-Type': 'application/json' });
//   res.end(JSON.stringify(data));
// }

// TODO 4: 요청 바디 파싱 (POST/PUT)
// function parseBody(req) {
//   return new Promise((resolve) => {
//     let body = '';
//     req.on('data', chunk => body += chunk);
//     req.on('end', () => resolve(body ? JSON.parse(body) : {}));
//   });
// }

// TODO 5: 라우팅 구현
// GET /api/todos → 전체 조회
// GET /api/todos/:id → 단건 조회 (URL에서 id 추출)
// POST /api/todos → 생성 (바디 파싱 필요)
// PUT /api/todos/:id → 수정
// DELETE /api/todos/:id → 삭제
// 기타 → 404

// TODO 6: 서버 시작
// server.listen(PORT, () => console.log(`서버: http://localhost:${PORT}`));
