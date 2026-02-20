'use client';
// 할일 관리 메인 컴포넌트
// filter prop으로 표시할 할일 종류를 결정

import { useState, useEffect } from 'react';
import TodoList from './TodoList';

// 할일 타입 정의
interface Todo {
  id: number;
  title: string;
  done: boolean;
}

// 필터 타입: 전체, 미완료, 완료
type FilterType = 'all' | 'active' | 'completed';

interface TodoAppProps {
  filter?: FilterType;
}

const STORAGE_KEY = 'nextjs-todos';

export default function TodoApp({ filter = 'all' }: TodoAppProps) {
  // 할일 목록 상태
  const [todos, setTodos] = useState<Todo[]>([]);
  // 새 할일 입력값
  const [input, setInput] = useState('');
  // localStorage 로딩 완료 여부
  const [isLoaded, setIsLoaded] = useState(false);

  // 컴포넌트 마운트 시 localStorage에서 불러오기
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setTodos(JSON.parse(saved));
      } catch {
        console.error('localStorage 데이터 파싱 실패');
      }
    }
    setIsLoaded(true);
  }, []);

  // todos 변경 시 localStorage에 저장
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos, isLoaded]);

  // 필터에 따라 할일 목록 필터링
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.done;
    if (filter === 'completed') return todo.done;
    return true; // 'all'
  });

  // 할일 추가
  const addTodo = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const newTodo: Todo = {
      id: Date.now(),
      title: trimmed,
      done: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setInput('');
  };

  // 할일 삭제
  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // 할일 완료 토글
  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  // Enter 키로 할일 추가
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  // 로딩 중 표시
  if (!isLoaded) {
    return <div className="empty-message">불러오는 중...</div>;
  }

  return (
    <div>
      {/* 전체 보기(메인 페이지)에서만 입력 폼 표시 */}
      {filter === 'all' && (
        <div className="todo-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="새 할일을 입력하세요"
          />
          <button onClick={addTodo}>추가</button>
        </div>
      )}

      {/* 필터링된 할일 목록 */}
      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </div>
  );
}
