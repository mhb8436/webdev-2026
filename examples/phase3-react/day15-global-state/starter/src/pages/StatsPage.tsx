// TODO: useTodos 커스텀 훅 import
// import { useTodos } from '../hooks/useTodos';
import { useNavigate } from 'react-router-dom';

// 통계 페이지 컴포넌트
// TODO: Context를 사용하면 props 없이 데이터에 접근 가능!
function StatsPage() {
  const navigate = useNavigate();

  // TODO: useTodos 훅으로 todos 가져오기
  // const { todos } = useTodos();

  // TODO: 통계 계산
  // const total = todos.length;
  // const done = todos.filter((todo) => todo.done).length;
  // const pending = total - done;
  // const completionRate = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="page">
      <h2>통계</h2>
      {/* TODO: 통계 카드 표시 */}
      {/* TODO: 진행 바 표시 */}
      <p>useTodos() 훅을 구현하고 이 페이지를 완성하세요.</p>

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
