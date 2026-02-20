import { Todo } from '../types/todo';

// TODO: TodoItemProps 인터페이스 정의
// - todo: Todo
// - onToggle: (id: number) => void
// - onDelete: (id: number) => void

function TodoItem(/* TODO: props 타입을 지정하세요 */) {
  return (
    <li>
      {/* TODO: 체크박스 - 클릭하면 onToggle 호출 */}
      {/* TODO: 할일 텍스트 - done이면 취소선 표시 */}
      {/* TODO: 삭제 버튼 - 클릭하면 onDelete 호출 */}
    </li>
  );
}

export default TodoItem;
