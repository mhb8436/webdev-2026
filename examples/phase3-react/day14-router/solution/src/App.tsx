import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Todo } from './types/todo';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CompletedPage from './pages/CompletedPage';
import StatsPage from './pages/StatsPage';

function App() {
  // localStorage에서 할일 목록을 불러와서 초기값으로 설정
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  // todos가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // 할일 추가 핸들러
  const handleAdd = (title: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      done: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  // 할일 완료/미완료 토글 핸들러
  const handleToggle = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  // 할일 삭제 핸들러
  const handleDelete = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="app">
      <Navbar />

      {/* Routes: URL 경로에 따라 다른 페이지 컴포넌트를 렌더링 */}
      <Routes>
        {/* 홈 페이지: 전체 할일 목록 + 추가 폼 */}
        <Route
          path="/"
          element={
            <HomePage
              todos={todos}
              onAdd={handleAdd}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          }
        />
        {/* 완료 목록 페이지: 완료된 할일만 표시 */}
        <Route
          path="/completed"
          element={
            <CompletedPage
              todos={todos}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          }
        />
        {/* 통계 페이지: 할일 통계 표시 */}
        <Route
          path="/stats"
          element={<StatsPage todos={todos} />}
        />
      </Routes>
    </div>
  );
}

export default App;
