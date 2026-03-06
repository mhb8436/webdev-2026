# 여성발전센터 - 웹개발 실무 프로젝트 교육과정

**클라우드 기반 생성형 AI활용 웹개발 실무 프로젝트** 교육과정의 실습 교안입니다.

## 교육 개요

- **교육기간**: 2026년 3월 23일 ~ 8월 23일
- **교육장소**: 발전센터

## 프로젝트 소개

하나의 **할일 관리 앱(Todo App)**을 만들면서 웹 풀스택 개발을 배우는 PBL(Problem-Based Learning) 방식의 튜토리얼입니다.

콘솔 출력 → HTML/CSS → React → Next.js → Database → Express 순서로 동일한 앱이 점진적으로 진화합니다.

## 커리큘럼 (32일)

| Phase | 기간 | 주제 | Day |
|-------|------|------|-----|
| **Phase 1** | Week 1 | JavaScript 기초 | Day 01~05 |
| **Phase 2** | Week 2 | TypeScript | Day 06~08 |
| **Phase 3** | Week 4~5 | React | Day 09~15 |
| **Phase 4** | Week 5~6 | Next.js | Day 16~20 |
| **Phase 5** | Week 8 | Database & SQL | Day 21~23 |
| **Phase 6** | Week 9~10 | Node.js & Express | Day 24~32 |

## 폴더 구조

```
examples/
├── phase1-javascript/     ← JavaScript 기초 (5일)
├── phase2-typescript/     ← TypeScript (3일)
├── phase3-react/          ← React (7일)
├── phase4-nextjs/         ← Next.js (5일)
├── phase5-database/       ← SQL & DB 설계 (3일)
└── phase6-express/        ← Express API 서버 (9일)
```

각 Day 폴더:
```
dayXX-주제/
├── README.md       ← 학습목표, 문제 설명, 힌트
├── starter/        ← 학습자 시작 코드 (TODO 주석 포함)
├── solution/       ← 완성 코드
└── practice/       ← 추가 연습 문제 + 풀이
```

## 사용 방법

### 1. 저장소 클론
```bash
git clone https://github.com/mhb8436/nambu-webdev-2026.git
cd nambu-webdev-2026
```

### 2. 학습 순서
1. 해당 Day의 `README.md`를 읽고 학습 목표를 확인합니다
2. `starter/` 폴더의 코드를 열고 TODO 주석을 채워나갑니다
3. 막히면 README의 힌트를 참고합니다
4. 완성 후 `solution/`과 비교합니다
5. `practice/`의 추가 문제를 풀어봅니다

### 3. 실행 방법

**Phase 1 (JavaScript)**
```bash
node examples/phase1-javascript/day01-hello-todo/solution/index.js
```

**Phase 2 (TypeScript)**
```bash
cd examples/phase2-typescript/day06-types/solution
npx tsc && node index.js
```

**Phase 3 (React)**
```bash
cd examples/phase3-react/day09-setup/solution
npm install && npm run dev
```

**Phase 4 (Next.js)**
```bash
cd examples/phase4-nextjs/day16-intro/solution
npm install && npm run dev
```

**Phase 5 (SQL)**
```bash
sqlite3 :memory: < examples/phase5-database/day21-sql-basics/solution/01_ddl.sql
```

**Phase 6 (Express)**
```bash
cd examples/phase6-express/day27-express-server/solution
npm install && node src/index.js
```

## 기술 스택

| 영역 | 기술 |
|------|------|
| 프론트엔드 | HTML, CSS, JavaScript, TypeScript, React, Next.js |
| 백엔드 | Node.js, Express |
| 데이터베이스 | SQLite, Prisma ORM |
| 인증 | JWT, bcrypt |
| API 문서 | Swagger |
| 도구 | Git, npm, VS Code |
