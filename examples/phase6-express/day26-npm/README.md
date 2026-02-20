# Day 26 - npm 패키지 활용 (5/20)

## 학습 목표

- `npm init`으로 프로젝트를 초기화하고 `package.json`의 구조를 이해한다
- `npm install`로 외부 패키지를 설치하고 사용하는 방법을 익힌다
- `scripts` 필드를 활용한 명령어 등록 방법을 배운다
- `nodemon`, `dotenv`, `uuid` 패키지의 역할과 사용법을 학습한다

## 문제 상황

> "npm으로 유용한 패키지를 설치하고 활용하자"

Day 25까지는 Node.js 내장 모듈만 사용했습니다.
하지만 실제 개발에서는 **npm(Node Package Manager)**을 통해 다양한 외부 패키지를 활용합니다.
이번에는 세 가지 유용한 패키지를 설치하고 서버에 적용해보겠습니다.

## 핵심 개념

### 1. npm이란?

npm은 Node.js의 **패키지 관리자**입니다. 전 세계 개발자들이 만든 패키지를 설치하고 관리할 수 있습니다.

```bash
# 프로젝트 초기화 (package.json 생성)
npm init -y

# 패키지 설치
npm install dotenv uuid

# 개발용 패키지 설치
npm install --save-dev nodemon
```

### 2. package.json 구조

```json
{
  "name": "todo-server",         // 프로젝트 이름
  "version": "1.0.0",            // 버전
  "description": "할일 관리 API 서버",  // 설명
  "main": "server.js",           // 진입점 파일
  "scripts": {                   // 실행 명령어
    "start": "node server.js",   // npm start → node server.js
    "dev": "nodemon server.js"   // npm run dev → nodemon server.js
  },
  "dependencies": {              // 배포용 패키지
    "dotenv": "^16.4.0",
    "uuid": "^9.0.0"
  },
  "devDependencies": {           // 개발용 패키지
    "nodemon": "^3.1.0"
  }
}
```

### 3. dotenv - 환경 변수 관리

`.env` 파일에 설정값을 저장하고, 코드에서 `process.env`로 접근합니다.

```
# .env 파일
PORT=3000
DATA_DIR=./data
```

```javascript
require('dotenv').config();
const PORT = process.env.PORT || 3000;
```

### 4. uuid - 고유 ID 생성

순차적인 숫자 ID 대신, 충돌 가능성이 거의 없는 **UUID**를 사용합니다.

```javascript
const { v4: uuidv4 } = require('uuid');

const id = uuidv4();
// 예: "550e8400-e29b-41d4-a716-446655440000"
```

### 5. nodemon - 자동 재시작

파일이 변경될 때마다 자동으로 서버를 재시작해줍니다.

```bash
# nodemon으로 서버 실행
npx nodemon server.js

# 또는 scripts에 등록하여 사용
npm run dev
```

### 6. scripts 필드 활용

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

```bash
npm start      # node server.js 실행
npm run dev    # nodemon server.js 실행
```

## 실행 방법

```bash
# starter 또는 solution 디렉토리에서

# 1. 패키지 설치 (처음 한 번만)
npm install

# 2. 일반 실행
npm start

# 3. 개발 모드 (파일 변경 시 자동 재시작)
npm run dev
```

서버 실행 후 테스트:
```bash
# 서버 정보 확인
curl http://localhost:3000

# 할일 추가 (UUID가 id로 사용됨)
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "npm 패키지 공부하기"}'

# 할일 목록 조회
curl http://localhost:3000/api/todos

# 할일 수정 (UUID를 id로 사용)
curl -X PUT http://localhost:3000/api/todos/<uuid> \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'

# 할일 삭제
curl -X DELETE http://localhost:3000/api/todos/<uuid>
```

## 단계별 가이드

### Step 1: 패키지 설치

`package.json`이 있는 디렉토리에서 `npm install`을 실행하여 의존성을 설치합니다.

### Step 2: dotenv 적용

`.env` 파일을 생성하고, `require('dotenv').config()`로 환경 변수를 로드합니다.
`PORT`와 `DATA_DIR`을 환경 변수에서 가져오도록 수정합니다.

### Step 3: uuid 적용

`nextId++` 대신 `uuidv4()`를 사용하여 고유 ID를 생성합니다.

### Step 4: nodemon으로 개발

`npm run dev`로 서버를 실행하고, 코드를 수정하면 자동으로 재시작되는지 확인합니다.

## 프로젝트 구조

```
day26-npm/
├── README.md
├── starter/
│   ├── package.json     ← 패키지 설정
│   ├── .env             ← 환경 변수
│   └── server.js        ← 여기서 코드를 작성하세요
└── solution/
    ├── package.json     ← 패키지 설정
    ├── .env             ← 환경 변수
    ├── server.js        ← 완성된 코드 참고
    └── data/
        └── todos.json   ← 할일 데이터 파일
```

## 주의 사항

- `node_modules/` 디렉토리는 `.gitignore`에 추가하세요 (용량이 매우 큽니다)
- `.env` 파일에 비밀번호나 API 키를 저장할 때는 `.gitignore`에 추가하세요
- `package-lock.json`은 정확한 의존성 버전을 기록하므로 함께 커밋하세요

## 확인 사항

- [ ] `npm install`로 패키지가 정상 설치되는가?
- [ ] `.env` 파일의 환경 변수가 `process.env`로 접근되는가?
- [ ] 할일 ID가 UUID 형식으로 생성되는가?
- [ ] `npm run dev`로 실행 시 파일 변경을 감지하여 자동 재시작하는가?
- [ ] `data/` 디렉토리가 자동으로 생성되는가?
- [ ] 서버 재시작 후에도 데이터가 유지되는가?

## 다음 단계

Day 27에서는 드디어 **Express 프레임워크**를 사용하여 더 깔끔하고 강력한 서버를 만들겠습니다.
