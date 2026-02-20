'use client';

// 할일 앱 메인 컴포넌트 (클라이언트 컴포넌트)
// TODO: localStorage 대신 API Route를 사용하여 데이터를 관리하세요
// fetch('/api/todos')로 서버의 데이터를 가져오고, POST/PUT/DELETE로 수정합니다

import { useState, useEffect } from 'react';
import { Todo } from '@/types/todo';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // TODO: 컴포넌트 마운트 시 API에서 할일 불러오기
  // 현재는 localStorage를 사용하고 있습니다
  // fetch('/api/todos')를 사용하도록 변경하세요
  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      setTodos(JSON.parse(saved));
    }
    setIsLoading(false);
  }, []);

  // 할일 변경 시 localStorage에 저장 (TODO: API 연동 후 제거)
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, isLoading]);

  // TODO: 할일 추가 - POST /api/todos 호출로 변경
  const handleAdd = (title: string) => {
    const newTodo: Todo = {
      id: String(Date.now()),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  // TODO: 할일 토글 - PUT /api/todos/:id 호출로 변경
  const handleToggle = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // TODO: 할일 삭제 - DELETE /api/todos/:id 호출로 변경
  const handleDelete = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // 로딩 상태 표시
  if (isLoading) {
    return (
      <div className="todo-app">
        <div className="loading">
          <div className="spinner"></div>
          <p className="loading-text">할일을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="todo-app">
      <h1>할일 관리</h1>
      <TodoForm onAdd={handleAdd} />
      <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  );
}
