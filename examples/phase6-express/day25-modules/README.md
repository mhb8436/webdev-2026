# Day 25 - 파일로 할일 저장하기 (5/19)

## 학습 목표

- `fs` 모듈의 동기/비동기 파일 읽기/쓰기를 이해한다 (`readFileSync`, `writeFileSync`, `readFile`, `writeFile`)
- `path` 모듈로 파일 경로를 안전하게 다루는 방법을 익힌다
- JSON 파일을 읽고 쓰는 패턴을 학습한다
- 서버 재시작 후에도 데이터가 유지되는 영속성(persistence)의 개념을 이해한다

## 문제 상황

> "할일을 JSON 파일에 저장하고 불러오자"

Day 24에서 만든 서버는 메모리에만 데이터를 저장했기 때문에, 서버를 재시작하면 모든 할일이 사라집니다.
이번에는 `fs` 모듈을 사용하여 할일 데이터를 **JSON 파일에 저장**하겠습니다.

## 핵심 개념

### 1. fs 모듈 (File System)

Node.js의 `fs` 모듈은 파일 시스템에 접근하는 기능을 제공합니다.

```javascript
const fs = require('fs');
```

### 2. 동기 vs 비동기 파일 읽기

```javascript
// 동기 방식 - 파일을 다 읽을 때까지 다음 코드 실행 안 함
const data = fs.readFileSync('todos.json', 'utf-8');

// 비동기 방식 - 파일 읽기를 백그라운드에서 수행
fs.readFile('todos.json', 'utf-8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

### 3. 파일 쓰기

```javascript
// 동기 방식
fs.writeFileSync('todos.json', JSON.stringify(todos, null, 2));

// 비동기 방식
fs.writeFile('todos.json', JSON.stringify(todos, null, 2), (err) => {
  if (err) throw err;
  console.log('파일 저장 완료');
});
```

### 4. path 모듈

파일 경로를 운영체제에 맞게 안전하게 처리합니다.

```javascript
const path = require('path');

// __dirname: 현재 파일이 있는 디렉토리의 절대 경로
const filePath = path.join(__dirname, 'todos.json');
```

### 5. JSON 파일 다루기 패턴

```javascript
// 읽기: 문자열 → JavaScript 객체
const todos = JSON.parse(fs.readFileSync('todos.json', 'utf-8'));

// 쓰기: JavaScript 객체 → 문자열 (들여쓰기 2칸)
fs.writeFileSync('todos.json', JSON.stringify(todos, null, 2));
```

### 6. 파일 존재 여부 확인

```javascript
if (fs.existsSync('todos.json')) {
  // 파일이 존재할 때의 처리
}
```

## 실행 방법

```bash
# starter 또는 solution 디렉토리에서
node server.js
```

서버 실행 후 테스트:
```bash
# 할일 추가
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "파일 저장 테스트"}'

# 할일 목록 조회
curl http://localhost:3000/api/todos

# 서버를 재시작한 후 다시 조회 → 데이터가 유지되는지 확인!
curl http://localhost:3000/api/todos

# 할일 수정 (id=1의 완료 상태 변경)
curl -X PUT http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'

# 할일 삭제
curl -X DELETE http://localhost:3000/api/todos/1
```

## 단계별 가이드

### Step 1: loadTodos 함수 구현

파일에서 할일 목록을 읽어오는 함수를 작성합니다.
파일이 없을 경우 빈 배열을 반환하도록 `try/catch`를 사용합니다.

### Step 2: saveTodos 함수 구현

현재 할일 목록을 파일에 저장하는 함수를 작성합니다.
`JSON.stringify`에 들여쓰기 옵션을 주면 파일을 읽기 쉽게 만들 수 있습니다.

### Step 3: CRUD 작업에 파일 저장 연결

POST (추가), PUT (수정), DELETE (삭제) 처리 후 `saveTodos()`를 호출하여 변경사항을 파일에 저장합니다.

### Step 4: URL에서 :id 파라미터 추출

`/api/todos/1`과 같은 URL에서 id 값을 추출하는 방법을 구현합니다.

## 프로젝트 구조

```
day25-modules/
├── README.md
├── starter/
│   ├── server.js      ← 여기서 코드를 작성하세요
│   └── todos.json     ← 할일 데이터 파일
└── solution/
    ├── server.js      ← 완성된 코드 참고
    └── todos.json     ← 할일 데이터 파일
```

## 확인 사항

- [ ] `loadTodos()` 함수가 파일에서 할일을 정상적으로 불러오는가?
- [ ] `saveTodos()` 함수가 할일을 파일에 정상적으로 저장하는가?
- [ ] 할일을 추가한 후 `todos.json` 파일에 내용이 기록되는가?
- [ ] 서버를 재시작해도 이전에 추가한 할일이 유지되는가?
- [ ] PUT 요청으로 할일을 수정할 수 있는가?
- [ ] DELETE 요청으로 할일을 삭제할 수 있는가?
- [ ] 파일이 존재하지 않는 상태에서 서버가 정상 시작되는가?

## 다음 단계

Day 26에서는 **npm 패키지**를 활용하여 서버 개발을 더 편리하게 만들겠습니다.
`dotenv`, `uuid`, `nodemon` 등의 패키지를 사용합니다.
