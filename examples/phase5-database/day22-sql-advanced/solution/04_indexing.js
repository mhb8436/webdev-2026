// ============================================
// Day 22 - 인덱스와 쿼리 최적화 (풀이)
// ============================================
const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'indexing.db'));
db.pragma('journal_mode = WAL');

// --- 1. 대량 데이터 준비 ---
console.log("=== 데이터 준비 ===");

db.exec(`
  DROP TABLE IF EXISTS employees;
  CREATE TABLE employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    department TEXT NOT NULL,
    salary INTEGER NOT NULL,
    hire_date TEXT NOT NULL,
    email TEXT
  )
`);

const departments = ['개발', '디자인', '마케팅', '인사', '재무', '영업', '기획', '운영', 'QA', '보안'];
const insert = db.prepare(
  'INSERT INTO employees (name, department, salary, hire_date, email) VALUES (?, ?, ?, ?, ?)'
);

const insertMany = db.transaction(() => {
  for (let i = 0; i < 10000; i++) {
    const dept = departments[Math.floor(Math.random() * departments.length)];
    const salary = Math.floor(Math.random() * 6000 + 3000) * 10000; // 3000만~9000만
    const year = 2015 + Math.floor(Math.random() * 9);
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
    insert.run(`직원${i + 1}`, dept, salary, `${year}-${month}-${day}`, `emp${i + 1}@company.com`);
  }
});
insertMany();
console.log("10,000건 데이터 삽입 완료\n");

// --- 2. 인덱스 없이 검색 ---
console.log("=== 인덱스 없이 검색 ===");

console.time("인덱스 없음");
const noIndex = db.prepare(`
  SELECT * FROM employees
  WHERE department = '개발' AND salary > 60000000
  ORDER BY salary DESC
`).all();
console.timeEnd("인덱스 없음");
console.log(`결과: ${noIndex.length}건\n`);

// EXPLAIN QUERY PLAN - 인덱스 없는 상태
console.log("--- EXPLAIN (인덱스 없음) ---");
const planNoIndex = db.prepare(`
  EXPLAIN QUERY PLAN
  SELECT * FROM employees
  WHERE department = '개발' AND salary > 60000000
`).all();
planNoIndex.forEach(row => console.log(`  ${row.detail}`));
console.log("");

// --- 3. 인덱스 생성 ---
console.log("=== 인덱스 생성 ===");

console.time("단일 인덱스 생성 (department)");
db.exec('CREATE INDEX idx_dept ON employees(department)');
console.timeEnd("단일 인덱스 생성 (department)");

console.time("단일 인덱스 생성 (salary)");
db.exec('CREATE INDEX idx_salary ON employees(salary)');
console.timeEnd("단일 인덱스 생성 (salary)");

console.time("복합 인덱스 생성 (department, salary)");
db.exec('CREATE INDEX idx_dept_salary ON employees(department, salary)');
console.timeEnd("복합 인덱스 생성 (department, salary)");

console.time("고유 인덱스 생성 (email)");
db.exec('CREATE UNIQUE INDEX idx_email ON employees(email)');
console.timeEnd("고유 인덱스 생성 (email)");
console.log("");

// --- 4. 인덱스 있는 상태에서 검색 ---
console.log("=== 인덱스 있는 상태에서 검색 ===");

console.time("인덱스 있음");
const withIndex = db.prepare(`
  SELECT * FROM employees
  WHERE department = '개발' AND salary > 60000000
  ORDER BY salary DESC
`).all();
console.timeEnd("인덱스 있음");
console.log(`결과: ${withIndex.length}건\n`);

// --- 5. EXPLAIN QUERY PLAN 분석 ---
console.log("=== EXPLAIN QUERY PLAN 분석 ===");

// 복합 인덱스를 사용하는 쿼리
console.log("--- 쿼리 1: department + salary (복합 인덱스 활용) ---");
const plan1 = db.prepare(`
  EXPLAIN QUERY PLAN
  SELECT * FROM employees
  WHERE department = '개발' AND salary > 60000000
`).all();
plan1.forEach(row => console.log(`  ${row.detail}`));

// 단일 컬럼 조건
console.log("\n--- 쿼리 2: department만 (단일 인덱스 활용) ---");
const plan2 = db.prepare(`
  EXPLAIN QUERY PLAN
  SELECT * FROM employees WHERE department = '개발'
`).all();
plan2.forEach(row => console.log(`  ${row.detail}`));

// LIKE 패턴 - 앞부분 와일드카드는 인덱스 사용 불가
console.log("\n--- 쿼리 3: LIKE '%개%' (인덱스 사용 불가) ---");
const plan3 = db.prepare(`
  EXPLAIN QUERY PLAN
  SELECT * FROM employees WHERE department LIKE '%개%'
`).all();
plan3.forEach(row => console.log(`  ${row.detail}`));

// LIKE 패턴 - 앞부분 고정이면 인덱스 사용 가능
console.log("\n--- 쿼리 4: LIKE '개%' (인덱스 사용 가능) ---");
const plan4 = db.prepare(`
  EXPLAIN QUERY PLAN
  SELECT * FROM employees WHERE department LIKE '개%'
`).all();
plan4.forEach(row => console.log(`  ${row.detail}`));
console.log("");

// --- 6. INSERT 성능 비교 ---
console.log("=== INSERT 성능 비교 ===");

// 인덱스 있는 상태에서 INSERT
console.time("INSERT 1000건 (인덱스 있음)");
const insertBatch = db.transaction(() => {
  for (let i = 10001; i <= 11000; i++) {
    insert.run(`직원${i}`, '개발', 50000000, '2024-01-01', `emp${i}@company.com`);
  }
});
insertBatch();
console.timeEnd("INSERT 1000건 (인덱스 있음)");

// 인덱스 제거 후 INSERT
db.exec('DROP INDEX idx_dept');
db.exec('DROP INDEX idx_salary');
db.exec('DROP INDEX idx_dept_salary');
db.exec('DROP INDEX idx_email');

// 기존 추가 데이터 삭제
db.exec('DELETE FROM employees WHERE id > 10000');

console.time("INSERT 1000건 (인덱스 없음)");
const insertBatch2 = db.transaction(() => {
  for (let i = 10001; i <= 11000; i++) {
    insert.run(`직원${i}`, '개발', 50000000, '2024-01-01', `emp${i}@company.com`);
  }
});
insertBatch2();
console.timeEnd("INSERT 1000건 (인덱스 없음)");
console.log("");

// --- 7. 인덱스 정보 조회 ---
console.log("=== 인덱스 목록 조회 ===");
// 인덱스 재생성
db.exec('CREATE INDEX idx_dept ON employees(department)');
db.exec('CREATE INDEX idx_dept_salary ON employees(department, salary)');

const indexes = db.prepare(`
  SELECT name, tbl_name
  FROM sqlite_master
  WHERE type = 'index' AND tbl_name = 'employees'
`).all();
console.table(indexes);

// --- 요약 ---
console.log("\n=== 인덱스 가이드라인 ===");
console.log("1. WHERE, JOIN, ORDER BY에 자주 쓰이는 컬럼에 인덱스 생성");
console.log("2. 복합 인덱스: 자주 함께 조건으로 쓰이는 컬럼 조합");
console.log("3. 선택도(cardinality)가 높은 컬럼이 효과적 (예: email > gender)");
console.log("4. LIKE '%...' 는 인덱스 사용 불가 → Full Text Search 고려");
console.log("5. 인덱스 과다 → INSERT/UPDATE 성능 저하, 저장 공간 증가");
console.log("6. EXPLAIN QUERY PLAN으로 항상 확인!");

db.close();
