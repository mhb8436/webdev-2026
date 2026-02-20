// npm 패키지를 활용한 할일 서버 - 완성 코드

// dotenv 설정 - .env 파일에서 환경 변수 로드
require('dotenv').config();

const http = require('http');
const fs = require('fs');
const path = require('path');

// uuid 패키지 - 고유한 ID 생성
const { v4: uuidv4 } = require('uuid');

// 환경변수에서 설정값 가져오기
const PORT = process.env.PORT || 3000;

// 데이터 디렉토리 경로 설정
const DATA_DIR = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : path.join(__dirname, 'data');

const DATA_FILE = path.join(DATA_DIR, 'todos.json');

// data 디렉토리가 없으면 생성
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  console.log(`데이터 디렉토리 생성: ${DATA_DIR}`);
}

// 파일에서 할일 불러오기
function loadTodos() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // 파일이 없거나 파싱 실패 시 빈 배열 반환
    console.log('할일 파일을 찾을 수 없습니다. 빈 목록으로 시작합니다.');
    return [];
  }
}

// 할일을 파일에 저장하기
function saveTodos(todos) {
  const data = JSON.stringify(todos, null, 2);
  fs.writeFileSync(DATA_FILE, data, 'utf-8');
}

// 요청 본문 파싱 헬퍼 함수
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(new Error('잘못된 JSON 형식입니다'));
      }
    });
    req.on('error', reject);
  });
}

// 할일 목록 초기화
let todos = loadTodos();

// HTTP 서버 생성
const server = http.createServer(async (req, res) => {
  const { url, method } = req;

  // CORS 헤더 설정 (프론트엔드에서 접근할 수 있도록)
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OPTIONS 요청 처리 (CORS 사전 요청)
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
      features: ['dotenv 환경 변수', 'uuid 고유 ID', 'nodemon 자동 재시작'],
      todosCount: todos.length
    }));

  // 모든 할일 조회
  } else if (url === '/api/todos' && method === 'GET') {
    res.statusCode = 200;
    res.end(JSON.stringify(todos));

  // 새 할일 추가
  } else if (url === '/api/todos' && method === 'POST') {
    try {
      const { title } = await parseBody(req);

      // 제목 유효성 검사
      if (!title) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: '할일 제목은 필수입니다' }));
        return;
      }

      // uuid로 고유 ID 생성
      const newTodo = {
        id: uuidv4(),
        title,
        completed: false,
        createdAt: new Date().toISOString()
      };

      // 배열에 추가하고 파일에 저장
      todos.push(newTodo);
      saveTodos(todos);

      // 201 Created 응답
      res.statusCode = 201;
      res.end(JSON.stringify(newTodo));
    } catch (error) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: '잘못된 요청 형식입니다' }));
    }

  // 할일 수정 (PUT /api/todos/:id) - UUID 형식의 id 지원
  } else if (url.match(/^\/api\/todos\/(.+)$/) && method === 'PUT') {
    // URL에서 UUID id 추출
    const id = url.match(/^\/api\/todos\/(.+)$/)[1];

    try {
      const updates = await parseBody(req);

      // 해당 id의 할일 찾기
      const todoIndex = todos.findIndex(t => t.id === id);

      if (todoIndex === -1) {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: '해당 할일을 찾을 수 없습니다' }));
        return;
      }

      // 할일 업데이트 (title, completed만 수정 가능)
      if (updates.title !== undefined) {
        todos[todoIndex].title = updates.title;
      }
      if (updates.completed !== undefined) {
        todos[todoIndex].completed = updates.completed;
      }
      todos[todoIndex].updatedAt = new Date().toISOString();

      // 파일에 저장
      saveTodos(todos);

      res.statusCode = 200;
      res.end(JSON.stringify(todos[todoIndex]));
    } catch (error) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: '잘못된 요청 형식입니다' }));
    }

  // 할일 삭제 (DELETE /api/todos/:id) - UUID 형식의 id 지원
  } else if (url.match(/^\/api\/todos\/(.+)$/) && method === 'DELETE') {
    // URL에서 UUID id 추출
    const id = url.match(/^\/api\/todos\/(.+)$/)[1];

    // 해당 id의 할일 찾기
    const todoIndex = todos.findIndex(t => t.id === id);

    if (todoIndex === -1) {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: '해당 할일을 찾을 수 없습니다' }));
      return;
    }

    // 삭제된 할일 정보 보관
    const deletedTodo = todos[todoIndex];

    // 배열에서 제거하고 파일에 저장
    todos = todos.filter(t => t.id !== id);
    saveTodos(todos);

    res.statusCode = 200;
    res.end(JSON.stringify({
      message: '할일이 삭제되었습니다',
      deleted: deletedTodo
    }));

  // 404 응답 - 알 수 없는 경로
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: '찾을 수 없는 경로입니다' }));
  }
});

// 서버 시작
server.listen(PORT, () => {
  console.log(`할일 API 서버가 http://localhost:${PORT} 에서 실행중입니다`);
  console.log(`환경: PORT=${PORT}, DATA_DIR=${DATA_DIR}`);
  console.log(`데이터 파일: ${DATA_FILE}`);
  console.log(`현재 저장된 할일: ${todos.length}개`);
  console.log('');
  console.log('사용 가능한 엔드포인트:');
  console.log(`  GET    http://localhost:${PORT}/             - 서버 정보`);
  console.log(`  GET    http://localhost:${PORT}/api/todos     - 할일 목록 조회`);
  console.log(`  POST   http://localhost:${PORT}/api/todos     - 할일 추가`);
  console.log(`  PUT    http://localhost:${PORT}/api/todos/:id - 할일 수정`);
  console.log(`  DELETE http://localhost:${PORT}/api/todos/:id - 할일 삭제`);
  console.log('');
  console.log('개발 모드 실행: npm run dev (nodemon 자동 재시작)');
});
