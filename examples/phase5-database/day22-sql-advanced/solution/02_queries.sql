-- ============================================
-- 할일 통계 쿼리 (심화) - 정답
-- ============================================

-- ============================================
-- TODO 1: 카테고리별 할일 수
-- ============================================
-- GROUP BY로 카테고리별 그룹화 후 COUNT로 집계

SELECT category, COUNT(*) AS count
FROM todos
GROUP BY category;

-- 결과 예시:
-- 건강 | 2
-- 공부 | 3
-- 생활 | 3
-- 업무 | 4

-- ============================================
-- TODO 2: 우선순위별 완료율
-- ============================================
-- SUM(done)으로 완료 수, COUNT(*)로 전체 수를 구해 비율 계산

SELECT
    priority,
    COUNT(*)                                   AS total,
    SUM(done)                                  AS done_count,
    ROUND(SUM(done) * 100.0 / COUNT(*), 1)     AS done_rate
FROM todos
GROUP BY priority;

-- 결과 예시:
-- high   | 5 | 2 | 40.0
-- low    | 3 | 2 | 66.7
-- medium | 4 | 1 | 25.0

-- ============================================
-- TODO 3: 할일이 3개 이상인 카테고리만 조회 (HAVING)
-- ============================================
-- HAVING은 GROUP BY 이후에 그룹 조건을 적용

SELECT category, COUNT(*) AS count
FROM todos
GROUP BY category
HAVING COUNT(*) >= 3;

-- 결과 예시:
-- 공부 | 3
-- 생활 | 3
-- 업무 | 4

-- ============================================
-- TODO 4: 가장 최근에 만든 할일 3개 (ORDER BY, LIMIT)
-- ============================================
-- DESC로 내림차순 정렬, LIMIT로 상위 3개만 조회

SELECT id, title, priority, created_at
FROM todos
ORDER BY created_at DESC
LIMIT 3;

-- 결과 예시:
-- 집 청소하기      | low    | 2025-05-14 14:00:00
-- 병원 예약하기     | high   | 2025-05-14 11:00:00
-- 코드 리뷰 피드백  | medium | 2025-05-14 10:00:00

-- ============================================
-- TODO 5: 완료되지 않은 할일 중 우선순위가 'high'인 것
-- ============================================

-- 방법 1: WHERE 절에 AND 조건
SELECT * FROM todos
WHERE done = 0 AND priority = 'high';

-- 방법 2: 서브쿼리 사용 (같은 결과)
SELECT * FROM todos
WHERE id IN (
    SELECT id FROM todos WHERE done = 0
)
AND priority = 'high';

-- 결과 예시:
-- 팀 미팅 준비         | high | 미완료
-- 알고리즘 문제 3개 풀기 | high | 미완료
-- 병원 예약하기         | high | 미완료

-- ============================================
-- TODO 6: 통계 뷰 만들기 (CREATE VIEW)
-- ============================================
-- 카테고리별 전체, 완료, 미완료 수를 보여주는 뷰

DROP VIEW IF EXISTS todo_category_stats;

CREATE VIEW todo_category_stats AS
SELECT
    category,
    COUNT(*)                                          AS total,
    SUM(done)                                         AS done_count,
    SUM(CASE WHEN done = 0 THEN 1 ELSE 0 END)        AS undone_count
FROM todos
GROUP BY category;

-- 뷰 조회
SELECT * FROM todo_category_stats;

-- 결과 예시:
-- 건강 | 2 | 0 | 2
-- 공부 | 3 | 1 | 2
-- 생활 | 3 | 2 | 1
-- 업무 | 4 | 2 | 2

-- ============================================
-- TODO 7: CASE 문으로 우선순위 한글 표시
-- ============================================
-- CASE 문을 사용해 영문 우선순위를 한글로 변환

SELECT
    title,
    priority,
    CASE priority
        WHEN 'high'   THEN '높음'
        WHEN 'medium' THEN '보통'
        WHEN 'low'    THEN '낮음'
        ELSE '미정'
    END AS priority_kr
FROM todos;

-- 결과 예시:
-- 프로젝트 보고서 작성 | high   | 높음
-- 팀 미팅 준비        | high   | 높음
-- 이메일 답장하기      | medium | 보통
-- 장보기 - 우유, 계란  | medium | 보통
-- ...
