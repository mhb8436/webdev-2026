// ============================================
// Day 30 - 역할 기반 접근 제어 (RBAC) - 풀이
// ============================================

const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
};

const PERMISSIONS = {
  admin: ['read', 'write', 'delete', 'manage_users'],
  user: ['read', 'write'],
  guest: ['read'],
};

// 역할 확인 미들웨어
function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: '인증이 필요합니다' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: '접근 권한이 없습니다',
        required: allowedRoles,
        current: req.user.role,
      });
    }

    next();
  };
}

// 권한 확인 미들웨어
function requirePermission(permission) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: '인증이 필요합니다' });
    }

    const userPermissions = PERMISSIONS[req.user.role] || [];

    if (!userPermissions.includes(permission)) {
      return res.status(403).json({
        error: `'${permission}' 권한이 없습니다`,
        role: req.user.role,
        availablePermissions: userPermissions,
      });
    }

    next();
  };
}

module.exports = { requireRole, requirePermission, ROLES, PERMISSIONS };
