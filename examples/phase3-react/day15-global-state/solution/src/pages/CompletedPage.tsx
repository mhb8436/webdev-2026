import { useTodos } from '../hooks/useTodos';
import TodoList from '../components/TodoList';
import { useNavigate } from 'react-router-dom';

// 완료된 할일 페이지 컴포넌트
// props 없이 useTodos() 훅으로 직접 데이터에 접근!
function CompletedPage() {
  const navigate = useNavigate();
  // Context에서 todos 가져오기
  const { todos } = useTodos();

  // 완료된 할일만 필터링
  const completedTodos = todos.filter((todo) => todo.done);

  return (
    <div className="page">
      <h2>완료된 할일</h2>

      {/* 완료된 할일 개수 표시 */}
      <p className="todo-count">
        총 {completedTodos.length}개의 할일을 완료했습니다.
      </p>

      {/* 완료된 할일 목록 */}
      <TodoList todos={completedTodos} />

      {/* 홈으로 돌아가기 버튼 */}
      <button
        className="nav-button"
        onClick={() => navigate('/')}
      >
        홈으로 돌아가기
      </button>
    </div>
  );
}

export default CompletedPage;
