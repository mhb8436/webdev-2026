// TODO: useTodos 커스텀 훅 import
// import { useTodos } from '../hooks/useTodos';
import TodoList from '../components/TodoList';

// 완료된 할일 페이지 컴포넌트
// TODO: Context를 사용하면 props 없이 데이터에 접근 가능!
function CompletedPage() {
  // TODO: useTodos 훅으로 필요한 데이터와 함수 가져오기
  // const { todos, toggleTodo, deleteTodo } = useTodos();
  // const completedTodos = todos.filter((todo) => todo.done);

  return (
    <div className="page">
      <h2>완료된 할일</h2>
      {/* TODO: 완료된 할일 개수 표시 */}
      {/* TODO: TodoList 컴포넌트로 완료된 할일 렌더링 */}
      <p>useTodos() 훅을 구현하고 이 페이지를 완성하세요.</p>
    </div>
  );
}

export default CompletedPage;
