const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// DB 파일 경로 설정
const DB_DIR = path.join(__dirname, '..', 'data');
const DB_PATH = path.join(DB_DIR, 'todos.db');

// data 디렉토리가 없으면 생성
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
  console.log('data 디렉토리를 생성했습니다:', DB_DIR);
}

// DB 연결
const db = new Database(DB_PATH);
console.log('데이터베이스에 연결되었습니다:', DB_PATH);

// WAL 모드 활성화 (동시 읽기 성능 향상)
db.pragma('journal_mode = WAL');

// todos 테이블 생성 (없으면)
db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done INTEGER DEFAULT 0,
    priority TEXT DEFAULT 'medium',
    category TEXT,
    created_at TEXT DEFAULT (datetime('now', 'localtime')),
    updated_at TEXT DEFAULT (datetime('now', 'localtime'))
  )
`);

console.log('todos 테이블이 준비되었습니다');

module.exports = db;
