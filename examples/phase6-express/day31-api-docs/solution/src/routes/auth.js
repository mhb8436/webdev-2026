const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: 사용자 고유 ID
 *         username:
 *           type: string
 *           description: 사용자명
 *         email:
 *           type: string
 *           description: 이메일 주소
 *     AuthResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: JWT 인증 토큰
 *         user:
 *           $ref: '#/components/schemas/User'
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: 에러 메시지
 */

// JWT 토큰 생성 헬퍼 함수
function generateToken(user) {
  return jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
}

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: 회원가입
 *     description: 새로운 사용자를 등록하고 JWT 토큰을 반환합니다
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: testuser
 *                 description: 사용자명 (고유)
 *               email:
 *                 type: string
 *                 example: test@test.com
 *                 description: 이메일 주소 (고유)
 *               password:
 *                 type: string
 *                 example: password123
 *                 description: 비밀번호 (최소 6자)
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: 입력값 오류
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: 중복된 이메일 또는 사용자명
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 입력값 검증
    if (!username || !email || !password) {
      return res.status(400).json({
        error: '사용자명, 이메일, 비밀번호는 필수 입력값입니다',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: '비밀번호는 최소 6자 이상이어야 합니다',
      });
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 생성
    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });

    // 토큰 발급
    const token = generateToken(user);

    res.status(201).json({
      token,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error) {
    if (error.code === 'P2002') {
      const field = error.meta?.target?.includes('email') ? '이메일' : '사용자명';
      return res.status(409).json({ error: `이미 사용 중인 ${field}입니다` });
    }
    console.error(error);
    res.status(500).json({ error: '회원가입 중 오류가 발생했습니다' });
  }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: 로그인
 *     description: 이메일과 비밀번호로 로그인하고 JWT 토큰을 반환합니다
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@test.com
 *                 description: 이메일 주소
 *               password:
 *                 type: string
 *                 example: password123
 *                 description: 비밀번호
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: 입력값 오류
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 입력값 검증
    if (!email || !password) {
      return res.status(400).json({
        error: '이메일과 비밀번호는 필수 입력값입니다',
      });
    }

    // 사용자 찾기
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({
        error: '이메일 또는 비밀번호가 올바르지 않습니다',
      });
    }

    // 비밀번호 확인
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({
        error: '이메일 또는 비밀번호가 올바르지 않습니다',
      });
    }

    // 토큰 발급
    const token = generateToken(user);

    res.json({
      token,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '로그인 중 오류가 발생했습니다' });
  }
});

module.exports = router;
