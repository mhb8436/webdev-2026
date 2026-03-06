// ============================================
// Day 28 - PostgreSQL CRUD 라우트
// ============================================
// 학습목표: Express + pg로 REST API 구현
// 사용: const todosRouter = require('./routes/todos-pg');
//       app.use('/api/todos', todosRouter);

const express = require('express');
const router = express.Router();

// TODO 1: pg Pool 설정
// const { Pool } = require('pg');
// const pool = new Pool({ ... });
// 또는 database-pg.js에서 import

// TODO 2: 테이블 초기화
// CREATE TABLE IF NOT EXISTS todos (
//   id SERIAL PRIMARY KEY,
//   title VARCHAR(255) NOT NULL,
//   completed BOOLEAN DEFAULT false,
//   created_at TIMESTAMP DEFAULT NOW()
// );

// TODO 3: GET /api/todos
// - 전체 목록 조회
// - 쿼리스트링으로 필터: ?completed=true, ?search=keyword
// - ORDER BY created_at DESC

// TODO 4: GET /api/todos/:id
// - 단일 조회
// - 없으면 404

// TODO 5: POST /api/todos
// - title 필수 검증
// - INSERT INTO todos (title) VALUES ($1) RETURNING *

// TODO 6: PUT /api/todos/:id
// - title, completed 업데이트
// - UPDATE ... SET ... WHERE id = $1 RETURNING *

// TODO 7: DELETE /api/todos/:id
// - DELETE FROM todos WHERE id = $1

// TODO 8: PATCH /api/todos/:id/toggle
// - completed 토글: UPDATE SET completed = NOT completed

module.exports = router;
