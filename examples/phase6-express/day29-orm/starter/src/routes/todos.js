const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// TODO: GET / - 모든 할일 조회
// 힌트: prisma.todo.findMany()는 Promise를 반환하므로 async/await 사용
router.get('/', async (req, res) => {
  // TODO: prisma.todo.findMany()로 모든 할일 조회
  // TODO: 쿼리 파라미터로 필터링 (done, category)
  // TODO: try/catch로 에러 처리
});

// TODO: GET /:id - 단건 조회
// 힌트: prisma.todo.findUnique({ where: { id: Number(req.params.id) } })
router.get('/:id', async (req, res) => {
  // TODO: id로 할일 조회
  // TODO: 없으면 404 응답
  // TODO: try/catch로 에러 처리
});

// TODO: POST / - 할일 추가
// 힌트: prisma.todo.create({ data: { title, priority, category } })
router.post('/', async (req, res) => {
  // TODO: body에서 title, priority, category 가져오기
  // TODO: title 유효성 검사
  // TODO: prisma.todo.create()로 생성
  // TODO: 201 상태 코드로 응답
  // TODO: try/catch로 에러 처리
});

// TODO: PUT /:id - 할일 수정
// 힌트: prisma.todo.update({ where: { id }, data: { ... } })
router.put('/:id', async (req, res) => {
  // TODO: prisma.todo.update()로 수정
  // TODO: 존재하지 않는 id면 에러 처리
  // TODO: try/catch로 에러 처리
});

// TODO: DELETE /:id - 할일 삭제
// 힌트: prisma.todo.delete({ where: { id } })
router.delete('/:id', async (req, res) => {
  // TODO: prisma.todo.delete()로 삭제
  // TODO: 존재하지 않는 id면 에러 처리
  // TODO: try/catch로 에러 처리
});

module.exports = router;
