// Day 32 - 프론트엔드 연동 완성 (서버)
// Day 31 솔루션 서버 - Swagger, 인증, CORS 포함

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// Swagger UI 설정
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 라우트 연결
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// 기본 라우트
app.get('/', (req, res) => {
  res.json({
    message: '할일 관리 API 서버입니다',
    docs: '/api-docs에서 API 문서를 확인할 수 있습니다',
  });
});

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: '서버 내부 오류가 발생했습니다' });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다`);
  console.log(`API 문서: http://localhost:${PORT}/api-docs`);
});
