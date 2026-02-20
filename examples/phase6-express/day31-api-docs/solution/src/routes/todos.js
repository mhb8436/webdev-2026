const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authenticate = require('../middleware/auth');

// 모든 할일 라우트에 인증 미들웨어 적용
router.use(authenticate);

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: 할일 고유 ID
 *         title:
 *           type: string
 *           description: 할일 제목
 *         done:
 *           type: boolean
 *           description: 완료 여부
 *         priority:
 *           type: string
 *           enum: [low, medium, high]
 *           description: 우선순위
 *         category:
 *           type: string
 *           nullable: true
 *           description: 카테고리
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: 생성일시
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: 수정일시
 *         userId:
 *           type: integer
 *           description: 사용자 ID
 */

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: 내 할일 전체 조회
 *     description: 인증된 사용자의 모든 할일을 조회합니다
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 할일 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 *       401:
 *         description: 인증 필요
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
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
 * @swagger
 * /api/todos/{id}:
 *   get:
 *     summary: 특정 할일 조회
 *     description: ID로 특정 할일을 조회합니다
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 할일 ID
 *     responses:
 *       200:
 *         description: 할일 상세 정보
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: 할일을 찾을 수 없음
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await prisma.todo.findFirst({
      where: { id: parseInt(id), userId: req.user.userId },
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

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: 할일 생성
 *     description: 새로운 할일을 생성합니다
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
 *                 example: 공부하기
 *                 description: 할일 제목
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 example: high
 *                 description: 우선순위 (기본값: medium)
 *               category:
 *                 type: string
 *                 example: 학습
 *                 description: 카테고리 (선택)
 *     responses:
 *       201:
 *         description: 할일 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: 입력값 오류
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
 * @swagger
 * /api/todos/{id}:
 *   put:
 *     summary: 할일 수정
 *     description: 기존 할일을 수정합니다
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 할일 ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: 할일 제목
 *               done:
 *                 type: boolean
 *                 description: 완료 여부
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 description: 우선순위
 *               category:
 *                 type: string
 *                 description: 카테고리
 *     responses:
 *       200:
 *         description: 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: 할일을 찾을 수 없음
 *       401:
 *         description: 인증 필요
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
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: 할일 삭제
 *     description: 할일을 삭제합니다
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 할일 ID
 *     responses:
 *       200:
 *         description: 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: 할일을 찾을 수 없음
 *       401:
 *         description: 인증 필요
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
