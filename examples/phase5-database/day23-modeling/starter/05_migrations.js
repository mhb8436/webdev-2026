// ============================================
// Day 23 - 스키마 마이그레이션 패턴
// ============================================
// 학습목표: 스키마 변경 관리, 버전 관리, 롤백
// 실행: npm install && node starter/05_migrations.js

// TODO 1: 마이그레이션 테이블 생성
// - migrations 테이블: id, name, applied_at
// - 이미 적용된 마이그레이션 추적

// TODO 2: 마이그레이션 정의
// const migrations = [
//   {
//     name: '001_create_users',
//     up: `CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)`,
//     down: `DROP TABLE users`,
//   },
//   {
//     name: '002_add_users_role',
//     up: `ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user'`,
//     down: `-- SQLite는 ALTER TABLE DROP COLUMN 미지원, 테이블 재생성 필요`,
//   },
//   {
//     name: '003_create_posts',
//     up: `CREATE TABLE posts (id INTEGER PRIMARY KEY, title TEXT, user_id INTEGER REFERENCES users(id))`,
//     down: `DROP TABLE posts`,
//   },
// ];

// TODO 3: migrate 함수 구현
// - 적용되지 않은 마이그레이션만 실행
// - 트랜잭션으로 감싸기
// - migrations 테이블에 기록

// TODO 4: rollback 함수 구현
// - 마지막 마이그레이션 되돌리기
// - down SQL 실행
// - migrations 테이블에서 삭제

// TODO 5: 상태 확인
// - 현재 적용된 마이그레이션 목록 출력
// - pending(미적용) 마이그레이션 목록 출력
