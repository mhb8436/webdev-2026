const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// TODO: POST /register - 회원가입
router.post('/register', async (req, res) => {
  try {
    // TODO: username, email, password 받기
    // const { username, email, password } = req.body;

    // TODO: 입력값 검증
    // if (!username || !email || !password) { ... }

    // TODO: bcrypt.hash()로 비밀번호 암호화 (salt rounds: 10)
    // const hashedPassword = await bcrypt.hash(password, 10);

    // TODO: prisma.user.create()로 사용자 생성
    // const user = await prisma.user.create({
    //   data: { username, email, password: hashedPassword }
    // });

    // TODO: JWT 토큰 발급
    // const token = jwt.sign(
    //   { userId: user.id, email: user.email },
    //   process.env.JWT_SECRET,
    //   { expiresIn: '24h' }
    // );

    // TODO: 응답 반환 (비밀번호는 제외)
    // res.status(201).json({ token, user: { id, username, email } });

    res.status(501).json({ error: '회원가입 기능을 구현해주세요' });
  } catch (error) {
    // TODO: 중복 이메일/유저명 에러 처리
    console.error(error);
    res.status(500).json({ error: '회원가입 중 오류가 발생했습니다' });
  }
});

// TODO: POST /login - 로그인
router.post('/login', async (req, res) => {
  try {
    // TODO: email, password 받기
    // const { email, password } = req.body;

    // TODO: 이메일로 사용자 찾기
    // const user = await prisma.user.findUnique({ where: { email } });
    // if (!user) { 사용자를 찾을 수 없음 }

    // TODO: bcrypt.compare()로 비밀번호 확인
    // const isValid = await bcrypt.compare(password, user.password);
    // if (!isValid) { 비밀번호가 일치하지 않음 }

    // TODO: JWT 토큰 발급
    // const token = jwt.sign(
    //   { userId: user.id, email: user.email },
    //   process.env.JWT_SECRET,
    //   { expiresIn: '24h' }
    // );

    // TODO: 응답 반환
    // res.json({ token, user: { id, username, email } });

    res.status(501).json({ error: '로그인 기능을 구현해주세요' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '로그인 중 오류가 발생했습니다' });
  }
});

module.exports = router;
