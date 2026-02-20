// Day 30 - JWT 인증 연습 문제 정답
// 사전 준비:
//   npm init -y
//   npm install express jsonwebtoken bcryptjs

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'my-secret-key-for-practice';

app.use(express.json());

// 메모리 저장소
const users = [];
let nextId = 1;

// ============================================
// 문제 1: 회원가입/로그인 API
// ============================================

// POST /api/auth/register - 회원가입
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 필수 필드 검증
    if (!username || !email || !password) {
      return res.status(400).json({
        error: 'username, email, password는 필수입니다.'
      });
    }

    // 이메일 중복 확인
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(409).json({
        error: '이미 존재하는 이메일입니다.'
      });
    }

    // 비밀번호 해싱 (saltRounds: 10)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 생성
    const user = {
      id: nextId++,
      username,
      email,
      password: hashedPassword,
      role: 'user'  // 기본 역할
    };

    users.push(user);

    // 비밀번호 제외하고 반환
    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: '회원가입에 실패했습니다.' });
  }
});

// POST /api/auth/login - 로그인
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 필수 필드 검증
    if (!email || !password) {
      return res.status(400).json({
        error: 'email과 password는 필수입니다.'
      });
    }

    // 사용자 찾기
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({
        error: '존재하지 않는 이메일입니다.'
      });
    }

    // 비밀번호 검증
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        error: '비밀번호가 일치하지 않습니다.'
      });
    }

    // JWT 토큰 발급
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: '1h' }  // 1시간 후 만료
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username
      }
    });
  } catch (error) {
    res.status(500).json({ error: '로그인에 실패했습니다.' });
  }
});

// ============================================
// 문제 2: 인증 미들웨어
// ============================================

// authMiddleware - JWT 토큰 검증 미들웨어
const authMiddleware = (req, res, next) => {
  // Authorization 헤더 확인
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: '인증 토큰이 필요합니다.'
    });
  }

  // Bearer 토큰 추출
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      error: '인증 토큰이 필요합니다.'
    });
  }

  try {
    // 토큰 검증
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;  // 디코딩된 사용자 정보를 req.user에 저장
    next();
  } catch (error) {
    return res.status(401).json({
      error: '유효하지 않은 토큰입니다.'
    });
  }
};

// GET /api/profile - 내 프로필 조회 (인증 필요)
app.get('/api/profile', authMiddleware, (req, res) => {
  // authMiddleware에서 설정한 req.user 사용
  res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email,
    role: req.user.role
  });
});

// ============================================
// 문제 3: 역할 기반 접근 제어
// ============================================

// roleMiddleware - 역할 검사 미들웨어
// 고차 함수: requiredRole을 받아 미들웨어 함수를 반환
const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    // req.user는 authMiddleware에서 설정됨
    if (!req.user) {
      return res.status(401).json({
        error: '인증이 필요합니다.'
      });
    }

    if (req.user.role !== requiredRole) {
      return res.status(403).json({
        error: '접근 권한이 없습니다.'
      });
    }

    next();
  };
};

// GET /api/admin/users - 전체 사용자 목록 (admin만)
app.get(
  '/api/admin/users',
  authMiddleware,              // 1단계: 인증 확인
  roleMiddleware('admin'),     // 2단계: 역할 확인
  (req, res) => {
    // 비밀번호 제외하고 반환
    const safeUsers = users.map(({ password, ...user }) => user);
    res.json(safeUsers);
  }
);

// DELETE /api/admin/users/:id - 사용자 삭제 (admin만)
app.delete(
  '/api/admin/users/:id',
  authMiddleware,
  roleMiddleware('admin'),
  (req, res) => {
    const { id } = req.params;
    const userIndex = users.findIndex(u => u.id === parseInt(id));

    if (userIndex === -1) {
      return res.status(404).json({
        error: '사용자를 찾을 수 없습니다.'
      });
    }

    // 자기 자신은 삭제할 수 없음
    if (parseInt(id) === req.user.id) {
      return res.status(400).json({
        error: '자기 자신은 삭제할 수 없습니다.'
      });
    }

    users.splice(userIndex, 1);
    res.json({ message: '사용자가 삭제되었습니다.' });
  }
);

// ============================================
// 테스트용: admin 사용자 자동 생성
// ============================================
const createAdminUser = async () => {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  users.push({
    id: nextId++,
    username: '관리자',
    email: 'admin@example.com',
    password: hashedPassword,
    role: 'admin'
  });
  console.log('관리자 계정이 생성되었습니다. (admin@example.com / admin123)');
};

// ============================================
// 서버 시작
// ============================================
app.listen(PORT, async () => {
  await createAdminUser();
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
