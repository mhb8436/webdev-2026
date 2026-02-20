# Day 22 - SQL 심화

## 학습 목표

- GROUP BY로 데이터를 그룹화할 수 있다
- HAVING 절로 그룹에 조건을 걸 수 있다
- 집계 함수(COUNT, SUM, AVG)를 활용할 수 있다
- JOIN으로 여러 테이블을 결합할 수 있다
- 서브쿼리를 작성할 수 있다
- VIEW를 생성하고 활용할 수 있다
- CASE 문으로 조건부 결과를 출력할 수 있다

## 문제

> "할일 통계를 SQL로 뽑아보자"

Day 21에서 만든 할일 테이블을 기반으로, 심화 SQL 문법을 사용하여
다양한 통계와 분석 쿼리를 작성합니다.

## 핵심 개념

### 집계 함수

| 함수 | 설명 | 예시 |
|------|------|------|
| COUNT(*) | 행의 개수 | `SELECT COUNT(*) FROM todos` |
| SUM(컬럼) | 합계 | `SELECT SUM(done) FROM todos` |
| AVG(컬럼) | 평균 | `SELECT AVG(done) FROM todos` |
| MAX(컬럼) | 최대값 | `SELECT MAX(created_at) FROM todos` |
| MIN(컬럼) | 최소값 | `SELECT MIN(created_at) FROM todos` |

### GROUP BY와 HAVING

```sql
-- GROUP BY: 그룹별 집계
SELECT category, COUNT(*) AS count
FROM todos
GROUP BY category;

-- HAVING: 그룹에 조건 적용 (WHERE는 개별 행에 조건)
SELECT category, COUNT(*) AS count
FROM todos
GROUP BY category
HAVING count >= 3;
```

### 서브쿼리

```sql
-- WHERE 절에서 서브쿼리 사용
SELECT * FROM todos
WHERE priority = (
    SELECT priority FROM todos
    GROUP BY priority
    ORDER BY COUNT(*) DESC
    LIMIT 1
);
```

### VIEW (뷰)

```sql
-- 자주 사용하는 쿼리를 뷰로 저장
CREATE VIEW todo_stats AS
SELECT category, COUNT(*) AS total
FROM todos
GROUP BY category;

-- 뷰를 테이블처럼 사용
SELECT * FROM todo_stats;
```

### CASE 문

```sql
-- 조건에 따라 다른 값을 출력
SELECT title,
    CASE priority
        WHEN 'high'   THEN '높음'
        WHEN 'medium' THEN '보통'
        WHEN 'low'    THEN '낮음'
    END AS priority_kr
FROM todos;
```

## 프로젝트 구조

```
day22-sql-advanced/
├── README.md
├── starter/
│   ├── 01_setup.sql        # 테이블 및 샘플 데이터 설정
│   └── 02_queries.sql      # 심화 쿼리 (직접 작성)
└── solution/
    ├── 01_setup.sql        # 테이블 및 샘플 데이터 설정 (정답)
    └── 02_queries.sql      # 심화 쿼리 (정답)
```

## 실행 방법

```bash
# 1. 새로운 데이터베이스 생성 및 초기 데이터 설정
sqlite3 todo_advanced.db < solution/01_setup.sql

# 2. 심화 쿼리 실행
sqlite3 todo_advanced.db < solution/02_queries.sql

# 3. 대화형 모드에서 직접 쿼리 실행
sqlite3 todo_advanced.db
sqlite> .mode column
sqlite> .headers on
sqlite> SELECT category, COUNT(*) FROM todos GROUP BY category;
sqlite> .quit
```

> `.mode column`과 `.headers on`을 사용하면 결과가 보기 좋게 출력됩니다.

## 학습 단계

### 1단계: 환경 설정

`starter/01_setup.sql`을 실행하여 테이블과 샘플 데이터를 준비합니다.
10개 이상의 다양한 할일 데이터가 삽입됩니다.

### 2단계: 심화 쿼리 작성

`starter/02_queries.sql`의 TODO를 순서대로 완성하세요:

1. **카테고리별 할일 수** - GROUP BY 사용
2. **우선순위별 완료율** - 집계 함수 조합
3. **HAVING 절** - 그룹 조건 필터링
4. **ORDER BY와 LIMIT** - 정렬과 제한
5. **서브쿼리** - 쿼리 안의 쿼리
6. **VIEW 생성** - 재사용 가능한 쿼리
7. **CASE 문** - 조건부 값 변환

## WHERE vs HAVING 비교

| 구분 | WHERE | HAVING |
|------|-------|--------|
| 적용 대상 | 개별 행 | 그룹 |
| 실행 순서 | GROUP BY 이전 | GROUP BY 이후 |
| 집계 함수 | 사용 불가 | 사용 가능 |

## 참고 자료

- [SQLite 집계 함수](https://www.sqlite.org/lang_aggfunc.html)
- [SQL GROUP BY - W3Schools](https://www.w3schools.com/sql/sql_groupby.asp)
- [SQL HAVING - W3Schools](https://www.w3schools.com/sql/sql_having.asp)
