// =============================================
// Day 27 연습 3 정답 - 사용자 라우터 (별도 파일)
// =============================================

const express = require('express');
const router = express.Router();

// 샘플 데이터
let users = [
  { id: 1, name: '김민수', email: 'minsu@example.com' },
  { id: 2, name: '이서연', email: 'seoyeon@example.com' },
  { id: 3, name: '박지호', email: 'jiho@example.com' }
];
let nextId = 4;

// 사용자 목록
router.get('/', (req, res) => {
  res.json(users);
});

// 사용자 추가
router.post('/', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'name과 email은 필수입니다' });
  }

  const newUser = { id: nextId++, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// 사용자 조회
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).json({ error: '사용자를 찾을 수 없습니다' });
  }

  res.json(user);
});

// 사용자 삭제
router.delete('/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: '사용자를 찾을 수 없습니다' });
  }

  const deleted = users.splice(index, 1)[0];
  res.json({ message: '사용자가 삭제되었습니다', deleted });
});

module.exports = router;
