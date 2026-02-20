-- ============================================
-- 샘플 데이터 입력 - 정답
-- ============================================
-- 01_schema.sql을 먼저 실행한 후 이 파일을 실행하세요.

-- ============================================
-- 사용자 2명
-- ============================================
INSERT INTO users (username, email) VALUES ('김민수', 'minsu@example.com');
INSERT INTO users (username, email) VALUES ('이지은', 'jieun@example.com');

-- ============================================
-- 카테고리 - 김민수(id=1)의 카테고리 3개
-- ============================================
INSERT INTO categories (name, user_id) VALUES ('업무', 1);
INSERT INTO categories (name, user_id) VALUES ('공부', 1);
INSERT INTO categories (name, user_id) VALUES ('운동', 1);

-- ============================================
-- 카테고리 - 이지은(id=2)의 카테고리 3개
-- ============================================
INSERT INTO categories (name, user_id) VALUES ('프로젝트', 2);
INSERT INTO categories (name, user_id) VALUES ('독서', 2);
INSERT INTO categories (name, user_id) VALUES ('생활', 2);

-- ============================================
-- 할일 - 김민수(id=1)의 할일 5개
-- ============================================
-- 업무(카테고리 id=1)
INSERT INTO todos (title, description, done, priority, user_id, category_id, created_at)
VALUES ('주간 보고서 작성', '이번 주 업무 진행 상황 정리', 1, 'high', 1, 1, '2025-05-10 09:00:00');

INSERT INTO todos (title, description, done, priority, user_id, category_id, created_at)
VALUES ('회의록 정리', '월요일 전체 회의 내용 정리', 0, 'medium', 1, 1, '2025-05-11 10:00:00');

-- 공부(카테고리 id=2)
INSERT INTO todos (title, description, done, priority, user_id, category_id, created_at)
VALUES ('SQL JOIN 복습', '다중 테이블 JOIN 개념 정리', 1, 'high', 1, 2, '2025-05-12 14:00:00');

INSERT INTO todos (title, description, done, priority, user_id, category_id, created_at)
VALUES ('알고리즘 문제 풀기', '백준 실버 문제 3개', 0, 'medium', 1, 2, '2025-05-13 15:00:00');

-- 운동(카테고리 id=3)
INSERT INTO todos (title, description, done, priority, user_id, category_id, created_at)
VALUES ('헬스장 가기', '상체 운동 루틴', 0, 'low', 1, 3, '2025-05-13 18:00:00');

-- ============================================
-- 할일 - 이지은(id=2)의 할일 5개
-- ============================================
-- 프로젝트(카테고리 id=4)
INSERT INTO todos (title, description, done, priority, user_id, category_id, created_at)
VALUES ('API 설계 문서 작성', 'RESTful API 엔드포인트 정의', 1, 'high', 2, 4, '2025-05-10 10:00:00');

INSERT INTO todos (title, description, done, priority, user_id, category_id, created_at)
VALUES ('데이터베이스 스키마 설계', 'ERD 작성 및 테이블 정의', 1, 'high', 2, 4, '2025-05-11 09:00:00');

INSERT INTO todos (title, description, done, priority, user_id, category_id, created_at)
VALUES ('테스트 코드 작성', '단위 테스트 커버리지 80% 이상', 0, 'medium', 2, 4, '2025-05-12 11:00:00');

-- 독서(카테고리 id=5)
INSERT INTO todos (title, description, done, priority, user_id, category_id, created_at)
VALUES ('클린 코드 3장 읽기', '함수 파트 정리', 1, 'low', 2, 5, '2025-05-13 20:00:00');

-- 생활(카테고리 id=6)
INSERT INTO todos (title, description, done, priority, user_id, category_id, created_at)
VALUES ('장보기', '우유, 계란, 과일 구매', 0, 'medium', 2, 6, '2025-05-14 12:00:00');
