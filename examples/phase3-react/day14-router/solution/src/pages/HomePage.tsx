import { Todo } from '../types/todo';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';

// 홈 페이지 props 타입
interface HomePageProps {
  todos: Todo[];
  onAdd: (title: string) => void;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

// 홈 페이지 컴포넌트 - 전체 할일 목록과 추가 폼
function HomePage({ todos, onAdd, onToggle, onDelete }: HomePageProps) {
  return (
    <div className="page">
      <h2>할일 목록</h2>

      {/* 할일 추가 폼 */}
      <TodoForm onAdd={onAdd} />

      {/* 전체 할일 수 표시 */}
      <p className="todo-count">
        전체: {todos.length}개 | 완료: {todos.filter((t) => t.done).length}개 |
        미완료: {todos.filter((t) => !t.done).length}개
      </p>

      {/* 할일 목록 */}
      <TodoList todos={todos} onToggle={onToggle} onDelete={onDelete} />
    </div>
  );
}

export default HomePage;
