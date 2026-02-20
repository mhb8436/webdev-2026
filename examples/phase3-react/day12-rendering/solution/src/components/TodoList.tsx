import { Todo } from '../types/todo';
import TodoItem from './TodoItem';

// TodoList 컴포넌트의 Props 타입 정의
interface TodoListProps {
  todos: Todo[];                    // 할일 목록 (필터링된 결과)
  onToggle: (id: number) => void;   // 완료 토글 핸들러
  onDelete: (id: number) => void;   // 삭제 핸들러
}

function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  return (
    <ul className="todo-list">
      {/* 할일 목록을 순회하며 TodoItem 렌더링 */}
      {/* key에 고유한 id를 사용하여 React가 효율적으로 업데이트할 수 있게 함 */}
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TodoList;
