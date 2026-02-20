import { Todo } from '../types/todo';
import TodoItem from './TodoItem';

// 할일 목록 컴포넌트의 props 타입
// todos 배열만 받으면 됨 (핸들러는 TodoItem에서 Context로 직접 접근)
interface TodoListProps {
  todos: Todo[];
}

// 할일 목록 컴포넌트
function TodoList({ todos }: TodoListProps) {
  if (todos.length === 0) {
    return <p className="empty-message">할일이 없습니다.</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

export default TodoList;
