-- ============================================
-- 할일 테이블 만들기 (DDL)
-- ============================================
-- DDL(Data Definition Language)은 테이블의 구조를 정의하는 SQL입니다.
-- CREATE TABLE 문을 사용하여 테이블을 생성합니다.

-- TODO: todos 테이블 생성
-- 컬럼:
--   id: 정수, 기본키, 자동증가
--   title: 문자열(255), NOT NULL
--   done: 불리언, 기본값 FALSE (SQLite: INTEGER DEFAULT 0)
--   priority: 문자열(10), 기본값 'medium'
--   category: 문자열(50)
--   created_at: 날짜시간, 기본값 현재시간

CREATE TABLE IF NOT EXISTS todos (
    -- TODO: 컬럼 정의를 작성하세요
    -- 힌트: SQLite에서 자동증가는 INTEGER PRIMARY KEY AUTOINCREMENT
    -- 힌트: 기본값 설정은 DEFAULT 키워드 사용
    -- 힌트: 현재 시간 기본값은 DEFAULT CURRENT_TIMESTAMP
);
