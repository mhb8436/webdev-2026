// TODO: useTodos 커스텀 훅 import
// import { useTodos } from '../hooks/useTodos';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import TodoFilter from '../components/TodoFilter';

// 홈 페이지 컴포넌트
// TODO: Context를 사용하면 props가 필요 없습니다!
// useTodos() 훅으로 직접 데이터에 접근하세요.
function HomePage() {
  // TODO: useTodos 훅으로 필요한 데이터와 함수 가져오기
  // const { todos, filter, filteredTodos, addTodo, toggleTodo, deleteTodo, setFilter } = useTodos();

  return (
    <div className="page">
      <h2>할일 목록</h2>
      {/* TODO: TodoFilter 컴포넌트 */}
      {/* TODO: TodoForm 컴포넌트 */}
      {/* TODO: TodoList 컴포넌트 (filteredTodos 사용) */}
      <p>useTodos() 훅을 구현하고 이 페이지를 완성하세요.</p>
    </div>
  );
}

export default HomePage;
