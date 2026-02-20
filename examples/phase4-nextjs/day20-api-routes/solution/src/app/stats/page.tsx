// 통계 페이지 (서버 컴포넌트)
import { getTodos, getCompletedTodos, getActiveTodos } from '@/lib/todos';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '통계',
  description: '할일 앱의 통계 정보를 확인하세요',
};

export default function StatsPage() {
  const todos = getTodos();
  const completed = getCompletedTodos();
  const active = getActiveTodos();

  const completionRate = todos.length > 0
    ? Math.round((completed.length / todos.length) * 100)
    : 0;

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>할일 통계</h1>
      <div className="stats">
        <div className="stat-card">
          <h3>{todos.length}</h3>
          <p>전체 할일</p>
        </div>
        <div className="stat-card">
          <h3>{completed.length}</h3>
          <p>완료된 할일</p>
        </div>
        <div className="stat-card">
          <h3>{active.length}</h3>
          <p>진행 중인 할일</p>
        </div>
        <div className="stat-card">
          <h3>{completionRate}%</h3>
          <p>완료율</p>
        </div>
      </div>
    </div>
  );
}
