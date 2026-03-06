// ============================================
// Day 21 - PostgreSQL 연결하기 (Node.js)
// ============================================
// 실행: npm install pg
// 사전 준비: PostgreSQL 서버 실행 필요

const { Pool } = require('pg');

// TODO 1: 연결 풀 설정
// const pool = new Pool({
//   host: 'localhost',
//   port: 5432,
//   database: 'todo_db',
//   user: 'postgres',
//   password: 'postgres',
// });


// TODO 2: 테이블 생성 함수
// async function createTable() {
//   await pool.query(`
//     CREATE TABLE IF NOT EXISTS todos (
//       id SERIAL PRIMARY KEY,
//       title VARCHAR(255) NOT NULL,
//       done BOOLEAN DEFAULT FALSE,
//       priority VARCHAR(10) DEFAULT 'medium',
//       category VARCHAR(50),
//       created_at TIMESTAMP DEFAULT NOW()
//     )
//   `);
// }
// 주의: PostgreSQL은 SERIAL, BOOLEAN, TIMESTAMP 사용 (SQLite와 다름)


// TODO 3: CRUD 함수들 작성
// async function createTodo(title, priority, category)
//   → pool.query('INSERT INTO todos ... RETURNING *', [title, ...])
//   힌트: $1, $2 매개변수 바인딩 (SQLite의 ? 대신)
//   힌트: RETURNING * 로 삽입된 행 반환

// async function getAllTodos()
// async function getTodoById(id)
// async function updateTodo(id, fields)
// async function deleteTodo(id)


// TODO 4: 트랜잭션
// const client = await pool.connect();
// try {
//   await client.query('BEGIN');
//   ... 여러 쿼리 실행 ...
//   await client.query('COMMIT');
// } catch (e) {
//   await client.query('ROLLBACK');
// } finally {
//   client.release();
// }


// TODO 5: 실행 및 종료
// (async () => {
//   await createTable();
//   await createTodo("할일", "high", "카테고리");
//   console.table(await getAllTodos());
//   await pool.end();
// })();
