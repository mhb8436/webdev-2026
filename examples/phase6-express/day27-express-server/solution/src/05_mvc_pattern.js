// ============================================
// Day 27 - MVC 아키텍처 패턴 (풀이)
// ============================================

const express = require('express');
const app = express();
app.use(express.json());

// ========== MODEL ==========
class TodoModel {
  constructor() {
    this.todos = [];
    this.nextId = 1;
  }

  findAll(filter = {}) {
    let result = [...this.todos];
    if (filter.done !== undefined) {
      result = result.filter(t => t.done === filter.done);
    }
    if (filter.priority) {
      result = result.filter(t => t.priority === filter.priority);
    }
    return result;
  }

  findById(id) {
    return this.todos.find(t => t.id === id) || null;
  }

  create(data) {
    const todo = {
      id: this.nextId++,
      title: data.title,
      done: false,
      priority: data.priority || 'medium',
      category: data.category || null,
      createdAt: new Date().toISOString(),
    };
    this.todos.push(todo);
    return todo;
  }

  update(id, data) {
    const todo = this.findById(id);
    if (!todo) return null;
    Object.assign(todo, data, { updatedAt: new Date().toISOString() });
    return todo;
  }

  delete(id) {
    const index = this.todos.findIndex(t => t.id === id);
    if (index === -1) return null;
    return this.todos.splice(index, 1)[0];
  }
}

// ========== CONTROLLER ==========
class TodoController {
  constructor(model) {
    this.model = model;
  }

  getAll(req, res) {
    const filter = {};
    if (req.query.done !== undefined) filter.done = req.query.done === 'true';
    if (req.query.priority) filter.priority = req.query.priority;

    const todos = this.model.findAll(filter);
    res.json({ total: todos.length, todos });
  }

  getById(req, res) {
    const todo = this.model.findById(Number(req.params.id));
    if (!todo) {
      return res.status(404).json({ error: '할일을 찾을 수 없습니다' });
    }
    res.json(todo);
  }

  create(req, res) {
    const { title } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'title은 필수입니다' });
    }
    const todo = this.model.create(req.body);
    res.status(201).json(todo);
  }

  update(req, res) {
    const todo = this.model.update(Number(req.params.id), req.body);
    if (!todo) {
      return res.status(404).json({ error: '할일을 찾을 수 없습니다' });
    }
    res.json(todo);
  }

  delete(req, res) {
    const deleted = this.model.delete(Number(req.params.id));
    if (!deleted) {
      return res.status(404).json({ error: '할일을 찾을 수 없습니다' });
    }
    res.json({ message: '삭제 완료', deleted });
  }
}

// ========== ROUTER ==========
const model = new TodoModel();
const controller = new TodoController(model);
const router = express.Router();

router.get('/', (req, res) => controller.getAll(req, res));
router.get('/:id', (req, res) => controller.getById(req, res));
router.post('/', (req, res) => controller.create(req, res));
router.put('/:id', (req, res) => controller.update(req, res));
router.delete('/:id', (req, res) => controller.delete(req, res));

app.use('/api/todos', router);

// 에러 처리
app.use((req, res) => {
  res.status(404).json({ error: '리소스를 찾을 수 없습니다' });
});

app.listen(3000, () => {
  // 초기 데이터
  model.create({ title: "MVC 패턴 배우기", priority: "high", category: "공부" });
  model.create({ title: "Express 복습", priority: "medium", category: "공부" });
  console.log('MVC 서버: http://localhost:3000/api/todos');
});
