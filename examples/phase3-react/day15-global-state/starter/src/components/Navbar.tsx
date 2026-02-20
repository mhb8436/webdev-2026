import { NavLink } from 'react-router-dom';

// 네비게이션 바 컴포넌트
function Navbar() {
  return (
    <nav className="navbar">
      <h1>Todo 앱</h1>
      <div className="nav-links">
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
