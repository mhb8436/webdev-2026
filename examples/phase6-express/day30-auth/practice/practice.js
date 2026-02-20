// Day 30 - JWT 인증 연습 문제
// 사전 준비:
//   npm init -y
//   npm install express jsonwebtoken bcryptjs

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'my-secret-key-for-practice';

app.use(express.json());

// 메모리 저장소
const users = [];
let nextId = 1;

// ============================================
// 문제 1: 회원가입/로그인 API
// ============================================

// POST /api/auth/register - 회원가입
// - username, email, password를 받아 사용자 생성
// - bcrypt.hash()로 비밀번호 해싱 (saltRounds: 10)
// - 이미 존재하는 email이면 409 에러
// - 성공 시 사용자 정보 반환 (비밀번호 제외)

// POST /api/auth/login - 로그인
// - email, password를 받아 인증
// - bcrypt.compare()로 비밀번호 검증
// - 성공 시 JWT 토큰 발급 (jwt.sign())
// - payload: { id, username, email, role }
// - 만료 시간: 1시간

// ============================================
// 문제 2: 인증 미들웨어
// ============================================

// authMiddleware 함수 작성
// - Authorization 헤더에서 Bearer 토큰 추출
// - jwt.verify()로 토큰 검증
// - 유효하면 req.user에 디코딩된 정보 저장 후 next()
// - 토큰 없으면 401: "인증 토큰이 필요합니다."
// - 토큰 유효하지 않으면 401: "유효하지 않은 토큰입니다."

// GET /api/profile - 내 프로필 조회 (인증 필요)
// - authMiddleware 적용
// - req.user 정보 반환

// ============================================
// 문제 3: 역할 기반 접근 제어
// ============================================

// roleMiddleware(requiredRole) 함수 작성
// - req.user.role이 requiredRole과 일치하는지 확인
// - 불일치 시 403: "접근 권한이 없습니다."

// GET /api/admin/users - 전체 사용자 목록 (admin만)
// - authMiddleware + roleMiddleware('admin') 적용
// - 비밀번호 제외하고 반환

// DELETE /api/admin/users/:id - 사용자 삭제 (admin만)
// - authMiddleware + roleMiddleware('admin') 적용

// ============================================
// 서버 시작
// ============================================
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
