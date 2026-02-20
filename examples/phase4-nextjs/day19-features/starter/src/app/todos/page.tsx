// 할일 목록 페이지 (서버 컴포넌트)
import { getTodos } from '@/lib/todos';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '할일 목록',
};

export default function TodosPage() {
  // 서버에서 할일 목록 가져오기
  const todos = getTodos();

  return (
    <div className="todo-app">
      <h1>할일 목록</h1>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-item ${todo.completed ? 'completed' : ''}`}
          >
            <input type="checkbox" checked={todo.completed} readOnly />
            <span>
              <Link href={`/todos/${todo.id}`}>{todo.title}</Link>
            </span>
          </li>
        ))}
      </ul>
      {todos.length === 0 && (
        <p style={{ textAlign: 'center', color: '#999' }}>할일이 없습니다.</p>
      )}
    </div>
  );
}
