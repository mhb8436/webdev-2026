// ============================================
// Day 24 - Express 없이 HTTP 서버 만들기 (풀이)
// ============================================

const http = require('http');
const url = require('url');

const PORT = 3000;
let todos = [];
let nextId = 1;

function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(JSON.stringify(data, null, 2));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(new Error('잘못된 JSON 형식'));
      }
    });
  });
}

// URL에서 ID 추출: /api/todos/3 → 3
function extractId(pathname) {
  const match = pathname.match(/^\/api\/todos\/(\d+)$/);
  return match ? Number(match[1]) : null;
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // CORS preflight
  if (method === 'OPTIONS') {
    return sendJSON(res, 204, null);
  }

  try {
    // GET /api/todos - 전체 조회
    if (pathname === '/api/todos' && method === 'GET') {
      return sendJSON(res, 200, { total: todos.length, todos });
    }

    // POST /api/todos - 생성
    if (pathname === '/api/todos' && method === 'POST') {
      const body = await parseBody(req);
      if (!body.title) {
        return sendJSON(res, 400, { error: 'title은 필수입니다' });
      }
      const todo = {
        id: nextId++,
        title: body.title,
        done: false,
        priority: body.priority || 'medium',
        createdAt: new Date().toISOString(),
      };
      todos.push(todo);
      return sendJSON(res, 201, todo);
    }

    // ID가 필요한 라우트
    const id = extractId(pathname);
    if (id !== null) {
      const todo = todos.find(t => t.id === id);

      // GET /api/todos/:id
      if (method === 'GET') {
        if (!todo) return sendJSON(res, 404, { error: '찾을 수 없습니다' });
        return sendJSON(res, 200, todo);
      }

      // PUT /api/todos/:id
      if (method === 'PUT') {
        if (!todo) return sendJSON(res, 404, { error: '찾을 수 없습니다' });
        const body = await parseBody(req);
        Object.assign(todo, body);
        return sendJSON(res, 200, todo);
      }

      // DELETE /api/todos/:id
      if (method === 'DELETE') {
        const idx = todos.findIndex(t => t.id === id);
        if (idx === -1) return sendJSON(res, 404, { error: '찾을 수 없습니다' });
        const deleted = todos.splice(idx, 1)[0];
        return sendJSON(res, 200, { message: '삭제 완료', deleted });
      }
    }

    // 404
    sendJSON(res, 404, { error: '리소스를 찾을 수 없습니다' });
  } catch (err) {
    sendJSON(res, 500, { error: err.message });
  }
});

server.listen(PORT, () => {
  console.log(`HTTP 서버: http://localhost:${PORT}`);
  console.log('테스트:');
  console.log('  curl http://localhost:3000/api/todos');
  console.log('  curl -X POST -H "Content-Type: application/json" -d \'{"title":"테스트"}\' http://localhost:3000/api/todos');
});
