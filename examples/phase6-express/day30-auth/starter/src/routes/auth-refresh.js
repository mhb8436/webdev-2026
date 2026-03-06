// ============================================
// Day 30 - Refresh Token 인증 플로우
// ============================================
// 학습목표: Access Token + Refresh Token 이중 토큰 시스템

const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// TODO 1: 토큰 설정
// const ACCESS_SECRET = process.env.JWT_SECRET || 'access-secret';
// const REFRESH_SECRET = process.env.REFRESH_SECRET || 'refresh-secret';
// const ACCESS_EXPIRY = '15m';   // 짧은 수명
// const REFRESH_EXPIRY = '7d';   // 긴 수명

// TODO 2: Refresh Token 저장소 (실제로는 DB/Redis 사용)
// const refreshTokens = new Set();

// TODO 3: 토큰 생성 함수
// function generateTokens(userId, role) {
//   const accessToken = jwt.sign({userId, role}, ACCESS_SECRET, {expiresIn: ACCESS_EXPIRY});
//   const refreshToken = jwt.sign({userId, role}, REFRESH_SECRET, {expiresIn: REFRESH_EXPIRY});
//   refreshTokens.add(refreshToken);
//   return { accessToken, refreshToken };
// }

// TODO 4: POST /login - 로그인 시 양쪽 토큰 발급
// TODO 5: POST /refresh - Refresh Token으로 새 Access Token 발급
// TODO 6: POST /logout - Refresh Token 무효화

// module.exports = router;
