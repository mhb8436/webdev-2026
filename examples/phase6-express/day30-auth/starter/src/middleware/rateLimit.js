// ============================================
// Day 30 - Rate Limiting 미들웨어
// ============================================
// 학습목표: API 요청 횟수 제한으로 서버 보호

// TODO 1: 메모리 기반 Rate Limiter
// 클라이언트 IP별로 요청 횟수를 추적
// const requestCounts = new Map();

// TODO 2: createRateLimiter(options) 팩토리 함수
// options: { windowMs: 60000, maxRequests: 100, message: "..." }
// - 시간 창(windowMs) 내에 maxRequests 초과 시 429 응답
// - 남은 요청 수를 X-RateLimit-Remaining 헤더로 전달

// TODO 3: 시간 경과 시 자동 초기화
// 주기적으로 오래된 요청 기록 정리

// TODO 4: 사용 예시
// const limiter = createRateLimiter({ windowMs: 60000, maxRequests: 10 });
// app.use('/api/', limiter);

// module.exports = createRateLimiter;
