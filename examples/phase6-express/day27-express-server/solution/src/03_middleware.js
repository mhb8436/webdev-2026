// ============================================
// Day 27 - Express 미들웨어 작성하기 (풀이)
// ============================================

const express = require('express');
const app = express();
app.use(express.json());

// --- 1. 로깅 미들웨어 ---
function logger(req, res, next) {
  const start = Date.now();
  const { method, url } = req;

  res.on('finish', () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    console.log(`[${new Date().toISOString()}] ${method} ${url} → ${status} (${duration}ms)`);
  });

  next();
}
app.use(logger);

// --- 2. CORS 미들웨어 ---
function cors(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Preflight 요청 처리
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  next();
}
app.use(cors);

// --- 3. 인증 미들웨어 ---
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: '인증 토큰이 필요합니다' });
  }

  const token = authHeader.split(' ')[1];
  if (token !== 'secret-token') {
    return res.status(401).json({ error: '유효하지 않은 토큰입니다' });
  }

  req.user = { id: 1, name: '인증된 사용자' };
  next();
}

// --- 4. 유효성 검사 미들웨어 팩토리 ---
function validateBody(requiredFields) {
  return (req, res, next) => {
    const missing = requiredFields.filter(field => !req.body[field]);

    if (missing.length > 0) {
      return res.status(400).json({
        error: '필수 필드가 누락되었습니다',
        missing: missing,
      });
    }
    next();
  };
}

// --- 5. 에러 처리 미들웨어 ---
function errorHandler(err, req, res, next) {
  console.error('에러 발생:', err.message);

  const status = err.status || 500;
  res.status(status).json({
    error: err.message || '서버 내부 오류',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}

// --- 6. 라우트 ---
let todos = [
  { id: 1, title: "Express 배우기", done: false },
  { id: 2, title: "미들웨어 이해하기", done: false },
];
let nextId = 3;

// 공개 라우트
app.get('/api/todos', (req, res) => {
  res.json({ total: todos.length, todos });
});

// 인증 필요 + 유효성 검사
app.post('/api/todos', authenticate, validateBody(['title']), (req, res) => {
  const todo = {
    id: nextId++,
    title: req.body.title,
    done: false,
  };
  todos.push(todo);
  res.status(201).json(todo);
});

// 에러 발생 테스트
app.get('/api/error', (req, res, next) => {
  const err = new Error('의도적인 에러');
  err.status = 503;
  next(err);
});

// 404 처리
app.use((req, res) => {
  res.status(404).json({
    error: '요청한 리소스를 찾을 수 없습니다',
    path: req.originalUrl,
  });
});

// 에러 처리 (반드시 마지막에!)
app.use(errorHandler);

app.listen(3000, () => {
  console.log('서버: http://localhost:3000');
  console.log('테스트:');
  console.log('  curl http://localhost:3000/api/todos');
  console.log('  curl -X POST -H "Authorization: Bearer secret-token" -H "Content-Type: application/json" -d \'{"title":"새 할일"}\' http://localhost:3000/api/todos');
});
