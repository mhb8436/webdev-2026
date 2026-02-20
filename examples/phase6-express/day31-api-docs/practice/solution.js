// Day 31 - API 문서 (Swagger) 연습 문제 정답
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
// ============================================

// swagger-jsdoc 옵션
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '메모 API',
      version: '1.0.0',
      description: '메모 관리를 위한 REST API'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: '개발 서버'
      }
    ]
  },
  // Swagger 주석이 포함된 파일 경로
  apis: ['./*.js']
};

// Swagger 스펙 생성
const specs = swaggerJsdoc(swaggerOptions);

// /api-docs 경로에 Swagger UI 연결
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// ============================================
// 문제 2: API 문서화
// ============================================

/**
 * @swagger
 * components:
 *   schemas:
 *     Memo:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: 메모 고유 ID
 *           example: 1
 *         title:
 *           type: string
 *           description: 메모 제목
 *           example: "회의록"
 *         content:
 *           type: string
 *           description: 메모 내용
 *           example: "오후 3시 팀 회의"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: 생성 일시
 *           example: "2025-05-28T09:00:00.000Z"
 *     MemoInput:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         title:
 *           type: string
 *           description: 메모 제목
 *           example: "회의록"
 *         content:
 *           type: string
 *           description: 메모 내용
 *           example: "오후 3시 팀 회의"
 */

/**
 * @swagger
 * /api/memos:
 *   get:
 *     summary: 전체 메모 목록 조회
 *     tags: [Memos]
 *     responses:
 *       200:
 *         description: 메모 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Memo'
 */
app.get('/api/memos', (req, res) => {
  res.json(memos);
});

/**
 * @swagger
 * /api/memos:
 *   post:
 *     summary: 새 메모 작성
 *     tags: [Memos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MemoInput'
 *     responses:
 *       201:
 *         description: 생성된 메모
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Memo'
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "title과 content는 필수입니다."
 */
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

/**
 * @swagger
 * /api/memos/{id}:
 *   put:
 *     summary: 메모 수정
 *     tags: [Memos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 메모 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MemoInput'
 *     responses:
 *       200:
 *         description: 수정된 메모
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Memo'
 *       404:
 *         description: 메모를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "메모를 찾을 수 없습니다."
 */
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

/**
 * @swagger
 * /api/memos/{id}:
 *   delete:
 *     summary: 메모 삭제
 *     tags: [Memos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 메모 ID
 *     responses:
 *       200:
 *         description: 삭제 완료
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "메모가 삭제되었습니다."
 *       404:
 *         description: 메모를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "메모를 찾을 수 없습니다."
 */
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
// 서버 시작
// ============================================
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
  console.log(`API 문서: http://localhost:${PORT}/api-docs`);
});
