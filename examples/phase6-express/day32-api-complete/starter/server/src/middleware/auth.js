const jwt = require('jsonwebtoken');

// 인증 미들웨어 (Day 30 솔루션)
function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: '인증 토큰이 필요합니다' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: '토큰 형식이 올바르지 않습니다' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: '토큰이 만료되었습니다' });
    }
    return res.status(401).json({ error: '유효하지 않은 토큰입니다' });
  }
}

module.exports = authenticate;
