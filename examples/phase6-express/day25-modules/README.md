# Day 25 - 모듈 시스템과 파일 저장

> **Phase 6: Express** | 학습일: 25일차

---

## 학습 목표

- CommonJS(`require`)와 ESM(`import/export`) 모듈 시스템을 이해한다
- `fs` 모듈로 JSON 파일에 데이터를 영속적으로 저장한다
- `path` 모듈로 파일 경로를 안전하게 다룬다
- lodash, dayjs, uuid 등 npm 패키지를 활용한다

---

## 핵심 개념

### 1. CommonJS vs ESM

```javascript
// CommonJS (Node.js 기본)
const fs = require('fs');
module.exports = { loadTodos, saveTodos };

// ESM (최신 방식, package.json에 "type": "module" 필요)
import fs from 'fs';
export { loadTodos, saveTodos };
```

### 2. 파일 기반 데이터 영속화

```javascript
const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, 'todos.json');

function loadTodos() {
  try {
    const data = fs.readFileSync(FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];  // 파일 없으면 빈 배열
  }
}

function saveTodos(todos) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(todos, null, 2));
}
```

### 3. path 모듈

```javascript
const path = require('path');

path.join(__dirname, 'data', 'todos.json');  // 운영체제에 맞는 경로
path.resolve('./data/todos.json');           // 절대 경로 반환
path.extname('file.json');                   // '.json'
```

### 4. npm 패키지 활용

```javascript
// lodash - 유틸리티 함수
const _ = require('lodash');
_.chunk([1,2,3,4,5], 2);  // [[1,2], [3,4], [5]]
_.groupBy(todos, 'category');

// dayjs - 날짜 처리
const dayjs = require('dayjs');
dayjs().format('YYYY-MM-DD HH:mm:ss');

// uuid - 고유 ID 생성
const { v4: uuidv4 } = require('uuid');
const id = uuidv4();  // "550e8400-e29b-41d4..."
```

---

## 실습 파일

### starter/ (직접 구현)

| 파일 | 내용 |
|------|------|
| `server.js` | 파일 기반 할일 CRUD 서버 |
| `02_esm_modules.js` | ESM import/export 연습 |
| `03_npm_packages.js` | lodash, dayjs, uuid 활용 |

### solution/ (완성 코드)

| 파일 | 내용 |
|------|------|
| `server.js` | 완성된 파일 저장 서버 |
| `02_esm_modules.js` | ESM 모듈 예제 |
| `03_npm_packages.js` | npm 패키지 활용 예제 |

---

## 실행 방법

```bash
npm install
node solution/server.js
```

```bash
# 할일 추가 후 서버 재시작 → 데이터 유지 확인
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "파일 저장 테스트"}'
```

---

## 정리

| 개념 | 핵심 |
|------|------|
| CommonJS | `require()` / `module.exports` — Node.js 기본 |
| ESM | `import` / `export` — 최신 표준 |
| fs 모듈 | `readFileSync`, `writeFileSync` 파일 I/O |
| path 모듈 | `path.join(__dirname, ...)` 안전한 경로 |
| 영속화 | JSON 파일로 데이터 저장 → 서버 재시작 후에도 유지 |

> **다음 시간**: Day 26 - npm 패키지 활용
