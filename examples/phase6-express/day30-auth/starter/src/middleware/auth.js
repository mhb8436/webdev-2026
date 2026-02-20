const jwt = require('jsonwebtoken');

// TODO: 인증 미들웨어
// 클라이언트가 보낸 JWT 토큰을 검증하여 인증된 요청인지 확인합니다
function authenticate(req, res, next) {
  // TODO: Authorization 헤더에서 토큰 추출
  // 힌트: req.headers.authorization에서 'Bearer TOKEN' 형태로 옵니다
  // const authHeader = req.headers.authorization;

  // TODO: 헤더가 없으면 401 응답
  // if (!authHeader) { ... }

  // TODO: 'Bearer ' 접두사를 제거하고 토큰만 추출
  // const token = authHeader.split(' ')[1];

  // TODO: jwt.verify()로 토큰 검증
  // 힌트: process.env.JWT_SECRET을 시크릿 키로 사용
  // const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // TODO: 검증 성공 시 req.user에 사용자 정보 저장
  // req.user = decoded;

  // TODO: next()를 호출하여 다음 미들웨어/라우트로 진행

  // TODO: 실패 시 401 응답
  // catch (error) { res.status(401).json({ error: '유효하지 않은 토큰입니다' }); }

  res.status(401).json({ error: '인증 미들웨어를 구현해주세요' });
}

module.exports = authenticate;
