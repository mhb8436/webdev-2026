-- ============================================
-- 할일 관리 앱 데이터베이스 스키마
-- ============================================
-- 사용자, 카테고리, 할일 3개의 테이블을 설계합니다.
-- 외래 키를 사용하여 테이블 간의 관계를 정의하세요.

-- SQLite에서 외래 키 활성화
PRAGMA foreign_keys = ON;

-- ============================================
-- TODO: users 테이블
-- ============================================
-- 컬럼:
--   id: 정수, 기본키, 자동증가
--   username: 문자열, NOT NULL, UNIQUE
--   email: 문자열, NOT NULL, UNIQUE
--   created_at: 날짜시간, 기본값 현재시간

CREATE TABLE IF NOT EXISTS users (
    -- TODO: 컬럼 정의를 작성하세요
);

-- ============================================
-- TODO: categories 테이블
-- ============================================
-- 컬럼:
--   id: 정수, 기본키, 자동증가
--   name: 문자열, NOT NULL
--   user_id: 정수, NOT NULL, 외래 키 → users(id)
--   created_at: 날짜시간, 기본값 현재시간
-- 관계:
--   user_id는 users 테이블의 id를 참조

CREATE TABLE IF NOT EXISTS categories (
    -- TODO: 컬럼 정의를 작성하세요
    -- TODO: 외래 키 설정
);

-- ============================================
-- TODO: todos 테이블
-- ============================================
-- 컬럼:
--   id: 정수, 기본키, 자동증가
--   title: 문자열, NOT NULL
--   description: 문자열 (선택)
--   done: 정수, 기본값 0
--   priority: 문자열, 기본값 'medium'
--   user_id: 정수, NOT NULL, 외래 키 → users(id)
--   category_id: 정수, 외래 키 → categories(id)
--   created_at: 날짜시간, 기본값 현재시간
--   updated_at: 날짜시간, 기본값 현재시간
-- 관계:
--   user_id는 users 테이블의 id를 참조
--   category_id는 categories 테이블의 id를 참조

CREATE TABLE IF NOT EXISTS todos (
    -- TODO: 컬럼 정의를 작성하세요
    -- TODO: 외래 키 설정 (2개)
);
