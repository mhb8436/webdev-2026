import { NavLink } from 'react-router-dom';

// 네비게이션 바 컴포넌트
// NavLink를 사용하면 현재 경로와 일치할 때 자동으로 active 클래스가 추가됨
function Navbar() {
  return (
    <nav className="navbar">
      <h1>Todo 앱</h1>
      <div className="nav-links">
        {/* NavLink: 현재 경로와 일치하면 isActive가 true */}
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          홈
        </NavLink>
        <NavLink
          to="/completed"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          완료 목록
        </NavLink>
        <NavLink
          to="/stats"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          통계
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
