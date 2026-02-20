import { useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import { Todo, FilterType } from './types/todo';

function App() {
  // 할일 목록 상태
  const [todos, setTodos] = useState<Todo[]>([]);
  // 다음 할일 ID
  const [nextId, setNextId] = useState(1);
  // 현재 필터 상태
  const [filter, setFilter] = useState<FilterType>('all');

  // 할일 추가 핸들러
  const handleAdd = (title: string) => {
    setTodos([...todos, { id: nextId, title, done: false }]);
    setNextId(nextId + 1);
  };

  // 할일 삭제 핸들러
  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // 할일 완료 토글 핸들러
  const handleToggle = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  // TODO: 필터링된 할일 목록 계산
  // filter 상태값에 따라 todos를 필터링하세요
  // - 'all': 전체 할일
  // - 'active': done이 false인 할일만
  // - 'completed': done이 true인 할일만
  // const filteredTodos = ...

  // TODO: 통계 계산
  // - 전체 할일 개수
  // - 완료된 할일 개수
  // - 미완료 할일 개수

  return (
    <div className="app">
      <h1>할일 관리</h1>
      <TodoForm onAdd={handleAdd} />

      {/* TODO: TodoFilter 컴포넌트를 추가하세요 */}
      {/* current에 현재 필터값을, onFilterChange에 setFilter를 전달하세요 */}

      {/* TODO: 통계를 표시하세요 */}
      {/* 예: "완료 2 / 전체 5" */}

      {/* TODO: 할일이 없을 때 "할일이 없습니다" 메시지를 표시하세요 (조건부 렌더링) */}
      {/* && 연산자를 사용해 보세요 */}

      {/* TODO: todos 대신 filteredTodos를 TodoList에 전달하세요 */}
      <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  );
}

export default App;
