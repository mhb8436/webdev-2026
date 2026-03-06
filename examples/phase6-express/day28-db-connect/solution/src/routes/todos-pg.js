// ============================================
// Day 28 - PostgreSQL CRUD 라우트 (풀이)
// ============================================
const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

// --- Pool 설정 ---
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'myapp',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
});

// --- 테이블 초기화 ---
async function initTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      completed BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `);
}
initTable().catch(console.error);

// --- GET /api/todos ---
router.get('/', async (req, res, next) => {
  try {
    const { completed, search, page = '1', limit = '20' } = req.query;
    const conditions = [];
    const params = [];
    let paramIndex = 1;

    if (completed !== undefined) {
      conditions.push(`completed = $${paramIndex++}`);
      params.push(completed === 'true');
    }

    if (search) {
      conditions.push(`title ILIKE $${paramIndex++}`);
      params.push(`%${search}%`);
    }

    const where = conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : '';
    const offset = (Number(page) - 1) * Number(limit);

    // 전체 개수
    const countResult = await pool.query(
      `SELECT COUNT(*) FROM todos ${where}`, params
    );
    const total = Number(countResult.rows[0].count);

    // 데이터 조회
    const result = await pool.query(
      `SELECT * FROM todos ${where} ORDER BY created_at DESC LIMIT $${paramIndex++} OFFSET $${paramIndex}`,
      [...params, Number(limit), offset]
    );

    res.json({
      data: result.rows,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (err) {
    next(err);
  }
});

// --- GET /api/todos/:id ---
router.get('/:id', async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM todos WHERE id = $1', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Todo를 찾을 수 없습니다' });
    }
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// --- POST /api/todos ---
router.post('/', async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'title은 필수입니다' });
    }

    const { rows } = await pool.query(
      'INSERT INTO todos (title) VALUES ($1) RETURNING *',
      [title.trim()]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// --- PUT /api/todos/:id ---
router.put('/:id', async (req, res, next) => {
  try {
    const { title, completed } = req.body;
    const { rows } = await pool.query(
      `UPDATE todos
       SET title = COALESCE($1, title),
           completed = COALESCE($2, completed),
           updated_at = NOW()
       WHERE id = $3
       RETURNING *`,
      [title, completed, req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Todo를 찾을 수 없습니다' });
    }
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// --- DELETE /api/todos/:id ---
router.delete('/:id', async (req, res, next) => {
  try {
    const { rowCount } = await pool.query(
      'DELETE FROM todos WHERE id = $1', [req.params.id]
    );
    if (rowCount === 0) {
      return res.status(404).json({ error: 'Todo를 찾을 수 없습니다' });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

// --- PATCH /api/todos/:id/toggle ---
router.patch('/:id/toggle', async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `UPDATE todos
       SET completed = NOT completed, updated_at = NOW()
       WHERE id = $1
       RETURNING *`,
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Todo를 찾을 수 없습니다' });
    }
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
