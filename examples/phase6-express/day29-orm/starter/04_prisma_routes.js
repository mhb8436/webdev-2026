// ============================================
// Day 29 - Prisma CRUD 라우트
// ============================================
// 학습목표: Prisma로 Express REST API 구현
// 실행: node starter/04_prisma_routes.js

const express = require('express');
const app = express();
app.use(express.json());

// TODO 1: Prisma Client 설정
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// TODO 2: GET /api/posts
// - findMany로 전체 조회
// - include: { author: true } 로 작성자 정보 포함
// - where: { published: true } 필터
// - orderBy: { createdAt: 'desc' }
// - 페이지네이션: skip, take

// TODO 3: GET /api/posts/:id
// - findUnique
// - include: { author: true, comments: { include: { author: true } } }

// TODO 4: POST /api/posts
// - create with data
// - connect로 기존 작성자 연결: author: { connect: { id: authorId } }

// TODO 5: PUT /api/posts/:id
// - update with where + data

// TODO 6: DELETE /api/posts/:id
// - delete with where
// - 연쇄 삭제: 댓글도 함께 삭제 (schema에서 onDelete: Cascade)

// TODO 7: GET /api/users/:id/posts
// - 특정 사용자의 게시글 조회
// - findMany with where: { authorId: id }

// TODO 8: POST /api/posts/:id/comments
// - 댓글 추가
// - create with connect (post, author)
