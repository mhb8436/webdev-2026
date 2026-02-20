'use client';
// 클라이언트 컴포넌트 - useState, useEffect 등 React 훅 사용을 위해 'use client' 필요
// React Phase에서 만든 할일 앱 로직을 Next.js로 마이그레이션한 결과

import { useState, useEffect } from 'react';

// 할일 타입 정의
interface Todo {
  id: number;
  title: string;
  done: boolean;
}

// localStorage 키 상수
const STORAGE_KEY = 'nextjs-todos';

export default function TodoApp() {
  // 할일 목록 상태 관리
  const [todos, setTodos] = useState<Todo[]>([]);
  // 새 할일 입력값 상태
  const [input, setInput] = useState('');
  // localStorage 초기 로딩 완료 여부 (hydration 이슈 방지)
  const [isLoaded, setIsLoaded] = useState(false);

  // 컴포넌트 마운트 시 localStorage에서 할일 불러오기
  // Next.js에서는 서버에서 먼저 렌더링되므로 useEffect 안에서 localStorage 접근
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setTodos(JSON.parse(saved));
      } catch {
        // JSON 파싱 실패 시 빈 배열 유지
        console.error('localStorage 데이터 파싱 실패');
      }
    }
    setIsLoaded(true);
  }, []);

  // todos가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos, isLoaded]);

  // 할일 추가 함수
  const addTodo = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const newTodo: Todo = {
      id: Date.now(), // 고유 ID로 현재 타임스탬프 사용
      title: trimmed,
      done: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setInput(''); // 입력 필드 초기화
  };

  // 할일 삭제 함수
  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // 할일 완료 토글 함수
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

  // localStorage 로딩 전에는 로딩 표시 (hydration 불일치 방지)
  if (!isLoaded) {
    return <div className="empty-message">불러오는 중...</div>;
  }

  return (
    <div>
      {/* 할일 입력 폼 */}
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

      {/* 할일 목록 */}
      {todos.length === 0 ? (
        <p className="empty-message">할일이 없습니다. 새 할일을 추가해보세요!</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className={`todo-item ${todo.done ? 'done' : ''}`}>
              <input
                type="checkbox"
                className="todo-checkbox"
                checked={todo.done}
                onChange={() => toggleTodo(todo.id)}
              />
              <span
                className="todo-title"
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.title}
              </span>
              <button
                className="todo-delete"
                onClick={() => deleteTodo(todo.id)}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
