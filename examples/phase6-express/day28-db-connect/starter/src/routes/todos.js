const express = require('express');
const router = express.Router();
// TODO: database.js에서 db 객체 가져오기
// const db = require('../database');

// TODO: GET / - 모든 할일 조회
// 힌트: db.prepare('SELECT * FROM todos ORDER BY created_at DESC').all()
router.get('/', (req, res) => {
  // TODO: 구현
});

// TODO: GET /:id - 단건 조회
// 힌트: db.prepare('SELECT * FROM todos WHERE id = ?').get(id)
router.get('/:id', (req, res) => {
  // TODO: 구현
});

// TODO: POST / - 할일 추가
// 힌트: db.prepare('INSERT INTO todos (title, priority, category) VALUES (?, ?, ?)').run(...)
// run() 결과의 lastInsertRowid로 방금 생성된 할일을 다시 조회할 수 있습니다
router.post('/', (req, res) => {
  // TODO: 구현
});

// TODO: PUT /:id - 할일 수정
// 힌트: db.prepare('UPDATE todos SET title = ?, done = ?, ... WHERE id = ?').run(...)
// run() 결과의 changes로 실제로 수정되었는지 확인할 수 있습니다
router.put('/:id', (req, res) => {
  // TODO: 구현
});

// TODO: DELETE /:id - 할일 삭제
// 힌트: db.prepare('DELETE FROM todos WHERE id = ?').run(id)
// 삭제 전에 먼저 조회하여 존재하는지 확인하세요
router.delete('/:id', (req, res) => {
  // TODO: 구현
});

module.exports = router;
