// ============================================
// Day 27 - MVC 아키텍처 패턴 (단일 파일 데모)
// ============================================
// 학습목표: Model-View-Controller 패턴 이해
// 실제 프로젝트에서는 별도 파일로 분리합니다

const express = require('express');
const app = express();
app.use(express.json());

// === MODEL (데이터 계층) ===
// TODO: Todo 모델 클래스 작성
// class TodoModel {
//   constructor() - todos 배열, nextId 초기화
//   findAll() - 전체 조회
//   findById(id) - 단건 조회
//   create(data) - 생성
//   update(id, data) - 수정
//   delete(id) - 삭제
// }


// === CONTROLLER (비즈니스 로직) ===
// TODO: TodoController 클래스 작성
// class TodoController {
//   constructor(model) - 모델 주입
//   getAll(req, res) - GET 핸들러
//   getById(req, res) - GET /:id 핸들러
//   create(req, res) - POST 핸들러
//   update(req, res) - PUT /:id 핸들러
//   delete(req, res) - DELETE /:id 핸들러
// }


// === ROUTER (라우트 정의) ===
// TODO: 라우터에 컨트롤러 메서드 연결
// const router = express.Router();
// router.get('/', (req, res) => controller.getAll(req, res));
// ...

// app.use('/api/todos', router);
// app.listen(3000);
