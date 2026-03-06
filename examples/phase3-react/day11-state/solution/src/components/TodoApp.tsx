// ============================================
// Day 11 - React 할일 앱 (풀이)
// ============================================

import { useState } from 'react';

interface Todo {
  id: number;
  title: string;
  done: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [nextId, setNextId] = useState(1);

  // 할일 추가
  const handleAdd = () => {
    if (!input.trim()) return;
    setTodos([...todos, { id: nextId, title: input.trim(), done: false }]);
    setNextId(nextId + 1);
    setInput('');
  };

  // Enter 키 처리
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAdd();
  };

  // 완료 토글
  const handleToggle = (id: number) => {
    setTodos(todos.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    ));
  };

  // 삭제
  const handleDelete = (id: number) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const completed = todos.filter(t => t.done).length;

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 20 }}>
      <h1>React 할일 앱</h1>

      {/* 입력 폼 */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="할일을 입력하세요"
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={handleAdd} style={{ padding: '8px 16px' }}>
          추가
        </button>
      </div>

      {/* 통계 */}
      <p>
        전체: {todos.length}개 | 완료: {completed}개 | 남은 것: {todos.length - completed}개
      </p>

      {/* 할일 목록 */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li
            key={todo.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 0',
              borderBottom: '1px solid #eee',
            }}
          >
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => handleToggle(todo.id)}
            />
            <span style={{
              flex: 1,
              textDecoration: todo.done ? 'line-through' : 'none',
              color: todo.done ? '#999' : '#333',
            }}>
              {todo.title}
            </span>
            <button
              onClick={() => handleDelete(todo.id)}
              style={{ color: 'red', border: 'none', cursor: 'pointer' }}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <p style={{ color: '#999', textAlign: 'center' }}>
          할일이 없습니다. 위에서 추가해보세요!
        </p>
      )}
    </div>
  );
}
