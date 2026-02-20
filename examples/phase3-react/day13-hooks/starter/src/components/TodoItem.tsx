import { Todo } from '../types/todo';

// TodoItem 컴포넌트의 Props 타입 정의
interface TodoItemProps {
  todo: Todo;                      // 할일 데이터
  onToggle: (id: number) => void;  // 완료 토글 핸들러
  onDelete: (id: number) => void;  // 삭제 핸들러
}

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className={`todo-item ${todo.done ? 'done' : ''}`}>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />
      <span className="todo-title">{todo.title}</span>
      <button className="delete-btn" onClick={() => onDelete(todo.id)}>
        삭제
      </button>
    </li>
  );
}

export default TodoItem;
