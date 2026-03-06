// ============================================
// Day 30 - 역할 기반 접근 제어 (RBAC)
// ============================================
// 학습목표: Role-Based Access Control 미들웨어

// TODO 1: 역할 정의
// const ROLES = { ADMIN: 'admin', USER: 'user', GUEST: 'guest' };


// TODO 2: 역할별 권한 정의
// const PERMISSIONS = {
//   admin: ['read', 'write', 'delete', 'manage_users'],
//   user:  ['read', 'write'],
//   guest: ['read'],
// };


// TODO 3: 역할 확인 미들웨어
// function requireRole(...allowedRoles) {
//   return (req, res, next) => {
//     // req.user.role이 allowedRoles에 포함되는지 확인
//     // 미포함 시 403 Forbidden 응답
//   };
// }


// TODO 4: 권한 확인 미들웨어
// function requirePermission(permission) {
//   return (req, res, next) => {
//     // req.user.role의 권한 목록에 permission이 있는지 확인
//   };
// }


// TODO 5: 사용 예시 (라우트에 적용)
// app.get('/api/users', authenticate, requireRole('admin'), handler);
// app.delete('/api/todos/:id', authenticate, requirePermission('delete'), handler);

// module.exports = { requireRole, requirePermission, ROLES };
