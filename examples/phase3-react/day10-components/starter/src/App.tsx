import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { Todo } from './types/todo';

function App() {
  // 할일 목록 데이터 (하드코딩)
  const todos: Todo[] = [
    { id: 1, title: '리액트 배우기', done: false },
    { id: 2, title: 'TypeScript 익히기', done: true },
    { id: 3, title: '할일 앱 만들기', done: false },
  ];

  // 할일 추가 핸들러 (아직 동작하지 않음 - Day 11에서 구현)
  const handleAdd = (title: string) => {
    console.log('추가:', title);
  };

  // 할일 완료 토글 핸들러 (아직 동작하지 않음)
  const handleToggle = (id: number) => {
    console.log('토글:', id);
  };

  // 할일 삭제 핸들러 (아직 동작하지 않음)
  const handleDelete = (id: number) => {
    console.log('삭제:', id);
  };

  return (
    <div className="app">
      <h1>할일 관리</h1>
      <TodoForm onAdd={handleAdd} />
      <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  );
}

export default App;
