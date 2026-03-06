# Day 28 - 데이터베이스 연동

> **Phase 6: Express** | 학습일: 28일차

---

## 학습 목표

- better-sqlite3로 SQLite 데이터베이스를 연동한다
- Prepared Statement로 안전한 쿼리를 작성한다
- PostgreSQL(pg)로 원격 DB를 연동한다
- 사용자 CRUD와 비밀번호 해싱(bcrypt)을 구현한다

---

## 핵심 개념

### 1. better-sqlite3 연결

```javascript
const Database = require('better-sqlite3');
const db = new Database('todos.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);
```

### 2. Prepared Statement

```javascript
// 조회
const todos = db.prepare('SELECT * FROM todos').all();
const todo = db.prepare('SELECT * FROM todos WHERE id = ?').get(id);

// 삽입
const result = db.prepare('INSERT INTO todos (title) VALUES (?)').run(title);
// result.lastInsertRowid

// 수정
db.prepare('UPDATE todos SET done = ? WHERE id = ?').run(1, id);

// 삭제
db.prepare('DELETE FROM todos WHERE id = ?').run(id);
```

### 3. PostgreSQL (pg) 연동

```javascript
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// 조회 (필터링 + 페이지네이션)
const { rows } = await pool.query(
  'SELECT * FROM todos WHERE done = $1 LIMIT $2 OFFSET $3',
  [false, 10, 0]
);

// COALESCE로 부분 업데이트
await pool.query(
  `UPDATE todos SET
    title = COALESCE($1, title),
    done = COALESCE($2, done)
   WHERE id = $3`,
  [title, done, id]
);
```

### 4. 사용자 CRUD + bcrypt

```javascript
const bcrypt = require('bcrypt');

// 회원가입 시 비밀번호 해싱
const hashedPassword = await bcrypt.hash(password, 10);
db.prepare('INSERT INTO users (email, password) VALUES (?, ?)').run(email, hashedPassword);

// 비밀번호 검증
const isMatch = await bcrypt.compare(inputPassword, user.password);
```

---

## 실습 파일

### starter/ (직접 구현)

| 파일 | 내용 |
|------|------|
| `src/index.js` | 서버 진입점 |
| `src/database.js` | DB 연결 및 초기화 |
| `src/routes/todos.js` | SQLite 할일 CRUD |
| `src/routes/todos-pg.js` | PostgreSQL 할일 CRUD |
| `src/routes/users.js` | 사용자 CRUD + bcrypt |

### solution/ (완성 코드)

동일 구조의 완성된 코드

---

## 실행 방법

```bash
npm install && npm run dev
```

```bash
# SQLite 할일 추가
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "DB에 저장하기"}'

# 서버 재시작 후 데이터 유지 확인
curl http://localhost:3000/api/todos
```

---

## 정리

| 개념 | 핵심 |
|------|------|
| better-sqlite3 | SQLite 동기 방식 라이브러리 |
| Prepared Statement | `?` 또는 `$1`로 SQL 인젝션 방지 |
| pg (Pool) | PostgreSQL 비동기 연결 풀 |
| COALESCE | 부분 업데이트 (`NULL이면 기존값 유지`) |
| bcrypt | 비밀번호 해싱 (`hash`, `compare`) |

> **다음 시간**: Day 29 - ORM (Prisma)
