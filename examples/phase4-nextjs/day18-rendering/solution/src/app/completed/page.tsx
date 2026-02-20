// 완료 목록 페이지 - 서버 컴포넌트
// 서버에서 완료된 할일만 필터링하여 가져옴
import { getCompletedTodos } from '@/lib/todos';
import TodoApp from '@/components/TodoApp';

export default async function CompletedPage() {
  // 서버에서 완료된 할일만 가져오기
  const completedTodos = await getCompletedTodos();

  return (
    <main>
      <h1>
        완료된 할일
        <span className="component-badge badge-server">서버 컴포넌트</span>
      </h1>
      {/* 완료된 할일만 전달, 입력 폼은 숨김 */}
      <TodoApp initialTodos={completedTodos} showForm={false} />
      <p className="data-source">서버에서 완료된 항목만 필터링하여 로딩됨</p>
    </main>
  );
}
