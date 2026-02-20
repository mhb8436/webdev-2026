-- ============================================
-- Day 23 연습 문제 정답 - 데이터 모델링, ERD
-- ============================================
-- 실행 방법:
--   sqlite3 practice.db "PRAGMA foreign_keys = ON;" ".read solution.sql"
-- ============================================

PRAGMA foreign_keys = ON;

-- ============================================
-- 문제 1: 온라인 서점 설계
-- ============================================

-- 기존 테이블 삭제 (의존 관계 역순으로)
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS bookstore_books;
DROP TABLE IF EXISTS bookstore_users;

-- 1-1. users 테이블 생성
CREATE TABLE bookstore_users (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT NOT NULL,
    email      TEXT NOT NULL UNIQUE,
    created_at TEXT DEFAULT (datetime('now'))
);

-- 1-2. books 테이블 생성
CREATE TABLE bookstore_books (
    id     INTEGER PRIMARY KEY AUTOINCREMENT,
    title  TEXT NOT NULL,
    author TEXT NOT NULL,
    price  INTEGER NOT NULL,
    stock  INTEGER NOT NULL DEFAULT 0
);

-- 1-3. orders 테이블 생성
CREATE TABLE orders (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id      INTEGER NOT NULL,
    order_date   TEXT DEFAULT (date('now')),
    total_amount INTEGER NOT NULL DEFAULT 0,
    status       TEXT DEFAULT '주문접수',
    FOREIGN KEY (user_id) REFERENCES bookstore_users(id)
);

-- 1-4. order_items 테이블 생성 (N:M 연결 테이블)
CREATE TABLE order_items (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id   INTEGER NOT NULL,
    book_id    INTEGER NOT NULL,
    quantity   INTEGER NOT NULL DEFAULT 1,
    unit_price INTEGER NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (book_id) REFERENCES bookstore_books(id)
);

-- 1-5. 사용자 3명 INSERT
INSERT INTO bookstore_users (name, email) VALUES ('김민수', 'minsu@example.com');
INSERT INTO bookstore_users (name, email) VALUES ('이서연', 'seoyeon@example.com');
INSERT INTO bookstore_users (name, email) VALUES ('박지훈', 'jihoon@example.com');

-- 1-6. 도서 5권 INSERT
INSERT INTO bookstore_books (title, author, price, stock) VALUES ('클린 코드', '로버트 마틴', 33000, 50);
INSERT INTO bookstore_books (title, author, price, stock) VALUES ('자바스크립트 완벽 가이드', '데이비드 플래너건', 45000, 30);
INSERT INTO bookstore_books (title, author, price, stock) VALUES ('리팩터링', '마틴 파울러', 35000, 40);
INSERT INTO bookstore_books (title, author, price, stock) VALUES ('해리 포터', 'J.K. 롤링', 15000, 100);
INSERT INTO bookstore_books (title, author, price, stock) VALUES ('사피엔스', '유발 하라리', 22000, 60);

-- 1-7. 주문 3건 INSERT
INSERT INTO orders (user_id, order_date, total_amount, status) VALUES (1, '2025-02-10', 78000, '배송완료');
INSERT INTO orders (user_id, order_date, total_amount, status) VALUES (2, '2025-02-15', 60000, '배송중');
INSERT INTO orders (user_id, order_date, total_amount, status) VALUES (1, '2025-02-18', 57000, '주문접수');

-- 1-8. 주문항목 7건 INSERT
-- 주문1 (김민수): 클린 코드 1권 + 자바스크립트 완벽 가이드 1권
INSERT INTO order_items (order_id, book_id, quantity, unit_price) VALUES (1, 1, 1, 33000);
INSERT INTO order_items (order_id, book_id, quantity, unit_price) VALUES (1, 2, 1, 45000);
-- 주문2 (이서연): 해리 포터 2권 + 사피엔스 1권 + 리팩터링 1권
INSERT INTO order_items (order_id, book_id, quantity, unit_price) VALUES (2, 4, 2, 15000);
INSERT INTO order_items (order_id, book_id, quantity, unit_price) VALUES (2, 5, 1, 22000);
INSERT INTO order_items (order_id, book_id, quantity, unit_price) VALUES (2, 3, 1, 35000);
-- 주문3 (김민수): 사피엔스 1권 + 리팩터링 1권
INSERT INTO order_items (order_id, book_id, quantity, unit_price) VALUES (3, 5, 1, 22000);
INSERT INTO order_items (order_id, book_id, quantity, unit_price) VALUES (3, 3, 1, 35000);

-- 1-9. 특정 사용자(김민수)의 주문 내역 조회
SELECT '=== 김민수의 주문 내역 ===' AS info;
SELECT
    u.name        AS 사용자명,
    o.order_date  AS 주문일,
    b.title       AS 도서명,
    oi.quantity   AS 수량,
    oi.unit_price * oi.quantity AS 금액
FROM order_items oi
JOIN orders o ON oi.order_id = o.id
JOIN bookstore_users u ON o.user_id = u.id
JOIN bookstore_books b ON oi.book_id = b.id
WHERE u.name = '김민수'
ORDER BY o.order_date, b.title;

-- 1-10. 도서별 총 판매량 조회
SELECT '=== 도서별 총 판매량 ===' AS info;
SELECT
    b.title          AS 도서명,
    COALESCE(SUM(oi.quantity), 0) AS 판매수량합계
FROM bookstore_books b
LEFT JOIN order_items oi ON b.id = oi.book_id
GROUP BY b.id, b.title
ORDER BY 판매수량합계 DESC;


-- ============================================
-- 문제 2: 학교 관리 시스템
-- ============================================

-- 기존 테이블 삭제
DROP TABLE IF EXISTS enrollments;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS school_students;
DROP TABLE IF EXISTS professors;

-- 2-1. professors 테이블 생성
CREATE TABLE professors (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT NOT NULL,
    department TEXT NOT NULL,
    email      TEXT
);

-- 2-2. students 테이블 생성
CREATE TABLE school_students (
    id    INTEGER PRIMARY KEY AUTOINCREMENT,
    name  TEXT NOT NULL,
    grade INTEGER NOT NULL,
    email TEXT
);

-- 2-3. courses 테이블 생성
CREATE TABLE courses (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    course_name  TEXT NOT NULL,
    professor_id INTEGER NOT NULL,
    credits      INTEGER NOT NULL DEFAULT 3,
    FOREIGN KEY (professor_id) REFERENCES professors(id)
);

-- 2-4. enrollments 테이블 생성 (N:M 연결 테이블)
CREATE TABLE enrollments (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id    INTEGER NOT NULL,
    course_id     INTEGER NOT NULL,
    grade_score   TEXT,
    enrolled_date TEXT DEFAULT (date('now')),
    FOREIGN KEY (student_id) REFERENCES school_students(id),
    FOREIGN KEY (course_id) REFERENCES courses(id),
    UNIQUE(student_id, course_id)
);

-- 2-5. 교수 3명 INSERT
INSERT INTO professors (name, department, email) VALUES ('김교수', '컴퓨터공학과', 'kimprof@university.ac.kr');
INSERT INTO professors (name, department, email) VALUES ('이교수', '수학과', 'leeprof@university.ac.kr');
INSERT INTO professors (name, department, email) VALUES ('박교수', '경영학과', 'parkprof@university.ac.kr');

-- 2-6. 학생 5명 INSERT
INSERT INTO school_students (name, grade, email) VALUES ('강민준', 1, 'minjun@student.ac.kr');
INSERT INTO school_students (name, grade, email) VALUES ('김서윤', 2, 'seoyun@student.ac.kr');
INSERT INTO school_students (name, grade, email) VALUES ('이도윤', 1, 'doyun@student.ac.kr');
INSERT INTO school_students (name, grade, email) VALUES ('박하은', 3, 'haeun@student.ac.kr');
INSERT INTO school_students (name, grade, email) VALUES ('정예준', 2, 'yejun@student.ac.kr');

-- 2-7. 수업 4개 INSERT
INSERT INTO courses (course_name, professor_id, credits) VALUES ('자료구조', 1, 3);
INSERT INTO courses (course_name, professor_id, credits) VALUES ('알고리즘', 1, 3);
INSERT INTO courses (course_name, professor_id, credits) VALUES ('선형대수학', 2, 3);
INSERT INTO courses (course_name, professor_id, credits) VALUES ('경영학원론', 3, 3);

-- 2-8. 수강신청 10건 INSERT
INSERT INTO enrollments (student_id, course_id, grade_score, enrolled_date) VALUES (1, 1, 'A+', '2025-03-02');
INSERT INTO enrollments (student_id, course_id, grade_score, enrolled_date) VALUES (1, 3, 'B+', '2025-03-02');
INSERT INTO enrollments (student_id, course_id, grade_score, enrolled_date) VALUES (2, 1, 'A', '2025-03-02');
INSERT INTO enrollments (student_id, course_id, grade_score, enrolled_date) VALUES (2, 2, 'B', '2025-03-02');
INSERT INTO enrollments (student_id, course_id, grade_score, enrolled_date) VALUES (2, 4, 'A+', '2025-03-02');
INSERT INTO enrollments (student_id, course_id, grade_score, enrolled_date) VALUES (3, 1, 'B+', '2025-03-02');
INSERT INTO enrollments (student_id, course_id, grade_score, enrolled_date) VALUES (3, 3, NULL, '2025-03-02');  -- 성적 미부여
INSERT INTO enrollments (student_id, course_id, grade_score, enrolled_date) VALUES (4, 2, 'A', '2025-03-02');
INSERT INTO enrollments (student_id, course_id, grade_score, enrolled_date) VALUES (4, 4, 'B+', '2025-03-02');
INSERT INTO enrollments (student_id, course_id, grade_score, enrolled_date) VALUES (5, 1, 'A', '2025-03-02');

-- 2-9. 학생별 수강 목록
SELECT '=== 학생별 수강 목록 ===' AS info;
SELECT
    s.name          AS 학생명,
    c.course_name   AS 수업명,
    p.name          AS 교수명,
    c.credits       AS 학점,
    COALESCE(e.grade_score, '미부여') AS 성적
FROM enrollments e
JOIN school_students s ON e.student_id = s.id
JOIN courses c ON e.course_id = c.id
JOIN professors p ON c.professor_id = p.id
ORDER BY s.name, c.course_name;

-- 2-10. 수업별 수강 학생 수
SELECT '=== 수업별 수강 학생 수 ===' AS info;
SELECT
    c.course_name  AS 수업명,
    p.name         AS 교수명,
    COUNT(e.id)    AS 수강학생수
FROM courses c
JOIN professors p ON c.professor_id = p.id
LEFT JOIN enrollments e ON c.id = e.course_id
GROUP BY c.id, c.course_name, p.name
ORDER BY 수강학생수 DESC;

-- 2-11. 교수별 담당 수업 목록과 수강 학생 수
SELECT '=== 교수별 담당 수업 및 수강 학생 수 ===' AS info;
SELECT
    p.name         AS 교수명,
    p.department   AS 학과,
    c.course_name  AS 수업명,
    COUNT(e.id)    AS 수강학생수
FROM professors p
JOIN courses c ON p.id = c.professor_id
LEFT JOIN enrollments e ON c.id = e.course_id
GROUP BY p.id, p.name, c.id, c.course_name
ORDER BY p.name, c.course_name;


-- ============================================
-- 문제 3: 소셜 미디어 설계
-- ============================================

-- 기존 테이블 삭제
DROP TABLE IF EXISTS follows;
DROP TABLE IF EXISTS likes;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS social_users;

-- 3-1. users 테이블 생성
CREATE TABLE social_users (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    username   TEXT NOT NULL UNIQUE,
    email      TEXT NOT NULL UNIQUE,
    bio        TEXT,
    created_at TEXT DEFAULT (datetime('now'))
);

-- 3-2. posts 테이블 생성
CREATE TABLE posts (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id    INTEGER NOT NULL,
    content    TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES social_users(id)
);

-- 3-3. comments 테이블 생성
CREATE TABLE comments (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id    INTEGER NOT NULL,
    user_id    INTEGER NOT NULL,
    content    TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (user_id) REFERENCES social_users(id)
);

-- 3-4. likes 테이블 생성
CREATE TABLE likes (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id    INTEGER NOT NULL,
    post_id    INTEGER NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES social_users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id),
    UNIQUE(user_id, post_id)
);

-- 3-5. follows 테이블 생성 (자기참조)
CREATE TABLE follows (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    follower_id  INTEGER NOT NULL,
    following_id INTEGER NOT NULL,
    created_at   TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (follower_id) REFERENCES social_users(id),
    FOREIGN KEY (following_id) REFERENCES social_users(id),
    UNIQUE(follower_id, following_id)
);

-- 3-6. 사용자 4명 INSERT
INSERT INTO social_users (username, email, bio) VALUES ('dev_kim', 'devkim@example.com', '풀스택 개발자입니다');
INSERT INTO social_users (username, email, bio) VALUES ('design_lee', 'designlee@example.com', 'UI/UX 디자이너');
INSERT INTO social_users (username, email, bio) VALUES ('data_park', 'datapark@example.com', '데이터 분석가');
INSERT INTO social_users (username, email, bio) VALUES ('pm_choi', 'pmchoi@example.com', '프로덕트 매니저');

-- 3-7. 글 5개 INSERT
INSERT INTO posts (user_id, content, created_at) VALUES (1, 'SQL 공부 시작! 데이터베이스 재밌네요.', '2025-02-10 09:00:00');
INSERT INTO posts (user_id, content, created_at) VALUES (2, '새로운 디자인 시스템을 구축 중입니다.', '2025-02-11 14:30:00');
INSERT INTO posts (user_id, content, created_at) VALUES (1, 'JOIN 문법 정리했습니다. 블로그에 올릴 예정!', '2025-02-12 10:00:00');
INSERT INTO posts (user_id, content, created_at) VALUES (3, '파이썬으로 데이터 시각화 프로젝트 완료!', '2025-02-13 16:00:00');
INSERT INTO posts (user_id, content, created_at) VALUES (4, '이번 스프린트 회고 공유합니다.', '2025-02-14 11:00:00');

-- 3-8. 댓글 6개 INSERT
INSERT INTO comments (post_id, user_id, content, created_at) VALUES (1, 2, '화이팅! 저도 SQL 배우고 싶어요.', '2025-02-10 10:00:00');
INSERT INTO comments (post_id, user_id, content, created_at) VALUES (1, 3, '좋은 시작이네요!', '2025-02-10 11:00:00');
INSERT INTO comments (post_id, user_id, content, created_at) VALUES (2, 1, '디자인 시스템 멋지네요!', '2025-02-11 15:00:00');
INSERT INTO comments (post_id, user_id, content, created_at) VALUES (3, 4, '블로그 링크 공유해주세요!', '2025-02-12 12:00:00');
INSERT INTO comments (post_id, user_id, content, created_at) VALUES (4, 1, '시각화 결과 보고 싶어요.', '2025-02-13 17:00:00');
INSERT INTO comments (post_id, user_id, content, created_at) VALUES (5, 2, '회고 내용 잘 봤습니다.', '2025-02-14 12:00:00');

-- 3-9. 좋아요 8개 INSERT
INSERT INTO likes (user_id, post_id) VALUES (2, 1);
INSERT INTO likes (user_id, post_id) VALUES (3, 1);
INSERT INTO likes (user_id, post_id) VALUES (4, 1);
INSERT INTO likes (user_id, post_id) VALUES (1, 2);
INSERT INTO likes (user_id, post_id) VALUES (3, 2);
INSERT INTO likes (user_id, post_id) VALUES (1, 4);
INSERT INTO likes (user_id, post_id) VALUES (2, 4);
INSERT INTO likes (user_id, post_id) VALUES (4, 3);

-- 3-10. 팔로우 관계 5개 INSERT
-- dev_kim <-> design_lee (서로 팔로우)
INSERT INTO follows (follower_id, following_id) VALUES (1, 2);
INSERT INTO follows (follower_id, following_id) VALUES (2, 1);
-- data_park -> dev_kim (단방향)
INSERT INTO follows (follower_id, following_id) VALUES (3, 1);
-- pm_choi -> dev_kim, design_lee (단방향)
INSERT INTO follows (follower_id, following_id) VALUES (4, 1);
INSERT INTO follows (follower_id, following_id) VALUES (4, 2);

-- 3-11. 각 글의 작성자, 내용, 댓글 수, 좋아요 수
SELECT '=== 글 목록 (작성자, 댓글수, 좋아요수) ===' AS info;
SELECT
    u.username   AS 작성자,
    p.content    AS 내용,
    p.created_at AS 작성일,
    (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) AS 댓글수,
    (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.id)    AS 좋아요수
FROM posts p
JOIN social_users u ON p.user_id = u.id
ORDER BY p.created_at DESC;

-- 3-12. 특정 사용자(dev_kim)의 팔로워 목록 (나를 팔로우하는 사람들)
SELECT '=== dev_kim의 팔로워 목록 ===' AS info;
SELECT
    u.username AS 팔로워
FROM follows f
JOIN social_users u ON f.follower_id = u.id
WHERE f.following_id = (SELECT id FROM social_users WHERE username = 'dev_kim');

-- 3-13. 특정 사용자(dev_kim)의 팔로잉 목록 (내가 팔로우하는 사람들)
SELECT '=== dev_kim의 팔로잉 목록 ===' AS info;
SELECT
    u.username AS 팔로잉
FROM follows f
JOIN social_users u ON f.following_id = u.id
WHERE f.follower_id = (SELECT id FROM social_users WHERE username = 'dev_kim');

-- 3-14. 사용자별 글 수, 받은 좋아요 수 합계
SELECT '=== 사용자별 글 수, 받은 좋아요 수 ===' AS info;
SELECT
    u.username AS 사용자,
    (SELECT COUNT(*) FROM posts p WHERE p.user_id = u.id) AS 글수,
    (SELECT COUNT(*) FROM likes l
     JOIN posts p ON l.post_id = p.id
     WHERE p.user_id = u.id) AS 받은좋아요수,
    (SELECT COUNT(*) FROM follows f WHERE f.following_id = u.id) AS 팔로워수,
    (SELECT COUNT(*) FROM follows f WHERE f.follower_id = u.id) AS 팔로잉수
FROM social_users u
ORDER BY 받은좋아요수 DESC;
