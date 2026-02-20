-- ============================================
-- Day 21 연습 문제 정답 - SQL 기본: DDL, DML
-- ============================================
-- 실행 방법:
--   sqlite3 practice.db < solution.sql
-- ============================================

-- ============================================
-- 문제 1: 학생 관리 테이블
-- ============================================

-- 1-1. students 테이블 생성
DROP TABLE IF EXISTS students;

CREATE TABLE students (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    name          TEXT NOT NULL,
    age           INTEGER NOT NULL,
    major         TEXT,
    gpa           REAL,
    enrolled_date TEXT DEFAULT (date('now'))
);

-- 1-2. 학생 5명 INSERT
INSERT INTO students (name, age, major, gpa, enrolled_date) VALUES ('김민수', 21, '컴퓨터공학', 3.8, '2023-03-02');
INSERT INTO students (name, age, major, gpa, enrolled_date) VALUES ('이서연', 22, '경영학', 4.2, '2022-03-02');
INSERT INTO students (name, age, major, gpa, enrolled_date) VALUES ('박지훈', 20, '수학과', 3.5, '2024-03-02');
INSERT INTO students (name, age, major, gpa, enrolled_date) VALUES ('최유나', 23, '컴퓨터공학', 3.9, '2021-03-02');
INSERT INTO students (name, age, major, gpa, enrolled_date) VALUES ('정대현', 21, '경영학', 2.8, '2023-03-02');

-- 1-3. 전체 학생 조회
SELECT * FROM students;

-- 1-4. 컴퓨터공학 전공 학생만 조회
SELECT * FROM students WHERE major = '컴퓨터공학';

-- 1-5. 학점 3.5 이상인 학생 (학점 내림차순)
SELECT * FROM students WHERE gpa >= 3.5 ORDER BY gpa DESC;

-- 1-6. 나이가 21세 이상 22세 이하인 학생
SELECT * FROM students WHERE age BETWEEN 21 AND 22;


-- ============================================
-- 문제 2: 도서관 테이블
-- ============================================

-- 2-1. books 테이블 생성
DROP TABLE IF EXISTS books;

CREATE TABLE books (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    title          TEXT NOT NULL,
    author         TEXT NOT NULL,
    price          INTEGER NOT NULL,
    category       TEXT,
    published_year INTEGER,
    in_stock       INTEGER DEFAULT 1
);

-- 2-2. 도서 6권 INSERT
INSERT INTO books (title, author, price, category, published_year, in_stock) VALUES ('클린 코드', '로버트 마틴', 33000, 'IT', 2013, 1);
INSERT INTO books (title, author, price, category, published_year, in_stock) VALUES ('해리 포터', 'J.K. 롤링', 15000, '소설', 2014, 1);
INSERT INTO books (title, author, price, category, published_year, in_stock) VALUES ('자바스크립트 완벽 가이드', '데이비드 플래너건', 45000, 'IT', 2022, 1);
INSERT INTO books (title, author, price, category, published_year, in_stock) VALUES ('미움받을 용기', '기시미 이치로', 16000, '자기계발', 2018, 1);
INSERT INTO books (title, author, price, category, published_year, in_stock) VALUES ('어린 왕자', '생텍쥐페리', 9000, '소설', 2010, 1);
INSERT INTO books (title, author, price, category, published_year, in_stock) VALUES ('사피엔스', '유발 하라리', 22000, '인문', 2015, 1);
INSERT INTO books (title, author, price, category, published_year, in_stock) VALUES ('나미야 잡화점의 기적', '히가시노 게이고', 13000, '소설', 2012, 1);

-- 변경 전 상태 확인
SELECT '=== 변경 전 도서 목록 ===' AS info;
SELECT * FROM books;

-- 2-3. 특정 도서(자바스크립트 완벽 가이드) 가격 10% 인상
UPDATE books SET price = price * 1.1 WHERE id = 3;

-- 2-4. 2020년 이전 출판 도서 재고 상태를 0으로 변경
UPDATE books SET in_stock = 0 WHERE published_year < 2020;

-- 변경 후 상태 확인
SELECT '=== UPDATE 후 도서 목록 ===' AS info;
SELECT * FROM books;

-- 2-5. 재고 없고 2015년 이전 출판 도서 삭제
DELETE FROM books WHERE in_stock = 0 AND published_year < 2015;

-- 2-6. 삭제 후 전체 목록 조회
SELECT '=== DELETE 후 도서 목록 ===' AS info;
SELECT * FROM books;


-- ============================================
-- 문제 3: 영화 데이터베이스
-- ============================================

-- 3-1. movies 테이블 생성
DROP TABLE IF EXISTS movies;

CREATE TABLE movies (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    title        TEXT NOT NULL,
    director     TEXT,
    genre        TEXT,
    rating       REAL,
    release_year INTEGER,
    country      TEXT
);

-- 3-2. 영화 12개 INSERT
INSERT INTO movies (title, director, genre, rating, release_year, country) VALUES ('기생충', '봉준호', '드라마', 8.6, 2019, '한국');
INSERT INTO movies (title, director, genre, rating, release_year, country) VALUES ('어벤져스: 엔드게임', '루소 형제', '액션', 8.4, 2019, '미국');
INSERT INTO movies (title, director, genre, rating, release_year, country) VALUES ('헤어질 결심', '박찬욱', '드라마', 7.6, 2022, '한국');
INSERT INTO movies (title, director, genre, rating, release_year, country) VALUES ('인터스텔라', '크리스토퍼 놀란', 'SF', 8.7, 2014, '미국');
INSERT INTO movies (title, director, genre, rating, release_year, country) VALUES ('극한직업', '이병헌', '코미디', 7.8, 2019, '한국');
INSERT INTO movies (title, director, genre, rating, release_year, country) VALUES ('범죄도시', '강윤성', '액션', 7.5, 2017, '한국');
INSERT INTO movies (title, director, genre, rating, release_year, country) VALUES ('곤지암', '정범식', '공포', 6.4, 2018, '한국');
INSERT INTO movies (title, director, genre, rating, release_year, country) VALUES ('듄', '드니 빌뇌브', 'SF', 8.0, 2021, '미국');
INSERT INTO movies (title, director, genre, rating, release_year, country) VALUES ('올드보이', '박찬욱', '스릴러', 8.4, 2003, '한국');
INSERT INTO movies (title, director, genre, rating, release_year, country) VALUES ('어바웃 타임', '리처드 커티스', '로맨스', 7.8, 2013, '영국');
INSERT INTO movies (title, director, genre, rating, release_year, country) VALUES ('범죄도시 4', '허명행', '액션', 7.0, 2024, '한국');
INSERT INTO movies (title, director, genre, rating, release_year, country) VALUES ('스파이더맨: 노 웨이 홈', '존 왓츠', '액션', 8.2, 2021, '미국');

-- 전체 영화 목록 확인
SELECT '=== 전체 영화 목록 ===' AS info;
SELECT * FROM movies;

-- 3-3. AND: 장르가 '액션'이고 평점 8.0 이상
SELECT '=== 액션 + 평점 8.0 이상 ===' AS info;
SELECT * FROM movies WHERE genre = '액션' AND rating >= 8.0;

-- 3-4. OR: 국가가 '한국' 또는 '미국'
SELECT '=== 한국 또는 미국 영화 ===' AS info;
SELECT * FROM movies WHERE country = '한국' OR country = '미국';

-- 3-5. BETWEEN: 2018~2023년 개봉 영화
SELECT '=== 2018~2023년 개봉 ===' AS info;
SELECT * FROM movies WHERE release_year BETWEEN 2018 AND 2023;

-- 3-6. LIKE: 제목에 '어'가 포함된 영화
SELECT '=== 제목에 "어" 포함 ===' AS info;
SELECT * FROM movies WHERE title LIKE '%어%';

-- 3-7. IN: 장르가 '액션', '코미디', 'SF' 중 하나
SELECT '=== 장르: 액션/코미디/SF ===' AS info;
SELECT * FROM movies WHERE genre IN ('액션', '코미디', 'SF');

-- 3-8. NOT: 장르가 '공포'가 아닌 영화
SELECT '=== 공포 제외 ===' AS info;
SELECT * FROM movies WHERE genre != '공포';

-- 3-9. 복합 조건: 한국 영화 + 평점 7.5 이상 + 2020년 이후
SELECT '=== 한국 + 평점 7.5↑ + 2020년 이후 ===' AS info;
SELECT * FROM movies
WHERE country = '한국'
  AND rating >= 7.5
  AND release_year >= 2020;


-- ============================================
-- 문제 4: 주문 테이블
-- ============================================

-- 4-1. orders 테이블 생성
DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    product       TEXT NOT NULL,
    quantity      INTEGER NOT NULL DEFAULT 1,
    price         INTEGER NOT NULL,
    order_date    TEXT DEFAULT (date('now')),
    status        TEXT DEFAULT '주문접수'
);

-- 4-2. 주문 8개 INSERT
INSERT INTO orders (customer_name, product, quantity, price, order_date, status) VALUES ('김영희', '노트북', 1, 1200000, '2025-02-10', '배송완료');
INSERT INTO orders (customer_name, product, quantity, price, order_date, status) VALUES ('이철수', '무선 마우스', 2, 25000, '2025-02-14', '배송중');
INSERT INTO orders (customer_name, product, quantity, price, order_date, status) VALUES ('박미영', '키보드', 1, 89000, '2025-02-15', '주문접수');
INSERT INTO orders (customer_name, product, quantity, price, order_date, status) VALUES ('김영희', '모니터', 1, 350000, '2025-02-16', '주문접수');
INSERT INTO orders (customer_name, product, quantity, price, order_date, status) VALUES ('정수민', '이어폰', 3, 15000, '2025-02-12', '배송완료');
INSERT INTO orders (customer_name, product, quantity, price, order_date, status) VALUES ('이철수', 'USB 허브', 1, 32000, '2025-02-17', '주문접수');
INSERT INTO orders (customer_name, product, quantity, price, order_date, status) VALUES ('한지우', '웹캠', 1, 45000, '2025-02-11', '취소');
INSERT INTO orders (customer_name, product, quantity, price, order_date, status) VALUES ('정수민', '노트북 거치대', 2, 28000, '2025-02-13', '배송중');

-- 4-3. 전체 주문 목록 (최신 주문순)
SELECT '=== 전체 주문 (최신순) ===' AS info;
SELECT *, (quantity * price) AS total_amount
FROM orders
ORDER BY order_date DESC;

-- 4-4. '배송중' 상태인 주문만 조회
SELECT '=== 배송중 주문 ===' AS info;
SELECT * FROM orders WHERE status = '배송중';

-- 4-5. 주문 금액이 50,000원 이상인 주문
SELECT '=== 주문 금액 50,000원 이상 ===' AS info;
SELECT *, (quantity * price) AS total_amount
FROM orders
WHERE (quantity * price) >= 50000;

-- 4-6. 특정 고객(김영희)의 주문 이력
SELECT '=== 김영희 고객 주문 이력 ===' AS info;
SELECT * FROM orders WHERE customer_name = '김영희';

-- 4-7. 주문 ID 3번의 상태를 '배송중'으로 변경
UPDATE orders SET status = '배송중' WHERE id = 3;

-- 4-8. 3일 이상 된 '주문접수' 상태 주문을 '배송중'으로 일괄 변경
UPDATE orders
SET status = '배송중'
WHERE status = '주문접수'
  AND order_date <= date('now', '-3 days');

-- 4-9. '취소' 상태인 주문 삭제
DELETE FROM orders WHERE status = '취소';

-- 4-10. 최종 주문 목록 확인
SELECT '=== 최종 주문 목록 ===' AS info;
SELECT *, (quantity * price) AS total_amount
FROM orders
ORDER BY order_date DESC;
