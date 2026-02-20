// Day 29 - ORM (Prisma) 연습 문제
// 사전 준비:
//   npm init -y
//   npm install express @prisma/client
//   npm install -D prisma
//   npx prisma init
//   schema.prisma 파일 작성 후: npx prisma migrate dev --name init

const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

app.use(express.json());

// ============================================
// 문제 1: 블로그 ORM
// Post 모델의 CRUD API를 구현하세요.
// schema.prisma에 Post 모델을 먼저 정의하세요.
// ============================================

// POST /api/posts - 새 게시글 작성

// GET /api/posts - 전체 게시글 목록 조회

// GET /api/posts/:id - 특정 게시글 상세 조회

// PUT /api/posts/:id - 게시글 수정

// DELETE /api/posts/:id - 게시글 삭제

// ============================================
// 문제 2: 관계 설정
// User와 Post 모델을 1:N 관계로 정의하세요.
// schema.prisma에 User 모델과 관계를 추가하세요.
// ============================================

// POST /api/users - 사용자 생성

// GET /api/users - 사용자 목록 조회 (작성한 글 포함)

// GET /api/users/:id/posts - 특정 사용자의 글 목록 조회

// POST /api/users/:id/posts - 특정 사용자로 글 작성

// ============================================
// 문제 3: Prisma 쿼리 연습
// Product 모델에 대한 다양한 쿼리를 구현하세요.
// schema.prisma에 Product, Category 모델을 추가하세요.
// ============================================

// GET /api/products/search - 조건 검색 (where)
// 쿼리: ?category=전자기기&minPrice=10000&maxPrice=50000

// GET /api/products - 정렬 + 페이지네이션
// 쿼리: ?sort=price&order=asc&page=1&limit=10

// GET /api/products/names - 필드 선택 (select)
// id와 name만 반환

// GET /api/products/:id - 관계 포함 (include)
// 쿼리: ?includeCategory=true

// ============================================
// 서버 시작
// ============================================
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
