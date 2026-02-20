import { Todo } from '../types/todo';
import TodoList from '../components/TodoList';
import { useNavigate } from 'react-router-dom';

// 완료 페이지 props 타입
interface CompletedPageProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

// 완료된 할일 페이지 컴포넌트
function CompletedPage({ todos, onToggle, onDelete }: CompletedPageProps) {
  const navigate = useNavigate();

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
      <TodoList
        todos={completedTodos}
        onToggle={onToggle}
        onDelete={onDelete}
      />

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
