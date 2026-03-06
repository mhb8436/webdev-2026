// ============================================
// Day 30 - Refresh Token 인증 플로우 (풀이)
// ============================================

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

const ACCESS_SECRET = process.env.JWT_SECRET || 'access-secret-key';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'refresh-secret-key';
const ACCESS_EXPIRY = '15m';
const REFRESH_EXPIRY = '7d';

// 메모리 저장소 (실제로는 DB/Redis)
const users = [
  { id: 1, email: 'admin@dev.com', passwordHash: '', name: '관리자', role: 'admin' },
];
const refreshTokens = new Set();

// 초기 비밀번호 해싱
(async () => {
  users[0].passwordHash = await bcrypt.hash('password123', 10);
})();

// 토큰 생성
function generateTokens(userId, role) {
  const accessToken = jwt.sign(
    { userId, role },
    ACCESS_SECRET,
    { expiresIn: ACCESS_EXPIRY }
  );
  const refreshToken = jwt.sign(
    { userId, role },
    REFRESH_SECRET,
    { expiresIn: REFRESH_EXPIRY }
  );
  refreshTokens.add(refreshToken);
  return { accessToken, refreshToken };
}

// POST /login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ error: '이메일 또는 비밀번호가 올바르지 않습니다' });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ error: '이메일 또는 비밀번호가 올바르지 않습니다' });

  const tokens = generateTokens(user.id, user.role);

  res.json({
    message: '로그인 성공',
    user: { id: user.id, name: user.name, role: user.role },
    ...tokens,
  });
});

// POST /refresh - 새 Access Token 발급
router.post('/refresh', (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: 'Refresh Token이 필요합니다' });
  }

  // 저장소에 있는지 확인 (로그아웃 되지 않았는지)
  if (!refreshTokens.has(refreshToken)) {
    return res.status(403).json({ error: '유효하지 않은 Refresh Token입니다' });
  }

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET);

    // 기존 Refresh Token 제거 (Rotation)
    refreshTokens.delete(refreshToken);

    // 새 토큰 쌍 발급
    const newTokens = generateTokens(decoded.userId, decoded.role);

    res.json({
      message: '토큰 갱신 성공',
      ...newTokens,
    });
  } catch (error) {
    refreshTokens.delete(refreshToken);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Refresh Token이 만료되었습니다. 다시 로그인하세요.' });
    }
    return res.status(403).json({ error: '유효하지 않은 토큰입니다' });
  }
});

// POST /logout
router.post('/logout', (req, res) => {
  const { refreshToken } = req.body;

  if (refreshToken) {
    refreshTokens.delete(refreshToken);
  }

  res.json({ message: '로그아웃 성공' });
});

module.exports = router;
