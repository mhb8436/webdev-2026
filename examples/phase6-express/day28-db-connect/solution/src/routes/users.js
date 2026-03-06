// ============================================
// Day 28 - 사용자 CRUD 라우트 (풀이)
// ============================================
const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

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
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      role VARCHAR(20) DEFAULT 'user',
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);
}
initTable().catch(console.error);

// password_hash 제외 컬럼
const SAFE_COLUMNS = 'id, name, email, role, created_at';

// --- GET /api/users ---
router.get('/', async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT ${SAFE_COLUMNS} FROM users ORDER BY created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// --- GET /api/users/:id ---
router.get('/:id', async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT ${SAFE_COLUMNS} FROM users WHERE id = $1`,
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: '사용자를 찾을 수 없습니다' });
    }
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// --- POST /api/users (회원가입) ---
router.post('/', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // 필수 값 검증
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'name, email, password는 필수입니다' });
    }

    // 비밀번호 길이 검증
    if (password.length < 8) {
      return res.status(400).json({ error: '비밀번호는 8자 이상이어야 합니다' });
    }

    // 이메일 중복 확인
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: '이미 사용 중인 이메일입니다' });
    }

    // 비밀번호 해싱
    const passwordHash = await bcrypt.hash(password, 10);

    const { rows } = await pool.query(
      `INSERT INTO users (name, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING ${SAFE_COLUMNS}`,
      [name, email, passwordHash]
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// --- PUT /api/users/:id ---
router.put('/:id', async (req, res, next) => {
  try {
    const { name, email, currentPassword, newPassword } = req.body;

    // 기존 사용자 확인
    const existing = await pool.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ error: '사용자를 찾을 수 없습니다' });
    }

    const user = existing.rows[0];

    // 비밀번호 변경 시 현재 비밀번호 확인
    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ error: '현재 비밀번호를 입력하세요' });
      }
      const match = await bcrypt.compare(currentPassword, user.password_hash);
      if (!match) {
        return res.status(401).json({ error: '현재 비밀번호가 올바르지 않습니다' });
      }
      if (newPassword.length < 8) {
        return res.status(400).json({ error: '새 비밀번호는 8자 이상이어야 합니다' });
      }
      const newHash = await bcrypt.hash(newPassword, 10);
      await pool.query('UPDATE users SET password_hash = $1 WHERE id = $2', [newHash, req.params.id]);
    }

    // 이름/이메일 업데이트
    const { rows } = await pool.query(
      `UPDATE users
       SET name = COALESCE($1, name), email = COALESCE($2, email)
       WHERE id = $3
       RETURNING ${SAFE_COLUMNS}`,
      [name, email, req.params.id]
    );

    res.json(rows[0]);
  } catch (err) {
    // 이메일 유니크 제약 위반
    if (err.code === '23505') {
      return res.status(409).json({ error: '이미 사용 중인 이메일입니다' });
    }
    next(err);
  }
});

// --- DELETE /api/users/:id ---
router.delete('/:id', async (req, res, next) => {
  try {
    const { rowCount } = await pool.query('DELETE FROM users WHERE id = $1', [req.params.id]);
    if (rowCount === 0) {
      return res.status(404).json({ error: '사용자를 찾을 수 없습니다' });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
