import { Todo } from '../types/todo';
import { useTodos } from '../hooks/useTodos';

// 할일 항목 컴포넌트의 props 타입
// todo 객체만 props로 받고, 핸들러는 Context에서 가져옴
interface TodoItemProps {
  todo: Todo;
}

// 개별 할일 항목 컴포넌트
function TodoItem({ todo }: TodoItemProps) {
  // Context에서 토글과 삭제 함수 가져오기
  const { toggleTodo, deleteTodo } = useTodos();

  return (
    <li className={`todo-item ${todo.done ? 'done' : ''}`}>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => toggleTodo(todo.id)}
      />
      <span className="todo-title">{todo.title}</span>
      <button onClick={() => deleteTodo(todo.id)} className="delete-button">
        삭제
      </button>
    </li>
  );
}

export default TodoItem;
