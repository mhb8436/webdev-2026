// Day 30 - 로그인 기능 추가 (솔루션)
// Express 앱에 인증(auth)과 할일(todos) 라우트를 연결합니다

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// 라우트 연결
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// 기본 라우트
app.get('/', (req, res) => {
  res.json({ message: '할일 관리 API 서버입니다' });
});

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: '서버 내부 오류가 발생했습니다' });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다`);
});
