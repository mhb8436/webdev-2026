const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// DB 파일 경로 설정
const DB_DIR = path.join(__dirname, '..', 'data');
const DB_PATH = path.join(DB_DIR, 'todos.db');

// TODO: data 디렉토리가 없으면 생성
// 힌트: fs.existsSync()와 fs.mkdirSync()를 사용하세요

// TODO: DB 연결
// 힌트: new Database(DB_PATH)로 연결합니다
// const db = new Database(DB_PATH);

// TODO: todos 테이블 생성 (없으면)
// 힌트: db.exec()로 CREATE TABLE IF NOT EXISTS 실행
// 컬럼: id (INTEGER PRIMARY KEY AUTOINCREMENT),
//        title (TEXT NOT NULL),
//        done (INTEGER DEFAULT 0),
//        priority (TEXT DEFAULT 'medium'),
//        category (TEXT),
//        created_at (TEXT DEFAULT CURRENT_TIMESTAMP),
//        updated_at (TEXT DEFAULT CURRENT_TIMESTAMP)

// module.exports = db;
