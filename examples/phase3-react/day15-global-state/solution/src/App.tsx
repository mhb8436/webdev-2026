import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CompletedPage from './pages/CompletedPage';
import StatsPage from './pages/StatsPage';

// App 컴포넌트 - 라우팅만 담당 (깔끔!)
// Context API 덕분에 상태 관리 코드가 전혀 없음
// 모든 상태는 TodoContext에서 관리하고,
// 각 페이지는 useTodos() 훅으로 직접 데이터에 접근
function App() {
  return (
    <div className="app">
      <Navbar />

      {/* Routes: URL 경로에 따라 다른 페이지 렌더링 */}
      {/* props를 전달할 필요 없음! 각 페이지에서 useTodos() 사용 */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/completed" element={<CompletedPage />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </div>
  );
}

export default App;
