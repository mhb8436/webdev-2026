// ============================================
// Day 28 - PostgreSQL 연결 모듈
// ============================================
// 학습목표: pg 모듈로 Express와 PostgreSQL 연동

const { Pool } = require('pg');

// TODO 1: 환경변수로 DB 연결 설정
// const pool = new Pool({
//   host: process.env.DB_HOST || 'localhost',
//   port: process.env.DB_PORT || 5432,
//   database: process.env.DB_NAME || 'todo_db',
//   user: process.env.DB_USER || 'postgres',
//   password: process.env.DB_PASSWORD || 'postgres',
// });

// TODO 2: 연결 테스트 함수
// async function testConnection() {
//   const client = await pool.connect();
//   const result = await client.query('SELECT NOW()');
//   client.release();
//   return result.rows[0];
// }

// TODO 3: 쿼리 헬퍼 함수
// async function query(text, params) {
//   return pool.query(text, params);
// }

// TODO 4: 트랜잭션 헬퍼 함수
// async function withTransaction(callback) {
//   const client = await pool.connect();
//   try {
//     await client.query('BEGIN');
//     const result = await callback(client);
//     await client.query('COMMIT');
//     return result;
//   } catch (e) {
//     await client.query('ROLLBACK');
//     throw e;
//   } finally {
//     client.release();
//   }
// }

// module.exports = { pool, query, testConnection, withTransaction };
