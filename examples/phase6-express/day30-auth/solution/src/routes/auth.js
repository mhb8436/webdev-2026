const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// JWT 토큰 생성 헬퍼 함수
function generateToken(user) {
  return jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
}

// POST /register - 회원가입
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 입력값 검증
    if (!username || !email || !password) {
      return res.status(400).json({
        error: '사용자명, 이메일, 비밀번호는 필수 입력값입니다',
      });
    }

    // 비밀번호 최소 길이 검증
    if (password.length < 6) {
      return res.status(400).json({
        error: '비밀번호는 최소 6자 이상이어야 합니다',
      });
    }

    // bcrypt.hash()로 비밀번호 암호화 (salt rounds: 10)
    const hashedPassword = await bcrypt.hash(password, 10);

    // prisma.user.create()로 사용자 생성
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // JWT 토큰 발급
    const token = generateToken(user);

    // 응답 반환 (비밀번호는 제외)
    res.status(201).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    // 중복 이메일/유저명 에러 처리 (Prisma unique constraint)
    if (error.code === 'P2002') {
      const field = error.meta?.target?.includes('email') ? '이메일' : '사용자명';
      return res.status(409).json({
        error: `이미 사용 중인 ${field}입니다`,
      });
    }
    console.error(error);
    res.status(500).json({ error: '회원가입 중 오류가 발생했습니다' });
  }
});

// POST /login - 로그인
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 입력값 검증
    if (!email || !password) {
      return res.status(400).json({
        error: '이메일과 비밀번호는 필수 입력값입니다',
      });
    }

    // 이메일로 사용자 찾기
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        error: '이메일 또는 비밀번호가 올바르지 않습니다',
      });
    }

    // bcrypt.compare()로 비밀번호 확인
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({
        error: '이메일 또는 비밀번호가 올바르지 않습니다',
      });
    }

    // JWT 토큰 발급
    const token = generateToken(user);

    // 응답 반환 (비밀번호 제외)
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '로그인 중 오류가 발생했습니다' });
  }
});

module.exports = router;
