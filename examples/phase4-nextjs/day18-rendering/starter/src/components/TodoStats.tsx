// 할일 통계 서버 컴포넌트 - 'use client' 없음!
// 인터랙션이 없으므로 서버 컴포넌트로 구현 가능
// TODO: props로 받은 할일 데이터를 기반으로 통계 표시

import { Todo } from '@/types/todo';

interface TodoStatsProps {
  todos: Todo[];
}

export default function TodoStats({ todos }: TodoStatsProps) {
  // TODO: 통계 계산 (전체, 완료, 미완료, 완료율)
  // TODO: 통계 카드 및 진행률 바 렌더링

  return (
    <div>
      {/* TODO: 통계 렌더링 */}
    </div>
  );
}
