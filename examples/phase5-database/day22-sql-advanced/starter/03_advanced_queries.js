// ============================================
// Day 22 - SQL 고급 쿼리 (Node.js + SQLite)
// ============================================
// 학습목표: 서브쿼리, 집계 함수, 윈도우 함수, CASE문

const Database = require('better-sqlite3');
const path = require('path');

// TODO 1: DB 연결 및 테이블/데이터 준비
// employees 테이블: id, name, department, salary, hire_date
// 부서: '개발', '디자인', '마케팅', '인사'
// 최소 10명 이상의 직원 데이터 삽입


// TODO 2: 집계 함수
// 부서별 평균 급여, 최고 급여, 최저 급여, 직원 수
// SELECT department, AVG(salary), MAX(salary), MIN(salary), COUNT(*)
// GROUP BY department


// TODO 3: HAVING 절
// 평균 급여가 5000만원 이상인 부서만 조회


// TODO 4: 서브쿼리
// 평균 급여보다 높은 급여를 받는 직원 조회
// WHERE salary > (SELECT AVG(salary) FROM employees)
// 각 부서에서 가장 높은 급여를 받는 직원 조회


// TODO 5: CASE 문
// 급여 등급 분류: 7000만 이상 'S', 5000만 이상 'A', 3000만 이상 'B', 그 외 'C'
// SELECT name, salary, CASE WHEN salary >= 70000000 THEN 'S' ... END as grade


// TODO 6: 윈도우 함수 (SQLite 3.25+)
// 부서별 급여 순위: RANK() OVER (PARTITION BY department ORDER BY salary DESC)
// 누적 합계: SUM(salary) OVER (ORDER BY hire_date)
