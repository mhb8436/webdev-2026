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
      {/* TODO: TodoForm 컴포넌트 렌더링 */}
      {/* TODO: TodoList 컴포넌트로 전체 할일 목록 렌더링 */}
    </div>
  );
}

export default HomePage;
