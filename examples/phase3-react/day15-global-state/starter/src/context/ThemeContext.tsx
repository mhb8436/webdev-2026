// ============================================
// Day 15 - Context API: 테마 관리
// ============================================
// 학습목표: createContext, Provider, useContext

import { createContext, useContext, useState, ReactNode } from 'react';

// TODO 1: 테마 타입 정의
// type Theme = 'light' | 'dark';
// interface ThemeContextType {
//   theme: Theme;
//   toggleTheme: () => void;
//   colors: { bg: string; text: string; primary: string; };
// }

// TODO 2: Context 생성
// const ThemeContext = createContext<ThemeContextType | null>(null);

// TODO 3: Provider 컴포넌트
// export function ThemeProvider({ children }: { children: ReactNode }) {
//   const [theme, setTheme] = useState<Theme>('light');
//   const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');
//   const colors = theme === 'light'
//     ? { bg: '#fff', text: '#333', primary: '#3498db' }
//     : { bg: '#1a1a2e', text: '#eee', primary: '#e94560' };
//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// TODO 4: 커스텀 훅
// export function useTheme() {
//   const context = useContext(ThemeContext);
//   if (!context) throw new Error('ThemeProvider 안에서 사용하세요');
//   return context;
// }

// TODO 5: 사용 컴포넌트
// function ThemedButton() {
//   const { theme, toggleTheme, colors } = useTheme();
//   return <button onClick={toggleTheme}>현재: {theme}</button>;
// }
