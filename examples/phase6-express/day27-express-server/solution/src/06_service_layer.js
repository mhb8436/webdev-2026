// ============================================
// Day 27 - 서비스 레이어 패턴 (풀이)
// ============================================
// Controller → Service → Repository 3계층 구조

const express = require('express');
const app = express();
app.use(express.json());

// ========== REPOSITORY (데이터 접근 계층) ==========
class TodoRepository {
  constructor() {
    this.todos = [];
    this.nextId = 1;
  }

  findAll() { return [...this.todos]; }
  findById(id) { return this.todos.find(t => t.id === id) || null; }
  findByFilter(predicate) { return this.todos.filter(predicate); }

  save(todo) {
    todo.id = this.nextId++;
    todo.createdAt = new Date().toISOString();
    this.todos.push(todo);
    return todo;
  }

  update(id, data) {
    const todo = this.findById(id);
    if (!todo) return null;
    Object.assign(todo, data, { updatedAt: new Date().toISOString() });
    return todo;
  }

  deleteById(id) {
    const idx = this.todos.findIndex(t => t.id === id);
    if (idx === -1) return false;
    this.todos.splice(idx, 1);
    return true;
  }
}

// ========== SERVICE (비즈니스 로직 계층) ==========
class TodoService {
  constructor(repository) {
    this.repo = repository;
  }

  getAllTodos({ priority, done, search } = {}) {
    let todos = this.repo.findAll();
    if (priority) todos = todos.filter(t => t.priority === priority);
    if (done !== undefined) todos = todos.filter(t => t.done === done);
    if (search) todos = todos.filter(t => t.title.includes(search));
    return todos;
  }

  getTodoById(id) {
    const todo = this.repo.findById(id);
    if (!todo) throw new NotFoundError(`할일 ${id}를 찾을 수 없습니다`);
    return todo;
  }

  createTodo(data) {
    if (!data.title?.trim()) throw new ValidationError('title은 필수입니다');
    const validPriorities = ['high', 'medium', 'low'];
    if (data.priority && !validPriorities.includes(data.priority)) {
      throw new ValidationError('유효하지 않은 우선순위');
    }
    return this.repo.save({
      title: data.title.trim(),
      done: false,
      priority: data.priority || 'medium',
      category: data.category || null,
    });
  }

  updateTodo(id, data) {
    this.getTodoById(id); // 존재 확인
    return this.repo.update(id, data);
  }

  deleteTodo(id) {
    this.getTodoById(id);
    return this.repo.deleteById(id);
  }

  getStats() {
    const all = this.repo.findAll();
    return {
      total: all.length,
      completed: all.filter(t => t.done).length,
      active: all.filter(t => !t.done).length,
      byPriority: {
        high: all.filter(t => t.priority === 'high').length,
        medium: all.filter(t => t.priority === 'medium').length,
        low: all.filter(t => t.priority === 'low').length,
      },
    };
  }
}

// 커스텀 에러
class NotFoundError extends Error {
  constructor(msg) { super(msg); this.status = 404; }
}
class ValidationError extends Error {
  constructor(msg) { super(msg); this.status = 400; }
}

// ========== CONTROLLER (요청/응답 처리) ==========
function createTodoRouter(service) {
  const router = express.Router();

  router.get('/', (req, res, next) => {
    try {
      const filter = {
        priority: req.query.priority,
        done: req.query.done !== undefined ? req.query.done === 'true' : undefined,
        search: req.query.search,
      };
      const todos = service.getAllTodos(filter);
      res.json({ total: todos.length, todos });
    } catch (e) { next(e); }
  });

  router.get('/stats', (req, res) => {
    res.json(service.getStats());
  });

  router.get('/:id', (req, res, next) => {
    try {
      res.json(service.getTodoById(Number(req.params.id)));
    } catch (e) { next(e); }
  });

  router.post('/', (req, res, next) => {
    try {
      const todo = service.createTodo(req.body);
      res.status(201).json(todo);
    } catch (e) { next(e); }
  });

  router.put('/:id', (req, res, next) => {
    try {
      res.json(service.updateTodo(Number(req.params.id), req.body));
    } catch (e) { next(e); }
  });

  router.delete('/:id', (req, res, next) => {
    try {
      service.deleteTodo(Number(req.params.id));
      res.json({ message: '삭제 완료' });
    } catch (e) { next(e); }
  });

  return router;
}

// ========== 조립 및 실행 ==========
const repo = new TodoRepository();
const service = new TodoService(repo);

app.use('/api/todos', createTodoRouter(service));

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ error: err.message });
});

app.listen(3000, () => {
  service.createTodo({ title: "서비스 레이어 배우기", priority: "high" });
  service.createTodo({ title: "패턴 적용하기", priority: "medium" });
  console.log('서비스 레이어 서버: http://localhost:3000/api/todos');
  console.log('통계: http://localhost:3000/api/todos/stats');
});
