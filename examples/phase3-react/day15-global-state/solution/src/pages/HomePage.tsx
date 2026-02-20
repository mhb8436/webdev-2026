import { useTodos } from '../hooks/useTodos';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import TodoFilter from '../components/TodoFilter';

// 홈 페이지 컴포넌트
// props 없이 useTodos() 훅으로 직접 데이터에 접근!
function HomePage() {
  // Context에서 필요한 데이터 가져오기
  const { todos, filteredTodos } = useTodos();

  return (
    <div className="page">
      <h2>할일 목록</h2>

      {/* 할일 추가 폼 (내부에서 useTodos의 addTodo 사용) */}
      <TodoForm />

      {/* 필터 버튼 (내부에서 useTodos의 filter, setFilter 사용) */}
      <TodoFilter />

      {/* 할일 수 표시 */}
      <p className="todo-count">
        전체: {todos.length}개 | 완료: {todos.filter((t) => t.done).length}개 |
        미완료: {todos.filter((t) => !t.done).length}개
      </p>

      {/* 필터링된 할일 목록 */}
      <TodoList todos={filteredTodos} />
    </div>
  );
}

export default HomePage;
