// ============================================
// Day 27 - Service Layer 패턴
// ============================================
// 학습목표: Controller → Service → Repository 3계층 분리
// 실행: node starter/src/06_service_layer.js

// TODO 1: 커스텀 에러 클래스
// class AppError extends Error { constructor(message, statusCode) { ... } }
// class NotFoundError extends AppError { constructor(resource) { super(`${resource}을(를) 찾을 수 없습니다`, 404) } }
// class ValidationError extends AppError { constructor(message) { super(message, 400) } }

// TODO 2: Repository (데이터 접근 계층)
// class TodoRepository {
//   constructor() { this.todos = []; this.nextId = 1; }
//   findAll() { ... }
//   findById(id) { ... }
//   create(data) { ... }
//   update(id, data) { ... }
//   delete(id) { ... }
// }

// TODO 3: Service (비즈니스 로직 계층)
// class TodoService {
//   constructor(repository) { this.repo = repository; }
//   getAllTodos() { ... }
//   getTodoById(id) { ... 없으면 NotFoundError }
//   createTodo(data) { ... 제목 검증, ValidationError }
//   updateTodo(id, data) { ... }
//   deleteTodo(id) { ... }
//   getStats() { 총 개수, 완료 수, 미완료 수 }
// }

// TODO 4: Controller (HTTP 요청 처리)
// class TodoController {
//   constructor(service) { this.service = service; }
//   getAll(req, res, next) { try { ... } catch(e) { next(e) } }
//   getById(req, res, next) { ... }
//   create(req, res, next) { ... }
//   update(req, res, next) { ... }
//   delete(req, res, next) { ... }
// }

// TODO 5: 에러 핸들링 미들웨어
// function errorHandler(err, req, res, next) {
//   if (err instanceof AppError) { ... }
//   else { 500 서버 에러 }
// }

// TODO 6: 라우터 조립 및 서버 실행
