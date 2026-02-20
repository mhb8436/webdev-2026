// Day 32 - 프론트엔드 연동 완성 연습 문제
// 사전 준비:
//   npm init -y
//   npm install express cors dotenv

// ============================================
// 문제 1: CORS 이해하기
// Express 서버에 cors 미들웨어를 설정하세요.
// ============================================

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(express.json());

// TODO: CORS가 무엇인지 주석으로 설명하세요.
// CORS란?
//
// CORS가 필요한 이유?
//

// TODO: 기본 CORS 설정 (모든 origin 허용)

// TODO: 특정 origin만 허용하는 CORS 설정
// 허용할 origin: http://localhost:5173, http://localhost:3001

// TODO: 특정 HTTP 메서드만 허용하는 CORS 설정
// 허용할 메서드: GET, POST

// TODO: 커스텀 헤더 허용 설정
// 허용할 헤더: Authorization, Content-Type

// TODO: 인증 정보 포함 설정 (credentials: true)

// 테스트용 API
app.get('/api/test', (req, res) => {
  res.json({ message: 'CORS 테스트 성공!' });
});

app.post('/api/test', (req, res) => {
  res.json({ message: 'POST 요청 성공!', data: req.body });
});

// ============================================
// 문제 2: API 클라이언트
// server.js와 client.js를 각각 작성하세요.
// 이 파일에는 서버 코드를 작성합니다.
// ============================================

// 메모리 저장소
const books = [];
let nextId = 1;

// GET /api/books - 전체 책 목록 조회

// POST /api/books - 새 책 추가

// PUT /api/books/:id - 책 정보 수정

// DELETE /api/books/:id - 책 삭제

// ============================================
// 문제 3: 환경별 설정
// config.js, .env.development, .env.production,
// server.js를 각각 작성하세요.
// ============================================

// TODO: NODE_ENV에 따라 다른 .env 파일 로드
// TODO: 환경에 따라 다른 CORS origin 설정
// TODO: 환경에 따라 다른 로그 미들웨어 적용

// ============================================
// 서버 시작
// ============================================
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
