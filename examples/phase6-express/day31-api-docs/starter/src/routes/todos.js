const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authenticate = require('../middleware/auth');

// 모든 할일 라우트에 인증 미들웨어 적용
router.use(authenticate);

/**
 * TODO: Swagger 문서 작성
 * @swagger
 * /api/todos:
 *   get:
 *     summary: 모든 할일 조회
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 할일 목록
 *       401:
 *         description: 인증 필요
 */
router.get('/', async (req, res) => {
  try {
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

/**
 * TODO: Swagger 문서 작성
 * @swagger
 * /api/todos:
 *   post:
 *     summary: 할일 생성
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: 할일 생성 성공
 *       401:
 *         description: 인증 필요
 */
router.post('/', async (req, res) => {
  try {
    const { title, priority, category } = req.body;

    if (!title) {
      return res.status(400).json({ error: '할일 제목은 필수입니다' });
    }

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

/**
 * TODO: Swagger 문서 작성
 * @swagger
 * /api/todos/{id}:
 *   put:
 *     summary: 할일 수정
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               done:
 *                 type: boolean
 *               priority:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: 수정 성공
 *       404:
 *         description: 할일을 찾을 수 없음
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, done, priority, category } = req.body;

    const existing = await prisma.todo.findFirst({
      where: { id: parseInt(id), userId: req.user.userId },
    });

    if (!existing) {
      return res.status(404).json({ error: '할일을 찾을 수 없습니다' });
    }

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

/**
 * TODO: Swagger 문서 작성
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: 할일 삭제
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 삭제 성공
 *       404:
 *         description: 할일을 찾을 수 없음
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await prisma.todo.findFirst({
      where: { id: parseInt(id), userId: req.user.userId },
    });

    if (!existing) {
      return res.status(404).json({ error: '할일을 찾을 수 없습니다' });
    }

    await prisma.todo.delete({ where: { id: parseInt(id) } });

    res.json({ message: '할일이 삭제되었습니다' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '할일 삭제 중 오류가 발생했습니다' });
  }
});

module.exports = router;
