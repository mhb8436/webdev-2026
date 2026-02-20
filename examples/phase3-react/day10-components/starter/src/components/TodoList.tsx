import { Todo } from '../types/todo';
import TodoItem from './TodoItem';

// TODO: TodoListProps 인터페이스 정의
// - todos: Todo[]
// - onToggle: (id: number) => void
// - onDelete: (id: number) => void

function TodoList(/* TODO: props 타입을 지정하세요 */) {
  return (
    <ul>
      {/* TODO: todos를 map()으로 순회하면서 TodoItem을 렌더링하세요 */}
      {/* 힌트: 각 TodoItem에 key, todo, onToggle, onDelete를 전달하세요 */}
    </ul>
  );
}

export default TodoList;
