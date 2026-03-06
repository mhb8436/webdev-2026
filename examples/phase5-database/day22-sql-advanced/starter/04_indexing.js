// ============================================
// Day 22 - 인덱스와 쿼리 최적화
// ============================================
// 학습목표: 인덱스 생성, EXPLAIN 쿼리 분석, 성능 비교
// 실행: npm install && node starter/04_indexing.js

// TODO 1: 대량 데이터 준비
// - 10,000건의 직원 데이터를 INSERT
// - 이름, 부서(10개 중 랜덤), 급여(3000~9000만 랜덤), 입사일

// TODO 2: 인덱스 없이 검색
// - SELECT * FROM employees WHERE department = '개발' AND salary > 60000000
// - console.time / console.timeEnd 로 시간 측정

// TODO 3: 인덱스 생성
// - CREATE INDEX idx_dept ON employees(department);
// - CREATE INDEX idx_salary ON employees(salary);
// - CREATE INDEX idx_dept_salary ON employees(department, salary);  -- 복합 인덱스

// TODO 4: 인덱스 있는 상태에서 같은 쿼리 실행
// - 시간 비교

// TODO 5: EXPLAIN QUERY PLAN 사용
// - db.prepare('EXPLAIN QUERY PLAN SELECT ...').all()
// - 인덱스 사용 여부 확인
// - SCAN vs SEARCH 차이 이해

// TODO 6: 인덱스 주의사항
// - INSERT/UPDATE 성능에 미치는 영향 측정
// - 인덱스 너무 많으면 쓰기 성능 저하
// - LIKE '%keyword%' 는 인덱스 사용 불가 (앞부분 와일드카드)
