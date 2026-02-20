-- ============================================
-- 할일 데이터 조작 (DML) - 정답
-- ============================================

-- ============================================
-- 1. 할일 추가 (INSERT)
-- ============================================
-- 5개의 다양한 할일 데이터 삽입

INSERT INTO todos (title, priority, category)
VALUES ('프로젝트 보고서 작성', 'high', '업무');

INSERT INTO todos (title, priority, category)
VALUES ('장보기 - 우유, 계란, 빵', 'medium', '생활');

INSERT INTO todos (title, priority, category)
VALUES ('알고리즘 문제 풀기', 'high', '공부');

INSERT INTO todos (title, priority, category)
VALUES ('운동 30분 하기', 'low', '건강');

INSERT INTO todos (title, priority, category)
VALUES ('팀 미팅 준비', 'medium', '업무');

-- ============================================
-- 2. 전체 할일 조회 (SELECT)
-- ============================================
-- 모든 컬럼의 모든 데이터를 조회

SELECT * FROM todos;

-- ============================================
-- 3. 진행중인 할일만 조회 (WHERE)
-- ============================================
-- done이 0(미완료)인 할일만 필터링

SELECT * FROM todos WHERE done = 0;

-- ============================================
-- 4. 우선순위가 'high'인 할일 조회
-- ============================================
-- priority가 'high'인 할일만 필터링

SELECT * FROM todos WHERE priority = 'high';

-- ============================================
-- 5. 할일 완료 처리 (UPDATE)
-- ============================================
-- id가 1인 할일을 완료(done=1)로 변경

UPDATE todos SET done = 1 WHERE id = 1;

-- 변경 결과 확인
SELECT * FROM todos WHERE id = 1;

-- ============================================
-- 6. 할일 삭제 (DELETE)
-- ============================================
-- id가 4인 할일을 삭제

DELETE FROM todos WHERE id = 4;

-- 삭제 결과 확인
SELECT * FROM todos;

-- ============================================
-- 7. 카테고리별 할일 수 조회 (COUNT)
-- ============================================
-- GROUP BY로 카테고리별 그룹화, COUNT로 개수 집계

SELECT category, COUNT(*) AS todo_count
FROM todos
GROUP BY category;
