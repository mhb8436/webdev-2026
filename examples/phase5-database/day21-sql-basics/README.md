# Day 21 - SQL 기본: DDL과 DML

> **Phase 5: Database** | 학습일: 21일차

---

## 학습 목표

- CREATE TABLE 문으로 테이블을 생성한다
- INSERT, SELECT, UPDATE, DELETE로 CRUD를 수행한다
- WHERE 절로 조건부 조회를 한다
- SQLite와 PostgreSQL의 기본 자료형을 이해한다
- Node.js에서 better-sqlite3, pg로 DB에 연결한다

---

## 핵심 개념

### 1. DDL (Data Definition Language)

```sql
CREATE TABLE todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  done INTEGER DEFAULT 0,
  priority TEXT DEFAULT 'medium',
  category TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 2. DML (Data Manipulation Language)

```sql
-- 삽입
INSERT INTO todos (title, priority) VALUES ('공부하기', 'high');

-- 조회
SELECT * FROM todos WHERE done = 0;

-- 수정
UPDATE todos SET done = 1 WHERE id = 1;

-- 삭제
DELETE FROM todos WHERE id = 1;

-- 집계
SELECT COUNT(*) FROM todos WHERE done = 1;
```

### 3. SQLite 자료형

| 자료형 | 설명 | 예시 |
|--------|------|------|
| INTEGER | 정수 | `id INTEGER PRIMARY KEY` |
| TEXT | 문자열 | `title TEXT NOT NULL` |
| REAL | 실수 | `price REAL` |
| NULL | NULL 값 | - |

> SQLite는 BOOLEAN 타입이 없으므로 INTEGER(0 또는 1)로 대체합니다.

### 4. Node.js에서 SQLite 연결 (better-sqlite3)

```javascript
const Database = require('better-sqlite3');
const db = new Database('todos.db');

// 테이블 생성
db.exec(`CREATE TABLE IF NOT EXISTS todos (...)`);

// Prepared Statement (SQL 인젝션 방지)
const stmt = db.prepare('SELECT * FROM todos WHERE id = ?');
const todo = stmt.get(1);

// 삽입
const insert = db.prepare('INSERT INTO todos (title) VALUES (?)');
const result = insert.run('새 할일');
console.log(result.lastInsertRowid);
```

### 5. Node.js에서 PostgreSQL 연결 (pg)

```javascript
const { Pool } = require('pg');
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'todo_db',
  user: 'postgres',
  password: 'password'
});

const { rows } = await pool.query('SELECT * FROM todos');
// 파라미터 바인딩: $1, $2, ...
await pool.query('INSERT INTO todos (title) VALUES ($1)', ['새 할일']);
```

---

## 실습 파일

### starter/ (직접 구현)

| 파일 | 내용 |
|------|------|
| `01_ddl.sql` | 테이블 생성 (CREATE TABLE) |
| `02_dml.sql` | 데이터 조작 (INSERT, SELECT, UPDATE, DELETE) |
| `03_sqlite_connect.js` | Node.js + better-sqlite3 연결 |
| `04_postgres_connect.js` | Node.js + pg 연결 |

### solution/ (완성 코드)

| 파일 | 내용 |
|------|------|
| `01_ddl.sql` | 완성된 DDL |
| `02_dml.sql` | 완성된 DML |
| `03_sqlite_connect.js` | SQLite CRUD 예제 |
| `04_postgres_connect.js` | PostgreSQL CRUD 예제 |

---

## 실행 방법

```bash
# SQL 파일 실행 (SQLite)
sqlite3 todo.db < solution/01_ddl.sql
sqlite3 todo.db < solution/02_dml.sql

# Node.js로 SQLite 연결
npm install
node solution/03_sqlite_connect.js

# Node.js로 PostgreSQL 연결
node solution/04_postgres_connect.js
```

---

## 정리

| 개념 | 핵심 |
|------|------|
| DDL | CREATE TABLE, DROP TABLE, ALTER TABLE |
| DML | INSERT, SELECT, UPDATE, DELETE |
| WHERE | 조건부 조회 (`WHERE done = 0`) |
| better-sqlite3 | Node.js에서 SQLite 사용 (동기 방식) |
| pg | Node.js에서 PostgreSQL 사용 (비동기 방식) |
| Prepared Statement | SQL 인젝션 방지 (`?` 또는 `$1`) |

> **다음 시간**: Day 22 - SQL 심화 (GROUP BY, JOIN, 서브쿼리)
