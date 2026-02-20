import { useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { Todo } from './types/todo';

function App() {
  // useState로 할일 목록 상태 관리
  const [todos, setTodos] = useState<Todo[]>([]);
  // 다음 할일의 고유 ID를 관리
  const [nextId, setNextId] = useState(1);

  // 할일 추가 함수
  const handleAdd = (title: string) => {
    // 새 할일 객체를 만들어 기존 배열에 추가 (스프레드 연산자로 불변성 유지)
    setTodos([...todos, { id: nextId, title, done: false }]);
    setNextId(nextId + 1);
  };

  // 할일 삭제 함수
  const handleDelete = (id: number) => {
    // filter로 해당 id를 제외한 새 배열 생성
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // 할일 완료 토글 함수
  const handleToggle = (id: number) => {
    // map으로 해당 id의 done 값만 반전시킨 새 배열 생성
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  return (
    <div className="app">
      <h1>할일 관리</h1>
      <TodoForm onAdd={handleAdd} />
      <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
      {/* 할일 통계 표시 */}
      <div className="todo-stats">
        전체: {todos.length}개 | 완료: {todos.filter((t) => t.done).length}개 |
        미완료: {todos.filter((t) => !t.done).length}개
      </div>
    </div>
  );
}

export default App;
