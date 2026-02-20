-- ============================================
-- Day 23 연습 문제 - 데이터 모델링, ERD
-- ============================================
-- practice.db 파일에서 실행하세요:
--   sqlite3 practice.db "PRAGMA foreign_keys = ON;" ".read practice.sql"
-- ============================================

PRAGMA foreign_keys = ON;

-- ============================================
-- 문제 1: 온라인 서점 설계
-- ============================================

-- 1-1. users 테이블 생성
-- 컬럼: id(PK), name, email(UNIQUE), created_at


-- 1-2. books 테이블 생성
-- 컬럼: id(PK), title, author, price, stock


-- 1-3. orders 테이블 생성
-- 컬럼: id(PK), user_id(FK->users), order_date, total_amount, status


-- 1-4. order_items 테이블 생성 (N:M 연결 테이블)
-- 컬럼: id(PK), order_id(FK->orders), book_id(FK->books), quantity, unit_price


-- 1-5. 사용자 3명 INSERT


-- 1-6. 도서 5권 INSERT


-- 1-7. 주문 3건 INSERT


-- 1-8. 주문항목 6건 이상 INSERT


-- 1-9. 특정 사용자의 주문 내역 조회 (JOIN)
-- (사용자명, 주문일, 도서명, 수량, 금액)


-- 1-10. 도서별 총 판매량 조회 (JOIN + GROUP BY)
-- (도서명, 판매수량합계)


-- ============================================
-- 문제 2: 학교 관리 시스템
-- ============================================

-- 2-1. professors 테이블 생성
-- 컬럼: id(PK), name, department, email


-- 2-2. students 테이블 생성
-- 컬럼: id(PK), name, grade(학년), email


-- 2-3. courses 테이블 생성
-- 컬럼: id(PK), course_name, professor_id(FK->professors), credits


-- 2-4. enrollments 테이블 생성 (N:M 연결 테이블)
-- 컬럼: id(PK), student_id(FK->students), course_id(FK->courses), grade_score, enrolled_date
-- UNIQUE(student_id, course_id) 제약조건 추가


-- 2-5. 교수 3명 INSERT


-- 2-6. 학생 5명 INSERT


-- 2-7. 수업 4개 INSERT


-- 2-8. 수강신청 8건 이상 INSERT


-- 2-9. 학생별 수강 목록 (학생명, 수업명, 교수명, 학점)


-- 2-10. 수업별 수강 학생 수


-- 2-11. 교수별 담당 수업 목록과 수강 학생 수


-- ============================================
-- 문제 3: 소셜 미디어 설계
-- ============================================

-- 3-1. users 테이블 생성 (문제 1,2와 별도)
-- 컬럼: id(PK), username(UNIQUE), email(UNIQUE), bio, created_at
-- 힌트: 테이블 이름을 social_users 등으로 변경하거나,
--       문제별로 별도 DB를 사용하세요


-- 3-2. posts 테이블 생성
-- 컬럼: id(PK), user_id(FK->users), content, created_at


-- 3-3. comments 테이블 생성
-- 컬럼: id(PK), post_id(FK->posts), user_id(FK->users), content, created_at


-- 3-4. likes 테이블 생성
-- 컬럼: id(PK), user_id(FK->users), post_id(FK->posts), created_at
-- UNIQUE(user_id, post_id)


-- 3-5. follows 테이블 생성 (자기참조)
-- 컬럼: id(PK), follower_id(FK->users), following_id(FK->users), created_at
-- UNIQUE(follower_id, following_id)


-- 3-6. 사용자 4명 INSERT


-- 3-7. 글 5개 INSERT


-- 3-8. 댓글 6개 INSERT


-- 3-9. 좋아요 8개 INSERT


-- 3-10. 팔로우 관계 5개 INSERT


-- 3-11. 각 글의 작성자, 내용, 댓글 수, 좋아요 수


-- 3-12. 특정 사용자의 팔로워 목록


-- 3-13. 특정 사용자의 팔로잉 목록


-- 3-14. 사용자별 글 수, 받은 좋아요 수 합계
