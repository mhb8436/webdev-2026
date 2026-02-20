// 완료된 할일 페이지 (서버 컴포넌트)
import { getCompletedTodos } from '@/lib/todos';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '완료된 할일',
};

export default function CompletedPage() {
  const completedTodos = getCompletedTodos();

  return (
    <div className="todo-app">
      <h1>완료된 할일</h1>
      <ul className="todo-list">
        {completedTodos.map((todo) => (
          <li key={todo.id} className="todo-item completed">
            <input type="checkbox" checked readOnly />
            <span>{todo.title}</span>
          </li>
        ))}
      </ul>
      {completedTodos.length === 0 && (
        <p style={{ textAlign: 'center', color: '#999' }}>
          완료된 할일이 없습니다.
        </p>
      )}
    </div>
  );
}
