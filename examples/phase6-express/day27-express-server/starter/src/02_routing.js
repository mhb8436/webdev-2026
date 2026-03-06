// ============================================
// Day 27 - Express 라우팅 패턴
// ============================================
// 학습목표: 라우트 파라미터, 쿼리스트링, 라우터 분리
// 실행: npm install express && node starter/src/02_routing.js

// TODO 1: 기본 라우팅
// app.get('/', ...)
// app.get('/about', ...)
// app.get('/health', ...) → { status: 'ok', uptime: process.uptime() }

// TODO 2: 라우트 파라미터
// app.get('/users/:id', ...) → req.params.id
// app.get('/users/:userId/posts/:postId', ...) → 다중 파라미터

// TODO 3: 쿼리스트링
// GET /search?q=keyword&page=1&limit=10
// req.query.q, req.query.page 등

// TODO 4: 요청 본문 (POST/PUT)
// app.use(express.json());
// app.post('/users', ...) → req.body

// TODO 5: Router로 모듈 분리
// const userRouter = express.Router();
// userRouter.get('/', ...);
// userRouter.get('/:id', ...);
// userRouter.post('/', ...);
// userRouter.put('/:id', ...);
// userRouter.delete('/:id', ...);
// app.use('/api/users', userRouter);

// TODO 6: 라우트 체이닝
// app.route('/articles')
//   .get(...)
//   .post(...);
// app.route('/articles/:id')
//   .get(...)
//   .put(...)
//   .delete(...);
