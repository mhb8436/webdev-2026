const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// 메모리 저장소 (서버 재시작 시 초기화됨)
let todos = [];

// TODO: GET / - 모든 할일 조회
// 힌트: res.json()으로 todos 배열을 반환하세요
router.get('/', (req, res) => {
  // TODO: todos 반환
});

// TODO: GET /:id - 단건 조회
// 힌트: req.params.id로 URL 파라미터를 가져올 수 있습니다
router.get('/:id', (req, res) => {
  // TODO: params에서 id 가져와서 조회
  // TODO: 없으면 404 상태 코드로 응답
});

// TODO: POST / - 할일 추가
// 힌트: req.body에서 데이터를 가져옵니다 (express.json() 미들웨어 필요)
router.post('/', (req, res) => {
  // TODO: body에서 title 가져오기
  // TODO: title이 없으면 400 에러 응답
  // TODO: 새 할일 객체 생성 (uuidv4()로 id 생성)
  // TODO: todos 배열에 추가
  // TODO: 201 상태 코드로 응답
});

// TODO: PUT /:id - 할일 수정
// 힌트: 기존 할일을 찾아서 body의 값으로 업데이트하세요
router.put('/:id', (req, res) => {
  // TODO: id로 할일 찾기
  // TODO: 없으면 404
  // TODO: body 값으로 업데이트
  // TODO: 수정된 할일 반환
});

// TODO: DELETE /:id - 할일 삭제
// 힌트: filter()로 해당 id를 제외하세요
router.delete('/:id', (req, res) => {
  // TODO: id로 할일 찾기
  // TODO: 없으면 404
  // TODO: todos 배열에서 제거
  // TODO: 삭제된 할일 반환
});

module.exports = router;
