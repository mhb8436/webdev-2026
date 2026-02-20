# Day 28 - 데이터베이스 연동 (5/22)

## 학습 목표

- SQLite 데이터베이스 이해 및 사용
- better-sqlite3 라이브러리로 DB 연결
- SQL 쿼리 실행 (SELECT, INSERT, UPDATE, DELETE)
- Prepared Statement를 사용한 안전한 쿼리
- Connection 관리 및 에러 처리

## 문제

> "파일 대신 진짜 DB에 할일을 저장하자"

Day 27에서는 메모리에 데이터를 저장했기 때문에 서버를 재시작하면 데이터가 사라졌습니다. 이번에는 SQLite 데이터베이스를 사용하여 데이터를 영구적으로 저장합니다.

## 핵심 개념

### SQLite란?

파일 기반의 경량 데이터베이스입니다. 별도의 서버 설치 없이 파일 하나로 데이터를 관리할 수 있어 학습과 프로토타이핑에 적합합니다.

### better-sqlite3

Node.js에서 SQLite를 사용하기 위한 라이브러리입니다. 동기(synchronous) 방식으로 동작하여 사용이 직관적입니다.

```javascript
const Database = require('better-sqlite3');
const db = new Database('todos.db');

// 테이블 생성
db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done INTEGER DEFAULT 0
  )
`);
```

### Prepared Statement

SQL 인젝션을 방지하고 성능을 높이는 안전한 쿼리 방식입니다.

```javascript
// 안전한 방식 (Prepared Statement)
const stmt = db.prepare('SELECT * FROM todos WHERE id = ?');
const todo = stmt.get(id);

// 위험한 방식 (SQL 인젝션 가능 - 사용 금지!)
// db.exec(`SELECT * FROM todos WHERE id = ${id}`);
```

### 주요 메서드

| 메서드 | 설명 | 반환값 |
|--------|------|--------|
| `stmt.all()` | 모든 행 조회 | 배열 |
| `stmt.get()` | 단일 행 조회 | 객체 또는 undefined |
| `stmt.run()` | 삽입/수정/삭제 실행 | { changes, lastInsertRowid } |
| `db.exec()` | SQL 직접 실행 | 없음 |

## 프로젝트 구조

```
day28-db-connect/
├── README.md
├── starter/
│   ├── package.json
│   ├── .env
│   └── src/
│       ├── index.js        # 서버 진입점
│       ├── database.js      # DB 연결 및 초기화
│       └── routes/
│           └── todos.js     # 할일 라우터 (DB 연동)
└── solution/
    ├── package.json
    ├── .env
    └── src/
        ├── index.js
        ├── database.js
        └── routes/
            └── todos.js
```

## 실행 방법

```bash
# starter 또는 solution 디렉토리에서
npm install
npm run dev
```

## 테스트 방법

```bash
# 할일 추가
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "DB에 저장하기"}'

# 서버 재시작 후에도 데이터가 유지되는지 확인
curl http://localhost:3000/api/todos
```

## 도전 과제

1. 검색 기능 추가 (LIKE 쿼리 활용)
2. 페이지네이션 구현 (LIMIT, OFFSET)
3. 할일 통계 API 추가 (총 개수, 완료 개수 등)
4. 트랜잭션을 사용한 일괄 처리 구현
