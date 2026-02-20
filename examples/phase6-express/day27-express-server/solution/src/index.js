require('dotenv').config();
const express = require('express');
const cors = require('cors');
const todoRouter = require('./routes/todos');

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
// cors(): 다른 도메인에서의 API 요청을 허용
app.use(cors());
// express.json(): 요청 본문의 JSON을 자동으로 파싱하여 req.body에 저장
app.use(express.json());

// 요청 로깅 미들웨어 (커스텀)
app.use((req, res, next) => {
  const 시작시간 = Date.now();
  // 응답이 완료된 후 로그 출력
  res.on('finish', () => {
    const 소요시간 = Date.now() - 시작시간;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${소요시간}ms`);
  });
  next();
});

// 라우터 연결 - '/api/todos' 경로로 들어오는 요청을 todoRouter에서 처리
app.use('/api/todos', todoRouter);

// 기본 라우트 - API 서버 정보 제공
app.get('/', (req, res) => {
  res.json({
    message: 'Todo API 서버',
    version: '1.0.0',
    endpoints: {
      할일목록: 'GET /api/todos',
      할일조회: 'GET /api/todos/:id',
      할일추가: 'POST /api/todos',
      할일수정: 'PUT /api/todos/:id',
      할일삭제: 'DELETE /api/todos/:id'
    }
  });
});

// 404 처리 미들웨어 - 등록되지 않은 경로에 대한 처리
app.use((req, res) => {
  res.status(404).json({ error: '요청한 경로를 찾을 수 없습니다' });
});

// 에러 처리 미들웨어 - 서버 내부 오류 처리
app.use((err, req, res, next) => {
  console.error('서버 에러:', err.message);
  res.status(500).json({ error: '서버 내부 오류가 발생했습니다' });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 시작되었습니다: http://localhost:${PORT}`);
  console.log(`API 엔드포인트: http://localhost:${PORT}/api/todos`);
});
