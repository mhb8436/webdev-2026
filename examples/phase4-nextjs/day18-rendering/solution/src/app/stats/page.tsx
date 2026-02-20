// 통계 페이지 - 서버 컴포넌트
// TodoStats도 서버 컴포넌트이므로 전체가 서버에서 렌더링됨
import { getTodos } from '@/lib/todos';
import TodoStats from '@/components/TodoStats';

export default async function StatsPage() {
  // 서버에서 전체 할일 데이터 가져오기
  const todos = await getTodos();

  return (
    <main>
      <h1>
        할일 통계
        <span className="component-badge badge-server">서버 컴포넌트</span>
      </h1>
      {/* TodoStats는 서버 컴포넌트 - 인터랙션 없이 데이터만 표시 */}
      <TodoStats todos={todos} />
      <p className="data-source">
        이 페이지는 서버 컴포넌트만으로 구성 (클라이언트 JS 없음)
      </p>
    </main>
  );
}
