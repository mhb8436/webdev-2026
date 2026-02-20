'use client';

// 할일 앱 메인 컴포넌트 (클라이언트 컴포넌트)
import { useState, useEffect } from 'react';
import { Todo } from '@/types/todo';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // 컴포넌트 마운트 시 localStorage에서 할일 불러오기
  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);

  // 할일 변경 시 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // 할일 추가
  const handleAdd = (title: string) => {
    const newTodo: Todo = {
      id: String(Date.now()),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  // 할일 완료/미완료 토글
  const handleToggle = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 할일 삭제
  const handleDelete = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-app">
      <h1>할일 관리</h1>
      <TodoForm onAdd={handleAdd} />
      <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  );
}
