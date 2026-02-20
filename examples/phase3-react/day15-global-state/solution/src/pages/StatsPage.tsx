import { useTodos } from '../hooks/useTodos';
import { useNavigate } from 'react-router-dom';

// 통계 페이지 컴포넌트
// props 없이 useTodos() 훅으로 직접 데이터에 접근!
function StatsPage() {
  const navigate = useNavigate();
  // Context에서 todos 가져오기
  const { todos } = useTodos();

  // 통계 계산
  const total = todos.length;
  const done = todos.filter((todo) => todo.done).length;
  const pending = total - done;
  // 완료율 계산 (할일이 없으면 0%)
  const completionRate = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="page">
      <h2>통계</h2>

      {/* 통계 카드 */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>총 할일</h3>
          <p className="stat-number">{total}</p>
        </div>
        <div className="stat-card">
          <h3>완료</h3>
          <p className="stat-number done">{done}</p>
        </div>
        <div className="stat-card">
          <h3>미완료</h3>
          <p className="stat-number pending">{pending}</p>
        </div>
        <div className="stat-card">
          <h3>완료율</h3>
          <p className="stat-number">{completionRate}%</p>
        </div>
      </div>

      {/* 진행 바 */}
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${completionRate}%` }}
        />
      </div>
      <p className="progress-text">{completionRate}% 완료</p>

      {/* useNavigate를 사용하여 홈으로 이동 */}
      <button
        className="nav-button"
        onClick={() => navigate('/')}
      >
        할일 추가하러 가기
      </button>
    </div>
  );
}

export default StatsPage;
