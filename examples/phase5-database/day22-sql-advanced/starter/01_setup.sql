-- ============================================
-- 할일 테이블 및 샘플 데이터 설정
-- ============================================
-- 이 파일을 먼저 실행하여 테이블과 데이터를 준비하세요.
-- 실행: sqlite3 todo_advanced.db < 01_setup.sql

-- 기존 테이블 삭제
DROP TABLE IF EXISTS todos;

-- 할일 테이블 생성
CREATE TABLE IF NOT EXISTS todos (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    title      TEXT    NOT NULL,
    done       INTEGER DEFAULT 0,
    priority   TEXT    DEFAULT 'medium',
    category   TEXT,
    created_at TEXT    DEFAULT CURRENT_TIMESTAMP
);

-- 샘플 데이터 삽입 (12개)
INSERT INTO todos (title, done, priority, category, created_at) VALUES
('프로젝트 보고서 작성', 1, 'high', '업무', '2025-05-10 09:00:00');

INSERT INTO todos (title, done, priority, category, created_at) VALUES
('팀 미팅 준비', 0, 'high', '업무', '2025-05-10 10:00:00');

INSERT INTO todos (title, done, priority, category, created_at) VALUES
('이메일 답장하기', 1, 'medium', '업무', '2025-05-11 08:30:00');

INSERT INTO todos (title, done, priority, category, created_at) VALUES
('장보기 - 우유, 계란', 0, 'medium', '생활', '2025-05-11 12:00:00');

INSERT INTO todos (title, done, priority, category, created_at) VALUES
('알고리즘 문제 3개 풀기', 0, 'high', '공부', '2025-05-12 14:00:00');

INSERT INTO todos (title, done, priority, category, created_at) VALUES
('SQL 심화 학습', 1, 'high', '공부', '2025-05-12 15:00:00');

INSERT INTO todos (title, done, priority, category, created_at) VALUES
('운동 30분 하기', 0, 'low', '건강', '2025-05-13 07:00:00');

INSERT INTO todos (title, done, priority, category, created_at) VALUES
('독서 - 클린코드 2장', 0, 'medium', '공부', '2025-05-13 20:00:00');

INSERT INTO todos (title, done, priority, category, created_at) VALUES
('빨래하기', 1, 'low', '생활', '2025-05-13 09:00:00');

INSERT INTO todos (title, done, priority, category, created_at) VALUES
('코드 리뷰 피드백', 0, 'medium', '업무', '2025-05-14 10:00:00');

INSERT INTO todos (title, done, priority, category, created_at) VALUES
('병원 예약하기', 0, 'high', '건강', '2025-05-14 11:00:00');

INSERT INTO todos (title, done, priority, category, created_at) VALUES
('집 청소하기', 1, 'low', '생활', '2025-05-14 14:00:00');
