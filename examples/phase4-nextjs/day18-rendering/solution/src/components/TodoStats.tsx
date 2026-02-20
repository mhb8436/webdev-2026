// 할일 통계 - 서버 컴포넌트 ('use client' 없음!)
// 인터랙션이 없으므로 서버 컴포넌트로 구현
// 장점: 클라이언트 JS 번들에 포함되지 않아 성능 향상

import { Todo } from '@/types/todo';

interface TodoStatsProps {
  todos: Todo[];
}

export default function TodoStats({ todos }: TodoStatsProps) {
  // 통계 계산 - 서버에서 실행됨
  const total = todos.length;
  const completed = todos.filter((t) => t.done).length;
  const active = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div>
      {/* 통계 카드 */}
      <div className="stats-container">
        <div className="stat-card">
          <span className="stat-number">{total}</span>
          <span className="stat-label">전체</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{completed}</span>
          <span className="stat-label">완료</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{active}</span>
          <span className="stat-label">미완료</span>
        </div>
      </div>

      {/* 진행률 바 */}
      <div className="progress-bar-container">
        <p>완료율: {completionRate}%</p>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      {/* 서버 컴포넌트 표시 (학습용) */}
      <p className="data-source">
        <span className="component-badge badge-server">서버 컴포넌트</span>
        이 컴포넌트는 서버에서 렌더링됩니다 (클라이언트 JS 없음)
      </p>
    </div>
  );
}
