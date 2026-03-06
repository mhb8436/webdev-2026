// ============================================
// Day 21 - SQLite 연결하기 (Node.js)
// ============================================
// 실행: npm init -y && npm install better-sqlite3
//       node 03_sqlite_connect.js

const Database = require('better-sqlite3');
const path = require('path');

// TODO 1: DB 연결
// const db = new Database(path.join(__dirname, 'todos.db'));
// db.pragma('journal_mode = WAL');


// TODO 2: 테이블 생성
// db.exec(`CREATE TABLE IF NOT EXISTS todos (...)`)
// 컬럼: id, title, done, priority, category, created_at


// TODO 3: Prepared Statement로 삽입
// const insertStmt = db.prepare('INSERT INTO todos (...) VALUES (?, ?, ?)');
// insertStmt.run("할일 제목", "high", "카테고리");
// 힌트: ? 는 SQL 인젝션 방지를 위한 매개변수 바인딩


// TODO 4: 전체 조회 (all)
// const todos = db.prepare('SELECT * FROM todos').all();
// console.table(todos);


// TODO 5: 조건 조회 (get, all)
// 단건: db.prepare('SELECT * FROM todos WHERE id = ?').get(1);
// 검색: db.prepare('SELECT * FROM todos WHERE title LIKE ?').all('%키워드%');


// TODO 6: 수정 (UPDATE)
// db.prepare('UPDATE todos SET done = 1 WHERE id = ?').run(1);


// TODO 7: 삭제 (DELETE)
// db.prepare('DELETE FROM todos WHERE id = ?').run(2);


// TODO 8: 트랜잭션으로 대량 삽입
// const bulkInsert = db.transaction((items) => {
//   for (const item of items) {
//     insertStmt.run(item.title, item.priority, item.category);
//   }
// });
// bulkInsert([{title: "할일1", ...}, {title: "할일2", ...}]);


// TODO 9: 집계 쿼리
// SELECT COUNT(*) as total, SUM(CASE WHEN done = 1 THEN 1 ELSE 0 END) as completed
// FROM todos


// TODO 10: DB 종료
// db.close();
