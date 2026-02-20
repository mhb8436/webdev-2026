'use client';
// 개별 할일 항목 컴포넌트
// 체크박스, 제목, 삭제 버튼으로 구성

interface Todo {
  id: number;
  title: string;
  done: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className={`todo-item ${todo.done ? 'done' : ''}`}>
      {/* 완료 체크박스 */}
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />
      {/* 할일 제목 - 클릭으로도 토글 가능 */}
      <span className="todo-title" onClick={() => onToggle(todo.id)}>
        {todo.title}
      </span>
      {/* 삭제 버튼 */}
      <button className="todo-delete" onClick={() => onDelete(todo.id)}>
        삭제
      </button>
    </li>
  );
}
