import { Todo } from '../types/todo';
import TodoList from '../components/TodoList';

// 완료 페이지 props 타입
interface CompletedPageProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

// 완료된 할일 페이지 컴포넌트
function CompletedPage({ todos, onToggle, onDelete }: CompletedPageProps) {
  // TODO: 완료된 할일만 필터링
  // 힌트: todos.filter()를 사용하세요

  return (
    <div className="page">
      <h2>완료된 할일</h2>
      {/* TODO: 완료된 할일 개수 표시 */}
      {/* TODO: TodoList 컴포넌트로 완료된 할일만 렌더링 */}
    </div>
  );
}

export default CompletedPage;
