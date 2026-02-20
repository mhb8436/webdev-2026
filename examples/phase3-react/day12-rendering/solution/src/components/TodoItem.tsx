import { Todo } from '../types/todo';

// TodoItem 컴포넌트의 Props 타입 정의
interface TodoItemProps {
  todo: Todo;                      // 할일 데이터
  onToggle: (id: number) => void;  // 완료 토글 핸들러
  onDelete: (id: number) => void;  // 삭제 핸들러
}

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    // 완료 상태에 따라 'done' 클래스 추가 (조건부 클래스)
    <li className={`todo-item ${todo.done ? 'done' : ''}`}>
      {/* 체크박스: 완료 상태 토글 */}
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />
      {/* 할일 제목: 완료 시 CSS로 취소선 적용됨 */}
      <span className="todo-title">{todo.title}</span>
      {/* 삭제 버튼 */}
      <button className="delete-btn" onClick={() => onDelete(todo.id)}>
        삭제
      </button>
    </li>
  );
}

export default TodoItem;
