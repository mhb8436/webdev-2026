// ============================================
// Day 21 - SQLite 연결하기 (Node.js) - 풀이
// ============================================
// 실행: npm init -y && npm install better-sqlite3
//       node 03_sqlite_connect.js

const Database = require('better-sqlite3');
const path = require('path');

// --- 1. DB 연결 ---
const dbPath = path.join(__dirname, 'todos.db');
const db = new Database(dbPath);
console.log("DB 연결 성공:", dbPath);

// WAL 모드 (성능 향상)
db.pragma('journal_mode = WAL');

// --- 2. 테이블 생성 ---
db.exec(`
  DROP TABLE IF EXISTS todos;
  CREATE TABLE todos (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    title      TEXT    NOT NULL,
    done       INTEGER DEFAULT 0,
    priority   TEXT    DEFAULT 'medium',
    category   TEXT,
    created_at TEXT    DEFAULT (datetime('now', 'localtime'))
  )
`);
console.log("테이블 생성 완료\n");

// --- 3. Prepared Statement로 데이터 삽입 ---
console.log("=== 데이터 삽입 ===");
const insertStmt = db.prepare(`
  INSERT INTO todos (title, priority, category) VALUES (?, ?, ?)
`);

const r1 = insertStmt.run("TypeScript 배우기", "high", "공부");
console.log("삽입 ID:", r1.lastInsertRowid);

const r2 = insertStmt.run("점심 먹기", "medium", "생활");
console.log("삽입 ID:", r2.lastInsertRowid);
console.log("");

// --- 4. 전체 조회 ---
console.log("=== 전체 조회 ===");
const allTodos = db.prepare("SELECT * FROM todos ORDER BY created_at DESC").all();
console.table(allTodos);

// --- 5. 조건 조회 ---
console.log("=== 조건 조회 ===");
const byPriority = db.prepare("SELECT * FROM todos WHERE priority = ?");
console.log("high:", byPriority.all("high"));

const search = db.prepare("SELECT * FROM todos WHERE title LIKE ?");
console.log("검색:", search.all("%배우%"));
console.log("");

// --- 6. 단건 조회 (get) ---
console.log("=== 단건 조회 ===");
const one = db.prepare("SELECT * FROM todos WHERE id = ?").get(1);
console.log("ID 1:", one);
console.log("");

// --- 7. 수정 ---
console.log("=== 수정 ===");
const updateStmt = db.prepare("UPDATE todos SET done = 1 WHERE id = ?");
const updateResult = updateStmt.run(1);
console.log("수정된 행:", updateResult.changes);
console.log("");

// --- 8. 삭제 ---
console.log("=== 삭제 ===");
const deleteStmt = db.prepare("DELETE FROM todos WHERE id = ?");
const deleteResult = deleteStmt.run(2);
console.log("삭제된 행:", deleteResult.changes);
console.log("");

// --- 9. 트랜잭션 (대량 삽입) ---
console.log("=== 트랜잭션 ===");
const bulkInsert = db.transaction((items) => {
  for (const item of items) {
    insertStmt.run(item.title, item.priority, item.category);
  }
  return items.length;
});

const newItems = [
  { title: "운동하기", priority: "low", category: "건강" },
  { title: "React 공부", priority: "high", category: "공부" },
  { title: "장보기", priority: "medium", category: "생활" },
  { title: "블로그 쓰기", priority: "low", category: "취미" },
];
console.log(`${bulkInsert(newItems)}개 삽입 완료`);

// --- 10. 집계 쿼리 ---
console.log("\n=== 통계 ===");
const stats = db.prepare(`
  SELECT
    COUNT(*) as total,
    SUM(CASE WHEN done = 1 THEN 1 ELSE 0 END) as completed,
    SUM(CASE WHEN done = 0 THEN 1 ELSE 0 END) as active
  FROM todos
`).get();
console.log("통계:", stats);

// 우선순위별 통계
const byPriorityStats = db.prepare(`
  SELECT priority, COUNT(*) as count
  FROM todos GROUP BY priority ORDER BY count DESC
`).all();
console.log("우선순위별:", byPriorityStats);

// 최종 목록
console.log("\n=== 최종 목록 ===");
console.table(db.prepare("SELECT * FROM todos").all());

// --- 11. DB 종료 ---
db.close();
console.log("\nDB 연결 종료");
