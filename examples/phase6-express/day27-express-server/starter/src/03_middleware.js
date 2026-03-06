// ============================================
// Day 27 - Express 미들웨어 작성하기
// ============================================
// 학습목표: 커스텀 미들웨어, 에러 처리, CORS, 로깅

const express = require('express');
const app = express();
app.use(express.json());

// TODO 1: 로깅 미들웨어
// 모든 요청의 메서드, URL, 응답시간을 로그로 출력
// function logger(req, res, next) { ... }
// 힌트: Date.now()로 시작 시간 기록, res.on('finish', ...) 로 종료 시 측정


// TODO 2: CORS 미들웨어
// 직접 구현해보기 (cors 패키지 없이)
// res.setHeader('Access-Control-Allow-Origin', '*')
// res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
// OPTIONS 요청 처리 (preflight)


// TODO 3: 인증 체크 미들웨어
// Authorization 헤더에 "Bearer secret-token" 확인
// 인증 실패 시 401 응답


// TODO 4: 요청 유효성 검사 미들웨어
// function validateBody(requiredFields) 팩토리 함수
// 필수 필드가 없으면 400 에러 응답
// 사용: app.post('/todos', validateBody(['title']), handler)


// TODO 5: 에러 처리 미들웨어
// function errorHandler(err, req, res, next) - 4개 매개변수!
// err.status에 따라 적절한 HTTP 상태코드 반환


// TODO 6: 라우트 정의
// GET /api/todos - 전체 조회
// POST /api/todos - 추가 (validateBody 적용)
// 존재하지 않는 경로 → 404 미들웨어


// app.listen(3000, () => console.log('서버 시작: http://localhost:3000'));
