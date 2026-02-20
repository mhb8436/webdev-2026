import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

// 사용자 타입 정의
interface User {
  id: number;
  username: string;
  email: string;
}

// 인증 컨텍스트 타입 정의
interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

// 컨텍스트 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider 컴포넌트 - 앱 전체에 인증 상태를 제공합니다
export function AuthProvider({ children }: { children: ReactNode }) {
  // localStorage에서 초기값 로드 (새로고침해도 로그인 상태 유지)
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token');
  });
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // 토큰이나 사용자 정보가 변경되면 localStorage에 저장
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // 로그인 함수 - 토큰과 사용자 정보를 저장합니다
  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
  };

  // 로그아웃 함수 - 토큰과 사용자 정보를 삭제합니다
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value: AuthContextType = {
    token,
    user,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// useAuth 훅 - 컴포넌트에서 인증 상태에 접근할 때 사용합니다
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth는 AuthProvider 내부에서만 사용할 수 있습니다');
  }
  return context;
}
