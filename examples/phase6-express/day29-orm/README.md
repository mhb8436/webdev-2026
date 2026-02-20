# Day 29 - ORM으로 편하게 DB 다루기 (5/26)

## 학습 목표

- ORM(Object-Relational Mapping) 개념 이해
- Prisma ORM 설치 및 설정
- 스키마(schema) 정의와 마이그레이션
- Prisma Client CRUD 메서드 사용 (`findMany`, `create`, `update`, `delete`)
- async/await 패턴으로 비동기 DB 처리

## 문제

> "SQL 직접 작성 대신 ORM으로 DB를 다루자"

Day 28에서는 SQL을 직접 작성하여 데이터베이스를 다뤘습니다. ORM을 사용하면 JavaScript 객체와 메서드로 DB를 다룰 수 있어 생산성이 높아지고 실수가 줄어듭니다.

## 핵심 개념

### ORM이란?

Object-Relational Mapping의 약자로, 데이터베이스 테이블을 프로그래밍 언어의 객체로 매핑해주는 기술입니다.

```
SQL 방식:  SELECT * FROM todos WHERE done = 1
ORM 방식:  prisma.todo.findMany({ where: { done: true } })
```

### Prisma란?

Node.js와 TypeScript를 위한 차세대 ORM입니다. 스키마 정의, 마이그레이션, 타입 안전한 쿼리를 지원합니다.

### Prisma 워크플로우

```
1. schema.prisma에 모델 정의
2. npx prisma migrate dev 로 마이그레이션 실행
3. PrismaClient로 CRUD 수행
```

### 스키마 파일 (schema.prisma)

```prisma
model Todo {
  id        Int      @id @default(autoincrement())
  title     String
  done      Boolean  @default(false)
  priority  String   @default("medium")
  category  String?               // ?는 선택적 필드 (null 허용)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt    // 수정 시 자동 업데이트
}
```

### 주요 Prisma Client 메서드

| 메서드 | 설명 | 예시 |
|--------|------|------|
| `findMany()` | 여러 행 조회 | `prisma.todo.findMany()` |
| `findUnique()` | 단일 행 조회 | `prisma.todo.findUnique({ where: { id } })` |
| `create()` | 새 행 생성 | `prisma.todo.create({ data: { title } })` |
| `update()` | 행 수정 | `prisma.todo.update({ where: { id }, data: {...} })` |
| `delete()` | 행 삭제 | `prisma.todo.delete({ where: { id } })` |
| `count()` | 행 수 세기 | `prisma.todo.count({ where: { done: true } })` |

### SQL vs Prisma 비교

| 작업 | SQL (better-sqlite3) | Prisma |
|------|---------------------|--------|
| 전체 조회 | `db.prepare('SELECT * FROM todos').all()` | `prisma.todo.findMany()` |
| 조건 조회 | `db.prepare('SELECT * FROM todos WHERE done = ?').all(1)` | `prisma.todo.findMany({ where: { done: true } })` |
| 생성 | `db.prepare('INSERT INTO todos (title) VALUES (?)').run(title)` | `prisma.todo.create({ data: { title } })` |
| 수정 | `db.prepare('UPDATE todos SET done = ? WHERE id = ?').run(1, id)` | `prisma.todo.update({ where: { id }, data: { done: true } })` |
| 삭제 | `db.prepare('DELETE FROM todos WHERE id = ?').run(id)` | `prisma.todo.delete({ where: { id } })` |

## 프로젝트 구조

```
day29-orm/
├── README.md
├── starter/
│   ├── package.json
│   ├── .env
│   ├── prisma/
│   │   └── schema.prisma      # Prisma 스키마 파일
│   └── src/
│       ├── index.js            # 서버 진입점
│       └── routes/
│           └── todos.js        # 할일 라우터 (Prisma 사용)
└── solution/
    ├── package.json
    ├── .env
    ├── prisma/
    │   └── schema.prisma
    └── src/
        ├── index.js
        └── routes/
            └── todos.js
```

## 실행 방법

```bash
# starter 또는 solution 디렉토리에서
npm install

# Prisma 마이그레이션 실행 (DB 생성 및 테이블 생성)
npm run db:migrate

# 개발 서버 시작
npm run dev

# (선택) Prisma Studio로 DB를 GUI에서 확인
npm run db:studio
```

## 테스트 방법

```bash
# 할일 추가
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Prisma 배우기", "priority": "high", "category": "학습"}'

# 모든 할일 조회
curl http://localhost:3000/api/todos

# 완료된 할일만 조회
curl "http://localhost:3000/api/todos?done=true"

# 할일 수정
curl -X PUT http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"done": true}'

# 할일 삭제
curl -X DELETE http://localhost:3000/api/todos/1
```

## 도전 과제

1. 카테고리별 할일 필터링 추가
2. 정렬 기능 추가 (`orderBy` 활용)
3. 페이지네이션 구현 (`skip`, `take` 활용)
4. 여러 할일을 한번에 생성하는 API 추가 (`createMany` 활용)
