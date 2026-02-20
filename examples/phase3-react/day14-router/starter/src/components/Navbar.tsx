import { Link } from 'react-router-dom';

// 네비게이션 바 컴포넌트
function Navbar() {
  return (
    <nav className="navbar">
      <h1>Todo 앱</h1>
      <div className="nav-links">
        {/* TODO: Link 컴포넌트를 사용하여 네비게이션 만들기 */}
        {/* 힌트: <Link to="경로">텍스트</Link> 형태로 작성합니다 */}
        {/* 1. 홈 (/) */}
        {/* 2. 완료 목록 (/completed) */}
        {/* 3. 통계 (/stats) */}
      </div>
    </nav>
  );
}

export default Navbar;
