// 할일 목록 페이지 (서버 컴포넌트)
import { getTodos } from '@/lib/todos';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '할일 목록',
};

export default function TodosPage() {
  const todos = getTodos();

  return (
    <div className="todo-app">
      <h1>할일 목록 (서버 렌더링)</h1>
      <p style={{ color: '#666', marginBottom: '1rem', fontSize: '0.9rem' }}>
        이 페이지는 서버에서 렌더링됩니다. 홈 페이지에서 API Route를 통한 CRUD를 체험하세요.
      </p>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-item ${todo.completed ? 'completed' : ''}`}
          >
            <input type="checkbox" checked={todo.completed} readOnly />
            <span>{todo.title}</span>
          </li>
        ))}
      </ul>
      {todos.length === 0 && (
        <p style={{ textAlign: 'center', color: '#999' }}>할일이 없습니다.</p>
      )}
    </div>
  );
}
