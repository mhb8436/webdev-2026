// ============================================
// Day 30 - Rate Limiting 미들웨어 (풀이)
// ============================================

function createRateLimiter(options = {}) {
  const {
    windowMs = 60 * 1000,     // 1분
    maxRequests = 100,         // 최대 요청 수
    message = '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',
  } = options;

  // IP별 요청 기록: { count, resetTime }
  const clients = new Map();

  // 주기적으로 만료된 기록 정리
  const cleanup = setInterval(() => {
    const now = Date.now();
    for (const [key, value] of clients) {
      if (now > value.resetTime) {
        clients.delete(key);
      }
    }
  }, windowMs);

  // 프로세스 종료 시 정리
  cleanup.unref();

  return (req, res, next) => {
    const clientId = req.ip || req.connection.remoteAddress;
    const now = Date.now();

    let client = clients.get(clientId);

    // 새 클라이언트이거나 시간 창 만료 시 초기화
    if (!client || now > client.resetTime) {
      client = { count: 0, resetTime: now + windowMs };
      clients.set(clientId, client);
    }

    client.count++;

    // 응답 헤더에 rate limit 정보 추가
    const remaining = Math.max(0, maxRequests - client.count);
    const resetSeconds = Math.ceil((client.resetTime - now) / 1000);

    res.setHeader('X-RateLimit-Limit', maxRequests);
    res.setHeader('X-RateLimit-Remaining', remaining);
    res.setHeader('X-RateLimit-Reset', resetSeconds);

    // 제한 초과 시
    if (client.count > maxRequests) {
      return res.status(429).json({
        error: message,
        retryAfter: resetSeconds,
      });
    }

    next();
  };
}

module.exports = createRateLimiter;
