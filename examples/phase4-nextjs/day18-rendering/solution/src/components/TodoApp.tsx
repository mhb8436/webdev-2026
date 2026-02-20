'use client';
// 할일 관리 메인 클라이언트 컴포넌트
// 서버에서 받은 초기 데이터(initialTodos)를 props로 받아 상태 관리
// 이후 인터랙션은 클라이언트에서 처리

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Todo } from '@/types/todo';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

interface TodoAppProps {
  initialTodos: Todo[];  // 서버에서 전달받은 초기 데이터
  showForm?: boolean;    // 입력 폼 표시 여부
}

export default function TodoApp({ initialTodos, showForm = true }: TodoAppProps) {
  // 서버에서 받은 데이터로 상태 초기화
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const router = useRouter();

  // 할일 추가 - 클라이언트 상태 업데이트
  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      done: false,
    };
    setTodos((prev) => [...prev, newTodo]);

    // 서버 데이터도 업데이트하기 위해 페이지 새로고침
    // (Day 19에서 Server Actions로 개선 예정)
    // router.refresh();
  };

  // 할일 완료 토글
  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  // 할일 삭제
  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      {/* 입력 폼 - showForm이 true일 때만 표시 */}
      {showForm && <TodoForm onAdd={addTodo} />}

      {/* 할일 목록 */}
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />

      {/* 컴포넌트 타입 표시 (학습용) */}
      <p className="data-source">
        <span className="component-badge badge-client">클라이언트 컴포넌트</span>
        인터랙션 (추가/삭제/토글) 처리
      </p>
    </div>
  );
}
