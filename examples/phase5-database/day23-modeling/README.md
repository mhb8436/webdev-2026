# Day 23 - 데이터 모델링

## 학습 목표

- ERD(Entity-Relationship Diagram)를 이해하고 작성할 수 있다
- 1:N(일대다) 관계를 설계할 수 있다
- Foreign Key(외래 키)를 설정할 수 있다
- 정규화의 기본 개념을 이해한다
- 다중 테이블을 JOIN으로 결합하여 조회할 수 있다

## 문제

> "사용자, 할일, 카테고리를 연결하는 DB를 설계하자"

단일 테이블에서 벗어나, 여러 사용자가 각자의 할일과 카테고리를 관리할 수 있는
관계형 데이터베이스를 설계합니다.

## ERD (Entity-Relationship Diagram)

```
┌─────────────────┐       ┌─────────────────────────────┐
│     users       │       │          todos              │
├─────────────────┤       ├─────────────────────────────┤
│ * id       (PK) │───┐   │ * id            (PK)        │
│   username      │   │   │   title                     │
│   email         │   │   │   description               │
│   created_at    │   │   │   done                      │
└─────────────────┘   │   │   priority                  │
                      ├──>│   user_id        (FK→users) │
┌─────────────────┐   │   │   category_id (FK→categories)│
│  categories     │   │   │   created_at                │
├─────────────────┤   │   │   updated_at                │
│ * id       (PK) │───┘   └─────────────────────────────┘
│   name          │   │
│   user_id  (FK) │───┘
│   created_at    │
└─────────────────┘

관계:
  users    1 ──── N  todos        (한 사용자는 여러 할일을 가짐)
  users    1 ──── N  categories   (한 사용자는 여러 카테고리를 가짐)
  categories 1 ── N  todos        (한 카테고리에 여러 할일이 속함)
```

## 핵심 개념

### 정규화란?

데이터 중복을 줄이고 무결성을 높이기 위해 테이블을 분리하는 과정입니다.

| 단계 | 설명 | 예시 |
|------|------|------|
| 비정규형 | 모든 데이터가 한 테이블 | 할일에 사용자 이름, 카테고리 이름 직접 저장 |
| 제1정규형(1NF) | 반복 그룹 제거 | 각 컬럼에 하나의 값만 저장 |
| 제2정규형(2NF) | 부분 종속 제거 | 기본키 전체에 종속되도록 분리 |
| 제3정규형(3NF) | 이행 종속 제거 | 비키 컬럼 간의 종속 제거 |

### Foreign Key (외래 키)

다른 테이블의 기본키를 참조하는 컬럼입니다.

```sql
-- todos 테이블의 user_id는 users 테이블의 id를 참조
CREATE TABLE todos (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id     INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### JOIN 종류

| JOIN | 설명 | 용도 |
|------|------|------|
| INNER JOIN | 양쪽 모두 존재하는 행만 | 사용자와 할일 연결 |
| LEFT JOIN | 왼쪽 테이블 전체 + 매칭되는 오른쪽 | 할일 없는 카테고리도 조회 |
| RIGHT JOIN | 오른쪽 테이블 전체 + 매칭되는 왼쪽 | (SQLite 미지원) |
| CROSS JOIN | 모든 조합 | 잘 사용하지 않음 |

## 프로젝트 구조

```
day23-modeling/
├── README.md
├── starter/
│   ├── requirements.md     # 요구사항 정의
│   ├── 01_schema.sql       # 스키마 설계 (직접 작성)
│   ├── 02_sample_data.sql  # 샘플 데이터 (직접 작성)
│   └── 03_queries.sql      # 다중 테이블 쿼리 (직접 작성)
└── solution/
    ├── 01_schema.sql       # 스키마 설계 (정답)
    ├── 02_sample_data.sql  # 샘플 데이터 (정답)
    └── 03_queries.sql      # 다중 테이블 쿼리 (정답)
```

## 실행 방법

```bash
# 1. 스키마 생성
sqlite3 todo_app.db < solution/01_schema.sql

# 2. 샘플 데이터 삽입
sqlite3 todo_app.db < solution/02_sample_data.sql

# 3. 다중 테이블 쿼리 실행
sqlite3 todo_app.db < solution/03_queries.sql

# 4. 대화형 모드에서 확인
sqlite3 todo_app.db
sqlite> .mode column
sqlite> .headers on
sqlite> .tables
sqlite> SELECT u.username, t.title
   ...> FROM todos t JOIN users u ON t.user_id = u.id;
sqlite> .quit
```

> SQLite에서 외래 키를 활성화하려면 `PRAGMA foreign_keys = ON;`을 실행해야 합니다.

## 학습 단계

### 1단계: 요구사항 분석

`starter/requirements.md`를 읽고 필요한 테이블, 컬럼, 관계를 정리합니다.

### 2단계: 스키마 설계 (DDL)

`starter/01_schema.sql`에 3개 테이블(users, categories, todos)을 생성하세요.
외래 키 관계를 올바르게 설정하는 것이 핵심입니다.

### 3단계: 샘플 데이터 입력

`starter/02_sample_data.sql`에 충분한 테스트 데이터를 삽입하세요.
- 사용자 2명
- 카테고리 각 3개 (총 6개)
- 할일 각 5개 (총 10개)

### 4단계: 다중 테이블 쿼리

`starter/03_queries.sql`에서 JOIN을 활용한 쿼리를 작성합니다.
여러 테이블에 걸쳐 있는 데이터를 연결하여 조회하는 연습을 합니다.

## 참고 자료

- [SQLite 외래 키](https://www.sqlite.org/foreignkeys.html)
- [SQL JOIN - W3Schools](https://www.w3schools.com/sql/sql_join.asp)
- [데이터베이스 정규화 - 위키백과](https://ko.wikipedia.org/wiki/%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4_%EC%A0%95%EA%B7%9C%ED%99%94)
