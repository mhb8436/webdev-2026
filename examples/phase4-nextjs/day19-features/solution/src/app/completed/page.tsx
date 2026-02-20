// 완료된 할일 페이지 (서버 컴포넌트)
import { getCompletedTodos } from '@/lib/todos';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '완료된 할일',
  description: '완료된 할일 목록을 확인하세요',
};

export default function CompletedPage() {
  // 서버에서 완료된 할일 목록 가져오기
  const completedTodos = getCompletedTodos();

  return (
    <div className="todo-app">
      <h1>완료된 할일</h1>
      <ul className="todo-list">
        {completedTodos.map((todo) => (
          <li key={todo.id} className="todo-item completed">
            <input type="checkbox" checked readOnly />
            <span>
              <Link href={`/todos/${todo.id}`}>{todo.title}</Link>
            </span>
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
