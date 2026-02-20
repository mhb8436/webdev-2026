// Day 31 - API 문서 (Swagger) 연습 문제
// 사전 준비:
//   npm init -y
//   npm install express swagger-jsdoc swagger-ui-express

const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = 3000;

app.use(express.json());

// 메모리 저장소
const memos = [];
let nextId = 1;

// ============================================
// 문제 1: Swagger 설정
// swagger-jsdoc 옵션을 설정하고
// /api-docs 경로에 Swagger UI를 연결하세요.
// ============================================

// swaggerOptions 설정
// - definition.openapi: '3.0.0'
// - definition.info: 제목, 버전, 설명
// - definition.servers: [{ url: 'http://localhost:3000' }]
// - apis: ['./*.js']

// const specs = swaggerJsdoc(swaggerOptions);
// app.use('/api-docs', ...);

// ============================================
// 문제 2: API 문서화
// 각 API 엔드포인트에 @swagger 주석을 추가하세요.
// ============================================

// Swagger 컴포넌트 스키마 정의
// @swagger 주석으로 Memo, MemoInput 스키마를 정의하세요.

/**
 * TODO: Memo 스키마 정의
 * - type: object
 * - properties: id, title, content, createdAt
 */

/**
 * TODO: MemoInput 스키마 정의
 * - type: object
 * - required: [title, content]
 * - properties: title, content
 */

// GET /api/memos - 전체 메모 목록 조회
// TODO: @swagger 주석 추가
app.get('/api/memos', (req, res) => {
  res.json(memos);
});

// POST /api/memos - 새 메모 작성
// TODO: @swagger 주석 추가
app.post('/api/memos', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'title과 content는 필수입니다.' });
  }

  const memo = {
    id: nextId++,
    title,
    content,
    createdAt: new Date().toISOString()
  };

  memos.push(memo);
  res.status(201).json(memo);
});

// PUT /api/memos/:id - 메모 수정
// TODO: @swagger 주석 추가
app.put('/api/memos/:id', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const memo = memos.find(m => m.id === parseInt(id));
  if (!memo) {
    return res.status(404).json({ error: '메모를 찾을 수 없습니다.' });
  }

  if (title) memo.title = title;
  if (content) memo.content = content;

  res.json(memo);
});

// DELETE /api/memos/:id - 메모 삭제
// TODO: @swagger 주석 추가
app.delete('/api/memos/:id', (req, res) => {
  const { id } = req.params;
  const index = memos.findIndex(m => m.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: '메모를 찾을 수 없습니다.' });
  }

  memos.splice(index, 1);
  res.json({ message: '메모가 삭제되었습니다.' });
});

// ============================================
// 문제 3: Postman 컬렉션
// memo-api.postman_collection.json 파일을
// 별도로 작성하세요. (이 파일이 아님)
// ============================================

// ============================================
// 서버 시작
// ============================================
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
  console.log(`API 문서: http://localhost:${PORT}/api-docs`);
});
