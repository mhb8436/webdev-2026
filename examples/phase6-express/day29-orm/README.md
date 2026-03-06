# Day 29 - ORM: Prisma와 Sequelize

> **Phase 6: Express** | 학습일: 29일차

---

## 학습 목표

- ORM(Object-Relational Mapping) 개념을 이해한다
- Prisma 스키마를 정의하고 마이그레이션한다
- Prisma Client CRUD 메서드를 사용한다
- Sequelize ORM을 설정하고 비교한다
- 시드 데이터를 생성한다

---

## 핵심 개념

### 1. ORM이란?

```
SQL 방식:  SELECT * FROM todos WHERE done = 1
ORM 방식:  prisma.todo.findMany({ where: { done: true } })
```

### 2. Prisma 스키마 (schema.prisma)

```prisma
model Todo {
  id        Int      @id @default(autoincrement())
  title     String
  done      Boolean  @default(false)
  priority  String   @default("medium")
  category  String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### 3. Prisma Client CRUD

```javascript
// 조회 (필터 + 정렬 + 페이지네이션)
const todos = await prisma.todo.findMany({
  where: { done: false },
  orderBy: { createdAt: 'desc' },
  skip: 0,
  take: 10,
});

// 생성
const todo = await prisma.todo.create({
  data: { title: '새 할일', priority: 'high' },
});

// 수정
await prisma.todo.update({
  where: { id: 1 },
  data: { done: true },
});

// 삭제 (에러 코드 P2025: 레코드 없음)
await prisma.todo.delete({ where: { id: 1 } });

// 관계 포함 조회
const todosWithUser = await prisma.todo.findMany({
  include: { user: true },
});
```

### 4. SQL vs Prisma 비교

| 작업 | SQL | Prisma |
|------|-----|--------|
| 전체 조회 | `SELECT * FROM todos` | `prisma.todo.findMany()` |
| 조건 조회 | `WHERE done = 1` | `{ where: { done: true } }` |
| 생성 | `INSERT INTO ...` | `prisma.todo.create({ data })` |
| 수정 | `UPDATE ... SET ...` | `prisma.todo.update({ where, data })` |

### 5. Sequelize 설정

```javascript
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({ dialect: 'sqlite', storage: './todos.db' });

const Todo = sequelize.define('Todo', {
  title: { type: DataTypes.STRING, allowNull: false },
  done: { type: DataTypes.BOOLEAN, defaultValue: false },
});

await sequelize.sync();
const todos = await Todo.findAll();
```

### 6. 시드 데이터

```javascript
// createMany로 대량 생성
await prisma.todo.createMany({
  data: [
    { title: '할일 1', priority: 'high' },
    { title: '할일 2', priority: 'low' },
  ],
});

// upsert로 있으면 업데이트, 없으면 생성
await prisma.user.upsert({
  where: { email: 'admin@test.com' },
  update: {},
  create: { email: 'admin@test.com', username: 'admin' },
});
```

---

## 실습 파일

### starter/ (직접 구현)

| 파일 | 내용 |
|------|------|
| `prisma/schema.prisma` | Prisma 스키마 정의 |
| `src/index.js` | 서버 진입점 |
| `src/routes/todos.js` | Prisma CRUD 라우터 |
| `02_sequelize_setup.js` | Sequelize 모델 정의 + CRUD |
| `03_prisma_seed.js` | 시드 데이터 생성 |
| `04_prisma_routes.js` | Prisma 라우트 (페이지네이션, include) |

### solution/ (완성 코드)

동일 구조의 완성된 코드

---

## 실행 방법

```bash
npm install
npm run db:migrate   # Prisma 마이그레이션
npm run dev

# Prisma Studio (GUI)
npm run db:studio
```

---

## 정리

| 개념 | 핵심 |
|------|------|
| ORM | 테이블을 객체로 매핑 (SQL 대신 메서드 호출) |
| Prisma | 스키마 기반, 타입 안전, 마이그레이션 지원 |
| Sequelize | 모델 정의 기반, JavaScript/TypeScript 지원 |
| findMany | 여러 행 조회 (where, orderBy, skip, take) |
| create / update / delete | CRUD 메서드 |
| seed | 초기 데이터 생성 (createMany, upsert) |

> **다음 시간**: Day 30 - 인증 (JWT + bcrypt)
