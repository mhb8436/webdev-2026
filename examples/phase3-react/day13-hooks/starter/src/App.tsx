import { useState, useEffect, useRef } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import { Todo, FilterType } from './types/todo';

function App() {
  // TODO: localStorage에서 초기 데이터를 불러오도록 useState를 수정하세요
  // 힌트: useState에 함수를 전달하면 초기 렌더링 시에만 실행됩니다 (지연 초기화)
  // const [todos, setTodos] = useState<Todo[]>(() => {
  //   const saved = localStorage.getItem('todos');
  //   return saved ? JSON.parse(saved) : [];
  // });
  const [todos, setTodos] = useState<Todo[]>([]);

  // TODO: nextId도 localStorage에서 불러오도록 수정하세요
  const [nextId, setNextId] = useState(1);

  // 현재 필터 상태
  const [filter, setFilter] = useState<FilterType>('all');

  // TODO: useEffect로 todos가 변경될 때마다 localStorage에 저장하세요
  // useEffect(() => {
  //   localStorage.setItem('todos', JSON.stringify(todos));
  // }, [todos]);

  // TODO: useEffect로 nextId가 변경될 때마다 localStorage에 저장하세요
  // useEffect(() => {
  //   localStorage.setItem('nextId', String(nextId));
  // }, [nextId]);

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
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.done;
    if (filter === 'completed') return todo.done;
    return true;
  });

  // 통계 계산
  const totalCount = todos.length;
  const doneCount = todos.filter(todo => todo.done).length;

  return (
    <div className="app">
      <h1>할일 관리</h1>
      <TodoForm onAdd={handleAdd} />
      <TodoFilter current={filter} onFilterChange={setFilter} />

      {totalCount > 0 && (
        <p className="stats">
          완료 {doneCount} / 전체 {totalCount}
        </p>
      )}

      {filteredTodos.length === 0 ? (
        <p className="empty-message">
          {totalCount === 0 ? '할일이 없습니다' : '해당 조건의 할일이 없습니다'}
        </p>
      ) : (
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
