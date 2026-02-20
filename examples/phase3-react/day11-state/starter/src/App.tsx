import { useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { Todo } from './types/todo';

function App() {
  // TODO: useState로 todos 상태 관리
  // const [todos, setTodos] = useState<Todo[]>([]);
  // const [nextId, setNextId] = useState(1);

  // TODO: 할일 추가 함수
  const handleAdd = (title: string) => {
    // TODO: 새 할일을 todos에 추가
    // 힌트: setTodos([...todos, { id: nextId, title, done: false }]);
    // 힌트: setNextId(nextId + 1);
  };

  // TODO: 할일 삭제 함수
  const handleDelete = (id: number) => {
    // TODO: todos에서 해당 id 제거
    // 힌트: setTodos(todos.filter(todo => todo.id !== id));
  };

  // TODO: 할일 완료 토글 함수
  const handleToggle = (id: number) => {
    // TODO: done 상태 반전
    // 힌트: setTodos(todos.map(todo =>
    //   todo.id === id ? { ...todo, done: !todo.done } : todo
    // ));
  };

  return (
    <div className="app">
      <h1>할일 관리</h1>
      {/* TODO: 아래 주석을 해제하세요 */}
      {/* <TodoForm onAdd={handleAdd} /> */}
      {/* <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} /> */}
    </div>
  );
}

export default App;
