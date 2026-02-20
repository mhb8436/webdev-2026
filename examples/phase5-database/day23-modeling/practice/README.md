# Day 23 연습 문제 - 데이터 모델링, ERD

> 메인 실습(할일 앱 모델링)과는 다른 시나리오로 데이터 모델링과 ERD 설계를 연습합니다.
> `practice.sql` 파일에 SQL을 작성하고, SQLite로 실행하세요.

```bash
# 실행 방법 (외래 키 활성화 필수!)
sqlite3 practice.db "PRAGMA foreign_keys = ON;" ".read practice.sql"

# 또는 대화형 모드
sqlite3 practice.db
sqlite> PRAGMA foreign_keys = ON;
sqlite> .read practice.sql
```

> **중요**: SQLite에서 외래 키 제약조건을 사용하려면 반드시 `PRAGMA foreign_keys = ON;`을 먼저 실행해야 합니다.

---

## 문제 1: 온라인 서점 설계

온라인 서점의 데이터베이스를 설계하세요. 사용자가 도서를 주문하는 시스템입니다.

**ERD:**
```
┌─────────────────┐         ┌─────────────────┐
│     users       │         │     books       │
├─────────────────┤         ├─────────────────┤
│ * id       (PK) │───┐     │ * id       (PK) │───┐
│   name          │   │     │   title         │   │
│   email         │   │     │   author        │   │
│   created_at    │   │     │   price         │   │
└─────────────────┘   │     │   stock         │   │
                      │     └─────────────────┘   │
                      │                           │
                      ▼                           │
┌──────────────────────────┐                      │
│        orders            │                      │
├──────────────────────────┤                      │
│ * id              (PK)   │                      │
│   user_id         (FK)───┘                      │
│   order_date             │                      │
│   total_amount           │                      │
│   status                 │                      │
└──────────┬───────────────┘                      │
           │                                      │
           ▼                                      │
┌──────────────────────────┐                      │
│     order_items          │                      │
├──────────────────────────┤                      │
│ * id              (PK)   │                      │
│   order_id        (FK)───┘                      │
│   book_id         (FK)──────────────────────────┘
│   quantity               │
│   unit_price             │
└──────────────────────────┘

관계:
  users   1 ──── N  orders       (한 사용자는 여러 주문을 할 수 있음)
  orders  1 ──── N  order_items  (한 주문에 여러 도서가 포함될 수 있음)
  books   1 ──── N  order_items  (한 도서가 여러 주문에 포함될 수 있음)
  → orders와 books는 order_items를 통해 N:M 관계
```

**요구사항:**

1. 위 ERD대로 4개 테이블을 CREATE TABLE하세요.
   - `users`: id(PK), name, email(UNIQUE), created_at
   - `books`: id(PK), title, author, price, stock(재고수량)
   - `orders`: id(PK), user_id(FK->users), order_date, total_amount, status
   - `order_items`: id(PK), order_id(FK->orders), book_id(FK->books), quantity, unit_price
2. 샘플 데이터를 INSERT하세요:
   - 사용자 3명, 도서 5권, 주문 3건, 주문항목 6건 이상
3. JOIN을 사용하여 다음을 조회하세요:
   - 특정 사용자의 주문 내역 (사용자명, 주문일, 도서명, 수량, 금액)
   - 도서별 총 판매량 (도서명, 판매수량합계)

**힌트:**
- 테이블 생성 순서가 중요합니다! FK가 참조하는 테이블을 먼저 만들어야 합니다.
  - `users` -> `books` -> `orders` -> `order_items` 순서로 생성하세요.
- `order_items`는 N:M 관계를 구현하는 중간(연결) 테이블입니다.
- `unit_price`를 `order_items`에 저장하는 이유: 주문 시점의 가격을 보존하기 위해서입니다.
  (도서 가격이 나중에 바뀌어도 주문 당시 가격을 알 수 있어야 합니다.)

---

## 문제 2: 학교 관리 시스템

학교의 학생, 수업, 교수 정보를 관리하는 데이터베이스를 설계하세요.

**ERD:**
```
┌─────────────────┐         ┌─────────────────┐
│   professors    │         │    students     │
├─────────────────┤         ├─────────────────┤
│ * id       (PK) │───┐     │ * id       (PK) │───┐
│   name          │   │     │   name          │   │
│   department    │   │     │   grade         │   │
│   email         │   │     │   email         │   │
└─────────────────┘   │     └─────────────────┘   │
                      │                           │
                      │  1:N                      │
                      ▼                           │
            ┌─────────────────┐                   │
            │    courses      │                   │
            ├─────────────────┤                   │
            │ * id       (PK) │───┐               │
            │   course_name   │   │               │
            │   professor_id  │   │               │
            │   (FK)──────────┘   │               │
            │   credits       │   │               │
            └─────────────────┘   │               │
                                  │               │
                                  ▼               │
                   ┌──────────────────────┐       │
                   │    enrollments       │       │
                   ├──────────────────────┤       │
                   │ * id           (PK)  │       │
                   │   student_id   (FK)──────────┘
                   │   course_id    (FK)──┘
                   │   grade_score        │
                   │   enrolled_date      │
                   └──────────────────────┘

관계:
  professors 1 ──── N  courses      (한 교수는 여러 수업을 가르침)
  students   N ──── M  courses      (enrollments 중간 테이블로 연결)
  → 한 학생은 여러 수업을 들을 수 있고, 한 수업에 여러 학생이 있음
```

**요구사항:**

1. 4개 테이블을 CREATE TABLE하세요.
   - `professors`: id(PK), name, department, email
   - `students`: id(PK), name, grade(학년), email
   - `courses`: id(PK), course_name, professor_id(FK->professors), credits(학점수)
   - `enrollments`: id(PK), student_id(FK->students), course_id(FK->courses), grade_score(성적), enrolled_date
2. 샘플 데이터를 INSERT하세요:
   - 교수 3명, 학생 5명, 수업 4개, 수강신청 8건 이상
3. JOIN을 사용하여 다음을 조회하세요:
   - 학생별 수강 목록 (학생명, 수업명, 교수명, 학점)
   - 수업별 수강 학생 수
   - 교수별 담당 수업 목록과 수강 학생 수

**힌트:**
- `enrollments` 테이블이 students와 courses 사이의 N:M 관계를 구현합니다.
- 3개 테이블 JOIN: `enrollments JOIN students JOIN courses` 형태로 연결합니다.
- `grade_score`에는 'A+', 'A', 'B+' 등 성적을 넣거나, 아직 미부여인 경우 NULL을 넣으세요.
- `UNIQUE(student_id, course_id)` 제약조건으로 같은 학생이 같은 수업을 중복 수강하는 것을 방지할 수 있습니다.

---

## 문제 3: 소셜 미디어 설계

간단한 소셜 미디어 플랫폼의 데이터베이스를 설계하세요.

**ERD:**
```
┌─────────────────┐
│     users       │
├─────────────────┤
│ * id       (PK) │──┬──────────────────────────────┐
│   username      │  │                              │
│   email         │  │                              │
│   bio           │  │                              │
│   created_at    │  │                              │
└────────┬────────┘  │                              │
         │           │                              │
    ┌────┘    ┌──────┘                              │
    │         │                                     │
    │ 1:N     │ 자기참조(팔로우)                      │
    ▼         ▼                                     │
┌──────────────────────┐  ┌──────────────────────┐  │
│      posts           │  │     follows          │  │
├──────────────────────┤  ├──────────────────────┤  │
│ * id           (PK)  │  │ * id           (PK)  │  │
│   user_id      (FK)──┘  │   follower_id  (FK)──┘  │
│   content            │  │   following_id (FK)─────┘
│   created_at         │  │   created_at         │
└──────────┬───────────┘  └──────────────────────┘
           │
     ┌─────┴──────┐
     │ 1:N        │ 1:N(또는 N:M)
     ▼            ▼
┌────────────┐ ┌──────────────────────┐
│  comments  │ │      likes           │
├────────────┤ ├──────────────────────┤
│ * id  (PK) │ │ * id           (PK)  │
│   post_id  │ │   user_id      (FK)──→ users
│   (FK)─────┘ │   post_id      (FK)──→ posts
│   user_id    │ │   created_at         │
│   (FK)───→   │ └──────────────────────┘
│   users      │
│   content    │
│   created_at │
└──────────────┘

관계:
  users  1 ──── N  posts     (한 사용자는 여러 글을 작성)
  posts  1 ──── N  comments  (한 글에 여러 댓글)
  users  N ──── M  posts     (likes 테이블을 통한 좋아요 관계)
  users  N ──── M  users     (follows 테이블을 통한 자기참조 팔로우)
```

**요구사항:**

1. 5개 테이블을 CREATE TABLE하세요.
   - `users`: id(PK), username(UNIQUE), email(UNIQUE), bio(자기소개), created_at
   - `posts`: id(PK), user_id(FK->users), content, created_at
   - `comments`: id(PK), post_id(FK->posts), user_id(FK->users), content, created_at
   - `likes`: id(PK), user_id(FK->users), post_id(FK->posts), created_at
     - `UNIQUE(user_id, post_id)` : 한 사용자가 같은 글에 좋아요를 한 번만 누를 수 있도록
   - `follows`: id(PK), follower_id(FK->users), following_id(FK->users), created_at
     - `UNIQUE(follower_id, following_id)` : 중복 팔로우 방지
     - follower_id는 팔로우하는 사람, following_id는 팔로우 당하는 사람
2. 샘플 데이터를 INSERT하세요:
   - 사용자 4명, 글 5개, 댓글 6개, 좋아요 8개, 팔로우 관계 5개
3. JOIN을 사용하여 다음을 조회하세요:
   - 각 글의 작성자, 내용, 댓글 수, 좋아요 수
   - 특정 사용자의 팔로워 목록 (나를 팔로우하는 사람들)
   - 특정 사용자의 팔로잉 목록 (내가 팔로우하는 사람들)
   - 사용자별 글 수, 받은 좋아요 수 합계

**힌트:**
- **자기참조(Self-referencing)**: `follows` 테이블은 같은 `users` 테이블을 두 번 참조합니다.
  - `follower_id`와 `following_id` 모두 `users.id`를 FK로 가집니다.
- 팔로워 조회 시 JOIN을 두 번 사용해야 합니다:
  ```sql
  SELECT u.username FROM follows f JOIN users u ON f.follower_id = u.id
  WHERE f.following_id = ?
  ```
- 좋아요 수를 세려면 `LEFT JOIN` + `COUNT`를 사용하세요.
- `UNIQUE` 제약조건으로 중복 데이터를 방지합니다.
- 댓글 수와 좋아요 수를 한 쿼리에서 구할 때 서브쿼리를 사용하면 편리합니다.

---

## 실행 및 확인 방법

```bash
# practice.sql 파일 실행 (외래 키 활성화!)
sqlite3 practice.db "PRAGMA foreign_keys = ON;" ".read practice.sql"

# 대화형 모드로 결과 확인
sqlite3 practice.db
sqlite> PRAGMA foreign_keys = ON;
sqlite> .mode column
sqlite> .headers on
sqlite> .tables
sqlite> SELECT * FROM users;
sqlite> .quit
```

> **팁**: `.schema 테이블명`을 사용하면 테이블의 CREATE TABLE 문을 확인할 수 있습니다.
> 정답은 `solution.sql` 파일을 참고하세요.
