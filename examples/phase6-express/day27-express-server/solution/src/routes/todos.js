const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// 메모리 저장소 (서버 재시작 시 초기화됨)
let todos = [];

// GET / - 모든 할일 조회
// 쿼리 파라미터로 필터링 가능: ?done=true, ?done=false
router.get('/', (req, res) => {
  const { done } = req.query;

  let 결과 = todos;

  // done 쿼리 파라미터가 있으면 필터링
  if (done !== undefined) {
    const 완료여부 = done === 'true';
    결과 = todos.filter((todo) => todo.done === 완료여부);
  }

  res.json({
    total: 결과.length,
    todos: 결과
  });
});

// GET /:id - 단건 조회
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const 할일 = todos.find((todo) => todo.id === id);

  // 해당 id의 할일이 없으면 404 응답
  if (!할일) {
    return res.status(404).json({ error: '해당 할일을 찾을 수 없습니다' });
  }

  res.json(할일);
});

// POST / - 할일 추가
router.post('/', (req, res) => {
  const { title, priority, category } = req.body;

  // title 유효성 검사
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'title은 필수 항목입니다' });
  }

  // 새 할일 객체 생성
  const 새할일 = {
    id: uuidv4(),
    title: title.trim(),
    done: false,
    priority: priority || 'medium', // 기본 우선순위: medium
    category: category || null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  // 배열에 추가
  todos.push(새할일);

  // 201 Created 상태 코드로 응답
  res.status(201).json(새할일);
});

// PUT /:id - 할일 수정
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const 인덱스 = todos.findIndex((todo) => todo.id === id);

  // 해당 id의 할일이 없으면 404 응답
  if (인덱스 === -1) {
    return res.status(404).json({ error: '해당 할일을 찾을 수 없습니다' });
  }

  const { title, done, priority, category } = req.body;

  // 기존 값을 유지하면서 전달된 값만 업데이트
  todos[인덱스] = {
    ...todos[인덱스],
    title: title !== undefined ? title.trim() : todos[인덱스].title,
    done: done !== undefined ? done : todos[인덱스].done,
    priority: priority !== undefined ? priority : todos[인덱스].priority,
    category: category !== undefined ? category : todos[인덱스].category,
    updatedAt: new Date().toISOString()
  };

  res.json(todos[인덱스]);
});

// DELETE /:id - 할일 삭제
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const 할일 = todos.find((todo) => todo.id === id);

  // 해당 id의 할일이 없으면 404 응답
  if (!할일) {
    return res.status(404).json({ error: '해당 할일을 찾을 수 없습니다' });
  }

  // 해당 할일을 제외한 새 배열로 교체
  todos = todos.filter((todo) => todo.id !== id);

  res.json({ message: '할일이 삭제되었습니다', deleted: 할일 });
});

module.exports = router;
