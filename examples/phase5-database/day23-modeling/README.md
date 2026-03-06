# Day 23 - 데이터 모델링: 관계와 JOIN

> **Phase 5: Database** | 학습일: 23일차

---

## 학습 목표

- ERD(Entity-Relationship Diagram)를 작성한다
- 1:N(일대다), N:M(다대다) 관계를 설계한다
- Foreign Key(외래 키)를 설정한다
- JOIN으로 여러 테이블을 결합하여 조회한다
- 마이그레이션으로 스키마 변경을 관리한다

---

## 핵심 개념

### 1. ERD

```
┌─────────────┐       ┌─────────────────────────┐
│   users     │       │        todos            │
├─────────────┤       ├─────────────────────────┤
│ * id   (PK) │───┐   │ * id          (PK)      │
│   username  │   ├──>│   user_id     (FK→users) │
│   email     │   │   │   category_id (FK)       │
└─────────────┘   │   └─────────────────────────┘
┌─────────────┐   │
│ categories  │───┘
├─────────────┤
│ * id   (PK) │
│   name      │
│   user_id   │
└─────────────┘

관계:
  users 1 ── N todos       (한 사용자 → 여러 할일)
  categories 1 ── N todos  (한 카테고리 → 여러 할일)
```

### 2. Foreign Key (외래 키)

```sql
CREATE TABLE todos (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id     INTEGER NOT NULL,
    category_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);
```

### 3. JOIN

```sql
-- INNER JOIN: 양쪽 모두 존재하는 행만
SELECT u.username, t.title
FROM todos t
JOIN users u ON t.user_id = u.id;

-- LEFT JOIN: 왼쪽 전체 + 매칭되는 오른쪽
SELECT c.name, COUNT(t.id) AS todo_count
FROM categories c
LEFT JOIN todos t ON c.id = t.category_id
GROUP BY c.id;
```

| JOIN | 설명 |
|------|------|
| INNER JOIN | 양쪽 모두 존재하는 행만 |
| LEFT JOIN | 왼쪽 전체 + 매칭되는 오른쪽 |

### 4. N:M 관계 (다대다)

```sql
-- 중간 테이블로 해결
CREATE TABLE todo_tags (
    todo_id INTEGER REFERENCES todos(id),
    tag_id  INTEGER REFERENCES tags(id),
    PRIMARY KEY (todo_id, tag_id)
);
```

### 5. 마이그레이션

```javascript
// 마이그레이션: 스키마 변경을 버전으로 관리
const migrations = [
  { version: 1, up: 'CREATE TABLE users (...)', down: 'DROP TABLE users' },
  { version: 2, up: 'ALTER TABLE todos ADD COLUMN priority TEXT', down: '...' },
];
```

---

## 실습 파일

### starter/ (직접 구현)

| 파일 | 내용 |
|------|------|
| `requirements.md` | 요구사항 정의 |
| `01_schema.sql` | 스키마 설계 (users, categories, todos) |
| `02_sample_data.sql` | 샘플 데이터 삽입 |
| `03_queries.sql` | JOIN 쿼리 |
| `04_relations.js` | Node.js에서 1:N, N:M 관계 처리 |
| `05_migrations.js` | 마이그레이션 시스템 구현 |

### solution/ (완성 코드)

| 파일 | 내용 |
|------|------|
| `01_schema.sql` | 완성된 스키마 |
| `02_sample_data.sql` | 완성된 샘플 데이터 |
| `03_queries.sql` | 완성된 JOIN 쿼리 |
| `04_relations.js` | 관계 CRUD, 중첩 쿼리 |
| `05_migrations.js` | 마이그레이션 up/down/status |

---

## 실행 방법

```bash
# SQL 실행
sqlite3 todo_app.db < solution/01_schema.sql
sqlite3 todo_app.db < solution/02_sample_data.sql
sqlite3 todo_app.db < solution/03_queries.sql

# Node.js 실행
npm install
node solution/04_relations.js
node solution/05_migrations.js
```

---

## 정리

| 개념 | 핵심 |
|------|------|
| ERD | 테이블 간 관계를 시각적으로 표현 |
| 1:N 관계 | Foreign Key로 연결 (users → todos) |
| N:M 관계 | 중간 테이블 사용 (todo_tags) |
| INNER JOIN | 양쪽 모두 존재하는 데이터만 결합 |
| LEFT JOIN | 왼쪽 전체 + 오른쪽 매칭 데이터 |
| 마이그레이션 | 스키마 변경을 버전으로 관리 (up/down) |

> **다음 시간**: Day 24 - Node.js 첫 서버 (Phase 6 시작)
