// Node.js 파일 기반 할일 서버 - 완성 코드
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'todos.json');

// 파일에서 할일 불러오기
function loadTodos() {
  try {
    // 파일이 존재하면 읽어서 파싱
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
  // JSON 문자열로 변환 (들여쓰기 2칸으로 보기 좋게)
  const data = JSON.stringify(todos, null, 2);
  fs.writeFileSync(DATA_FILE, data, 'utf-8');
}

// 할일 목록과 다음 ID 초기화
let todos = loadTodos();
let nextId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;

// HTTP 서버 생성
const server = http.createServer((req, res) => {
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

  // 라우팅: 루트 경로 - 서버 정보
  if (url === '/' && method === 'GET') {
    res.statusCode = 200;
    res.end(JSON.stringify({
      message: '할일 API 서버입니다',
      version: '1.0.0',
      storage: '파일 기반 (todos.json)'
    }));

  // 라우팅: 모든 할일 조회
  } else if (url === '/api/todos' && method === 'GET') {
    res.statusCode = 200;
    res.end(JSON.stringify(todos));

  // 라우팅: 새 할일 추가
  } else if (url === '/api/todos' && method === 'POST') {
    let body = '';

    // 요청 본문 데이터 수집
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    // 모든 데이터를 받은 후 처리
    req.on('end', () => {
      try {
        const { title } = JSON.parse(body);

        // 제목 유효성 검사
        if (!title) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: '할일 제목은 필수입니다' }));
          return;
        }

        // 새 할일 객체 생성
        const newTodo = {
          id: nextId++,
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
    });

  // 라우팅: 할일 수정 (PUT /api/todos/:id)
  } else if (url.match(/^\/api\/todos\/\d+$/) && method === 'PUT') {
    // URL에서 id 추출
    const id = parseInt(url.split('/').pop());

    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const updates = JSON.parse(body);

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
    });

  // 라우팅: 할일 삭제 (DELETE /api/todos/:id)
  } else if (url.match(/^\/api\/todos\/\d+$/) && method === 'DELETE') {
    // URL에서 id 추출
    const id = parseInt(url.split('/').pop());

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
  console.log(`데이터 파일: ${DATA_FILE}`);
  console.log(`현재 저장된 할일: ${todos.length}개`);
  console.log('사용 가능한 엔드포인트:');
  console.log(`  GET    http://localhost:${PORT}/             - 서버 정보`);
  console.log(`  GET    http://localhost:${PORT}/api/todos     - 할일 목록 조회`);
  console.log(`  POST   http://localhost:${PORT}/api/todos     - 할일 추가`);
  console.log(`  PUT    http://localhost:${PORT}/api/todos/:id - 할일 수정`);
  console.log(`  DELETE http://localhost:${PORT}/api/todos/:id - 할일 삭제`);
});
