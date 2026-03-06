// ============================================
// Day 23 - 관계형 데이터 모델링 (풀이)
// ============================================
const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'blog.db'));
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// --- 1. 테이블 생성 ---
db.exec(`
  DROP TABLE IF EXISTS post_tags;
  DROP TABLE IF EXISTS posts;
  DROP TABLE IF EXISTS tags;
  DROP TABLE IF EXISTS users;

  CREATE TABLE users (
    id    INTEGER PRIMARY KEY AUTOINCREMENT,
    name  TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
  );

  CREATE TABLE posts (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    title      TEXT NOT NULL,
    content    TEXT,
    user_id    INTEGER NOT NULL,
    created_at TEXT DEFAULT (datetime('now','localtime')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE tags (
    id   INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
  );

  CREATE TABLE post_tags (
    post_id INTEGER NOT NULL,
    tag_id  INTEGER NOT NULL,
    PRIMARY KEY (post_id, tag_id),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
  );
`);
console.log("테이블 생성 완료\n");

// --- 2. 샘플 데이터 삽입 ---
const seed = db.transaction(() => {
  const insertUser = db.prepare("INSERT INTO users (name, email) VALUES (?, ?)");
  insertUser.run("김개발", "kim@dev.com");
  insertUser.run("이영희", "lee@dev.com");
  insertUser.run("박민수", "park@dev.com");

  const insertPost = db.prepare("INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)");
  insertPost.run("TypeScript 입문", "TS 기초를 배워봅시다", 1);
  insertPost.run("React Hooks", "useState와 useEffect 활용법", 1);
  insertPost.run("Express 서버", "REST API 만들기", 2);
  insertPost.run("SQL 기초", "SELECT, INSERT, UPDATE", 2);
  insertPost.run("Docker 입문", "컨테이너 시작하기", 3);

  const insertTag = db.prepare("INSERT INTO tags (name) VALUES (?)");
  insertTag.run("프론트엔드");
  insertTag.run("백엔드");
  insertTag.run("데이터베이스");
  insertTag.run("DevOps");

  const insertPT = db.prepare("INSERT INTO post_tags (post_id, tag_id) VALUES (?, ?)");
  insertPT.run(1, 1); insertPT.run(1, 2);  // TS → 프론트, 백
  insertPT.run(2, 1);                        // React → 프론트
  insertPT.run(3, 2);                        // Express → 백
  insertPT.run(4, 2); insertPT.run(4, 3);   // SQL → 백, DB
  insertPT.run(5, 4);                        // Docker → DevOps
});
seed();
console.log("샘플 데이터 삽입 완료\n");

// --- 3. 1:N 관계 ---
console.log("=== 사용자별 게시글 수 (1:N JOIN) ===");
const userPosts = db.prepare(`
  SELECT u.name, COUNT(p.id) as post_count
  FROM users u
  LEFT JOIN posts p ON u.id = p.user_id
  GROUP BY u.id
  ORDER BY post_count DESC
`).all();
console.table(userPosts);

console.log("=== 김개발의 게시글 ===");
const kimPosts = db.prepare(`
  SELECT p.title, p.created_at
  FROM posts p
  JOIN users u ON p.user_id = u.id
  WHERE u.name = ?
`).all("김개발");
console.table(kimPosts);

// --- 4. N:M 관계 ---
console.log("=== 게시글별 태그 (N:M JOIN) ===");
const postTags = db.prepare(`
  SELECT p.title, GROUP_CONCAT(t.name, ', ') as tags
  FROM posts p
  LEFT JOIN post_tags pt ON p.id = pt.post_id
  LEFT JOIN tags t ON pt.tag_id = t.id
  GROUP BY p.id
`).all();
console.table(postTags);

console.log("=== '백엔드' 태그 게시글 ===");
const backendPosts = db.prepare(`
  SELECT p.title, u.name as author
  FROM posts p
  JOIN post_tags pt ON p.id = pt.post_id
  JOIN tags t ON pt.tag_id = t.id
  JOIN users u ON p.user_id = u.id
  WHERE t.name = ?
`).all("백엔드");
console.table(backendPosts);

// --- 5. 복합 조회 ---
console.log("=== 전체 현황 (사용자 + 게시글 + 태그) ===");
const fullView = db.prepare(`
  SELECT
    u.name as author,
    p.title,
    GROUP_CONCAT(t.name, ', ') as tags
  FROM posts p
  JOIN users u ON p.user_id = u.id
  LEFT JOIN post_tags pt ON p.id = pt.post_id
  LEFT JOIN tags t ON pt.tag_id = t.id
  GROUP BY p.id
  ORDER BY u.name, p.title
`).all();
console.table(fullView);

db.close();
