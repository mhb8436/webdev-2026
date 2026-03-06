# Day 22 - SQL 심화: 집계, 서브쿼리, 인덱스

> **Phase 5: Database** | 학습일: 22일차

---

## 학습 목표

- GROUP BY로 데이터를 그룹화한다
- HAVING 절로 그룹에 조건을 건다
- 집계 함수(COUNT, SUM, AVG)를 활용한다
- 서브쿼리를 작성한다
- VIEW와 CASE 문을 사용한다
- 인덱스를 생성하고 EXPLAIN으로 성능을 분석한다

---

## 핵심 개념

### 1. 집계 함수

| 함수 | 설명 | 예시 |
|------|------|------|
| COUNT(*) | 행의 개수 | `SELECT COUNT(*) FROM todos` |
| SUM(컬럼) | 합계 | `SELECT SUM(done) FROM todos` |
| AVG(컬럼) | 평균 | `SELECT AVG(done) FROM todos` |
| MAX(컬럼) | 최대값 | `SELECT MAX(created_at) FROM todos` |
| MIN(컬럼) | 최소값 | `SELECT MIN(created_at) FROM todos` |

### 2. GROUP BY와 HAVING

```sql
-- GROUP BY: 그룹별 집계
SELECT category, COUNT(*) AS count
FROM todos
GROUP BY category;

-- HAVING: 그룹에 조건 (WHERE는 개별 행)
SELECT category, COUNT(*) AS count
FROM todos
GROUP BY category
HAVING count >= 3;
```

| 구분 | WHERE | HAVING |
|------|-------|--------|
| 적용 대상 | 개별 행 | 그룹 |
| 실행 순서 | GROUP BY 이전 | GROUP BY 이후 |
| 집계 함수 | 사용 불가 | 사용 가능 |

### 3. 서브쿼리

```sql
SELECT * FROM todos
WHERE priority = (
    SELECT priority FROM todos
    GROUP BY priority ORDER BY COUNT(*) DESC LIMIT 1
);
```

### 4. VIEW와 CASE

```sql
-- VIEW: 자주 사용하는 쿼리를 저장
CREATE VIEW todo_stats AS
SELECT category, COUNT(*) AS total FROM todos GROUP BY category;

-- CASE: 조건부 값 변환
SELECT title,
    CASE priority
        WHEN 'high'   THEN '높음'
        WHEN 'medium' THEN '보통'
        WHEN 'low'    THEN '낮음'
    END AS priority_kr
FROM todos;
```

### 5. 인덱스와 EXPLAIN

```javascript
// 인덱스 생성
db.exec('CREATE INDEX idx_todos_category ON todos(category)');
db.exec('CREATE INDEX idx_todos_priority_done ON todos(priority, done)');

// EXPLAIN으로 쿼리 계획 확인
const plan = db.prepare('EXPLAIN QUERY PLAN SELECT * FROM todos WHERE category = ?').all('업무');
// SEARCH todos USING INDEX idx_todos_category (category=?)
```

---

## 실습 파일

### starter/ (직접 구현)

| 파일 | 내용 |
|------|------|
| `01_setup.sql` | 테이블 및 샘플 데이터 설정 |
| `02_queries.sql` | 심화 쿼리 (GROUP BY, HAVING, 서브쿼리) |
| `03_advanced_queries.js` | Node.js에서 심화 쿼리 실행 |
| `04_indexing.js` | 인덱스 생성 및 EXPLAIN 분석 |

### solution/ (완성 코드)

| 파일 | 내용 |
|------|------|
| `01_setup.sql` | 완성된 설정 |
| `02_queries.sql` | 완성된 심화 쿼리 |
| `03_advanced_queries.js` | 트랜잭션, 집계, JOIN 예제 |
| `04_indexing.js` | 10,000건 벌크 삽입, 인덱스 성능 비교 |

---

## 실행 방법

```bash
# SQL 실행
sqlite3 todo_advanced.db < solution/01_setup.sql
sqlite3 todo_advanced.db < solution/02_queries.sql

# Node.js 실행
npm install
node solution/03_advanced_queries.js
node solution/04_indexing.js
```

---

## 정리

| 개념 | 핵심 |
|------|------|
| GROUP BY | 그룹별 집계 (`category별 COUNT`) |
| HAVING | 그룹 조건 (GROUP BY 이후 필터링) |
| 서브쿼리 | 쿼리 안의 쿼리 (WHERE 절에서 활용) |
| VIEW | 자주 쓰는 쿼리를 저장 |
| CASE | 조건부 값 변환 |
| INDEX | 검색 성능 최적화 (EXPLAIN으로 확인) |

> **다음 시간**: Day 23 - 데이터 모델링 (ERD, 관계, JOIN)
