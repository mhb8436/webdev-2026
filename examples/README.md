# 할일 관리 앱으로 배우는 웹 개발 PBL 튜토리얼

하나의 **할일 관리(Todo) 앱**이 콘솔 → HTML → React → Next.js → Full-stack으로 진화하는 Problem-Based Learning 튜토리얼입니다.

## 학습 구조

매일 이전 코드 위에 기능을 추가하며 배웁니다:
- `starter/` : 학습자가 시작할 코드 (빈칸/TODO 주석)
- `solution/` : 완성 코드 (참고용)

## 전체 일정

| Phase | 주제 | 기간 | Day |
|-------|------|------|-----|
| **Phase 1** | JavaScript 기초 | Week 1 (3/23~3/27) | Day 01~05 |
| **Phase 2** | TypeScript | Week 2 (3/30~4/1) | Day 06~08 |
| **Phase 3** | React | Week 4~5 (4/14~4/22) | Day 09~15 |
| **Phase 4** | Next.js | Week 5~6 (4/23~4/29) | Day 16~20 |
| **Phase 5** | Database / SQL | Week 8 (5/13~5/15) | Day 21~23 |
| **Phase 6** | Express 백엔드 | Week 9~10 (5/18~6/1) | Day 24~32 |

## Phase 1: JavaScript (콘솔 기반 할일 관리)

| Day | 주제 | 날짜 |
|-----|------|------|
| [Day 01](./phase1-javascript/day01-hello-todo/) | 첫 번째 할일 만들기 - 변수, 배열, console.log | 3/23 |
| [Day 02](./phase1-javascript/day02-functions/) | 할일 추가/삭제 - 함수, 조건문, 반복문 | 3/24 |
| [Day 03](./phase1-javascript/day03-objects/) | 할일에 정보 추가 - 객체, 배열 메서드 | 3/25 |
| [Day 04](./phase1-javascript/day04-advanced/) | 코드 정리 - 구조분해, spread, 모듈 | 3/26 |
| [Day 05](./phase1-javascript/day05-dom/) | 브라우저 할일 앱 - DOM, 이벤트 | 3/27 |

## Phase 2: TypeScript (타입 안전한 할일 관리)

| Day | 주제 | 날짜 |
|-----|------|------|
| [Day 06](./phase2-typescript/day06-types/) | JS에 타입 입히기 - 기본 타입 | 3/30 |
| [Day 07](./phase2-typescript/day07-interfaces/) | Todo 설계도 - 인터페이스, 클래스 | 3/31 |
| [Day 08](./phase2-typescript/day08-generics/) | 재사용 코드 - 제네릭, 유틸리티 타입 | 4/1 |

## Phase 3: React (컴포넌트 기반 할일 앱)

| Day | 주제 | 날짜 |
|-----|------|------|
| [Day 09](./phase3-react/day09-setup/) | React 프로젝트 시작 - Vite, JSX | 4/14 |
| [Day 10](./phase3-react/day10-components/) | 컴포넌트 쪼개기 - Props | 4/15 |
| [Day 11](./phase3-react/day11-state/) | 할일 추가/삭제 - useState | 4/16 |
| [Day 12](./phase3-react/day12-rendering/) | 완료 체크와 필터 - 조건부 렌더링 | 4/17 |
| [Day 13](./phase3-react/day13-hooks/) | 데이터 저장 - useEffect, localStorage | 4/20 |
| [Day 14](./phase3-react/day14-router/) | 페이지 분리 - React Router | 4/21 |
| [Day 15](./phase3-react/day15-global-state/) | 전역 상태 - Context API | 4/22 |

## Phase 4: Next.js (서버 렌더링 할일 앱)

| Day | 주제 | 날짜 |
|-----|------|------|
| [Day 16](./phase4-nextjs/day16-intro/) | Next.js 시작 - App Router | 4/23 |
| [Day 17](./phase4-nextjs/day17-routing/) | 라우팅과 레이아웃 | 4/24 |
| [Day 18](./phase4-nextjs/day18-rendering/) | 서버/클라이언트 컴포넌트 | 4/27 |
| [Day 19](./phase4-nextjs/day19-features/) | 메타데이터, 로딩, 에러 처리 | 4/28 |
| [Day 20](./phase4-nextjs/day20-api-routes/) | API Route로 REST API | 4/29 |

## Phase 5: Database (SQL로 할일 저장)

| Day | 주제 | 날짜 |
|-----|------|------|
| [Day 21](./phase5-database/day21-sql-basics/) | SQL 기본 - DDL, DML | 5/13 |
| [Day 22](./phase5-database/day22-sql-advanced/) | SQL 심화 - 통계, 서브쿼리 | 5/14 |
| [Day 23](./phase5-database/day23-modeling/) | 데이터 모델링 - ERD | 5/15 |

## Phase 6: Express (백엔드 API 서버)

| Day | 주제 | 날짜 |
|-----|------|------|
| [Day 24](./phase6-express/day24-nodejs-intro/) | Node.js 첫 서버 | 5/18 |
| [Day 25](./phase6-express/day25-modules/) | 파일로 할일 저장 - fs, path | 5/19 |
| [Day 26](./phase6-express/day26-npm/) | npm 패키지 활용 | 5/20 |
| [Day 27](./phase6-express/day27-express-server/) | Express 할일 API | 5/21 |
| [Day 28](./phase6-express/day28-db-connect/) | 데이터베이스 연동 | 5/22 |
| [Day 29](./phase6-express/day29-orm/) | ORM (Prisma) | 5/26 |
| [Day 30](./phase6-express/day30-auth/) | JWT 인증 | 5/27 |
| [Day 31](./phase6-express/day31-api-docs/) | API 문서 (Swagger) | 5/28 |
| [Day 32](./phase6-express/day32-api-complete/) | 프론트엔드 연동 완성 | 5/29~6/1 |

## 시작하기

```bash
# Day 01부터 시작
cd examples/phase1-javascript/day01-hello-todo/starter
node index.js
```

각 Day의 `README.md`에서 오늘의 학습목표와 문제를 확인하세요.
