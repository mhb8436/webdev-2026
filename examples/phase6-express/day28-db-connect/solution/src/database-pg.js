// ============================================
// Day 28 - PostgreSQL 연결 모듈 (풀이)
// ============================================

const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'todo_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  max: 20,                  // 최대 연결 수
  idleTimeoutMillis: 30000, // 유휴 연결 타임아웃
});

pool.on('error', (err) => {
  console.error('PostgreSQL 풀 에러:', err.message);
});

async function testConnection() {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT NOW() as current_time');
    console.log('PostgreSQL 연결 성공:', result.rows[0].current_time);
    return result.rows[0];
  } finally {
    client.release();
  }
}

// 단순 쿼리 헬퍼
async function query(text, params) {
  const start = Date.now();
  const result = await pool.query(text, params);
  const duration = Date.now() - start;
  if (duration > 100) {
    console.log('느린 쿼리:', { text, duration: `${duration}ms`, rows: result.rowCount });
  }
  return result;
}

// 트랜잭션 헬퍼
async function withTransaction(callback) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

// 테이블 초기화
async function initTables() {
  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255),
      role VARCHAR(20) DEFAULT 'user',
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      done BOOLEAN DEFAULT FALSE,
      priority VARCHAR(10) DEFAULT 'medium',
      category VARCHAR(50),
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `);

  console.log('테이블 초기화 완료');
}

module.exports = { pool, query, testConnection, withTransaction, initTables };
