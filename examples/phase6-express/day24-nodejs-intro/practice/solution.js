// =============================================
// Day 24 정답 - Node.js 첫 서버, http 모듈
// =============================================

// 연습 1: 시간 서버
// http 모듈로 현재 시간을 JSON으로 반환하는 서버를 만드세요.
// -----------------------------------------

const http = require('http');

const timeServer = http.createServer((req, res) => {
  const now = new Date();

  const responseData = {
    time: now.toISOString(),
    message: '현재 시간입니다'
  };

  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(responseData));
});

// timeServer.listen(3000, () => {
//   console.log('시간 서버가 포트 3000에서 실행 중입니다');
// });


// 연습 2: 간단한 라우터
// URL 경로에 따라 다른 응답을 보내는 서버를 만드세요.
// -----------------------------------------

const routerServer = http.createServer((req, res) => {
  const headers = { 'Content-Type': 'text/html; charset=utf-8' };

  switch (req.url) {
    case '/':
      res.writeHead(200, headers);
      res.end('<h1>홈페이지</h1><p>환영합니다!</p>');
      break;

    case '/about':
      res.writeHead(200, headers);
      res.end('<h1>소개</h1><p>Node.js 학습 중입니다.</p>');
      break;

    case '/contact':
      res.writeHead(200, headers);
      res.end('<h1>연락처</h1><p>이메일: test@example.com</p>');
      break;

    default:
      res.writeHead(404, headers);
      res.end('<h1>404</h1><p>페이지를 찾을 수 없습니다.</p>');
      break;
  }
});

// routerServer.listen(3000, () => {
//   console.log('라우터 서버가 포트 3000에서 실행 중입니다');
// });


// 연습 3: JSON API 서버
// 학생 데이터를 메모리에 저장하고 JSON API로 응답하는 서버를 만드세요.
// -----------------------------------------

const students = [
  { id: 1, name: '김민수', grade: 'A' },
  { id: 2, name: '이서연', grade: 'B+' },
  { id: 3, name: '박지호', grade: 'A+' }
];

const apiServer = http.createServer((req, res) => {
  const headers = { 'Content-Type': 'application/json; charset=utf-8' };

  // 전체 학생 목록
  if (req.url === '/api/students') {
    res.writeHead(200, headers);
    res.end(JSON.stringify(students));
    return;
  }

  // 특정 학생 조회
  if (req.url.startsWith('/api/students/')) {
    const parts = req.url.split('/');
    const id = parseInt(parts[3]);
    const student = students.find(s => s.id === id);

    if (student) {
      res.writeHead(200, headers);
      res.end(JSON.stringify(student));
    } else {
      res.writeHead(404, headers);
      res.end(JSON.stringify({ error: '학생을 찾을 수 없습니다' }));
    }
    return;
  }

  // 그 외 경로
  res.writeHead(404, headers);
  res.end(JSON.stringify({ error: '존재하지 않는 API 경로입니다' }));
});

apiServer.listen(3000, () => {
  console.log('JSON API 서버가 포트 3000에서 실행 중입니다');
  console.log('테스트: http://localhost:3000/api/students');
  console.log('테스트: http://localhost:3000/api/students/1');
});
