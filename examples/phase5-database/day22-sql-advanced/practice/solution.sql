-- ============================================
-- Day 22 연습 문제 정답 - SQL 심화: GROUP BY, JOIN, 서브쿼리
-- ============================================
-- 실행 방법:
--   sqlite3 practice.db < solution.sql
-- ============================================

-- ============================================
-- 문제 1: 매출 통계 (GROUP BY, HAVING)
-- ============================================

-- 1-1. sales 테이블 생성
DROP TABLE IF EXISTS sales;

CREATE TABLE sales (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    product   TEXT NOT NULL,
    category  TEXT NOT NULL,
    amount    INTEGER NOT NULL,
    sale_date TEXT NOT NULL
);

-- 1-2. 매출 데이터 16개 INSERT
INSERT INTO sales (product, category, amount, sale_date) VALUES ('노트북', '전자기기', 1200000, '2025-01-05');
INSERT INTO sales (product, category, amount, sale_date) VALUES ('스마트폰', '전자기기', 890000, '2025-01-12');
INSERT INTO sales (product, category, amount, sale_date) VALUES ('이어폰', '전자기기', 45000, '2025-01-20');
INSERT INTO sales (product, category, amount, sale_date) VALUES ('태블릿', '전자기기', 650000, '2025-02-03');
INSERT INTO sales (product, category, amount, sale_date) VALUES ('겨울 코트', '의류', 120000, '2025-01-08');
INSERT INTO sales (product, category, amount, sale_date) VALUES ('운동화', '의류', 89000, '2025-01-15');
INSERT INTO sales (product, category, amount, sale_date) VALUES ('청바지', '의류', 55000, '2025-02-01');
INSERT INTO sales (product, category, amount, sale_date) VALUES ('맨투맨', '의류', 35000, '2025-02-10');
INSERT INTO sales (product, category, amount, sale_date) VALUES ('유기농 쌀', '식품', 32000, '2025-01-10');
INSERT INTO sales (product, category, amount, sale_date) VALUES ('올리브유', '식품', 18000, '2025-01-22');
INSERT INTO sales (product, category, amount, sale_date) VALUES ('견과류 세트', '식품', 25000, '2025-02-05');
INSERT INTO sales (product, category, amount, sale_date) VALUES ('프로틴 바', '식품', 15000, '2025-02-14');
INSERT INTO sales (product, category, amount, sale_date) VALUES ('클린 코드', '도서', 33000, '2025-01-18');
INSERT INTO sales (product, category, amount, sale_date) VALUES ('자바스크립트 완벽 가이드', '도서', 45000, '2025-01-25');
INSERT INTO sales (product, category, amount, sale_date) VALUES ('리팩터링', '도서', 35000, '2025-02-08');
INSERT INTO sales (product, category, amount, sale_date) VALUES ('디자인 패턴', '도서', 28000, '2025-02-15');

-- 1-3. 카테고리별 매출 합계, 평균, 건수
SELECT '=== 카테고리별 매출 합계/평균/건수 ===' AS info;
SELECT
    category                    AS 카테고리,
    SUM(amount)                 AS 매출합계,
    ROUND(AVG(amount), 0)       AS 평균매출,
    COUNT(*)                    AS 매출건수
FROM sales
GROUP BY category;

-- 1-4. 카테고리별 최고 매출액과 최저 매출액
SELECT '=== 카테고리별 최고/최저 매출 ===' AS info;
SELECT
    category     AS 카테고리,
    MAX(amount)  AS 최고매출,
    MIN(amount)  AS 최저매출
FROM sales
GROUP BY category;

-- 1-5. 월별 총 매출 합계
SELECT '=== 월별 총 매출 ===' AS info;
SELECT
    strftime('%Y-%m', sale_date)  AS 월,
    SUM(amount)                   AS 월매출합계,
    COUNT(*)                      AS 건수
FROM sales
GROUP BY strftime('%Y-%m', sale_date)
ORDER BY 월;

-- 1-6. HAVING: 매출 합계가 100,000원 이상인 카테고리만
SELECT '=== 매출 합계 100,000원 이상 카테고리 ===' AS info;
SELECT
    category       AS 카테고리,
    SUM(amount)    AS 매출합계
FROM sales
GROUP BY category
HAVING SUM(amount) >= 100000;

-- 1-7. HAVING: 평균 매출이 30,000원 이상인 카테고리만
SELECT '=== 평균 매출 30,000원 이상 카테고리 ===' AS info;
SELECT
    category                 AS 카테고리,
    ROUND(AVG(amount), 0)    AS 평균매출
FROM sales
GROUP BY category
HAVING AVG(amount) >= 30000;

-- 1-8. HAVING: 매출 건수 3건 이상 (매출 합계 내림차순)
SELECT '=== 매출 건수 3건 이상 (합계 내림차순) ===' AS info;
SELECT
    category       AS 카테고리,
    COUNT(*)       AS 매출건수,
    SUM(amount)    AS 매출합계
FROM sales
GROUP BY category
HAVING COUNT(*) >= 3
ORDER BY SUM(amount) DESC;


-- ============================================
-- 문제 2: 학교 DB JOIN
-- ============================================

-- 2-1. classes 테이블 생성
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS classes;

CREATE TABLE classes (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    class_name TEXT NOT NULL,
    teacher    TEXT NOT NULL
);

-- 2-2. students 테이블 생성
CREATE TABLE students (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    name     TEXT NOT NULL,
    class_id INTEGER,
    FOREIGN KEY (class_id) REFERENCES classes(id)
);

-- 2-3. 반 4개 INSERT
INSERT INTO classes (class_name, teacher) VALUES ('1반', '김선생님');
INSERT INTO classes (class_name, teacher) VALUES ('2반', '이선생님');
INSERT INTO classes (class_name, teacher) VALUES ('3반', '박선생님');
INSERT INTO classes (class_name, teacher) VALUES ('4반', '최선생님');

-- 2-4. 학생 8명 INSERT (반 배정 6명, 미배정 2명)
INSERT INTO students (name, class_id) VALUES ('강민준', 1);
INSERT INTO students (name, class_id) VALUES ('김서윤', 1);
INSERT INTO students (name, class_id) VALUES ('이도윤', 2);
INSERT INTO students (name, class_id) VALUES ('박하은', 2);
INSERT INTO students (name, class_id) VALUES ('정예준', 3);
INSERT INTO students (name, class_id) VALUES ('조시우', 3);
INSERT INTO students (name, class_id) VALUES ('윤지호', NULL);   -- 반 미배정
INSERT INTO students (name, class_id) VALUES ('한소율', NULL);   -- 반 미배정

-- 2-5. INNER JOIN: 학생명, 반이름, 담임선생님
SELECT '=== INNER JOIN: 학생-반-담임 ===' AS info;
SELECT
    s.name       AS 학생명,
    c.class_name AS 반이름,
    c.teacher    AS 담임선생님
FROM students s
INNER JOIN classes c ON s.class_id = c.id;

-- 2-6. LEFT JOIN: 반 미배정 학생도 포함
SELECT '=== LEFT JOIN: 미배정 학생 포함 ===' AS info;
SELECT
    s.name                          AS 학생명,
    COALESCE(c.class_name, '미배정') AS 반이름,
    COALESCE(c.teacher, '-')        AS 담임선생님
FROM students s
LEFT JOIN classes c ON s.class_id = c.id;

-- 2-7. 반별 학생 수 (GROUP BY + JOIN)
SELECT '=== 반별 학생 수 ===' AS info;
SELECT
    c.class_name   AS 반이름,
    c.teacher      AS 담임선생님,
    COUNT(s.id)    AS 학생수
FROM classes c
LEFT JOIN students s ON c.id = s.class_id
GROUP BY c.id, c.class_name, c.teacher;

-- 2-8. 학생이 없는 반 찾기
SELECT '=== 학생이 없는 반 ===' AS info;
SELECT
    c.class_name AS 반이름,
    c.teacher    AS 담임선생님
FROM classes c
LEFT JOIN students s ON c.id = s.class_id
WHERE s.id IS NULL;


-- ============================================
-- 문제 3: 서브쿼리 연습
-- ============================================

-- 3-1. employees 테이블 생성
DROP TABLE IF EXISTS employees;

CREATE TABLE employees (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT NOT NULL,
    department TEXT NOT NULL,
    salary     INTEGER NOT NULL
);

-- 3-2. 직원 12명 INSERT
INSERT INTO employees (name, department, salary) VALUES ('김개발', '개발팀', 5500000);
INSERT INTO employees (name, department, salary) VALUES ('이코딩', '개발팀', 4800000);
INSERT INTO employees (name, department, salary) VALUES ('박자바', '개발팀', 6200000);
INSERT INTO employees (name, department, salary) VALUES ('최리액', '개발팀', 5000000);
INSERT INTO employees (name, department, salary) VALUES ('정마케', '마케팅팀', 4200000);
INSERT INTO employees (name, department, salary) VALUES ('강홍보', '마케팅팀', 3800000);
INSERT INTO employees (name, department, salary) VALUES ('윤광고', '마케팅팀', 4500000);
INSERT INTO employees (name, department, salary) VALUES ('한인사', '인사팀', 4000000);
INSERT INTO employees (name, department, salary) VALUES ('조복지', '인사팀', 3500000);
INSERT INTO employees (name, department, salary) VALUES ('임채용', '인사팀', 4300000);
INSERT INTO employees (name, department, salary) VALUES ('신영업', '영업팀', 4700000);
INSERT INTO employees (name, department, salary) VALUES ('오거래', '영업팀', 5100000);

-- 전체 직원 확인
SELECT '=== 전체 직원 목록 ===' AS info;
SELECT * FROM employees;

-- 참고: 전체 평균 급여
SELECT '=== 전체 평균 급여 ===' AS info;
SELECT ROUND(AVG(salary), 0) AS 평균급여 FROM employees;

-- 3-3. 평균 급여 이상을 받는 직원
SELECT '=== 평균 급여 이상 직원 ===' AS info;
SELECT name AS 이름, department AS 부서, salary AS 급여
FROM employees
WHERE salary >= (SELECT AVG(salary) FROM employees)
ORDER BY salary DESC;

-- 3-4. 가장 높은 급여를 받는 직원이 속한 부서
SELECT '=== 최고 급여 직원의 부서 ===' AS info;
SELECT name AS 이름, department AS 부서, salary AS 급여
FROM employees
WHERE salary = (SELECT MAX(salary) FROM employees);

-- 3-5. 부서별 최고 급여 직원
SELECT '=== 부서별 최고 급여 직원 ===' AS info;
SELECT name AS 이름, department AS 부서, salary AS 급여
FROM employees
WHERE (department, salary) IN (
    SELECT department, MAX(salary)
    FROM employees
    GROUP BY department
)
ORDER BY salary DESC;

-- 3-6. 평균 급여가 가장 높은 부서
SELECT '=== 평균 급여가 가장 높은 부서 ===' AS info;
SELECT department AS 부서, ROUND(AVG(salary), 0) AS 평균급여
FROM employees
GROUP BY department
HAVING AVG(salary) = (
    SELECT MAX(avg_sal)
    FROM (
        SELECT AVG(salary) AS avg_sal
        FROM employees
        GROUP BY department
    )
);

-- 3-7. 급여 순위 (상관 서브쿼리)
SELECT '=== 급여 순위 ===' AS info;
SELECT
    name       AS 이름,
    department AS 부서,
    salary     AS 급여,
    (SELECT COUNT(*) FROM employees e2 WHERE e2.salary > e1.salary) + 1 AS 순위
FROM employees e1
ORDER BY 순위;
