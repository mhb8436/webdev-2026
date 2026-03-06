// ============================================
// Day 15 - Context API: 테마 관리 (풀이)
// ============================================

import { createContext, useContext, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeColors {
  bg: string;
  text: string;
  primary: string;
  border: string;
  cardBg: string;
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: ThemeColors;
}

const themeMap: Record<Theme, ThemeColors> = {
  light: {
    bg: '#ffffff',
    text: '#333333',
    primary: '#3498db',
    border: '#e0e0e0',
    cardBg: '#f5f5f5',
  },
  dark: {
    bg: '#1a1a2e',
    text: '#eeeeee',
    primary: '#e94560',
    border: '#333355',
    cardBg: '#16213e',
  },
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));
  const colors = themeMap[theme];

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      <div style={{ background: colors.bg, color: colors.text, minHeight: '100vh', transition: 'all 0.3s' }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('ThemeProvider 내부에서 사용해야 합니다');
  return context;
}

// --- 데모 컴포넌트 ---
function ThemeToggleButton() {
  const { theme, toggleTheme, colors } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: colors.primary,
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: 8,
        cursor: 'pointer',
        fontSize: 16,
      }}
    >
      {theme === 'light' ? '다크 모드로' : '라이트 모드로'}
    </button>
  );
}

function ThemedCard({ title, content }: { title: string; content: string }) {
  const { colors } = useTheme();

  return (
    <div style={{
      background: colors.cardBg,
      border: `1px solid ${colors.border}`,
      borderRadius: 8,
      padding: 16,
      marginBottom: 12,
    }}>
      <h3 style={{ color: colors.primary, margin: '0 0 8px' }}>{title}</h3>
      <p style={{ margin: 0 }}>{content}</p>
    </div>
  );
}

export default function ThemeDemo() {
  return (
    <ThemeProvider>
      <div style={{ maxWidth: 500, margin: '0 auto', padding: 20 }}>
        <h1>Context API: 테마</h1>
        <ThemeToggleButton />
        <div style={{ marginTop: 20 }}>
          <ThemedCard title="React Context" content="전역 상태를 Props drilling 없이 전달합니다." />
          <ThemedCard title="커스텀 훅" content="useTheme() 훅으로 어디서든 테마에 접근합니다." />
          <ThemedCard title="Provider 패턴" content="ThemeProvider로 감싸면 하위 컴포넌트에서 사용 가능합니다." />
        </div>
      </div>
    </ThemeProvider>
  );
}
