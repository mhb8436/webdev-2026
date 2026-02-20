import { Todo } from '../types/todo';
import TodoItem from './TodoItem';

// TodoList 컴포넌트의 Props 타입 정의
interface TodoListProps {
  todos: Todo[];                    // 할일 목록
  onToggle: (id: number) => void;   // 완료 토글 핸들러
  onDelete: (id: number) => void;   // 삭제 핸들러
}

function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  return (
    <ul className="todo-list">
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
