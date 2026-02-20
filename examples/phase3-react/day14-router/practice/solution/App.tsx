// Day 14 연습문제 정답 - React Router
// main.tsx에서 BrowserRouter로 감싸야 합니다:
// import { BrowserRouter } from 'react-router-dom';
// <BrowserRouter><App /></BrowserRouter>

import { useState } from 'react';
import {
  Routes,
  Route,
  Link,
  NavLink,
  useParams,
  useNavigate,
  Navigate,
} from 'react-router-dom';

// ============================================
// 블로그 글 데이터
// ============================================
interface Post {
  id: number;
  title: string;
  content: string;
  date: string;
  summary: string;
}

const posts: Post[] = [
  {
    id: 1,
    title: 'React 시작하기',
    summary: 'React의 기본 개념과 시작 방법을 알아봅니다.',
    content:
      'React는 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리입니다. 컴포넌트 기반으로 UI를 구성하며, Virtual DOM을 사용하여 효율적인 렌더링을 제공합니다. JSX 문법을 사용하여 JavaScript 안에서 HTML과 유사한 코드를 작성할 수 있습니다.',
    date: '2024-04-14',
  },
  {
    id: 2,
    title: 'TypeScript 기초',
    summary: 'TypeScript로 더 안전한 코드를 작성하세요.',
    content:
      'TypeScript는 JavaScript에 정적 타입을 추가한 프로그래밍 언어입니다. 컴파일 시점에 타입 오류를 감지하여 런타임 에러를 줄일 수 있습니다. interface와 type을 사용하여 데이터의 형태를 명확하게 정의할 수 있습니다.',
    date: '2024-04-13',
  },
  {
    id: 3,
    title: 'Vite로 빠른 개발환경 구축하기',
    summary: 'Vite의 장점과 사용법을 소개합니다.',
    content:
      'Vite는 차세대 프론트엔드 빌드 도구입니다. ES 모듈을 활용한 빠른 개발 서버와 번들링을 제공합니다. HMR(Hot Module Replacement)이 매우 빠르며, React, Vue, Svelte 등 다양한 프레임워크를 지원합니다.',
    date: '2024-04-12',
  },
];

// ============================================
// 문제 1: 미니 블로그 - 페이지 컴포넌트들
// ============================================
function Home() {
  return (
    <div>
      <h2>블로그에 오신 것을 환영합니다</h2>
      <p>프론트엔드 개발에 관한 다양한 글을 공유합니다.</p>

      <h3>최신 글</h3>
      {posts.slice(0, 2).map((post) => (
        <div
          key={post.id}
          style={{
            padding: '12px',
            border: '1px solid #eee',
            borderRadius: '8px',
            marginBottom: '8px',
          }}
        >
          <Link to={`/posts/${post.id}`} style={{ textDecoration: 'none', color: '#2c3e50' }}>
            <h4 style={{ margin: '0 0 4px' }}>{post.title}</h4>
          </Link>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{post.summary}</p>
        </div>
      ))}
      <Link to="/posts" style={{ color: '#3498db' }}>
        모든 글 보기 &rarr;
      </Link>
    </div>
  );
}

function PostList() {
  return (
    <div>
      <h2>글 목록</h2>
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            padding: '16px',
            border: '1px solid #eee',
            borderRadius: '8px',
            marginBottom: '12px',
            maxWidth: '600px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link
              to={`/posts/${post.id}`}
              style={{ textDecoration: 'none', color: '#2c3e50', fontSize: '18px', fontWeight: 'bold' }}
            >
              {post.title}
            </Link>
            <span style={{ color: '#999', fontSize: '13px' }}>{post.date}</span>
          </div>
          <p style={{ margin: '8px 0 0', color: '#666' }}>{post.summary}</p>
        </div>
      ))}
    </div>
  );
}

function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = posts.find((p) => p.id === Number(id));

  if (!post) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2>글을 찾을 수 없습니다</h2>
        <p style={{ color: '#666' }}>요청한 글(ID: {id})이 존재하지 않습니다.</p>
        <button
          onClick={() => navigate('/posts')}
          style={{
            padding: '8px 20px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          글 목록으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px' }}>
      <button
        onClick={() => navigate('/posts')}
        style={{
          background: 'none',
          border: 'none',
          color: '#3498db',
          cursor: 'pointer',
          marginBottom: '16px',
          padding: 0,
          fontSize: '14px',
        }}
      >
        &larr; 글 목록으로
      </button>
      <h2>{post.title}</h2>
      <p style={{ color: '#999', fontSize: '14px' }}>{post.date}</p>
      <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '16px 0' }} />
      <p style={{ lineHeight: '1.8', color: '#333' }}>{post.content}</p>
    </div>
  );
}

function About() {
  return (
    <div style={{ maxWidth: '500px' }}>
      <h2>블로그 소개</h2>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#3498db',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '32px',
            fontWeight: 'bold',
          }}
        >
          홍
        </div>
        <div>
          <h3 style={{ margin: '0 0 4px' }}>홍길동</h3>
          <p style={{ margin: 0, color: '#666' }}>프론트엔드 개발자</p>
        </div>
      </div>
      <p>프론트엔드 개발과 관련된 다양한 주제를 다루는 기술 블로그입니다.</p>
      <p>React, TypeScript, 웹 성능 최적화 등에 관심이 많습니다.</p>
    </div>
  );
}

// ============================================
// 문제 2: 404 페이지
// ============================================
function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h2 style={{ fontSize: '72px', margin: '0 0 8px', color: '#e74c3c' }}>404</h2>
      <p style={{ fontSize: '18px', color: '#666', marginBottom: '20px' }}>
        페이지를 찾을 수 없습니다
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          padding: '10px 24px',
          backgroundColor: '#3498db',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
        }}
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}

// ============================================
// 문제 3: 로그인 시뮬레이션 - 페이지 컴포넌트들
// ============================================
interface AuthProps {
  isLoggedIn: boolean;
  userName: string;
  onLogin: (name: string) => void;
  onLogout: () => void;
}

function LoginPage({ isLoggedIn, onLogin }: AuthProps) {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  // 이미 로그인 상태면 대시보드로 리다이렉트
  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogin = () => {
    if (name.trim()) {
      onLogin(name.trim());
      navigate('/dashboard');
    }
  };

  return (
    <div style={{ maxWidth: '350px' }}>
      <h2>로그인</h2>
      <div style={{ marginBottom: '16px' }}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력하세요"
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          style={{
            width: '100%',
            padding: '10px 12px',
            fontSize: '14px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            boxSizing: 'border-box',
            marginBottom: '8px',
          }}
        />
        <button
          onClick={handleLogin}
          disabled={!name.trim()}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: name.trim() ? '#3498db' : '#bdc3c7',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: name.trim() ? 'pointer' : 'not-allowed',
            fontSize: '16px',
          }}
        >
          로그인
        </button>
      </div>
    </div>
  );
}

function DashboardPage({ isLoggedIn, userName, onLogout }: AuthProps) {
  const navigate = useNavigate();

  // 로그인하지 않은 상태면 로그인 페이지로 리다이렉트
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: '500px' }}>
      <h2>대시보드</h2>
      <div
        style={{
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          marginBottom: '16px',
        }}
      >
        <p style={{ margin: '0 0 8px', fontSize: '18px' }}>
          환영합니다, <strong>{userName}</strong>님!
        </p>
        <p style={{ margin: 0, color: '#666' }}>로그인에 성공하셨습니다.</p>
      </div>
      <button
        onClick={handleLogout}
        style={{
          padding: '8px 20px',
          backgroundColor: '#e74c3c',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        로그아웃
      </button>
    </div>
  );
}

// ============================================
// 문제 2: 네비게이션 바
// ============================================
function NavBar({ isLoggedIn }: { isLoggedIn: boolean }) {
  const linkStyle = ({ isActive }: { isActive: boolean }): React.CSSProperties => ({
    textDecoration: isActive ? 'underline' : 'none',
    fontWeight: isActive ? 'bold' : 'normal',
    color: isActive ? '#3498db' : '#666',
    padding: '8px 16px',
  });

  return (
    <nav
      style={{
        display: 'flex',
        gap: '4px',
        padding: '12px 0',
        borderBottom: '2px solid #eee',
        marginBottom: '24px',
      }}
    >
      <NavLink to="/" style={linkStyle} end>
        홈
      </NavLink>
      <NavLink to="/posts" style={linkStyle}>
        글 목록
      </NavLink>
      <NavLink to="/about" style={linkStyle}>
        소개
      </NavLink>
      <span style={{ flex: 1 }} />
      {isLoggedIn ? (
        <NavLink to="/dashboard" style={linkStyle}>
          대시보드
        </NavLink>
      ) : (
        <NavLink to="/login" style={linkStyle}>
          로그인
        </NavLink>
      )}
    </nav>
  );
}

// ============================================
// 메인 App 컴포넌트
// ============================================
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const handleLogin = (name: string) => {
    setIsLoggedIn(true);
    setUserName(name);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
  };

  const authProps: AuthProps = {
    isLoggedIn,
    userName,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Day 14 연습문제 정답</h1>

      <NavBar isLoggedIn={isLoggedIn} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginPage {...authProps} />} />
        <Route path="/dashboard" element={<DashboardPage {...authProps} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
