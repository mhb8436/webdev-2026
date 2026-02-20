// Day 14 연습문제 - React Router
// 아래 주석을 읽고 각 문제를 구현하세요.
// react-router-dom 설치 필요: npm install react-router-dom

// 필요한 import 예시:
// import { BrowserRouter, Routes, Route, Link, NavLink, useParams, useNavigate } from 'react-router-dom';

// ============================================
// 문제 1: 미니 블로그
// ============================================
// 라우팅 구조:
//   / : 홈 페이지 (블로그 소개)
//   /posts : 글 목록 페이지
//   /posts/:id : 글 상세 페이지
//   /about : 소개 페이지
//
// - 글 데이터 배열을 만드세요 (id, title, content, date)
// - 글 목록에서 클릭 시 상세 페이지로 이동 (Link 사용)
// - useParams로 id를 가져와서 해당 글 표시
// - 존재하지 않는 id 처리

// ============================================
// 문제 2: 네비게이션 바
// ============================================
// - NavLink로 네비게이션 바를 만드세요
// - isActive를 사용하여 현재 페이지 링크 하이라이트
// - Route path="*"로 404 페이지 만들기
// - 404 페이지에 홈으로 돌아가기 링크 포함

// ============================================
// 문제 3: 로그인 시뮬레이션
// ============================================
// - useState로 isLoggedIn 상태 관리
// - /login : 로그인 페이지 (이름 입력 + 로그인 버튼)
// - /dashboard : 대시보드 (로그인 필요)
// - 비로그인 시 /dashboard 접근 → /login으로 리다이렉트
// - 로그인 시 /login 접근 → /dashboard로 리다이렉트
// - useNavigate로 프로그래밍 방식 페이지 이동

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Day 14 연습문제</h1>
      <p>react-router-dom을 설치하고 라우팅을 구현하세요.</p>
      <p>BrowserRouter로 App을 감싸는 것은 main.tsx에서 해야 합니다.</p>

      {/* 문제 2: 네비게이션 바를 여기에 만드세요 */}

      {/* Routes를 만들고 각 Route를 정의하세요 */}
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes> */}
    </div>
  );
}

export default App;
