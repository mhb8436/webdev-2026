// =============================================
// Day 27 정답 - Express로 REST API
// =============================================
// 먼저 패키지를 설치하세요: npm install express

const express = require('express');

// 연습 1: 메모 API
// Express로 메모장 REST API를 만드세요.
// -----------------------------------------

const app1 = express();
app1.use(express.json());

let memos = [
  { id: 1, title: '장보기', content: '우유, 빵, 계란 사기', createdAt: new Date().toISOString() },
  { id: 2, title: '공부', content: 'Express 공부하기', createdAt: new Date().toISOString() }
];
let nextMemoId = 3;

// 전체 메모 목록
app1.get('/api/memos', (req, res) => {
  res.json(memos);
});

// 새 메모 추가
app1.post('/api/memos', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'title과 content는 필수입니다' });
  }

  const newMemo = {
    id: nextMemoId++,
    title,
    content,
    createdAt: new Date().toISOString()
  };

  memos.push(newMemo);
  res.status(201).json(newMemo);
});

// 메모 수정
app1.put('/api/memos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const memo = memos.find(m => m.id === id);

  if (!memo) {
    return res.status(404).json({ error: '메모를 찾을 수 없습니다' });
  }

  const { title, content } = req.body;
  if (title) memo.title = title;
  if (content) memo.content = content;

  res.json(memo);
});

// 메모 삭제
app1.delete('/api/memos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = memos.findIndex(m => m.id === id);

  if (index === -1) {
    return res.status(404).json({ error: '메모를 찾을 수 없습니다' });
  }

  const deleted = memos.splice(index, 1)[0];
  res.json({ message: '메모가 삭제되었습니다', deleted });
});

// app1.listen(3000, () => {
//   console.log('메모 API 서버가 포트 3000에서 실행 중입니다');
// });


// 연습 2: 미들웨어 연습
// 요청 로깅, 시간 측정, 에러 핸들링 미들웨어를 만드세요.
// -----------------------------------------

const app2 = express();
app2.use(express.json());

// 1. 요청 로깅 미들웨어
const requestLogger = (req, res, next) => {
  const now = new Date();
  const timestamp = now.toISOString().replace('T', ' ').substring(0, 19);
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
};

// 2. 요청 시간 측정 미들웨어
const responseTime = (req, res, next) => {
  const startTime = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    console.log(`  → 응답 시간: ${duration}ms`);
  });

  // 응답 헤더에 처리 시간 추가
  const originalEnd = res.end;
  res.end = function (...args) {
    const duration = Date.now() - startTime;
    res.setHeader('X-Response-Time', `${duration}ms`);
    originalEnd.apply(res, args);
  };

  next();
};

// 3. 에러 핸들링 미들웨어
const errorHandler = (err, req, res, next) => {
  console.error(`에러 발생: ${err.message}`);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || '서버 내부 오류가 발생했습니다',
    status
  });
};

// 미들웨어 적용
app2.use(requestLogger);
app2.use(responseTime);

// 테스트 라우트
app2.get('/test', (req, res) => {
  res.json({ message: '정상 응답입니다' });
});

app2.get('/error-test', (req, res, next) => {
  const error = new Error('테스트 에러입니다');
  error.status = 400;
  next(error);
});

// 에러 핸들링 미들웨어는 가장 마지막에 등록
app2.use(errorHandler);

// app2.listen(3001, () => {
//   console.log('미들웨어 테스트 서버가 포트 3001에서 실행 중입니다');
// });


// 연습 3: Router 분리
// express.Router()를 사용하여 라우터를 별도 파일로 분리하세요.
// 별도 파일 구조가 이상적이지만, 여기서는 한 파일에 모두 작성합니다.
// 실제 분리된 파일 버전은 routes/ 폴더의 파일들과 app.js를 참고하세요.
// -----------------------------------------

const app3 = express();
app3.use(express.json());

// --- 사용자 라우터 ---
const usersRouter = express.Router();

let users = [
  { id: 1, name: '김민수', email: 'minsu@example.com' },
  { id: 2, name: '이서연', email: 'seoyeon@example.com' },
  { id: 3, name: '박지호', email: 'jiho@example.com' }
];
let nextUserId = 4;

usersRouter.get('/', (req, res) => {
  res.json(users);
});

usersRouter.post('/', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'name과 email은 필수입니다' });
  }
  const newUser = { id: nextUserId++, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

usersRouter.get('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: '사용자를 찾을 수 없습니다' });
  }
  res.json(user);
});

usersRouter.delete('/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: '사용자를 찾을 수 없습니다' });
  }
  const deleted = users.splice(index, 1)[0];
  res.json({ message: '사용자가 삭제되었습니다', deleted });
});

// --- 상품 라우터 ---
const productsRouter = express.Router();

let products = [
  { id: 1, name: '노트북', price: 1200000 },
  { id: 2, name: '키보드', price: 89000 },
  { id: 3, name: '마우스', price: 45000 }
];
let nextProductId = 4;

productsRouter.get('/', (req, res) => {
  res.json(products);
});

productsRouter.post('/', (req, res) => {
  const { name, price } = req.body;
  if (!name || price === undefined) {
    return res.status(400).json({ error: 'name과 price는 필수입니다' });
  }
  const newProduct = { id: nextProductId++, name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

productsRouter.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: '상품을 찾을 수 없습니다' });
  }
  res.json(product);
});

productsRouter.delete('/:id', (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: '상품을 찾을 수 없습니다' });
  }
  const deleted = products.splice(index, 1)[0];
  res.json({ message: '상품이 삭제되었습니다', deleted });
});

// 라우터 연결
app3.use('/api/users', usersRouter);
app3.use('/api/products', productsRouter);

app3.listen(3000, () => {
  console.log('Router 분리 서버가 포트 3000에서 실행 중입니다');
  console.log('테스트:');
  console.log('  GET  http://localhost:3000/api/users');
  console.log('  GET  http://localhost:3000/api/products');
  console.log('  POST http://localhost:3000/api/users');
  console.log('  POST http://localhost:3000/api/products');
});
