import { createContext, useContext, useState, ReactNode } from 'react';

// TODO: 사용자 타입 정의
// interface User {
//   id: number;
//   username: string;
//   email: string;
// }

// TODO: 인증 컨텍스트 타입 정의
// interface AuthContextType {
//   token: string | null;
//   user: User | null;
//   login: (token: string, user: User) => void;
//   logout: () => void;
//   isAuthenticated: boolean;
// }

// TODO: 컨텍스트 생성
// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// TODO: AuthProvider 컴포넌트
// 힌트: localStorage를 사용하여 토큰을 저장하면 새로고침해도 로그인 상태가 유지됩니다
export function AuthProvider({ children }: { children: ReactNode }) {
  // TODO: token 상태 관리 (localStorage에서 초기값 로드)
  // const [token, setToken] = useState<string | null>(() => {
  //   return localStorage.getItem('token');
  // });

  // TODO: user 상태 관리
  // const [user, setUser] = useState<User | null>(() => {
  //   const savedUser = localStorage.getItem('user');
  //   return savedUser ? JSON.parse(savedUser) : null;
  // });

  // TODO: login 함수 - 토큰과 사용자 정보를 저장
  // TODO: logout 함수 - 토큰과 사용자 정보를 삭제

  // TODO: AuthContext.Provider로 children을 감싸서 반환
  return <>{children}</>;
}

// TODO: useAuth 훅 - 컴포넌트에서 인증 상태에 접근할 때 사용합니다
export function useAuth() {
  // TODO: useContext(AuthContext)로 컨텍스트 값을 가져옴
  // 임시 반환값 (구현 후 제거)
  return {
    token: null as string | null,
    user: null as { id: number; username: string; email: string } | null,
    login: (_token: string, _user: { id: number; username: string; email: string }) => {},
    logout: () => {},
    isAuthenticated: false,
  };
}
