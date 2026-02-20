'use client';
// 할일 통계 컴포넌트
// localStorage에서 데이터를 읽어 통계를 표시
// 주의: 이 단계에서는 클라이언트 컴포넌트 (Day 18에서 서버 컴포넌트로 변환)

import { useState, useEffect } from 'react';

interface Todo {
  id: number;
  title: string;
  done: boolean;
}

const STORAGE_KEY = 'nextjs-todos';

export default function TodoStats() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // localStorage에서 할일 데이터 불러오기
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

  if (!isLoaded) {
    return <div className="empty-message">불러오는 중...</div>;
  }

  // 통계 계산
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
    </div>
  );
}
