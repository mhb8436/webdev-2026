// ============================================
// Day 27 - Express 라우팅 패턴 (풀이)
// ============================================
const express = require('express');
const app = express();

app.use(express.json());

// --- 샘플 데이터 ---
let users = [
  { id: 1, name: '홍길동', email: 'hong@test.com', role: 'admin' },
  { id: 2, name: '김철수', email: 'kim@test.com', role: 'user' },
  { id: 3, name: '이영희', email: 'lee@test.com', role: 'user' },
];
let nextId = 4;

// --- 1. 기본 라우팅 ---
app.get('/', (req, res) => {
  res.json({ message: 'Express 라우팅 예제 API' });
});

app.get('/about', (req, res) => {
  res.json({ name: 'Routing Demo', version: '1.0.0' });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// --- 2. 라우트 파라미터 ---
app.get('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: '사용자를 찾을 수 없습니다' });
  }
  res.json(user);
});

// 다중 파라미터
app.get('/users/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.json({
    message: `사용자 ${userId}의 게시글 ${postId}`,
    params: req.params,
  });
});

// --- 3. 쿼리스트링 ---
app.get('/search', (req, res) => {
  const { q = '', page = '1', limit = '10', sort = 'name' } = req.query;
  const pageNum = Number(page);
  const limitNum = Number(limit);

  // 간단한 검색 시뮬레이션
  let results = users.filter(u =>
    u.name.includes(q) || u.email.includes(q)
  );

  // 정렬
  results.sort((a, b) => String(a[sort] || '').localeCompare(String(b[sort] || '')));

  // 페이지네이션
  const start = (pageNum - 1) * limitNum;
  const paged = results.slice(start, start + limitNum);

  res.json({
    query: q,
    page: pageNum,
    limit: limitNum,
    total: results.length,
    data: paged,
  });
});

// --- 4. 요청 본문 (POST/PUT) ---
app.post('/users', (req, res) => {
  const { name, email, role = 'user' } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'name과 email은 필수입니다' });
  }
  const user = { id: nextId++, name, email, role };
  users.push(user);
  res.status(201).json(user);
});

// --- 5. Router로 모듈 분리 ---
const productRouter = express.Router();

const products = [
  { id: 1, name: '노트북', price: 1200000, stock: 10 },
  { id: 2, name: '키보드', price: 89000, stock: 50 },
  { id: 3, name: '마우스', price: 45000, stock: 100 },
];

productRouter.get('/', (req, res) => {
  res.json(products);
});

productRouter.get('/:id', (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id));
  if (!product) {
    return res.status(404).json({ error: '상품을 찾을 수 없습니다' });
  }
  res.json(product);
});

productRouter.post('/', (req, res) => {
  const { name, price, stock = 0 } = req.body;
  const product = { id: products.length + 1, name, price, stock };
  products.push(product);
  res.status(201).json(product);
});

app.use('/api/products', productRouter);

// --- 6. 라우트 체이닝 ---
const articles = [
  { id: 1, title: 'Express 입문', content: 'Express는...' },
  { id: 2, title: 'Node.js 기초', content: 'Node.js는...' },
];

app.route('/api/articles')
  .get((req, res) => {
    res.json(articles);
  })
  .post((req, res) => {
    const article = { id: articles.length + 1, ...req.body };
    articles.push(article);
    res.status(201).json(article);
  });

app.route('/api/articles/:id')
  .get((req, res) => {
    const article = articles.find(a => a.id === Number(req.params.id));
    if (!article) return res.status(404).json({ error: '게시글 없음' });
    res.json(article);
  })
  .put((req, res) => {
    const index = articles.findIndex(a => a.id === Number(req.params.id));
    if (index === -1) return res.status(404).json({ error: '게시글 없음' });
    articles[index] = { ...articles[index], ...req.body };
    res.json(articles[index]);
  })
  .delete((req, res) => {
    const index = articles.findIndex(a => a.id === Number(req.params.id));
    if (index === -1) return res.status(404).json({ error: '게시글 없음' });
    articles.splice(index, 1);
    res.status(204).send();
  });

// --- 404 처리 ---
app.use((req, res) => {
  res.status(404).json({ error: `${req.method} ${req.path} 를 찾을 수 없습니다` });
});

// --- 서버 시작 ---
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`라우팅 예제 서버: http://localhost:${PORT}`);
  console.log("");
  console.log("테스트:");
  console.log("  GET  http://localhost:3000/health");
  console.log("  GET  http://localhost:3000/users/1");
  console.log("  GET  http://localhost:3000/search?q=홍&page=1");
  console.log("  POST http://localhost:3000/users  (body: {name, email})");
  console.log("  GET  http://localhost:3000/api/products");
  console.log("  GET  http://localhost:3000/api/articles");
});
