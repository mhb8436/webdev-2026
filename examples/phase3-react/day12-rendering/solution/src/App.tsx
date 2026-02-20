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

  // 필터링된 할일 목록 계산
  // filter()를 사용하여 현재 필터 상태에 맞는 할일만 반환
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.done;      // 미완료만 표시
    if (filter === 'completed') return todo.done;     // 완료만 표시
    return true;                                       // 전체 표시
  });

  // 통계 계산
  const totalCount = todos.length;                           // 전체 할일 수
  const doneCount = todos.filter(todo => todo.done).length;  // 완료된 할일 수

  return (
    <div className="app">
      <h1>할일 관리</h1>
      <TodoForm onAdd={handleAdd} />

      {/* 필터 버튼 */}
      <TodoFilter current={filter} onFilterChange={setFilter} />

      {/* 통계 표시: 할일이 있을 때만 보여줌 */}
      {totalCount > 0 && (
        <p className="stats">
          완료 {doneCount} / 전체 {totalCount}
        </p>
      )}

      {/* 조건부 렌더링: 필터링된 할일이 없을 때 메시지 표시 */}
      {filteredTodos.length === 0 ? (
        <p className="empty-message">
          {totalCount === 0 ? '할일이 없습니다' : '해당 조건의 할일이 없습니다'}
        </p>
      ) : (
        /* 필터링된 할일 목록 렌더링 */
        <TodoList
          todos={filteredTodos}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default App;
