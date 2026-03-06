// ============================================
// Day 21 - PostgreSQL 연결하기 (풀이)
// ============================================
// 실행: npm install pg
// 사전: createdb todo_db (PostgreSQL에서)

const { Pool } = require('pg');

// --- 1. 연결 풀 ---
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'todo_db',
  user: 'postgres',
  password: 'postgres',
});

pool.on('error', (err) => {
  console.error('DB 풀 에러:', err.message);
});

// --- 2. 테이블 생성 ---
async function createTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS todos (
      id         SERIAL PRIMARY KEY,
      title      VARCHAR(255) NOT NULL,
      done       BOOLEAN DEFAULT FALSE,
      priority   VARCHAR(10) DEFAULT 'medium',
      category   VARCHAR(50),
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `);
  console.log("테이블 생성 완료");
}

// --- 3. CRUD 함수 ---

// 생성 (RETURNING으로 삽입된 행 반환)
async function createTodo(title, priority = 'medium', category = null) {
  const { rows } = await pool.query(
    'INSERT INTO todos (title, priority, category) VALUES ($1, $2, $3) RETURNING *',
    [title, priority, category]
  );
  console.log("생성:", rows[0]);
  return rows[0];
}

// 전체 조회
async function getAllTodos() {
  const { rows } = await pool.query(
    'SELECT * FROM todos ORDER BY created_at DESC'
  );
  return rows;
}

// 단건 조회
async function getTodoById(id) {
  const { rows } = await pool.query(
    'SELECT * FROM todos WHERE id = $1', [id]
  );
  return rows[0] || null;
}

// 수정
async function updateTodo(id, fields) {
  const setClauses = [];
  const values = [];
  let paramIndex = 1;

  for (const [key, value] of Object.entries(fields)) {
    setClauses.push(`${key} = $${paramIndex}`);
    values.push(value);
    paramIndex++;
  }

  setClauses.push(`updated_at = NOW()`);
  values.push(id);

  const { rows } = await pool.query(
    `UPDATE todos SET ${setClauses.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
    values
  );
  return rows[0];
}

// 삭제
async function deleteTodo(id) {
  const { rows } = await pool.query(
    'DELETE FROM todos WHERE id = $1 RETURNING *', [id]
  );
  return rows[0];
}

// --- 4. 트랜잭션 ---
async function bulkInsert(items) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const item of items) {
      await client.query(
        'INSERT INTO todos (title, priority, category) VALUES ($1, $2, $3)',
        [item.title, item.priority, item.category]
      );
    }
    await client.query('COMMIT');
    console.log(`트랜잭션: ${items.length}개 삽입 완료`);
  } catch (e) {
    await client.query('ROLLBACK');
    console.error("트랜잭션 실패, 롤백:", e.message);
  } finally {
    client.release();
  }
}

// --- 5. 실행 ---
(async () => {
  try {
    await createTable();

    // 삽입
    await createTodo("TypeScript 배우기", "high", "공부");
    await createTodo("점심 먹기", "medium", "생활");

    // 대량 삽입
    await bulkInsert([
      { title: "운동하기", priority: "low", category: "건강" },
      { title: "React 공부", priority: "high", category: "공부" },
    ]);

    // 전체 조회
    console.log("\n=== 전체 목록 ===");
    console.table(await getAllTodos());

    // 수정
    const updated = await updateTodo(1, { done: true });
    console.log("수정:", updated);

    // 삭제
    const deleted = await deleteTodo(2);
    console.log("삭제:", deleted);

    // 통계
    const { rows: stats } = await pool.query(`
      SELECT
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE done = true) as completed,
        COUNT(*) FILTER (WHERE done = false) as active
      FROM todos
    `);
    console.log("통계:", stats[0]);

  } catch (e) {
    console.error("에러:", e.message);
  } finally {
    await pool.end();
    console.log("DB 연결 종료");
  }
})();
