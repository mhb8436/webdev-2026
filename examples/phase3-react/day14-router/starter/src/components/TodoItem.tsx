import { Todo } from '../types/todo';

// 할일 항목 컴포넌트의 props 타입
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

// 개별 할일 항목 컴포넌트
function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className={`todo-item ${todo.done ? 'done' : ''}`}>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />
      <span className="todo-title">{todo.title}</span>
      <button onClick={() => onDelete(todo.id)} className="delete-button">
        삭제
      </button>
    </li>
  );
}

export default TodoItem;
