// Day 32 - 프론트엔드 연동 완성 연습 문제 정답
// 사전 준비:
//   npm init -y
//   npm install express cors dotenv

// ============================================
// 문제 1: CORS 이해하기
// ============================================

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());

// ──────────────────────────────────────────
// CORS(Cross-Origin Resource Sharing)란?
//
// 웹 브라우저는 보안 정책(Same-Origin Policy)에 의해
// 다른 출처(origin)의 리소스에 접근하는 것을 기본적으로 차단합니다.
//
// "출처(origin)"란 프로토콜 + 도메인 + 포트의 조합을 말합니다.
// 예: http://localhost:3000 과 http://localhost:5173 은 포트가 다르므로 다른 출처입니다.
//
// CORS는 서버가 특정 출처의 요청을 허용하도록 응답 헤더를 설정하는 메커니즘입니다.
// 서버가 Access-Control-Allow-Origin 헤더를 보내면,
// 브라우저는 해당 출처의 요청을 허용합니다.
//
// CORS가 필요한 이유:
// 프론트엔드(예: React, localhost:5173)와 백엔드(Express, localhost:3000)가
// 다른 포트에서 실행되므로, 프론트엔드에서 백엔드 API를 호출하려면
// CORS 설정이 필요합니다.
// ──────────────────────────────────────────

// 방법 1: 기본 CORS 설정 (모든 origin 허용)
// app.use(cors());

// 방법 2: 특정 origin만 허용
const allowedOrigins = ['http://localhost:5173', 'http://localhost:3001'];

const corsOptions = {
  // origin: 허용할 출처 설정
  origin: function (origin, callback) {
    // origin이 없는 경우 (같은 출처 요청, Postman 등)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS 정책에 의해 차단되었습니다.'));
    }
  },

  // methods: 허용할 HTTP 메서드
  methods: ['GET', 'POST', 'PUT', 'DELETE'],

  // allowedHeaders: 허용할 요청 헤더
  allowedHeaders: ['Authorization', 'Content-Type'],

  // credentials: 인증 정보(쿠키) 전송 허용
  credentials: true,

  // maxAge: preflight 요청 캐시 시간 (초)
  maxAge: 86400  // 24시간
};

app.use(cors(corsOptions));

// 특정 라우트에만 다른 CORS 설정 적용 예시
// 읽기 전용: GET만 허용
const readOnlyCors = cors({
  origin: '*',
  methods: ['GET']
});

// 테스트용 API
app.get('/api/test', (req, res) => {
  res.json({ message: 'CORS 테스트 성공!' });
});

app.post('/api/test', (req, res) => {
  res.json({ message: 'POST 요청 성공!', data: req.body });
});

// 읽기 전용 API (GET만 허용)
app.get('/api/public', readOnlyCors, (req, res) => {
  res.json({ message: '공개 데이터입니다.' });
});

// ============================================
// 문제 2: API 클라이언트 - 서버 코드
// ============================================

// 메모리 저장소
const books = [];
let nextId = 1;

// GET /api/books - 전체 책 목록 조회
app.get('/api/books', (req, res) => {
  res.json(books);
});

// POST /api/books - 새 책 추가
app.post('/api/books', (req, res) => {
  const { title, author, year } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: 'title과 author는 필수입니다.' });
  }

  const book = {
    id: nextId++,
    title,
    author,
    year: year || null
  };

  books.push(book);
  res.status(201).json(book);
});

// PUT /api/books/:id - 책 정보 수정
app.put('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const { title, author, year } = req.body;

  const book = books.find(b => b.id === parseInt(id));
  if (!book) {
    return res.status(404).json({ error: '책을 찾을 수 없습니다.' });
  }

  if (title) book.title = title;
  if (author) book.author = author;
  if (year !== undefined) book.year = year;

  res.json(book);
});

// DELETE /api/books/:id - 책 삭제
app.delete('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const index = books.findIndex(b => b.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: '책을 찾을 수 없습니다.' });
  }

  books.splice(index, 1);
  res.json({ message: '책이 삭제되었습니다.' });
});

// ============================================
// 서버 시작
// ============================================
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
