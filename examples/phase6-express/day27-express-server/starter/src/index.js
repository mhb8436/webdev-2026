require('dotenv').config();
const express = require('express');
const cors = require('cors');
const todoRouter = require('./routes/todos');

const app = express();
const PORT = process.env.PORT || 3000;

// TODO: 미들웨어 설정
// 힌트: cors()로 CORS 허용, express.json()으로 JSON 본문 파싱
// app.use(cors());
// app.use(express.json());

// TODO: 라우터 연결
// 힌트: '/api/todos' 경로에 todoRouter를 연결하세요
// app.use('/api/todos', todoRouter);

// TODO: 기본 라우트
app.get('/', (req, res) => {
  res.json({ message: 'Todo API 서버', version: '1.0.0' });
});

// TODO: 서버 시작
app.listen(PORT, () => {
  console.log(`서버: http://localhost:${PORT}`);
});
