// Node.js 파일 기반 할일 서버 - 스타터 코드
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'todos.json');

// TODO: 파일에서 할일 불러오기
function loadTodos() {
  // TODO: try/catch로 감싸기
  // TODO: 파일이 없으면 빈 배열 반환
  // TODO: fs.readFileSync로 파일 읽기
  // TODO: JSON.parse로 파싱하여 반환
  // 힌트: fs.readFileSync(DATA_FILE, 'utf-8')
  // 힌트: 파일이 없으면 catch에서 빈 배열 반환
}

// TODO: 할일을 파일에 저장하기
function saveTodos(todos) {
  // TODO: JSON.stringify로 변환 후 파일에 쓰기
  // 힌트: fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2))
}

// 할일 목록과 다음 ID 초기화
let todos = loadTodos();
let nextId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;

// HTTP 서버 생성
const server = http.createServer((req, res) => {
  const { url, method } = req;

  // CORS 헤더 설정
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OPTIONS 요청 처리
  if (method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  // 라우팅: 루트 경로
  if (url === '/' && method === 'GET') {
    res.statusCode = 200;
    res.end(JSON.stringify({
      message: '할일 API 서버입니다',
      version: '1.0.0',
      storage: '파일 기반 (todos.json)'
    }));

  } else if (url === '/api/todos' && method === 'GET') {
    // 모든 할일 조회
    res.statusCode = 200;
    res.end(JSON.stringify(todos));

  } else if (url === '/api/todos' && method === 'POST') {
    // 새 할일 추가
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

        const newTodo = {
          id: nextId++,
          title,
          completed: false,
          createdAt: new Date().toISOString()
        };

        todos.push(newTodo);

        // TODO: 파일에 저장
        // saveTodos(todos);

        res.statusCode = 201;
        res.end(JSON.stringify(newTodo));
      } catch (error) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: '잘못된 요청 형식입니다' }));
      }
    });

  } else if (url.match(/^\/api\/todos\/\d+$/) && method === 'PUT') {
    // TODO: 할일 수정
    // 힌트: URL에서 id 추출 → const id = parseInt(url.split('/').pop());
    // 힌트: 해당 id의 할일 찾기 → todos.find(t => t.id === id)
    // 힌트: body 파싱 후 할일 업데이트
    // 힌트: saveTodos(todos) 호출
    res.statusCode = 501;
    res.end(JSON.stringify({ error: '아직 구현되지 않았습니다' }));

  } else if (url.match(/^\/api\/todos\/\d+$/) && method === 'DELETE') {
    // TODO: 할일 삭제
    // 힌트: URL에서 id 추출
    // 힌트: todos = todos.filter(t => t.id !== id)
    // 힌트: saveTodos(todos) 호출
    res.statusCode = 501;
    res.end(JSON.stringify({ error: '아직 구현되지 않았습니다' }));

  } else {
    // 404 응답
    res.statusCode = 404;
    res.end(JSON.stringify({ error: '찾을 수 없는 경로입니다' }));
  }
});

// 서버 시작
server.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행중입니다`);
});
