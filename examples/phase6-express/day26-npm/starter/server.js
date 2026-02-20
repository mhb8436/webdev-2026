// npm 패키지를 활용한 할일 서버 - 스타터 코드

// TODO: dotenv 설정 - 환경 변수를 .env 파일에서 로드
// require('dotenv').config();

const http = require('http');
const fs = require('fs');
const path = require('path');

// TODO: uuid 패키지 사용 - 고유한 ID 생성
// const { v4: uuidv4 } = require('uuid');

// TODO: 환경변수에서 PORT 가져오기
const PORT = 3000; // TODO: process.env.PORT || 3000 으로 변경

// TODO: 환경변수에서 DATA_DIR 가져오기
const DATA_DIR = path.join(__dirname, 'data');
// TODO: process.env.DATA_DIR
//   ? path.resolve(process.env.DATA_DIR)
//   : path.join(__dirname, 'data');

const DATA_FILE = path.join(DATA_DIR, 'todos.json');

// TODO: data 디렉토리가 없으면 생성
// if (!fs.existsSync(DATA_DIR)) {
//   fs.mkdirSync(DATA_DIR, { recursive: true });
// }

// 파일에서 할일 불러오기
function loadTodos() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// 할일을 파일에 저장하기
function saveTodos(todos) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2), 'utf-8');
}

// 할일 목록 초기화
let todos = loadTodos();

// TODO: nextId 대신 uuidv4()를 사용하도록 변경
let nextId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;

// HTTP 서버 생성
const server = http.createServer((req, res) => {
  const { url, method } = req;

  // CORS 헤더 설정
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  // 루트 경로 - 서버 정보
  if (url === '/' && method === 'GET') {
    res.statusCode = 200;
    res.end(JSON.stringify({
      message: '할일 API 서버입니다',
      version: '1.0.0',
      features: ['dotenv 환경 변수', 'uuid 고유 ID', 'nodemon 자동 재시작']
    }));

  // 모든 할일 조회
  } else if (url === '/api/todos' && method === 'GET') {
    res.statusCode = 200;
    res.end(JSON.stringify(todos));

  // 새 할일 추가
  } else if (url === '/api/todos' && method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const { title } = JSON.parse(body);

        if (!title) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: '할일 제목은 필수입니다' }));
          return;
        }

        // TODO: id를 uuidv4()로 변경
        const newTodo = {
          id: nextId++, // TODO: uuidv4() 사용
          title,
          completed: false,
          createdAt: new Date().toISOString()
        };

        todos.push(newTodo);
        saveTodos(todos);

        res.statusCode = 201;
        res.end(JSON.stringify(newTodo));
      } catch (error) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: '잘못된 요청 형식입니다' }));
      }
    });

  // TODO: PUT과 DELETE에서도 UUID 기반 id로 검색하도록 변경
  // 힌트: url.match(/^\/api\/todos\/(.+)$/) 로 UUID 추출
  } else if (url.match(/^\/api\/todos\/\d+$/) && method === 'PUT') {
    const id = parseInt(url.split('/').pop());

    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const updates = JSON.parse(body);
        const todoIndex = todos.findIndex(t => t.id === id);

        if (todoIndex === -1) {
          res.statusCode = 404;
          res.end(JSON.stringify({ error: '해당 할일을 찾을 수 없습니다' }));
          return;
        }

        if (updates.title !== undefined) todos[todoIndex].title = updates.title;
        if (updates.completed !== undefined) todos[todoIndex].completed = updates.completed;
        todos[todoIndex].updatedAt = new Date().toISOString();

        saveTodos(todos);

        res.statusCode = 200;
        res.end(JSON.stringify(todos[todoIndex]));
      } catch (error) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: '잘못된 요청 형식입니다' }));
      }
    });

  } else if (url.match(/^\/api\/todos\/\d+$/) && method === 'DELETE') {
    const id = parseInt(url.split('/').pop());
    const todoIndex = todos.findIndex(t => t.id === id);

    if (todoIndex === -1) {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: '해당 할일을 찾을 수 없습니다' }));
      return;
    }

    const deletedTodo = todos[todoIndex];
    todos = todos.filter(t => t.id !== id);
    saveTodos(todos);

    res.statusCode = 200;
    res.end(JSON.stringify({
      message: '할일이 삭제되었습니다',
      deleted: deletedTodo
    }));

  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: '찾을 수 없는 경로입니다' }));
  }
});

// 서버 시작
server.listen(PORT, () => {
  console.log(`할일 API 서버가 http://localhost:${PORT} 에서 실행중입니다`);
});
