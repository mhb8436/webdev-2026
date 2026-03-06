// ============================================
// Day 28 - 사용자 CRUD 라우트
// ============================================
// 학습목표: 사용자 관리 API, 비밀번호 해싱
// 사용: app.use('/api/users', usersRouter);

const express = require('express');
const router = express.Router();

// TODO 1: 테이블 생성
// CREATE TABLE IF NOT EXISTS users (
//   id SERIAL PRIMARY KEY,
//   name VARCHAR(100) NOT NULL,
//   email VARCHAR(255) UNIQUE NOT NULL,
//   password_hash VARCHAR(255) NOT NULL,
//   role VARCHAR(20) DEFAULT 'user',
//   created_at TIMESTAMP DEFAULT NOW()
// );

// TODO 2: 비밀번호 해싱
// const bcrypt = require('bcrypt');
// 가입: const hash = await bcrypt.hash(password, 10);
// 로그인: const match = await bcrypt.compare(password, hash);

// TODO 3: GET /api/users
// - 전체 조회 (password_hash 제외!)
// - SELECT id, name, email, role, created_at FROM users

// TODO 4: GET /api/users/:id
// - 단일 조회 (password_hash 제외)

// TODO 5: POST /api/users (회원가입)
// - name, email, password 필수 검증
// - 이메일 중복 확인
// - 비밀번호 해싱 후 저장
// - 응답에서 password_hash 제외

// TODO 6: PUT /api/users/:id
// - name, email 수정
// - 비밀번호 변경 시 현재 비밀번호 확인 필요

// TODO 7: DELETE /api/users/:id
// - 사용자 삭제

module.exports = router;
