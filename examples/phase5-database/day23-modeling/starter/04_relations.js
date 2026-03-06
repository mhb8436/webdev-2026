// ============================================
// Day 23 - 관계형 데이터 모델링 (Node.js + SQLite)
// ============================================
// 학습목표: 1:N, N:M 관계, JOIN, 외래키

const Database = require('better-sqlite3');

// TODO 1: DB 연결 및 테이블 생성
// users 테이블: id, name, email
// posts 테이블: id, title, content, user_id (FK)
// tags 테이블: id, name
// post_tags 테이블: post_id (FK), tag_id (FK) ← 다대다 중간 테이블
// 힌트: FOREIGN KEY (user_id) REFERENCES users(id)


// TODO 2: 샘플 데이터 삽입 (트랜잭션)
// users: 3명, posts: 5개, tags: 4개, post_tags: 연결


// TODO 3: 1:N 관계 조회
// 사용자별 게시글 수: JOIN + GROUP BY
// 특정 사용자의 모든 게시글: WHERE user_id = ?


// TODO 4: N:M 관계 조회
// 게시글별 태그 목록: JOIN post_tags JOIN tags + GROUP_CONCAT
// 특정 태그의 게시글들: WHERE tag_id = ?


// TODO 5: 복합 JOIN 쿼리
// 사용자 이름, 게시글 제목, 태그 목록을 한번에 조회
