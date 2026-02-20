const express = require('express');
const router = express.Router();
const db = require('../database');

// GET / - 모든 할일 조회
// 쿼리 파라미터: ?done=1 (완료), ?done=0 (미완료), ?search=키워드
router.get('/', (req, res) => {
  try {
    const { done, search } = req.query;
    let sql = 'SELECT * FROM todos';
    const 조건들 = [];
    const 파라미터들 = [];

    // done 필터링
    if (done !== undefined) {
      조건들.push('done = ?');
      파라미터들.push(Number(done));
    }

    // 검색 필터링
    if (search) {
      조건들.push('title LIKE ?');
      파라미터들.push(`%${search}%`);
    }

    // WHERE 절 추가
    if (조건들.length > 0) {
      sql += ' WHERE ' + 조건들.join(' AND ');
    }

    sql += ' ORDER BY created_at DESC';

    const todos = db.prepare(sql).all(...파라미터들);

    res.json({
      total: todos.length,
      todos: todos.map(할일변환)
    });
  } catch (err) {
    console.error('할일 목록 조회 에러:', err.message);
    res.status(500).json({ error: '할일 목록 조회에 실패했습니다' });
  }
});

// GET /:id - 단건 조회
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const todo = db.prepare('SELECT * FROM todos WHERE id = ?').get(id);

    if (!todo) {
      return res.status(404).json({ error: '해당 할일을 찾을 수 없습니다' });
    }

    res.json(할일변환(todo));
  } catch (err) {
    console.error('할일 조회 에러:', err.message);
    res.status(500).json({ error: '할일 조회에 실패했습니다' });
  }
});

// POST / - 할일 추가
router.post('/', (req, res) => {
  try {
    const { title, priority, category } = req.body;

    // 유효성 검사
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'title은 필수 항목입니다' });
    }

    // 우선순위 유효성 검사
    const 유효한우선순위 = ['low', 'medium', 'high'];
    if (priority && !유효한우선순위.includes(priority)) {
      return res.status(400).json({
        error: `priority는 ${유효한우선순위.join(', ')} 중 하나여야 합니다`
      });
    }

    // DB에 삽입
    const 결과 = db.prepare(
      'INSERT INTO todos (title, priority, category) VALUES (?, ?, ?)'
    ).run(title.trim(), priority || 'medium', category || null);

    // 생성된 할일 조회하여 반환
    const 새할일 = db.prepare('SELECT * FROM todos WHERE id = ?').get(결과.lastInsertRowid);

    res.status(201).json(할일변환(새할일));
  } catch (err) {
    console.error('할일 추가 에러:', err.message);
    res.status(500).json({ error: '할일 추가에 실패했습니다' });
  }
});

// PUT /:id - 할일 수정
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;

    // 기존 할일 조회
    const 기존할일 = db.prepare('SELECT * FROM todos WHERE id = ?').get(id);
    if (!기존할일) {
      return res.status(404).json({ error: '해당 할일을 찾을 수 없습니다' });
    }

    const { title, done, priority, category } = req.body;

    // 기존 값을 유지하면서 전달된 값만 업데이트
    const 수정값 = {
      title: title !== undefined ? title.trim() : 기존할일.title,
      done: done !== undefined ? (done ? 1 : 0) : 기존할일.done,
      priority: priority !== undefined ? priority : 기존할일.priority,
      category: category !== undefined ? category : 기존할일.category
    };

    db.prepare(`
      UPDATE todos
      SET title = ?, done = ?, priority = ?, category = ?, updated_at = datetime('now', 'localtime')
      WHERE id = ?
    `).run(수정값.title, 수정값.done, 수정값.priority, 수정값.category, id);

    // 수정된 할일 조회하여 반환
    const 수정된할일 = db.prepare('SELECT * FROM todos WHERE id = ?').get(id);

    res.json(할일변환(수정된할일));
  } catch (err) {
    console.error('할일 수정 에러:', err.message);
    res.status(500).json({ error: '할일 수정에 실패했습니다' });
  }
});

// DELETE /:id - 할일 삭제
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;

    // 삭제 전 할일 조회
    const 할일 = db.prepare('SELECT * FROM todos WHERE id = ?').get(id);
    if (!할일) {
      return res.status(404).json({ error: '해당 할일을 찾을 수 없습니다' });
    }

    // 삭제 실행
    db.prepare('DELETE FROM todos WHERE id = ?').run(id);

    res.json({ message: '할일이 삭제되었습니다', deleted: 할일변환(할일) });
  } catch (err) {
    console.error('할일 삭제 에러:', err.message);
    res.status(500).json({ error: '할일 삭제에 실패했습니다' });
  }
});

// SQLite의 done(0/1)을 boolean으로 변환하는 헬퍼 함수
function 할일변환(todo) {
  return {
    ...todo,
    done: Boolean(todo.done)
  };
}

module.exports = router;
