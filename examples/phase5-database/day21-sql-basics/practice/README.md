# Day 21 연습 문제 - SQL 기본: DDL, DML

> 메인 실습(할일 앱)과는 다른 시나리오로 같은 SQL 개념을 연습합니다.
> `practice.sql` 파일에 SQL을 작성하고, SQLite로 실행하세요.

```bash
# 실행 방법
sqlite3 practice.db < practice.sql

# 또는 대화형 모드에서 직접 입력
sqlite3 practice.db
```

---

## 문제 1: 학생 관리 테이블

학교 학생 정보를 관리하는 `students` 테이블을 만들고 데이터를 조작하세요.

**테이블 구조:**

| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | INTEGER | PRIMARY KEY AUTOINCREMENT | 학생 고유 번호 |
| name | TEXT | NOT NULL | 학생 이름 |
| age | INTEGER | NOT NULL | 나이 |
| major | TEXT | | 전공 |
| gpa | REAL | | 학점 (0.0 ~ 4.5) |
| enrolled_date | TEXT | DEFAULT (date('now')) | 입학일 |

**요구사항:**

1. 위 구조대로 `students` 테이블을 생성하세요 (CREATE TABLE).
2. 아래 5명의 학생 데이터를 INSERT하세요:
   - 김민수, 21세, 컴퓨터공학, 3.8, 2023-03-02
   - 이서연, 22세, 경영학, 4.2, 2022-03-02
   - 박지훈, 20세, 수학과, 3.5, 2024-03-02
   - 최유나, 23세, 컴퓨터공학, 3.9, 2021-03-02
   - 정대현, 21세, 경영학, 2.8, 2023-03-02
3. 다양한 SELECT 쿼리를 작성하세요:
   - 전체 학생 조회
   - 컴퓨터공학 전공 학생만 조회
   - 학점(gpa)이 3.5 이상인 학생을 학점 내림차순으로 조회
   - 나이가 21세 이상 22세 이하인 학생 조회

**힌트:**
- `CREATE TABLE IF NOT EXISTS`를 사용하면 테이블이 이미 있을 때 에러를 방지할 수 있습니다.
- `ORDER BY gpa DESC`로 내림차순 정렬합니다.
- `BETWEEN`을 사용하면 범위 조건을 간결하게 작성할 수 있습니다.

---

## 문제 2: 도서관 테이블

도서관의 도서 정보를 관리하는 `books` 테이블을 만들고 UPDATE, DELETE를 연습하세요.

**테이블 구조:**

| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | INTEGER | PRIMARY KEY AUTOINCREMENT | 도서 고유 번호 |
| title | TEXT | NOT NULL | 도서 제목 |
| author | TEXT | NOT NULL | 저자 |
| price | INTEGER | NOT NULL | 가격 (원) |
| category | TEXT | | 분류 (소설, IT, 자기계발 등) |
| published_year | INTEGER | | 출판 연도 |
| in_stock | INTEGER | DEFAULT 1 | 재고 여부 (1: 있음, 0: 없음) |

**요구사항:**

1. `books` 테이블을 생성하세요.
2. 최소 6권의 도서를 INSERT하세요. (카테고리를 다양하게 넣으세요)
3. UPDATE 연습:
   - 특정 도서의 가격을 10% 인상하세요.
   - 2020년 이전에 출판된 도서의 재고 상태를 0(품절)으로 변경하세요.
4. DELETE 연습:
   - 재고가 없는(in_stock = 0) 도서 중 2015년 이전 출판 도서를 삭제하세요.
5. 변경 후 전체 목록을 조회하여 결과를 확인하세요.

**힌트:**
- `UPDATE books SET price = price * 1.1 WHERE id = 3;` 처럼 계산식을 사용할 수 있습니다.
- DELETE 전에 SELECT로 먼저 대상을 확인하는 습관을 들이세요.
- SQLite에서 BOOLEAN은 INTEGER(0 또는 1)로 표현합니다.

---

## 문제 3: 영화 데이터베이스

영화 정보를 관리하는 `movies` 테이블을 만들고 다양한 WHERE 조건을 연습하세요.

**테이블 구조:**

| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | INTEGER | PRIMARY KEY AUTOINCREMENT | 영화 고유 번호 |
| title | TEXT | NOT NULL | 영화 제목 |
| director | TEXT | | 감독 |
| genre | TEXT | | 장르 |
| rating | REAL | | 평점 (0.0 ~ 10.0) |
| release_year | INTEGER | | 개봉 연도 |
| country | TEXT | | 국가 |

**요구사항:**

1. `movies` 테이블을 생성하세요.
2. 10개 이상의 영화를 INSERT하세요. (한국영화, 외국영화 섞어서, 장르도 다양하게)
3. 다양한 WHERE 조건으로 검색하세요:
   - **AND**: 장르가 '액션'이고 평점이 8.0 이상인 영화
   - **OR**: 국가가 '한국' 또는 '미국'인 영화
   - **BETWEEN**: 2018년에서 2023년 사이에 개봉한 영화
   - **LIKE**: 제목에 '어'가 포함된 영화 (LIKE '%어%')
   - **IN**: 장르가 '액션', '코미디', 'SF' 중 하나인 영화
   - **NOT**: 장르가 '공포'가 아닌 영화
   - **복합 조건**: 한국 영화이면서 평점 7.5 이상이고 2020년 이후 개봉한 영화

**힌트:**
- `LIKE '%키워드%'`는 키워드가 포함된 문자열을 검색합니다.
- `IN ('값1', '값2', '값3')`은 여러 값 중 하나와 일치하는지 확인합니다.
- 조건을 괄호 `()`로 묶으면 우선순위를 명확하게 할 수 있습니다.

---

## 문제 4: 주문 테이블

온라인 쇼핑몰의 주문 정보를 관리하는 `orders` 테이블로 CRUD 전체를 연습하세요.

**테이블 구조:**

| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | INTEGER | PRIMARY KEY AUTOINCREMENT | 주문 고유 번호 |
| customer_name | TEXT | NOT NULL | 고객 이름 |
| product | TEXT | NOT NULL | 상품명 |
| quantity | INTEGER | NOT NULL DEFAULT 1 | 수량 |
| price | INTEGER | NOT NULL | 단가 (원) |
| order_date | TEXT | DEFAULT (date('now')) | 주문일 |
| status | TEXT | DEFAULT '주문접수' | 상태 (주문접수, 배송중, 배송완료, 취소) |

**요구사항:**

1. **Create**: `orders` 테이블을 생성하고 8개 이상의 주문 데이터를 INSERT하세요.
   - 다양한 고객, 상품, 상태값을 넣으세요.
2. **Read**: 다양한 조회 쿼리를 작성하세요.
   - 전체 주문 목록 (최신 주문순)
   - '배송중' 상태인 주문만 조회
   - 주문 금액(quantity * price)이 50,000원 이상인 주문
   - 특정 고객의 주문 이력
3. **Update**: 주문 상태를 변경하세요.
   - 특정 주문의 상태를 '배송중'으로 변경
   - '주문접수' 상태인 주문 중 3일 이상 된 주문을 '배송중'으로 일괄 변경
4. **Delete**: 주문을 삭제하세요.
   - '취소' 상태인 주문을 삭제

**힌트:**
- 계산된 값으로 조건 걸기: `WHERE quantity * price >= 50000`
- 날짜 비교: `WHERE order_date <= date('now', '-3 days')`
- SQLite의 `date()` 함수로 날짜 계산이 가능합니다.
- 상태값처럼 정해진 값만 들어가야 하는 경우 `CHECK` 제약조건을 사용할 수도 있습니다.

---

## 실행 및 확인 방법

```bash
# practice.sql 파일 실행
sqlite3 practice.db < practice.sql

# 대화형 모드로 결과 확인
sqlite3 practice.db
sqlite> .mode column
sqlite> .headers on
sqlite> SELECT * FROM students;
sqlite> SELECT * FROM books;
sqlite> SELECT * FROM movies;
sqlite> SELECT * FROM orders;
sqlite> .quit
```

> 정답은 `solution.sql` 파일을 참고하세요.
