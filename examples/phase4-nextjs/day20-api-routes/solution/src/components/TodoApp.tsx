'use client';

// 할일 앱 메인 컴포넌트 (클라이언트 컴포넌트)
// localStorage 대신 API Route(/api/todos)를 사용하여 서버와 통신합니다
// 이로써 Next.js 내에서 풀스택 구조가 완성됩니다

import { useState, useEffect, useCallback } from 'react';
import { Todo } from '@/types/todo';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // API에서 할일 목록을 가져오는 함수
  const fetchTodos = useCallback(async () => {
    try {
      setError(null);
      const response = await fetch('/api/todos');

      if (!response.ok) {
        throw new Error('할일 목록을 가져오는데 실패했습니다');
      }

      const data = await response.json();
      setTodos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 컴포넌트 마운트 시 API에서 할일 불러오기
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // 할일 추가 - POST /api/todos
  const handleAdd = async (title: string) => {
    try {
      setError(null);
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error('할일 추가에 실패했습니다');
      }

      const newTodo = await response.json();
      // 서버에서 반환된 할일을 상태에 추가
      setTodos((prev) => [...prev, newTodo]);
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다');
    }
  };

  // 할일 완료/미완료 토글 - PUT /api/todos/:id
  const handleToggle = async (id: string) => {
    try {
      setError(null);
      // 현재 상태의 반대값을 서버에 전송
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;

      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !todo.completed }),
      });

      if (!response.ok) {
        throw new Error('할일 수정에 실패했습니다');
      }

      const updatedTodo = await response.json();
      // 서버에서 반환된 수정된 할일로 상태 업데이트
      setTodos((prev) =>
        prev.map((t) => (t.id === updatedTodo.id ? updatedTodo : t))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다');
    }
  };

  // 할일 삭제 - DELETE /api/todos/:id
  const handleDelete = async (id: string) => {
    try {
      setError(null);
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('할일 삭제에 실패했습니다');
      }

      // 삭제 성공 시 상태에서 제거
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다');
    }
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
      {/* 에러 메시지 표시 */}
      {error && <div className="error-message">{error}</div>}
      <TodoForm onAdd={handleAdd} />
      <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
      <p style={{ textAlign: 'center', color: '#999', marginTop: '1rem', fontSize: '0.85rem' }}>
        API Route (/api/todos)를 통해 서버와 통신합니다
      </p>
    </div>
  );
}
