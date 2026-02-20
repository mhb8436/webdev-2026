-- ============================================
-- 할일 관리 앱 데이터베이스 스키마 - 정답
-- ============================================
-- 사용자, 카테고리, 할일 3개의 테이블을 외래 키로 연결

-- SQLite에서 외래 키 활성화 (필수)
PRAGMA foreign_keys = ON;

-- 기존 테이블 삭제 (의존 관계 역순으로 삭제)
DROP TABLE IF EXISTS todos;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;

-- ============================================
-- users 테이블 (사용자 정보)
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,  -- 사용자 고유 식별자
    username   TEXT    NOT NULL UNIQUE,             -- 사용자 이름 (중복 불가)
    email      TEXT    NOT NULL UNIQUE,             -- 이메일 (중복 불가)
    created_at TEXT    DEFAULT CURRENT_TIMESTAMP    -- 가입일
);

-- ============================================
-- categories 테이블 (카테고리 정보)
-- ============================================
CREATE TABLE IF NOT EXISTS categories (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,  -- 카테고리 고유 식별자
    name       TEXT    NOT NULL,                    -- 카테고리 이름
    user_id    INTEGER NOT NULL,                    -- 소유자 (사용자 ID)
    created_at TEXT    DEFAULT CURRENT_TIMESTAMP,   -- 생성일
    FOREIGN KEY (user_id) REFERENCES users(id)      -- 외래 키: users 테이블 참조
        ON DELETE CASCADE                           -- 사용자 삭제 시 카테고리도 삭제
);

-- ============================================
-- todos 테이블 (할일 정보)
-- ============================================
CREATE TABLE IF NOT EXISTS todos (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,  -- 할일 고유 식별자
    title       TEXT    NOT NULL,                    -- 할일 제목 (필수)
    description TEXT,                                -- 상세 설명 (선택)
    done        INTEGER DEFAULT 0,                   -- 완료 여부 (0: 미완료, 1: 완료)
    priority    TEXT    DEFAULT 'medium',            -- 우선순위 (high/medium/low)
    user_id     INTEGER NOT NULL,                    -- 소유자 (사용자 ID)
    category_id INTEGER,                             -- 카테고리 ID (선택)
    created_at  TEXT    DEFAULT CURRENT_TIMESTAMP,   -- 생성일
    updated_at  TEXT    DEFAULT CURRENT_TIMESTAMP,   -- 수정일
    FOREIGN KEY (user_id)     REFERENCES users(id)       -- 외래 키: users 테이블 참조
        ON DELETE CASCADE,                                -- 사용자 삭제 시 할일도 삭제
    FOREIGN KEY (category_id) REFERENCES categories(id)  -- 외래 키: categories 테이블 참조
        ON DELETE SET NULL                                -- 카테고리 삭제 시 NULL로 설정
);
