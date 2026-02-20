const jwt = require('jsonwebtoken');

// 인증 미들웨어
// 클라이언트가 보낸 JWT 토큰을 검증하여 인증된 요청인지 확인합니다
function authenticate(req, res, next) {
  try {
    // Authorization 헤더에서 토큰 추출
    const authHeader = req.headers.authorization;

    // 헤더가 없으면 401 응답
    if (!authHeader) {
      return res.status(401).json({ error: '인증 토큰이 필요합니다' });
    }

    // 'Bearer ' 접두사를 제거하고 토큰만 추출
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: '토큰 형식이 올바르지 않습니다' });
    }

    // jwt.verify()로 토큰 검증
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 검증 성공 시 req.user에 사용자 정보 저장
    req.user = decoded;

    // 다음 미들웨어/라우트로 진행
    next();
  } catch (error) {
    // 토큰 만료 에러 처리
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: '토큰이 만료되었습니다' });
    }
    // 그 외 토큰 검증 실패
    return res.status(401).json({ error: '유효하지 않은 토큰입니다' });
  }
}

module.exports = authenticate;
