const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authenticate = require('../middleware/auth');

// 모든 할일 라우트에 인증 미들웨어 적용
router.use(authenticate);

// GET /api/todos - 내 할일 전체 조회
router.get('/', async (req, res) => {
  try {
    // req.user.userId로 본인의 할일만 조회
    const todos = await prisma.todo.findMany({
      where: { userId: req.user.userId },
      orderBy: { createdAt: 'desc' },
    });
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '할일 조회 중 오류가 발생했습니다' });
  }
});

// GET /api/todos/:id - 특정 할일 조회
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // 본인의 할일인지 확인
    const todo = await prisma.todo.findFirst({
      where: {
        id: parseInt(id),
        userId: req.user.userId,
      },
    });

    if (!todo) {
      return res.status(404).json({ error: '할일을 찾을 수 없습니다' });
    }

    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '할일 조회 중 오류가 발생했습니다' });
  }
});

// POST /api/todos - 할일 생성
router.post('/', async (req, res) => {
  try {
    const { title, priority, category } = req.body;

    // 제목 필수 검증
    if (!title) {
      return res.status(400).json({ error: '할일 제목은 필수입니다' });
    }

    // 본인의 userId를 포함하여 할일 생성
    const todo = await prisma.todo.create({
      data: {
        title,
        priority: priority || 'medium',
        category,
        userId: req.user.userId,
      },
    });

    res.status(201).json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '할일 생성 중 오류가 발생했습니다' });
  }
});

// PUT /api/todos/:id - 할일 수정
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, done, priority, category } = req.body;

    // 본인의 할일인지 확인
    const existing = await prisma.todo.findFirst({
      where: {
        id: parseInt(id),
        userId: req.user.userId,
      },
    });

    if (!existing) {
      return res.status(404).json({ error: '할일을 찾을 수 없습니다' });
    }

    // 할일 수정
    const todo = await prisma.todo.update({
      where: { id: parseInt(id) },
      data: {
        ...(title !== undefined && { title }),
        ...(done !== undefined && { done }),
        ...(priority !== undefined && { priority }),
        ...(category !== undefined && { category }),
      },
    });

    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '할일 수정 중 오류가 발생했습니다' });
  }
});

// DELETE /api/todos/:id - 할일 삭제
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // 본인의 할일인지 확인
    const existing = await prisma.todo.findFirst({
      where: {
        id: parseInt(id),
        userId: req.user.userId,
      },
    });

    if (!existing) {
      return res.status(404).json({ error: '할일을 찾을 수 없습니다' });
    }

    // 할일 삭제
    await prisma.todo.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: '할일이 삭제되었습니다' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '할일 삭제 중 오류가 발생했습니다' });
  }
});

module.exports = router;
