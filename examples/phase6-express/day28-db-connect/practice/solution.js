// =============================================
// Day 28 정답 - 데이터베이스 연동 (SQLite)
// =============================================
// 먼저 패키지를 설치하세요: npm install express better-sqlite3

const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
app.use(express.json());

// 데이터베이스 연결
const dbPath = path.join(__dirname, 'posts.db');
const db = new Database(dbPath);

// WAL 모드 활성화 (성능 향상)
db.pragma('journal_mode = WAL');

// 연습 1: 게시판 API + DB
// SQLite로 posts 테이블을 만들고 CRUD API를 구현하세요.
// -----------------------------------------

// 테이블 생성
db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now', 'localtime'))
  )
`);

// 샘플 데이터 삽입 (테이블이 비어있을 때만)
const count = db.prepare('SELECT COUNT(*) as count FROM posts').get();
if (count.count === 0) {
  const insert = db.prepare(
    'INSERT INTO posts (title, content, author) VALUES (?, ?, ?)'
  );

  const samplePosts = [
    ['JavaScript 기초', 'JavaScript의 변수와 타입에 대해 알아봅시다.', '김민수'],
    ['Node.js 시작하기', 'Node.js 설치 방법과 첫 번째 프로그램을 만들어봅시다.', '이서연'],
    ['Express 입문', 'Express 프레임워크로 웹 서버를 만드는 방법을 소개합니다.', '박지호'],
    ['SQLite 사용법', 'SQLite 데이터베이스의 기본 사용법을 정리했습니다.', '김민수'],
    ['REST API 설계', 'RESTful API를 설계하는 원칙과 모범 사례를 알아봅시다.', '이서연'],
    ['CSS Flexbox 정리', 'Flexbox 레이아웃의 주요 속성들을 정리했습니다.', '박지호'],
    ['React 컴포넌트', 'React 함수형 컴포넌트와 Hooks에 대해 알아봅시다.', '김민수'],
    ['TypeScript 기초', 'TypeScript의 타입 시스템에 대해 알아봅시다.', '이서연'],
    ['Git 브랜치 전략', '효율적인 Git 브랜치 관리 전략을 소개합니다.', '박지호'],
    ['Docker 입문', 'Docker 컨테이너의 기본 개념과 사용법을 알아봅시다.', '김민수'],
    ['MongoDB vs SQLite', '두 데이터베이스의 차이점을 비교해봅시다.', '이서연'],
    ['HTTP 메서드 정리', 'GET, POST, PUT, DELETE 등 HTTP 메서드를 정리했습니다.', '박지호'],
    ['프론트엔드 빌드 도구', 'Vite, Webpack 등 빌드 도구를 비교합니다.', '김민수'],
    ['API 인증 방법', 'JWT, OAuth 등 API 인증 방법을 소개합니다.', '이서연'],
    ['CSS Grid 레이아웃', 'CSS Grid의 핵심 속성과 활용법을 정리했습니다.', '박지호'],
    ['Node.js 스트림', 'Node.js 스트림의 개념과 활용법을 알아봅시다.', '김민수'],
    ['데이터베이스 인덱스', '인덱스의 원리와 효과적인 사용법을 소개합니다.', '이서연'],
    ['웹 보안 기초', 'XSS, CSRF 등 웹 보안 위협과 대응 방법을 알아봅시다.', '박지호'],
    ['함수형 프로그래밍', 'JavaScript에서의 함수형 프로그래밍 패턴을 소개합니다.', '김민수'],
    ['테스트 코드 작성법', 'Jest를 활용한 단위 테스트 작성법을 알아봅시다.', '이서연'],
    ['패키지 매니저 비교', 'npm, yarn, pnpm의 차이점을 비교합니다.', '박지호'],
    ['WebSocket 실시간 통신', 'WebSocket으로 실시간 채팅을 구현하는 방법입니다.', '김민수'],
    ['미들웨어 패턴', 'Express 미들웨어의 동작 원리와 활용법을 알아봅시다.', '이서연'],
    ['환경 변수 관리', '.env 파일과 환경 변수 관리 모범 사례를 소개합니다.', '박지호'],
    ['코드 리뷰 가이드', '효과적인 코드 리뷰를 위한 가이드라인을 정리했습니다.', '김민수'],
    ['성능 최적화 팁', '웹 애플리케이션 성능 최적화 방법을 소개합니다.', '이서연'],
    ['ORM 선택 가이드', 'Sequelize, Prisma 등 ORM 도구를 비교합니다.', '박지호'],
    ['CI/CD 파이프라인', '자동 배포 파이프라인 구축 방법을 알아봅시다.', '김민수']
  ];

  const insertMany = db.transaction((posts) => {
    for (const post of posts) {
      insert.run(...post);
    }
  });

  insertMany(samplePosts);
  console.log(`샘플 게시글 ${samplePosts.length}개가 삽입되었습니다.`);
}

// 전체 게시글 목록 (최신순)
app.get('/api/posts', (req, res) => {
  // 연습 3: 페이지네이션
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const posts = db.prepare(
    'SELECT * FROM posts ORDER BY created_at DESC LIMIT ? OFFSET ?'
  ).all(limit, offset);

  const totalCount = db.prepare('SELECT COUNT(*) as count FROM posts').get().count;
  const totalPages = Math.ceil(totalCount / limit);

  res.json({
    data: posts,
    pagination: {
      currentPage: page,
      totalPages,
      totalCount,
      limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  });
});

// 연습 2: 검색 기능
app.get('/api/posts/search', (req, res) => {
  const keyword = req.query.q;

  if (!keyword) {
    return res.status(400).json({ error: '검색어(q)를 입력하세요' });
  }

  const searchTerm = `%${keyword}%`;
  const posts = db.prepare(
    'SELECT * FROM posts WHERE title LIKE ? OR content LIKE ? ORDER BY created_at DESC'
  ).all(searchTerm, searchTerm);

  res.json({
    keyword,
    count: posts.length,
    data: posts
  });
});

// 특정 게시글 조회
app.get('/api/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(id);

  if (!post) {
    return res.status(404).json({ error: '게시글을 찾을 수 없습니다' });
  }

  res.json(post);
});

// 게시글 작성
app.post('/api/posts', (req, res) => {
  const { title, content, author } = req.body;

  if (!title || !content || !author) {
    return res.status(400).json({ error: 'title, content, author는 필수입니다' });
  }

  const result = db.prepare(
    'INSERT INTO posts (title, content, author) VALUES (?, ?, ?)'
  ).run(title, content, author);

  const newPost = db.prepare('SELECT * FROM posts WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(newPost);
});

// 게시글 수정
app.put('/api/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;

  const existing = db.prepare('SELECT * FROM posts WHERE id = ?').get(id);
  if (!existing) {
    return res.status(404).json({ error: '게시글을 찾을 수 없습니다' });
  }

  const updatedTitle = title || existing.title;
  const updatedContent = content || existing.content;

  db.prepare(
    'UPDATE posts SET title = ?, content = ? WHERE id = ?'
  ).run(updatedTitle, updatedContent, id);

  const updatedPost = db.prepare('SELECT * FROM posts WHERE id = ?').get(id);
  res.json(updatedPost);
});

// 게시글 삭제
app.delete('/api/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const existing = db.prepare('SELECT * FROM posts WHERE id = ?').get(id);

  if (!existing) {
    return res.status(404).json({ error: '게시글을 찾을 수 없습니다' });
  }

  db.prepare('DELETE FROM posts WHERE id = ?').run(id);
  res.json({ message: '게시글이 삭제되었습니다', deleted: existing });
});

// 서버 시작
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`게시판 API 서버가 포트 ${PORT}에서 실행 중입니다`);
  console.log('');
  console.log('=== API 엔드포인트 ===');
  console.log(`GET    http://localhost:${PORT}/api/posts              - 게시글 목록 (페이지네이션)`);
  console.log(`GET    http://localhost:${PORT}/api/posts?page=2&limit=5 - 2페이지, 5개씩`);
  console.log(`GET    http://localhost:${PORT}/api/posts/search?q=Node  - 키워드 검색`);
  console.log(`GET    http://localhost:${PORT}/api/posts/1             - 게시글 상세`);
  console.log(`POST   http://localhost:${PORT}/api/posts               - 게시글 작성`);
  console.log(`PUT    http://localhost:${PORT}/api/posts/1             - 게시글 수정`);
  console.log(`DELETE http://localhost:${PORT}/api/posts/1             - 게시글 삭제`);
});

// 프로세스 종료 시 DB 연결 닫기
process.on('SIGINT', () => {
  db.close();
  console.log('\n데이터베이스 연결이 닫혔습니다.');
  process.exit(0);
});
