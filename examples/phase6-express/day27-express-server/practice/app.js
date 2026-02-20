// =============================================
// Day 27 연습 3 정답 - 메인 서버 (별도 파일 버전)
// =============================================
// 먼저 패키지를 설치하세요: npm install express

const express = require('express');
const app = express();

// 미들웨어
app.use(express.json());

// 요청 로깅 미들웨어
app.use((req, res, next) => {
  const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
  console.log(`[${now}] ${req.method} ${req.url}`);
  next();
});

// 라우터 연결
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');

app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);

// 루트 경로
app.get('/', (req, res) => {
  res.json({
    message: 'API 서버입니다',
    endpoints: {
      users: '/api/users',
      products: '/api/products'
    }
  });
});

// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.status || 500).json({
    error: err.message || '서버 내부 오류가 발생했습니다'
  });
});

// 서버 시작
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다`);
  console.log(`http://localhost:${PORT}`);
  console.log(`http://localhost:${PORT}/api/users`);
  console.log(`http://localhost:${PORT}/api/products`);
});
