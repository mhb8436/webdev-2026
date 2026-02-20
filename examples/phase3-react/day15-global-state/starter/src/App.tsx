import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
// TODO: 페이지 컴포넌트 import
// import HomePage from './pages/HomePage';
// import CompletedPage from './pages/CompletedPage';
// import StatsPage from './pages/StatsPage';

// App 컴포넌트 - Context API를 사용하면 여기서 상태 관리할 필요 없음!
// Day 14에서는 여기서 todos 상태와 핸들러를 관리했지만,
// Day 15에서는 TodoContext로 옮겨서 App은 라우팅만 담당합니다.
function App() {
  return (
    <div className="app">
      <Navbar />

      {/* TODO: Routes 설정 */}
      {/* Context를 사용하므로 페이지에 props를 전달할 필요 없음! */}
      {/*
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/completed" element={<CompletedPage />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
      */}

      {/* 임시: Context 설정 전 메시지 */}
      <div className="container">
        <h2>Todo 앱 - Context API</h2>
        <p>TodoContext, useTodos 훅, 페이지 컴포넌트를 완성하세요.</p>
        <p>Context를 사용하면 props 없이 데이터를 공유할 수 있습니다!</p>
      </div>
    </div>
  );
}

export default App;
