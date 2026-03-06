// ============================================
// Day 14 - 인증된 사용자만 접근하는 보호 라우트
// ============================================
// 학습목표: 라우트 가드, 리다이렉트, 인증 상태 관리

// TODO 1: 인증 상태를 위한 커스텀 훅 (또는 Context)
// function useAuth() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   const login = (email, password) => { ... };
//   const logout = () => { ... };
//   return { isAuthenticated, user, login, logout };
// }

// TODO 2: ProtectedRoute 컴포넌트
// 인증되지 않은 사용자 → /login으로 리다이렉트
// import { Navigate, Outlet } from 'react-router-dom';
// function ProtectedRoute() {
//   const { isAuthenticated } = useAuth();
//   if (!isAuthenticated) return <Navigate to="/login" replace />;
//   return <Outlet />;
// }

// TODO 3: 사용 예시 (App에서의 라우트 설정)
// <Route element={<ProtectedRoute />}>
//   <Route path="/dashboard" element={<Dashboard />} />
//   <Route path="/profile" element={<Profile />} />
// </Route>
// <Route path="/login" element={<Login />} />

export default function ProtectedRoute() {
  return <div>TODO: 구현하세요</div>;
}
