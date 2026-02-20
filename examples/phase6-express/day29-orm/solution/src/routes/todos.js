const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

// PrismaClient 인스턴스 생성 (앱 전체에서 하나만 사용)
const prisma = new PrismaClient();

// GET / - 모든 할일 조회
// 쿼리 파라미터: ?done=true, ?category=학습, ?sort=createdAt, ?order=desc
router.get('/', async (req, res) => {
  try {
    const { done, category, sort, order } = req.query;

    // where 조건 구성
    const where = {};

    // done 필터링 (문자열 'true'/'false'를 boolean으로 변환)
    if (done !== undefined) {
      where.done = done === 'true';
    }

    // 카테고리 필터링
    if (category) {
      where.category = category;
    }

    // 정렬 조건 구성
    const orderBy = {};
    const 정렬기준 = sort || 'createdAt';
    const 정렬순서 = order || 'desc';
    orderBy[정렬기준] = 정렬순서;

    const todos = await prisma.todo.findMany({
      where,
      orderBy
    });

    res.json({
      total: todos.length,
      todos
    });
  } catch (err) {
    console.error('할일 목록 조회 에러:', err.message);
    res.status(500).json({ error: '할일 목록 조회에 실패했습니다' });
  }
});

// GET /:id - 단건 조회
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    // id가 유효한 숫자인지 확인
    if (isNaN(id)) {
      return res.status(400).json({ error: 'id는 숫자여야 합니다' });
    }

    const todo = await prisma.todo.findUnique({
      where: { id }
    });

    if (!todo) {
      return res.status(404).json({ error: '해당 할일을 찾을 수 없습니다' });
    }

    res.json(todo);
  } catch (err) {
    console.error('할일 조회 에러:', err.message);
    res.status(500).json({ error: '할일 조회에 실패했습니다' });
  }
});

// POST / - 할일 추가
router.post('/', async (req, res) => {
  try {
    const { title, priority, category } = req.body;

    // title 유효성 검사
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'title은 필수 항목입니다' });
    }

    // 우선순위 유효성 검사
    const 유효한우선순위 = ['low', 'medium', 'high'];
    if (priority && !유효한우선순위.includes(priority)) {
      return res.status(400).json({
        error: `priority는 ${유효한우선순위.join(', ')} 중 하나여야 합니다`
      });
    }

    // Prisma로 할일 생성
    const 새할일 = await prisma.todo.create({
      data: {
        title: title.trim(),
        priority: priority || 'medium',
        category: category || null
      }
    });

    res.status(201).json(새할일);
  } catch (err) {
    console.error('할일 추가 에러:', err.message);
    res.status(500).json({ error: '할일 추가에 실패했습니다' });
  }
});

// PUT /:id - 할일 수정
router.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: 'id는 숫자여야 합니다' });
    }

    const { title, done, priority, category } = req.body;

    // 업데이트할 데이터 구성 (전달된 값만 포함)
    const 수정데이터 = {};
    if (title !== undefined) 수정데이터.title = title.trim();
    if (done !== undefined) 수정데이터.done = done;
    if (priority !== undefined) 수정데이터.priority = priority;
    if (category !== undefined) 수정데이터.category = category;

    // Prisma로 할일 수정
    const 수정된할일 = await prisma.todo.update({
      where: { id },
      data: 수정데이터
    });

    res.json(수정된할일);
  } catch (err) {
    // Prisma에서 레코드를 찾지 못하면 P2025 에러 발생
    if (err.code === 'P2025') {
      return res.status(404).json({ error: '해당 할일을 찾을 수 없습니다' });
    }
    console.error('할일 수정 에러:', err.message);
    res.status(500).json({ error: '할일 수정에 실패했습니다' });
  }
});

// DELETE /:id - 할일 삭제
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: 'id는 숫자여야 합니다' });
    }

    // Prisma로 할일 삭제
    const 삭제된할일 = await prisma.todo.delete({
      where: { id }
    });

    res.json({ message: '할일이 삭제되었습니다', deleted: 삭제된할일 });
  } catch (err) {
    // Prisma에서 레코드를 찾지 못하면 P2025 에러 발생
    if (err.code === 'P2025') {
      return res.status(404).json({ error: '해당 할일을 찾을 수 없습니다' });
    }
    console.error('할일 삭제 에러:', err.message);
    res.status(500).json({ error: '할일 삭제에 실패했습니다' });
  }
});

module.exports = router;
