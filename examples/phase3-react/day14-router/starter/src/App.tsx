import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Todo } from './types/todo';
import Navbar from './components/Navbar';
// TODO: 페이지 컴포넌트 import
// import HomePage from './pages/HomePage';
// import CompletedPage from './pages/CompletedPage';
// import StatsPage from './pages/StatsPage';

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

      {/* TODO: Routes 설정하기 */}
      {/* 힌트: <Routes> 안에 <Route>를 넣어서 경로별 페이지를 연결합니다 */}
      {/*
      <Routes>
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
        <Route
          path="/stats"
          element={<StatsPage todos={todos} />}
        />
      </Routes>
      */}

      {/* 임시: Routes 설정 전까지 모든 할일 표시 */}
      <div className="container">
        <h2>할일 목록 (Routes 설정 전)</h2>
        <p>페이지 컴포넌트와 Routes를 설정하세요.</p>
        <p>현재 할일 수: {todos.length}개</p>
      </div>
    </div>
  );
}

export default App;
