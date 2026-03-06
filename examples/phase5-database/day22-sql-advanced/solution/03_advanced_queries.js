// ============================================
// Day 22 - SQL 고급 쿼리 (풀이)
// ============================================
const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'company.db'));
db.pragma('journal_mode = WAL');

// --- 1. 테이블 및 데이터 준비 ---
db.exec(`
  DROP TABLE IF EXISTS employees;
  CREATE TABLE employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    department TEXT NOT NULL,
    salary INTEGER NOT NULL,
    hire_date TEXT NOT NULL
  )
`);

const insert = db.prepare('INSERT INTO employees (name, department, salary, hire_date) VALUES (?, ?, ?, ?)');
const seed = db.transaction(() => {
  insert.run('김개발', '개발', 65000000, '2020-03-15');
  insert.run('이영희', '개발', 72000000, '2019-07-01');
  insert.run('박민수', '개발', 55000000, '2021-01-10');
  insert.run('최지우', '개발', 48000000, '2022-06-20');
  insert.run('정하나', '디자인', 52000000, '2020-11-05');
  insert.run('강현우', '디자인', 58000000, '2019-04-15');
  insert.run('윤서연', '디자인', 45000000, '2023-02-01');
  insert.run('조성민', '마케팅', 50000000, '2021-08-12');
  insert.run('한예진', '마케팅', 43000000, '2022-03-25');
  insert.run('임태호', '인사', 47000000, '2020-09-18');
  insert.run('서유리', '인사', 42000000, '2023-05-30');
  insert.run('오재현', '개발', 80000000, '2018-01-02');
});
seed();
console.log("데이터 준비 완료\n");

// --- 2. 집계 함수 ---
console.log("=== 부서별 통계 ===");
const deptStats = db.prepare(`
  SELECT
    department as 부서,
    COUNT(*) as 직원수,
    printf('%,d', AVG(salary)) as 평균급여,
    printf('%,d', MAX(salary)) as 최고급여,
    printf('%,d', MIN(salary)) as 최저급여
  FROM employees
  GROUP BY department
  ORDER BY AVG(salary) DESC
`).all();
console.table(deptStats);

// --- 3. HAVING ---
console.log("=== 평균 급여 5000만 이상 부서 ===");
const richDepts = db.prepare(`
  SELECT department, printf('%,d', AVG(salary)) as avg_salary
  FROM employees
  GROUP BY department
  HAVING AVG(salary) >= 50000000
`).all();
console.table(richDepts);

// --- 4. 서브쿼리 ---
console.log("=== 전체 평균 이상 급여 직원 ===");
const aboveAvg = db.prepare(`
  SELECT name, department, printf('%,d', salary) as salary
  FROM employees
  WHERE salary > (SELECT AVG(salary) FROM employees)
  ORDER BY salary DESC
`).all();
console.table(aboveAvg);

console.log("=== 부서별 최고 급여 직원 ===");
const topByDept = db.prepare(`
  SELECT e.name, e.department, printf('%,d', e.salary) as salary
  FROM employees e
  WHERE e.salary = (
    SELECT MAX(salary) FROM employees WHERE department = e.department
  )
  ORDER BY e.salary DESC
`).all();
console.table(topByDept);

// --- 5. CASE 문 ---
console.log("=== 급여 등급 ===");
const grades = db.prepare(`
  SELECT name, department, printf('%,d', salary) as salary,
    CASE
      WHEN salary >= 70000000 THEN 'S'
      WHEN salary >= 55000000 THEN 'A'
      WHEN salary >= 45000000 THEN 'B'
      ELSE 'C'
    END as grade
  FROM employees
  ORDER BY salary DESC
`).all();
console.table(grades);

// --- 6. 윈도우 함수 ---
console.log("=== 부서별 급여 순위 ===");
const ranked = db.prepare(`
  SELECT
    name, department, printf('%,d', salary) as salary,
    RANK() OVER (PARTITION BY department ORDER BY salary DESC) as dept_rank,
    RANK() OVER (ORDER BY salary DESC) as overall_rank
  FROM employees
  ORDER BY department, dept_rank
`).all();
console.table(ranked);

console.log("=== 입사일 기준 누적 급여 ===");
const cumulative = db.prepare(`
  SELECT name, hire_date,
    printf('%,d', salary) as salary,
    printf('%,d', SUM(salary) OVER (ORDER BY hire_date)) as cumulative_salary
  FROM employees
  ORDER BY hire_date
`).all();
console.table(cumulative);

db.close();
