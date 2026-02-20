// 통계 페이지 - "/stats" 경로
// 할일 통계를 표시하는 클라이언트 컴포넌트 사용
import TodoStats from '@/components/TodoStats';

export default function StatsPage() {
  return (
    <main>
      <h1>할일 통계</h1>
      {/* 통계 컴포넌트 - localStorage에서 데이터를 읽어 통계 표시 */}
      <TodoStats />
    </main>
  );
}
