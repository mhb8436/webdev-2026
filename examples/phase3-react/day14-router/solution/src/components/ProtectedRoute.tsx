// ============================================
// Day 14 - 보호 라우트 (풀이)
// ============================================

import { createContext, useContext, useState, ReactNode } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

// --- 인증 Context ---
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('AuthProvider 내부에서 사용하세요');
  return context;
}

// 더미 사용자 DB
const USERS: (User & { password: string })[] = [
  { id: 1, name: '관리자', email: 'admin@dev.com', role: 'admin', password: '1234' },
  { id: 2, name: '사용자', email: 'user@dev.com', role: 'user', password: '1234' },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    const found = USERS.find(u => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...userData } = found;
      setUser(userData);
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// --- 보호 라우트 ---
export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

// 역할 기반 보호 라우트
export function RoleProtectedRoute({ allowedRoles }: { allowedRoles: string[] }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return (
      <div style={{ textAlign: 'center', padding: 40 }}>
        <h2>접근 권한이 없습니다</h2>
        <p>이 페이지는 {allowedRoles.join(', ')} 역할만 접근 가능합니다.</p>
      </div>
    );
  }

  return <Outlet />;
}

// --- 로그인 페이지 ---
export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('이메일 또는 비밀번호가 올바르지 않습니다');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: 20 }}>
      <h2>로그인</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email" value={email} onChange={e => setEmail(e.target.value)}
          placeholder="이메일" style={{ width: '100%', padding: 8, marginBottom: 8 }}
        />
        <input
          type="password" value={password} onChange={e => setPassword(e.target.value)}
          placeholder="비밀번호" style={{ width: '100%', padding: 8, marginBottom: 8 }}
        />
        <button type="submit" style={{ width: '100%', padding: 10, background: '#3498db', color: '#fff', border: 'none' }}>
          로그인
        </button>
      </form>
      <p style={{ color: '#999', fontSize: 13 }}>테스트: admin@dev.com / 1234</p>
    </div>
  );
}
