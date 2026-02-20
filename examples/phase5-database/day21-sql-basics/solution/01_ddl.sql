-- ============================================
-- 할일 테이블 만들기 (DDL) - 정답
-- ============================================
-- SQLite용 테이블 정의

-- 기존 테이블이 있으면 삭제 (개발 중에만 사용)
DROP TABLE IF EXISTS todos;

-- 할일 테이블 생성
CREATE TABLE IF NOT EXISTS todos (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,  -- 고유 식별자, 자동증가
    title      TEXT    NOT NULL,                    -- 할일 제목, 필수 입력
    done       INTEGER DEFAULT 0,                   -- 완료 여부 (0: 미완료, 1: 완료)
    priority   TEXT    DEFAULT 'medium',            -- 우선순위 (high, medium, low)
    category   TEXT,                                -- 카테고리 (선택 입력)
    created_at TEXT    DEFAULT CURRENT_TIMESTAMP    -- 생성 시간, 자동 기록
);

-- 테이블 생성 확인
-- SQLite에서 실행: .tables 또는 .schema todos
