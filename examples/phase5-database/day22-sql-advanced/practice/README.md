# Day 22 연습 문제 - SQL 심화: GROUP BY, JOIN, 서브쿼리

> 메인 실습(할일 앱 통계)과는 다른 시나리오로 심화 SQL 개념을 연습합니다.
> `practice.sql` 파일에 SQL을 작성하고, SQLite로 실행하세요.

```bash
# 실행 방법
sqlite3 practice.db < practice.sql

# 대화형 모드 (보기 좋은 출력)
sqlite3 practice.db
sqlite> .mode column
sqlite> .headers on
```

---

## 문제 1: 매출 통계 (GROUP BY, HAVING)

쇼핑몰 매출 데이터를 분석하여 카테고리별 통계를 구하세요.

**테이블 구조:**

| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | INTEGER | PRIMARY KEY AUTOINCREMENT | 매출 고유 번호 |
| product | TEXT | NOT NULL | 상품명 |
| category | TEXT | NOT NULL | 카테고리 (전자기기, 의류, 식품, 도서 등) |
| amount | INTEGER | NOT NULL | 판매 금액 (원) |
| sale_date | TEXT | NOT NULL | 판매 일자 |

**요구사항:**

1. `sales` 테이블을 생성하고 15개 이상의 매출 데이터를 INSERT하세요.
   - 카테고리는 최소 4가지, 각 카테고리에 3개 이상의 데이터를 넣으세요.
2. GROUP BY 쿼리를 작성하세요:
   - 카테고리별 매출 합계(`SUM`), 평균(`AVG`), 건수(`COUNT`)
   - 카테고리별 최고 매출액(`MAX`)과 최저 매출액(`MIN`)
   - 월별(sale_date 기준) 총 매출 합계
3. HAVING 절을 사용하세요:
   - 매출 합계가 100,000원 이상인 카테고리만 조회
   - 평균 매출이 30,000원 이상인 카테고리만 조회
   - 매출 건수가 3건 이상인 카테고리를 매출 합계 내림차순으로 조회

**힌트:**
- `SUM(amount)`으로 합계, `AVG(amount)`로 평균을 구합니다.
- `HAVING`은 `GROUP BY` 뒤에 위치하며, 집계 결과에 대한 조건을 겁니다.
- 월별 그룹화: `GROUP BY strftime('%Y-%m', sale_date)` (SQLite 날짜 함수)
- `ROUND(AVG(amount), 0)`으로 평균을 정수로 반올림할 수 있습니다.

---

## 문제 2: 학교 DB JOIN

학생과 반 정보를 JOIN으로 연결하여 조회하세요.

**테이블 구조:**

`students` 테이블:

| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | INTEGER | PRIMARY KEY AUTOINCREMENT | 학생 번호 |
| name | TEXT | NOT NULL | 학생 이름 |
| class_id | INTEGER | | 반 번호 (FK, NULL 가능) |

`classes` 테이블:

| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | INTEGER | PRIMARY KEY AUTOINCREMENT | 반 번호 |
| class_name | TEXT | NOT NULL | 반 이름 |
| teacher | TEXT | NOT NULL | 담임 선생님 |

**요구사항:**

1. `classes` 테이블과 `students` 테이블을 생성하세요. (classes 먼저!)
2. 반 4개를 INSERT하세요. (예: 1반~4반, 각각 다른 담임)
3. 학생 8명을 INSERT하세요. (반이 배정된 학생 6명, 반 미배정 학생 2명 - class_id를 NULL로)
4. JOIN 쿼리를 작성하세요:
   - **INNER JOIN**: 학생명, 반이름, 담임선생님을 조회 (반이 있는 학생만)
   - **LEFT JOIN**: 반이 배정되지 않은 학생도 포함하여 조회
   - **반별 학생 수**: GROUP BY와 JOIN을 조합하여 반별 학생 수를 구하세요
   - **학생이 없는 반 찾기**: LEFT JOIN을 반대로 사용하여 학생이 한 명도 없는 반을 찾으세요

**힌트:**
- INNER JOIN은 양쪽 테이블 모두에 데이터가 있는 경우만 결과에 포함됩니다.
- LEFT JOIN은 왼쪽 테이블의 모든 행을 포함하고, 매칭 안되면 NULL로 채웁니다.
- `ON students.class_id = classes.id`로 연결 조건을 지정합니다.
- 학생이 없는 반: `LEFT JOIN` 후 `WHERE students.id IS NULL` 조건을 사용합니다.
- 테이블 별칭(alias)을 사용하면 쿼리가 간결해집니다: `FROM students s JOIN classes c ON s.class_id = c.id`

---

## 문제 3: 서브쿼리 연습

직원 급여 데이터에서 서브쿼리를 활용한 다양한 조회를 연습하세요.

**테이블 구조:**

| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | INTEGER | PRIMARY KEY AUTOINCREMENT | 직원 번호 |
| name | TEXT | NOT NULL | 직원 이름 |
| department | TEXT | NOT NULL | 부서 (개발팀, 마케팅팀, 인사팀, 영업팀 등) |
| salary | INTEGER | NOT NULL | 월급 (원) |

**요구사항:**

1. `employees` 테이블을 생성하고 12명 이상의 직원 데이터를 INSERT하세요.
   - 부서는 최소 3개, 급여는 다양하게 설정하세요.
2. 서브쿼리를 사용한 조회를 작성하세요:
   - **평균 급여 이상을 받는 직원**: 전체 평균 급여를 서브쿼리로 구하고, 그 이상을 받는 직원을 조회하세요.
   - **가장 높은 급여를 받는 직원이 속한 부서**: 최고 급여를 서브쿼리로 구하고, 해당 부서명을 조회하세요.
   - **부서별 최고 급여 직원**: 각 부서에서 가장 높은 급여를 받는 직원의 이름, 부서, 급여를 조회하세요.
   - **평균 급여가 가장 높은 부서**: 부서별 평균 급여를 구한 뒤, 가장 높은 부서를 서브쿼리로 조회하세요.
   - **급여 순위**: 자신보다 급여가 높은 사람의 수 + 1을 순위로 계산하세요 (서브쿼리 활용).

**힌트:**
- WHERE 절 서브쿼리: `WHERE salary >= (SELECT AVG(salary) FROM employees)`
- 서브쿼리는 반드시 괄호 `()`로 감싸야 합니다.
- 부서별 최고 급여 직원은 WHERE 절에 `(department, salary) IN (SELECT ...)` 패턴을 사용할 수 있습니다.
  - SQLite에서는 이 패턴이 지원되므로 활용해보세요.
- 상관 서브쿼리(Correlated Subquery): 외부 쿼리의 값을 내부 서브쿼리에서 참조하는 것을 말합니다.
  - 예: `SELECT name, (SELECT COUNT(*) FROM employees e2 WHERE e2.salary > e1.salary) + 1 AS rank FROM employees e1`

---

## 실행 및 확인 방법

```bash
# practice.sql 파일 실행
sqlite3 practice.db < practice.sql

# 대화형 모드로 결과 확인
sqlite3 practice.db
sqlite> .mode column
sqlite> .headers on
sqlite> SELECT category, SUM(amount) FROM sales GROUP BY category;
sqlite> .quit
```

> `.mode column`과 `.headers on`을 사용하면 결과가 표 형태로 보기 좋게 출력됩니다.
> 정답은 `solution.sql` 파일을 참고하세요.
