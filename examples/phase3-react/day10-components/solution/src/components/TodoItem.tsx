import { Todo } from '../types/todo';

// TodoItem 컴포넌트의 Props 인터페이스
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

// 개별 할일 항목을 렌더링하는 컴포넌트
function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li>
      {/* 완료 여부를 토글하는 체크박스 */}
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />
      {/* 할일 텍스트 - 완료 시 취소선 표시 */}
      <span className={todo.done ? 'todo-text done' : 'todo-text'}>
        {todo.title}
      </span>
      {/* 삭제 버튼 */}
      <button className="delete-btn" onClick={() => onDelete(todo.id)}>
        삭제
      </button>
    </li>
  );
}

export default TodoItem;
