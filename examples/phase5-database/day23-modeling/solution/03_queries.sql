-- ============================================
-- 다중 테이블 쿼리 - 정답
-- ============================================
-- 01_schema.sql과 02_sample_data.sql을 먼저 실행한 후 실행하세요.

-- 보기 좋은 출력을 위한 설정 (SQLite 대화형 모드에서만 동작)
-- .mode column
-- .headers on

-- ============================================
-- 1. 특정 사용자의 모든 할일 (JOIN)
-- ============================================
-- users와 todos를 JOIN하여 김민수의 할일 조회

SELECT
    u.username    AS 사용자,
    t.title       AS 할일,
    t.priority    AS 우선순위,
    CASE t.done
        WHEN 1 THEN '완료'
        ELSE '미완료'
    END           AS 상태
FROM todos t
JOIN users u ON t.user_id = u.id
WHERE u.username = '김민수';

-- ============================================
-- 2. 사용자별 할일 수 통계
-- ============================================
-- GROUP BY로 사용자별 집계

SELECT
    u.username                                      AS 사용자,
    COUNT(*)                                        AS 전체,
    SUM(t.done)                                     AS 완료,
    SUM(CASE WHEN t.done = 0 THEN 1 ELSE 0 END)    AS 미완료
FROM todos t
JOIN users u ON t.user_id = u.id
GROUP BY u.id, u.username;

-- 결과 예시:
-- 김민수 | 5 | 2 | 3
-- 이지은 | 5 | 3 | 2

-- ============================================
-- 3. 카테고리별 할일 목록 (JOIN)
-- ============================================
-- 3개 테이블(users, categories, todos)을 JOIN

SELECT
    u.username    AS 사용자,
    c.name        AS 카테고리,
    t.title       AS 할일,
    t.priority    AS 우선순위,
    CASE t.done
        WHEN 1 THEN '완료'
        ELSE '미완료'
    END           AS 상태
FROM todos t
JOIN users u      ON t.user_id = u.id
JOIN categories c ON t.category_id = c.id
ORDER BY u.username, c.name, t.created_at;

-- ============================================
-- 4. 완료율이 가장 높은 사용자
-- ============================================
-- 완료율을 계산하고 가장 높은 사용자 조회

SELECT
    u.username                                      AS 사용자,
    COUNT(*)                                        AS 전체,
    SUM(t.done)                                     AS 완료,
    ROUND(SUM(t.done) * 100.0 / COUNT(*), 1)        AS 완료율
FROM todos t
JOIN users u ON t.user_id = u.id
GROUP BY u.id, u.username
ORDER BY 완료율 DESC
LIMIT 1;

-- 결과 예시:
-- 이지은 | 5 | 3 | 60.0

-- ============================================
-- 5. 할일이 없는 카테고리 찾기 (LEFT JOIN)
-- ============================================
-- LEFT JOIN으로 카테고리에 연결된 할일이 없는 경우를 찾음
-- (현재 샘플 데이터에서는 모든 카테고리에 할일이 있지만,
--  데이터가 변경되면 결과가 달라질 수 있음)

SELECT
    c.name        AS 카테고리,
    u.username    AS 소유자
FROM categories c
LEFT JOIN todos t ON c.id = t.category_id
JOIN users u      ON c.user_id = u.id
WHERE t.id IS NULL;

-- 참고: 모든 카테고리에 할일이 배정되어 있으면 결과가 비어있습니다.
-- 테스트를 위해 빈 카테고리를 추가해봅시다:
INSERT INTO categories (name, user_id) VALUES ('여행', 1);

-- 다시 조회하면 '여행' 카테고리가 나옵니다
SELECT
    c.name        AS 카테고리,
    u.username    AS 소유자
FROM categories c
LEFT JOIN todos t ON c.id = t.category_id
JOIN users u      ON c.user_id = u.id
WHERE t.id IS NULL;

-- 결과 예시:
-- 여행 | 김민수

-- ============================================
-- 보너스: 전체 통계 요약
-- ============================================
-- 사용자별 카테고리 수, 할일 수, 완료율을 한눈에 보기

SELECT
    u.username                                           AS 사용자,
    (SELECT COUNT(*) FROM categories
     WHERE user_id = u.id)                               AS 카테고리수,
    COUNT(t.id)                                          AS 할일수,
    SUM(t.done)                                          AS 완료수,
    ROUND(SUM(t.done) * 100.0 / COUNT(t.id), 1)          AS 완료율
FROM users u
LEFT JOIN todos t ON u.id = t.user_id
GROUP BY u.id, u.username;
