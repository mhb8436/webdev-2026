# Day 21 - SQL 기본

## 학습 목표

- CREATE TABLE 문으로 테이블을 생성할 수 있다
- INSERT 문으로 데이터를 삽입할 수 있다
- SELECT 문으로 데이터를 조회할 수 있다
- UPDATE 문으로 데이터를 수정할 수 있다
- DELETE 문으로 데이터를 삭제할 수 있다
- WHERE 절을 사용하여 조건부 조회를 할 수 있다
- 기본 자료형(INTEGER, TEXT, BOOLEAN 등)을 이해한다

## 문제

> "할일 테이블을 만들고 데이터를 넣고 꺼내보자"

할일 관리 앱의 기초가 되는 데이터베이스 테이블을 설계하고,
SQL의 기본 명령어(DDL, DML)를 사용하여 데이터를 생성, 조회, 수정, 삭제해봅니다.

## 핵심 개념

### DDL (Data Definition Language) - 데이터 정의어

| 명령어 | 설명 | 예시 |
|--------|------|------|
| CREATE TABLE | 테이블 생성 | `CREATE TABLE todos (...)` |
| DROP TABLE | 테이블 삭제 | `DROP TABLE todos` |
| ALTER TABLE | 테이블 수정 | `ALTER TABLE todos ADD COLUMN ...` |

### DML (Data Manipulation Language) - 데이터 조작어

| 명령어 | 설명 | 예시 |
|--------|------|------|
| INSERT | 데이터 삽입 | `INSERT INTO todos VALUES (...)` |
| SELECT | 데이터 조회 | `SELECT * FROM todos` |
| UPDATE | 데이터 수정 | `UPDATE todos SET done = 1 WHERE id = 1` |
| DELETE | 데이터 삭제 | `DELETE FROM todos WHERE id = 1` |

### SQLite 기본 자료형

| 자료형 | 설명 | 예시 |
|--------|------|------|
| INTEGER | 정수 | `id INTEGER PRIMARY KEY` |
| TEXT | 문자열 | `title TEXT NOT NULL` |
| REAL | 실수 | `price REAL` |
| BLOB | 바이너리 | `image BLOB` |
| NULL | NULL 값 | - |

> SQLite는 BOOLEAN 타입이 없으므로 INTEGER(0 또는 1)로 대체합니다.

## 프로젝트 구조

```
day21-sql-basics/
├── README.md
├── starter/
│   ├── 01_ddl.sql          # 테이블 생성 (직접 작성)
│   └── 02_dml.sql          # 데이터 조작 (직접 작성)
└── solution/
    ├── 01_ddl.sql          # 테이블 생성 (정답)
    └── 02_dml.sql          # 데이터 조작 (정답)
```

## 실행 방법

### SQLite 사용 (권장)

```bash
# 1. DDL 실행 - 테이블 생성
sqlite3 todo.db < solution/01_ddl.sql

# 2. DML 실행 - 데이터 조작
sqlite3 todo.db < solution/02_dml.sql

# 3. 대화형 모드로 직접 확인
sqlite3 todo.db
sqlite> .tables
sqlite> SELECT * FROM todos;
sqlite> .quit
```

### MySQL 사용

```bash
# 1. 데이터베이스 생성
mysql -u root -p -e "CREATE DATABASE todo_app;"

# 2. SQL 파일 실행
mysql -u root -p todo_app < solution/01_ddl.sql
mysql -u root -p todo_app < solution/02_dml.sql
```

## 학습 단계

### 1단계: 테이블 생성 (DDL)

`starter/01_ddl.sql` 파일을 열고 todos 테이블을 생성하세요.

필요한 컬럼:
- `id` - 정수, 기본키, 자동증가
- `title` - 문자열(255), NULL 불가
- `done` - 불리언(SQLite: INTEGER), 기본값 0(미완료)
- `priority` - 문자열(10), 기본값 'medium'
- `category` - 문자열(50)
- `created_at` - 날짜시간, 기본값 현재시간

### 2단계: 데이터 조작 (DML)

`starter/02_dml.sql` 파일을 열고 다음을 수행하세요:
1. 5개의 할일 데이터를 INSERT
2. 전체 할일 조회 (SELECT)
3. 조건부 조회 (WHERE)
4. 할일 완료 처리 (UPDATE)
5. 할일 삭제 (DELETE)
6. 집계 함수 사용 (COUNT)

## 참고 자료

- [SQLite 공식 문서](https://www.sqlite.org/docs.html)
- [SQL 자습서 - W3Schools](https://www.w3schools.com/sql/)
- [SQLite 자료형](https://www.sqlite.org/datatype3.html)
